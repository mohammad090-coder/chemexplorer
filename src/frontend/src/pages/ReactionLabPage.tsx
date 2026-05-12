import { useReactions } from "@/hooks/useChemistry";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import type { ChemicalReaction } from "@/types/chemistry";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FlaskConical,
  Plus,
  RefreshCw,
  Search,
  Thermometer,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ─── Extended reaction types ──────────────────────────────────────────────────
interface ReactionStep {
  equation: string;
  description: string;
  conditions?: { temperature?: string; pressure?: string; catalyst?: string };
  intermediate?: string;
}

interface AdvancedReaction extends ChemicalReaction {
  steps?: ReactionStep[];
  conditions?: { temperature?: string; pressure?: string; catalyst?: string };
  intermediates?: string[];
  moleculeColors?: { reactant1: string; reactant2?: string; product: string };
  category?: ReactionCategory;
}

type ReactionCategory =
  | "inorganic"
  | "organic"
  | "industrial"
  | "named"
  | "electrochemical";

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORIES: { id: ReactionCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "inorganic", label: "Inorganic" },
  { id: "organic", label: "Organic" },
  { id: "industrial", label: "Industrial" },
  { id: "named", label: "Named Reactions" },
  { id: "electrochemical", label: "Electrochemical" },
];

// ─── Built-in reactions dataset ───────────────────────────────────────────────
const BUILTIN_REACTIONS: AdvancedReaction[] = [
  {
    id: "haber-process",
    name: "Haber Process",
    category: "industrial",
    reactants: [
      { symbol: "N₂", name: "Nitrogen", coefficient: 1n },
      { symbol: "H₂", name: "Hydrogen", coefficient: 3n },
    ],
    products: [
      { symbol: "NH₃", name: "Ammonia", formula: "NH₃", coefficient: 2n },
    ],
    balancedEquation: "N₂ + 3H₂ ⇌ 2NH₃",
    reactionType: "synthesis",
    energyChange: "exothermic",
    description:
      "Industrial synthesis of ammonia — the foundation of fertilizers worldwide.",
    observations: [
      "Reversible reaction (⇌) — equilibrium established",
      "Yield ~15% per pass; unused gases recycled",
      "ΔH = −92 kJ/mol",
    ],
    conditions: {
      temperature: "450 °C",
      pressure: "200 atm",
      catalyst: "Fe (iron)",
    },
    steps: [
      {
        equation: "N₂ + 3H₂ → intermediate [N–H species on Fe surface]",
        description:
          "N₂ and H₂ adsorb onto the iron catalyst surface. N≡N triple bond begins to weaken.",
        conditions: {
          temperature: "450 °C",
          pressure: "200 atm",
          catalyst: "Fe (iron)",
        },
        intermediate: "Fe-adsorbed N·H radicals",
      },
      {
        equation: "N(ads) + 3H(ads) → NH₃(ads)",
        description:
          "Adsorbed nitrogen atoms react stepwise with hydrogen atoms forming NH₃.",
        conditions: {
          temperature: "450 °C",
          pressure: "200 atm",
          catalyst: "Fe (iron)",
        },
        intermediate: "NH, NH₂ surface species",
      },
      {
        equation: "N₂ + 3H₂ ⇌ 2NH₃   ΔH = −92 kJ/mol",
        description:
          "Ammonia desorbs from the surface. Equilibrium favours ammonia at high pressure. Unreacted gases are recycled.",
        conditions: {
          temperature: "450 °C",
          pressure: "200 atm",
          catalyst: "Fe (iron)",
        },
      },
    ],
    intermediates: ["Fe-surface N radicals", "NH and NH₂ species"],
    moleculeColors: {
      reactant1: "#6366f1",
      reactant2: "#38bdf8",
      product: "#34d399",
    },
  },
  {
    id: "contact-process",
    name: "Contact Process (SO₃)",
    category: "industrial",
    reactants: [
      { symbol: "SO₂", name: "Sulphur Dioxide", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", coefficient: 1n },
    ],
    products: [
      {
        symbol: "SO₃",
        name: "Sulphur Trioxide",
        formula: "SO₃",
        coefficient: 2n,
      },
    ],
    balancedEquation: "2SO₂ + O₂ ⇌ 2SO₃",
    reactionType: "redox",
    energyChange: "exothermic",
    description:
      "Key step in sulphuric acid manufacture — one of the highest-volume industrial chemicals.",
    observations: [
      "Reversible reaction — 98% conversion achieved industrially",
      "V₂O₅ catalyst lowers activation energy",
      "ΔH = −197 kJ/mol",
    ],
    conditions: {
      temperature: "450 °C",
      pressure: "1–2 atm",
      catalyst: "V₂O₅",
    },
    steps: [
      {
        equation: "SO₂ + V₂O₅ → SO₃ + V₂O₄",
        description:
          "SO₂ is oxidised to SO₃ by the vanadium(V) oxide catalyst, which is itself reduced to V₂O₄.",
        conditions: { temperature: "450 °C", catalyst: "V₂O₅" },
        intermediate: "V₂O₄",
      },
      {
        equation: "V₂O₄ + ½O₂ → V₂O₅",
        description:
          "The reduced V₂O₄ is re-oxidised back to V₂O₅ by atmospheric oxygen, completing the catalytic cycle.",
        conditions: { temperature: "450 °C" },
      },
      {
        equation: "SO₃ + H₂SO₄ → H₂S₂O₇   then   H₂S₂O₇ + H₂O → 2H₂SO₄",
        description:
          "SO₃ is absorbed into conc. H₂SO₄ (oleum) rather than water directly, then diluted to give sulphuric acid.",
      },
    ],
    intermediates: ["V₂O₄", "H₂S₂O₇ (oleum)"],
    moleculeColors: {
      reactant1: "#fb923c",
      reactant2: "#e2e8f0",
      product: "#f59e0b",
    },
  },
  {
    id: "decomp-h2o2",
    name: "Decomposition of H₂O₂",
    category: "inorganic",
    reactants: [{ symbol: "H₂O₂", name: "Hydrogen Peroxide", coefficient: 2n }],
    products: [
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", formula: "O₂", coefficient: 1n },
    ],
    balancedEquation: "2H₂O₂ → 2H₂O + O₂↑",
    reactionType: "decomposition",
    energyChange: "exothermic",
    description:
      "Hydrogen peroxide decomposes into water and oxygen, dramatically accelerated by MnO₂.",
    observations: [
      "Vigorous bubbling (O₂ released)",
      "Glowing splint relights",
      "Flask gets warm — exothermic",
    ],
    conditions: { catalyst: "MnO₂" },
    steps: [
      {
        equation: "H₂O₂ + MnO₂ → [H₂O₂–MnO₂ complex]",
        description:
          "MnO₂ surface adsorbs H₂O₂ molecules, forming an activated complex.",
        conditions: { catalyst: "MnO₂" },
        intermediate: "H₂O₂–MnO₂ adsorption complex",
      },
      {
        equation: "2H₂O₂ → 2H₂O + O₂↑",
        description:
          "O–O bond in H₂O₂ breaks. Oxygen atoms combine and release as O₂ gas; MnO₂ is regenerated.",
        conditions: { catalyst: "MnO₂" },
      },
    ],
    moleculeColors: { reactant1: "#818cf8", product: "#38bdf8" },
  },
  {
    id: "combustion-methane",
    name: "Combustion of Methane",
    category: "organic",
    reactants: [
      { symbol: "CH₄", name: "Methane", coefficient: 1n },
      { symbol: "O₂", name: "Oxygen", coefficient: 2n },
    ],
    products: [
      {
        symbol: "CO₂",
        name: "Carbon Dioxide",
        formula: "CO₂",
        coefficient: 1n,
      },
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 2n },
    ],
    balancedEquation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    reactionType: "combustion",
    energyChange: "exothermic",
    description:
      "Complete combustion of methane (natural gas) — the primary fuel for cooking and heating.",
    observations: [
      "Blue flame produced",
      "CO₂ turns limewater milky",
      "ΔH = −890 kJ/mol",
    ],
    conditions: { temperature: "Ignition temp. ~600 °C" },
    moleculeColors: {
      reactant1: "#94a3b8",
      reactant2: "#e2e8f0",
      product: "#34d399",
    },
  },
  {
    id: "acid-hcl-zn",
    name: "Zinc + Hydrochloric Acid",
    category: "inorganic",
    reactants: [
      { symbol: "Zn", name: "Zinc", coefficient: 1n },
      { symbol: "HCl", name: "Hydrochloric Acid", coefficient: 2n },
    ],
    products: [
      {
        symbol: "ZnCl₂",
        name: "Zinc Chloride",
        formula: "ZnCl₂",
        coefficient: 1n,
      },
      { symbol: "H₂", name: "Hydrogen Gas", formula: "H₂", coefficient: 1n },
    ],
    balancedEquation: "Zn + 2HCl → ZnCl₂ + H₂↑",
    reactionType: "single displacement",
    energyChange: "exothermic",
    description:
      "Zinc displaces hydrogen from HCl, producing zinc chloride and H₂ gas.",
    observations: [
      "Vigorous effervescence",
      "Zinc dissolves",
      "H₂ burns with squeaky pop",
    ],
    moleculeColors: {
      reactant1: "#a3a3a3",
      reactant2: "#38bdf8",
      product: "#f59e0b",
    },
  },
  {
    id: "neutralisation-naoh-hcl",
    name: "NaOH + HCl Neutralisation",
    category: "inorganic",
    reactants: [
      { symbol: "NaOH", name: "Sodium Hydroxide", coefficient: 1n },
      { symbol: "HCl", name: "Hydrochloric Acid", coefficient: 1n },
    ],
    products: [
      {
        symbol: "NaCl",
        name: "Sodium Chloride",
        formula: "NaCl",
        coefficient: 1n,
      },
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 1n },
    ],
    balancedEquation: "NaOH + HCl → NaCl + H₂O",
    reactionType: "neutralisation",
    energyChange: "exothermic",
    description:
      "Strong base reacts with strong acid to form a neutral salt and water.",
    observations: [
      "pH shifts to 7",
      "Slight temperature rise (~57 kJ/mol)",
      "Indicator turns green",
    ],
    moleculeColors: {
      reactant1: "#c084fc",
      reactant2: "#fb923c",
      product: "#e2e8f0",
    },
  },
  {
    id: "redox-thermite",
    name: "Thermite Reaction",
    category: "named",
    reactants: [
      { symbol: "Al", name: "Aluminium", coefficient: 2n },
      { symbol: "Fe₂O₃", name: "Iron(III) Oxide", coefficient: 1n },
    ],
    products: [
      {
        symbol: "Al₂O₃",
        name: "Aluminium Oxide",
        formula: "Al₂O₃",
        coefficient: 1n,
      },
      { symbol: "Fe", name: "Iron", formula: "Fe", coefficient: 2n },
    ],
    balancedEquation: "2Al + Fe₂O₃ → Al₂O₃ + 2Fe",
    reactionType: "displacement",
    energyChange: "exothermic",
    description:
      "Aluminium reduces iron oxide in a spectacular reaction producing molten iron at >2500 °C.",
    observations: [
      ">2500 °C produced",
      "Molten iron pours out",
      "Brilliant white light",
    ],
    conditions: { temperature: ">2500 °C (self-sustaining)" },
    moleculeColors: {
      reactant1: "#e2e8f0",
      reactant2: "#f97316",
      product: "#fbbf24",
    },
  },
  {
    id: "synthesis-water",
    name: "Formation of Water",
    category: "inorganic",
    reactants: [
      { symbol: "H₂", name: "Hydrogen", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", coefficient: 1n },
    ],
    products: [
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 2n },
    ],
    balancedEquation: "2H₂ + O₂ → 2H₂O",
    reactionType: "synthesis",
    energyChange: "exothermic",
    description:
      "Hydrogen and oxygen combine explosively to form water — or electrochemically in a fuel cell.",
    observations: [
      "Explosive when ignited",
      "286 kJ/mol released",
      "Water vapour formed",
    ],
    moleculeColors: {
      reactant1: "#38bdf8",
      reactant2: "#e2e8f0",
      product: "#818cf8",
    },
  },
  {
    id: "photosynthesis",
    name: "Photosynthesis",
    category: "organic",
    reactants: [
      { symbol: "CO₂", name: "Carbon Dioxide", coefficient: 6n },
      { symbol: "H₂O", name: "Water", coefficient: 6n },
    ],
    products: [
      {
        symbol: "C₆H₁₂O₆",
        name: "Glucose",
        formula: "C₆H₁₂O₆",
        coefficient: 1n,
      },
      { symbol: "O₂", name: "Oxygen", formula: "O₂", coefficient: 6n },
    ],
    balancedEquation: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
    reactionType: "synthesis",
    energyChange: "endothermic",
    description:
      "Plants convert CO₂ and water into glucose using light energy in chloroplasts.",
    observations: [
      "Oxygen released",
      "Starch formed (turns iodine blue)",
      "Requires sunlight",
    ],
    conditions: { catalyst: "Chlorophyll", temperature: "25–35 °C" },
    steps: [
      {
        equation: "Light + H₂O → O₂ + ATP + NADPH  (Light Reactions)",
        description:
          "Light energy splits water molecules (photolysis), releasing O₂ and producing ATP and NADPH energy carriers.",
        conditions: { catalyst: "Chlorophyll (Photosystems I & II)" },
        intermediate: "ATP, NADPH",
      },
      {
        equation: "CO₂ + ATP + NADPH → G3P  (Calvin Cycle)",
        description:
          "CO₂ is fixed using ATP and NADPH in the Calvin cycle, producing glyceraldehyde-3-phosphate (G3P).",
        conditions: { catalyst: "RuBisCO enzyme" },
        intermediate: "G3P (3-carbon sugar)",
      },
      {
        equation: "6G3P → C₆H₁₂O₆ (glucose)",
        description:
          "G3P molecules are assembled into glucose for storage as starch or used directly for cellular energy.",
      },
    ],
    intermediates: ["ATP", "NADPH", "G3P"],
    moleculeColors: {
      reactant1: "#34d399",
      reactant2: "#38bdf8",
      product: "#fbbf24",
    },
  },
  {
    id: "electrolysis-water",
    name: "Electrolysis of Water",
    category: "electrochemical",
    reactants: [{ symbol: "H₂O", name: "Water", coefficient: 2n }],
    products: [
      { symbol: "H₂", name: "Hydrogen", formula: "H₂", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", formula: "O₂", coefficient: 1n },
    ],
    balancedEquation: "2H₂O(l) → 2H₂↑ + O₂↑  (electrical energy)",
    reactionType: "decomposition",
    energyChange: "endothermic",
    description:
      "Water is split into hydrogen and oxygen using electrical energy — key for green hydrogen production.",
    observations: [
      "Bubbles at both electrodes",
      "H₂:O₂ ratio = 2:1 by volume",
      "Requires DC electricity",
    ],
    conditions: { catalyst: "Electrolyte (dilute H₂SO₄)" },
    steps: [
      {
        equation: "Cathode (−): 4H⁺ + 4e⁻ → 2H₂↑",
        description:
          "At the cathode (negative electrode), hydrogen ions gain electrons and are reduced to H₂ gas.",
        conditions: { catalyst: "Pt electrode" },
      },
      {
        equation: "Anode (+): 2H₂O → O₂↑ + 4H⁺ + 4e⁻",
        description:
          "At the anode (positive electrode), water molecules are oxidised, releasing O₂ gas and H⁺ ions.",
        conditions: { catalyst: "Pt electrode" },
      },
      {
        equation: "Overall: 2H₂O(l) → 2H₂ + O₂",
        description:
          "Net result: water is split into hydrogen (at cathode) and oxygen (at anode). Energy stored in H–H bonds.",
      },
    ],
    moleculeColors: { reactant1: "#818cf8", product: "#38bdf8" },
  },
  {
    id: "saponification",
    name: "Saponification (Soap Making)",
    category: "named",
    reactants: [
      { symbol: "Fat", name: "Triglyceride (fat/oil)", coefficient: 1n },
      { symbol: "NaOH", name: "Sodium Hydroxide", coefficient: 3n },
    ],
    products: [
      {
        symbol: "Soap",
        name: "Sodium Fatty Acid Salt",
        formula: "RCOONa",
        coefficient: 3n,
      },
      {
        symbol: "C₃H₈O₃",
        name: "Glycerol",
        formula: "C₃H₈O₃",
        coefficient: 1n,
      },
    ],
    balancedEquation: "RCOO₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₈O₃",
    reactionType: "hydrolysis",
    energyChange: "exothermic",
    description:
      "Fats or oils react with a strong base (NaOH) to produce soap and glycerol — the oldest known chemical reaction.",
    observations: [
      "Solution thickens",
      "Soap precipitates when NaCl added",
      "Glycerol remains in solution",
    ],
    conditions: { temperature: "80–100 °C", catalyst: "NaOH (base)" },
    steps: [
      {
        equation: "OH⁻ attacks ester carbonyl C → tetrahedral intermediate",
        description:
          "Hydroxide ion (nucleophile) attacks the carbonyl carbon of the ester bond in the triglyceride.",
        conditions: { temperature: "80–100 °C", catalyst: "NaOH" },
        intermediate: "Tetrahedral alkoxide intermediate",
      },
      {
        equation: "Tetrahedral intermediate → RCOO⁻ + RO⁻ (alkoxide)",
        description:
          "The tetrahedral intermediate collapses, releasing a fatty acid carboxylate and the alkoxide leaving group.",
        intermediate: "Fatty acid carboxylate (soap anion)",
      },
      {
        equation:
          "3 × ester bonds cleaved → 3RCOONa (soap) + C₃H₈O₃ (glycerol)",
        description:
          "All three ester bonds in the triglyceride are cleaved to yield three soap molecules and one glycerol molecule.",
      },
    ],
    intermediates: [
      "Tetrahedral alkoxide intermediate",
      "Fatty acid carboxylate",
    ],
    moleculeColors: {
      reactant1: "#fbbf24",
      reactant2: "#c084fc",
      product: "#34d399",
    },
  },
  {
    id: "ostwald-process",
    name: "Ostwald Process (HNO₃)",
    category: "industrial",
    reactants: [
      { symbol: "NH₃", name: "Ammonia", coefficient: 4n },
      { symbol: "O₂", name: "Oxygen", coefficient: 5n },
    ],
    products: [
      { symbol: "NO", name: "Nitric Oxide", formula: "NO", coefficient: 4n },
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 6n },
    ],
    balancedEquation: "4NH₃ + 5O₂ → 4NO + 6H₂O  (Step 1 of 3)",
    reactionType: "redox",
    energyChange: "exothermic",
    description:
      "Industrial production of nitric acid from ammonia — used in fertilisers and explosives.",
    observations: [
      "Brown NO₂ fumes in later steps",
      "High temperature required",
      "Pt-Rh gauze catalyst",
    ],
    conditions: {
      temperature: "900 °C",
      pressure: "1–10 atm",
      catalyst: "Pt-Rh gauze",
    },
    steps: [
      {
        equation: "4NH₃ + 5O₂ → 4NO + 6H₂O",
        description:
          "Ammonia is catalytically oxidised to nitric oxide (NO) at 900 °C over platinum-rhodium gauze.",
        conditions: {
          temperature: "900 °C",
          pressure: "1–10 atm",
          catalyst: "Pt-Rh gauze",
        },
        intermediate: "NO (nitric oxide)",
      },
      {
        equation: "4NO + 2O₂ → 4NO₂",
        description:
          "NO is further oxidised to nitrogen dioxide (NO₂), a brown toxic gas.",
        intermediate: "NO₂ (nitrogen dioxide)",
      },
      {
        equation: "3NO₂ + H₂O → 2HNO₃ + NO",
        description:
          "NO₂ reacts with water to form nitric acid. The NO produced is recycled back to step 2.",
      },
    ],
    intermediates: ["NO (nitric oxide)", "NO₂ (nitrogen dioxide)"],
    moleculeColors: {
      reactant1: "#a78bfa",
      reactant2: "#e2e8f0",
      product: "#fb923c",
    },
  },
  {
    id: "sn2-substitution",
    name: "SN2 Nucleophilic Substitution",
    category: "named",
    reactants: [
      { symbol: "R–X", name: "Alkyl Halide", coefficient: 1n },
      { symbol: "Nu⁻", name: "Nucleophile", coefficient: 1n },
    ],
    products: [
      { symbol: "R–Nu", name: "Product", formula: "R–Nu", coefficient: 1n },
      { symbol: "X⁻", name: "Leaving Group", formula: "X⁻", coefficient: 1n },
    ],
    balancedEquation: "R–X + Nu⁻ → R–Nu + X⁻  (inversion of configuration)",
    reactionType: "substitution",
    energyChange: "exothermic",
    description:
      "Second-order nucleophilic substitution — one step, backside attack, Walden inversion. Rate depends on both nucleophile and substrate.",
    observations: [
      "Inversion of optical activity",
      "Rate = k[RX][Nu⁻]",
      "Favoured with primary substrates",
    ],
    steps: [
      {
        equation: "Nu⁻ approaches C from backside (180° to X)",
        description:
          "The nucleophile attacks the electrophilic carbon from the side opposite to the leaving group.",
        intermediate: "Transition state — trigonal bipyramidal",
      },
      {
        equation: "[Nu···C···X]‡ → R–Nu + X⁻",
        description:
          "The transition state collapses simultaneously as the C–X bond breaks and C–Nu bond forms — concerted, single step.",
      },
    ],
    intermediates: ["Trigonal bipyramidal transition state [Nu···C···X]‡"],
    moleculeColors: {
      reactant1: "#f472b6",
      reactant2: "#818cf8",
      product: "#34d399",
    },
  },
  {
    id: "sn1-substitution",
    name: "SN1 Nucleophilic Substitution",
    category: "named",
    reactants: [
      { symbol: "R–X", name: "Alkyl Halide (tertiary)", coefficient: 1n },
      { symbol: "Nu", name: "Nucleophile (weak)", coefficient: 1n },
    ],
    products: [
      {
        symbol: "R–Nu",
        name: "Product (racemic)",
        formula: "R–Nu",
        coefficient: 1n,
      },
      { symbol: "X⁻", name: "Leaving Group", formula: "X⁻", coefficient: 1n },
    ],
    balancedEquation: "R–X → R⁺ + X⁻  then  R⁺ + Nu → R–Nu",
    reactionType: "substitution",
    energyChange: "exothermic",
    description:
      "First-order nucleophilic substitution — two steps, carbocation intermediate, racemic product. Rate depends only on substrate.",
    observations: [
      "Racemisation of product",
      "Rate = k[RX]",
      "Favoured with tertiary substrates",
      "Carbocation rearrangements possible",
    ],
    steps: [
      {
        equation: "R–X → R⁺ + X⁻  (slow, rate-determining)",
        description:
          "The C–X bond breaks heterolytically to form a planar carbocation intermediate.",
        intermediate: "Carbocation R⁺ (trigonal planar)",
      },
      {
        equation: "R⁺ + Nu → R–Nu  (fast)",
        description:
          "The nucleophile attacks the flat carbocation from both faces, giving a racemic mixture.",
      },
    ],
    intermediates: ["Carbocation R⁺"],
    moleculeColors: {
      reactant1: "#f59e0b",
      reactant2: "#a78bfa",
      product: "#34d399",
    },
  },
  {
    id: "aldol-condensation",
    name: "Aldol Condensation",
    category: "named",
    reactants: [{ symbol: "CH₃CHO", name: "Acetaldehyde", coefficient: 2n }],
    products: [
      {
        symbol: "CH₃CH(OH)CH₂CHO",
        name: "Aldol",
        formula: "3-hydroxybutanal",
        coefficient: 1n,
      },
    ],
    balancedEquation: "2CH₃CHO → CH₃CH(OH)CH₂CHO  (then → CH₃CH=CHCHO + H₂O)",
    reactionType: "condensation",
    energyChange: "exothermic",
    description:
      "An α-hydrogen-containing carbonyl compound acts as both nucleophile (enolate) and electrophile (aldehyde C=O) to form a β-hydroxy carbonyl compound.",
    observations: [
      "β-hydroxy aldehyde (aldol) formed",
      "Dehydration at 100 °C gives α,β-unsaturated aldehyde",
      "Dilute NaOH catalyses",
    ],
    conditions: { catalyst: "Dilute NaOH", temperature: "Room temp → 100 °C" },
    steps: [
      {
        equation: "CH₃CHO + OH⁻ → ⁻CH₂CHO + H₂O  (enolate formation)",
        description:
          "Base removes an α-hydrogen to generate the enolate ion (nucleophile).",
        intermediate: "Enolate anion ⁻CH₂CHO",
      },
      {
        equation: "⁻CH₂CHO + CH₃CHO → CH₃CH(O⁻)CH₂CHO",
        description:
          "Enolate attacks the carbonyl carbon of the second aldehyde molecule.",
        intermediate: "Alkoxide intermediate",
      },
      {
        equation: "CH₃CH(O⁻)CH₂CHO + H₂O → CH₃CH(OH)CH₂CHO + OH⁻",
        description:
          "Protonation gives the aldol product; OH⁻ is regenerated (catalytic).",
      },
    ],
    intermediates: ["Enolate anion", "Alkoxide intermediate"],
    moleculeColors: { reactant1: "#fbbf24", product: "#34d399" },
  },
  {
    id: "grignard-reaction",
    name: "Grignard Reaction",
    category: "named",
    reactants: [
      { symbol: "RMgX", name: "Grignard Reagent", coefficient: 1n },
      { symbol: "R′CHO", name: "Aldehyde/Ketone", coefficient: 1n },
    ],
    products: [
      {
        symbol: "R–CHOH–R′",
        name: "Secondary Alcohol",
        formula: "R-CHOH-R'",
        coefficient: 1n,
      },
    ],
    balancedEquation: "RMgX + R′C=O → R′C(OMgX)R  →(H₃O⁺)→  R′C(OH)R",
    reactionType: "addition",
    energyChange: "exothermic",
    description:
      "Grignard reagent (organomagnesium halide) adds to a carbonyl group to give an alcohol after workup. One of the most versatile C–C bond-forming reactions.",
    observations: [
      "Reaction done under dry conditions (no water)",
      "C–C bond formed",
      "Primary alcohol from HCHO, secondary from RCHO, tertiary from R₂CO",
    ],
    conditions: { catalyst: "Dry ether solvent", temperature: "0 °C to RT" },
    steps: [
      {
        equation: "Mg + RX → RMgX  (in dry ether)",
        description:
          "Preparation of the Grignard reagent by reacting Mg with an alkyl halide in anhydrous ether.",
        conditions: { catalyst: "Dry ether", temperature: "0–5 °C" },
        intermediate: "RMgX (Grignard reagent)",
      },
      {
        equation: "RMgX + R′C=O → R′C(OMgX)R",
        description:
          "The carbanion-like carbon in RMgX attacks the electrophilic carbonyl carbon, forming a magnesium alkoxide.",
        intermediate: "Magnesium alkoxide R′C(OMgX)R",
      },
      {
        equation: "R′C(OMgX)R + H₃O⁺ → R′C(OH)R + Mg²⁺ + X⁻",
        description:
          "Acid hydrolysis workup cleaves the Mg–O bond to give the free alcohol product.",
      },
    ],
    intermediates: ["RMgX (Grignard reagent)", "Magnesium alkoxide"],
    moleculeColors: {
      reactant1: "#818cf8",
      reactant2: "#fbbf24",
      product: "#34d399",
    },
  },
  {
    id: "daniel-cell",
    name: "Daniell Cell (Electrochemical)",
    category: "electrochemical",
    reactants: [
      { symbol: "Zn", name: "Zinc (anode)", coefficient: 1n },
      { symbol: "Cu²⁺", name: "Copper(II) ions", coefficient: 1n },
    ],
    products: [
      { symbol: "Zn²⁺", name: "Zinc ions", formula: "Zn²⁺", coefficient: 1n },
      {
        symbol: "Cu",
        name: "Copper (cathode)",
        formula: "Cu",
        coefficient: 1n,
      },
    ],
    balancedEquation: "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)  E°cell = +1.10 V",
    reactionType: "redox",
    energyChange: "exothermic",
    description:
      "The Daniell cell converts chemical energy from redox reactions directly into electrical energy. First practical galvanic cell.",
    observations: [
      "Zinc electrode dissolves",
      "Copper deposits on cathode",
      "EMF = 1.10 V",
    ],
    steps: [
      {
        equation: "Anode: Zn(s) → Zn²⁺(aq) + 2e⁻  (oxidation)",
        description:
          "Zinc is oxidised at the anode, releasing electrons into the external circuit.",
        intermediate: "Zn²⁺ ions enter solution",
      },
      {
        equation: "Cathode: Cu²⁺(aq) + 2e⁻ → Cu(s)  (reduction)",
        description:
          "Cu²⁺ ions gain electrons from the cathode and deposit as solid copper.",
      },
    ],
    moleculeColors: {
      reactant1: "#a3a3a3",
      reactant2: "#38bdf8",
      product: "#fbbf24",
    },
  },
  // ─── Additional organic/named/industrial reactions ─────────────────────────────────
  {
    id: "diels-alder",
    name: "Diels-Alder Cycloaddition",
    category: "named",
    reactants: [
      { symbol: "Diene", name: "1,3-Butadiene", coefficient: 1n },
      { symbol: "Dienophile", name: "Maleic anhydride", coefficient: 1n },
    ],
    products: [
      {
        symbol: "Adduct",
        name: "Cyclohexene adduct",
        formula: "C\u2086H\u2088",
        coefficient: 1n,
      },
    ],
    balancedEquation:
      "Diene + Dienophile \u2192 Cyclohexene ([4+2] cycloaddition)",
    reactionType: "addition",
    energyChange: "exothermic",
    description:
      "A [4+2] pericyclic cycloaddition between a conjugated diene and a dienophile. One of the most powerful ring-forming reactions in organic synthesis.",
    observations: [
      "Concerted single step \u2014 no ionic intermediate",
      "Stereospecific (endo/exo products)",
      "Electron-poor dienophiles react fastest",
    ],
    conditions: { temperature: "RT to 100\u00b0C" },
    steps: [
      {
        equation: "Diene (s-cis) + dienophile approach",
        description:
          "Diene must adopt s-cis conformation. FMO overlap drives the reaction (HOMO diene + LUMO dienophile).",
        intermediate: "6-membered cyclic TS",
      },
      {
        equation: "[4+2] \u2192 cyclohexene ring",
        description:
          "Two \u03c3 bonds form simultaneously (pericyclic). New 6-membered ring; one C=C remains.",
      },
    ],
    intermediates: ["6-membered cyclic transition state"],
    moleculeColors: {
      reactant1: "#34d399",
      reactant2: "#f59e0b",
      product: "#818cf8",
    },
  },
  {
    id: "friedel-crafts-acylation",
    name: "Friedel-Crafts Acylation",
    category: "named",
    reactants: [
      { symbol: "ArH", name: "Benzene", coefficient: 1n },
      { symbol: "RCOCl", name: "Acyl chloride", coefficient: 1n },
    ],
    products: [
      {
        symbol: "ArCOR",
        name: "Aryl ketone",
        formula: "ArCOR",
        coefficient: 1n,
      },
      { symbol: "HCl", name: "HCl gas", formula: "HCl", coefficient: 1n },
    ],
    balancedEquation: "ArH + RCOCl \u2192 ArCOR + HCl  (AlCl\u2083 catalyst)",
    reactionType: "substitution",
    energyChange: "exothermic",
    description:
      "Electrophilic aromatic substitution: acyl group replaces ring H. No carbocation rearrangement; product is deactivated so mono-acylation predominates.",
    observations: [
      "Mono-acylation (product deactivated)",
      "No rearrangement",
      "More reliable than F-C alkylation",
    ],
    conditions: { catalyst: "AlCl\u2083", temperature: "0\u201325\u00b0C" },
    steps: [
      {
        equation: "RCOCl + AlCl\u2083 \u2192 RCO\u207a + AlCl\u2084\u207b",
        description: "Lewis acid generates electrophilic acylium ion.",
        intermediate: "Acylium ion RCO\u207a",
      },
      {
        equation: "RCO\u207a + ArH \u2192 Wheland intermediate",
        description:
          "Acylium attacks \u03c0 system; resonance-stabilized arenium forms.",
        intermediate: "Arenium (Wheland) intermediate",
      },
      {
        equation: "Wheland \u2192 ArCOR + H\u207a",
        description: "H\u207a loss restores aromaticity.",
      },
    ],
    intermediates: ["Acylium ion", "Wheland (arenium) intermediate"],
    moleculeColors: {
      reactant1: "#fbbf24",
      reactant2: "#f472b6",
      product: "#818cf8",
    },
  },
  {
    id: "solvay-process",
    name: "Solvay Process (Na\u2082CO\u2083)",
    category: "industrial",
    reactants: [
      { symbol: "NaCl", name: "Brine (NaCl solution)", coefficient: 1n },
      { symbol: "CaCO\u2083", name: "Limestone", coefficient: 1n },
    ],
    products: [
      {
        symbol: "Na\u2082CO\u2083",
        name: "Soda Ash",
        formula: "Na\u2082CO\u2083",
        coefficient: 1n,
      },
      {
        symbol: "CaCl\u2082",
        name: "Calcium Chloride",
        formula: "CaCl\u2082",
        coefficient: 1n,
      },
    ],
    balancedEquation:
      "2NaCl + CaCO\u2083 \u2192 Na\u2082CO\u2083 + CaCl\u2082  (via NH\u2083 cycle)",
    reactionType: "synthesis",
    energyChange: "exothermic",
    description:
      "Industrial production of soda ash (Na\u2082CO\u2083) used in glass, detergents and paper. NH\u2083 is recycled efficiently.",
    observations: [
      "NaHCO\u2083 precipitates in step 1",
      "Calcination yields Na\u2082CO\u2083",
      "NH\u2083 recovered with CaO",
    ],
    conditions: {
      temperature: "60\u201380\u00b0C",
      catalyst: "NH\u2083 (recycled)",
    },
    steps: [
      {
        equation:
          "NaCl + NH\u2083 + CO\u2082 + H\u2082O \u2192 NaHCO\u2083\u2193 + NH\u2084Cl",
        description:
          "CO\u2082 injected into ammonia-saturated brine; less soluble NaHCO\u2083 precipitates.",
        intermediate: "NaHCO\u2083 precipitate",
      },
      {
        equation: "2NaHCO\u2083 \u2192 Na\u2082CO\u2083 + H\u2082O + CO\u2082",
        description:
          "Calcination converts NaHCO\u2083 to soda ash; CO\u2082 recycled to step 1.",
      },
      {
        equation:
          "2NH\u2084Cl + Ca(OH)\u2082 \u2192 2NH\u2083 + CaCl\u2082 + 2H\u2082O",
        description: "NH\u2083 recovered using quicklime and reused.",
      },
    ],
    intermediates: ["NaHCO\u2083", "NH\u2084Cl"],
    moleculeColors: {
      reactant1: "#e2e8f0",
      reactant2: "#34d399",
      product: "#a78bfa",
    },
  },
  {
    id: "cannizzaro-reaction",
    name: "Cannizzaro Reaction",
    category: "named",
    reactants: [
      { symbol: "2HCHO", name: "Formaldehyde (no \u03b1-H)", coefficient: 2n },
    ],
    products: [
      {
        symbol: "CH\u2083OH",
        name: "Methanol",
        formula: "CH\u2083OH",
        coefficient: 1n,
      },
      {
        symbol: "HCOONa",
        name: "Sodium Formate",
        formula: "HCOONa",
        coefficient: 1n,
      },
    ],
    balancedEquation: "2HCHO + NaOH \u2192 CH\u2083OH + HCOONa",
    reactionType: "redox",
    energyChange: "exothermic",
    description:
      "Disproportionation of aldehydes lacking \u03b1-H: one oxidized to carboxylate, other reduced to alcohol. Requires concentrated NaOH.",
    observations: [
      "Only for \u03b1-H-free aldehydes (HCHO, PhCHO)",
      "Concentrated NaOH required",
      "No C\u2013C bond formed",
    ],
    conditions: { catalyst: "Concentrated NaOH" },
    steps: [
      {
        equation: "OH\u207b + HCHO \u2192 adduct (H\u207b donor)",
        description:
          "OH\u207b adds to HCHO; the adduct donates H\u207b to a second HCHO.",
        intermediate: "Alkoxide-adduct",
      },
      {
        equation: "Hydride transfer \u2192 CH\u2083OH + HCOO\u207b",
        description:
          "Intermolecular hydride transfer gives methanol and formate simultaneously.",
      },
    ],
    intermediates: ["Tetrahedral alkoxide"],
    moleculeColors: { reactant1: "#fbbf24", product: "#34d399" },
  },
  {
    id: "esterification",
    name: "Fischer Esterification",
    category: "organic",
    reactants: [
      { symbol: "RCOOH", name: "Carboxylic Acid", coefficient: 1n },
      { symbol: "R'OH", name: "Alcohol", coefficient: 1n },
    ],
    products: [
      { symbol: "RCOOR'", name: "Ester", formula: "RCOOR'", coefficient: 1n },
      {
        symbol: "H\u2082O",
        name: "Water",
        formula: "H\u2082O",
        coefficient: 1n,
      },
    ],
    balancedEquation:
      "RCOOH + R'OH \u21cc RCOOR' + H\u2082O  (acid-catalysed, reversible)",
    reactionType: "condensation",
    energyChange: "exothermic",
    description:
      "Acid-catalysed condensation forming an ester. Reversible \u2014 removing water or excess alcohol drives the equilibrium toward product.",
    observations: [
      "Fruity odour of ester",
      "Water removal drives forward",
      "Reversible (hydrolysis is the reverse)",
    ],
    conditions: {
      catalyst: "Conc. H\u2082SO\u2084",
      temperature: "60\u201380\u00b0C",
    },
    steps: [
      {
        equation: "H\u207a + RCOOH \u2192 protonated carbonyl",
        description:
          "Protonation activates the carbonyl carbon toward nucleophilic attack.",
        intermediate: "Protonated acid",
      },
      {
        equation: "R'OH attacks \u2192 tetrahedral intermediate",
        description: "Alcohol oxygen attacks electrophilic carbonyl carbon.",
        intermediate: "Tetrahedral intermediate",
      },
      {
        equation: "Tetrahedral intermediate \u2192 ester + H\u2082O",
        description:
          "Elimination of water and proton transfer gives the ester product.",
      },
    ],
    intermediates: ["Protonated acid", "Tetrahedral intermediate"],
    moleculeColors: {
      reactant1: "#fb923c",
      reactant2: "#38bdf8",
      product: "#34d399",
    },
  },
  {
    id: "ozonolysis",
    name: "Ozonolysis of Alkenes",
    category: "organic",
    reactants: [
      { symbol: "R\u2082C=CR\u2082'", name: "Alkene", coefficient: 1n },
      { symbol: "O\u2083", name: "Ozone", coefficient: 1n },
    ],
    products: [
      {
        symbol: "RCHO/RCOR",
        name: "Aldehydes or Ketones",
        formula: "R\u2082C=O",
        coefficient: 2n,
      },
    ],
    balancedEquation:
      "R\u2082C=CR\u2082' + O\u2083 \u2192 2\u00d7R\u2082C=O  (Zn/H\u2082O workup)",
    reactionType: "oxidation",
    energyChange: "exothermic",
    description:
      "Ozone cleaves C=C to give carbonyl fragments. Used for structure determination. Reductive workup (Zn) gives aldehydes; oxidative (H\u2082O\u2082) gives acids.",
    observations: [
      "C=C completely cleaved",
      "Molozonide intermediate",
      "Useful for structural elucidation",
    ],
    conditions: { temperature: "\u221278\u00b0C (ozonation), then workup" },
    steps: [
      {
        equation: "Alkene + O\u2083 \u2192 molozonide",
        description: "[3+2] cycloaddition forms 1,2,3-trioxolane.",
        intermediate: "Molozonide",
      },
      {
        equation: "Molozonide \u2192 carbonyl oxide + aldehyde",
        description: "Retro-[3+2]; Criegee zwitterion forms.",
        intermediate: "Criegee zwitterion",
      },
      {
        equation: "Ozonide \u2192 carbonyls (workup)",
        description:
          "[3+2] gives ozonide; workup cleaves to two carbonyl compounds.",
      },
    ],
    intermediates: ["Molozonide", "Criegee zwitterion", "Ozonide"],
    moleculeColors: {
      reactant1: "#38bdf8",
      reactant2: "#f97316",
      product: "#fbbf24",
    },
  },
  {
    id: "haloform-reaction",
    name: "Haloform Reaction (Iodoform Test)",
    category: "named",
    reactants: [
      { symbol: "CH\u2083COR", name: "Methyl ketone", coefficient: 1n },
      { symbol: "I\u2082/NaOH", name: "Iodine + base", coefficient: 3n },
    ],
    products: [
      {
        symbol: "RCOONa",
        name: "Carboxylate",
        formula: "RCOONa",
        coefficient: 1n,
      },
      {
        symbol: "CHI\u2083",
        name: "Iodoform (yellow ppt)",
        formula: "CHI\u2083",
        coefficient: 1n,
      },
    ],
    balancedEquation:
      "CH\u2083COR + 3I\u2082 + 4NaOH \u2192 RCOONa + CHI\u2083\u2193 + 3NaI + 3H\u2082O",
    reactionType: "substitution",
    energyChange: "exothermic",
    description:
      "Iodoform test: methyl ketones and compounds with CH\u2083CHOH group give yellow CHI\u2083 precipitate with I\u2082/NaOH.",
    observations: [
      "Yellow CHI\u2083 precipitate",
      "Characteristic medicinal smell",
      "Positive: CH\u2083CHO, acetone, ethanol",
    ],
    conditions: { catalyst: "I\u2082 / NaOH" },
    moleculeColors: {
      reactant1: "#fbbf24",
      reactant2: "#e2e8f0",
      product: "#a78bfa",
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, string> = {
  combustion: "bg-orange-500/20 border-orange-400/30 text-orange-300",
  synthesis: "bg-blue-500/20 border-blue-400/30 text-blue-300",
  decomposition: "bg-purple-500/20 border-purple-400/30 text-purple-300",
  "single displacement": "bg-teal-500/20 border-teal-400/30 text-teal-300",
  displacement: "bg-teal-500/20 border-teal-400/30 text-teal-300",
  neutralisation: "bg-green-500/20 border-green-400/30 text-green-300",
  neutralization: "bg-green-500/20 border-green-400/30 text-green-300",
  redox: "bg-amber-500/20 border-amber-400/30 text-amber-300",
  hydrolysis: "bg-pink-500/20 border-pink-400/30 text-pink-300",
  substitution: "bg-indigo-500/20 border-indigo-400/30 text-indigo-300",
  addition: "bg-cyan-500/20 border-cyan-400/30 text-cyan-300",
  condensation: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
};

// ─── Product molecular weights (rough, for info chip) ────────────────────────
const PRODUCT_MW: Record<string, string> = {
  "NH₃": "17.03 g/mol",
  "SO₃": "80.06 g/mol",
  "H₂O": "18.02 g/mol",
  "CO₂": "44.01 g/mol",
  "O₂": "32.00 g/mol",
  "H₂": "2.02 g/mol",
  NaCl: "58.44 g/mol",
  "ZnCl₂": "136.3 g/mol",
  "Al₂O₃": "101.96 g/mol",
  "C₆H₁₂O₆": "180.16 g/mol",
  "HNO₃": "63.01 g/mol",
  "Na₂CO₃": "105.99 g/mol",
  "CH₃OH": "32.04 g/mol",
  "CHI₃": "393.73 g/mol",
  "RCOOR'": "variable",
  "R–Nu": "variable",
  "R–CHOH–R′": "variable",
  Soap: "variable",
  "CH₃CH(OH)CH₂CHO": "88.11 g/mol",
};

const COLLISION_KEYFRAMES = `
@keyframes collide-left {
  0%   { transform: translateX(0) scale(1); opacity: 1; }
  45%  { transform: translateX(52px) scale(1.08); opacity: 1; }
  55%  { transform: translateX(52px) scale(0.9); opacity: 0.6; }
  100% { transform: translateX(120px) scale(0); opacity: 0; }
}
@keyframes collide-right {
  0%   { transform: translateX(0) scale(1); opacity: 1; }
  45%  { transform: translateX(-52px) scale(1.08); opacity: 1; }
  55%  { transform: translateX(-52px) scale(0.9); opacity: 0.6; }
  100% { transform: translateX(-120px) scale(0); opacity: 0; }
}
@keyframes product-appear {
  0%   { transform: scale(0) translateY(10px); opacity: 0; }
  60%  { transform: scale(1.15) translateY(-4px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes flash-burst {
  0%   { transform: scale(0); opacity: 0; }
  30%  { transform: scale(1.8); opacity: 1; }
  70%  { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(0); opacity: 0; }
}
@keyframes bond-break {
  0%,100% { opacity: 1; transform: scaleX(1); }
  50%      { opacity: 0.15; transform: scaleX(0.3); }
}
@keyframes bond-form {
  0%   { opacity: 0; transform: scaleX(0); }
  100% { opacity: 1; transform: scaleX(1); }
}
@keyframes exoGlow {
  0%, 100% { box-shadow: 0 0 16px 4px rgba(251,146,60,0.25); }
  50%       { box-shadow: 0 0 32px 10px rgba(251,146,60,0.45); }
}
@keyframes endoGlow {
  0%, 100% { box-shadow: 0 0 16px 4px rgba(56,189,248,0.25); }
  50%       { box-shadow: 0 0 32px 10px rgba(56,189,248,0.45); }
}
@keyframes particle-scatter {
  0%   { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}
@keyframes reaction-card-glow {
  0%, 100% { box-shadow: 0 0 0 0 transparent; }
  30%       { box-shadow: 0 0 20px 4px rgba(var(--glow-rgb),0.5); }
  70%       { box-shadow: 0 0 12px 2px rgba(var(--glow-rgb),0.3); }
}
@keyframes eq-pulse {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.025); }
  70%  { transform: scale(0.995); }
  100% { transform: scale(1); }
}
@keyframes glow-burst {
  0%   { opacity: 0; transform: scale(0.6); }
  35%  { opacity: 0.65; transform: scale(1.05); }
  75%  { opacity: 0.3; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1.6); }
}
@keyframes reactant-flash {
  0%   { box-shadow: none; }
  40%  { box-shadow: 0 0 14px 4px rgba(56,189,248,0.5); }
  100% { box-shadow: none; }
}
@keyframes product-glow-in {
  0%   { opacity: 0; box-shadow: none; }
  50%  { opacity: 1; box-shadow: 0 0 14px 4px rgba(52,211,153,0.45); }
  100% { opacity: 1; box-shadow: none; }
}
`;

/** Normalise text for fuzzy matching */
function normalise(s: string) {
  return s
    .toLowerCase()
    .replace(/[₀-₉]/g, (c) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(c)))
    .replace(/[⁰-⁹]/g, (c) => String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c)))
    .replace(/[^a-z0-9+→⇌ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesSearch(rxn: AdvancedReaction, term: string): boolean {
  if (!term) return true;
  const needle = normalise(term);
  const haystack = normalise(
    [
      rxn.name,
      rxn.balancedEquation,
      rxn.description,
      rxn.reactionType,
      ...rxn.reactants.map((r) => `${r.symbol} ${r.name}`),
      ...rxn.products.map((p) => `${p.symbol} ${p.name}`),
    ].join(" "),
  );
  return haystack.includes(needle);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MoleculeBlob({
  color,
  label,
  size = 44,
}: { color: string; label: string; size?: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-full flex items-center justify-center font-mono font-bold text-[11px] text-foreground/90 select-none"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}55)`,
          boxShadow: `0 0 14px 3px ${color}44, inset 0 1px 2px rgba(255,255,255,0.2)`,
          border: `1.5px solid ${color}88`,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CollisionAnimation({ reaction }: { reaction: AdvancedReaction }) {
  const mc = reaction.moleculeColors ?? {
    reactant1: "#6366f1",
    reactant2: "#38bdf8",
    product: "#34d399",
  };
  const r1 = reaction.reactants[0];
  const r2 = reaction.reactants[1];
  const p1 = reaction.products[0];
  return (
    <div className="relative h-24 rounded-xl overflow-hidden bg-card/20 border border-border/20 flex items-center justify-center">
      <div
        style={{
          animation: "collide-left 1.8s ease-in-out forwards",
          position: "absolute",
          left: "12%",
        }}
      >
        <MoleculeBlob color={mc.reactant1} label={r1.symbol} size={42} />
      </div>
      {r2 && (
        <div
          style={{
            animation: "collide-right 1.8s ease-in-out forwards",
            position: "absolute",
            right: "12%",
          }}
        >
          <MoleculeBlob
            color={mc.reactant2 ?? "#38bdf8"}
            label={r2.symbol}
            size={42}
          />
        </div>
      )}
      <div
        className="absolute w-12 h-12 rounded-full"
        style={{
          background: `radial-gradient(circle, ${mc.product}cc, transparent 70%)`,
          animation: "flash-burst 1.8s ease-in-out forwards",
          animationDelay: "0.8s",
        }}
      />
      <div
        className="absolute w-8 h-0.5 rounded-full"
        style={{
          background: `${mc.reactant1}88`,
          animation: "bond-break 1.8s ease-in-out infinite",
          left: "32%",
        }}
      />
      <div
        style={{
          animation: "product-appear 0.6s ease-out forwards",
          animationDelay: "1.2s",
          opacity: 0,
          position: "absolute",
        }}
      >
        <MoleculeBlob
          color={mc.product}
          label={p1.formula ?? p1.symbol}
          size={48}
        />
      </div>
      <div
        className="absolute w-10 h-0.5 rounded-full"
        style={{
          background: `${mc.product}88`,
          animation: "bond-form 0.5s ease-out forwards",
          animationDelay: "1.3s",
          opacity: 0,
          right: "28%",
        }}
      />
    </div>
  );
}

function ConditionsPanel({
  conditions,
}: { conditions: AdvancedReaction["conditions"] }) {
  if (!conditions) return null;
  return (
    <div
      className="flex flex-wrap gap-2 mt-2"
      data-ocid="reaction_lab.conditions_panel"
    >
      {conditions.temperature && (
        <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-400/25 text-orange-300 font-medium">
          <Thermometer className="w-3 h-3" /> {conditions.temperature}
        </span>
      )}
      {conditions.pressure && (
        <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 font-medium">
          <span className="text-[10px]">⬟</span> {conditions.pressure}
        </span>
      )}
      {conditions.catalyst && (
        <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/25 text-purple-300 font-medium">
          <span className="text-[10px]">⚗</span> {conditions.catalyst}
        </span>
      )}
    </div>
  );
}

function EnergyIndicator({ energyChange }: { energyChange: string }) {
  const isExo = energyChange.toLowerCase() === "exothermic";
  return (
    <motion.div
      key={energyChange}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl px-5 py-4 flex items-center gap-4",
        isExo
          ? "border border-orange-400/30 bg-orange-500/10"
          : "border border-sky-400/30 bg-sky-500/10",
      )}
      style={{
        animationName: isExo ? "exoGlow" : "endoGlow",
        animationDuration: "2.4s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}
      data-ocid="reaction_lab.energy_indicator"
    >
      <span className="text-2xl">{isExo ? "🔥" : "❄️"}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm capitalize mb-1">
          {energyChange} Reaction
        </div>
        <div className="text-xs text-muted-foreground mb-1.5">
          {isExo
            ? "Energy released to surroundings"
            : "Energy absorbed from surroundings"}
        </div>
        <div className="relative h-2 rounded-full bg-card/30 border border-border/20 overflow-hidden">
          <motion.div
            className={cn(
              "absolute inset-y-0 rounded-full",
              isExo
                ? "right-0 bg-gradient-to-l from-orange-400 to-orange-600"
                : "left-0 bg-gradient-to-r from-sky-400 to-sky-600",
            )}
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex-shrink-0 flex flex-col items-center",
          isExo ? "text-orange-400" : "text-sky-400",
        )}
      >
        {isExo ? (
          <ArrowDown className="w-5 h-5" />
        ) : (
          <ArrowUp className="w-5 h-5" />
        )}
        <span className="text-[10px] font-medium mt-0.5">
          {isExo ? "ΔH < 0" : "ΔH > 0"}
        </span>
      </div>
    </motion.div>
  );
}

/** Single reaction card */
const ReactionCard = memo(function ReactionCard({
  reaction,
  isSelected,
  onClick,
  index,
}: {
  reaction: AdvancedReaction;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const typeClass =
    TYPE_COLORS[reaction.reactionType.toLowerCase()] ??
    "bg-card/40 border-border/30 text-muted-foreground";
  const hasSteps = (reaction.steps?.length ?? 0) > 1;
  // Derive a glow color from the type color string for selected state
  const glowStyle = isSelected
    ? {
        boxShadow:
          reaction.energyChange.toLowerCase() === "exothermic"
            ? "0 0 18px 3px rgba(251,146,60,0.28), 0 0 0 2px rgba(251,146,60,0.18)"
            : "0 0 18px 3px rgba(56,189,248,0.28), 0 0 0 2px rgba(56,189,248,0.18)",
      }
    : {};
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onClick}
      className={cn(
        "glass-reaction rounded-2xl p-4 text-left w-full transition-all duration-300",
        isSelected ? "ring-2 ring-accent/60 bg-accent/10" : "hover:bg-card/30",
      )}
      style={glowStyle}
      data-ocid={`reaction_lab.reaction_card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-sm text-foreground leading-snug">
          {reaction.name}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {hasSteps && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/20 border border-accent/30 text-accent font-bold uppercase tracking-wide">
              Multi-step
            </span>
          )}
          {isSelected && (
            <span className="w-4 h-4 rounded-full bg-accent/80 flex items-center justify-center">
              <span className="text-[10px] text-accent-foreground font-bold">
                ✓
              </span>
            </span>
          )}
        </div>
      </div>
      <div className="font-mono text-xs text-foreground/70 mb-3 leading-relaxed break-all">
        {reaction.balancedEquation}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-medium border",
            typeClass,
          )}
        >
          {reaction.reactionType}
        </span>
        <span
          className={cn(
            "text-[10px] font-medium",
            reaction.energyChange.toLowerCase() === "exothermic"
              ? "text-orange-400"
              : "text-sky-400",
          )}
        >
          {reaction.energyChange}
        </span>
        {reaction.conditions && (
          <span className="text-[10px] text-muted-foreground/70">
            {[reaction.conditions.temperature, reaction.conditions.catalyst]
              .filter(Boolean)
              .join(" · ")}
          </span>
        )}
      </div>
    </motion.button>
  );
});

// ─── Equation Input Panel ─────────────────────────────────────────────────────
function EquationInput({
  reactions,
  onMatch,
}: {
  reactions: AdvancedReaction[];
  onMatch: (id: string | null) => void;
}) {
  const [inputVal, setInputVal] = useState("");
  const [searchState, setSearchState] = useState<"idle" | "found" | "notfound">(
    "idle",
  );
  const [matchedName, setMatchedName] = useState("");
  const [suggestions, setSuggestions] = useState<AdvancedReaction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Compute autocomplete suggestions as user types
  useEffect(() => {
    const term = inputVal.trim();
    if (term.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const needle = normalise(term);
    const matched = reactions
      .filter((r) => {
        const haystack = normalise(
          [
            r.name,
            ...r.reactants.map((rc) => `${rc.symbol} ${rc.name}`),
            ...r.products.map((p) => `${p.symbol} ${p.name}`),
          ].join(" "),
        );
        return haystack.includes(needle);
      })
      .slice(0, 6);
    setSuggestions(matched);
    setShowDropdown(matched.length > 0);
    setHighlightIdx(-1);
  }, [inputVal, reactions]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectSuggestion = useCallback(
    (rxn: AdvancedReaction) => {
      setInputVal(rxn.name);
      setShowDropdown(false);
      setSuggestions([]);
      setSearchState("found");
      setMatchedName(rxn.name);
      onMatch(rxn.id);
    },
    [onMatch],
  );

  const handleSearch = useCallback(() => {
    const term = inputVal.trim();
    if (!term) return;
    setShowDropdown(false);
    const found = reactions.find((r) => matchesSearch(r, term));
    if (found) {
      setSearchState("found");
      setMatchedName(found.name);
      onMatch(found.id);
    } else {
      setSearchState("notfound");
      onMatch(null);
    }
  }, [inputVal, reactions, onMatch]);

  const handleClear = useCallback(() => {
    setInputVal("");
    setSearchState("idle");
    setSuggestions([]);
    setShowDropdown(false);
    onMatch(null);
  }, [onMatch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
        return;
      }
      if (!showDropdown || suggestions.length === 0) {
        if (e.key === "Enter") handleSearch();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIdx((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIdx((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        if (highlightIdx >= 0) {
          selectSuggestion(suggestions[highlightIdx]);
        } else {
          handleSearch();
        }
      }
    },
    [showDropdown, suggestions, highlightIdx, handleSearch, selectSuggestion],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-reaction rounded-2xl p-5 mb-4"
      data-ocid="reaction_lab.equation_input_panel"
    >
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-4 h-4 text-sky-400 flex-shrink-0" />
        <span className="font-display font-semibold text-sm">
          Search by Equation
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Type a chemical equation or reaction name. Example:{" "}
        <span className="font-mono text-foreground/60">H₂ + O₂</span> or{" "}
        <span className="font-mono text-foreground/60">Haber</span>
      </p>
      <div className="flex gap-2" ref={wrapperRef}>
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setSearchState("idle");
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            placeholder="e.g. H₂ + O₂ → H₂O or Grignard..."
            className="w-full bg-card/30 border border-border/30 rounded-xl px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-all pr-8"
            data-ocid="reaction_lab.equation_search_input"
            autoComplete="off"
          />
          {inputVal && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showDropdown && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset",
                }}
                data-ocid="reaction_lab.autocomplete_dropdown"
              >
                {suggestions.map((rxn, si) => (
                  <button
                    key={rxn.id}
                    type="button"
                    onMouseEnter={() => setHighlightIdx(si)}
                    onMouseLeave={() => setHighlightIdx(-1)}
                    onClick={() => selectSuggestion(rxn)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 group",
                      si === highlightIdx ? "bg-white/10" : "hover:bg-white/5",
                      si > 0 && "border-t border-white/5",
                    )}
                    data-ocid={`reaction_lab.autocomplete_item.${si + 1}`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: `${rxn.moleculeColors?.reactant1 ?? "#6366f1"}22`,
                        border: `1px solid ${rxn.moleculeColors?.reactant1 ?? "#6366f1"}44`,
                      }}
                    >
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground/90 truncate">
                        {rxn.name}
                      </div>
                      <div className="text-[11px] font-mono text-muted-foreground truncate">
                        {rxn.balancedEquation}
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full border flex-shrink-0",
                        TYPE_COLORS[rxn.reactionType.toLowerCase()] ??
                          "bg-card/40 border-border/30 text-muted-foreground",
                      )}
                    >
                      {rxn.reactionType}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSearch}
          className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold flex items-center gap-1.5 flex-shrink-0 transition-all shadow-lg shadow-primary/20"
          data-ocid="reaction_lab.equation_search_button"
        >
          <Search className="w-3.5 h-3.5" /> Search
        </motion.button>
      </div>

      {/* Result feedback */}
      <AnimatePresence>
        {searchState === "found" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2.5 flex items-center gap-2 text-xs text-accent"
            data-ocid="reaction_lab.equation_search.success_state"
          >
            <span className="w-4 h-4 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-[10px]">
              ✓
            </span>
            Matched: <span className="font-semibold">{matchedName}</span>
            <span className="text-muted-foreground">— selected below</span>
          </motion.div>
        )}
        {searchState === "notfound" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2.5 flex items-center gap-2 text-xs text-orange-400"
            data-ocid="reaction_lab.equation_search.error_state"
          >
            <span className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-[10px]">
              !
            </span>
            Reaction not found. Try selecting from the list below.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Highlighted Equation Display ────────────────────────────────────────────
function HighlightedEquation({ equation }: { equation: string }) {
  // Split on → or ⇌ separator
  const sepMatch = equation.match(/(→|⇌)/);
  if (!sepMatch || sepMatch.index == null) {
    return (
      <span className="font-mono text-sm font-semibold text-foreground break-all">
        {equation}
      </span>
    );
  }
  const sep = sepMatch[0];
  const idx = sepMatch.index;
  const reactantsPart = equation.slice(0, idx).trim();
  const productsPart = equation.slice(idx + sep.length).trim();
  return (
    <span className="font-mono text-sm font-semibold break-all leading-relaxed">
      <span
        className="rounded px-1"
        style={{
          color: "#93c5fd",
          background: "rgba(56,189,248,0.08)",
          textShadow: "0 0 10px rgba(56,189,248,0.4)",
        }}
      >
        {reactantsPart}
      </span>
      <span className="mx-2 text-base font-bold text-foreground">{sep}</span>
      <span
        className="rounded px-1"
        style={{
          color: "#6ee7b7",
          background: "rgba(52,211,153,0.08)",
          textShadow: "0 0 10px rgba(52,211,153,0.4)",
        }}
      >
        {productsPart}
      </span>
    </span>
  );
}

// ─── Enhanced Steps Panel (expandable color-coded cards) ─────────────────────
const STEP_STAGE_CONFIG = [
  {
    title: "Reactants",
    borderColor: "#3b82f6",
    badge: "bg-blue-500/20 border-blue-400/30 text-blue-300",
  },
  {
    title: "Bond Breaking",
    borderColor: "#f97316",
    badge: "bg-orange-500/20 border-orange-400/30 text-orange-300",
  },
  {
    title: "Reaction",
    borderColor: "#8b5cf6",
    badge: "bg-violet-500/20 border-violet-400/30 text-violet-300",
  },
  {
    title: "Products",
    borderColor: "#22c55e",
    badge: "bg-green-500/20 border-green-400/30 text-green-300",
  },
  {
    title: "Observations",
    borderColor: "#14b8a6",
    badge: "bg-teal-500/20 border-teal-400/30 text-teal-300",
  },
];

function EnhancedStepsPanel({
  steps,
  intermediates,
}: { steps: ReactionStep[]; intermediates?: string[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="space-y-2" data-ocid="reaction_lab.enhanced_steps_panel">
      {intermediates && intermediates.length > 0 && (
        <div className="glass rounded-xl p-3 mb-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Intermediates
          </div>
          <div className="flex flex-wrap gap-1.5">
            {intermediates.map((im) => (
              <span
                key={im}
                className="text-[11px] px-2 py-0.5 rounded-full bg-primary/15 border border-primary/25 text-primary/80"
              >
                {im}
              </span>
            ))}
          </div>
        </div>
      )}
      {steps.map((step, i) => {
        const isOpen = openIdx === i;
        const cfg =
          STEP_STAGE_CONFIG[Math.min(i, STEP_STAGE_CONFIG.length - 1)];
        const stageLabel =
          i === 0
            ? "Reactants"
            : i === steps.length - 1
              ? "Products"
              : i === 1
                ? "Bond Breaking"
                : i === 2
                  ? "Reaction"
                  : "Observations";
        return (
          <div
            key={`step-${step.equation.slice(0, 16)}-${i}`}
            className="rounded-xl border transition-all duration-200 overflow-hidden"
            style={{
              borderColor: isOpen
                ? `${cfg.borderColor}60`
                : "rgba(255,255,255,0.08)",
              background: isOpen
                ? `${cfg.borderColor}0a`
                : "rgba(255,255,255,0.02)",
              borderLeft: `3px solid ${cfg.borderColor}`,
            }}
          >
            <button
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              data-ocid={`reaction_lab.step_card.${i + 1}`}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 border",
                  cfg.badge,
                )}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wide"
                    style={{ color: cfg.borderColor }}
                  >
                    {stageLabel}
                  </span>
                </div>
                <span className="font-mono text-xs text-foreground/70 block truncate mt-0.5">
                  {step.equation}
                </span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 space-y-1.5">
                    {step.intermediate && (
                      <div
                        className="text-[10px] font-semibold uppercase tracking-wide"
                        style={{ color: cfg.borderColor }}
                      >
                        Intermediate: {step.intermediate}
                      </div>
                    )}
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      {step.description}
                    </p>
                    {step.conditions && (
                      <ConditionsPanel conditions={step.conditions} />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Category Tabs ─────────────────────────────────────────────────────────────
function CategoryTabs({
  active,
  onChange,
  counts,
}: {
  active: ReactionCategory | "all";
  onChange: (c: ReactionCategory | "all") => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mb-4"
      data-ocid="reaction_lab.category_tabs"
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        const count = counts[cat.id] ?? 0;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={cn(
              "flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap border",
              isActive
                ? "bg-accent/20 border-accent/50 text-accent shadow-[0_0_12px_2px_rgba(var(--accent)/0.25)]"
                : "bg-card/20 border-border/20 text-muted-foreground hover:text-foreground hover:border-border/40",
            )}
            data-ocid={`reaction_lab.category_tab.${cat.id}`}
          >
            {cat.label}
            {count > 0 && (
              <span
                className={cn(
                  "ml-1.5 text-[9px] opacity-70",
                  isActive ? "text-accent" : "text-muted-foreground",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Search bar for reaction list ─────────────────────────────────────────────
function ListSearchBar({
  value,
  onChange,
}: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search reactions, elements, types..."
        className="w-full bg-card/20 border border-border/20 rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all"
        data-ocid="reaction_lab.list_search_input"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function ReactionLabPage() {
  const { data: backendReactions } = useReactions();

  const reactions = useMemo<AdvancedReaction[]>(() => {
    if (backendReactions && backendReactions.length > 0) {
      const backendMap = new Map(
        backendReactions.map((r) => [r.id, r as AdvancedReaction]),
      );
      return BUILTIN_REACTIONS.map((b) => backendMap.get(b.id) ?? b);
    }
    return BUILTIN_REACTIONS;
  }, [backendReactions]);

  const { setReactionResult, reactionResult } = useChemStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCollision, setShowCollision] = useState(false);
  const [reactionAnimating, setReactionAnimating] = useState(false);
  const equationRef = useRef<HTMLDivElement>(null);
  const glowBurstRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<
    ReactionCategory | "all"
  >("all");
  const [listSearch, setListSearch] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Deferred for performance on large lists
  const deferredSearch = useDeferredValue(listSearch);

  const selectedReaction = useMemo(
    () => reactions.find((r) => r.id === selectedId) ?? null,
    [reactions, selectedId],
  );

  const totalSteps = selectedReaction?.steps?.length ?? 0;
  const hasSteps = totalSteps > 1;
  const currentStepData = hasSteps
    ? selectedReaction?.steps?.[currentStep]
    : null;
  const activeConditions =
    currentStepData?.conditions ?? selectedReaction?.conditions;
  const isLastStep = currentStep >= totalSteps - 1;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: reactions.length };
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat.id] = reactions.filter((r) => r.category === cat.id).length;
    }
    return counts;
  }, [reactions]);

  // Filtered reactions
  const filteredReactions = useMemo(() => {
    return reactions.filter((r) => {
      const catOk = activeCategory === "all" || r.category === activeCategory;
      const searchOk = matchesSearch(r, deferredSearch);
      return catOk && searchOk;
    });
  }, [reactions, activeCategory, deferredSearch]);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId((prev) => (prev === id ? null : id));
      setReactionResult(null);
      setCurrentStep(0);
      setShowCollision(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [setReactionResult],
  );

  const handleEquationMatch = useCallback(
    (id: string | null) => {
      if (id) {
        setSelectedId(id);
        setReactionResult(null);
        setCurrentStep(0);
        setShowCollision(false);
      }
    },
    [setReactionResult],
  );

  const handleSimulate = useCallback(() => {
    if (!selectedReaction) return;
    setAnimating(true);
    setShowCollision(true);
    setReactionAnimating(true);

    // Pulse the equation container
    if (equationRef.current) {
      equationRef.current.style.animation = "none";
      void equationRef.current.offsetWidth; // reflow
      equationRef.current.style.animation =
        "eq-pulse 0.3s ease-in-out forwards";
    }
    // Trigger glow burst
    if (glowBurstRef.current) {
      glowBurstRef.current.style.animation = "none";
      void glowBurstRef.current.offsetWidth;
      glowBurstRef.current.style.animation =
        "glow-burst 0.6s ease-out forwards";
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setReactionResult(selectedReaction);
      setAnimating(false);
      setShowCollision(false);
      setReactionAnimating(false);
    }, 1900);
  }, [selectedReaction, setReactionResult]);

  const handleNextStep = useCallback(() => {
    if (!hasSteps || isLastStep) return;
    setCurrentStep((s) => s + 1);
    setReactionResult(null);
    setShowCollision(false);
  }, [hasSteps, isLastStep, setReactionResult]);

  const handleReset = useCallback(() => {
    setSelectedId(null);
    setReactionResult(null);
    setCurrentStep(0);
    setShowCollision(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [setReactionResult]);

  return (
    <div className="min-h-screen px-4 py-10" data-ocid="reaction_lab.page">
      <style>{COLLISION_KEYFRAMES}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4">
          <FlaskConical className="w-4 h-4 text-sky-400" />
          <span>Type an equation • Filter by category • Run simulation</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
          Reaction Lab
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Explore {reactions.length} chemical reactions — search by equation,
          filter by type, and simulate mechanisms.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_440px] gap-6">
        {/* ── Left: Equation input + category tabs + reaction list ── */}
        <div>
          {/* Equation input */}
          <EquationInput reactions={reactions} onMatch={handleEquationMatch} />

          {/* Category filter tabs */}
          <CategoryTabs
            active={activeCategory}
            onChange={setActiveCategory}
            counts={categoryCounts}
          />

          {/* List search */}
          <ListSearchBar value={listSearch} onChange={setListSearch} />

          {/* Reaction list header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold">
              {activeCategory === "all"
                ? "All Reactions"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredReactions.length} reactions
            </span>
          </div>

          {/* Empty state */}
          {filteredReactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground text-sm"
              data-ocid="reaction_lab.empty_state"
            >
              <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No reactions match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setListSearch("");
                  setActiveCategory("all");
                }}
                className="mt-2 text-xs text-accent hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div
              className="grid sm:grid-cols-2 gap-3"
              data-ocid="reaction_lab.reaction_list"
            >
              {filteredReactions.map((rxn, i) => (
                <ReactionCard
                  key={rxn.id}
                  reaction={rxn}
                  index={i}
                  isSelected={selectedId === rxn.id}
                  onClick={() => handleSelect(rxn.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Simulator panel ── */}
        <div className="lg:sticky lg:top-24 self-start space-y-4">
          <div
            className="glass-reaction rounded-2xl p-5"
            data-ocid="reaction_lab.simulator_panel"
          >
            <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Reaction Simulator
              {hasSteps && (
                <span className="ml-auto text-xs text-muted-foreground font-normal">
                  Step {currentStep + 1} of {totalSteps}
                </span>
              )}
            </h2>

            {!selectedReaction ? (
              <div
                className="text-center py-10 text-muted-foreground text-sm"
                data-ocid="reaction_lab.empty_state"
              >
                <FlaskConical className="w-10 h-10 mx-auto mb-3 opacity-30" />
                Select a reaction from the list to begin
              </div>
            ) : (
              <>
                {/* Reaction name + type badge row */}
                <div className="mb-3">
                  <h3 className="font-display font-bold text-base text-foreground mb-2 leading-tight">
                    {selectedReaction.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                        TYPE_COLORS[
                          selectedReaction.reactionType.toLowerCase()
                        ] ??
                          "bg-card/40 border-border/30 text-muted-foreground",
                      )}
                    >
                      {selectedReaction.reactionType.charAt(0).toUpperCase() +
                        selectedReaction.reactionType.slice(1)}
                    </span>
                    {hasSteps && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-medium">
                        {totalSteps}-step mechanism
                      </span>
                    )}
                    {selectedReaction.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-card/30 border border-border/20 text-muted-foreground capitalize">
                        {selectedReaction.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Balanced equation — prominent display with highlighting + glow burst */}
                <div className="relative mb-3">
                  <div
                    ref={equationRef}
                    className="glass rounded-xl p-3 text-center relative overflow-hidden"
                    data-ocid="reaction_lab.balanced_equation"
                  >
                    <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                      Balanced Equation
                    </div>
                    <div className="leading-relaxed">
                      <HighlightedEquation
                        equation={selectedReaction.balancedEquation}
                      />
                    </div>
                  </div>
                  {/* Glow burst overlay */}
                  <div
                    ref={glowBurstRef}
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, ${selectedReaction.moleculeColors?.product ?? "#34d399"}55, transparent 70%)`,
                      opacity: 0,
                    }}
                  />
                  {/* Product info chip */}
                  {(() => {
                    const mainProduct = selectedReaction.products[0];
                    const formula = mainProduct?.formula ?? mainProduct?.symbol;
                    const mw = formula ? PRODUCT_MW[formula] : undefined;
                    if (!formula) return null;
                    return (
                      <div className="flex items-center gap-2 justify-center mt-2 flex-wrap">
                        <span
                          className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border font-mono"
                          style={{
                            background: "rgba(52,211,153,0.08)",
                            borderColor: "rgba(52,211,153,0.25)",
                            color: "#86efac",
                          }}
                          data-ocid="reaction_lab.product_formula_chip"
                        >
                          <span className="text-[9px] opacity-60 font-sans">
                            Main product
                          </span>
                          {formula}
                        </span>
                        {mw && (
                          <span
                            className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              borderColor: "rgba(255,255,255,0.10)",
                              color: "rgba(255,255,255,0.5)",
                            }}
                            data-ocid="reaction_lab.product_mw_chip"
                          >
                            <span className="text-[9px] opacity-60">MW</span>{" "}
                            {mw}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Conditions */}
                {activeConditions && (
                  <ConditionsPanel conditions={activeConditions} />
                )}

                {/* Multi-step step indicator */}
                {hasSteps && currentStepData && (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-3 glass rounded-xl p-3"
                  >
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Step {currentStep + 1} —{" "}
                      {currentStepData.intermediate ?? "Mechanism"}
                    </div>
                    <div className="font-mono text-xs text-accent mb-2 break-all">
                      {currentStepData.equation}
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </motion.div>
                )}

                {/* Reactants — blue highlighted */}
                <div className="mt-3 mb-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {hasSteps ? "Starting Reactants" : "Reactants"}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedReaction.reactants.map((r, ri) => (
                      <span key={r.symbol}>
                        {ri > 0 && (
                          <Plus className="w-3 h-3 text-muted-foreground inline mx-1" />
                        )}
                        <span
                          className="px-3 py-1.5 rounded-lg font-mono text-sm inline-block transition-all"
                          style={{
                            background: "rgba(56,189,248,0.10)",
                            border: "1px solid rgba(56,189,248,0.25)",
                            color: "#93c5fd",
                            animation: reactionAnimating
                              ? `reactant-flash 0.6s ease-out ${ri * 100}ms forwards`
                              : undefined,
                          }}
                        >
                          {Number(r.coefficient) > 1 && (
                            <span className="opacity-70 mr-0.5">
                              {String(r.coefficient)}
                            </span>
                          )}
                          {r.symbol}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulation / collision area */}
                <div className="mb-4">
                  <AnimatePresence mode="wait">
                    {showCollision ? (
                      <motion.div
                        key="collision"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <CollisionAnimation reaction={selectedReaction} />
                      </motion.div>
                    ) : reactionResult ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-3"
                        data-ocid="reaction_lab.success_state"
                      >
                        {/* Products — green highlighted with glow-in animation */}
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Products
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {reactionResult.products.map((p, pi) => (
                              <span key={p.formula ?? p.symbol}>
                                {pi > 0 && (
                                  <Plus className="w-3 h-3 text-muted-foreground inline mx-1" />
                                )}
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{
                                    delay: pi * 0.1,
                                    duration: 0.4,
                                    ease: "easeOut",
                                  }}
                                  className="px-3 py-1.5 rounded-lg font-mono text-sm inline-block"
                                  style={{
                                    background: "rgba(52,211,153,0.12)",
                                    border: "1px solid rgba(52,211,153,0.30)",
                                    color: "#6ee7b7",
                                    animation: `product-glow-in 0.6s ease-out ${pi * 100}ms forwards`,
                                  }}
                                >
                                  {Number(p.coefficient) > 1 && (
                                    <span className="opacity-70 mr-0.5">
                                      {String(p.coefficient)}
                                    </span>
                                  )}
                                  {p.formula ?? p.symbol}
                                </motion.span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced steps panel */}
                        {(selectedReaction as AdvancedReaction).steps &&
                          (selectedReaction as AdvancedReaction).steps!.length >
                            0 && (
                            <div>
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Step-by-step Mechanism
                              </div>
                              <EnhancedStepsPanel
                                steps={
                                  (selectedReaction as AdvancedReaction).steps!
                                }
                                intermediates={
                                  (selectedReaction as AdvancedReaction)
                                    .intermediates
                                }
                              />
                            </div>
                          )}

                        {/* Observations */}
                        {reactionResult.observations.length > 0 && (
                          <div className="glass rounded-xl p-3">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              Observations
                            </div>
                            {reactionResult.observations.map((obs) => (
                              <div
                                key={obs}
                                className="flex items-start gap-2 text-xs text-foreground/80 mb-1"
                              >
                                <ArrowRight className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                                {obs}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Key facts strip */}
                        <div className="glass rounded-xl p-3 border-l-2 border-accent/40">
                          <div className="text-xs font-semibold text-accent/80 uppercase tracking-wider mb-2">
                            Key Facts
                          </div>
                          <div className="space-y-1 text-xs text-foreground/75">
                            <p>
                              \u25b8 <strong>Theory:</strong>{" "}
                              {reactionResult.description}
                            </p>
                            <p>
                              \u25b8 <strong>Mechanism insight:</strong>{" "}
                              {(reactionResult as AdvancedReaction).steps?.[0]
                                ?.description ??
                                "Refer to steps above for mechanism details."}
                            </p>
                            <p>
                              \u25b8 <strong>Application:</strong>{" "}
                              {(reactionResult as AdvancedReaction).category ===
                              "industrial"
                                ? "Used at industrial scale in chemical manufacturing."
                                : (reactionResult as AdvancedReaction)
                                      .category === "electrochemical"
                                  ? "Applied in batteries, electrolysis, and electrochemical cells."
                                  : (reactionResult as AdvancedReaction)
                                        .category === "named"
                                    ? "Classic named reaction used in organic synthesis and JEE/NEET examinations."
                                    : "Found in laboratories, industry, and biological systems."}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass rounded-xl p-4 text-center text-sm text-muted-foreground"
                      >
                        {selectedReaction.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSimulate}
                    disabled={animating}
                    className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                    data-ocid="reaction_lab.simulate_button"
                  >
                    <Zap className="w-4 h-4" />
                    {animating ? "Simulating…" : "Run Reaction"}
                  </motion.button>

                  {hasSteps && !isLastStep && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextStep}
                      disabled={animating}
                      className="px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-1.5 glass text-foreground/80 hover:text-foreground disabled:opacity-40 transition-all"
                      data-ocid="reaction_lab.next_step_button"
                    >
                      <ArrowRight className="w-4 h-4" /> Next
                    </motion.button>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="glass px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all"
                    data-ocid="reaction_lab.reset_button"
                    aria-label="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Step progress dots */}
                {hasSteps && (
                  <div
                    className="flex items-center justify-center gap-1.5 mt-3"
                    data-ocid="reaction_lab.step_indicator"
                  >
                    {Array.from({ length: totalSteps }, (_, i) => i).map(
                      (i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setCurrentStep(i);
                            setReactionResult(null);
                            setShowCollision(false);
                          }}
                          className={cn(
                            "rounded-full transition-all duration-300",
                            i === currentStep
                              ? "w-5 h-2 bg-accent"
                              : i < currentStep
                                ? "w-2 h-2 bg-accent/50"
                                : "w-2 h-2 bg-border/50",
                          )}
                          aria-label={`Go to step ${i + 1}`}
                          data-ocid={`reaction_lab.step_dot.${i + 1}`}
                        />
                      ),
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Energy indicator */}
          {selectedReaction && (
            <EnergyIndicator energyChange={selectedReaction.energyChange} />
          )}
        </div>
      </div>
    </div>
  );
}
