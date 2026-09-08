import { branchId } from "../content";
import { excludeAssets } from "../assets";
import { followup, resolveCase, schedule, workOnly } from "../operations";
import { canRestoreNature, restorationPlaces, needsCorrection } from "./nature";
import { getDerivedStats } from "../../../engine";
import type { GameV5, CaseRecord } from "../types";
import type { Rule, OutcomeResolver } from "./types";

export function publicationAt(game: GameV5): number {
  return Number(game.cases["case:publicResearch"]?.facts.publishedAt ?? game.world.researchPublishedAt);
}
function fitsFixedPlaces(game: GameV5, family: string, count: number): boolean {
  const issue = game.cases[`case:${family}`];
  return issue ? issue.placeIds.length === count : getDerivedStats(game.run).windCount >= count;
}
function researchWait(game: GameV5, issue: CaseRecord, id: string, choice: "A" | "B", localOnly = false): void {
  const wait = localOnly ? 0 : Math.max(0, publicationAt(game) - game.calendar.now);
  issue.facts.researchWaiting = choice === "B" && !localOnly;
  if (choice === "A") {
    excludeAssets(game, issue); issue.fallback = "viable"; issue.facts.removedForNature = true;
    workOnly(game, issue, id, "independentSmallerReview", 3, 6000);
  }
  // The result exists independently of funding. Only an explicit wait blocks proposal preparation.
  schedule(game, issue, id, choice, "EV-TUTKIMUS", { duration: wait + 3, baseline: 3, milestone: "proposal", euros: 7000,
    key: "localResearchAssessment" });
  issue.facts.publicationAt = publicationAt(game);
  issue.facts.backgroundResearch = choice === "A";
}
export const researchRules: Rule[] = [
  { ids: ["natura"], role: "base", art: ["deer-corridor", "research-tracking"],
    spec: () => ({ family: "deerCorridor", component: "wind", species: "forestDeer", mechanism: "corridor", count: 3 }),
    eligible: game => game.world.forestDeerArea && game.world.researchSpecies === "forestDeer" && publicationAt(game) > game.calendar.now &&
      fitsFixedPlaces(game, "deerCorridor", 3),
    apply(game, issue, id, choice) { researchWait(game, issue, id, choice); return null; } },
  { ids: ["natura-review"], role: "base", art: ["eagle-territory", "research-tracking"],
    spec: () => ({ family: "goldenTerritory", component: "wind", species: "golden", mechanism: "flight", count: 2 }),
    eligible: game => game.world.researchSpecies === "golden" && publicationAt(game) > game.calendar.now &&
      fitsFixedPlaces(game, "goldenTerritory", 2),
    apply(game, issue, id, choice) { researchWait(game, issue, id, choice); return null; } },
  { ids: ["natura-season"], role: "base", art: ["deer-calving", "research-calendar"],
    spec: () => ({ family: "deerCalving", component: "wind", species: "forestDeer", mechanism: "calving", count: 2 }),
    eligible: game => game.world.forestDeerArea && game.world.researchSpecies === "forestDeer" && publicationAt(game) >= game.calendar.now + 12 &&
      fitsFixedPlaces(game, "deerCalving", 2),
    apply(game, issue, id, choice) { researchWait(game, issue, id, choice); return null; } },
  { ids: ["natura-applicable"], role: "base", art: ["research-tracking", "deer-calving"],
    spec: () => ({ family: "deerCalving", component: "wind", species: "forestDeer", mechanism: "calving", count: 2 }),
    eligible: game => game.world.researchSpecies === "forestDeer" && publicationAt(game) <= game.calendar.now &&
      Object.values(game.cases).some(issue => issue.species === "forestDeer" && issue.mechanism === "calving" && issue.fallback === "viable" && restorationPlaces(game, issue).length === 2),
    apply(game, issue, id, choice) { if (choice === "B") researchWait(game, issue, id, choice, true); else resolveCase(issue); return null; } },
  { ids: ["UUSI-P4-KOTKAPAIKAT"], role: "followup", art: ["eagle-territory", "owner-plan"],
    spec: () => ({ family: "goldenTerritory", component: "wind", species: "golden", mechanism: "flight" }),
    eligible: game => Object.values(game.cases).some(issue => canRestoreNature(game, issue, "golden")),
    apply(game, issue, id, choice) {
      if (!canRestoreNature(game, issue, "golden")) throw new Error("No eligible removed golden eagle places");
      if (choice === "A") {
        issue.facts.restorePlaceIds = restorationPlaces(game, issue).join(",");
        schedule(game, issue, id, choice, "EV-KOTKA", { duration: 5, milestone: "proposal", euros: 14000, key: "restoreTwo" });
      } else { issue.facts.restoreDeclined = true; resolveCase(issue); }
      return null;
    } },
];

export const researchOutcomes: Record<string, OutcomeResolver> = {
  "EV-TUTKIMUS": (game, issue, outcome, observation) => {
    if (publicationAt(game) > game.calendar.now) throw new Error("Unpublished public research");
    const species = game.world.researchSpecies;
    if (issue.species !== species) throw new Error("Public research and local case species differ");
    let branch: number;
    if (species === "wolf") {
      branch = outcome.sourceId === "EV-TUTKIMUS" ? 10 : observation < 0.6 ? 8 : 9;
      if (branch === 9) schedule(game, issue, outcome.contentId, null, "EV-TUTKIMUS", { duration: 4, euros: 8000, key: "wolfLocalFollowup", milestone: "proposal" });
      else resolveCase(issue);
    } else if (species === "reindeer") {
      branch = observation < 0.65 ? 6 : 7;
      if (branch === 7) needsCorrection(game, issue); else resolveCase(issue);
    } else {
      const offset = species === "forestDeer" ? 0 : 3;
      issue.facts.restoreEvidence = observation < 0.45;
      const restorable = canRestoreNature(game, issue, species);
      const previouslyReduced = restorationPlaces(game, issue).length > 0 || issue.facts.removedForNature === true;
      if (restorable) {
        branch = offset + 1;
        followup(game, issue, species === "forestDeer" ? "UUSI-P3-14" : "UUSI-P4-KOTKAPAIKAT");
      } else if (previouslyReduced && observation < 0.75) { branch = offset; resolveCase(issue); }
      else { branch = offset + 2; needsCorrection(game, issue); }
    }
    issue.facts.researchAssessed = true;
    return branchId(outcome.contentId, branch);
  },
};
