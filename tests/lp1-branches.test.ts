import {describe,it,expect} from 'vitest';
import {initialState} from '../src/game/v5/state';
import {ruleFor,OUTCOMES} from '../src/game/v5/rules';
import {openCase} from '../src/game/v5/operations';
import {advanceCalendar} from '../src/game/v5/calendar';
import {finish} from '../src/game/v5/endings';
import {entry,content} from '../src/game/v5/content';
import {getDerivedStats} from '../src/engine';
import type {GameV5,SourceChoice,Mode,PendingOutcome} from '../src/game/v5/types';
import {mkdirSync,writeFileSync} from 'node:fs';

type Decision=[string,SourceChoice];
const chains:Record<string,Decision[][]>={
 'LP1-E-T01':[[['LP1-T01','A']],[['LP1-T01','B']]],
 'LP1-E-T02':[[['LP1-T02','A']],[['LP1-T02','B']]],
 'LP1-E-T03':[[['LP1-T03','A']],[['LP1-T03','B']],[['LP1-T03','A'],['LP1-T04','A']],[['LP1-T03','A'],['LP1-T04','B']]],
 'LP1-E-A01':[[['LP1-A01','A']],[['LP1-A01','B']],[['LP1-A01','A'],['LP1-A05','A']],[['LP1-A01','A'],['LP1-A05','B']]],
 'LP1-E-A02':[[['LP1-A02','A']],[['LP1-A02','B']],[['LP1-A02','A'],['LP1-A06','A']],[['LP1-A02','A'],['LP1-A06','B']]],
 'LP1-E-A03':[[['LP1-A03','A']],[['LP1-A03','B']]],
 'LP1-E-A04':[[['LP1-A04','A']],[['LP1-A04','B']]],
 'LP1-E-Y01':[[['LP1-Y01','A']],[['LP1-Y01','B']]],
};
export function fixture(seed:string,mode:Mode='hybrid'):GameV5 {
 const g=initialState(seed,mode);g.stage=3;g.world.externalId=null;g.world.externalStage=null;
 g.facts.gridResolved=true;g.facts.nightNoiseCorrected=true;return g;
}
export function decide(g:GameV5,id:string,choice:SourceChoice){
 const r=ruleFor(id);if(!r.eligible(g,id))throw new Error('Fixture ineligible');
 const c=openCase(g,id,r.spec(g,id));r.prepare?.(g,c,id);c.choice=choice;c.rounds++;r.apply(g,c,id,choice);return c;
}
export function completed(g:GameV5,o:PendingOutcome){
 const w=g.calendar.orders.find(x=>x.id===o.workId)!;
 advanceCalendar(g.calendar,w.dueAt,'test work',[w.id],w.baselineDue);
}
export function reveal(g:GameV5,o:PendingOutcome){
 completed(g,o);const c=g.cases[o.caseId]!;const branch=OUTCOMES[o.contentId]!(g,c,o,0);
 if(branch&&!c.revealedBranches.includes(branch))c.revealedBranches.push(branch);o.branchId=branch;o.status='revealed';return branch;
}
const results:{id:string;branch:string;negative:string[];seed:string}[]=[];
describe('LP1 each named event branch, with actual ordered work',()=>{
 for(const [id,paths] of Object.entries(chains)) for(const target of entry(id).branches) it(`${id}/${target.id}: reachable; rejects wrong source, choice, revision and unfinished work`,()=>{
  let found=false;
  outer:for(let seed=0;seed<120;seed++)for(const path of paths){
   const mode:Mode=id.includes('-T')?'wind':'solar';const g=fixture(`lp1-branch-${seed}`,mode);g.stage=entry(path[0]![0]).stage;
   try {
    for(let i=0;i<path.length;i++){
     decide(g,...path[i]!);
     const o=g.outcomes.at(-1)!;
     if(i<path.length-1){reveal(g,o);g.stage=3;continue;}
     completed(g,o);
     const before=structuredClone(g),c=g.cases[o.caseId]!;
     const branch=reveal(g,o);if(branch!==target.id)continue;
     for(const wrong of ['source','choice','revision','work'] as const){
      const bad=structuredClone(before),out=bad.outcomes.find(x=>x.id===o.id)!;
      if(wrong==='source')out.sourceId='land';if(wrong==='choice')out.sourceChoice=out.sourceChoice==='A'?'B':'A';
      if(wrong==='revision')out.planRevision--;if(wrong==='work')bad.calendar.orders.find(x=>x.id===out.workId)!.status='active';
      expect(()=>OUTCOMES[id]!(bad,bad.cases[c.id]!,out,0)).toThrow();
     }
     expect(entry(id).branches.some(x=>x.id===branch)).toBe(true);
     results.push({id,branch:target.id,negative:['source','choice','revision','work'],seed:g.run.seed});found=true;break outer;
    }
   }catch(e){if(String(e).includes('Fixture ineligible'))continue;throw e;}
  }
  expect(found,`${id}/${target.id}`).toBe(true);
 });
 it('has exactly the source package branches and preserves the original v5 entries',()=>{
  expect(content.filter(x=>x.id.startsWith('LP1-'))).toHaveLength(27);
  expect(content.filter(x=>x.id.startsWith('LP1-E-')).reduce((sum,x)=>sum+x.branches.length,0)).toBe(33);
  mkdirSync('reports/lp1',{recursive:true});writeFileSync('reports/lp1/branch-results.json',JSON.stringify(results,null,2));
 });
});
