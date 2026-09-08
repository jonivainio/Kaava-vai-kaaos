import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const entries = JSON.parse(await readFile(path.join(root, 'content/v5.fi.json'), 'utf8')).entries;
const subjects = [
  ['land-map-versions', 'contract-pages'], ['land-area-explained', 'owner-plan'],
  ['UUSI-P1-04', 'shared-line'], ['UUSI-P3-KOSTEIKKO', 'reserve-wetland'],
  ['UUSI-P4-VUOKRAJATKO', 'lease-renewal'], ['BESS-P4-RAJAUS', 'battery-limits'],
];
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const cards = await Promise.all(subjects.map(async ([id, art]) => {
  const item = entries.find(candidate => candidate.id === id);
  const svg = await readFile(path.join(root, `public/art/${art}.svg`));
  return `<article><h2>${escape(item.title)}</h2><p>${escape(item.body)}</p><figure><img alt="${id}" src="data:image/svg+xml;base64,${svg.toString('base64')}"></figure><footer>${escape(item.choices.A.label)}<br>↔<br>${escape(item.choices.B.label)}</footer></article>`;
}));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 840, height: 2200 }, deviceScaleFactor: 1 });
  await page.setContent(`<style>*{box-sizing:border-box}body{margin:0;background:#392652;color:#291a46;font:16px/1.4 system-ui}main{display:grid;grid-template-columns:390px 390px;gap:20px;padding:20px}article{background:#faf5eb;border-radius:24px;padding:18px;text-align:center}h2{font-size:23px;line-height:1.1;min-height:52px;margin:4px 0 12px}p{min-height:142px;margin:0}figure{margin:14px 0 12px;border:2px solid #291a46;border-radius:25px;box-shadow:0 7px #291a46;overflow:hidden;height:350px}img{width:100%;height:100%;object-fit:cover}footer{font-size:14px;font-weight:700;min-height:70px;padding-top:8px}</style><main>${cards.join('')}</main>`);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  await mkdir(path.join(root, 'reports/v5/art'), { recursive: true });
  await page.screenshot({ path: path.join(root, 'reports/v5/art/pilot-six.png'), fullPage: true });
  console.log('Rendered six source-text cards at 390 CSS px; reports/v5/art/pilot-six.png');
} finally { await browser.close(); }
