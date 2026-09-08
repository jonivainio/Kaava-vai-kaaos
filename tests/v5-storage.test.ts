import { afterEach, describe, expect, it, vi } from "vitest";
import { createGame, choose, continueStory, currentDecision, token, sourceChoice, serializeGame, restoreGame, openEpilogue, canOpenEpilogue } from "../src/game/v5";
import { saveCurrent, recovery, GAME_KEY, BACKUP_KEY } from "../src/ui/gameStorage";
afterEach(() => vi.unstubAllGlobals());
describe("v5 save integrity across updates and epilogue", () => {
  it.each(['{"version":"swipe-fi-007","state":{"cursor":12}}', '{broken-json', '{"actions":[],"version":"swipe-v5-1"}'])("K58 incompatible save remains exact exportable raw: %s", raw => {
    const values = new Map([[GAME_KEY, raw]]);
    vi.stubGlobal("localStorage", { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) });
    expect(restoreGame(raw)).toMatchObject({ ok: false, recoverableRaw: raw });
    saveCurrent(createGame("new-after-import"));
    expect(values.get(BACKUP_KEY)).toBe(raw); expect(recovery()).toBe(raw);
    expect(restoreGame(values.get(GAME_KEY)!)).toMatchObject({ ok: true });
  });
  it("K15/K48 win, optional BESS decisions and their result narration replay with the original sealed score", () => {
    let game;
    for (let i = 0; i < 50; i++) {
      let run = createGame(`v5-epilogue-test-${i}`);
      for (let turn = 0; turn < 600 && (!run.ending || run.scenes.length); turn++) {
        run = currentDecision(run) ? choose(run, token(run), sourceChoice(run, "left") === "A" ? "left" : "right") : continueStory(run, token(run));
      }
      if (canOpenEpilogue(run)) { game = run; break; }
    }
    expect(game).toBeTruthy(); if (!game) throw new Error("No winning battery fixture");
    const score = structuredClone(game.ending!.score);
    game = openEpilogue(game, token(game));
    for (let step = 0; step < 10 && game.scenes.length; step++) {
      const restored = restoreGame(serializeGame(game));
      expect(restored).toMatchObject({ ok: true });
      if (!restored.ok) throw new Error(restored.error);
      expect(restored.state).toEqual(game);
      const before = game;
      game = currentDecision(game) ? choose(game, token(game), "right") : continueStory(game, token(game));
      expect(game).not.toBe(before); expect(game.ending!.score).toEqual(score);
    }
    expect(game.scenes).toHaveLength(0); expect(game.ending!.kind).toBe("win");
    expect(restoreGame(serializeGame(game))).toMatchObject({ ok: true });
  });
});
