"use client";

import { motion, useReducedMotion } from "motion/react";

import { brandEase, groupVariants, riseVariants, staticVariants, viewportRepeat } from "@/config/motion";
import { Icon } from "@/components/ui/icon";
import { processContent } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * "Del capital al retorno" is the one claim the page can actually dramatise, so
 * the connecting rail redraws itself each time the stages arrive in view and
 * resolves into a filled, checked marker on the final stage — the line runs to a real
 * destination instead of just counting to six. Each stage carries its own mark
 * from the site's one line-icon family (the same registry services, sectors and
 * pillars draw from) rather than a bare number standing in for content; the
 * ledger-style index alongside the title still names the sequence explicitly.
 * Below lg the rail becomes a vertical timeline: a 2/3-column grid would strand
 * the connector and break the sequential reading order the six stages depend on.
 */
export function ProcessRail() {
  const prefersReducedMotion = useReducedMotion();
  const lastIndex = processContent.steps.length - 1;

  const group = prefersReducedMotion ? staticVariants : groupVariants(0.1);
  const item = prefersReducedMotion ? staticVariants : riseVariants;

  return (
    <motion.ol
      data-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={viewportRepeat}
      variants={group}
      className="relative flex flex-col lg:grid lg:grid-cols-6 lg:gap-x-4"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-8 right-[8.33%] left-[8.33%] hidden h-px lg:block"
      >
        <motion.span
          className="block h-px w-full origin-left bg-[repeating-linear-gradient(90deg,var(--color-teal)_0_6px,transparent_6px_13px)]"
          initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
          whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
          viewport={viewportRepeat}
          transition={{ duration: 1.15, ease: brandEase, delay: 0.15 }}
        />
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 bottom-6 left-6 w-px lg:hidden"
      >
        <motion.span
          className="block h-full w-full origin-top bg-[repeating-linear-gradient(180deg,var(--color-teal)_0_6px,transparent_6px_13px)]"
          initial={prefersReducedMotion ? undefined : { scaleY: 0 }}
          whileInView={prefersReducedMotion ? undefined : { scaleY: 1 }}
          viewport={viewportRepeat}
          transition={{ duration: 1.15, ease: brandEase, delay: 0.15 }}
        />
      </span>

      {processContent.steps.map((step, index) => {
        const isLast = index === lastIndex;

        return (
          <motion.li
            key={step.id}
            data-reveal=""
            variants={item}
            className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "relative z-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                "shadow-[0_4px_10px_-4px_rgb(0_40_60/0.18)]",
                "lg:h-16 lg:w-16",
                isLast
                  ? "border-2 border-teal-dark bg-teal-dark text-white"
                  : "border-2 border-teal bg-white text-teal-dark",
              )}
            >
              <Icon name={step.icon} className="h-5 w-5 lg:h-6 lg:w-6" />
            </span>

            <div className="min-w-0 lg:mt-5">
              <h3 className="font-display text-[1rem] leading-snug font-bold text-navy lg:text-[1.02rem]">
                <span
                  aria-hidden="true"
                  className="tabular mr-2 text-[0.75rem] font-semibold text-content-accent lg:mr-0 lg:mb-1 lg:block"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="sr-only">{`Etapa ${index + 1}: `}</span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-content-secondary lg:mx-auto lg:max-w-[23ch]">
                {step.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
