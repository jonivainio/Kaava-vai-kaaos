import { getDerivedStats } from "../../engine";
import type { GameV5 } from "./types";

export function assetValues(game: GameV5) {
  const stats = getDerivedStats(game.run);
  const format = (n: number) => n.toLocaleString("fi-FI", { maximumFractionDigits: 1 });
  const heights = game.run.assets.windSites.filter(site => !site.exclusions.length).map(site => site.totalHeightM);
  const minimum = heights.length ? Math.min(...heights) : 0;
  const maximum = heights.length ? Math.max(...heights) : 0;
  return { count: format(stats.windCount), height: minimum === maximum ? format(minimum) : `${format(minimum)}–${format(maximum)}`,
    power: format(stats.windMWac), solar: format(stats.solarHa) };
}

/** Last actual change per metric; persists across narration, reload and unrelated changes. */
export function recordAssetChanges(before: GameV5, after: GameV5): void {
  const previous = assetValues(before), current = assetValues(after);
  for (const key of ["count", "height", "power", "solar"] as const) {
    if (previous[key] !== current[key]) after.assetChanges[key] = { from: previous[key], to: current[key], revision: after.revision };
  }
}
