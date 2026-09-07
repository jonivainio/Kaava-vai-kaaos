import { describe, expect, it } from 'vitest';
import { createEngine, pilotPack, RULES } from '../src/engine';
import type { Card, CardPack, Choice, Effect, Mode, RunState, Side } from '../src/engine';
import names from '../content/project_names.fi.json';
import { manifest } from '../src/engine/content';

const engine = createEngine();
type Engine = ReturnType<typeof createEngine>;
function demo(e = engine) { return e.createRun({ seed: 'testi-01', mode: 'hybrid', demoFixture: true }); }
function play(e: Engine, state: RunState, id: string, side: Side = 'left') {
  const s = state.offeredCard?.cardId === id ? state : e.offerCard(state, id);
  return e.applyChoice(s, s.offeredCard!.token, side);
}
function choice(effects: Effect[] = [], extra: Partial<Choice> = {}): Choice {
  return { label: 'Tee ratkaisu', outcomeText: 'Ratkaisu kirjataan.', timeMonths: 0, effects, delayed: [], ...extra };
}
function card(id: string, left = choice(), right = choice(), extra: Partial<Card> = {}): Card {
  return { ...structuredClone(pilotPack.cards[0]!), id, version: 1, phases: ['01', '02', '03', '04'], requiresAll: [],
    choices: { left, right }, ...extra };
}
function custom(cards: Card[]) {
  const pack: CardPack = { ...pilotPack, packId: 'test-fixture-1', cards };
  return createEngine(pack);
}
const mechanical = (s: RunState) => {
  const { projectIdentity: _identity, nameRngState: _rng, ...rest } = s;
  return rest;
};

describe('alkuskenaario ja nimi', () => {
  it.each<Mode>(['wind', 'solar', 'hybrid'])('%s: alkuarvot ja siemen ovat toistettavia', mode => {
    for (let i = 0; i < 80; i++) {
      const s = engine.createRun({ seed: `seed-${i}`, mode });
      const d = engine.getDerivedStats(s);
      expect(s).toEqual(engine.createRun({ seed: `seed-${i}`, mode }));
      expect(s.resources).toEqual({ budget: 100, trust: 50, quality: 15, patience: 75 });
      expect(d.windCount).toBeGreaterThanOrEqual(mode === 'solar' ? 0 : 12);
      expect(d.windCount).toBeLessThanOrEqual(mode === 'solar' ? 0 : mode === 'wind' ? 24 : 20);
      expect(d.solarHa).toBeGreaterThanOrEqual(mode === 'wind' ? 0 : mode === 'solar' ? 80 : 60);
      expect(d.solarHa).toBeLessThanOrEqual(mode === 'wind' ? 0 : mode === 'solar' ? 220 : 160);
      expect(d.uniqueExternalKm).toBeGreaterThanOrEqual(mode === 'solar' ? 2 : 5);
      expect(d.uniqueExternalKm).toBeLessThanOrEqual(mode === 'solar' ? 12 : 20);
      expect(d.windPlannedMWac).toBe(d.windCount * 10);
      expect(s.assets.windSites.every(a => a.totalHeightM === 300 && a.modelId === 'F10')).toBe(true);
      expect(s.ending).toBeNull();
    }
  });
  it('sama siemen ja päätökset tuottavat saman koko tallennuksen', () => {
    const run = () => ['P001', 'P009'].reduce((s, id) => play(engine, s, id), demo());
    expect(engine.serializeRun(run())).toBe(engine.serializeRun(run()));
  });
  it('80 nimeä ovat yksilöllisiä ja peräkkäinen nimi vaihtuu', () => {
    expect(names.names).toHaveLength(80);
    expect(new Set(names.names.map(n => n.id)).size).toBe(80);
    expect(new Set(names.names.map(n => n.name)).size).toBe(80);
    const first = demo();
    const next = engine.createRun({ seed: 'testi-01', mode: 'hybrid', demoFixture: true, previousNameId: first.projectIdentity.nameId });
    expect(next.projectIdentity.nameId).not.toBe(first.projectIdentity.nameId);
    expect(mechanical(next)).toEqual(mechanical(first));
  });
  it('nimien järjestys, koko ja versio eivät muuta mekaanista skenaariota tai päätöksiä', () => {
    const a = demo();
    const b = engine.createRun({ seed: 'testi-01', mode: 'hybrid', demoFixture: true,
      namePool: { poolVersion: 'future', names: names.names.slice(0, 20).reverse() } });
    expect(mechanical(play(engine, a, 'P009'))).toEqual(mechanical(play(engine, b, 'P009')));
  });
  it('nimi ja Unicode säilyvät päätöksessä ja latauksessa poolin snapshotina', () => {
    const s = play(engine, demo(), 'P009');
    const old = structuredClone(s);
    old.projectIdentity = { nameId: 'N999', displayName: 'Käpytaskunsuo', namePoolVersion: 'old-pool' };
    const restored = engine.restoreRun(engine.serializeRun(old));
    expect(restored.ok).toBe(true);
    if (restored.ok) expect(restored.state.projectIdentity).toEqual(old.projectIdentity);
    expect(s.projectIdentity).toEqual(demo().projectIdentity);
  });
});

describe('päätöstransaktio ja kelpoisuus', () => {
  it('preview ei muuta tilaa, RNG:tä, töitä eikä historiaa; tuplavahvistus estyy', () => {
    const s = engine.offerCard(demo(), 'P009');
    const before = engine.serializeRun(s), token = s.offeredCard!.token;
    const p = engine.previewChoice(s, token, 'left');
    expect(engine.previewChoice(s, token, 'left')).toEqual(p);
    expect(engine.serializeRun(s)).toBe(before);
    expect(s.jobs).toHaveLength(0);
    const after = engine.applyChoice(s, token, 'left');
    expect(after.rngState).toBe(s.rngState);
    expect(after.resources).toEqual(p.resources);
    expect(engine.getDerivedStats(after)).toEqual(p.stats);
    expect(after.jobs).toHaveLength(1);
    expect(() => engine.applyChoice(after, token, 'left')).toThrow(/jo käsitelty/);
    expect(() => engine.applyChoice(after, token, 'right')).toThrow();
    const loaded = engine.restoreRun(engine.serializeRun(after));
    if (loaded.ok) expect(() => engine.applyChoice(loaded.state, token, 'left')).toThrow();
  });
  it('vanha korttitunniste ei vahvista seuraavaa korttia', () => {
    const s = engine.offerCard(demo(), 'P009');
    const after = engine.offerCard(engine.applyChoice(s, s.offeredCard!.token, 'left'), 'P001');
    expect(() => engine.applyChoice(after, s.offeredCard!.token, 'right')).toThrow();
  });
  it('tuntematon käsky, lippu, polku, huono domain ja väärä ehtotyyppi ovat näkyviä virheitä', () => {
    for (const effect of [{ op: 'magic' }, { op: 'adjust', field: 'site.windClass', value: 5 },
      { op: 'flag', key: 'adoptionGatesSatisfied', value: true }, { op: 'track', key: 'grid', value: 'magic' },
      { op: 'heightCap', metres: 99 }, { op: 'adjust', field: 'budget', value: Infinity }]) {
      expect(() => custom([card('T001', choice([effect as Effect]))])).toThrow();
    }
    expect(() => custom([card('T001', choice(), choice(), { requiresAll: [{ field: 'flags.ecologyReady', operator: 'gt', value: 1 }] })])).toThrow();
  });
  it('virhe palauttaa koko transaktion; teksti ei anna vaikutuksia', () => {
    const e = custom([card('T001', choice([{ op: 'adjust', field: 'budget', value: -5 }, { op: 'gridDistance', deltaKm: -100 }]),
      choice([], { outcomeText: 'Poistetaan kaikki voimalat ja hyväksytään kaava.' }))]);
    const s = e.offerCard(demo(e), 'T001'), before = e.serializeRun(s);
    expect(() => e.applyChoice(s, s.offeredCard!.token, 'left')).toThrow(/negatiivinen/);
    expect(e.serializeRun(s)).toBe(before);
    const after = e.applyChoice(s, s.offeredCard!.token, 'right');
    expect(e.getDerivedStats(after)).toEqual(e.getDerivedStats(s));
    expect(after.ending).toBeNull();
  });
  it('mittareiden clamp tehdään vaikutuslistan jälkeen eikä jokaiselle käskylle', () => {
    const e = custom([card('T001', choice([{ op: 'adjust', field: 'trust', value: 100 }, { op: 'adjust', field: 'trust', value: -70 },
      { op: 'adjust', field: 'windYieldIndex', value: 100 }]))]);
    const s = play(e, demo(e), 'T001');
    expect(s.resources.trust).toBe(80);
    expect(s.windYieldIndex).toBe(150);
  });
  it('tunnettu kohtalokas seuraus näkyy previewssa, kaavavoittoa ei tekaista', () => {
    const e = custom([card('T001', choice([{ op: 'adjust', field: 'budget', value: -100 }]), choice([{ op: 'finish', ending: 'planAdopted' }]))]);
    const s = e.offerCard(demo(e), 'T001');
    expect(e.previewChoice(s, s.offeredCard!.token, 'left').ending).toBe('budgetExhausted');
    expect(() => e.applyChoice(s, s.offeredCard!.token, 'right')).toThrow(/menettelymallia/);
    expect(() => engine.offerCard(demo(), 'P046')).toThrow();
    const corrupt = structuredClone(demo()); corrupt.flags.adoptionGatesSatisfied = true;
    expect(engine.restoreRun(JSON.stringify(corrupt)).ok).toBe(false);
  });
  it('vaihe, pelimuoto, ehdot ja käsittelyhistoria eivät ohitu', () => {
    expect(() => engine.offerCard(demo(), 'H001')).toThrow();
    const played = play(engine, demo(), 'P009');
    expect(() => engine.offerCard(played, 'P009')).toThrow();
    expect(() => engine.setDemoPhase(engine.createRun({ seed: 'a', mode: 'hybrid' }), '03')).toThrow();
    expect(() => engine.offerCard(engine.createRun({ seed: 'a', mode: 'solar' }), 'P024')).toThrow();
  });
});

describe('fyysiset kohteet ja yksiköt', () => {
  it('sama tuulirajaus kahdesti ja päällekkäinen eri rajaus poistavat saman kohteen kerran', () => {
    const e = custom([card('T001', choice([{ op: 'windRemove', count: 2, reason: 'ridge' }] ), choice(), { modes: ['wind', 'hybrid'], maxPerRun: 2 }),
      card('T002', choice([{ op: 'windRemove', count: 1, reason: 'ridge' }]), choice(), { modes: ['wind', 'hybrid'] })]);
    let s = play(e, demo(e), 'T001');
    s = play(e, s, 'T001'); s = play(e, s, 'T002');
    expect(e.getDerivedStats(s).windCount).toBe(14);
    expect(s.timeline.at(-1)?.text).toContain('uusi menetys 0 kpl');
  });
  it('aurinkoalueiden yhdiste, toistuva poissulku ja osittaiset hehtaarit säilyvät', () => {
    const e = custom([card('T001', choice([{ op: 'solarRemove', hectares: 12, reason: 'frog_hydrology' }]), choice(), { modes: ['solar', 'hybrid'], maxPerRun: 2 }),
      card('T002', choice([{ op: 'solarRemove', hectares: 10, reason: 'drainage_edge' }]), choice(), { modes: ['solar', 'hybrid'] }),
      card('T003', choice([{ op: 'solarRemove', hectares: 0.4, reason: 'fraction' }]), choice(), { modes: ['solar', 'hybrid'], maxPerRun: 2 })]);
    let s = play(e, demo(e), 'T001'); s = play(e, s, 'T001'); s = play(e, s, 'T002');
    expect(e.getDerivedStats(s).solarHa).toBe(88);
    const first = play(e, s, 'T003');
    const second = play(e, first, 'T003');
    expect(e.getDerivedStats(second).solarHa).toBeCloseTo(e.getDerivedStats(first).solarHa);
    expect(second.timeline.at(-1)?.text).toContain('uusi menetys 0 ha');
  });
  it('puuttuva rajaus ei korvaudu toisilla kohteilla', () => {
    const e = custom([card('T001', choice([{ op: 'windRemove', count: 100, reason: 'oversized' }]), choice(), { modes: ['wind', 'hybrid'] })]);
    const s = demo(e);
    expect(() => play(e, s, 'T001')).toThrow(/Skenaariovirhe/);
    expect(e.getDerivedStats(s).windCount).toBe(16);
  });
  it('yhteinen johto muuttuu ja lasketaan kerran; talousindeksi vain käskystä', () => {
    const e = custom([card('T001', choice([{ op: 'gridDistance', deltaKm: 3 }]))]);
    const s = play(e, demo(e), 'T001'), d = e.getDerivedStats(s);
    expect([d.windExternalKm, d.solarExternalKm, d.uniqueExternalKm]).toEqual([17, 17, 17]);
    expect(s.grid.routeHistory).toHaveLength(1);
    expect(s.grid.technicalStatus).toBe('reviewNeeded');
    expect(s.economicsIndex).toBe(65);
  });
  it('MW, tuotantoindeksi, MWp, MWac ja vientiraja erotetaan', () => {
    const e = custom([card('T001', choice([{ op: 'adjust', field: 'windYieldIndex', value: -18 }]))]);
    const d = e.getDerivedStats(play(e, demo(e), 'T001'));
    expect(d.windMWac).toBe(160); expect(d.windYieldIndex).toBe(82);
    expect(d.solarHa).toBe(100); expect(d.solarMWp).toBe(65); expect(d.solarMWac).toBe(52);
    expect(d.combinedNameplateMWac).toBe(212); expect(d.exportLimitMWac).toBeNull();
  });
  it('280 m säilyttää F10:n; 260 m vaatii malliratkaisun ilman lineaarista teholeikkausta', () => {
    const e = custom([card('T001', choice([{ op: 'heightCap', metres: 280 }])), card('T002', choice([{ op: 'heightCap', metres: 260 }]))]);
    const a = play(e, demo(e), 'T001');
    expect(e.getDerivedStats(a).windMWac).toBe(160);
    const b = play(e, a, 'T002'), d = e.getDerivedStats(b);
    expect(d.windPlannedMWac).toBe(160); expect(d.windMWac).toBe(0); expect(d.windCompatible).toBe(false);
    expect(b.selectedModelId).toBe('F10'); expect(b.ending).toBeNull();
    // Model-switch commands are deliberately absent from the pilot. This is a named test fixture.
    const compatibleF8Fixture = structuredClone(b);
    compatibleF8Fixture.selectedModelId = 'F8';
    compatibleF8Fixture.assets.windSites.forEach(a => { a.modelId = 'F8'; a.totalHeightM = 260; });
    expect(e.getDerivedStats(compatibleF8Fixture).windMWac).toBe(128);
  });
  it('hybridin kokoraja tarjoaa yhden mahdollisen suunnanvaihdon ja säilyttää yhteisen johdon sekä kulut', () => {
    const e = custom([card('T001', choice([{ op: 'windRemove', count: 14, reason: 'major_reduction' }]), choice(), { modes: ['hybrid'] }),
      structuredClone(pilotPack.cards.find(c => c.id === 'P048')!)]);
    const s = play(e, e.setDemoPhase(demo(e), '04'), 'T001');
    expect(s.flags.hybridPivotAvailable).toBe(true);
    expect(s.offeredCard?.cardId).toBe('P048');
    expect(() => e.applyChoice(s, s.offeredCard!.token, 'left')).toThrow(/ei täytä pelirajoja/);
    const after = e.applyChoice(s, s.offeredCard!.token, 'right');
    expect(after.mode).toBe('solar'); expect(after.flags.pivotUsed).toBe(true);
    expect(after.resources.budget).toBe(96); expect(after.ending).toBeNull();
    expect(e.getDerivedStats(after).uniqueExternalKm).toBe(14);
    expect(e.getDerivedStats(after).windCount).toBe(0); expect(e.getDerivedStats(after).solarMWac).toBe(52);
    expect(after.assets.windSites).toHaveLength(16);
  });
  it('vapaaehtoinen lopetus vahvistuu ja sulkee lisäpäätökset', () => {
    const e = custom([card('T001', choice([{ op: 'finish', ending: 'developerWithdraws' }]))]);
    const s = play(e, demo(e), 'T001');
    expect(s.ending).toBe('developerWithdraws');
    expect(() => e.advanceTime(s, 1)).toThrow();
  });
});

describe('yhteinen kello, työt ja tapahtumat', () => {
  it('kaksi työtä alkaa samassa kuussa ja valmistuu rinnakkain, ei peräkkäin', () => {
    const e = custom([card('T001', choice([], { delayed: [
      { jobId: 'short', afterMonths: 3, completionText: 'Lyhyt valmis.', effects: [{ op: 'adjust', field: 'quality', value: 2 }] },
      { jobId: 'long', afterMonths: 12, completionText: 'Pitkä valmis.', effects: [{ op: 'adjust', field: 'quality', value: 3 }] },
    ] }))]);
    const at4 = e.advanceTime(demo(e), 4);
    const s = play(e, at4, 'T001');
    expect(s.jobs.map(j => [j.startedAt, j.dueAt])).toEqual([[4, 7], [4, 16]]);
    const done = e.advanceTime(s, 12);
    expect(done.elapsedMonths).toBe(16);
    expect(done.jobs.map(j => j.completedAt)).toEqual([7, 16]);
    expect(done.resources.quality).toBe(20);
  });
  it('tilaus alkaa ennen valinnan ajan etenemistä; päällekkäinen tilaus on atominen virhe', () => {
    const e = custom([card('T001', choice([], { timeMonths: 1, delayed: [{ jobId: 'work', afterMonths: 3, completionText: 'Valmis.', effects: [] }] }), choice(), { maxPerRun: 2 })]);
    const s = play(e, demo(e), 'T001');
    expect([s.jobs[0]!.startedAt, s.jobs[0]!.dueAt, s.elapsedMonths]).toEqual([0, 3, 1]);
    expect(() => play(e, s, 'T001')).toThrow(/jo käynnissä/);
    expect(s.jobs).toHaveLength(1);
  });
  it('due-eventin järjestys on kuukausi ja lisäysjärjestys; aikahyppy keskeytyy ja jatkuu', () => {
    const e = custom([
      card('T001', choice([{ op: 'queueCard', cardId: 'T003', delayMonths: 5 }, { op: 'queueCard', cardId: 'T002', delayMonths: 2 }], { timeMonths: 10 })),
      card('T002', choice(), choice(), { trigger: 'followup' }), card('T003', choice(), choice(), { trigger: 'followup' }),
    ]);
    let s = play(e, demo(e), 'T001');
    expect([s.elapsedMonths, s.remainingWaitMonths, s.offeredCard?.cardId]).toEqual([2, 8, 'T002']);
    s = play(e, s, 'T002'); s = e.advanceTime(s);
    expect([s.elapsedMonths, s.remainingWaitMonths, s.offeredCard?.cardId]).toEqual([5, 5, 'T003']);
    s = play(e, s, 'T003'); s = e.advanceTime(s);
    expect([s.elapsedMonths, s.remainingWaitMonths]).toEqual([10, 0]);
  });
  it('saman kuun työt valmistuvat ennen jonokortteja; tasatilanteen järjestys säilyy latauksessa', () => {
    const e = custom([
      card('T001', choice([{ op: 'queueCard', cardId: 'T003', delayMonths: 2 }, { op: 'queueCard', cardId: 'T002', delayMonths: 2 }, { op: 'queueCard', cardId: 'T003', delayMonths: 1 }],
        { delayed: [{ jobId: 'work', afterMonths: 2, completionText: 'Valmis.', effects: [{ op: 'flag', key: 'ecologyReady', value: true }] }] })),
      card('T002', choice(), choice(), { trigger: 'followup' }),
      card('T003', choice(), choice(), { trigger: 'followup', requiresAll: [{ field: 'flags.ecologyReady', operator: 'eq', value: true }] }),
    ]);
    const s = play(e, demo(e), 'T001');
    expect(s.pendingEvents).toHaveLength(2);
    const restored = e.restoreRun(e.serializeRun(s));
    expect(restored.ok).toBe(true);
    if (!restored.ok) return;
    const due = e.advanceTime(restored.state, 6);
    expect(due).toEqual(e.advanceTime(s, 6));
    expect(due.offeredCard?.cardId).toBe('T003');
    expect(due.timeline.map(t => t.kind)).toEqual(['job', 'event']);
    expect(play(e, due, 'T003').offeredCard?.cardId).toBe('T002');
  });
  it('epäkelpo tapahtuma säilyy odottamassa ja sen ehto tarkastetaan myöhemmin', () => {
    const e = custom([
      card('T001', choice([{ op: 'queueCard', cardId: 'T002', delayMonths: 1 }])),
      card('T002', choice(), choice(), { trigger: 'followup', requiresAll: [{ field: 'flags.ecologyReady', operator: 'eq', value: true }] }),
      card('T003', choice([{ op: 'flag', key: 'ecologyReady', value: true }])),
    ]);
    let s = e.advanceTime(play(e, demo(e), 'T001'), 4);
    expect(s.offeredCard).toBeNull(); expect(s.pendingEvents[0]!.status).toBe('pending');
    s = play(e, s, 'T003'); expect(s.offeredCard?.cardId).toBe('T002');
  });
  it.each<Side>(['left', 'right'])('H001 %s jonottaa vain oman haaransa', side => {
    let s = engine.setDemoPhase(demo(), '03');
    expect(engine.getEligibleCards(s).some(c => c.id === 'H002' || c.id === 'H003')).toBe(false);
    expect(() => engine.offerCard(s, 'H002')).toThrow();
    s = play(engine, s, 'H001', side);
    const expected = side === 'left' ? 'H002' : 'H003';
    expect(s.pendingEvents.map(e => e.cardId)).toEqual([expected]);
    expect(s.offeredCard?.cardId).toBe(expected); expect(s.elapsedMonths).toBe(1);
    s = play(engine, s, expected);
    expect(s.pendingEvents.every(e => e.status === 'consumed')).toBe(true);
    expect(s.offeredCard).toBeNull();
  });
  it('keskeneräinen työ, etukäteistulos ja tarjottu kortti säilyvät latauksessa', () => {
    let s = engine.setDemoPhase(demo(), '04');
    s = play(engine, s, 'P024'); s = engine.advanceTime(s, 5);
    expect(s.flags.windMeasured).toBe(false); expect(s.revealedSite.windClass).toBeUndefined();
    expect(s.jobs[0]!.result.windClass).toBe(s.site.windClass);
    const restored = engine.restoreRun(engine.serializeRun(s));
    expect(restored.ok).toBe(true); if (!restored.ok) return;
    const a = engine.advanceTime(s, 7), b = engine.advanceTime(restored.state, 7);
    expect(b).toEqual(a); expect(a.revealedSite.windClass).toBe(s.site.windClass);
    expect(a.offeredCard?.cardId).toBe(s.site.windClass === 'weak' ? 'P025' : 'P026');
    const offered = engine.restoreRun(engine.serializeRun(a));
    expect(offered.ok && offered.state.offeredCard).toEqual(a.offeredCard);
    expect(engine.getDerivedStats(play(engine, a, a.offeredCard!.cardId)).windMWac).toBe(160);
  });
  it('esiselvitys ei aloita mittausta eikä luo piilevää riskiä', () => {
    const s = engine.setDemoPhase(demo(), '04'), after = play(engine, s, 'P024', 'right');
    expect(after.jobs).toHaveLength(0); expect(after.site).toEqual(s.site);
    expect(after.flags.windMeasured).toBe(false);
  });
  it('yli 96 kuukauden raja pysäyttää pitkän odotuksen', () => {
    const s = engine.advanceTime(demo(), 120);
    expect(s.elapsedMonths).toBe(RULES.maxMonths + 1); expect(s.ending).toBe('timeLimit');
  });
});

describe('tallennuksen validointi ja prologin integraatioraja', () => {
  it('puuttuva tunnettu lippu on false; tuntematonta lippua ei hyväksytä', () => {
    const s = structuredClone(demo()); delete s.flags.ecologyReady;
    const result = engine.restoreRun(JSON.stringify(s));
    expect(result.ok && result.state.flags.ecologyReady).toBe(false);
    s.flags.unknown = true;
    expect(engine.restoreRun(JSON.stringify(s)).ok).toBe(false);
  });
  it.each(['{broken', '{"schemaVersion":"999"}', 'null', '[]'])('virheellinen tallennus säilyy palautettavaksi: %s', raw => {
    const result = engine.restoreRun(raw);
    expect(result.ok).toBe(false);
    if (!result.ok) { expect(result.recoverableRaw).toBe(raw); expect(result.error.length).toBeGreaterThan(0); }
  });
  it('rakenteeltaan rikkoutunut tai eri sisällön tallennus säilytetään', () => {
    for (const mutate of [
      (s: RunState) => { s.rngState = -1; }, (s: RunState) => { s.contentVersion = 'future'; },
      (s: RunState) => { s.contentFingerprint = 'different'; }, (s: RunState) => { s.grid.segments.push(s.grid.segments[0]!); },
      (s: RunState) => { s.site.windClass = 'wrong' as 'weak'; },
      (s: RunState) => { s.jobs[0]!.dueAt = 0; }, (s: RunState) => { s.jobs[0]!.effects = [{ op: 'magic' } as unknown as Effect]; },
    ]) {
      const s = structuredClone(play(engine, demo(), 'P009')); mutate(s);
      const raw = JSON.stringify(s), result = engine.restoreRun(raw);
      expect(result.ok).toBe(false); if (!result.ok) expect(result.recoverableRaw).toBe(raw);
    }
  });
  it.each<Side>(['left', 'right'])('manifestin 12 päätöksen %s-polku toimii nimettyinä vaihefixtureina', side => {
    let s = demo();
    for (const step of manifest.demo.demoFlow) {
      s = engine.setDemoPhase(s, step.phase as RunState['phase']);
      if ('queuedOneOf' in step && step.queuedOneOf) {
        if (!s.offeredCard) s = engine.advanceTime(s);
        expect(step.queuedOneOf).toContain(s.offeredCard?.cardId);
        s = play(engine, s, s.offeredCard!.cardId);
      } else if ('cardId' in step && step.cardId) {
        if (step.cardId === 'P005') s = engine.offerDemoMilestone(s);
        s = play(engine, s, step.cardId, step.cardId === 'H001' ? side : 'left');
      }
    }
    expect(s.decisionLog).toHaveLength(12); expect(s.ending).toBeNull();
    expect(s.flags.adoptionGatesSatisfied).toBe(false); expect(s.flags.adoptionDecisionPositive).toBe(false);
    expect(s.jobs.some(j => j.status === 'active')).toBe(true);
  });
});
