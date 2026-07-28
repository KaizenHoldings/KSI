import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AudienceTrack } from "@/types/content";

/**
 * Which audience track the visitor identifies with. Genuinely shared state:
 * the advantages tabs set it and the meeting form reads it, and remembering it
 * across reloads spares a returning visitor from re-selecting their profile.
 *
 * Nothing here is sensitive — it is a single non-identifying preference.
 */

interface AudienceState {
  readonly audience: AudienceTrack;
  setAudience: (audience: AudienceTrack) => void;
}

export const useAudienceStore = create<AudienceState>()(
  persist(
    (set) => ({
      audience: "inversionistas",
      setAudience: (audience) => set({ audience }),
    }),
    {
      name: "kfg.audience",
      version: 1,
      partialize: (state) => ({ audience: state.audience }),
    },
  ),
);
