import { restoreCampaign, serializeCampaign } from "../campaign";
import type { Campaign } from "../campaign";
export const SAVE_KEY = "kaava-vai-kaaos:campaign:1";
export const RECOVERY_KEY = "kaava-vai-kaaos:recoverable";
export function readRecovery() {
  try {
    return localStorage.getItem(RECOVERY_KEY);
  } catch {
    return null;
  }
}
export function saveGame(state: Campaign) {
  const previous = localStorage.getItem(SAVE_KEY);
  if (previous && !restoreCampaign(previous).ok)
    localStorage.setItem(RECOVERY_KEY, previous);
  localStorage.setItem(SAVE_KEY, serializeCampaign(state));
}
export function readGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? restoreCampaign(raw) : null;
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : String(e),
      recoverableRaw: "",
    };
  }
}
export function downloadText(text: string, name: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
