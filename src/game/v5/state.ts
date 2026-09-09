import { createRun, getDerivedStats } from "../../engine";
import { newCalendar } from "./calendar";
import { CONTENT_VERSION } from "./content";
import { makeWorld } from "./world";
import { newProcedure, requiredPermit } from "./procedure";
import type { GameV5, Mode, NamePool } from "./types";

/** Creates the public state before a scenario director selects encounters. */
export function initialState(seed: string, mode: Mode = "hybrid", previousNameId?: string, namePool?: NamePool): GameV5 {
  const initialRun = createRun({ seed, mode, previousNameId, namePool });
  const run = structuredClone(initialRun);
  const stats = getDerivedStats(run);
  const world = makeWorld(seed, mode);
  const procedure = newProcedure(mode !== "solar");
  procedure.permits.push(requiredPermit("construction", "shared", 0));
  if (mode !== "solar") procedure.permits.push(requiredPermit("aviation", "wind", 0));
  const game: GameV5 = {
    version: "swipe-v5-1", contentVersion: CONTENT_VERSION, rulesVersion: "v5-rules-2", assetChanges: {},
    run, initialRun, initial: { windCount: stats.windCount, windMW: stats.windMWac, windHeightM: 300, windYield: 100,
      solarHa: stats.solarHa, solarMWp: stats.solarMWp, solarMWac: stats.solarMWac,
      bessChargeMW: 100, bessDischargeMW: 100, bessMWh: 200,
      weights: mode === "wind" ? { wind: 1, solar: 0, bess: 0 } : mode === "solar" ? { wind: 0, solar: 1, bess: 0 } : { wind: 0.6, solar: 0.3, bess: 0.1 },
      minimumWindMW: 50, minimumSolarHa: 40, minimumScopeRatio: 0.25 },
    revision: 0, planRevision: 0, stage: 1, calendar: newCalendar(), world,
    battery: { status: "undecided", landSecured: false, separable: true, sharedEffects: false,
      chargeMW: 100, dischargeMW: 100, energyMWh: 200, equipmentRevision: 0,
      offeredChargeMW: null, offeredDischargeMW: null, gridStatus: "unassessed",
      technicalData: false, safetyAssessed: false, connectionApprovalExpires: null, connectionAgreement: false },
    procedure, cases: {}, outcomes: [], leases: [], costs: [], quality: [], decisions: [],
    stageDecks: { 1: [], 2: [], 3: [], 4: [] }, seenIds: [], seenFamilies: [], scenes: [], lastOutcome: "", ending: null,
    facts: { wetlandReserveOwned: false, regionalPlanDependency: false, layoutTightened: false }, nextSequence: 1, actions: [],
  };
  // A contract deadline only exists if UUSI-P1-03 sets it; no generic expiry trap.
  return game;
}
