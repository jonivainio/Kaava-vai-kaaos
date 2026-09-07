import { describe, expect, it } from "vitest";
import {
  createCampaign,
  applyCampaignChoice,
  waitCampaign,
  previewCampaignChoice,
  restoreCampaign,
  serializeCampaign,
  physical,
  currentCampaignCard,
} from "../src/campaign";
import type { Campaign } from "../src/campaign";
import type { Mode, Side } from "../src/engine";
function play(
  seed: string,
  mode: Mode = "hybrid",
  strategy: (s: Campaign) => Side = () => "left",
) {
  let s = createCampaign(seed, mode),
    steps = 0;
  while (!s.ending && steps++ < 100) {
    if (!s.run.offeredCard) s = waitCampaign(s);
    else s = applyCampaignChoice(s, s.run.offeredCard.token, strategy(s));
  }
  expect(steps).toBeLessThan(100);
  return s;
}
describe("täysi RtB-kampanja", () => {
  it("jokainen välitila ja tappio voidaan palauttaa muuttumattomana", () => {
    for (const mode of ["wind", "solar", "hybrid"] as const) {
      for (const side of ["left", "right"] as const) {
        let s = createCampaign("valmis-1", mode),
          steps = 0;
        while (!s.ending && steps++ < 100) {
          s = s.run.offeredCard
            ? applyCampaignChoice(s, s.run.offeredCard.token, side)
            : waitCampaign(s);
          const r = restoreCampaign(serializeCampaign(s));
          expect(r.ok, r.ok ? "" : r.error).toBe(true);
          if (r.ok) expect(r.state).toEqual(s);
        }
        expect(s.ending).not.toBeNull();
      }
    }
  });
  it("budjetin loppuminen kunnan päätöskortilla säilyy palautettavana pelinä", () => {
    let s = createCampaign("valmis-1", "hybrid");
    let steps = 0;
    while (
      currentCampaignCard(s)?.title !== "Kunnan aloituspäätös" &&
      steps++ < 30
    ) {
      s = s.run.offeredCard
        ? applyCampaignChoice(s, s.run.offeredCard.token, "left")
        : waitCampaign(s);
    }
    expect(currentCampaignCard(s)?.title).toBe("Kunnan aloituspäätös");
    // Use a named state fixture to put the next decision on the budget boundary.
    const fixture = structuredClone(s);
    fixture.run.resources.budget = 1;
    const ended = fixture.run.offeredCard
      ? applyCampaignChoice(fixture, fixture.run.offeredCard.token, "left")
      : waitCampaign(fixture);
    const r = restoreCampaign(serializeCampaign(ended));
    expect(ended.run.ending).not.toBeNull();
    expect(ended.facts.municipalityInitiated).toBe(false);
    expect(r.ok, r.ok ? "" : r.error).toBe(true);
  });
  it.each<Mode>(["wind", "solar", "hybrid"])(
    "%s kulkee oikeiden tapahtumien kautta RtB:hen",
    (mode) => {
      const s = play("valmis-1", mode);
      expect(s.ending, s.endingDetail ?? "").toBe("readyToBuild");
      expect(s.facts).toEqual({
        municipalityInitiated: true,
        assessmentAdequate: true,
        planAdopted: true,
        planFinal: true,
        readyToBuild: true,
      });
      expect(new Set(s.records.map((r) => r.stage)).size).toBe(7);
      expect(s.run.flags.adoptionGatesSatisfied).toBe(false);
      expect(s.records.length).toBeGreaterThan(45);
    },
  );
  it("sama siemen ja valinnat, mukaan lukien ulkoiset tapahtumat, toistuvat", () =>
    expect(play("replay")).toEqual(play("replay")));
  it("preview ei vahvista; tuplavahvistus hylätään", () => {
    const s = createCampaign("preview", "hybrid"),
      raw = serializeCampaign(s),
      token = s.run.offeredCard!.token;
    const p = previewCampaignChoice(s, "left");
    expect(serializeCampaign(s)).toBe(raw);
    const a = applyCampaignChoice(s, token, "left");
    expect(a.run.resources).toEqual(p.resources);
    expect(() => applyCampaignChoice(a, token, "right")).toThrow();
  });
  it("tunnettu puuttuva päivitys näkyy ennen päättymistä", () => {
    const s = play("valmis-1", "hybrid", (s) =>
      currentCampaignCard(s)?.title === "Natura-arvion ajantasaisuus" &&
      s.run.site.waterRisk
        ? "right"
        : "left",
    );
    if (s.run.site.waterRisk) expect(s.ending).toBe("outdatedAssessment");
  });
  it("ulkoinen este voi osua joka vaiheeseen; molemmat valinnat päättävät saman hankkeen", () => {
    const samples = new Map<number, string>();
    for (let i = 0; samples.size < 7 && i < 3000; i++) {
      const s = createCampaign(`external-${i}`, "hybrid");
      if (s.world.fatalStage >= 0) samples.set(s.world.fatalStage, s.run.seed);
    }
    expect(samples.size).toBe(7);
    for (const seed of samples.values()) {
      const a = play(seed),
        b = play(seed, "hybrid", (s) =>
          s.run.offeredCard?.cardId.startsWith("X") ? "right" : "left",
        );
      expect(a.ending).toBe("externalObstacle");
      expect(b.ending).toBe("externalObstacle");
      expect(a.endingDetail).toBe(b.endingDetail);
    }
  });
  it("yleisen tutkimuksen rahoitus ei muuta tutkimustulosta eikä korvaa omia selvityksiä", () => {
    const outcomes = new Set<boolean>();
    for (let i = 0; i < 12; i++) {
      const a = play(`research-${i}`),
        b = play(`research-${i}`, "hybrid", (s) =>
          s.run.offeredCard?.cardId === "R001" ? "right" : "left",
        );
      expect(a.world.researchAdverse).toBe(b.world.researchAdverse);
      outcomes.add(a.world.researchAdverse);
      expect(a.run.site).toEqual(b.run.site);
      if (a.research.invited) {
        expect(a.research.contributionEUR).toBe(20000);
        expect(b.research.contributionEUR).toBe(0);
      }
      if (a.facts.readyToBuild)
        expect(
          a.run.jobs.some(
            (j) => j.jobId === "ecology_surveys" && j.status === "completed",
          ),
        ).toBe(true);
    }
    expect(outcomes.size).toBe(2);
  });
  it("lataus säilyttää tarjotun kortin, keskeneräiset työt ja nimen", () => {
    let s = createCampaign("valmis-1", "hybrid");
    while (!s.run.jobs.length) {
      s = applyCampaignChoice(s, s.run.offeredCard!.token, "left");
    }
    const r = restoreCampaign(serializeCampaign(s));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.state).toEqual(s);
      expect(
        applyCampaignChoice(r.state, r.state.run.offeredCard!.token, "left"),
      ).toEqual(applyCampaignChoice(s, s.run.offeredCard!.token, "left"));
    }
  });
  it("virheellinen kampanjatallennus säilyy palautettavaksi", () => {
    const s = structuredClone(createCampaign("a", "hybrid"));
    s.facts.readyToBuild = true;
    const raw = JSON.stringify(s),
      r = restoreCampaign(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.recoverableRaw).toBe(raw);
    s.facts.readyToBuild = false;
    s.ending = "readyToBuild";
    const fakeEnding = JSON.stringify(s);
    const endResult = restoreCampaign(fakeEnding);
    expect(endResult.ok).toBe(false);
    if (!endResult.ok) expect(endResult.recoverableRaw).toBe(fakeEnding);
  });
  it("suunnitelman pienennys ja laitemalli näkyvät lopputuloksen yksiköissä", () => {
    for (let i = 0; i < 8; i++) {
      const s = play(`physical-${i}`);
      const d = physical.getDerivedStats(s.run);
      expect(d.windMWac).toBeLessThanOrEqual(s.initial.windMWac);
      expect(d.uniqueExternalKm).toBeGreaterThan(0);
    }
  });
});
