import { useChemStore } from "@/store/useChemStore";
import { Bookmark, BookmarkCheck, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type Chapter =
  | "Physical Chemistry"
  | "Organic Chemistry"
  | "Inorganic Chemistry";
type HubSection = "facts" | "ranking" | "mistakes" | "tips" | "formulas";

const CHAPTER_COLORS: Record<Chapter, { color: string; bg: string }> = {
  "Physical Chemistry": {
    color: "oklch(0.7 0.2 258)",
    bg: "oklch(0.68 0.16 258 / 0.15)",
  },
  "Organic Chemistry": {
    color: "oklch(0.72 0.22 30)",
    bg: "oklch(0.72 0.22 30 / 0.15)",
  },
  "Inorganic Chemistry": {
    color: "oklch(0.7 0.21 140)",
    bg: "oklch(0.7 0.21 140 / 0.15)",
  },
};

interface HubFact {
  id: string;
  chapter: Chapter;
  fact: string;
  importance: string;
  examTip: string;
}

interface ChapterRanking {
  chapter: Chapter;
  topic: string;
  jeeWeight: number;
  neetWeight: number;
  description: string;
}

interface CommonMistake {
  id: string;
  chapter: Chapter;
  mistake: string;
  correction: string;
}

interface HighYieldFormula {
  id: string;
  chapter: Chapter;
  name: string;
  formula: string;
  variables: string;
  tip: string;
}

const CHAPTER_RANKINGS: ChapterRanking[] = [
  {
    chapter: "Physical Chemistry",
    topic: "Chemical Equilibrium & Ionic Equilibrium",
    jeeWeight: 12,
    neetWeight: 10,
    description:
      "Kp, Kc, pH, buffer, hydrolysis, solubility product — highest density of calculable problems.",
  },
  {
    chapter: "Organic Chemistry",
    topic: "Carbonyl Compounds & Named Reactions",
    jeeWeight: 11,
    neetWeight: 9,
    description:
      "Aldehydes, ketones, Aldol, Cannizzaro, Grignard, Clemmensen, Wolff-Kishner — very high question frequency.",
  },
  {
    chapter: "Physical Chemistry",
    topic: "Electrochemistry",
    jeeWeight: 10,
    neetWeight: 9,
    description:
      "Nernst equation, cell potential, Faraday's laws, conductance — calculation-heavy, reliable marks.",
  },
  {
    chapter: "Physical Chemistry",
    topic: "Chemical Kinetics",
    jeeWeight: 9,
    neetWeight: 8,
    description:
      "Rate laws, half-life, Arrhenius equation, integrated rate equations, graphical problems.",
  },
  {
    chapter: "Organic Chemistry",
    topic: "Reaction Mechanisms (SN1/SN2/E1/E2)",
    jeeWeight: 9,
    neetWeight: 7,
    description:
      "Stereochemistry of substitution and elimination — critical for JEE Advanced; less detail needed for NEET.",
  },
  {
    chapter: "Inorganic Chemistry",
    topic: "Coordination Chemistry",
    jeeWeight: 8,
    neetWeight: 8,
    description:
      "IUPAC naming, isomerism, VBT/CFT, magnetic properties, EAN rule.",
  },
  {
    chapter: "Physical Chemistry",
    topic: "Atomic Structure & Quantum Numbers",
    jeeWeight: 8,
    neetWeight: 9,
    description:
      "Bohr model, quantum numbers, de Broglie, Heisenberg, Aufbau — NEET weights this higher.",
  },
  {
    chapter: "Organic Chemistry",
    topic: "Hydrocarbons & Stereochemistry",
    jeeWeight: 7,
    neetWeight: 8,
    description:
      "Alkenes, alkynes, arenes, R/S, E/Z, cis/trans — NEET tests stereoisomer counting frequently.",
  },
  {
    chapter: "Inorganic Chemistry",
    topic: "p-Block Chemistry (Groups 15–17)",
    jeeWeight: 7,
    neetWeight: 9,
    description:
      "NO, NO₂, H₂SO₄, HNO₃, halogens, interhalogen compounds — NEET weight is high for these.",
  },
  {
    chapter: "Physical Chemistry",
    topic: "Thermodynamics & Thermochemistry",
    jeeWeight: 7,
    neetWeight: 7,
    description:
      "ΔG, ΔH, ΔS, Hess's law, bond enthalpy, Kirchhoff — all exam boards test this.",
  },
  {
    chapter: "Organic Chemistry",
    topic: "Biomolecules & Polymers",
    jeeWeight: 4,
    neetWeight: 9,
    description:
      "Proteins, carbohydrates, nucleic acids, addition/condensation polymers — NEET heavily tests this; JEE lighter.",
  },
  {
    chapter: "Inorganic Chemistry",
    topic: "s-Block Chemistry (Alkali & Alkaline Earth)",
    jeeWeight: 5,
    neetWeight: 8,
    description:
      "Anomalous properties of Li/Be, diagonal relationship, reactions with water/air — more important in NEET.",
  },
];

const COMMON_MISTAKES: CommonMistake[] = [
  {
    id: "cm1",
    chapter: "Physical Chemistry",
    mistake: "Using Kp and Kc interchangeably",
    correction:
      "Kp = Kc(RT)^Δng. They are equal ONLY when Δng = 0 (same moles of gas on both sides). For N₂+3H₂⇌2NH₃: Δng = −2, so Kp ≠ Kc.",
  },
  {
    id: "cm2",
    chapter: "Physical Chemistry",
    mistake: "Thinking IE₁(N) < IE₁(O) because O has more protons",
    correction:
      "IE₁(N) > IE₁(O). N has half-filled 2p³ (extra stable). O has a paired 2p electron causing e-e repulsion — easier to remove.",
  },
  {
    id: "cm3",
    chapter: "Physical Chemistry",
    mistake: "Assuming Cl has lower electron affinity than F",
    correction:
      "Cl has HIGHER EA (−349 kJ/mol) than F (−328 kJ/mol). F's small 2p orbital causes repulsion when gaining extra electron. Cl's larger 3p has less repulsion.",
  },
  {
    id: "cm4",
    chapter: "Physical Chemistry",
    mistake: "Using reaction stoichiometry to determine rate order",
    correction:
      "Rate order MUST be determined experimentally. Never take exponents from balanced equation. Example: H₂ + I₂ → 2HI happens to be 2nd order experimentally, but this is coincidence not rule.",
  },
  {
    id: "cm5",
    chapter: "Physical Chemistry",
    mistake: "Confusing molarity with molality in colligative properties",
    correction:
      "Colligative properties use MOLALITY (mol/kg solvent) not molarity (mol/L solution). Molality is temperature-independent; use it for ΔTb, ΔTf, osmotic pressure.",
  },
  {
    id: "cm6",
    chapter: "Physical Chemistry",
    mistake: "Assuming ΔG < 0 always means fast reaction",
    correction:
      "ΔG < 0 means spontaneous (thermodynamically favorable), NOT fast. Diamond → graphite is thermodynamically spontaneous but extremely slow (kinetic control). Rate depends on activation energy (Eₐ), not ΔG.",
  },
  {
    id: "cm7",
    chapter: "Organic Chemistry",
    mistake: "Applying Markovnikov's rule to anti-Markovnikov conditions",
    correction:
      "With peroxides (ROOR), HBr addition goes anti-Markovnikov via free radical mechanism. Br adds to less substituted C. This ONLY applies to HBr; HCl and HI don't undergo radical addition as easily.",
  },
  {
    id: "cm8",
    chapter: "Organic Chemistry",
    mistake: "Confusing Aldol with Cannizzaro conditions",
    correction:
      "Aldol needs α-H (dil. NaOH). Cannizzaro needs NO α-H (conc. NaOH). If a molecule has no α-H (HCHO, PhCHO), it CANNOT undergo Aldol. In crossed Cannizzaro, HCHO is ALWAYS oxidized to formate.",
  },
  {
    id: "cm9",
    chapter: "Organic Chemistry",
    mistake: "Thinking SN2 works for tertiary substrates",
    correction:
      "SN2 is BLOCKED by steric hindrance at 3° carbon. 3° substrates favor SN1 (stable tertiary carbocation) or E2 (with strong base + heat). 1° = SN2, 3° = SN1/E1, 2° = depends on nucleophile/conditions.",
  },
  {
    id: "cm10",
    chapter: "Organic Chemistry",
    mistake: "Treating NaBH₄ and LiAlH₄ as equivalent reducing agents",
    correction:
      "LiAlH₄ reduces everything (RCHO, RCOR, RCOOR, RCOOH, RCONR₂). NaBH₄ reduces ONLY aldehydes and ketones — NOT esters, acids, or amides. Choose NaBH₄ for chemoselective ketone reduction in presence of ester.",
  },
  {
    id: "cm11",
    chapter: "Inorganic Chemistry",
    mistake: "Saying oxygen is always −2 oxidation state",
    correction:
      "O is −1 in peroxides (H₂O₂, Na₂O₂), −½ in superoxides (KO₂), +2 in OF₂, and 0 in O₂. The −2 rule applies to most oxides but has important exceptions tested in every exam.",
  },
  {
    id: "cm12",
    chapter: "Inorganic Chemistry",
    mistake: "Confusing hard water softening methods",
    correction:
      "Temporary hardness (Ca/Mg bicarbonates): removed by BOILING or adding Ca(OH)₂ (Clark's method). Permanent hardness (Ca/Mg sulfates/chlorides): removed by adding Na₂CO₃, or ion-exchange, or using washing soda — NOT by boiling.",
  },
];

const EXTRA_HUB_FACTS: HubFact[] = [
  {
    id: "oc-5",
    chapter: "Organic Chemistry",
    fact: "Nucleophilic substitution: SN1 prefers tertiary substrate, polar protic solvent, weak nucleophile → racemization. SN2 prefers primary, polar aprotic, strong nucleophile → inversion (Walden).",
    importance:
      "Predicts substitution product stereochemistry and reaction pathway.",
    examTip:
      "JEE: Crossed aldol uses PhCHO as electrophile (no alpha-H). SN2 = inversion, SN1 = racemization. Polar aprotic (DMSO) = SN2 favoured; polar protic (EtOH) = SN1 favoured.",
  },
  {
    id: "oc-6",
    chapter: "Organic Chemistry",
    fact: "Aromaticity (Huckel): planar, fully conjugated, 4n+2 pi electrons (n=integer). Benzene n=1 (6pi). Anti-aromatic: 4n pi electrons. Non-aromatic: not fully conjugated or not planar.",
    importance:
      "Determines reactivity: aromatic = stable, undergoes EAS not addition.",
    examTip:
      "JEE: Cyclobutadiene is anti-aromatic (4pi, very unstable). Cyclopentadienyl anion is aromatic (6pi, stable). Furan, pyrrole, thiophene are aromatic (lone pair on heteroatom completes 6pi).",
  },
  {
    id: "oc-7",
    chapter: "Organic Chemistry",
    fact: "Grignard reagent: RMgX + HCHO → 1° alcohol; + RCHO → 2° alcohol; + R2CO → 3° alcohol; + CO2 → RCOOH; + ester → 3° alcohol (same R twice).",
    importance:
      "Most versatile C-C bond forming reaction; makes all classes of alcohols.",
    examTip:
      "JEE: ANHYDROUS conditions essential (water destroys Grignard). CO2 (dry ice) + Grignard = carboxylic acid. Ester + 2 Grignard = tertiary alcohol with same two groups.",
  },
  {
    id: "pc-14",
    chapter: "Physical Chemistry",
    fact: "Colligative properties: \u0394Tb = iKbm; \u0394Tf = iKfm; \u03c0 = iMRT. van't Hoff factor i: NaCl = 2 (full dissoc); BaCl2 = 3; glucose = 1; acetic acid in benzene i < 1 (dimerization).",
    importance: "Used to find molar mass of solute and degree of dissociation.",
    examTip:
      "JEE: Always use MOLALITY (m) not molarity for \u0394Tb and \u0394Tf. Osmotic pressure \u03c0 = iMRT uses MOLARITY M. Abnormal molar mass indicates association (i<1) or dissociation (i>1).",
  },
  {
    id: "pc-15",
    chapter: "Physical Chemistry",
    fact: "Buffer pH = pKa + log([A-]/[HA]). Maximum buffer capacity at pH = pKa ([A-]=[HA]). Blood pH 7.4 maintained by H2CO3/HCO3- buffer (pKa = 6.1).",
    importance: "Critical for acid-base equilibrium and biological chemistry.",
    examTip:
      "JEE: Adding strong acid to buffer: strong acid reacts with A- to make HA. Adding strong base: reacts with HA to make A-. Buffer effective within \u00b11 pH unit of pKa. Buffer capacity = moles of strong acid/base the buffer can absorb.",
  },
  {
    id: "ic-5",
    chapter: "Inorganic Chemistry",
    fact: "Polymer types: addition (vinyl monomers, no small molecule lost) vs condensation (bifunctional, releases H2O or HCl). Nylon-6,6 = condensation (hexamethylenediamine + adipic acid). Nylon-6 = ring-opening of caprolactam.",
    importance: "Polymers section is 8-10 marks in NEET; lighter in JEE.",
    examTip:
      "NEET: Natural rubber = cis-polyisoprene; Buna-N = acrylonitrile+butadiene; Buna-S = styrene+butadiene; Neoprene = chloroprene polymer. Teflon = PTFE (tetrafluoroethylene). Dacron/PET = terephthalic acid + ethylene glycol (condensation).",
  },
];

const EXTRA_LAST_MINUTE_TIPS = [
  "Organic chemistry shortcuts: always identify the alpha-carbon (C adjacent to C=O). The alpha-H is crucial in Aldol, Cannizzaro, HVZ, and Claisen reactions.",
  "SN1 vs SN2 decision tree: Is substrate 1\u00b0? → SN2. Is it 3\u00b0 (and no strong base)? → SN1. Is it 3\u00b0 with strong base + heat? → E2. Carbocation stability: 3\u00b0 > 2\u00b0 > 1\u00b0 > methyl.",
  "For thermodynamics questions: always check if \u0394ng = 0 before using \u0394H = \u0394U. If gases present: \u0394H = \u0394U + \u0394ngRT (R = 8.314 J/mol\u00b7K).",
  "Periodic trends memory: Cl has HIGHER electron affinity than F (small 2p orbital of F causes repulsion). N has HIGHER IE than O (half-filled 2p stability). These two anomalies appear every year.",
  "Electrochemistry shortcut: If E\u00b0cell is asked, always use reduction potentials: E\u00b0cell = E\u00b0(reduction at cathode) - E\u00b0(reduction at anode). NEVER flip signs manually.",
  "NEET last 30 min: scan biomolecules (proteins, carbs, nucleic acids) and polymers flashcards. These are high-marks, low-effort topics with predictable question patterns.",
];

const EXTRA_MISTAKES: CommonMistake[] = [
  {
    id: "cm13",
    chapter: "Organic Chemistry",
    mistake:
      "Forgetting that Markovnikov's rule applies to HBr, HCl, HI but anti-Markovnikov ONLY to HBr with peroxides",
    correction:
      "Anti-Markovnikov (radical) mechanism ONLY works for HBr. HCl and HI do not readily undergo radical addition. Peroxide (ROOR) is the indicator of radical mechanism.",
  },
  {
    id: "cm14",
    chapter: "Physical Chemistry",
    mistake: "Using \u0394G = 0 to mean non-spontaneous",
    correction:
      "\u0394G = 0 means the reaction is at EQUILIBRIUM (not non-spontaneous). \u0394G < 0 = spontaneous (forward). \u0394G > 0 = non-spontaneous (forward), spontaneous in reverse. \u0394G\u00b0 = 0 means K = 1 (not that E\u00b0 = 0 always).",
  },
  {
    id: "cm15",
    chapter: "Organic Chemistry",
    mistake:
      "Crossed Cannizzaro: assuming both PhCHO and HCHO can get oxidized or reduced randomly",
    correction:
      "In crossed Cannizzaro, HCHO is ALWAYS the one oxidized to formate (HCOO-) because it is more reactive toward hydride transfer. PhCHO is always reduced to benzyl alcohol. This selectivity is always tested in JEE.",
  },
  {
    id: "cm16",
    chapter: "Physical Chemistry",
    mistake: "Using 22.4 L as molar volume at 25\u00b0C",
    correction:
      "22.4 L/mol is the molar volume at STP (0\u00b0C = 273 K, 1 atm). At 25\u00b0C (298 K, 1 bar), molar volume = 24.8 L/mol. Read problem carefully: if it says 'STP' use 22.4; if '25\u00b0C' use ideal gas law PV=nRT.",
  },
];

const LAST_MINUTE_TIPS = [
  "Last 48h: Focus on reaction mechanisms (Aldol, Cannizzaro, SN1/SN2) — these have the highest density of quick-recallable facts.",
  "Learn all named reactions by reaction type — C-C forming (Grignard, Aldol), reduction (Clemmensen/Wolff-Kishner), rearrangement (Beckmann, Hofmann).",
  "Memorize the full IE₁ order for Period 2: Li < B < Be < C < O < N < F < Ne — the anomalies (Be>B, N>O) are tested every year.",
  "For electrochemistry: know ΔG° = −nFE°, ΔG° = −RT ln K, and Nernst equation. These three are always connected in JEE problems.",
  "NEET: biomolecules and polymers are 8–10 marks. Carbohydrates (reducing/non-reducing), proteins (structure levels, color tests), polymers (addition/condensation) — easy to learn, reliable marks.",
  "Colligative properties: always use molality (m), van't Hoff factor (i). ΔTb = iKbm; ΔTf = iKfm; π = iMRT. For NaCl: i=2; for glucose: i=1; acetic acid in benzene: i<1 (dimerization).",
  "Coordination compounds: always name in IUPAC — ligands alphabetically, then metal with oxidation state. Anionic complex suffix: -ate. K₄[Fe(CN)₆] = potassium hexacyanidoferrate(II).",
  "Crystal field theory: weak field ligands → high spin; strong field → low spin. Spectrochemical series (weak to strong): I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO.",
  "Organic mechanism shortcuts: always identify the α-carbon (C next to C=O). The α-H is always involved in enolization, Aldol, HVZ reactions.",
  "JEE Advanced tip: any 3-step synthesis problem likely involves Grignard → Clemmensen → some named reaction. Think in terms of carbon-chain changes.",
];

const HIGH_YIELD_FORMULAS: HighYieldFormula[] = [
  {
    id: "f1",
    chapter: "Physical Chemistry",
    name: "Nernst Equation",
    formula: "E = E° − (0.0592/n) × log Q",
    variables:
      "n = electrons transferred; Q = reaction quotient; E° = standard cell potential",
    tip: "At equilibrium: E = 0, log K = nE°/0.0592. For concentration cell (same metal/solution): E = (0.0592/n) × log (C₁/C₂).",
  },
  {
    id: "f2",
    chapter: "Physical Chemistry",
    name: "Gibbs Free Energy Trinity",
    formula: "ΔG° = −RT ln K = −nFE° = ΔH° − TΔS°",
    variables: "R = 8.314 J/mol·K; F = 96485 C/mol; n = moles of electrons",
    tip: "These three expressions all equal ΔG°. If E° > 0, then ΔG° < 0, K > 1 (spontaneous and product-favored).",
  },
  {
    id: "f3",
    chapter: "Physical Chemistry",
    name: "Henderson-Hasselbalch Buffer",
    formula: "pH = pKₐ + log([A⁻]/[HA])",
    variables:
      "[A⁻] = conjugate base concentration; [HA] = weak acid concentration",
    tip: "Maximum buffer capacity when [A⁻] = [HA], i.e., pH = pKₐ. Blood pH 7.4 maintained by H₂CO₃/HCO₃⁻ buffer (pKₐ = 6.1).",
  },
  {
    id: "f4",
    chapter: "Physical Chemistry",
    name: "Van't Hoff Factor",
    formula:
      "i = 1 + α(n − 1) for dissociation; i = 1 − α(1 − 1/n) for association",
    variables:
      "α = degree of dissociation/association; n = particles per formula unit",
    tip: "NaCl fully dissociated: i = 2. Acetic acid in benzene dimerizes: i < 1. Used in: ΔTb = iKbm; ΔTf = iKfm; π = iMRT.",
  },
  {
    id: "f5",
    chapter: "Physical Chemistry",
    name: "Arrhenius Equation",
    formula: "k = A·e^(−Eₐ/RT); ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂)",
    variables:
      "A = frequency/pre-exponential factor; Eₐ = activation energy; R = 8.314 J/mol·K",
    tip: "Rule of thumb: rate doubles for every 10°C rise (when Eₐ ≈ 50 kJ/mol). ln A intercept on Arrhenius plot (ln k vs 1/T); slope = −Eₐ/R.",
  },
  {
    id: "f6",
    chapter: "Physical Chemistry",
    name: "Bohr Model Energies",
    formula: "Eₙ = −13.6Z²/n² eV; rₙ = 0.529n²/Z Å",
    variables: "Z = atomic number; n = principal quantum number",
    tip: "For He⁺ (Z=2): E₁ = −54.4 eV. ΔE = 13.6Z²(1/n₁² − 1/n₂²). Lyman: to n=1 (UV); Balmer: to n=2 (visible).",
  },
  {
    id: "f7",
    chapter: "Physical Chemistry",
    name: "Integrated Rate Laws",
    formula:
      "Zero: [A] = [A]₀ − kt; 1st: ln[A] = ln[A]₀ − kt; 2nd: 1/[A] = 1/[A]₀ + kt",
    variables:
      "t½(0th) = [A]₀/2k; t½(1st) = 0.693/k (independent of [A]₀); t½(2nd) = 1/k[A]₀",
    tip: "Graphical: zero → [A] vs t linear; 1st → ln[A] vs t linear; 2nd → 1/[A] vs t linear. Radioactive decay = always 1st order.",
  },
  {
    id: "f8",
    chapter: "Physical Chemistry",
    name: "Kp–Kc Relationship",
    formula: "Kp = Kc(RT)^Δng",
    variables:
      "Δng = moles of gaseous products − moles of gaseous reactants; R = 0.0821 L·atm/mol·K",
    tip: "For N₂+3H₂⇌2NH₃: Δng = −2. For PCl₅⇌PCl₃+Cl₂: Δng = +1. Kp = Kc only when Δng = 0.",
  },
  {
    id: "f9",
    chapter: "Organic Chemistry",
    name: "Degrees of Unsaturation (DBE)",
    formula: "DBE = (2C + 2 + N − H − X) / 2",
    variables:
      "C = carbons; N = nitrogens; H = hydrogens; X = halogens; O not counted",
    tip: "Each ring or double bond = 1 DBE. Triple bond = 2. Benzene ring = 4 (3 double bonds + 1 ring). C₆H₅Cl → DBE = (12+2−5−1)/2 = 4.",
  },
  {
    id: "f10",
    chapter: "Organic Chemistry",
    name: "Degree of Polymerization",
    formula: "DP = Mn / M₀ (number-average molar mass / monomer mass)",
    variables:
      "Mn = number-average molar mass; Mw = weight-average molar mass; PDI = Mw/Mn",
    tip: "Living polymerizations: PDI ≈ 1.0. Free radical: PDI ≈ 1.5–2.0. Step-growth (condensation) at full conversion: PDI ≈ 2.0.",
  },
  {
    id: "f11",
    chapter: "Inorganic Chemistry",
    name: "Crystal Field Stabilization Energy",
    formula: "CFSE (octahedral) = −0.4n(t₂g) × Δₒ + 0.6n(eg) × Δₒ",
    variables:
      "n(t₂g) = electrons in t₂g; n(eg) = electrons in eg; Δₒ = crystal field splitting energy",
    tip: "d⁶ low spin: CFSE = −2.4Δₒ + 2P. d⁵ high spin (Mn²⁺): CFSE = 0. High CFSE → more stable complex → used to predict color and magnetic properties.",
  },
  {
    id: "f12",
    chapter: "Inorganic Chemistry",
    name: "Faraday's Electrolysis Law",
    formula: "m = (M × I × t) / (n × F) = ZQ",
    variables:
      "M = molar mass; I = current (A); t = time (s); n = electrons per ion; F = 96485 C/mol",
    tip: "Z (electrochemical equivalent) = M/(nF). To deposit 1 g of Cu (M=64, n=2): need Q = 64/(2×96485) × (1/1) = 3024 C. Know units: kg/C for Z.",
  },
];

const HUB_FACTS: HubFact[] = [
  {
    id: "pc-1",
    chapter: "Physical Chemistry",
    fact: "At STP (0°C, 1 atm), one mole of any ideal gas occupies 22.4 L. At SATP (25°C, 1 bar), it occupies 24.8 L.",
    importance: "Foundation of stoichiometry and gas law problems.",
    examTip:
      "JEE uses 22.4 L (STP) but sometimes specifies 25°C. NEET almost always uses STP = 22.4 L. Read carefully.",
  },
  {
    id: "pc-2",
    chapter: "Physical Chemistry",
    fact: "Enthalpy of neutralization: strong acid + strong base = −57.1 kJ/mol. Weak acid or base: less (ionization energy consumed).",
    importance: "Distinguishes strong vs weak acid/base in thermochemistry.",
    examTip:
      "HF is a weak acid — its ΔH neutralization ≠ −57.1. If ΔH << 57.1 kJ/mol, acid or base must be weak.",
  },
  {
    id: "pc-3",
    chapter: "Physical Chemistry",
    fact: "Rate = k[A]ⁿ[B]ᵐ. Zero-order: rate = k (constant). 1st order: t½ = 0.693/k (independent of conc). 2nd order: t½ = 1/k[A]₀.",
    importance:
      "Rate laws are core to kinetics — order must be experimentally determined.",
    examTip:
      "Radioactive decay is always 1st order. Units of k: (mol/L)^(1−n)/s. Zero order: mol/L/s. 2nd order: L/mol/s.",
  },
  {
    id: "pc-4",
    chapter: "Physical Chemistry",
    fact: "Kp = Kc(RT)^Δng where R = 0.0821 L·atm/mol·K and Δng = change in moles of gas.",
    importance:
      "Converts between concentration and pressure equilibrium constants.",
    examTip:
      "Δng for N₂+3H₂⇌2NH₃ is −2. For PCl₅⇌PCl₃+Cl₂ it is +1. If Δng = 0, Kp = Kc.",
  },
  {
    id: "pc-5",
    chapter: "Physical Chemistry",
    fact: "van't Hoff factor (i): i = 1 + α(n−1) for dissociation; for association i = 1 − α(1 − 1/n). For complete dissociation of NaCl: i = 2.",
    importance: "Colligative properties all scale with i.",
    examTip:
      "Acetic acid in benzene dimerizes: i < 1. ΔTb = ikbm; ΔTf = ikfm; π = iMRT.",
  },
  {
    id: "pc-6",
    chapter: "Physical Chemistry",
    fact: "Gibbs Free Energy: ΔG = ΔH − TΔS. Spontaneous when ΔG < 0. ΔG° = −RT ln K = −nFE°cell.",
    importance: "Connects thermodynamics, equilibrium, and electrochemistry.",
    examTip:
      "ΔH<0, ΔS>0 → always spontaneous. ΔH>0, ΔS<0 → never spontaneous. Temperature-dependent: sign of TΔS determines outcome.",
  },
  {
    id: "pc-7",
    chapter: "Physical Chemistry",
    fact: "Hess's Law: ΔH of a reaction = sum of ΔH of individual steps, regardless of path (state function).",
    importance: "Allows calculation of ΔH for unmeasurable reactions.",
    examTip:
      "Reverse a reaction → reverse sign of ΔH. Multiply coefficients → multiply ΔH. Formation enthalpies of elements in standard state = 0.",
  },
  {
    id: "pc-8",
    chapter: "Physical Chemistry",
    fact: "Bohr model: rₙ = 0.529n²/Z Å; Eₙ = −13.6Z²/n² eV. Energy levels negative (bound state).",
    importance:
      "Quantitative values for hydrogen-like atoms; basis of spectroscopy.",
    examTip:
      "He⁺ (Z=2): E₁ = −54.4 eV. Lyman series: n→1 (UV). Balmer: n→2 (visible, 4 lines). Formula: ΔE = 13.6Z²(1/n₁²−1/n₂²).",
  },
  {
    id: "pc-9",
    chapter: "Physical Chemistry",
    fact: "Cell potential E°cell = E°cathode − E°anode (both reduction potentials). ΔG° = −nFE°cell. E°cell > 0 → spontaneous.",
    importance:
      "Predicts whether electrochemical reaction occurs spontaneously.",
    examTip:
      "Zn-Cu cell: E°cell = 0.34−(−0.76) = 1.10 V. More positive E° = stronger oxidizing agent. SHE = 0.00 V by definition.",
  },
  {
    id: "pc-10",
    chapter: "Physical Chemistry",
    fact: "de Broglie wavelength: λ = h/mv = h/p. For electron at voltage V: λ = 12.27/√V Å.",
    importance: "Quantum mechanical basis for electron wave behavior.",
    examTip:
      "At 100 V: λ ≈ 1.23 Å (X-ray range — explains electron diffraction). Heisenberg: Δx·Δp ≥ h/4π.",
  },
  {
    id: "pc-11",
    chapter: "Physical Chemistry",
    fact: "Raoult's Law: P_solution = x_solvent × P°_solvent. Positive deviation: A−B < A−A bonds (ethanol-water). Negative deviation: A−B > A−A bonds (HCl-water).",
    importance: "Explains azeotrope formation and real solution behavior.",
    examTip:
      "Ethanol-water: minimum boiling azeotrope at 95.6% EtOH (positive deviation). HCl-water: maximum boiling azeotrope at 20.2% HCl (negative deviation).",
  },
  {
    id: "pc-12",
    chapter: "Physical Chemistry",
    fact: "Buffer pH = pKₐ + log([A⁻]/[HA]). Maximum buffer capacity when [A⁻] = [HA], i.e., pH = pKₐ.",
    importance: "Critical for acid-base equilibrium and biological chemistry.",
    examTip:
      "Buffer works best within ±1 pH unit of pKₐ. Blood pH 7.4 maintained by H₂CO₃/HCO₃⁻ (pKₐ = 6.1).",
  },
  {
    id: "pc-13",
    chapter: "Physical Chemistry",
    fact: "Crystal defects: Schottky (equal cation+anion vacancies; NaCl, KCl — decreases density), Frenkel (ion moves to interstitial; AgBr, ZnS — density unchanged).",
    importance:
      "Ionic crystal defects affect conductivity, density, and photographic properties.",
    examTip:
      "AgBr shows BOTH Frenkel and Schottky. Metal excess → F-centres (color). Schottky decreases density; Frenkel does not.",
  },
  {
    id: "oc-1",
    chapter: "Organic Chemistry",
    fact: "Grignard: HCHO → 1° alcohol; RCHO → 2° alcohol; R₂C=O → 3° alcohol; CO₂ → carboxylic acid; ester → 3° alcohol (same group twice).",
    importance: "Grignard is most versatile C-C bond forming tool.",
    examTip:
      "Requires ANHYDROUS conditions. Grignard + CO₂ (dry ice) → RCOOH (frequently tested route). Must know all carbonyl substrates.",
  },
  {
    id: "oc-2",
    chapter: "Organic Chemistry",
    fact: "SN1: 3° > 2° >> 1°. Proceeds via planar carbocation → racemization. SN2: 1° > 2° >> 3°. Backside attack → inversion (Walden inversion).",
    importance: "Predicting substitution mechanism is core JEE Organic.",
    examTip:
      "Polar protic (water, EtOH) favors SN1/E1. Polar aprotic (DMSO, acetone, DMF) favors SN2. Strong nucleophile + 1° = SN2.",
  },
  {
    id: "oc-3",
    chapter: "Organic Chemistry",
    fact: "DBE = (2C + 2 + N − H − X) / 2. Each ring/double bond = 1. Triple bond = 2. Benzene = 4.",
    importance: "DBE tells number of rings/pi bonds from molecular formula.",
    examTip:
      "C₆H₅Cl: DBE = (12+2−5−1)/2 = 4 (benzene). C₄H₆: DBE = 2 (could be 2 double bonds, 1 triple bond, or ring+double bond).",
  },
  {
    id: "oc-4",
    chapter: "Organic Chemistry",
    fact: "EAS: o/p directors (atoms with lone pair attached to ring — OH, OR, NH₂, halogens). Meta directors (atoms with π bond or positive charge — NO₂, CHO, COOH, CN).",
    importance:
      "Predicting EAS products is one of highest-frequency organic question types.",
    examTip:
      "Halogens: o/p directing but RING DEACTIVATING (−I effect > +M for rate, but +M for direction). When two groups conflict, stronger director wins.",
  },
  {
    id: "ic-1",
    chapter: "Inorganic Chemistry",
    fact: "Mn oxidation states: +2 to +7 (all from +2 to +7). KMnO₄ = Mn⁷⁺. Cr: +2 to +6. K₂Cr₂O₇ = Cr⁶⁺. Color changes: KMnO₄ (purple) → Mn²⁺ (colorless in acid), MnO₂ (brown in neutral), MnO₄²⁻ (green in base).",
    importance:
      "Variable oxidation states explain catalytic ability and redox reactions.",
    examTip:
      "KMnO₄ + H₂SO₄: acidic permanganate oxidizes organics, decolorizes (Mn⁷⁺ → Mn²⁺). Cr₂O₇²⁻ (orange) → Cr³⁺ (green). Color change = oxidation state change.",
  },
  {
    id: "ic-2",
    chapter: "Inorganic Chemistry",
    fact: "VSEPR: sp (linear 180°), sp² (trigonal planar 120°), sp³ (tetrahedral 109.5°), sp³d (trigonal bipyramidal), sp³d² (octahedral).",
    importance: "Core topic for molecular geometry in both NEET and JEE.",
    examTip:
      "XeF₂ = sp³d (linear, 3 lone pairs on Xe). IF₇ = sp³d³ (pentagonal bipyramidal). PCl₅ = sp³d. SF₆ = sp³d².",
  },
  {
    id: "ic-3",
    chapter: "Inorganic Chemistry",
    fact: "Noble gas compounds: XeF₂ (linear), XeF₄ (square planar), XeF₆ (distorted octahedral), XeO₃ (pyramidal). First: XePtF₆ (Neil Bartlett, 1962).",
    importance:
      "Demonstrates that noble gases can form compounds with very electronegative elements.",
    examTip:
      "He: only element that does NOT solidify at atmospheric pressure at 0 K. Ar: 0.93% of atmosphere (most abundant noble gas). Rn: radioactive.",
  },
  {
    id: "ic-4",
    chapter: "Inorganic Chemistry",
    fact: "Inert pair effect: heavier p-block elements prefer lower oxidation state (Pb²⁺ > Pb⁴⁺; Tl⁺ > Tl³⁺; Bi³⁺ > Bi⁵⁺). Caused by relativistic stabilization of 6s² electrons.",
    importance: "Explains anomalous behavior of heavy p-block elements.",
    examTip:
      "PbO₂ is better oxidizer than SnO₂ (because Pb wants to go to +2, Pb⁴⁺ is reduced). BiCl₃ exists but BiCl₅ is unstable. Tl⁺ resembles alkali metals.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Merge extra facts and mistakes into the main arrays
const HUB_FACTS_ALL = [...HUB_FACTS, ...EXTRA_HUB_FACTS];
const COMMON_MISTAKES_ALL = [...COMMON_MISTAKES, ...EXTRA_MISTAKES];

const SECTIONS: { id: HubSection; label: string; emoji: string }[] = [
  { id: "facts", label: "Key Facts", emoji: "📚" },
  { id: "ranking", label: "Chapter Rank", emoji: "📊" },
  { id: "mistakes", label: "Avoid These", emoji: "⚠️" },
  { id: "tips", label: "Last-Minute", emoji: "⚡" },
  { id: "formulas", label: "Formulas", emoji: "🔢" },
];

export function JeeNeetHubTab() {
  const [query, setQuery] = useState("");
  const [chapterFilter, setChapterFilter] = useState<Chapter | "All">("All");
  const [section, setSection] = useState<HubSection>("facts");
  const { addBookmark, removeBookmark, isBookmarked } = useChemStore();

  const chapters: (Chapter | "All")[] = [
    "All",
    "Physical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry",
  ];

  const filteredFacts = HUB_FACTS_ALL.filter((f) => {
    const matchChapter = chapterFilter === "All" || f.chapter === chapterFilter;
    const q = query.toLowerCase();
    const matchSearch =
      !q ||
      f.fact.toLowerCase().includes(q) ||
      f.importance.toLowerCase().includes(q) ||
      f.examTip.toLowerCase().includes(q);
    return matchChapter && matchSearch;
  });

  const filteredFormulas = HIGH_YIELD_FORMULAS.filter((f) => {
    const matchChapter = chapterFilter === "All" || f.chapter === chapterFilter;
    const q = query.toLowerCase();
    const matchSearch =
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.formula.toLowerCase().includes(q) ||
      f.tip.toLowerCase().includes(q);
    return matchChapter && matchSearch;
  });

  const filteredMistakes = COMMON_MISTAKES_ALL.filter((m) => {
    const matchChapter = chapterFilter === "All" || m.chapter === chapterFilter;
    const q = query.toLowerCase();
    const matchSearch =
      !q ||
      m.mistake.toLowerCase().includes(q) ||
      m.correction.toLowerCase().includes(q);
    return matchChapter && matchSearch;
  });

  return (
    <div className="space-y-5" data-ocid="jee_neet.panel">
      {/* Header */}
      <div
        className="rounded-2xl p-4 text-center"
        style={{
          background: "oklch(0.82 0.18 85 / 0.08)",
          border: "1px solid oklch(0.82 0.18 85 / 0.3)",
        }}
      >
        <p
          className="font-bold text-lg mb-1"
          style={{ color: "oklch(0.9 0.18 85)" }}
        >
          🎯 JEE / NEET Complete Hub
        </p>
        <p className="text-xs text-muted-foreground">
          Key facts · Chapter rankings · Common mistakes · Last-minute tips ·
          High-yield formulas
        </p>
      </div>

      {/* Section tabs */}
      <div
        className="flex gap-1 p-1 rounded-2xl overflow-x-auto"
        style={{
          background: "oklch(0.18 0.02 250 / 0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-1 justify-center"
            style={
              section === s.id
                ? {
                    background: "oklch(0.82 0.18 85 / 0.2)",
                    color: "oklch(0.9 0.18 85)",
                    border: "1px solid oklch(0.82 0.18 85 / 0.4)",
                  }
                : { color: "oklch(0.58 0 0)" }
            }
            data-ocid={`jee_neet.section.${s.id}`}
          >
            <span>{s.emoji}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      {(section === "facts" ||
        section === "mistakes" ||
        section === "formulas") && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search facts, tips, formulas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-transparent border border-border/50 focus:outline-none focus:border-primary/60 placeholder:text-muted-foreground"
            style={{
              background: "oklch(0.18 0.02 250 / 0.5)",
              backdropFilter: "blur(16px)",
            }}
            data-ocid="jee_neet.search_input"
          />
        </div>
      )}

      {/* Chapter filters (for facts/mistakes/formulas) */}
      {(section === "facts" ||
        section === "mistakes" ||
        section === "formulas") && (
        <div className="flex flex-wrap gap-2">
          {chapters.map((ch) => {
            const isActive = chapterFilter === ch;
            const style =
              ch === "All"
                ? {
                    color: "oklch(0.82 0.18 85)",
                    active: "oklch(0.82 0.18 85 / 0.2)",
                    border: "oklch(0.82 0.18 85 / 0.4)",
                  }
                : {
                    color: CHAPTER_COLORS[ch as Chapter].color,
                    active: CHAPTER_COLORS[ch as Chapter].bg,
                    border: `${CHAPTER_COLORS[ch as Chapter].color}55`,
                  };

            return (
              <button
                key={ch}
                type="button"
                onClick={() => setChapterFilter(ch)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border"
                style={
                  isActive
                    ? {
                        background: style.active,
                        color: style.color,
                        borderColor: style.border,
                      }
                    : {
                        background: "oklch(0.18 0.02 250 / 0.4)",
                        color: "oklch(0.58 0 0)",
                        borderColor: "oklch(0.28 0.02 250 / 0.4)",
                      }
                }
                data-ocid={`jee_neet.filter.${ch.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {ch}
              </button>
            );
          })}
        </div>
      )}

      {/* ─── SECTION: KEY FACTS ─────────────────────────────────────────── */}
      {section === "facts" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/80">
              {filteredFacts.length}
            </span>{" "}
            facts showing
          </p>
          {filteredFacts.map((fact, i) => {
            const chapterStyle = CHAPTER_COLORS[fact.chapter];
            const bookmarkId = `jee-fact-${fact.id}`;
            const bookmarked = isBookmarked(bookmarkId);
            return (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                className="rounded-2xl p-4 space-y-3"
                style={{
                  background: "oklch(0.18 0.02 250 / 0.55)",
                  backdropFilter: "blur(24px)",
                  border: `1px solid ${chapterStyle.color}33`,
                }}
                data-ocid={`jee_neet.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0"
                    style={{
                      background: chapterStyle.bg,
                      color: chapterStyle.color,
                    }}
                  >
                    {fact.chapter}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      bookmarked
                        ? removeBookmark(bookmarkId)
                        : addBookmark(bookmarkId)
                    }
                    className="flex-shrink-0 transition-transform hover:scale-110"
                    aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                    data-ocid={`jee_neet.bookmark.${i + 1}`}
                  >
                    {bookmarked ? (
                      <BookmarkCheck
                        className="w-4 h-4"
                        style={{ color: "oklch(0.82 0.18 85)" }}
                      />
                    ) : (
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {fact.fact}
                </p>
                <div
                  className="rounded-xl p-2.5 text-xs leading-relaxed"
                  style={{
                    background: `${chapterStyle.color}0D`,
                    border: `1px solid ${chapterStyle.color}25`,
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: chapterStyle.color }}
                  >
                    Why it matters:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {fact.importance}
                  </span>
                </div>
                <div
                  className="rounded-xl p-2.5 text-xs leading-relaxed"
                  style={{
                    background: "oklch(0.82 0.18 85 / 0.07)",
                    border: "1px solid oklch(0.82 0.18 85 / 0.25)",
                  }}
                >
                  <span
                    className="font-bold"
                    style={{ color: "oklch(0.82 0.18 85)" }}
                  >
                    🎯 Exam Tip:{" "}
                  </span>
                  <span style={{ color: "oklch(0.88 0.1 85)" }}>
                    {fact.examTip}
                  </span>
                </div>
              </motion.div>
            );
          })}
          {filteredFacts.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="jee_neet.empty_state"
            >
              No facts match your search.
            </div>
          )}
        </div>
      )}

      {/* ─── SECTION: CHAPTER RANKINGS ──────────────────────────────────── */}
      {section === "ranking" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground mb-2">
            Topics ranked by estimated exam frequency from past papers analysis.
          </p>
          {CHAPTER_RANKINGS.map((r, i) => {
            const chStyle = CHAPTER_COLORS[r.chapter];
            return (
              <motion.div
                key={r.topic}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl p-4"
                style={{
                  background: "oklch(0.18 0.02 250 / 0.55)",
                  backdropFilter: "blur(24px)",
                  border: `1px solid ${chStyle.color}33`,
                }}
                data-ocid={`jee_neet.rank.${i + 1}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{
                      background: `${chStyle.color}20`,
                      color: chStyle.color,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1">{r.topic}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: chStyle.bg, color: chStyle.color }}
                    >
                      {r.chapter}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">
                      {r.description}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          JEE weight
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-16 h-1.5 rounded-full bg-border/30 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${r.jeeWeight * 8}%`,
                                background: "oklch(0.68 0.16 258)",
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "oklch(0.68 0.16 258)" }}
                          >
                            ~{r.jeeWeight}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          NEET weight
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-16 h-1.5 rounded-full bg-border/30 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${r.neetWeight * 8}%`,
                                background: "oklch(0.7 0.21 140)",
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "oklch(0.7 0.21 140)" }}
                          >
                            ~{r.neetWeight}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── SECTION: COMMON MISTAKES ───────────────────────────────────── */}
      {section === "mistakes" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            {filteredMistakes.length} common mistakes to avoid
          </p>
          {filteredMistakes.map((m, i) => {
            const chStyle = CHAPTER_COLORS[m.chapter];
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl p-4 space-y-3"
                style={{
                  background: "oklch(0.18 0.02 250 / 0.55)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid oklch(0.65 0.19 22 / 0.3)",
                }}
                data-ocid={`jee_neet.mistake.${i + 1}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">❌</span>
                  <div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full mb-1 inline-block"
                      style={{ background: chStyle.bg, color: chStyle.color }}
                    >
                      {m.chapter}
                    </span>
                    <p
                      className="text-sm font-semibold leading-relaxed mt-1"
                      style={{ color: "oklch(0.82 0.16 30)" }}
                    >
                      Mistake: {m.mistake}
                    </p>
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-xs leading-relaxed"
                  style={{
                    background: "oklch(0.72 0.22 140 / 0.1)",
                    border: "1px solid oklch(0.72 0.22 140 / 0.3)",
                  }}
                >
                  <span
                    className="font-bold"
                    style={{ color: "oklch(0.72 0.22 140)" }}
                  >
                    ✅ Correct:{" "}
                  </span>
                  <span className="text-muted-foreground">{m.correction}</span>
                </div>
              </motion.div>
            );
          })}
          {filteredMistakes.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="jee_neet.mistakes_empty"
            >
              No mistakes match your filter.
            </div>
          )}
        </div>
      )}

      {/* ─── SECTION: LAST-MINUTE TIPS ──────────────────────────────────── */}
      {section === "tips" && (
        <div className="space-y-3">
          <div
            className="rounded-2xl p-3 text-xs text-center"
            style={{
              background: "oklch(0.82 0.18 85 / 0.08)",
              border: "1px solid oklch(0.82 0.18 85 / 0.2)",
            }}
          >
            <span style={{ color: "oklch(0.9 0.18 85)" }}>
              ⚡ {LAST_MINUTE_TIPS.length + EXTRA_LAST_MINUTE_TIPS.length}{" "}
              revision tips for the last 48 hours before exam
            </span>
          </div>
          {[...LAST_MINUTE_TIPS, ...EXTRA_LAST_MINUTE_TIPS].map((tip, i) => (
            <motion.div
              key={tip.slice(0, 20)}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 rounded-2xl p-4"
              style={{
                background: "oklch(0.18 0.02 250 / 0.55)",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(0.82 0.18 85 / 0.2)",
              }}
              data-ocid={`jee_neet.tip.${i + 1}`}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{
                  background: "oklch(0.82 0.18 85 / 0.2)",
                  color: "oklch(0.9 0.18 85)",
                }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {tip}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* ─── SECTION: HIGH-YIELD FORMULAS ───────────────────────────────── */}
      {section === "formulas" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            {filteredFormulas.length} high-yield formulas
          </p>
          {filteredFormulas.map((f, i) => {
            const chStyle = CHAPTER_COLORS[f.chapter];
            const bookmarkId = `jee-formula-${f.id}`;
            const bookmarked = isBookmarked(bookmarkId);
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl p-4 space-y-3"
                style={{
                  background: "oklch(0.18 0.02 250 / 0.55)",
                  backdropFilter: "blur(24px)",
                  border: `1px solid ${chStyle.color}33`,
                }}
                data-ocid={`jee_neet.formula.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: chStyle.bg, color: chStyle.color }}
                    >
                      {f.chapter}
                    </span>
                    <p className="font-semibold text-sm mt-1.5">{f.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      bookmarked
                        ? removeBookmark(bookmarkId)
                        : addBookmark(bookmarkId)
                    }
                    className="flex-shrink-0 transition-transform hover:scale-110"
                    aria-label={
                      bookmarked ? "Remove bookmark" : "Bookmark formula"
                    }
                    data-ocid={`jee_neet.formula_bookmark.${i + 1}`}
                  >
                    {bookmarked ? (
                      <BookmarkCheck
                        className="w-4 h-4"
                        style={{ color: "oklch(0.82 0.18 85)" }}
                      />
                    ) : (
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <div
                  className="rounded-xl px-4 py-3 font-mono text-sm text-center"
                  style={{
                    background: "oklch(0.14 0.02 250 / 0.7)",
                    border: `1px solid ${chStyle.color}30`,
                    color: chStyle.color,
                  }}
                >
                  {f.formula}
                </div>
                <p className="text-xs text-muted-foreground">{f.variables}</p>
                <div
                  className="rounded-xl p-2.5 text-xs leading-relaxed"
                  style={{
                    background: "oklch(0.82 0.18 85 / 0.07)",
                    border: "1px solid oklch(0.82 0.18 85 / 0.25)",
                  }}
                >
                  <span
                    className="font-bold"
                    style={{ color: "oklch(0.82 0.18 85)" }}
                  >
                    🎯 Tip:{" "}
                  </span>
                  <span style={{ color: "oklch(0.88 0.1 85)" }}>{f.tip}</span>
                </div>
              </motion.div>
            );
          })}
          {filteredFormulas.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="jee_neet.formulas_empty"
            >
              No formulas match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
