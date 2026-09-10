import { getDerivedStats } from "../../../engine";
import { branchId, branchText } from "../content";
import { changeGridRoute, changePlan, excludeAssets } from "../assets";
import { cost, followup, resolveCase, schedule, workOnly } from "../operations";
import { excludeBattery } from "../procedure";
import { sample } from "../world";
import { finish } from "../endings";
import type { GameV5, CaseRecord } from "../types";
import type { Rule, OutcomeResolver } from "./types";
const wind = (game: Parameters<Rule["eligible"]>[0]) => getDerivedStats(game.run).windCount > 0;
const battery = (game: Parameters<Rule["eligible"]>[0]) => game.battery.status === "included";
function defenceStopsWind(game: GameV5, issue: CaseRecord, event: string, branch: number): string {
  const result = branchId(event, branch);
  game.facts.externalPresented = true;
  issue.fallback = "unavailable";
  finish(game, "external", "LOPPU-ULKOINEN", issue, { externalReason: branchText(event, result) }, "external");
  return result;
}

export const programmeRules: Rule[] = [
  { ids: ["defence"], role: "base", art: ["radar"], spec: () => ({ family: "defence", component: "wind", mechanism: "aviation", count: 4 }),
    eligible: game => wind(game) && !game.facts.defenceRequested,
    apply(game, issue, id, choice) { game.facts.defenceRequested = true; issue.facts.smallerPrepared = choice === "B";
      schedule(game, issue, id, choice, "EV-PV", { duration: choice === "B" ? 3 : 2, euros: choice === "B" ? 5000 : 1000 }); return null; } },
  { ids: ["surveys", "surveys-spring", "surveys-access", "surveys-team"], role: "base", art: ["ecologist", "consultant"],
    spec: () => ({ family: "konsulttitarjous", component: "shared" }), eligible: game => game.facts.ecologyOrdered !== true,
    apply(game, issue, id, choice) { const prices = id === "surveys-access" ? [72000, 49000] : id === "surveys-team" ? [64000, 43000] : [55000, 38000];
      const wait = choice === "A" ? 0 : 12;
      game.facts.ecologyOrdered = true;
      const start = workOnly(game, issue, id, "ecologyStart", wait, 0, 0);
      schedule(game, issue, id, choice, "surveys-wait", { duration: wait, baseline: 0, key: "ecologyBegins", euros: prices[choice === "A" ? 0 : 1]! });
      workOnly(game, issue, id, "ecologyPackage", wait + 4, 0, 4);
      issue.facts.orderId = start; return null;
    } },
  { ids: ["research", "research-gps", "research-cumulative", "research-seasons"], role: "base", art: ["ecologist", "reindeer", "eagle"],
    spec: game => ({ family: "publicResearch", component: "shared", species: game.world.researchSpecies, mechanism: game.world.researchSpecies === "golden" ? "flight" : "habitat" }),
    eligible: game => !game.facts.researchDecision,
    apply(game, issue, id, choice) { game.facts.researchDecision = true; issue.facts.funded = choice === "A";
      if (choice === "A") cost(game, issue, id, "funding", game.world.researchCost);
      // Public publication exists independently of this funding decision; no wait is forced by ordering it.
      issue.facts.publishedAt = game.world.researchPublishedAt + (id === "research-seasons" ? 12 : 0);
      issue.facts.awaitingPublication = true; resolveCase(issue); return null;
    } },
  { ids: ["initiative-rumour"], role: "base", art: ["map", "planner"], spec: () => ({ family: "wrongPublicMap", component: "shared" }), eligible: game => !game.procedure.initiated,
    apply(game, issue, id, choice) { workOnly(game, issue, id, "mapCommunication", choice === "A" ? 0.25 : 0.5, choice === "A" ? 1200 : 1800); game.facts.wrongMapCorrected = true; resolveCase(issue); return null; } },
  { ids: ["initiative-council"], role: "base", art: ["authority"], spec: () => ({ family: "newCouncilIntro", component: "shared" }), eligible: game => !game.procedure.initiated,
    apply(game, issue, id, choice) { const returned = sample(game.run.seed, "council-info-needed") < 0.45;
      workOnly(game, issue, id, "councilMeeting", choice === "A" || returned ? 1 : 0.25, 1500, returned ? 1 : 0.25); resolveCase(issue); return null; } },
  { ids: ["initiative-cottage"], role: "base", art: ["cottage"], spec: () => ({ family: "cottageIntro", component: "shared" }), eligible: game => !game.procedure.initiated,
    apply(game, issue, id, choice) { workOnly(game, issue, id, "cottageMeeting", choice === "A" ? 3 : 0.25, 1000, 0.25); resolveCase(issue); return null; } },
  { ids: ["programme-birds"], role: "base", art: ["osprey"], spec: () => ({ family: "ospreyProgramme", component: "wind", species: "osprey", mechanism: "flight" }),
    eligible: game => wind(game) && game.world.species === "osprey",
    apply(game, issue, id, choice) { const missing = sample(game.run.seed, "osprey-coverage") < 0.45;
      game.facts.ospreyProgrammeCovered = choice === "A" || !missing;
      workOnly(game, issue, id, "ospreyCoverage", choice === "A" ? 4 : missing ? 7 : 3, choice === "A" ? 8000 : missing ? 10000 : 3500, 4);
      resolveCase(issue); return null; } },
  { ids: ["programme-range"], role: "base", art: ["reindeer", "ecologist"], spec: () => ({ family: "deerProgramme", component: "wind", species: "forestDeer", mechanism: "corridor" }), eligible: game => wind(game) && game.world.forestDeerArea,
    apply(game, issue, id, choice) { const sufficient = sample(game.run.seed, "deer-existing-data") < 0.6;
      workOnly(game, issue, id, "deerScope", choice === "A" ? 4 : sufficient ? 2 : 16, choice === "A" ? 15000 : sufficient ? 5000 : 18000, 4);
      game.facts.deerProgrammeCovered = true; resolveCase(issue); return null; } },
  { ids: ["herding-programme"], role: "base", art: ["reindeer", "map"], spec: () => ({ family: "herdingProgramme", component: "shared", species: "reindeer", mechanism: "corridor" }), eligible: game => game.world.herdingArea,
    apply(game, issue, id, choice) { workOnly(game, issue, id, "pastureScope", choice === "A" ? 2 : 3, choice === "A" ? 6000 : 4000, 2); game.facts.herdingRoutesChecked = true; resolveCase(issue); return null; } },
  { ids: ["programme-cumulative", "UUSI-P2-11"], role: "base", art: ["shared-line", "map"], spec: () => ({ family: "neighbourData", component: "shared", mechanism: "noise" }), eligible: wind,
    apply(game, issue, id, choice) { issue.facts.coordinated = choice === "A";
      schedule(game, issue, id, choice, "EV-NAAPURITIETO", { duration: 4, milestone: "programme", euros: choice === "A" ? 7000 : 5000 }); return null; } },
  { ids: ["UUSI-P2-01"], role: "base", art: ["windscape", "documents"], spec: () => ({ family: "yvaSize", component: "wind", count: 5 }), eligible: game => getDerivedStats(game.run).windCount === 9 && !game.procedure.programmeReady,
    apply(game, issue, id, choice) { if (choice === "B") { excludeAssets(game, issue); workOnly(game, issue, id, "yvaDetermination", 2, 4000); game.facts.yvaCaseDeterminationPending = true; } else game.procedure.yvaRequired = true; resolveCase(issue); return null; } },
  { ids: ["UUSI-P2-02"], role: "base", art: ["osprey", "map"], spec: () => ({ family: "ospreyAlternatives", component: "wind", species: "osprey", mechanism: "flight", count: 3 }),
    eligible: game => wind(game) && game.initial.windCount === 20 && game.world.species === "osprey",
    apply(game, issue, id, choice) { if (choice === "A") { excludeAssets(game, issue); issue.fallback = "viable"; workOnly(game, issue, id, "removedRiskPlaces", 3, 6000); resolveCase(issue); }
      else schedule(game, issue, id, choice, "EV-VAIHTOEHDOT", { duration: 4, milestone: "yva", euros: 12000 }); return null; } },
  { ids: ["UUSI-P2-03"], role: "base", art: ["map", "lease-renewal"], spec: () => ({ family: "regionalPlan", component: "wind", count: 3 }), eligible: game => wind(game) && game.world.regionalPlanNeeded,
    apply(game, issue, id, choice) { game.facts.regionalPlanDependency = choice === "A";
      if (choice === "A") game.facts.regionalPlanTarget = game.world.regionalPlanForecast;
      else { excludeAssets(game, issue); workOnly(game, issue, id, "regionalCompatibility", 3, 7000); }
      resolveCase(issue); return null; } },
  { ids: ["UUSI-P2-04"], role: "base", art: ["substation", "shared-line"], spec: () => ({ family: "gridOptions", component: "shared", mechanism: "grid" }),
    eligible: game => game.facts.gridResolved !== true && (game.facts.sharedConnectionChosen !== true || game.facts.sharedConnectionFailed === true),
    apply(game, issue, id, choice) { issue.facts.reserveOrdered = choice === "A"; game.facts.gridOrdered = true;
      schedule(game, issue, id, choice, "EV-VERKKO", { duration: 4, milestone: "programme", euros: choice === "A" ? 22000 : 14000, key: `gridOptions:${issue.rounds}` }); return null; } },
  { ids: ["UUSI-P2-05"], role: "base", art: ["radar", "shared-line"], spec: () => ({ family: "militaryRoute", component: "shared", mechanism: "grid" }), eligible: game => wind(game) && game.facts.defenceAccepted === true && game.world.observations.militaryRouteConflict === 1 &&
      (game.facts.sharedConnectionChosen !== true || game.facts.sharedConnectionFailed === true),
    apply(game, issue, id, choice) { workOnly(game, issue, id, "militaryRoute", choice === "A" ? 4 : 2, choice === "A" ? 8000 : 3500);
      if (choice === "A") changeGridRoute(game, game.run.grid.segments[0]!.km + 3);
      else issue.facts.routeCompatibilityPending = true;
      resolveCase(issue); return null; } },
  { ids: ["UUSI-P2-06"], role: "base", art: ["planner", "documents"], spec: () => ({ family: "draftTiming", component: "shared" }), eligible: game => game.procedure.yvaRequired,
    apply(game, issue, id, choice) { game.facts.draftParallel = choice === "B" && sample(game.run.seed, "draft-parallel-possible") < 0.65;
      game.facts.draftWaitMonths = game.facts.draftParallel ? 0 : 3; resolveCase(issue); return null; } },
  { ids: ["UUSI-P2-07"], role: "base", art: ["reindeer", "map"], spec: () => ({ family: "naturaDeer", component: "wind", species: "forestDeer", mechanism: "corridor", count: 3 }), eligible: game => wind(game) && game.world.forestDeerArea,
    apply(game, issue, id, choice) { game.facts.naturaRequired = true; if (choice === "B") { excludeAssets(game, issue); issue.fallback = "viable"; }
      schedule(game, issue, id, choice, "EV-NATURA", { duration: 6, milestone: "proposal", euros: 16000 }); return null; } },
  { ids: ["UUSI-P2-08"], role: "base", art: ["radar", "windscape"], spec: () => ({ family: "higherDefence", component: "wind", mechanism: "aviation" }),
    eligible: game => wind(game) && game.facts.defenceAccepted === true && game.run.assets.windSites.some(site => !site.exclusions.length && site.totalHeightM < 300),
    apply(game, issue, id, choice) { if (choice === "A") schedule(game, issue, id, choice, "EV-PV", { duration: 3, euros: 3500 }); else resolveCase(issue); return null; } },
  { ids: ["UUSI-P2-09"], role: "base", art: ["frog", "ecologist"], spec: () => ({ family: "coldFrogVisit", component: "solar", species: "frog", mechanism: "water", hectares: 8 }), eligible: game => game.activeMode !== "wind",
    apply(game, issue, id, choice) { if (choice === "B") {
      excludeAssets(game, issue); issue.fallback = "viable";
      workOnly(game, issue, id, "hydrologyExclusionCheck", 1, 2000);
      if (sample(game.run.seed, "cold-frog-exclusion-sufficient") < 0.7) { resolveCase(issue); return null; }
      issue.facts.repeatVisitRequired = true;
    }
      schedule(game, issue, id, choice, "EV-MAASTOKAUSI", { duration: 1, euros: choice === "A" ? 2500 : 2000 }); return null; } },
  { ids: ["UUSI-P2-10"], role: "base", art: ["contract-pages", "eagle"], spec: () => ({ family: "protectedBirdData", component: "shared", species: "golden", mechanism: "flight" }), eligible: game => wind(game) && ["golden", "osprey"].includes(game.world.species),
    apply(game, issue, id, choice) { workOnly(game, issue, id, "publicAndProtectedAppendix", choice === "A" ? 0.25 : 1, choice === "A" ? 800 : 1200); resolveCase(issue); return null; } },
  { ids: ["UUSI-P2-12"], role: "base", art: ["documents", "consultant"], spec: () => ({ family: "agreedWorkProgramme", component: "shared" }), eligible: () => true,
    apply(game, issue, id, choice) { game.facts.procurementPrioritized = choice === "B"; workOnly(game, issue, id, "tenders", 0.25, 600); resolveCase(issue); return null; } },
  { ids: ["BESS-P2-01"], role: "base", art: ["battery-limits"], spec: () => ({ family: "batteryGrid", component: "bess", mechanism: "grid" }), eligible: battery,
    apply(game, issue, id, choice) { issue.facts.ownProductionCharge = choice === "B"; schedule(game, issue, id, choice, "EV-BESS-VERKKO", { duration: 4, milestone: "yva", euros: 6000 }); return null; } },
  { ids: ["BESS-P2-02"], role: "base", art: ["battery-limits"], spec: () => ({ family: "batteryEnergy", component: "bess", mechanism: "equipment" }), eligible: game => battery(game) && game.battery.dischargeMW === 100,
    apply(game, issue, id, choice) { game.battery.energyMWh = choice === "A" ? 200 : 100; game.battery.equipmentRevision++; changePlan(game); workOnly(game, issue, id, "comparableCapacity", 1, 2000); resolveCase(issue); return null; } },
  { ids: ["BESS-P2-03"], role: "base", art: ["battery-limits", "planner"], spec: () => ({ family: "batteryPermitRoute", component: "bess" }), eligible: battery,
    apply(game, issue, id, choice) { workOnly(game, issue, id, "batteryPlanningRoute", choice === "A" ? 2 : 4, choice === "A" ? 3500 : 6500); game.facts.batteryPermitRouteChecked = true; if (choice === "B") { game.facts.batteryCableExtraKm = 1.5; changePlan(game); } resolveCase(issue); return null; } },
  { ids: ["BESS-P2-04"], role: "base", art: ["battery-limits", "documents"], spec: () => ({ family: "batteryAddition", component: "bess" }), eligible: game => game.battery.status === "undecided",
    apply(game, issue, id, choice) { if (choice === "B") excludeBattery(game); else { game.battery.status = "included"; schedule(game, issue, id, choice, "EV-MAA", { duration: 3, euros: 6000 }); workOnly(game, issue, id, "addBatteryProgramme", 2, 4000); } return null; } },
  { ids: ["BESS-P2-05"], role: "base", art: ["battery-limits", "documents"], spec: () => ({ family: "batteryGridModels", component: "bess", mechanism: "equipment" }), eligible: battery,
    apply(game, issue, id, choice) { schedule(game, issue, id, choice, "EV-BESS-TEKNIIKKA", { duration: choice === "A" ? 2 : 4, euros: choice === "A" ? 5000 : 3500 }); return null; } },
];

export const programmeOutcomes: Record<string, OutcomeResolver> = {
  "surveys-wait": (_game, issue) => { resolveCase(issue); return null; },
  "EV-NAAPURITIETO": (game, issue, outcome, observation) => {
    const late = issue.facts.coordinated ? observation >= 0.8 : observation >= 0.4;
    if (late) workOnly(game, issue, outcome.sourceId, "neighbourCalculationUpdate", 2, 6000, issue.facts.coordinated ? 2 : 0);
    game.facts.neighbourDataCurrent = true; resolveCase(issue); return branchId(outcome.contentId, late ? 1 : 0);
  },
  "EV-VERKKO": (game, issue, outcome, observation) => {
    let branch = observation < 0.55 ? 0 : issue.facts.reserveOrdered ? 1 : 2;
    if (game.world.externalId === "external-2" && game.stage >= 3) branch = 3;
    if (branch === 1 || branch === 2) {
      changeGridRoute(game, game.initialRun.grid.segments[0]!.km + 5);
      if (branch === 2) workOnly(game, issue, outcome.sourceId, "reserveGridFollowup", 6, 10000, 0);
      issue.facts.reserveStudied = true;
    }
    game.facts.gridResolved = branch !== 3; resolveCase(issue); return branchId(outcome.contentId, branch);
  },
  "EV-PV": (game, issue, outcome, observation) => {
    if (issue.family === "higherDefence") { resolveCase(issue); return branchId(outcome.contentId, 2); }
    if (game.world.externalId === "EV-PV") return defenceStopsWind(game, issue, outcome.contentId, 3);
    const studyThreshold = game.world.region === "east" ? 0.75 : game.world.region === "lapland" ? 0.45 : 0.3;
    if (game.world.externalId === "EV-VTT-TULOS" || observation < studyThreshold) {
      schedule(game, issue, outcome.contentId, null, "EV-VTT-TULOS", { duration: 6, euros: 15000 });
      return branchId(outcome.contentId, 1);
    }
    game.facts.defenceAccepted = true; resolveCase(issue); return branchId(outcome.contentId, 0);
  },
  "EV-VTT-TULOS": (game, issue, outcome, observation) => {
    if (game.world.externalId === "EV-VTT-TULOS") return defenceStopsWind(game, issue, outcome.contentId, 2);
    const reduced = observation > 0.7;
    if (reduced) { excludeAssets(game, issue); if (!issue.facts.smallerPrepared) workOnly(game, issue, outcome.sourceId, "smallerDefencePlan", 2, 5000, 0); }
    game.facts.defenceAccepted = true; resolveCase(issue); return branchId(outcome.contentId, reduced ? 1 : 0);
  },
  "EV-MAASTOKAUSI": (game, issue, outcome, observation) => {
    // A protected, hydrologically sufficient exclusion does not assert a new field visit succeeded.
    const branch = observation < 0.55 ? 0 : observation < 0.85 ? 1 : 2;
    if (branch > 0) workOnly(game, issue, outcome.sourceId, "frogFollowup", branch === 1 ? 1 : 12, 2500, 1);
    resolveCase(issue); return branchId(outcome.contentId, branch);
  },
  "EV-VAIHTOEHDOT": (game, issue, outcome, observation) => { if (observation < 0.6) resolveCase(issue); else { issue.fallback = "viable"; issue.facts.blocking = true; followup(game, issue, "UUSI-P4-01"); } return branchId(outcome.contentId, observation < 0.6 ? 0 : 1); },
  "EV-BESS-TEKNIIKKA": (game, issue) => { game.battery.technicalData = true; resolveCase(issue); return null; },
  "EV-BESS-VERKKO": (game, issue, outcome, observation) => {
    const alreadyWithinOffer = game.battery.offeredChargeMW !== null && game.battery.offeredDischargeMW !== null &&
      game.battery.chargeMW <= game.battery.offeredChargeMW && game.battery.dischargeMW <= game.battery.offeredDischargeMW;
    const controlled = outcome.sourceId === "BESS-P3-05" && outcome.sourceChoice === "A";
    const ownCharging = outcome.sourceId === "BESS-P2-01" && issue.facts.ownProductionCharge === true;
    const controlFits = controlled && observation < 0.85 || ownCharging && observation < 0.7;
    const branch = alreadyWithinOffer || controlFits || observation < 0.4 ? 0 : observation < 0.8 ? 1 : 2;
    if (controlFits) {
      // This is a restriction of operation, not a physical change of inverter MW or cell MWh.
      // Retain the assessed economic consequence separately from wind generation.
      issue.facts.sharedPowerControlAssessed = controlled;
      issue.facts.ownProductionChargeAssessed = ownCharging;
      game.facts.batteryOperatingRevenueFactor = Math.min(Number(game.facts.batteryOperatingRevenueFactor ?? 1), ownCharging ? 0.75 : 0.9);
      if (ownCharging) game.facts.batteryGridImportLimitMW = 0;
    }
    game.battery.gridStatus = branch === 0 ? "suitable" : branch === 1 ? "limited" : "waiting";
    if (branch === 1) { game.battery.offeredChargeMW = 60; game.battery.offeredDischargeMW = 80; followup(game, issue, "BESS-P4-RAJAUS"); }
    else if (branch === 2) {
      issue.facts.separationDecisionPending = true;
      if (game.battery.separable && game.facts.gridResolved === true) followup(game, issue, "BESS-P4-04");
    }
    else resolveCase(issue);
    return branchId(outcome.contentId, branch);
  },
};
