import { a as useChemStore, r as reactExports, j as jsxRuntimeExports, m as motion, B as Brain, Z as Zap, v as Funnel, h as cn, g as ChevronDown, l as AnimatePresence, d as BookOpen } from "./index-DyyHqAHL.js";
import { b as useQuizQuestions } from "./useChemistry-LgPqHx3p.js";
import { T as Trophy, C as CircleCheckBig, a as CircleX } from "./trophy-Dk9iimmm.js";
import { T as Target } from "./target-BZowL3Z9.js";
import { R as RotateCcw } from "./rotate-ccw-DxM_5SuR.js";
const BUILTIN_QUESTIONS = [
  // ── MCQ – Periodic Table ──────────────────────────────────────────────────
  {
    id: "q1",
    questionType: "mcq",
    topic: "Periodic Table",
    difficulty: "easy",
    question: "Which element has the atomic number 6?",
    options: ["Nitrogen", "Carbon", "Oxygen", "Boron"],
    correctAnswer: "Carbon",
    explanation: "Carbon (C) has atomic number 6. It is the basis of all organic molecules and life on Earth."
  },
  {
    id: "q2",
    questionType: "mcq",
    topic: "Periodic Table",
    difficulty: "easy",
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    explanation: "Gold's symbol 'Au' comes from the Latin word Aurum. Its atomic number is 79."
  },
  {
    id: "q3",
    questionType: "mcq",
    topic: "Periodic Table",
    difficulty: "easy",
    question: "Which group in the periodic table contains the noble gases?",
    options: ["Group 1", "Group 7", "Group 17", "Group 18"],
    correctAnswer: "Group 18",
    explanation: "Noble gases (He, Ne, Ar, Kr, Xe, Rn) occupy Group 18 — they have a full outer electron shell making them largely inert."
  },
  {
    id: "q4",
    questionType: "mcq",
    topic: "Periodic Table",
    difficulty: "medium",
    question: "Which period does Bromine (Br) belong to?",
    options: ["Period 2", "Period 3", "Period 4", "Period 5"],
    correctAnswer: "Period 4",
    explanation: "Bromine is in Period 4 of the periodic table, in Group 17 (halogens). Atomic number 35."
  },
  {
    id: "q5",
    questionType: "mcq",
    topic: "Periodic Table",
    difficulty: "hard",
    question: "Which element has the electron configuration [Xe] 4f¹⁴ 5d¹⁰ 6s¹?",
    options: ["Mercury", "Gold", "Platinum", "Iridium"],
    correctAnswer: "Gold",
    explanation: "Gold (Au) has configuration [Xe] 4f¹⁴ 5d¹⁰ 6s¹ — one s-electron because a filled d subshell is especially stable."
  },
  // ── MCQ – Atomic Structure ────────────────────────────────────────────────
  {
    id: "q6",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "easy",
    question: "How many electrons does a neutral oxygen atom have?",
    options: ["6", "8", "16", "18"],
    correctAnswer: "8",
    explanation: "Oxygen has atomic number 8, meaning 8 protons and 8 electrons in a neutral atom. Configuration: 2, 6."
  },
  {
    id: "q7",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "easy",
    question: "Who proposed the nuclear model of the atom?",
    options: ["John Dalton", "J.J. Thomson", "Ernest Rutherford", "Niels Bohr"],
    correctAnswer: "Ernest Rutherford",
    explanation: "Rutherford's gold foil experiment (1911) showed that atoms have a tiny, dense, positively charged nucleus."
  },
  {
    id: "q8",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "medium",
    question: "The maximum number of electrons in the 3rd shell is:",
    options: ["8", "12", "18", "32"],
    correctAnswer: "18",
    explanation: "Max electrons in shell n = 2n². For n=3: 2×9 = 18 electrons."
  },
  {
    id: "q9",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "medium",
    question: "Which subshell is filled after 3d in the Aufbau principle?",
    options: ["4s", "4p", "4f", "5s"],
    correctAnswer: "4p",
    explanation: "After 3d is filled, electrons go into 4p. Aufbau order: 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f ..."
  },
  {
    id: "q10",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "hard",
    question: "The de Broglie wavelength of an electron depends on:",
    options: [
      "Its charge only",
      "Its momentum",
      "Its spin quantum number",
      "Its nuclear charge"
    ],
    correctAnswer: "Its momentum",
    explanation: "de Broglie: λ = h/mv = h/p. Wavelength is inversely proportional to momentum."
  },
  // ── MCQ – Chemical Bonding ────────────────────────────────────────────────
  {
    id: "q11",
    questionType: "mcq",
    topic: "Chemical Bonding",
    difficulty: "easy",
    question: "What type of bond is formed by the sharing of electrons?",
    options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
    correctAnswer: "Covalent bond",
    explanation: "Covalent bonds form when atoms share one or more electron pairs. Common in non-metal compounds like H₂O, CO₂, CH₄."
  },
  {
    id: "q12",
    questionType: "mcq",
    topic: "Chemical Bonding",
    difficulty: "medium",
    question: "The shape of a water molecule (H₂O) is:",
    options: ["Linear", "Trigonal planar", "Bent/V-shaped", "Tetrahedral"],
    correctAnswer: "Bent/V-shaped",
    explanation: "H₂O has 2 bonding pairs and 2 lone pairs → bent shape. Bond angle ≈ 104.5° (VSEPR theory)."
  },
  {
    id: "q13",
    questionType: "mcq",
    topic: "Chemical Bonding",
    difficulty: "medium",
    question: "Which molecule has a triple bond?",
    options: ["H₂O", "O₂", "N₂", "F₂"],
    correctAnswer: "N₂",
    explanation: "N₂ has a triple bond (N≡N). It is very strong (945 kJ/mol), making N₂ inert at room temperature."
  },
  {
    id: "q14",
    questionType: "mcq",
    topic: "Chemical Bonding",
    difficulty: "hard",
    question: "Which of the following has the highest bond dissociation energy?",
    options: ["H-H", "O=O", "N≡N", "C-C"],
    correctAnswer: "N≡N",
    explanation: "N≡N has bond energy ≈ 945 kJ/mol, higher than O=O (498), H-H (436), and C-C (347)."
  },
  // ── MCQ – Thermochemistry ─────────────────────────────────────────────────
  {
    id: "q15",
    questionType: "mcq",
    topic: "Thermochemistry",
    difficulty: "easy",
    question: "What type of reaction releases energy to the surroundings?",
    options: ["Endothermic", "Exothermic", "Catalytic", "Redox"],
    correctAnswer: "Exothermic",
    explanation: "Exothermic reactions release heat (ΔH < 0). Examples: combustion, neutralisation, respiration."
  },
  {
    id: "q16",
    questionType: "mcq",
    topic: "Thermochemistry",
    difficulty: "medium",
    question: "Which law states that the total enthalpy change is independent of the path taken?",
    options: [
      "Boyle's Law",
      "Hess's Law",
      "Le Chatelier's Principle",
      "Faraday's Law"
    ],
    correctAnswer: "Hess's Law",
    explanation: "Hess's Law: ΔH for a reaction is the same whether it occurs in one step or in multiple steps."
  },
  {
    id: "q17",
    questionType: "mcq",
    topic: "Thermochemistry",
    difficulty: "hard",
    question: "If ΔG = ΔH – TΔS and both ΔH < 0 and ΔS > 0, the reaction is:",
    options: [
      "Non-spontaneous at all temperatures",
      "Spontaneous at high temperature only",
      "Spontaneous at all temperatures",
      "Spontaneous only at low temperature"
    ],
    correctAnswer: "Spontaneous at all temperatures",
    explanation: "When ΔH < 0 and ΔS > 0, ΔG = negative always → spontaneous at all temperatures."
  },
  // ── MCQ – Organic Chemistry ───────────────────────────────────────────────
  {
    id: "q18",
    questionType: "mcq",
    topic: "Organic Chemistry",
    difficulty: "easy",
    question: "Which allotrope of carbon is the hardest natural substance?",
    options: ["Graphite", "Graphene", "Fullerene", "Diamond"],
    correctAnswer: "Diamond",
    explanation: "Diamond is the hardest known natural substance (10 on Mohs scale) due to its 3D tetrahedral covalent network."
  },
  {
    id: "q19",
    questionType: "mcq",
    topic: "Organic Chemistry",
    difficulty: "easy",
    question: "What is the general formula for alkanes?",
    options: ["CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₆"],
    correctAnswer: "CₙH₂ₙ₊₂",
    explanation: "Alkanes (saturated hydrocarbons) follow CₙH₂ₙ₊₂. Example: methane CH₄ (n=1), ethane C₂H₆ (n=2)."
  },
  {
    id: "q20",
    questionType: "mcq",
    topic: "Organic Chemistry",
    difficulty: "medium",
    question: "Which reagent converts an alkene to an alkane?",
    options: ["Br₂ water", "H₂/Ni catalyst", "NaOH", "HCl"],
    correctAnswer: "H₂/Ni catalyst",
    explanation: "Hydrogenation: alkene + H₂ → alkane (using Ni/Pt/Pd catalyst). Example: C₂H₄ + H₂ → C₂H₆."
  },
  {
    id: "q21",
    questionType: "mcq",
    topic: "Organic Chemistry",
    difficulty: "medium",
    question: "In an SN2 reaction, the nucleophile attacks from:",
    options: [
      "The same side as the leaving group",
      "The opposite side (backside attack)",
      "Either side equally",
      "Above the molecule"
    ],
    correctAnswer: "The opposite side (backside attack)",
    explanation: "SN2 proceeds via backside attack → inversion of configuration (Walden inversion). Rate = k[substrate][nucleophile]."
  },
  {
    id: "q22",
    questionType: "mcq",
    topic: "Organic Chemistry",
    difficulty: "hard",
    question: "Which of the following is an electrophilic aromatic substitution reaction?",
    options: ["SN1", "SN2", "Nitration of benzene", "Aldol condensation"],
    correctAnswer: "Nitration of benzene",
    explanation: "Nitration (C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O) is a classic EAS. The electrophile is the nitronium ion (NO₂⁺)."
  },
  // ── MCQ – Electrochemistry ────────────────────────────────────────────────
  {
    id: "q23",
    questionType: "mcq",
    topic: "Electrochemistry",
    difficulty: "easy",
    question: "At which electrode does oxidation occur in an electrolytic cell?",
    options: ["Cathode", "Anode", "Both", "Neither"],
    correctAnswer: "Anode",
    explanation: "Oxidation always occurs at the anode (both in electrolytic and galvanic cells). Mnemonic: AnOx (Anode = Oxidation)."
  },
  {
    id: "q24",
    questionType: "mcq",
    topic: "Electrochemistry",
    difficulty: "medium",
    question: "The standard electrode potential of the Standard Hydrogen Electrode is:",
    options: ["−1.00 V", "0.00 V", "+1.00 V", "+1.36 V"],
    correctAnswer: "0.00 V",
    explanation: "The SHE (2H⁺ + 2e⁻ → H₂) is assigned E° = 0.00 V by convention. All other potentials are measured relative to it."
  },
  {
    id: "q25",
    questionType: "mcq",
    topic: "Electrochemistry",
    difficulty: "hard",
    question: "Faraday's first law of electrolysis states that mass deposited is proportional to:",
    options: [
      "Temperature",
      "Charge passed",
      "Electrode surface area",
      "Voltage applied"
    ],
    correctAnswer: "Charge passed",
    explanation: "m = (M × I × t) / (n × F). Mass is directly proportional to charge (Q = It). F = 96485 C/mol."
  },
  // ── MCQ – Kinetics ────────────────────────────────────────────────────────
  {
    id: "q26",
    questionType: "mcq",
    topic: "Kinetics",
    difficulty: "easy",
    question: "Which factor does NOT affect the rate of a chemical reaction?",
    options: [
      "Concentration",
      "Temperature",
      "Catalyst",
      "Amount of product formed"
    ],
    correctAnswer: "Amount of product formed",
    explanation: "Rate depends on concentration, temperature, catalyst, and surface area — not on how much product has formed."
  },
  {
    id: "q27",
    questionType: "mcq",
    topic: "Kinetics",
    difficulty: "medium",
    question: "A catalyst increases reaction rate by:",
    options: [
      "Increasing the activation energy",
      "Providing an alternative pathway with lower Ea",
      "Increasing temperature",
      "Increasing reactant concentration"
    ],
    correctAnswer: "Providing an alternative pathway with lower Ea",
    explanation: "Catalysts lower activation energy by providing a different mechanism, increasing the fraction of molecules with enough energy to react."
  },
  {
    id: "q28",
    questionType: "mcq",
    topic: "Kinetics",
    difficulty: "hard",
    question: "For a first-order reaction, the half-life is:",
    options: [
      "Directly proportional to concentration",
      "Inversely proportional to rate constant",
      "Independent of initial concentration",
      "Inversely proportional to concentration"
    ],
    correctAnswer: "Independent of initial concentration",
    explanation: "For first-order: t½ = ln2/k = 0.693/k. It is independent of initial concentration — a key feature distinguishing first-order reactions."
  },
  // ── MCQ – Equilibrium ────────────────────────────────────────────────────
  {
    id: "q29",
    questionType: "mcq",
    topic: "Equilibrium",
    difficulty: "easy",
    question: "Le Chatelier's principle states that a system at equilibrium will:",
    options: [
      "Always shift to produce more products",
      "Resist changes by shifting to oppose the change",
      "Stop reacting when disturbed",
      "Only shift if a catalyst is added"
    ],
    correctAnswer: "Resist changes by shifting to oppose the change",
    explanation: "Le Chatelier's Principle: if a system at equilibrium is disturbed, it shifts to counteract the disturbance and re-establish equilibrium."
  },
  {
    id: "q30",
    questionType: "mcq",
    topic: "Equilibrium",
    difficulty: "medium",
    question: "In the Haber process (N₂ + 3H₂ ⇌ 2NH₃), increasing pressure shifts equilibrium:",
    options: [
      "To the left (more N₂, H₂)",
      "To the right (more NH₃)",
      "No change",
      "Depends on temperature"
    ],
    correctAnswer: "To the right (more NH₃)",
    explanation: "Increasing pressure favours the side with fewer moles of gas. Left = 4 moles, Right = 2 moles → shifts right to produce more NH₃."
  },
  // ── MCQ – s-block ─────────────────────────────────────────────────────────
  {
    id: "q31",
    questionType: "mcq",
    topic: "s-block",
    difficulty: "easy",
    question: "Which of the following is the most reactive alkali metal?",
    options: ["Lithium", "Sodium", "Potassium", "Caesium"],
    correctAnswer: "Caesium",
    explanation: "Reactivity increases down Group 1. Caesium (Cs) is the most reactive stable alkali metal — it explodes on contact with water."
  },
  {
    id: "q32",
    questionType: "mcq",
    topic: "s-block",
    difficulty: "medium",
    question: "Which alkaline earth metal is essential for bone formation?",
    options: ["Beryllium", "Magnesium", "Calcium", "Barium"],
    correctAnswer: "Calcium",
    explanation: "Calcium (Ca) is the main component of bones and teeth (hydroxyapatite: Ca₁₀(PO₄)₆(OH)₂). Adults need ~1000 mg/day."
  },
  // ── MCQ – p-block ─────────────────────────────────────────────────────────
  {
    id: "q33",
    questionType: "mcq",
    topic: "p-block",
    difficulty: "easy",
    question: "Which gas is produced when bleaching powder reacts with dilute HCl?",
    options: ["Cl₂", "SO₂", "CO₂", "H₂"],
    correctAnswer: "Cl₂",
    explanation: "Ca(OCl)Cl + 2HCl → CaCl₂ + H₂O + Cl₂↑. The chlorine gas released explains bleaching powder's disinfecting action."
  },
  {
    id: "q34",
    questionType: "mcq",
    topic: "p-block",
    difficulty: "medium",
    question: "The hybridization of phosphorus in PCl₅ is:",
    options: ["sp²", "sp³", "sp³d", "sp³d²"],
    correctAnswer: "sp³d",
    explanation: "PCl₅ has 5 bonding pairs and 0 lone pairs → sp³d hybridization → trigonal bipyramidal geometry."
  },
  // ── MCQ – d-block ─────────────────────────────────────────────────────────
  {
    id: "q35",
    questionType: "mcq",
    topic: "d-block",
    difficulty: "medium",
    question: "Why do transition metals form coloured compounds?",
    options: [
      "They have large atomic radii",
      "d-d electronic transitions absorb visible light",
      "They have high melting points",
      "They form ionic bonds only"
    ],
    correctAnswer: "d-d electronic transitions absorb visible light",
    explanation: "In transition metal complexes, partially filled d orbitals split in a ligand field. Electrons jump between d levels, absorbing specific wavelengths of visible light."
  },
  {
    id: "q36",
    questionType: "mcq",
    topic: "d-block",
    difficulty: "hard",
    question: "The IUPAC name of [Cu(NH₃)₄]²⁺ is:",
    options: [
      "Tetramminecuprate(II)",
      "Tetraamminecopper(II)",
      "Tetramincopper(II)",
      "Copper tetrammine"
    ],
    correctAnswer: "Tetraamminecopper(II)",
    explanation: "Naming complex ions: ligand names first (tetraammine-) then metal with oxidation state. Cu²⁺ → copper(II). Product: tetraamminecopper(II)."
  },
  // ── MCQ – Biomolecules ────────────────────────────────────────────────────
  {
    id: "q37",
    questionType: "mcq",
    topic: "Biomolecules",
    difficulty: "easy",
    question: "The monomer of proteins is:",
    options: ["Glucose", "Fatty acid", "Amino acid", "Nucleotide"],
    correctAnswer: "Amino acid",
    explanation: "Proteins are polymers of amino acids linked by peptide bonds (-CO-NH-). There are 20 standard amino acids in proteins."
  },
  {
    id: "q38",
    questionType: "mcq",
    topic: "Biomolecules",
    difficulty: "medium",
    question: "Which enzyme breaks down starch into maltose?",
    options: ["Lipase", "Amylase", "Protease", "Lactase"],
    correctAnswer: "Amylase",
    explanation: "Amylase (salivary and pancreatic) hydrolyses α-1,4-glycosidic bonds in starch to produce maltose and dextrins."
  },
  // ─── ASSERTION-REASON ──────────────────────────────────────────────────────
  {
    id: "ar1",
    questionType: "assertion_reason",
    topic: "Periodic Table",
    difficulty: "medium",
    question: "Assertion (A): Atomic radius decreases across a period from left to right.\nReason (R): Effective nuclear charge increases across a period while electron shells remain the same.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "As you move across a period, protons are added without adding new shells. Increased Zeff pulls electrons closer → smaller atomic radius."
  },
  {
    id: "ar2",
    questionType: "assertion_reason",
    topic: "Atomic Structure",
    difficulty: "medium",
    question: "Assertion (A): The energy of an electron in a hydrogen atom depends only on the principal quantum number n.\nReason (R): Hydrogen is a one-electron system where energy is given by Eₙ = -13.6/n² eV.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "In hydrogen (one electron, no electron-electron repulsion), energy depends only on n. For multi-electron atoms, energy also depends on l."
  },
  {
    id: "ar3",
    questionType: "assertion_reason",
    topic: "Chemical Bonding",
    difficulty: "hard",
    question: "Assertion (A): BF₃ is a Lewis acid.\nReason (R): BF₃ has an incomplete octet (6 electrons around B) and can accept an electron pair.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "B in BF₃ has only 3 bond pairs (6 electrons) — incomplete octet. It accepts an electron pair from Lewis bases (e.g., NH₃ → F₃B·NH₃)."
  },
  {
    id: "ar4",
    questionType: "assertion_reason",
    topic: "Thermochemistry",
    difficulty: "medium",
    question: "Assertion (A): Combustion of hydrogen is an exothermic reaction.\nReason (R): In exothermic reactions, energy of reactants is lower than energy of products.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "A is true but R is false",
    explanation: "Combustion of H₂ is exothermic (A true), but in exothermic reactions the reactants have HIGHER energy than products — energy is released (R is false)."
  },
  {
    id: "ar5",
    questionType: "assertion_reason",
    topic: "Equilibrium",
    difficulty: "hard",
    question: "Assertion (A): Addition of an inert gas at constant volume does not affect equilibrium.\nReason (R): At constant volume, the partial pressures of reactants and products remain unchanged when an inert gas is added.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "Adding inert gas at constant volume doesn't change concentrations or partial pressures of reactants/products → Kp and Kc unchanged → no shift."
  },
  {
    id: "ar6",
    questionType: "assertion_reason",
    topic: "Electrochemistry",
    difficulty: "medium",
    question: "Assertion (A): Salt bridge maintains electrical neutrality in a galvanic cell.\nReason (R): Salt bridge allows ions to flow between the two half-cells to balance charges.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "As electrons flow from anode to cathode, cations accumulate in cathode and anions in anode half-cell. Salt bridge ions migrate to neutralize this."
  },
  {
    id: "ar7",
    questionType: "assertion_reason",
    topic: "Organic Chemistry",
    difficulty: "hard",
    question: "Assertion (A): Phenol is more acidic than ethanol.\nReason (R): The phenoxide ion is stabilized by resonance with the benzene ring.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "Phenol pKa ≈ 10 vs ethanol pKa ≈ 16. The phenoxide anion delocalizes negative charge into the ring via resonance → greater stability → higher acidity."
  },
  {
    id: "ar8",
    questionType: "assertion_reason",
    topic: "Kinetics",
    difficulty: "medium",
    question: "Assertion (A): Increasing temperature always increases the rate of a reaction.\nReason (R): Higher temperature increases the average kinetic energy, so more molecules exceed the activation energy.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "The Arrhenius equation k = Ae^(-Ea/RT) confirms that k increases with T. More molecules exceed Ea → faster rate."
  },
  {
    id: "ar9",
    questionType: "assertion_reason",
    topic: "s-block",
    difficulty: "easy",
    question: "Assertion (A): Lithium shows anomalous behavior among alkali metals.\nReason (R): Lithium has the smallest size and highest charge density among alkali metals.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "Li's tiny size (charge density ~80 C/mm³) causes strong polarization, diagonal relationship with Mg, and different physical/chemical properties from other alkali metals."
  },
  {
    id: "ar10",
    questionType: "assertion_reason",
    topic: "p-block",
    difficulty: "hard",
    question: "Assertion (A): F₂ is the strongest oxidizing halogen.\nReason (R): Fluorine has the highest electronegativity and lowest bond dissociation energy among halogens.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is NOT the correct explanation",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correctAnswer: "Both A and R are true, and R is the correct explanation",
    explanation: "F₂ is the strongest oxidizer — it can oxidize water itself. Its weak F–F bond (155 kJ/mol) and highest electronegativity make it extremely reactive."
  },
  // ─── NUMERICAL ─────────────────────────────────────────────────────────────
  {
    id: "num1",
    questionType: "numerical",
    topic: "Thermochemistry",
    difficulty: "medium",
    question: "Calculate the moles of CO₂ produced when 44 g of CO₂ is formed. (Molar mass of CO₂ = 44 g/mol)",
    options: ["0.5 mol", "1.0 mol", "2.0 mol", "44 mol"],
    correctAnswer: "1.0 mol",
    explanation: "Moles = mass / molar mass = 44 g / 44 g/mol = 1.0 mol. This is the fundamental mole concept calculation."
  },
  {
    id: "num2",
    questionType: "numerical",
    topic: "Atomic Structure",
    difficulty: "medium",
    question: "The wavelength of light with energy 3.0 eV is approximately: (h = 6.626×10⁻³⁴ J·s, c = 3×10⁸ m/s, 1 eV = 1.6×10⁻¹⁹ J)",
    options: ["207 nm", "414 nm", "620 nm", "828 nm"],
    correctAnswer: "414 nm",
    explanation: "E = hc/λ → λ = hc/E = (6.626×10⁻³⁴ × 3×10⁸) / (3 × 1.6×10⁻¹⁹) = 1.988×10⁻²⁵ / 4.8×10⁻¹⁹ ≈ 414 nm (visible violet light)."
  },
  {
    id: "num3",
    questionType: "numerical",
    topic: "Electrochemistry",
    difficulty: "hard",
    question: "How much charge (in Coulombs) is required to deposit 1 mole of Cu at the cathode? (F = 96500 C/mol)",
    options: ["48250 C", "96500 C", "193000 C", "289500 C"],
    correctAnswer: "193000 C",
    explanation: "Cu²⁺ + 2e⁻ → Cu. Two electrons needed per Cu atom. Q = n × n_e × F = 1 × 2 × 96500 = 193000 C."
  },
  {
    id: "num4",
    questionType: "numerical",
    topic: "Kinetics",
    difficulty: "hard",
    question: "A first-order reaction has a rate constant k = 0.0693 min⁻¹. What is the half-life?",
    options: ["5 min", "10 min", "20 min", "100 min"],
    correctAnswer: "10 min",
    explanation: "t½ = ln2/k = 0.693/0.0693 = 10.0 min. For first-order reactions, t½ is independent of initial concentration."
  },
  {
    id: "num5",
    questionType: "numerical",
    topic: "Thermochemistry",
    difficulty: "medium",
    question: "The pH of a 0.01 M HCl solution is:",
    options: ["1", "2", "4", "12"],
    correctAnswer: "2",
    explanation: "HCl is a strong acid (fully dissociates). [H⁺] = 0.01 M = 10⁻² M. pH = -log[H⁺] = -log(10⁻²) = 2."
  },
  {
    id: "num6",
    questionType: "numerical",
    topic: "Chemical Bonding",
    difficulty: "medium",
    question: "How many sigma (σ) bonds are in a molecule of ethyne (C₂H₂)?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    explanation: "C₂H₂ structure: H−C≡C−H. Bonds: H-C (σ), C≡C (1σ + 2π), C-H (σ) → total 3 σ-bonds and 2 π-bonds."
  },
  {
    id: "num7",
    questionType: "numerical",
    topic: "Equilibrium",
    difficulty: "hard",
    question: "At equilibrium: A + B ⇌ C + D. If [A]=[B]=0.5 M and [C]=[D]=1.0 M, what is Kc?",
    options: ["0.25", "1.0", "4.0", "2.0"],
    correctAnswer: "4.0",
    explanation: "Kc = [C][D]/[A][B] = (1.0 × 1.0) / (0.5 × 0.5) = 1.0 / 0.25 = 4.0"
  },
  {
    id: "num8",
    questionType: "numerical",
    topic: "Organic Chemistry",
    difficulty: "medium",
    question: "How many structural isomers does C₄H₁₀ (butane) have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    explanation: "C₄H₁₀ has 2 isomers: n-butane (CH₃CH₂CH₂CH₃) and isobutane/2-methylpropane (CH₃CH(CH₃)CH₃)."
  },
  // ─── REACTION PREDICTION ───────────────────────────────────────────────────
  {
    id: "rp1",
    questionType: "reaction_prediction",
    topic: "Organic Chemistry",
    difficulty: "medium",
    question: "When ethene (C₂H₄) is treated with HBr, the product is:",
    options: ["CH₃CH₃", "CH₃CH₂Br", "CH₂BrCH₂Br", "CH₃CHBr₂"],
    correctAnswer: "CH₃CH₂Br",
    explanation: "Addition of HBr to ethene (Markovnikov rule for asymmetric alkenes, but ethene is symmetric): C₂H₄ + HBr → CH₃CH₂Br (bromoethane)."
  },
  {
    id: "rp2",
    questionType: "reaction_prediction",
    topic: "Organic Chemistry",
    difficulty: "hard",
    question: "According to Markovnikov's rule, addition of HBr to propene gives mainly:",
    options: [
      "1-bromopropane",
      "2-bromopropane",
      "1,2-dibromopropane",
      "3-bromopropane"
    ],
    correctAnswer: "2-bromopropane",
    explanation: "Markovnikov's rule: H adds to the carbon with more H atoms, halogen to less-substituted C. CH₃CH=CH₂ + HBr → CH₃CHBrCH₃ (2-bromopropane, major product)."
  },
  {
    id: "rp3",
    questionType: "reaction_prediction",
    topic: "s-block",
    difficulty: "easy",
    question: "What is the main product when sodium reacts with water?",
    options: ["NaOH + O₂", "NaOH + H₂", "Na₂O + H₂", "Na₂O₂ + H₂O"],
    correctAnswer: "NaOH + H₂",
    explanation: "2Na + 2H₂O → 2NaOH + H₂↑. Sodium reacts vigorously with water producing sodium hydroxide and hydrogen gas."
  },
  {
    id: "rp4",
    questionType: "reaction_prediction",
    topic: "Electrochemistry",
    difficulty: "medium",
    question: "In the electrolysis of dilute H₂SO₄, which gas is evolved at the cathode?",
    options: ["Oxygen", "Sulphur dioxide", "Hydrogen", "Ozone"],
    correctAnswer: "Hydrogen",
    explanation: "At cathode: 2H⁺ + 2e⁻ → H₂↑. At anode: 2H₂O → O₂ + 4H⁺ + 4e⁻. Hydrogen at cathode, oxygen at anode."
  },
  {
    id: "rp5",
    questionType: "reaction_prediction",
    topic: "p-block",
    difficulty: "medium",
    question: "What is produced when SO₃ dissolves in water?",
    options: ["H₂SO₃", "H₂SO₄", "H₂S", "SO₂ + H₂O"],
    correctAnswer: "H₂SO₄",
    explanation: "SO₃ + H₂O → H₂SO₄ (sulphuric acid). This is the final step in the industrial Contact Process for manufacturing H₂SO₄."
  },
  {
    id: "rp6",
    questionType: "reaction_prediction",
    topic: "Organic Chemistry",
    difficulty: "hard",
    question: "When benzene is treated with Cl₂ in the presence of FeCl₃ (Lewis acid catalyst), the reaction is:",
    options: [
      "Addition",
      "Electrophilic substitution",
      "Nucleophilic substitution",
      "Elimination"
    ],
    correctAnswer: "Electrophilic substitution",
    explanation: "Benzene undergoes EAS (chlorination): C₆H₆ + Cl₂ → C₆H₅Cl + HCl. FeCl₃ activates Cl₂ to form the electrophile Cl⁺(FeCl₄⁻)."
  },
  {
    id: "rp7",
    questionType: "reaction_prediction",
    topic: "d-block",
    difficulty: "hard",
    question: "When excess NH₃ is added to CuSO₄ solution, the complex formed is:",
    options: [
      "[Cu(NH₃)₂]⁺",
      "[Cu(NH₃)₄]²⁺ (deep blue)",
      "Cu(OH)₂ precipitate",
      "[Cu(H₂O)₆]²⁺"
    ],
    correctAnswer: "[Cu(NH₃)₄]²⁺ (deep blue)",
    explanation: "CuSO₄ + 4NH₃ → [Cu(NH₃)₄]SO₄. First a pale blue Cu(OH)₂ precipitate forms, then dissolves in excess NH₃ to form the deep blue tetraamminecopper(II) complex."
  },
  {
    id: "rp8",
    questionType: "reaction_prediction",
    topic: "Thermochemistry",
    difficulty: "medium",
    question: "When CaCO₃ is heated strongly, the products are:",
    options: ["Ca + CO₂ + ½O₂", "CaO + CO₂", "Ca(OH)₂ + CO", "CaC₂ + O₂"],
    correctAnswer: "CaO + CO₂",
    explanation: "CaCO₃ → CaO + CO₂ (thermal decomposition at ~840°C). CaO is quicklime, used in cement and steel manufacturing."
  },
  // Extra MCQs to reach robust count
  {
    id: "q39",
    questionType: "mcq",
    topic: "Periodic Table",
    difficulty: "easy",
    question: "Radioactive element with the highest atomic number in nature is:",
    options: ["Uranium (92)", "Thorium (90)", "Bismuth (83)", "Polonium (84)"],
    correctAnswer: "Uranium (92)",
    explanation: "Uranium (Z=92) is the heaviest naturally occurring element. All elements beyond U are synthetic (transuranic elements)."
  },
  {
    id: "q40",
    questionType: "mcq",
    topic: "Organic Chemistry",
    difficulty: "medium",
    question: "The functional group −COOH is called:",
    options: ["Hydroxyl", "Aldehyde", "Carboxyl", "Ether"],
    correctAnswer: "Carboxyl",
    explanation: "−COOH is the carboxyl group, present in carboxylic acids. It gives acidic properties (donates H⁺ in aqueous solution)."
  },
  {
    id: "q41",
    questionType: "mcq",
    topic: "Organic Chemistry",
    difficulty: "hard",
    question: "Grignard reagent is:",
    options: ["R-MgX", "R-ZnX", "R-Li", "R-AlX₂"],
    correctAnswer: "R-MgX",
    explanation: "Grignard reagents (R-MgX, discovered by Victor Grignard 1900) are strong nucleophiles used for C-C bond formation in synthesis."
  },
  {
    id: "q42",
    questionType: "mcq",
    topic: "Biomolecules",
    difficulty: "hard",
    question: "The secondary structure of proteins is maintained by:",
    options: [
      "Disulfide bonds",
      "Hydrogen bonds",
      "Ionic bonds",
      "Van der Waals forces"
    ],
    correctAnswer: "Hydrogen bonds",
    explanation: "α-helix and β-pleated sheet (secondary structures) are stabilized by H-bonds between backbone C=O and N-H groups."
  },
  {
    id: "q43",
    questionType: "mcq",
    topic: "Kinetics",
    difficulty: "easy",
    question: "A reaction that is zero-order means:",
    options: [
      "The rate is zero",
      "The rate doesn't depend on concentration",
      "The rate depends on one reactant",
      "The activation energy is zero"
    ],
    correctAnswer: "The rate doesn't depend on concentration",
    explanation: "Zero-order: rate = k (constant). Rate is independent of reactant concentration. Example: enzyme-catalysed reactions at saturation."
  },
  {
    id: "q44",
    questionType: "mcq",
    topic: "d-block",
    difficulty: "easy",
    question: "Which transition metal is essential in haemoglobin?",
    options: ["Copper", "Zinc", "Iron", "Cobalt"],
    correctAnswer: "Iron",
    explanation: "Haemoglobin contains an iron porphyrin group (heme). Fe²⁺ binds O₂ reversibly for oxygen transport in blood."
  },
  {
    id: "q45",
    questionType: "mcq",
    topic: "Equilibrium",
    difficulty: "hard",
    question: "The solubility product (Ksp) of AgCl is 1.8×10⁻¹⁰. Its solubility is:",
    options: ["1.8×10⁻¹⁰ M", "1.34×10⁻⁵ M", "9×10⁻¹¹ M", "3.6×10⁻¹⁰ M"],
    correctAnswer: "1.34×10⁻⁵ M",
    explanation: "AgCl ⇌ Ag⁺ + Cl⁻. Let s = solubility. Ksp = s² = 1.8×10⁻¹⁰ → s = √(1.8×10⁻¹⁰) ≈ 1.34×10⁻⁵ M."
  },
  {
    id: "q46",
    questionType: "mcq",
    topic: "Chemical Bonding",
    difficulty: "easy",
    question: "What is the bond angle in methane (CH₄)?",
    options: ["90°", "104.5°", "109.5°", "120°"],
    correctAnswer: "109.5°",
    explanation: "CH₄ has 4 bonding pairs, 0 lone pairs → tetrahedral geometry → bond angle 109.5° (perfect tetrahedron, no lone pair distortion)."
  },
  {
    id: "q47",
    questionType: "mcq",
    topic: "Thermochemistry",
    difficulty: "medium",
    question: "What is the enthalpy of formation of an element in its standard state?",
    options: ["-1 kJ/mol", "0 kJ/mol", "+1 kJ/mol", "Varies with element"],
    correctAnswer: "0 kJ/mol",
    explanation: "By convention, the standard enthalpy of formation (ΔHf°) of any element in its most stable standard state is defined as zero."
  },
  {
    id: "q48",
    questionType: "mcq",
    topic: "Periodic Table",
    difficulty: "hard",
    question: "Lanthanide contraction causes which pair of elements to have nearly identical atomic radii?",
    options: ["Mo and W", "Zr and Hf", "Nb and Ta", "All of the above"],
    correctAnswer: "All of the above",
    explanation: "Lanthanide contraction: 4f electrons shield poorly → 5d elements (Period 6) are similar in size to Period 5 counterparts. All pairs listed show this effect."
  }
];
const TOPICS = [
  "All Topics",
  "Periodic Table",
  "Atomic Structure",
  "Chemical Bonding",
  "Thermochemistry",
  "Organic Chemistry",
  "Electrochemistry",
  "Kinetics",
  "Equilibrium",
  "s-block",
  "p-block",
  "d-block",
  "Biomolecules"
];
const DIFFICULTY_STYLES = {
  easy: {
    color: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    label: "Easy"
  },
  medium: {
    color: "bg-amber-500/20 border-amber-400/40 text-amber-300",
    label: "Medium"
  },
  hard: {
    color: "bg-red-500/20 border-red-400/40 text-red-300",
    label: "Hard"
  }
};
const TYPE_LABELS = {
  all: "All Types",
  mcq: "MCQ",
  assertion_reason: "Assertion-Reason",
  numerical: "Numerical",
  reaction_prediction: "Reaction Prediction"
};
const QUIZ_LENGTH = 15;
function PracticePage() {
  var _a;
  const {
    practiceMode,
    quizScore,
    quizStreak,
    quizHistory,
    recordQuizAnswer,
    clearQuizHistory,
    addXP,
    unlockAchievement
  } = useChemStore();
  const { data: backendQuestions, isLoading } = useQuizQuestions(
    practiceMode,
    "all"
  );
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [diffFilter, setDiffFilter] = reactExports.useState("all");
  const [topicFilter, setTopicFilter] = reactExports.useState("All Topics");
  const [topicOpen, setTopicOpen] = reactExports.useState(false);
  const topicRef = reactExports.useRef(null);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const [showExplanation, setShowExplanation] = reactExports.useState(false);
  const [sessionAnswered, setSessionAnswered] = reactExports.useState(0);
  const [sessionCorrect, setSessionCorrect] = reactExports.useState(0);
  const [showResults, setShowResults] = reactExports.useState(false);
  const [wrongAnswers, setWrongAnswers] = reactExports.useState([]);
  const [reviewMode, setReviewMode] = reactExports.useState(false);
  const [typeStats, setTypeStats] = reactExports.useState({});
  const [topicStats, setTopicStats] = reactExports.useState({});
  const allQuestions = reactExports.useMemo(() => {
    const backend = backendQuestions && backendQuestions.length > 0 ? backendQuestions : [];
    const builtinIds = new Set(backend.map((q) => q.id));
    const merged = [
      ...backend,
      ...BUILTIN_QUESTIONS.filter((q) => !builtinIds.has(q.id))
    ];
    return merged.filter((q) => diffFilter === "all" || q.difficulty === diffFilter).filter((q) => typeFilter === "all" || q.questionType === typeFilter).filter((q) => topicFilter === "All Topics" || q.topic === topicFilter);
  }, [backendQuestions, diffFilter, typeFilter, topicFilter]);
  const currentQuestion = allQuestions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === (currentQuestion == null ? void 0 : currentQuestion.correctAnswer);
  const answeredInHistory = quizHistory.length;
  const totalQuestions = Math.min(QUIZ_LENGTH, allQuestions.length);
  function handleAnswer(option) {
    if (isAnswered) return;
    setSelectedOption(option);
    setShowExplanation(true);
    const correct = option === (currentQuestion == null ? void 0 : currentQuestion.correctAnswer);
    recordQuizAnswer((currentQuestion == null ? void 0 : currentQuestion.id) ?? "", correct);
    setSessionAnswered((s) => s + 1);
    if (correct) {
      setSessionCorrect((s) => s + 1);
      addXP(5);
      const newStreak = quizStreak + 1;
      if (newStreak >= 5) {
        unlockAchievement("streak-master");
      }
      const totalCorrect = quizHistory.filter((h) => h.correct).length + 1;
      if (totalCorrect >= 10) {
        unlockAchievement("quick-learner");
      }
    } else if (currentQuestion) {
      setWrongAnswers((prev) => [
        ...prev,
        { q: currentQuestion, chosen: option }
      ]);
    }
    const qType = (currentQuestion == null ? void 0 : currentQuestion.questionType) ?? "mcq";
    const qTopic = (currentQuestion == null ? void 0 : currentQuestion.topic) ?? "Other";
    setTypeStats((prev) => {
      const prev_ = prev[qType] ?? { correct: 0, total: 0 };
      return {
        ...prev,
        [qType]: {
          correct: prev_.correct + (correct ? 1 : 0),
          total: prev_.total + 1
        }
      };
    });
    setTopicStats((prev) => {
      const prev_ = prev[qTopic] ?? { correct: 0, total: 0 };
      return {
        ...prev,
        [qTopic]: {
          correct: prev_.correct + (correct ? 1 : 0),
          total: prev_.total + 1
        }
      };
    });
  }
  function handleNext() {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= totalQuestions) {
      setShowResults(true);
      return;
    }
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIndex(nextIdx);
  }
  function handleReset() {
    clearQuizHistory();
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIndex(0);
    setSessionAnswered(0);
    setSessionCorrect(0);
    setShowResults(false);
    setWrongAnswers([]);
    setTypeStats({});
    setTopicStats({});
    setReviewMode(false);
  }
  function applyFilter() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setShowResults(false);
    setSessionAnswered(0);
    setSessionCorrect(0);
    setWrongAnswers([]);
    setTypeStats({});
    setTopicStats({});
  }
  const weakTopics = Object.entries(topicStats).filter(([, s]) => s.total >= 2 && s.correct / s.total < 0.5).map(([t]) => t);
  const isAssertionReason = (currentQuestion == null ? void 0 : currentQuestion.questionType) === "assertion_reason";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-8 pb-24", "data-ocid": "practice.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "text-center mb-6 max-w-2xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-teal-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "300+ questions · Class 11 & 12 + Advanced" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 bg-clip-text text-transparent", children: "Practice Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Filter by type, difficulty & topic — then test yourself with instant feedback." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", "data-ocid": "practice.stats_bar", children: [
        { icon: Trophy, label: "Score", value: quizScore },
        { icon: Zap, label: "Streak", value: quizStreak },
        { icon: Target, label: "Answered", value: answeredInHistory }
      ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-practice rounded-2xl p-3 text-center",
          "data-ocid": `practice.stat_${label.toLowerCase()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 mx-auto mb-1 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "glass rounded-2xl p-4 space-y-4",
          "data-ocid": "practice.filters",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Question Type" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.keys(TYPE_LABELS).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setTypeFilter(t);
                    applyFilter();
                  },
                  className: cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                    typeFilter === t ? "bg-teal-500/20 border-teal-400/50 text-teal-300 shadow-[0_0_10px_rgba(45,212,191,0.25)]" : "glass text-muted-foreground hover:text-foreground hover:border-white/20"
                  ),
                  "data-ocid": `practice.type_filter.${t}`,
                  children: TYPE_LABELS[t]
                },
                t
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: "Difficulty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["all", "easy", "medium", "hard"].map(
                  (d) => {
                    var _a2;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setDiffFilter(d);
                          applyFilter();
                        },
                        className: cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 capitalize",
                          diffFilter === d && d === "all" ? "bg-card/60 border-white/20 text-foreground" : diffFilter === d ? (_a2 = DIFFICULTY_STYLES[d]) == null ? void 0 : _a2.color : "glass text-muted-foreground hover:text-foreground"
                        ),
                        "data-ocid": `practice.diff_filter.${d}`,
                        children: d === "all" ? "All" : DIFFICULTY_STYLES[d].label
                      },
                      d
                    );
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: topicRef, className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: "Topic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTopicOpen((o) => !o),
                    className: "flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 hover:border-white/20 transition-all min-w-[140px] justify-between",
                    "data-ocid": "practice.topic_filter_toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground", children: topicFilter }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          className: cn(
                            "w-3.5 h-3.5 text-muted-foreground transition-transform",
                            topicOpen && "rotate-180"
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: topicOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -4, scale: 0.97 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: -4, scale: 0.97 },
                    transition: { duration: 0.15 },
                    className: "absolute right-0 top-full mt-1 z-50 w-52 glass rounded-xl border border-white/10 shadow-xl overflow-hidden",
                    "data-ocid": "practice.topic_dropdown",
                    children: TOPICS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setTopicFilter(t);
                          setTopicOpen(false);
                          applyFilter();
                        },
                        className: cn(
                          "w-full text-left px-3 py-2 text-xs transition-colors hover:bg-card/40",
                          topicFilter === t ? "text-teal-300 bg-teal-500/10" : "text-muted-foreground"
                        ),
                        children: t
                      },
                      t
                    ))
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground border-t border-white/5 pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-teal-400 font-semibold", children: allQuestions.length }),
              " ",
              "questions match your filters",
              allQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                " ",
                "· Session: ",
                Math.min(QUIZ_LENGTH, allQuestions.length),
                " ",
                "questions"
              ] })
            ] })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-2xl p-8 text-center",
          "data-ocid": "practice.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading questions…" })
          ]
        }
      ) : allQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-2xl p-8 text-center",
          "data-ocid": "practice.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No questions match your current filters." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setTypeFilter("all");
                  setDiffFilter("all");
                  setTopicFilter("All Topics");
                  applyFilter();
                },
                className: "mt-3 text-teal-400 text-sm hover:underline",
                children: "Clear all filters"
              }
            )
          ]
        }
      ) : showResults ? (
        /* ── Results Screen ── */
        reviewMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReviewScreen,
          {
            wrongAnswers,
            onBack: () => setReviewMode(false),
            onReset: handleReset
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultsScreen,
          {
            sessionCorrect,
            sessionAnswered,
            quizStreak,
            typeStats,
            weakTopics,
            wrongCount: wrongAnswers.length,
            onReview: () => setReviewMode(true),
            onReset: handleReset
          }
        )
      ) : currentQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -30 },
          transition: { duration: 0.28, ease: "easeOut" },
          className: "glass-practice rounded-2xl p-6",
          "data-ocid": "practice.question_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium", children: [
                "Question",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: currentIndex + 1 }),
                " of",
                " ",
                totalQuestions
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                      ((_a = DIFFICULTY_STYLES[currentQuestion.difficulty]) == null ? void 0 : _a.color) ?? "glass text-muted-foreground"
                    ),
                    children: currentQuestion.difficulty
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] bg-card/40 border border-white/10 text-muted-foreground", children: currentQuestion.topic })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 rounded-full bg-white/5 mb-5 overflow-hidden border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full bg-gradient-to-r from-teal-400/70 to-emerald-400/70",
                animate: {
                  width: `${(currentIndex + 1) / totalQuestions * 100}%`
                },
                transition: { duration: 0.4, ease: "easeOut" }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
              TYPE_LABELS[currentQuestion.questionType] ?? currentQuestion.questionType
            ] }) }),
            isAssertionReason ? /* @__PURE__ */ jsxRuntimeExports.jsx(AssertionReasonQuestion, { question: currentQuestion.question }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold mb-5 text-foreground leading-snug", children: currentQuestion.question }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 mb-4", "data-ocid": "practice.options", children: currentQuestion.options.map((option, idx) => {
              const optionLetters = ["A", "B", "C", "D"];
              const isSelected = option === selectedOption;
              const isCorrectOpt = option === currentQuestion.correctAnswer;
              let optionStyle = "glass hover:bg-card/40 text-foreground cursor-pointer border-white/10 hover:border-white/20";
              let glowStyle = "";
              if (isAnswered) {
                if (isCorrectOpt) {
                  optionStyle = "bg-emerald-500/15 border-emerald-400/50 text-emerald-200 cursor-default";
                  glowStyle = "shadow-[0_0_12px_rgba(52,211,153,0.2)]";
                } else if (isSelected) {
                  optionStyle = "bg-red-500/15 border-red-400/50 text-red-200 cursor-default";
                  glowStyle = "shadow-[0_0_12px_rgba(248,113,113,0.2)]";
                } else {
                  optionStyle = "glass opacity-40 text-muted-foreground cursor-default border-white/5";
                }
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  initial: isAnswered && isCorrectOpt ? { scale: 1 } : {},
                  animate: isAnswered && isCorrectOpt ? { scale: [1, 1.01, 1] } : {},
                  transition: { duration: 0.3 },
                  whileHover: !isAnswered ? { scale: 1.005, x: 2 } : {},
                  whileTap: !isAnswered ? { scale: 0.995 } : {},
                  onClick: () => handleAnswer(option),
                  disabled: isAnswered,
                  className: cn(
                    "w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-medium",
                    optionStyle,
                    glowStyle
                  ),
                  "data-ocid": `practice.option.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold border",
                          isAnswered && isCorrectOpt ? "bg-emerald-500/30 border-emerald-400/50 text-emerald-200" : isAnswered && isSelected ? "bg-red-500/30 border-red-400/50 text-red-200" : "bg-white/5 border-white/15 text-muted-foreground"
                        ),
                        children: isAnswered && isCorrectOpt ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }) : isAnswered && isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }) : optionLetters[idx]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0", children: option })
                  ] })
                },
                option
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showExplanation && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.3, ease: "easeOut" },
                className: "overflow-hidden mb-4",
                "data-ocid": "practice.explanation",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "rounded-xl p-4 text-sm leading-relaxed border",
                      isCorrect ? "bg-emerald-500/8 border-emerald-400/25 text-emerald-200" : "bg-red-500/8 border-red-400/25 text-red-200"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1.5 flex items-center gap-2", children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-400" }),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-300", children: "Correct!" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-400" }),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-300", children: "Not quite…" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80", children: currentQuestion.explanation })
                    ]
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              isAnswered && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.97 },
                  onClick: handleNext,
                  className: "flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 transition-all",
                  "data-ocid": "practice.next_button",
                  children: currentIndex + 1 >= totalQuestions ? "See Results →" : "Next Question →"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleReset,
                  className: "glass px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all",
                  "data-ocid": "practice.reset_button",
                  "aria-label": "Reset quiz",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" })
                }
              )
            ] })
          ]
        },
        currentQuestion.id
      ) }) : null,
      sessionAnswered > 0 && !showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "glass rounded-2xl px-5 py-4 flex items-center gap-4",
          "data-ocid": "practice.session_summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Session: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-semibold", children: sessionCorrect }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                " ",
                "/ ",
                sessionAnswered,
                " correct"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-teal-500/60",
                animate: {
                  width: `${sessionCorrect / sessionAnswered * 100}%`
                },
                transition: { duration: 0.4 }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground", children: [
              Math.round(sessionCorrect / sessionAnswered * 100),
              "%"
            ] })
          ]
        }
      )
    ] })
  ] });
}
function AssertionReasonQuestion({ question }) {
  const aMatch = question.match(/Assertion \(A\):\s*(.+?)(?:\nReason|$)/s);
  const rMatch = question.match(/Reason \(R\):\s*(.+?)$/s);
  const assertion = aMatch ? aMatch[1].trim() : question;
  const reason = rMatch ? rMatch[1].trim() : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-4 bg-blue-500/8 border border-blue-400/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1.5", children: "Assertion (A)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-relaxed", children: assertion })
    ] }),
    reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-4 bg-purple-500/8 border border-purple-400/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1.5", children: "Reason (R)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-relaxed", children: reason })
    ] })
  ] });
}
function ResultsScreen({
  sessionCorrect,
  sessionAnswered,
  quizStreak,
  typeStats,
  weakTopics,
  wrongCount,
  onReview,
  onReset
}) {
  const pct = sessionAnswered > 0 ? Math.round(sessionCorrect / sessionAnswered * 100) : 0;
  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚";
  const label = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good Work!" : "Keep Practising!";
  const circumference = 2 * Math.PI * 48;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35 },
      className: "glass-practice rounded-2xl p-6",
      "data-ocid": "practice.results_screen",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-2", children: emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-1 text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Quiz complete — here's your breakdown" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              viewBox: "0 0 112 112",
              className: "w-full h-full -rotate-90",
              "aria-hidden": "true",
              role: "presentation",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "56",
                    cy: "56",
                    r: "48",
                    fill: "none",
                    stroke: "rgba(255,255,255,0.06)",
                    strokeWidth: "7"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.circle,
                  {
                    cx: "56",
                    cy: "56",
                    r: "48",
                    fill: "none",
                    stroke: pct >= 80 ? "#4ade80" : pct >= 60 ? "#fbbf24" : "#f87171",
                    strokeWidth: "7",
                    strokeLinecap: "round",
                    strokeDasharray: circumference,
                    initial: { strokeDashoffset: circumference },
                    animate: { strokeDashoffset: circumference * (1 - pct / 100) },
                    transition: { duration: 1.2, ease: "easeOut", delay: 0.2 }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl font-bold text-foreground", children: [
              pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              sessionCorrect,
              "/",
              sessionAnswered
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-5", children: [
          {
            label: "Correct",
            value: sessionCorrect,
            color: "text-emerald-400"
          },
          {
            label: "Wrong",
            value: sessionAnswered - sessionCorrect,
            color: "text-red-400"
          },
          { label: "Streak", value: quizStreak, color: "text-amber-400" }
        ].map(({ label: label2, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xl font-display font-bold ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label2 })
        ] }, label2)) }),
        Object.keys(typeStats).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: "By Question Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Object.entries(typeStats).map(([type, s]) => {
            const p = s.total > 0 ? Math.round(s.correct / s.total * 100) : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-36 truncate", children: TYPE_LABELS[type] ?? type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: cn(
                    "h-full rounded-full",
                    p >= 70 ? "bg-emerald-400/60" : p >= 40 ? "bg-amber-400/60" : "bg-red-400/60"
                  ),
                  initial: { width: 0 },
                  animate: { width: `${p}%` },
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground w-10 text-right", children: [
                s.correct,
                "/",
                s.total
              ] })
            ] }, type);
          }) })
        ] }),
        weakTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 rounded-xl p-3 bg-amber-500/8 border border-amber-400/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-amber-400 mb-1.5", children: "⚠ Weak Topics (< 50%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: weakTopics.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded-full text-[10px] bg-amber-500/15 border border-amber-400/25 text-amber-300",
              children: t
            },
            t
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          wrongCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onReview,
              className: "w-full glass border border-white/15 px-4 py-3 rounded-xl font-semibold text-sm text-muted-foreground hover:text-foreground hover:border-white/25 transition-all flex items-center justify-center gap-2",
              "data-ocid": "practice.review_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                "Review Wrong Answers (",
                wrongCount,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileHover: { scale: 1.01 },
              whileTap: { scale: 0.97 },
              onClick: onReset,
              className: "w-full bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2",
              "data-ocid": "practice.retry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                "Try Again"
              ]
            }
          )
        ] })
      ]
    },
    "results"
  );
}
function ReviewScreen({
  wrongAnswers,
  onBack,
  onReset
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3 },
      "data-ocid": "practice.review_screen",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-practice rounded-2xl p-5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Review Wrong Answers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onBack,
                className: "glass px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground transition-all",
                "data-ocid": "practice.review_back_button",
                children: "← Back to Results"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: wrongAnswers.map(({ q, chosen }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-white/8 bg-card/20 p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "Q",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-snug flex-1", children: q.questionType === "assertion_reason" ? `Assertion/Reason — ${q.topic}` : q.question })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-red-400 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-300", children: [
                      "Your answer: ",
                      chosen
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-emerald-400 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-300", children: [
                      "Correct: ",
                      q.correctAnswer
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground leading-relaxed border-t border-white/5 pt-2", children: q.explanation })
                ] })
              ]
            },
            q.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.97 },
            onClick: onReset,
            className: "w-full bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2",
            "data-ocid": "practice.retry_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
              "New Quiz"
            ]
          }
        )
      ]
    }
  );
}
export {
  PracticePage
};
