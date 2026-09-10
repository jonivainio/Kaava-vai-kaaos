import {describe,it,expect} from 'vitest';
import {initialState} from '../src/game/v5/state';
import {openCase,schedule,queueScene,workOnly} from '../src/game/v5/operations';
import {ruleFor,OUTCOMES} from '../src/game/v5/rules';
import {advanceCalendar} from '../src/game/v5/calendar';
import {finish} from '../src/game/v5/endings';
import {excludeAssets,scopeRatio} from '../src/game/v5/assets';
import {getDerivedStats} from '../src/engine';
import {calculateScore} from '../src/game/v5/score';
import {modeAllows,stageLabels} from '../src/game/v5/modes';
import {presentedEntry} from '../src/game/v5/presentation';
import {annualSolarEnergy} from '../src/game/v5/solarDesign';
import {permitGoalReached} from '../src/game/v5/procedure';
import {restoreGame,createGame,serializeGame} from '../src/game/v5';
import type {GameV5,SourceChoice,PendingOutcome} from '../src/game/v5/types';
import {entry} from '../src/game/v5/content';
import {writeFileSync,mkdirSync} from 'node:fs';

function apply(g:GameV5,id:string,choice:SourceChoice,cid?:string){
 const r=ruleFor(id),c=cid?g.cases[cid]!:openCase(g,id,r.spec(g,id));c.choice=choice;c.rounds++;r.apply(g,c,id,choice);return c;
}
function reveal(g:GameV5,id:string){
 const o=[...g.outcomes].reverse().find(x=>x.contentId===id)!;const w=g.calendar.orders.find(x=>x.id===o.workId)!;
 advanceCalendar(g.calendar,w.dueAt,'fixture',[w.id],w.baselineDue);
 const c=g.cases[o.caseId]!;const branch=OUTCOMES[id]!(g,c,o,0);o.branchId=branch;o.status='revealed';if(branch)c.revealedBranches.push(branch);return {o,branch};
}
function recovery(){
 const g=initialState('lp1-recovery-contract');g.stage=3;
 Object.assign(g.recovery,{independentAccess:true,independentGrid:true,ownerFunding:true,controlledLand:true,sharedBarrier:false});
 g.world.externalId='EV-PV';const c=apply(g,'defence','A');
 return {g,c};
}
function offer(){const {g,c}=recovery();reveal(g,'EV-PV');expect(g.recovery.status).toBe('offered');return {g,c};}
function converted(review:GameV5['recovery']['review']='reuse'){
 const {g,c}=offer();g.recovery.review=review;g.recovery.unresolvedGridDesign=review==='blocked';apply(g,'LP1-H01','A');return {g,c};
}
function makePermitted(g:GameV5){
 Object.assign(g.procedure,{landSecured:true,initiated:true,yvaDetermined:true,yvaConclusion:true,draftFeedback:true,proposalHearingComplete:true,adopted:true,planFinal:true,appeal:'closed',documentRevision:g.planRevision});
 for(const c of Object.values(g.cases)){c.status='resolved';c.facts.blocking=false;}
 for(const p of g.procedure.permits){p.status='final';p.planRevision=g.planRevision;p.finalAt=g.calendar.now;}
 for(const m of g.municipalities){m.adopted=true;m.final=true;m.finalAt=g.calendar.now;m.planRevision=g.planRevision;}
}
describe('LP1 mode, recovery and scoring contract',()=>{
 it.each(['wind','solar'] as const)('003–005/012 %s cannot queue or resolve another component or BESS',mode=>{
  const g=initialState('mode-negative',mode),other=mode==='wind'?'solar':'wind';
  const c=openCase(g,'defence',{family:'wrong-component',component:other});
  expect(()=>queueScene(g,mode==='wind'?'solarNature':'defence',c)).toThrow();
  expect(()=>schedule(g,c,'defence','A',mode==='wind'?'EV-VESI':'EV-PV')).toThrow();
  for(const id of ['BESS-P1-01','BESS-P2-04','BESS-P4-01'])expect(ruleFor(id).eligible(g,id)).toBe(false);
  expect(g.battery).toMatchObject({status:'excluded',chargeMW:0,dischargeMW:0,energyMWh:0});
 });
 it('006 shared does not override own-wind policy',()=>{
  const g=initialState('solar-policy','solar');expect(modeAllows(g,'UUSI-P2-05',{family:'militaryRoute',component:'shared'})).toBe(false);
  expect(modeAllows(g,'not-authored')).toBe(false);
 });
 it.each(['wind','solar'] as const)('007 declined land affects the actual %s component',mode=>{
  const g=initialState('land-mode',mode);g.world.ownersAgree=false;g.world.landComponent=mode==='wind'?'solar':'wind';
  const before=getDerivedStats(g.run);apply(g,'land','B');const after=getDerivedStats(g.run);
  expect(after.windCount).toBe(before.windCount);expect(g.facts.layoutTightened).toBe(mode==='wind');
  expect(after.solarHa).toBe(mode==='solar'?before.solarHa-12:0);
 });
 it('008/009 mode presentation merges independent same-ID fields',()=>{
  const g=initialState('merge','solar');g.procedure.yvaRequired=false;
  const land=presentedEntry(g,'land-minimum');expect(land.title).toBe('Vähimmäisvuokrasta uusi vaatimus');expect(land.body).toContain('paneelilohkoille');
  expect(presentedEntry(g,'road').choices.A!.result).toContain('Paneelilohko');
  expect(stageLabels(g)[2]).toBe('Vaikutusselvitykset ja kaavaluonnos');
  expect(presentedEntry(g,'surveys-spring').body).not.toContain('YVA-konsult');
 });
 it('010/011 solar worlds include both procedures and unknown never grants a goal',()=>{
  const profiles=new Set(Array.from({length:30},(_,i)=>initialState(`profile-${i}`,'solar').procedure.yvaRequired));expect(profiles.size).toBe(2);
  const g=initialState('unknown','solar');makePermitted(g);g.procedure.yvaDetermined=false;expect(permitGoalReached(g)).toBe(false);
 });
 it('015/016/026 actual wind rejection offers once, keeps assets and freezes another terminal call',()=>{
  const {g,c}=offer();expect(getDerivedStats(g.run).windCount).toBe(g.initial.windCount);expect(g.ending).toBeNull();
  const clone=serializeGame(g);finish(g,'external','LOPPU-ULKOINEN',c,g.recovery.failure!.values,'external');expect(serializeGame(g)).toBe(clone);
  expect(g.scenes.filter(x=>x.id==='LP1-H01')).toHaveLength(1);
 });
 it('017 decline retains original failure classification without review invoice',()=>{
  const {g}=offer(),cost=g.costs.reduce((n,x)=>n+x.euros,0);apply(g,'LP1-H01','B');
  expect(g.ending).toMatchObject({kind:'external',originalCause:'external'});expect(g.costs.reduce((n,x)=>n+x.euros,0)).toBe(cost);
  expect(g.recovery.status).toBe('declined');
 });
 it.each(['land','access','grid','funding','shared','small','power','battery','owner','solarFailure'] as const)('019–024 blocks solar recovery: %s',condition=>{
  const {g,c}=recovery();
  if(condition==='land')g.recovery.controlledLand=false;if(condition==='access')g.recovery.independentAccess=false;
  if(condition==='grid')g.recovery.independentGrid=false;if(condition==='funding')g.recovery.ownerFunding=false;
  if(condition==='shared')c.affectedComponents=['wind','solar'];
  if(condition==='shared'){c.mechanism='corridor';g.recovery.sharedBarrier=true;}
  if(condition==='small')g.recovery.minimumHa=999;if(condition==='power')g.recovery.minimumMWac=999;
  if(condition==='battery'){g.battery.status='included';g.battery.separable=false;}
  if(condition==='owner')finish(g,'owner','LOPPU-OMISTAJA',c);
  else if(condition==='solarFailure'){c.component='solar';c.fallback='unavailable';finish(g,'external','LOPPU-ULKOINEN',c,{externalReason:'solar'},'external');}
  else reveal(g,'EV-PV');
  expect(g.recovery.status).not.toBe('offered');expect(g.ending).not.toBeNull();
 });
 it('018/027/028 conversion preserves identity, clock, costs, evidence and common work',()=>{
  const {g}=offer(),id=structuredClone(g.run.projectIdentity),initial=structuredClone(g.initial),now=g.calendar.now;
  const wind=openCase(g,'height',{family:'pendingWind',component:'wind'}),shared=openCase(g,'UUSI-P2-04',{family:'pendingShared',component:'shared'});
  workOnly(g,wind,'height','futureWind',4,3000);workOnly(g,shared,'UUSI-P2-04','futureShared',4,2000);
  const spent=g.costs.reduce((n,x)=>n+x.euros,0);apply(g,'LP1-H01','A');
  expect(g.run.projectIdentity).toEqual(id);expect(g.initial).toEqual(initial);expect(g.calendar.now).toBe(now);expect(g.originMode).toBe('hybrid');expect(g.routeCategory).toBe('hybrid_solar');
  expect(g.calendar.orders.find(x=>x.id.endsWith('futureWind'))!.status).toBe('cancelled');expect(g.calendar.orders.find(x=>x.id.endsWith('futureShared'))!.status).not.toBe('cancelled');
  expect(g.costs.reduce((n,x)=>n+x.euros,0)).toBe(spent);expect(g.recovery.evidence.length).toBeGreaterThan(0);
  expect(g.run.assets.windSites.every(x=>x.exclusions.includes('windComponentAbandoned'))).toBe(true);
 });
 for(const branch of ['reuse','supplement','reduced','blocked'] as const)it(`LP1-E-H02/${branch}: real conversion review and negative bindings`,()=>{
  const {g}=converted(branch);reveal(g,'LP1-E-H01');const pending=g.outcomes.at(-1)!;
  const cost=g.costs.filter(x=>x.euros===8000);expect(cost).toHaveLength(1);
  const w=g.calendar.orders.find(x=>x.id===pending.workId)!;advanceCalendar(g.calendar,w.dueAt,'review',[w.id],w.baselineDue);
  for(const wrong of ['source','choice','revision'] as const){const o=structuredClone(pending);if(wrong==='source')o.sourceId='LP1-A01';if(wrong==='choice')o.sourceChoice='B';if(wrong==='revision')o.planRevision--;expect(()=>OUTCOMES['LP1-E-H02']!(structuredClone(g),g.cases[pending.caseId]!,o,0)).toThrow();}
  expect(reveal(g,'LP1-E-H02').branch).toBe(branch);
  if(branch==='reduced'){const before=getDerivedStats(g.run).solarHa;apply(g,'LP1-H02','A');expect(getDerivedStats(g.run).solarHa).toBe(before-5);expect(g.ending).toBeNull();}
  if(branch==='blocked')expect(g.ending?.kind).toBe('external');
  if(branch==='supplement'){expect(g.calendar.orders.some(x=>x.id.endsWith('solarGridDelta'))).toBe(true);expect(g.run.grid.segments).toHaveLength(1);}
 });
 it('LP1-E-H01/converted rejects an unaccepted or mismatched conversion',()=>{
  const {g}=converted();const pending=g.outcomes.at(-1)!;const invalid=structuredClone(pending);invalid.sourceChoice='B';
  expect(()=>OUTCOMES['LP1-E-H01']!(g,g.cases[pending.caseId]!,invalid,0)).toThrow();expect(reveal(g,'LP1-E-H01').branch).toBe('converted');
 });
 it('025/033 LP1-E-H03/rescued_win requires actual permits, never a second win',()=>{
  const {g}=converted();expect(()=>finish(g,'win','LOPPU-VOITTO')).toThrow();makePermitted(g);finish(g,'win','LOPPU-VOITTO');
  expect(g.ending?.contentId).toBe('LP1-E-H03');const sealed=serializeGame(g);finish(g,'external','external-3');expect(serializeGame(g)).toBe(sealed);
 });
 it('038/039/040 continuation score uses original solar denominator and all old invoices',()=>{
  const {g}=converted();g.initial.solarHa=100;g.initial.solarMWac=52;
  const parcels=g.run.assets.solarParcels;for(let i=0;i<parcels.length;i++)parcels[i]!.exclusions=i<60?[]:['fixture'];
  expect(scopeRatio(g)).toBeCloseTo(0.6);expect(calculateScore(g).scope).toBe(240);
  const c=g.cases['case:lp1_solar_continuation']!;workOnly(g,c,'LP1-H01','previousInvoice',1,100000);reveal(g,'LP1-E-H01');
  expect(g.costs.reduce((n,x)=>n+x.euros,0)).toBeGreaterThanOrEqual(108000);expect(Number.isFinite(calculateScore(g).total)).toBe(true);
 });
 it('041/042 parallel work and targeted shadow restriction preserve MW and remove ghost loss',()=>{
  const g=initialState('shadow-contract','wind'),before=getDerivedStats(g.run);const c=apply(g,'LP1-T01','A');
  const other=openCase(g,'LP1-T02',{family:'parallel',component:'wind'});workOnly(g,other,'LP1-T02','parallel',2,1000);
  reveal(g,'LP1-E-T01');expect(g.calendar.now).toBe(2);expect(getDerivedStats(g.run).windMWac).toBe(before.windMWac);expect(g.run.windYieldIndex).toBeCloseTo(99.6);
  excludeAssets(g,c);expect(g.run.windYieldIndex).toBe(100);
 });
 it('049 DC/AC energy integrates clipped hourly power, not nominal difference',()=>{
  const low=annualSolarEnergy(50,40,40,'openField'),high=annualSolarEnergy(60,40,40,'openField');expect(high).toBeGreaterThan(low);
  expect(annualSolarEnergy(60,40,0,'openField')).toBe(0);expect(()=>annualSolarEnergy(-1,40,40,'openField')).toThrow();
  const g=initialState('dc-contract','solar');g.solarDesign.profile='openField';apply(g,'LP1-A04','A');reveal(g,'LP1-E-A04');const before=getDerivedStats(g.run);apply(g,'LP1-D-A04','A');
  expect(getDerivedStats(g.run).solarHa).toBe(before.solarHa);expect(getDerivedStats(g.run).solarMWac).toBe(before.solarMWac);expect(getDerivedStats(g.run).solarMWp).toBeCloseTo(before.solarMWp*1.2);
 });
 it('036 old saved rules stay recoverable instead of replaying under new rules',()=>{
  const old=JSON.stringify({...createGame('old-save'),rulesVersion:'v5-rules-3'});expect(restoreGame(old)).toMatchObject({ok:false,recoverableRaw:old});
 });
});
