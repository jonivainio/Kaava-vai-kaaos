import { getDerivedStats } from "../../engine";
import { advanceCalendar } from "./calendar";
import { entry } from "./content";
import { finish } from "./endings";
import { leaseExpiryEndsRun } from "./procedure";
import { OUTCOMES } from "./rules";
import { followup, openCase, queueScene } from "./operations";
import { changePlan } from "./assets";
import { sample } from "./world";
import type { GameV5, Milestone, PendingOutcome, WorkOrder } from "./types";

export function milestoneOpen(game: GameV5, milestone: Milestone): boolean {
  switch (milestone) {
    case "any": return true;
    case "programme": return game.facts.programmeReviewOpen === true;
    case "yva": return game.procedure.yvaHearingComplete || !game.procedure.yvaRequired && game.procedure.draftFeedback;
    case "proposal": return game.stage === 4;
    case "adoption": return game.facts.approvalReady === true;
    case "finality": return game.procedure.planFinal;
  }
}
export function isBackgroundWork(game: GameV5, work: WorkOrder): boolean {
  const issue = game.cases[work.caseId];
  return work.id.endsWith(":localResearchAssessment") && issue?.facts.backgroundResearch === true ||
    work.id.endsWith(":marketSensitivity") || work.id.includes("connectionApplication") || work.id.endsWith(":connectionReapplication");
}
export function blockingWork(game: GameV5): WorkOrder[] {
  return game.calendar.orders.filter(work => !["completed", "cancelled"].includes(work.status) && !isBackgroundWork(game, work));
}
export function publishDue(game: GameV5): number {
  if (game.ending) return 0;
  const due = game.outcomes.filter(item => item.status === "pending" && item.dueAt <= game.calendar.now && milestoneOpen(game, item.milestone))
    .sort((a, b) => a.dueAt - b.dueAt || a.sequence - b.sequence);
  let published = 0;
  for (const outcome of due) {
    if (game.ending) break;
    if (outcome.status !== "pending") continue;
    const work = outcome.workId ? game.calendar.orders.find(item => item.id === outcome.workId) : null;
    if (work && work.status !== "completed") continue;
    const issue = game.cases[outcome.caseId];
    if (!issue) throw new Error(`Outcome has no case: ${outcome.id}`);
    if (issue.component === "bess" && game.battery.status !== "included") { outcome.status = "cancelled"; continue; }
    const resolver = OUTCOMES[outcome.contentId];
    if (!resolver) throw new Error(`No explicit outcome resolver: ${outcome.contentId}`);
    const scene = { id: outcome.contentId, caseId: issue.id, branchId: outcome.branchId, kind: "event" as const, outcomeId: outcome.id, nextStage: null };
    // Result precedes follow-up scenes created by its resolver, including a later-stage return card.
    game.scenes.push(scene);
    const result = resolver(game, issue, outcome, Number(work?.observation ?? 0));
    scene.branchId = result;
    if (entry(outcome.contentId).branches.length && result === null) throw new Error(`Unresolved visible outcome: ${outcome.contentId}`);
    outcome.branchId = result; outcome.status = "queued";
    if (result && !issue.revealedBranches.includes(result)) issue.revealedBranches.push(result);
    published++;
  }
  return published;
}
export function advanceToNextWork(game: GameV5): void {
  const work = blockingWork(game).sort((a, b) => a.dueAt - b.dueAt || a.sequence - b.sequence)[0];
  if (!work) throw new Error("No unfinished work to wait for");
  const to = Math.max(game.calendar.now, work.dueAt);
  const baseline = Math.max(game.calendar.baselineNow, work.baselineDue);
  advanceCalendar(game.calendar, to, entry(work.sourceId).title, [work.id], baseline);
  settleCompletedWork(game);
  publishDue(game);
}
export function settleCompletedWork(game: GameV5): void {
  if (game.ending) return;
  for (const work of game.calendar.orders.filter(item => item.status === "completed")) {
    const marker = `settled:${work.id}`;
    if (game.facts[marker]) continue;
    game.facts[marker] = true;
    if (work.id.endsWith(":yvaDetermination")) {
      const d = getDerivedStats(game.run);
      // Screening concerns the entire remaining hybrid, not just the count of turbines.
      game.procedure.yvaRequired = d.windCount >= 10 || d.windMWac >= 45 || game.world.observations.yvaDiscretionary === 1;
      game.procedure.yvaDetermined = true; game.facts.yvaCaseDeterminationPending = false;
      if (!game.procedure.yvaRequired) queueScene(game, "surveys-wait::no-yva");
    }
    if (work.id.endsWith(":additionalHearing")) { game.procedure.proposalHearingComplete = true; game.facts.extraHearingOrdered = false; }
    if (work.id.endsWith(":replacementNoiseAndGridData")) game.battery.technicalData = true;
    if (work.id.endsWith(":fullLoadNoise")) game.facts.batteryFullLoadNoiseAssessed = true;
    if (work.id.endsWith(":drySite")) game.battery.safetyAssessed = true;
    if (work.id.endsWith(":safeLayout")) game.battery.safetyAssessed = true;
    if (work.id.endsWith(":regionalCompatibility")) game.facts.regionalPlanDependency = false;
    if (work.id.endsWith(":secondGrid")) game.facts.gridResolved = true;
    if (work.id.endsWith(":municipalPresentation")) game.facts.municipalPresentationHeld = true;
    if (work.id.endsWith(":programmeHearing")) game.facts.programmeHearingHeld = true;
    if (work.id.endsWith(":proposalHearing")) game.facts.proposalResponsesReceived = true;
    if (work.id.includes(":draftDocuments:")) { game.facts.draftMaterialChecked = true; game.facts.visualisationsPrepared = true; }
    if (work.id.includes(":proposalDocuments:")) game.facts.proposalDocumentsChecked = game.planRevision;
    if (work.id.endsWith(":militaryRoute")) {
      const issue = game.cases[work.caseId]!;
      if (issue.facts.routeCompatibilityPending) {
        issue.facts.routeCompatibilityPending = false;
        if (sample(game.run.seed, "military-route-compatible") >= 0.6) {
          game.facts.gridResolved = false;
          game.facts.returnGrid = true;
          changePlan(game);
          const grid = openCase(game, "UUSI-P2-04", { family: "gridOptions", component: "shared", mechanism: "grid" });
          grid.rounds++;
          followup(game, grid, "UUSI-P2-04");
        }
      }
    }
    if (work.id.endsWith(":independentSmallerReview")) {
      const issue = game.cases[work.caseId]!;
      issue.facts.blocking = false;
      if (!issue.facts.researchWaiting) issue.status = "resolved";
    }
  }
  for (const lease of game.leases) {
    if (lease.status === "valid" && game.calendar.now >= (lease.extensionDeadline ?? lease.developmentDeadline)) lease.status = "expired";
  }
  if (leaseExpiryEndsRun(game)) finish(game, "choices", "LOPPU-VUOKRA-AIKA", game.cases["case:leaseExtension"] ?? null, {}, "choices");
}
