import data from "../../content/encounters.fi.json";
import type { DecisionId, EncounterVariant, Story } from "./types";
export const VARIANTS = data.variants as unknown as Record<
  DecisionId,
  EncounterVariant[]
>;
export const SOLAR_VARIANTS = data.solarVariants as Partial<
  Record<DecisionId, EncounterVariant[]>
>;
export const EXTRA_EXTERNAL = data.external as Story[][];
