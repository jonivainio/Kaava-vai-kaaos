import { chromium, expect } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createGame, currentDecision, choose, continueStory, sourceChoice, token, serializeGame } from '../dist/v5/index.js';

const url = 'https://kaava-vai-kaaos.joni-vainio.chatgpt.site/';
const reportDir = process.argv[2] ?? 'reports/v5';
if (!/^reports\/[a-z0-9/-]+$/.test(reportDir)) throw new Error('Invalid report directory');
const browser = await chromium.launch({ headless: true });
// Deliberately no storageState, auth headers, bypass tokens or inherited browser profile.
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const initialCookieCount = (await context.cookies()).length;
const page = await context.newPage(), errors = [];
page.on('pageerror', error => errors.push(error.message));
const key = 'kaava-vai-kaaos:swipe:2';
async function saved() { return page.evaluate(key => JSON.parse(localStorage.getItem(key)), key); }
async function swipe(direction) {
  const card = page.getByTestId('swipe-card'); await card.scrollIntoViewIfNeeded();
  const b = await card.boundingBox(), x = b.x + b.width / 2, y = b.y + Math.min(150, b.height / 2);
  await page.mouse.move(x, y); await page.mouse.down();
  await page.mouse.move(x + (direction === 'left' ? -125 : 125), y, { steps: 8 }); await page.mouse.up();
}
try {
  mkdirSync(`${reportDir}/public`, { recursive: true });
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  expect(response.status()).toBe(200); expect(new URL(page.url()).origin).toBe(new URL(url).origin);
  await expect(page.getByRole('button', { name: /Aloita hanke/ })).toBeVisible({ timeout: 20000 });
  const scriptPath = readFileSync('dist/index.html', 'utf8').match(/src="([^"]+\.js)"/)[1];
  const scriptResponse = await context.request.get(new URL(scriptPath, url).href);
  expect(scriptResponse.status()).toBe(200);
  const expectedHash = createHash('sha256').update(readFileSync(`dist/${scriptPath.replace(/^\//, '')}`)).digest('hex');
  const receivedHash = createHash('sha256').update(await scriptResponse.body()).digest('hex');
  expect(receivedHash).toBe(expectedHash);
  await page.screenshot({ path: `${reportDir}/public/menu.png` });
  await page.evaluate(() => localStorage.setItem('kaava-vai-kaaos:swipe:tutorial', 'done'));
  const seed = process.argv[3] ?? 'v5-ui-win-2';
  await page.getByRole('button', { name: 'Avaa pelivalikko' }).click();
  await page.getByPlaceholder('Arvotaan, jos jätät tyhjäksi').fill(seed);
  await page.getByRole('button', { name: 'Sulje pelivalikko' }).click();
  await page.getByRole('button', { name: /Aloita hanke/ }).click();
  let model = createGame(seed), transitions = 0, turns = 0;
  expect(serializeGame(await saved())).toBe(serializeGame(model));
  while ((!model.ending || model.scenes.length) && turns++ < 600) {
    const scene = model.scenes[0];
    if (currentDecision(model)) {
      const side = sourceChoice(model, 'left') === 'A' ? 'left' : 'right';
      await swipe(side); model = choose(model, token(model), side);
    } else if (scene?.kind === 'transition') {
      await page.reload({ waitUntil: 'networkidle' });
      await page.getByRole('button', { name: /^Jatka ·/ }).click();
      await page.getByRole('button', { name: 'Siirry seuraavaan vaiheeseen' }).click();
      model = continueStory(model, token(model)); transitions++;
    } else {
      await swipe('right'); model = continueStory(model, token(model));
    }
    await expect.poll(async () => (await saved()).revision).toBe(model.revision);
    expect(serializeGame(await saved())).toBe(serializeGame(model));
    if (turns === 2) await page.screenshot({ path: `${reportDir}/public/game.png` });
  }
  expect(model.ending?.kind).toBe('win'); expect(transitions).toBe(3); expect(errors).toEqual([]);
  await expect(page.getByRole('heading', { name: 'Hanke on luvitettu' })).toBeVisible();
  await page.screenshot({ path: `${reportDir}/public/win.png` });
  const result = { url: page.url(), httpStatus: response.status(), contentVersion: model.contentVersion,
    rulesVersion: model.rulesVersion, deployedScript: scriptPath, deployedScriptSha256: receivedHash,
    anonymousFreshContext: true, initialCookieCount, bypassOrAuthHeaders: false,
    fullRun: true, seed, canonicalStrategy: 'A', decisions: model.decisions.length, transitions,
    reloads: transitions, score: model.ending.score.total, viewport: { width: 390, height: 844 },
    errors, checkedAt: new Date().toISOString() };
  writeFileSync(`${reportDir}/public-check.json`, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
} finally { await context.close(); await browser.close(); }
