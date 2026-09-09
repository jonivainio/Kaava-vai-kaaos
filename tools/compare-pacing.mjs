import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import * as before from '../.deploy/v5-before-pacing.mjs';
import * as after from '../dist/v5/index.js';
const count = Number(process.argv[2] ?? 1000);
function measure(api) {
  const report = { count, completed: 0, wins: 0, errors: [], consecutiveWaits: 0, decisions: 0, waits: 0, winningDecisions: 0,
    winningComponents: { wind: 0, solar: 0, bess: 0, shared: 0 }, batteryRuns: 0, batteryDecisions: 0 };
  for (let i = 0; i < count; i++) {
    let game = api.createGame(`pacing-compare-${i}`), previousWait = false;
    try {
      for (let turn = 0; (!game.ending || game.scenes.length) && turn < 600; turn++) {
        const waiting = game.scenes[0]?.kind === 'wait';
        if (waiting) { report.waits++; if (previousWait) report.consecutiveWaits++; }
        previousWait = waiting;
        game = api.currentDecision(game) ? api.choose(game, api.token(game), api.sourceChoice(game, 'left') === 'A' ? 'left' : 'right') : api.continueStory(game, api.token(game));
      }
      if (!game.ending) throw new Error('No ending');
      report.completed++; report.decisions += game.decisions.length;
      if (game.ending.kind === 'win') {
        report.wins++; report.winningDecisions += game.decisions.length;
        for (const d of game.decisions) report.winningComponents[game.cases[d.caseId].component]++;
        if (game.battery.status === 'included') { report.batteryRuns++; report.batteryDecisions += game.decisions.filter(d => game.cases[d.caseId].component === 'bess').length; }
      }
    } catch (error) { report.errors.push({ seed: game.run.seed, scene: game.scenes[0]?.id, error: String(error) }); }
  }
  return report;
}
const cachedBefore = process.argv.includes('--reuse-before') ? JSON.parse(readFileSync('reports/pacing/comparison.json', 'utf8')).before : null;
if (cachedBefore && cachedBefore.count !== count) throw new Error('Baseline sample size differs');
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const result = { strategy: 'canonical A, same seeds before/after; counts include required followups, exclude optional post-win epilogue',
  beforeBundleSha256: hash('.deploy/v5-before-pacing.mjs'), afterBundleSha256: hash('dist/v5/index.js'),
  before: cachedBefore ?? measure(before), after: measure(after) };
mkdirSync('reports/pacing', { recursive: true });
writeFileSync('reports/pacing/comparison.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result));
if (result.after.errors.length || result.after.consecutiveWaits) process.exitCode = 1;
