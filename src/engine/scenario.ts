import names from '../../content/project_names.fi.json';
import { check, manifest } from './content';
import type { CardPack, CreateRunOptions, RunState } from './types';

export function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
export function freeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}
export function buildScenario(options: CreateRunOptions, pack: CardPack, fingerprint: string): RunState {
  check(typeof options.seed === 'string' && options.seed.length > 0 && options.seed.length <= 1000, 'Siemen puuttuu tai on liian pitkä');
  check(['wind', 'solar', 'hybrid'].includes(options.mode), 'Tuntematon pelimuoto');
  check(!options.demoFixture || options.mode === 'hybrid', 'Manifestin demo on hybridi');
  let rngState = hash(`mechanics:${options.seed}`);
  const draw = (min: number, max: number) => {
    rngState = (rngState + 0x6d2b79f5) >>> 0;
    let t = rngState;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return min + Math.floor(((t ^ (t >>> 14)) >>> 0) / 4294967296 * (max - min + 1));
  };
  const { mode } = options;
  let count = mode === 'solar' ? 0 : draw(12, mode === 'wind' ? 24 : 20);
  let ha = mode === 'wind' ? 0 : draw(mode === 'solar' ? 80 : 60, mode === 'solar' ? 220 : 160);
  let km = draw(mode === 'solar' ? 2 : 5, mode === 'solar' ? 12 : 20);
  const site: RunState['site'] = Object.fromEntries(manifest.siteFields.map(k => [k, k === 'windClass' ? (draw(0, 3) === 0 ? 'weak' as const : 'good' as const) : draw(0, 3) === 0]));
  // Shared site characteristics give the bounded pilot some correlated risks.
  site.frogConflict = site.waterRisk!;
  site.sulphateRisk = site.waterRisk!;
  site.yvaRequired = mode !== 'solar' || site.yvaRequired!;
  if (options.demoFixture) {
    count = manifest.demo.fixture.windCount; ha = manifest.demo.fixture.solarHa; km = manifest.demo.fixture.gridKm;
    Object.assign(site, manifest.demo.fixture.site);
  }
  const pool = options.namePool ?? names;
  check(typeof pool.poolVersion === 'string' && pool.poolVersion.length > 0 && pool.names.length >= 2, 'Virheellinen nimipankki');
  check(new Set(pool.names.map(n => n.id)).size === pool.names.length && new Set(pool.names.map(n => n.name)).size === pool.names.length, 'Nimipankissa on toisto');
  check(pool.names.every(n => /^N\d{3}$/.test(n.id) && /^[A-ZÅÄÖ][a-zåäö]+(?:suo|neva)$/.test(n.name) && n.name.length <= 36), 'Virheellinen fiktiivinen nimi');
  const candidates = pool.names.filter(n => n.id !== options.previousNameId);
  const nameRngState = hash(`names:${options.seed}:${options.previousNameId ?? ''}:${pool.poolVersion}`);
  const name = candidates[nameRngState % candidates.length]!;
  const windSites = Array.from({ length: count }, (_, i) => ({ id: `W${i + 1}`, modelId: 'F10' as const, totalHeightM: 300, exclusions: [] as string[] }));
  const solarParcels = Array.from({ length: ha }, (_, i) => ({ id: `S${i + 1}`, hectares: 1, exclusions: [] as string[] }));
  const exclusionGroups: RunState['assets']['exclusionGroups'] = {};
  const allEffects = pack.cards.flatMap(c => Object.values(c.choices).flatMap(v => [...v.effects, ...v.delayed.flatMap(j => j.effects)]));
  for (const e of allEffects) {
    if (e.op !== 'windRemove' && e.op !== 'solarRemove') continue;
    const group = exclusionGroups[e.reason] ??= { windIds: [], solarIds: [] };
    // Stable fictional groups, bound once at creation, never picked from remaining assets.
    const ids = e.op === 'windRemove' ? windSites.map(w => w.id) : solarParcels.map(p => p.id);
    const amount = e.op === 'windRemove' ? e.count : Math.ceil(e.hectares);
    const offset = e.reason === 'frog_hydrology' || e.reason === 'drainage_edge' ? 0 : hash(e.reason) % Math.max(1, ids.length);
    const selected = Array.from({ length: Math.min(amount, ids.length) }, (_, i) => ids[(i + offset) % ids.length]!);
    const key = e.op === 'windRemove' ? 'windIds' : 'solarIds';
    if (selected.length > group[key].length) group[key] = selected;
  }
  return {
    schemaVersion: '1', rulesVersion: 'foundation-1', contentVersion: pack.packId, contentFingerprint: fingerprint,
    runId: `run-${hash(`${options.seed}:${mode}`).toString(16)}`, seed: options.seed, rngState, nameRngState,
    mode, phase: '01', provenance: options.demoFixture ? 'demoFixture' : 'scenario', elapsedMonths: 0, remainingWaitMonths: 0,
    projectIdentity: { nameId: name.id, displayName: name.name, namePoolVersion: pool.poolVersion }, site, revealedSite: {},
    assets: { windSites, solarParcels, exclusionGroups }, windHeightCapM: 300, selectedModelId: 'F10',
    grid: { segments: [{ id: 'external-1', km, component: mode === 'hybrid' ? 'shared' : mode, active: true, revision: 0 }],
      exportLimitMWac: null, technicalStatus: 'unassessed', routeHistory: [] },
    resources: { budget: 100, trust: 50, quality: 15, patience: 75 }, economicsIndex: 65, windYieldIndex: 100,
    flags: Object.fromEntries(manifest.flags.map(k => [k, false])),
    tracks: { municipality: 'unstarted', regional: site.regionalRequired ? 'pending' : 'notRequired', grid: 'unstarted', funding: 'unstarted', yva: site.yvaRequired ? 'programme' : 'notRequired' },
    jobs: [], pendingEvents: [], offeredCard: null, offeredOutcomeState: null, seenCardIds: [], decisionLog: [], timeline: [], ending: null, nextSequence: 1,
  };
}

/** Explicit rules metadata, not parsed from card prose. Jobs reveal the creation-time site. */
export const JOB_REVEALS: Record<string, string[]> = {
  drainage_rights: ['waterRisk'], regional_evidence: ['regionalRequired'], grid_initial: ['gridConstraint', 'gridCrossingConflict'],
  ecology_surveys: ['frogConflict', 'goldenEagleConflict', 'ospreyConflict', 'seaEagleConflict', 'reindeerConflict', 'sulphateRisk'],
  groundwater_study: ['waterRisk'], wind_measurement: ['windClass'], noise_update: [],
  migration_update: ['birdEvidenceOutdated'], yva_supplement: ['yvaNeedsSupplement'], renewfm_decision: ['grantRejected'],
};
