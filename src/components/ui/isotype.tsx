import { cn } from "@/lib/cn";

interface IsotypeProps {
  readonly className?: string;
  readonly title?: string;
}

/**
 * The official KFG isotype, inlined verbatim from `iso_kfg.svg`.
 *
 * Its two vector colours (#519296 and #003144) belong to the file and are
 * never overridden, recoloured, reordered, outlined or animated part by part.
 * On dark sections it must sit on a light surface — see `IsotypeMark`.
 */
export function Isotype({ className, title }: IsotypeProps) {
  return (
    <svg
      viewBox="0 0 206.55 222.82"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={cn("block", className)}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M1065.55,776.94l0-.08h-50.23a120.75,120.75,0,0,1-71.73,78.6,180.49,180.49,0,0,1,56.21,24.73,170.24,170.24,0,0,0,65.74-103.25"
        transform="translate(-859.02 -776.86)"
        fill="#519296"
      />
      <path
        d="M987.86,888.26a165.65,165.65,0,0,0-82.57-24.65V777.23H859V999.67h46.26V913.09c50.84,1.88,95.62,36.9,110.06,86.58h50.23l0-.08a170.28,170.28,0,0,0-77.7-111.33"
        transform="translate(-859.02 -776.86)"
        fill="#003144"
      />
    </svg>
  );
}

interface IsotypeMarkProps {
  readonly className?: string;
  readonly surface?: "plain" | "light";
  readonly title?: string;
}

/**
 * The isotype with its required clear space. `surface="light"` places it on a
 * discreet light tile, which is how it is allowed to appear over navy.
 */
export function IsotypeMark({
  className,
  surface = "plain",
  title,
}: IsotypeMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        surface === "light" && "aspect-square rounded-full bg-white",
        className,
      )}
    >
      <Isotype className="h-full w-auto" title={title} />
    </span>
  );
}
