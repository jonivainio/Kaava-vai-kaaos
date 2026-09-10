import {createHash} from 'node:crypto';
import {writeFileSync} from 'node:fs';
import {createGame,currentDecision,currentStory,choose,continueStory,sourceChoice,token} from '../dist/v5/index.js';
const seed=process.argv[2],hash=s=>parseInt(createHash('sha256').update(s).digest('hex').slice(0,8),16)/4294967296;
let g=createGame(seed,'hybrid');const trace=[];
try{for(let n=0;n<201&&(!g.ending||g.scenes.length);n++){
 const c=currentDecision(g),s=currentStory(g),canonical=c?.id==='LP1-H01'?'A':hash(`${seed}:${g.decisions.length}`)<.5?'A':'B';
 trace.push({n,now:g.calendar.now,stage:g.stage,id:g.scenes[0]?.id,kind:g.scenes[0]?.kind,branch:g.scenes[0]?.branchId,choice:c?canonical:null,recovery:g.recovery.status});
 g=c?choose(g,token(g),sourceChoice(g,'left')===canonical?'left':'right'):continueStory(g,token(g));
}}catch(e){console.log(String(e));}
console.log(JSON.stringify(trace.slice(-25),null,2));writeFileSync(`reports/lp1/${seed}-trace.json`,JSON.stringify({trace,g},null,2));
