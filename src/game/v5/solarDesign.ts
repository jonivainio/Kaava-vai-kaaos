import type { SolarDesign } from './types';
const energyCache = new Map<string, number>();
/** Fictional 8760-hour reference profile, not a site production forecast.
 * Hourly power is clipped by BOTH inverter and export limits before summing.
 */
export function annualSolarEnergy(dcMWp: number, inverterMWac: number, exportMW: number, profile: SolarDesign['profile']): number {
  if ([dcMWp,inverterMWac,exportMW].some(x => !Number.isFinite(x) || x < 0)) throw new Error('Invalid solar rating');
  if (!dcMWp || !inverterMWac || !exportMW) return 0;
  const key = `${dcMWp}:${inverterMWac}:${exportMW}:${profile}`;
  const cached = energyCache.get(key);
  if (cached !== undefined) return cached;
  let mwh = 0;
  for (let day = 0; day < 365; day++) {
    const season = 0.55 + 0.4 * Math.sin(2 * Math.PI * (day - 80) / 365);
    for (let hour = 0; hour < 24; hour++) {
      const daylight = Math.max(0, Math.sin(Math.PI * (hour - 6) / 12));
      const irradiance = season * daylight * (profile === 'openField' ? 0.72 : 0.28);
      mwh += Math.min(dcMWp * irradiance * 0.96, inverterMWac, exportMW);
    }
  }
  const result = Math.round(mwh);
  if (energyCache.size >= 2048) energyCache.clear();
  energyCache.set(key, result);
  return result;
}
export function solarDesign(ha:number, dc:number, ac:number, constrained:boolean): SolarDesign {
  const profile = constrained ? 'constrained' : 'openField';
  const high = Math.round(dc * 1.2 * 10) / 10;
  return { exportLimitMW:ac, inverterMWac:ac, dcLowMWp:dc, dcHighMWp:high, profile,
    annualLowMWh:annualSolarEnergy(dc,ac,ac,profile), annualHighMWh:annualSolarEnergy(high,ac,ac,profile),
    investmentEstimateEuros:0,logisticsKm:0,intraSiteCableKm:Math.round(ha/10)/10 };
}
