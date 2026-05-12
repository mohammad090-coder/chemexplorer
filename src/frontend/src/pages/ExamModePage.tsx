import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import type {
  ExamChapter,
  ExamConfig,
  ExamQuestionResult,
  ExamResult,
  QuizQuestion,
} from "@/types/chemistry";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ── Chapter Data ──────────────────────────────────────────────────────────────

const CLASS_11_CHAPTERS: ExamChapter[] = [
  "Some Basic Concepts",
  "Atomic Structure",
  "Classification of Elements",
  "Chemical Bonding",
  "States of Matter",
  "Thermodynamics",
  "Equilibrium",
  "Redox Reactions",
  "Hydrogen",
  "s-Block Elements",
  "p-Block Elements",
  "Organic Chemistry Basics",
  "Hydrocarbons",
];

const CLASS_12_CHAPTERS: ExamChapter[] = [
  "Solutions",
  "Electrochemistry",
  "Chemical Kinetics",
  "Surface Chemistry",
  "d and f Block Elements",
  "Coordination Compounds",
  "Haloalkanes",
  "Alcohols Phenols Ethers",
  "Aldehydes Ketones",
  "Amines",
  "Biomolecules",
  "Polymers",
];

// ── Question Bank ─────────────────────────────────────────────────────────────

const EXAM_QUESTIONS: QuizQuestion[] = [
  // ── Some Basic Concepts ─────────────────────────────────────────────────
  {
    id: "e1",
    questionType: "mcq",
    topic: "Some Basic Concepts",
    difficulty: "easy",
    question: "Avogadro's number is approximately:",
    options: ["6.022 × 10²³", "6.022 × 10²²", "3.011 × 10²³", "1.204 × 10²⁴"],
    correctAnswer: "6.022 × 10²³",
    explanation:
      "Avogadro's number NA = 6.022 × 10²³ mol⁻¹. It represents the number of particles in one mole of substance.",
  },
  {
    id: "e2",
    questionType: "mcq",
    topic: "Some Basic Concepts",
    difficulty: "medium",
    question: "The molar mass of H₂SO₄ is:",
    options: ["96 g/mol", "98 g/mol", "94 g/mol", "100 g/mol"],
    correctAnswer: "98 g/mol",
    explanation: "H₂SO₄: 2(1) + 32 + 4(16) = 2 + 32 + 64 = 98 g/mol.",
  },
  {
    id: "e3",
    questionType: "numerical",
    topic: "Some Basic Concepts",
    difficulty: "medium",
    question:
      "How many moles are present in 44g of CO₂? (Molar mass of CO₂ = 44 g/mol)",
    options: [],
    correctAnswer: "1",
    explanation: "Moles = mass/molar mass = 44/44 = 1 mol.",
  },
  {
    id: "e4",
    questionType: "assertion",
    topic: "Some Basic Concepts",
    difficulty: "hard",
    question:
      "Assertion (A): The empirical formula of glucose (C₆H₁₂O₆) is CH₂O.\nReason (R): The empirical formula represents the simplest whole-number ratio of atoms.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "C₆H₁₂O₆ simplifies to CH₂O (ratio 1:2:1). R correctly explains A — empirical formula is simplest integer ratio.",
  },
  {
    id: "e5",
    questionType: "mcq",
    topic: "Some Basic Concepts",
    difficulty: "easy",
    question:
      "Which law states that matter can neither be created nor destroyed?",
    options: [
      "Law of Definite Proportions",
      "Law of Conservation of Mass",
      "Law of Multiple Proportions",
      "Avogadro's Law",
    ],
    correctAnswer: "Law of Conservation of Mass",
    explanation:
      "Lavoisier's Law of Conservation of Mass: total mass of reactants = total mass of products in a chemical reaction.",
  },

  // ── Atomic Structure ────────────────────────────────────────────────────
  {
    id: "e6",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "easy",
    question: "The quantum number that describes the shape of an orbital is:",
    options: [
      "Principal quantum number (n)",
      "Azimuthal quantum number (l)",
      "Magnetic quantum number (m)",
      "Spin quantum number (s)",
    ],
    correctAnswer: "Azimuthal quantum number (l)",
    explanation:
      "The azimuthal quantum number l determines the shape: l=0 (s), l=1 (p), l=2 (d), l=3 (f).",
  },
  {
    id: "e7",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "medium",
    question:
      "Which of the following is NOT a valid set of quantum numbers (n, l, m, s)?",
    options: [
      "(2, 1, -1, +½)",
      "(3, 2, 2, -½)",
      "(2, 2, 0, +½)",
      "(1, 0, 0, -½)",
    ],
    correctAnswer: "(2, 2, 0, +½)",
    explanation:
      "For n=2, l can only be 0 or 1 (l < n). l=2 is invalid when n=2.",
  },
  {
    id: "e8",
    questionType: "assertion",
    topic: "Atomic Structure",
    difficulty: "hard",
    question:
      "Assertion (A): 3d orbitals are filled before 4s orbitals.\nReason (R): Orbitals are filled in increasing order of (n + l) value.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer: "A is false but R is true",
    explanation:
      "According to Aufbau (n+l rule), 4s (n+l=4) fills before 3d (n+l=5). A is false. R is true.",
  },
  {
    id: "e9",
    questionType: "numerical",
    topic: "Atomic Structure",
    difficulty: "medium",
    question:
      "Wavelength of a photon with energy 3.3×10⁻¹⁹ J (h=6.6×10⁻³⁴ Js, c=3×10⁸ m/s)? Answer in nm.",
    options: [],
    correctAnswer: "600",
    explanation:
      "λ = hc/E = (6.6×10⁻³⁴ × 3×10⁸) / (3.3×10⁻¹⁹) = 6×10⁻⁷ m = 600 nm.",
  },
  {
    id: "e10",
    questionType: "mcq",
    topic: "Atomic Structure",
    difficulty: "easy",
    question:
      "Heisenberg's Uncertainty Principle states that we cannot simultaneously determine precisely:",
    options: [
      "Mass and velocity",
      "Position and momentum",
      "Charge and spin",
      "Energy and spin",
    ],
    correctAnswer: "Position and momentum",
    explanation:
      "ΔxΔp ≥ h/4π. Position and momentum cannot both be precisely known at the same time.",
  },

  // ── Classification of Elements ──────────────────────────────────────────
  {
    id: "e11",
    questionType: "mcq",
    topic: "Classification of Elements",
    difficulty: "easy",
    question: "The modern periodic table is based on:",
    options: [
      "Atomic mass",
      "Atomic number",
      "Number of neutrons",
      "Valence electrons",
    ],
    correctAnswer: "Atomic number",
    explanation:
      "Moseley (1913) showed the periodic law should be based on atomic number (protons), not atomic mass.",
  },
  {
    id: "e12",
    questionType: "mcq",
    topic: "Classification of Elements",
    difficulty: "medium",
    question: "Which property increases going from Na to Cl in Period 3?",
    options: [
      "Atomic radius",
      "Metallic character",
      "Ionization energy",
      "Electrical conductivity",
    ],
    correctAnswer: "Ionization energy",
    explanation:
      "First ionization energy increases across a period as nuclear charge increases and atomic radius decreases.",
  },
  {
    id: "e13",
    questionType: "assertion",
    topic: "Classification of Elements",
    difficulty: "hard",
    question:
      "Assertion (A): Ionization energy of Be is greater than B.\nReason (R): 2s electrons are more penetrating than 2p electrons.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "Be (2s²) has higher IE than B (2p¹) because 2s penetrates closer to nucleus, making it harder to remove.",
  },

  // ── Chemical Bonding ────────────────────────────────────────────────────
  {
    id: "e14",
    questionType: "mcq",
    topic: "Chemical Bonding",
    difficulty: "easy",
    question: "The geometry of NH₃ is:",
    options: ["Tetrahedral", "Trigonal planar", "Trigonal pyramidal", "Linear"],
    correctAnswer: "Trigonal pyramidal",
    explanation:
      "NH₃ has 3 bonding pairs and 1 lone pair. VSEPR gives trigonal pyramidal molecular shape.",
  },
  {
    id: "e15",
    questionType: "mcq",
    topic: "Chemical Bonding",
    difficulty: "medium",
    question: "In which molecule is bond order 2.5?",
    options: ["O₂", "N₂", "NO", "CO"],
    correctAnswer: "NO",
    explanation:
      "NO has 11 valence electrons. MO theory gives bond order = (8-3)/2 = 2.5. It is paramagnetic.",
  },
  {
    id: "e16",
    questionType: "assertion",
    topic: "Chemical Bonding",
    difficulty: "hard",
    question:
      "Assertion (A): CO₂ is non-polar despite having polar bonds.\nReason (R): The dipole moments of the two C=O bonds cancel due to linear geometry.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "CO₂ is linear (180°), so equal and opposite dipoles cancel → net dipole moment = 0, non-polar molecule.",
  },

  // ── States of Matter ────────────────────────────────────────────────────
  {
    id: "e17",
    questionType: "mcq",
    topic: "States of Matter",
    difficulty: "easy",
    question: "Which gas law states PV = constant at constant temperature?",
    options: [
      "Charles' Law",
      "Gay-Lussac's Law",
      "Boyle's Law",
      "Avogadro's Law",
    ],
    correctAnswer: "Boyle's Law",
    explanation:
      "Boyle's Law: at constant T, pressure and volume are inversely proportional. PV = k (constant).",
  },
  {
    id: "e18",
    questionType: "numerical",
    topic: "States of Matter",
    difficulty: "medium",
    question:
      "A gas occupies 4L at 2 atm. Volume at 4 atm (constant T)? Answer in litres.",
    options: [],
    correctAnswer: "2",
    explanation: "P₁V₁ = P₂V₂ → 2×4 = 4×V₂ → V₂ = 2L (Boyle's Law).",
  },

  // ── Thermodynamics ──────────────────────────────────────────────────────
  {
    id: "e19",
    questionType: "mcq",
    topic: "Thermodynamics",
    difficulty: "easy",
    question:
      "For a spontaneous process at constant T and P, which condition must be satisfied?",
    options: ["ΔG > 0", "ΔG = 0", "ΔG < 0", "ΔH > 0"],
    correctAnswer: "ΔG < 0",
    explanation:
      "Gibbs free energy: ΔG = ΔH - TΔS. For spontaneous process at constant T, P: ΔG < 0.",
  },
  {
    id: "e20",
    questionType: "mcq",
    topic: "Thermodynamics",
    difficulty: "medium",
    question: "Hess's Law states that:",
    options: [
      "Entropy always increases",
      "Enthalpy change is path-independent",
      "Gibbs energy is zero at equilibrium",
      "Heat capacity is constant",
    ],
    correctAnswer: "Enthalpy change is path-independent",
    explanation:
      "Hess's Law: total enthalpy change is the same regardless of route, since H is a state function.",
  },
  {
    id: "e21",
    questionType: "assertion",
    topic: "Thermodynamics",
    difficulty: "hard",
    question:
      "Assertion (A): Melting of ice is an endothermic process.\nReason (R): Entropy increases when ice melts to water.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true but R is not the correct explanation of A",
    explanation:
      "Ice melting is endothermic (ΔH > 0) — heat is absorbed. Entropy does increase, but R doesn't explain why the process is endothermic.",
  },

  // ── Equilibrium ─────────────────────────────────────────────────────────
  {
    id: "e22",
    questionType: "mcq",
    topic: "Equilibrium",
    difficulty: "easy",
    question:
      "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), if pressure is increased, equilibrium shifts:",
    options: [
      "Towards N₂ and H₂",
      "Towards NH₃",
      "No change",
      "Cannot be determined",
    ],
    correctAnswer: "Towards NH₃",
    explanation:
      "Le Chatelier: increasing pressure shifts equilibrium towards fewer moles of gas. Left=4 mol, Right=2 mol → shifts right.",
  },
  {
    id: "e23",
    questionType: "numerical",
    topic: "Equilibrium",
    difficulty: "hard",
    question:
      "For N₂O₄ ⇌ 2NO₂, Kc=4 at 298K. If [N₂O₄]=1M at equilibrium, what is [NO₂]? Answer in M.",
    options: [],
    correctAnswer: "2",
    explanation: "Kc = [NO₂]²/[N₂O₄] = 4 → [NO₂]² = 4 → [NO₂] = 2M.",
  },

  // ── Redox Reactions ─────────────────────────────────────────────────────
  {
    id: "e24",
    questionType: "mcq",
    topic: "Redox Reactions",
    difficulty: "easy",
    question: "In 2Mg + O₂ → 2MgO, Mg is:",
    options: ["Reduced", "Oxidized", "Neither", "Acts as catalyst"],
    correctAnswer: "Oxidized",
    explanation:
      "Mg goes from 0 to +2 oxidation state (loses electrons) → oxidized.",
  },
  {
    id: "e25",
    questionType: "mcq",
    topic: "Redox Reactions",
    difficulty: "medium",
    question: "The oxidation number of Cr in K₂Cr₂O₇ is:",
    options: ["+3", "+4", "+6", "+7"],
    correctAnswer: "+6",
    explanation: "2K(+1) + 2Cr + 7O(-2) = 0 → 2 + 2x - 14 = 0 → x = +6.",
  },

  // ── Solutions ───────────────────────────────────────────────────────────
  {
    id: "e26",
    questionType: "mcq",
    topic: "Solutions",
    difficulty: "easy",
    question: "Raoult's law states that vapour pressure of solution is:",
    options: [
      "Greater than pure solvent",
      "Equal to pure solvent",
      "Proportional to mole fraction of solvent",
      "Independent of temperature",
    ],
    correctAnswer: "Proportional to mole fraction of solvent",
    explanation: "Raoult's Law: P_solution = χ_solvent × P°_solvent.",
  },
  {
    id: "e27",
    questionType: "mcq",
    topic: "Solutions",
    difficulty: "medium",
    question: "Which of these is a colligative property?",
    options: [
      "Refractive index",
      "Osmotic pressure",
      "Surface tension",
      "Viscosity",
    ],
    correctAnswer: "Osmotic pressure",
    explanation:
      "Colligative properties depend only on number of solute particles: osmotic pressure, boiling point elevation, freezing point depression, VP lowering.",
  },
  {
    id: "e28",
    questionType: "assertion",
    topic: "Solutions",
    difficulty: "hard",
    question:
      "Assertion (A): Reverse osmosis requires pressure greater than osmotic pressure.\nReason (R): Osmotic pressure pushes solvent from dilute to concentrated solution.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "Applied pressure > osmotic pressure forces solvent from concentrated to dilute solution in reverse osmosis.",
  },
  {
    id: "e29",
    questionType: "numerical",
    topic: "Solutions",
    difficulty: "medium",
    question:
      "Molarity of 4g NaOH in 500mL solution (M.M. NaOH=40)? Answer in M.",
    options: [],
    correctAnswer: "0.2",
    explanation: "Moles NaOH = 4/40 = 0.1 mol. Molarity = 0.1/0.5 = 0.2 M.",
  },

  // ── Electrochemistry ────────────────────────────────────────────────────
  {
    id: "e30",
    questionType: "mcq",
    topic: "Electrochemistry",
    difficulty: "easy",
    question:
      "The standard electrode potential of standard hydrogen electrode is:",
    options: ["+1.0 V", "0.00 V", "-1.0 V", "+0.76 V"],
    correctAnswer: "0.00 V",
    explanation:
      "SHE is assigned E° = 0.00 V by convention and is used as the reference electrode.",
  },
  {
    id: "e31",
    questionType: "mcq",
    topic: "Electrochemistry",
    difficulty: "medium",
    question: "The relationship between Gibbs free energy and cell EMF is:",
    options: ["ΔG = nFE", "ΔG = -nFE", "ΔG = nRT ln K", "ΔG = E/nF"],
    correctAnswer: "ΔG = -nFE",
    explanation:
      "ΔG = -nFE_cell. Spontaneous (ΔG<0) requires positive E_cell. F = 96500 C/mol.",
  },
  {
    id: "e32",
    questionType: "assertion",
    topic: "Electrochemistry",
    difficulty: "hard",
    question:
      "Assertion (A): A galvanic cell converts chemical energy to electrical energy.\nReason (R): In galvanic cells, oxidation occurs at the anode and reduction at the cathode.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true but R is not the correct explanation of A",
    explanation:
      "Both A and R are true, but R describes electrode processes rather than directly explaining the energy conversion.",
  },

  // ── Chemical Kinetics ───────────────────────────────────────────────────
  {
    id: "e33",
    questionType: "mcq",
    topic: "Chemical Kinetics",
    difficulty: "easy",
    question: "The order of a reaction with rate = k[A]²[B] is:",
    options: ["First order", "Second order", "Third order", "Zero order"],
    correctAnswer: "Third order",
    explanation: "Overall order = sum of exponents = 2 + 1 = 3 (third order).",
  },
  {
    id: "e34",
    questionType: "numerical",
    topic: "Chemical Kinetics",
    difficulty: "medium",
    question:
      "Half-life of a first-order reaction is 693s. Rate constant k in 10⁻³ s⁻¹?",
    options: [],
    correctAnswer: "1",
    explanation: "t₁/₂ = 0.693/k → k = 0.693/693 = 0.001 s⁻¹ = 1 × 10⁻³ s⁻¹.",
  },
  {
    id: "e35",
    questionType: "assertion",
    topic: "Chemical Kinetics",
    difficulty: "hard",
    question:
      "Assertion (A): Increasing temperature always increases reaction rate.\nReason (R): Higher temperature increases the fraction of molecules with energy ≥ activation energy.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "Arrhenius equation: k = Ae^(-Ea/RT). Higher T → more molecules exceed Ea → faster reaction. R correctly explains A.",
  },

  // ── Surface Chemistry ───────────────────────────────────────────────────
  {
    id: "e36",
    questionType: "mcq",
    topic: "Surface Chemistry",
    difficulty: "easy",
    question: "Adsorption of gas on a solid is generally:",
    options: [
      "Endothermic",
      "Exothermic",
      "Neither",
      "Depends on pressure only",
    ],
    correctAnswer: "Exothermic",
    explanation:
      "Adsorption releases energy (ΔH < 0) — gas molecules lose kinetic energy when they stick to the solid surface.",
  },
  {
    id: "e37",
    questionType: "mcq",
    topic: "Surface Chemistry",
    difficulty: "medium",
    question:
      "Which type of colloid is formed when liquid is dispersed in liquid?",
    options: ["Foam", "Emulsion", "Aerosol", "Gel"],
    correctAnswer: "Emulsion",
    explanation: "Emulsion = liquid in liquid (e.g. milk: fat in water).",
  },

  // ── d and f Block Elements ──────────────────────────────────────────────
  {
    id: "e38",
    questionType: "mcq",
    topic: "d and f Block Elements",
    difficulty: "easy",
    question: "Which of the following transition metal ions is diamagnetic?",
    options: ["Cu²⁺", "Zn²⁺", "Fe²⁺", "Mn²⁺"],
    correctAnswer: "Zn²⁺",
    explanation: "Zn²⁺ has [Ar] 3d¹⁰ — all electrons paired → diamagnetic.",
  },
  {
    id: "e39",
    questionType: "assertion",
    topic: "d and f Block Elements",
    difficulty: "hard",
    question:
      "Assertion (A): Transition metals show variable oxidation states.\nReason (R): The energy difference between (n-1)d and ns orbitals is very small.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "ns and (n-1)d orbitals have similar energies → varying electrons can be removed, giving multiple oxidation states.",
  },

  // ── Coordination Compounds ──────────────────────────────────────────────
  {
    id: "e40",
    questionType: "mcq",
    topic: "Coordination Compounds",
    difficulty: "easy",
    question: "NH₃ as a ligand in coordination compounds is named:",
    options: ["Amino", "Ammine", "Azide", "Amine"],
    correctAnswer: "Ammine",
    explanation:
      "NH₃ as a ligand is named 'ammine' (double m). e.g. [Cu(NH₃)₄]²⁺ = tetraamminecopper(II).",
  },
  {
    id: "e41",
    questionType: "mcq",
    topic: "Coordination Compounds",
    difficulty: "medium",
    question: "The coordination number of Fe in [Fe(CN)₆]³⁻ is:",
    options: ["3", "4", "6", "8"],
    correctAnswer: "6",
    explanation: "6 CN⁻ ligands coordinate to Fe → coordination number = 6.",
  },
  {
    id: "e42",
    questionType: "assertion",
    topic: "Coordination Compounds",
    difficulty: "hard",
    question:
      "Assertion (A): [Co(NH₃)₆]³⁺ is an inner orbital complex.\nReason (R): NH₃ is a strong field ligand causing pairing of d electrons.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "NH₃ is strong field → d-electron pairing in Co³⁺ → d²sp³ hybridisation (inner d) → inner orbital complex, diamagnetic.",
  },

  // ── Haloalkanes ─────────────────────────────────────────────────────────
  {
    id: "e43",
    questionType: "mcq",
    topic: "Haloalkanes",
    difficulty: "medium",
    question: "SN2 reaction of (R)-2-bromobutane with NaOH gives:",
    options: ["(R)-2-butanol", "(S)-2-butanol", "Racemic mixture", "2-butene"],
    correctAnswer: "(S)-2-butanol",
    explanation:
      "SN2 proceeds with inversion of configuration (Walden inversion). (R) → (S).",
  },
  {
    id: "e44",
    questionType: "assertion",
    topic: "Haloalkanes",
    difficulty: "hard",
    question:
      "Assertion (A): Tertiary alkyl halides preferably undergo SN1 reactions.\nReason (R): Tertiary carbocations are more stable due to hyperconjugation and inductive effect.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "Tertiary RX → stable 3° carbocation (SN1) via hyperconjugation. SN2 is sterically hindered at 3° carbon.",
  },

  // ── Alcohols Phenols Ethers ─────────────────────────────────────────────
  {
    id: "e45",
    questionType: "mcq",
    topic: "Alcohols Phenols Ethers",
    difficulty: "easy",
    question:
      "Which reagent converts a primary alcohol to an aldehyde (no over-oxidation)?",
    options: [
      "KMnO₄",
      "PCC (Pyridinium chlorochromate)",
      "K₂Cr₂O₇/H⁺",
      "H₂/Ni",
    ],
    correctAnswer: "PCC (Pyridinium chlorochromate)",
    explanation:
      "PCC in CH₂Cl₂ oxidizes primary alcohols to aldehydes and stops. KMnO₄/K₂Cr₂O₇ over-oxidize to carboxylic acids.",
  },

  // ── Aldehydes Ketones ───────────────────────────────────────────────────
  {
    id: "e46",
    questionType: "mcq",
    topic: "Aldehydes Ketones",
    difficulty: "medium",
    question: "Which test distinguishes aldehydes from ketones?",
    options: [
      "Reaction with LiAlH₄",
      "Tollens' test",
      "Reaction with HCN",
      "Reaction with NaBH₄",
    ],
    correctAnswer: "Tollens' test",
    explanation:
      "Tollens' test: aldehydes reduce [Ag(NH₃)₂]⁺ → silver mirror. Ketones do not react.",
  },
  {
    id: "e47",
    questionType: "assertion",
    topic: "Aldehydes Ketones",
    difficulty: "hard",
    question:
      "Assertion (A): Acetaldehyde gives iodoform test but acetone does not.\nReason (R): Iodoform test requires CH₃CO- group or CH₃CH(OH)- group.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer: "A is false but R is true",
    explanation:
      "Both acetaldehyde and acetone give iodoform test — both have CH₃CO- group. A is false. R's general rule is correct.",
  },

  // ── Amines ──────────────────────────────────────────────────────────────
  {
    id: "e48",
    questionType: "mcq",
    topic: "Amines",
    difficulty: "easy",
    question: "Basicity order of aliphatic amines in aqueous solution is:",
    options: ["1°>2°>3°>NH₃", "3°>2°>1°>NH₃", "2°>1°>3°>NH₃", "NH₃>1°>2°>3°"],
    correctAnswer: "2°>1°>3°>NH₃",
    explanation:
      "In aqueous solution: 2° > 1° > 3° > NH₃ for aliphatic amines (steric vs. solvation balance).",
  },

  // ── Biomolecules ────────────────────────────────────────────────────────
  {
    id: "e49",
    questionType: "mcq",
    topic: "Biomolecules",
    difficulty: "easy",
    question: "The bond linking two amino acids in a protein is called:",
    options: ["Glycosidic bond", "Peptide bond", "Ester bond", "Hydrogen bond"],
    correctAnswer: "Peptide bond",
    explanation:
      "Peptide bond: condensation between -COOH of one amino acid and -NH₂ of another, releasing water.",
  },
  {
    id: "e50",
    questionType: "assertion",
    topic: "Biomolecules",
    difficulty: "medium",
    question:
      "Assertion (A): Enzymes are biocatalysts.\nReason (R): Enzymes are proteins that increase the rate of biochemical reactions without being consumed.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "Enzymes are protein catalysts for biological reactions. They lower activation energy and are regenerated → biocatalysts.",
  },

  // ── Polymers ────────────────────────────────────────────────────────────
  {
    id: "e51",
    questionType: "mcq",
    topic: "Polymers",
    difficulty: "easy",
    question: "Nylon-6,6 is an example of:",
    options: [
      "Addition polymer",
      "Condensation polymer",
      "Natural polymer",
      "Biopolymer",
    ],
    correctAnswer: "Condensation polymer",
    explanation:
      "Nylon-6,6 formed by condensation of hexamethylenediamine + adipic acid with elimination of water.",
  },
  {
    id: "e52",
    questionType: "mcq",
    topic: "Polymers",
    difficulty: "medium",
    question: "Buna-S is a copolymer of:",
    options: [
      "Styrene and acrylonitrile",
      "Butadiene and styrene",
      "Isoprene and styrene",
      "Butadiene and acrylonitrile",
    ],
    correctAnswer: "Butadiene and styrene",
    explanation:
      "Buna-S (SBR) = 1,3-butadiene + styrene copolymer. Used for tyres.",
  },

  // ── Organic Chemistry Basics ────────────────────────────────────────────
  {
    id: "e53",
    questionType: "mcq",
    topic: "Organic Chemistry Basics",
    difficulty: "easy",
    question: "The hybridization of carbon in ethyne (C₂H₂) is:",
    options: ["sp³", "sp²", "sp", "dsp²"],
    correctAnswer: "sp",
    explanation:
      "Ethyne has a triple bond (C≡C). Each carbon forms 2 sigma bonds → sp hybridization.",
  },
  {
    id: "e54",
    questionType: "mcq",
    topic: "Organic Chemistry Basics",
    difficulty: "medium",
    question: "Markovnikov's rule: in addition to alkenes, H adds to:",
    options: [
      "The less substituted carbon",
      "The more substituted carbon",
      "Both carbons equally",
      "The carbon bearing halogen",
    ],
    correctAnswer: "The more substituted carbon",
    explanation:
      "Markovnikov: H adds to carbon with more H atoms (more substituted) → more stable carbocation intermediate.",
  },
  {
    id: "e55",
    questionType: "assertion",
    topic: "Organic Chemistry Basics",
    difficulty: "hard",
    question:
      "Assertion (A): Carboxylic acids are more acidic than alcohols.\nReason (R): The carboxylate anion is stabilized by resonance.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "RCOOH (pKa ~5) >> ROH (pKa ~16). Resonance delocalizes charge in RCOO⁻ → higher stability → stronger acid.",
  },

  // ── Hydrocarbons ────────────────────────────────────────────────────────
  {
    id: "e56",
    questionType: "mcq",
    topic: "Hydrocarbons",
    difficulty: "easy",
    question: "Benzene undergoes which type of reaction preferentially?",
    options: [
      "Addition",
      "Elimination",
      "Electrophilic Substitution",
      "Nucleophilic Substitution",
    ],
    correctAnswer: "Electrophilic Substitution",
    explanation:
      "Benzene prefers electrophilic aromatic substitution (EAS) to maintain aromaticity.",
  },
  {
    id: "e57",
    questionType: "mcq",
    topic: "Hydrocarbons",
    difficulty: "medium",
    question:
      "Product of ozonolysis of CH₂=CH₂ followed by reductive workup is:",
    options: [
      "Ethanol",
      "Formaldehyde (methanal)",
      "Acetaldehyde",
      "Acetic acid",
    ],
    correctAnswer: "Formaldehyde (methanal)",
    explanation:
      "Ozonolysis of ethylene cleaves the double bond → 2 HCHO (formaldehyde).",
  },
  {
    id: "e58",
    questionType: "assertion",
    topic: "Hydrocarbons",
    difficulty: "hard",
    question:
      "Assertion (A): All alkanes are saturated hydrocarbons.\nReason (R): Alkanes contain only C-C and C-H single bonds.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "Alkanes (CnH₂n+₂) have only single bonds (saturated). R correctly explains A.",
  },

  // ── Hydrogen ────────────────────────────────────────────────────────────
  {
    id: "e59",
    questionType: "mcq",
    topic: "Hydrogen",
    difficulty: "easy",
    question: "The mass number of deuterium is:",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    explanation: "Deuterium (²H) has 1 proton + 1 neutron → mass number = 2.",
  },
  {
    id: "e60",
    questionType: "mcq",
    topic: "Hydrogen",
    difficulty: "medium",
    question: "Which is NOT a use of hydrogen peroxide (H₂O₂)?",
    options: [
      "Hair bleaching",
      "Water purification",
      "Manufacture of chlorine gas",
      "Rocket propellant",
    ],
    correctAnswer: "Manufacture of chlorine gas",
    explanation:
      "H₂O₂ is used for bleaching, purification, and as rocket propellant. Cl₂ is made by electrolysis of brine.",
  },

  // ── s-Block Elements ────────────────────────────────────────────────────
  {
    id: "e61",
    questionType: "mcq",
    topic: "s-Block Elements",
    difficulty: "easy",
    question: "Which alkali metal reacts most vigorously with water?",
    options: ["Lithium", "Sodium", "Potassium", "Caesium"],
    correctAnswer: "Caesium",
    explanation:
      "Reactivity increases down Group 1: Li < Na < K < Rb < Cs. Caesium reacts explosively with water.",
  },
  {
    id: "e62",
    questionType: "assertion",
    topic: "s-Block Elements",
    difficulty: "hard",
    question:
      "Assertion (A): Lithium shows anomalous behaviour among alkali metals.\nReason (R): Lithium has the smallest size and highest charge density among Group 1 metals.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "Li has smallest ionic radius → highest charge/size ratio → anomalous properties (diagonal relationship with Mg).",
  },

  // ── p-Block Elements ────────────────────────────────────────────────────
  {
    id: "e63",
    questionType: "mcq",
    topic: "p-Block Elements",
    difficulty: "medium",
    question: "The oxide of nitrogen used as 'laughing gas' (anaesthetic) is:",
    options: ["NO", "NO₂", "N₂O", "N₂O₅"],
    correctAnswer: "N₂O",
    explanation:
      "N₂O (nitrous oxide) is 'laughing gas' and is used as an anaesthetic/analgesic.",
  },
  {
    id: "e64",
    questionType: "assertion",
    topic: "p-Block Elements",
    difficulty: "hard",
    question:
      "Assertion (A): HF is a weaker acid than HCl in aqueous solution.\nReason (R): The H-F bond is stronger than H-Cl due to smaller size of F.",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true",
      "Both A and R are false",
    ],
    correctAnswer:
      "Both A and R are true and R is the correct explanation of A",
    explanation:
      "HF is a weak acid (pKa≈3.2) vs HCl (strong acid). H-F bond (~568 kJ/mol) >> H-Cl (~432 kJ/mol) → harder to ionize.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getQuestionsForChapter(
  chapter: ExamChapter,
  count: number,
): QuizQuestion[] {
  const pool = EXAM_QUESTIONS.filter((q) => q.topic === chapter);
  const source =
    pool.length >= count
      ? pool
      : [
          ...pool,
          ...EXAM_QUESTIONS.filter((q) => q.topic !== chapter).sort(
            () => Math.random() - 0.5,
          ),
        ];
  return source.sort(() => Math.random() - 0.5).slice(0, count);
}

function formatTime(s: number): string {
  return `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

// ── Circular Progress Ring ────────────────────────────────────────────────────

const CircularProgress = memo(function CircularProgress({
  percentage,
  size = 140,
  strokeWidth = 12,
  color = "oklch(0.72 0.18 250)",
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percentage / 100) * circ;
  return (
    <svg
      width={size}
      height={size}
      className="rotate-[-90deg]"
      role="img"
      aria-label={`${percentage}% score`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
      />
    </svg>
  );
});

// ── Stat Box ──────────────────────────────────────────────────────────────────

function StatBox({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="glass rounded-xl p-3.5 flex items-center gap-3 border border-white/5">
      <span className={color}>{icon}</span>
      <div>
        <div
          className={`font-display font-bold text-lg leading-tight ${color}`}
        >
          {value}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

// ── Config Screen ─────────────────────────────────────────────────────────────

function ConfigScreen({
  config,
  setConfig,
  onStart,
}: {
  config: ExamConfig;
  setConfig: (c: ExamConfig) => void;
  onStart: () => void;
}) {
  return (
    <div className="min-h-screen px-4 py-12" data-ocid="exam.config_page">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-primary/15 border border-primary/30">
              <Trophy className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Exam Mode
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Chapter-wise timed exams with performance analysis
              </p>
            </div>
          </div>

          {/* Chapter selector */}
          <div className="glass-card rounded-2xl p-6 mb-5">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" /> Select Chapter
            </h2>
            {[
              {
                label: "Class 11",
                chapters: CLASS_11_CHAPTERS,
                colorClass: "text-blue-400",
                badgeClass: "bg-blue-500/20 border-blue-400/30",
              },
              {
                label: "Class 12",
                chapters: CLASS_12_CHAPTERS,
                colorClass: "text-violet-400",
                badgeClass: "bg-violet-500/20 border-violet-400/30",
              },
            ].map(({ label, chapters, colorClass, badgeClass }) => (
              <div key={label} className="mb-5 last:mb-0">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${badgeClass} ${colorClass}`}
                  >
                    {label.split(" ")[1]}
                  </span>
                  {label}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {chapters.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setConfig({ ...config, chapter: ch })}
                      className={cn(
                        "px-3.5 py-2.5 rounded-xl text-sm text-left font-medium transition-all duration-200 border",
                        config.chapter === ch
                          ? "bg-primary/20 border-primary/50 text-primary shadow-sm shadow-primary/20"
                          : "bg-white/[0.03] border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground",
                      )}
                      data-ocid={`exam.chapter.${ch.replace(/\s+/g, "_").toLowerCase()}`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Duration + count */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" /> Duration
              </h3>
              <div className="space-y-2">
                {([15, 30, 45, 60] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setConfig({ ...config, durationMinutes: d })}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border flex items-center gap-2",
                      config.durationMinutes === d
                        ? "bg-accent/20 border-accent/50 text-accent"
                        : "bg-white/[0.03] border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground",
                    )}
                    data-ocid={`exam.duration_${d}`}
                  >
                    <Clock className="w-3.5 h-3.5 opacity-60" /> {d} min
                  </button>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 text-sm">
                Questions
              </h3>
              <div className="space-y-2">
                {([10, 20, 30] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setConfig({ ...config, questionCount: n })}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border",
                      config.questionCount === n
                        ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-400"
                        : "bg-white/[0.03] border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground",
                    )}
                    data-ocid={`exam.count_${n}`}
                  >
                    {n} Questions
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="glass-card rounded-2xl p-5 mb-6 border border-primary/20 bg-primary/5">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Exam Summary
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">
                  Chapter
                </div>
                <div className="font-semibold text-foreground text-sm leading-tight">
                  {config.chapter}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">
                  Duration
                </div>
                <div className="font-semibold text-accent text-sm">
                  {config.durationMinutes} min
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">
                  Questions
                </div>
                <div className="font-semibold text-emerald-400 text-sm">
                  {config.questionCount}
                </div>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300"
            data-ocid="exam.start_button"
          >
            Start Exam →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Result Screen ─────────────────────────────────────────────────────────────

function ResultScreen({
  result,
  reviewMode,
  setReviewMode,
  onRetake,
}: {
  result: ExamResult;
  reviewMode: boolean;
  setReviewMode: (v: boolean) => void;
  onRetake: () => void;
}) {
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const mins = Math.floor(result.timeTakenSeconds / 60);
  const secs = result.timeTakenSeconds % 60;

  const scoreColor =
    result.percentage >= 80
      ? "oklch(0.72 0.18 145)"
      : result.percentage >= 50
        ? "oklch(0.78 0.18 70)"
        : "oklch(0.68 0.22 25)";

  const scoreLabel =
    result.percentage >= 80
      ? "Excellent!"
      : result.percentage >= 60
        ? "Good job!"
        : result.percentage >= 40
          ? "Keep practicing!"
          : "Needs improvement";

  return (
    <div className="min-h-screen px-4 py-10" data-ocid="exam.result_page">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
              className="inline-flex p-4 rounded-full bg-primary/15 border border-primary/30 mb-4"
            >
              <Trophy className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-1">
              Exam Complete!
            </h1>
            <p className="text-muted-foreground">
              {result.chapter} · {scoreLabel}
            </p>
          </div>

          {/* Score ring */}
          <div className="glass-card rounded-2xl p-6 mb-5">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0" data-ocid="exam.score_ring">
                <CircularProgress
                  percentage={result.percentage}
                  color={scoreColor}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {result.percentage}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {result.score}/{result.maxScore}
                  </span>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                <StatBox
                  label="Correct"
                  value={result.correct}
                  color="text-green-400"
                  icon={<CheckCircle className="w-4 h-4" />}
                />
                <StatBox
                  label="Incorrect"
                  value={result.incorrect}
                  color="text-red-400"
                  icon={<XCircle className="w-4 h-4" />}
                />
                <StatBox
                  label="Unattempted"
                  value={result.unattempted}
                  color="text-muted-foreground"
                  icon={<AlertTriangle className="w-4 h-4" />}
                />
                <StatBox
                  label="Accuracy"
                  value={`${result.accuracy}%`}
                  color="text-accent"
                  icon={<Trophy className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>

          {/* Time + type breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" /> Time Analysis
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time taken</span>
                  <span className="text-foreground font-semibold">
                    {mins}m {secs}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allotted</span>
                  <span className="text-foreground font-medium">
                    {result.config.durationMinutes} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Avg per question
                  </span>
                  <span className="text-foreground font-medium">
                    {result.attempted > 0
                      ? `${Math.round(result.timeTakenSeconds / result.attempted)}s`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 text-sm">
                By Question Type
              </h3>
              <div className="space-y-3">
                {(["mcq", "numerical", "assertion"] as const).map((type) => {
                  const bd = result.breakdownByType[type];
                  if (bd.total === 0) return null;
                  const pct =
                    bd.total > 0
                      ? Math.round((bd.correct / bd.total) * 100)
                      : 0;
                  return (
                    <div key={type}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground capitalize">
                          {type === "assertion"
                            ? "Assertion-Reason"
                            : type.toUpperCase()}
                        </span>
                        <span className="text-foreground font-medium">
                          {bd.correct}/{bd.total} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setReviewMode(!reviewMode)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 border",
                reviewMode
                  ? "bg-accent/20 border-accent/50 text-accent"
                  : "glass border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground",
              )}
              data-ocid="exam.review_button"
            >
              <BookOpen className="w-4 h-4" />
              {reviewMode ? "Hide Review" : "Review Answers"}
            </button>
            <button
              type="button"
              onClick={onRetake}
              className="flex-1 py-3 rounded-xl glass border border-white/10 text-sm font-semibold text-muted-foreground hover:border-white/25 hover:text-foreground transition-all duration-200 flex items-center justify-center gap-2"
              data-ocid="exam.retake_button"
            >
              <RotateCcw className="w-4 h-4" /> New Exam
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="flex-1 py-3 rounded-xl glass border border-white/10 text-sm font-semibold text-muted-foreground hover:border-white/25 hover:text-foreground transition-all duration-200 flex items-center justify-center gap-2"
              data-ocid="exam.home_button"
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </button>
          </div>

          {/* Question review */}
          <AnimatePresence>
            {reviewMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
                data-ocid="exam.review_section"
              >
                <h3 className="font-semibold text-foreground text-sm mb-2">
                  Question Review
                </h3>
                {result.questionResults.map((qr, idx) => (
                  <motion.div
                    key={qr.questionId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.04, 0.8) }}
                    className={cn(
                      "glass-card rounded-2xl border overflow-hidden",
                      qr.isCorrect
                        ? "border-green-400/25"
                        : qr.userAnswer !== null
                          ? "border-red-400/25"
                          : "border-white/10",
                    )}
                    data-ocid={`exam.review_item.${idx + 1}`}
                  >
                    <button
                      type="button"
                      className="w-full px-5 py-4 flex items-center gap-3 text-left"
                      onClick={() =>
                        setExpandedQ(
                          expandedQ === qr.questionId ? null : qr.questionId,
                        )
                      }
                    >
                      <span
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                          qr.isCorrect
                            ? "bg-green-500/20"
                            : qr.userAnswer !== null
                              ? "bg-red-500/20"
                              : "bg-white/10",
                        )}
                      >
                        {qr.isCorrect ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        ) : qr.userAnswer !== null ? (
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                        ) : (
                          <span className="text-xs text-muted-foreground font-bold">
                            —
                          </span>
                        )}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground shrink-0">
                        Q{idx + 1}
                      </span>
                      <span className="text-sm text-foreground line-clamp-1 flex-1">
                        {qr.question.split("\n")[0]}
                      </span>
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
                          expandedQ === qr.questionId && "rotate-90",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedQ === qr.questionId && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="px-5 pb-5 border-t border-white/5"
                        >
                          <p className="text-sm text-foreground/90 mt-3 whitespace-pre-line leading-relaxed mb-3">
                            {qr.question}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs mb-3">
                            <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-400/25 font-medium">
                              ✓ {qr.correctAnswer}
                            </span>
                            {qr.userAnswer &&
                              qr.userAnswer !== qr.correctAnswer && (
                                <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-400/25 font-medium">
                                  ✗ {qr.userAnswer}
                                </span>
                              )}
                            {qr.userAnswer === null && (
                              <span className="px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10 font-medium">
                                Not attempted
                              </span>
                            )}
                          </div>
                          <div className="p-3.5 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground/85 leading-relaxed">
                            <span className="font-semibold text-accent">
                              Explanation:{" "}
                            </span>
                            {qr.explanation}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ── Main Exam Page ────────────────────────────────────────────────────────────

type ExamPhase = "config" | "exam" | "result";

export function ExamModePage() {
  const [phase, setPhase] = useState<ExamPhase>("config");
  const [config, setConfig] = useState<ExamConfig>({
    chapter: "Atomic Structure",
    durationMinutes: 30,
    questionCount: 20,
  });
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(
    new Set(),
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const addExamResult = useChemStore((s) => s.addExamResult);

  const submitExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const questionResults: ExamQuestionResult[] = questions.map((q) => {
      const ua = answers[q.id] ?? null;
      const isCorrect =
        ua !== null &&
        ua.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      return {
        questionId: q.id,
        questionType: q.questionType,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: ua,
        isCorrect,
        isMarkedForReview: markedForReview.has(q.id),
        explanation: q.explanation,
      };
    });
    const attempted = questionResults.filter(
      (r) => r.userAnswer !== null,
    ).length;
    const correct = questionResults.filter((r) => r.isCorrect).length;
    const byType = (type: string) => {
      const qs = questionResults.filter((r) => r.questionType === type);
      return {
        total: qs.length,
        attempted: qs.filter((r) => r.userAnswer !== null).length,
        correct: qs.filter((r) => r.isCorrect).length,
      };
    };
    const examResult: ExamResult = {
      id: `exam-${Date.now()}`,
      chapter: config.chapter,
      config,
      startedAt: startTimeRef.current,
      completedAt: Date.now(),
      timeTakenSeconds: timeTaken,
      totalQuestions: questions.length,
      attempted,
      correct,
      incorrect: attempted - correct,
      unattempted: questions.length - attempted,
      score: correct,
      maxScore: questions.length,
      percentage: Math.round((correct / Math.max(questions.length, 1)) * 100),
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
      breakdownByType: {
        mcq: byType("mcq"),
        numerical: byType("numerical"),
        assertion: byType("assertion"),
      },
      questionResults,
    };
    addExamResult(examResult);
    setResult(examResult);
    setPhase("result");
  }, [questions, answers, markedForReview, config, addExamResult]);

  const startExam = useCallback(() => {
    const qs = getQuestionsForChapter(config.chapter, config.questionCount);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers({});
    setMarkedForReview(new Set());
    setTimeLeft(config.durationMinutes * 60);
    startTimeRef.current = Date.now();
    setPhase("exam");
  }, [config]);

  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setTimeout(submitExam, 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, submitExam]);

  const answered = useMemo(
    () =>
      Object.values(answers).filter(
        (v) => v !== null && v !== undefined && v !== "",
      ).length,
    [answers],
  );
  const isAnswered = useCallback(
    (id: string) => {
      const v = answers[id];
      return v !== null && v !== undefined && v !== "";
    },
    [answers],
  );

  if (phase === "config")
    return (
      <ConfigScreen config={config} setConfig={setConfig} onStart={startExam} />
    );
  if (phase === "result" && result)
    return (
      <ResultScreen
        result={result}
        reviewMode={reviewMode}
        setReviewMode={setReviewMode}
        onRetake={() => {
          setPhase("config");
          setResult(null);
          setReviewMode(false);
        }}
      />
    );

  const q = questions[currentIdx];
  if (!q) return null;

  const urgentTime = timeLeft <= 60;

  return (
    <div className="min-h-screen pb-10" data-ocid="exam.page">
      {/* Sticky header with timer */}
      <div className="sticky top-0 z-30 glass border-b border-white/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="w-5 h-5 text-accent shrink-0" />
            <div className="min-w-0">
              <div className="font-display font-semibold text-sm text-foreground truncate">
                {config.chapter}
              </div>
              <div className="text-xs text-muted-foreground">
                {config.questionCount} questions · {config.durationMinutes} min
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold transition-all duration-500",
              urgentTime
                ? "bg-red-500/20 text-red-400 border border-red-400/40 animate-pulse"
                : "glass text-foreground",
            )}
            data-ocid="exam.timer"
          >
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
            data-ocid="exam.submit_button"
          >
            Submit
          </button>
        </div>
        <div className="max-w-5xl mx-auto mt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>
              {answered}/{questions.length} answered
            </span>
            <span>
              Q{currentIdx + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{
                width: `${(answered / Math.max(questions.length, 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        {/* Question panel */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-6 mb-4"
              data-ocid="exam.question_panel"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/30">
                    Q{currentIdx + 1}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-muted-foreground capitalize">
                    {q.questionType === "assertion"
                      ? "Assertion-Reason"
                      : q.questionType.toUpperCase()}
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium capitalize border",
                      q.difficulty === "easy"
                        ? "bg-green-500/10 text-green-400 border-green-400/30"
                        : q.difficulty === "medium"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-400/30"
                          : "bg-red-500/10 text-red-400 border-red-400/30",
                    )}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setMarkedForReview((prev) => {
                      const n = new Set(prev);
                      n.has(q.id) ? n.delete(q.id) : n.add(q.id);
                      return n;
                    })
                  }
                  className={cn(
                    "p-2 rounded-xl transition-all duration-200 shrink-0 border",
                    markedForReview.has(q.id)
                      ? "bg-amber-500/20 text-amber-400 border-amber-400/40"
                      : "glass text-muted-foreground border-white/10 hover:text-foreground",
                  )}
                  aria-label="Mark for review"
                  data-ocid="exam.flag_button"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>

              <p className="text-foreground leading-relaxed mb-6 whitespace-pre-line font-medium">
                {q.question}
              </p>

              {/* MCQ */}
              {q.questionType === "mcq" && (
                <div className="space-y-3" data-ocid="exam.options">
                  {q.options.map((opt, oi) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                      }
                      className={cn(
                        "w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3",
                        answers[q.id] === opt
                          ? "border-primary/60 bg-primary/15 text-foreground"
                          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground hover:bg-white/5",
                      )}
                      data-ocid={`exam.option.${oi + 1}`}
                    >
                      <span
                        className={cn(
                          "w-7 h-7 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 transition-all duration-200",
                          answers[q.id] === opt
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-white/20 text-muted-foreground",
                        )}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Assertion-Reason */}
              {q.questionType === "assertion" && (
                <div className="space-y-2.5" data-ocid="exam.assertion_options">
                  {q.options.map((opt, oi) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                      }
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3",
                        answers[q.id] === opt
                          ? "border-violet-400/60 bg-violet-500/15 text-foreground"
                          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground hover:bg-white/5",
                      )}
                      data-ocid={`exam.assertion_option.${oi + 1}`}
                    >
                      <span
                        className={cn(
                          "w-7 h-7 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 flex-none transition-all duration-200",
                          answers[q.id] === opt
                            ? "border-violet-400 bg-violet-500/30 text-violet-300"
                            : "border-white/20 text-muted-foreground",
                        )}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="text-sm leading-snug">{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Numerical */}
              {q.questionType === "numerical" && (
                <div data-ocid="exam.numerical_input">
                  <label
                    htmlFor="exam-numerical-answer"
                    className="text-sm text-muted-foreground mb-2 block"
                  >
                    Enter your answer:
                  </label>
                  <input
                    id="exam-numerical-answer"
                    type="text"
                    value={answers[q.id] ?? ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value || null,
                      }))
                    }
                    placeholder="Type numerical value here..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    data-ocid="exam.numerical_text_input"
                  />
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Enter numerical value only (e.g., 2 or 0.5)
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-sm font-medium disabled:opacity-40 hover:border-white/25 transition-all duration-200"
              data-ocid="exam.prev_button"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm text-muted-foreground mx-auto font-mono">
              {currentIdx + 1} / {questions.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))
              }
              disabled={currentIdx === questions.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-sm font-medium disabled:opacity-40 hover:border-white/25 transition-all duration-200"
              data-ocid="exam.next_button"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question palette */}
        <aside
          className="glass-card rounded-2xl p-4 h-fit lg:sticky lg:top-[124px]"
          data-ocid="exam.question_palette"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Question Navigator
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {questions.map((qq, idx) => (
              <button
                key={qq.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200 border",
                  idx === currentIdx
                    ? "bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30"
                    : markedForReview.has(qq.id)
                      ? "bg-amber-500/20 border-amber-400/50 text-amber-400"
                      : isAnswered(qq.id)
                        ? "bg-green-500/20 border-green-400/40 text-green-400"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground",
                )}
                data-ocid={`exam.palette_button.${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="space-y-1.5 text-xs border-t border-white/5 pt-3">
            {[
              { cls: "bg-green-500/20 border-green-400/40", label: "Answered" },
              { cls: "bg-white/5 border-white/10", label: "Not attempted" },
              {
                cls: "bg-amber-500/20 border-amber-400/50",
                label: "Marked for review",
              },
              { cls: "bg-primary border-primary", label: "Current" },
            ].map(({ cls, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded border ${cls} shrink-0`} />
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Confirm dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            data-ocid="exam.dialog"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-6 max-w-sm w-full border border-white/15"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg">
                  Submit Exam?
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                You have answered{" "}
                <span className="text-foreground font-semibold">
                  {answered}
                </span>{" "}
                of{" "}
                <span className="text-foreground font-semibold">
                  {questions.length}
                </span>{" "}
                questions.
              </p>
              {answered < questions.length && (
                <p className="text-amber-400/80 text-xs mb-1">
                  ⚠ {questions.length - answered} question(s) will be marked
                  unattempted.
                </p>
              )}
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-sm font-medium hover:border-white/25 transition-all duration-200"
                  data-ocid="exam.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirm(false);
                    submitExam();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  data-ocid="exam.confirm_button"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
