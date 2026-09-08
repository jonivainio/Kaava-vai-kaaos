import { branchId } from "../content";
import { changeGridRoute, changePlan, excludeAssets } from "../assets";
import { cost, followup, qualityLoss, resolveCase, schedule, workOnly } from "../operations";
import { excludeBattery, permitGoalReached } from "../procedure";
import { finish } from "../endings";
import { sample } from "../world";
import { needsCorrection } from "./nature";
import type { CaseRecord, GameV5 } from "../types";
import type { Rule, OutcomeResolver } from "./types";

export function restartPreparation(game: GameV5, issue: CaseRecord, source: string, months: number): void {
  if (game.procedure.repairRounds >= 2) throw new Error("Preparation repair cannot repeat indefinitely");
  game.procedure.repairRounds++;
  game.procedure.adopted = false; game.procedure.planFinal = false;
  game.procedure.proposalHearingComplete = false; game.procedure.appeal = "none";
  game.procedure.appealDueAt = null;
  issue.facts.blocking = false; issue.facts.violationRepaired = true;
  workOnly(game, issue, source, `prepareAgain:${game.procedure.repairRounds}`, months, 18000, 0);
  resolveCase(issue);
}

export const proposalRules: Rule[] = [
  { ids: ["UUSI-P4-01"], role: "followup", art: ["revised-plan", "ecologist"],
    spec: () => ({ family: "unboundCorrection", component: "shared" }),
    eligible: game => Object.values(game.cases).some(issue => issue.facts.blocking && issue.fallback === "viable" && issue.status !== "ignored"),
    apply(game, issue, id, choice) {
      if (issue.fallback !== "viable" || !issue.facts.blocking) throw new Error("No established correction alternative");
      if (choice === "A") { excludeAssets(game, issue);
        if (issue.family === "naturaBog") changeGridRoute(game, game.run.grid.segments[0]!.km + 4);
        schedule(game, issue, id, choice, "EV-KORJAUS", { duration: 4, milestone: "proposal", euros: 10000 }); }
      else { issue.status = "ignored"; qualityLoss(game, issue, id, "ignoredConclusion", 80, "Todettu haitta jätettiin ratkaisematta."); }
      return null;
    } },
  { ids: ["UUSI-P3-01"], role: "followup", art: ["deer-corridor", "revised-plan"],
    spec: () => ({ family: "yvaDeerLandscape", component: "wind", species: "forestDeer", mechanism: "habitat", count: 3 }),
    eligible: game => game.procedure.yvaConclusion && game.seenIds.includes("draft-done") && game.world.forestDeerArea,
    apply(game, issue, id, choice) { issue.facts.unexaminedCorrection = true; if (choice === "A") excludeAssets(game, issue);
      schedule(game, issue, id, choice, "EV-KORJAUS", { duration: choice === "A" ? 4 : 6, milestone: "proposal", euros: choice === "A" ? 9000 : 15000 }); return null; } },
  { ids: ["UUSI-P4-02", "feedback::noise"], role: "followup", art: ["noise-guarantee", "research-calendar"],
    spec: () => ({ family: "windNoise", component: "wind", mechanism: "noise" }),
    eligible: game => game.cases["case:windNoise"]?.facts.guaranteeMissing === true && !game.cases["case:windNoise"]?.facts.guaranteeFollowupDone,
    apply(game, issue, id, choice) { schedule(game, issue, id, choice, "EV-MELU", { duration: choice === "A" ? 8 : 2, baseline: 2, milestone: "proposal", euros: choice === "A" ? 6500 : 5000, key: "guaranteeFollowup" }); return null; } },
  { ids: ["feedback"], role: "base", art: ["deer-corridor", "solar-corridor"],
    spec: () => ({ family: "deerFence", component: "solar", species: "forestDeer", mechanism: "corridor", hectares: 8 }),
    eligible: game => game.world.forestDeerArea && game.run.mode !== "wind",
    apply(game, issue, id, choice) { if (choice === "A") { excludeAssets(game, issue); issue.fallback = "viable"; workOnly(game, issue, id, "openCorridor", 3, 6000); resolveCase(issue); }
      else schedule(game, issue, id, choice, "EV-LUONTO", { duration: 4, milestone: "proposal", euros: 10000 }); return null; } },
  { ids: ["feedback::herding"], role: "followup", art: ["reindeer-fence", "solar-corridor"],
    spec: () => ({ family: "herdingFence", component: "solar", species: "reindeer", mechanism: "corridor", hectares: 8 }),
    eligible: game => game.world.herdingArea && game.cases["case:herdingFence"]?.facts.fenceCorrectionRequired === true,
    apply(game, issue, id, choice) { if (choice === "A") { excludeAssets(game, issue); issue.facts.removedForNature = true; }
      schedule(game, issue, id, choice, "EV-PORO", { duration: 4, milestone: "proposal", euros: 9000 }); return null; } },
  { ids: ["proposal", "proposal-lake", "proposal-village", "proposal-photo", "proposal::solar-base"], role: "base", art: ["landscape-photo", "village-view"],
    spec: (_game, id) => ({ family: id === "proposal::solar-base" ? "proposalSolarLandscape" : "proposalWindLandscape", component: id === "proposal::solar-base" ? "solar" : "wind", mechanism: "landscape", count: 1, hectares: 8 }),
    eligible: (game, id) => id === "proposal::solar-base" ? game.run.mode !== "wind" : game.run.mode !== "solar",
    apply(game, issue, id, choice) { if (choice === "A") excludeAssets(game, issue);
      schedule(game, issue, id, choice, "EV-MAISEMA", { duration: 3, milestone: "proposal", euros: 5500 }); return null; } },
  { ids: ["leases", "evidence-joint", "evidence-natura"], role: "base", art: ["versioned-map", "noise-contours", "natura-bog"],
    spec: () => ({ family: "changedAssessment", component: "shared", mechanism: "procedure" }),
    eligible: (game, id) => game.planRevision > game.procedure.documentRevision &&
      (id !== "evidence-natura" || game.world.forestDeerArea && game.facts.naturaRequired === true) &&
      (id !== "evidence-joint" || game.world.species === "golden") &&
      (id !== "leases" || Object.values(game.cases).some(issue => issue.facts.relocated === true && issue.placeIds.length === 3)),
    apply(game, issue, id, choice) { issue.facts.directUpdate = choice === "A";
      schedule(game, issue, id, choice, "EV-AJANTASAISUUS", { duration: choice === "A" ? 4 : 2, milestone: "proposal", euros: choice === "A" ? 10000 : 4000 }); return null; } },
  { ids: ["UUSI-P4-03"], role: "base", art: ["versioned-map", "noise-contours"],
    spec: () => ({ family: "wrongCoordinates", component: "shared", mechanism: "noise" }),
    eligible: game => game.planRevision > game.procedure.documentRevision && game.run.mode !== "solar",
    apply(game, issue, id, choice) {
      const cannotReturn = Object.values(game.cases).some(item => item.facts.relocated || item.placeIds.some(placeId => game.run.assets.windSites.find(site => site.id === placeId)?.exclusions.length));
      issue.facts.directUpdate = choice === "A" || cannotReturn;
      if (choice === "B") { issue.facts.returnCompatibilityChecked = true; issue.facts.previousLayoutUnavailable = cannotReturn; }
      schedule(game, issue, id, choice, "EV-AJANTASAISUUS", { duration: choice === "A" ? 3 : cannotReturn ? 5 : 2,
        baseline: 3, milestone: "proposal", euros: choice === "A" ? 6500 : cannotReturn ? 8500 : 3500 }); return null;
    } },
  { ids: ["hearing", "hearing-condition", "UUSI-P4-06"], role: "base", art: ["winter-screen", "owner-plan"],
    spec: () => ({ family: "screeningAgreement", component: "solar", mechanism: "landscape", hectares: 6 }),
    eligible: game => game.run.mode !== "wind" && game.cases["case:solarLandscape"]?.facts.treeAgreement !== true,
    apply(game, issue, id, choice) {
      const agrees = sample(game.run.seed, "screening-owner-acceptance") < 0.65;
      if (choice === "A" && agrees) {
        issue.facts.treeAgreement = true; cost(game, issue, id, "treeCompensation", 9000, "contractLiability");
        schedule(game, issue, id, choice, "EV-LIEVENNYS", { duration: 3, milestone: "proposal", euros: 2500 });
      } else {
        issue.facts.treeAgreement = false;
        schedule(game, issue, id, choice, "EV-MAISEMA", { duration: choice === "A" ? 5 : 3, baseline: 3, milestone: "proposal", euros: 6000 });
      }
      return null;
    } },
  { ids: ["hearing-mitigation", "UUSI-P4-08"], role: "base", art: ["deer-corridor", "natura-bog"],
    spec: () => ({ family: "naturaDeer", component: "wind", species: "forestDeer", mechanism: "corridor", count: 3 }),
    eligible: game => game.world.forestDeerArea && game.facts.naturaRequired === true,
    apply(game, issue, id, choice) {
      if (id === "UUSI-P4-08") issue.facts.protectionBasisStatus = "preparation-confirmed";
      const avoid = id === "hearing-mitigation" ? choice === "A" : choice === "B";
      if (avoid) { excludeAssets(game, issue); issue.fallback = "viable"; }
      schedule(game, issue, id, choice, "EV-NATURA", { duration: 5, milestone: "proposal", euros: 12000 }); return null;
    } },
  { ids: ["UUSI-P4-07"], role: "followup", art: ["natura-bog", "shared-line"],
    spec: () => ({ family: "naturaBog", component: "shared", mechanism: "water" }),
    eligible: game => game.cases["case:naturaBog"]?.facts.significantHarm === true,
    apply(game, issue, id, choice) {
      issue.facts.exceptionConditions = choice === "A";
      if (choice === "B") issue.facts.routeAvoidance = true;
      schedule(game, issue, id, choice, "EV-NATURA", { duration: choice === "A" ? 8 : 5, baseline: 5, milestone: "proposal", euros: choice === "A" ? 18000 : 14000, key: "naturaNextAlternative" }); return null;
    } },
  { ids: ["UUSI-P4-04"], role: "base", art: ["council-door", "minutes"],
    spec: () => ({ family: "closedMeeting", component: "shared", mechanism: "procedure" }), eligible: game => !game.procedure.adopted,
    apply(game, issue, id, choice) {
      issue.facts.presenceViolation = choice === "B";
      if (choice === "B") qualityLoss(game, issue, id, "unauthorizedPresence", 50, "Asiantuntija jäi suljetun kokouksen päätöksentekoon hallintosäännön vastaisesti.");
      resolveCase(issue); return null;
    } },
  { ids: ["UUSI-P4-05"], role: "followup", art: ["court-decision", "revised-plan"],
    spec: () => ({ family: "closedMeeting", component: "shared", mechanism: "procedure" }), eligible: game => game.procedure.appeal === "annulledProcedure",
    apply(game, issue, id, choice) {
      if (choice === "A") restartPreparation(game, issue, id, 14);
      else finish(game, "owner", "LOPPU-OMISTAJA", issue, {}, "choices");
      return null;
    } },
  { ids: ["UUSI-P4-09"], role: "followup", art: ["neighbour-map", "public-appendix"],
    spec: () => ({ family: "changedHearing", component: "wind", mechanism: "noise", count: 1 }),
    eligible: game => game.facts.newNeighbourAffected === true && game.cases["case:changedHearing"]?.facts.proposalWasHeard === true,
    apply(game, issue, id, choice) {
      if (choice === "B") excludeAssets(game, issue);
      const required = choice === "A" || game.facts.otherProposalChanges === true;
      issue.facts.additionalHearingRequired = required;
      if (required) { game.procedure.proposalHearingComplete = false; schedule(game, issue, id, choice, "EV-KUULEMINEN", { duration: 1, euros: 1500, milestone: "proposal" }); }
      else { workOnly(game, issue, id, "hearingNeedCheck", 1, 1500); resolveCase(issue); }
      return null;
    } },
  { ids: ["UUSI-P4-10"], role: "base", art: ["council-chairs", "village-view"],
    spec: () => ({ family: "councilSettlementGroup", component: "wind", mechanism: "landscape", count: 3 }), eligible: game => game.run.mode !== "solar" && !game.procedure.adopted,
    apply(game, issue, id, choice) {
      issue.facts.settlementGroup = true; issue.facts.smallerPrepared = choice === "B";
      if (choice === "B") { excludeAssets(game, issue); workOnly(game, issue, id, "settlementAlternative", 4, 12000); }
      schedule(game, issue, id, choice, "EV-KUNTA", { duration: choice === "B" ? 5 : 2, milestone: "adoption", euros: 3000 }); return null;
    } },
  { ids: ["UUSI-P4-11"], role: "followup", art: ["court-decision", "legal-review"],
    spec: () => ({ family: "evidenceAppeal", component: "shared", mechanism: "procedure" }),
    eligible: game => game.procedure.appeal === "annulledEvidence" && game.facts.supremeAppealBasis === true,
    apply(game, issue, id, choice) {
      if (choice === "A") { game.procedure.appeal = "supreme"; schedule(game, issue, id, choice, "EV-VALITUS", { duration: 16, baseline: 8, euros: 18000, key: "supremeCourt" }); }
      else restartPreparation(game, issue, id, 12);
      return null;
    } },
  { ids: ["UUSI-P4-12"], role: "followup", art: ["permit-folder", "battery-handover"],
    spec: () => ({ family: "permitCompletion", component: "shared", mechanism: "procedure" }),
    eligible: game => game.procedure.adopted && !permitGoalReached(game) && game.battery.status === "included" && game.battery.separable && game.facts.batteryPermitPreparationDelayed === true,
    apply(game, issue, id, choice) { if (choice === "B") excludeBattery(game); game.facts.completePermitApplications = true; resolveCase(issue); return null; } },
];

export const proposalOutcomes: Record<string, OutcomeResolver> = {
  "EV-KORJAUS": (game, issue, outcome, observation) => {
    if (outcome.sourceId === "UUSI-P4-01" && outcome.sourceChoice === "A" && issue.fallback === "viable") { resolveCase(issue); return branchId(outcome.contentId, 0); }
    if (!issue.facts.unexaminedCorrection) throw new Error("Correction result has no studied alternative");
    const branch = observation < 0.6 ? 0 : observation < 0.95 ? 1 : 2;
    if (branch === 0) resolveCase(issue);
    else if (branch === 1) needsCorrection(game, issue);
    else { issue.fallback = "unavailable"; finish(game, "external", "LOPPU-ULKOINEN", issue, { externalReason: "Myös tarkistettu pienempi vaihtoehto jättää hyväksymisen estävän haitan." }, "external"); }
    return branchId(outcome.contentId, branch);
  },
  "EV-NATURA": (game, issue, outcome, observation) => {
    const exception = outcome.sourceId === "UUSI-P4-07" && outcome.sourceChoice === "A";
    let branch: number;
    if (exception) {
      branch = observation < 0.65 ? 4 : 5;
      if (branch === 5) {
        issue.facts.exceptionApplicationPrepared = true;
        workOnly(game, issue, outcome.sourceId, "exceptionApplication", 10, 24000, 5);
        game.procedure.permits.push({ id: "naturaException", component: "shared", required: true, status: "preparing", planRevision: game.planRevision, dueAt: null, finalAt: null });
        // No approval here: the permit procedure must later decide the actual application.
        resolveCase(issue);
      } else needsCorrection(game, issue);
    } else {
      if (issue.species !== "forestDeer" && issue.family !== "naturaBog") throw new Error("Natura result has no named protection basis");
      const fits = issue.fallback === "viable" || issue.facts.routeAvoidance === true || observation < 0.6;
      branch = (issue.family === "naturaBog" ? 2 : 0) + (fits ? 0 : 1);
      if (fits) {
        issue.facts.naturaHarmAvoided = true;
        if (issue.facts.routeAvoidance && !issue.facts.routeAvoidanceApplied) {
          changeGridRoute(game, game.run.grid.segments[0]!.km + 4); issue.facts.routeAvoidanceApplied = true;
        }
        resolveCase(issue);
      }
      else {
        issue.facts.significantHarm = true;
        if (issue.family === "naturaBog" && outcome.sourceId !== "UUSI-P4-07") followup(game, issue, "UUSI-P4-07");
        else needsCorrection(game, issue);
      }
    }
    return branchId(outcome.contentId, branch);
  },
  "EV-AJANTASAISUUS": (game, issue, outcome, observation) => {
    const branch = issue.facts.directUpdate || outcome.sourceId === "EV-AJANTASAISUUS" ? 2 : observation < 0.6 ? 0 : 1;
    if (branch === 1) schedule(game, issue, outcome.contentId, null, "EV-AJANTASAISUUS", { duration: 4, baseline: 2, milestone: "proposal", euros: 10000, key: "necessaryUpdate" });
    else { issue.facts.assessedRevision = game.planRevision; resolveCase(issue); }
    return branchId(outcome.contentId, branch);
  },
  "EV-KUULEMINEN": (game, issue, outcome) => {
    if (!issue.facts.additionalHearingRequired) throw new Error("No municipal decision requiring an additional hearing");
    workOnly(game, issue, outcome.contentId, "additionalHearing", 2, 3500, 0);
    game.facts.extraHearingOrdered = true; resolveCase(issue); return null;
  },
};
