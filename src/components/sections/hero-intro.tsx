"use client";

import { motion, useReducedMotion } from "motion/react";

import { CreativeButton } from "@/components/ui/creative-button";
import { groupVariants, headlineVariants, riseVariants, staticVariants } from "@/config/motion";
import { heroContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

/**
 * The page's one authored motion moment: the headline resolves out of a soft
 * blur while the supporting lines rise behind it. Everything is already in the
 * DOM and readable — the animation only sets the reading order.
 */
export function HeroIntro() {
  const prefersReducedMotion = useReducedMotion();

  const group = prefersReducedMotion ? staticVariants : groupVariants(0.11, 0.06);
  const headline = prefersReducedMotion ? staticVariants : headlineVariants;
  const rise = prefersReducedMotion ? staticVariants : riseVariants;

  return (
    <motion.div
      data-reveal=""
      initial="hidden"
      animate="visible"
      variants={group}
      className="max-w-3xl"
    >
      <motion.p
        data-reveal=""
        variants={rise}
        className="flex items-center gap-3 font-display text-[0.72rem] font-semibold tracking-[0.18em] text-on-inverse-secondary uppercase"
      >
        <span aria-hidden="true" className="h-px w-7 bg-teal-light" />
        {heroContent.eyebrow}
      </motion.p>

      <motion.h1
        id="hero-title"
        data-reveal=""
        variants={headline}
        className="mt-6 text-[clamp(2.15rem,1.1rem+4.2vw,3.65rem)] font-extrabold text-white [text-wrap:balance] [letter-spacing:-0.028em]"
      >
        {heroContent.titleLead}{" "}
        <span className="text-teal-light">{heroContent.titleAccent}</span>{" "}
        {heroContent.titleTail}
      </motion.h1>

      <motion.p
        data-reveal=""
        variants={rise}
        className="mt-6 max-w-[52ch] text-[1.08rem] leading-relaxed text-on-inverse-secondary"
      >
        {heroContent.lead}
      </motion.p>

      <motion.div
        data-reveal=""
        variants={rise}
        className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      >
        <CreativeButton
          href={`#${sectionIds.contact}`}
          label={heroContent.primaryAction}
          variant="onNavy"
          size="lg"
          className="w-full sm:w-auto"
        />

        <CreativeButton
          href={`#${sectionIds.services}`}
          label={heroContent.secondaryAction}
          variant="onNavy"
          tone="subtle"
          size="lg"
          className="w-full sm:w-auto"
        />
      </motion.div>
    </motion.div>
  );
}
