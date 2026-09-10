import { getDerivedStats } from '../../engine';
import { changePlan, excludeAssets } from './assets';
import { openCase, followup, schedule, resolveCase, workOnly } from './operations';
import { excludeBattery } from './procedure';
import { modeAllows } from './modes';
import { advanceCalendar } from './calendar';
import type { CaseRecord, FailureAssessment, GameV5, Ending, Component } from './types';

export function assessFailure(game:GameV5, kind:Exclude<Ending['kind'],'win'>, contentId:string, issue:CaseRecord|null,
  values:Record<string,string>, originalCause:Ending['originalCause']):FailureAssessment {
  const sourceId = issue?.sourceId ?? contentId;
  const sharedNature = issue && ['corridor','water','habitat'].includes(issue.mechanism) && (game.recovery.sharedBarrier||issue.affectedComponents?.includes('solar'));
  const blockedComponents:Component[] = sharedNature ? ['shared','solar','wind'] :
    issue?.component === 'wind' ? ['wind'] : contentId === 'external-golden-full' ? ['wind'] : [issue?.component ?? 'shared'];
  return {kind,contentId,caseId:issue?.id??null,sourceId,originalCause,values,
    revealedBasis:values.externalReason ?? contentId,blockedComponents,
    otherBlocks:Object.values(game.cases).filter(x=>x.id!==issue?.id && x.facts.blocking===true && x.component!=='wind').map(x=>x.id),
    alternativesExhausted:issue?.fallback==='unavailable' || contentId==='external-golden-full' || kind==='scope'};
}
export function canOfferSolar(game:GameV5, failure:FailureAssessment):boolean {
  const r=game.recovery,d=getDerivedStats(game.run);
  return game.originMode==='hybrid' && game.activeMode==='hybrid' && r.status==='available' && !game.ending &&
    failure.kind!=='owner' && failure.alternativesExhausted && failure.blockedComponents.length===1 && failure.blockedComponents[0]==='wind' &&
    !failure.otherBlocks.length && !r.sharedBarrier && r.controlledLand && r.independentAccess && r.independentGrid && r.ownerFunding &&
    d.solarHa>=r.minimumHa && d.solarMWac>=r.minimumMWac && (game.battery.status!=='included' || game.battery.separable && !game.battery.sharedEffects);
}
export function interceptFailure(game:GameV5,failure:FailureAssessment):boolean {
  const r=game.recovery;
  if(!r.assessments.some(x=>x.failure.sourceId===failure.sourceId&&x.failure.caseId===failure.caseId&&x.failure.kind===failure.kind))
    r.assessments.push({failure,eligible:canOfferSolar(game,failure),month:game.calendar.now});
  if(r.status==='offered') {
    if(r.failure?.sourceId!==failure.sourceId && !r.additionalFailures.some(x=>x.sourceId===failure.sourceId)) r.additionalFailures.push(failure);
    if(failure.blockedComponents.some(x=>x!=='wind')) {r.status='unavailable';game.scenes=game.scenes.filter(x=>x.id!=='LP1-H01');return false;}
    return true;
  }
  if(!canOfferSolar(game,failure)) return false;
  r.failure=failure;r.status='offered';r.offeredAt=game.calendar.now;
  const issue=openCase(game,'LP1-H01',{family:'lp1_solar_continuation',component:'solar'});
  issue.facts.blocking=true;
  // Keep the actual triggering result before the offer, freeze other choices.
  game.scenes=game.scenes.filter(x=>x.kind!=='decision' && x.kind!=='transition');
  followup(game,issue,'LP1-H01');
  return true;
}
export function acceptSolar(game:GameV5,issue:CaseRecord):void {
  const r=game.recovery;
  if(r.status!=='offered' || !r.failure) throw new Error('No solar continuation offer');
  r.status='accepted';r.acceptedAt=game.calendar.now;
  r.previousPermits=structuredClone(game.procedure.permits);
  game.activeMode='solar';game.routeCategory='hybrid_solar';
  const windIds=game.run.assets.windSites.map(x=>x.id);
  excludeAssets(game,{...issue,placeIds:windIds,parcelIds:[]},'windComponentAbandoned');
  r.revision=game.planRevision;
  for(const work of game.calendar.orders) {
    const c=game.cases[work.caseId];
    const affected:Component[] = c?.component==='shared'?['solar','shared']:[work.component];
    const windOnly=Boolean(c && !c.facts.sharedObligation && (work.component==='wind' || !modeAllows(game,c.sourceId,c))); 
    r.evidence.push({workId:work.id,affectedComponents:affected,placeIds:c?.placeIds??[],parcelIds:c?.parcelIds??[],planRevision:work.planRevision,
      status:windOnly?'historical':work.status==='completed'?'covered':'deltaRequired',reason:windOnly?'Tuuliosa jäi pois.':'Aurinko- ja yhteinen aineisto säilyy; muuttunut suunnitelma tarkistetaan.'});
    if(windOnly && !['completed','cancelled'].includes(work.status)) {work.status='cancelled';r.cancellations.push({id:work.id,reason:'Tuuliosan tuleva työ ei ole enää tarpeen.'});}
  }
  for(const c of Object.values(game.cases)) if(c.component==='wind' || !modeAllows(game,c.sourceId,c)) {
    if(c.facts.sharedObligation)c.component='shared';
    else {resolveCase(c);c.facts.cancelledBySolarContinuation=true;}
  }
  for(const outcome of game.outcomes) if(game.cases[outcome.caseId]?.facts.cancelledBySolarContinuation && !['revealed','queued'].includes(outcome.status)) {
    outcome.status='cancelled';r.cancellations.push({id:outcome.id,reason:'Tuuliosan tuleva tulos.'});
  }
  game.scenes=game.scenes.filter(s=>(!s.caseId || !game.cases[s.caseId]?.facts.cancelledBySolarContinuation) && modeAllows(game,s.id,s.caseId?game.cases[s.caseId]:null));
  for(const p of game.procedure.permits) if(p.component==='wind') {
    const previous=r.previousPermits.find(x=>x.id===p.id);if(previous)Object.assign(p,previous);
    p.required=false;
  }
  excludeBattery(game);
  game.world.landComponent='solar';game.facts.regionalPlanDependency=false;
  // The original procedure and completed YVA remain history, with a new solar profile.
  game.procedure.yvaRequired=game.world.observations.yvaDiscretionary===1;
  game.procedure.yvaDetermined=true;
  if(game.stage===4) {
    game.procedure.adopted=false;game.procedure.planFinal=false;game.procedure.proposalHearingComplete=false;
    game.procedure.appeal='none';game.procedure.appealDueAt=null;game.facts.approvalReady=false;
    workOnly(game,issue,'LP1-H01','solarProposalHearing',2,3000);
  }
  game.facts.externalPresented=true;
  schedule(game,issue,'LP1-H01','A','LP1-E-H01',{duration:0,key:'converted',branchId:'converted'});
  const conversionWork=game.calendar.orders.find(w=>w.id===`${issue.id}:work:converted`)!;
  advanceCalendar(game.calendar,game.calendar.now,'Aurinkojatko hyväksytty',[conversionWork.id],game.calendar.baselineNow);
}
