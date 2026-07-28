import { IsotypeMark } from "@/components/ui/isotype";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface BrandLockupProps {
  readonly tone?: "light" | "dark";
  readonly size?: "sm" | "md";
  readonly className?: string;
}

/**
 * The digital lockup: the official isotype beside the two-line wordmark. The
 * type sits next to the symbol — it is never merged into the SVG.
 */
export function BrandLockup({
  tone = "light",
  size = "sm",
  className,
}: BrandLockupProps) {
  const isDark = tone === "dark";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <IsotypeMark
        surface={isDark ? "light" : "plain"}
        className={cn(
          size === "sm" ? "h-8" : "h-11",
          // 25% of the symbol width kept clear on every side.
          isDark && (size === "sm" ? "p-1.5" : "p-2"),
        )}
      />
      <span
        className={cn(
          "font-display font-semibold whitespace-nowrap uppercase leading-[1.3] tracking-[0.05em]",
          size === "sm" ? "text-[0.66rem]" : "text-[0.78rem]",
          isDark ? "text-white" : "text-navy",
        )}
      >
        {siteConfig.shortName}
        <br />
        <span className={cn(isDark ? "text-white/70" : "text-muted")}>
          Sociedad de Inversión
        </span>
      </span>
    </span>
  );
}
