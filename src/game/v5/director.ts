import { getDerivedStats } from "../../engine";
import { content, entry } from "./content";
import { openCase, queueScene, workOnly, schedule, followup } from "./operations";
import { ruleFor } from "./rules";
import { beginAppealWindow } from "./rules/decisions";
import { canRestoreNature } from "./rules/nature";
import { publicationAt } from "./rules/research";
import { blockingWork, publishDue, settleCompletedWork } from "./timeline";
import { canWarnLeaseExpiry, hasUnresolvedBlocks, permitGoalReached, requiredPermit } from "./procedure";
import { finish, finishKnownChoice, checkScope } from "./endings";
import { sample } from "./world";
import { batteryPreparationReady, prepareBatteryApplications } from "./batteryPreparation";
import type { GameV5, Stage } from "./types";

export const PACING = { baseDecisions: { 1: 3, 2: 5, 3: 6, 4: 4 }, preparationMonths: { 1: 6, 2: 10, 3: 12, 4: 6 }, batteryBaseLimit: 2 } as const;
const stageSource = { 1: "start", 2: "transition-1", 3: "transition-2", 4: "transition-3" } as const;
const researchIds = ["natura", "natura-review", "natura-season", "natura-applicable"];
function group(game: GameV5, id: string): string {
  if (researchIds.includes(id)) return "publicResearchWait";
  return ruleFor(id).spec(game, id).family;
}
export function initialiseDecks(game: GameV5): void {
  for (const stage of [1, 2, 3, 4] as const) {
    game.stageDecks[stage] = content.filter(item => item.stage === stage && item.kind === "decision" && ruleFor(item.id).role === "base")
      .map(item => item.id).sort((a, b) => sample(game.run.seed, `deck:${stage}:${a}`) - sample(game.run.seed, `deck:${stage}:${b}`) || a.localeCompare(b));
  }
  // These are preparations, not random optional obstacles.
  promote(game.stageDecks[1], game.stageDecks[1].find(id => ["land", "land-signing", "land-index", "land-minimum"].includes(id))!);
  promote(game.stageDecks[2], "defence");
  beginStage(game);
  queueScene(game, "start");
}
function promote(deck: string[], id: string): void { const index = deck.indexOf(id); if (index >= 0) deck.unshift(...deck.splice(index, 1)); }
export function beginStage(game: GameV5): void {
  const marker = `stageStarted:${game.stage}`;
  if (game.facts[marker]) return;
  game.facts[marker] = true;
  const source = stageSource[game.stage];
  const issue = openCase(game, source, { family: `stage${game.stage}`, component: "shared" });
  workOnly(game, issue, source, `stagePreparation:${game.stage}`, PACING.preparationMonths[game.stage]);
  if (game.stage === 2) workOnly(game, issue, "interludes[1][0]", "municipalPresentation", 0.5, 900);
  if (game.stage === 4) workOnly(game, issue, "interludes[3][0]", "proposalHearing", 4, 2500);
}
function showDecision(game: GameV5, id: string): void {
  const rule = ruleFor(id);
  const issue = openCase(game, id, rule.spec(game, id));
  queueScene(game, id, issue);
  game.facts[`selected:${game.stage}:${group(game, id)}`] = true;
}
function baseCount(game: GameV5): number { return Number(game.facts[`baseCount:${game.stage}`] ?? 0); }
export function countBaseChoice(game: GameV5, id: string): void {
  if (game.stageDecks[game.stage].includes(id) && !game.seenIds.includes(id)) game.facts[`baseCount:${game.stage}`] = baseCount(game) + 1;
}
function candidate(game: GameV5): string | undefined {
  const stage = game.stage;
  const batteryBaseCount = game.decisions.filter(d => ruleFor(d.contentId).role === "base" && ruleFor(d.contentId).spec(game, d.contentId).component === "bess").length;
  const available = game.stageDecks[stage].filter(id => !game.seenIds.includes(id) && !game.facts[`selected:${stage}:${group(game, id)}`] && ruleFor(id).eligible(game, id) &&
    (ruleFor(id).spec(game, id).component !== "bess" || batteryBaseCount < PACING.batteryBaseLimit));
  if (!available.length) return;
  if (stage === 2 && game.battery.status === "undecided" && baseCount(game) >= 2) return "BESS-P2-04";
  if (stage === 2) {
    if (game.run.mode !== "solar" && !game.facts.defenceRequested) return "defence";
    if (game.cases["case:defence"]?.status === "working") return;
    if (!game.facts.ecologyOrdered) return available.find(id => id.startsWith("surveys"));
    if (!game.facts.gridOrdered && !game.facts.sharedConnectionChosen) return available.find(id => id === "UUSI-P2-04");
  }
  if (stage === 3) {
    const hasSolar = game.decisions.some(d => entry(d.contentId).stage === 3 && game.cases[d.caseId]?.component === "solar");
    if (!hasSolar && game.run.mode !== "wind") return available.find(id => ruleFor(id).spec(game, id).component === "solar");
    const hasWindNature = game.decisions.some(d => entry(d.contentId).stage === 3 && game.cases[d.caseId]?.species !== null && game.cases[d.caseId]?.component === "wind");
    if (!hasWindNature && game.run.mode !== "solar") {
      const match = available.find(id => ruleFor(id).spec(game, id).species === game.world.species && ruleFor(id).spec(game, id).component === "wind");
      if (match) return match;
    }
  }
  if (baseCount(game) >= PACING.baseDecisions[stage]) return;
  if (stage === 4 && game.run.mode === "hybrid" &&
    !game.decisions.some(d => entry(d.contentId).stage === stage && game.cases[d.caseId]?.component === "solar")) {
    const solar = available.find(id => ruleFor(id).spec(game, id).component === "solar");
    if (solar) return solar;
  }
  return available[0];
}
function showWait(game: GameV5): void { game.scenes.push({ id: "@wait", caseId: null, branchId: null, kind: "wait", outcomeId: null, nextStage: null }); }
function transition(game: GameV5, next: Stage): void {
  const id = stageSource[next];
  game.scenes.push({ id, caseId: null, branchId: null, kind: "transition", outcomeId: null, nextStage: next });
}
function readyToLeave(game: GameV5): boolean {
  const pending = blockingWork(game);
  if (pending.length) {
    if (game.stage === 4 && !game.seenIds.includes("interludes[3][3]") && pending.some(work =>
      ["UUSI-P4-01", "UUSI-P4-02", "UUSI-P4-03", "UUSI-P4-07", "UUSI-P4-08", "UUSI-P4-09"].includes(work.sourceId))) {
      queueScene(game, "interludes[3][3]"); return false;
    }
    showWait(game); return false;
  }
  return true;
}
function neutralProgress(game: GameV5): boolean {
  const count = baseCount(game);
  if (!count || count % 2 !== 0) return false;
  const index = Math.floor(count / 2) - 1;
  const id = `interludes[${game.stage - 1}][${index}]`;
  if (!content.some(item => item.id === id) || game.seenIds.includes(id)) return false;
  if (game.stage === 1 && !Object.values(game.cases).some(issue => issue.facts.contractConfirmed === true)) return false;
  if (id === "interludes[1][0]" && !game.facts.municipalPresentationHeld) return false;
  if (["interludes[1][1]", "interludes[2][1]"].includes(id) && !game.procedure.yvaRequired) return false;
  if (id === "interludes[1][2]" && blockingWork(game).filter(work => work.startedAt <= game.calendar.now).length < 2) return false;
  if (id === "interludes[2][0]" && !game.facts.draftMaterialChecked) return false;
  if (id === "interludes[3][0]" && !game.facts.proposalResponsesReceived) return false;
  if (id === "interludes[3][1]") {
    const stats = getDerivedStats(game.run);
    // This meeting belongs to proposal preparation, not the earlier programme introduction.
    if (!(stats.windCount < game.initial.windCount || stats.solarHa < game.initial.solarHa) || !game.procedure.draftFeedback) return false;
    game.facts.presentedReducedProposalRevision = game.planRevision;
  }
  queueScene(game, id); return true;
}
function externalEvent(game: GameV5): boolean {
  if (game.world.externalStage !== game.stage || game.facts.externalPresented || baseCount(game) < 2) return false;
  const id = game.world.externalId;
  if (!id) return false;
  if (["EV-PV", "EV-VTT-TULOS"].includes(id)) return false; // Actual ordered defence procedure owns these results.
  // A grid conclusion must come from its study, never before it exists.
  if (id === "external-2" && game.facts.gridOrdered && game.outcomes.some(outcome => outcome.contentId === "EV-VERKKO" && outcome.status === "pending")) return false;
  if (["external-3", "ext-buyer"].includes(id) && game.outcomes.some(outcome => outcome.contentId === "EV-KUNTA" && outcome.status === "pending")) return false;
  game.facts.externalPresented = true;
  queueScene(game, id);
  finish(game, "external", id, null, {}, "external");
  return true;
}
function maybeResearchPublication(game: GameV5): boolean {
  if (game.stage !== 4 || publicationAt(game) > game.calendar.now || game.facts.publicationAssessed) return false;
  const funded = game.cases["case:publicResearch"];
  if (!funded) return false;
  const species = game.world.researchSpecies;
  let local = Object.values(game.cases).find(issue => issue.id !== funded.id && issue.species === species &&
    (species !== "forestDeer" || ["calving", "corridor"].includes(issue.mechanism)));
  if (!local && species === "wolf") local = funded;
  if (!local) return false;
  if (local.facts.researchAssessed || game.outcomes.some(item => item.contentId === "EV-TUTKIMUS" && item.caseId === local!.id)) { game.facts.publicationAssessed = true; return false; }
  game.facts.publicationAssessed = true;
  schedule(game, local, funded.sourceId, funded.choice, "EV-TUTKIMUS", { duration: 3, milestone: "proposal", euros: 7000, key: "publishedLocalAssessment" });
  return false;
}

/** Advances administrative state only when its prerequisites and actual work are complete. */
export function direct(game: GameV5): void {
  if (game.scenes.length || game.ending) return;
  settleCompletedWork(game);
  if (game.ending) return;
  publishDue(game);
  if (game.scenes.length || game.ending) return;
  const batteryGrid = game.cases["case:batteryGrid"];
  if (batteryGrid?.facts.separationDecisionPending && ruleFor("BESS-P4-04").eligible(game, "BESS-P4-04")) {
    followup(game, batteryGrid, "BESS-P4-04"); return;
  }
  if (game.stage >= 3 && !game.seenIds.includes("UUSI-P3-KOSTEIKKO") && ruleFor("UUSI-P3-KOSTEIKKO").eligible(game, "UUSI-P3-KOSTEIKKO")) {
    const issue = game.cases["case:frogWater"]!;
    const review = game.calendar.orders.find(work => work.id === `${issue.id}:work:smallerSolarReview`);
    if (!review || review.status === "completed") { followup(game, issue, "UUSI-P3-KOSTEIKKO"); return; }
  }
  if (game.stage >= 3 && !game.seenIds.includes("UUSI-P2-08") && sample(game.run.seed, "higher-model-proposed") < 0.4 && ruleFor("UUSI-P2-08").eligible(game, "UUSI-P2-08")) {
    showDecision(game, "UUSI-P2-08"); return;
  }
  if (game.procedure.adopted && !batteryPreparationReady(game)) {
    game.facts.batteryPermitPreparationDelayed = true;
    if (!game.seenIds.includes("UUSI-P4-12") && ruleFor("UUSI-P4-12").eligible(game, "UUSI-P4-12")) {
      showDecision(game, "UUSI-P4-12"); return;
    }
    prepareBatteryApplications(game);
  }
  checkScope(game);
  if (game.ending) return;
  if (externalEvent(game)) return;
  if (neutralProgress(game)) return;
  const next = candidate(game);
  if (next) { showDecision(game, next); return; }

  if (game.stage === 1) {
    if (!readyToLeave(game)) return;
    game.procedure.landSecured = true;
    if (!game.seenIds.includes("land-done")) { queueScene(game, "land-done"); return; }
    transition(game, 2); return;
  }
  if (game.stage === 2) {
    // A shared-line alternative cannot bypass the independent grid solution when it fails.
    if (!game.facts.programmeReviewOpen) { game.facts.programmeReviewOpen = true; publishDue(game); if (game.scenes.length) return; }
    if (!readyToLeave(game)) return;
    publishDue(game); if (game.scenes.length) return;
    if (game.procedure.yvaRequired && !game.facts.programmeHearingHeld) {
      const issue = game.cases["case:stage2"]!;
      workOnly(game, issue, "interludes[1][3]", "programmeHearing", 1, 1500);
      showWait(game); return;
    }
    if (game.procedure.yvaRequired && !game.seenIds.includes("interludes[1][3]")) { queueScene(game, "interludes[1][3]"); return; }
    game.procedure.initiated = true; game.procedure.programmeReady = true;
    transition(game, 3); return;
  }
  if (game.stage === 3) {
    if (!readyToLeave(game)) return;
    if (!game.facts.draftMaterialChecked) {
      workOnly(game, game.cases["case:stage3"]!, "interludes[2][0]", `draftDocuments:${game.planRevision}`, 2, 5000);
      showWait(game); return;
    }
    if (!game.seenIds.includes("interludes[2][0]")) { queueScene(game, "interludes[2][0]"); return; }
    if (!game.seenIds.includes("interludes[2][3]") && game.facts.visualisationsPrepared) { queueScene(game, "interludes[2][3]"); return; }
    game.procedure.yvaHearingComplete = game.procedure.yvaRequired;
    game.procedure.draftFeedback = true;
    if (game.procedure.yvaRequired && !game.seenIds.includes("progress-12")) { queueScene(game, "progress-12"); return; }
    game.procedure.yvaConclusion = game.procedure.yvaRequired;
    const conclusion = game.procedure.yvaRequired ? "draft-done" : "draft-done::no-yva";
    if (!game.seenIds.includes(conclusion)) { queueScene(game, conclusion); return; }
    publishDue(game); if (game.scenes.length || game.ending) return;
    if (!readyToLeave(game)) return;
    if (ruleFor("UUSI-P3-01").eligible(game, "UUSI-P3-01") && sample(game.run.seed, "yva-joint-concern") < 0.25 && !game.seenIds.includes("UUSI-P3-01")) {
      showDecision(game, "UUSI-P3-01"); return;
    }
    transition(game, 4); return;
  }
  maybeResearchPublication(game);
  if (game.facts.postAdoptionChange) {
    const issue = openCase(game, "EV-AJANTASAISUUS", { family: "postAdoptionRevision", component: "shared" });
    workOnly(game, issue, "EV-AJANTASAISUUS", `revisedDecisionMaterial:${game.planRevision}`, 3, 9000, 0);
    game.facts.postAdoptionChange = false;
  }
  if (canWarnLeaseExpiry(game) && !game.facts.leaseExtensionOffered) {
    game.facts.avoidableDelayAtLeaseWarning = game.calendar.avoidableCriticalDelayMonths;
    for (const lease of game.leases.filter(lease => lease.essential)) lease.forecastWarned = true;
    if (!game.seenIds.includes("EV-MAAKUNTAODOTUS")) { queueScene(game, "EV-MAAKUNTAODOTUS"); return; }
    showDecision(game, "UUSI-P4-VUOKRAJATKO"); return;
  }
  if (game.facts.regionalPlanDependency && !game.facts.regionalWaitingOrdered && game.calendar.now < game.world.regionalPlanDue) {
    const issue = game.cases["case:regionalPlan"]!;
    workOnly(game, issue, "UUSI-P2-03", "regionalDecision", game.world.regionalPlanDue - game.calendar.now, 0,
      Math.max(0, game.world.regionalPlanDue - game.calendar.baselineNow));
    game.facts.regionalWaitingOrdered = true;
  }
  if (!readyToLeave(game)) return;
  publishDue(game); if (game.scenes.length || game.ending) return;
  const ignored = Object.values(game.cases).find(issue => issue.status === "ignored");
  if (ignored) { finishKnownChoice(game, ignored); return; }
  if (hasUnresolvedBlocks(game)) throw new Error("Unresolved issue has no follow-up decision");

  if (!game.procedure.adopted) {
    if (["annulledProcedure", "annulledEvidence", "administrative", "supreme"].includes(game.procedure.appeal)) throw new Error("Appeal has no continuation");
    game.procedure.proposalHearingComplete = true;
    if (!game.seenIds.includes("interludes[3][0]") && game.facts.proposalResponsesReceived) { queueScene(game, "interludes[3][0]"); return; }
    if (game.facts.proposalDocumentsChecked !== game.planRevision) {
      workOnly(game, game.cases["case:stage4"]!, "interludes[3][2]", `proposalDocuments:${game.planRevision}`, 2, 5000);
      showWait(game); return;
    }
    if (!game.seenIds.includes("interludes[3][2]")) { queueScene(game, "interludes[3][2]"); return; }
    if (!game.seenIds.includes("proposal-review")) { queueScene(game, "proposal-review"); return; }
    game.facts.approvalReady = true;
    publishDue(game); if (game.scenes.length || game.ending) return;
    const issue = openCase(game, "EV-HYVAKSYNTA", { family: "municipalApproval", component: "shared" });
    beginAppealWindow(game, issue, "EV-HYVAKSYNTA");
    queueScene(game, sample(game.run.seed, "approval-presentation") < 0.5 ? "adoption" : "EV-HYVAKSYNTA", issue); return;
  }
  if (game.procedure.appeal === "window") {
    if (game.calendar.now < game.procedure.appealDueAt!) { showWait(game); return; }
    const violation = game.cases["case:closedMeeting"];
    if (violation?.facts.presenceViolation && !violation.facts.violationRepaired) {
      game.procedure.appeal = "administrative";
      schedule(game, violation, "UUSI-P4-04", "B", "EV-MENETTELY", { duration: 0, key: "actualAppeal" });
      publishDue(game); if (!game.scenes.length) showWait(game); return;
    }
    if (sample(game.run.seed, "evidence-appeal") < 0.2 && game.procedure.repairRounds === 0 && !game.facts.evidenceAppealFiled) {
      const issue = openCase(game, "EV-VALITUS", { family: "evidenceAppeal", component: "shared" });
      issue.facts.evidenceChallenged = true; game.procedure.appeal = "administrative";
      game.facts.evidenceAppealFiled = true;
      schedule(game, issue, "EV-VALITUS", null, "EV-VALITUS", { duration: 12, euros: 14000, key: "actualEvidenceAppeal" });
      showWait(game); return;
    }
    game.procedure.appeal = "closed";
  }
  if (game.procedure.appeal !== "closed") { if (!readyToLeave(game)) return; throw new Error("Incomplete appeal without a scheduled result"); }
  if (!game.procedure.planFinal) { game.procedure.planFinal = true; game.procedure.appealDueAt = null; queueScene(game, "EV-LAINVOIMA"); return; }
  if (game.battery.status === "included" && !game.procedure.permits.some(permit => permit.id === "batteryConstruction")) game.procedure.permits.push(requiredPermit("batteryConstruction", "bess", game.planRevision));
  const outstanding = game.procedure.permits.filter(permit => permit.required && (permit.status !== "final" || permit.planRevision !== game.planRevision));
  if (outstanding.length) {
    const issue = openCase(game, "EV-LUVAT", { family: "permits", component: "shared" });
    for (const permit of outstanding) {
      if (permit.status !== "applied" && permit.status !== "granted") {
        permit.status = "applied"; permit.planRevision = game.planRevision;
        permit.dueAt = game.calendar.now + (permit.id === "naturaException" ? 12 : 4);
        workOnly(game, issue, "EV-LUVAT", `permit:${permit.id}:${game.planRevision}`, permit.dueAt - game.calendar.now);
      } else if (permit.status === "applied" && permit.dueAt! <= game.calendar.now) {
        permit.status = "granted"; permit.finalAt = game.calendar.now + 1;
        workOnly(game, issue, "EV-LUVAT", `permitAppeal:${permit.id}:${game.planRevision}`, 1);
      } else if (permit.status === "granted" && permit.finalAt! <= game.calendar.now) permit.status = "final";
    }
    if (blockingWork(game).length) { showWait(game); return; }
  }
  game.procedure.documentRevision = game.planRevision;
  if (!permitGoalReached(game)) throw new Error(`Permit completion did not meet the actual goal: ${JSON.stringify(game.procedure)}`);
  if (!game.facts.permitCompletionAnnounced) {
    game.facts.permitCompletionAnnounced = true;
    queueScene(game, sample(game.run.seed, "permit-presentation") < 0.5 ? "EV-LUVAT" : "ready"); return;
  }
  finish(game, "win", "LOPPU-VOITTO");
}
