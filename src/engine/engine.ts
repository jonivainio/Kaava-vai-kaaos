import { check, pilotPack, validatePack, validateEffect, ValidationError } from './content';
import { runSchema } from './state-schema';
import { buildScenario, freeze, hash, JOB_REVEALS } from './scenario';
import { getDerivedStats, MODELS, RULES, settle } from './rules';
import type { Card, CardPack, Condition, CreateRunOptions, Effect, ModelId, PendingEvent, Phase, RunState, Side } from './types';

export function createEngine(input: unknown = pilotPack) {
  const pack: CardPack = freeze(validatePack(input));
  const cards = new Map(pack.cards.map(c => [c.id, c]));
  const fingerprint = hash(JSON.stringify(pack)).toString(16);
  const cardById = (id: string): Card => { const card = cards.get(id); check(card, `Tuntematon kortti: ${id}`); return card; };

  function assertState(value: unknown): asserts value is RunState {
    const parsed = runSchema.safeParse(value);
    check(parsed.success, `Tallennuksen rakenne: ${parsed.error?.message ?? ''}`);
    const s = value as RunState;
    check(s.contentVersion === pack.packId && s.contentFingerprint === fingerprint, 'Tallennus vaatii alkuperäisen sisältöversion');
    const unique = (ids: string[], what: string) => check(new Set(ids).size === ids.length, `Päällekkäinen tunniste: ${what}`);
    unique(s.assets.windSites.map(a => a.id), 'tuulipaikka'); unique(s.assets.solarParcels.map(a => a.id), 'aurinkolohko');
    check(s.mode !== 'solar' || s.assets.windSites.every(a => a.exclusions.length > 0), 'Aurinkotilassa on aktiivinen tuulikomponentti');
    check(s.mode !== 'wind' || s.assets.solarParcels.every(a => a.exclusions.length > 0), 'Tuulitilassa on aktiivinen aurinkokomponentti');
    unique(s.grid.segments.map(a => a.id), 'johtosegmentti'); unique(s.jobs.map(j => j.id), 'työ');
    unique(s.pendingEvents.map(e => e.id), 'tapahtuma'); unique(s.decisionLog.map(d => d.token), 'päätös');
    unique(s.pendingEvents.filter(e => e.status === 'pending' || e.status === 'offered').map(e => e.cardId), 'jonokortti');
    unique(s.jobs.filter(j => j.status === 'active').map(j => j.jobId), 'aktiivinen työ');
    const sequences = [...s.jobs, ...s.pendingEvents].map(e => e.sequence);
    check(new Set(sequences).size === sequences.length && sequences.every(n => n < s.nextSequence), 'Virheellinen tapahtumajärjestys');
    for (const g of Object.values(s.assets.exclusionGroups)) {
      unique(g.windIds, 'rajausryhmän tuulipaikka'); unique(g.solarIds, 'rajausryhmän aurinkolohko');
      check(g.windIds.every(id => s.assets.windSites.some(a => a.id === id)) && g.solarIds.every(id => s.assets.solarParcels.some(a => a.id === id)), 'Rajausta ei ole sidottu kohteisiin');
    }
    for (const [key, v] of Object.entries(s.revealedSite)) check(s.site[key] === v, 'Paljastettu tieto poikkeaa skenaariosta');
    for (const j of s.jobs) {
      check(j.contentVersion === s.contentVersion && j.startedAt <= s.elapsedMonths && j.dueAt > j.startedAt, 'Virheellinen työn versio tai kellonaika');
      check(j.status === 'active' ? j.completedAt === null && j.dueAt > s.elapsedMonths : j.completedAt === j.dueAt && j.dueAt <= s.elapsedMonths, 'Virheellinen työn tila');
      for (const [key, v] of Object.entries(j.result)) check(s.site[key] === v, 'Työn tulos ei vastaa alkuskenaariota');
      check(Object.values(cardById(j.sourceCardId).choices).some(c => c.delayed.some(d => d.jobId === j.jobId &&
        d.afterMonths === j.dueAt - j.startedAt && d.completionText === j.completionText && JSON.stringify(d.effects) === JSON.stringify(j.effects))), 'Työn sisältö poikkeaa tilauksesta');
    }
    for (const e of s.pendingEvents) {
      const c = cardById(e.cardId);
      if (c.trigger === 'milestone') check(s.provenance === 'demoFixture' && c.id === 'P005' && e.source === 'demo:municipality-initiation', 'Menettelytapahtumalta puuttuu sallittu fixture');
      check(c.trigger !== 'epilogue', 'Jatkotila ei kuulu moottoriperustaan');
    }
    check(s.pendingEvents.filter(e => e.status === 'offered').length === (s.offeredCard?.eventId ? 1 : 0), 'Tarjotun tapahtuman tila on ristiriidassa');
    if (s.offeredCard) {
      cardById(s.offeredCard.cardId);
      check(!s.decisionLog.some(d => d.token === s.offeredCard!.token), 'Päätös on jo käsitelty');
      if (s.offeredCard.eventId) check(s.pendingEvents.some(e => e.id === s.offeredCard!.eventId && e.cardId === s.offeredCard!.cardId && e.status === 'offered' && e.dueAt <= s.elapsedMonths), 'Tarjotulta kortilta puuttuu erääntynyt tapahtuma');
      else check(cardById(s.offeredCard.cardId).trigger === 'ambient', 'Seurauskortilta puuttuu taustatapahtuma');
    }
    check(s.seenCardIds.length === s.decisionLog.length && s.seenCardIds.every((id, i) => s.decisionLog[i]?.cardId === id), 'Päätöshistoria on ristiriidassa');
    for (const d of s.decisionLog) {
      const card = cardById(d.cardId);
      check(d.startedAt <= d.endedAt && d.endedAt <= s.elapsedMonths && s.seenCardIds.filter(id => id === d.cardId).length <= card.maxPerRun, 'Virheellinen päätöshistoria');
    }
  }
  const output = (s: RunState) => { assertState(s); return freeze(s); };
  const copy = (s: RunState) => { assertState(s); return runSchema.parse(s); };
  function createRun(options: CreateRunOptions): RunState { return output(buildScenario(options, pack, fingerprint)); }

  function condition(s: RunState, c: Condition): boolean {
    const d = getDerivedStats(s);
    let v: unknown;
    if (c.field === 'wind.count') v = d.windCount;
    else if (c.field === 'solar.hectares') v = d.solarHa;
    else if (c.field.startsWith('flags.')) v = s.flags[c.field.slice(6)];
    else if (c.field.startsWith('site.')) v = s.site[c.field.slice(5)];
    else if (c.field.startsWith('tracks.')) v = s.tracks[c.field.slice(7)];
    else if (c.field === 'economicsIndex' || c.field === 'windYieldIndex') v = s[c.field];
    else v = s.resources[c.field as keyof typeof s.resources];
    if (c.operator === 'eq') return v === c.value;
    if (c.operator === 'neq') return v !== c.value;
    check(typeof v === 'number' && typeof c.value === 'number', 'Numeerisen ehdon domainvirhe');
    switch (c.operator) {
      case 'gt': return v > c.value; case 'gte': return v >= c.value;
      case 'lt': return v < c.value; case 'lte': return v <= c.value;
    }
  }
  function eligible(s: RunState, c: Card) {
    return !s.ending && c.modes.includes(s.mode) && c.phases.includes(s.phase) &&
      s.seenCardIds.filter(id => id === c.id).length < c.maxPerRun && c.requiresAll.every(r => condition(s, r));
  }
  function nextEvent(s: RunState): PendingEvent | undefined {
    return s.pendingEvents.filter(e => e.status === 'pending' && e.dueAt <= s.elapsedMonths && eligible(s, cardById(e.cardId)))
      .sort((a, b) => a.dueAt - b.dueAt || a.sequence - b.sequence)[0];
  }
  function offerEvent(s: RunState) {
    if (s.offeredCard || s.ending) return;
    const event = nextEvent(s);
    if (!event) return;
    event.status = 'offered';
    s.offeredCard = { cardId: event.cardId, token: `${s.runId}:offer:${s.nextSequence++}`, eventId: event.id };
    s.timeline.push({ month: s.elapsedMonths, kind: 'event', reference: event.id, text: event.cardId });
  }
  function getEligibleCards(s: RunState): readonly Card[] {
    assertState(s);
    if (s.offeredCard || nextEvent(s) || s.remainingWaitMonths > 0) return [];
    return pack.cards.filter(c => c.trigger === 'ambient' && eligible(s, c));
  }
  function offerCard(state: RunState, cardId: string): RunState {
    const s = copy(state), card = cardById(cardId);
    check(!s.offeredCard && !nextEvent(s) && s.remainingWaitMonths === 0, 'Ratkaise tarjottu tapahtuma tai jatka keskeytynyt odotus ensin');
    check(card.trigger === 'ambient' && eligible(s, card), `Kortti ei ole kelvollinen: ${cardId}`);
    s.offeredCard = { cardId, token: `${s.runId}:offer:${s.nextSequence++}`, eventId: null };
    return output(s);
  }
  function offerDemoMilestone(state: RunState): RunState {
    const s = copy(state);
    check(s.provenance === 'demoFixture' && !s.offeredCard && !nextEvent(s) && s.remainingWaitMonths === 0 && eligible(s, cardById('P005')), 'Kunnan aloituspäätöksen fixture ei ole kelvollinen');
    const sequence = s.nextSequence++;
    s.pendingEvents.push({ id: `${s.runId}:event:${sequence}`, sequence, cardId: 'P005', dueAt: s.elapsedMonths, source: 'demo:municipality-initiation', status: 'pending' });
    offerEvent(s);
    return output(s);
  }
  function queue(s: RunState, cardId: string, delay: number, source: string) {
    const card = cardById(cardId);
    check(card.trigger !== 'milestone' && card.trigger !== 'epilogue', 'Menettelytapahtuma tarvitsee myöhemmän menettelymallin');
    if (s.seenCardIds.filter(id => id === cardId).length >= card.maxPerRun || s.pendingEvents.some(e => e.cardId === cardId && (e.status === 'pending' || e.status === 'offered'))) return;
    const sequence = s.nextSequence++;
    s.pendingEvents.push({ id: `${s.runId}:event:${sequence}`, sequence, cardId, dueAt: s.elapsedMonths + delay, source, status: 'pending' });
  }
  function exclude(s: RunState, e: Extract<Effect, { op: 'windRemove' | 'solarRemove' }>) {
    const g = s.assets.exclusionGroups[e.reason];
    check(g, `Skenaariovirhe: tuntematon rajaus ${e.reason}`);
    let requested: number, newLoss = 0;
    if (e.op === 'windRemove') {
      check(s.mode !== 'solar' && g.windIds.length >= e.count, 'Skenaariovirhe: tuulirajauksessa ei ole luvattuja kohteita');
      requested = e.count;
      for (const id of g.windIds.slice(0, e.count)) {
        const a = s.assets.windSites.find(a => a.id === id)!;
        if (!a.exclusions.length) newLoss++;
        if (!a.exclusions.includes(e.reason)) a.exclusions.push(e.reason);
      }
    } else {
      requested = e.hectares;
      const targets = g.solarIds.map(id => s.assets.solarParcels.find(a => a.id === id)!);
      check(s.mode !== 'wind' && targets.reduce((n, a) => n + a.hectares, 0) + 1e-9 >= requested, 'Skenaariovirhe: aurinkorajauksessa ei ole luvattua alaa');
      let left = requested;
      for (const a of targets) {
        if (left <= 1e-9) break;
        const amount = Math.min(left, a.hectares);
        if (amount < a.hectares - 1e-9) {
          const tail = { ...a, id: `${a.id}:split:${s.nextSequence++}`, hectares: a.hectares - amount, exclusions: [...a.exclusions] };
          s.assets.solarParcels.push(tail); a.hectares = amount;
          for (const group of Object.values(s.assets.exclusionGroups)) {
            const index = group.solarIds.indexOf(a.id);
            if (index >= 0) group.solarIds.splice(index + 1, 0, tail.id);
          }
        }
        if (!a.exclusions.length) newLoss += amount;
        if (!a.exclusions.includes(e.reason)) a.exclusions.push(e.reason);
        left -= amount;
      }
    }
    const unit = e.op === 'windRemove' ? 'kpl' : 'ha';
    s.timeline.push({ month: s.elapsedMonths, kind: 'exclusion', reference: e.reason,
      text: `${requested} ${unit} rajattu; ${requested - newLoss} ${unit} oli jo pois; uusi menetys ${newLoss} ${unit}.` });
  }
  function effects(s: RunState, list: Effect[], source: string) {
    for (const e of list) {
      switch (e.op) {
        case 'adjust':
          if (e.field === 'economicsIndex' || e.field === 'windYieldIndex') s[e.field] += e.value;
          else s.resources[e.field] += e.value;
          break;
        case 'flag': s.flags[e.key] = e.value; break;
        case 'track': s.tracks[e.key] = e.value; break;
        case 'windRemove': case 'solarRemove': exclude(s, e); break;
        case 'heightCap': s.windHeightCapM = Math.min(s.windHeightCapM, e.metres); break;
        case 'gridDistance': {
          const active = s.grid.segments.filter(g => g.active);
          check(active.length === 1, 'Pilotin reittikäsky vaatii yhden ulkoisen segmentin');
          const segment = active[0]!;
          const km = segment.km + e.deltaKm;
          check(km >= 0, 'Liittymän pituus ei voi olla negatiivinen');
          s.grid.routeHistory.push({ segmentId: segment.id, month: s.elapsedMonths, previousKm: segment.km, km, revision: segment.revision + 1 });
          segment.km = km; segment.revision++;
          s.grid.technicalStatus = 'reviewNeeded'; s.flags.gridRouteStudyNeeded = true;
          break;
        }
        case 'queueCard': queue(s, e.cardId, e.delayMonths, source); break;
        case 'pivot': {
          check(s.mode === 'hybrid' && !s.flags.pivotUsed && s.flags.hybridPivotAvailable, 'Suunnanvaihto ei ole käytettävissä');
          const d = getDerivedStats(s);
          check(e.mode === 'wind' ? d.windCompatible && d.windMWac >= RULES.minWindMWac && d.windExternalKm <= RULES.maxWindGridKm : d.solarMWac >= RULES.minSolarMWac && d.solarExternalKm <= RULES.maxSolarGridKm, 'Suunnanvaihdon jäljelle jäävä hanke ei täytä pelirajoja');
          for (const a of e.mode === 'wind' ? s.assets.solarParcels : s.assets.windSites) if (!a.exclusions.includes('pivot')) a.exclusions.push('pivot');
          for (const g of s.grid.segments) if (g.component !== 'shared' && g.component !== e.mode) g.active = false;
          s.mode = e.mode; s.flags.pivotUsed = true; s.flags.hybridPivotAvailable = false;
          s.timeline.push({ month: s.elapsedMonths, kind: 'pivot', reference: source, text: e.mode });
          break;
        }
        case 'finish':
          check(e.ending !== 'planAdopted', 'Kaavavoitto edellyttää menettelymallia; moottoriperusta ei myönnä hyväksymisportteja');
          s.ending = e.ending; break;
        default: throw new ValidationError(`Tuntematon käsky: ${JSON.stringify(e)}`);
      }
    }
  }
  function completeJobs(s: RunState) {
    for (const job of s.jobs.filter(j => j.status === 'active' && j.dueAt <= s.elapsedMonths).sort((a, b) => a.dueAt - b.dueAt || a.sequence - b.sequence)) {
      effects(s, job.effects, job.id);
      job.status = 'completed'; job.completedAt = s.elapsedMonths;
      Object.assign(s.revealedSite, job.result);
      s.timeline.push({ month: s.elapsedMonths, kind: 'job', reference: job.id, text: job.completionText });
      // The two explicit result classes of the pilot's actual measurement job.
      if (job.jobId === 'wind_measurement') {
        const id = job.result.windClass === 'weak' ? 'P025' : 'P026';
        if (cards.has(id)) queue(s, id, 0, job.id);
      }
    }
  }
  function moveClock(s: RunState, months: number) {
    const target = s.elapsedMonths + months;
    check(Number.isSafeInteger(target), 'Kellon ylivuoto');
    while (!s.ending) {
      completeJobs(s);
      offerEvent(s);
      if (s.offeredCard || s.ending || s.elapsedMonths === target || s.elapsedMonths > RULES.maxMonths) break;
      const future = [...s.jobs.filter(j => j.status === 'active').map(j => j.dueAt),
        ...s.pendingEvents.filter(e => e.status === 'pending' && e.dueAt > s.elapsedMonths).map(e => e.dueAt), RULES.maxMonths + 1];
      s.elapsedMonths = Math.min(target, ...future.filter(t => t > s.elapsedMonths));
    }
    s.remainingWaitMonths += target - s.elapsedMonths;
    settle(s);
    if (!s.ending && s.flags.hybridPivotAvailable && !s.flags.pivotUsed && cards.has('P048')) {
      queue(s, 'P048', 0, 'rules:hybrid-minimum');
      offerEvent(s);
    }
  }
  function applyChoice(state: RunState, token: string, side: Side): RunState {
    const s = copy(state);
    check(side === 'left' || side === 'right', 'Tuntematon valintasuunta');
    const offer = s.offeredCard;
    check(!s.ending && offer && offer.token === token && !s.decisionLog.some(d => d.token === token), 'Päätös puuttuu, on vanhentunut tai jo käsitelty');
    const card = cardById(offer.cardId);
    check(eligible(s, card), 'Tarjotun kortin ehdot eivät enää täyty');
    const choice = card.choices[side], startedAt = s.elapsedMonths;
    effects(s, choice.effects, card.id);
    for (const d of choice.delayed) {
      check(!s.jobs.some(j => j.jobId === d.jobId && j.status === 'active'), `Työ on jo käynnissä: ${d.jobId}`);
      const sequence = s.nextSequence++;
      s.jobs.push({ id: `${s.runId}:job:${sequence}`, jobId: d.jobId, sourceCardId: card.id, contentVersion: s.contentVersion,
        sequence, startedAt, dueAt: startedAt + d.afterMonths, status: 'active', completedAt: null, completionText: d.completionText,
        effects: structuredClone(d.effects), result: Object.fromEntries((JOB_REVEALS[d.jobId] ?? []).map(key => [key, s.site[key]!])) });
    }
    s.seenCardIds.push(card.id);
    if (offer.eventId) s.pendingEvents.find(e => e.id === offer.eventId)!.status = 'consumed';
    for (const e of s.pendingEvents) if (e.cardId === card.id && e.status === 'pending' && s.seenCardIds.filter(id => id === card.id).length >= card.maxPerRun) e.status = 'cancelled';
    s.offeredCard = null;
    moveClock(s, choice.timeMonths);
    s.offeredOutcomeState = { cardId: card.id, side, text: choice.outcomeText, month: s.elapsedMonths };
    s.decisionLog.push({ token, cardId: card.id, side, startedAt, endedAt: s.elapsedMonths });
    return output(s);
  }
  function previewChoice(state: RunState, token: string, side: Side) {
    const projected = applyChoice(state, token, side);
    return freeze({ stats: getDerivedStats(projected), resources: projected.resources,
      economicsIndex: projected.economicsIndex, ending: projected.ending, elapsedMonths: projected.elapsedMonths,
      remainingWaitMonths: projected.remainingWaitMonths, outcomeText: projected.offeredOutcomeState!.text,
      newTimeline: projected.timeline.slice(state.timeline.length),
      jobs: projected.jobs.map(j => ({ jobId: j.jobId, dueAt: j.dueAt, status: j.status })) });
  }
  function advanceTime(state: RunState, months = 0): RunState {
    const s = copy(state);
    check(Number.isSafeInteger(months) && months >= 0, 'Odotuksen pitää olla ei-negatiivinen kokonaiskuukausi');
    check(!s.ending && !s.offeredCard, 'Ratkaise kortti ennen kellon jatkamista');
    const total = months + s.remainingWaitMonths; s.remainingWaitMonths = 0;
    moveClock(s, total);
    return output(s);
  }
  function setDemoPhase(state: RunState, phase: Phase): RunState {
    const s = copy(state);
    check(s.provenance === 'demoFixture' && !s.ending && ['01', '02', '03', '04'].includes(phase), 'Vaihefixture sallitaan vain erikseen merkityssä prologissa');
    if (s.phase === phase) return output(s);
    check(!s.offeredCard, 'Ratkaise tarjottu kortti ennen vaiheen vaihtamista');
    s.phase = phase; offerEvent(s);
    return output(s);
  }
  function serializeRun(s: RunState): string { assertState(s); return JSON.stringify(s); }
  function restoreRun(raw: string): { ok: true; state: RunState } | { ok: false; error: string; recoverableRaw: string } {
    try {
      const s = runSchema.parse(JSON.parse(raw)); assertState(s);
      return { ok: true, state: freeze(s) };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : String(error), recoverableRaw: raw };
    }
  }
  // Procedure-only physical resolutions. They cannot write permission gates or invent effect commands.
  function applyProcedureEffects(state: RunState, list: Effect[]) {
    const s = copy(state);
    check(!s.offeredCard && !s.ending, 'Menettelyratkaisu vaatii ratkaistun kortin');
    for (const e of list) { validateEffect(e); check(['windRemove', 'solarRemove', 'heightCap', 'gridDistance', 'adjust'].includes(e.op), 'Menettelyn fyysinen ratkaisu ei kirjoita portteja'); }
    effects(s, list, 'procedure'); settle(s); return output(s);
  }
  function selectProcedureModel(state: RunState, modelId: ModelId) {
    const s = copy(state), model = MODELS[modelId];
    check(!s.offeredCard && !s.ending && model && s.windHeightCapM >= model.minHeight, 'Malli ei sovi menettelyn korkeusrajaan');
    s.selectedModelId = modelId;
    for (const a of s.assets.windSites) if (!a.exclusions.length) { a.modelId = modelId; a.totalHeightM = Math.min(s.windHeightCapM, model.maxHeight); }
    settle(s); return output(s);
  }
  function confirmProcedureGrid(state: RunState, limitMWac: number) {
    const s = copy(state);
    check(!s.offeredCard && !s.ending && Number.isFinite(limitMWac) && limitMWac > 0 && limitMWac <= getDerivedStats(s).combinedNameplateMWac, 'Vientirajan pitää sopia selvitettyyn hankkeeseen');
    s.grid.exportLimitMWac=limitMWac; s.grid.technicalStatus='confirmed';s.tracks.grid='contracted';return output(s);
  }
  return { createRun, getDerivedStats, getEligibleCards, offerCard, applyChoice, previewChoice, advanceTime, serializeRun, restoreRun, setDemoPhase, offerDemoMilestone, applyProcedureEffects, selectProcedureModel, confirmProcedureGrid };
}
