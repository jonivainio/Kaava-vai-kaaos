import { getDerivedStats, MODELS } from "../../engine/rules";
import type { CaseRecord, GameV5, ModelId } from "./types";

function unique(values: string[]): string[] { return [...new Set(values)]; }
export function excludeAssets(game: GameV5, issue: CaseRecord, reason = issue.id): { wind: number; solarHa: number } {
  let wind = 0, solarHa = 0;
  for (const id of unique(issue.placeIds)) {
    const site = game.run.assets.windSites.find(item => item.id === id);
    if (!site) throw new Error(`Unknown turbine: ${id}`);
    if (!site.exclusions.length) wind++;
    if (!site.exclusions.includes(reason)) site.exclusions.push(reason);
  }
  for (const id of unique(issue.parcelIds)) {
    const parcel = game.run.assets.solarParcels.find(item => item.id === id);
    if (!parcel) throw new Error(`Unknown solar parcel: ${id}`);
    if (!parcel.exclusions.length) solarHa += parcel.hectares;
    if (!parcel.exclusions.includes(reason)) parcel.exclusions.push(reason);
  }
  if (wind || solarHa) { changePlan(game); updateYield(game); }
  return { wind, solarHa };
}
export function restoreAssets(game: GameV5, ids: string[], originalCaseId: string): number {
  const source = game.cases[originalCaseId];
  if (!source) throw new Error("Restoration has no original case");
  if (ids.length !== 2 || unique(ids).length !== 2 || ids.some(id => !source.placeIds.includes(id))) throw new Error("Restoration requires two original places");
  let restored = 0;
  for (const id of ids) {
    const site = game.run.assets.windSites.find(item => item.id === id);
    if (!site) throw new Error(`Restoration cannot create a turbine: ${id}`);
    if (site.exclusions.includes(originalCaseId)) {
      site.exclusions = site.exclusions.filter(reason => reason !== originalCaseId);
      if (!site.exclusions.length) restored++;
    }
  }
  if (restored) { changePlan(game); updateYield(game); }
  return restored;
}
export function restoreSolar(game: GameV5, ids: string[], originalCaseId: string): number {
  let restored = 0;
  const source = game.cases[originalCaseId];
  if (!source || ids.some(id => !source.parcelIds.includes(id))) throw new Error("Unknown solar restoration source");
  for (const id of unique(ids)) {
    const parcel = game.run.assets.solarParcels.find(item => item.id === id)!;
    if (parcel.exclusions.includes(originalCaseId)) {
      parcel.exclusions = parcel.exclusions.filter(reason => reason !== originalCaseId);
      if (!parcel.exclusions.length) restored += parcel.hectares;
    }
  }
  if (restored) changePlan(game);
  return restored;
}
export function changePlan(game: GameV5): void {
  game.planRevision++;
  // A technical finding about a previous plan needs an explicit compatibility review.
  for (const permit of game.procedure.permits) if (permit.required && ["applied", "granted", "final"].includes(permit.status)) {
    permit.status = "preparing"; permit.dueAt = null; permit.finalAt = null;
  }
  if (game.procedure.adopted) {
    game.facts.postAdoptionChange = true;
    game.procedure.adopted = false; game.procedure.planFinal = false;
    game.procedure.proposalHearingComplete = false;
    game.procedure.appeal = "none"; game.procedure.appealDueAt = null;
    game.facts.approvalReady = false;
  }
}
export function changeTurbines(game: GameV5, ids: string[], modelId: ModelId, height: number): void {
  const model = MODELS[modelId];
  if (height < model.minHeight || height > model.maxHeight) throw new Error("Height and turbine model are incompatible");
  let changed = false;
  for (const id of unique(ids)) {
    const site = game.run.assets.windSites.find(item => item.id === id);
    if (!site) throw new Error(`Unknown turbine: ${id}`);
    if (site.modelId !== modelId || site.totalHeightM !== height) {
      site.modelId = modelId; site.totalHeightM = height; changed = true;
    }
  }
  if (changed) { changePlan(game); updateYield(game); }
}
export function curtailYield(game: GameV5, caseId: string, placeIds: string[], fraction: number): void {
  if (fraction < 0 || fraction > 1) throw new Error("Invalid yield reduction");
  for (const id of unique(placeIds)) {
    if (!game.run.assets.windSites.some(site => site.id === id)) throw new Error(`Unknown yield target: ${id}`);
    game.facts[`yield:${caseId}:${id}`] = fraction;
  }
  updateYield(game);
}
function updateYield(game: GameV5): void {
  const live = game.run.assets.windSites.filter(site => !site.exclusions.length);
  const totalMW = live.reduce((total, site) => total + MODELS[site.modelId].mw, 0);
  const lostMW = live.reduce((total, site) => {
    const limits = Object.entries(game.facts).filter(([key]) => key.startsWith("yield:") && key.endsWith(`:${site.id}`)).map(([, value]) => Number(value));
    // Overlapping restrictions for the same place do not add the same stopped hours twice.
    return total + MODELS[site.modelId].mw * Math.max(0, ...limits);
  }, 0);
  game.run.windYieldIndex = totalMW ? 100 * (1 - lostMW / totalMW) : 100;
}
export function changeGridRoute(game: GameV5, km: number): void {
  if (!Number.isFinite(km) || km < 0) throw new Error("Invalid grid route length");
  const segment = game.run.grid.segments[0]!;
  if (segment.km === km) return;
  game.run.grid.routeHistory.push({ segmentId: segment.id, month: game.calendar.now, previousKm: segment.km, km, revision: segment.revision + 1 });
  segment.km = km; segment.revision++;
  changePlan(game);
  // Wind, solar and the optional battery still share this single physical segment.
}
export function scopeRatio(game: GameV5): number {
  const d = getDerivedStats(game.run), initial = game.initial;
  const ratio = (current: number, target: number) => target > 0 ? Math.min(1, current / target) : 1;
  const live = game.run.assets.windSites.filter(site => !site.exclusions.length);
  const height = live.length ? live.reduce((sum, site) => sum + site.totalHeightM, 0) / live.length : 0;
  const wind = ratio(d.windMWac, initial.windMW) * (0.8 + 0.1 * ratio(height, initial.windHeightM) + 0.1 * ratio(d.windYieldIndex, initial.windYield));
  const solar = (ratio(d.solarHa, initial.solarHa) + ratio(d.solarMWac, initial.solarMWac)) / 2;
  const battery = game.battery.status === "included" ? (ratio(game.battery.chargeMW, initial.bessChargeMW) + ratio(game.battery.dischargeMW, initial.bessDischargeMW) + ratio(game.battery.energyMWh, initial.bessMWh)) / 3 : 0;
  return wind * initial.weights.wind + solar * initial.weights.solar + battery * initial.weights.bess;
}
