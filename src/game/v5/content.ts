import raw from "../../../content/v5.fi.json";
import type { ContentEntry, SourceChoice } from "./types";

export const CONTENT_VERSION = `v5-fi-${raw.sourceSha256.substring(0, 12)}`;
export const content = raw.entries as ContentEntry[];
const byId = new Map(content.map(entry => [entry.id, entry]));
if (byId.size !== content.length) throw new Error("Duplicate v5 content ID");
export function entry(id: string): ContentEntry {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown v5 content ID: ${id}`);
  return found;
}
export function branchText(id: string, branchId: string | null, choice?: SourceChoice): string {
  const item = entry(id);
  const source = choice ? item.choices[choice] : item;
  if (!source) throw new Error(`Missing ${id}/${choice}`);
  if (branchId === null) {
    if (source.branches.length) throw new Error(`Unresolved branch: ${id}/${choice ?? "event"}`);
    return choice ? item.choices[choice]!.result : item.body;
  }
  const branch = source.branches.find(candidate => candidate.id === branchId);
  if (!branch) throw new Error(`Invalid branch ${id}/${choice ?? "event"}/${branchId}`);
  return branch.text;
}
/** Branch positions occur only in explicitly authored rule bindings, never guessed from prose. */
export function branchId(id: string, index: number, choice?: SourceChoice): string {
  const item = entry(id);
  const found = (choice ? item.choices[choice]?.branches : item.branches)?.[index];
  if (!found) throw new Error(`Missing source branch ${id}/${choice ?? "event"}/${index}`);
  return found.id;
}
export function interpolate(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{([A-Za-z]+)\}/g, (_, key: string) => {
    const value = values[key];
    if (value === undefined) throw new Error(`Missing v5 text value: ${key}`);
    return String(value);
  });
}
export function countWord(count: number, capital = false): string {
  if (!Number.isInteger(count) || count < 1) throw new Error("A displayed affected count must be positive");
  const value = ["", "yksi", "kaksi", "kolme", "neljä", "viisi", "kuusi", "seitsemän", "kahdeksan", "yhdeksän", "kymmenen"][count] ?? String(count);
  return capital ? value[0]!.toUpperCase() + value.substring(1) : value;
}
