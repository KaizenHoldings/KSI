"use client";

import { useMemo } from "react";

import { BrandLockup } from "@/components/layout/brand-lockup";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { CreativeButton } from "@/components/ui/creative-button";
import { siteConfig } from "@/config/site";
import { primaryCta, primaryNav, sectionIds } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { usePageScrolled } from "@/hooks/use-page-scrolled";
import { cn } from "@/lib/cn";
import { useNavigationStore } from "@/store/navigation-store";

export function SiteHeader() {
  const scrolled = usePageScrolled(24);
  const openMenu = useNavigationStore((state) => state.openMenu);

  const watchedIds = useMemo(
    () => primaryNav.map((link) => link.href.replace("#", "")),
    [],
  );
  const activeId = useActiveSection(watchedIds);

  return (
    <>
      <a
        href="#contenido"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1200]",
          "focus:rounded-pill focus:bg-navy focus:px-5 focus:py-3",
          "focus:font-display focus:text-sm focus:font-semibold focus:text-white",
        )}
      >
        Ir al contenido principal
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] border-b transition-[background-color,box-shadow,border-color]",
          "duration-300 ease-[var(--ease-brand)]",
          "bg-white",
          scrolled
            ? "border-line shadow-[0_1px_20px_-10px_rgb(0_40_60/0.4)]"
            : "border-transparent",
        )}
      >
        <Container className="flex h-[var(--header-height)] items-center justify-between gap-3 xl:gap-6">
          <a
            href={`#${sectionIds.hero}`}
            className="rounded-sm py-1"
            aria-label={`${siteConfig.name} — Ir al inicio`}
          >
            <BrandLockup />
          </a>

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeId === id;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative flex min-h-11 items-center rounded-sm px-2 xl:px-3",
                        "font-display text-[0.83rem] font-medium transition-colors duration-200 xl:text-[0.875rem]",
                        isActive
                          ? "text-teal-dark"
                          : "text-navy hover:text-teal-dark",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-2 bottom-1.5 h-0.5 origin-left rounded-pill bg-teal-dark xl:inset-x-3",
                          "transition-transform duration-300 ease-[var(--ease-brand)]",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* The wrapper owns the responsive display so it never competes
                with the button's own `inline-flex`. */}
            <div className="hidden sm:block">
              <CreativeButton
                href={primaryCta.href}
                label={primaryCta.label}
                variant="light"
                size="md"
              />
            </div>

            <button
              type="button"
              onClick={openMenu}
              aria-label="Abrir menú de navegación"
              aria-haspopup="dialog"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-sm lg:hidden",
                "text-navy transition-colors duration-200 hover:bg-tint",
                "cursor-pointer",
              )}
            >
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-0.5 w-6 rounded-pill bg-current" />
                <span className="block h-0.5 w-6 rounded-pill bg-current" />
                <span className="block h-0.5 w-4 rounded-pill bg-current" />
              </span>
            </button>
          </div>
        </Container>
      </header>

      <MobileNav activeId={activeId} />
    </>
  );
}
