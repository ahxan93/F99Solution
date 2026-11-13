"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/app/admin/login/actions";
import { FormField, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

export function LoginForm({ from }: { from: string }) {
  const [error, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="from" value={from} />
      <FormField label="Email" htmlFor="login-email">
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </FormField>
      <FormField label="Password" htmlFor="login-password">
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </FormField>
      {error && (
        <p
          role="alert"
          className="border-danger/40 text-danger rounded-xl border px-4 py-3 text-sm"
        >
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
