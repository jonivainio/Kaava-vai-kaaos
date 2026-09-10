import { cancelComponentWork } from "./calendar";
import { batteryPreparationReady } from "./batteryPreparation";
import type { GameV5, Permit, Procedure } from "./types";

export function newProcedure(yvaRequired: boolean): Procedure {
  return { landSecured: false, initiated: false, yvaRequired, yvaDetermined: true,
    programmeReady: false, yvaHearingComplete: false, yvaConclusion: false, draftFeedback: false,
    proposalHearingComplete: false, adopted: false, planFinal: false, documentRevision: 0,
    appeal: "none", appealDueAt: null, permits: [], repairRounds: 0 };
}
export function requiredPermit(id: string, component: Permit["component"], revision: number): Permit {
  return { id, component, required: true, status: "needed", planRevision: revision, dueAt: null, finalAt: null };
}
export function excludeBattery(game: GameV5): void {
  if (!game.battery.separable && game.battery.status === "included") throw new Error("BESS cannot be separated from the core project");
  game.battery.status = "excluded";
  cancelComponentWork(game.calendar, "bess");
  for (const permit of game.procedure.permits) if (permit.component === "bess") { permit.required = false; permit.status = "excluded"; }
  for (const issue of Object.values(game.cases)) if (issue.component === "bess") issue.status = "resolved";
  for (const outcome of game.outcomes) {
    if (game.cases[outcome.caseId]?.component === "bess" && outcome.status !== "revealed") outcome.status = "cancelled";
  }
  game.scenes = game.scenes.filter(scene => !scene.caseId || game.cases[scene.caseId]?.component !== "bess");
  // Shared obligations remain under component=shared, including started work and paid invoices.
}
export function hasUnresolvedBlocks(game: GameV5): boolean {
  return Object.values(game.cases).some(issue => issue.status === "ignored" || issue.facts.blocking === true);
}
export function permitGoalReached(game: GameV5): boolean {
  const p = game.procedure;
  return p.yvaDetermined && game.municipalities.filter(m=>m.included).every(m=>m.adopted&&m.final&&m.planRevision===game.planRevision) && p.landSecured && p.initiated && (!p.yvaRequired || p.yvaConclusion) && p.draftFeedback &&
    p.proposalHearingComplete && p.adopted && p.planFinal && p.appeal === "closed" &&
    p.documentRevision === game.planRevision && !hasUnresolvedBlocks(game) && batteryPreparationReady(game) &&
    p.permits.some(permit => permit.required) && p.permits.every(permit => !permit.required ||
      (permit.status === "final" && permit.planRevision === game.planRevision && permit.finalAt !== null && permit.finalAt <= game.calendar.now));
}
export function canWarnLeaseExpiry(game: GameV5): boolean {
  if (game.ending || permitGoalReached(game) || game.stage !== 4 || game.facts.regionalPlanDependency !== true ||
    game.calendar.avoidableCriticalDelayMonths < 24 || game.world.regionalPlanDue <= game.world.regionalPlanForecast) return false;
  return game.leases.filter(lease => lease.essential && lease.status === "valid" &&
    game.calendar.now < (lease.extensionDeadline ?? lease.developmentDeadline) &&
    game.world.regionalPlanDue > (lease.extensionDeadline ?? lease.developmentDeadline)).length >= 2;
}
export function leaseExpiryEndsRun(game: GameV5): boolean {
  if (game.ending || permitGoalReached(game) || Number(game.facts.avoidableDelayAtLeaseWarning ?? game.calendar.avoidableCriticalDelayMonths) < 24 ||
    game.facts.regionalPlanDependency !== true || game.facts.leaseNegotiationComplete !== true ||
    game.facts.noReplacementLand !== true || game.world.regionalPlanDue <= game.world.regionalPlanForecast) return false;
  return game.leases.filter(lease => lease.essential && lease.forecastWarned && lease.response === "declined" &&
    game.calendar.now >= lease.developmentDeadline && lease.status === "expired").length >= 2;
}
