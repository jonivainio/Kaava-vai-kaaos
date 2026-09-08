import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createGame, choose, continueStory, currentDecision, sourceChoice, token } from '../dist/v5/index.js';
const count = Number(process.argv[2] ?? 3000), prefix = process.argv[3] ?? 'v5-development';
const strategy = process.argv[4] ?? 'random';
if (!['random', 'canonical-a', 'canonical-b', 'cautious', 'economy', 'scope'].includes(strategy)) throw new Error('Unknown strategy');
// Published policies use only the visible card identity and canonical choices.
// No policy reads a world observation, a queued outcome or an unrevealed deadline.
const policies = {
  cautious: new Set(['UUSI-P3-02', 'UUSI-P3-12', 'UUSI-P4-08']),
  economy: new Set(['land', 'land-index', 'land-minimum', 'surveys', 'surveys-spring', 'surveys-access', 'surveys-team',
    'research', 'research-gps', 'research-cumulative', 'research-seasons', 'BESS-P1-01', 'BESS-P2-04', 'UUSI-P1-06', 'UUSI-P1-03',
    'UUSI-P4-VUOKRAJATKO', 'noise', 'noise-neighbour-model', 'noise-neighbour-layout', 'noise-joint', 'UUSI-P3-10', 'UUSI-P4-02', 'feedback::noise']),
  scope: new Set(['nature', 'golden-known', 'golden-unknown', 'golden-shared', 'UUSI-P3-04', 'nature-reindeer-calving',
    'nature-reindeer-route', 'nature-squirrel', 'nature-bird-area', 'herding-pasture', 'solarNature', 'solar-frog-basin', 'solar-pond',
    'solar-ditch', 'solar-water', 'solar-squirrel', 'solar-nest-water', 'solar-bird-area', 'UUSI-P3-03', 'natura', 'natura-review', 'natura-season',
    'noise', 'noise-neighbour-model', 'noise-neighbour-layout', 'noise-joint', 'UUSI-P3-10', 'hearing-mitigation']),
};
if (!Number.isInteger(count) || count < 1 || count > 100000 || !/^[a-z0-9-]+$/.test(prefix)) throw new Error('Invalid simulation arguments');
function draw(seed, step) {
  let n = 2166136261;
  for (const char of `${seed}:strategy:${step}`) { n ^= char.charCodeAt(0); n = Math.imul(n, 16777619); }
  n ^= n >>> 16; n = Math.imul(n, 0x7feb352d); n ^= n >>> 15;
  return (n >>> 0) / 4294967296;
}
const report = { prefix, count, strategy, strategyDescription: strategy === 'random' ? 'Reference: independent 50/50 canonical A/B; no hidden state' : policies[strategy] ? `${strategy}: published card-ID policy; no hidden state` : `Always canonical ${strategy.endsWith('a') ? 'A' : 'B'}; no hidden state`,
  bundleSha256: createHash('sha256').update(readFileSync(new URL('../dist/v5/index.js', import.meta.url))).digest('hex'),
  sourceSha256: JSON.parse(readFileSync(new URL('../content/v5.fi.json', import.meta.url), 'utf8')).sourceSha256,
  startedAt: new Date().toISOString(), policy: policies[strategy] ? { default: 'A', chooseB: [...policies[strategy]] } : null,
  endings: {}, plannedExternal: 0, actualExternal: 0, errors: [], decisions: {}, branches: {},
  lengths: [], months: [], avoidableMonths: [], scores: [], examples: {}, seen: {}, contentVersion: null, rulesVersion: null };
for (let i = 0; i < count; i++) {
  const seed = `${prefix}-${i}`;
  let game = createGame(seed);
  report.contentVersion = game.contentVersion; report.rulesVersion = game.rulesVersion;
  if (game.world.externalStage !== null) report.plannedExternal++;
  try {
    let turns = 0;
    while ((!game.ending || game.scenes.length) && turns++ < 600) {
      const previous = game;
      if (currentDecision(game)) {
        const canonical = policies[strategy] ? policies[strategy].has(game.scenes[0].id) ? 'B' : 'A' :
          strategy === 'canonical-a' ? 'A' : strategy === 'canonical-b' ? 'B' : draw(seed, game.decisions.length) < 0.5 ? 'A' : 'B';
        game = choose(game, token(game), sourceChoice(game, 'left') === canonical ? 'left' : 'right');
      } else game = continueStory(game, token(game));
      if (game === previous) throw new Error('No progress');
    }
    if (!game.ending) throw new Error('Turn guard reached');
    const category = game.ending.kind === 'owner' ? game.ending.originalCause ?? 'owner' : game.ending.kind;
    report.endings[category] = (report.endings[category] ?? 0) + 1;
    if (category === 'external') report.actualExternal++;
    report.examples[category] ??= seed;
    report.lengths.push(game.decisions.length); report.months.push(game.calendar.now); report.avoidableMonths.push(game.calendar.avoidableCriticalDelayMonths);
    if (game.ending.score) report.scores.push(game.ending.score.total);
  } catch (error) { report.errors.push({ seed, token: token(game), error: String(error) }); }
  for (const d of game.decisions) report.decisions[`${d.contentId}/${d.choice}`] = (report.decisions[`${d.contentId}/${d.choice}`] ?? 0) + 1;
  for (const id of game.seenIds) report.seen[id] = (report.seen[id] ?? 0) + 1;
  for (const o of game.outcomes.filter(o => o.status === 'revealed')) {
    const key = `${o.contentId}/${o.branchId ?? 'single'}`;
    report.branches[key] = (report.branches[key] ?? 0) + 1;
  }
  if ((i + 1) % 500 === 0) process.stdout.write(`${i + 1}/${count}: ${report.errors.length} runtime errors\n`);
}
mkdirSync('reports/v5/simulation', { recursive: true });
writeFileSync(`reports/v5/simulation/${prefix}${strategy === 'random' ? '' : `--${strategy}`}.json`, JSON.stringify(report, null, 2) + '\n');
process.stdout.write(JSON.stringify({ count, endings: report.endings, plannedExternal: report.plannedExternal, actualExternal: report.actualExternal,
  errors: report.errors.length, firstErrors: report.errors.slice(0, 8), choicesVisited: Object.keys(report.decisions).length,
  resultsVisited: Object.keys(report.branches).length, examples: report.examples }) + '\n');
if (report.errors.length) process.exitCode = 1;
