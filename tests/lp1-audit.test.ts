import {describe,it,expect} from 'vitest';
import {mkdirSync,writeFileSync,existsSync} from 'node:fs';
import data from '../content/lp1.fi.json';
import {content} from '../src/game/v5/content';
import {initialState} from '../src/game/v5/state';
import {modeAllows} from '../src/game/v5/modes';
import {presentedEntry,modeArt} from '../src/game/v5/presentation';
import {ruleFor,OUTCOMES} from '../src/game/v5/rules';
import {SILENT_PROGRESS,INLINE_RESULTS,reactionFor} from '../src/game/v5/narration';

describe('LP1 complete mode and presentation inventory',()=>{
 it('008/054/058/059 every ID has a policy, explicit runtime and mode-specific art',()=>{
  const rows=content.map(item=>{
   const policy=[...data.policy,...data.newPolicy].find(p=>p.id===item.id);expect(policy,item.id).toBeTruthy();
   const rule=item.kind==='decision'?ruleFor(item.id):null;
   if(item.id.startsWith('LP1-E-')&&item.id!=='LP1-E-H03')expect(OUTCOMES[item.id]).toBeTypeOf('function');
   const modes=['wind','solar','hybrid','hybrid_solar'].map(route=>{
    const g=initialState('lp1-inventory',route==='hybrid_solar'?'hybrid':route as 'wind'|'solar'|'hybrid');
    if(route==='hybrid_solar'){g.activeMode='solar';g.routeCategory='hybrid_solar';g.battery.status='excluded';}
    g.stage=item.stage;const spec=rule?.spec(g,item.id),allowed=modeAllows(g,item.id,spec);
    const shown=presentedEntry(g,item.id),art=allowed&&rule?modeArt(g,item.id,rule.art):[];
    for(const key of art)expect(existsSync(`public/art/${key}.svg`)).toBe(true);
    return {route,allowed,spec:spec??null,art,title:shown.title,body:shown.body};
   });
   return {id:item.id,classification:'classification' in policy!?policy!.classification:'LP1 explicit contexts',role:rule?.role??'event',modes};
  });
  expect(rows).toHaveLength(275);
  for(const id of ['initiative','programme','UUSI-P1-02','UUSI-P1-10','BESS-P1-04'])expect(content.some(x=>x.id===id)).toBe(false);
  mkdirSync('reports/lp1',{recursive:true});writeFileSync('reports/lp1/mode-audit.json',JSON.stringify(rows,null,2));
 });
 it('052 new result branches are never silently classified as routine progress',()=>{
  for(const item of content.filter(x=>x.id.startsWith('LP1-E-'))){expect(SILENT_PROGRESS.has(item.id)).toBe(false);expect(INLINE_RESULTS[item.id]).toBeUndefined();}
 });
 it('terminal reactions are curated and are absent from neutral successes',()=>{
  const scene=(id:string)=>({id,kind:'event' as const,caseId:null,outcomeId:null,branchId:null,nextStage:null});
  expect(reactionFor(scene('external-1'))).toBeTruthy();
  expect(reactionFor(scene('ready'))).toBeFalsy();
 });
});
