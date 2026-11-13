"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

const SEEN_KEY = "exit-intent-shown-v1";
/** Don't trigger in the first seconds — it feels hostile and catches accidental mouse moves. */
const MIN_TIME_MS = 8000;

const hasSeen = (): boolean => {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return true; // can't remember it → don't risk nagging
  }
};
const markSeen = () => {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
};

/**
 * Offers the free audit when a desktop visitor moves the cursor out through the
 * top of the window. Shows at most once per browser and is fully dismissible
 * (X button, Esc, click outside).
 */
export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { status, error, submit } = useLeadSubmit();

  useEffect(() => {
    if (hasSeen()) return;
    const start = Date.now();
    let fired = false;

    const onLeave = (e: MouseEvent) => {
      if (fired || e.clientY > 0 || e.relatedTarget) return;
      if (Date.now() - start < MIN_TIME_MS) return;
      fired = true;
      markSeen();
      setOpen(true);
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { exitIntentSchema } = await import("@/lib/validators"); // Zod loads on submit only
    const parsed = exitIntentSchema.safeParse({ source: "exit-intent", email, hp });
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }
    setLocalError(null);
    await submit(parsed.data);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="border-border bg-surface fixed top-1/2 left-1/2 z-[90] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border p-8 shadow-2xl">
          <Dialog.Close
            aria-label="Close"
            className="text-muted hover:text-foreground absolute top-4 right-4 rounded-full p-1.5"
          >
            <X className="size-5" />
          </Dialog.Close>

          {status === "success" ? (
            <div role="status" className="py-4 text-center">
              <CheckCircle2 className="text-success mx-auto size-12" aria-hidden="true" />
              <Dialog.Title className="mt-4 text-2xl font-bold">
                You&apos;re on the list!
              </Dialog.Title>
              <Dialog.Description className="text-muted mt-2">
                We&apos;ll email you shortly to get your free audit started.
              </Dialog.Description>
            </div>
          ) : (
            <>
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
                Before you go
              </p>
              <Dialog.Title className="font-display mt-2 text-2xl leading-tight font-bold">
                Get a free website &amp; marketing audit
              </Dialog.Title>
              <Dialog.Description className="text-muted mt-2 text-sm">
                Leave your email and we&apos;ll send a personalised review with quick wins — no
                obligation.
              </Dialog.Description>
              <form onSubmit={onSubmit} noValidate className="relative mt-5 space-y-3">
                <label htmlFor="exit-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="exit-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!(localError ?? error)}
                  className={inputClass}
                />
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </div>
                {(localError ?? error) && (
                  <p role="alert" className="text-danger text-xs">
                    {localError ?? error}
                  </p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    "Send me the free audit"
                  )}
                </Button>
              </form>
              <Dialog.Close className="text-muted hover:text-foreground mt-4 block w-full text-center text-xs underline">
                No thanks
              </Dialog.Close>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
