"use client";

import dynamic from "next/dynamic";
import { useIdle } from "@/lib/use-idle";

const ExitIntentPopup = dynamic(
  () => import("./exit-intent-popup").then((m) => m.ExitIntentPopup),
  { ssr: false },
);

/** Loads the exit-intent popup (and Radix Dialog) 6 s after load (the popup itself waits 8 s anyway). */
export function DeferredExitIntent() {
  return useIdle(6000) ? <ExitIntentPopup /> : null;
}
