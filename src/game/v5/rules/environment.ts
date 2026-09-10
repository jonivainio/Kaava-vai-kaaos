import { getDerivedStats } from "../../../engine";
import { branchId } from "../content";
import { changePlan, changeTurbines, curtailYield, excludeAssets } from "../assets";
import { cost, followup, queueScene, resolveCase, schedule, workOnly } from "../operations";
import { sample } from "../world";
import type { GameV5 } from "../types";
import type { Rule, OutcomeResolver } from "./types";

const wind = (game: GameV5) => getDerivedStats(game.run).windCount > 0;
const solar = (game: GameV5) => getDerivedStats(game.run).solarHa > 0;

function waterRule(ids: string[], family: string, postcare = false): Rule {
  return { ids, role: "base", art: postcare ? ["postcare-basin", "water-sampling"] : ["stormwater", "water-section"],
    spec: () => ({ family, component: "solar", mechanism: "water" }), eligible: solar,
    apply(game, issue, id, choice) {
      issue.facts.postcare = postcare;
      if (choice === "A") {
        excludeAssets(game, issue); issue.fallback = "viable";
        workOnly(game, issue, id, "retainedBasin", 2, 5000); resolveCase(issue);
      } else schedule(game, issue, id, choice, "EV-VESI", { duration: postcare ? 7 : 4, milestone: "yva", euros: postcare ? 18000 : 10000 });
      return null;
    } };
}

export const environmentRules: Rule[] = [
  { ids: ["noise", "noise-neighbour-model", "noise-neighbour-layout", "noise-joint", "UUSI-P3-10"], role: "base",
    art: ["noise-contours", "noise-guarantee", "consultant"],
    spec: () => ({ family: "windNoise", component: "wind", mechanism: "noise" }), eligible: game => wind(game) && !game.facts.nightNoiseCorrected,
    apply(game, issue, id, choice) {
      issue.facts.noiseMode = choice === "B";
      schedule(game, issue, id, choice, "EV-MELU", { duration: choice === "A" ? 4 : 3, milestone: "yva", euros: choice === "A" ? 12000 : 8000 });
      return null;
    } },
  { ids: ["height", "height-ground", "height-approach", "height-ridge"], role: "base", art: ["aviation-section", "ridge-turbines"],
    spec: () => ({ family: "aviation", component: "wind", mechanism: "aviation" }), eligible: wind,
    apply(game, issue, id, choice) {
      issue.facts.currentPositions = choice === "A";
      schedule(game, issue, id, choice, "EV-ILMAILU", { duration: choice === "A" ? 4 : 5, euros: choice === "A" ? 9000 : 12000 });
      return null;
    } },
  waterRule(["solarWater", "solar-postcare"], "peatPostcare", true),
  waterRule(["solar-required-wetland"], "compactBasin"),
  waterRule(["solar-rain", "solar-drain", "solar-snow", "height::solar-base"], "solarStormwater"),
  { ids: ["solar-view-road", "solar-view-winter", "solar-view-edge", "noise::solar-base"], role: "base", art: ["solar-window", "winter-screen"],
    spec: () => ({ family: "solarLandscape", component: "solar", mechanism: "landscape", hectares: 6 }), eligible: solar,
    apply(game, issue, id, choice) {
      if (choice === "A") {
        excludeAssets(game, issue); issue.facts.treeAgreement = true;
        cost(game, issue, id, "screeningTrees", 6000, "contractLiability");
        schedule(game, issue, id, choice, "EV-LIEVENNYS", { duration: 2, euros: 2000 });
      } else {
        issue.facts.lowerPlacement = true;
        schedule(game, issue, id, choice, "EV-MAISEMA", { duration: 3, milestone: "yva", euros: 7000 });
      }
      return null;
    } },
  { ids: ["UUSI-P3-06"], role: "followup", art: ["stormwater", "solar-window"],
    spec: () => ({ family: "solarLandscape", component: "solar", mechanism: "landscape", hectares: 6 }),
    eligible: game => game.cases["case:solarLandscape"]?.facts.lowerPlacement === true && game.cases["case:solarLandscape"]?.facts.lowerFlooding === true,
    apply(game, issue, id, choice) {
      if (choice === "A") { issue.facts.postcare = false; schedule(game, issue, id, choice, "EV-VESI", { duration: 4, milestone: "proposal", euros: 9000 }); }
      else { issue.facts.lowerPlacement = false; issue.facts.lowerFlooding = false; issue.facts.treeAgreement = true;
        excludeAssets(game, issue); cost(game, issue, id, "screeningTrees", 6000, "contractLiability");
        schedule(game, issue, id, choice, "EV-LIEVENNYS", { duration: 2, euros: 2000 }); }
      return null;
    } },
  { ids: ["opinions", "opinions-photo"], role: "base", art: ["landscape-photo", "village-meeting"],
    spec: () => ({ family: "missingView", component: "wind", mechanism: "landscape", count: 1 }), eligible: wind,
    apply(game, issue, id, choice) {
      issue.facts.feedbackKind = "view";
      schedule(game, issue, id, choice, "EV-PALAUTE", { duration: id === "opinions-photo" && choice === "B" ? 3 : 2, baseline: 2,
        milestone: "yva", euros: choice === "A" ? 4500 : 3000 }); return null;
    } },
  { ids: ["opinions-club"], role: "base", art: ["observation-map", "ecologist"],
    spec: () => ({ family: "associationObservation", component: "shared", mechanism: "habitat" }), eligible: () => true,
    apply(game, issue, id, choice) {
      issue.facts.feedbackKind = "species"; issue.facts.visitOrdered = choice === "A";
      schedule(game, issue, id, choice, "EV-PALAUTE", { duration: choice === "A" ? 3 : 1, milestone: "yva", euros: choice === "A" ? 5000 : 1200 }); return null;
    } },
  { ids: ["opinions-noise"], role: "base", art: ["noise-contours", "public-appendix"],
    spec: () => ({ family: "missingNoiseAppendix", component: "shared", mechanism: "noise" }), eligible: game => wind(game) && game.facts.neighbourDataCurrent === true,
    apply(game, issue, id, choice) { issue.facts.feedbackKind = "noise";
      schedule(game, issue, id, choice, "EV-PALAUTE", { duration: choice === "A" ? 1 : 0.25, milestone: "yva", euros: choice === "A" ? 2000 : 600 }); return null; } },
  { ids: ["herding-opinions"], role: "base", art: ["reindeer-fence"],
    spec: () => ({ family: "herdingFence", component: "solar", species: "reindeer", mechanism: "corridor", hectares: 8 }), eligible: game => solar(game) && game.world.herdingArea,
    apply(game, issue, id, choice) { issue.facts.feedbackKind = "herding";
      schedule(game, issue, id, choice, "EV-PALAUTE", { duration: 3, milestone: "yva", euros: choice === "A" ? 5000 : 4000 }); return null; } },
  { ids: ["UUSI-P3-07"], role: "base", art: ["tar-pit", "survey-marker"],
    spec: () => ({ family: "archaeology", component: "shared", mechanism: "land" }), eligible: () => true,
    apply(game, issue, id, choice) { workOnly(game, issue, id, "avoidArchaeology", choice === "A" ? 2 : 3, choice === "A" ? 4500 : 5500); game.facts.archaeologyAvoided = true; changePlan(game); resolveCase(issue); return null; } },
  { ids: ["UUSI-P3-09"], role: "base", art: ["winter-view", "landscape-photo"],
    spec: () => ({ family: "winterWindLandscape", component: "wind", mechanism: "landscape", count: 1 }), eligible: wind,
    apply(game, issue, id, choice) {
      if (choice === "B") excludeAssets(game, issue);
      schedule(game, issue, id, choice, "EV-MAISEMA", { duration: 3, milestone: "yva", euros: 5500 }); return null;
    } },
  { ids: ["UUSI-P3-11"], role: "base", art: ["border-river", "landscape-photo"],
    spec: () => ({ family: "internationalHearing", component: "wind", mechanism: "landscape", count: 2 }), eligible: game => wind(game) && game.world.borderEffects,
    apply(game, issue, id, choice) {
      issue.facts.smallerComparison = choice === "B";
      workOnly(game, issue, id, "crossBorderAssessment", choice === "A" ? 4 : 5, choice === "A" ? 12000 : 16000, 4);
      // A comparison is not an adopted removal, and an international view is not a veto.
      resolveCase(issue); return null;
    } },
  { ids: ["P3-SOPIMUS"], role: "followup", art: ["owner-plan", "contract-pages"],
    spec: game => ({ family: "vuokraehdot", component: game.world.landComponent, mechanism: "land" }),
    eligible: game => game.seenIds.includes("contract-callback") && game.cases["case:vuokraehdot"]?.facts.specialTerms === true,
    apply(game, issue, id, choice) {
      if (choice === "A") cost(game, issue, id, "threeOwnerIncrease", 24000, "contractLiability");
      else game.facts.expansionOwnersReluctant = true;
      resolveCase(issue); return null;
    } },
];

export const environmentOutcomes: Record<string, OutcomeResolver> = {
  "EV-ILMAILU": (game, issue, outcome, observation) => {
    if (issue.mechanism !== "aviation" || issue.component !== "wind") throw new Error("Wrong aviation case");
    const current = issue.facts.currentPositions === true;
    const branch = observation < 0.55 ? current ? 0 : 1 : observation < 0.85 ? 2 : 3;
    if (branch === 1) {
      changePlan(game); workOnly(game, issue, outcome.sourceId, "replacementChecks", 3, 7000);
      if (outcome.sourceId === "height-ridge") curtailYield(game, issue.id, issue.placeIds, 0.08);
    }
    if (branch === 2) {
      changeTurbines(game, issue.placeIds, "F8", 270);
      workOnly(game, issue, outcome.sourceId, "targetedHeightReview", 3, 6000);
    }
    if (branch === 3) excludeAssets(game, issue);
    issue.facts.aviationPrestudyComplete = true; resolveCase(issue);
    return branchId(outcome.contentId, branch);
  },
  "EV-MELU": (game, issue, outcome, observation) => {
    if (issue.family !== "windNoise") throw new Error("Wrong wind noise case");
    const guarantee = ["UUSI-P4-02", "feedback::noise"].includes(outcome.sourceId);
    let branch: number;
    if (guarantee) {
      branch = outcome.sourceChoice === "B" ? 6 : observation < 0.6 ? 5 : 7;
      issue.facts.guaranteeFollowupDone = true;
      if (branch === 7) {
        // No second wait for the same missing warranty: commit the already documented fallback.
        issue.facts.documentedModeRequired = true;
        schedule(game, issue, outcome.contentId, null, "EV-MELU", { duration: 2, euros: 5000,
          key: "documentedFallback", branchId: branchId("EV-MELU", 6) });
      }
    } else if (outcome.branchId === branchId("EV-MELU", 6)) branch = 6;
    else if (issue.facts.noiseMode) branch = observation < 0.6 ? 3 : 4;
    else branch = observation < 0.65 ? 0 : game.facts.layoutTightened === true ? 1 : 2;
    if ([3, 5, 6].includes(branch)) { curtailYield(game, issue.id, issue.placeIds, branch === 6 ? 0.12 : 0.06); resolveCase(issue); game.facts.nightNoiseCorrected = true; }
    if (branch === 0) { changePlan(game); workOnly(game, issue, outcome.sourceId, "relocationOtherEffects", 2, 5000); resolveCase(issue); game.facts.nightNoiseCorrected = true; }
    if (branch === 1 || branch === 2) {
      excludeAssets(game, issue); workOnly(game, issue, outcome.sourceId, "smallerNoiseCalculation", 2, 5000); resolveCase(issue); game.facts.nightNoiseCorrected = true;
    }
    if (branch === 4) {
      issue.facts.guaranteeMissing = true; issue.facts.blocking = true;
      if (!game.seenIds.includes("noise-statement")) queueScene(game, "noise-statement", issue);
      followup(game, issue, sample(game.run.seed, "noise-guarantee-presentation") < 0.5 ? "UUSI-P4-02" : "feedback::noise");
    }
    return branchId(outcome.contentId, branch);
  },
  "EV-VESI": (game, issue, outcome, observation) => {
    const fits = observation < 0.65;
    if (!fits) excludeAssets(game, issue);
    else { issue.facts.waterSolutionDesigned = true; changePlan(game); }
    if (issue.facts.postcare && fits && !game.procedure.permits.some(permit => permit.id === "waterTreatmentChange")) {
      game.procedure.permits.push({ id: "waterTreatmentChange", component: "solar", required: true, status: "needed", planRevision: game.planRevision, dueAt: null, finalAt: null });
    }
    issue.facts.lowerFlooding = false; resolveCase(issue);
    return branchId(outcome.contentId, (issue.facts.postcare ? 2 : 0) + (fits ? 0 : 1));
  },
  "EV-PALAUTE": (game, issue, outcome, observation) => {
    const kind = issue.facts.feedbackKind;
    let branch: number;
    if (kind === "view") {
      branch = observation < 0.6 ? 0 : 1;
      if (branch === 1) { issue.facts.landscapeChangeRequired = true; followup(game, issue, game.activeMode==='solar' ? 'proposal::solar-base' : "proposal"); }
      else resolveCase(issue);
    } else if (kind === "species") {
      branch = observation < 0.5 ? 2 : 3;
      if (branch === 3 && !issue.facts.visitOrdered) workOnly(game, issue, outcome.sourceId, "specificObservationVisit", 3, 5000, 0);
      resolveCase(issue);
    } else if (kind === "noise") {
      if (!game.facts.neighbourDataCurrent) throw new Error("Missing actual cumulative noise appendix");
      branch = 4; resolveCase(issue);
    } else if (kind === "herding" && game.world.herdingArea) {
      branch = 5; issue.facts.fenceCorrectionRequired = true; followup(game, issue, "feedback::herding");
    } else throw new Error("Feedback cannot select an unrelated issue");
    return branchId(outcome.contentId, branch);
  },
  "EV-MAISEMA": (game, issue, outcome, observation) => {
    const alreadyExcluded = issue.component === "wind" ? issue.placeIds.every(id => game.run.assets.windSites.find(site => site.id === id)?.exclusions.length) :
      issue.parcelIds.every(id => game.run.assets.solarParcels.find(parcel => parcel.id === id)?.exclusions.length);
    const fits = alreadyExcluded || observation < 0.65;
    if (!fits) excludeAssets(game, issue);
    if (issue.facts.lowerPlacement && sample(game.run.seed, "lower-solar-hydrology") < 0.55) {
      issue.facts.lowerFlooding = true; followup(game, issue, "UUSI-P3-06");
    } else resolveCase(issue);
    return branchId(outcome.contentId, (issue.component === "solar" ? 2 : 0) + (fits ? 0 : 1));
  },
  "EV-LIEVENNYS": (_game, issue) => {
    if (!issue.facts.treeAgreement) throw new Error("No actual tree retention agreement");
    resolveCase(issue); return null;
  },
};
