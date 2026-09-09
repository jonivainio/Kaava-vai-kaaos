import { describe, expect, it } from "vitest";
import { initialState } from "../src/game/v5/state";
import { continueStory, token, createGame, choose, currentDecision, sourceChoice, restoreGame, serializeGame } from "../src/game/v5";
import { openCase, workOnly, schedule } from "../src/game/v5/operations";
import { excludeAssets, changeTurbines, curtailYield } from "../src/game/v5/assets";
import { assetValues, recordAssetChanges } from "../src/game/v5/assetChanges";

function waiting() {
  const game = initialState("pacing-parallel");
  game.scenes.push({ id: "@wait", kind: "wait", caseId: null, outcomeId: null, branchId: null, nextStage: null });
  return game;
}
describe("shorter run and visible physical changes", () => {
  it("one swipe waits through silent parallel completions without summing durations or confirming twice", () => {
    const game = waiting(), issue = openCase(game, "road", { family: "parallel", component: "shared" });
    workOnly(game, issue, "road", "first", 4); workOnly(game, issue, "road", "second", 6);
    const next = continueStory(game, token(game));
    expect(next.calendar.now).toBe(6); expect(next.calendar.advances).toHaveLength(2);
    expect(next.scenes[0]?.kind).not.toBe("wait"); expect(next.actions).toHaveLength(1);
    expect(continueStory(next, token(game))).toBe(next);
  });
  it("combined waiting stops at the first substantive result and leaves later work pending", () => {
    const game = waiting(), issue = openCase(game, "land-map-versions", { family: "missingPages", component: "wind", count: 1 });
    issue.choice = "A";
    schedule(game, issue, "land-map-versions", "A", "EV-SOPIMUSSIVUT", { duration: 4 });
    workOnly(game, issue, "road", "later", 6);
    const next = continueStory(game, token(game));
    expect(next.calendar.now).toBe(4); expect(next.scenes[0]?.id).toBe("EV-SOPIMUSSIVUT");
    expect(next.calendar.orders.find(work => work.id.endsWith(":later"))?.status).toBe("active");
  });
  it("per-metric changes preserve the previous actual amount, with no false MW loss from curtailment", () => {
    const game = initialState("visible-assets"), next = structuredClone(game);
    const wind = openCase(next, "nature", { family: "loss", component: "wind", count: 1 });
    excludeAssets(next, wind); next.revision++; recordAssetChanges(game, next);
    expect(next.assetChanges.count).toMatchObject({ from: assetValues(game).count, to: assetValues(next).count });
    expect(next.assetChanges.power).toBeDefined(); expect(next.assetChanges.solar).toBeUndefined();
    const solar = structuredClone(next), sunCase = openCase(solar, "solarNature", { family: "solar-loss", component: "solar", hectares: 9 });
    excludeAssets(solar, sunCase); solar.revision++; recordAssetChanges(next, solar);
    expect(solar.assetChanges.count).toEqual(next.assetChanges.count); expect(solar.assetChanges.solar?.from).toBe(assetValues(next).solar);
    const shortened = structuredClone(solar), ids = shortened.run.assets.windSites.filter(site => !site.exclusions.length).map(site => site.id);
    changeTurbines(shortened, [ids[0]!], "F8", 250); shortened.revision++; recordAssetChanges(solar, shortened);
    expect(shortened.assetChanges.height).toMatchObject({ from: "300", to: "250–300" });
    const quieter = structuredClone(shortened); curtailYield(quieter, "noise", ids, 0.1); recordAssetChanges(shortened, quieter);
    expect(quieter.assetChanges.power).toEqual(shortened.assetChanges.power);
  });
  it("actual reducer changes and their badges survive replay and unrelated narration", () => {
    let game = createGame("v5-ui-win-2"), found = false;
    for (let step = 0; step < 200 && !game.ending; step++) {
      game = currentDecision(game) ? choose(game, token(game), sourceChoice(game, "left") === "A" ? "left" : "right") : continueStory(game, token(game));
      if (Object.keys(game.assetChanges).length) { found = true; break; }
    }
    expect(found).toBe(true);
    const loaded = restoreGame(serializeGame(game)); expect(loaded).toMatchObject({ ok: true });
    if (loaded.ok) expect(loaded.state.assetChanges).toEqual(game.assetChanges);
    const old = JSON.stringify({ ...game, rulesVersion: "v5-rules-1" });
    expect(restoreGame(old)).toMatchObject({ ok: false, recoverableRaw: old });
  });
});
