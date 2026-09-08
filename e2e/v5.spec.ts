import { test, expect, type Page } from "@playwright/test";
import { createGame, choose, continueStory, currentDecision, sourceChoice, token, serializeGame } from "../dist/v5/index.js";
import { readFileSync } from "node:fs";
const KEY = "kaava-vai-kaaos:swipe:2";
async function start(page: Page, seed = "v5-browser") {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("kaava-vai-kaaos:swipe:tutorial", "done"));
  await page.getByRole("button", { name: "Avaa pelivalikko" }).click();
  await page.getByPlaceholder("Arvotaan, jos jätät tyhjäksi").fill(seed);
  await page.getByRole("button", { name: "Sulje pelivalikko" }).click();
  await page.getByRole("button", { name: /Aloita hanke/ }).click();
}
async function swipe(page: Page, direction: "left" | "right", distance = 125) {
  const card = page.getByTestId("swipe-card");
  await card.scrollIntoViewIfNeeded();
  const b = (await card.boundingBox())!;
  const x = b.x + b.width / 2, y = b.y + Math.min(b.height / 2, 150);
  await page.mouse.move(x, y); await page.mouse.down();
  await page.mouse.move(x + (direction === "left" ? -distance : distance), y, { steps: 8 });
  await page.mouse.up();
}
async function saved(page: Page) { return page.evaluate(key => JSON.parse(localStorage.getItem(key)!), KEY); }

for (const width of [360, 390, 430, 1163]) test(`v5 story and decision swipes at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: width > 500 ? 1010 : 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await start(page);
  await expect(page.locator(".narration-paper")).toBeVisible();
  await page.screenshot({ path: `reports/v5/browser/story-${width}.png` });
  const initial = await saved(page);
  await swipe(page, "left", 20);
  expect(await saved(page)).toEqual(initial);
  await swipe(page, "right");
  await expect.poll(async () => (await saved(page)).revision).toBe(1);
  expect((await saved(page)).calendar.now).toBe(initial.calendar.now);
  expect((await saved(page)).decisions).toHaveLength(0);
  await expect(page.locator(".question")).toBeVisible();
  const image = page.locator('.swipe-card img');
  expect(await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: `reports/v5/browser/decision-${width}.png` });
  await swipe(page, "left");
  await expect.poll(async () => (await saved(page)).decisions.length).toBe(1);
  await expect(page.locator('[role="alert"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("touch swipe, cancelled scroll and a repeated key confirm only one decision", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await start(page, "v5-touch");
  const cdp = await page.context().newCDPSession(page);
  const card = page.getByTestId("swipe-card");
  const box = (await card.boundingBox())!, x = box.x + box.width / 2, y = box.y + box.height / 2;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x + 15, y: y + 80 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  expect((await saved(page)).revision).toBe(0);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - 135, y }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(async () => (await saved(page)).revision).toBe(1);
  await page.getByTestId("swipe-card").focus();
  await page.keyboard.down("ArrowRight"); await page.keyboard.down("ArrowRight"); await page.keyboard.up("ArrowRight");
  await expect.poll(async () => (await saved(page)).decisions.length).toBe(1);
  expect((await saved(page)).revision).toBe(2);
});

for (const width of [360, 430]) test(`longest actual source fields remain readable at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  const entries = JSON.parse(readFileSync("content/v5.fi.json", "utf8")).entries;
  const decisions = entries.filter((item: { kind: string }) => item.kind === "decision");
  const longest = (key: "title" | "body") => [...decisions].sort((a, b) => b[key].length - a[key].length)[0];
  const longestChoice = [...decisions].sort((a, b) => Math.max(b.choices.A.label.length, b.choices.B.label.length) - Math.max(a.choices.A.label.length, a.choices.B.label.length))[0];
  await page.goto("/?review-v5");
  for (const item of [longest("title"), longest("body"), longestChoice]) {
    await page.getByLabel("Sisältö-ID").selectOption(item.id);
    await expect(page.locator(".narrative h1")).toHaveText(item.title);
    await expect(page.locator(".question")).toHaveText(item.body);
    for (const selector of [".narrative h1", ".question", ".choice-hints"]) {
      const element = page.locator(selector);
      if (await element.count()) expect(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
    }
    await page.screenshot({ path: `reports/v5/browser/long-${width}-${item.id.replace(/[^a-z0-9-]/gi, "-")}.png` });
  }
  const results = entries.flatMap((item: any) => [...item.branches.map((branch: any) => ({ id: item.id, variant: branch.id, text: `${item.body}\n\n${branch.text}` })),
    ...["A", "B"].flatMap(choice => item.choices[choice] ? [{ id: item.id, variant: choice, text: item.choices[choice].result }] : [])]);
  const result = results.sort((a: any, b: any) => b.text.length - a.text.length)[0];
  await page.getByLabel("Sisältö-ID").selectOption(result.id); await page.getByLabel("Tuloshaara").selectOption(result.variant);
  const paragraph = page.locator(".narration-paper p").last();
  await expect(paragraph).toHaveText(result.text);
  expect(await paragraph.evaluate(node => getComputedStyle(node).textOverflow)).not.toBe("ellipsis");
  await paragraph.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `reports/v5/browser/long-result-${width}.png` });
});

test("a complete v5 run follows the same decisions, waits and stage transitions in the browser", async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  let model;
  for (let i = 0; i < 200; i++) {
    let trial = createGame(`v5-ui-win-${i}`);
    for (let turn = 0; turn < 400 && (!trial.ending || trial.scenes.length); turn++) {
      trial = currentDecision(trial) ? choose(trial, token(trial), sourceChoice(trial, "left") === "A" ? "left" : "right") : continueStory(trial, token(trial));
    }
    if (trial.ending?.kind === "win") { model = createGame(`v5-ui-win-${i}`); break; }
  }
  expect(model).toBeTruthy();
  await start(page, model.run.seed);
  let transitions = 0;
  for (let turn = 0; turn < 400 && (!model.ending || model.scenes.length); turn++) {
    const before = model;
    if (model.scenes[0]?.kind === "transition") {
      transitions++;
      const snapshot = await page.evaluate(key => localStorage.getItem(key), KEY);
      await page.reload(); await page.getByRole("button", { name: /Jatka ·/ }).click();
      expect(await page.evaluate(key => localStorage.getItem(key), KEY)).toBe(snapshot);
      await expect(page.locator(".transition-screen")).toBeVisible();
      await page.screenshot({ path: `reports/v5/browser/transition-${transitions}.png` });
      await page.getByRole("button", { name: "Siirry seuraavaan vaiheeseen" }).click();
      model = continueStory(model, token(model));
    } else {
      const side = currentDecision(model) && sourceChoice(model, "left") !== "A" ? "right" : "left";
      await page.getByTestId("swipe-card").focus();
      await page.keyboard.press(side === "left" ? "ArrowLeft" : "ArrowRight");
      model = currentDecision(model) ? choose(model, token(model), side) : continueStory(model, token(model));
    }
    expect(model).not.toBe(before);
    await expect.poll(async () => (await saved(page)).revision).toBe(model.revision);
    expect(serializeGame(await saved(page))).toBe(serializeGame(model));
  }
  expect(transitions).toBe(3);
  await expect(page.getByRole("heading", { name: "Hanke on luvitettu" })).toBeVisible();
  await expect(page.locator(".score-total")).toContainText(String(model.ending.score.total));
  await page.screenshot({ path: "reports/v5/browser/win.png" });
});

test("local review exposes every ID and branch without changing the ordinary save", async ({ page }) => {
  test.setTimeout(120000);
  const source = JSON.parse(readFileSync("content/v5.fi.json", "utf8"));
  await page.goto("/");
  const raw = '{"old-save":"preserve exactly"}';
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: KEY, raw });
  await page.goto("/?review-v5");
  const errors: string[] = []; page.on("pageerror", error => errors.push(String(error)));
  for (const entry of source.entries) {
    await page.getByLabel("Sisältö-ID").selectOption(entry.id);
    const variants = await page.getByLabel("Tuloshaara").locator("option").evaluateAll(options => options.map(option => (option as HTMLOptionElement).value));
    for (const variant of variants) {
      await page.getByLabel("Tuloshaara").selectOption(variant);
      await expect(page.getByTestId("swipe-card")).toBeVisible();
    }
  }
  expect(errors).toEqual([]);
  expect(await page.evaluate(key => localStorage.getItem(key), KEY)).toBe(raw);
});
