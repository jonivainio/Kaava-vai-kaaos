import { describe,it,expect } from 'vitest';
import { createGame,choose,continueStory,currentDecision,currentStory,token,sourceChoice,endingView } from '../src/game/v5';
import { modeAllows } from '../src/game/v5/modes';
describe('LP1 mode smoke',()=>{
 for(const mode of ['wind','solar','hybrid'] as const)it(`${mode}: 100 complete deterministic paths`,()=>{
  for(let seed=0;seed<100;seed++){
   let g=createGame(`lp1-smoke-${seed}`,mode),steps=0;
   try{
    while(g.scenes.length||!g.ending){
     if(++steps>200)throw new Error('200-action watchdog');
     const c=currentDecision(g);
     if(c){expect(modeAllows(g,c.id,g.cases[g.scenes[0]!.caseId!])).toBe(true);g=choose(g,token(g),seed%2?'left':sourceChoice(g,'left')==='A'?'left':'right');}
     else {currentStory(g);g=continueStory(g,token(g));}
    }
    endingView(g);expect(g.narration.progressCount).toBeLessThanOrEqual(3);
    if(mode!=='hybrid'){expect(g.battery.status).toBe('excluded');expect(g.decisions.some(d=>d.contentId.startsWith('BESS-'))).toBe(false);}
   }catch(e){throw new Error(`${mode}/${seed}/step ${steps}/${g.scenes[0]?.id}: ${e}`);}
  }
 },60000);
});
