import type {
  Achievement,
  ChemicalReaction,
  ExamResult,
  GamificationState,
  PracticeMode,
  QuizHistoryEntry,
} from "@/types/chemistry";
import type { Element, ElementCategory } from "@/types/element";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Gamification helpers ──────────────────────────────────────────────────────

export function xpToLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export const ACHIEVEMENTS_CATALOG: Achievement[] = [
  {
    id: "first-step",
    title: "First Step",
    description: "Visit ChemExplorer for the first time",
    icon: "🚀",
    xpReward: 10,
    condition: "Visit the site",
  },
  {
    id: "quick-learner",
    title: "Quick Learner",
    description: "Complete 10 practice questions",
    icon: "📚",
    xpReward: 15,
    condition: "Answer 10 practice questions",
  },
  {
    id: "reaction-master",
    title: "Reaction Master",
    description: "Run 10 reactions in Reaction Lab",
    icon: "⚗️",
    xpReward: 25,
    condition: "Run 10 reactions",
  },
  {
    id: "lab-expert",
    title: "Lab Expert",
    description: "Complete 5 virtual lab experiments",
    icon: "🧪",
    xpReward: 30,
    condition: "Open 5 different lab experiment tabs",
  },
  {
    id: "carbon-specialist",
    title: "Carbon Specialist",
    description: "View all Carbon Tab sections",
    icon: "⚛️",
    xpReward: 20,
    condition: "Explore all sections of the Carbon tab",
  },
  {
    id: "element-hunter",
    title: "Element Hunter",
    description: "View details of 50 elements",
    icon: "🔍",
    xpReward: 25,
    condition: "View 50 element details",
  },
  {
    id: "formula-genius",
    title: "Formula Genius",
    description: "View 20 chemistry formulas",
    icon: "🧮",
    xpReward: 15,
    condition: "Browse 20 formulas in the Formula tab",
  },
  {
    id: "exam-champion",
    title: "Exam Champion",
    description: "Score 80% or higher on any exam",
    icon: "🏆",
    xpReward: 50,
    condition: "Score ≥ 80% on a chapter exam",
  },
  {
    id: "speed-runner",
    title: "Speed Runner",
    description: "Complete an exam in under 10 minutes",
    icon: "⚡",
    xpReward: 30,
    condition: "Finish an exam within 10 minutes",
  },
  {
    id: "streak-master",
    title: "Streak Master",
    description: "Answer 5 questions correctly in a row",
    icon: "🔥",
    xpReward: 20,
    condition: "Maintain a 5-question answer streak",
  },
  {
    id: "note-taker",
    title: "Note Taker",
    description: "Add 5 quick notes",
    icon: "📝",
    xpReward: 10,
    condition: "Create 5 notes in the Quick Notes panel",
  },
  {
    id: "molecule-builder",
    title: "Molecule Builder",
    description: "Build 3 molecules in the builder",
    icon: "🧬",
    xpReward: 20,
    condition: "Build 3 molecules",
  },
  {
    id: "atom-explorer",
    title: "Atom Explorer",
    description: "Use the Atom Tracker 3 times",
    icon: "🔬",
    xpReward: 15,
    condition: "Use Atom Tracker 3 times",
  },
];

export type NoteCategory =
  | "general"
  | "formula"
  | "reaction"
  | "concept"
  | "revision";

export interface QuickNote {
  id: string;
  text: string;
  category: NoteCategory;
  pinned: boolean;
  createdAt: number;
}

interface ChemStoreState {
  favorites: string[]; // element symbols
  recentlyViewed: string[];
  searchQuery: string;
  categoryFilter: ElementCategory | "all";
  groupFilter: number | null;
  periodFilter: number | null;
  compareElements: [string | null, string | null];

  // Temperature slider (°C)
  temperature: number;

  // Quiz / Practice state
  quizScore: number;
  quizStreak: number;
  quizHistory: QuizHistoryEntry[];
  practiceMode: PracticeMode;

  // Reaction Lab state
  selectedReactants: string[];
  reactionResult: ChemicalReaction | null;

  // Bookmarks
  bookmarkedItems: string[];

  // Quick Notes
  quickNotes: QuickNote[];

  // Exam History
  examHistory: ExamResult[];

  // Gamification
  gamification: GamificationState;
  pendingAchievement: Achievement | null;

  // Tour
  tourActive: boolean;
  startTour: () => void;
  closeTour: () => void;

  // Actions
  toggleFavorite: (symbol: string) => void;
  addRecentlyViewed: (symbol: string) => void;
  setSearchQuery: (q: string) => void;
  setCategoryFilter: (c: ElementCategory | "all") => void;
  setGroupFilter: (g: number | null) => void;
  setPeriodFilter: (p: number | null) => void;
  setCompareElement: (slot: 0 | 1, symbol: string | null) => void;
  clearCompare: () => void;

  // Temperature actions
  setTemperature: (t: number) => void;

  // Quiz actions
  recordQuizAnswer: (questionId: string, correct: boolean) => void;
  clearQuizHistory: () => void;
  setPracticeMode: (mode: PracticeMode) => void;

  // Reaction Lab actions
  setSelectedReactants: (reactants: string[]) => void;
  setReactionResult: (reaction: ChemicalReaction | null) => void;

  // Bookmark actions
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  // Quick Notes actions
  addNote: (text: string, category?: NoteCategory) => void;
  removeNote: (id: string) => void;
  togglePinNote: (id: string) => void;

  // Exam actions
  addExamResult: (result: ExamResult) => void;
  clearExamHistory: () => void;

  // Gamification actions
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  clearPendingAchievement: () => void;
}

export const useChemStore = create<ChemStoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentlyViewed: [],
      searchQuery: "",
      categoryFilter: "all",
      groupFilter: null,
      periodFilter: null,
      compareElements: [null, null],

      temperature: 25,

      quizScore: 0,
      quizStreak: 0,
      quizHistory: [],
      practiceMode: "easy",

      selectedReactants: [],
      reactionResult: null,

      bookmarkedItems: [],
      quickNotes: [],
      examHistory: [],

      gamification: {
        xp: 0,
        level: 1,
        achievements: ACHIEVEMENTS_CATALOG.map((a) => ({ ...a })),
        lastActivity: Date.now(),
      },
      pendingAchievement: null,

      tourActive: false,
      startTour: () => set({ tourActive: true }),
      closeTour: () => set({ tourActive: false }),

      toggleFavorite: (symbol) =>
        set((s) => ({
          favorites: s.favorites.includes(symbol)
            ? s.favorites.filter((f) => f !== symbol)
            : [...s.favorites, symbol],
        })),

      addRecentlyViewed: (symbol) =>
        set((s) => ({
          recentlyViewed: [
            symbol,
            ...s.recentlyViewed.filter((r) => r !== symbol),
          ].slice(0, 20),
        })),

      setSearchQuery: (q) => set({ searchQuery: q }),
      setCategoryFilter: (c) => set({ categoryFilter: c }),
      setGroupFilter: (g) => set({ groupFilter: g }),
      setPeriodFilter: (p) => set({ periodFilter: p }),

      setCompareElement: (slot, symbol) =>
        set((s) => {
          const next = [...s.compareElements] as [string | null, string | null];
          next[slot] = symbol;
          return { compareElements: next };
        }),

      clearCompare: () => set({ compareElements: [null, null] }),

      setTemperature: (t) => set({ temperature: t }),

      recordQuizAnswer: (questionId, correct) =>
        set((s) => ({
          quizScore: correct ? s.quizScore + 1 : s.quizScore,
          quizStreak: correct ? s.quizStreak + 1 : 0,
          quizHistory: [
            { questionId, correct, timestamp: Date.now() },
            ...s.quizHistory,
          ].slice(0, 100),
        })),

      clearQuizHistory: () =>
        set({ quizHistory: [], quizScore: 0, quizStreak: 0 }),

      setPracticeMode: (mode) => set({ practiceMode: mode }),

      setSelectedReactants: (reactants) =>
        set({ selectedReactants: reactants }),
      setReactionResult: (reaction) => set({ reactionResult: reaction }),

      // Bookmark actions
      addBookmark: (id) =>
        set((s) => ({
          bookmarkedItems: s.bookmarkedItems.includes(id)
            ? s.bookmarkedItems
            : [...s.bookmarkedItems, id],
        })),

      removeBookmark: (id) =>
        set((s) => ({
          bookmarkedItems: s.bookmarkedItems.filter((b) => b !== id),
        })),

      isBookmarked: (id) => get().bookmarkedItems.includes(id),

      // Quick Notes actions
      addNote: (text, category = "general") =>
        set((s) => ({
          quickNotes: [
            {
              id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              text: text.trim(),
              category,
              pinned: false,
              createdAt: Date.now(),
            },
            ...s.quickNotes,
          ].slice(0, 100),
        })),

      removeNote: (id) =>
        set((s) => ({
          quickNotes: s.quickNotes.filter((n) => n.id !== id),
        })),

      togglePinNote: (id) =>
        set((s) => ({
          quickNotes: s.quickNotes.map((n) =>
            n.id === id ? { ...n, pinned: !n.pinned } : n,
          ),
        })),

      addExamResult: (result) =>
        set((s) => ({
          examHistory: [result, ...s.examHistory].slice(0, 50),
        })),

      clearExamHistory: () => set({ examHistory: [] }),

      // ── Gamification ─────────────────────────────────────────────────────

      addXP: (amount) =>
        set((s) => {
          const newXP = s.gamification.xp + amount;
          return {
            gamification: {
              ...s.gamification,
              xp: newXP,
              level: xpToLevel(newXP),
              lastActivity: Date.now(),
            },
          };
        }),

      unlockAchievement: (id) =>
        set((s) => {
          const achievement = s.gamification.achievements.find(
            (a) => a.id === id,
          );
          if (!achievement || achievement.unlockedAt) return s;

          const newXP = s.gamification.xp + achievement.xpReward;
          return {
            gamification: {
              ...s.gamification,
              xp: newXP,
              level: xpToLevel(newXP),
              achievements: s.gamification.achievements.map((a) =>
                a.id === id ? { ...a, unlockedAt: Date.now() } : a,
              ),
              lastActivity: Date.now(),
            },
            pendingAchievement: { ...achievement, unlockedAt: Date.now() },
          };
        }),

      clearPendingAchievement: () => set({ pendingAchievement: null }),
    }),
    {
      name: "chem-explorer-store",
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
        temperature: state.temperature,
        bookmarkedItems: state.bookmarkedItems,
        quickNotes: state.quickNotes,
        quizScore: state.quizScore,
        quizHistory: state.quizHistory,
        examHistory: state.examHistory,
        gamification: state.gamification,
      }),
    },
  ),
);
