import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "border-border bg-background placeholder:text-muted/70 focus:border-accent aria-[invalid=true]:border-danger h-12 w-full rounded-xl border px-4 text-sm outline-none transition-colors";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && (
          <span className="text-danger ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-muted text-xs">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-danger text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

/** Visually hidden spam trap — bots fill it, humans never see it. */
export function Honeypot(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
