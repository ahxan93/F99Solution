"use client";

import dynamic from "next/dynamic";
import { useIdle } from "@/lib/use-idle";

const CookieConsent = dynamic(
  () => import("./cookie-consent").then((m) => m.CookieConsent),
  { ssr: false },
);

/** Loads the cookie banner chunk 2.5 s after load, once idle, keeping it out of the first bundle. */
export function DeferredCookieConsent() {
  return useIdle(2500) ? <CookieConsent /> : null;
}
