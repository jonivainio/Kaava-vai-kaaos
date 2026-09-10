import { afterAll, describe, expect, it } from "vitest";
import { mkdirSync, writeFileSync } from "node:fs";
import { initialState } from "../src/game/v5/state";
import { openCase, schedule } from "../src/game/v5/operations";
import { ruleFor, OUTCOMES } from "../src/game/v5/rules";
import { branchId, branchText, content } from "../src/game/v5/content";
import { advanceCalendar } from "../src/game/v5/calendar";
import { publishDue } from "../src/game/v5/timeline";
import { excludeAssets } from "../src/game/v5/assets";
import { sample } from "../src/game/v5/world";
import type { GameV5, CaseRecord, SourceChoice } from "../src/game/v5/types";

const assertions: { event: string; branch: string; source: string; choice: SourceChoice | null; caseId: string; dueAt: number }[] = [];
afterAll(() => {
  let total = 0;
  for (const entry of content.filter(item => !item.id.startsWith("LP1-"))) {
    for (const branch of entry.branches) { total++; expect(assertions.some(result => result.event === entry.id && result.branch === branch.id), `${entry.id}/${branch.id}`).toBe(true); }
    for (const choice of ["A", "B"] as const) for (const branch of entry.choices[choice]?.branches ?? []) {
      total++; expect(assertions.some(result => result.event === entry.id && result.choice === choice && result.branch === branch.id), `${entry.id}/${choice}/${branch.id}`).toBe(true);
    }
  }
  expect(total).toBe(143);
  mkdirSync("reports/lp1/legacy", { recursive: true }); writeFileSync("reports/lp1/legacy/result-branch-tests.json", JSON.stringify(assertions, null, 2) + "\n");
});
function decide(game: GameV5, source: string, choice: SourceChoice) {
  const rule = ruleFor(source), issue = openCase(game, source, rule.spec(game, source));
  issue.choice = choice; issue.rounds++; rule.apply(game, issue, source, choice); return issue;
}
/** Asserts the actual queued result, its source and due time, rather than text presence. */
function check(game: GameV5, event: string, index: number, observation: number) {
  const due = [...game.outcomes].reverse().find(outcome => outcome.contentId === event)!;
  expect(due, `ordered ${event}`).toBeTruthy();
  const work = game.calendar.orders.find(work => work.id === due.workId)!;
  work.observation = String(observation);
  game.scenes = [];
  game.stage = 4; game.facts.programmeReviewOpen = true; game.procedure.yvaHearingComplete = true;
  // Neither knowing the planned branch nor preparing a plan makes the work complete.
  if (game.calendar.now < due.dueAt) expect(publishDue(game)).toBe(0);
  advanceCalendar(game.calendar, Math.max(game.calendar.now, due.dueAt), "Fixture result due", [work.id]);
  publishDue(game);
  const scenes = game.scenes.filter(scene => scene.outcomeId === due.id);
  expect(scenes).toHaveLength(1);
  expect(scenes[0]!.branchId).toBe(branchId(event, index));
  expect(due.status).toBe("queued");
  expect(branchText(event, due.branchId).length).toBeGreaterThan(5);
  assertions.push({ event, branch: due.branchId!, source: due.sourceId, choice: due.sourceChoice, caseId: due.caseId, dueAt: due.dueAt });
  return game.cases[due.caseId]!;
}
type Setup = (game: GameV5, issue: CaseRecord) => void;
const rows: [string, SourceChoice, string, number, number, Setup?][] = [
  ["land-map-versions", "A", "EV-SOPIMUSSIVUT", 0, 0.1], ["land-map-versions", "A", "EV-SOPIMUSSIVUT", 1, 0.9],
  ["land-area-explained", "A", "EV-VOIMALALUPAUS", 0, 0.1], ["land-area-explained", "A", "EV-VOIMALALUPAUS", 1, 0.6],
  ["land-area-explained", "B", "EV-VOIMALALUPAUS", 2, 0.1], ["land-area-explained", "A", "EV-VOIMALALUPAUS", 3, 0.9],
  ["UUSI-P1-MAARIITA", "B", "EV-MAARIITA", 0, 0.1], ["UUSI-P1-MAARIITA", "B", "EV-MAARIITA", 1, 0.9],
  ["UUSI-P1-05", "A", "EV-ETUSIJA", 0, 0.1], ["UUSI-P1-05", "A", "EV-ETUSIJA", 1, 0.9],
  ["UUSI-P1-09", "A", "EV-SELVITYSJARJESTYS", 0, 0.1], ["UUSI-P1-09", "A", "EV-SELVITYSJARJESTYS", 1, 0.9],
  ["defence", "A", "EV-PV", 0, 0.99], ["defence", "A", "EV-PV", 1, 0.1],
  ["UUSI-P2-08", "A", "EV-PV", 2, 0.1],
  ["defence", "A", "EV-PV", 3, 0.99, game => { game.world.externalId = "EV-PV"; game.world.observations.independentSolar = 0; }],
  ["nature", "B", "EV-LUONTO", 0, 0.1], ["nature", "B", "EV-LUONTO", 1, 0.9],
  ["nature-reindeer-calving", "B", "EV-LUONTO", 2, 0.1], ["nature-reindeer-calving", "B", "EV-LUONTO", 3, 0.9],
  ["nature-reindeer-route", "B", "EV-LUONTO", 4, 0.1], ["nature-reindeer-route", "B", "EV-LUONTO", 5, 0.9],
  ["nature-squirrel", "B", "EV-LUONTO", 6, 0.1], ["nature-squirrel", "B", "EV-LUONTO", 7, 0.9],
  ["nature-bird-area", "B", "EV-LUONTO", 8, 0.1], ["nature-bird-area", "B", "EV-LUONTO", 9, 0.9],
  ["UUSI-P3-08", "B", "EV-LUONTO", 10, 0.1], ["UUSI-P3-08", "B", "EV-LUONTO", 11, 0.9],
  ["golden-known", "B", "EV-KOTKA", 0, 0.1], ["golden-known", "B", "EV-KOTKA", 1, 0.9],
  ["herding-pasture", "B", "EV-PORO", 0, 0.1, game => { game.world.herdingArea = true; }],
  ["herding-pasture", "B", "EV-PORO", 1, 0.9, game => { game.world.herdingArea = true; }],
  ["solarNature", "B", "EV-AURINKOLUONTO", 0, 0.1], ["solarNature", "B", "EV-AURINKOLUONTO", 1, 0.9],
  ["solar-squirrel", "B", "EV-AURINKOLUONTO", 2, 0.1], ["solar-squirrel", "B", "EV-AURINKOLUONTO", 3, 0.9],
  ["solar-bird-area", "B", "EV-AURINKOLUONTO", 4, 0.1], ["solar-bird-area", "B", "EV-AURINKOLUONTO", 5, 0.9],
  ["BESS-P2-01", "A", "EV-BESS-VERKKO", 0, 0.1], ["BESS-P2-01", "A", "EV-BESS-VERKKO", 1, 0.6], ["BESS-P2-01", "A", "EV-BESS-VERKKO", 2, 0.99],
  ["BESS-P3-07", "A", "EV-BESS-TURVA", 0, 0.1], ["BESS-P3-07", "A", "EV-BESS-TURVA", 1, 0.9],
  ["BESS-P3-03", "A", "EV-BESS-TURVA", 2, 0.1], ["BESS-P3-03", "A", "EV-BESS-TURVA", 3, 0.9],
  ["BESS-P1-03", "B", "EV-BESS-TURVA", 4, 0.1], ["BESS-P1-03", "B", "EV-BESS-TURVA", 5, 0.9],
  ["UUSI-P1-01", "A", "EV-MAA", 0, 0.1], ["UUSI-P1-01", "A", "EV-MAA", 1, 0.7], ["UUSI-P1-01", "A", "EV-MAA", 2, 0.99],
  ["programme-cumulative", "A", "EV-NAAPURITIETO", 0, 0.1], ["programme-cumulative", "B", "EV-NAAPURITIETO", 1, 0.9],
  ["UUSI-P2-02", "B", "EV-VAIHTOEHDOT", 0, 0.1], ["UUSI-P2-02", "B", "EV-VAIHTOEHDOT", 1, 0.9],
  ["UUSI-P2-09", "A", "EV-MAASTOKAUSI", 0, 0.1], ["UUSI-P2-09", "A", "EV-MAASTOKAUSI", 1, 0.7], ["UUSI-P2-09", "A", "EV-MAASTOKAUSI", 2, 0.99],
  ["height", "A", "EV-ILMAILU", 0, 0.1], ["height", "B", "EV-ILMAILU", 1, 0.1], ["height", "A", "EV-ILMAILU", 2, 0.7], ["height", "A", "EV-ILMAILU", 3, 0.99],
  ["noise", "A", "EV-MELU", 0, 0.1], ["noise", "A", "EV-MELU", 1, 0.9, game => { game.facts.layoutTightened = true; }],
  ["noise", "A", "EV-MELU", 2, 0.9], ["noise", "B", "EV-MELU", 3, 0.1], ["noise", "B", "EV-MELU", 4, 0.9],
  ["solar-rain", "B", "EV-VESI", 0, 0.1], ["solar-rain", "B", "EV-VESI", 1, 0.9],
  ["solar-postcare", "B", "EV-VESI", 2, 0.1], ["solar-postcare", "B", "EV-VESI", 3, 0.9],
  ["UUSI-P3-09", "A", "EV-MAISEMA", 0, 0.1], ["UUSI-P3-09", "A", "EV-MAISEMA", 1, 0.9],
  ["solar-view-road", "B", "EV-MAISEMA", 2, 0.1], ["solar-view-road", "B", "EV-MAISEMA", 3, 0.9],
  ["opinions", "A", "EV-PALAUTE", 0, 0.1], ["opinions", "A", "EV-PALAUTE", 1, 0.9],
  ["opinions-club", "B", "EV-PALAUTE", 2, 0.1], ["opinions-club", "B", "EV-PALAUTE", 3, 0.9],
  ["opinions-noise", "A", "EV-PALAUTE", 4, 0.1, game => { game.facts.neighbourDataCurrent = true; }],
  ["herding-opinions", "A", "EV-PALAUTE", 5, 0.1, game => { game.world.herdingArea = true; }],
  ["UUSI-P2-07", "A", "EV-NATURA", 0, 0.1], ["UUSI-P2-07", "A", "EV-NATURA", 1, 0.9],
  ["UUSI-P3-13", "B", "EV-NATURA", 2, 0.1], ["UUSI-P3-13", "B", "EV-NATURA", 3, 0.9],
  ["UUSI-P4-07", "A", "EV-NATURA", 4, 0.1], ["UUSI-P4-07", "A", "EV-NATURA", 5, 0.9],
  ["UUSI-P3-01", "B", "EV-KORJAUS", 0, 0.1], ["UUSI-P3-01", "B", "EV-KORJAUS", 1, 0.8], ["UUSI-P3-01", "B", "EV-KORJAUS", 2, 0.99],
  ["UUSI-P4-03", "B", "EV-AJANTASAISUUS", 0, 0.1], ["UUSI-P4-03", "B", "EV-AJANTASAISUUS", 1, 0.9], ["UUSI-P4-03", "A", "EV-AJANTASAISUUS", 2, 0.9],
  ["UUSI-P2-04", "A", "EV-VERKKO", 0, 0.1], ["UUSI-P2-04", "A", "EV-VERKKO", 1, 0.9], ["UUSI-P2-04", "B", "EV-VERKKO", 2, 0.9],
  ["UUSI-P2-04", "A", "EV-VERKKO", 3, 0.9, game => { game.world.externalId = "external-2"; }],
  ["UUSI-P4-10", "A", "EV-KUNTA", 0, 0.1, game => { game.facts.approvalReady = true; game.procedure.proposalHearingComplete = true; }],
  ["UUSI-P4-10", "A", "EV-KUNTA", 1, 0.9, game => { game.facts.approvalReady = true; game.procedure.proposalHearingComplete = true; }],
  ["UUSI-P4-10", "A", "EV-KUNTA", 2, 0.9, game => { game.facts.approvalReady = true; game.procedure.proposalHearingComplete = true; game.world.externalStage = 4; game.world.externalId = "external-3"; }],
];
describe("v5 delayed event branch fixtures and source binding", () => {
  it.each(rows)("%s/%s → %s branch %s, observation %s", (source, choice, event, branch, observation, setup) => {
    const game = initialState(`branch-${source}-${branch}`); game.world.externalId = null; game.battery.status = "included";
    const issue = decide(game, source, choice); setup?.(game, issue);
    check(game, event, branch, observation);
    if (event === "EV-NATURA" && branch === 5) expect(game.procedure.permits.find(permit => permit.id === "naturaException")?.status).toBe("preparing");
    if (event === "EV-MELU" && branch === 4) expect(game.scenes.filter(scene => ["UUSI-P4-02", "feedback::noise"].includes(scene.id))).toHaveLength(1);
  });
  it.each(["land", "land-signing", "land-index", "land-minimum"])("%s/B has three immediate, mutually exclusive land outcomes", source => {
    for (const branch of [0, 1, 2]) {
      const game = initialState(`branch-${source}-${branch}`);
      game.world.ownersAgree = branch === 0; game.world.landComponent = branch === 2 ? "solar" : "wind";
      const rule = ruleFor(source), issue = openCase(game, source, rule.spec(game, source));
      const result = rule.apply(game, issue, source, "B");
      expect(result).toBe(branchId(source, branch, "B"));
      expect(game.outcomes).toHaveLength(0);
      assertions.push({ event: source, branch: result!, source, choice: "B", caseId: issue.id, dueAt: game.calendar.now });
    }
  });
  it.each([2, 3])("grid-first programme result distinguishes season branch %s", branch => {
    let index = 0;
    while ((2 + Math.floor(sample(`first-grid-${index}`, "first-grid-duration") * 7) <= 5) !== (branch === 2)) index++;
    const game = initialState(`first-grid-${index}`); decide(game, "UUSI-P1-09", "B");
    check(game, "EV-SELVITYSJARJESTYS", branch, 0.5);
  });
  it.each([0, 1, 2])("VTT delayed result selects branch %s after actual PV request", branch => {
    const game = initialState(`vtt-branch-${branch}`); game.world.externalId = branch === 2 ? "EV-VTT-TULOS" : null;
    game.world.observations.independentSolar = 0;
    decide(game, "defence", "A"); check(game, "EV-PV", 1, 0);
    game.outcomes[0]!.status = "revealed";
    check(game, "EV-VTT-TULOS", branch, branch === 0 ? 0.1 : 0.99);
  });
  it.each([["forestDeer", "calving", "deerCalving", "UUSI-P3-14", "EV-LUONTO", 12],
    ["golden", "flight", "goldenTerritory", "UUSI-P4-KOTKAPAIKAT", "EV-KOTKA", 2]] as const)("%s restoration result verifies both alternatives against the same two original places", (species, mechanism, family, source, event, offset) => {
    for (const negative of [false, true]) {
      const game = initialState(`restore-branch-${species}`);
      const issue = openCase(game, source, { family, component: "wind", species, mechanism, count: 2 });
      excludeAssets(game, issue); issue.fallback = "viable"; issue.facts.restoreEvidence = true;
      decide(game, source, "A"); check(game, event, offset + Number(negative), negative ? 0.99 : 0.1);
      expect(game.ending).toBeNull();
    }
  });
  it.each([0, 1, 2, 3, 4, 5])("court branch %s has the corresponding prior appeal", branch => {
    const game = initialState(`court-branch-${branch}`); game.procedure.adopted = branch < 3;
    game.procedure.appeal = branch < 3 ? "administrative" : "supreme";
    const issue = openCase(game, "EV-VALITUS", { family: "court", component: "shared" });
    issue.facts.presenceViolation = branch === 1; issue.facts.evidenceChallenged = branch === 2;
    schedule(game, issue, branch < 3 ? "EV-VALITUS" : "UUSI-P4-11", branch < 3 ? null : "A", "EV-VALITUS", { duration: 12 });
    check(game, "EV-VALITUS", branch, branch === 4 ? 0.6 : branch === 5 ? 0.99 : 0.1);
  });
  it.each([0, 1, 2])("lease response branch %s preserves actual deadlines", branch => {
    let seed = "";
    for (let index = 0; index < 1000; index++) {
      const candidate = `branch-lease-${index}`;
      const refused = [0, 1, 2].filter(n => sample(candidate, `lease:${n}:extensionWillingness`) >= 0.8).length;
      const result = refused === 0 ? 0 : sample(candidate, "lease-extension-replacement") < 0.55 || refused < 2 ? 1 : 2;
      if (result === branch) { seed = candidate; break; }
    }
    expect(seed).not.toBe("");
    const game = initialState(seed); decide(game, "UUSI-P1-03", "B");
    game.stage = 4; game.calendar.now = 50; game.calendar.baselineNow = 24; game.calendar.avoidableCriticalDelayMonths = 26;
    game.world.regionalPlanDue = 80; game.world.regionalPlanForecast = 42; game.facts.regionalPlanDependency = true;
    decide(game, "UUSI-P4-VUOKRAJATKO", "A"); check(game, "EV-OPTIO", branch, 0.5);
    expect(game.ending).toBeNull(); expect(game.leases.every(lease => lease.status === "valid")).toBe(true);
  });
  it.each([["A", 0.1, 5], ["B", 0.99, 6], ["A", 0.99, 7]] as const)("noise guarantee %s/%s yields branch %s and at most one wait", (choice, observation, branch) => {
    const game = initialState(`guarantee-${branch}`); const issue = decide(game, "noise", "B");
    check(game, "EV-MELU", 4, 0.99);
    game.outcomes[0]!.status = "revealed"; game.scenes = [];
    decide(game, "UUSI-P4-02", choice); check(game, "EV-MELU", branch, observation);
    expect(issue.facts.guaranteeFollowupDone).toBe(true);
    expect(ruleFor("UUSI-P4-02").eligible(game, "UUSI-P4-02")).toBe(false);
    expect(ruleFor("feedback::noise").eligible(game, "feedback::noise")).toBe(false);
  });
  it.each([
    ["forestDeer", "calving", 0, 0.6, true], ["forestDeer", "calving", 1, 0.1, true], ["forestDeer", "calving", 2, 0.9, false],
    ["golden", "flight", 3, 0.6, true], ["golden", "flight", 4, 0.1, true], ["golden", "flight", 5, 0.9, false],
    ["reindeer", "corridor", 6, 0.1, false], ["reindeer", "corridor", 7, 0.9, false],
    ["wolf", "habitat", 8, 0.1, false], ["wolf", "habitat", 9, 0.9, false], ["wolf", "habitat", 10, 0.9, false],
  ] as const)("public research %s/%s yields only branch %s", (species, mechanism, branch, observation, reduced) => {
    const game = initialState(`research-branch-${branch}`); game.world.researchSpecies = species; game.world.researchPublishedAt = 4;
    const issue = openCase(game, "research", { family: `researchLocal${branch}`, component: species === "wolf" ? "shared" : "wind", species, mechanism, count: 2 });
    if (reduced) { excludeAssets(game, issue); issue.fallback = "viable"; issue.facts.removedForNature = true; }
    schedule(game, issue, branch === 10 ? "EV-TUTKIMUS" : "research", "A", "EV-TUTKIMUS", { duration: 7, milestone: "proposal" });
    check(game, "EV-TUTKIMUS", branch, observation);
    if ([1, 4].includes(branch)) expect(game.scenes.at(-1)?.id).toBe(branch === 1 ? "UUSI-P3-14" : "UUSI-P4-KOTKAPAIKAT");
  });
  it("research cannot be published before its real public date or against another species", () => {
    const game = initialState("research-source"); game.world.researchSpecies = "golden"; game.world.researchPublishedAt = 20;
    const issue = openCase(game, "research", { family: "wrongSpecies", component: "wind", species: "forestDeer", mechanism: "calving", count: 2 });
    schedule(game, issue, "research", "A", "EV-TUTKIMUS"); const due = game.outcomes[0]!;
    expect(() => OUTCOMES["EV-TUTKIMUS"]!(game, issue, due, 0)).toThrow("Unpublished");
    game.calendar.now = 21;
    expect(() => OUTCOMES["EV-TUTKIMUS"]!(game, issue, due, 0)).toThrow("species differ");
  });
});
