import {
  type ChemicalReaction as BackendChemicalReaction,
  type QuizQuestion as BackendQuizQuestion,
  type ReactivityMetal as BackendReactivityMetal,
  createActor,
} from "@/backend";
import type {
  ChemicalReaction,
  QuizQuestion,
  ReactivityMetal,
} from "@/types/chemistry";
import { useQuery } from "@tanstack/react-query";

// Canister ID comes from environment (injected by Vite via vite-plugin-environment)
declare const process: { env: Record<string, string | undefined> };
function getCanisterId(): string {
  return (
    (typeof process !== "undefined" && process.env?.CANISTER_ID_BACKEND) || ""
  );
}

function getActor() {
  const canisterId = getCanisterId();
  if (!canisterId) return null;
  const noopUpload = async () => new Uint8Array();
  const noopDownload = async () => ({ directURL: "" }) as never;
  return createActor(canisterId, noopUpload, noopDownload);
}

// ── Type mappers (backend bigint → number if needed) ───────────────────────
function mapMetal(m: BackendReactivityMetal): ReactivityMetal {
  return {
    ...m,
    rank: m.rank,
    reactions: m.reactions.map((r) => ({ ...r })),
  };
}

function mapReaction(r: BackendChemicalReaction): ChemicalReaction {
  return {
    ...r,
    reactants: r.reactants.map((x) => ({ ...x })),
    products: r.products.map((x) => ({ ...x })),
  };
}

function mapQuiz(q: BackendQuizQuestion): QuizQuestion {
  return { ...q };
}

// ── Hooks ──────────────────────────────────────────────────────────────────

export function useReactivitySeries() {
  return useQuery<ReactivityMetal[]>({
    queryKey: ["reactivity-series"],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return [];
      const data = await actor.getReactivitySeries();
      return data.map(mapMetal);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useReactivityMetal(symbol: string | null) {
  return useQuery<ReactivityMetal | null>({
    queryKey: ["reactivity-metal", symbol],
    queryFn: async () => {
      if (!symbol) return null;
      const actor = getActor();
      if (!actor) return null;
      const data = await actor.getReactivityMetal(symbol);
      return data ? mapMetal(data) : null;
    },
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000,
  });
}

export function useReactions(searchTerm?: string) {
  return useQuery<ChemicalReaction[]>({
    queryKey: ["reactions", searchTerm ?? "all"],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return [];
      const data = searchTerm
        ? await actor.searchReactions(searchTerm)
        : await actor.getReactions();
      return data.map(mapReaction);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useReaction(id: string | null) {
  return useQuery<ChemicalReaction | null>({
    queryKey: ["reaction", id],
    queryFn: async () => {
      if (!id) return null;
      const actor = getActor();
      if (!actor) return null;
      const data = await actor.getReaction(id);
      return data ? mapReaction(data) : null;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useQuizQuestions(difficulty: string, topic: string) {
  return useQuery<QuizQuestion[]>({
    queryKey: ["quiz-questions", difficulty, topic],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return [];
      const data = await actor.getQuizQuestions(difficulty, topic);
      return data.map(mapQuiz);
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useQuizQuestion(id: string | null) {
  return useQuery<QuizQuestion | null>({
    queryKey: ["quiz-question", id],
    queryFn: async () => {
      if (!id) return null;
      const actor = getActor();
      if (!actor) return null;
      const data = await actor.getQuizQuestion(id);
      return data ? mapQuiz(data) : null;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}
