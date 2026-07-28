"use client";

import { useEffect, useState } from "react";

/**
 * Whether the page has scrolled past `threshold`. Reads are passive and only
 * commit state when the boolean actually flips, so the header never re-renders
 * on every scroll frame.
 */
export function usePageScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled((current) => {
        const next = window.scrollY > threshold;
        return next === current ? current : next;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
