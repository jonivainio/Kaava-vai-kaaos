import { describe, expect, it } from "vitest";
import { branchId, branchText, content, entry, interpolate } from "../src/game/v5/content";
import audit from "../docs/v5/SOURCE_AUDIT.json";
import { initialState } from "../src/game/v5/state";
import { openCase } from "../src/game/v5/operations";
import { playerText } from "../src/game/v5";

describe("v5 K01–K07: faithful player-field import", () => {
  it("preserves every indexed decision, event, bracketed ID and changed type", () => {
    expect(content.filter(item => !item.id.startsWith("LP1-"))).toHaveLength(248);
    expect(content.filter(item => item.kind === "decision" && !item.id.startsWith("LP1-"))).toHaveLength(159);
    expect(content.filter(item => item.kind === "event" && !item.id.startsWith("LP1-"))).toHaveLength(89);
    expect(content.filter(item => item.id.startsWith("interludes["))).toHaveLength(13);
    expect(entry("P3-SOPIMUS").kind).toBe("decision");
    for (const id of ["UUSI-P1-02", "UUSI-P1-10", "BESS-P1-04", "initiative", "programme"]) expect(() => entry(id)).toThrow();
    expect(entry("land").title).toBe("Kovia vaatimuksia");
    expect(entry("land").choices.A?.label).toBe("Suostutaan sopimusmuutoksiin");
  });
  it("matches each visible field and all 143 branches to its source audit", () => {
    let branches = 0;
    for (const source of audit.entries) {
      const item = entry(source.id);
      const parsedValues = [item.title, item.body, ...item.branches.map(branch => branch.text)];
      for (const choice of Object.values(item.choices)) parsedValues.push(choice.label, choice.result, ...choice.branches.map(branch => branch.text));
      const originalValues = source.playerFields.filter(field => field.value).map(field => field.value);
      expect(parsedValues.filter(Boolean).sort()).toEqual(originalValues.sort());
      branches += source.playerFields.filter(field => field.field.startsWith("Haara — ")).length;
      expect(JSON.stringify(item)).not.toContain("CODEX / PELILOGIIKKA");
      expect(JSON.stringify(item)).not.toContain("Haara — ");
    }
    expect(branches).toBe(143);
  });
  it("requires exactly the chosen branch and refuses unresolved or cross-event branches", () => {
    expect(branchText("land", null, "A")).toBe(entry("land").choices.A?.result);
    expect(() => branchText("land", null, "B")).toThrow("Unresolved branch");
    const id = branchId("EV-SOPIMUSSIVUT", 0);
    expect(branchText("EV-SOPIMUSSIVUT", id)).toContain("Maanomistaja löytyy mökiltä");
    expect(() => branchText("EV-VOIMALALUPAUS", id)).toThrow("Invalid branch");
    expect(() => branchId("EV-SOPIMUSSIVUT", 2)).toThrow();
  });
  it("requires all substitutions and never silently truncates a source field", () => {
    expect(interpolate("{cost} € · {species}", { cost: "38 000", species: "metsäpeuran" })).toBe("38 000 € · metsäpeuran");
    expect(() => interpolate("{species}", {})).toThrow("Missing v5 text value");
    const long = "Näkyvä pitkä teksti. ".repeat(80);
    expect(interpolate(long, {})).toBe(long);
  });
  it.each([[1, "yhden", "Yksi oma voimala"], [2, "kahden", "Kaksi omaa voimalaa"], [4, "neljän", "Neljä omaa voimalaa"]] as const)("K07 count %s has correct nominative and genitive in the actual source text", (count, genitive, nominative) => {
    const game = initialState("count-grammar"), issue = openCase(game, "nature", { family: "grammar", component: "wind", count });
    expect(playerText(game, entry("nature").body, issue)).toContain(`${genitive} suunnitellun voimalapaikan`);
    expect(playerText(game, entry("noise").body, issue)).toContain(nominative);
    expect(playerText(game, entry("height-ground").body, issue)).toContain(`${genitive} voimalapaikan`);
    const text = playerText(game, entry("golden-shared").body, issue);
    expect(text).not.toContain("{");
    if (count === 1) expect(text).toContain("yksi oma paikka ongelmalliseksi");
  });
});
