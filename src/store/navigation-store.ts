import { create } from "zustand";

/**
 * Open state of the mobile navigation. Shared by the header trigger, the panel
 * and the scrim, which sit in different parts of the tree — not persisted,
 * since a menu should never survive a reload.
 */

interface NavigationState {
  readonly isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useNavigationStore = create<NavigationState>()((set) => ({
  isMenuOpen: false,
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
}));
