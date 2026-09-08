import { describe, expect, it } from "vitest";
import { initialState } from "../src/game/v5/state";
import { openCase, schedule, workOnly } from "../src/game/v5/operations";
import { ruleFor, OUTCOMES } from "../src/game/v5/rules";
import { branchId } from "../src/game/v5/content";
import { getDerivedStats } from "../src/engine";
import { changePlan } from "../src/game/v5/assets";
import { excludeBattery, permitGoalReached, requiredPermit } from "../src/game/v5/procedure";
import { prepareBatteryApplications } from "../src/game/v5/batteryPreparation";
import { finish } from "../src/game/v5/endings";
import { beginEpilogue } from "../src/game/v5/epilogue";
import { settleCompletedWork, publishDue } from "../src/game/v5/timeline";
import type { GameV5, SourceChoice } from "../src/game/v5/types";

function decide(game: GameV5, id: string, choice: SourceChoice) {
  const rule = ruleFor(id), issue = openCase(game, id, rule.spec(game, id));
  issue.choice = choice; issue.rounds++;
  rule.apply(game, issue, id, choice); return issue;
}
function reveal(game: GameV5, event: string, observation: number) {
  const outcome = [...game.outcomes].reverse().find(outcome => outcome.contentId === event)!;
  return OUTCOMES[event]!(game, game.cases[outcome.caseId]!, outcome, observation);
}
function permitted(): GameV5 {
  const game = initialState("permit-fixture"); game.stage = 4; game.calendar.now = 60;
  Object.assign(game.procedure, { landSecured: true, initiated: true, yvaConclusion: true, draftFeedback: true,
    proposalHearingComplete: true, adopted: true, planFinal: true, appeal: "closed" });
  game.battery.status = "included"; game.battery.landSecured = true; game.battery.technicalData = true;
  game.battery.safetyAssessed = true; game.facts.batteryFullLoadNoiseAssessed = true;
  game.procedure.permits.push(requiredPermit("batteryConstruction", "bess", game.planRevision));
  for (const permit of game.procedure.permits) Object.assign(permit, { status: "final", finalAt: 59, planRevision: game.planRevision });
  return game;
}
describe("v5 defence responses and real permit goal", () => {
  it.each([[0.1, 1], [0.99, 0]] as const)("K38 direct PV observation %s selects only branch %s", (observation, branch) => {
    const game = initialState("pv"); game.world.externalId = null; game.world.region = "west";
    decide(game, "defence", "A");
    expect(reveal(game, "EV-PV", observation)).toBe(branchId("EV-PV", branch));
    expect(game.costs.filter(cost => cost.euros === 15000)).toHaveLength(branch === 1 ? 1 : 0);
    expect(game.facts.defenceAccepted === true).toBe(branch === 0);
  });
  it.each([[0.1, 0], [0.9, 1]] as const)("K38 VTT branch %s has a prior ordered study", (observation, branch) => {
    const game = initialState("vtt"); game.world.externalId = null; const before = getDerivedStats(game.run);
    const issue = decide(game, "defence", "B"); reveal(game, "EV-PV", 0);
    expect(game.facts.defenceAccepted).not.toBe(true);
    expect(reveal(game, "EV-VTT-TULOS", observation)).toBe(branchId("EV-VTT-TULOS", branch));
    expect(game.costs.filter(cost => cost.euros === 15000)).toHaveLength(1);
    expect(getDerivedStats(game.run).windCount).toBe(before.windCount - (branch ? issue.placeIds.length : 0));
    expect(game.facts.defenceAccepted).toBe(true);
  });
  it.each([["EV-PV", 3], ["EV-VTT-TULOS", 2]] as const)("K38 %s rejection distinguishes independent solar from no fallback", (event, branch) => {
    for (const solar of [false, true]) {
      const game = initialState(`pv-reject-${solar}`); game.world.externalId = event;
      game.world.observations.independentSolar = Number(solar); decide(game, "defence", "A");
      if (event === "EV-VTT-TULOS") reveal(game, "EV-PV", 0);
      const ha = getDerivedStats(game.run).solarHa;
      expect(reveal(game, event, 0.9)).toBe(branchId(event, branch));
      expect(getDerivedStats(game.run).solarHa).toBe(ha);
      expect(game.ending?.kind ?? null).toBe(solar ? null : "external");
      if (solar) expect(getDerivedStats(game.run).windCount).toBe(0);
    }
  });
  it("K38 a refused higher model preserves the old compatible equipment", () => {
    const game = initialState("higher-pv");
    game.facts.defenceAccepted = true;
    const before = structuredClone(game.run.assets);
    decide(game, "UUSI-P2-08", "A");
    expect(reveal(game, "EV-PV", 0)).toBe(branchId("EV-PV", 2));
    expect(game.run.assets).toEqual(before); expect(game.ending).toBeNull();
  });
  it.each(["landSecured", "initiated", "yvaConclusion", "draftFeedback", "proposalHearingComplete", "adopted", "planFinal"] as const)("K39/K47 missing %s prevents a false win", field => {
    const game = permitted(); expect(permitGoalReached(game)).toBe(true);
    game.procedure[field] = false;
    expect(permitGoalReached(game)).toBe(false);
    expect(() => finish(game, "win", "LOPPU-VOITTO")).toThrow("Permit goal");
  });
  it("K47 every required current-version permit needs its actual finality date", () => {
    for (const defect of ["needed", "applied", "granted", "future", "stale"] as const) {
      const game = permitted(), permit = game.procedure.permits[0]!;
      if (defect === "future") permit.finalAt = 61;
      else if (defect === "stale") permit.planRevision = -1;
      else permit.status = defect;
      expect(permitGoalReached(game), defect).toBe(false);
    }
    const game = permitted(); changePlan(game);
    expect(permitGoalReached(game)).toBe(false);
    expect(game.procedure.permits.every(permit => permit.status === "preparing")).toBe(true);
  });
});
describe("v5 BESS effects, independent powers and post-permit epilogue", () => {
  it.each([["BESS-P1-03", "B", 4, 5], ["BESS-P3-03", "A", 2, 3], ["BESS-P3-07", "A", 0, 1]] as const)("K43 %s selects its own safety topic only", (id, choice, good, bad) => {
    for (const observation of [0, 0.99]) {
      const game = initialState(`battery-${id}`); game.battery.status = "included";
      decide(game, id, choice);
      expect(reveal(game, "EV-BESS-TURVA", observation)).toBe(branchId("EV-BESS-TURVA", observation ? bad : good));
      expect(game.battery.safetyAssessed).toBe(!observation);
      if (bad !== 5) expect(game.cases["case:batteryFlood"]).toBeUndefined();
    }
  });
  it("K17/K43 missing data returns once; completed follow-up cannot request the same brochure forever", () => {
    const game = initialState("battery-missing-data"); game.battery.status = "included";
    const issue = decide(game, "BESS-P3-07", "A"); reveal(game, "EV-BESS-TURVA", 0.99);
    const rule = ruleFor("BESS-P3-02");
    rule.apply(game, issue, "BESS-P3-02", "A");
    expect(reveal(game, "EV-BESS-TURVA", 0.99)).toBe(branchId("EV-BESS-TURVA", 0));
    expect(rule.eligible(game, "BESS-P3-02")).toBe(false);
    expect(() => rule.apply(game, issue, "BESS-P3-02", "A")).toThrow("already followed up");
  });
  it("K41 excluding BESS retains shared work, wind permits, solar area and already paid costs", () => {
    const game = initialState("exclude-battery"); game.battery.status = "included";
    decide(game, "BESS-P3-03", "A");
    const shared = openCase(game, "solarWater::wind", { family: "sharedDrainage", component: "shared", mechanism: "water" });
    workOnly(game, shared, "solarWater::wind", "sharedWater", 5, 5000);
    const before = getDerivedStats(game.run), costs = structuredClone(game.costs);
    excludeBattery(game);
    expect(getDerivedStats(game.run)).toEqual(before); expect(game.costs).toEqual(costs);
    expect(game.calendar.orders.filter(work => work.component === "bess").every(work => work.status === "cancelled")).toBe(true);
    expect(game.calendar.orders.find(work => work.component === "shared")?.status).not.toBe("cancelled");
    expect(game.procedure.permits.find(permit => permit.id === "aviation")?.required).toBe(true);
  });
  it("K42 grid offer reduces charge and discharge separately, with unchanged cells and solar", () => {
    const game = initialState("limited-battery"); game.battery.status = "included";
    decide(game, "BESS-P2-01", "A");
    const solar = getDerivedStats(game.run).solarHa;
    expect(reveal(game, "EV-BESS-VERKKO", 0.6)).toBe(branchId("EV-BESS-VERKKO", 1));
    expect(game.battery).toMatchObject({ chargeMW: 100, dischargeMW: 100, energyMWh: 200 });
    decide(game, "BESS-P4-RAJAUS", "A");
    expect(game.battery).toMatchObject({ chargeMW: 60, dischargeMW: 80, energyMWh: 200 });
    expect(getDerivedStats(game.run).solarHa).toBe(solar);
  });
  it("K44 a waiting battery grid cannot create an approval or block an otherwise completed permit game", () => {
    const game = permitted(); game.battery.gridStatus = "waiting"; game.facts.gridResolved = true;
    const issue = decide(game, "BESS-P4-04", "B");
    expect(issue.status).toBe("resolved"); expect(game.battery.connectionAgreement).toBe(false);
    expect(permitGoalReached(game)).toBe(true); expect(game.calendar.orders).toHaveLength(0);
  });
  it("K47 missing battery inputs order parallel work without granting permits or billing twice", () => {
    const game = permitted(); game.battery.landSecured = false; game.battery.technicalData = false;
    game.battery.safetyAssessed = false; game.facts.batteryFullLoadNoiseAssessed = false;
    expect(permitGoalReached(game)).toBe(false);
    prepareBatteryApplications(game);
    const work = structuredClone(game.calendar.orders), costs = structuredClone(game.costs);
    expect(work).toHaveLength(4); expect(work.every(item => item.startedAt === 60)).toBe(true);
    prepareBatteryApplications(game); expect(game.calendar.orders).toEqual(work); expect(game.costs).toEqual(costs);
    expect(game.battery.technicalData).toBe(false); expect(permitGoalReached(game)).toBe(false);
  });
  it.each(["A", "B"] as const)("K44/K48 connection deadline %s happens after the sealed permit win", choice => {
    const game = permitted(); game.facts.batteryConnectionApplicationPrepared = true; game.battery.gridStatus = "suitable";
    finish(game, "win", "LOPPU-VOITTO"); const ending = structuredClone(game.ending);
    beginEpilogue(game); const due = game.battery.connectionApprovalExpires!;
    expect(game.scenes[0]?.id).toBe("BESS-P4-02"); decide(game, "BESS-P4-02", choice);
    expect(game.calendar.now < due).toBe(choice === "A");
    expect(game.battery.connectionAgreement).toBe(false);
    expect(game.ending).toEqual(ending);
    finish(game, "external", "LOPPU-ULKOINEN"); settleCompletedWork(game); publishDue(game);
    expect(game.ending).toEqual(ending);
    expect(game.calendar.orders.some(work => work.id.endsWith(":connectionReapplication"))).toBe(choice === "B");
  });
  it("K44 no expired or absent connection approval may offer its deadline card", () => {
    const game = permitted(), rule = ruleFor("BESS-P4-02");
    expect(rule.eligible(game, "BESS-P4-02")).toBe(false);
    game.battery.connectionApprovalExpires = game.calendar.now;
    expect(rule.eligible(game, "BESS-P4-02")).toBe(false);
  });
});

describe("v5 court process, not generic random negative feedback", () => {
  it.each([[false, false, 0.9, 0], [true, false, 0.9, 1], [false, true, 0.1, 2]] as const)("K45 administrative appeal selects branch %s/%s/%s/%s", (violation, evidence, observation, branch) => {
    const game = permitted(); game.procedure.appeal = "administrative";
    const issue = openCase(game, "EV-VALITUS", { family: "courtFixture", component: "shared" });
    issue.facts.presenceViolation = violation; issue.facts.evidenceChallenged = evidence;
    schedule(game, issue, "EV-VALITUS", null, "EV-VALITUS");
    expect(reveal(game, "EV-VALITUS", observation)).toBe(branchId("EV-VALITUS", branch));
    expect(game.scenes.at(-1)?.id ?? null).toBe(branch === 1 ? "UUSI-P4-05" : branch === 2 ? "UUSI-P4-11" : null);
  });
  it.each([[0.1, 3], [0.6, 4], [0.9, 5]] as const)("K45 KHO observation %s selects branch %s only after leave application", (observation, branch) => {
    const game = permitted(); game.procedure.adopted = false; game.procedure.planFinal = false;
    game.procedure.appeal = "annulledEvidence"; game.facts.supremeAppealBasis = true;
    decide(game, "UUSI-P4-11", "A");
    expect(reveal(game, "EV-VALITUS", observation)).toBe(branchId("EV-VALITUS", branch));
    expect(game.procedure.adopted).toBe(branch === 4);
    expect(game.procedure.repairRounds).toBe(branch === 4 ? 0 : 1);
  });
  it("K45 no court decision before an appeal and no correction merely from filing", () => {
    const game = initialState("no-appeal");
    const issue = openCase(game, "EV-VALITUS", { family: "evidenceAppeal", component: "shared" });
    schedule(game, issue, "EV-VALITUS", null, "EV-VALITUS");
    expect(() => reveal(game, "EV-VALITUS", 0)).toThrow("outside an actual appeal");
    game.procedure.appeal = "administrative";
    expect(ruleFor("UUSI-P4-11").eligible(game, "UUSI-P4-11")).toBe(false);
    expect(ruleFor("UUSI-P4-05").eligible(game, "UUSI-P4-05")).toBe(false);
  });
});
