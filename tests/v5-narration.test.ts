import { describe, expect, it } from "vitest";
import { createGame, choose, continueStory, currentDecision, currentStory, restoreGame, serializeGame, sourceChoice, token } from "../src/game/v5";
import { initialState } from "../src/game/v5/state";
import { entry } from "../src/game/v5/content";
import { inlineResult, reactionFor, SILENT_PROGRESS } from "../src/game/v5/narration";
import type { Scene } from "../src/game/v5/types";

const event = (id: string, branchId: string | null = null): Scene => ({ id, branchId, kind: "event", caseId: null, outcomeId: null, nextStage: null });
describe("compact narration without hidden consequences", () => {
  it("merges routine confirmations in order but stops before the bad branch and its follow-up", () => {
    const game = initialState("inline-results");
    game.scenes = [event("start"), event("EV-MAA", "b-a9a851bde444"), event("interludes[0][0]"),
      event("EV-NAAPURITIETO", "b-59a9660da17a"), event("EV-NAAPURITIETO", "b-6382d72d9a62")];
    const next = continueStory(game, token(game));
    expect(next.scenes).toHaveLength(1);
    expect(next.scenes[0]?.branchId).toBe("b-6382d72d9a62");
    expect(next.narration.updates).toEqual([
      "Vuokrasopimus liitteineen hyväksyttiin. Kiinteistö pysyy mukana.",
      "Naapurin uusi sijoittelu saatiin mukaan yhteisarvioon ajoissa.",
    ]);
    expect(next.calendar).toEqual(game.calendar);
    expect(next.actions).toHaveLength(1);
    expect(continueStory(next, token(game))).toBe(next);
    expect(currentStory(next)?.body).toBe(entry("EV-NAAPURITIETO").branches[1]?.text);
  });
  it("keeps approvals, research benefits, asset changes, deadlines and unknown results standalone", () => {
    for (const [id, branch] of [
      ["EV-PV", "b-4a0d6eae8837"], ["EV-MAA", "b-54a3814be149"], ["EV-OPTIO", "b-063f9a2e38ef"],
      ["EV-TUTKIMUS", "b-f6c430b63b0b"], ["EV-KOTKA", "b-b81508679f08"],
      ["EV-MELU", "b-4123b3c2c8de"], ["EV-NATURA", "b-a4e99c4147a8"],
      ["EV-KUULEMINEN", null], ["EV-LAINVOIMA", null], ["EV-HYVAKSYNTA", null], ["EV-VALITUS", "b-1bb00a5a5a08"],
    ]) {
      expect(inlineResult(event(id!, branch ?? null))).toBeUndefined();
      expect(SILENT_PROGRESS.has(id!)).toBe(false);
    }
  });
  it("reacts to the actual bad branch, never to a generic outcome title or a routine approval", () => {
    expect(reactionFor({ ...event("nature-bird-area"), kind: "decision" })).toBe("Jaaha, mitä nyt taas?");
    expect(reactionFor(event("EV-MAASTOKAUSI", "b-540cb956df24"))).toBe("Voi ei!");
    expect(reactionFor(event("EV-MAASTOKAUSI", "b-0b3409b88c41"))).toBeUndefined();
    expect(reactionFor(event("EV-HYVAKSYNTA"))).toBeUndefined();
    expect(reactionFor(event("LOPPU-ULKOINEN"))).toBeUndefined();
  });
  it("caps waits, preserves inline receipts on reload and reaches the same known permit victory", () => {
    let game = createGame("v5-ui-win-2"), previousWait = false, waits = 0, reloads = 0, inlineSeen = 0;
    for (let i = 0; i < 200 && (!game.ending || game.scenes.length); i++) {
      const waiting = game.scenes[0]?.kind === "wait";
      expect(waiting && previousWait).toBe(false); previousWait = waiting;
      if (waiting) waits++;
      if (game.narration.updates.length) inlineSeen++;
      if (game.narration.updates.length || game.scenes[0]?.kind === "transition" || waiting) {
        expect(restoreGame(serializeGame(game))).toEqual({ ok: true, state: game }); reloads++;
      }
      expect(SILENT_PROGRESS.has(game.scenes[0]!.id)).toBe(false);
      game = currentDecision(game) ? choose(game, token(game), sourceChoice(game, "left") === "A" ? "left" : "right") : continueStory(game, token(game));
    }
    expect(game.ending).toMatchObject({ kind: "win", score: { total: expect.any(Number) } });
    expect(game.decisions).toHaveLength(22); expect(waits).toBeLessThanOrEqual(3);
    expect(waits).toBeGreaterThan(0); expect(inlineSeen).toBeGreaterThan(0); expect(reloads).toBeGreaterThanOrEqual(6);
    expect(game.procedure.planFinal).toBe(true);
    expect(game.outcomes.some(outcome => outcome.status === "queued")).toBe(false);
    const raw = JSON.stringify({ ...game, rulesVersion: "v5-rules-2" });
    expect(restoreGame(raw)).toMatchObject({ ok: false, recoverableRaw: raw });
  });
});
