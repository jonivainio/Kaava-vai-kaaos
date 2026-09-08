import { branchId } from "../content";
import { changePlan, excludeAssets } from "../assets";
import { finish } from "../endings";
import { followup, openCase, resolveCase, schedule, workOnly } from "../operations";
import { sample } from "../world";
import { restartPreparation } from "./proposal";
import type { CaseRecord, GameV5 } from "../types";
import type { OutcomeResolver } from "./types";

export function beginAppealWindow(game: GameV5, issue: CaseRecord, sourceId: string): void {
  if (game.procedure.adopted) throw new Error("Plan is already adopted");
  game.procedure.adopted = true;
  game.procedure.documentRevision = game.planRevision;
  game.procedure.appeal = "window";
  game.procedure.appealDueAt = game.calendar.now + 1;
  game.facts.adoptionAnnounced = true;
  workOnly(game, issue, sourceId, `appealWindow:${game.planRevision}:${game.procedure.repairRounds}`, 1);
}
export const decisionOutcomes: Record<string, OutcomeResolver> = {
  "EV-KUNTA": (game, issue, outcome, observation) => {
    if (!game.facts.approvalReady || !game.procedure.proposalHearingComplete) throw new Error("Council decision before completed preparation");
    const externalRejection = game.world.externalStage === 4 && ["external-3", "ext-buyer"].includes(game.world.externalId ?? "");
    const needsSettlementChange = issue.facts.settlementGroup && !issue.facts.smallerPrepared && observation > 0.55;
    const branch = externalRejection ? 2 : needsSettlementChange ? 1 : 0;
    if (branch === 0) { beginAppealWindow(game, issue, outcome.contentId); resolveCase(issue); }
    else if (branch === 1) {
      excludeAssets(game, issue); issue.facts.smallerPrepared = true;
      if (game.run.assets.windSites.some(site => !site.exclusions.length) && sample(game.run.seed, "settlement-revision-neighbour") < 0.35) {
        const changed = openCase(game, "UUSI-P4-09", { family: "changedHearing", component: "wind", mechanism: "noise", count: 1 });
        changed.facts.relocated = true;
        changed.facts.sourceCaseId = issue.id;
        changed.facts.proposalWasHeard = game.procedure.proposalHearingComplete;
        changed.facts.neighbourExposureIncreased = true;
        game.facts.newNeighbourAffected = true;
        game.facts.otherProposalChanges = true;
        changePlan(game);
        followup(game, changed, "UUSI-P4-09");
      }
      game.procedure.proposalHearingComplete = false; game.facts.approvalReady = false;
      workOnly(game, issue, outcome.contentId, "councilRequestedAlternative", 5, 15000, 0);
      schedule(game, issue, outcome.contentId, null, "EV-KUNTA", { duration: 6, milestone: "adoption", euros: 3000, key: "councilAfterCorrection", observation: "0" });
    } else finish(game, "external", "LOPPU-ULKOINEN", issue, { externalReason: "Valtuusto ei hyväksy ehdotusta. Myöskään tutkittu pienempi vaihtoehto ei saa riittävää tukea." }, "external");
    return branchId(outcome.contentId, branch);
  },
  "EV-MENETTELY": (game, issue, outcome) => {
    if (!game.procedure.adopted || game.procedure.appeal !== "administrative" || !issue.facts.presenceViolation) throw new Error("No actual appeal about a closed meeting");
    schedule(game, issue, outcome.contentId, null, "EV-VALITUS", { duration: 12, baseline: 0, euros: 14000, key: `administrativeCourt:${game.procedure.repairRounds}` });
    return null;
  },
  "EV-VALITUS": (game, issue, outcome, observation) => {
    const appeal = game.procedure.appeal;
    let branch: number;
    if (appeal === "supreme") {
      if (outcome.sourceId !== "UUSI-P4-11") throw new Error("Supreme appeal has no leave application");
      branch = observation < 0.45 ? 3 : observation < 0.7 ? 4 : 5;
      if (branch === 4) { game.procedure.adopted = true; game.procedure.appeal = "closed"; resolveCase(issue); }
      else {
        game.procedure.appeal = "annulledEvidence";
        game.facts.supremeAppealBasis = false;
        restartPreparation(game, issue, outcome.contentId, 12);
      }
    } else if (appeal === "administrative") {
      const violation = issue.facts.presenceViolation === true && !issue.facts.violationRepaired;
      const evidence = issue.facts.evidenceChallenged === true;
      branch = violation ? 1 : evidence && observation < 0.45 ? 2 : 0;
      if (branch === 0) {
        game.procedure.appeal = "closed"; resolveCase(issue);
      } else {
        game.procedure.adopted = false; game.procedure.planFinal = false;
        game.procedure.appeal = branch === 1 ? "annulledProcedure" : "annulledEvidence";
        if (branch === 2) game.facts.supremeAppealBasis = true;
        followup(game, issue, branch === 1 ? "UUSI-P4-05" : "UUSI-P4-11");
      }
    } else throw new Error("Court result outside an actual appeal");
    return branchId(outcome.contentId, branch);
  },
};
