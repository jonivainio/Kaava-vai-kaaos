import { branchId } from "../content";
import { changePlan, excludeAssets } from "../assets";
import { cost, followup, resolveCase, schedule, workOnly } from "../operations";
import { excludeBattery } from "../procedure";
import { sample } from "../world";
import type { Rule, OutcomeResolver } from "./types";

const always = () => true;
export const landRules: Rule[] = [
  {
    ids: ["land", "land-signing", "land-index", "land-minimum"], role: "base", art: ["landowner", "owner-plan"],
    spec: game => ({ family: "vuokraehdot", component: game.world.landComponent, mechanism: "land", count: 2, hectares: 12 }), eligible: always,
    apply(game, issue, id, choice) {
      if (choice === "A") {
        issue.facts.contractConfirmed = true;
        issue.facts.specialTerms = true;
        issue.facts.informedOthers = sample(game.run.seed, "special-terms-spread") < 0.65;
        cost(game, issue, id, "special-terms", id === "land-signing" ? 12000 : 18000, id === "land-signing" ? "development" : "contractLiability");
        if (issue.facts.informedOthers) schedule(game, issue, id, choice, "contract-callback", { duration: 8, milestone: "yva" });
        else resolveCase(issue);
        return null;
      }
      resolveCase(issue);
      if (game.world.ownersAgree) { issue.facts.contractConfirmed = true; return branchId(id, 0, "B"); }
      issue.facts.refused = true;
      if (issue.component === "solar") { excludeAssets(game, issue); return branchId(id, 2, "B"); }
      game.facts.layoutTightened = true;
      issue.facts.shiftSpaceLost = true;
      changePlan(game);
      return branchId(id, 1, "B");
    },
  },
  { ids: ["road"], role: "base", art: ["map", "contract-pages"], spec: () => ({ family: "contractMap", component: "shared", mechanism: "land" }), eligible: always,
    apply(game, issue, id, choice) { workOnly(game, issue, id, choice === "A" ? "singleMap" : "mapTemplate", 0.25, choice === "A" ? 500 : 1800); game.facts.contractMapChecked = choice === "B"; resolveCase(issue); return null; } },
  { ids: ["land-map-versions"], role: "base", art: ["contract-pages"], spec: () => ({ family: "missingPages", component: "wind", mechanism: "land", count: 1 }), eligible: always,
    apply(game, issue, id, choice) { issue.facts.skipSigning = choice === "B"; schedule(game, issue, id, choice, choice === "A" ? "EV-SOPIMUSSIVUT" : "EV-MAA", { duration: 2, euros: 800 }); return null; } },
  { ids: ["land-area-explained"], role: "base", art: ["owner-plan"], spec: () => ({ family: "promisedTurbine", component: "wind", mechanism: "land", count: 1 }), eligible: always,
    apply(game, issue, id, choice) { issue.facts.disputed = true; schedule(game, issue, id, choice, "EV-VOIMALALUPAUS", { duration: 2, euros: choice === "A" ? 1500 : 3500 }); return null; } },
  { ids: ["UUSI-P1-MAARIITA"], role: "followup", art: ["owner-plan", "contract-pages"], spec: () => ({ family: "promisedTurbine", component: "wind", mechanism: "land", count: 1 }),
    eligible: game => game.cases["case:promisedTurbine"]?.facts.disputed === true,
    apply(game, issue, id, choice) {
      if (choice === "A") { issue.facts.terminated = true; issue.facts.disputed = false; game.facts.layoutTightened = true; workOnly(game, issue, id, "replacement", 2, 5000); resolveCase(issue); }
      else schedule(game, issue, id, choice, "EV-MAARIITA", { duration: 5, baseline: 2, euros: 8000 });
      return null;
    } },
  { ids: ["land-meetings"], role: "base", art: ["landowner"], spec: () => ({ family: "landMeeting", component: "shared" }), eligible: always,
    apply(game, issue, id, choice) { workOnly(game, issue, id, "communication", choice === "A" ? 1 : 0.25, choice === "A" ? 900 : 600); resolveCase(issue); return null; } },
  { ids: ["UUSI-P1-01"], role: "base", art: ["contract-pages"], spec: () => ({ family: "jointOwners", component: "wind", mechanism: "land", count: 1 }), eligible: always,
    apply(game, issue, id, choice) { issue.facts.skipSigning = false; schedule(game, issue, id, choice, "EV-MAA", { duration: choice === "A" ? 2 : 4, euros: 1000 }); return null; } },
  { ids: ["UUSI-P1-03"], role: "base", art: ["lease-renewal"], spec: () => ({ family: "leaseDeadline", component: "shared", mechanism: "land" }), eligible: game => !game.leases.length,
    apply(game, issue, id, choice) {
      const deadline = choice === "A" ? 84 : 60;
      const holdings = [...game.run.assets.windSites.map(site => site.id), ...game.run.assets.solarParcels.map(parcel => parcel.id)];
      for (let i = 0; i < 3; i++) game.leases.push({ id: `lease:${i}`, parcelIds: holdings.filter((_, index) => index % 3 === i), ownerIds: [`owner:${i}`], essential: true,
        developmentDeadline: deadline, extensionDeadline: null, extensionOffered: null, response: null, status: "valid", forecastWarned: false, rights: ["wind", "solar", "route"] });
      cost(game, issue, id, "term", choice === "A" ? 16000 : 5000, "contractLiability"); resolveCase(issue); return null;
    } },
  { ids: ["UUSI-P1-04"], role: "base", art: ["shared-line"], spec: () => ({ family: "sharedConnection", component: "shared", mechanism: "grid" }), eligible: always,
    apply(game, issue, id, choice) {
      game.facts.sharedConnectionChosen = choice === "A";
      if (choice === "A") schedule(game, issue, id, choice, "EV-YHTEISASEMA", { duration: 6, baseline: 3, milestone: "yva", euros: 18000, avoidableCost: true, observation: "0" });
      else { workOnly(game, issue, id, "ownRoute", 3, 6000); game.facts.ownRouteStarted = true; resolveCase(issue); }
      return null;
    } },
  { ids: ["UUSI-P1-05"], role: "base", art: ["contract-pages", "map"], spec: () => ({ family: "priority", component: "wind", mechanism: "land", count: 1 }), eligible: always,
    apply(game, issue, id, choice) { issue.facts.skipSigning = choice === "B"; schedule(game, issue, id, choice, choice === "A" ? "EV-ETUSIJA" : "EV-MAA", { duration: 3, euros: 3500 }); return null; } },
  { ids: ["UUSI-P1-06"], role: "base", art: ["reserve-wetland"], spec: () => ({ family: "wetlandReserve", component: "shared", mechanism: "water" }), eligible: game => game.run.mode !== "wind",
    apply(game, issue, id, choice) { game.facts.wetlandReserveOwned = choice === "A"; if (choice === "A") cost(game, issue, id, "purchase", 9000, "landPurchase"); resolveCase(issue); return null; } },
  { ids: ["UUSI-P1-07"], role: "base", art: ["map"], spec: () => ({ family: "accessRoute", component: "shared", mechanism: "land" }), eligible: always,
    apply(game, issue, id, choice) { issue.facts.routeAlternative = choice === "B"; schedule(game, issue, id, choice, "EV-MAA", { duration: choice === "A" ? 2 : 4, euros: choice === "A" ? 3000 : 7000 }); return null; } },
  { ids: ["UUSI-P1-08"], role: "base", art: ["map", "owner-plan"], spec: () => ({ family: "routeReserve", component: "shared", mechanism: "land" }), eligible: always,
    apply(game, issue, id, choice) { game.facts.routeReserve = choice === "A"; if (choice === "A") cost(game, issue, id, "routeRights", 8000, "contractLiability"); resolveCase(issue); return null; } },
  { ids: ["UUSI-P1-09"], role: "base", art: ["ecologist", "substation"], spec: () => ({ family: "studyOrder", component: "shared", mechanism: "grid" }), eligible: game => game.facts.ecologyOrdered !== true && game.facts.gridOrdered !== true,
    apply(game, issue, id, choice) {
      const duration = choice === "A" ? 4 : 2 + Math.floor(sample(game.run.seed, "first-grid-duration") * 7);
      game.facts.ecologyOrdered = choice === "A"; game.facts.gridOrdered = choice === "B";
      issue.facts.ecologyFirst = choice === "A";
      schedule(game, issue, id, choice, "EV-SELVITYSJARJESTYS", { duration, euros: choice === "A" ? 55000 : 18000, observation: String(sample(game.run.seed, "first-grid-replacement")) });
      return null;
    } },
  { ids: ["BESS-P1-01"], role: "base", art: ["battery-limits", "contract-pages"], spec: () => ({ family: "batteryLand", component: "bess", mechanism: "land" }), eligible: game => game.battery.status === "undecided",
    apply(game, issue, id, choice) { if (choice === "B") { excludeBattery(game); return null; } game.battery.status = "included"; schedule(game, issue, id, choice, "EV-MAA", { duration: 2, euros: 3000 }); return null; } },
  { ids: ["BESS-P1-02"], role: "base", art: ["battery-limits"], spec: () => ({ family: "batteryArea", component: "bess", mechanism: "equipment" }), eligible: game => game.battery.status === "included",
    apply(game, issue, id, choice) {
      if (choice === "A") { schedule(game, issue, id, choice, "EV-MAA", { duration: 3, euros: 2000 }); }
      else { game.battery.chargeMW = 80; game.battery.dischargeMW = 80; game.battery.energyMWh = 160; game.battery.equipmentRevision++; changePlan(game); workOnly(game, issue, id, "smallerBattery", 1, 2000); resolveCase(issue); }
      return null;
    } },
  { ids: ["BESS-P1-03"], role: "base", art: ["reserve-wetland", "battery-limits"], spec: () => ({ family: "batteryFlood", component: "bess", mechanism: "water" }), eligible: game => game.battery.status === "included",
    apply(game, issue, id, choice) {
      if (choice === "A") { game.facts.batteryDrySite = true; workOnly(game, issue, id, "drySite", 3, 8000); resolveCase(issue); }
      else if (issue.facts.drySiteRequired) {
        // The same failed design is not purchased or rolled again. This one final
        // targeted redesign combines the known level and drainage requirements.
        workOnly(game, issue, id, "floodRedesign", 5, 9000, 3);
        issue.facts.floodRedesignOrdered = true;
        schedule(game, issue, id, choice, "EV-BESS-TURVA", { duration: 5, key: "floodRedesignResult", observation: "0" });
      } else schedule(game, issue, id, choice, "EV-BESS-TURVA", { duration: 3, euros: 5000 });
      return null;
    } },
];

export const landOutcomes: Record<string, OutcomeResolver> = {
  "EV-SOPIMUSSIVUT": (game, issue, outcome, observation) => {
    if (observation < 0.65) { issue.facts.contractConfirmed = true; resolveCase(issue); return branchId(outcome.contentId, 0); }
    issue.facts.skipSigning = true;
    schedule(game, issue, outcome.contentId, null, "EV-MAA", { duration: 1, euros: 1500 });
    return branchId(outcome.contentId, 1);
  },
  "EV-MAA": (game, issue, outcome, observation) => {
    let branch = issue.facts.skipSigning ? observation < 0.65 ? 1 : 2 : observation < 0.6 ? 0 : observation < 0.85 ? 1 : 2;
    // A route negotiation cannot remove fictitious turbines or sign a rejected lease.
    if (issue.family === "accessRoute" && branch > 0) {
      workOnly(game, issue, outcome.sourceId, "otherAccess", 3, 7000);
      issue.facts.routeSecured = true; branch = 1;
    }
    if (issue.component === "bess") {
      if (branch === 0) game.battery.landSecured = true;
      else if (branch === 1) { workOnly(game, issue, outcome.sourceId, "otherBatteryPlot", 2, 4000); game.battery.landSecured = true; }
      else { game.battery.chargeMW = Math.min(game.battery.chargeMW, 80); game.battery.dischargeMW = Math.min(game.battery.dischargeMW, 80); game.battery.energyMWh = Math.min(game.battery.energyMWh, 160); game.battery.equipmentRevision++; changePlan(game); game.battery.landSecured = true; }
    } else if (branch === 2) excludeAssets(game, issue);
    else if (branch === 1 && issue.component === "wind") game.facts.layoutTightened = true;
    issue.facts.contractConfirmed = branch === 0; resolveCase(issue); return branchId(outcome.contentId, branch);
  },
  "EV-VOIMALALUPAUS": (game, issue, outcome, observation) => {
    if (outcome.sourceChoice === "B") { issue.facts.terminated = true; issue.facts.disputed = false; game.facts.layoutTightened = true; workOnly(game, issue, outcome.sourceId, "replacement", 2, 3500); resolveCase(issue); return branchId(outcome.contentId, 2); }
    if (observation < 0.45) { issue.facts.disputed = false; resolveCase(issue); return branchId(outcome.contentId, 0); }
    issue.facts.disputed = true; issue.fallback = "viable";
    followup(game, issue, "UUSI-P1-MAARIITA");
    return branchId(outcome.contentId, observation < 0.75 ? 1 : 3);
  },
  "EV-MAARIITA": (game, issue, outcome, observation) => {
    issue.facts.disputed = false;
    if (observation >= 0.55) { issue.facts.terminated = true; game.facts.layoutTightened = true; workOnly(game, issue, outcome.sourceId, "settlementReplacement", 2, 4000); }
    resolveCase(issue); return branchId(outcome.contentId, observation < 0.55 ? 0 : 1);
  },
  "EV-ETUSIJA": (game, issue, outcome, observation) => {
    if (observation < 0.5) { cost(game, issue, outcome.contentId, "priorityConsent", 12000, "contractLiability"); resolveCase(issue); return branchId(outcome.contentId, 0); }
    issue.facts.skipSigning = true;
    schedule(game, issue, outcome.contentId, null, "EV-MAA", { duration: 2, euros: 3500 });
    return branchId(outcome.contentId, 1);
  },
  "EV-SELVITYSJARJESTYS": (game, issue, outcome, observation) => {
    const natureFirst = outcome.sourceChoice === "A";
    let branch: number;
    if (natureFirst) {
      branch = observation < 0.65 ? 0 : 1;
      game.facts.gridOrdered = true;
      workOnly(game, issue, outcome.sourceId, "secondGrid", branch === 0 ? 3 : 9, 18000, 3);
    } else {
      game.facts.gridResolved = true;
      const seasonOpen = game.calendar.now % 12 <= 5;
      branch = seasonOpen ? 2 : 3;
      game.facts.ecologyOrdered = true;
      const wait = seasonOpen ? 0 : 12 - game.calendar.now % 12 + 3;
      workOnly(game, issue, outcome.sourceId, "secondEcology", wait + 4, 55000, 4);
    }
    resolveCase(issue); return branchId(outcome.contentId, branch);
  },
  "EV-YHTEISASEMA": (game, issue) => { game.facts.sharedConnectionFailed = true; resolveCase(issue); const own = game.cases["case:gridOptions"]; if (!game.facts.gridResolved && (!own || own.status !== "resolved")) { game.facts.returnGrid = true; followup(game, issue, "UUSI-P2-04"); } return null; },
  "contract-callback": (game, issue) => { if (!issue.facts.specialTerms || !issue.facts.informedOthers) throw new Error("Unfounded special-term callback"); followup(game, issue, "P3-SOPIMUS"); return null; },
};
