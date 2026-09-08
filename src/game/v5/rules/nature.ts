import { getDerivedStats } from "../../../engine";
import { branchId } from "../content";
import { changePlan, curtailYield, excludeAssets, restoreAssets, restoreSolar } from "../assets";
import { followup, openCase, resolveCase, schedule, workOnly } from "../operations";
import { sample } from "../world";
import type { CaseRecord, GameV5, Mechanism, Species } from "../types";
import type { Rule, OutcomeResolver } from "./types";

const wind = (game: GameV5) => getDerivedStats(game.run).windCount > 0;
const solar = (game: GameV5) => getDerivedStats(game.run).solarHa > 0;
const speciesAllowed = (game: GameV5, species: Species) =>
  species === "forestDeer" ? game.world.forestDeerArea : species === "reindeer" ? game.world.herdingArea :
    species === "squirrel" ? game.world.squirrelArea : true;

/** A correction belongs to the original case; it cannot create fresh removals. */
export function needsCorrection(game: GameV5, issue: CaseRecord): void {
  issue.fallback = "viable";
  issue.facts.blocking = true;
  followup(game, issue, "UUSI-P4-01");
}

function windNature(ids: string[], family: string, species: Species, mechanism: Mechanism,
  eventId = "EV-LUONTO", removalChoice: "A" | "B" = "A"): Rule {
  return { ids, role: "base", art: species === "golden" ? ["eagle", "eagle-territory"] : species === "osprey" ? ["osprey", "osprey-flight"] :
    species === "forestDeer" ? ["deer-calving", "deer-corridor"] : species === "squirrel" ? ["squirrel-canopy"] : species === "birds" ? ["bird-wetland"] : ["reindeer"],
    spec: () => ({ family, component: "wind", species, mechanism }),
    eligible: game => wind(game) && speciesAllowed(game, species),
    apply(game, issue, id, choice) {
      issue.facts.removalChoice = removalChoice;
      if (choice === removalChoice) {
        excludeAssets(game, issue); issue.facts.removedForNature = true; issue.fallback = "viable";
        // EV-LUONTO relocation prose must never describe a removal as a successful move.
        if (eventId === "EV-LUONTO") { workOnly(game, issue, id, "smallerNatureReview", 3, 6000); resolveCase(issue); }
        else schedule(game, issue, id, choice, eventId, { duration: 4, milestone: "yva", euros: 8000 });
      } else {
        schedule(game, issue, id, choice, eventId, { duration: id === "golden-unknown" ? 10 : 5,
          baseline: 5, milestone: "yva", euros: id === "golden-unknown" ? 24000 : 14000 });
      }
      return null;
    },
  };
}

function solarNature(ids: string[], family: string, species: Species): Rule {
  return { ids, role: "base", art: species === "frog" ? ["frog-pool", "frog-watercourse", "reserve-wetland"] : species === "squirrel" ? ["squirrel-canopy"] : ["bird-wetland", "migrating-birds"],
    spec: () => ({ family, component: "solar", species, mechanism: species === "frog" ? "water" : "habitat" }),
    eligible: game => solar(game) && speciesAllowed(game, species),
    apply(game, issue, id, choice) {
      issue.facts.existingHabitatPreserved = choice === "A";
      if (choice === "A") {
        excludeAssets(game, issue); issue.fallback = "viable"; issue.facts.smallerStudied = true;
        workOnly(game, issue, id, "smallerSolarReview", 3, 6000); resolveCase(issue);
      } else schedule(game, issue, id, choice, "EV-AURINKOLUONTO", { duration: 5, milestone: "proposal", euros: 14000 });
      return null;
    },
  };
}

export function canRestoreNature(game: GameV5, issue: CaseRecord, species: "golden" | "forestDeer"): boolean {
  if (issue.species !== species || (species === "forestDeer" && issue.mechanism !== "calving") ||
    !issue.facts.restoreEvidence || issue.facts.restored || issue.fallback !== "viable") return false;
  return game.run.assets.windSites.filter(site => issue.placeIds.includes(site.id) && site.exclusions.length === 1 && site.exclusions[0] === issue.id).length >= 2;
}

export function restorationPlaces(game: GameV5, issue: CaseRecord): string[] {
  return game.run.assets.windSites.filter(site => issue.placeIds.includes(site.id) && site.exclusions.length === 1 && site.exclusions[0] === issue.id).slice(0, 2).map(site => site.id);
}

export const natureRules: Rule[] = [
  windNature(["nature"], "ospreyFlight", "osprey", "flight"),
  windNature(["golden-known", "golden-unknown", "golden-shared", "UUSI-P3-04"], "goldenTerritory", "golden", "flight", "EV-KOTKA"),
  windNature(["nature-reindeer-calving"], "deerCalving", "forestDeer", "calving"),
  windNature(["UUSI-P3-02"], "deerCalving", "forestDeer", "calving", "EV-LUONTO", "B"),
  windNature(["nature-reindeer-route"], "deerCorridor", "forestDeer", "corridor"),
  windNature(["nature-squirrel"], "squirrelCorridor", "squirrel", "corridor"),
  windNature(["nature-bird-area"], "birdResting", "birds", "habitat"),
  windNature(["herding-pasture"], "herdingCorridor", "reindeer", "corridor", "EV-PORO"),
  windNature(["UUSI-P3-12"], "herdingCorridor", "reindeer", "corridor", "EV-PORO", "B"),
  solarNature(["solarNature", "solar-frog-basin", "solar-pond", "solar-ditch", "solar-water", "nature::solar-base"], "frogWater", "frog"),
  solarNature(["solar-squirrel"], "solarSquirrel", "squirrel"),
  solarNature(["solar-nest-water", "solar-bird-area", "UUSI-P3-03"], "solarBirds", "birds"),
  { ids: ["UUSI-P3-KOSTEIKKO"], role: "followup", art: ["reserve-wetland"],
    spec: () => ({ family: "frogWater", component: "solar", species: "frog", mechanism: "water" }),
    eligible: game => solar(game) && game.facts.wetlandReserveOwned === true && game.world.wetlandSameCatchment &&
      game.world.solarDrainageProblem && game.cases["case:frogWater"]?.fallback === "viable" && game.cases["case:frogWater"]?.facts.smallerStudied === true,
    apply(game, issue, id, choice) {
      if (choice === "A") schedule(game, issue, id, choice, "EV-KOSTEIKKO", { duration: 5, milestone: "proposal", euros: 16000 });
      else { excludeAssets(game, issue); resolveCase(issue); }
      return null;
    } },
  { ids: ["UUSI-P3-14"], role: "followup", art: ["deer-calving", "owner-plan"],
    spec: () => ({ family: "deerCalving", component: "wind", species: "forestDeer", mechanism: "calving" }),
    eligible: game => Object.values(game.cases).some(issue => canRestoreNature(game, issue, "forestDeer")),
    apply(game, issue, id, choice) {
      if (!canRestoreNature(game, issue, "forestDeer")) throw new Error("No two eligible calving places to restore");
      if (choice === "A") {
        issue.facts.restorePlaceIds = restorationPlaces(game, issue).join(",");
        schedule(game, issue, id, choice, "EV-LUONTO", { duration: 4, milestone: "proposal", euros: 11000, key: "restoreTwo" });
      }
      else { issue.facts.restoreDeclined = true; resolveCase(issue); }
      return null;
    } },
  { ids: ["solarNature::wind", "UUSI-P3-05"], role: "followup", art: ["squirrel-canopy", "map"],
    spec: () => ({ family: "squirrelCorridor", component: "wind", species: "squirrel", mechanism: "corridor", count: 1 }),
    eligible: game => game.world.squirrelArea && game.cases["case:squirrelInfrastructure"]?.facts.infrastructureMissed === true,
    apply(game, issue, id, choice) {
      issue.facts.infrastructureMissed = false;
      if (choice === "A") schedule(game, issue, id, choice, "EV-LUONTO", { duration: 3, milestone: "yva", euros: 6500, key: "infrastructureRevision" });
      else { excludeAssets(game, issue); issue.fallback = "viable"; workOnly(game, issue, id, "wholeSiteRemoval", 1, 1500); resolveCase(issue); }
      return null;
    } },
  { ids: ["UUSI-P3-08"], role: "base", art: ["bat-night"],
    spec: () => ({ family: "batActivity", component: "wind", species: "bat", mechanism: "habitat", count: 2 }), eligible: wind,
    apply(game, issue, id, choice) {
      if (choice === "A") { workOnly(game, issue, id, "batOperatingConditions", 3, 8000); curtailYield(game, issue.id, issue.placeIds, 0.025); resolveCase(issue); }
      else schedule(game, issue, id, choice, "EV-LUONTO", { duration: 5, milestone: "yva", euros: 13000 });
      return null;
    } },
  { ids: ["solarWater::wind", "UUSI-P3-13"], role: "base", art: ["natura-bog", "shared-line"],
    spec: () => ({ family: "naturaBog", component: "shared", mechanism: "water" }), eligible: () => true,
    apply(game, issue, id, choice) {
      game.facts.naturaRequired = true;
      issue.facts.routeAvoidance = choice === "A";
      schedule(game, issue, id, choice, "EV-NATURA", { duration: choice === "A" ? 7 : 5, milestone: "proposal", euros: choice === "A" ? 22000 : 14000 });
      return null;
    } },
];

function natureBranch(issue: CaseRecord): number {
  if (issue.species === "osprey" && issue.mechanism === "flight") return 0;
  if (issue.species === "forestDeer" && issue.mechanism === "calving") return 2;
  if (issue.species === "forestDeer" && issue.mechanism === "corridor") return 4;
  if (issue.species === "squirrel") return 6;
  if (issue.species === "birds") return 8;
  if (issue.species === "bat") return 10;
  throw new Error(`Wrong species/mechanism for EV-LUONTO: ${issue.id}`);
}

export const natureOutcomes: Record<string, OutcomeResolver> = {
  "EV-LUONTO": (game, issue, outcome, observation) => {
    if (outcome.sourceId === "UUSI-P3-14") {
      const requested = String(issue.facts.restorePlaceIds ?? "").split(",");
      const compatible = canRestoreNature(game, issue, "forestDeer") && requested.length === 2 &&
        requested.every(id => restorationPlaces(game, issue).includes(id)) &&
        (issue.facts.otherRestoreEffectsClear === true || observation < 0.7);
      if (compatible) { restoreAssets(game, String(issue.facts.restorePlaceIds).split(","), issue.id); issue.facts.restored = true; }
      resolveCase(issue); return branchId(outcome.contentId, compatible ? 12 : 13);
    }
    const offset = natureBranch(issue);
    const fits = observation < 0.4;
    if (fits) { changePlan(game); issue.facts.relocated = true; resolveCase(issue); }
    else needsCorrection(game, issue);
    if (fits && issue.family === "squirrelCorridor" && !issue.facts.infrastructureChecked) {
      issue.facts.infrastructureChecked = true;
      if (sample(game.run.seed, "squirrel-infrastructure-missed") < 0.4) {
        const id = sample(game.run.seed, "infrastructure-presentation") < 0.5 ? "UUSI-P3-05" : "solarNature::wind";
        const infrastructure = openCase(game, id, { family: "squirrelInfrastructure", component: "wind", species: "squirrel", mechanism: "corridor", count: 1 });
        infrastructure.placeIds = issue.placeIds.slice(0, 1);
        infrastructure.facts.infrastructureMissed = true;
        followup(game, infrastructure, id);
      }
    }
    // A narrowed calving observation is tied to this case, not a generic capacity bonus.
    if (issue.species === "forestDeer" && issue.mechanism === "calving") issue.facts.restoreEvidence = sample(game.run.seed, `${issue.id}:refinedArea`) < 0.45;
    return branchId(outcome.contentId, offset + (fits ? 0 : 1));
  },
  "EV-KOTKA": (game, issue, outcome, observation) => {
    if (issue.species !== "golden") throw new Error("Golden eagle result requires its territory");
    if (outcome.sourceId === "UUSI-P4-KOTKAPAIKAT") {
      const requested = String(issue.facts.restorePlaceIds ?? "").split(",");
      const fits = canRestoreNature(game, issue, "golden") && requested.length === 2 &&
        requested.every(id => restorationPlaces(game, issue).includes(id)) &&
        (issue.facts.otherRestoreEffectsClear === true || observation < 0.65);
      if (fits) { restoreAssets(game, String(issue.facts.restorePlaceIds).split(","), issue.id); issue.facts.restored = true; }
      resolveCase(issue); return branchId(outcome.contentId, fits ? 2 : 3);
    }
    const fits = issue.facts.removedForNature === true || observation < 0.4;
    if (fits) { issue.fallback = "viable"; resolveCase(issue); } else needsCorrection(game, issue);
    return branchId(outcome.contentId, fits ? 0 : 1);
  },
  "EV-PORO": (game, issue, outcome, observation) => {
    if (!game.world.herdingArea || issue.species !== "reindeer") throw new Error("Herding outcome outside herding area");
    const fits = issue.facts.removedForNature === true || observation < 0.6;
    if (fits) resolveCase(issue); else needsCorrection(game, issue);
    return branchId(outcome.contentId, fits ? 0 : 1);
  },
  "EV-AURINKOLUONTO": (game, issue, outcome, observation) => {
    const offset = issue.species === "frog" ? 0 : issue.species === "squirrel" ? 2 : issue.species === "birds" ? 4 : -1;
    if (offset < 0 || issue.component !== "solar") throw new Error("Wrong solar ecology case");
    const fits = observation < 0.65;
    if (!fits) { excludeAssets(game, issue); issue.fallback = "viable"; issue.facts.smallerStudied = true; }
    else { issue.facts.existingHabitatPreserved = true; changePlan(game); }
    resolveCase(issue);
    return branchId(outcome.contentId, offset + (fits ? 0 : 1));
  },
  "EV-KOSTEIKKO": (game, issue, outcome) => {
    if (outcome.sourceId !== "UUSI-P3-KOSTEIKKO" || !game.facts.wetlandReserveOwned || !game.world.wetlandSameCatchment || issue.species !== "frog" || !issue.facts.smallerStudied) throw new Error("Wetland solution without established hydrology and fallback");
    if (!issue.facts.wetlandBenefitApplied) {
      restoreSolar(game, issue.parcelIds.slice(0, Math.max(1, Math.floor(issue.parcelIds.length * 0.6))), issue.id);
      issue.facts.wetlandBenefitApplied = true;
    }
    issue.facts.existingHabitatPreserved = true;
    game.facts.wetlandMustOperateBeforeDrainage = true;
    resolveCase(issue); return null;
  },
};
