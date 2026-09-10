import { describe, expect, it } from 'vitest';
import { initialState } from '../src/game/v5/state';
import { ruleFor, OUTCOMES } from '../src/game/v5/rules';
import { openCase } from '../src/game/v5/operations';
import { advanceCalendar } from '../src/game/v5/calendar';
import { getDerivedStats } from '../src/engine';
import { sample } from '../src/game/v5/world';
import { beginAppealWindow } from '../src/game/v5/rules/decisions';
import type { GameV5, SourceChoice } from '../src/game/v5/types';

function apply(g:GameV5,id:string,choice:SourceChoice) {
 const r=ruleFor(id),c=openCase(g,id,r.spec(g,id));r.prepare?.(g,c,id);c.choice=choice;c.rounds++;r.apply(g,c,id,choice);return c;
}
function reveal(g:GameV5) {
 const o=g.outcomes.at(-1)!,w=g.calendar.orders.find(x=>x.id===o.workId)!;
 advanceCalendar(g.calendar,w.dueAt,'completed work',[w.id],w.baselineDue);
 const c=g.cases[o.caseId]!,branch=OUTCOMES[o.contentId]!(g,c,o,0)!;
 o.status='revealed';o.branchId=branch;c.revealedBranches.push(branch);return branch;
}
function seedFor(key:string,below:number) {
 for(let n=0;n<100;n++){const s=`lp1-extra-${n}`;if(sample(s,`lp1:${key}`)<below)return s;}
 throw Error('fixture unavailable');
}
describe('LP1 consequential transitions',()=>{
 it('043 television additional measurement occurs exactly once and ends in a real result',()=>{
  const g=initialState(seedFor('tvDataMissing',.5),'wind');apply(g,'LP1-T02','B');
  expect(reveal(g)).toBe('measure_later');expect(['baseline_clear','mitigation']).toContain(reveal(g));
  expect(g.calendar.orders.filter(w=>w.id.includes('tvAdditionalMeasurement'))).toHaveLength(1);
  expect(g.cases['case:lp1_tv']!.status).toBe('resolved');
 });
 it.each(['A','B'] as const)('044 model report is not a model change; confirmation %s has its own consequence',choice=>{
  const g=initialState('lp1-model','wind'),before=getDerivedStats(g.run),grid=structuredClone(g.run.grid);
  apply(g,'LP1-T04','B');expect(getDerivedStats(g.run)).toEqual(before);expect(reveal(g)).toBe('model_report');
  apply(g,'LP1-D-T04',choice);
  if(choice==='B'){expect(getDerivedStats(g.run)).toEqual(before);expect(reveal(g)).toBe('bypass_ok');}
  else expect(getDerivedStats(g.run).windMWac).toBe(before.windCount*8);
  expect(g.run.grid).toEqual(grid);
 });
 it('046 exclusion on sulfate suspicion never orders a sample or manufactures a sample finding',()=>{
  const g=initialState('lp1-sulfate','solar');apply(g,'LP1-A02','B');expect(reveal(g)).toBe('excluded');
  expect(g.calendar.orders.some(w=>w.id.includes('sulfateSurvey'))).toBe(false);
 });
 it('047 shallow excavation is offered only after the studied risk result',()=>{
  const g=initialState(seedFor('acidLayer',.5),'solar');
  expect(ruleFor('LP1-A06').eligible(g,'LP1-A06')).toBe(false);
  apply(g,'LP1-A02','A');expect(reveal(g)).toBe('risk');
  expect(g.cases['case:lp1_sulfate']!.facts.shallowViable).toBe(true);
  expect(ruleFor('LP1-A06').eligible(g,'LP1-A06')).toBe(true);
 });
 it('048 mowing retains area and creates no mandatory grazing or other technology',()=>{
  const g=initialState('lp1-mowing','solar'),before=getDerivedStats(g.run);apply(g,'LP1-A03','B');
  expect(reveal(g)).toBe('mowing');expect(getDerivedStats(g.run)).toEqual(before);
  expect(g.cases['case:lp1_grazing']!.status).toBe('resolved');expect(g.battery.status).toBe('excluded');
 });
 it.each(['A','B'] as const)('050 municipalities retain distinct decisions and exclusion %s affects only bound assets',choice=>{
  const g=initialState('lp1-municipal','hybrid');g.stage=4;
  const c=apply(g,'LP1-Y01',choice),first=g.municipalities[0]!,second=g.municipalities[1]!;
  expect(first.adopted).toBe(true);expect(second.adopted).toBe(false);expect(first.final).toBe(false);
  expect(g.procedure.planFinal).toBe(false);
  if(choice==='B'){
   expect(second.included).toBe(false);
   expect(g.run.assets.windSites.filter(w=>w.exclusions.length).map(w=>w.id)).toEqual(c.placeIds);
   expect(reveal(g)).toBe('separated');
  } else {
   const branch=reveal(g);
   if(branch==='both'){expect(second.adopted).toBe(true);expect(second.final).toBe(false);expect(second.finalAt).toBeGreaterThan(first.finalAt!);}
   else expect(g.scenes.some(s=>s.id==='LP1-D-Y01')).toBe(true);
  }
  const approval=openCase(g,'EV-HYVAKSYNTA',{family:'approval-fixture',component:'shared'});
  beginAppealWindow(g,approval,'EV-HYVAKSYNTA');
  expect(g.municipalities.filter(m=>m.included).every(m=>m.finalAt!==null)).toBe(true);
 });
});
