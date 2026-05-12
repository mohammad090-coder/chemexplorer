import { create } from "zustand";

export const EXPLORE_FEATURES = [
  {
    label: "Periodic Table",
    route: "/periodic-table",
    glow: "rgba(59,130,246,0.4)",
    glowColor: "#3b82f6",
    glowRgba: "rgba(59,130,246,0.4)",
  },
  {
    label: "Reaction Lab",
    route: "/reaction-lab",
    glow: "rgba(249,115,22,0.4)",
    glowColor: "#f97316",
    glowRgba: "rgba(249,115,22,0.4)",
  },
  {
    label: "Virtual Lab",
    route: "/virtual-lab",
    glow: "rgba(168,85,247,0.4)",
    glowColor: "#a855f7",
    glowRgba: "rgba(168,85,247,0.4)",
  },
  {
    label: "Molecule Builder",
    route: "/molecule-builder",
    glow: "rgba(6,182,212,0.4)",
    glowColor: "#06b6d4",
    glowRgba: "rgba(6,182,212,0.4)",
  },
  {
    label: "Carbon",
    route: "/carbon",
    glow: "rgba(34,197,94,0.4)",
    glowColor: "#22c55e",
    glowRgba: "rgba(34,197,94,0.4)",
  },
  {
    label: "Practice Mode",
    route: "/practice",
    glow: "rgba(236,72,153,0.4)",
    glowColor: "#ec4899",
    glowRgba: "rgba(236,72,153,0.4)",
  },
] as const;

interface ExploreState {
  isPopupOpen: boolean;
  isControllerVisible: boolean;
  activeFeatureIndex: number;
  isTransitioning: boolean;
  /** True while popup is playing its dismiss animation before controller appears */
  isDismissingPopup: boolean;

  openPopup: () => void;
  closePopup: () => void;
  selectFeature: (index: number) => void;
  goNext: () => void;
  goBack: () => void;
  dismissController: () => void;
  setTransitioning: (v: boolean) => void;
  setDismissingPopup: (v: boolean) => void;
}

export const useExploreStore = create<ExploreState>()((set) => ({
  isPopupOpen: false,
  isControllerVisible: false,
  activeFeatureIndex: 0,
  isTransitioning: false,
  isDismissingPopup: false,

  openPopup: () => set({ isPopupOpen: true, isDismissingPopup: false }),
  closePopup: () => set({ isPopupOpen: false, isDismissingPopup: false }),

  setDismissingPopup: (v) => set({ isDismissingPopup: v }),

  selectFeature: (index) =>
    set({
      isPopupOpen: false,
      isDismissingPopup: false,
      isControllerVisible: true,
      activeFeatureIndex: index,
      isTransitioning: false,
    }),

  goNext: () =>
    set((s) => ({
      activeFeatureIndex: Math.min(
        s.activeFeatureIndex + 1,
        EXPLORE_FEATURES.length - 1,
      ),
      isTransitioning: true,
    })),

  goBack: () =>
    set((s) => ({
      activeFeatureIndex: Math.max(s.activeFeatureIndex - 1, 0),
      isTransitioning: true,
    })),

  dismissController: () =>
    set({ isControllerVisible: false, isTransitioning: false }),

  setTransitioning: (v) => set({ isTransitioning: v }),
}));
