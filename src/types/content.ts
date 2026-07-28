import type { IconName } from "@/components/ui/icon";

/** A short titled entry with an icon — services, sectors, advantages, pillars. */
export interface ContentItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon: IconName;
}

/** One stage of the investment lifecycle. */
export interface ProcessStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

/** The two audience tracks the site serves. */
export type AudienceTrack = "inversionistas" | "empresas";

export interface AudienceTrackContent {
  readonly id: AudienceTrack;
  readonly label: string;
  readonly summary: string;
  readonly items: readonly ContentItem[];
}
