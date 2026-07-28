"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { transitions } from "@/config/motion";
import { cn } from "@/lib/cn";
import type { FaqEntry } from "@/types/content";

interface FaqAccordionProps {
  readonly entries: readonly FaqEntry[];
}

/**
 * Disclosure list. Each question is a real button with `aria-expanded`, the
 * answer keeps its heading association, and opening one closes the rest so the
 * reading position never jumps far.
 */
export function FaqAccordion({ entries }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(entries[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();

  return (
    <ul className="mx-auto max-w-3xl">
      {entries.map((entry) => {
        const isOpen = entry.id === openId;
        const buttonId = `${baseId}-${entry.id}-button`;
        const panelId = `${baseId}-${entry.id}-panel`;

        return (
          <li
            key={entry.id}
            className={cn(
              "mb-2.5 overflow-hidden rounded-md border bg-white transition-[border-color,box-shadow] duration-300",
              isOpen
                ? "border-teal shadow-[var(--shadow-subtle)]"
                : "border-line hover:border-line-strong",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : entry.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left sm:px-6",
                  "font-display text-[1rem] leading-snug font-semibold text-navy",
                  "transition-colors duration-200 hover:text-teal-dark",
                )}
              >
                {entry.question}

                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                    "transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-brand)]",
                    isOpen
                      ? "rotate-45 border-teal-dark bg-teal-dark text-white"
                      : "border-line text-teal-dark",
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={
                    prefersReducedMotion
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={transitions.collapse}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[0.96rem] leading-relaxed text-content-secondary sm:px-6 sm:pb-6">
                    {entry.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
