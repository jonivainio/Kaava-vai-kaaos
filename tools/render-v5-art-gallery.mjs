import { chromium } from '@playwright/test';
import { readdir, readFile, mkdir } from 'node:fs/promises';
const files = (await readdir('public/art')).filter(name => name.endsWith('.svg')).sort();
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1320, height: 1500 } });
  await mkdir('reports/v5/art', { recursive: true });
  for (let offset = 0; offset < files.length; offset += 16) {
    const cards = await Promise.all(files.slice(offset, offset + 16).map(async name => `<figure><img src="data:image/svg+xml;base64,${(await readFile(`public/art/${name}`)).toString('base64')}"><figcaption>${name}</figcaption></figure>`));
    await page.setContent(`<style>*{box-sizing:border-box}body{margin:0;background:#392652;color:#f7f1df;font:16px system-ui}main{display:grid;grid-template-columns:repeat(4,300px);gap:22px;padding:22px}figure{margin:0}img{display:block;width:300px;height:300px;border:2px solid #291a46;border-radius:25px}figcaption{padding:9px 0}</style><main>${cards.join('')}</main>`);
    await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    const path = `reports/v5/art/gallery-${offset / 16 + 1}.png`;
    await page.screenshot({ path, fullPage: true });
    console.log(path);
  }
} finally { await browser.close(); }
