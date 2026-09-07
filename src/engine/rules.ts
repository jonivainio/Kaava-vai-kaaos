import type { DerivedStats, ModelId, RunState } from './types';

export const RULES = Object.freeze({ solarMWpPerHa: 0.65, dcAcRatio: 1.25,
  minWindMWac: 50, minSolarMWac: 20.8, minHybridMWac: 80,
  maxWindGridKm: 40, maxSolarGridKm: 20, maxMonths: 96 });
export const MODELS: Record<ModelId, { mw: number; minHeight: number; maxHeight: number }> = {
  F10: { mw: 10, minHeight: 280, maxHeight: 300 },
  F8: { mw: 8, minHeight: 250, maxHeight: 280 },
  F6: { mw: 6, minHeight: 220, maxHeight: 250 },
};
export function getDerivedStats(s: RunState): DerivedStats {
  const wind = s.assets.windSites.filter(a => !a.exclusions.length);
  const incompatible = wind.filter(a => {
    const m = MODELS[a.modelId];
    const height = Math.min(a.totalHeightM, s.windHeightCapM);
    return height < m.minHeight || height > m.maxHeight;
  });
  const solarHa = s.assets.solarParcels.filter(a => !a.exclusions.length).reduce((n, a) => n + a.hectares, 0);
  const solarMWp = solarHa * RULES.solarMWpPerHa;
  const solarMWac = solarMWp / RULES.dcAcRatio;
  const windPlannedMWac = wind.reduce((n, a) => n + MODELS[a.modelId].mw, 0);
  const windMWac = windPlannedMWac - incompatible.reduce((n, a) => n + MODELS[a.modelId].mw, 0);
  const segments = [...new Map(s.grid.segments.filter(g => g.active).map(g => [g.id, g])).values()];
  const length = (component: 'wind' | 'solar') => segments.filter(g => g.component === 'shared' || g.component === component).reduce((n, g) => n + g.km, 0);
  return { windCount: wind.length, windHeightCapM: s.windHeightCapM, windPlannedMWac, windMWac,
    windCompatible: !incompatible.length, incompatibleWindSiteIds: incompatible.map(a => a.id), windYieldIndex: s.windYieldIndex,
    solarHa, solarMWp, solarMWac, combinedNameplateMWac: windMWac + solarMWac,
    windExternalKm: s.mode === 'solar' ? 0 : length('wind'), solarExternalKm: s.mode === 'wind' ? 0 : length('solar'),
    uniqueExternalKm: segments.reduce((n, g) => n + g.km, 0), exportLimitMWac: s.grid.exportLimitMWac };
}
export function settle(s: RunState) {
  for (const key of ['budget', 'trust', 'quality', 'patience'] as const) s.resources[key] = Math.max(0, Math.min(100, s.resources[key]));
  s.economicsIndex = Math.max(0, Math.min(100, s.economicsIndex));
  s.windYieldIndex = Math.max(0, Math.min(150, s.windYieldIndex));
  if (s.ending) return;
  const d = getDerivedStats(s);
  if (s.resources.budget === 0) s.ending = 'budgetExhausted';
  else if (s.resources.patience === 0) s.ending = 'patienceExhausted';
  else if (s.elapsedMonths > RULES.maxMonths) s.ending = 'timeLimit';
  else if (d.uniqueExternalKm > (s.mode === 'solar' ? RULES.maxSolarGridKm : RULES.maxWindGridKm)) s.ending = 'gridTooLong';
  else if (d.windCompatible) {
    if (s.mode === 'wind' && d.windMWac < RULES.minWindMWac) s.ending = 'projectTooSmall';
    if (s.mode === 'solar' && d.solarMWac < RULES.minSolarMWac) s.ending = 'projectTooSmall';
    if (s.mode === 'hybrid' && d.combinedNameplateMWac < RULES.minHybridMWac) {
      const canPivot = !s.flags.pivotUsed && ((d.windMWac >= RULES.minWindMWac && d.windExternalKm <= RULES.maxWindGridKm) ||
        (d.solarMWac >= RULES.minSolarMWac && d.solarExternalKm <= RULES.maxSolarGridKm));
      s.flags.hybridPivotAvailable = canPivot;
      if (!canPivot) s.ending = 'projectTooSmall';
    }
  }
}
