import type { CaseSpec } from "../operations";
import type { CaseRecord, GameV5, PendingOutcome, SourceChoice } from "../types";
export interface Rule {
  ids: string[];
  spec: (game: GameV5, contentId: string) => CaseSpec;
  eligible: (game: GameV5, contentId: string) => boolean;
  role: "base" | "followup" | "epilogue";
  art: string[];
  prepare?: (game: GameV5, issue: CaseRecord, contentId: string) => void;
  apply: (game: GameV5, issue: CaseRecord, contentId: string, choice: SourceChoice) => string | null;
}
export type OutcomeResolver = (game: GameV5, issue: CaseRecord, outcome: PendingOutcome, observation: number) => string | null;
