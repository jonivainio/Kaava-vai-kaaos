import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
test("tuotantopeli toimii repoalihakemistossa ja jatkuu offline-tilassa", async ({
  page,
  context,
}) => {
  await page.goto("./");
  await page.evaluate(() =>
    localStorage.setItem("kaava-vai-kaaos:swipe:tutorial", "done"),
  );
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect
    .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
    .toBe(true);
  await expect(
    page.getByRole("button", { name: /Kehittäjän työpöytä/ }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: /Aloita hanke/ }).click();
  await page.getByTestId("swipe-card").focus();
  await page.keyboard.press("ArrowLeft");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("kaava-vai-kaaos:swipe:2")!).revision,
      ),
    )
    .toBe(1);
  const saved = await page.evaluate(() =>
    localStorage.getItem("kaava-vai-kaaos:swipe:2"),
  );
  await context.setOffline(true);
  await page.reload();
  await page.getByRole("button", { name: /Jatka ·/ }).click();
  await expect(page.getByTestId("swipe-card")).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("kaava-vai-kaaos:swipe:2")),
  ).toBe(saved);
  await page.getByTestId("swipe-card").focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("kaava-vai-kaaos:swipe:2")!).revision)).toBe(2);
  await expect(page.locator('[role="alert"]')).toHaveCount(0);
});
test("odottava päivitys aktivoidaan valikossa, vanha välimuisti poistuu ja tallennus säilyy", async ({
  page,
}) => {
  const path = new URL("../dist/sw.js", import.meta.url),
    original = readFileSync(path, "utf8");
  try {
    await page.goto("./");
    await page.evaluate(() =>
      localStorage.setItem("kaava-vai-kaaos:swipe:tutorial", "done"),
    );
    await page.evaluate(() => navigator.serviceWorker.ready);
    await expect
      .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
      .toBe(true);
    await page.getByRole("button", { name: /Aloita hanke/ }).click();
    await page.getByTestId("swipe-card").focus();
    await page.keyboard.press("ArrowLeft");
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            JSON.parse(localStorage.getItem("kaava-vai-kaaos:swipe:2")!).revision,
        ),
      )
      .toBe(1);
    const raw = await page.evaluate(() =>
      localStorage.getItem("kaava-vai-kaaos:swipe:2"),
    );
    await page.evaluate(() => caches.open("kaava-legacy-test"));
    writeFileSync(
      path,
      original.replace(/const CACHE='([^']+)'/, "const CACHE='$1-test-update'"),
    );
    await page.evaluate(async () => {
      const r = await navigator.serviceWorker.getRegistration();
      await r?.update();
    });
    await expect
      .poll(() =>
        page.evaluate(
          async () =>
            !!(await navigator.serviceWorker.getRegistration())?.waiting,
        ),
      )
      .toBe(true);
    await expect(page.getByTestId("swipe-card")).toBeVisible();
    await page.getByRole("button", { name: /Avaa aloitusvalikko/ }).click();
    await Promise.all([
      page.waitForEvent("load"),
      page
        .getByRole("button", { name: "Päivitä tästä aloitusvalikosta" })
        .click(),
    ]);
    await expect(page.getByRole("button", { name: /Jatka ·/ })).toBeVisible();
    expect(
      await page.evaluate(() =>
        localStorage.getItem("kaava-vai-kaaos:swipe:2"),
      ),
    ).toBe(raw);
    await expect
      .poll(() =>
        page.evaluate(async () =>
          (await caches.keys()).includes("kaava-legacy-test"),
        ),
      )
      .toBe(false);
  } finally {
    writeFileSync(path, original);
  }
});
