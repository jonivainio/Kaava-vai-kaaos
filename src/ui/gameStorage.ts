import { restoreGame, serializeGame } from "../game";
import type { Game } from "../game";
export const GAME_KEY = "kaava-vai-kaaos:swipe:2";
export const BACKUP_KEY = "kaava-vai-kaaos:swipe:recoverable";
export const OLD_KEY = "kaava-vai-kaaos:campaign:1";
export const TUTORIAL_KEY = "kaava-vai-kaaos:swipe:tutorial";
export function readSaved() {
  try {
    const raw = localStorage.getItem(GAME_KEY);
    return raw ? restoreGame(raw) : null;
  } catch {
    return null;
  }
}
export function saveCurrent(s: Game) {
  const raw = localStorage.getItem(GAME_KEY);
  if (raw && !restoreGame(raw).ok) localStorage.setItem(BACKUP_KEY, raw);
  localStorage.setItem(GAME_KEY, serializeGame(s));
}
export function recovery() {
  try {
    return localStorage.getItem(BACKUP_KEY) || localStorage.getItem(OLD_KEY);
  } catch {
    return null;
  }
}
export function tutorialDone() {
  try {
    return localStorage.getItem(TUTORIAL_KEY) === "done";
  } catch {
    return false;
  }
}
export function markTutorialDone() {
  try {
    localStorage.setItem(TUTORIAL_KEY, "done");
  } catch {
    /* Cosmetic preference; the game still works. */
  }
}
export function exportText(raw: string, name = "kaava-pelikerta.json") {
  const url = URL.createObjectURL(
      new Blob([raw], { type: "application/json" }),
    ),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function requestGameFullscreen() {
  if (
    window.matchMedia("(pointer: coarse)").matches &&
    document.fullscreenEnabled &&
    !document.fullscreenElement
  )
    void document.documentElement
      .requestFullscreen({ navigationUI: "hide" })
      .catch(() => {});
}
