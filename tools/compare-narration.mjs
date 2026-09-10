import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import * as before from '../.deploy/v5-before-narration.mjs';
import * as after from '../dist/v5/index.js';
// Capture the published rules-2 bundle before building this change. No cached
// counts: both versions play the same seeds/choices and their mechanics compare.
const count = Number(process.argv[2] ?? 1000);
function play(api, seed, strategy) {
  let game = api.createGame(seed), turns = 0, waits = 0, consecutiveWaits = 0, previousWait = false;
  const scenes = [], updates = [];
  while ((!game.ending || game.scenes.length) && turns < 600) {
    const scene = game.scenes[0];
    const wait = scene?.kind === 'wait';
    if (wait) { waits++; if (previousWait) consecutiveWaits++; }
    previousWait = wait; scenes.push(scene?.id); updates.push(...(game.narration?.updates ?? [])); turns++;
    const choice = strategy === 'alternating' && game.decisions.length % 2 ? 'B' : strategy === 'B' ? 'B' : 'A';
    game = api.currentDecision(game) ? api.choose(game, api.token(game), api.sourceChoice(game, 'left') === choice ? 'left' : 'right') : api.continueStory(game, api.token(game));
  }
  if (!game.ending || game.scenes.length) throw new Error('Unfinished run');
  return { game, turns, waits, consecutiveWaits, scenes, updates };
}
function mechanics(game) {
  const value = structuredClone(game);
  for (const key of ['rulesVersion', 'revision', 'assetChanges', 'narration', 'actions', 'lastOutcome']) delete value[key];
  for (const decision of value.decisions) delete decision.token;
  return value;
}
const stats = () => ({ runs: 0, wins: 0, screens: 0, winningScreens: 0, waits: 0, maxWaits: 0, consecutiveWaits: 0, decisions: 0 });
const result = { count, strategies: ['A', 'B', 'alternating'], before: stats(), after: stats(), mismatches: [], errors: [],
  beforeBundleSha256: createHash('sha256').update(readFileSync('.deploy/v5-before-narration.mjs')).digest('hex'),
  afterBundleSha256: createHash('sha256').update(readFileSync('dist/v5/index.js')).digest('hex'), example: null };
for (let i = 0; i < count; i++) {
  const seed = `narration-compare-${i}`, strategy = result.strategies[i % 3];
  try {
    const a = play(before, seed, strategy), b = play(after, seed, strategy);
    if (!isDeepStrictEqual(mechanics(a.game), mechanics(b.game))) {
      const ma = mechanics(a.game), mb = mechanics(b.game);
      result.mismatches.push({ seed, strategy, fields: Object.keys(ma).filter(key => !isDeepStrictEqual(ma[key], mb[key])) });
    }
    for (const [key, run] of [['before', a], ['after', b]]) {
      const s = result[key]; s.runs++; s.screens += run.turns; s.waits += run.waits;
      s.maxWaits = Math.max(s.maxWaits, run.waits); s.consecutiveWaits += run.consecutiveWaits; s.decisions += run.game.decisions.length;
      if (run.game.ending.kind === 'win') { s.wins++; s.winningScreens += run.turns; }
    }
    if (!result.example && b.game.ending.kind === 'win') result.example = { seed, strategy, before: a.scenes, after: b.scenes, inlineUpdates: b.updates };
  } catch (error) { result.errors.push({ seed, strategy, error: String(error) }); }
}
mkdirSync('reports/narration', { recursive: true });
writeFileSync('reports/narration/comparison.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ ...result, example: result.example?.seed }));
if (result.errors.length || result.mismatches.length || result.after.maxWaits > 3 || result.after.consecutiveWaits) process.exitCode = 1;
