import { mkdirSync, writeFileSync } from "node:fs";
import {
  createCampaign,
  applyCampaignChoice,
  previewCampaignChoice,
  waitCampaign,
} from "../dist/campaign/kaava-campaign.js";
const count = Number(process.argv[2] ?? 100);
if (!Number.isInteger(count) || count < 1 || count > 10000)
  throw new Error("Use 1–10000 seeds per strategy");
const strategies = ["random", "budget", "knownRisk"];
const hash = (t) => {
  let h = 2166136261;
  for (const c of t) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
};
const choose = (s, strategy) => {
  if (strategy === "random")
    return hash(`${s.run.seed}:${s.records.length}`) % 2 ? "left" : "right";
  // Public previews only. Do not inspect s.world or unrevealed s.run.site.
  const a = previewCampaignChoice(s, "left"),
    b = previewCampaignChoice(s, "right");
  const score = (p) =>
    (strategy === "knownRisk" && p.ending && p.ending !== "readyToBuild"
      ? -10000
      : 0) +
    p.resources.budget -
    p.months * (strategy === "knownRisk" ? 1.5 : 0.1);
  return score(a) >= score(b) ? "left" : "right";
};
const report = {
  version: "rtb-1",
  seedsPerStrategy: count,
  totalRuns: count * strategies.length,
  strategies: {},
  deadlocks: [],
  exceptions: [],
};
for (const strategy of strategies) {
  const r = {
    outcomes: {},
    stages: [0, 0, 0, 0, 0, 0, 0],
    modes: {},
    minDecisions: 999,
    maxDecisions: 0,
    successfulMeanDecisions: 0,
    successfulMeanMonths: 0,
    successes: 0,
    maxRepeatedCard: 0,
    cardCounts: {},
  };
  let decisions = 0,
    months = 0;
  for (let i = 0; i < count; i++) {
    const seed = `sim-${i}`,
      mode = ["wind", "solar", "hybrid"][i % 3];
    let s;
    try {
      s = createCampaign(seed, mode);
      let steps = 0;
      while (!s.ending && steps++ < 120)
        s = s.run.offeredCard
          ? applyCampaignChoice(s, s.run.offeredCard.token, choose(s, strategy))
          : waitCampaign(s);
      if (!s.ending)
        report.deadlocks.push({ seed, mode, strategy, cursor: s.cursor });
      const outcome = s.ending ?? "deadlock";
      r.outcomes[outcome] = (r.outcomes[outcome] ?? 0) + 1;
      r.modes[mode] = (r.modes[mode] ?? 0) + 1;
      for (const stage of new Set(s.records.map((x) => x.stage)))
        r.stages[stage]++;
      r.minDecisions = Math.min(r.minDecisions, s.records.length);
      r.maxDecisions = Math.max(r.maxDecisions, s.records.length);
      const seen = {};
      for (const x of s.records) {
        seen[x.cardId] = (seen[x.cardId] ?? 0) + 1;
        r.cardCounts[x.cardId] = (r.cardCounts[x.cardId] ?? 0) + 1;
      }
      r.maxRepeatedCard = Math.max(r.maxRepeatedCard, ...Object.values(seen));
      if (s.ending === "readyToBuild") {
        r.successes++;
        decisions += s.records.length;
        months += s.run.elapsedMonths;
      }
    } catch (error) {
      report.exceptions.push({
        seed,
        mode,
        strategy,
        error: String(error),
        cursor: s?.cursor,
      });
    }
    if ((i + 1) % 100 === 0) console.log(`${strategy}: ${i + 1}/${count}`);
  }
  r.successfulMeanDecisions = r.successes ? decisions / r.successes : 0;
  r.successfulMeanMonths = r.successes ? months / r.successes : 0;
  report.strategies[strategy] = r;
}
mkdirSync(new URL("../reports/", import.meta.url), { recursive: true });
writeFileSync(
  new URL(`../reports/simulation-${count}.json`, import.meta.url),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      runs: report.totalRuns,
      deadlocks: report.deadlocks.length,
      exceptions: report.exceptions.length,
      outcomes: Object.fromEntries(
        Object.entries(report.strategies).map(([k, v]) => [k, v.outcomes]),
      ),
    },
    null,
    2,
  ),
);
if (report.deadlocks.length || report.exceptions.length) process.exitCode = 1;
