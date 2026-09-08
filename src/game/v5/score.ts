import type { GameV5, ScoreResult } from "./types";
import { scopeRatio } from "./assets";
import { getDerivedStats } from "../../engine";

export const RESOURCE_EUROS_PER_POINT = 2500;

export function calculateScore(game: GameV5): ScoreResult {
  const bounded = (n: number, max: number) => Math.max(0, Math.min(max, Math.round(n)));
  const scope = bounded(400 * scopeRatio(game), 400);
  const time = bounded(200 - 5 * game.calendar.avoidableCriticalDelayMonths, 200);
  const quality = bounded(250 - game.quality.reduce((sum, item) => sum + item.pointsLost, 0), 250);
  const spent = game.costs.filter(cost => cost.category !== "contractLiability");
  const resource = bounded(150 - spent.reduce((sum, cost) => sum + cost.euros, 0) / RESOURCE_EUROS_PER_POINT, 150);
  const deductions: ScoreResult["deductions"] = [];
  if (scope < 400) {
    const stats = getDerivedStats(game.run), notes: string[] = [];
    const f = (number: number) => number.toLocaleString("fi-FI", { maximumFractionDigits: 1 });
    if (stats.windMWac < game.initial.windMW) notes.push(`Tuuliteho ${f(game.initial.windMW)} → ${f(stats.windMWac)} MW (${stats.windCount} voimalaa)`);
    const heights = game.run.assets.windSites.filter(site => !site.exclusions.length).map(site => site.totalHeightM);
    if (heights.some(height => height < game.initial.windHeightM)) notes.push(`osa voimaloista madaltui, matalin ${Math.min(...heights)} m`);
    if (stats.windYieldIndex < game.initial.windYield) notes.push(`tuulivoiman tuotantoarvio pieneni ${f(game.initial.windYield - stats.windYieldIndex)} % käyttörajoituksista`);
    if (stats.solarHa < game.initial.solarHa) notes.push(`aurinkoalue ${f(game.initial.solarHa)} → ${f(stats.solarHa)} ha`);
    if (game.initial.weights.bess > 0) {
      if (game.battery.status !== "included") notes.push("akku jäi pois tämän vaiheen tavoitteesta");
      else if (game.battery.chargeMW < game.initial.bessChargeMW || game.battery.dischargeMW < game.initial.bessDischargeMW || game.battery.energyMWh < game.initial.bessMWh)
        notes.push(`akku: lataus ${f(game.battery.chargeMW)} MW, purku ${f(game.battery.dischargeMW)} MW, energia ${f(game.battery.energyMWh)} MWh`);
    }
    deductions.push({ category: "scope", reason: `${notes.join("; ")}.`, points: 400 - scope });
  }
  if (time < 200) deductions.push({ category: "time", reason: `Valinnoista aiheutui ${game.calendar.avoidableCriticalDelayMonths.toLocaleString("fi-FI")} kuukautta toteutunutta lisäaikaa hankkeen etenemiseen.`, points: 200 - time });
  if (quality < 250) {
    let remaining = 250 - quality;
    for (const item of game.quality) {
      const points = Math.min(remaining, item.pointsLost);
      if (points) deductions.push({ category: "quality", reason: item.reason, points });
      remaining -= points;
    }
  }
  if (resource < 150) {
    const development = spent.filter(cost => cost.category === "development").reduce((sum, cost) => sum + cost.euros, 0);
    const land = spent.filter(cost => cost.category === "landPurchase").reduce((sum, cost) => sum + cost.euros, 0);
    deductions.push({ category: "resource", reason: `Toteutuneet kehityskulut ${development.toLocaleString("fi-FI")} €${land ? ` ja maanhankinta ${land.toLocaleString("fi-FI")} €` : ""}. Yksi piste vastaa ${RESOURCE_EUROS_PER_POINT.toLocaleString("fi-FI")} euroa; tulevia vuokravastuita ei ole laskutettu.`, points: 150 - resource });
  }
  return { scope, time, quality, resource, total: scope + time + quality + resource, maximum: 1000, deductions };
}
