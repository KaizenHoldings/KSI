import type { SVGProps } from "react";

import { cn } from "@/lib/cn";

/**
 * One line-icon family for the whole site: 24px grid, 1.7 stroke, round caps
 * and joins, `currentColor` only. Keeping every glyph in a single registry is
 * what stops the icon language from drifting section to section.
 */
const paths = {
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12C2.7 7 7 4 12 4s9.3 3 11 8c-1.7 5-6 8-11 8S2.7 17 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  diamond: <path d="M12 3l9 7-9 11L3 10 12 3z" />,
  layers: (
    <>
      <path d="M12 4l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4M4 16l8 4 8-4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5l4 4" />
    </>
  ),
  exchange: <path d="M4 9h13l-3-3M20 15H7l3 3" />,
  coins: (
    <>
      <ellipse cx="12" cy="7" rx="6" ry="2.5" />
      <path d="M6 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7" />
      <path d="M6 12v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" />
    </>
  ),
  structure: (
    <>
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <rect x="3" y="17" width="6" height="4" rx="1" />
      <rect x="15" y="17" width="6" height="4" rx="1" />
      <path d="M12 7v5M6 17v-2h12v2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 14v3M12 10v7M16 6v11" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 7h-5M21 7v5" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7.6 7.4l3.4 9M16.4 7.4l-3.4 9M8 6h8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.5v5.4c0 4.4-3 7.2-7 8.4-4-1.2-7-4-7-8.4V5.5L12 3z" />
      <path d="M9 11.6l2 2 4-4.3" />
    </>
  ),
  scale: (
    <path d="M12 4v16M7 20h10M12 6l-5 2 2.4 5a2.5 2.5 0 01-4.8 0L7 8M12 6l5 2-2.4 5a2.5 2.5 0 004.8 0L17 8" />
  ),
  energy: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12H1M23 12h-2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>
  ),
  agro: <path d="M3 11h18M12 4v7M8 4v7M16 4v7M5 11l1 8h12l1-8" />,
  technology: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
    </>
  ),
  logistics: (
    <>
      <path d="M1 4h14v12H1z" />
      <path d="M15 8h4l4 4v4h-8V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </>
  ),
  realEstate: <path d="M3 12l9-9 9 9M5 10v10h5v-5h4v5h5V10" />,
  document: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9.5 13h6M9.5 16.5h6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4-4 7-7.4 7-11a7 7 0 10-14 0c0 3.6 3 7 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M4 12.5l5 5L20 7" />,
  whatsapp: (
    <>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5-1.4C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M8.5 8.5c.2-.5.7-1 1.2-1 .3 0 .5.1.6.2l1.4 3.2c.1.2 0 .5-.2.7l-.8.8a7 7 0 003.4 3.4l.8-.8c.2-.2.5-.3.7-.2l3.2 1.4c.2.1.3.4.2.7-.5 1.2-1.9 2-3.1 1.8-3.5-.5-7.1-4.1-7.6-7.6-.2-1.2.6-2.6 1.8-3.1z" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  readonly name: IconName;
  /** Provide a label only when the icon is the sole carrier of meaning. */
  readonly title?: string;
}

export function Icon({ name, title, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={cn("h-6 w-6 shrink-0", className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
