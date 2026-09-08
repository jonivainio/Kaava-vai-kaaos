import { describe, it, expect } from "vitest";
import {
  createGame,
  currentDecision,
  choose,
  continueStory,
  token,
  serializeGame,
  restoreGame,
  getDerivedStats,
  getScore,
  DECISIONS,
  VARIANTS,
  SOLAR_VARIANTS,
  validateGameContent,
} from "../src/game";
import type { Game, Action, DecisionId } from "../src/game";
const safe: Record<DecisionId, Action> = {
  land: "special",
  road: "oldRoad",
  defence: "commission",
  initiative: "smaller",
  surveys: "now",
  programme: "workshop",
  research: "fund",
  nature: "avoid",
  solarNature: "solarAvoid",
  noise: "moveNoise",
  height: "moveHeight",
  solarWater: "wetland",
  opinions: "respond",
  feedback: "removeEdge",
  natura: "updateNatura",
  leases: "renew",
  hearing: "supplement",
  proposal: "defend",
};
function decide(s: Game, a: Action) {
  const c = currentDecision(s)!;
  expect(c.options.some((o) => o.action === a)).toBe(true);
  return choose(s, token(s), c.choices.left.action === a ? "left" : "right");
}
function reach(
  seed: string,
  id: DecisionId,
  override: Partial<Record<DecisionId, Action>> = {},
) {
  let s = createGame(seed, "hybrid");
  for (let i = 0; i < 60 && !s.ending; i++) {
    const c = currentDecision(s);
    if (c?.id === id) return s;
    s = s.stories.length
      ? continueStory(s, token(s))
      : decide(s, override[c!.id] ?? safe[c!.id]);
  }
  throw Error("Unreachable " + id + " " + seed);
}
function complete(s: Game) {
  for (let i = 0; i < 60 && !s.ending; i++)
    s = s.stories.length
      ? continueStory(s, token(s))
      : decide(s, safe[currentDecision(s)!.id]);
  return s;
}
function seedFor(test: (s: Game) => boolean) {
  for (let i = 0; i < 500; i++) {
    const s = createGame("extra-" + i, "hybrid");
    if (test(s)) return s.run.seed;
  }
  throw Error("No seed");
}
describe("hybridin uudet haarat", () => {
  it("maanvuokraus pienentää aurinkoalaa tai tiivistää tuulta ilman voimalapoistoa", () => {
    for (const component of ["solar", "wind"] as const) {
      const seed = seedFor(
        (s) => !s.world.ownersAgree && s.world.landComponent === component,
      );
      const a = createGame(seed, "hybrid"),
        b = decide(a, "uniform"),
        d = getDerivedStats(b.run);
      expect(d.windCount).toBe(a.initial.windCount);
      expect(d.solarHa).toBe(
        a.initial.solarHa - (component === "solar" ? 12 : 0),
      );
      expect(b.layoutTightened).toBe(component === "wind");
      expect(restoreGame(serializeGame(b)).ok).toBe(true);
    }
  });
  it("tiivistetty tuulisijoittelu voi vaikeuttaa myöhempää melun väistämistä", () => {
    const seed = seedFor(
      (s) =>
        s.world.externalStage === null &&
        !s.world.ownersAgree &&
        s.world.landComponent === "wind" &&
        s.world.tightLayoutProblem,
    );
    const s = reach(seed, "noise", { land: "uniform" });
    expect(currentDecision(s)!.options[0].note).toContain("Tiiviissä");
    const n = decide(s, "moveNoise");
    expect(n.lastOutcome).toContain("ei jätä tilaa");
    expect(n.run.timeline.some((t) => t.reference === "noise_edge")).toBe(true);
  });
  it("riskipaikkojen määrät vaihtelevat siemenestä, preview ja lataus eivät muuta niitä", () => {
    const seen = new Set<number>();
    for (let i = 0; i < 25; i++) {
      const s = createGame("määrä-" + i, "hybrid");
      seen.add(s.world.affected.nature);
      const r = restoreGame(serializeGame(s));
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.state.world.affected).toEqual(s.world.affected);
    }
    expect(seen.size).toBe(3);
  });
  it("Puolustusvoimien viisi lopputilaa ja keskeneräinen VTT-työ säilyvät", () => {
    for (const outcome of [
      "clear",
      "study",
      "reduce",
      "oppose",
      "studyReject",
    ] as const) {
      const seed = seedFor(
        (s) => s.world.defence === outcome && s.world.externalStage !== 0,
      );
      let s = reach(seed, "defence");
      const before = getDerivedStats(s.run).windCount;
      s = decide(s, "commission");
      expect(restoreGame(serializeGame(s)).ok).toBe(true);
      if (outcome === "clear" || outcome === "oppose")
        expect(s.run.jobs.some((j) => j.jobId === "defence_review")).toBe(
          false,
        );
      if (outcome === "clear") {
        expect(s.lastOutcome).toContain("ei vastusta");
        continue;
      }
      if (outcome !== "oppose") {
        expect(
          s.run.jobs.find((j) => j.jobId === "defence_review")!.status,
        ).toBe("active");
        expect(s.lastOutcome).toContain("15 000");
      }
      s = continueStory(s, token(s));
      if (outcome === "oppose" || outcome === "studyReject")
        expect(s.ending).toBe("external");
      else {
        expect(s.ending).toBeNull();
        expect(getDerivedStats(s.run).windCount).toBe(
          before - (outcome === "reduce" ? s.world.affected.defence : 0),
        );
      }
    }
  });
  it("aurinkokortit ovat mukana jokaisessa loppuun etenevässä hybridissä", () => {
    for (let i = 0; i < 15; i++) {
      const seed = seedFor(
        (s) =>
          s.world.externalStage === null &&
          s.run.seed !== "unused" &&
          Number(s.run.seed.split("-")[1]) >= i,
      );
      const s = complete(createGame(seed, "hybrid"));
      expect(s.ending).toBe("ready");
      expect(s.decisions.map((d) => d.id)).toEqual(DECISIONS.map((d) => d.id));
      expect(s.decisions.filter((d) => d.id.startsWith("solar"))).toHaveLength(
        2,
      );
    }
  });
  it("auringon selvitys voi säilyttää alan tai pienentää sitä, ei poista tuulivoimaloita", () => {
    for (const accepted of [false, true]) {
      const seed = seedFor(
        (s) =>
          s.world.externalStage === null && s.world.solarPermit === accepted,
      );
      let s = reach(seed, "solarNature");
      const d = getDerivedStats(s.run);
      s = decide(s, "solarStudy");
      expect(s.run.jobs.find((j) => j.jobId === "solar_permit")!.status).toBe(
        "active",
      );
      const loaded = restoreGame(serializeGame(s));
      expect(loaded.ok).toBe(true);
      expect(getDerivedStats(s.run).solarHa).toBe(d.solarHa);
      expect(s.findings.find((f) => f.source === "solarNature")!.status).toBe(
        "pending",
      );
      while (s.stories[0]?.findingSource !== "solarNature")
        s = s.stories.length
          ? continueStory(s, token(s))
          : decide(s, safe[currentDecision(s)!.id]);
      expect(s.stage).toBe(3);
      const beforeResult = getDerivedStats(s.run);
      const newLoss = s.run.assets.exclusionGroups
        .solar_nature!.solarIds.slice(0, 8)
        .filter(
          (id) =>
            !s.run.assets.solarParcels.find((p) => p.id === id)!.exclusions
              .length,
        ).length;
      s = continueStory(s, token(s));
      expect(getDerivedStats(s.run).windCount).toBe(beforeResult.windCount);
      expect(getDerivedStats(s.run).solarHa).toBe(
        beforeResult.solarHa - (accepted ? 0 : newLoss),
      );
      expect(s.findings.find((f) => f.source === "solarNature")!.status).toBe(
        "revealed",
      );
      expect(s.run.jobs.find((j) => j.jobId === "solar_permit")!.status).toBe(
        "completed",
      );
    }
  });
  it("pisteet ovat vain voitolle; viive, teho, korkeus, ha ja tiivistys perustellaan", () => {
    const start = createGame("pisteet", "hybrid");
    expect(getScore(start)).toBeNull();
    const seed = seedFor((s) => s.world.externalStage === null);
    const s = complete(createGame(seed, "hybrid"));
    const score = getScore(s)!;
    expect(score.total).toBe(
      1000 - score.deductions.reduce((n, l) => n + l.points, 0),
    );
    expect(score.deductions.some((l) => l.reason.includes("Aurinkoalue"))).toBe(
      true,
    );
    const changed = structuredClone(s);
    changed.delays.push({ reason: "Lisäkausi", months: 12 });
    changed.compactions.push("Tiiviimpi sijoittelu");
    const scored = getScore(changed)!;
    expect(scored.total).toBe(Math.max(0, score.total - 96 - 15));
    expect(scored.deductions.at(-1)?.reason).toContain("Tiiviimpi");
    expect(
      scored.deductions.filter((l) => l.reason.startsWith("Tuulivoiman")),
    ).toHaveLength(1);
  });
  it("tuntematon sisältökenttä tai toiminto näkyy virheenä; kuvitustiedostot löytyvät", () => {
    const bad = structuredClone(VARIANTS) as any;
    bad.land[0].effects = [{ op: "win" }];
    expect(() => validateGameContent(DECISIONS, bad)).toThrow();
    delete bad.land[0].effects;
    bad.land[0].results = { invented: "Voitto" };
    expect(() => validateGameContent(DECISIONS, bad)).toThrow();
    expect(
      Object.values(VARIANTS)
        .flat()
        .some((v) => v.id.includes("orchid")),
    ).toBe(false);
    expect(VARIANTS.nature.find((v) => v.id === "nature-squirrel")!.art).toBe(
      "squirrel",
    );
  });
});
