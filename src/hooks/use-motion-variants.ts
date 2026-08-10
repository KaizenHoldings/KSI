"use client";

import { useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

import { groupVariants, staticVariants } from "@/config/motion";
import { useHydrated } from "@/hooks/use-hydrated";

/**
 * Returns the site's motion variants, or inert equivalents when the visitor
 * has asked for reduced motion. Content is visible either way — the animation
 * is the enhancement, never the thing that reveals the page.
 */
export function useMotionVariants(variants: Variants): Variants {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  
  // During SSR and initial hydration, pretend no reduced motion to match the server output
  const reduce = hydrated ? prefersReducedMotion : false;
  return reduce ? staticVariants : variants;
}

export function useGroupVariants(stagger?: number, delay?: number): Variants {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  
  const reduce = hydrated ? prefersReducedMotion : false;
  return reduce ? staticVariants : groupVariants(stagger, delay);
}
