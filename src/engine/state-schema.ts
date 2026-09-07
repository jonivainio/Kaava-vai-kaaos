import { z } from 'zod';
import { manifest, validateEffect } from './content';
import type { Effect } from './types';

const id = z.string().min(1).max(200);
const n = z.number().finite().nonnegative();
const integer = n.int().max(Number.MAX_SAFE_INTEGER);
const point = n.max(100);
const scalar = z.union([z.boolean(), z.enum(['weak', 'good'])]);
const model = z.enum(['F10', 'F8', 'F6']);
const effects = z.array(z.custom<Effect>(v => {
  try { validateEffect(v); return true; } catch { return false; }
}));
const flags = z.strictObject(Object.fromEntries(manifest.flags.map(k => [k,
  manifest.readOnlyGateFlags.includes(k) ? z.literal(false).default(false) : z.boolean().default(false),
])));
const site = z.strictObject(Object.fromEntries(manifest.siteFields.map(k => [k,
  k === 'windClass' ? z.enum(['weak', 'good']) : z.boolean(),
])));
const tracks = z.strictObject(Object.fromEntries(Object.entries(manifest.allowedTracks).map(([key, values]) => [key, z.enum(values)])));
export const jobSchema = z.strictObject({
  id, jobId: id, sourceCardId: id, contentVersion: id, startedAt: integer, dueAt: integer,
  sequence: integer, status: z.enum(['active', 'completed']), completionText: z.string().min(1).max(260),
  effects, result: z.record(z.string(), scalar), completedAt: integer.nullable(),
});
export const eventSchema = z.strictObject({
  id, cardId: id, dueAt: integer, sequence: integer, source: id,
  status: z.enum(['pending', 'offered', 'consumed', 'cancelled']),
});
export const runSchema = z.strictObject({
  schemaVersion: z.literal('1'), rulesVersion: z.literal('foundation-1'), contentVersion: id, contentFingerprint: id,
  runId: id, seed: z.string().min(1).max(1000), rngState: integer.max(0xffffffff), nameRngState: integer.max(0xffffffff),
  mode: z.enum(['wind', 'solar', 'hybrid']), phase: z.enum(['01', '02', '03', '04', '05', '06', '07', '08']),
  provenance: z.enum(['scenario', 'demoFixture']), elapsedMonths: integer, remainingWaitMonths: integer,
  projectIdentity: z.strictObject({ nameId: id, displayName: id, namePoolVersion: id }),
  site, revealedSite: z.record(z.string(), scalar),
  assets: z.strictObject({
    windSites: z.array(z.strictObject({ id, modelId: model, totalHeightM: n.min(100).max(300), exclusions: z.array(id) })),
    solarParcels: z.array(z.strictObject({ id, hectares: n.positive(), exclusions: z.array(id) })),
    exclusionGroups: z.record(z.string(), z.strictObject({ windIds: z.array(id), solarIds: z.array(id) })),
  }),
  windHeightCapM: n.min(100).max(300), selectedModelId: model,
  grid: z.strictObject({
    segments: z.array(z.strictObject({ id, km: n, component: z.enum(['shared', 'wind', 'solar']), active: z.boolean(), revision: integer })),
    exportLimitMWac: n.nullable(), technicalStatus: z.enum(['unassessed', 'reviewNeeded']),
    routeHistory: z.array(z.strictObject({ segmentId: id, month: integer, previousKm: n, km: n, revision: integer })),
  }),
  resources: z.strictObject({ budget: point, trust: point, quality: point, patience: point }),
  economicsIndex: point, windYieldIndex: n.max(150), flags, tracks,
  jobs: z.array(jobSchema), pendingEvents: z.array(eventSchema),
  offeredCard: z.strictObject({ cardId: id, token: id, eventId: id.nullable() }).nullable(),
  offeredOutcomeState: z.strictObject({ cardId: id, side: z.enum(['left', 'right']), text: z.string().min(1).max(260), month: integer }).nullable(),
  seenCardIds: z.array(id),
  decisionLog: z.array(z.strictObject({ token: id, cardId: id, side: z.enum(['left', 'right']), startedAt: integer, endedAt: integer })),
  timeline: z.array(z.strictObject({ month: integer, kind: z.enum(['job', 'event', 'exclusion', 'pivot']), reference: id, text: z.string() })),
  ending: z.enum(['developerWithdraws', 'budgetExhausted', 'patienceExhausted', 'projectTooSmall', 'gridTooLong', 'timeLimit']).nullable(),
  nextSequence: integer.positive(),
});
export type RunState = z.infer<typeof runSchema>;
export type Job = z.infer<typeof jobSchema>;
export type PendingEvent = z.infer<typeof eventSchema>;
