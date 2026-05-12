export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  category: ElementCategory;
  group: number;
  period: number;
  block: string;
  state: "Solid" | "Liquid" | "Gas" | "Unknown";
  density: number;
  meltingPoint: number;
  boilingPoint: number;
  electronegativity: number;
  ionizationEnergy: number;
  atomicRadius: number;
  electronConfiguration: string;
  description: string;
  uses: string[];
  facts: string[];
  colorHex: string;
}

export type ElementCategory =
  | "alkali-metal"
  | "alkaline-earth-metal"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide"
  | "unknown";

export const CATEGORY_LABELS: Record<ElementCategory, string> = {
  "alkali-metal": "Alkali Metal",
  "alkaline-earth-metal": "Alkaline Earth Metal",
  "transition-metal": "Transition Metal",
  "post-transition-metal": "Post-Transition Metal",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  halogen: "Halogen",
  "noble-gas": "Noble Gas",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
  unknown: "Unknown",
};

export const CATEGORY_GRADIENT: Record<ElementCategory, string> = {
  "alkali-metal": "from-cyan-400/70 to-sky-500/70",
  "alkaline-earth-metal": "from-fuchsia-400/70 to-pink-500/70",
  "transition-metal": "from-violet-400/70 to-purple-600/70",
  "post-transition-metal": "from-blue-400/70 to-indigo-500/70",
  metalloid: "from-rose-400/70 to-pink-500/70",
  nonmetal: "from-orange-400/70 to-amber-500/70",
  halogen: "from-emerald-400/70 to-teal-500/70",
  "noble-gas": "from-yellow-400/70 to-amber-400/70",
  lanthanide: "from-indigo-400/70 to-blue-500/70",
  actinide: "from-red-400/70 to-rose-600/70",
  unknown: "from-muted/60 to-muted/80",
};

export const CATEGORY_GLOW: Record<ElementCategory, string> = {
  "alkali-metal": "shadow-cyan-400/40",
  "alkaline-earth-metal": "shadow-fuchsia-400/40",
  "transition-metal": "shadow-violet-400/40",
  "post-transition-metal": "shadow-blue-400/40",
  metalloid: "shadow-rose-400/40",
  nonmetal: "shadow-orange-400/40",
  halogen: "shadow-emerald-400/40",
  "noble-gas": "shadow-yellow-400/40",
  lanthanide: "shadow-indigo-400/40",
  actinide: "shadow-red-400/40",
  unknown: "shadow-muted/40",
};

export const CATEGORY_TEXT: Record<ElementCategory, string> = {
  "alkali-metal": "text-cyan-300",
  "alkaline-earth-metal": "text-fuchsia-300",
  "transition-metal": "text-violet-300",
  "post-transition-metal": "text-blue-300",
  metalloid: "text-rose-300",
  nonmetal: "text-orange-300",
  halogen: "text-emerald-300",
  "noble-gas": "text-yellow-300",
  lanthanide: "text-indigo-300",
  actinide: "text-red-300",
  unknown: "text-muted-foreground",
};
