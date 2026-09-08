import { createGame, choose, continueStory, currentDecision, sourceChoice, token } from '../dist/v5/index.js';
function draw(seed, step) {
  let n = 2166136261;
  for (const char of `${seed}:strategy:${step}`) { n ^= char.charCodeAt(0); n = Math.imul(n, 16777619); }
  n ^= n >>> 16; n = Math.imul(n, 0x7feb352d); n ^= n >>> 15;
  return (n >>> 0) / 4294967296;
}
for (const suffix of process.argv.slice(2)) {
  const seed = suffix.startsWith('v5-') ? suffix : `v5-development-01-${suffix}`;
  let game = createGame(seed);
  const trace = [];
  try {
    for (let i = 0; i < 600 && (!game.ending || game.scenes.length); i++) {
      trace.push({ token: token(game), month: game.calendar.now, scene: game.scenes[0]?.id });
      const canonical = draw(seed, game.decisions.length) < 0.5 ? 'A' : 'B';
      game = currentDecision(game) ? choose(game, token(game), sourceChoice(game, 'left') === canonical ? 'left' : 'right') : continueStory(game, token(game));
    }
    console.log(JSON.stringify({ seed, ending: game.ending?.kind }));
  } catch (error) {
    console.log(JSON.stringify({ seed, error: String(error), trace: trace.slice(-8), procedure: game.procedure,
      issues: Object.values(game.cases).filter(c => c.facts.blocking || c.status !== 'resolved'),
      work: game.calendar.orders.filter(w => !['completed', 'cancelled'].includes(w.status)), battery: game.battery, gridResolved: game.facts.gridResolved }));
  }
}
