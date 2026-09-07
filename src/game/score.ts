import type { Game } from "./types";
import { getDerivedStats } from "../engine/rules";
export interface ScoreLine {
  reason: string;
  points: number;
}
export interface GameScore {
  maximum: 1000;
  total: number;
  deductions: ScoreLine[];
}
/** Success-only, deterministic score. Nameplate loss includes lost turbines once. */
export function getScore(s: Game): GameScore | null {
  if (s.ending !== "ready") return null;
  const d = getDerivedStats(s.run),
    lines: ScoreLine[] = [];
  const add = (reason: string, points: number) => {
    if (points > 0) lines.push({ reason, points: Math.round(points) });
  };
  const n = (value: number) =>
    value.toLocaleString("fi-FI", { maximumFractionDigits: 1 });
  for (const delay of s.delays)
    add(`${delay.reason}: ${delay.months} kk lisäaikaa`, delay.months * 8);
  if (s.initial.windMW)
    add(
      `Tuulivoiman yhteisteho ${n(s.initial.windMW)} → ${n(d.windMWac)} MW. Poistetut voimalat ja mallivaihdot pienensivät tehoa.`,
      Math.max(0, (1 - d.windMWac / s.initial.windMW) * 400),
    );
  if (s.initial.windCount)
    add(
      `Kokonaiskorkeus 300 → ${n(d.windHeightCapM)} m.`,
      Math.max(0, (1 - d.windHeightCapM / 300) * 100),
    );
  if (s.initial.solarHa)
    add(
      `Aurinkoalue ${n(s.initial.solarHa)} → ${n(d.solarHa)} ha.`,
      Math.max(0, (1 - d.solarHa / s.initial.solarHa) * 300),
    );
  for (const compact of s.compactions) add(compact, 15);
  const deductions = lines.filter((l) => l.points > 0);
  return {
    maximum: 1000,
    total: Math.max(0, 1000 - deductions.reduce((sum, l) => sum + l.points, 0)),
    deductions,
  };
}
