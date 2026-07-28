import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionTone = "surface" | "soft" | "neutral" | "inverse" | "accent";

const toneStyles: Record<SectionTone, string> = {
  surface: "bg-surface text-content",
  soft: "bg-surface-soft text-content",
  neutral: "bg-surface-neutral text-content",
  inverse: "on-inverse bg-navy text-on-inverse",
  accent: "on-inverse bg-teal-dark text-on-inverse",
};

interface SectionProps {
  readonly id?: string;
  readonly tone?: SectionTone;
  /** `tight` and `loose` create the density variation across the scroll. */
  readonly density?: "tight" | "default" | "loose";
  readonly className?: string;
  readonly labelledBy?: string;
  readonly children: ReactNode;
}

const densityStyles = {
  tight: "py-14 sm:py-16 lg:py-20",
  default: "py-18 sm:py-22 lg:py-28",
  loose: "py-22 sm:py-28 lg:py-36",
} as const;

export function Section({
  id,
  tone = "surface",
  density = "default",
  className,
  labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative isolate",
        toneStyles[tone],
        densityStyles[density],
        className,
      )}
    >
      {children}
    </section>
  );
}
