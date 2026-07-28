import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  readonly as?: ElementType;
  readonly className?: string;
  readonly children: ReactNode;
}

/** The single horizontal rhythm every section shares. */
export function Container({
  as: Component = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[var(--container-site)] px-5 sm:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </Component>
  );
}
