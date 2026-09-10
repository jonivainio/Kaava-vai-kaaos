import fs from 'node:fs';
import crypto from 'node:crypto';
const root = 'docs/source-lp1/KAAVA_VAI_KAAOS_LISAPAKETTI_01/data/';
const source = JSON.parse(fs.readFileSync(root + 'uusi_sisalto.json', 'utf8'));
const overlays = JSON.parse(fs.readFileSync(root + 'mooditekstit.json', 'utf8'));
const policy = JSON.parse(fs.readFileSync(root + 'moodiauditointi.json', 'utf8'));
const all = [...source.entries, ...source.confirmationDialogs.map(x => ({...x,kind:'decision',stage:x.id==='LP1-D-Y01'?4:3,role:'followup',family:source.entries.find(e=>e.id===x.source).family,branches:[],choices:{A:{label:x.A,result:x.A_result,branches:[]},B:{label:x.B,result:x.B_result,branches:[]}}}))];
const entries = all.map(x => ({ id:x.id, kind:x.kind === 'confirmation' ? 'decision' : x.kind,
  stage:x.stage, title:x.title, body:x.body, branches:x.branches.map(({id,text})=>({id,text})),
  choices:Object.fromEntries(Object.entries(x.choices).map(([key,c])=>[key,{label:c.label,result:c.result,branches:c.branches.map(({id,text})=>({id,text}))}])) }));
const hash = crypto.createHash('sha256').update(JSON.stringify({source,overlays,policy})).digest('hex');
const output = {sourceSha256:hash,entries,overlays:overlays.overrides,policy:policy.entries.map(({id,classification,candidateContexts})=>({id,classification,contexts:candidateContexts})),newPolicy:all.map(({id,contexts,family,role})=>({id,contexts,family,role}))};
const text = JSON.stringify(output,null,2)+'\n';
if(process.argv.includes('--check')) { if(fs.readFileSync('content/lp1.fi.json','utf8')!==text)throw Error('LP1 import differs'); }
else fs.writeFileSync('content/lp1.fi.json',text);
console.log(`LP1 source import: ${entries.length} IDs, ${hash}`);
