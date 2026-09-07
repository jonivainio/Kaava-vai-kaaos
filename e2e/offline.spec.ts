import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
test("tuotantopeli toimii repoalihakemistossa ja jatkuu offline-tilassa", async ({
  page,
  context,
}) => {
  await page.goto("./");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect
    .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
    .toBe(true);
  await expect(
    page.getByRole("button", { name: /Kehittäjän työpöytä/ }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: /Uusi hanke/ }).click();
  await page.getByTestId("choice-left").click();
  const saved = await page.evaluate(() =>
    localStorage.getItem("kaava-vai-kaaos:campaign:1"),
  );
  await context.setOffline(true);
  await page.reload();
  await page.getByRole("button", { name: /Jatka hanketta/ }).click();
  await expect(
    page.getByRole("heading", { name: "Sama pelto, kolme omistajaa" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("kaava-vai-kaaos:campaign:1"),
    ),
  ).toBe(saved);
  await page.getByTestId("choice-right").click();
  await expect(
    page.getByRole("heading", { name: "Tie ei kuulu kauppaan" }),
  ).toBeVisible();
});
test("odottava päivitys aktivoidaan valikossa, vanha välimuisti poistuu ja tallennus säilyy", async ({
  page,
}) => {
  const path = new URL("../dist/sw.js", import.meta.url),
    original = readFileSync(path, "utf8");
  try {
    await page.goto("./");
    await page.evaluate(() => navigator.serviceWorker.ready);
    await expect
      .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
      .toBe(true);
    await page.getByRole("button", { name: /Uusi hanke/ }).click();
    await page.getByTestId("choice-left").click();
    const raw = await page.evaluate(() =>
      localStorage.getItem("kaava-vai-kaaos:campaign:1"),
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
    await expect(
      page.getByRole("heading", { name: "Sama pelto, kolme omistajaa" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /KAAVA vai KAAOS/ }).click();
    await Promise.all([
      page.waitForEvent("load"),
      page.getByRole("button", { name: "Päivitä tästä aloitusvalikosta" }).click(),
    ]);
    await expect(
      page.getByRole("button", { name: /Jatka hanketta/ }),
    ).toBeVisible();
    expect(
      await page.evaluate(() =>
        localStorage.getItem("kaava-vai-kaaos:campaign:1"),
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
