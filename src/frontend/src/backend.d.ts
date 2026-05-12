import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface ChemicalReaction {
    id: string;
    name: string;
    balancedEquation: string;
    description: string;
    reactionType: string;
    category: string;
    energyChange: string;
    products: Array<ChemicalProduct>;
    namedReaction: string;
    reactants: Array<ChemicalReactant>;
    observations: Array<string>;
}
export interface MetalReaction {
    reactionType: string;
    observation: string;
    equation: string;
    partner: string;
}
export interface ChemicalProduct {
    coefficient: bigint;
    name: string;
    formula: string;
    symbol: string;
}
export interface QuizQuestion {
    id: string;
    topic: string;
    question: string;
    difficulty: string;
    explanation: string;
    correctAnswer: string;
    questionType: string;
    options: Array<string>;
}
export interface ReactivityMetal {
    name: string;
    rank: bigint;
    interestingFacts: Array<string>;
    reactions: Array<MetalReaction>;
    symbol: string;
}
export interface ChemicalReactant {
    coefficient: bigint;
    name: string;
    symbol: string;
}
export interface Profile {
    bio: string;
    username: string;
    displayName: string;
    joinDate: Timestamp;
    userId: UserId;
    avatarUrl?: string;
}
export interface Element {
    atomicMass: number;
    electronConfiguration: string;
    ionizationEnergy: number;
    period: bigint;
    density: number;
    electronegativity: number;
    name: string;
    uses: Array<string>;
    description: string;
    meltingPoint: number;
    state: string;
    colorHex: string;
    group: bigint;
    category: string;
    block: string;
    boilingPoint: number;
    atomicNumber: bigint;
    symbol: string;
    atomicRadius: number;
    facts: Array<string>;
}
export interface ProfileInput {
    bio: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
}
export interface UserStats {
    progressScore: bigint;
    savedItemsCount: bigint;
    activityCount: bigint;
}
export interface backendInterface {
    getAllElements(): Promise<Array<Element>>;
    getElement(symbol: string): Promise<Element | null>;
    getFavorites(): Promise<Array<string>>;
    getMyProfile(): Promise<Profile | null>;
    getMyStats(): Promise<UserStats>;
    getPublicProfile(userId: Principal): Promise<Profile | null>;
    getQuizQuestion(id: string): Promise<QuizQuestion | null>;
    getQuizQuestions(difficulty: string, topic: string): Promise<Array<QuizQuestion>>;
    getReaction(id: string): Promise<ChemicalReaction | null>;
    getReactions(): Promise<Array<ChemicalReaction>>;
    getReactionsByCategory(category: string): Promise<Array<ChemicalReaction>>;
    getReactionsByType(rtype: string): Promise<Array<ChemicalReaction>>;
    getReactivityMetal(symbol: string): Promise<ReactivityMetal | null>;
    getReactivitySeries(): Promise<Array<ReactivityMetal>>;
    recordActivity(): Promise<void>;
    searchElements(searchTerm: string): Promise<Array<Element>>;
    searchReactions(term: string): Promise<Array<ChemicalReaction>>;
    toggleFavorite(symbol: string): Promise<boolean>;
    updateProgress(score: bigint): Promise<void>;
    upsertMyProfile(input: ProfileInput): Promise<Profile>;
}
