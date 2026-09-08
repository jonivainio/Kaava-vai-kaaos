import { openCase, schedule, workOnly } from "./operations";
import type { GameV5 } from "./types";

export function batteryPreparationReady(game: GameV5): boolean {
  return game.battery.status !== "included" || game.battery.landSecured && game.battery.technicalData &&
    game.battery.safetyAssessed && game.facts.batteryFullLoadNoiseAssessed === true;
}

/** Normal application preparation orders real work for missing inputs; it grants no permit. */
export function prepareBatteryApplications(game: GameV5): void {
  if (game.battery.status !== "included" || batteryPreparationReady(game)) return;
  const issue = openCase(game, "UUSI-P4-12", { family: "batteryPermitInputs", component: "bess", mechanism: "equipment" });
  if (!game.battery.landSecured && !game.calendar.orders.some(work => work.caseId === issue.id && work.id.endsWith(":permitLand"))) {
    schedule(game, issue, "UUSI-P4-12", null, "EV-MAA", { duration: 3, euros: 3000, key: "permitLand" });
  }
  if (!game.battery.technicalData && !game.calendar.orders.some(work => work.caseId === issue.id && work.id.endsWith(":permitTechnical"))) {
    schedule(game, issue, "UUSI-P4-12", null, "EV-BESS-TEKNIIKKA", { duration: 3, euros: 5000, key: "permitTechnical" });
  }
  if (!game.battery.safetyAssessed && !game.calendar.orders.some(work => work.caseId === issue.id && work.id.endsWith(":permitSafety"))) {
    schedule(game, issue, "UUSI-P4-12", null, "EV-BESS-TURVA", { duration: 4, euros: 8000, key: "permitSafety" });
  }
  if (!game.facts.batteryFullLoadNoiseAssessed) workOnly(game, issue, "BESS-P3-01", "fullLoadNoise", 3, 6500);
}
