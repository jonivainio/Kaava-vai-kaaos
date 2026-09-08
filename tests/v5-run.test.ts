import { describe, expect, it } from "vitest";
import { choose, continueStory, createGame, currentDecision, currentStory, previewChoice, restoreGame, serializeGame, sourceChoice, token } from "../src/game/v5";
import { sample } from "../src/game/v5/world";
import type { GameV5 } from "../src/game/v5/types";

function step(game: GameV5): GameV5 {
  const choice = currentDecision(game);
  if (choice) {
    const canonical = sample(game.run.seed, `test-choice:${game.decisions.length}`) < 0.5 ? "A" : "B";
    return choose(game, token(game), sourceChoice(game, "left") === canonical ? "left" : "right");
  }
  return continueStory(game, token(game));
}
describe("v5 active director", () => {
  it("plays independent seeds without unresolved scenes or an artificial turn victory", () => {
    const errors: string[] = [];
    for (let i = 0; i < 80; i++) {
      let game = createGame(`v5-smoke-${i}`);
      try {
        for (let turns = 0; turns < 400 && (!game.ending || game.scenes.length); turns++) {
          const before = game;
          game = step(game);
          if (game === before) throw new Error(`stuck at ${token(game)}`);
        }
        if (!game.ending) throw new Error(`no ending: ${token(game)}`);
        if (game.ending.kind === "win" && !game.procedure.planFinal) throw new Error("win without final plan");
        const visited = game.decisions.map(decision => decision.contentId);
        expect(visited.filter(id => ["land", "land-signing", "land-index", "land-minimum"].includes(id))).toHaveLength(1);
        expect(visited.some(id => ["UUSI-P1-02", "UUSI-P1-10", "BESS-P1-04", "initiative", "programme"].includes(id))).toBe(false);
        expect(game.seenIds.filter(id => ["adoption", "EV-HYVAKSYNTA"].includes(id)).length).toBeLessThanOrEqual(1);
        if (game.ending.kind === "win") expect(game.decisions.some(decision => game.cases[decision.caseId]?.component === "solar")).toBe(true);
      } catch (error) { errors.push(`${i}: ${game.stage}/${game.scenes[0]?.id}: ${String(error)}`); }
    }
    expect(errors).toEqual([]);
  });
  it("preview, repeat gestures, and narrative swipes cannot confirm twice", () => {
    let game = createGame("v5-idempotency");
    const start = token(game);
    const advanced = continueStory(game, start);
    expect(continueStory(advanced, start)).toBe(advanced);
    game = advanced;
    const raw = serializeGame(game), expected = token(game);
    previewChoice(game, expected, "left"); previewChoice(game, expected, "right");
    expect(serializeGame(game)).toBe(raw);
    const decided = choose(game, expected, "left");
    expect(choose(decided, expected, "right")).toBe(decided);
    expect(decided.decisions).toHaveLength(1);
  });
  it("restores pending work exactly and retains invalid raw data", () => {
    let game = createGame("v5-save-work");
    for (let i = 0; i < 5; i++) game = step(game);
    const raw = serializeGame(game);
    const restored = restoreGame(raw);
    expect(restored.ok ? null : restored.error).toBeNull();
    if (restored.ok) expect(serializeGame(restored.state)).toBe(raw);
    const invalid = structuredClone(game); invalid.calendar.now += 3;
    const damaged = JSON.stringify(invalid);
    expect(restoreGame(damaged)).toMatchObject({ ok: false, recoverableRaw: damaged });
    expect(restoreGame('{"version":"swipe-fi-007"}')).toMatchObject({ ok: false, recoverableRaw: '{"version":"swipe-fi-007"}' });
  });
  it("narration itself takes no time and both styles retain the exact source text", () => {
    const game = createGame("v5-narration");
    expect(currentStory(game)?.id).toBe("start");
    const next = continueStory(game, token(game));
    expect(next.calendar.now).toBe(game.calendar.now);
    expect(next.lastOutcome).toBe(currentStory(game)?.body);
  });
  it("K15/K35 name-bank changes never alter scenario, choices, observations or continued play", () => {
    let original = createGame("v5-independent-name"), renamed = createGame("v5-independent-name", "hybrid", undefined,
      { poolVersion: "test-names-2", names: [{ id: "N901", name: "Testisuo" }, { id: "N902", name: "Koeneva" }] });
    expect(original.run.projectIdentity).not.toEqual(renamed.run.projectIdentity);
    for (let turn = 0; turn < 45 && !original.ending; turn++) {
      expect(renamed.world).toEqual(original.world); expect(renamed.run.assets).toEqual(original.run.assets);
      expect(renamed.calendar).toEqual(original.calendar); expect(renamed.scenes).toEqual(original.scenes);
      original = step(original); renamed = step(renamed);
    }
    const restored = restoreGame(serializeGame(renamed));
    expect(restored).toMatchObject({ ok: true });
    if (restored.ok) { expect(restored.state).toEqual(renamed); expect(step(restored.state)).toEqual(step(renamed)); }
  });
});
