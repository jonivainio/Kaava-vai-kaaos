import {mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createGame,currentDecision,currentStory,choose,continueStory,sourceChoice,token,serializeGame,restoreGame} from '../dist/v5/index.js';
const dir='reports/lp1/fixtures';mkdirSync(dir,{recursive:true});
const found={},checks=[],errors=[];
const hash=s=>parseInt(createHash('sha256').update(s).digest('hex').slice(0,8),16)/4294967296;
function record(key,g){
 if(found[key])return;
 const raw=serializeGame(g),restored=restoreGame(raw);
 if(!restored.ok||serializeGame(restored.state)!==raw)throw Error(`Replay mismatch ${key}: ${restored.error}`);
 found[key]={seed:g.run.seed,mode:g.originMode,revision:g.revision,file:`${key}.json`};writeFileSync(`${dir}/${key}.json`,raw);
 checks.push({key,revision:g.revision,restored:true});
 if(currentDecision(g)&&key.startsWith('decision-'))for(const choice of ['A','B']){
  const next=choose(g,token(g),sourceChoice(g,'left')===choice?'left':'right'),rawNext=serializeGame(next),r=restoreGame(rawNext);
  if(!r.ok||serializeGame(r.state)!==rawNext)throw Error(`Choice replay mismatch ${key}/${choice}`);
  checks.push({key,choice,revision:next.revision,restored:true});
 }
}
for(const mode of ['solar','wind','hybrid']){
 for(let i=0;i<(mode==='hybrid'?2500:250);i++){
  const seed=`lp1-fixtures-${i}`;let g=createGame(seed,mode);
  try{
   record(`start-${mode}`,g);
   for(let turn=0;turn<200;turn++){
    const c=currentDecision(g),s=currentStory(g);
    if(c?.id.startsWith('LP1-'))record(`decision-${c.id}`,g);
    if(s?.id.startsWith('LP1-'))record(`event-${s.id}-${g.scenes[0]?.branchId??'single'}`,g);
    if(g.recovery.status==='accepted'){
     record(`converted-stage-${g.stage}`,g);
     if(g.scenes[0]?.kind==='wait')record('converted-wait',g);
    }
    if(g.ending&&!g.scenes.length){
     record(`end-${g.routeCategory}-${g.ending.kind}`,g);
     if(g.originMode==='solar'&&g.ending.kind==='win')record(`solar-win-yva-${g.procedure.yvaRequired}`,g);
     break;
    }
    const canonical=c?.id==='LP1-H01'?'A':hash(`${seed}:${g.decisions.length}`)<.5?'A':'B';
    g=c?choose(g,token(g),sourceChoice(g,'left')===canonical?'left':'right'):continueStory(g,token(g));
    if(turn===199)throw Error('watchdog');
   }
  }catch(e){errors.push({seed,mode,error:String(e)});console.log(errors.at(-1));}
  if((i+1)%250===0)console.log(`${mode} ${i+1}; ${Object.keys(found).length} fixtures; ${errors.length} errors`);
 }
}
writeFileSync(`${dir}/index.json`,JSON.stringify({found,checks,errors},null,2));
if(errors.length)process.exitCode=1;
