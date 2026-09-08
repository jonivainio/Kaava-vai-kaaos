import { describe, expect, it } from "vitest";
import { advanceCalendar, cancelComponentWork, extendWork, newCalendar, orderWork, seasonStart, waitForWork } from "../src/game/v5/calendar";
import type { NewOrder } from "../src/game/v5/calendar";

function order(id: string, duration: number, extra: Partial<NewOrder> = {}): NewOrder {
  return { id, caseId: id, sourceId: "surveys", planRevision: 0, component: "shared", duration,
    baselineDuration: duration, dependencies: [], season: null, costId: null, observation: "fixed",
    delayCause: "normal", ...extra };
}
describe("v5 K32–K33: concurrent critical-path calendar", () => {
  it("waits six months for parallel four- and six-month jobs, and preserves due-event order", () => {
    const clock = newCalendar();
    orderWork(clock, order("long", 6));
    orderWork(clock, order("short", 4));
    orderWork(clock, order("same-due", 6));
    expect(waitForWork(clock, ["long", "short"], "aineisto")).toEqual(["short", "long", "same-due"]);
    expect(clock.now).toBe(6);
    expect(clock.avoidableCriticalDelayMonths).toBe(0);
    expect(clock.orders.map(item => item.completedAt)).toEqual([6, 4, 6]);
  });
  it("a six-to-eight extension adds two months and propagates to dependent work", () => {
    const clock = newCalendar();
    orderWork(clock, order("study", 6));
    orderWork(clock, order("report", 2, { dependencies: ["study"] }));
    advanceCalendar(clock, 4, "rinnakkainen valmistelu");
    extendWork(clock, "study", 8);
    expect(clock.orders[1]?.startedAt).toBe(8);
    waitForWork(clock, ["report"], "raportti");
    expect(clock.now).toBe(10);
    expect(clock.avoidableCriticalDelayMonths).toBe(2);
    expect(clock.orders[0]?.completedAt).toBe(8);
  });
  it("does not charge avoidable time twice when delayed jobs overlap", () => {
    const clock = newCalendar();
    orderWork(clock, order("ecology", 16, { baselineDuration: 4, delayCause: "choice" }));
    orderWork(clock, order("grid", 18, { baselineDuration: 6, delayCause: "choice" }));
    waitForWork(clock, ["ecology"], "luonto");
    waitForWork(clock, ["grid"], "verkko");
    expect(clock.now).toBe(18);
    expect(clock.avoidableCriticalDelayMonths).toBe(12);
    expect(clock.advances.reduce((sum, step) => sum + step.avoidableMonths, 0)).toBe(12);
  });
  it("external parallel work can absorb a later season's delay", () => {
    const clock = newCalendar();
    orderWork(clock, order("ecology", 16, { baselineDuration: 4, delayCause: "choice" }));
    orderWork(clock, order("regional", 20, { baselineDuration: 20, delayCause: "external" }));
    waitForWork(clock, ["ecology", "regional"], "ehdotusaineisto");
    expect(clock.now).toBe(20);
    expect(clock.avoidableCriticalDelayMonths).toBe(0);
  });
  it("ordering the same case/revision twice neither duplicates nor rerolls work", () => {
    const clock = newCalendar();
    const input = order("one", 4);
    const first = orderWork(clock, input);
    advanceCalendar(clock, 2, "muu työ");
    expect(orderWork(clock, input)).toBe(first);
    expect(clock.orders).toHaveLength(1);
    expect(() => orderWork(clock, { ...input, observation: "different" })).toThrow("Conflicting");
    expect(() => orderWork(clock, order("bad", 2, { dependencies: ["missing"] }))).toThrow("dependency");
  });
  it("absorbs an earlier reported delay when a parallel external task becomes critical", () => {
    const clock = newCalendar();
    orderWork(clock, order("ecology", 16, { baselineDuration: 4, delayCause: "choice" }));
    orderWork(clock, order("regional", 20, { baselineDuration: 20, delayCause: "external" }));
    waitForWork(clock, ["ecology"], "luonto");
    expect(clock.avoidableCriticalDelayMonths).toBe(12);
    waitForWork(clock, ["regional"], "maakuntakaava");
    expect(clock.avoidableCriticalDelayMonths).toBe(0);
    expect(clock.advances.reduce((sum, step) => sum + step.avoidableMonths, 0)).toBe(0);
  });
  it("missed seasons defer only the seasonal job and BESS cancellation preserves shared work", () => {
    const season = { start: 3, end: 5, period: 12 };
    expect([2, 4, 6, 17, 18].map(month => seasonStart(month, season))).toEqual([3, 4, 15, 17, 27]);
    const clock = newCalendar();
    orderWork(clock, order("battery", 6, { component: "bess" }));
    orderWork(clock, order("common-water", 8));
    cancelComponentWork(clock, "bess");
    expect(waitForWork(clock, ["common-water"], "vesiarvio")).toEqual(["common-water"]);
    expect(() => waitForWork(clock, ["battery"], "akku")).toThrow();
  });
  it("survives save/load while work is active and preserves observation and due order", () => {
    const clock = newCalendar();
    orderWork(clock, order("nature", 6));
    orderWork(clock, order("grid", 4));
    advanceCalendar(clock, 2, "valmistelu");
    const restored = JSON.parse(JSON.stringify(clock));
    expect(waitForWork(restored, ["nature"], "valmis")).toEqual(waitForWork(clock, ["nature"], "valmis"));
    expect(restored).toEqual(clock);
    expect(() => advanceCalendar(clock, 1, "taakse")).toThrow();
  });
});
