// Chemistry types aligned with backend.d.ts bindings

// ── Gamification types ─────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  xpReward: number;
  condition: string; // human-readable condition description
  unlockedAt?: number; // timestamp when unlocked
}

export interface GamificationState {
  xp: number;
  level: number;
  achievements: Achievement[];
  lastActivity: number;
}

export interface MetalReaction {
  reactionType: string;
  partner: string;
  equation: string;
  observation: string;
}

export interface ReactivityMetal {
  symbol: string;
  name: string;
  rank: bigint;
  reactions: MetalReaction[];
  interestingFacts: string[];
}

export interface ChemicalReactant {
  symbol: string;
  name: string;
  coefficient: bigint;
}

export interface ChemicalProduct {
  symbol: string;
  name: string;
  formula: string;
  coefficient: bigint;
}

export interface ChemicalReaction {
  id: string;
  name: string;
  reactants: ChemicalReactant[];
  products: ChemicalProduct[];
  balancedEquation: string;
  reactionType: string;
  energyChange: string;
  description: string;
  observations: string[];
}

export interface QuizQuestion {
  id: string;
  questionType: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  topic: string;
}

export type QuizDifficulty = "easy" | "medium" | "hard";
export type PracticeMode = "easy" | "medium" | "hard";

export interface QuizHistoryEntry {
  questionId: string;
  correct: boolean;
  timestamp: number;
}

// ── Exam Mode types ────────────────────────────────────────────────────────────

export type ExamChapter =
  // Class 11
  | "Some Basic Concepts"
  | "Atomic Structure"
  | "Classification of Elements"
  | "Chemical Bonding"
  | "States of Matter"
  | "Thermodynamics"
  | "Equilibrium"
  | "Redox Reactions"
  | "Hydrogen"
  | "s-Block Elements"
  | "p-Block Elements"
  | "Organic Chemistry Basics"
  | "Hydrocarbons"
  // Class 12
  | "Solutions"
  | "Electrochemistry"
  | "Chemical Kinetics"
  | "Surface Chemistry"
  | "d and f Block Elements"
  | "Coordination Compounds"
  | "Haloalkanes"
  | "Alcohols Phenols Ethers"
  | "Aldehydes Ketones"
  | "Amines"
  | "Biomolecules"
  | "Polymers";

export interface ExamConfig {
  chapter: ExamChapter;
  durationMinutes: 15 | 30 | 45 | 60;
  questionCount: 10 | 20 | 30;
}

export interface ExamQuestionResult {
  questionId: string;
  questionType: string;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  isCorrect: boolean;
  isMarkedForReview: boolean;
  explanation: string;
}

export interface ExamResult {
  id: string;
  chapter: ExamChapter;
  config: ExamConfig;
  startedAt: number;
  completedAt: number;
  timeTakenSeconds: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
  maxScore: number;
  percentage: number;
  accuracy: number;
  breakdownByType: {
    mcq: { attempted: number; correct: number; total: number };
    numerical: { attempted: number; correct: number; total: number };
    assertion: { attempted: number; correct: number; total: number };
  };
  questionResults: ExamQuestionResult[];
}
