import { branchId } from "../content";
import { changePlan } from "../assets";
import { waitForWork } from "../calendar";
import { followup, resolveCase, schedule, workOnly } from "../operations";
import { excludeBattery, permitGoalReached } from "../procedure";
import type { GameV5 } from "../types";
import type { Rule, OutcomeResolver } from "./types";

const included = (game: GameV5) => game.battery.status === "included";
const batteryPermitsFinal = (game: GameV5) => included(game) && game.procedure.permits.some(permit => permit.component === "bess" && permit.required) &&
  game.procedure.permits.filter(permit => permit.component === "bess" && permit.required).every(permit => permit.status === "final" && permit.planRevision === game.planRevision);

export const batteryRules: Rule[] = [
  { ids: ["BESS-P3-01"], role: "base", art: ["battery-cooling", "noise-guarantee"],
    spec: () => ({ family: "batteryNoise", component: "bess", mechanism: "noise" }), eligible: included,
    apply(game, issue, id, choice) {
      issue.facts.fullLoadDataOrdered = true;
      workOnly(game, issue, id, "fullLoadNoise", choice === "A" ? 3 : 4, choice === "A" ? 6500 : 9000);
      if (choice === "B") { issue.facts.equipmentRelocated = true; changePlan(game); }
      resolveCase(issue); return null;
    } },
  { ids: ["BESS-P3-02"], role: "followup", art: ["battery-technical", "contract-pages"],
    spec: () => ({ family: "batterySafetyData", component: "bess", mechanism: "equipment" }), eligible: game => included(game) && game.facts.batterySafetyDataMissing === true,
    apply(game, issue, id, choice) {
      if (issue.facts.dataFollowupOrdered) throw new Error("Same BESS data request was already followed up");
      issue.facts.dataFollowupOrdered = true;
      if (choice === "B") { game.battery.equipmentRevision++; game.battery.technicalData = false; changePlan(game);
        workOnly(game, issue, id, "replacementNoiseAndGridData", 3, 7000); }
      schedule(game, issue, id, choice, "EV-BESS-TURVA", { duration: choice === "A" ? 6 : 3, baseline: 3, euros: choice === "A" ? 4000 : 9000, key: "safetyDataFollowup" });
      return null;
    } },
  { ids: ["BESS-P3-03"], role: "base", art: ["battery-water", "water-section"],
    spec: () => ({ family: "batteryIncidentWater", component: "bess", mechanism: "water" }), eligible: included,
    apply(game, issue, id, choice) {
      issue.facts.alternativeSite = choice === "B";
      schedule(game, issue, id, choice, "EV-BESS-TURVA", { duration: choice === "A" ? 4 : 5, milestone: "proposal", euros: choice === "A" ? 8000 : 12000 });
      return null;
    } },
  { ids: ["BESS-P3-04"], role: "followup", art: ["battery-access", "battery-limits"],
    spec: () => ({ family: "batteryLayout", component: "bess", mechanism: "equipment" }),
    eligible: game => included(game) && (game.facts.batteryAccessBlocked === true || game.facts.batteryWaterSpaceMissing === true),
    apply(game, issue, id, choice) {
      if (choice === "B") { game.battery.chargeMW *= 0.8; game.battery.dischargeMW *= 0.8; game.battery.energyMWh *= 0.8; game.battery.equipmentRevision++; }
      changePlan(game); workOnly(game, issue, id, "safeLayout", choice === "A" ? 3 : 2, choice === "A" ? 7500 : 5000);
      game.facts.batteryAccessBlocked = false; game.facts.batteryWaterSpaceMissing = false; resolveCase(issue); return null;
    } },
  { ids: ["BESS-P3-05"], role: "base", art: ["shared-power", "battery-limits"],
    spec: () => ({ family: "batteryGrid", component: "bess", mechanism: "grid" }), eligible: game => included(game) && game.run.mode !== "solar",
    apply(game, issue, id, choice) {
      issue.facts.sharedPowerControl = choice === "A";
      schedule(game, issue, id, choice, "EV-BESS-VERKKO", { duration: choice === "A" ? 3 : 6, milestone: "proposal", euros: choice === "A" ? 9000 : 15000, key: "sharedPower" });
      return null;
    } },
  { ids: ["BESS-P3-06"], role: "base", art: ["market-scenarios", "battery-limits"],
    spec: () => ({ family: "batteryInvestment", component: "bess", mechanism: "procedure" }), eligible: included,
    apply(game, issue, id, choice) {
      if (choice === "A") workOnly(game, issue, id, "marketSensitivity", 1, 4500);
      else game.facts.batteryInvestmentDeferred = true;
      // Neither choice invents a reserve-market acceptance requirement for a permit.
      resolveCase(issue); return null;
    } },
  { ids: ["BESS-P3-07"], role: "base", art: ["battery-layout", "battery-cooling"],
    spec: () => ({ family: "batterySupplierChange", component: "bess", mechanism: "equipment" }),
    eligible: game => included(game) && (game.battery.safetyAssessed || game.battery.technicalData),
    apply(game, issue, id, choice) {
      if (choice === "A") {
        game.battery.equipmentRevision++; game.battery.safetyAssessed = false; changePlan(game);
        workOnly(game, issue, id, "changedNoiseAndGrid", 3, 8000);
        schedule(game, issue, id, choice, "EV-BESS-TURVA", { duration: 3, milestone: "proposal", euros: 5000 });
      } else resolveCase(issue);
      return null;
    } },
  { ids: ["BESS-P4-01"], role: "base", art: ["grid-application", "battery-technical"],
    spec: () => ({ family: "batteryConnectionApplication", component: "bess", mechanism: "grid" }), eligible: game => included(game) && !game.battery.connectionAgreement,
    apply(game, issue, id, choice) {
      game.facts.batteryConnectionApplicationPrepared = choice === "A";
      if (choice === "A") workOnly(game, issue, id, "connectionApplicationInputs", 1, 1500);
      else game.facts.batteryConnectionDeferred = true;
      resolveCase(issue); return null;
    } },
  { ids: ["BESS-P4-02"], role: "followup", art: ["lease-renewal", "grid-application"],
    spec: () => ({ family: "batteryConnectionDeadline", component: "bess", mechanism: "grid" }),
    eligible: game => included(game) && game.battery.connectionApprovalExpires !== null && game.battery.connectionApprovalExpires > game.calendar.now && !game.battery.connectionAgreement,
    apply(game, issue, id, choice) {
      const deadline = game.battery.connectionApprovalExpires;
      if (deadline === null || deadline <= game.calendar.now) throw new Error("No live connection approval deadline");
      if (choice === "A") {
        const job = workOnly(game, issue, id, "decisionMeeting", Math.min(0.25, (deadline - game.calendar.now) / 2), 900);
        waitForWork(game.calendar, [job], "Sisäinen päätöskokous");
        game.facts.batteryConnectionDecisionInTime = true;
      }
      else {
        const job = workOnly(game, issue, id, "lateDecisionMeeting", deadline - game.calendar.now + 0.25, 900, 0.25);
        waitForWork(game.calendar, [job], "Liittymissopimuksen määräaika");
        game.battery.connectionApprovalExpires = null;
        workOnly(game, issue, id, "connectionReapplication", 3, 2500, 0);
      }
      resolveCase(issue); return null;
    } },
  { ids: ["BESS-P4-03", "BESS-P4-06"], role: "epilogue", art: ["battery-handover", "permit-folder"],
    spec: () => ({ family: "batteryHandover", component: "bess", mechanism: "procedure" }), eligible: batteryPermitsFinal,
    apply(game, issue, id, choice) {
      game.facts.batteryHandover = true;
      if (id === "BESS-P4-03" && choice === "B") game.facts.batteryInvestmentDeferred = true;
      resolveCase(issue); return null;
    } },
  { ids: ["BESS-P4-04"], role: "followup", art: ["shared-power", "battery-handover"],
    spec: () => ({ family: "batteryGrid", component: "bess", mechanism: "grid" }),
    eligible: game => included(game) && game.battery.separable && game.battery.gridStatus === "waiting" && game.facts.gridResolved === true,
    apply(game, issue, id, choice) {
      issue.facts.separationDecisionPending = false;
      if (choice === "A") { game.facts.batteryLaterPhase = true; excludeBattery(game); }
      else if (!game.ending && !permitGoalReached(game) && game.facts.batteryGridBlocksPreparation === true) {
        workOnly(game, issue, id, "gridDependentPreparation", 12, 5000, 0);
      } else game.facts.sharedConstructionDeferred = true;
      resolveCase(issue); return null;
    } },
  { ids: ["BESS-P4-RAJAUS"], role: "followup", art: ["battery-limits"],
    spec: () => ({ family: "batteryGrid", component: "bess", mechanism: "grid" }),
    eligible: game => included(game) && game.battery.separable && game.battery.gridStatus === "limited" && game.battery.offeredChargeMW !== null && game.battery.offeredDischargeMW !== null,
    apply(game, issue, id, choice) {
      if (choice === "B") excludeBattery(game);
      else {
        if (game.battery.offeredChargeMW === null || game.battery.offeredDischargeMW === null) throw new Error("Missing distinct offered BESS powers");
        game.battery.chargeMW = game.battery.offeredChargeMW; game.battery.dischargeMW = game.battery.offeredDischargeMW;
        // Power-conversion equipment changes; the installed cell energy is retained.
        game.battery.equipmentRevision++; game.battery.gridStatus = "suitable";
        changePlan(game); workOnly(game, issue, id, "limitedBatteryDesign", 3, 9000);
      }
      resolveCase(issue); return null;
    } },
  { ids: ["BESS-P4-05"], role: "base", art: ["battery-access", "technical-standard"],
    spec: () => ({ family: "batteryStandard", component: "bess", mechanism: "equipment" }), eligible: included,
    apply(game, issue, id, choice) {
      issue.facts.standardBasisChecked = true;
      schedule(game, issue, id, choice, "EV-BESS-TURVA", { duration: choice === "A" ? 2 : 3, milestone: "proposal", euros: choice === "A" ? 4000 : 7000 }); return null;
    } },
];

export const batteryOutcomes: Record<string, OutcomeResolver> = {
  "EV-BESS-TURVA": (game, issue, outcome, observation) => {
    if (!included(game) || issue.component !== "bess") throw new Error("No battery safety result for an excluded battery");
    let branch: number;
    if (issue.family === "batteryIncidentWater") {
      branch = observation < 0.7 ? 2 : 3;
      if (branch === 3) { game.facts.batteryWaterSpaceMissing = true; followup(game, issue, "BESS-P3-04"); }
    } else if (outcome.sourceId === "BESS-P1-03") {
      branch = observation < 0.65 ? 4 : 5;
      if (branch === 5) { issue.facts.drySiteRequired = true; followup(game, issue, "BESS-P1-03"); }
    } else {
      const certain = issue.facts.dataFollowupOrdered === true || issue.facts.standardBasisChecked === true;
      branch = certain || observation < 0.6 ? 0 : 1;
      if (branch === 1) { game.facts.batterySafetyDataMissing = true; followup(game, issue, "BESS-P3-02"); }
      else { game.facts.batterySafetyDataMissing = false; game.battery.technicalData = true; }
    }
    if (branch % 2 === 0) { game.battery.safetyAssessed = true; resolveCase(issue); }
    return branchId(outcome.contentId, branch);
  },
};
