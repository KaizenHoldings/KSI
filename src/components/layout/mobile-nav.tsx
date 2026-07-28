"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { BrandLockup } from "@/components/layout/brand-lockup";
import { CreativeButton } from "@/components/ui/creative-button";
import { Icon } from "@/components/ui/icon";
import { transitions } from "@/config/motion";
import { primaryCta, primaryNav } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { useNavigationStore } from "@/store/navigation-store";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface MobileNavProps {
  readonly activeId: string | null;
}

export function MobileNav({ activeId }: MobileNavProps) {
  const isOpen = useNavigationStore((state) => state.isMenuOpen);
  const closeMenu = useNavigationStore((state) => state.closeMenu);
  const prefersReducedMotion = useReducedMotion();

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // The panel slides in from the edge it lives on; with reduced motion it
  // simply appears, which keeps the same spatial meaning without travel.
  const panelMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  // Escape closes, Tab stays inside the panel, and focus returns to whatever
  // opened it. Body scroll is locked so the page behind cannot drift.
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusFirst = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;

      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, closeMenu]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.interaction}
            onClick={closeMenu}
            aria-hidden="true"
            className="fixed inset-0 z-[1050] bg-navy/55 backdrop-blur-[2px] lg:hidden"
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navegación"
            {...panelMotion}
            transition={{ duration: 0.36, ease: [0.2, 0.7, 0.2, 1] }}
            className={cn(
              "on-inverse fixed inset-y-0 right-0 z-[1100] flex w-[86%] max-w-sm flex-col",
              "bg-navy shadow-[-24px_0_60px_-20px_rgb(0_0_0/0.5)] lg:hidden",
            )}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <BrandLockup tone="dark" />
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Cerrar menú"
                className={cn(
                  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm",
                  "text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav
              aria-label="Navegación móvil"
              className="flex-1 overflow-y-auto px-6 py-4"
            >
              <ul>
                {primaryNav.map((link) => {
                  const isActive = activeId === link.href.replace("#", "");

                  return (
                    <li key={link.href} className="border-b border-white/8">
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex min-h-13 items-center justify-between gap-3 py-3.5",
                          "font-display text-[1.02rem] font-medium transition-colors duration-200",
                          isActive
                            ? "text-teal-light"
                            : "text-white/85 hover:text-white",
                        )}
                      >
                        {link.label}
                        <Icon
                          name="arrowRight"
                          className={cn(
                            "h-4 w-4 transition-opacity duration-200",
                            isActive ? "opacity-100" : "opacity-35",
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-white/10 px-6 py-5">
              <CreativeButton
                href={primaryCta.href}
                onClick={closeMenu}
                label={primaryCta.label}
                variant="onNavy"
                size="lg"
                className="w-full"
              />
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
