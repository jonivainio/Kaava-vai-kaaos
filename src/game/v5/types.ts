import type { Mode, ModelId, NamePool, RunState, Side } from "../../engine";
export type { Mode, Side, ModelId, NamePool };
export type Stage = 1 | 2 | 3 | 4;
export type SourceChoice = "A" | "B";
export type Component = "wind" | "solar" | "bess" | "shared";
export type RouteCategory = Mode | "hybrid_solar";
export interface FailureAssessment {
  contentId: string; caseId: string | null; kind: Exclude<Ending["kind"], "win">;
  originalCause: Ending["originalCause"]; values: Record<string, string>;
  sourceId: string; revealedBasis: string; blockedComponents: Component[];
  otherBlocks: string[]; alternativesExhausted: boolean;
}
export interface EvidenceCoverage {
  workId: string; affectedComponents: Component[]; placeIds: string[]; parcelIds: string[];
  planRevision: number; status: "covered" | "deltaRequired" | "historical"; reason: string;
}
export interface SolarContinuation {
  status: "unavailable" | "available" | "offered" | "accepted" | "declined";
  failure: FailureAssessment | null; additionalFailures: FailureAssessment[];
  offeredAt: number | null; acceptedAt: number | null; revision: number | null;
  review: "reuse" | "supplement" | "reduced" | "blocked";
  minimumHa: number; minimumMWac: number; controlledLand: boolean; independentAccess: boolean;
  independentGrid: boolean; ownerFunding: boolean; sharedBarrier: boolean;
  unresolvedGridDesign: boolean; excludedParcelIds: string[]; evidence: EvidenceCoverage[];
  cancellations: { id: string; reason: string }[];
  assessments: { failure: FailureAssessment; eligible: boolean; month: number }[];
  previousPermits: Permit[];
}
export interface SolarDesign {
  exportLimitMW: number; dcLowMWp: number; dcHighMWp: number; inverterMWac: number;
  profile: "openField" | "constrained"; annualLowMWh: number; annualHighMWh: number;
  investmentEstimateEuros: number; logisticsKm: number; intraSiteCableKm: number;
}
export interface Municipality {
  id: string; placeIds: string[]; parcelIds: string[]; included: boolean;
  adopted: boolean; final: boolean; finalAt: number | null; planRevision: number;
}
export type Region = "west" | "central" | "lapland" | "east";
export type Species = "osprey" | "golden" | "forestDeer" | "reindeer" | "squirrel" | "birds" | "frog" | "bat" | "wolf";
export type Mechanism = "flight" | "calving" | "corridor" | "habitat" | "water" | "noise" | "land" | "aviation" | "landscape" | "procedure" | "grid" | "equipment";
export type Milestone = "any" | "programme" | "yva" | "proposal" | "adoption" | "finality";
export interface TextBranch { id: string; text: string }
export interface ChoiceText { label: string; result: string; branches: TextBranch[] }
/** Only player-visible values. Prose rules and branch conditions live in the audit. */
export interface ContentEntry {
  id: string; kind: "decision" | "event"; stage: Stage;
  title: string; body: string; branches: TextBranch[];
  choices: Partial<Record<SourceChoice, ChoiceText>>;
}
export interface CaseRecord {
  affectedComponents?: Component[];
  id: string; sourceId: string; family: string; component: Component;
  species: Species | null; mechanism: Mechanism; planRevision: number;
  choice: SourceChoice | null; placeIds: string[]; parcelIds: string[];
  status: "open" | "working" | "awaitingDecision" | "resolved" | "ignored";
  facts: Record<string, boolean | number | string>;
  /** A studied fallback cannot be randomly invalidated by its later confirmation. */
  fallback: "unexamined" | "viable" | "unavailable";
  rounds: number; revealedBranches: string[];
}
export interface SeasonWindow { start: number; end: number; period: number }
export interface WorkOrder {
  binding?: { sourceId: string; choice: SourceChoice | null; eventId: string };
  id: string; caseId: string; sourceId: string; planRevision: number;
  component: Component; orderedAt: number; startedAt: number; dueAt: number;
  duration: number; baselineDuration: number; baselineStart: number; baselineDue: number;
  dependencies: string[]; season: SeasonWindow | null;
  status: "scheduled" | "active" | "completed" | "cancelled";
  completedAt: number | null; sequence: number; costId: string | null;
  /** Immutable seed-derived observation, fixed on order, published separately. */
  observation: string; delayCause: "normal" | "choice" | "external";
}
export interface Calendar {
  now: number; baselineNow: number; avoidableCriticalDelayMonths: number;
  orders: WorkOrder[]; nextSequence: number;
  advances: { from: number; to: number; baselineFrom: number; baselineTo: number; reason: string; waitingFor: string[]; avoidableMonths: number }[];
}
export interface PendingOutcome {
  id: string; caseId: string; sourceId: string; sourceChoice: SourceChoice | null;
  contentId: string; branchId: string | null; workId: string | null;
  dueAt: number; milestone: Milestone; planRevision: number; sequence: number;
  status: "pending" | "queued" | "revealed" | "cancelled" | "outdated";
}
export interface CostEntry {
  id: string; caseId: string; sourceId: string; month: number; euros: number;
  category: "development" | "landPurchase" | "contractLiability";
  reason: string; avoidable: boolean;
}
export interface Lease {
  id: string; parcelIds: string[]; ownerIds: string[]; essential: boolean;
  developmentDeadline: number; extensionDeadline: number | null;
  extensionOffered: "higher" | "current" | null;
  response: "pending" | "accepted" | "declined" | null;
  status: "valid" | "disputed" | "expired" | "terminated";
  forecastWarned: boolean; rights: ("wind" | "solar" | "route" | "bess")[];
}
export interface Permit {
  id: string; component: Component; required: boolean;
  status: "needed" | "preparing" | "applied" | "granted" | "final" | "excluded";
  planRevision: number; dueAt: number | null; finalAt: number | null;
}
export interface Procedure {
  landSecured: boolean; initiated: boolean; yvaRequired: boolean; yvaDetermined: boolean;
  programmeReady: boolean; yvaHearingComplete: boolean; yvaConclusion: boolean;
  draftFeedback: boolean; proposalHearingComplete: boolean; adopted: boolean;
  planFinal: boolean; documentRevision: number;
  appeal: "none" | "window" | "administrative" | "annulledProcedure" | "annulledEvidence" | "supreme" | "closed";
  appealDueAt: number | null; permits: Permit[]; repairRounds: number;
}
export interface Battery {
  status: "undecided" | "included" | "excluded";
  landSecured: boolean; separable: boolean; sharedEffects: boolean;
  chargeMW: number; dischargeMW: number; energyMWh: number;
  equipmentRevision: number; offeredChargeMW: number | null; offeredDischargeMW: number | null;
  gridStatus: "unassessed" | "suitable" | "limited" | "waiting";
  technicalData: boolean; safetyAssessed: boolean;
  connectionApprovalExpires: number | null; connectionAgreement: boolean;
}
export interface World {
  region: Region; herdingArea: boolean; forestDeerArea: boolean; squirrelArea: boolean;
  borderEffects: boolean; species: Species; researchSpecies: "forestDeer" | "golden" | "reindeer" | "wolf";
  researchCost: number; researchPublishedAt: number;
  externalStage: Stage | null; externalId: string | null;
  landComponent: "wind" | "solar"; ownersAgree: boolean;
  regionalPlanNeeded: boolean; regionalPlanDue: number; regionalPlanForecast: number;
  wetlandSameCatchment: boolean; solarDrainageProblem: boolean;
  observations: Record<string, number>;
}
export interface ScopeGoals {
  windCount: number; windMW: number; windHeightM: number; windYield: number;
  solarHa: number; solarMWp: number; solarMWac: number;
  bessChargeMW: number; bessDischargeMW: number; bessMWh: number;
  weights: { wind: number; solar: number; bess: number };
  minimumWindMW: number; minimumSolarHa: number; minimumScopeRatio: number;
}
export interface Scene {
  id: string; caseId: string | null; branchId: string | null;
  kind: "decision" | "event" | "transition" | "ending" | "epilogue" | "wait";
  outcomeId: string | null; nextStage: Stage | null;
}
export interface DecisionRecord {
  token: string; contentId: string; caseId: string; choice: SourceChoice;
  side: Side; month: number; planRevision: number; branchId: string | null; result: string;
}
export interface QualityEntry { id: string; caseId: string; sourceId: string; reason: string; pointsLost: number; repaired: boolean }
export interface Ending {
  kind: "win" | "external" | "choices" | "scope" | "owner";
  contentId: string; causeCaseId: string | null; originalCause: "external" | "choices" | "scope" | null;
  month: number; values: Record<string, string>; score: ScoreResult | null;
}
export interface ScoreResult {
  scope: number; time: number; quality: number; resource: number; total: number; maximum: 1000;
  deductions: { category: "scope" | "time" | "quality" | "resource"; reason: string; points: number }[];
}
export interface GameV5 {
  version: "swipe-v5-1"; contentVersion: string; rulesVersion: "v5-lp1-1";
  originMode: Mode; activeMode: Mode; routeCategory: RouteCategory;
  recovery: SolarContinuation; solarDesign: SolarDesign; municipalities: Municipality[];
  modeAuditWarnings: string[];
  /** Presentation acknowledgements never replace work or outcome resolution. */
  narration: { progressCount: number; progressStages: Stage[]; lastWasProgress: boolean; updates: string[] };
  assetChanges: Partial<Record<"count" | "height" | "power" | "solar", { from: string; to: string; revision: number }>>;
  run: RunState; initialRun: RunState; initial: ScopeGoals;
  revision: number; planRevision: number; stage: Stage;
  calendar: Calendar; world: World; battery: Battery; procedure: Procedure;
  cases: Record<string, CaseRecord>; outcomes: PendingOutcome[]; leases: Lease[];
  costs: CostEntry[]; quality: QualityEntry[]; decisions: DecisionRecord[];
  /** Base encounters are selected once; mandatory case continuations have no quota. */
  stageDecks: Record<Stage, string[]>; seenIds: string[]; seenFamilies: string[];
  scenes: Scene[]; lastOutcome: string; ending: Ending | null;
  facts: Record<string, string | number | boolean>; nextSequence: number;
  actions: { kind: "choice" | "continue" | "epilogue"; token: string; side?: Side }[];
}
