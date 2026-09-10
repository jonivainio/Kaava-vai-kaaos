import { createRun, getDerivedStats } from "../../engine";
import { newCalendar } from "./calendar";
import { CONTENT_VERSION } from "./content";
import { makeWorld, sample, pick } from "./world";
import { solarDesign } from "./solarDesign";
import { newProcedure, requiredPermit } from "./procedure";
import type { GameV5, Mode, NamePool } from "./types";

/** Creates the public state before a scenario director selects encounters. */
export function initialState(seed: string, mode: Mode = "hybrid", previousNameId?: string, namePool?: NamePool): GameV5 {
  const initialRun = createRun({ seed, mode, previousNameId, namePool });
  const run = structuredClone(initialRun);
  const stats = getDerivedStats(run);
  const world = makeWorld(seed, mode);
  const procedure = newProcedure(mode !== "solar" || world.observations.yvaDiscretionary === 1);
  procedure.permits.push(requiredPermit("construction", "shared", 0));
  if (mode !== "solar") procedure.permits.push(requiredPermit("aviation", "wind", 0));
  const game: GameV5 = {
    version: "swipe-v5-1", contentVersion: CONTENT_VERSION, rulesVersion: "v5-lp1-1", assetChanges: {},
    originMode: mode, activeMode: mode, routeCategory: mode, modeAuditWarnings: [],
    solarDesign: solarDesign(stats.solarHa, stats.solarMWp, stats.solarMWac, sample(seed,'lp1:solarProfile')<0.3),
    municipalities: [{id:'municipality:1',placeIds:run.assets.windSites.map(x=>x.id),parcelIds:run.assets.solarParcels.map(x=>x.id),included:true,adopted:false,final:false,finalAt:null,planRevision:0}],
    recovery: {status: mode === 'hybrid' ? 'available' : 'unavailable', failure:null, additionalFailures:[], offeredAt:null,acceptedAt:null,revision:null,
      review:pick(seed,'lp1:solarReview',['reuse','supplement','reduced','blocked'] as const), minimumHa:40,minimumMWac:20.8,
      controlledLand:true,independentAccess:world.observations.independentSolar===1, independentGrid:world.observations.independentSolar===1,
      ownerFunding:sample(seed,'lp1:solarFunding')<0.85,sharedBarrier:false,unresolvedGridDesign:sample(seed,'lp1:openGridQuestion')<0.4,
      excludedParcelIds:[],evidence:[],cancellations:[],assessments:[],previousPermits:[]},
    narration: { progressCount: 0, progressStages: [], lastWasProgress: false, updates: [] },
    run, initialRun, initial: { windCount: stats.windCount, windMW: stats.windMWac, windHeightM: 300, windYield: 100,
      solarHa: stats.solarHa, solarMWp: stats.solarMWp, solarMWac: stats.solarMWac,
      bessChargeMW: 100, bessDischargeMW: 100, bessMWh: 200,
      weights: mode === "wind" ? { wind: 1, solar: 0, bess: 0 } : mode === "solar" ? { wind: 0, solar: 1, bess: 0 } : { wind: 0.6, solar: 0.3, bess: 0.1 },
      minimumWindMW: 50, minimumSolarHa: 40, minimumScopeRatio: 0.25 },
    revision: 0, planRevision: 0, stage: 1, calendar: newCalendar(), world,
    battery: { status: mode === 'hybrid' ? "undecided" : "excluded", landSecured: false, separable: true, sharedEffects: false,
      chargeMW: mode === 'hybrid' ? 100 : 0, dischargeMW: mode === 'hybrid' ? 100 : 0, energyMWh: mode === 'hybrid' ? 200 : 0, equipmentRevision: 0,
      offeredChargeMW: null, offeredDischargeMW: null, gridStatus: "unassessed",
      technicalData: false, safetyAssessed: false, connectionApprovalExpires: null, connectionAgreement: false },
    procedure, cases: {}, outcomes: [], leases: [], costs: [], quality: [], decisions: [],
    stageDecks: { 1: [], 2: [], 3: [], 4: [] }, seenIds: [], seenFamilies: [], scenes: [], lastOutcome: "", ending: null,
    facts: { wetlandReserveOwned: false, regionalPlanDependency: false, layoutTightened: false }, nextSequence: 1, actions: [],
  };
  if (game.recovery.review === 'blocked' && !game.recovery.unresolvedGridDesign) game.recovery.review = 'reuse';
  game.facts.solarYvaBasis = world.observations.yvaDiscretionary === 1 ? 'Laaja vaikutusalue ja yhteisvaikutukset: yksittäistapauksen YVA-ratkaisu.' : 'Rajattu ennestään muutettu alue: kaavan vaikutusselvitykset, ei erillistä YVAa.';
  // A contract deadline only exists if UUSI-P1-03 sets it; no generic expiry trap.
  return game;
}
