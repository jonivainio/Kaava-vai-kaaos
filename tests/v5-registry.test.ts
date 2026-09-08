import { expect, it } from "vitest";
import { entry, content } from "../src/game/v5/content";
import { RULES, ruleFor } from "../src/game/v5/rules";

it("every authored decision ID has an explicit rule (identity coverage, not behavior acceptance)", () => {
  const decisions = content.filter(item => item.kind === "decision").map(item => item.id);
  expect(RULES.flatMap(rule => rule.ids).sort()).toEqual(decisions.sort());
  for (const id of decisions) expect(ruleFor(id).apply).toBeTypeOf("function");
});
it("rule IDs cannot silently point at narrative events", () => {
  for (const rule of RULES) for (const id of rule.ids) expect(entry(id).kind).toBe("decision");
  expect(() => ruleFor("unknown-command")).toThrow();
});
