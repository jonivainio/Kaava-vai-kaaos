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

export const RULES: Rule[] = [...landRules, ...programmeRules, ...natureRules, ...environmentRules, ...batteryRules, ...researchRules, ...proposalRules, ...leaseRules];
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
for (const group of [landOutcomes, programmeOutcomes, natureOutcomes, environmentOutcomes, batteryOutcomes, researchOutcomes, proposalOutcomes, leaseOutcomes, decisionOutcomes]) {
  for (const [id, resolver] of Object.entries(group)) {
    if (OUTCOMES[id]) throw new Error(`Duplicate v5 outcome: ${id}`);
    OUTCOMES[id] = resolver;
  }
}
