import { describe, expect, it } from "vitest";
import { initialState } from "../src/game/v5/state";
import { openCase } from "../src/game/v5/operations";
import { ruleFor, OUTCOMES } from "../src/game/v5/rules";
import { branchId } from "../src/game/v5/content";
import { getDerivedStats } from "../src/engine";
import { advanceCalendar } from "../src/game/v5/calendar";
import { settleCompletedWork } from "../src/game/v5/timeline";
import { excludeAssets } from "../src/game/v5/assets";
import { sample } from "../src/game/v5/world";
import { direct, beginStage } from "../src/game/v5/director";
import type { GameV5, SourceChoice } from "../src/game/v5/types";

function decide(game: GameV5, id: string, choice: SourceChoice) {
  const rule = ruleFor(id), issue = openCase(game, id, rule.spec(game, id));
  issue.choice = choice; issue.rounds++;
  rule.apply(game, issue, id, choice);
  return issue;
}
describe("v5 original targets and dependent returns", () => {
  it.each(["unchanged", "no-feedback", "reduced"])("K08 changed-plan presentation needs real reduction and draft findings: %s", variant => {
    const game = initialState("proposal-presentation");
    game.stage = 4; game.world.externalStage = null;
    game.facts["baseCount:4"] = 4; game.facts.municipalPresentationHeld = true;
    game.procedure.draftFeedback = variant !== "no-feedback";
    beginStage(game);
    if (variant !== "unchanged") {
      const issue = openCase(game, "nature", { family: "presentation-reduction", component: "wind", count: 1 });
      excludeAssets(game, issue);
    }
    direct(game);
    expect(game.scenes[0]?.id === "interludes[3][1]").toBe(variant === "reduced");
    expect(game.facts.presentedReducedProposalRevision).toBe(variant === "reduced" ? game.planRevision : undefined);
  });
  it.each([["forestDeer", "calving", "deerCalving", "UUSI-P3-14", "EV-LUONTO", 13],
    ["golden", "flight", "goldenTerritory", "UUSI-P4-KOTKAPAIKAT", "EV-KOTKA", 3]] as const)("K37 %s restoration cannot override a later independent exclusion", (species, mechanism, family, id, event, branch) => {
    const game = initialState(`restore-conflict-${species}`);
    const issue = openCase(game, id, { family, component: "wind", species, mechanism, count: 3 });
    excludeAssets(game, issue); issue.fallback = "viable"; issue.facts.restoreEvidence = true;
    decide(game, id, "A");
    const requested = String(issue.facts.restorePlaceIds).split(",");
    const other = openCase(game, "land-map-versions", { family: "otherLandRight", component: "wind", mechanism: "land", count: 1 });
    other.placeIds = [requested[0]!]; excludeAssets(game, other);
    const before = getDerivedStats(game.run).windCount;
    const due = game.outcomes.find(outcome => outcome.contentId === event)!;
    expect(OUTCOMES[event]!(game, issue, due, 0)).toBe(branchId(event, branch));
    expect(getDerivedStats(game.run).windCount).toBe(before);
    expect(issue.fallback).toBe("viable"); expect(game.ending).toBeNull();
    expect(game.run.assets.windSites.find(site => site.id === requested[0])!.exclusions).toContain(other.id);
  });
  it.each([["natura", "forestDeer", 3], ["natura-review", "golden", 2]] as const)("K07 %s cannot invent missing places for fixed-count text", (id, species, required) => {
    const game = initialState(`few-places-${id}`); game.world.forestDeerArea = true;
    game.world.researchSpecies = species; game.world.researchPublishedAt = 100;
    const removed = openCase(game, "defence", { family: "earlierRestriction", component: "wind", count: 1 });
    removed.placeIds = game.run.assets.windSites.slice(required - 1).map(site => site.id); excludeAssets(game, removed);
    expect(ruleFor(id).eligible(game, id)).toBe(false);
  });
  it.each([0.1, 0.9])("K31 grid-first result resolves the actual grid work independently of nature-season branch %s", observation => {
    const game = initialState("grid-first-ready"); const issue = decide(game, "UUSI-P1-09", "B");
    const due = game.outcomes[0]!;
    expect(game.facts.gridResolved).not.toBe(true);
    advanceCalendar(game.calendar, due.dueAt, "Grid completed", [due.workId!]);
    OUTCOMES["EV-SELVITYSJARJESTYS"]!(game, issue, due, observation);
    expect(game.facts.gridResolved).toBe(true);
    expect(game.calendar.orders.some(work => work.id.endsWith(":secondEcology") && work.status !== "completed")).toBe(true);
  });
  it("K16 failed military route returns after actual work and purchases a distinct revision only once", () => {
    let index = 0; while (sample(`route-${index}`, "military-route-compatible") < 0.6) index++;
    const game = initialState(`route-${index}`);
    decide(game, "UUSI-P2-04", "A");
    const first = game.outcomes[0]!;
    advanceCalendar(game.calendar, first.dueAt, "Grid", [first.workId!]);
    OUTCOMES["EV-VERKKO"]!(game, game.cases[first.caseId]!, first, 0);
    const route = decide(game, "UUSI-P2-05", "B");
    expect(game.scenes).toHaveLength(0);
    const work = game.calendar.orders.find(work => work.id.endsWith(":militaryRoute"))!;
    advanceCalendar(game.calendar, work.dueAt, "Route constraints", [work.id]); settleCompletedWork(game);
    expect(route.facts.routeCompatibilityPending).toBe(false);
    expect(game.scenes.map(scene => scene.id)).toEqual(["UUSI-P2-04"]);
    decide(game, "UUSI-P2-04", "B");
    expect(game.outcomes.filter(outcome => outcome.contentId === "EV-VERKKO")).toHaveLength(2);
    const invoices = game.costs.length; settleCompletedWork(game);
    expect(game.costs).toHaveLength(invoices); expect(game.scenes).toHaveLength(1);
  });
  it("K16 own-route restriction is not offered while the distinct shared-line proposal is pending", () => {
    const game = initialState("v5-development-03-1014");
    game.facts.defenceAccepted = true; game.world.observations.militaryRouteConflict = 1;
    decide(game, "UUSI-P1-04", "A");
    expect(ruleFor("UUSI-P2-05").eligible(game, "UUSI-P2-05")).toBe(false);
    game.facts.sharedConnectionFailed = true;
    expect(ruleFor("UUSI-P2-05").eligible(game, "UUSI-P2-05")).toBe(true);
  });
  it("K16 new-neighbour hearing is tied to an actual post-hearing reduction and one relocated place", () => {
    let index = 0; while (sample(`hearing-${index}`, "settlement-revision-neighbour") >= 0.35) index++;
    const game = initialState(`hearing-${index}`); game.world.externalStage = null;
    expect(ruleFor("UUSI-P4-09").eligible(game, "UUSI-P4-09")).toBe(false);
    const source = decide(game, "UUSI-P4-10", "A");
    game.facts.approvalReady = true; game.procedure.proposalHearingComplete = true;
    const due = game.outcomes[0]!;
    expect(OUTCOMES["EV-KUNTA"]!(game, source, due, 0.9)).toBe(branchId("EV-KUNTA", 1));
    expect(ruleFor("UUSI-P4-09").eligible(game, "UUSI-P4-09")).toBe(true);
    const changed = game.cases["case:changedHearing"]!;
    expect(changed.placeIds).toHaveLength(1);
    expect(source.placeIds).not.toContain(changed.placeIds[0]);
    const before = getDerivedStats(game.run).windCount;
    decide(game, "UUSI-P4-09", "B");
    expect(getDerivedStats(game.run).windCount).toBe(before - 1);
    expect(game.outcomes.some(outcome => outcome.contentId === "EV-KUULEMINEN")).toBe(true);
  });
});
