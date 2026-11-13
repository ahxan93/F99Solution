"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a "lead" conversion to whichever trackers are loaded. Safe no-op otherwise. */
export function trackLead(source: string): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", { lead_source: source });
    window.fbq?.("track", "Lead", { content_name: source });
    window.dataLayer?.push({ event: "generate_lead", lead_source: source });
  } catch {
    /* tracking must never break the form */
  }
}
