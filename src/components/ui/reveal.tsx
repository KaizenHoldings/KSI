"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { riseVariants, viewportOnce } from "@/config/motion";
import { useGroupVariants, useMotionVariants } from "@/hooks/use-motion-variants";

/**
 * Motion components are created once at module scope: building them during
 * render would hand React a new component type on every pass and remount the
 * subtree.
 */
const motionTags = {
  div: motion.div,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  section: motion.section,
  header: motion.header,
  article: motion.article,
  dl: motion.dl,
  ol: motion.ol,
} as const;

type MotionTagName = keyof typeof motionTags;

interface RevealGroupProps {
  readonly as?: MotionTagName;
  readonly stagger?: number;
  readonly delay?: number;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Orchestrates one entrance for a whole block: the group enters the viewport
 * once and hands its children a staggered rise. Children stay visible when the
 * visitor prefers reduced motion.
 */
export function RevealGroup({
  as = "div",
  stagger,
  delay,
  className,
  children,
}: RevealGroupProps) {
  const MotionTag = motionTags[as];
  const variants = useGroupVariants(stagger, delay);

  return (
    <MotionTag
      data-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  readonly as?: MotionTagName;
  readonly className?: string;
  readonly children: ReactNode;
}

/** A single participant in a `RevealGroup`. */
export function RevealItem({
  as = "div",
  className,
  children,
}: RevealItemProps) {
  const MotionTag = motionTags[as];
  const variants = useMotionVariants(riseVariants);

  return (
    <MotionTag data-reveal="" variants={variants} className={className}>
      {children}
    </MotionTag>
  );
}
