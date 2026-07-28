"use client";

import { useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

import { groupVariants, staticVariants } from "@/config/motion";

/**
 * Returns the site's motion variants, or inert equivalents when the visitor
 * has asked for reduced motion. Content is visible either way — the animation
 * is the enhancement, never the thing that reveals the page.
 */
export function useMotionVariants(variants: Variants): Variants {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? staticVariants : variants;
}

export function useGroupVariants(stagger?: number, delay?: number): Variants {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? staticVariants : groupVariants(stagger, delay);
}
