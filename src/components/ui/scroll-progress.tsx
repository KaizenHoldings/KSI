"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/cn";

interface ScrollProgressProps {
  readonly className?: string;
}

/**
 * A hairline reading-progress indicator pinned to the header's lower edge.
 * Tracks whole-document scroll directly — it reflects a physical input the
 * visitor is already driving, the same category as a scrollbar thumb, so it
 * runs regardless of the reduced-motion preference that gates entrances.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: progress }}
      className={cn(
        "absolute inset-x-0 bottom-0 h-[3px] origin-left transition-colors duration-300 ease-[var(--ease-brand)]",
        className,
      )}
    />
  );
}
