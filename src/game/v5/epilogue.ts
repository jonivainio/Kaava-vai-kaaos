import { openCase, queueScene, workOnly } from "./operations";
import { waitForWork } from "./calendar";
import { ruleFor } from "./rules";
import { sample } from "./world";
import type { GameV5 } from "./types";

export function canOpenEpilogue(game: GameV5): boolean {
  return game.ending?.kind === "win" && game.battery.status === "included" && !game.facts.epilogueOffered && game.scenes.length === 0;
}
export function beginEpilogue(game: GameV5): void {
  if (!canOpenEpilogue(game)) throw new Error("No available battery epilogue");
  game.facts.epilogueOffered = true; game.facts.epilogueActive = true;
  if (game.facts.batteryConnectionApplicationPrepared && game.battery.gridStatus === "suitable") {
    // A real post-permit application and its processing precede the two-month approval.
    // The permit game's ending and score have already been sealed.
    const issue = openCase(game, "BESS-P4-02", ruleFor("BESS-P4-02").spec(game, "BESS-P4-02"));
    const id = workOnly(game, issue, "BESS-P4-01", "postPermitConnectionApplication", 1);
    waitForWork(game.calendar, [id], "Liittymissopimushakemuksen käsittely");
    game.battery.connectionApprovalExpires = game.calendar.now + 2;
    game.facts.connectionApprovalGranted = true;
    queueScene(game, "BESS-P4-02", issue);
  }
  const id = sample(game.run.seed, "battery-handover-presentation") < 0.5 ? "BESS-P4-03" : "BESS-P4-06";
  const issue = openCase(game, id, ruleFor(id).spec(game, id));
  queueScene(game, id, issue);
}

export function isEpilogueDecision(game: GameV5, id: string): boolean {
  return game.ending?.kind === "win" && game.facts.epilogueActive === true && ["BESS-P4-02", "BESS-P4-03", "BESS-P4-06"].includes(id);
}
