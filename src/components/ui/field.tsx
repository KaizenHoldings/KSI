import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const controlStyles = [
  "w-full rounded-sm border bg-white px-4 py-3 text-[0.95rem] text-content",
  "transition-[border-color,box-shadow] duration-200",
  "placeholder:text-muted/70",
  "hover:border-line-strong",
  "focus:border-teal-dark focus:outline-none focus:ring-3 focus:ring-teal/25",
  "disabled:cursor-not-allowed disabled:bg-pearl disabled:text-muted",
].join(" ");

interface FieldShellProps {
  readonly id: string;
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly optional?: boolean;
  readonly children: ReactNode;
}

/** Label, hint and error live in one place so every control behaves alike. */
function FieldShell({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: FieldShellProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 font-display text-[0.82rem] font-semibold text-navy"
      >
        {label}
        {optional ? (
          <span className="font-sans text-[0.75rem] font-normal text-muted">
            Opcional
          </span>
        ) : null}
      </label>

      <div className="mt-2">{children}</div>

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[0.82rem] text-red"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16.5v.01" />
          </svg>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.8rem] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly optional?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

export function TextField({
  id,
  label,
  hint,
  error,
  optional,
  ...rest
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      optional={optional}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={cn(
          controlStyles,
          "min-h-12",
          error ? "border-red" : "border-line",
        )}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly optional?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;

export function TextAreaField({
  id,
  label,
  hint,
  error,
  optional,
  rows = 4,
  ...rest
}: TextAreaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      optional={optional}
    >
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={cn(
          controlStyles,
          "resize-y",
          error ? "border-red" : "border-line",
        )}
        {...rest}
      />
    </FieldShell>
  );
}
