import { test, expect, type Page } from "@playwright/test";
import {
  createGame,
  currentDecision,
  choose,
  token,
  restoreGame,
} from "../dist/game/kaava-game.js";
const initial = createGame("uusi-1", "hybrid");
const firstTitle = currentDecision(initial)!.title;
const secondTitle = currentDecision(
  choose(initial, token(initial), "left"),
)!.title;
const safe = [
  "special",
  "oldRoad",
  "commission",
  "smaller",
  "now",
  "workshop",
  "fund",
  "avoid",
  "solarAvoid",
  "moveNoise",
  "moveHeight",
  "wetland",
  "respond",
  "removeEdge",
  "updateNatura",
  "renew",
  "supplement",
  "defend",
];
const KEY = "kaava-vai-kaaos:swipe:2";
test("kosketusemulaatio valitsee kerran myös fullscreen-pyynnön hylkääntyessä", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
    baseURL: "http://127.0.0.1:5173",
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    document.documentElement.requestFullscreen = () =>
      Promise.reject(new Error("Unsupported"));
  });
  await start(page);
  const b = (await page.getByTestId("swipe-card").boundingBox())!;
  const client = await context.newCDPSession(page);
  const x = b.x + b.width / 2,
    y = b.y + b.height / 2;
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  for (let i = 1; i <= 8; i++)
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x + 15 * i, y }],
    });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() =>
      page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!).state.cursor,
        KEY,
      ),
    )
    .toBe(1);
  await context.close();
});
async function swipe(page: Page, side: "left" | "right", distance = 115) {
  const b = await page.getByTestId("swipe-card").boundingBox();
  expect(b).not.toBeNull();
  const x = b!.x + b!.width / 2,
    y = b!.y + b!.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + (side === "left" ? -distance : distance), y, {
    steps: 10,
  });
  await page.mouse.up();
}
async function start(page: Page, seed = "uusi-1", tutorial = false) {
  await page.goto("/");
  if (!tutorial)
    await page.evaluate(() =>
      localStorage.setItem("kaava-vai-kaaos:swipe:tutorial", "done"),
    );
  await page.getByRole("button", { name: "Avaa pelivalikko" }).click();
  await page.getByPlaceholder("Arvotaan, jos jätät tyhjäksi").fill(seed);
  await page.getByRole("button", { name: "Sulje pelivalikko" }).click();
  await page.getByRole("button", { name: /Aloita hanke/ }).click();
}
test("lyhyt tutorial, hiirellä veto, seuraus ylhäällä ja ei valintapainikkeita", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await start(page, "uusi-1", true);
  await expect(
    page.getByRole("heading", { name: "Kokeile vetää." }),
  ).toBeVisible();
  await swipe(page, "left");
  await expect(page.getByRole("heading", { name: firstTitle })).toBeVisible();
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).state.cursor,
      KEY,
    ),
  ).toBe(0);
  await page.screenshot({ path: "test-results/swipe-mobile-390.png" });
  await swipe(page, "right");
  await expect(page.getByRole("heading", { name: secondTitle })).toBeVisible();
  await expect(page.getByTestId("previous-result")).not.toContainText(
    "Uusi hanke",
  );
  expect(
    await page
      .getByTestId("previous-result")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  expect(
    await page
      .getByTestId("previous-result")
      .evaluate((el) => getComputedStyle(el).fontStyle),
  ).toBe("italic");
  await page.screenshot({ path: "test-results/swipe-mobile-result.png" });
  await expect(page.locator(".choice-hints button")).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("lyhyt veto ja pystysuora veto eivät valitse, yksi vaakaveto valitsee kerran", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await start(page);
  await swipe(page, "left", 30);
  await expect(page.getByRole("heading", { name: firstTitle })).toBeVisible();
  const b = (await page.getByTestId("swipe-card").boundingBox())!;
  await page.mouse.move(b.x + 120, b.y + 40);
  await page.mouse.down();
  await page.mouse.move(b.x + 125, b.y + 140, { steps: 6 });
  await page.mouse.up();
  await expect(page.getByRole("heading", { name: firstTitle })).toBeVisible();
  await swipe(page, "left");
  await expect
    .poll(() =>
      page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!).state.cursor,
        KEY,
      ),
    )
    .toBe(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/swipe-mobile-360.png" });
});
test("18 päätöstä ja välitarinat johtavat RtB-ruutuun", async ({ page }) => {
  await start(page);
  let steps = 0,
    stories = 0,
    transitions = 0;
  while (
    (await page.getByTestId("swipe-card").count()) ||
    (await page.getByRole("button", { name: "Jatka tarinaa" }).count())
  ) {
    if (steps++ > 90) throw new Error("Jumi");
    if (await page.getByRole("button", { name: "Jatka tarinaa" }).count()) {
      const before = await page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!).state,
        KEY,
      );
      if (before.stories[0].kind === "transition") {
        transitions++;
        await expect(page.locator(".eyebrow")).toContainText("SEURAAVA VAIHE");
        await expect(page.locator(".story-card")).toContainText(
          "Siirry vaiheeseen",
        );
        if (before.stories[0].nextStage === 2) {
          await page.reload();
          await page.getByRole("button", { name: /Jatka ·/ }).click();
          await expect(page.locator(".story-narrative h1")).toHaveText(
            "YVA-selostus ja kaavaluonnos",
          );
          await page.screenshot({
            path: "test-results/swipe-yva-transition.png",
          });
        }
      }
      stories++;
      if (stories === 2)
        await page.screenshot({ path: "test-results/swipe-story.png" });
      await page.getByRole("button", { name: "Jatka tarinaa" }).click();
      if (before.stories[0].kind === "transition")
        expect(
          await page.evaluate(
            (key) => JSON.parse(localStorage.getItem(key)!).state.stage,
            KEY,
          ),
        ).toBe(before.stage + 1);
    } else {
      const cursor = await page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!).state.cursor,
        KEY,
      );
      const raw = await page.evaluate((key) => localStorage.getItem(key)!, KEY);
      const restored = restoreGame(raw);
      if (!restored.ok) throw new Error(restored.error);
      const c = currentDecision(restored.state)!;
      const side = c.choices.left.action === safe[cursor] ? "left" : "right";
      await expect(page.locator(".choice-hints")).toContainText(
        c.choices[side].label,
      );
      if (c.id === "noise")
        await page.screenshot({ path: "test-results/swipe-noise.png" });
      if (c.id === "natura")
        await page.screenshot({
          path: "test-results/swipe-research-choice.png",
        });
      await swipe(page, side);
      await expect
        .poll(() =>
          page.evaluate(
            (key) => JSON.parse(localStorage.getItem(key)!).state.cursor,
            KEY,
          ),
        )
        .toBe(cursor + 1);
    }
  }
  await expect(page.locator(".rtb-badge")).toContainText("RtB");
  const state = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!).state,
    KEY,
  );
  expect(state.cursor).toBe(18);
  expect(state.facts.ready).toBe(true);
  await expect(
    page.getByRole("region", { name: "Pelikerran pisteet" }),
  ).toContainText("pistettä");
  expect(stories).toBeGreaterThanOrEqual(14);
  expect(transitions).toBe(3);
  await page.screenshot({ path: "test-results/swipe-victory.png" });
});
test("jatkaminen säilyttää nimen, tuloksen ja tarjotun tilanteen", async ({
  page,
}) => {
  await start(page);
  await swipe(page, "left");
  await expect(page.getByRole("heading", { name: secondTitle })).toBeVisible();
  const raw = await page.evaluate((key) => localStorage.getItem(key), KEY);
  await page.reload();
  await page.getByRole("button", { name: /Jatka ·/ }).click();
  await expect(page.getByRole("heading", { name: secondTitle })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), KEY)).toBe(
    raw,
  );
});
test("vioittunut tallennus säilyy uuden pelin yli; vanhaa kampanjaa ei ylikirjoiteta", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate((key) => {
    localStorage.setItem(key, "{broken");
    localStorage.setItem("kaava-vai-kaaos:campaign:1", "old-version");
  }, KEY);
  await page.reload();
  await expect(
    page.getByText("Vanha tai vioittunut tallennus on turvassa."),
  ).toBeVisible();
  await page.getByRole("button", { name: /Aloita hanke/ }).click();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("kaava-vai-kaaos:swipe:recoverable"),
    ),
  ).toBe("{broken");
  expect(
    await page.evaluate(() =>
      localStorage.getItem("kaava-vai-kaaos:campaign:1"),
    ),
  ).toBe("old-version");
});
test("täyttökuvakkeella on arvo ja korkeus sekä teho selitetään", async ({
  page,
}) => {
  await start(page);
  await expect(
    page.getByRole("meter", { name: "Tuulivoiman tehoa jäljellä" }),
  ).toHaveAttribute("aria-valuenow", "100");
  await page
    .getByRole("button", { name: "Mitä hankkeen luvut tarkoittavat?" })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "maasta lavan ylimpään kärkeen",
  );
  await expect(page.getByRole("dialog")).toContainText("nimellistehojen summa");
  await page.getByRole("button", { name: "Sulje lukujen selitykset" }).click();
  await expect(page.getByText("Budjetti", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Hankekansio", { exact: true })).toHaveCount(0);
});
test("nuolinäppäin, reduced motion ja 320 px mahtuminen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 640 });
  await start(page);
  await page.getByTestId("swipe-card").focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("heading", { name: secondTitle })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/swipe-mobile-320.png" });
});
test("työpöydällä on puhelinkokoinen pelialue ja paikalliset fontit", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "test-results/swipe-desktop-menu.png" });
  expect(
    (await page.locator(".phone-shell").boundingBox())!.width,
  ).toBeLessThanOrEqual(440);
  await expect(
    page.getByRole("button", { name: /Tuuli.*Ei vielä valittavissa/ }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: /Aurinko.*Ei vielä valittavissa/ }),
  ).toBeDisabled();
  await start(page);
  await swipe(page, "left");
  await expect(page.getByRole("heading", { name: secondTitle })).toBeVisible();
  await page.screenshot({ path: "test-results/swipe-desktop-game.png" });
  expect(
    await page
      .locator(".narrative h1")
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain("Lilita One");
});
