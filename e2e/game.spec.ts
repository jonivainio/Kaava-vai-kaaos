import { test, expect } from "@playwright/test";
test("kokonainen kampanja RtB:hen, kaavapäätös erikseen ja lopun päätöshistoria", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByText("Pelikerran siemen", { exact: true }).click();
  await page
    .getByPlaceholder("Arvotaan uuden hankkeen alussa")
    .fill("valmis-1");
  await page.getByRole("button", { name: /Uusi hanke/ }).click();
  let steps = 0;
  while (
    (await page.getByTestId("choice-left").count()) ||
    (await page.getByRole("button", { name: /^Odota \d+ kk/ }).count())
  ) {
    if (steps++ > 100) throw new Error("Kampanja ei valmistunut");
    if (await page.getByTestId("choice-left").count())
      await page.getByTestId("choice-left").click();
    else await page.getByRole("button", { name: /^Odota \d+ kk/ }).click();
  }
  await expect(
    page.getByRole("heading", { name: "Valmis seuraavaan vaiheeseen." }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/rtb-report.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Avaa päätöshistoria" }).click();
  await expect(
    page.getByRole("heading", { name: "Päätöshistoria", exact: true }),
  ).toBeVisible();
});
test("virheellinen tallennus säilyy myös uuden hankkeen aloittamisen jälkeen", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("kaava-vai-kaaos:campaign:1", "{broken-save"),
  );
  await page.reload();
  await expect(
    page.getByText("Alkuperäinen tallennus on säilytetty."),
  ).toBeVisible();
  await page.getByRole("button", { name: /Uusi hanke/ }).click();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("kaava-vai-kaaos:recoverable"),
    ),
  ).toBe("{broken-save");
  await page.getByRole("button", { name: /KAAVA vai KAAOS/ }).click();
  await expect(
    page.getByRole("button", { name: "Vie aiempi palautettava tallennus" }),
  ).toBeVisible();
});
test("pitkä nimi ja reduced motion eivät aiheuta vaakavieritystä", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: /Uusi hanke/ }).click();
  await page.evaluate(() => {
    const key = "kaava-vai-kaaos:campaign:1";
    const s = JSON.parse(localStorage.getItem(key)!);
    s.run.projectIdentity.displayName = "Kaislakuiskeenneva";
    localStorage.setItem(key, JSON.stringify(s));
  });
  await page.reload();
  await page.getByRole("button", { name: /Jatka hanketta/ }).click();
  await expect(
    page.getByRole("heading", { name: "Kaislakuiskeenneva" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByTestId("choice-left").focus();
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("choice-right")).toBeFocused();
  expect(
    await page
      .getByTestId("choice-right")
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe("none");
});
test("mobiilin alkuvalikko ja ensimmäinen kortti, tallennus ja nuolinäppäin", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByText("Hyvä suunnitelma.")).toBeVisible();
  await page.getByRole("button", { name: /Uusi hanke/ }).click();
  await expect(
    page.getByRole("heading", { name: "Ensimmäinen rajaus" }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/mobile-390.png",
    fullPage: true,
  });
  await page.getByTestId("choice-left").click();
  await expect(
    page.getByRole("heading", { name: "Sama pelto, kolme omistajaa" }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: /Jatka hanketta/ }).click();
  await expect(
    page.getByRole("heading", { name: "Sama pelto, kolme omistajaa" }),
  ).toBeVisible();
  await page.locator("body").click({ position: { x: 5, y: 5 } });
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "Tie ei kuulu kauppaan" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("veto peruutetaan, pystyscrolli ei valitse, sivuveto tekee yhden päätöksen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: /Uusi hanke/ }).click();
  const card = page.getByTestId("decision-card");
  const b = await card.boundingBox();
  expect(b).not.toBeNull();
  const x = b!.x + b!.width / 2,
    y = b!.y + 80;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 40, y, { steps: 5 });
  await page.mouse.up();
  await expect(
    page.getByRole("heading", { name: "Ensimmäinen rajaus" }),
  ).toBeVisible();
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 15, y + 70, { steps: 5 });
  await page.mouse.up();
  await expect(
    page.getByRole("heading", { name: "Ensimmäinen rajaus" }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/mobile-360.png",
    fullPage: true,
  });
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 110, y, { steps: 8 });
  await page.mouse.up();
  await expect(
    page.getByRole("heading", { name: "Sama pelto, kolme omistajaa" }),
  ).toBeVisible();
  const count = await page.evaluate(
    () =>
      JSON.parse(localStorage.getItem("kaava-vai-kaaos:campaign:1")!).records
        .length,
  );
  expect(count).toBe(1);
});
for (const side of ["left", "right"])
  test(`prologi H001 ${side}`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Kehittäjän työpöytä/ }).click();
    await page.getByRole("button", { name: "Prologi · 12 päätöstä" }).click();
    await page.getByRole("button", { name: "Uusi prologi" }).click();
    for (let i = 0; i < 9; i++)
      await page.getByTestId(`choice-${i === 8 ? side : "left"}`).click();
    await expect(page.locator(".folio")).toHaveText(
      side === "left" ? "H002" : "H003",
    );
    for (let i = 0; i < 3; i++) await page.getByTestId("choice-left").click();
    await expect(
      page.getByRole("heading", { name: "Ensimmäinen selvityskierros valmis" }),
    ).toBeVisible();
  });
test("19 kuvan kontaktikartta ja työpöytänäkymä", async ({ page }) => {
  await page.setViewportSize({ width: 1360, height: 960 });
  await page.goto("/");
  await page.screenshot({
    path: "test-results/desktop-menu.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: /Kehittäjän työpöytä/ }).click();
  await page.getByRole("button", { name: "Kuvien kontaktikartta" }).click();
  await expect(page.locator(".art-grid img")).toHaveCount(19);
  await expect
    .poll(() =>
      page
        .locator(".art-grid img")
        .evaluateAll((imgs) =>
          imgs.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page.screenshot({
    path: "test-results/art-gallery.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Korttikatselin · 64" }).click();
  for (const id of ["P001", "P006", "P013"]) {
    await page.getByRole("button", { name: new RegExp(`^${id} ·`) }).click();
    await expect
      .poll(() =>
        page
          .locator(".decision-card img")
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await page.screenshot({
      path: `test-results/card-${id}.png`,
      fullPage: true,
    });
  }
});
