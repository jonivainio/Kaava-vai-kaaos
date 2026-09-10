import {test,expect,type Page} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {createGame,choose,continueStory,currentDecision,token,serializeGame} from '../dist/v5/index.js';
const KEY='kaava-vai-kaaos:swipe:2',dir='reports/lp1/fixtures';
const fixture=(name:string)=>JSON.parse(readFileSync(`${dir}/${name}.json`,'utf8'));
async function load(page:Page,g:any){
 await page.goto('/');await page.evaluate(({key,raw})=>{localStorage.setItem(key,raw);localStorage.setItem('kaava-vai-kaaos:swipe:tutorial','done');},{key:KEY,raw:serializeGame(g)});
 await page.reload();await page.getByRole('button',{name:/Jatka ·/}).click();
}
async function saved(page:Page){return page.evaluate(key=>JSON.parse(localStorage.getItem(key)!),KEY);}
async function action(page:Page,g:any,side:'left'|'right'='left'){
 if(g.scenes[0]?.kind==='transition')await page.getByRole('button',{name:'Siirry seuraavaan vaiheeseen'}).click();
 else {await page.getByTestId('swipe-card').focus();await page.keyboard.press(side==='left'?'ArrowLeft':'ArrowRight');}
 const next=currentDecision(g)?choose(g,token(g),side):continueStory(g,token(g));
 await expect.poll(async()=>(await saved(page)).revision).toBe(next.revision);
 expect(serializeGame(await saved(page))).toBe(serializeGame(next));return next;
}
test('001–002 all menu modes start correctly; Continue preserves a solar save despite another menu selection',async({page})=>{
 for(const [mode,label] of [['wind','Tuuli'],['solar','Aurinko'],['hybrid','Hybridi']]){
  await page.goto('/');await page.evaluate(()=>{localStorage.clear();localStorage.setItem('kaava-vai-kaaos:swipe:tutorial','done');});await page.reload();
  await page.getByRole('button',{name:label,exact:false}).first().click();await page.getByRole('button',{name:/Aloita hanke/}).click();
  expect((await saved(page)).originMode).toBe(mode);
 }
 const g=fixture('start-solar');await load(page,g);await page.reload();
 await page.getByRole('button',{name:/Tuuli/}).first().click();await page.getByRole('button',{name:/Jatka ·/}).click();
 expect(serializeGame(await saved(page))).toBe(serializeGame(g));
});
for(const width of [360,390,430,1163])test(`029/037/053 new modes and all confirmation choices at ${width}px`,async({page})=>{
 test.setTimeout(180000);await page.setViewportSize({width,height:width>500?1010:844});await page.emulateMedia({reducedMotion:'reduce'});
 const index=JSON.parse(readFileSync(`${dir}/index.json`,'utf8'));
 const keys=Object.keys(index.found).filter(k=>k.startsWith('decision-'));
 for(const key of keys){
  const g=fixture(key);await load(page,g);
  await expect(page.locator('.question')).toBeVisible();
  for(const selector of ['.asset-hud','.question','.choice-hints'])expect(await page.locator(selector).evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(await page.locator('.swipe-card img').evaluate((n:HTMLImageElement)=>n.complete&&n.naturalWidth>0)).toBe(true);
  if(g.activeMode==='solar'){
   for(const value of await page.locator('.solar-power-stats strong').all())expect(await value.evaluate(n=>n.scrollWidth<=n.parentElement!.clientWidth+1)).toBe(true);
   await expect(page.locator('.wind-stats')).toHaveCount(0);await expect(page.locator('.solar-power-stats')).toBeVisible();}
  if(g.activeMode==='wind')await expect(page.locator('.solar-stats')).toHaveCount(0);
  await page.screenshot({path:`reports/lp1/browser/${key}-${width}.png`});
  const card=page.getByTestId('swipe-card');await card.scrollIntoViewIfNeeded();const b=(await card.boundingBox())!;
  const x=b.x+b.width/2,y=b.y+90;await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+20,y);await page.mouse.up();
  expect(serializeGame(await saved(page))).toBe(serializeGame(g));
  await action(page,g,'left');
  if(key.includes('LP1-D-')||key.includes('LP1-H')){await load(page,g);await action(page,g,'right');}
 }
});
for(const name of ['end-wind-win','solar-win-yva-true','solar-win-yva-false','end-hybrid_solar-win','end-hybrid_solar-external'])test(`009/010/030/033/034 complete browser replay: ${name}`,async({page})=>{
 test.setTimeout(180000);await page.emulateMedia({reducedMotion:'reduce'});
 const end=fixture(name);let g=createGame(end.run.seed,end.originMode);await load(page,g);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));
 for(const a of end.actions){
  expect(a.token).toBe(token(g));
  if(g.scenes[0]?.kind==='transition'||g.recovery.status==='offered'||g.scenes[0]?.id==='LP1-E-H02'){
   await page.reload();await page.getByRole('button',{name:/Jatka ·/}).click();expect(serializeGame(await saved(page))).toBe(serializeGame(g));
  }
  g=await action(page,g,a.side??'left');
 }
 expect(serializeGame(g)).toBe(serializeGame(end));expect(errors).toEqual([]);
 await page.screenshot({path:`reports/lp1/browser/${name}.png`});
});
test('058 every new result and authored confirmation renders without losing source text',async({page})=>{
 test.setTimeout(90000);await page.goto('/?review-v5');
 const source=JSON.parse(readFileSync('content/lp1.fi.json','utf8'));
 for(const item of source.entries){
  await page.getByLabel('Sisältö-ID').selectOption(item.id);
  const variants=await page.getByLabel('Tuloshaara').locator('option').evaluateAll(ns=>ns.map(n=>(n as HTMLOptionElement).value));
  for(const variant of variants){await page.getByLabel('Tuloshaara').selectOption(variant);await expect(page.getByTestId('swipe-card')).toBeVisible();}
 }
});
