import { getDerivedStats } from "../../engine";
import { scopeRatio } from "./assets";
import { entry } from "./content";
import { calculateScore } from "./score";
import { permitGoalReached } from "./procedure";
import { assessFailure, interceptFailure } from './recovery';
import type { CaseRecord, Ending, GameV5 } from "./types";

export function finish(game: GameV5, kind: Ending["kind"], contentId: string, issue: CaseRecord | null = null,
  values: Record<string, string> = {}, originalCause: Ending["originalCause"] = null): void {
  if (game.ending) return;
  if (kind === "win" && !permitGoalReached(game)) throw new Error("Permit goal has not been met");
  if (kind !== "win" && permitGoalReached(game)) return;
  if (kind !== 'win' && interceptFailure(game,assessFailure(game,kind,contentId,issue,values,originalCause))) return;
  if (kind === 'win' && game.routeCategory === 'hybrid_solar') contentId='LP1-E-H03';
  entry(contentId);
  game.ending = { kind, contentId, causeCaseId: issue?.id ?? null, originalCause, month: game.calendar.now,
    values, score: kind === "win" ? calculateScore(game) : null };
  // Terminal state retains queued result narration, but never offers another risky choice.
  game.scenes = game.scenes.filter(scene => scene.kind !== "decision" && scene.kind !== "transition");
  for (const pending of game.outcomes) if (pending.status === "pending") pending.status = "cancelled";
}
export function finishKnownChoice(game: GameV5, issue: CaseRecord): void {
  if (issue.status !== "ignored" || issue.fallback !== "viable") throw new Error("Choice failure requires an available solution deliberately left unresolved");
  const decision = [...game.decisions].reverse().find(item => item.caseId === issue.id && item.choice === "B");
  if (!decision) throw new Error("Choice failure has no matching decision");
  finish(game, "choices", "LOPPU-VALINTA", issue, {
    decisionLabel: entry(decision.contentId).choices.B!.label,
    blockingIssue: entry(issue.sourceId).title,
    availableAlternative: entry(decision.contentId).choices.A!.label,
  }, "choices");
}
export function checkScope(game: GameV5, issue: CaseRecord | null = null): void {
  if (game.ending) return;
  const d = getDerivedStats(game.run);
  if(game.activeMode!=='solar' && d.windMWac<game.initial.minimumWindMW){
    const cause=issue??Object.values(game.cases).find(c=>c.component==='wind'&&c.placeIds.some(id=>game.run.assets.windSites.find(s=>s.id===id)?.exclusions.length))??null;
    if(cause)cause.fallback='unavailable';
    finish(game,'scope','LOPPU-LAAJUUS',cause,{},'scope');return;
  }
  const coreViable = d.windMWac >= game.initial.minimumWindMW || d.solarHa >= game.initial.minimumSolarHa;
  if (!coreViable || scopeRatio(game) < game.initial.minimumScopeRatio) finish(game, "scope", "LOPPU-LAAJUUS", issue, {}, "scope");
}
