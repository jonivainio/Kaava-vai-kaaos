import { describe, expect, it } from "vitest";
import { initialState } from "../src/game/v5/state";
import { openCase } from "../src/game/v5/operations";
import { ruleFor, OUTCOMES } from "../src/game/v5/rules";
import { branchId } from "../src/game/v5/content";
import { getDerivedStats } from "../src/engine";
import { advanceCalendar } from "../src/game/v5/calendar";
import type { GameV5, SourceChoice } from "../src/game/v5/types";

function decide(game: GameV5, id: string, choice: SourceChoice) {
  const rule = ruleFor(id), issue = openCase(game, id, rule.spec(game, id));
  issue.choice = choice; issue.rounds++;
  const branch = rule.apply(game, issue, id, choice);
  return { issue, branch };
}
function reveal(game: GameV5, id: string, observation: number) {
  const outcome = game.outcomes.find(outcome => outcome.contentId === id)!;
  return OUTCOMES[id]!(game, game.cases[outcome.caseId]!, outcome, observation);
}
describe("v5 K18–K31 contracts, original choices and delayed work", () => {
  it("K35 funding public research changes only participation and cost, never the seeded world or publication", () => {
    const funded = initialState("research-independent"), skipped = initialState("research-independent");
    decide(funded, "research", "A"); decide(skipped, "research", "B");
    expect(funded.world).toEqual(skipped.world);
    expect(funded.run.assets).toEqual(skipped.run.assets);
    expect(funded.cases["case:publicResearch"]!.facts.publishedAt).toBe(skipped.cases["case:publicResearch"]!.facts.publishedAt);
    expect(funded.costs.reduce((sum, item) => sum + item.euros, 0) - skipped.costs.reduce((sum, item) => sum + item.euros, 0)).toBe(funded.world.researchCost);
  });
  it.each(["land", "land-signing", "land-index", "land-minimum"])("K18 %s: accepts, wind compaction, and solar loss are separate branches", id => {
    for (const variant of ["accept", "wind", "solar"] as const) {
      const game = initialState(`contract-${id}-${variant}`);
      game.world.ownersAgree = variant === "accept"; game.world.landComponent = variant === "solar" ? "solar" : "wind";
      const before = getDerivedStats(game.run);
      expect(decide(game, id, "B").branch).toBe(branchId(id, variant === "accept" ? 0 : variant === "wind" ? 1 : 2, "B"));
      const after = getDerivedStats(game.run);
      expect(after.windCount).toBe(before.windCount);
      expect(after.solarHa).toBe(before.solarHa - (variant === "solar" ? 12 : 0));
      expect(game.facts.layoutTightened).toBe(variant === "wind");
    }
  });
  it.each([0.1, 0.9])("K19 front-page confirmation observation %s belongs only to signing choice A", observation => {
    const game = initialState("front-page"); decide(game, "land-map-versions", "A");
    expect(reveal(game, "EV-SOPIMUSSIVUT", observation)).toBe(branchId("EV-SOPIMUSSIVUT", observation < 0.65 ? 0 : 1));
    const skip = initialState("front-page"); decide(skip, "land-map-versions", "B");
    expect(skip.outcomes.map(outcome => outcome.contentId)).toEqual(["EV-MAA"]);
    expect(reveal(skip, "EV-MAA", 0)).not.toBe(branchId("EV-MAA", 0));
  });
  it.each([[0.1, 0], [0.5, 1], [0.9, 3]] as const)("K20 promised turbine A: observation %s selects branch %s without terminating by request", (observation, index) => {
    const game = initialState("promised-turbine"); const { issue } = decide(game, "land-area-explained", "A");
    expect(reveal(game, "EV-VOIMALALUPAUS", observation)).toBe(branchId("EV-VOIMALALUPAUS", index));
    expect(issue.facts.terminated).not.toBe(true);
    expect(game.scenes.some(scene => scene.id === "UUSI-P1-MAARIITA")).toBe(index !== 0);
  });
  it("K20 agreed termination is branch 2; continued dispute has two real responses", () => {
    const game = initialState("termination"); decide(game, "land-area-explained", "B");
    expect(reveal(game, "EV-VOIMALALUPAUS", 0.99)).toBe(branchId("EV-VOIMALALUPAUS", 2));
    for (const observation of [0.1, 0.9]) {
      const trial = initialState("dispute"); decide(trial, "land-area-explained", "A"); reveal(trial, "EV-VOIMALALUPAUS", 0.8);
      decide(trial, "UUSI-P1-MAARIITA", "B");
      expect(reveal(trial, "EV-MAARIITA", observation)).toBe(branchId("EV-MAARIITA", observation < 0.55 ? 0 : 1));
    }
  });
  it("K21 no special terms or no disclosure means no fabricated callback", () => {
    const game = initialState("callback"); const { issue } = decide(game, "land", "B");
    const fake = { caseId: issue.id } as never;
    expect(() => OUTCOMES["contract-callback"]!(game, issue, fake, 0)).toThrow("Unfounded");
    issue.facts.specialTerms = true;
    expect(() => OUTCOMES["contract-callback"]!(game, issue, fake, 0)).toThrow("Unfounded");
    issue.facts.informedOthers = true;
    OUTCOMES["contract-callback"]!(game, issue, fake, 0);
    expect(game.scenes.at(-1)).toMatchObject({ id: "P3-SOPIMUS", caseId: issue.id });
    const before = structuredClone(game.run.assets);
    const rule = ruleFor("P3-SOPIMUS"); rule.apply(game, issue, "P3-SOPIMUS", "B");
    expect(game.run.assets).toEqual(before);
  });
  it("K22 shared line failure returns only unresolved core grid and never duplicates its invoice", () => {
    const game = initialState("shared-line"); decide(game, "UUSI-P1-04", "A");
    const due = game.outcomes[0]!;
    expect(game.calendar.orders[0]).toMatchObject({ duration: 6, baselineDuration: 3 });
    expect(reveal(game, "EV-YHTEISASEMA", 0.99)).toBeNull();
    expect(game.scenes.at(-1)?.id).toBe("UUSI-P2-04");
    OUTCOMES["EV-YHTEISASEMA"]!(game, game.cases[due.caseId]!, due, 0);
    expect(game.costs.filter(cost => cost.euros === 18000)).toHaveLength(1);
    const own = initialState("shared-line"); decide(own, "UUSI-P1-04", "B");
    expect(own.outcomes).toEqual([]); expect(own.costs.some(cost => cost.euros === 18000)).toBe(false);
    game.facts.gridResolved = true; game.scenes = [];
    reveal(game, "EV-YHTEISASEMA", 0);
    expect(game.scenes).toEqual([]);
  });
  it.each([0.1, 0.9])("K23 the prior lease priority response %s affects only its held property", observation => {
    const game = initialState("priority"); decide(game, "UUSI-P1-05", "A");
    expect(reveal(game, "EV-ETUSIJA", observation)).toBe(branchId("EV-ETUSIJA", observation < 0.5 ? 0 : 1));
    expect(game.ending).toBeNull();
  });
  it.each([["A", 84], ["B", 60]] as const)("K24 %s keeps the authored %s-month preparation deadline and real asset IDs", (choice, months) => {
    const game = initialState("deadlines"); decide(game, "UUSI-P1-03", choice);
    const ids = new Set([...game.run.assets.windSites, ...game.run.assets.solarParcels].map(asset => asset.id));
    expect(game.leases).toHaveLength(3);
    for (const lease of game.leases) { expect(lease.developmentDeadline).toBe(months); expect(lease.parcelIds.every(id => ids.has(id))).toBe(true); }
  });
  it.each([["A", 4, 0.1, 0], ["A", 4, 0.9, 1], ["B", 4, 0.1, 2], ["B", 8, 0.1, 3]] as const)("K31 order %s completed at %s selects source branch %s/%s", (choice, month, observation, index) => {
    const game = initialState("study-order"); decide(game, "UUSI-P1-09", choice);
    advanceCalendar(game.calendar, month, "first study completed");
    expect(reveal(game, "EV-SELVITYSJARJESTYS", observation)).toBe(branchId("EV-SELVITYSJARJESTYS", index));
    expect(ruleFor("surveys").eligible(game, "surveys")).toBe(false);
    expect(game.facts.ecologyOrdered).toBe(true); expect(game.facts.gridOrdered).toBe(true);
  });
});
