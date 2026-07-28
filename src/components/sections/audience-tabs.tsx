"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Icon } from "@/components/ui/icon";
import { transitions } from "@/config/motion";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/cn";
import { useAudienceStore } from "@/store/audience-store";
import type { AudienceTrack, AudienceTrackContent } from "@/types/content";

interface AudienceTabsProps {
  readonly tracks: readonly AudienceTrackContent[];
}

/**
 * Full WAI-ARIA tabs: arrows move between tabs, Home/End jump to the ends, and
 * only the selected tab is in the tab sequence. The choice is stored globally
 * because the meeting form downstream starts from the same profile.
 */
export function AudienceTabs({ tracks }: AudienceTabsProps) {
  const hydrated = useHydrated();
  const storedAudience = useAudienceStore((state) => state.audience);
  const setAudience = useAudienceStore((state) => state.setAudience);
  const prefersReducedMotion = useReducedMotion();

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Before hydration the persisted value is unknown, so both renders agree on
  // the default track and the stored one takes over on the next paint.
  const activeId: AudienceTrack = hydrated ? storedAudience : tracks[0].id;
  const activeTrack =
    tracks.find((track) => track.id === activeId) ?? tracks[0];

  const focusTab = (id: AudienceTrack) => {
    setAudience(id);
    tabRefs.current[id]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = tracks.findIndex((track) => track.id === activeTrack.id);
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % tracks.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + tracks.length) % tracks.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tracks.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    focusTab(tracks[nextIndex].id);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Perfil de interés"
        onKeyDown={onKeyDown}
        className="inline-flex w-full max-w-md gap-1 rounded-pill border border-white/18 bg-white/6 p-1 sm:w-auto"
      >
        {tracks.map((track) => {
          const isActive = track.id === activeTrack.id;

          return (
            <button
              key={track.id}
              ref={(node) => {
                tabRefs.current[track.id] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${track.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${track.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setAudience(track.id)}
              className={cn(
                "relative flex-1 cursor-pointer rounded-pill px-6 py-2.5 whitespace-nowrap",
                "font-display text-[0.9rem] font-semibold transition-colors duration-200",
                isActive ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="audience-tab-indicator"
                  aria-hidden="true"
                  className="absolute inset-0 -z-1 rounded-pill bg-teal-dark"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 36 }
                  }
                />
              ) : null}
              {track.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTrack.id}
          id={`panel-${activeTrack.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTrack.id}`}
          tabIndex={0}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={transitions.interaction}
          className="mt-8 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <p className="max-w-[56ch] text-[1rem] leading-relaxed text-on-inverse-secondary">
            {activeTrack.summary}
          </p>

          <ul className="mt-7 grid gap-px overflow-hidden rounded-md bg-white/14 sm:grid-cols-2 lg:grid-cols-3">
            {activeTrack.items.map((item) => (
              <li
                key={item.id}
                className="group flex gap-4 bg-navy px-6 py-7 transition-colors duration-300 hover:bg-white/6"
              >
                <Icon
                  name={item.icon}
                  className="mt-0.5 h-6 w-6 text-teal-light transition-colors duration-300 group-hover:text-white"
                />
                <div className="min-w-0">
                  <h3 className="text-[1rem] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-on-inverse-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
