import type { Mode, RunState, Side } from "../engine";
export type { Mode, Side };
export type Stage = 0 | 1 | 2 | 3;
/** Fictional regional profile, never a player-facing location. */
export type Region = "west" | "central" | "lapland" | "east";
export type Milestone = "yva" | "proposal";
export interface Finding {
  source: "nature" | "solarNature" | "solarWater" | "opinions" | "leases";
  milestone: Milestone;
  body: string;
  blocking: boolean;
  status: "pending" | "queued" | "revealed";
}
export type DecisionId =
  | "land"
  | "road"
  | "initiative"
  | "surveys"
  | "research"
  | "nature"
  | "noise"
  | "height"
  | "feedback"
  | "natura"
  | "leases"
  | "proposal"
  | "defence"
  | "programme"
  | "solarNature"
  | "solarWater"
  | "opinions"
  | "hearing";
export type Action =
  | "special"
  | "uniform"
  | "oldRoad"
  | "newRoad"
  | "smaller"
  | "explain"
  | "now"
  | "nextSeason"
  | "fund"
  | "observe"
  | "avoid"
  | "relocate"
  | "moveNoise"
  | "quietNights"
  | "lower"
  | "moveHeight"
  | "removeEdge"
  | "answer"
  | "updateNatura"
  | "keepNatura"
  | "renew"
  | "keepLease"
  | "trim"
  | "defend"
  | "commission"
  | "rework"
  | "workshop"
  | "written"
  | "solarAvoid"
  | "solarStudy"
  | "wetland"
  | "waterStudy"
  | "illustrate"
  | "respond"
  | "supplement"
  | "justify";
export interface Option {
  label: string;
  action: Action;
  note: string;
}
export interface Scene {
  title: string;
  question: string;
  art: string;
  speaker: string;
  options: [Option, Option];
}
export interface Decision {
  id: DecisionId;
  stage: Stage;
  base: Scene;
  solar?: Scene;
  critical?: Partial<Scene>;
}
export interface EncounterVariant {
  id: string;
  title: string;
  question: string;
  labels?: [string, string];
  notes?: [string, string];
  art?: string;
  component?: "solar";
  failure?: string;
  results?: Partial<Record<Action, string>>;
}
export interface Story {
  id: string;
  title: string;
  body: string;
  art: string;
  nextStage?: Stage;
  findingSource?: Finding["source"];
  kind:
    | "progress"
    | "transition"
    | "finding"
    | "bridge"
    | "research"
    | "aviation"
    | "defence"
    | "external"
    | "decision"
    | "adoption"
    | "ready";
}
export interface Game {
  version: "swipe-2";
  contentVersion: string;
  run: RunState;
  cursor: number;
  revision: number;
  stage: Stage;
  encounters: number[];
  delays: { reason: string; months: number }[];
  compactions: string[];
  layoutTightened: boolean;
  findings: Finding[];
  milestones: Record<Milestone, boolean>;
  world: {
    region: Region;
    externalStage: Stage | null;
    criticalIssue: "nature" | "natura" | "leases";
    ownersAgree: boolean;
    researchAdverse: boolean;
    researchCost: number;
    aviationAccepted: boolean;
    goldenNeighborRiskMilli: number;
    landComponent: "wind" | "solar";
    tightLayoutProblem: boolean;
    affected: {
      nature: number;
      noise: number;
      height: number;
      natura: number;
      defence: number;
    };
    defence: "clear" | "study" | "reduce" | "oppose" | "studyReject";
    solarPermit: boolean;
    solarWaterUseful: boolean;
    species: string;
  };
  decisions: { id: DecisionId; action: Action; side: Side; result: string }[];
  stories: Story[];
  lastOutcome: string;
  facts: {
    land: boolean;
    initiated: boolean;
    assessed: boolean;
    planAdopted: boolean;
    planFinal: boolean;
    permits: boolean;
    grid: boolean;
    ready: boolean;
  };
  unresolved: string | null;
  ending: "external" | "choices" | "ready" | null;
  endingReason: string | null;
  research: {
    funded: boolean | null;
    dueAt: number | null;
    published: boolean;
    waited: boolean;
  };
  initial: { windCount: number; solarHa: number; windMW: number };
}
export interface CurrentDecision extends Scene {
  id: DecisionId;
  token: string;
  choices: Record<Side, Option>;
}
export type RestoreResult =
  | { ok: true; state: Game }
  | { ok: false; error: string; recoverableRaw: string };
