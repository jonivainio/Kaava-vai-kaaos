import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createGame,currentDecision,currentStory,choose,continueStory,sourceChoice,token,getDerivedStats} from '../dist/v5/index.js';
const count=Number(process.argv[2]??3000),prefix=process.argv[3]??'lp1-development',policy=process.argv[4]??'reference',mode=process.argv[5]??'hybrid';
if(!Number.isInteger(count)||count<1||count>10000||!['reference','cautious','economy'].includes(policy)||!['wind','solar','hybrid'].includes(mode)||!/^[a-z0-9-]+$/.test(prefix))throw Error('Invalid simulation arguments');
const hash=x=>createHash('sha256').update(x).digest('hex');
const draw=(seed,n)=>parseInt(hash(`${seed}:independent-policy:${n}`).slice(0,8),16)/4294967296;
const economyB=new Set(['land','land-signing','land-index','land-minimum','surveys','surveys-spring','surveys-access','surveys-team','research','research-gps','research-cumulative','research-seasons','BESS-P1-01','BESS-P2-04','LP1-T02','LP1-A03','LP1-A04','LP1-D-A04']);
const cautiousB=new Set(['UUSI-P3-02','UUSI-P3-12','UUSI-P4-08']);
const report={prefix,count,mode,policy,sourceCommit:process.env.LP1_SOURCE_COMMIT??'working-tree-development',
 bundleSha256:hash(readFileSync('dist/v5/index.js')),policyCodeSha256:hash(readFileSync('tools/simulate-lp1.mjs')),sourceSha256:JSON.parse(readFileSync('content/lp1.fi.json')).sourceSha256,
 policyDescription:policy==='reference'?'Independent 50/50 canonical choices, no hidden state':{default:'A',chooseB:[...(policy==='economy'?economyB:cautiousB)],information:'visible card identity only; no world, queued result or future card inspection'},
 startedAt:new Date().toISOString(),endings:{},originalHybridEndings:{},examples:{},errors:[],decisions:{},branches:{},warnings:{},
 recovery:{allHybrids:mode==='hybrid'?count:0,windFailures:0,eligibleWindFailures:0,offered:0,accepted:0,declined:0,rescuedWins:0},rows:[]};
const add=(object,key)=>object[key]=(object[key]??0)+1;
for(let i=0;i<count;i++){
 const seed=`${prefix}-${i}`;let g=createGame(seed,mode),actions=0,lastProgress=false,consecutive=0;
 try{
  while(!g.ending||g.scenes.length){
   if(++actions>200)throw Error('200-action watchdog');
   const before=g,c=currentDecision(g);currentStory(g);
   if(g.scenes[0]?.kind==='wait'){if(lastProgress)consecutive++;lastProgress=true;}else lastProgress=false;
   if(c){
    const canonical=policy==='reference'?(draw(seed,g.decisions.length)<.5?'A':'B'):(policy==='economy'?economyB:cautiousB).has(c.id)?'B':'A';
    g=choose(g,token(g),sourceChoice(g,'left')===canonical?'left':'right');
   }else g=continueStory(g,token(g));
   if(g===before)throw Error('No progress');
  }
  if(g.narration.progressCount>3||consecutive)throw Error('Narration cap violated');
  if(mode!=='hybrid' && (g.battery.status!=='excluded'||g.decisions.some(d=>d.contentId.startsWith('BESS-'))))throw Error('BESS mode leak');
  const category=g.ending.kind,route=g.routeCategory,base=[1,2,3,4].reduce((sum,s)=>sum+Number(g.facts[`baseCount:${s}`]??0),0),confirm=g.decisions.filter(d=>d.contentId.startsWith('LP1-D-')).length;
  add(report.endings,`${route}:${category}`);report.examples[`${route}:${category}`]??=seed;
  const r=g.recovery;if(mode==='hybrid'){
   add(report.originalHybridEndings,r.failure?.kind??category);
   if(r.assessments.some(x=>x.failure.blockedComponents.length===1&&x.failure.blockedComponents[0]==='wind'))report.recovery.windFailures++;
   if(r.assessments.some(x=>x.eligible))report.recovery.eligibleWindFailures++;
   if(r.offeredAt!==null)report.recovery.offered++;
   if(r.acceptedAt!==null)report.recovery.accepted++;
   if(r.status==='declined')report.recovery.declined++;
   if(route==='hybrid_solar'&&category==='win')report.recovery.rescuedWins++;
  }
  const d=getDerivedStats(g.run);
  report.rows.push({seed,route,ending:category,originalFailure:r.failure?.kind??null,actions,base,mandatory:g.decisions.length-base-confirm,confirmations:confirm,waits:g.narration.progressCount,
   decisions:g.decisions.length,months:g.calendar.now,avoidableMonths:g.calendar.avoidableCriticalDelayMonths,cost:g.costs.reduce((sum,x)=>sum+x.euros,0),windMW:d.windMWac,solarHa:d.solarHa,score:g.ending.score?.total??null});
 }catch(e){report.errors.push({seed,token:token(g),error:String(e)});}
 for(const d of g.decisions)add(report.decisions,`${d.contentId}/${d.choice}`);
 for(const o of g.outcomes.filter(x=>x.status==='revealed'))add(report.branches,`${o.contentId}/${o.branchId??'single'}`);
 for(const warning of g.modeAuditWarnings)add(report.warnings,warning);
 if((i+1)%500===0)console.log(`${mode}/${policy} ${i+1}/${count}, ${report.errors.length} errors`);
}
const stats=values=>{const s=[...values].sort((a,b)=>a-b);return{p50:s[Math.floor(s.length*.5)]??null,p90:s[Math.floor(s.length*.9)]??null,max:s.at(-1)??null};};
report.summary=Object.fromEntries(['actions','decisions','base','mandatory','confirmations','waits','months','avoidableMonths','cost','windMW','solarHa'].map(key=>[key,stats(report.rows.map(r=>r[key]))]));
report.completedAt=new Date().toISOString();mkdirSync('reports/lp1/simulation',{recursive:true});writeFileSync(`reports/lp1/simulation/${prefix}-${mode}-${policy}.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({mode,policy,count,endings:report.endings,recovery:report.recovery,errors:report.errors.slice(0,8),totalErrors:report.errors.length,summary:report.summary}));
if(report.errors.length)process.exitCode=1;
