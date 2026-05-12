import {
  Check,
  ChevronDown,
  Copy,
  FlaskConical,
  FunctionSquare,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StudyNote {
  id: string;
  title: string;
  content: string;
  keyFact: string;
  category: string;
}

interface KeyFormula {
  id: string;
  name: string;
  formula: string;
  derivation: string;
  useCase: string;
}

interface KeyReaction {
  id: string;
  name: string;
  equation: string;
  type: string;
  conditions: string;
  explanation: string;
}

interface AccordionSection {
  id: string;
  label: string;
  color: string;
  notes?: StudyNote[];
  formulas?: KeyFormula[];
  reactions?: KeyReaction[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PHYSICAL_CHEM_NOTES: StudyNote[] = [
  {
    id: "ph-1",
    title: "Gas Laws & Ideal Gas Behaviour",
    content:
      "Boyle's law (PV = const), Charles's law (V/T = const), Gay-Lussac (P/T = const), Avogadro (V ∝ n) combine into PV = nRT. Real gases deviate at high P and low T due to intermolecular forces and finite molecular volume. Van der Waals equation (P + a/V²)(V − b) = RT corrects for these. At low P or high T, all real gases approach ideal behaviour. Compressibility factor Z = PV/nRT: Z < 1 means attractive forces dominate; Z > 1 means repulsive.",
    keyFact:
      "PV = nRT; R = 8.314 J/mol·K = 0.0821 L·atm/mol·K. At STP (0°C, 1 atm): 22.4 L/mol.",
    category: "physical",
  },
  {
    id: "ph-2",
    title: "Thermodynamics: ΔG, ΔH, ΔS",
    content:
      "First law: ΔU = q + w (energy conservation). Second law: Entropy of the universe always increases. ΔG = ΔH − TΔS determines spontaneity: ΔG < 0 (spontaneous), ΔG > 0 (non-spontaneous), ΔG = 0 (equilibrium). Combinations: −ΔH, +ΔS → always spontaneous; +ΔH, −ΔS → never spontaneous; −ΔH, −ΔS → spontaneous at low T (enthalpy-driven); +ΔH, +ΔS → spontaneous at high T (entropy-driven).",
    keyFact: "ΔG° = −RT ln K = −nFE°cell. Crossover T = ΔH/ΔS.",
    category: "physical",
  },
  {
    id: "ph-3",
    title: "Chemical Equilibrium & Le Chatelier",
    content:
      "At equilibrium, the rates of forward and reverse reactions are equal; concentrations are constant (not equal). Kc = [products]/[reactants] (concentration). Kp = Kc(RT)^Δng. Le Chatelier's principle: a system at equilibrium shifts to counteract a stress. Increasing concentration of reactant → shifts forward. Increasing T shifts equilibrium in the endothermic direction. Increasing P favours the side with fewer gas moles. Catalyst speeds equilibrium but does not shift it.",
    keyFact:
      "Kp = Kc(RT)^Δng. Reaction quotient Q: if Q < K → forward shift; Q > K → reverse shift.",
    category: "physical",
  },
  {
    id: "ph-4",
    title: "Chemical Kinetics: Rate Laws",
    content:
      "Rate = k[A]^m[B]^n where m and n are experimentally determined orders. Zero-order: [A] = [A]₀ − kt; t₁/₂ = [A]₀/2k. First-order: [A] = [A]₀e^(−kt); t₁/₂ = ln2/k = 0.693/k (constant half-life). Second-order: 1/[A] = 1/[A]₀ + kt. Arrhenius equation: k = Ae^(−Ea/RT). A higher activation energy Ea means slower reaction. Catalyst lowers Ea without being consumed.",
    keyFact:
      "First-order t₁/₂ = 0.693/k. Arrhenius: ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂).",
    category: "physical",
  },
  {
    id: "ph-5",
    title: "Solutions: Raoult's Law & Colligative Properties",
    content:
      "Raoult's law: P_soln = x_solvent × P°_solvent (ideal solutions). Colligative properties depend only on particle count. ΔTb = Kb·m·i (bp elevation); ΔTf = Kf·m·i (fp depression); π = MRTi (osmotic pressure). Van't Hoff factor i > 1 for electrolytes (dissociation), i < 1 for association. For water: Kb = 0.512 K·kg/mol, Kf = 1.86 K·kg/mol. Positive deviations from Raoult's law → A–B interactions weaker than A–A, B–B; negative deviations → A–B stronger.",
    keyFact:
      "ΔTf = Kf·m·i. Kf(water) = 1.86 K·kg/mol. Osmosis: π = CRT for dilute solutions.",
    category: "physical",
  },
  {
    id: "ph-6",
    title: "Electrochemistry: Cells & Nernst",
    content:
      "Galvanic cell converts chemical energy to electrical energy; electrolytic cell does the reverse. E°cell = E°cathode − E°anode (reduction potentials). Nernst: E = E° − (0.0592/n) log Q at 25°C. At equilibrium E = 0, Q = K, giving ΔG° = −RT ln K. Faraday's laws: m = (M·I·t)/(n·F). 1 Faraday = 96485 C. Kohlrausch's law: at infinite dilution, Λ°m = ν₊λ₊ + ν₋λ₋.",
    keyFact:
      "E°cell = E°(cathode) − E°(anode). Zn–Cu cell: 0.34 − (−0.76) = +1.10 V.",
    category: "physical",
  },
];

const ORGANIC_CHEM_NOTES: StudyNote[] = [
  {
    id: "or-1",
    title: "Nucleophilic Substitution: SN1 vs SN2",
    content:
      "SN2: bimolecular, one-step concerted mechanism, backside attack inverts configuration (Walden inversion), favoured by 1° substrates, strong nucleophiles, polar aprotic solvents (DMSO, acetone, DMF). Rate = k[substrate][nucleophile]. SN1: two-step via carbocation, 3° > 2° substrates, racemisation, polar protic solvents (H₂O, ROH), weak nucleophile. Rate = k[substrate]. Carbocation stability: 3° > 2° > 1° > methyl. Rearrangements (hydride/methyl shifts) possible in SN1.",
    keyFact:
      "SN2 → inversion (chiral centre flips). SN1 → racemisation (equal R and S formed).",
    category: "organic",
  },
  {
    id: "or-2",
    title: "Aldehydes & Ketones: Reactions",
    content:
      "Nucleophilic addition to C=O. Aldehydes react faster than ketones (less steric, less electron-donating). Tests: Tollens (silver mirror, aldehydes only), Fehling/Benedict (Cu²⁺ → Cu₂O red ppt, only for aliphatic aldehydes), Schiff's reagent (aldehydes turn pink). Cannizzaro reaction: aldehydes with no α-H in strong NaOH → disproportionation. Aldol condensation: α-H present + dilute base → β-hydroxy carbonyl → dehydrate → α,β-unsaturated. HCN addition to aldehydes and methyl ketones (nucleophilic).",
    keyFact:
      "Tollens: only aldehydes (not ketones). Iodoform test: CH₃CO– group → CHI₃ (yellow ppt).",
    category: "organic",
  },
  {
    id: "or-3",
    title: "Amines: Preparation & Reactions",
    content:
      "Primary, secondary, tertiary amines classified by number of organic groups on N. Basicity: 2° > 1° > 3° (in aqueous; steric vs solvation). Preparation: reduction of nitro compounds (Fe/HCl or H₂/Ni), ammonolysis of alkyl halides, Gabriel synthesis (1° amines only), reduction of nitriles. Diazotisation: ArNH₂ + NaNO₂ + HCl → ArN₂⁺Cl⁻ (0–5°C). Diazonium salts → ArOH (warm water), ArF (Balz-Schiemann), ArCN (Sandmeyer), coupling reactions (azo dyes).",
    keyFact:
      "Diazotisation temp: 0–5°C (to prevent dye decomposition). Sandmeyer: CuX/HX replaces N₂.",
    category: "organic",
  },
  {
    id: "or-4",
    title: "Carboxylic Acids & Derivatives",
    content:
      "Reactivity of acyl derivatives toward nucleophilic substitution (decreasing): acid chloride > anhydride > ester > amide. Fischer esterification: RCOOH + R'OH ⇌ RCOOR' + H₂O (acid catalyst, equilibrium, remove water). Saponification: ester + NaOH → salt + alcohol (irreversible, soap-making). Hell–Volhard–Zelinsky (HVZ): α-halogenation of acids (Br₂/red P). Reduction: LiAlH₄ reduces all; NaBH₄ does not reduce esters or acids.",
    keyFact:
      "RCOOH + SOCl₂ → RCOCl (cleanest, irreversible). LiAlH₄ reduces RCOOH → 1° alcohol.",
    category: "organic",
  },
  {
    id: "or-5",
    title: "Benzene & EAS Reactions",
    content:
      "Benzene's resonance structure gives delocalised π cloud (6 π electrons over 6 carbons). Undergoes electrophilic aromatic substitution (EAS), not addition (would destroy aromaticity). Types of EAS: halogenation (X₂/Lewis acid), nitration (HNO₃/H₂SO₄ → NO₂⁺ electrophile), sulphonation (fuming H₂SO₄ → reversible), Friedel-Crafts alkylation (RX/AlCl₃), Friedel-Crafts acylation (RCOCl/AlCl₃). Activating groups (–OH, –NH₂, –OR, alkyl) direct ortho/para. Deactivating groups (–NO₂, –CN, –COOH, halogens) direct meta (except halogens → o/p).",
    keyFact:
      "Nitration electrophile: NO₂⁺ (nitronium ion). Halogens deactivate but direct o/p.",
    category: "organic",
  },
  {
    id: "or-6",
    title: "Polymers & Biomolecules",
    content:
      "Addition polymers: ethene → polyethene; vinyl chloride → PVC; tetrafluoroethylene → Teflon. Condensation polymers: lose small molecule (H₂O, HCl) per monomer. Nylon-6,6 (hexamethylenediamine + adipic acid), Dacron/PET (ethylene glycol + terephthalic acid), Bakelite (phenol + methanal). Carbohydrates: monosaccharides (glucose C₆H₁₂O₆), disaccharides (sucrose = glucose + fructose), polysaccharides (starch, cellulose). Proteins: polypeptides (α-amino acids linked by peptide bonds). DNA has adenine–thymine (2 H-bonds) and guanine–cytosine (3 H-bonds).",
    keyFact:
      "Nylon-6 ≠ Nylon-6,6. Nylon-6 from caprolactam (ring opening). DNA base pairs: A–T, G–C.",
    category: "organic",
  },
];

const INORGANIC_CHEM_NOTES: StudyNote[] = [
  {
    id: "in-1",
    title: "Periodic Trends Summary",
    content:
      "Atomic radius decreases across a period (increasing nuclear charge, same shielding) and increases down a group (new shells). Ionization energy (IE) increases across period (harder to remove electron from smaller atom with higher Z) and decreases down group. Exceptions: IE(N) > IE(O) (N has half-filled 2p, extra stable); IE(Be) > IE(B) (2s vs 2p). Electronegativity (EN) increases across period and up group; F is highest (3.98). Electron affinity (EA) generally increases across period. Cl has higher EA than F due to size.",
    keyFact:
      "Atomic radius: increases down group, decreases left→right. EN: F highest (3.98), Cs lowest (0.79).",
    category: "inorganic",
  },
  {
    id: "in-2",
    title: "d-Block: Transition Metals",
    content:
      "Transition metals have incomplete d-subshell in ground state or common ions. General characteristics: variable oxidation states, coloured ions (d-d transitions), paramagnetic (unpaired d-electrons), catalytic activity, ability to form complexes. Exceptions in electronic configuration: Cr = [Ar]3d⁵4s¹, Cu = [Ar]3d¹⁰4s¹ (half-filled and fully-filled d are more stable). Lanthanoid contraction: 4f electrons poorly shield 4d → Hf has similar radius to Zr, affecting properties of 3rd row transition metals.",
    keyFact:
      "Cr and Cu have exceptional configurations. MnO₄⁻ (purple) → Mn²⁺ (pale pink) in acidic medium.",
    category: "inorganic",
  },
  {
    id: "in-3",
    title: "Coordination Compounds",
    content:
      "IUPAC naming: ligands first (alphabetical), then metal name, oxidation state in Roman numerals. Ligand field theory: weak-field ligands (I⁻, Br⁻, Cl⁻, F⁻, OH⁻, H₂O) give high-spin; strong-field ligands (CO, CN⁻, NO⁺, en, NH₃) give low-spin. Crystal field splitting Δ: octahedral (t₂g³ eg⁰ for Co³⁺). Isomerism: geometrical (cis/trans), optical, ionisation, linkage, hydrate. EAN rule and 18-electron rule for carbonyl complexes. Werner's primary and secondary valencies = oxidation state and coordination number.",
    keyFact:
      "Strong field (high Δ, low spin, large CFSE): CN⁻ > NO₂⁻ > en > NH₃ > H₂O > F⁻ > Cl⁻ (spectrochemical series).",
    category: "inorganic",
  },
  {
    id: "in-4",
    title: "p-Block: Group 15–17 Important Compounds",
    content:
      "Group 15 (N, P): N₂O₅ (most acidic oxide), PCl₅ (trigonal bipyramidal, sp³d). Ammonia: pyramidal (sp³). HNO₃: nitration agent; conc. H₂SO₄ gives nitronium ion. Group 16 (O, S): H₂SO₄ (conc.) — dehydrating, oxidising. SO₃ absorbed in oleum (not water). H₂S weak acid, H₂SO₄ strong. Group 17 (halogens): bond energy F–F < Cl–Cl (repulsion in small F₂). Fluorine only oxidation state −1. Cl can be +1, +3, +5, +7 (uses d-orbitals). HF weak acid due to H-bonding. HI strongest hydrohalic acid.",
    keyFact:
      "Fluorine is most electronegative; only −1 oxidation state. HI is strongest hydrohalic acid.",
    category: "inorganic",
  },
  {
    id: "in-5",
    title: "Qualitative Analysis (Salt Analysis)",
    content:
      "Preliminary tests: smell (NH₄⁺ → pungent), colour (Cu²⁺ blue, Fe²⁺ green, Fe³⁺ brown/rust), flame test. Basic radicals: Group I (Pb²⁺, Hg₂²⁺, Ag⁺ with dil. HCl → white ppt). Group II (Cu²⁺, Pb²⁺, Bi³⁺, As³⁺, Sb³⁺, Sn²⁺ with H₂S in acidic). Group III (Fe³⁺, Al³⁺, Cr³⁺ with NH₄OH + NH₄Cl). Group IV (Ni²⁺, Co²⁺, Mn²⁺, Zn²⁺ with H₂S/NH₄OH). Group V (Ba²⁺, Sr²⁺, Ca²⁺ with (NH₄)₂CO₃). Group VI (Mg²⁺, Na⁺, K⁺, NH₄⁺).",
    keyFact:
      "Borax bead test: Cu²⁺ → green (oxidizing) / blue (reducing) flame. Fe → yellow/brown.",
    category: "inorganic",
  },
  {
    id: "in-6",
    title: "Metallurgy: Extraction Principles",
    content:
      "Ores: oxides (haematite Fe₂O₃, bauxite Al₂O₃), sulphides (galena PbS, zinc blende ZnS), carbonates (calamine ZnCO₃, limestone CaCO₃), chlorides (carnallite). Concentration: gravity, froth flotation (sulphide ores, pine oil as collector), magnetic, leaching (Bayer for Al). Reduction: C (Fe from coke), CO (blast furnace), Al (electrolysis Hall-Héroult), Zn (distillation). Ellingham diagram: ΔG vs T; metals whose line is below C line can be reduced by carbon. Refining: electrolytic (Cu), zone refining (semiconductors), van Arkel (Ti, Zr).",
    keyFact:
      "Hall–Héroult: Al₂O₃ dissolved in molten cryolite (Na₃AlF₆) → electrolysis at 950°C.",
    category: "inorganic",
  },
];

const KEY_FORMULAS: KeyFormula[] = [
  {
    id: "f-1",
    name: "Ideal Gas Law",
    formula: "pV = nRT",
    derivation:
      "Combines Boyle's (PV=const), Charles's (V/T=const), and Avogadro's (V∝n) laws",
    useCase:
      "Moles from pressure/volume/temperature; stoichiometry of gaseous reactions",
  },
  {
    id: "f-2",
    name: "Gibbs Free Energy",
    formula: "ΔG = ΔH − TΔS",
    derivation: "Derived from 2nd law: ΔG = ΔH − TΔS; spontaneous when ΔG < 0",
    useCase: "Predicting spontaneity; finding equilibrium K via ΔG° = −RT ln K",
  },
  {
    id: "f-3",
    name: "Nernst Equation",
    formula: "E = E° − (0.0592/n) log Q  (at 25°C)",
    derivation: "From ΔG = ΔG° + RT ln Q and ΔG = −nFE",
    useCase:
      "Non-standard cell potentials; concentration cells; pH of glass electrode",
  },
  {
    id: "f-4",
    name: "Henderson-Hasselbalch",
    formula: "pH = pKa + log([A⁻]/[HA])",
    derivation: "Rearrangement of Ka = [H⁺][A⁻]/[HA]; log both sides",
    useCase: "Buffer pH calculation; maximum buffer capacity at pH = pKa",
  },
  {
    id: "f-5",
    name: "Arrhenius Equation",
    formula: "k = A · e^(−Ea/RT)",
    derivation: "Empirical; ln-form: ln k = ln A − Ea/RT (linear in 1/T)",
    useCase: "Activation energy from rate constants at two temperatures",
  },
  {
    id: "f-6",
    name: "Clausius-Clapeyron",
    formula: "ln(P₂/P₁) = −(ΔHvap/R)(1/T₂ − 1/T₁)",
    derivation:
      "From Clapeyron equation assuming ideal gas vapour and ΔH constant",
    useCase: "Boiling point at different pressures; vapour pressure estimation",
  },
  {
    id: "f-7",
    name: "Van't Hoff Factor",
    formula: "i = 1 + α(n − 1)  [for dissociation]",
    derivation:
      "i = actual particles / formula units; α = degree of dissociation",
    useCase: "Colligative properties: ΔTb = Kb·m·i, ΔTf = Kf·m·i, π = MRTi",
  },
  {
    id: "f-8",
    name: "Rate Law (nth Order)",
    formula: "rate = k[A]^m[B]^n",
    derivation: "Empirically determined; sum m+n = overall order",
    useCase: "Half-life calculations; concentration-time relationships",
  },
  {
    id: "f-9",
    name: "Beer-Lambert Law",
    formula: "A = ε · l · c",
    derivation:
      "Absorbance A = log(I₀/I); proportional to molar absorptivity ε, path length l, concentration c",
    useCase: "Spectrophotometric concentration measurement; calibration curves",
  },
  {
    id: "f-10",
    name: "de Broglie Wavelength",
    formula: "λ = h / mv = h / p",
    derivation:
      "Louis de Broglie 1924: matter waves; λ inversely proportional to momentum",
    useCase:
      "Electron diffraction; confirms wave-particle duality; explains Bohr orbits",
  },
];

const KEY_REACTIONS: KeyReaction[] = [
  {
    id: "r-1",
    name: "Haber Process",
    equation: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)   ΔH = −92 kJ/mol",
    type: "Industrial Synthesis",
    conditions: "Fe catalyst (with K₂O, Al₂O₃ promoters), 450°C, 200 atm",
    explanation:
      "Δng = −2, so high pressure increases yield. Temperature is a compromise — high T gives fast kinetics but low equilibrium yield.",
  },
  {
    id: "r-2",
    name: "Contact Process (SO₃ Step)",
    equation: "2SO₂(g) + O₂(g) ⇌ 2SO₃(g)   ΔH = −197 kJ/mol",
    type: "Industrial Synthesis",
    conditions: "V₂O₅ catalyst, 450°C, 1–2 atm",
    explanation:
      "SO₃ absorbed into H₂SO₄ to make oleum (H₂S₂O₇), then diluted — not directly into water to avoid acid mist.",
  },
  {
    id: "r-3",
    name: "Thermite Reaction",
    equation: "Fe₂O₃(s) + 2Al(s) → Al₂O₃(s) + 2Fe(l)   ΔH = −852 kJ/mol",
    type: "Displacement (Redox)",
    conditions: "Ignition with Mg ribbon; self-sustaining above 1500°C",
    explanation:
      "Al is a stronger reducing agent than Fe; liberates molten iron. Used in welding railway tracks.",
  },
  {
    id: "r-4",
    name: "Electrolysis of Brine",
    equation: "2NaCl(aq) + 2H₂O(l) → Cl₂(g) + H₂(g) + 2NaOH(aq)",
    type: "Electrolysis (Chlor-Alkali Process)",
    conditions: "Electrolytic cell; membrane separates Cl₂ and NaOH",
    explanation:
      "Cl₂ at anode (oxidation), H₂ at cathode (reduction). NaOH collects in cathode compartment. Basis of chlorine industry.",
  },
  {
    id: "r-5",
    name: "Diazotisation",
    equation: "ArNH₂ + NaNO₂ + 2HCl → ArN₂⁺Cl⁻ + NaCl + 2H₂O",
    type: "Organic (Amine Reaction)",
    conditions: "0–5°C to prevent decomposition of diazonium salt",
    explanation:
      "Aromatic diazonium salts are versatile intermediates: → ArOH (warm H₂O), ArF (Balz-Schiemann), ArCN or ArX (Sandmeyer), azo dyes (coupling).",
  },
  {
    id: "r-6",
    name: "Aldol Condensation",
    equation: "2CH₃CHO → CH₃CH(OH)CH₂CHO  →(−H₂O)→  CH₃CH=CHCHO",
    type: "Organic (Condensation)",
    conditions:
      "Dilute NaOH or dilute acid; heat to dehydrate to α,β-unsaturated product",
    explanation:
      "α-H is abstracted to form enolate; attacks carbonyl of second molecule. If no α-H, Cannizzaro reaction occurs instead.",
  },
  {
    id: "r-7",
    name: "Grignard Addition",
    equation: "RMgX + R'CHO → [adduct] → R-CH(OH)-R'  (after H₃O⁺ workup)",
    type: "Organic (Nucleophilic Addition)",
    conditions:
      "Dry ether, anhydrous conditions (Grignard destroys with moisture)",
    explanation:
      "Grignard reagent (RMgX) is a carbanion equivalent. Adds to aldehydes (→ 2° alcohol), ketones (→ 3° alcohol), CO₂ (→ RCOOH), esters (→ 3° alcohol with 2 equiv).",
  },
  {
    id: "r-8",
    name: "Saponification",
    equation: "RCOOR' + NaOH(aq) → RCOONa + R'OH",
    type: "Organic (Hydrolysis)",
    conditions:
      "Aqueous NaOH, heat; irreversible (unlike Fischer esterification)",
    explanation:
      "Soap-making reaction. The soap (fatty acid salt) micelle has hydrophilic –COO⁻ head and hydrophobic alkyl tail, enabling emulsification of oils.",
  },
  {
    id: "r-9",
    name: "Tollens' Test",
    equation: "RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓ + 4NH₃ + 2H₂O",
    type: "Organic (Oxidation Test)",
    conditions: "Silver nitrate in ammonia (Tollens' reagent); mild alkaline",
    explanation:
      "Aldehydes are oxidised; Ag⁺ reduced to metallic Ag (silver mirror on glass). Ketones do not react. Formic acid (HCOOH) also gives positive test.",
  },
  {
    id: "r-10",
    name: "Permanganate Titration",
    equation: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O  (×2 for Fe²⁺ titration)",
    type: "Redox Titration",
    conditions:
      "Acidic medium (dil. H₂SO₄); self-indicating (purple → colourless at endpoint)",
    explanation:
      "KMnO₄ is a strong oxidising agent. Titration with Fe²⁺ (Mohr salt), C₂O₄²⁻, or H₂O₂. Purple colour of permanganate acts as its own indicator.",
  },
];

// ─── Accordion sections ──────────────────────────────────────────────────────

const SECTIONS: AccordionSection[] = [
  {
    id: "physical",
    label: "Physical Chemistry",
    color: "oklch(0.72 0.22 258)",
    notes: PHYSICAL_CHEM_NOTES,
  },
  {
    id: "organic",
    label: "Organic Chemistry",
    color: "oklch(0.72 0.22 140)",
    notes: ORGANIC_CHEM_NOTES,
  },
  {
    id: "inorganic",
    label: "Inorganic Chemistry",
    color: "oklch(0.72 0.22 30)",
    notes: INORGANIC_CHEM_NOTES,
  },
  {
    id: "formulas",
    label: "Key Formulas",
    color: "oklch(0.72 0.22 55)",
    formulas: KEY_FORMULAS,
  },
  {
    id: "reactions",
    label: "Important Reactions",
    color: "oklch(0.72 0.22 185)",
    reactions: KEY_REACTIONS,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function NoteCard({ note, index }: { note: StudyNote; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyToClipboard(`${note.title}\n\n${note.content}\n\nKey: ${note.keyFact}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const sectionColor =
    SECTIONS.find((s) => s.id === note.category)?.color ??
    "oklch(0.72 0.16 258)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.05 }}
      className="rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: expanded
          ? `${sectionColor}0d`
          : "oklch(0.15 0.018 250 / 0.75)",
        borderColor: expanded
          ? `${sectionColor}44`
          : "oklch(0.26 0.02 250 / 0.55)",
        backdropFilter: "blur(12px)",
        boxShadow: expanded ? `0 0 20px ${sectionColor}15` : "none",
      }}
      data-ocid={`notes.card.${note.id}`}
    >
      <button
        type="button"
        className="w-full flex items-start gap-3 p-4 text-left"
        onClick={() => setExpanded((e) => !e)}
        data-ocid={`notes.expand.${note.id}`}
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground leading-tight">
            {note.title}
          </p>
          {!expanded && (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
              {note.content.slice(0, 90)}…
            </p>
          )}
        </div>
        <ChevronDown
          className="flex-shrink-0 w-4 h-4 text-muted-foreground transition-transform duration-300 mt-0.5"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-350"
        style={{ maxHeight: expanded ? "700px" : "0" }}
      >
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm text-foreground/85 leading-relaxed">
            {note.content}
          </p>
          <div
            className="rounded-xl p-3 text-xs font-mono leading-relaxed"
            style={{
              background: `${sectionColor}15`,
              borderLeft: `3px solid ${sectionColor}`,
              color: "oklch(0.9 0 0)",
            }}
          >
            <span className="font-semibold" style={{ color: sectionColor }}>
              Key:{" "}
            </span>
            {note.keyFact}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all"
            style={
              copied
                ? {
                    background: "oklch(0.7 0.21 140 / 0.15)",
                    borderColor: "oklch(0.7 0.21 140 / 0.4)",
                    color: "oklch(0.7 0.21 140)",
                  }
                : {
                    background: "oklch(0.18 0.02 250 / 0.6)",
                    borderColor: "oklch(0.28 0.02 250)",
                    color: "oklch(0.52 0 0)",
                  }
            }
            data-ocid={`notes.copy.${note.id}`}
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FormulaCard({
  formula,
  index,
}: { formula: KeyFormula; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyToClipboard(
      `${formula.name}: ${formula.formula}\n${formula.derivation}\nUse: ${formula.useCase}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.05 }}
      className="rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: expanded
          ? "oklch(0.72 0.22 55 / 0.08)"
          : "oklch(0.15 0.018 250 / 0.75)",
        borderColor: expanded
          ? "oklch(0.72 0.22 55 / 0.44)"
          : "oklch(0.26 0.02 250 / 0.55)",
        backdropFilter: "blur(12px)",
        boxShadow: expanded ? "0 0 20px oklch(0.72 0.22 55 / 0.12)" : "none",
      }}
      data-ocid={`notes.formula.${formula.id}`}
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 p-3.5 text-left"
        onClick={() => setExpanded((e) => !e)}
        data-ocid={`notes.formula_expand.${formula.id}`}
      >
        <div
          className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.72 0.22 55 / 0.18)" }}
        >
          <FunctionSquare
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.78 0.22 55)" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">{formula.name}</p>
          <p
            className="font-mono font-semibold text-sm mt-0.5"
            style={{ color: "oklch(0.92 0 0)" }}
          >
            {formula.formula}
          </p>
        </div>
        <ChevronDown
          className="flex-shrink-0 w-4 h-4 text-muted-foreground transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: expanded ? "400px" : "0" }}
      >
        <div className="px-4 pb-4 space-y-2.5">
          <div
            className="rounded-xl p-3 text-xs"
            style={{
              background: "oklch(0.72 0.22 55 / 0.1)",
              border: "1px solid oklch(0.72 0.22 55 / 0.2)",
            }}
          >
            <p
              className="font-semibold text-[10px] mb-1"
              style={{ color: "oklch(0.72 0.22 55)" }}
            >
              DERIVATION
            </p>
            <p style={{ color: "oklch(0.82 0 0)" }}>{formula.derivation}</p>
          </div>
          <div
            className="rounded-xl p-3 text-xs"
            style={{
              background: "oklch(0.18 0.025 258 / 0.5)",
              border: "1px solid oklch(0.32 0.04 258 / 0.3)",
            }}
          >
            <p
              className="font-semibold text-[10px] mb-1"
              style={{ color: "oklch(0.68 0.14 258)" }}
            >
              USE CASE
            </p>
            <p style={{ color: "oklch(0.82 0 0)" }}>{formula.useCase}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all"
            style={
              copied
                ? {
                    background: "oklch(0.7 0.21 140 / 0.15)",
                    borderColor: "oklch(0.7 0.21 140 / 0.4)",
                    color: "oklch(0.7 0.21 140)",
                  }
                : {
                    background: "oklch(0.18 0.02 250 / 0.6)",
                    borderColor: "oklch(0.28 0.02 250)",
                    color: "oklch(0.52 0 0)",
                  }
            }
            data-ocid={`notes.formula_copy.${formula.id}`}
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ReactionCard({
  reaction,
  index,
}: { reaction: KeyReaction; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyToClipboard(
      `${reaction.name}\n${reaction.equation}\nType: ${reaction.type}\nConditions: ${reaction.conditions}\n${reaction.explanation}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.05 }}
      className="rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: expanded
          ? "oklch(0.72 0.22 185 / 0.08)"
          : "oklch(0.14 0.03 195 / 0.6)",
        borderColor: expanded
          ? "oklch(0.52 0.16 185 / 0.5)"
          : "oklch(0.35 0.06 195 / 0.45)",
        backdropFilter: "blur(12px)",
        boxShadow: expanded ? "0 0 20px oklch(0.72 0.22 185 / 0.1)" : "none",
      }}
      data-ocid={`notes.reaction.${reaction.id}`}
    >
      <button
        type="button"
        className="w-full flex items-start gap-3 p-3.5 text-left"
        onClick={() => setExpanded((e) => !e)}
        data-ocid={`notes.reaction_expand.${reaction.id}`}
      >
        <div
          className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center mt-0.5"
          style={{ background: "oklch(0.72 0.22 185 / 0.18)" }}
        >
          <FlaskConical
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.72 0.22 185)" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground leading-tight">
            {reaction.name}
          </p>
          <p
            className="text-xs font-mono mt-1 leading-relaxed"
            style={{ color: "oklch(0.62 0.1 185)" }}
          >
            {reaction.equation.slice(0, 55)}
            {reaction.equation.length > 55 ? "…" : ""}
          </p>
        </div>
        <ChevronDown
          className="flex-shrink-0 w-4 h-4 text-muted-foreground transition-transform duration-300 mt-1"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: expanded ? "500px" : "0" }}
      >
        <div className="px-4 pb-4 space-y-2.5">
          <div
            className="rounded-xl p-3 text-xs font-mono leading-relaxed"
            style={{
              background: "oklch(0.72 0.22 185 / 0.12)",
              border: "1px solid oklch(0.52 0.16 185 / 0.3)",
              color: "oklch(0.88 0 0)",
            }}
          >
            {reaction.equation}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-xl p-2.5 text-xs"
              style={{
                background: "oklch(0.18 0.025 258 / 0.5)",
                border: "1px solid oklch(0.32 0.04 258 / 0.3)",
              }}
            >
              <p
                className="font-semibold text-[10px] mb-0.5"
                style={{ color: "oklch(0.68 0.14 258)" }}
              >
                TYPE
              </p>
              <p style={{ color: "oklch(0.8 0 0)" }}>{reaction.type}</p>
            </div>
            <div
              className="rounded-xl p-2.5 text-xs"
              style={{
                background: "oklch(0.18 0.025 258 / 0.5)",
                border: "1px solid oklch(0.32 0.04 258 / 0.3)",
              }}
            >
              <p
                className="font-semibold text-[10px] mb-0.5"
                style={{ color: "oklch(0.68 0.14 258)" }}
              >
                CONDITIONS
              </p>
              <p style={{ color: "oklch(0.8 0 0)" }}>{reaction.conditions}</p>
            </div>
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(0.78 0 0)" }}
          >
            {reaction.explanation}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all"
            style={
              copied
                ? {
                    background: "oklch(0.7 0.21 140 / 0.15)",
                    borderColor: "oklch(0.7 0.21 140 / 0.4)",
                    color: "oklch(0.7 0.21 140)",
                  }
                : {
                    background: "oklch(0.18 0.02 250 / 0.6)",
                    borderColor: "oklch(0.28 0.02 250)",
                    color: "oklch(0.52 0 0)",
                  }
            }
            data-ocid={`notes.reaction_copy.${reaction.id}`}
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SectionAccordion({
  section,
  search,
}: {
  section: AccordionSection;
  search: string;
}) {
  const [open, setOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    const q = search.toLowerCase();
    if (!section.notes) return [];
    if (!q) return section.notes;
    return section.notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.keyFact.toLowerCase().includes(q),
    );
  }, [section.notes, search]);

  const filteredFormulas = useMemo(() => {
    const q = search.toLowerCase();
    if (!section.formulas) return [];
    if (!q) return section.formulas;
    return section.formulas.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.derivation.toLowerCase().includes(q) ||
        f.useCase.toLowerCase().includes(q),
    );
  }, [section.formulas, search]);

  const filteredReactions = useMemo(() => {
    const q = search.toLowerCase();
    if (!section.reactions) return [];
    if (!q) return section.reactions;
    return section.reactions.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.equation.toLowerCase().includes(q) ||
        r.explanation.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q),
    );
  }, [section.reactions, search]);

  const totalCount =
    filteredNotes.length + filteredFormulas.length + filteredReactions.length;

  // Auto-open if search matches something in this section
  const shouldForceOpen = search.length > 0 && totalCount > 0;

  const isOpen = open || shouldForceOpen;

  if (search.length > 0 && totalCount === 0) return null;

  const color = section.color;

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        borderColor: isOpen ? `${color}40` : "oklch(0.24 0.02 250 / 0.45)",
        boxShadow: isOpen ? `0 0 24px ${color}10` : "none",
      }}
    >
      {/* Section header */}
      <button
        type="button"
        className="w-full flex items-center gap-3 p-4 text-left transition-colors"
        style={{
          background: isOpen ? `${color}12` : "oklch(0.15 0.02 250 / 0.7)",
          backdropFilter: "blur(16px)",
        }}
        onClick={() => !shouldForceOpen && setOpen((o) => !o)}
        data-ocid={`notes.section.${section.id}`}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${color}22`,
            boxShadow: isOpen ? `0 0 10px ${color}30` : "none",
          }}
        >
          {section.formulas ? (
            <FunctionSquare className="w-4 h-4" style={{ color }} />
          ) : section.reactions ? (
            <FlaskConical className="w-4 h-4" style={{ color }} />
          ) : (
            <span className="text-sm font-bold" style={{ color }}>
              {section.label.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm"
            style={{ color: isOpen ? color : "oklch(0.88 0 0)" }}
          >
            {section.label}
          </p>
          <p className="text-xs" style={{ color: "oklch(0.48 0 0)" }}>
            {totalCount} item{totalCount !== 1 ? "s" : ""}
          </p>
        </div>
        <ChevronDown
          className="flex-shrink-0 w-4 h-4 transition-transform duration-300"
          style={{
            color: "oklch(0.48 0 0)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Section content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className="p-4 space-y-3"
              style={{
                background: "oklch(0.12 0.018 250 / 0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              {filteredNotes.map((note, i) => (
                <NoteCard key={note.id} note={note} index={i} />
              ))}
              {filteredFormulas.map((formula, i) => (
                <FormulaCard key={formula.id} formula={formula} index={i} />
              ))}
              {filteredReactions.map((reaction, i) => (
                <ReactionCard key={reaction.id} reaction={reaction} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function NotesTab() {
  const [search, setSearch] = useState("");

  const totalItems =
    PHYSICAL_CHEM_NOTES.length +
    ORGANIC_CHEM_NOTES.length +
    INORGANIC_CHEM_NOTES.length +
    KEY_FORMULAS.length +
    KEY_REACTIONS.length;

  return (
    <div>
      {/* Header stats */}
      <div className="flex gap-3 mb-5">
        {[
          {
            label: "Study Notes",
            count:
              PHYSICAL_CHEM_NOTES.length +
              ORGANIC_CHEM_NOTES.length +
              INORGANIC_CHEM_NOTES.length,
            color: "oklch(0.72 0.22 258)",
          },
          {
            label: "Formulas",
            count: KEY_FORMULAS.length,
            color: "oklch(0.72 0.22 55)",
          },
          {
            label: "Reactions",
            count: KEY_REACTIONS.length,
            color: "oklch(0.72 0.22 185)",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex-1 rounded-xl p-2.5 text-center"
            style={{
              background: `${stat.color}12`,
              border: `1px solid ${stat.color}28`,
            }}
          >
            <p className="text-lg font-bold" style={{ color: stat.color }}>
              {stat.count}
            </p>
            <p className="text-[10px]" style={{ color: "oklch(0.52 0 0)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder={`Search ${totalItems} notes, formulas & reactions…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-card/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          style={{ backdropFilter: "blur(10px)" }}
          data-ocid="notes.search_input"
        />
      </div>

      {/* Accordion sections */}
      <div className="space-y-2.5">
        {SECTIONS.map((section) => (
          <SectionAccordion
            key={section.id}
            section={section}
            search={search}
          />
        ))}
      </div>

      {/* Empty state for search */}
      {search.length > 0 && (
        <div className="mt-4">
          {SECTIONS.every((section) => {
            const q = search.toLowerCase();
            const hasNote = section.notes?.some(
              (n) =>
                n.title.toLowerCase().includes(q) ||
                n.content.toLowerCase().includes(q) ||
                n.keyFact.toLowerCase().includes(q),
            );
            const hasFormula = section.formulas?.some(
              (f) =>
                f.name.toLowerCase().includes(q) ||
                f.formula.toLowerCase().includes(q),
            );
            const hasReaction = section.reactions?.some(
              (r) =>
                r.name.toLowerCase().includes(q) ||
                r.equation.toLowerCase().includes(q),
            );
            return !hasNote && !hasFormula && !hasReaction;
          }) && (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="notes.empty_state"
            >
              <p className="text-base mb-1">No results for "{search}"</p>
              <p className="text-sm">Try a different term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
