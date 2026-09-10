import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {restoreGame,serializeGame,choose,sourceChoice,token} from '../src/game/v5';
const raw=(name:string)=>readFileSync(`reports/lp1/fixtures/${name}.json`,'utf8');
describe('LP1 reachable saved transitions',()=>{
 it.each(['LP1-H01','LP1-H02','LP1-D-T04','LP1-D-A04','LP1-D-Y01'])('026/031/034/035 %s replays both choices and rejects a duplicate token',id=>{
  const loaded=restoreGame(raw(`decision-${id}`));expect(loaded.ok).toBe(true);if(!loaded.ok)throw Error(loaded.error);
  for(const choice of ['A','B']){
   const g=loaded.state,t=token(g),side=sourceChoice(g,'left')===choice?'left':'right',next=choose(g,t,side);
   expect(next.revision).toBe(g.revision+1);expect(choose(next,t,side)).toBe(next);
   const saved=serializeGame(next),restored=restoreGame(saved);expect(restored.ok).toBe(true);
   if(restored.ok)expect(serializeGame(restored.state)).toBe(saved);
  }
 });
 it('LP1-E-H01/converted validates source, choice, revision and unchanged prior history through replay',()=>{
  const text=raw('event-LP1-E-H01-converted');expect(restoreGame(text).ok).toBe(true);
  for(const wrong of ['sourceId','sourceChoice','planRevision'] as const){
   const g=JSON.parse(text),o=g.outcomes.find((x:any)=>x.contentId==='LP1-E-H01');
   o[wrong]=wrong==='planRevision'?o.planRevision+1:wrong==='sourceId'?'LP1-A01':'B';
   const invalid=JSON.stringify(g);expect(restoreGame(invalid)).toMatchObject({ok:false,recoverableRaw:invalid});
  }
 });
 it('LP1-E-H03/rescued_win has a real accepted conversion and review; wrong source/choice/revision cannot restore as a win',()=>{
  const text=raw('end-hybrid_solar-win'),restored=restoreGame(text);expect(restored.ok).toBe(true);
  if(restored.ok){expect(restored.state.ending?.contentId).toBe('LP1-E-H03');expect(restored.state.recovery.status).toBe('accepted');}
  for(const wrong of ['sourceId','sourceChoice','planRevision'] as const){
   const g=JSON.parse(text),o=g.outcomes.find((x:any)=>x.contentId==='LP1-E-H02'&&x.status==='revealed');expect(o).toBeTruthy();
   o[wrong]=wrong==='planRevision'?o.planRevision+1:wrong==='sourceId'?'LP1-A01':'B';
   expect(restoreGame(JSON.stringify(g)).ok).toBe(false);
  }
 });
});
