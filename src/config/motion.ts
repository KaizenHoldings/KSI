import type { Transition, Variants } from "motion/react";

/**
 * One motion grammar for the whole site: an exponential ease-out rise from an
 * already-visible default. Sections orchestrate their children with a stagger
 * instead of each element animating on its own schedule.
 */

export const brandEase = [0.2, 0.7, 0.2, 1] as const;

export const transitions = {
  enter: { duration: 0.62, ease: brandEase } satisfies Transition,
  interaction: { duration: 0.24, ease: brandEase } satisfies Transition,
  exit: { duration: 0.2, ease: [0.4, 0, 1, 1] } satisfies Transition,
  collapse: { duration: 0.34, ease: brandEase } satisfies Transition,
} as const;

/** Wraps a group so its children reveal in sequence. */
export const groupVariants = (stagger = 0.075, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: transitions.enter },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.enter },
};

/** The kicker rule draws itself left-to-right; pair with `origin-left`. */
export const drawVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: transitions.enter },
};

/** A photograph settling into place: a small scale-down reads as arrival, not zoom. */
export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: brandEase },
  },
};

/** Reserved for the single headline moment in the hero. */
export const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: brandEase },
  },
};

/** Static equivalents used when the visitor asks for reduced motion. */
export const staticVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

/** `once: false` — every reveal replays each time its section re-enters the viewport. */
export const viewportRepeat = { once: false, amount: 0.2 } as const;
