import data from "../../content/deck.fi.json";
import type { Decision, Story } from "./types";
export const CONTENT_VERSION = "swipe-fi-007";
export const STAGES = [
  "Maanvuokraus",
  "Kaava-aloite & ohjelma",
  "Selostus & kaavaluonnos",
  "Ehdotus & hyvÃ¤ksyntÃ¤",
] as const;
export const DECISIONS = data.decisions as Decision[];
export const EXTERNAL = data.external as Story[];
