export type Mode = 'wind' | 'solar' | 'hybrid';
export type Phase = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';
export type Side = 'left' | 'right';
export type ModelId = 'F10' | 'F8' | 'F6';
export type TrackKey = 'municipality' | 'regional' | 'grid' | 'funding' | 'yva';
export type ResourceKey = 'budget' | 'trust' | 'quality' | 'patience';
export type AdjustableField = ResourceKey | 'economicsIndex' | 'windYieldIndex';
export type Effect =
  | { op: 'adjust'; field: AdjustableField; value: number }
  | { op: 'flag'; key: string; value: boolean }
  | { op: 'track'; key: TrackKey; value: string }
  | { op: 'windRemove'; count: number; reason: string }
  | { op: 'solarRemove'; hectares: number; reason: string }
  | { op: 'heightCap'; metres: number }
  | { op: 'gridDistance'; deltaKm: number }
  | { op: 'queueCard'; cardId: string; delayMonths: number }
  | { op: 'pivot'; mode: 'wind' | 'solar' }
  | { op: 'finish'; ending: 'planAdopted' | 'developerWithdraws' };
export interface Delayed {
  jobId: string; afterMonths: number; completionText: string; effects: Effect[];
}
export interface Choice {
  label: string; outcomeText: string; timeMonths: number; effects: Effect[]; delayed: Delayed[];
}
export interface Condition {
  field: string; operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'; value: string | boolean | number;
}
export interface Card {
  id: string; version: number; title: string; body: string; speakerId: string; artKey: string;
  phases: Phase[]; modes: Mode[]; tone: string; trigger: 'ambient' | 'followup' | 'milestone' | 'epilogue';
  weight: number; maxPerRun: number; requiresAll: Condition[];
  choices: Record<Side, Choice>; sourceIds: string[]; authorNote: string;
}
export interface CardPack {
  schemaVersion: string; packId: string; locale: string; status: string; cards: Card[];
}
export interface NamePool { poolVersion: string; names: { id: string; name: string }[] }
export interface CreateRunOptions {
  seed: string; mode: Mode; previousNameId?: string; namePool?: NamePool;
  /** Explicit, labelled manifest fixture; never a campaign gate bypass. */
  demoFixture?: boolean;
}
export interface DerivedStats {
  windCount: number; windHeightCapM: number; windPlannedMWac: number; windMWac: number;
  windCompatible: boolean; incompatibleWindSiteIds: string[]; windYieldIndex: number;
  solarHa: number; solarMWp: number; solarMWac: number; combinedNameplateMWac: number;
  windExternalKm: number; solarExternalKm: number; uniqueExternalKm: number;
  exportLimitMWac: number | null;
}
export type { RunState, Job, PendingEvent } from './state-schema';
