"use client";

import { motion, useReducedMotion } from "motion/react";

import { brandEase, groupVariants, riseVariants, staticVariants, viewportOnce } from "@/config/motion";
import { processContent } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * "Del capital al retorno" is the one claim the page can actually dramatise, so
 * the connecting rail draws itself once as the stages arrive. The line is
 * decoration only — every stage reads identically without it.
 */
export function ProcessRail() {
  const prefersReducedMotion = useReducedMotion();

  const group = prefersReducedMotion ? staticVariants : groupVariants(0.1);
  const item = prefersReducedMotion ? staticVariants : riseVariants;

  return (
    <motion.ol
      data-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={group}
      className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-4"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-7 right-[8.33%] left-[8.33%] hidden h-px lg:block"
      >
        <motion.span
          className="block h-px w-full origin-left bg-[repeating-linear-gradient(90deg,var(--color-teal)_0_6px,transparent_6px_13px)]"
          initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
          whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.15, ease: brandEase, delay: 0.15 }}
        />
      </span>

      {processContent.steps.map((step, index) => (
        <motion.li
          key={step.id}
          data-reveal=""
          variants={item}
          className="relative flex flex-col items-center text-center"
        >
          <span
            aria-hidden="true"
            className={cn(
              "tabular relative z-1 flex h-14 w-14 items-center justify-center rounded-full",
              "border-2 border-teal bg-white font-display text-[1.05rem] font-extrabold text-teal-dark",
              "shadow-[0_4px_10px_-4px_rgb(0_40_60/0.18)]",
            )}
          >
            {index + 1}
          </span>

          <h3 className="mt-4 font-display text-[0.94rem] font-semibold text-navy">
            <span className="sr-only">{`Etapa ${index + 1}: `}</span>
            {step.title}
          </h3>
          <p className="mt-1.5 max-w-[22ch] text-[0.85rem] leading-relaxed text-content-secondary">
            {step.description}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
