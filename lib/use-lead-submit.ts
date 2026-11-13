"use client";

import { useState } from "react";
import { trackLead } from "@/lib/analytics";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Posts a lead payload to /api/leads (implemented in Phase 5).
 * Returns status + a user-friendly error message.
 */
export function useLeadSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: unknown): Promise<boolean> => {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(
          data?.error ??
            (res.status === 429
              ? "Too many requests. Please try again in a few minutes."
              : "Something went wrong. Please try again or message us on WhatsApp."),
        );
      }
      setStatus("success");
      const src = (payload as { source?: unknown } | null)?.source;
      trackLead(typeof src === "string" ? src : "unknown");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error. Please try again.");
      setStatus("error");
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
  };

  return { status, error, submit, reset };
}
