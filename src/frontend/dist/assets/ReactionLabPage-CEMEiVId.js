import { c as createLucideIcon, r as reactExports, a as useChemStore, j as jsxRuntimeExports, m as motion, F as FlaskConical, S as Search, Z as Zap, h as cn, t as Plus, l as AnimatePresence, X, g as ChevronDown } from "./index-DyyHqAHL.js";
import { a as useReactions } from "./useChemistry-LgPqHx3p.js";
import { A as ArrowRight } from "./arrow-right-CLwuw6ws.js";
import { C as ChevronRight } from "./chevron-right-6gh7dKif.js";
import { T as Thermometer } from "./thermometer-BlCba5xD.js";
import { C as ChevronUp } from "./chevron-up-B48SwRlR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "inorganic", label: "Inorganic" },
  { id: "organic", label: "Organic" },
  { id: "industrial", label: "Industrial" },
  { id: "named", label: "Named Reactions" },
  { id: "electrochemical", label: "Electrochemical" }
];
const BUILTIN_REACTIONS = [
  {
    id: "haber-process",
    name: "Haber Process",
    category: "industrial",
    reactants: [
      { symbol: "N₂", name: "Nitrogen", coefficient: 1n },
      { symbol: "H₂", name: "Hydrogen", coefficient: 3n }
    ],
    products: [
      { symbol: "NH₃", name: "Ammonia", formula: "NH₃", coefficient: 2n }
    ],
    balancedEquation: "N₂ + 3H₂ ⇌ 2NH₃",
    reactionType: "synthesis",
    energyChange: "exothermic",
    description: "Industrial synthesis of ammonia — the foundation of fertilizers worldwide.",
    observations: [
      "Reversible reaction (⇌) — equilibrium established",
      "Yield ~15% per pass; unused gases recycled",
      "ΔH = −92 kJ/mol"
    ],
    conditions: {
      temperature: "450 °C",
      pressure: "200 atm",
      catalyst: "Fe (iron)"
    },
    steps: [
      {
        equation: "N₂ + 3H₂ → intermediate [N–H species on Fe surface]",
        description: "N₂ and H₂ adsorb onto the iron catalyst surface. N≡N triple bond begins to weaken.",
        conditions: {
          temperature: "450 °C",
          pressure: "200 atm",
          catalyst: "Fe (iron)"
        },
        intermediate: "Fe-adsorbed N·H radicals"
      },
      {
        equation: "N(ads) + 3H(ads) → NH₃(ads)",
        description: "Adsorbed nitrogen atoms react stepwise with hydrogen atoms forming NH₃.",
        conditions: {
          temperature: "450 °C",
          pressure: "200 atm",
          catalyst: "Fe (iron)"
        },
        intermediate: "NH, NH₂ surface species"
      },
      {
        equation: "N₂ + 3H₂ ⇌ 2NH₃   ΔH = −92 kJ/mol",
        description: "Ammonia desorbs from the surface. Equilibrium favours ammonia at high pressure. Unreacted gases are recycled.",
        conditions: {
          temperature: "450 °C",
          pressure: "200 atm",
          catalyst: "Fe (iron)"
        }
      }
    ],
    intermediates: ["Fe-surface N radicals", "NH and NH₂ species"],
    moleculeColors: {
      reactant1: "#6366f1",
      reactant2: "#38bdf8",
      product: "#34d399"
    }
  },
  {
    id: "contact-process",
    name: "Contact Process (SO₃)",
    category: "industrial",
    reactants: [
      { symbol: "SO₂", name: "Sulphur Dioxide", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", coefficient: 1n }
    ],
    products: [
      {
        symbol: "SO₃",
        name: "Sulphur Trioxide",
        formula: "SO₃",
        coefficient: 2n
      }
    ],
    balancedEquation: "2SO₂ + O₂ ⇌ 2SO₃",
    reactionType: "redox",
    energyChange: "exothermic",
    description: "Key step in sulphuric acid manufacture — one of the highest-volume industrial chemicals.",
    observations: [
      "Reversible reaction — 98% conversion achieved industrially",
      "V₂O₅ catalyst lowers activation energy",
      "ΔH = −197 kJ/mol"
    ],
    conditions: {
      temperature: "450 °C",
      pressure: "1–2 atm",
      catalyst: "V₂O₅"
    },
    steps: [
      {
        equation: "SO₂ + V₂O₅ → SO₃ + V₂O₄",
        description: "SO₂ is oxidised to SO₃ by the vanadium(V) oxide catalyst, which is itself reduced to V₂O₄.",
        conditions: { temperature: "450 °C", catalyst: "V₂O₅" },
        intermediate: "V₂O₄"
      },
      {
        equation: "V₂O₄ + ½O₂ → V₂O₅",
        description: "The reduced V₂O₄ is re-oxidised back to V₂O₅ by atmospheric oxygen, completing the catalytic cycle.",
        conditions: { temperature: "450 °C" }
      },
      {
        equation: "SO₃ + H₂SO₄ → H₂S₂O₇   then   H₂S₂O₇ + H₂O → 2H₂SO₄",
        description: "SO₃ is absorbed into conc. H₂SO₄ (oleum) rather than water directly, then diluted to give sulphuric acid."
      }
    ],
    intermediates: ["V₂O₄", "H₂S₂O₇ (oleum)"],
    moleculeColors: {
      reactant1: "#fb923c",
      reactant2: "#e2e8f0",
      product: "#f59e0b"
    }
  },
  {
    id: "decomp-h2o2",
    name: "Decomposition of H₂O₂",
    category: "inorganic",
    reactants: [{ symbol: "H₂O₂", name: "Hydrogen Peroxide", coefficient: 2n }],
    products: [
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", formula: "O₂", coefficient: 1n }
    ],
    balancedEquation: "2H₂O₂ → 2H₂O + O₂↑",
    reactionType: "decomposition",
    energyChange: "exothermic",
    description: "Hydrogen peroxide decomposes into water and oxygen, dramatically accelerated by MnO₂.",
    observations: [
      "Vigorous bubbling (O₂ released)",
      "Glowing splint relights",
      "Flask gets warm — exothermic"
    ],
    conditions: { catalyst: "MnO₂" },
    steps: [
      {
        equation: "H₂O₂ + MnO₂ → [H₂O₂–MnO₂ complex]",
        description: "MnO₂ surface adsorbs H₂O₂ molecules, forming an activated complex.",
        conditions: { catalyst: "MnO₂" },
        intermediate: "H₂O₂–MnO₂ adsorption complex"
      },
      {
        equation: "2H₂O₂ → 2H₂O + O₂↑",
        description: "O–O bond in H₂O₂ breaks. Oxygen atoms combine and release as O₂ gas; MnO₂ is regenerated.",
        conditions: { catalyst: "MnO₂" }
      }
    ],
    moleculeColors: { reactant1: "#818cf8", product: "#38bdf8" }
  },
  {
    id: "combustion-methane",
    name: "Combustion of Methane",
    category: "organic",
    reactants: [
      { symbol: "CH₄", name: "Methane", coefficient: 1n },
      { symbol: "O₂", name: "Oxygen", coefficient: 2n }
    ],
    products: [
      {
        symbol: "CO₂",
        name: "Carbon Dioxide",
        formula: "CO₂",
        coefficient: 1n
      },
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 2n }
    ],
    balancedEquation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    reactionType: "combustion",
    energyChange: "exothermic",
    description: "Complete combustion of methane (natural gas) — the primary fuel for cooking and heating.",
    observations: [
      "Blue flame produced",
      "CO₂ turns limewater milky",
      "ΔH = −890 kJ/mol"
    ],
    conditions: { temperature: "Ignition temp. ~600 °C" },
    moleculeColors: {
      reactant1: "#94a3b8",
      reactant2: "#e2e8f0",
      product: "#34d399"
    }
  },
  {
    id: "acid-hcl-zn",
    name: "Zinc + Hydrochloric Acid",
    category: "inorganic",
    reactants: [
      { symbol: "Zn", name: "Zinc", coefficient: 1n },
      { symbol: "HCl", name: "Hydrochloric Acid", coefficient: 2n }
    ],
    products: [
      {
        symbol: "ZnCl₂",
        name: "Zinc Chloride",
        formula: "ZnCl₂",
        coefficient: 1n
      },
      { symbol: "H₂", name: "Hydrogen Gas", formula: "H₂", coefficient: 1n }
    ],
    balancedEquation: "Zn + 2HCl → ZnCl₂ + H₂↑",
    reactionType: "single displacement",
    energyChange: "exothermic",
    description: "Zinc displaces hydrogen from HCl, producing zinc chloride and H₂ gas.",
    observations: [
      "Vigorous effervescence",
      "Zinc dissolves",
      "H₂ burns with squeaky pop"
    ],
    moleculeColors: {
      reactant1: "#a3a3a3",
      reactant2: "#38bdf8",
      product: "#f59e0b"
    }
  },
  {
    id: "neutralisation-naoh-hcl",
    name: "NaOH + HCl Neutralisation",
    category: "inorganic",
    reactants: [
      { symbol: "NaOH", name: "Sodium Hydroxide", coefficient: 1n },
      { symbol: "HCl", name: "Hydrochloric Acid", coefficient: 1n }
    ],
    products: [
      {
        symbol: "NaCl",
        name: "Sodium Chloride",
        formula: "NaCl",
        coefficient: 1n
      },
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 1n }
    ],
    balancedEquation: "NaOH + HCl → NaCl + H₂O",
    reactionType: "neutralisation",
    energyChange: "exothermic",
    description: "Strong base reacts with strong acid to form a neutral salt and water.",
    observations: [
      "pH shifts to 7",
      "Slight temperature rise (~57 kJ/mol)",
      "Indicator turns green"
    ],
    moleculeColors: {
      reactant1: "#c084fc",
      reactant2: "#fb923c",
      product: "#e2e8f0"
    }
  },
  {
    id: "redox-thermite",
    name: "Thermite Reaction",
    category: "named",
    reactants: [
      { symbol: "Al", name: "Aluminium", coefficient: 2n },
      { symbol: "Fe₂O₃", name: "Iron(III) Oxide", coefficient: 1n }
    ],
    products: [
      {
        symbol: "Al₂O₃",
        name: "Aluminium Oxide",
        formula: "Al₂O₃",
        coefficient: 1n
      },
      { symbol: "Fe", name: "Iron", formula: "Fe", coefficient: 2n }
    ],
    balancedEquation: "2Al + Fe₂O₃ → Al₂O₃ + 2Fe",
    reactionType: "displacement",
    energyChange: "exothermic",
    description: "Aluminium reduces iron oxide in a spectacular reaction producing molten iron at >2500 °C.",
    observations: [
      ">2500 °C produced",
      "Molten iron pours out",
      "Brilliant white light"
    ],
    conditions: { temperature: ">2500 °C (self-sustaining)" },
    moleculeColors: {
      reactant1: "#e2e8f0",
      reactant2: "#f97316",
      product: "#fbbf24"
    }
  },
  {
    id: "synthesis-water",
    name: "Formation of Water",
    category: "inorganic",
    reactants: [
      { symbol: "H₂", name: "Hydrogen", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", coefficient: 1n }
    ],
    products: [
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 2n }
    ],
    balancedEquation: "2H₂ + O₂ → 2H₂O",
    reactionType: "synthesis",
    energyChange: "exothermic",
    description: "Hydrogen and oxygen combine explosively to form water — or electrochemically in a fuel cell.",
    observations: [
      "Explosive when ignited",
      "286 kJ/mol released",
      "Water vapour formed"
    ],
    moleculeColors: {
      reactant1: "#38bdf8",
      reactant2: "#e2e8f0",
      product: "#818cf8"
    }
  },
  {
    id: "photosynthesis",
    name: "Photosynthesis",
    category: "organic",
    reactants: [
      { symbol: "CO₂", name: "Carbon Dioxide", coefficient: 6n },
      { symbol: "H₂O", name: "Water", coefficient: 6n }
    ],
    products: [
      {
        symbol: "C₆H₁₂O₆",
        name: "Glucose",
        formula: "C₆H₁₂O₆",
        coefficient: 1n
      },
      { symbol: "O₂", name: "Oxygen", formula: "O₂", coefficient: 6n }
    ],
    balancedEquation: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
    reactionType: "synthesis",
    energyChange: "endothermic",
    description: "Plants convert CO₂ and water into glucose using light energy in chloroplasts.",
    observations: [
      "Oxygen released",
      "Starch formed (turns iodine blue)",
      "Requires sunlight"
    ],
    conditions: { catalyst: "Chlorophyll", temperature: "25–35 °C" },
    steps: [
      {
        equation: "Light + H₂O → O₂ + ATP + NADPH  (Light Reactions)",
        description: "Light energy splits water molecules (photolysis), releasing O₂ and producing ATP and NADPH energy carriers.",
        conditions: { catalyst: "Chlorophyll (Photosystems I & II)" },
        intermediate: "ATP, NADPH"
      },
      {
        equation: "CO₂ + ATP + NADPH → G3P  (Calvin Cycle)",
        description: "CO₂ is fixed using ATP and NADPH in the Calvin cycle, producing glyceraldehyde-3-phosphate (G3P).",
        conditions: { catalyst: "RuBisCO enzyme" },
        intermediate: "G3P (3-carbon sugar)"
      },
      {
        equation: "6G3P → C₆H₁₂O₆ (glucose)",
        description: "G3P molecules are assembled into glucose for storage as starch or used directly for cellular energy."
      }
    ],
    intermediates: ["ATP", "NADPH", "G3P"],
    moleculeColors: {
      reactant1: "#34d399",
      reactant2: "#38bdf8",
      product: "#fbbf24"
    }
  },
  {
    id: "electrolysis-water",
    name: "Electrolysis of Water",
    category: "electrochemical",
    reactants: [{ symbol: "H₂O", name: "Water", coefficient: 2n }],
    products: [
      { symbol: "H₂", name: "Hydrogen", formula: "H₂", coefficient: 2n },
      { symbol: "O₂", name: "Oxygen", formula: "O₂", coefficient: 1n }
    ],
    balancedEquation: "2H₂O(l) → 2H₂↑ + O₂↑  (electrical energy)",
    reactionType: "decomposition",
    energyChange: "endothermic",
    description: "Water is split into hydrogen and oxygen using electrical energy — key for green hydrogen production.",
    observations: [
      "Bubbles at both electrodes",
      "H₂:O₂ ratio = 2:1 by volume",
      "Requires DC electricity"
    ],
    conditions: { catalyst: "Electrolyte (dilute H₂SO₄)" },
    steps: [
      {
        equation: "Cathode (−): 4H⁺ + 4e⁻ → 2H₂↑",
        description: "At the cathode (negative electrode), hydrogen ions gain electrons and are reduced to H₂ gas.",
        conditions: { catalyst: "Pt electrode" }
      },
      {
        equation: "Anode (+): 2H₂O → O₂↑ + 4H⁺ + 4e⁻",
        description: "At the anode (positive electrode), water molecules are oxidised, releasing O₂ gas and H⁺ ions.",
        conditions: { catalyst: "Pt electrode" }
      },
      {
        equation: "Overall: 2H₂O(l) → 2H₂ + O₂",
        description: "Net result: water is split into hydrogen (at cathode) and oxygen (at anode). Energy stored in H–H bonds."
      }
    ],
    moleculeColors: { reactant1: "#818cf8", product: "#38bdf8" }
  },
  {
    id: "saponification",
    name: "Saponification (Soap Making)",
    category: "named",
    reactants: [
      { symbol: "Fat", name: "Triglyceride (fat/oil)", coefficient: 1n },
      { symbol: "NaOH", name: "Sodium Hydroxide", coefficient: 3n }
    ],
    products: [
      {
        symbol: "Soap",
        name: "Sodium Fatty Acid Salt",
        formula: "RCOONa",
        coefficient: 3n
      },
      {
        symbol: "C₃H₈O₃",
        name: "Glycerol",
        formula: "C₃H₈O₃",
        coefficient: 1n
      }
    ],
    balancedEquation: "RCOO₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₈O₃",
    reactionType: "hydrolysis",
    energyChange: "exothermic",
    description: "Fats or oils react with a strong base (NaOH) to produce soap and glycerol — the oldest known chemical reaction.",
    observations: [
      "Solution thickens",
      "Soap precipitates when NaCl added",
      "Glycerol remains in solution"
    ],
    conditions: { temperature: "80–100 °C", catalyst: "NaOH (base)" },
    steps: [
      {
        equation: "OH⁻ attacks ester carbonyl C → tetrahedral intermediate",
        description: "Hydroxide ion (nucleophile) attacks the carbonyl carbon of the ester bond in the triglyceride.",
        conditions: { temperature: "80–100 °C", catalyst: "NaOH" },
        intermediate: "Tetrahedral alkoxide intermediate"
      },
      {
        equation: "Tetrahedral intermediate → RCOO⁻ + RO⁻ (alkoxide)",
        description: "The tetrahedral intermediate collapses, releasing a fatty acid carboxylate and the alkoxide leaving group.",
        intermediate: "Fatty acid carboxylate (soap anion)"
      },
      {
        equation: "3 × ester bonds cleaved → 3RCOONa (soap) + C₃H₈O₃ (glycerol)",
        description: "All three ester bonds in the triglyceride are cleaved to yield three soap molecules and one glycerol molecule."
      }
    ],
    intermediates: [
      "Tetrahedral alkoxide intermediate",
      "Fatty acid carboxylate"
    ],
    moleculeColors: {
      reactant1: "#fbbf24",
      reactant2: "#c084fc",
      product: "#34d399"
    }
  },
  {
    id: "ostwald-process",
    name: "Ostwald Process (HNO₃)",
    category: "industrial",
    reactants: [
      { symbol: "NH₃", name: "Ammonia", coefficient: 4n },
      { symbol: "O₂", name: "Oxygen", coefficient: 5n }
    ],
    products: [
      { symbol: "NO", name: "Nitric Oxide", formula: "NO", coefficient: 4n },
      { symbol: "H₂O", name: "Water", formula: "H₂O", coefficient: 6n }
    ],
    balancedEquation: "4NH₃ + 5O₂ → 4NO + 6H₂O  (Step 1 of 3)",
    reactionType: "redox",
    energyChange: "exothermic",
    description: "Industrial production of nitric acid from ammonia — used in fertilisers and explosives.",
    observations: [
      "Brown NO₂ fumes in later steps",
      "High temperature required",
      "Pt-Rh gauze catalyst"
    ],
    conditions: {
      temperature: "900 °C",
      pressure: "1–10 atm",
      catalyst: "Pt-Rh gauze"
    },
    steps: [
      {
        equation: "4NH₃ + 5O₂ → 4NO + 6H₂O",
        description: "Ammonia is catalytically oxidised to nitric oxide (NO) at 900 °C over platinum-rhodium gauze.",
        conditions: {
          temperature: "900 °C",
          pressure: "1–10 atm",
          catalyst: "Pt-Rh gauze"
        },
        intermediate: "NO (nitric oxide)"
      },
      {
        equation: "4NO + 2O₂ → 4NO₂",
        description: "NO is further oxidised to nitrogen dioxide (NO₂), a brown toxic gas.",
        intermediate: "NO₂ (nitrogen dioxide)"
      },
      {
        equation: "3NO₂ + H₂O → 2HNO₃ + NO",
        description: "NO₂ reacts with water to form nitric acid. The NO produced is recycled back to step 2."
      }
    ],
    intermediates: ["NO (nitric oxide)", "NO₂ (nitrogen dioxide)"],
    moleculeColors: {
      reactant1: "#a78bfa",
      reactant2: "#e2e8f0",
      product: "#fb923c"
    }
  },
  {
    id: "sn2-substitution",
    name: "SN2 Nucleophilic Substitution",
    category: "named",
    reactants: [
      { symbol: "R–X", name: "Alkyl Halide", coefficient: 1n },
      { symbol: "Nu⁻", name: "Nucleophile", coefficient: 1n }
    ],
    products: [
      { symbol: "R–Nu", name: "Product", formula: "R–Nu", coefficient: 1n },
      { symbol: "X⁻", name: "Leaving Group", formula: "X⁻", coefficient: 1n }
    ],
    balancedEquation: "R–X + Nu⁻ → R–Nu + X⁻  (inversion of configuration)",
    reactionType: "substitution",
    energyChange: "exothermic",
    description: "Second-order nucleophilic substitution — one step, backside attack, Walden inversion. Rate depends on both nucleophile and substrate.",
    observations: [
      "Inversion of optical activity",
      "Rate = k[RX][Nu⁻]",
      "Favoured with primary substrates"
    ],
    steps: [
      {
        equation: "Nu⁻ approaches C from backside (180° to X)",
        description: "The nucleophile attacks the electrophilic carbon from the side opposite to the leaving group.",
        intermediate: "Transition state — trigonal bipyramidal"
      },
      {
        equation: "[Nu···C···X]‡ → R–Nu + X⁻",
        description: "The transition state collapses simultaneously as the C–X bond breaks and C–Nu bond forms — concerted, single step."
      }
    ],
    intermediates: ["Trigonal bipyramidal transition state [Nu···C···X]‡"],
    moleculeColors: {
      reactant1: "#f472b6",
      reactant2: "#818cf8",
      product: "#34d399"
    }
  },
  {
    id: "sn1-substitution",
    name: "SN1 Nucleophilic Substitution",
    category: "named",
    reactants: [
      { symbol: "R–X", name: "Alkyl Halide (tertiary)", coefficient: 1n },
      { symbol: "Nu", name: "Nucleophile (weak)", coefficient: 1n }
    ],
    products: [
      {
        symbol: "R–Nu",
        name: "Product (racemic)",
        formula: "R–Nu",
        coefficient: 1n
      },
      { symbol: "X⁻", name: "Leaving Group", formula: "X⁻", coefficient: 1n }
    ],
    balancedEquation: "R–X → R⁺ + X⁻  then  R⁺ + Nu → R–Nu",
    reactionType: "substitution",
    energyChange: "exothermic",
    description: "First-order nucleophilic substitution — two steps, carbocation intermediate, racemic product. Rate depends only on substrate.",
    observations: [
      "Racemisation of product",
      "Rate = k[RX]",
      "Favoured with tertiary substrates",
      "Carbocation rearrangements possible"
    ],
    steps: [
      {
        equation: "R–X → R⁺ + X⁻  (slow, rate-determining)",
        description: "The C–X bond breaks heterolytically to form a planar carbocation intermediate.",
        intermediate: "Carbocation R⁺ (trigonal planar)"
      },
      {
        equation: "R⁺ + Nu → R–Nu  (fast)",
        description: "The nucleophile attacks the flat carbocation from both faces, giving a racemic mixture."
      }
    ],
    intermediates: ["Carbocation R⁺"],
    moleculeColors: {
      reactant1: "#f59e0b",
      reactant2: "#a78bfa",
      product: "#34d399"
    }
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
        coefficient: 1n
      }
    ],
    balancedEquation: "2CH₃CHO → CH₃CH(OH)CH₂CHO  (then → CH₃CH=CHCHO + H₂O)",
    reactionType: "condensation",
    energyChange: "exothermic",
    description: "An α-hydrogen-containing carbonyl compound acts as both nucleophile (enolate) and electrophile (aldehyde C=O) to form a β-hydroxy carbonyl compound.",
    observations: [
      "β-hydroxy aldehyde (aldol) formed",
      "Dehydration at 100 °C gives α,β-unsaturated aldehyde",
      "Dilute NaOH catalyses"
    ],
    conditions: { catalyst: "Dilute NaOH", temperature: "Room temp → 100 °C" },
    steps: [
      {
        equation: "CH₃CHO + OH⁻ → ⁻CH₂CHO + H₂O  (enolate formation)",
        description: "Base removes an α-hydrogen to generate the enolate ion (nucleophile).",
        intermediate: "Enolate anion ⁻CH₂CHO"
      },
      {
        equation: "⁻CH₂CHO + CH₃CHO → CH₃CH(O⁻)CH₂CHO",
        description: "Enolate attacks the carbonyl carbon of the second aldehyde molecule.",
        intermediate: "Alkoxide intermediate"
      },
      {
        equation: "CH₃CH(O⁻)CH₂CHO + H₂O → CH₃CH(OH)CH₂CHO + OH⁻",
        description: "Protonation gives the aldol product; OH⁻ is regenerated (catalytic)."
      }
    ],
    intermediates: ["Enolate anion", "Alkoxide intermediate"],
    moleculeColors: { reactant1: "#fbbf24", product: "#34d399" }
  },
  {
    id: "grignard-reaction",
    name: "Grignard Reaction",
    category: "named",
    reactants: [
      { symbol: "RMgX", name: "Grignard Reagent", coefficient: 1n },
      { symbol: "R′CHO", name: "Aldehyde/Ketone", coefficient: 1n }
    ],
    products: [
      {
        symbol: "R–CHOH–R′",
        name: "Secondary Alcohol",
        formula: "R-CHOH-R'",
        coefficient: 1n
      }
    ],
    balancedEquation: "RMgX + R′C=O → R′C(OMgX)R  →(H₃O⁺)→  R′C(OH)R",
    reactionType: "addition",
    energyChange: "exothermic",
    description: "Grignard reagent (organomagnesium halide) adds to a carbonyl group to give an alcohol after workup. One of the most versatile C–C bond-forming reactions.",
    observations: [
      "Reaction done under dry conditions (no water)",
      "C–C bond formed",
      "Primary alcohol from HCHO, secondary from RCHO, tertiary from R₂CO"
    ],
    conditions: { catalyst: "Dry ether solvent", temperature: "0 °C to RT" },
    steps: [
      {
        equation: "Mg + RX → RMgX  (in dry ether)",
        description: "Preparation of the Grignard reagent by reacting Mg with an alkyl halide in anhydrous ether.",
        conditions: { catalyst: "Dry ether", temperature: "0–5 °C" },
        intermediate: "RMgX (Grignard reagent)"
      },
      {
        equation: "RMgX + R′C=O → R′C(OMgX)R",
        description: "The carbanion-like carbon in RMgX attacks the electrophilic carbonyl carbon, forming a magnesium alkoxide.",
        intermediate: "Magnesium alkoxide R′C(OMgX)R"
      },
      {
        equation: "R′C(OMgX)R + H₃O⁺ → R′C(OH)R + Mg²⁺ + X⁻",
        description: "Acid hydrolysis workup cleaves the Mg–O bond to give the free alcohol product."
      }
    ],
    intermediates: ["RMgX (Grignard reagent)", "Magnesium alkoxide"],
    moleculeColors: {
      reactant1: "#818cf8",
      reactant2: "#fbbf24",
      product: "#34d399"
    }
  },
  {
    id: "daniel-cell",
    name: "Daniell Cell (Electrochemical)",
    category: "electrochemical",
    reactants: [
      { symbol: "Zn", name: "Zinc (anode)", coefficient: 1n },
      { symbol: "Cu²⁺", name: "Copper(II) ions", coefficient: 1n }
    ],
    products: [
      { symbol: "Zn²⁺", name: "Zinc ions", formula: "Zn²⁺", coefficient: 1n },
      {
        symbol: "Cu",
        name: "Copper (cathode)",
        formula: "Cu",
        coefficient: 1n
      }
    ],
    balancedEquation: "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)  E°cell = +1.10 V",
    reactionType: "redox",
    energyChange: "exothermic",
    description: "The Daniell cell converts chemical energy from redox reactions directly into electrical energy. First practical galvanic cell.",
    observations: [
      "Zinc electrode dissolves",
      "Copper deposits on cathode",
      "EMF = 1.10 V"
    ],
    steps: [
      {
        equation: "Anode: Zn(s) → Zn²⁺(aq) + 2e⁻  (oxidation)",
        description: "Zinc is oxidised at the anode, releasing electrons into the external circuit.",
        intermediate: "Zn²⁺ ions enter solution"
      },
      {
        equation: "Cathode: Cu²⁺(aq) + 2e⁻ → Cu(s)  (reduction)",
        description: "Cu²⁺ ions gain electrons from the cathode and deposit as solid copper."
      }
    ],
    moleculeColors: {
      reactant1: "#a3a3a3",
      reactant2: "#38bdf8",
      product: "#fbbf24"
    }
  },
  // ─── Additional organic/named/industrial reactions ─────────────────────────────────
  {
    id: "diels-alder",
    name: "Diels-Alder Cycloaddition",
    category: "named",
    reactants: [
      { symbol: "Diene", name: "1,3-Butadiene", coefficient: 1n },
      { symbol: "Dienophile", name: "Maleic anhydride", coefficient: 1n }
    ],
    products: [
      {
        symbol: "Adduct",
        name: "Cyclohexene adduct",
        formula: "C₆H₈",
        coefficient: 1n
      }
    ],
    balancedEquation: "Diene + Dienophile → Cyclohexene ([4+2] cycloaddition)",
    reactionType: "addition",
    energyChange: "exothermic",
    description: "A [4+2] pericyclic cycloaddition between a conjugated diene and a dienophile. One of the most powerful ring-forming reactions in organic synthesis.",
    observations: [
      "Concerted single step — no ionic intermediate",
      "Stereospecific (endo/exo products)",
      "Electron-poor dienophiles react fastest"
    ],
    conditions: { temperature: "RT to 100°C" },
    steps: [
      {
        equation: "Diene (s-cis) + dienophile approach",
        description: "Diene must adopt s-cis conformation. FMO overlap drives the reaction (HOMO diene + LUMO dienophile).",
        intermediate: "6-membered cyclic TS"
      },
      {
        equation: "[4+2] → cyclohexene ring",
        description: "Two σ bonds form simultaneously (pericyclic). New 6-membered ring; one C=C remains."
      }
    ],
    intermediates: ["6-membered cyclic transition state"],
    moleculeColors: {
      reactant1: "#34d399",
      reactant2: "#f59e0b",
      product: "#818cf8"
    }
  },
  {
    id: "friedel-crafts-acylation",
    name: "Friedel-Crafts Acylation",
    category: "named",
    reactants: [
      { symbol: "ArH", name: "Benzene", coefficient: 1n },
      { symbol: "RCOCl", name: "Acyl chloride", coefficient: 1n }
    ],
    products: [
      {
        symbol: "ArCOR",
        name: "Aryl ketone",
        formula: "ArCOR",
        coefficient: 1n
      },
      { symbol: "HCl", name: "HCl gas", formula: "HCl", coefficient: 1n }
    ],
    balancedEquation: "ArH + RCOCl → ArCOR + HCl  (AlCl₃ catalyst)",
    reactionType: "substitution",
    energyChange: "exothermic",
    description: "Electrophilic aromatic substitution: acyl group replaces ring H. No carbocation rearrangement; product is deactivated so mono-acylation predominates.",
    observations: [
      "Mono-acylation (product deactivated)",
      "No rearrangement",
      "More reliable than F-C alkylation"
    ],
    conditions: { catalyst: "AlCl₃", temperature: "0–25°C" },
    steps: [
      {
        equation: "RCOCl + AlCl₃ → RCO⁺ + AlCl₄⁻",
        description: "Lewis acid generates electrophilic acylium ion.",
        intermediate: "Acylium ion RCO⁺"
      },
      {
        equation: "RCO⁺ + ArH → Wheland intermediate",
        description: "Acylium attacks π system; resonance-stabilized arenium forms.",
        intermediate: "Arenium (Wheland) intermediate"
      },
      {
        equation: "Wheland → ArCOR + H⁺",
        description: "H⁺ loss restores aromaticity."
      }
    ],
    intermediates: ["Acylium ion", "Wheland (arenium) intermediate"],
    moleculeColors: {
      reactant1: "#fbbf24",
      reactant2: "#f472b6",
      product: "#818cf8"
    }
  },
  {
    id: "solvay-process",
    name: "Solvay Process (Na₂CO₃)",
    category: "industrial",
    reactants: [
      { symbol: "NaCl", name: "Brine (NaCl solution)", coefficient: 1n },
      { symbol: "CaCO₃", name: "Limestone", coefficient: 1n }
    ],
    products: [
      {
        symbol: "Na₂CO₃",
        name: "Soda Ash",
        formula: "Na₂CO₃",
        coefficient: 1n
      },
      {
        symbol: "CaCl₂",
        name: "Calcium Chloride",
        formula: "CaCl₂",
        coefficient: 1n
      }
    ],
    balancedEquation: "2NaCl + CaCO₃ → Na₂CO₃ + CaCl₂  (via NH₃ cycle)",
    reactionType: "synthesis",
    energyChange: "exothermic",
    description: "Industrial production of soda ash (Na₂CO₃) used in glass, detergents and paper. NH₃ is recycled efficiently.",
    observations: [
      "NaHCO₃ precipitates in step 1",
      "Calcination yields Na₂CO₃",
      "NH₃ recovered with CaO"
    ],
    conditions: {
      temperature: "60–80°C",
      catalyst: "NH₃ (recycled)"
    },
    steps: [
      {
        equation: "NaCl + NH₃ + CO₂ + H₂O → NaHCO₃↓ + NH₄Cl",
        description: "CO₂ injected into ammonia-saturated brine; less soluble NaHCO₃ precipitates.",
        intermediate: "NaHCO₃ precipitate"
      },
      {
        equation: "2NaHCO₃ → Na₂CO₃ + H₂O + CO₂",
        description: "Calcination converts NaHCO₃ to soda ash; CO₂ recycled to step 1."
      },
      {
        equation: "2NH₄Cl + Ca(OH)₂ → 2NH₃ + CaCl₂ + 2H₂O",
        description: "NH₃ recovered using quicklime and reused."
      }
    ],
    intermediates: ["NaHCO₃", "NH₄Cl"],
    moleculeColors: {
      reactant1: "#e2e8f0",
      reactant2: "#34d399",
      product: "#a78bfa"
    }
  },
  {
    id: "cannizzaro-reaction",
    name: "Cannizzaro Reaction",
    category: "named",
    reactants: [
      { symbol: "2HCHO", name: "Formaldehyde (no α-H)", coefficient: 2n }
    ],
    products: [
      {
        symbol: "CH₃OH",
        name: "Methanol",
        formula: "CH₃OH",
        coefficient: 1n
      },
      {
        symbol: "HCOONa",
        name: "Sodium Formate",
        formula: "HCOONa",
        coefficient: 1n
      }
    ],
    balancedEquation: "2HCHO + NaOH → CH₃OH + HCOONa",
    reactionType: "redox",
    energyChange: "exothermic",
    description: "Disproportionation of aldehydes lacking α-H: one oxidized to carboxylate, other reduced to alcohol. Requires concentrated NaOH.",
    observations: [
      "Only for α-H-free aldehydes (HCHO, PhCHO)",
      "Concentrated NaOH required",
      "No C–C bond formed"
    ],
    conditions: { catalyst: "Concentrated NaOH" },
    steps: [
      {
        equation: "OH⁻ + HCHO → adduct (H⁻ donor)",
        description: "OH⁻ adds to HCHO; the adduct donates H⁻ to a second HCHO.",
        intermediate: "Alkoxide-adduct"
      },
      {
        equation: "Hydride transfer → CH₃OH + HCOO⁻",
        description: "Intermolecular hydride transfer gives methanol and formate simultaneously."
      }
    ],
    intermediates: ["Tetrahedral alkoxide"],
    moleculeColors: { reactant1: "#fbbf24", product: "#34d399" }
  },
  {
    id: "esterification",
    name: "Fischer Esterification",
    category: "organic",
    reactants: [
      { symbol: "RCOOH", name: "Carboxylic Acid", coefficient: 1n },
      { symbol: "R'OH", name: "Alcohol", coefficient: 1n }
    ],
    products: [
      { symbol: "RCOOR'", name: "Ester", formula: "RCOOR'", coefficient: 1n },
      {
        symbol: "H₂O",
        name: "Water",
        formula: "H₂O",
        coefficient: 1n
      }
    ],
    balancedEquation: "RCOOH + R'OH ⇌ RCOOR' + H₂O  (acid-catalysed, reversible)",
    reactionType: "condensation",
    energyChange: "exothermic",
    description: "Acid-catalysed condensation forming an ester. Reversible — removing water or excess alcohol drives the equilibrium toward product.",
    observations: [
      "Fruity odour of ester",
      "Water removal drives forward",
      "Reversible (hydrolysis is the reverse)"
    ],
    conditions: {
      catalyst: "Conc. H₂SO₄",
      temperature: "60–80°C"
    },
    steps: [
      {
        equation: "H⁺ + RCOOH → protonated carbonyl",
        description: "Protonation activates the carbonyl carbon toward nucleophilic attack.",
        intermediate: "Protonated acid"
      },
      {
        equation: "R'OH attacks → tetrahedral intermediate",
        description: "Alcohol oxygen attacks electrophilic carbonyl carbon.",
        intermediate: "Tetrahedral intermediate"
      },
      {
        equation: "Tetrahedral intermediate → ester + H₂O",
        description: "Elimination of water and proton transfer gives the ester product."
      }
    ],
    intermediates: ["Protonated acid", "Tetrahedral intermediate"],
    moleculeColors: {
      reactant1: "#fb923c",
      reactant2: "#38bdf8",
      product: "#34d399"
    }
  },
  {
    id: "ozonolysis",
    name: "Ozonolysis of Alkenes",
    category: "organic",
    reactants: [
      { symbol: "R₂C=CR₂'", name: "Alkene", coefficient: 1n },
      { symbol: "O₃", name: "Ozone", coefficient: 1n }
    ],
    products: [
      {
        symbol: "RCHO/RCOR",
        name: "Aldehydes or Ketones",
        formula: "R₂C=O",
        coefficient: 2n
      }
    ],
    balancedEquation: "R₂C=CR₂' + O₃ → 2×R₂C=O  (Zn/H₂O workup)",
    reactionType: "oxidation",
    energyChange: "exothermic",
    description: "Ozone cleaves C=C to give carbonyl fragments. Used for structure determination. Reductive workup (Zn) gives aldehydes; oxidative (H₂O₂) gives acids.",
    observations: [
      "C=C completely cleaved",
      "Molozonide intermediate",
      "Useful for structural elucidation"
    ],
    conditions: { temperature: "−78°C (ozonation), then workup" },
    steps: [
      {
        equation: "Alkene + O₃ → molozonide",
        description: "[3+2] cycloaddition forms 1,2,3-trioxolane.",
        intermediate: "Molozonide"
      },
      {
        equation: "Molozonide → carbonyl oxide + aldehyde",
        description: "Retro-[3+2]; Criegee zwitterion forms.",
        intermediate: "Criegee zwitterion"
      },
      {
        equation: "Ozonide → carbonyls (workup)",
        description: "[3+2] gives ozonide; workup cleaves to two carbonyl compounds."
      }
    ],
    intermediates: ["Molozonide", "Criegee zwitterion", "Ozonide"],
    moleculeColors: {
      reactant1: "#38bdf8",
      reactant2: "#f97316",
      product: "#fbbf24"
    }
  },
  {
    id: "haloform-reaction",
    name: "Haloform Reaction (Iodoform Test)",
    category: "named",
    reactants: [
      { symbol: "CH₃COR", name: "Methyl ketone", coefficient: 1n },
      { symbol: "I₂/NaOH", name: "Iodine + base", coefficient: 3n }
    ],
    products: [
      {
        symbol: "RCOONa",
        name: "Carboxylate",
        formula: "RCOONa",
        coefficient: 1n
      },
      {
        symbol: "CHI₃",
        name: "Iodoform (yellow ppt)",
        formula: "CHI₃",
        coefficient: 1n
      }
    ],
    balancedEquation: "CH₃COR + 3I₂ + 4NaOH → RCOONa + CHI₃↓ + 3NaI + 3H₂O",
    reactionType: "substitution",
    energyChange: "exothermic",
    description: "Iodoform test: methyl ketones and compounds with CH₃CHOH group give yellow CHI₃ precipitate with I₂/NaOH.",
    observations: [
      "Yellow CHI₃ precipitate",
      "Characteristic medicinal smell",
      "Positive: CH₃CHO, acetone, ethanol"
    ],
    conditions: { catalyst: "I₂ / NaOH" },
    moleculeColors: {
      reactant1: "#fbbf24",
      reactant2: "#e2e8f0",
      product: "#a78bfa"
    }
  }
];
const TYPE_COLORS = {
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
  condensation: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300"
};
const PRODUCT_MW = {
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
  "CH₃CH(OH)CH₂CHO": "88.11 g/mol"
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
function normalise(s) {
  return s.toLowerCase().replace(/[₀-₉]/g, (c) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(c))).replace(/[⁰-⁹]/g, (c) => String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c))).replace(/[^a-z0-9+→⇌ ]/g, " ").replace(/\s+/g, " ").trim();
}
function matchesSearch(rxn, term) {
  if (!term) return true;
  const needle = normalise(term);
  const haystack = normalise(
    [
      rxn.name,
      rxn.balancedEquation,
      rxn.description,
      rxn.reactionType,
      ...rxn.reactants.map((r) => `${r.symbol} ${r.name}`),
      ...rxn.products.map((p) => `${p.symbol} ${p.name}`)
    ].join(" ")
  );
  return haystack.includes(needle);
}
function MoleculeBlob({
  color,
  label,
  size = 44
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-full flex items-center justify-center font-mono font-bold text-[11px] text-foreground/90 select-none",
      style: {
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}55)`,
        boxShadow: `0 0 14px 3px ${color}44, inset 0 1px 2px rgba(255,255,255,0.2)`,
        border: `1.5px solid ${color}88`
      },
      children: label
    }
  ) });
}
function CollisionAnimation({ reaction }) {
  const mc = reaction.moleculeColors ?? {
    reactant1: "#6366f1",
    reactant2: "#38bdf8",
    product: "#34d399"
  };
  const r1 = reaction.reactants[0];
  const r2 = reaction.reactants[1];
  const p1 = reaction.products[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-24 rounded-xl overflow-hidden bg-card/20 border border-border/20 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          animation: "collide-left 1.8s ease-in-out forwards",
          position: "absolute",
          left: "12%"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoleculeBlob, { color: mc.reactant1, label: r1.symbol, size: 42 })
      }
    ),
    r2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          animation: "collide-right 1.8s ease-in-out forwards",
          position: "absolute",
          right: "12%"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MoleculeBlob,
          {
            color: mc.reactant2 ?? "#38bdf8",
            label: r2.symbol,
            size: 42
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute w-12 h-12 rounded-full",
        style: {
          background: `radial-gradient(circle, ${mc.product}cc, transparent 70%)`,
          animation: "flash-burst 1.8s ease-in-out forwards",
          animationDelay: "0.8s"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute w-8 h-0.5 rounded-full",
        style: {
          background: `${mc.reactant1}88`,
          animation: "bond-break 1.8s ease-in-out infinite",
          left: "32%"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          animation: "product-appear 0.6s ease-out forwards",
          animationDelay: "1.2s",
          opacity: 0,
          position: "absolute"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MoleculeBlob,
          {
            color: mc.product,
            label: p1.formula ?? p1.symbol,
            size: 48
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute w-10 h-0.5 rounded-full",
        style: {
          background: `${mc.product}88`,
          animation: "bond-form 0.5s ease-out forwards",
          animationDelay: "1.3s",
          opacity: 0,
          right: "28%"
        }
      }
    )
  ] });
}
function ConditionsPanel({
  conditions
}) {
  if (!conditions) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-wrap gap-2 mt-2",
      "data-ocid": "reaction_lab.conditions_panel",
      children: [
        conditions.temperature && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-400/25 text-orange-300 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: "w-3 h-3" }),
          " ",
          conditions.temperature
        ] }),
        conditions.pressure && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: "⬟" }),
          " ",
          conditions.pressure
        ] }),
        conditions.catalyst && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/25 text-purple-300 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: "⚗" }),
          " ",
          conditions.catalyst
        ] })
      ]
    }
  );
}
function EnergyIndicator({ energyChange }) {
  const isExo = energyChange.toLowerCase() === "exothermic";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: cn(
        "rounded-2xl px-5 py-4 flex items-center gap-4",
        isExo ? "border border-orange-400/30 bg-orange-500/10" : "border border-sky-400/30 bg-sky-500/10"
      ),
      style: {
        animationName: isExo ? "exoGlow" : "endoGlow",
        animationDuration: "2.4s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite"
      },
      "data-ocid": "reaction_lab.energy_indicator",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: isExo ? "🔥" : "❄️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-sm capitalize mb-1", children: [
            energyChange,
            " Reaction"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1.5", children: isExo ? "Energy released to surroundings" : "Energy absorbed from surroundings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-2 rounded-full bg-card/30 border border-border/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: cn(
                "absolute inset-y-0 rounded-full",
                isExo ? "right-0 bg-gradient-to-l from-orange-400 to-orange-600" : "left-0 bg-gradient-to-r from-sky-400 to-sky-600"
              ),
              initial: { width: "0%" },
              animate: { width: "75%" },
              transition: { duration: 1, delay: 0.3, ease: "easeOut" }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex-shrink-0 flex flex-col items-center",
              isExo ? "text-orange-400" : "text-sky-400"
            ),
            children: [
              isExo ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium mt-0.5", children: isExo ? "ΔH < 0" : "ΔH > 0" })
            ]
          }
        )
      ]
    },
    energyChange
  );
}
const ReactionCard = reactExports.memo(function ReactionCard2({
  reaction,
  isSelected,
  onClick,
  index
}) {
  var _a;
  const typeClass = TYPE_COLORS[reaction.reactionType.toLowerCase()] ?? "bg-card/40 border-border/30 text-muted-foreground";
  const hasSteps = (((_a = reaction.steps) == null ? void 0 : _a.length) ?? 0) > 1;
  const glowStyle = isSelected ? {
    boxShadow: reaction.energyChange.toLowerCase() === "exothermic" ? "0 0 18px 3px rgba(251,146,60,0.28), 0 0 0 2px rgba(251,146,60,0.18)" : "0 0 18px 3px rgba(56,189,248,0.28), 0 0 0 2px rgba(56,189,248,0.18)"
  } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.04 },
      onClick,
      className: cn(
        "glass-reaction rounded-2xl p-4 text-left w-full transition-all duration-300",
        isSelected ? "ring-2 ring-accent/60 bg-accent/10" : "hover:bg-card/30"
      ),
      style: glowStyle,
      "data-ocid": `reaction_lab.reaction_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground leading-snug", children: reaction.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
            hasSteps && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-accent/20 border border-accent/30 text-accent font-bold uppercase tracking-wide", children: "Multi-step" }),
            isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-accent/80 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-accent-foreground font-bold", children: "✓" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-foreground/70 mb-3 leading-relaxed break-all", children: reaction.balancedEquation }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                typeClass
              ),
              children: reaction.reactionType
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-[10px] font-medium",
                reaction.energyChange.toLowerCase() === "exothermic" ? "text-orange-400" : "text-sky-400"
              ),
              children: reaction.energyChange
            }
          ),
          reaction.conditions && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/70", children: [reaction.conditions.temperature, reaction.conditions.catalyst].filter(Boolean).join(" · ") })
        ] })
      ]
    }
  );
});
function EquationInput({
  reactions,
  onMatch
}) {
  const [inputVal, setInputVal] = reactExports.useState("");
  const [searchState, setSearchState] = reactExports.useState(
    "idle"
  );
  const [matchedName, setMatchedName] = reactExports.useState("");
  const [suggestions, setSuggestions] = reactExports.useState([]);
  const [showDropdown, setShowDropdown] = reactExports.useState(false);
  const [highlightIdx, setHighlightIdx] = reactExports.useState(-1);
  const wrapperRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const term = inputVal.trim();
    if (term.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const needle = normalise(term);
    const matched = reactions.filter((r) => {
      const haystack = normalise(
        [
          r.name,
          ...r.reactants.map((rc) => `${rc.symbol} ${rc.name}`),
          ...r.products.map((p) => `${p.symbol} ${p.name}`)
        ].join(" ")
      );
      return haystack.includes(needle);
    }).slice(0, 6);
    setSuggestions(matched);
    setShowDropdown(matched.length > 0);
    setHighlightIdx(-1);
  }, [inputVal, reactions]);
  reactExports.useEffect(() => {
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  const selectSuggestion = reactExports.useCallback(
    (rxn) => {
      setInputVal(rxn.name);
      setShowDropdown(false);
      setSuggestions([]);
      setSearchState("found");
      setMatchedName(rxn.name);
      onMatch(rxn.id);
    },
    [onMatch]
  );
  const handleSearch = reactExports.useCallback(() => {
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
  const handleClear = reactExports.useCallback(() => {
    setInputVal("");
    setSearchState("idle");
    setSuggestions([]);
    setShowDropdown(false);
    onMatch(null);
  }, [onMatch]);
  const handleKeyDown = reactExports.useCallback(
    (e) => {
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
    [showDropdown, suggestions, highlightIdx, handleSearch, selectSuggestion]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      className: "glass-reaction rounded-2xl p-5 mb-4",
      "data-ocid": "reaction_lab.equation_input_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-sky-400 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm", children: "Search by Equation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3", children: [
          "Type a chemical equation or reaction name. Example:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground/60", children: "H₂ + O₂" }),
          " or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground/60", children: "Haber" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", ref: wrapperRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: inputVal,
                onChange: (e) => {
                  setInputVal(e.target.value);
                  setSearchState("idle");
                },
                onKeyDown: handleKeyDown,
                onFocus: () => suggestions.length > 0 && setShowDropdown(true),
                placeholder: "e.g. H₂ + O₂ → H₂O or Grignard...",
                className: "w-full bg-card/30 border border-border/30 rounded-xl px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-all pr-8",
                "data-ocid": "reaction_lab.equation_search_input",
                autoComplete: "off"
              }
            ),
            inputVal && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleClear,
                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "Clear",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showDropdown && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -6, scale: 0.97 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -6, scale: 0.97 },
                transition: { duration: 0.18, ease: "easeOut" },
                className: "absolute top-full left-0 right-0 mt-1.5 z-50 rounded-2xl border border-white/10 overflow-hidden",
                style: {
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset"
                },
                "data-ocid": "reaction_lab.autocomplete_dropdown",
                children: suggestions.map((rxn, si) => {
                  var _a, _b;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onMouseEnter: () => setHighlightIdx(si),
                      onMouseLeave: () => setHighlightIdx(-1),
                      onClick: () => selectSuggestion(rxn),
                      className: cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 group",
                        si === highlightIdx ? "bg-white/10" : "hover:bg-white/5",
                        si > 0 && "border-t border-white/5"
                      ),
                      "data-ocid": `reaction_lab.autocomplete_item.${si + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center",
                            style: {
                              background: `${((_a = rxn.moleculeColors) == null ? void 0 : _a.reactant1) ?? "#6366f1"}22`,
                              border: `1px solid ${((_b = rxn.moleculeColors) == null ? void 0 : _b.reactant1) ?? "#6366f1"}44`
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground/90 truncate", children: rxn.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono text-muted-foreground truncate", children: rxn.balancedEquation })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: cn(
                              "text-[10px] px-1.5 py-0.5 rounded-full border flex-shrink-0",
                              TYPE_COLORS[rxn.reactionType.toLowerCase()] ?? "bg-card/40 border-border/30 text-muted-foreground"
                            ),
                            children: rxn.reactionType
                          }
                        )
                      ]
                    },
                    rxn.id
                  );
                })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileHover: { scale: 1.03 },
              whileTap: { scale: 0.97 },
              onClick: handleSearch,
              className: "px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold flex items-center gap-1.5 flex-shrink-0 transition-all shadow-lg shadow-primary/20",
              "data-ocid": "reaction_lab.equation_search_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5" }),
                " Search"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
          searchState === "found" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              className: "mt-2.5 flex items-center gap-2 text-xs text-accent",
              "data-ocid": "reaction_lab.equation_search.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-[10px]", children: "✓" }),
                "Matched: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: matchedName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "— selected below" })
              ]
            }
          ),
          searchState === "notfound" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              className: "mt-2.5 flex items-center gap-2 text-xs text-orange-400",
              "data-ocid": "reaction_lab.equation_search.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-[10px]", children: "!" }),
                "Reaction not found. Try selecting from the list below."
              ]
            }
          )
        ] })
      ]
    }
  );
}
function HighlightedEquation({ equation }) {
  const sepMatch = equation.match(/(→|⇌)/);
  if (!sepMatch || sepMatch.index == null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground break-all", children: equation });
  }
  const sep = sepMatch[0];
  const idx = sepMatch.index;
  const reactantsPart = equation.slice(0, idx).trim();
  const productsPart = equation.slice(idx + sep.length).trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-semibold break-all leading-relaxed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "rounded px-1",
        style: {
          color: "#93c5fd",
          background: "rgba(56,189,248,0.08)",
          textShadow: "0 0 10px rgba(56,189,248,0.4)"
        },
        children: reactantsPart
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-base font-bold text-foreground", children: sep }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "rounded px-1",
        style: {
          color: "#6ee7b7",
          background: "rgba(52,211,153,0.08)",
          textShadow: "0 0 10px rgba(52,211,153,0.4)"
        },
        children: productsPart
      }
    )
  ] });
}
const STEP_STAGE_CONFIG = [
  {
    title: "Reactants",
    borderColor: "#3b82f6",
    badge: "bg-blue-500/20 border-blue-400/30 text-blue-300"
  },
  {
    title: "Bond Breaking",
    borderColor: "#f97316",
    badge: "bg-orange-500/20 border-orange-400/30 text-orange-300"
  },
  {
    title: "Reaction",
    borderColor: "#8b5cf6",
    badge: "bg-violet-500/20 border-violet-400/30 text-violet-300"
  },
  {
    title: "Products",
    borderColor: "#22c55e",
    badge: "bg-green-500/20 border-green-400/30 text-green-300"
  },
  {
    title: "Observations",
    borderColor: "#14b8a6",
    badge: "bg-teal-500/20 border-teal-400/30 text-teal-300"
  }
];
function EnhancedStepsPanel({
  steps,
  intermediates
}) {
  const [openIdx, setOpenIdx] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "reaction_lab.enhanced_steps_panel", children: [
    intermediates && intermediates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Intermediates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: intermediates.map((im) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-[11px] px-2 py-0.5 rounded-full bg-primary/15 border border-primary/25 text-primary/80",
          children: im
        },
        im
      )) })
    ] }),
    steps.map((step, i) => {
      const isOpen = openIdx === i;
      const cfg = STEP_STAGE_CONFIG[Math.min(i, STEP_STAGE_CONFIG.length - 1)];
      const stageLabel = i === 0 ? "Reactants" : i === steps.length - 1 ? "Products" : i === 1 ? "Bond Breaking" : i === 2 ? "Reaction" : "Observations";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border transition-all duration-200 overflow-hidden",
          style: {
            borderColor: isOpen ? `${cfg.borderColor}60` : "rgba(255,255,255,0.08)",
            background: isOpen ? `${cfg.borderColor}0a` : "rgba(255,255,255,0.02)",
            borderLeft: `3px solid ${cfg.borderColor}`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center gap-2.5 px-3 py-2.5 text-left",
                onClick: () => setOpenIdx(isOpen ? null : i),
                "data-ocid": `reaction_lab.step_card.${i + 1}`,
                "aria-expanded": isOpen,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 border",
                        cfg.badge
                      ),
                      children: i + 1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[10px] font-semibold uppercase tracking-wide",
                        style: { color: cfg.borderColor },
                        children: stageLabel
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground/70 block truncate mt-0.5", children: step.equation })
                  ] }),
                  isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.3, ease: "easeOut" },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 space-y-1.5", children: [
                  step.intermediate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-[10px] font-semibold uppercase tracking-wide",
                      style: { color: cfg.borderColor },
                      children: [
                        "Intermediate: ",
                        step.intermediate
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/75 leading-relaxed", children: step.description }),
                  step.conditions && /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionsPanel, { conditions: step.conditions })
                ] })
              }
            ) })
          ]
        },
        `step-${step.equation.slice(0, 16)}-${i}`
      );
    })
  ] });
}
function CategoryTabs({
  active,
  onChange,
  counts
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none mb-4",
      "data-ocid": "reaction_lab.category_tabs",
      children: CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        const count = counts[cat.id] ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onChange(cat.id),
            className: cn(
              "flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap border",
              isActive ? "bg-accent/20 border-accent/50 text-accent shadow-[0_0_12px_2px_rgba(var(--accent)/0.25)]" : "bg-card/20 border-border/20 text-muted-foreground hover:text-foreground hover:border-border/40"
            ),
            "data-ocid": `reaction_lab.category_tab.${cat.id}`,
            children: [
              cat.label,
              count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "ml-1.5 text-[9px] opacity-70",
                    isActive ? "text-accent" : "text-muted-foreground"
                  ),
                  children: count
                }
              )
            ]
          },
          cat.id
        );
      })
    }
  );
}
function ListSearchBar({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder: "Search reactions, elements, types...",
        className: "w-full bg-card/20 border border-border/20 rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all",
        "data-ocid": "reaction_lab.list_search_input"
      }
    ),
    value && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(""),
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
        "aria-label": "Clear search",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
      }
    )
  ] });
}
function ReactionLabPage() {
  var _a, _b, _c, _d, _e, _f;
  const { data: backendReactions } = useReactions();
  const reactions = reactExports.useMemo(() => {
    if (backendReactions && backendReactions.length > 0) {
      const backendMap = new Map(
        backendReactions.map((r) => [r.id, r])
      );
      return BUILTIN_REACTIONS.map((b) => backendMap.get(b.id) ?? b);
    }
    return BUILTIN_REACTIONS;
  }, [backendReactions]);
  const { setReactionResult, reactionResult } = useChemStore();
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [animating, setAnimating] = reactExports.useState(false);
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const [showCollision, setShowCollision] = reactExports.useState(false);
  const [reactionAnimating, setReactionAnimating] = reactExports.useState(false);
  const equationRef = reactExports.useRef(null);
  const glowBurstRef = reactExports.useRef(null);
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [listSearch, setListSearch] = reactExports.useState("");
  const timeoutRef = reactExports.useRef(null);
  const deferredSearch = reactExports.useDeferredValue(listSearch);
  const selectedReaction = reactExports.useMemo(
    () => reactions.find((r) => r.id === selectedId) ?? null,
    [reactions, selectedId]
  );
  const totalSteps = ((_a = selectedReaction == null ? void 0 : selectedReaction.steps) == null ? void 0 : _a.length) ?? 0;
  const hasSteps = totalSteps > 1;
  const currentStepData = hasSteps ? (_b = selectedReaction == null ? void 0 : selectedReaction.steps) == null ? void 0 : _b[currentStep] : null;
  const activeConditions = (currentStepData == null ? void 0 : currentStepData.conditions) ?? (selectedReaction == null ? void 0 : selectedReaction.conditions);
  const isLastStep = currentStep >= totalSteps - 1;
  const categoryCounts = reactExports.useMemo(() => {
    const counts = { all: reactions.length };
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat.id] = reactions.filter((r) => r.category === cat.id).length;
    }
    return counts;
  }, [reactions]);
  const filteredReactions = reactExports.useMemo(() => {
    return reactions.filter((r) => {
      const catOk = activeCategory === "all" || r.category === activeCategory;
      const searchOk = matchesSearch(r, deferredSearch);
      return catOk && searchOk;
    });
  }, [reactions, activeCategory, deferredSearch]);
  const handleSelect = reactExports.useCallback(
    (id) => {
      setSelectedId((prev) => prev === id ? null : id);
      setReactionResult(null);
      setCurrentStep(0);
      setShowCollision(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [setReactionResult]
  );
  const handleEquationMatch = reactExports.useCallback(
    (id) => {
      if (id) {
        setSelectedId(id);
        setReactionResult(null);
        setCurrentStep(0);
        setShowCollision(false);
      }
    },
    [setReactionResult]
  );
  const handleSimulate = reactExports.useCallback(() => {
    if (!selectedReaction) return;
    setAnimating(true);
    setShowCollision(true);
    setReactionAnimating(true);
    if (equationRef.current) {
      equationRef.current.style.animation = "none";
      void equationRef.current.offsetWidth;
      equationRef.current.style.animation = "eq-pulse 0.3s ease-in-out forwards";
    }
    if (glowBurstRef.current) {
      glowBurstRef.current.style.animation = "none";
      void glowBurstRef.current.offsetWidth;
      glowBurstRef.current.style.animation = "glow-burst 0.6s ease-out forwards";
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setReactionResult(selectedReaction);
      setAnimating(false);
      setShowCollision(false);
      setReactionAnimating(false);
    }, 1900);
  }, [selectedReaction, setReactionResult]);
  const handleNextStep = reactExports.useCallback(() => {
    if (!hasSteps || isLastStep) return;
    setCurrentStep((s) => s + 1);
    setReactionResult(null);
    setShowCollision(false);
  }, [hasSteps, isLastStep, setReactionResult]);
  const handleReset = reactExports.useCallback(() => {
    setSelectedId(null);
    setReactionResult(null);
    setCurrentStep(0);
    setShowCollision(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [setReactionResult]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-10", "data-ocid": "reaction_lab.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: COLLISION_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "text-center mb-10 max-w-3xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 text-sky-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Type an equation • Filter by category • Run simulation" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent", children: "Reaction Lab" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg leading-relaxed", children: [
            "Explore ",
            reactions.length,
            " chemical reactions — search by equation, filter by type, and simulate mechanisms."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid lg:grid-cols-[1fr_440px] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EquationInput, { reactions, onMatch: handleEquationMatch }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryTabs,
          {
            active: activeCategory,
            onChange: setActiveCategory,
            counts: categoryCounts
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListSearchBar, { value: listSearch, onChange: setListSearch }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: activeCategory === "all" ? "All Reactions" : (_c = CATEGORIES.find((c) => c.id === activeCategory)) == null ? void 0 : _c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            filteredReactions.length,
            " reactions"
          ] })
        ] }),
        filteredReactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "text-center py-12 text-muted-foreground text-sm",
            "data-ocid": "reaction_lab.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-10 h-10 mx-auto mb-3 opacity-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No reactions match your search." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setListSearch("");
                    setActiveCategory("all");
                  },
                  className: "mt-2 text-xs text-accent hover:underline",
                  children: "Clear filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid sm:grid-cols-2 gap-3",
            "data-ocid": "reaction_lab.reaction_list",
            children: filteredReactions.map((rxn, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReactionCard,
              {
                reaction: rxn,
                index: i,
                isSelected: selectedId === rxn.id,
                onClick: () => handleSelect(rxn.id)
              },
              rxn.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-24 self-start space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-reaction rounded-2xl p-5",
            "data-ocid": "reaction_lab.simulator_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-amber-400" }),
                "Reaction Simulator",
                hasSteps && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-normal", children: [
                  "Step ",
                  currentStep + 1,
                  " of ",
                  totalSteps
                ] })
              ] }),
              !selectedReaction ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-10 text-muted-foreground text-sm",
                  "data-ocid": "reaction_lab.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
                    "Select a reaction from the list to begin"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground mb-2 leading-tight", children: selectedReaction.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                          TYPE_COLORS[selectedReaction.reactionType.toLowerCase()] ?? "bg-card/40 border-border/30 text-muted-foreground"
                        ),
                        children: selectedReaction.reactionType.charAt(0).toUpperCase() + selectedReaction.reactionType.slice(1)
                      }
                    ),
                    hasSteps && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-medium", children: [
                      totalSteps,
                      "-step mechanism"
                    ] }),
                    selectedReaction.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-card/30 border border-border/20 text-muted-foreground capitalize", children: selectedReaction.category })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      ref: equationRef,
                      className: "glass rounded-xl p-3 text-center relative overflow-hidden",
                      "data-ocid": "reaction_lab.balanced_equation",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold", children: "Balanced Equation" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          HighlightedEquation,
                          {
                            equation: selectedReaction.balancedEquation
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      ref: glowBurstRef,
                      className: "absolute inset-0 rounded-xl pointer-events-none",
                      style: {
                        background: `radial-gradient(ellipse at center, ${((_d = selectedReaction.moleculeColors) == null ? void 0 : _d.product) ?? "#34d399"}55, transparent 70%)`,
                        opacity: 0
                      }
                    }
                  ),
                  (() => {
                    const mainProduct = selectedReaction.products[0];
                    const formula = (mainProduct == null ? void 0 : mainProduct.formula) ?? (mainProduct == null ? void 0 : mainProduct.symbol);
                    const mw = formula ? PRODUCT_MW[formula] : void 0;
                    if (!formula) return null;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center mt-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border font-mono",
                          style: {
                            background: "rgba(52,211,153,0.08)",
                            borderColor: "rgba(52,211,153,0.25)",
                            color: "#86efac"
                          },
                          "data-ocid": "reaction_lab.product_formula_chip",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] opacity-60 font-sans", children: "Main product" }),
                            formula
                          ]
                        }
                      ),
                      mw && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border",
                          style: {
                            background: "rgba(255,255,255,0.04)",
                            borderColor: "rgba(255,255,255,0.10)",
                            color: "rgba(255,255,255,0.5)"
                          },
                          "data-ocid": "reaction_lab.product_mw_chip",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] opacity-60", children: "MW" }),
                            " ",
                            mw
                          ]
                        }
                      )
                    ] });
                  })()
                ] }),
                activeConditions && /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionsPanel, { conditions: activeConditions }),
                hasSteps && currentStepData && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 12 },
                    animate: { opacity: 1, x: 0 },
                    className: "mt-3 glass rounded-xl p-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: [
                        "Step ",
                        currentStep + 1,
                        " —",
                        " ",
                        currentStepData.intermediate ?? "Mechanism"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-accent mb-2 break-all", children: currentStepData.equation }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/75 leading-relaxed", children: currentStepData.description })
                    ]
                  },
                  currentStep
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: hasSteps ? "Starting Reactants" : "Reactants" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: selectedReaction.reactants.map((r, ri) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    ri > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 text-muted-foreground inline mx-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "px-3 py-1.5 rounded-lg font-mono text-sm inline-block transition-all",
                        style: {
                          background: "rgba(56,189,248,0.10)",
                          border: "1px solid rgba(56,189,248,0.25)",
                          color: "#93c5fd",
                          animation: reactionAnimating ? `reactant-flash 0.6s ease-out ${ri * 100}ms forwards` : void 0
                        },
                        children: [
                          Number(r.coefficient) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70 mr-0.5", children: String(r.coefficient) }),
                          r.symbol
                        ]
                      }
                    )
                  ] }, r.symbol)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: showCollision ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CollisionAnimation, { reaction: selectedReaction })
                  },
                  "collision"
                ) : reactionResult ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    className: "space-y-3",
                    "data-ocid": "reaction_lab.success_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Products" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: reactionResult.products.map((p, pi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          pi > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 text-muted-foreground inline mx-1" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.span,
                            {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              transition: {
                                delay: pi * 0.1,
                                duration: 0.4,
                                ease: "easeOut"
                              },
                              className: "px-3 py-1.5 rounded-lg font-mono text-sm inline-block",
                              style: {
                                background: "rgba(52,211,153,0.12)",
                                border: "1px solid rgba(52,211,153,0.30)",
                                color: "#6ee7b7",
                                animation: `product-glow-in 0.6s ease-out ${pi * 100}ms forwards`
                              },
                              children: [
                                Number(p.coefficient) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70 mr-0.5", children: String(p.coefficient) }),
                                p.formula ?? p.symbol
                              ]
                            }
                          )
                        ] }, p.formula ?? p.symbol)) })
                      ] }),
                      selectedReaction.steps && selectedReaction.steps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Step-by-step Mechanism" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          EnhancedStepsPanel,
                          {
                            steps: selectedReaction.steps,
                            intermediates: selectedReaction.intermediates
                          }
                        )
                      ] }),
                      reactionResult.observations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Observations" }),
                        reactionResult.observations.map((obs) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-start gap-2 text-xs text-foreground/80 mb-1",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 text-accent mt-0.5 flex-shrink-0" }),
                              obs
                            ]
                          },
                          obs
                        ))
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 border-l-2 border-accent/40", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-accent/80 uppercase tracking-wider mb-2", children: "Key Facts" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs text-foreground/75", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            "\\u25b8 ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Theory:" }),
                            " ",
                            reactionResult.description
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            "\\u25b8 ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Mechanism insight:" }),
                            " ",
                            ((_f = (_e = reactionResult.steps) == null ? void 0 : _e[0]) == null ? void 0 : _f.description) ?? "Refer to steps above for mechanism details."
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                            "\\u25b8 ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Application:" }),
                            " ",
                            reactionResult.category === "industrial" ? "Used at industrial scale in chemical manufacturing." : reactionResult.category === "electrochemical" ? "Applied in batteries, electrolysis, and electrochemical cells." : reactionResult.category === "named" ? "Classic named reaction used in organic synthesis and JEE/NEET examinations." : "Found in laboratories, industry, and biological systems."
                          ] })
                        ] })
                      ] })
                    ]
                  },
                  "result"
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className: "glass rounded-xl p-4 text-center text-sm text-muted-foreground",
                    children: selectedReaction.description
                  },
                  "idle"
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.97 },
                      onClick: handleSimulate,
                      disabled: animating,
                      className: "flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-primary/20",
                      "data-ocid": "reaction_lab.simulate_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                        animating ? "Simulating…" : "Run Reaction"
                      ]
                    }
                  ),
                  hasSteps && !isLastStep && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.97 },
                      onClick: handleNextStep,
                      disabled: animating,
                      className: "px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-1.5 glass text-foreground/80 hover:text-foreground disabled:opacity-40 transition-all",
                      "data-ocid": "reaction_lab.next_step_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
                        " Next"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleReset,
                      className: "glass px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all",
                      "data-ocid": "reaction_lab.reset_button",
                      "aria-label": "Reset",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                hasSteps && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex items-center justify-center gap-1.5 mt-3",
                    "data-ocid": "reaction_lab.step_indicator",
                    children: Array.from({ length: totalSteps }, (_, i) => i).map(
                      (i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setCurrentStep(i);
                            setReactionResult(null);
                            setShowCollision(false);
                          },
                          className: cn(
                            "rounded-full transition-all duration-300",
                            i === currentStep ? "w-5 h-2 bg-accent" : i < currentStep ? "w-2 h-2 bg-accent/50" : "w-2 h-2 bg-border/50"
                          ),
                          "aria-label": `Go to step ${i + 1}`,
                          "data-ocid": `reaction_lab.step_dot.${i + 1}`
                        },
                        i
                      )
                    )
                  }
                )
              ] })
            ]
          }
        ),
        selectedReaction && /* @__PURE__ */ jsxRuntimeExports.jsx(EnergyIndicator, { energyChange: selectedReaction.energyChange })
      ] })
    ] })
  ] });
}
export {
  ReactionLabPage
};
