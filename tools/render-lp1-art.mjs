import {chromium} from '@playwright/test';
import {readFileSync,readdirSync,mkdirSync} from 'node:fs';
const browser=await chromium.launch();
try{
 const keys=readdirSync('public/art').filter(x=>x.startsWith('lp1-'));
 const page=await browser.newPage({viewport:{width:1080,height:1240},deviceScaleFactor:1});
 mkdirSync('reports/lp1/art',{recursive:true});
 for(let start=0;start<keys.length;start+=9){
  const cards=keys.slice(start,start+9).map(key=>`<figure><img src="data:image/svg+xml;base64,${readFileSync('public/art/'+key).toString('base64')}"><figcaption>${key}</figcaption></figure>`);
  await page.setContent(`<style>body{background:#392652;color:#291a46;margin:0;padding:18px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;font:16px system-ui}figure{margin:0;padding:10px;background:#faf5eb;border-radius:26px}img{width:100%;border-radius:20px}figcaption{text-align:center;padding:8px}</style>${cards.join('')}`);
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(x=>x.decode())));
  await page.screenshot({path:`reports/lp1/art/gallery-${start/9+1}.png`,fullPage:true});
 }
}finally{await browser.close();}
