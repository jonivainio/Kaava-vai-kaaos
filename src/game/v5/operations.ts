import { entry } from "./content";
import { orderWork } from "./calendar";
import { integer, sample } from "./world";
import { modeAllows } from './modes';
import { finish } from './endings';
import type { CaseRecord, Component, GameV5, Mechanism, Milestone, SourceChoice, Species } from "./types";

export interface CaseSpec { family: string; component: Component; mechanism?: Mechanism; species?: Species | null; count?: number; hectares?: number }
export function openCase(game: GameV5, contentId: string, spec: CaseSpec): CaseRecord {
  const id = `case:${spec.family}`;
  const existing = game.cases[id];
  if (existing) return existing;
  const windIds = game.run.assets.windSites.filter(item => !item.exclusions.length).map(item => item.id);
  const solarIds = game.run.assets.solarParcels.filter(item => !item.exclusions.length).map(item => item.id);
  const offset = (ids: string[], key: string, amount: number) => {
    if (!ids.length) return [];
    const start = integer(game.run.seed, `${id}:${key}`, 0, ids.length - 1);
    return Array.from({ length: Math.min(amount, ids.length) }, (_, i) => ids[(start + i) % ids.length]!);
  };
  const issue: CaseRecord = {
    id, sourceId: contentId, family: spec.family, component: spec.component,
    species: spec.species ?? null, mechanism: spec.mechanism ?? "procedure", planRevision: game.planRevision,
    choice: null, placeIds: spec.component === "wind" ? offset(windIds, "places", spec.count ?? integer(game.run.seed, `${id}:count`, 1, 4)) : [],
    parcelIds: spec.component === "solar" ? offset(solarIds, "parcels", spec.hectares ?? integer(game.run.seed, `${id}:ha`, 6, 14)) : [],
    status: "open", facts: {}, fallback: "unexamined", rounds: 0, revealedBranches: [],
  };
  issue.affectedComponents=spec.component==='shared'?['shared',...(game.activeMode!=='wind'?['solar' as const]:[]),...(game.activeMode!=='solar'?['wind' as const]:[])]:[spec.component];
  if(game.activeMode==='hybrid' && spec.component==='wind' && ['corridor','habitat','water'].includes(spec.mechanism??'') && sample(game.run.seed,'lp1:sharedHabitat')<0.25) {
    issue.affectedComponents=['wind','solar','shared'];issue.facts.sharedObligation=true;
  }
  game.cases[id] = issue;
  return issue;
}
export function cost(game: GameV5, issue: CaseRecord, sourceId: string, key: string, euros: number,
  category: "development" | "landPurchase" | "contractLiability" = "development", avoidable = false, reason = entry(sourceId).title): string {
  if (!Number.isFinite(euros) || euros < 0) throw new Error("Invalid cost");
  const id = `${issue.id}:cost:${key}`;
  if (!game.costs.some(item => item.id === id)) game.costs.push({ id, caseId: issue.id, sourceId, month: game.calendar.now, euros, category, avoidable, reason });
  return id;
}
export function qualityLoss(game: GameV5, issue: CaseRecord, sourceId: string, key: string, pointsLost: number, reason: string): void {
  const id = `${issue.id}:quality:${key}`;
  if (!game.quality.some(item => item.id === id)) game.quality.push({ id, caseId: issue.id, sourceId, reason, pointsLost, repaired: false });
}
export function queueScene(game: GameV5, contentId: string, issue: CaseRecord | null = null, branchId: string | null = null): void {
  if (!modeAllows(game,contentId,issue)) throw new Error(`Mode rejects queued scene ${contentId}`);
  const item = entry(contentId);
  game.scenes.push({ id: contentId, caseId: issue?.id ?? null, branchId, kind: item.kind,
    outcomeId: null, nextStage: null });
}
export function schedule(game: GameV5, issue: CaseRecord, sourceId: string, choice: SourceChoice | null,
  eventId: string, options: { duration?: number; baseline?: number; milestone?: Milestone; key?: string;
    euros?: number; avoidableCost?: boolean; dependencies?: string[]; earliest?: number; baselineEarliest?: number;
    season?: { start: number; end: number; period: number }; observation?: string; branchId?: string | null } = {}): void {
  entry(eventId);
  if(!modeAllows(game,eventId,issue))throw new Error(`Mode rejects scheduled result ${eventId}`);
  const key = options.key ?? `${sourceId}:${choice ?? "event"}:${eventId}:${issue.rounds}`;
  const workId = `${issue.id}:work:${key}`;
  if (game.outcomes.some(item => item.id === `${workId}:outcome`)) return;
  const duration = options.duration ?? 3;
  const baseline = options.baseline ?? duration;
  const invoice = options.euros ? cost(game, issue, sourceId, key, options.euros, "development", options.avoidableCost ?? false) : null;
  const work = orderWork(game.calendar, {
    id: workId, caseId: issue.id, sourceId, planRevision: game.planRevision, component: issue.component,
    duration, baselineDuration: baseline, dependencies: options.dependencies ?? [], season: options.season ?? null,
    costId: invoice, observation: options.observation ?? String(sample(game.run.seed, `${issue.id}:observation:${eventId}`)),
    delayCause: duration > baseline ? "choice" : "normal", earliestStart: options.earliest, baselineEarliestStart: options.baselineEarliest,
  });
  work.binding={sourceId,choice,eventId};
  game.outcomes.push({ id: `${workId}:outcome`, caseId: issue.id, sourceId, sourceChoice: choice,
    contentId: eventId, branchId: options.branchId ?? null, workId, dueAt: work.dueAt,
    milestone: options.milestone ?? "any", planRevision: game.planRevision,
    sequence: game.nextSequence++, status: "pending" });
  issue.status = "working";
}
export function followup(game: GameV5, issue: CaseRecord, contentId: string): void {
  if(issue.component==='wind' && game.activeMode!=='solar' && !game.run.assets.windSites.some(x=>!x.exclusions.length)) {
    issue.fallback='unavailable';finish(game,'scope','LOPPU-LAAJUUS',issue,{},'scope');return;
  }
  if (game.scenes.some(scene => scene.id === contentId && scene.caseId === issue.id)) return;
  issue.status = "awaitingDecision";
  queueScene(game, contentId, issue);
}
export function resolveCase(issue: CaseRecord): void { issue.status = "resolved"; issue.facts.blocking = false; }
export function workOnly(game: GameV5, issue: CaseRecord, sourceId: string, key: string, duration: number, euros = 0, baseline = duration): string {
  const id = `${issue.id}:work:${key}`;
  orderWork(game.calendar, { id, caseId: issue.id, sourceId, planRevision: game.planRevision,
    component: issue.component, duration, baselineDuration: baseline, dependencies: [], season: null,
    costId: euros ? cost(game, issue, sourceId, key, euros) : null,
    observation: "specified-work", delayCause: duration > baseline ? "choice" : "normal" });
  return id;
}
