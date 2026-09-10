import { getDerivedStats } from '../../../engine';
import { MODELS } from '../../../engine/rules';
import source from '../../../../content/lp1.fi.json';
import { changePlan, changeTurbines, curtailYield, excludeAssets } from '../assets';
import { followup, resolveCase, schedule, workOnly, qualityLoss } from '../operations';
import { sample } from '../world';
import { finish } from '../endings';
import { acceptSolar } from '../recovery';
import { modeAllows } from '../modes';
import { solarDesign } from '../solarDesign';
import type { CaseRecord, GameV5, PendingOutcome, SourceChoice } from '../types';
import type { Rule, OutcomeResolver } from './types';

const families:Record<string,{component:'wind'|'solar'|'shared';art:string[]}>={
  lp1_shadow:{component:'wind',art:['lp1-shadow','lp1-window']},lp1_tv:{component:'wind',art:['lp1-tv','lp1-antenna']},
  lp1_transport:{component:'wind',art:['lp1-bridge','lp1-transport']},lp1_glare:{component:'solar',art:['lp1-glare','lp1-surface']},
  lp1_sulfate:{component:'solar',art:['lp1-sulfate','lp1-core']},lp1_grazing:{component:'solar',art:['lp1-grazing','lp1-mowing']},
  lp1_dcac:{component:'solar',art:['lp1-dcac','lp1-profile']},lp1_municipal:{component:'shared',art:['lp1-councils','lp1-boundary']},
  lp1_solar_continuation:{component:'solar',art:['lp1-continuation','lp1-solar-plan']},
};
const metadata=new Map(source.newPolicy.map(x=>[x.id,x]));
const fraction=(g:GameV5,key:string)=>sample(g.run.seed,`lp1:${key}`);
function liveSolar(g:GameV5){return g.run.assets.solarParcels.filter(x=>!x.exclusions.length);}
function setup(g:GameV5,c:CaseRecord,id:string){
  if(c.facts.lp1Prepared)return;
  c.facts.lp1Prepared=true;c.planRevision=g.planRevision;
  if(c.family==='lp1_transport') {c.placeIds=g.run.assets.windSites.filter(x=>!x.exclusions.length).map(x=>x.id);c.facts.alternativeModel='F8';c.facts.alternativeHeight=270;}
  if(c.family==='lp1_municipal') {
    const wind=g.run.assets.windSites.filter(x=>!x.exclusions.length).slice(-2).map(x=>x.id);
    const solar=liveSolar(g).slice(-8).map(x=>x.id);
    c.placeIds=wind;c.parcelIds=solar;
    const first=g.municipalities[0]!;first.placeIds=first.placeIds.filter(x=>!wind.includes(x));first.parcelIds=first.parcelIds.filter(x=>!solar.includes(x));first.adopted=true;first.finalAt=g.calendar.now+1;first.planRevision=g.planRevision;
    g.municipalities.push({id:'municipality:2',placeIds:wind,parcelIds:solar,included:true,adopted:false,final:false,finalAt:null,planRevision:g.planRevision});
  }
  if(id==='LP1-H02') c.parcelIds=g.recovery.excludedParcelIds;
  if(c.family==='lp1_shadow') c.facts.yieldLossPct=0.4;
  if(c.family==='lp1_dcac'){
    const d=getDerivedStats(g.run),old=g.solarDesign;
    g.solarDesign={...solarDesign(d.solarHa,d.solarMWp,d.solarMWac,old.profile==='constrained'),logisticsKm:old.logisticsKm,intraSiteCableKm:old.intraSiteCableKm};
  }
}
export const LP1_WORK:Record<string,Record<SourceChoice,[number,number,number?]>>={
 'LP1-T01':{A:[2,8000],B:[1,5000]},'LP1-T02':{A:[2,6000],B:[1,3000]},'LP1-T03':{A:[2,7000],B:[3,10000,2]},
 'LP1-T04':{A:[3,10000,2],B:[2,6000]},'LP1-A01':{A:[2,7000],B:[1,4000]},'LP1-A02':{A:[2,9000],B:[1,3000]},
 'LP1-A03':{A:[1,3000],B:[1,1000]},'LP1-A04':{A:[1,4000],B:[0,0]},'LP1-A05':{A:[2,6000],B:[1,4000]},
 'LP1-A06':{A:[2,8000],B:[1,3000]},'LP1-Y01':{A:[4,9000,2],B:[2,6000]},
 'LP1-H01':{A:[2,8000],B:[0,0]},'LP1-H02':{A:[2,6000],B:[0,0]},
 'LP1-D-T04':{A:[2,7000],B:[3,10000,2]},'LP1-D-A04':{A:[1,2000],B:[0,0]},'LP1-D-Y01':{A:[2,6000],B:[0,0]},
};
function order(g:GameV5,c:CaseRecord,id:string,choice:SourceChoice,event:string,key:string,branch?:string) {
  const [duration,euros,baseline]=LP1_WORK[id]![choice];
  schedule(g,c,id,choice,event,{duration,euros,baseline:baseline??duration,key,branchId:branch??null});
}
function confirmWork(g:GameV5,c:CaseRecord,id:string,choice:SourceChoice,key:string) {
 const [duration,euros,baseline]=LP1_WORK[id]![choice];workOnly(g,c,id,key,duration,euros,baseline??duration);resolveCase(c);
}
function removeMunicipality(g:GameV5,c:CaseRecord,id:string,choice:SourceChoice) {
  excludeAssets(g,c);const m=g.municipalities.find(x=>x.id==='municipality:2')!;m.included=false;
  order(g,c,id,choice,'LP1-E-Y01','separabilityCheck','separated');
}
function followEligible(g:GameV5,id:string):boolean {
 const meta=metadata.get(id)!;const c=g.cases[`case:${meta.family}`];if(!c)return false;
 if(id==='LP1-H01')return g.recovery.status==='offered';
 if(id==='LP1-H02')return g.recovery.status==='accepted'&&c.revealedBranches.includes('reduced')&&g.recovery.excludedParcelIds.length>0;
 const required:Record<string,string>={'LP1-T04':'bridge_no','LP1-A05':'surface_no','LP1-A06':'risk','LP1-D-T04':'model_report','LP1-D-A04':'useful','LP1-D-Y01':'exclude_after_wait'};
 return c.revealedBranches.includes(required[id]??'@invalid') && c.status==='awaitingDecision';
}
export const lp1Rules:Rule[]=source.entries.filter(x=>x.kind==='decision').map(item=>{
 const meta=metadata.get(item.id)!;const f=families[meta.family]!;
 return {ids:[item.id],role:meta.role==='base'?'base':'followup',art:f.art,prepare:setup,
  spec:()=>({family:meta.family,component:f.component,count:meta.family==='lp1_shadow'?2:undefined,hectares:8}),
  eligible(g,id){
   if(!modeAllows(g,id))return false;
   if(meta.role!=='base')return followEligible(g,id);
   if(g.cases[`case:${meta.family}`]?.facts.lp1Committed)return false;
   const d=getDerivedStats(g.run);
   if(meta.family==='lp1_shadow')return d.windCount>=2 && !g.cases['case:windNoise']?.facts.blocking && (g.cases['case:windNoise']?.status==='resolved'||fraction(g,'jointNoiseResolved')<0.6);
   if(meta.family==='lp1_tv')return d.windCount>0&&fraction(g,'existingTvReception')<0.75;
   if(meta.family==='lp1_transport')return d.windCount>0&&g.run.assets.windSites.filter(x=>!x.exclusions.length).every(x=>x.modelId==='F10')&&fraction(g,'transportRoute')<0.8;
   if(meta.family==='lp1_glare')return d.solarHa>=g.initial.minimumSolarHa+8&&fraction(g,'aviationApproach')<0.55;
   if(meta.family==='lp1_sulfate')return d.solarHa>=g.initial.minimumSolarHa+8&&(g.world.region==='west'||fraction(g,'localSulfateSediment')<0.15);
   if(meta.family==='lp1_grazing')return d.solarHa>0&&fraction(g,'localGrazer')<0.65;
   if(meta.family==='lp1_dcac')return d.solarHa>0&&g.facts.gridResolved===true;
   return meta.family==='lp1_municipal' && !g.procedure.adopted && fraction(g,'twoMunicipalities')<0.35 && (d.windMWac>70||d.solarHa>50);
  },
  apply(g,c,id,choice){
   setup(g,c,id);c.choice=choice;c.facts.lp1Committed=true;c.facts.blocking=true;
   switch(id){
    case 'LP1-T01': if(choice==='B')excludeAssets(g,c);order(g,c,id,choice,'LP1-E-T01',choice==='A'?'shadowDesign':'verification');break;
    case 'LP1-T02': order(g,c,id,choice,'LP1-E-T02',choice==='A'?'baselineAndModel':'deskModel');break;
    case 'LP1-T03':order(g,c,id,choice,'LP1-E-T03',choice==='A'?'bridgeAssessment':'bypassDesign');break;
    case 'LP1-T04':order(g,c,id,choice,'LP1-E-T03',choice==='A'?'bypassDesign':'modelComparison');break;
    case 'LP1-A01':if(choice==='B')excludeAssets(g,c);order(g,c,id,choice,'LP1-E-A01',choice==='A'?'glareSurface':'glareExclusion');break;
    case 'LP1-A02':if(choice==='B')excludeAssets(g,c);order(g,c,id,choice,'LP1-E-A02',choice==='A'?'sulfateSurvey':'boundaryHydrology');break;
    case 'LP1-A03':order(g,c,id,choice,'LP1-E-A03',choice==='A'?'grazingPlan':'mowingPlan');break;
    case 'LP1-A04':order(g,c,id,choice,'LP1-E-A04',choice==='A'?'dcAcStudy':'dcLowLayout');break;
    case 'LP1-A05':
     if(choice==='B')excludeAssets(g,c);else {const selected=c.parcelIds.slice(0,3);excludeAssets(g,{...c,parcelIds:selected},`${c.id}:layout`);}
     order(g,c,id,choice,'LP1-E-A01',choice==='A'?'glareLayout':'glareExclusion');break;
    case 'LP1-A06':
     if(choice==='B')excludeAssets(g,c);else {g.solarDesign.intraSiteCableKm+=0.6;changePlan(g);}
     order(g,c,id,choice,'LP1-E-A02',choice==='A'?'shallowerDesign':'boundaryHydrology');break;
    case 'LP1-Y01':if(choice==='A')order(g,c,id,choice,'LP1-E-Y01','municipalAmendment');else removeMunicipality(g,c,id,choice);break;
    case 'LP1-D-T04':
     if(choice==='A'){changeTurbines(g,c.placeIds,'F8',270);confirmWork(g,c,id,choice,'modelImpactUpdate');}
     else order(g,c,id,choice,'LP1-E-T03','bypassDesign');break;
    case 'LP1-D-A04':
     if(choice==='A'){
      for(const p of liveSolar(g)){p.inverterMWac??=p.hectares*0.65/1.25;p.dcMWp=p.hectares*0.65*1.2;}
      g.solarDesign.investmentEstimateEuros=Math.round((g.solarDesign.dcHighMWp-g.solarDesign.dcLowMWp)*350000);changePlan(g);
      confirmWork(g,c,id,choice,'dcLayoutDocuments');
     }else resolveCase(c);break;
    case 'LP1-D-Y01':if(choice==='A')removeMunicipality(g,c,id,choice);else finish(g,'owner','LOPPU-OMISTAJA',c,{},'choices');break;
    case 'LP1-H01':
     if(choice==='A')acceptSolar(g,c);else {g.recovery.status='declined';const f=g.recovery.failure!;finish(g,f.kind,f.contentId,f.caseId?g.cases[f.caseId]!:null,f.values,f.originalCause);}break;
    case 'LP1-H02':
     if(choice==='A'){excludeAssets(g,c);confirmWork(g,c,id,choice,'solarLayoutPermitDelta');}
     else finish(g,'owner','LOPPU-OMISTAJA',c,{},g.recovery.failure?.originalCause??null);break;
    default:throw new Error(`Unimplemented LP1 choice ${id}`);
   }
   return null;
  }
 };
});

function check(g:GameV5,c:CaseRecord,o:PendingOutcome,sources:string[]) {
 if(!modeAllows(g,o.contentId,c)||metadata.get(o.contentId)?.family!==c.family||!sources.includes(o.sourceId)||o.planRevision!==g.planRevision)
  throw new Error(`LP1 result preconditions: ${o.contentId}/${o.sourceId}/${o.planRevision}`);
 const work=g.calendar.orders.find(x=>x.id===o.workId);
 if(!work||work.status!=='completed'||work.caseId!==c.id||work.planRevision!==o.planRevision||
   work.binding?.sourceId!==o.sourceId||work.binding?.choice!==o.sourceChoice||work.binding?.eventId!==o.contentId)throw new Error('LP1 result work mismatch');
}
const sources:Record<string,string[]>={
 'LP1-E-T01':['LP1-T01'],'LP1-E-T02':['LP1-T02'],'LP1-E-T03':['LP1-T03','LP1-T04','LP1-D-T04'],
 'LP1-E-A01':['LP1-A01','LP1-A05'],'LP1-E-A02':['LP1-A02','LP1-A06'],'LP1-E-A03':['LP1-A03'],
 'LP1-E-A04':['LP1-A04'],'LP1-E-Y01':['LP1-Y01','LP1-D-Y01'],'LP1-E-H01':['LP1-H01'],'LP1-E-H02':['LP1-E-H01'],
};
export const lp1Outcomes:Record<string,OutcomeResolver>=Object.fromEntries(Object.keys(sources).map(id=>[id,(g:GameV5,c:CaseRecord,o:PendingOutcome)=>{
 check(g,c,o,sources[id]!);const choice=o.sourceChoice,key=o.workId!;let branch:string;
 switch(id){
  case 'LP1-E-T01':
   branch=choice==='A'?'control':'removed';
   if(branch==='control') {const d=getDerivedStats(g.run);const targetMW=c.placeIds.reduce((sum,id)=>sum+MODELS[g.run.assets.windSites.find(x=>x.id===id)!.modelId].mw,0);curtailYield(g,c.id,c.placeIds,targetMW?0.004*d.windMWac/targetMW:0);}
   resolveCase(c);break;
  case 'LP1-E-T02':{
   const extra=fraction(g,'tvDataMissing')<0.5,risk=fraction(g,'tvAdditionalRisk')<0.45;
   if(choice==='B'&&key.includes(':deskModel')&&extra){branch='measure_later';schedule(g,c,'LP1-T02','B',id,{duration:1,euros:4000,key:'tvAdditionalMeasurement'});}
   else {branch=choice==='B'&&key.includes(':deskModel')&&!risk?'desk_clear':risk?'mitigation':'baseline_clear';
    if(branch==='mitigation'){c.facts.constructionMitigation=true;workOnly(g,c,id,'tvMitigationDesign',1,2000);}resolveCase(c);}break;}
  case 'LP1-E-T03':
   if(key.includes(':bypassDesign')){branch='bypass_ok';g.solarDesign.logisticsKm=12;resolveCase(c);}
   else if(o.sourceId==='LP1-T04'&&choice==='B'){branch='model_report';followup(g,c,'LP1-D-T04');}
   else if(o.sourceId==='LP1-T03'&&choice==='A'){branch=fraction(g,'bridgeSuitable')<0.6?'bridge_ok':'bridge_no';if(branch==='bridge_no')followup(g,c,'LP1-T04');else resolveCase(c);}
   else throw new Error('Wrong transport source choice');break;
  case 'LP1-E-A01':
   branch=choice==='B'?'block_out':o.sourceId==='LP1-A05'?'layout_ok':fraction(g,'surfaceMitigates')<0.6?'surface_ok':'surface_no';
   if(branch==='surface_no')followup(g,c,'LP1-A05');else resolveCase(c);break;
  case 'LP1-E-A02':
   branch=choice==='B'?'excluded':o.sourceId==='LP1-A06'?'shallower':fraction(g,'acidLayer')<0.5?'risk':'no_acid';
   if(branch==='risk'){c.facts.shallowViable=true;followup(g,c,'LP1-A06');}else resolveCase(c);break;
  case 'LP1-E-A03':
   branch=choice==='B'?'mowing':fraction(g,'grazingSuitable')<0.7?'grazing':'not_suitable';c.facts.maintenancePlan=branch==='grazing'?'grazing':'mowing';resolveCase(c);break;
  case 'LP1-E-A04':
   branch=choice==='B'?'small':g.solarDesign.profile==='openField'?'useful':'weak';if(branch==='useful')followup(g,c,'LP1-D-A04');else resolveCase(c);break;
  case 'LP1-E-Y01':
   branch=key.includes(':separabilityCheck')?'separated':fraction(g,'secondMunicipalityApproves')<0.6?'both':'exclude_after_wait';
   if(branch==='both'){const m=g.municipalities.find(x=>x.id==='municipality:2')!;m.adopted=true;m.finalAt=g.calendar.now+1;m.planRevision=g.planRevision;resolveCase(c);}
   else if(branch==='exclude_after_wait')followup(g,c,'LP1-D-Y01');else resolveCase(c);break;
  case 'LP1-E-H01':
   if(g.recovery.status!=='accepted'||choice!=='A')throw new Error('No accepted conversion');
   branch='converted';schedule(g,c,id,null,'LP1-E-H02',{duration:2,euros:8000,key:'solarContinuationReview'});break;
  case 'LP1-E-H02':
   if(g.recovery.status!=='accepted')throw new Error('No solar continuation');
   branch=g.recovery.review;
   if(branch==='reduced'){
    g.recovery.excludedParcelIds=liveSolar(g).slice(-5).map(x=>x.id);c.parcelIds=g.recovery.excludedParcelIds;
    if(getDerivedStats(g.run).solarHa-5<g.recovery.minimumHa){branch='supplement';g.recovery.review='supplement';}
    else followup(g,c,'LP1-H02');
   }
   if(branch==='supplement'){workOnly(g,c,id,'solarGridDelta',2,5000);resolveCase(c);}
   if(branch==='reuse')resolveCase(c);
   if(branch==='blocked') {if(!g.recovery.unresolvedGridDesign)throw new Error('No preexisting open grid question');finish(g,'external','LOPPU-ULKOINEN',c,{externalReason:'Aurinko-osan avoimeksi jäänyt itsenäisen liitynnän mitoitus ei sovellu. Korvaavaa ratkaisua ei ole.'},'external');}
   break;
  default:throw new Error('Unimplemented LP1 result');
 }
 return branch;
}]));

export function lp1ChoiceNote(g:GameV5,c:CaseRecord,id:string,choice:SourceChoice):string {
 const spec=LP1_WORK[id];if(!spec)return '';
 const [months,euros]=spec[choice];const notes=[euros?`${euros.toLocaleString('fi-FI')} €`:'',months?`Työ ${months} kk`:''].filter(Boolean);
 const remove=(['LP1-T01','LP1-A01','LP1-A02','LP1-A05','LP1-A06','LP1-Y01'].includes(id)&&choice==='B')||(['LP1-H02','LP1-D-Y01'].includes(id)&&choice==='A');
 if(remove){if(c.placeIds.length)notes.push(`Pois ${c.placeIds.length} voimalaa`);if(c.parcelIds.length)notes.push(`Pois ${c.parcelIds.length} ha`);}
 if(id==='LP1-A05'&&choice==='A')notes.push('Paneelialaa pois 3 ha');
 if(id==='LP1-D-A04'&&choice==='A')notes.push(`Lisälaitteiston investointiarvio ${Math.round((g.solarDesign.dcHighMWp-g.solarDesign.dcLowMWp)*350000).toLocaleString('fi-FI')} €`);
 return notes.join(' · ');
}
