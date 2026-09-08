import { describe, it, expect } from "vitest";
import {
  createGame,
  currentDecision,
  choose,
  continueStory,
  token,
  serializeGame,
  restoreGame,
  previewDecision,
  DECISIONS,
  getDerivedStats,
  CONTENT_VERSION,
  VARIANTS,
  SOLAR_VARIANTS,
} from "../src/game";
import type { Game, Mode, Side, Action } from "../src/game";
const safe: Action[] = [
  "special",
  "oldRoad",
  "commission",
  "smaller",
  "now",
  "workshop",
  "fund",
  "avoid",
  "solarAvoid",
  "moveNoise",
  "moveHeight",
  "wetland",
  "respond",
  "removeEdge",
  "updateNatura",
  "renew",
  "supplement",
  "defend",
];
const sideFor = (s: Game, action: Action): Side =>
  currentDecision(s)!.choices.left.action === action ? "left" : "right";
function play(
  seed: string,
  mode: Mode = "hybrid",
  select: (s: Game) => Side = (s) => sideFor(s, safe[s.cursor]!),
) {
  let s = createGame(seed, mode),
    steps = 0;
  while (!s.ending && steps++ < 60)
    s = s.stories.length
      ? continueStory(s, token(s))
      : choose(s, token(s), select(s));
  expect(steps).toBeLessThan(60);
  return s;
}
describe("lyhyt vetopeli", () => {
  it("vaiheissa on 2 / 5 / 6 / 5 päätöstä", () =>
    expect(
      [0, 1, 2, 3].map(
        (stage) => DECISIONS.filter((d) => d.stage === stage).length,
      ),
    ).toEqual([2, 5, 6, 5]));
  it.each<Mode>(["wind", "solar", "hybrid"])(
    "%s toistuu ja päättyy oikeisiin portteihin",
    (mode) => {
      const a = play("uusi-1", mode);
      expect(a).toEqual(play("uusi-1", mode));
      if (a.ending === "ready")
        expect(Object.values(a.facts).every(Boolean)).toBe(true);
    },
  );
  it("preview ei muuta tilaa eikä paljasta tulevaa tutkimustulosta", () => {
    const s = createGame("preview", "wind"),
      raw = serializeGame(s);
    expect(previewDecision(s, "left")).toEqual({
      label: currentDecision(s)!.choices.left.label,
      note: currentDecision(s)!.choices.left.note,
    });
    expect(serializeGame(s)).toBe(raw);
    const n = choose(s, token(s), "left");
    expect(() => choose(n, token(s), "right")).toThrow();
  });
  it("ulkoiset esteet säilyvät valinnoista riippumatta kaikissa neljässä vaiheessa", () => {
    const samples = new Map<number, string>();
    for (let i = 0; samples.size < 4 && i < 100; i++) {
      const s = createGame("este-" + i, "wind");
      if (s.world.externalStage !== null)
        samples.set(s.world.externalStage, s.run.seed);
    }
    expect(samples.size).toBe(4);
    for (const seed of samples.values()) {
      expect(play(seed).ending).toBe("external");
      expect(play(seed, "hybrid", () => "right").ending).toBe("external");
    }
  });
  it("maanomistajat voivat hyväksyä yhtenäiset ehdot tai kieltäytyä", () => {
    const results = new Set<boolean>();
    for (let i = 0; i < 20; i++) {
      const s = createGame("maa-" + i, "wind");
      const a = choose(s, token(s), sideFor(s, "uniform"));
      results.add(s.world.ownersAgree);
      expect(getDerivedStats(a.run).windCount).toBe(s.initial.windCount);
    }
    expect(results.size).toBe(2);
  });
  it("kaikki välitilat ja tapahtumat säilyvät latauksessa, nimi pysyy", () => {
    for (const mode of ["wind", "solar", "hybrid"] as const) {
      let s = createGame("uusi-1", mode),
        steps = 0;
      while (!s.ending && steps++ < 60) {
        const name = s.run.projectIdentity;
        s = s.stories.length
          ? continueStory(s, token(s))
          : choose(s, token(s), sideFor(s, safe[s.cursor]!));
        const r = restoreGame(serializeGame(s));
        expect(r.ok, r.ok ? "" : r.error).toBe(true);
        if (r.ok) expect(r.state).toEqual(s);
        expect(s.run.projectIdentity).toEqual(name);
      }
    }
  });
  it("virheellinen tallennus ja väärän version tallennus säilyvät vientiin", () => {
    for (const raw of [
      "{broken",
      JSON.stringify({ version: "rtb-1" }),
      serializeGame(createGame("test", "wind")).replace(
        CONTENT_VERSION,
        "wrong",
      ),
    ]) {
      const r = restoreGame(raw);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.recoverableRaw).toBe(raw);
    }
  });
  it("rahoitus ei muuta yleisen tutkimuksen tulosta tai hankkeen alkuperäistä tietoa", () => {
    for (let i = 0; i < 12; i++) {
      const a = play("tiede-" + i),
        b = play("tiede-" + i, "hybrid", (s) =>
          sideFor(
            s,
            currentDecision(s)?.id === "research" ? "observe" : safe[s.cursor]!,
          ),
        );
      expect(a.world.researchAdverse).toBe(b.world.researchAdverse);
      expect(a.run.site).toEqual(b.run.site);
    }
  });
  it("melumoodi on ehdotus; jatkokortin pienempi malli muuttaa MW:t ja korkeuden", () => {
    let s = createGame("uusi-1", "wind");
    while (!s.ending && (s.cursor < 9 || s.stories.length))
      s = s.stories.length
        ? continueStory(s, token(s))
        : choose(s, token(s), sideFor(s, safe[s.cursor]!));
    expect(s.ending).toBeNull();
    const before = getDerivedStats(s.run);
    s = choose(s, token(s), sideFor(s, "quietNights"));
    expect(getDerivedStats(s.run).windMWac).toBe(before.windMWac);
    expect(s.run.windYieldIndex).toBe(92);
    s = choose(s, token(s), sideFor(s, "moveHeight"));
    while (s.cursor < 13 || s.stories.length)
      s = s.stories.length
        ? continueStory(s, token(s))
        : choose(s, token(s), sideFor(s, safe[s.cursor]!));
    expect(currentDecision(s)!.title).toContain("Melumoodi");
    s = choose(s, token(s), sideFor(s, "answer"));
    expect(getDerivedStats(s.run).windMWac).toBe(before.windCount * 8);
    expect(s.run.windHeightCapM).toBe(280);
  });
  it("sisältöpankissa on yli 60 tilannetta ja siemen valitsee pysyvän valikoiman", () => {
    expect(
      DECISIONS.length +
        Object.values(VARIANTS).flat().length +
        Object.values(SOLAR_VARIANTS).flat().length,
    ).toBeGreaterThan(60);
    const selections = new Set(
      Array.from({ length: 40 }, (_, i) =>
        JSON.stringify(createGame(`pakka-${i}`, "wind").encounters),
      ),
    );
    expect(selections.size).toBe(40);
  });
  it("tutkimuksen hinta vaihtelee ja julkaisu odottaa ehdotusvaiheeseen", () => {
    const prices = new Set<number>();
    for (let i = 0; i < 30; i++) {
      let s = createGame(`julkaisu-${i}`, "wind");
      prices.add(s.world.researchCost);
      while (!s.ending && s.cursor < 14) {
        expect(s.research.published).toBe(false);
        expect(s.stories.some((x) => x.kind === "research")).toBe(false);
        s = s.stories.length
          ? continueStory(s, token(s))
          : choose(s, token(s), sideFor(s, safe[s.cursor]!));
      }
    }
    expect(prices.size).toBe(5);
  });
  it("tutkimuksen odotus voi säästää pienennyksen tai kaataa; rahoitus ei muuta tulosta", () => {
    const seeds = new Map<boolean, string>();
    for (let i = 0; seeds.size < 2; i++) {
      const s = createGame(`odotus-${i}`, "wind");
      if (s.world.externalStage === null)
        seeds.set(s.world.researchAdverse, s.run.seed);
    }
    for (const [adverse, seed] of seeds) {
      const wait = play(seed, "wind", (s) =>
        sideFor(
          s,
          currentDecision(s)?.id === "natura" ? "keepNatura" : safe[s.cursor]!,
        ),
      );
      const noFund = play(seed, "wind", (s) =>
        sideFor(
          s,
          currentDecision(s)?.id === "research"
            ? "observe"
            : currentDecision(s)?.id === "natura"
              ? "keepNatura"
              : safe[s.cursor]!,
        ),
      );
      const trim = play(seed, "wind");
      expect(wait.ending).toBe(adverse ? "choices" : "ready");
      expect(noFund.ending).toBe(wait.ending);
      expect(trim.ending).toBe("ready");
      expect(getDerivedStats(wait.run).windCount).toBe(
        getDerivedStats(trim.run).windCount +
          trim.run.assets.exclusionGroups
            .research_edge!.windIds.slice(0, trim.world.affected.natura)
            .filter(
              (id) =>
                !wait.run.assets.windSites.find((w) => w.id === id)!.exclusions
                  .length,
            ).length,
      );
    }
  });
  it("lentoesteselvitys tallentuu keskeneräisenä; vain ennalta sidotut riskipaikat voivat poistua", () => {
    const outcomes = new Set<boolean>();
    for (let i = 0; outcomes.size < 2 && i < 50; i++) {
      let s = createGame(`lento-${i}`, "wind");
      if (s.world.externalStage !== null) continue;
      while (s.cursor < 10 || s.stories.length)
        s = s.stories.length
          ? continueStory(s, token(s))
          : choose(s, token(s), sideFor(s, safe[s.cursor]!));
      const before = getDerivedStats(s.run);
      const loss = s.run.assets.exclusionGroups
        .aviation_edge!.windIds.slice(0, s.world.affected.height)
        .filter(
          (id) =>
            !s.run.assets.windSites.find((w) => w.id === id)!.exclusions.length,
        ).length;
      s = choose(s, token(s), sideFor(s, "lower"));
      expect(
        s.run.jobs.find((j) => j.jobId === "aviation_review")!.status,
      ).toBe("active");
      const restored = restoreGame(serializeGame(s));
      expect(restored.ok).toBe(true);
      s = continueStory(s, token(s));
      outcomes.add(s.world.aviationAccepted);
      expect(getDerivedStats(s.run).windCount).toBe(
        before.windCount - (s.world.aviationAccepted ? 0 : loss),
      );
      expect(s.run.windHeightCapM).toBe(300);
      expect(getDerivedStats(s.run).windMWac).toBe(
        getDerivedStats(s.run).windCount * 10,
      );
    }
    expect(outcomes.size).toBe(2);
  });
  it("maakotkan siirrossa naapurihanke lasketaan mukaan, sääksellä ei käytetä kotkarajaa", () => {
    let checked = 0;
    for (let i = 0; checked < 2 && i < 100; i++) {
      let s = createGame(`kotka-${i}`, "wind");
      if (s.world.externalStage !== null) continue;
      while (s.cursor < 7 || s.stories.length)
        s = s.stories.length
          ? continueStory(s, token(s))
          : choose(s, token(s), sideFor(s, safe[s.cursor]!));
      const v = VARIANTS.nature[s.encounters[7]! - 1];
      if (!v?.id.startsWith("golden-")) continue;
      s = choose(s, token(s), sideFor(s, "relocate"));
      expect(s.lastOutcome).not.toContain("0,030");
      expect(s.unresolved).toBeNull();
      while (
        s.findings.find((f) => f.source === "nature")!.status !== "revealed"
      )
        s = s.stories.length
          ? continueStory(s, token(s))
          : choose(s, token(s), sideFor(s, safe[s.cursor]!));
      expect(s.stage).toBe(2);
      expect(s.lastOutcome).toContain("0,030");
      expect(!!s.unresolved).toBe(s.world.goldenNeighborRiskMilli + 30 > 60);
      checked++;
    }
    expect(checked).toBe(2);
    expect(DECISIONS[7]!.base.question).toContain("sääksen");
    expect(DECISIONS[7]!.base.question).not.toContain("0,06");
  });
});
