import { getDerivedStats, restoreRun } from "../../engine";
import { branchText, countWord, entry, interpolate, CONTENT_VERSION } from "./content";
import { initialiseDecks, direct, beginStage, countBaseChoice } from "./director";
import { initialState } from "./state";
import { recordAssetChanges } from "./assetChanges";
import { inlineResult, PROGRESS_LIMIT, reactionFor, SHORT_STORIES, SILENT_PROGRESS } from "./narration";
import { ruleFor } from "./rules";
import { advanceToNextWork, publishDue, settleCompletedWork } from "./timeline";
import { pick, sample } from "./world";
import { beginEpilogue, canOpenEpilogue, isEpilogueDecision } from "./epilogue";
import type { CaseRecord, GameV5, Mode, NamePool, Scene, Side, SourceChoice } from "./types";
export type { GameV5 as Game, Mode, Side } from "./types";
export { getDerivedStats };
export { canOpenEpilogue };
export const STAGES = ["Maanvuokraus", "Kaava-aloite ja YVA-ohjelma", "YVA-selostus ja kaavaluonnos", "Kaavaehdotus ja luvitus"];

export function createGame(seed: string, mode: Mode = "hybrid", previousNameId?: string, namePool?: NamePool): GameV5 {
  const game = initialState(seed, mode, previousNameId, namePool);
  initialiseDecks(game);
  return game;
}
export function token(game: GameV5): string {
  const scene = game.scenes[0];
  return `${game.version}:${game.revision}:${scene?.id ?? game.ending?.contentId ?? "idle"}:${scene?.caseId ?? ""}`;
}
export function sourceChoice(game: GameV5, side: Side): SourceChoice {
  const scene = game.scenes[0];
  if (scene?.kind !== "decision") throw new Error("There is no current decision");
  const aLeft = sample(game.run.seed, `sides:${scene.id}:${scene.caseId}`) < 0.5;
  return side === "left" === aLeft ? "A" : "B";
}
export function values(game: GameV5, issue: CaseRecord | null = null): Record<string, string | number> {
  const count = Math.max(1, issue?.placeIds.length ?? 1);
  const species = { forestDeer: "metsäpeuran", golden: "maakotkan", reindeer: "poronhoidon", wolf: "suden" }[game.world.researchSpecies];
  const score = game.ending?.score;
  return { count: countWord(count), countCap: countWord(count, true), species, cost: game.world.researchCost.toLocaleString("fi-FI"),
    scopeScore: score?.scope ?? 0, timeScore: score?.time ?? 0, qualityScore: score?.quality ?? 0, resourceScore: score?.resource ?? 0, totalScore: score?.total ?? 0,
    ...game.ending?.values };
}
export function playerText(game: GameV5, text: string, issue: CaseRecord | null = null, displayValues: Record<string, string | number> = {}): string {
  // Only grammatical agreement adjacent to an authored count variable is adjusted.
  // The source strings themselves remain immutable and verifiable against v5.
  if (issue?.placeIds.length) {
    const count = issue.placeIds.length;
    const genitive = ["", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", "seitsemän", "kahdeksan", "yhdeksän", "kymmenen"][count] ?? String(count);
    text = text.replace(/\{count(Cap)?\}( (?:(?:suunnitellun )?voimalapaikan|voimalan)\b)/g,
      (_match, capital: string | undefined, noun: string) => `${capital ? genitive[0]!.toUpperCase() + genitive.slice(1) : genitive}${noun}`);
  }
  if (issue?.placeIds.length === 1) {
    text = text.replace(/parhaat \{count\} voimalapaikkaa ovat/g, "paras voimalapaikka on")
      .replace(/(\{count(?:Cap)?\}) omaa voimalaa/g, "$1 oma voimala")
      .replace(/(\{count(?:Cap)?\}) omaa paikkaa ongelmallisiksi/g, "$1 oma paikka ongelmalliseksi")
      .replace(/(\{count(?:Cap)?\}) voimalaa/g, "$1 voimala")
      .replace(/(\{count(?:Cap)?\}) voimalapaikkaa/g, "$1 voimalapaikka")
      .replace(/(\{count(?:Cap)?\}) paikkaa/g, "$1 paikka")
      .replace(/voimalapaikka ja niiden tiet/g, "voimalapaikka ja sen tiet");
  }
  return interpolate(text, { ...values(game, issue), ...displayValues });
}
export function currentDecision(game: GameV5) {
  const scene = game.scenes[0];
  if (!scene || scene.kind !== "decision" || game.ending && !isEpilogueDecision(game, scene.id)) return null;
  const item = entry(scene.id), issue = scene.caseId ? game.cases[scene.caseId]! : null;
  const rule = ruleFor(item.id);
  let art = rule.art;
  const batteryArt: Record<string, string[]> = {
    "BESS-P1-01": ["battery-layout", "contract-pages"], "BESS-P1-02": ["battery-layout", "battery-limits"],
    "BESS-P1-03": ["battery-water", "reserve-wetland"], "BESS-P2-01": ["shared-power", "battery-technical"],
    "BESS-P2-02": ["battery-limits", "battery-technical"], "BESS-P2-03": ["permit-folder", "battery-layout"],
    "BESS-P2-04": ["battery-layout", "documents"], "BESS-P2-05": ["battery-technical", "technical-standard"],
  };
  if (batteryArt[item.id]) art = batteryArt[item.id]!;
  if (issue?.family === "publicResearch") art = game.world.researchSpecies === "golden" ? ["eagle-tracking", "ecologist"] : game.world.researchSpecies === "wolf" ? ["wolf-tracking", "ecologist"] : ["research-tracking", "ecologist"];
  else if (issue?.species === "golden") art = art.map(key => key === "research-tracking" ? "eagle-tracking" : key);
  if (item.id === "proposal::solar-base") art = ["solar-window", "winter-screen"];
  const side = (direction: Side) => ({ label: playerText(game, item.choices[sourceChoice(game, direction)]!.label, issue), action: sourceChoice(game, direction), note: "" });
  return { id: item.id, title: playerText(game, item.title, issue), question: playerText(game, item.body, issue),
    reaction: reactionFor(scene), summary: [game.lastOutcome, ...game.narration.updates].filter(Boolean).join("\n\n"),
    art: pick(game.run.seed, `art:${item.id}`, art), speaker: speaker(issue), options: [side("left"), side("right")] as const };
}
function speaker(issue: CaseRecord | null): string {
  if (!issue) return "Hankeryhmä";
  if (issue.component === "bess") return "Akkusuunnittelija";
  if (issue.species) return "Luontoasiantuntija";
  if (issue.mechanism === "noise") return "Melumallintaja";
  if (issue.mechanism === "land") return "Maanomistaja";
  if (issue.mechanism === "water") return "Vesiasiantuntija";
  return "Hankeryhmä";
}
export function currentStory(game: GameV5) {
  const scene = game.scenes[0];
  if (!scene || scene.kind === "decision" || scene.kind === "wait") return null;
  const item = entry(scene.id), issue = scene.caseId ? game.cases[scene.caseId]! : null;
  // The headline names the assessment; its generic introduction need not repeat it.
  const text = scene.kind === "epilogue" ? game.decisions.at(-1)!.result : item.branches.length ? branchText(item.id, scene.branchId) : SHORT_STORIES[item.id] ?? item.body;
  return { id: item.id, title: playerText(game, item.title, issue), body: playerText(game, text, issue), kind: scene.kind,
    reaction: reactionFor(scene), updates: game.narration.updates,
    result: Boolean(scene.outcomeId), stage: scene.nextStage };
}
export function previewChoice(game: GameV5, expected: string, side: Side) {
  if (token(game) !== expected || !currentDecision(game)) return null;
  // No reducer, cost, world sampling or time advancement is run by a gesture preview.
  const item = entry(game.scenes[0]!.id);
  const choice = sourceChoice(game, side);
  return { token: expected, side, label: playerText(game, item.choices[choice]!.label, game.cases[game.scenes[0]!.caseId!]!) };
}
export function choose(game: GameV5, expected: string, side: Side): GameV5 {
  if (expected !== token(game) || game.scenes[0]?.kind !== "decision" || game.ending && !isEpilogueDecision(game, game.scenes[0].id)) return game;
  const next = structuredClone(game), scene = next.scenes.shift()!, rule = ruleFor(scene.id);
  const issue = next.cases[scene.caseId!];
  if (!issue) throw new Error("Decision has no case");
  if (!rule.eligible(next, scene.id)) throw new Error(`Decision preconditions no longer hold: ${scene.id}`);
  const choice = sourceChoice(game, side);
  countBaseChoice(next, scene.id);
  issue.choice = choice; issue.rounds++; issue.status = "open";
  const branch = rule.apply(next, issue, scene.id, choice);
  const result = playerText(next, branchText(scene.id, branch, choice), issue);
  next.decisions.push({ token: expected, contentId: scene.id, caseId: issue.id, choice, side, month: next.calendar.now,
    planRevision: next.planRevision, branchId: branch, result });
  if (!next.seenIds.includes(scene.id)) next.seenIds.push(scene.id);
  next.lastOutcome = result;
  next.narration.updates = []; next.narration.lastWasProgress = false;
  next.revision++;
  next.actions.push({ kind: "choice", token: expected, side });
  if (next.ending) next.scenes.unshift({ ...scene, kind: "epilogue" });
  settleCompletedWork(next); publishDue(next); direct(next);
  compactNarration(next);
  recordAssetChanges(game, next);
  return next;
}
export function continueStory(game: GameV5, expected: string): GameV5 {
  if (expected !== token(game) || !game.scenes.length || game.scenes[0]?.kind === "decision") return game;
  const next = structuredClone(game), scene = next.scenes.shift()!;
  next.narration.updates = [];
  if (scene.kind === "wait") {
    next.narration.progressCount++;
    if (!next.narration.progressStages.includes(next.stage)) next.narration.progressStages.push(next.stage);
    next.narration.lastWasProgress = true;
    next.lastOutcome = "";
    advanceToNextWork(next);
  }
  else {
    next.lastOutcome = "";
    next.narration.lastWasProgress = false;
    acknowledgeScene(next, scene);
    if (scene.kind === "transition") { next.stage = scene.nextStage!; beginStage(next); }
  }
  next.revision++;
  next.actions.push({ kind: "continue", token: expected });
  direct(next);
  compactNarration(next);
  recordAssetChanges(game, next);
  return next;
}
function acknowledgeScene(game: GameV5, scene: Scene): void {
  if (!game.seenIds.includes(scene.id)) game.seenIds.push(scene.id);
  if (scene.outcomeId) game.outcomes.find(outcome => outcome.id === scene.outcomeId)!.status = "revealed";
}
/** Presentation-only routing. Each hidden wait still advances the actual shared
 * clock and runs every resolver, deadline and procedure check in its normal order.
 * Never inspect prose or skip a choice, material result, transition or ending.
 */
function compactNarration(game: GameV5): void {
  for (let steps = 0; steps < 400; steps++) {
    const scene = game.scenes[0];
    if (!scene) return;
    if (scene.kind === "wait") {
      if (game.narration.progressCount < PROGRESS_LIMIT && !game.narration.progressStages.includes(game.stage) && !game.narration.lastWasProgress) return;
      game.scenes.shift(); advanceToNextWork(game); direct(game); continue;
    }
    if (scene.kind !== "event" || game.ending) return;
    const summary = inlineResult(scene);
    if (!SILENT_PROGRESS.has(scene.id) && summary === undefined) return;
    game.scenes.shift(); acknowledgeScene(game, scene);
    if (summary) {
      const issue = scene.caseId ? game.cases[scene.caseId]! : null;
      game.narration.updates.push(playerText(game, summary, issue));
    }
    direct(game);
  }
  throw new Error("Narration compaction did not settle");
}
export function getScore(game: GameV5) { return game.ending?.kind === "win" ? game.ending.score : null; }
export function openEpilogue(game: GameV5, expected: string): GameV5 {
  if (expected !== token(game) || !canOpenEpilogue(game)) return game;
  const next = structuredClone(game);
  beginEpilogue(next); next.revision++;
  next.actions.push({ kind: "epilogue", token: expected });
  return next;
}
export function endingView(game: GameV5) {
  if (!game.ending) return null;
  const item = entry(game.ending.contentId);
  const issue = game.ending.causeCaseId ? game.cases[game.ending.causeCaseId]! : null;
  return { title: playerText(game, item.title, issue), body: playerText(game, item.body, issue) };
}
export function scoreView(game: GameV5) {
  const item = entry("PISTEET");
  return { title: item.title, body: playerText(game, item.body) };
}
export function serializeGame(game: GameV5): string { return JSON.stringify(game); }
export function restoreGame(raw: string): { ok: true; state: GameV5 } | { ok: false; error: string; recoverableRaw: string } {
  try {
    if (raw.length > 8_000_000) throw new Error("Tallennus on liian suuri.");
    const saved = JSON.parse(raw) as GameV5;
    if (saved?.version !== "swipe-v5-1" || saved.contentVersion !== CONTENT_VERSION || saved.rulesVersion !== "v5-rules-3") throw new Error("Tallennuksen sisältö- tai sääntöversio ei vastaa tätä peliä.");
    if (!Array.isArray(saved.actions) || saved.actions.length > 2000) throw new Error("Virheellinen toimintohistoria.");
    const initial = restoreRun(JSON.stringify(saved.initialRun));
    const physical = restoreRun(JSON.stringify(saved.run));
    if (!initial.ok || !physical.ok) throw new Error("Virheelliset hanketiedot.");
    let replay = structuredClone(createGame(initial.state.seed, initial.state.mode));
    for (const state of [replay.run, replay.initialRun]) {
      state.projectIdentity = structuredClone(initial.state.projectIdentity);
      state.nameRngState = initial.state.nameRngState;
    }
    for (const action of saved.actions) {
      if (action.token !== token(replay)) throw new Error("Toimintohistorian päätöstunniste ei täsmää.");
      if (action.kind === "choice" && (action.side === "left" || action.side === "right")) replay = choose(replay, action.token, action.side);
      else if (action.kind === "continue" && action.side === undefined) replay = continueStory(replay, action.token);
      else if (action.kind === "epilogue" && action.side === undefined) replay = openEpilogue(replay, action.token);
      else throw new Error("Tuntematon tallennettu toiminto.");
    }
    if (JSON.stringify(saved) !== JSON.stringify(replay)) throw new Error("Tallennuksen tila ei vastaa sen siementä ja toteutuneita toimintoja.");
    return { ok: true, state: replay };
  } catch (error) { return { ok: false, error: String(error), recoverableRaw: raw }; }
}
