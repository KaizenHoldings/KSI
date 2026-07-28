import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

/**
 * KFG's primary call-to-action.
 *
 * At rest the label sits centred beside a small brand dot. On hover, focus or
 * press, the dot blooms into a full pill of brand colour while the label swaps
 * for a version carrying a forward arrow — one motion, three coordinated parts.
 *
 * The two label layers are stacked in a single grid cell, so the button is
 * always as wide as its widest state and nothing shifts or clips mid-animation.
 * Under `prefers-reduced-motion` the travel and the bloom are dropped and the
 * button simply changes colour, which keeps the state change unmistakable.
 */

/** Which surface the button sits on. */
export type CreativeButtonVariant = "light" | "onNavy" | "onTeal";
/** Rank within the section: one solid primary, subordinate actions subtle. */
export type CreativeButtonTone = "solid" | "subtle";
export type CreativeButtonSize = "md" | "lg";

interface ToneStyle {
  /** Applied to the interactive root. */
  readonly root: string;
  /** The seed dot and the pill it blooms into. */
  readonly fill: string;
  /** Colour the incoming label needs to clear 4.5:1 against that fill. */
  readonly hoverText: string;
  /**
   * Reduced-motion fallback: no travel, no bloom, just a decisive colour swap
   * on the root. These are `hover:` / `focus-visible:`, never `group-hover:` —
   * the root *is* the group, and `group-hover:` only matches descendants.
   */
  readonly reduced: string;
}

/**
 * Written out in full: Tailwind scans source text, so a class name assembled
 * from variables at runtime would never be generated.
 */
const REDUCED = {
  tealOnWhite: cn(
    "motion-reduce:hover:bg-teal-dark motion-reduce:hover:text-white",
    "motion-reduce:focus-visible:bg-teal-dark motion-reduce:focus-visible:text-white",
  ),
  navyOnWhite: cn(
    "motion-reduce:hover:bg-navy motion-reduce:hover:text-white",
    "motion-reduce:focus-visible:bg-navy motion-reduce:focus-visible:text-white",
  ),
  whiteOnNavy: cn(
    "motion-reduce:hover:bg-white motion-reduce:hover:text-navy",
    "motion-reduce:focus-visible:bg-white motion-reduce:focus-visible:text-navy",
  ),
} as const;

const variantStyles: Record<
  CreativeButtonVariant,
  Record<CreativeButtonTone, ToneStyle>
> = {
  light: {
    // White base, navy label, hairline brand border. Teal Dark is the member of
    // the teal family that clears 4.5:1 under white text.
    solid: {
      root: cn(
        "border-line bg-white text-navy",
        "shadow-[0_1px_2px_-1px_rgb(0_40_60/0.08),0_6px_16px_-10px_rgb(0_40_60/0.25)]",
        "hover:border-teal-dark focus-visible:border-teal-dark",
      ),
      fill: "bg-teal-dark",
      hoverText: "text-white",
      reduced: REDUCED.tealOnWhite,
    },
    subtle: {
      root: cn(
        "border-line-strong bg-transparent text-navy",
        "hover:border-teal-dark focus-visible:border-teal-dark",
      ),
      fill: "bg-teal-dark",
      hoverText: "text-white",
      reduced: REDUCED.tealOnWhite,
    },
  },
  onNavy: {
    // On navy the primary is the one lit surface in the composition.
    solid: {
      root: cn(
        "border-transparent bg-white text-navy",
        "shadow-[0_8px_24px_-14px_rgb(0_0_0/0.55)]",
      ),
      fill: "bg-teal-dark",
      hoverText: "text-white",
      reduced: REDUCED.tealOnWhite,
    },
    // The secondary stays open so the primary keeps the weight; it fills white
    // and inverts its label, the mirror of the primary's move.
    subtle: {
      root: "border-white/55 bg-transparent text-white hover:border-white focus-visible:border-white",
      fill: "bg-white",
      hoverText: "text-navy",
      reduced: REDUCED.whiteOnNavy,
    },
  },
  onTeal: {
    // On the teal band the bloom goes navy for maximum separation.
    solid: {
      root: cn(
        "border-transparent bg-white text-navy",
        "shadow-[0_8px_24px_-14px_rgb(0_0_0/0.4)]",
      ),
      fill: "bg-navy",
      hoverText: "text-white",
      reduced: REDUCED.navyOnWhite,
    },
    subtle: {
      root: "border-white/70 bg-transparent text-white hover:border-white focus-visible:border-white",
      fill: "bg-navy",
      hoverText: "text-white",
      reduced: REDUCED.navyOnWhite,
    },
  },
};

interface SizeStyle {
  readonly root: string;
  readonly label: string;
  readonly icon: string;
  /**
   * `--cb-dot` places the bloom's origin inside the leading padding, so the
   * resting dot never crowds the label. The clip radius is a fixed length,
   * which keeps the dot identical on every button width.
   */
  readonly dot: string;
}

const sizeStyles: Record<CreativeButtonSize, SizeStyle> = {
  md: {
    root: "h-11 px-5 sm:px-6 [--cb-dot:0.95rem] sm:[--cb-dot:1.1rem]",
    label: "text-[0.875rem]",
    icon: "h-4 w-4",
    dot: "[clip-path:circle(4.5px_at_var(--cb-dot)_50%)]",
  },
  lg: {
    root: "h-12.5 px-6 sm:px-7 [--cb-dot:1.1rem] sm:[--cb-dot:1.3rem]",
    label: "text-[0.94rem]",
    icon: "h-[1.05rem] w-[1.05rem]",
    dot: "[clip-path:circle(5px_at_var(--cb-dot)_50%)]",
  },
};

const rootBase = cn(
  "group relative isolate inline-flex shrink-0 items-center justify-center",
  "overflow-hidden rounded-pill border font-display font-semibold",
  "tracking-[-0.005em] whitespace-nowrap select-none",
  "cursor-pointer transition-[border-color,background-color,color,box-shadow]",
  "duration-300 ease-[var(--ease-brand)]",
  "focus-visible:outline-2 focus-visible:outline-offset-3",
  "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none",
  "aria-disabled:pointer-events-none aria-disabled:opacity-45",
);

/**
 * Two curves, each doing what it is good at.
 *
 * The bloom is a reveal that has to read as a travelling edge, so it uses a
 * gentle-in / firm-out curve — the site's `--ease-brand` is so front-loaded
 * that the fill would land in under 80ms and lose the expansion entirely.
 * The labels keep `--ease-brand`, matching every other transition on the site,
 * and settle just after the surface beneath them is finished.
 */
const BLOOM_MOTION = "duration-[400ms] ease-[cubic-bezier(0.4,0.08,0.2,1)]";
const LABEL_MOTION = "duration-[320ms] ease-[var(--ease-brand)]";

interface CreativeButtonContentProps {
  readonly label: string;
  readonly variant: CreativeButtonVariant;
  readonly tone: CreativeButtonTone;
  readonly size: CreativeButtonSize;
}

function CreativeButtonContent({
  label,
  variant,
  tone,
  size,
}: CreativeButtonContentProps) {
  const sizes = sizeStyles[size];
  const styles = variantStyles[variant][tone];

  return (
    <>
      {/* One element is both the seed dot and the bloom: a full-size pill
          revealed through a circular clip. The clip starts at a fixed radius —
          so the dot is the same size on a narrow or a full-width button — and
          opens past 100%, which always covers regardless of proportions. The
          layer is itself pill-shaped, so no square corner can ever appear. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 rounded-pill",
          "transition-[clip-path] motion-reduce:hidden",
          BLOOM_MOTION,
          sizes.dot,
          "group-hover:[clip-path:circle(150%_at_var(--cb-dot)_50%)]",
          "group-focus-visible:[clip-path:circle(150%_at_var(--cb-dot)_50%)]",
          "group-active:[clip-path:circle(150%_at_var(--cb-dot)_50%)]",
          styles.fill,
        )}
      />

      {/* Both label layers occupy one grid cell: the button is as wide as its
          widest state, so nothing reflows when they swap. */}
      <span className="grid place-items-center">
        <span
          className={cn(
            "col-start-1 row-start-1 transition-[translate,opacity]",
            LABEL_MOTION,
            sizes.label,
            "motion-safe:group-hover:translate-x-3 motion-safe:group-hover:opacity-0",
            "motion-safe:group-focus-visible:translate-x-3 motion-safe:group-focus-visible:opacity-0",
            "motion-safe:group-active:translate-x-3 motion-safe:group-active:opacity-0",
          )}
        >
          {label}
        </span>

        {/* Purely decorative duplicate — the layer above carries the name. */}
        <span
          aria-hidden="true"
          className={cn(
            "col-start-1 row-start-1 flex items-center gap-2",
            styles.hoverText,
            "-translate-x-3 opacity-0 transition-[translate,opacity]",
            LABEL_MOTION,
            sizes.label,
            "motion-reduce:hidden",
            "group-hover:translate-x-0 group-hover:opacity-100",
            "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
            "group-active:translate-x-0 group-active:opacity-100",
          )}
        >
          {label}
          <ArrowRight className={sizes.icon} strokeWidth={2.25} aria-hidden="true" />
        </span>
      </span>
    </>
  );
}

interface SharedProps {
  /** The visible, accessible label. Rendered once for assistive technology. */
  readonly label: string;
  /** The surface the button sits on. */
  readonly variant?: CreativeButtonVariant;
  /** `subtle` keeps secondary actions subordinate to the section's primary. */
  readonly tone?: CreativeButtonTone;
  readonly size?: CreativeButtonSize;
  readonly className?: string;
}

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    readonly href?: undefined;
  };

type LinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    readonly href: string;
  };

export type CreativeButtonProps = ButtonProps | LinkProps;

/** Anything that leaves the app — or a protocol handler — needs a plain anchor. */
function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:|wa\.me)/i.test(href) || href.startsWith("//");
}

function rootClassName({
  variant,
  tone,
  size,
  className,
}: Required<Pick<SharedProps, "variant" | "tone" | "size">> &
  Pick<SharedProps, "className">): string {
  const styles = variantStyles[variant][tone];
  return cn(
    rootBase,
    sizeStyles[size].root,
    styles.root,
    styles.reduced,
    className,
  );
}

export function CreativeButton(props: CreativeButtonProps): ReactNode {
  if (props.href !== undefined) {
    const {
      label,
      variant = "light",
      tone = "solid",
      size = "lg",
      className,
      href,
      ...anchorRest
    } = props;

    const root = rootClassName({ variant, tone, size, className });
    const content = (
      <CreativeButtonContent
        label={label}
        variant={variant}
        tone={tone}
        size={size}
      />
    );

    // Anything leaving the app keeps a plain anchor; in-app targets, including
    // same-page anchors, route through Next's Link.
    return isExternalHref(href) ? (
      <a href={href} className={root} {...anchorRest}>
        {content}
      </a>
    ) : (
      <Link href={href} className={root} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const {
    label,
    variant = "light",
    tone = "solid",
    size = "lg",
    className,
    type = "button",
    ...buttonRest
  } = props;

  return (
    <button
      type={type}
      className={rootClassName({ variant, tone, size, className })}
      {...buttonRest}
    >
      <CreativeButtonContent
        label={label}
        variant={variant}
        tone={tone}
        size={size}
      />
    </button>
  );
}
