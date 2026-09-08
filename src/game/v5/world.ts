import { hash } from "../../engine/scenario";
import type { Mode, Region, Species, Stage, World } from "./types";

/** Counter-based independent streams: text, names and preview never consume a draw. */
export function sample(seed: string, key: string): number {
  let value = hash(`v5-world:${seed}:${key}`);
  value ^= value >>> 16; value = Math.imul(value, 0x7feb352d);
  value ^= value >>> 15; value = Math.imul(value, 0x846ca68b);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}
export function pick<T>(seed: string, key: string, values: readonly T[]): T {
  if (!values.length) throw new Error(`Empty choice pool: ${key}`);
  return values[Math.floor(sample(seed, key) * values.length)]!;
}
export function integer(seed: string, key: string, min: number, max: number): number {
  return min + Math.floor(sample(seed, key) * (max - min + 1));
}
export function makeWorld(seed: string, mode: Mode): World {
  const region = pick<Region>(seed, "region", ["west", "central", "lapland", "east"]);
  const herdingArea = region === "lapland" || (region === "east" && sample(seed, "herding-area") < 0.15);
  const forestDeerArea = !herdingArea && sample(seed, "forest-deer-area") < 0.75;
  const squirrelArea = !herdingArea;
  const available: Species[] = ["osprey", "golden", "birds", "bat"];
  if (forestDeerArea) available.push("forestDeer", "forestDeer");
  if (squirrelArea) available.push("squirrel");
  if (herdingArea) available.push("reindeer", "reindeer");
  const species = mode === "solar" ? "frog" : pick(seed, "species", available);
  const researchSpecies = species === "forestDeer" || species === "reindeer" || species === "golden" ? species : pick<World["researchSpecies"]>(seed, "research-species", ["golden", "wolf"]);
  const externalStage = sample(seed, "external-fate") < 1 / 3 ? integer(seed, "external-stage", 1, 4) as Stage : null;
  const externalPool: Record<Stage, string[]> = {
    1: ["external-0", "ext-land-owner", "ext-land-use"],
    2: ["external-1", "ext-initiative-priority", "ext-initiative-owner"],
    3: ["external-2", "ext-grid-station"],
    4: ["external-3", "ext-buyer", "ext-grid-delivery"],
  };
  if (species === "forestDeer") externalPool[3].push("ext-nature-network");
  if (species === "golden") externalPool[3].push("external-golden-full");
  if (herdingArea) externalPool[3].push("external-herding");
  if (mode !== "solar") externalPool[2].push("EV-PV", "EV-VTT-TULOS");
  return {
    region, herdingArea, forestDeerArea, squirrelArea,
    borderEffects: region === "lapland" && sample(seed, "border-effects") < 0.25,
    species, researchSpecies, researchCost: pick(seed, "research-cost", [10000, 15000, 20000, 30000, 45000, 60000]),
    researchPublishedAt: integer(seed, "research-published", 34, 54), externalStage,
    externalId: externalStage ? pick(seed, "external-id", externalPool[externalStage]) : null,
    landComponent: mode === "wind" ? "wind" : mode === "solar" ? "solar" : pick(seed, "land-component", ["wind", "solar"]),
    ownersAgree: sample(seed, "owners-agree") < 0.5,
    regionalPlanNeeded: sample(seed, "regional-plan-needed") < 0.35,
    regionalPlanDue: integer(seed, "regional-plan-due", 52, 86), regionalPlanForecast: 42,
    wetlandSameCatchment: true, solarDrainageProblem: mode !== "wind",
    observations: {
      independentSolar: mode !== "wind" && sample(seed, "independent-solar") < 0.3 ? 1 : 0,
      militaryRouteConflict: sample(seed, "military-route-conflict") < (region === "east" ? 0.65 : 0.2) ? 1 : 0,
      yvaDiscretionary: sample(seed, "discretionary-yva") < 0.55 ? 1 : 0,
    },
  };
}
