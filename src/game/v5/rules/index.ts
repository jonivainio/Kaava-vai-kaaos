import { landRules, landOutcomes } from "./land";
import { programmeRules, programmeOutcomes } from "./programme";
import { natureRules, natureOutcomes } from "./nature";
import { environmentRules, environmentOutcomes } from "./environment";
import { batteryRules, batteryOutcomes } from "./battery";
import { researchRules, researchOutcomes } from "./research";
import { proposalRules, proposalOutcomes } from "./proposal";
import { leaseRules, leaseOutcomes } from "./leases";
import { decisionOutcomes } from "./decisions";
import type { Rule, OutcomeResolver } from "./types";
import { lp1Rules, lp1Outcomes } from './lp1';
import { modeAllows } from '../modes';

export const RULES: Rule[] = [...landRules, ...programmeRules, ...natureRules, ...environmentRules, ...batteryRules, ...researchRules, ...proposalRules, ...leaseRules, ...lp1Rules].map(original=>{
  const spec:Rule['spec']=(game,id)=>{
    const s=original.spec(game,id);
    if(game.activeMode==='solar' && ['missingPages','jointOwners','priority','missingView'].includes(s.family)) return {...s,component:'solar',hectares:s.hectares??6};
    if(['land','land-signing','land-index','land-minimum'].includes(id)&&game.activeMode!=='hybrid')return {...s,component:game.activeMode};
    return s;
  };
  return {...original,spec,eligible:(g,id)=>modeAllows(g,id,spec(g,id))&&((g.activeMode==='solar'&&['opinions','opinions-photo'].includes(id))||original.eligible(g,id)),apply:(g,c,id,choice)=>{
    if(!modeAllows(g,id,c))throw new Error(`Mode rejects choice ${id}`);
    return original.apply(g,c,id,choice);
  }};
});
const byId = new Map<string, Rule>();
for (const rule of RULES) for (const id of rule.ids) {
  if (byId.has(id)) throw new Error(`Duplicate v5 rule: ${id}`);
  byId.set(id, rule);
}
export function ruleFor(id: string): Rule {
  const rule = byId.get(id);
  if (!rule) throw new Error(`No v5 rule for ${id}`);
  return rule;
}
export const OUTCOMES: Record<string, OutcomeResolver> = {};
for (const group of [landOutcomes, programmeOutcomes, natureOutcomes, environmentOutcomes, batteryOutcomes, researchOutcomes, proposalOutcomes, leaseOutcomes, decisionOutcomes, lp1Outcomes]) {
  for (const [id, resolver] of Object.entries(group)) {
    if (OUTCOMES[id]) throw new Error(`Duplicate v5 outcome: ${id}`);
    OUTCOMES[id] = (g,c,o,value)=> {if(!modeAllows(g,id,c))throw new Error(`Mode rejects result ${id}`);return resolver(g,c,o,value);};
  }
}
