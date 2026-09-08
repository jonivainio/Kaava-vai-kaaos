import { describe, it, expect } from "vitest";
import {
  createGame,
  choose,
  currentDecision,
  continueStory,
  token,
  serializeGame,
  restoreGame,
  previewDecision,
  VARIANTS,
  DECISIONS,
  getDerivedStats,
} from "../src/game";
import { REGIONS, regionalWeight } from "../src/game/regions";
import type { Game, Action, Region } from "../src/game";

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
function next(s: Game, overrides: Partial<Record<string, Action>> = {}) {
  if (s.stories.length) return continueStory(s, token(s));
  const c = currentDecision(s)!;
  const a = overrides[c.id] ?? safe[s.cursor]!;
  return choose(s, token(s), c.choices.left.action === a ? "left" : "right");
}
function viable(region?: Region) {
  for (let i = 0; i < 1000; i++) {
    const s = createGame(`ajastus-${i}`, "hybrid");
    if (
      s.world.externalStage === null &&
      (!region || s.world.region === region)
    )
      return s;
  }
  throw Error("fixture missing");
}
describe("alue ja menettelyn ajankohta", () => {
  it("alue rajaa poronhoidon, metsäpeuran ja liito-oravan; jokainen valittu kortti kuuluu profiiliin", () => {
    const seen = new Set<Region>();
    const defence: Record<string, number[]> = {};
    for (let i = 0; i < 1200; i++) {
      const s = createGame(`alue-${i}`, "hybrid"),
        r = s.world.region;
      seen.add(r);
      const counts = (defence[r] ??= [0, 0]);
      counts[0] = counts[0]! + 1;
      if (s.world.defence !== "clear") counts[1] = counts[1]! + 1;
      if (r !== "lapland") expect(s.world.species).not.toBe("poron");
      if (r === "lapland") expect(s.world.species).not.toBe("metsäpeuran");
      for (let j = 0; j < DECISIONS.length; j++) {
        const id = DECISIONS[j]!.id,
          v = VARIANTS[id][s.encounters[j]! - 1];
        expect(regionalWeight(r, id, v)).toBeGreaterThan(0);
        if (v?.id.startsWith("herding-")) expect(r).toBe("lapland");
        if (v?.id.startsWith("nature-reindeer") || v?.id === "nature-squirrel")
          expect(r).not.toBe("lapland");
      }
    }
    expect([...seen].sort()).toEqual([...REGIONS].sort());
    expect(defence.east![1]! / defence.east![0]!).toBeGreaterThan(
      defence.west![1]! / defence.west![0]! + 0.35,
    );
  });
  it("vaihe vaihtuu vasta siirtymän klikkauksesta; etenemistarina ei arvo eikä siirrä kelloa", () => {
    let s = viable(),
      transitions = 0,
      interludes = 0;
    for (let i = 0; !s.ending && i < 90; i++) {
      const old = s,
        story = s.stories[0];
      if (story?.kind === "transition") {
        expect(currentDecision(s)).toBeNull();
        expect(story.nextStage).toBe(s.stage + 1);
        expect(restoreGame(serializeGame(s))).toEqual({ ok: true, state: s });
      }
      s = next(s);
      if (story?.kind === "transition") {
        transitions++;
        expect(s.stage).toBe(old.stage + 1);
      }
      if (story?.id.startsWith("progress-")) {
        interludes++;
        expect(s.run).toEqual(old.run);
        expect(s.world).toEqual(old.world);
        expect(() => continueStory(s, token(old))).toThrow();
      }
    }
    expect(s.ending).toBe("ready");
    expect(transitions).toBe(3);
    expect(interludes).toBeGreaterThanOrEqual(5);
  });
  it("työ valmistuu rinnalla mutta tulos paljastetaan YVA:n lopussa tai ehdotuksen käsittelyssä", () => {
    let s = viable(),
      sawCompletedHidden = false;
    const overrides = {
      nature: "relocate",
      solarNature: "solarStudy",
      solarWater: "waterStudy",
      leases: "keepLease",
    } as const;
    for (let i = 0; !s.ending && i < 90; i++) {
      const raw = serializeGame(s),
        restored = restoreGame(raw);
      expect(restored.ok, restored.ok ? "" : restored.error).toBe(true);
      if (restored.ok)
        expect(next(restored.state, overrides)).toEqual(next(s, overrides));
      const c = currentDecision(s);
      if (c) {
        previewDecision(s, "left");
        previewDecision(s, "right");
        expect(serializeGame(s)).toBe(raw);
      }
      for (const f of s.findings) {
        if (f.status === "revealed") {
          expect(s.milestones[f.milestone]).toBe(true);
          if (f.source === "solarNature" || f.source === "leases")
            expect(s.stage).toBe(3);
        }
        if (
          f.source === "solarNature" &&
          f.status === "pending" &&
          s.run.jobs.find((j) => j.jobId === "solar_permit")?.status ===
            "completed"
        )
          sawCompletedHidden = true;
      }
      if (s.cursor === 8) {
        expect(s.unresolved).toBeNull();
        expect(s.lastOutcome).not.toContain("0,030");
      }
      s = next(s, overrides);
    }
    expect(sawCompletedHidden).toBe(true);
    expect(s.findings.every((f) => f.status === "revealed")).toBe(true);
    expect(s.ending).not.toBeNull();
  });
  it("Natura-täydennyksen hyväksyttävyys ei tule tilauskortin tulokseen", () => {
    let s = viable();
    while (s.cursor < 15 || s.stories.length) s = next(s);
    s = next(s);
    expect(s.lastOutcome).toContain("lausuttaviksi");
    expect(s.lastOutcome).not.toContain("toteaa");
    expect(s.findings.find((f) => f.source === "leases")!.status).toBe(
      "pending",
    );
    expect(s.facts.planAdopted).toBe(false);
  });
  it("nimi ei muuta aluetta, kortteja tai lähtökokoa eikä aluetta näytetä kohtauksen tekstissä", () => {
    for (const region of REGIONS) {
      const a = viable(region),
        b = createGame(a.run.seed, "hybrid", a.run.projectIdentity.nameId);
      expect(b.run.projectIdentity.nameId).not.toBe(
        a.run.projectIdentity.nameId,
      );
      expect(b.world).toEqual(a.world);
      expect(b.encounters).toEqual(a.encounters);
      expect(getDerivedStats(b.run)).toEqual(getDerivedStats(a.run));
      expect(JSON.stringify(currentDecision(a))).not.toMatch(
        /Länsi-Suomi|Keski-Suomi|Itä-Suomi|Lapin skenaario/,
      );
    }
  });
});
