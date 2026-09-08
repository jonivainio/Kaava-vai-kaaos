import { describe, expect, it } from "vitest";
import { getDerivedStats } from "../src/engine";
import { initialState } from "../src/game/v5/state";
import { openCase } from "../src/game/v5/operations";
import { excludeAssets, changeTurbines, curtailYield } from "../src/game/v5/assets";
import { canRestoreNature, natureRules, natureOutcomes } from "../src/game/v5/rules/nature";
import { environmentRules, environmentOutcomes } from "../src/game/v5/rules/environment";
import { branchId } from "../src/game/v5/content";
import type { GameV5, PendingOutcome, SourceChoice } from "../src/game/v5/types";

function choose(game: GameV5, id: string, choice: SourceChoice) {
  const rule = [...natureRules, ...environmentRules].find(rule => rule.ids.includes(id))!;
  const issue = openCase(game, id, rule.spec(game, id));
  issue.choice = choice;
  rule.apply(game, issue, id, choice);
  return issue;
}
function outcome(game: GameV5, id: string): PendingOutcome { return game.outcomes.find(item => item.contentId === id)!; }

describe("v5 ecology source, species and physical target identity", () => {
  it.each([
    ["nature", 0], ["nature-reindeer-calving", 2], ["nature-reindeer-route", 4],
    ["nature-squirrel", 6], ["nature-bird-area", 8], ["UUSI-P3-08", 10],
  ] as const)("%s publishes only its species and mechanism", (id, base) => {
    const game = initialState("nature-mechanisms", "hybrid");
    const issue = choose(game, id, "B");
    const due = outcome(game, "EV-LUONTO");
    expect(natureOutcomes["EV-LUONTO"]!(structuredClone(game), structuredClone(issue), due, 0.1)).toBe(branchId("EV-LUONTO", base));
    expect(natureOutcomes["EV-LUONTO"]!(game, issue, due, 0.9)).toBe(branchId("EV-LUONTO", base + 1));
    expect(game.scenes.at(-1)?.caseId).toBe(issue.id);
    expect(issue.fallback).toBe("viable");
  });
  it.each(["golden-known", "golden-unknown", "golden-shared", "UUSI-P3-04"])("%s is the same territory, not repeated new risks", id => {
    const game = initialState("golden-territory", "hybrid");
    const issue = choose(game, id, "A");
    const first = getDerivedStats(game.run).windCount;
    excludeAssets(game, issue);
    expect(getDerivedStats(game.run).windCount).toBe(first);
    expect(issue.id).toBe("case:goldenTerritory");
    expect(natureOutcomes["EV-KOTKA"]!(game, issue, outcome(game, "EV-KOTKA"), 0.99)).toBe(branchId("EV-KOTKA", 0));
  });
  it("does not describe deleted osprey places as successful relocations", () => {
    const game = initialState("osprey-removal", "hybrid");
    const issue = choose(game, "nature", "A");
    expect(game.outcomes.some(item => item.contentId === "EV-LUONTO")).toBe(false);
    expect(game.calendar.orders.some(item => item.caseId === issue.id)).toBe(true);
  });
  it.each([["solarNature", 0], ["solar-squirrel", 2], ["solar-bird-area", 4]] as const)("%s uses solar habitat-specific outcomes", (id, base) => {
    const game = initialState("solar-habitat", "hybrid");
    const issue = choose(game, id, "B");
    const before = getDerivedStats(game.run);
    expect(natureOutcomes["EV-AURINKOLUONTO"]!(game, issue, outcome(game, "EV-AURINKOLUONTO"), 0.99)).toBe(branchId("EV-AURINKOLUONTO", base + 1));
    expect(getDerivedStats(game.run).windCount).toBe(before.windCount);
    expect(getDerivedStats(game.run).solarHa).toBe(before.solarHa - issue.parcelIds.length);
  });
  it("cannot offer a purchased wetland without an independent, studied frog-water fallback", () => {
    const game = initialState("wetland-offer", "hybrid");
    const rule = natureRules.find(rule => rule.ids.includes("UUSI-P3-KOSTEIKKO"))!;
    game.facts.wetlandReserveOwned = true;
    expect(rule.eligible(game, "UUSI-P3-KOSTEIKKO")).toBe(false);
    choose(game, "solarNature", "A");
    expect(rule.eligible(game, "UUSI-P3-KOSTEIKKO")).toBe(true);
    game.world.wetlandSameCatchment = false;
    expect(rule.eligible(game, "UUSI-P3-KOSTEIKKO")).toBe(false);
  });
  it("wetland restores only part of the same excluded solar area, once", () => {
    const game = initialState("wetland-benefit", "hybrid");
    game.facts.wetlandReserveOwned = true;
    const issue = choose(game, "solarNature", "A");
    const reduced = getDerivedStats(game.run).solarHa;
    choose(game, "UUSI-P3-KOSTEIKKO", "A");
    const due = outcome(game, "EV-KOSTEIKKO");
    natureOutcomes["EV-KOSTEIKKO"]!(game, issue, due, 0.99);
    const restored = getDerivedStats(game.run).solarHa;
    expect(restored).toBeGreaterThan(reduced);
    expect(restored).toBeLessThan(game.initial.solarHa);
    natureOutcomes["EV-KOSTEIKKO"]!(game, issue, due, 0.1);
    expect(getDerivedStats(game.run).solarHa).toBe(restored);
    expect(game.facts.wetlandMustOperateBeforeDrainage).toBe(true);
  });
  it("restoration requires two sole-cause calving exclusions and preserves other constraints", () => {
    const game = initialState("restore-calving", "hybrid");
    const issue = openCase(game, "nature-reindeer-calving", { family: "deerCalving", component: "wind", species: "forestDeer", mechanism: "calving", count: 4 });
    issue.facts.restoreEvidence = true; issue.fallback = "viable";
    excludeAssets(game, issue);
    const first = game.run.assets.windSites.find(site => site.id === issue.placeIds[0])!;
    first.exclusions.push("aviation-independent");
    const before = getDerivedStats(game.run).windCount;
    expect(canRestoreNature(game, issue, "forestDeer")).toBe(true);
    choose(game, "UUSI-P3-14", "A");
    natureOutcomes["EV-LUONTO"]!(game, issue, outcome(game, "EV-LUONTO"), 0.1);
    expect(getDerivedStats(game.run).windCount).toBe(before + 2);
    expect(first.exclusions).toContain("aviation-independent");
    expect(first.exclusions).toContain(issue.id);
    expect(canRestoreNature(game, issue, "forestDeer")).toBe(false);
  });
  it("failed restoration leaves a viable smaller alternative", () => {
    const game = initialState("restore-refused", "hybrid");
    const issue = openCase(game, "nature-reindeer-calving", { family: "deerCalving", component: "wind", species: "forestDeer", mechanism: "calving", count: 2 });
    excludeAssets(game, issue); issue.facts.restoreEvidence = true; issue.fallback = "viable";
    choose(game, "UUSI-P3-14", "A");
    const before = getDerivedStats(game.run).windCount;
    expect(natureOutcomes["EV-LUONTO"]!(game, issue, outcome(game, "EV-LUONTO"), 0.99)).toBe(branchId("EV-LUONTO", 13));
    expect(getDerivedStats(game.run).windCount).toBe(before);
    expect(issue.status).toBe("resolved");
    expect(game.ending).toBeNull();
  });
  it("neither frog water nor deer corridors can release calving turbines", () => {
    const game = initialState("wrong-restoration", "hybrid");
    for (const id of ["nature-reindeer-route", "solarNature"]) {
      const issue = choose(game, id, "A"); issue.facts.restoreEvidence = true;
      expect(canRestoreNature(game, issue, "forestDeer")).toBe(false);
    }
  });
  it("herding requires the actual herding area, not just an arbitrary region label", () => {
    const game = initialState("herding-check", "hybrid");
    const rule = natureRules.find(rule => rule.ids.includes("herding-pasture"))!;
    game.world.region = "west"; game.world.herdingArea = false;
    expect(rule.eligible(game, "herding-pasture")).toBe(false);
    game.world.region = "east"; game.world.herdingArea = true;
    expect(rule.eligible(game, "herding-pasture")).toBe(true);
  });
});

describe("v5 physical reductions and scenario-dependent technical results", () => {
  it("height changes only named sites to a compatible model, never a linear power multiplier", () => {
    const game = initialState("target-height", "hybrid");
    const original = getDerivedStats(game.run).windMWac;
    const issue = choose(game, "height", "A");
    expect(environmentOutcomes["EV-ILMAILU"]!(game, issue, outcome(game, "EV-ILMAILU"), 0.7)).toBe(branchId("EV-ILMAILU", 2));
    expect(getDerivedStats(game.run).windMWac).toBe(original - issue.placeIds.length * 2);
    expect(game.run.assets.windSites.filter(site => !issue.placeIds.includes(site.id)).every(site => site.totalHeightM === 300)).toBe(true);
    expect(() => changeTurbines(game, issue.placeIds, "F10", 250)).toThrow();
  });
  it("noise modes change yield but leave rated power and count", () => {
    const game = initialState("noise-power", "hybrid");
    const before = getDerivedStats(game.run);
    const issue = choose(game, "noise", "B");
    environmentOutcomes["EV-MELU"]!(game, issue, outcome(game, "EV-MELU"), 0.1);
    const after = getDerivedStats(game.run);
    expect(after.windCount).toBe(before.windCount);
    expect(after.windMWac).toBe(before.windMWac);
    expect(after.windYieldIndex).toBeLessThan(before.windYieldIndex);
  });
  it("does not blame lost leases for a different relocation obstacle", () => {
    const game = initialState("noise-land", "hybrid");
    const issue = choose(game, "noise", "A");
    expect(environmentOutcomes["EV-MELU"]!(game, issue, outcome(game, "EV-MELU"), 0.99)).toBe(branchId("EV-MELU", 2));
    const compact = initialState("noise-land", "hybrid"); compact.facts.layoutTightened = true;
    const c = choose(compact, "noise", "A");
    expect(environmentOutcomes["EV-MELU"]!(compact, c, outcome(compact, "EV-MELU"), 0.99)).toBe(branchId("EV-MELU", 1));
  });
  it("does not charge overlapping curtailment twice, or keep it after target removal", () => {
    const game = initialState("yield-overlap", "hybrid");
    const site = game.run.assets.windSites[0]!;
    curtailYield(game, "noise", [site.id], 0.1);
    const first = game.run.windYieldIndex;
    curtailYield(game, "bats", [site.id], 0.025);
    expect(game.run.windYieldIndex).toBe(first);
    const issue = openCase(game, "noise", { family: "remove", component: "wind", count: 1 }); issue.placeIds = [site.id];
    excludeAssets(game, issue);
    expect(game.run.windYieldIndex).toBe(100);
  });
});
