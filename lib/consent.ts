"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie-consent state, persisted in localStorage.
 *  - "loading": server render / hydration (render nothing)
 *  - "unset":   visitor has not chosen yet (show the banner)
 *  - "granted" / "denied": their choice
 */
export type ConsentState = "loading" | "unset" | "granted" | "denied";

const KEY = "cookie-consent-v1";
const EVENT = "cookie-consent-change";

function read(): ConsentState {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset"; // storage blocked: behave as "not chosen", never load trackers
  }
}

function subscribe(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => "loading");
}

export function setConsent(value: "granted" | "denied"): void {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Re-opens the banner (used by the footer "Cookie settings" link). */
export function resetConsent(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}
