import { writeFileSync } from "node:fs";
import {
  CONTENT_VERSION,
  createGame,
  currentDecision,
  choose,
  continueStory,
  token,
  randomUnit,
} from "../dist/game/kaava-game.js";
const count = Number(process.argv[2] ?? 3000);
if (!Number.isInteger(count) || count < 100 || count > 30000)
  throw new Error("100–30000 seeds per strategy");
const safe = ["special","oldRoad","commission","smaller","now","workshop","fund","avoid","solarAvoid","moveNoise","moveHeight","wetland","respond","removeEdge","updateNatura","renew","supplement","defend"];
const report = {
  version: "swipe-2",
  contentVersion: CONTENT_VERSION,
  seedsPerStrategy: count,
  totalRuns: count * 3,
  strategies: {},
  failures: [],
  mode: process.argv[3] ?? "all",
};
for (const strategy of ["random", "careful", "risky"]) {
  const result = {
    external: 0,
    choices: 0,
    ready: 0,
    minDecisions: 18,
    maxDecisions: 0,
    stageExternals: [0, 0, 0, 0],
    modes: { wind: 0, solar: 0, hybrid: 0 },
  };
  for (let i = 0; i < count; i++) {
    const mode = process.argv[3] ?? ["wind", "solar", "hybrid"][i % 3];
    let s = createGame(`balance-${i}`, mode),
      steps = 0;
    try {
      while (!s.ending && steps++ < 90) {
        if (s.stories.length) s = continueStory(s, token(s));
        else {
          const c = currentDecision(s);
          let side;
          if (strategy === "random")
            side =
              randomUnit(s.run.seed, `player-${s.cursor}`) < 0.5
                ? "left"
                : "right";
          else {
            const desired =
              strategy === "risky"
                ? ({
                    nature: "relocate",
                    natura: "keepNatura",
                    leases: "keepLease",
                  }[c.id] ?? safe[s.cursor])
                : safe[s.cursor];
            side = c.choices.left.action === desired ? "left" : "right";
          }
          s = choose(s, token(s), side);
        }
      }
      if (!s.ending) throw new Error("deadlock");
      result[s.ending]++;
      result.modes[mode]++;
      if (s.ending === "external")
        result.stageExternals[s.world.externalStage]++;
      result.minDecisions = Math.min(result.minDecisions, s.cursor);
      result.maxDecisions = Math.max(result.maxDecisions, s.cursor);
    } catch (e) {
      report.failures.push({ seed: s.run.seed, strategy, error: String(e) });
    }
  }
  report.strategies[strategy] = result;
  console.log(strategy, JSON.stringify(result));
}
report.randomWithinTarget = Object.values(report.strategies.random)
  .slice(0, 3)
  .every((n) => Math.abs(n / count - 1 / 3) < 0.035);
writeFileSync(
  new URL(`../reports/swipe-balance-${CONTENT_VERSION}-${count}${process.argv[3] ? "-"+process.argv[3] : ""}.json`, import.meta.url),
  JSON.stringify(report, null, 2) + "\n",
);
if (report.failures.length || !report.randomWithinTarget) process.exitCode = 1;
