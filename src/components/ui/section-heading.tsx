import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  readonly id: string;
  readonly kicker: string;
  readonly title: string;
  readonly lead?: string;
  readonly align?: "start" | "center";
  readonly tone?: "light" | "dark";
  readonly className?: string;
}

/**
 * The one heading pattern the page uses. The kicker is a named section marker,
 * not decoration: it always states which part of the story the visitor is in.
 */
export function SectionHeading({
  id,
  kicker,
  title,
  lead,
  align = "start",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 font-display text-[0.7rem] font-semibold tracking-[0.18em] uppercase",
          align === "center" && "justify-center",
          isDark ? "text-teal-light" : "text-content-accent",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-7",
            isDark ? "bg-teal-light/70" : "bg-teal-dark/60",
          )}
        />
        {kicker}
      </p>

      <h2
        id={id}
        className={cn(
          "mt-5 text-[clamp(1.75rem,1.1rem+2.6vw,2.6rem)] font-bold",
          isDark && "text-white",
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={cn(
            "mt-4 text-[1.0625rem] leading-relaxed",
            align === "center" && "mx-auto",
            isDark ? "text-on-inverse-secondary" : "text-content-secondary",
            "max-w-[58ch]",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
