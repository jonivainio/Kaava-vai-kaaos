import type { Region, EncounterVariant, DecisionId } from "./types";

export const REGIONS: Region[] = ["west", "central", "lapland", "east"];
// Game weights, not measured probabilities. See docs/ALUEET_JA_AJASTUS.md.
export const PROFILES = {
  west: {
    clear: 0.7,
    reduce: 0.1,
    fatal: 0.15,
    species: ["metsäpeuran", "kotkan", "kotkan", "suden"],
  },
  central: {
    clear: 0.55,
    reduce: 0.15,
    fatal: 0.25,
    species: ["metsäpeuran", "metsäpeuran", "suden", "kotkan"],
  },
  lapland: {
    clear: 0.4,
    reduce: 0.25,
    fatal: 0.4,
    species: ["poron", "poron", "kotkan", "kotkan"],
  },
  east: {
    clear: 0.15,
    reduce: 0.4,
    fatal: 0.85,
    species: ["metsäpeuran", "suden", "suden", "kotkan"],
  },
} satisfies Record<
  Region,
  { clear: number; reduce: number; fatal: number; species: string[] }
>;

export function regionalWeight(
  region: Region,
  id: DecisionId,
  v?: EncounterVariant,
): number {
  const key = v?.id ?? "base";
  if (key.startsWith("herding-")) return region === "lapland" ? 5 : 0;
  if (key.startsWith("nature-reindeer"))
    return region === "lapland" ? 0 : region === "east" ? 2 : 3;
  if (key === "nature-squirrel")
    return region === "lapland" ? 0 : region === "central" ? 4 : 2;
  if (key.startsWith("golden-"))
    return region === "west" || region === "lapland" ? 4 : 1;
  if (key === "solar-postcare")
    return region === "west" ? 4 : region === "lapland" ? 1 : 2;
  if (key === "solar-squirrel")
    return region === "lapland" ? 0 : region === "central" ? 4 : 2;
  if (key === "proposal-lake")
    return region === "central" || region === "east" ? 4 : 1;
  if (key === "programme-cumulative") return region === "west" ? 4 : 1;
  if (id === "nature" && !v)
    return region === "central" || region === "east" ? 3 : 1;
  return 1;
}

export function pickEncounter(
  region: Region,
  id: DecisionId,
  pool: EncounterVariant[],
  unit: number,
): number {
  const weights = [undefined, ...pool].map((v) =>
    regionalWeight(region, id, v),
  );
  let remaining = unit * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < weights.length; i++) {
    remaining -= weights[i]!;
    if (remaining < 0) return i;
  }
  throw new Error("Alueen korttivalikoima on tyhjä");
}
