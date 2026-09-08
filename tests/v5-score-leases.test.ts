import { describe, expect, it } from "vitest";
import { initialState } from "../src/game/v5/state";
import { openCase, cost, qualityLoss } from "../src/game/v5/operations";
import { ruleFor, OUTCOMES } from "../src/game/v5/rules";
import { branchId } from "../src/game/v5/content";
import { canWarnLeaseExpiry, leaseExpiryEndsRun } from "../src/game/v5/procedure";
import { calculateScore, RESOURCE_EUROS_PER_POINT } from "../src/game/v5/score";
import { excludeAssets, changeTurbines, curtailYield } from "../src/game/v5/assets";
import { advanceCalendar } from "../src/game/v5/calendar";
import { settleCompletedWork } from "../src/game/v5/timeline";
import { sample } from "../src/game/v5/world";
import type { GameV5, SourceChoice } from "../src/game/v5/types";

function decide(game: GameV5, id: string, choice: SourceChoice) {
  const rule = ruleFor(id), issue = openCase(game, id, rule.spec(game, id));
  issue.choice = choice; issue.rounds++; rule.apply(game, issue, id, choice); return issue;
}
function delayed(seed = "lease-warning"): GameV5 {
  const game = initialState(seed); decide(game, "UUSI-P1-03", "B"); game.stage = 4;
  game.calendar.now = 50; game.calendar.baselineNow = 24; game.calendar.avoidableCriticalDelayMonths = 26;
  game.world.regionalPlanForecast = 42; game.world.regionalPlanDue = 80; game.facts.regionalPlanDependency = true;
  return game;
}
function refused(): GameV5 {
  const game = delayed();
  game.calendar.now = 61; game.facts.leaseNegotiationComplete = true; game.facts.noReplacementLand = true;
  game.facts.avoidableDelayAtLeaseWarning = 26;
  for (const lease of game.leases) { lease.forecastWarned = true; lease.response = "declined"; lease.status = "expired"; }
  return game;
}
describe("v5 lease warning and actual expiry are different events", () => {
  it.each(["lowDelay", "noDependency", "noPostponement", "longContracts", "alreadyWon"])("K25 no forecast warning: %s", missing => {
    const game = delayed(); expect(canWarnLeaseExpiry(game)).toBe(true);
    if (missing === "lowDelay") game.calendar.avoidableCriticalDelayMonths = 23;
    if (missing === "noDependency") game.facts.regionalPlanDependency = false;
    if (missing === "noPostponement") game.world.regionalPlanDue = game.world.regionalPlanForecast;
    if (missing === "longContracts") game.leases.forEach(lease => lease.developmentDeadline = 84);
    if (missing === "alreadyWon") game.ending = { kind: "win", contentId: "LOPPU-VOITTO", causeCaseId: null, originalCause: null, month: 49, values: {}, score: calculateScore(game) };
    expect(canWarnLeaseExpiry(game)).toBe(false); expect(leaseExpiryEndsRun(game)).toBe(false);
  });
  it.each(["lowDelay", "noDependency", "noPostponement", "notExpired", "extensionAccepted", "replacementLand", "alreadyWon", "noWarning", "noNegotiation"])("K25 actual lease end forbidden without prerequisite: %s", missing => {
    const game = refused(); expect(leaseExpiryEndsRun(game)).toBe(true);
    if (missing === "lowDelay") { game.facts.avoidableDelayAtLeaseWarning = 23; game.calendar.avoidableCriticalDelayMonths = 23; }
    if (missing === "noDependency") game.facts.regionalPlanDependency = false;
    if (missing === "noPostponement") game.world.regionalPlanDue = game.world.regionalPlanForecast;
    if (missing === "notExpired") { game.calendar.now = 59; game.leases.forEach(lease => lease.status = "valid"); }
    if (missing === "extensionAccepted") game.leases.forEach(lease => { lease.response = "accepted"; lease.status = "valid"; lease.extensionDeadline = 98; });
    if (missing === "replacementLand") game.facts.noReplacementLand = false;
    if (missing === "noWarning") game.leases.forEach(lease => lease.forecastWarned = false);
    if (missing === "noNegotiation") game.facts.leaseNegotiationComplete = false;
    if (missing === "alreadyWon") game.ending = { kind: "win", contentId: "LOPPU-VOITTO", causeCaseId: null, originalCause: null, month: 59, values: {}, score: calculateScore(game) };
    expect(leaseExpiryEndsRun(game)).toBe(false);
  });
  it.each([0, 1, 2])("K26/K27 extension result branch %s arrives before expiry and charges only accepted increases", expectedBranch => {
    let seed = "";
    for (let index = 0; index < 1000; index++) {
      const candidate = `extension-${index}`;
      const refused = [0, 1, 2].filter(n => sample(candidate, `lease:${n}:extensionWillingness`) >= 0.8).length;
      const branch = refused === 0 ? 0 : sample(candidate, "lease-extension-replacement") < 0.55 || refused < 2 ? 1 : 2;
      if (branch === expectedBranch) { seed = candidate; break; }
    }
    expect(seed).not.toBe("");
    const game = delayed(seed); game.seenIds.push("EV-MAAKUNTAODOTUS");
    const issue = decide(game, "UUSI-P4-VUOKRAJATKO", "A"); const due = game.outcomes[0]!;
    expect(game.leases.every(lease => lease.status === "valid")).toBe(true);
    advanceCalendar(game.calendar, due.dueAt, "Owner responses", [due.workId!], 26);
    expect(OUTCOMES["EV-OPTIO"]!(game, issue, due, 0)).toBe(branchId("EV-OPTIO", expectedBranch));
    expect(game.calendar.now).toBeLessThan(60); expect(leaseExpiryEndsRun(game)).toBe(false);
    expect(game.costs.filter(cost => cost.id.includes("extension:lease:")).length).toBe(game.leases.filter(lease => lease.response === "accepted").length);
    if (expectedBranch === 1) {
      const refusedHoldings = game.leases.filter(lease => lease.response === "declined").flatMap(lease => lease.parcelIds);
      expect([...issue.placeIds, ...issue.parcelIds].every(id => refusedHoldings.includes(id))).toBe(true);
    }
    advanceCalendar(game.calendar, 60, "Actual deadline", [], 34); settleCompletedWork(game);
    expect(game.ending?.contentId ?? null).toBe(expectedBranch === 2 ? "LOPPU-VUOKRA-AIKA" : null);
  });
});
describe("v5 score has one normalized ledger", () => {
  it("K50 starting included hybrid is 1000; displayed deductions exactly reconcile with total", () => {
    const game = initialState("score"); game.battery.status = "included";
    expect(calculateScore(game).total).toBe(1000);
    const issue = openCase(game, "noise", { family: "scoreNoise", component: "wind", mechanism: "noise", count: 2 });
    curtailYield(game, issue.id, issue.placeIds, 0.12);
    cost(game, issue, "noise", "actual", 64000); cost(game, issue, "noise", "land", 9000, "landPurchase");
    qualityLoss(game, issue, "noise", "missingEvidence", 17, "Todetun puutteen täydentäminen.");
    game.calendar.avoidableCriticalDelayMonths = 4;
    const score = calculateScore(game);
    expect(score.time).toBe(180); expect(score.quality).toBe(233);
    expect(score.resource).toBe(Math.round(150 - 73000 / RESOURCE_EUROS_PER_POINT));
    expect(score.deductions.reduce((sum, item) => sum + item.points, 0)).toBe(1000 - score.total);
    expect(score.deductions.every(item => item.reason.length > 10)).toBe(true);
  });
  it("K50 future rents are no invoice and repeated invoice identity is never charged twice", () => {
    const game = initialState("resource-ledger"); game.battery.status = "included";
    const issue = openCase(game, "land", { family: "land", component: "shared" });
    cost(game, issue, "land", "futureRent", 2000000, "contractLiability");
    expect(calculateScore(game).resource).toBe(150);
    cost(game, issue, "land", "actualFee", 15000); cost(game, issue, "land", "actualFee", 15000);
    expect(calculateScore(game).resource).toBe(144);
    expect(game.costs).toHaveLength(2);
  });
  it("K50 resource rounding and every category remain bounded under extreme costs and delay", () => {
    const game = initialState("score-bounds"); game.battery.status = "included";
    const issue = openCase(game, "land", { family: "expense", component: "shared" });
    cost(game, issue, "land", "cost", 99999999); qualityLoss(game, issue, "land", "quality", 999, "Todettu menettelypuute.");
    game.calendar.avoidableCriticalDelayMonths = 999;
    const score = calculateScore(game);
    expect(score).toMatchObject({ scope: 400, time: 0, quality: 0, resource: 0, total: 400 });
    expect(score.deductions.reduce((sum, item) => sum + item.points, 0)).toBe(600);
  });
  it("K51 scope deductions report MW, height, yield and solar separately without changing initial weights", () => {
    const game = initialState("scope-units"); game.battery.status = "included";
    const initial = structuredClone(game.initial);
    const wind = openCase(game, "height", { family: "heightChange", component: "wind", count: 1 });
    changeTurbines(game, wind.placeIds, "F8", 270); curtailYield(game, wind.id, wind.placeIds, 0.1);
    const solar = openCase(game, "solarNature", { family: "solarLoss", component: "solar", hectares: 8 }); excludeAssets(game, solar);
    game.battery.chargeMW = 60;
    const score = calculateScore(game), reason = score.deductions.find(item => item.category === "scope")!.reason;
    expect(reason).toContain("MW"); expect(reason).toContain("270 m"); expect(reason).toContain("tuotantoarvio"); expect(reason).toContain("ha"); expect(reason).toContain("MWh");
    expect(game.initial).toEqual(initial);
    expect(score.deductions.reduce((sum, item) => sum + item.points, 0)).toBe(1000 - score.total);
  });
  it("K51 excluding a turbine cannot deduct both its MW and a second count penalty", () => {
    const game = initialState("scope-count"); game.battery.status = "included";
    const issue = openCase(game, "nature", { family: "singleLoss", component: "wind", count: 1 });
    excludeAssets(game, issue);
    expect(calculateScore(game).scope).toBe(Math.round(400 * (0.6 * (game.initial.windCount - 1) / game.initial.windCount + 0.4)));
  });
});
