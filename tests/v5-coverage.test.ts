import { describe, expect, it } from "vitest";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { content, CONTENT_VERSION } from "../src/game/v5/content";
import { ruleFor, OUTCOMES } from "../src/game/v5/rules";
import { initialState } from "../src/game/v5/state";
import { currentDecision } from "../src/game/v5";
import { openCase } from "../src/game/v5/operations";
import { landRules } from "../src/game/v5/rules/land";
import { programmeRules } from "../src/game/v5/rules/programme";
import { natureRules } from "../src/game/v5/rules/nature";
import { environmentRules } from "../src/game/v5/rules/environment";
import { batteryRules } from "../src/game/v5/rules/battery";
import { researchRules } from "../src/game/v5/rules/research";
import { proposalRules } from "../src/game/v5/rules/proposal";
import { leaseRules } from "../src/game/v5/rules/leases";
const groups = { land: landRules, programme: programmeRules, nature: natureRules, environment: environmentRules,
  battery: batteryRules, research: researchRules, proposal: proposalRules, leases: leaseRules };
describe("v5 K60 full source-to-runtime and artwork inventory", () => {
  it("records all 248 IDs, each source branch and actual art paths without assuming a whole campaign from text import", () => {
    const rows = content.filter(item=>!item.id.startsWith("LP1-")).map(item => {
      const rule = item.kind === "decision" ? ruleFor(item.id) : null;
      const group = rule ? Object.entries(groups).find(([, rules]) => rules.some(r=>r.ids.includes(item.id)))![0] : null;
      const art = new Set<string>();
      if (rule) {
        rule.art.forEach(key => art.add(key));
        for (const mode of ["hybrid", "wind", "solar"] as const) for (let seed = 0; seed < 20; seed++) {
          const game = initialState(`art-coverage-${seed}`, mode);
          const issue = openCase(game, item.id, rule.spec(game, item.id));
          game.scenes.push({ id: item.id, kind: "decision", caseId: issue.id, branchId: null, outcomeId: null, nextStage: null });
          const shown=currentDecision(game);if(shown)art.add(shown.art);
        }
      }
      for (const key of art) expect(existsSync(`public/art/${key}.svg`), `${item.id}: ${key}`).toBe(true);
      const special = item.id.startsWith("transition-") ? "MomentArt:transition" : item.id.startsWith("LOPPU-") ? "MomentArt:ending" : item.id.startsWith("external-") || item.id.startsWith("ext-") ? "narration-paper → MomentArt:ending" : item.id === "PISTEET" ? "Score" : "narration-paper";
      const sourceBranches = [...item.branches.map(branch => ({ choice: null, id: branch.id })),
        ...(["A", "B"] as const).flatMap(choice => (item.choices[choice]?.branches ?? []).map(branch => ({ choice, id: branch.id })))];
      return { id: item.id, kind: item.kind, stage: item.stage,
        runtime: rule ? `src/game/v5/rules/${group}.ts · ruleFor(${item.id})` : OUTCOMES[item.id] ? `src/game/v5/timeline.ts · OUTCOMES[${item.id}]` : "src/game/v5/director.ts / endings.ts / epilogue.ts",
        role: rule?.role ?? "event-or-procedure", family: rule?.spec(initialState("inventory"), item.id).family ?? null,
        sourceBranches, branchTests: sourceBranches.length ? "tests/v5-results.test.ts; reports/lp1/legacy/result-branch-tests.json" : "No named source branch; see K01–K60 validation matrix",
        artKeys: [...art], artFiles: [...art].map(key => `public/art/${key}.svg`), presentation: rule ? "SwipeCard:decision" : special,
        runtimeModes: ["hybrid:subject to the registered region/component/case eligibility", "wind/solar:active mode policy; see LP1 mode audit"],
        status: "INTEGRATED_TESTED", note: "Binding/art evidence here; behavioral evidence in result-branch-tests.json and QA_V5.md. A solar-base suffix is an alias name, not a blanket hybrid exclusion. Standalone modes are implemented by LP1; this file inventories the preserved v5 source." };
    });
    expect(rows).toHaveLength(248); expect(rows.reduce((sum, row) => sum + row.sourceBranches.length, 0)).toBe(143);
    mkdirSync("reports/lp1/legacy", { recursive: true });
    writeFileSync("reports/lp1/legacy/content-coverage.json", JSON.stringify({ contentVersion: CONTENT_VERSION, rows }, null, 2) + "\n");
  });
});
