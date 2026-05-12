import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, d as BookOpen, l as AnimatePresence, h as cn, S as Search, X, k as Star, g as ChevronDown, x as ue, L as Lightbulb } from "./index-DyyHqAHL.js";
import { C as Copy } from "./copy-D7KhPyvO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const CLASS11_CATEGORIES = [
  {
    id: "mole",
    title: "Mole Concept",
    color: "from-cyan-400/20 to-blue-400/20 border-cyan-400/30",
    formulas: [
      {
        id: "mole-1",
        formula: "n = m / M",
        name: "Moles from Mass",
        category: "Mole Concept",
        class: "11",
        explanation: "Number of moles equals mass divided by molar mass. n is moles (mol), m is mass (g), M is molar mass (g/mol).",
        variables: "n = moles, m = mass (g), M = molar mass (g/mol)",
        keywords: ["moles", "concentration", "stoichiometry"],
        quickSolveParams: ["n", "m", "M"],
        derivation: [
          "1. By definition, 1 mole = the amount containing Avogadro's number of particles.",
          "2. The molar mass M is the mass of exactly 1 mole of a substance (in g/mol).",
          "3. Therefore, if you have m grams of a substance with molar mass M, the number of moles = m ÷ M.",
          "4. This gives: n = m / M"
        ],
        useCases: [
          "Stoichiometry calculations in chemical reactions",
          "Preparing solutions of exact concentration",
          "Industrial synthesis — scaling up lab reactions",
          "Pharmaceutical dose calculations"
        ],
        examples: [
          {
            problem: "Find moles in 18 g of water (M = 18 g/mol).",
            solution: "n = 18 / 18 = 1 mol"
          },
          {
            problem: "Find moles in 44 g of CO₂ (M = 44 g/mol).",
            solution: "n = 44 / 44 = 1 mol"
          }
        ]
      },
      {
        id: "mole-2",
        formula: "N = n × Nₐ",
        name: "Number of Particles",
        category: "Mole Concept",
        class: "11",
        explanation: "Total number of particles equals moles multiplied by Avogadro's number (6.022 × 10²³ mol⁻¹).",
        variables: "N = number of particles, Nₐ = 6.022 × 10²³ mol⁻¹",
        keywords: ["avogadro", "particles", "atoms", "molecules"],
        derivation: [
          "1. Avogadro's number Nₐ = 6.022 × 10²³ — defined as the number of atoms in 12 g of C-12.",
          "2. One mole of any substance contains exactly Nₐ particles.",
          "3. Therefore, n moles contain n × Nₐ particles.",
          "4. N = n × 6.022 × 10²³"
        ],
        useCases: [
          "Calculating atoms in a sample",
          "Nanoscience and surface chemistry",
          "Radiation dose calculations (radioactive isotopes)"
        ],
        examples: [
          {
            problem: "How many molecules in 2 mol of H₂O?",
            solution: "N = 2 × 6.022×10²³ = 1.204×10²⁴ molecules"
          }
        ]
      },
      {
        id: "mole-3",
        formula: "V_STP = 22.4 L/mol",
        name: "Molar Volume at STP",
        category: "Mole Concept",
        class: "11",
        explanation: "One mole of any ideal gas occupies 22.4 litres at Standard Temperature and Pressure (0°C, 1 atm).",
        variables: "Valid for ideal gases at STP (0°C, 1 atm)",
        keywords: ["gas", "volume", "STP", "molar volume"],
        derivation: [
          "1. From ideal gas law: PV = nRT.",
          "2. At STP: T = 273.15 K, P = 1 atm, R = 0.0821 L·atm/mol·K.",
          "3. V/n = RT/P = (0.0821 × 273.15) / 1 = 22.4 L/mol."
        ],
        useCases: [
          "Measuring gas volumes in labs without weighing",
          "Industrial gas storage calculations",
          "Respiratory gas exchange in biology"
        ],
        examples: [
          {
            problem: "What volume does 0.5 mol N₂ occupy at STP?",
            solution: "V = 0.5 × 22.4 = 11.2 L"
          }
        ]
      },
      {
        id: "mole-4",
        formula: "M = n / V(L)",
        name: "Molarity",
        category: "Mole Concept",
        class: "11",
        explanation: "Molarity is the number of moles of solute per litre of solution. Measures concentration.",
        variables: "M = molarity (mol/L), n = moles, V = volume (L)",
        keywords: ["concentration", "solution", "molarity", "molar"],
        quickSolveParams: ["M", "n", "V"],
        derivation: [
          "1. Concentration describes how much solute is dissolved in a given volume.",
          "2. Most convenient unit: moles per litre (mol/L), called molarity.",
          "3. M = n_solute / V_solution(L)"
        ],
        useCases: [
          "Preparing lab reagents (e.g. 1 M HCl)",
          "Clinical blood chemistry (serum glucose in mmol/L)",
          "Industrial process control"
        ],
        examples: [
          {
            problem: "0.5 mol NaCl dissolved in 500 mL. Find molarity.",
            solution: "M = 0.5 / 0.5 = 1 mol/L"
          }
        ]
      },
      {
        id: "mole-5",
        formula: "m = n_solute / kg_solvent",
        name: "Molality",
        category: "Mole Concept",
        class: "11",
        explanation: "Molality is moles of solute per kilogram of solvent. Unlike molarity, it is temperature-independent.",
        variables: "m = molality (mol/kg), n = moles of solute",
        keywords: [
          "colligative",
          "boiling point",
          "freezing point",
          "molality"
        ],
        quickSolveParams: ["m", "n", "kg"],
        useCases: [
          "Colligative property calculations (boiling point elevation, freezing point depression)",
          "Cryoscopy and ebullioscopy in labs"
        ],
        examples: [
          {
            problem: "1 mol glucose in 500 g water. Find molality.",
            solution: "m = 1 / 0.5 = 2 mol/kg"
          }
        ]
      },
      {
        id: "mole-6",
        formula: "χ_A = n_A / (n_A + n_B)",
        name: "Mole Fraction",
        category: "Mole Concept",
        class: "11",
        explanation: "Mole fraction of component A is moles of A divided by total moles. Sum of all mole fractions = 1.",
        variables: "χ_A = mole fraction of A, n_A, n_B = moles of A, B",
        keywords: ["vapour pressure", "Raoult's law", "mole fraction"],
        derivation: [
          "1. Total moles = n_A + n_B + ... for a mixture.",
          "2. Fraction contributed by component A = n_A / total moles.",
          "3. χ_A = n_A / (n_A + n_B), and χ_A + χ_B = 1."
        ],
        useCases: [
          "Raoult's Law for vapour pressure of mixtures",
          "Distillation column design",
          "Gas mixture composition analysis"
        ],
        examples: [
          {
            problem: "3 mol A + 1 mol B. Find χ_A.",
            solution: "χ_A = 3 / (3+1) = 0.75"
          }
        ]
      },
      {
        id: "mole-7",
        formula: "% mass = (m_solute / m_solution) × 100",
        name: "Mass Percentage",
        category: "Mole Concept",
        class: "11",
        explanation: "Percentage by mass is ratio of solute mass to total solution mass, as a percentage.",
        variables: "m_solute = mass of solute, m_solution = total solution mass",
        keywords: ["concentration", "percentage", "w/w"],
        useCases: [
          "Commercial acids (concentrated H₂SO₄ is ~98% by mass)",
          "Food labelling and nutrition facts",
          "Mining — ore grade expression"
        ],
        examples: [
          {
            problem: "5 g NaCl in 95 g water. Find mass%.",
            solution: "% = 5/100 × 100 = 5%"
          }
        ]
      },
      {
        id: "mole-8",
        formula: "N = n_eq / V(L)",
        name: "Normality",
        category: "Mole Concept",
        class: "11",
        explanation: "Normality is equivalent weight per litre. n-factor = number of H⁺/OH⁻ ions, electrons transferred etc.",
        variables: "N = normality, n_eq = equivalents, V = volume (L)",
        keywords: ["titration", "normality", "equivalents", "n-factor"],
        useCases: [
          "Acid-base titrations in analytical chemistry",
          "Redox titrations (KMnO₄ in acidic medium)",
          "Pharmaceutical quality control"
        ],
        examples: [
          {
            problem: "Find normality of 1 M H₂SO₄.",
            solution: "N = n-factor × M = 2 × 1 = 2 N (since H₂SO₄ donates 2 H⁺)"
          }
        ]
      },
      {
        id: "mole-9",
        formula: "ΔTb = i × Kb × m",
        name: "Boiling Point Elevation",
        category: "Mole Concept",
        class: "11",
        explanation: "Boiling point rises when a non-volatile solute is added. i = van't Hoff factor (number of particles). Kb depends on solvent.",
        variables: "ΔTb = elevation, i = van't Hoff factor, Kb = ebullioscopic constant, m = molality",
        keywords: ["colligative", "boiling point", "van't Hoff"],
        quickSolveParams: ["dTb", "i", "Kb", "m"],
        useCases: [
          "Antifreeze in car radiators (same colligative effect as freezing point depression)",
          "Pressure cooking science",
          "Molar mass determination of unknown solutes"
        ],
        examples: [
          {
            problem: "2 mol/kg glucose in water (Kb=0.52). Find ΔTb.",
            solution: "ΔTb = 1 × 0.52 × 2 = 1.04°C (glucose doesn't ionise, i=1)"
          }
        ]
      },
      {
        id: "mole-10",
        formula: "ΔTf = i × Kf × m",
        name: "Freezing Point Depression",
        category: "Mole Concept",
        class: "11",
        explanation: "A solution freezes below pure solvent's freezing point. Kf for water = 1.86 K·kg/mol.",
        variables: "ΔTf = depression, i = van't Hoff factor, Kf = cryoscopic constant, m = molality",
        keywords: ["colligative", "freezing point", "antifreeze"],
        quickSolveParams: ["dTf", "i", "Kf", "m"],
        useCases: [
          "Antifreeze in cars (ethylene glycol)",
          "Salt on icy roads",
          "Measuring molar mass of polymers"
        ],
        examples: [
          {
            problem: "1 mol/kg NaCl in water (Kf=1.86). Find ΔTf.",
            solution: "ΔTf = 2 × 1.86 × 1 = 3.72°C (NaCl gives 2 ions, i=2)"
          }
        ]
      }
    ]
  },
  {
    id: "thermo",
    title: "Thermodynamics",
    color: "from-orange-400/20 to-red-400/20 border-orange-400/30",
    formulas: [
      {
        id: "thermo-1",
        formula: "ΔH = H_products − H_reactants",
        name: "Enthalpy Change",
        category: "Thermodynamics",
        class: "11",
        explanation: "Enthalpy change of a reaction. ΔH < 0 is exothermic; ΔH > 0 is endothermic.",
        variables: "H = enthalpy (kJ/mol)",
        keywords: ["enthalpy", "exothermic", "endothermic", "heat"],
        derivation: [
          "1. Enthalpy H = U + PV, where U = internal energy, P = pressure, V = volume.",
          "2. At constant pressure: ΔH = ΔU + PΔV = q_p (heat at constant pressure).",
          "3. For a reaction: ΔH = H(products) − H(reactants).",
          "4. ΔH < 0: products have lower enthalpy → heat released (exothermic)."
        ],
        useCases: [
          "Combustion engineering (fuel energy calculations)",
          "Food calorimetry (caloric value of nutrients)",
          "Pharmaceutical stability testing"
        ],
        examples: [
          {
            problem: "H₂ + ½O₂ → H₂O: ΔH = −286 kJ/mol. Is it exo or endo?",
            solution: "ΔH < 0, so exothermic. 286 kJ released per mole of H₂O formed."
          }
        ]
      },
      {
        id: "thermo-2",
        formula: "ΔH = ΔU + Δn·R·T",
        name: "Enthalpy vs Internal Energy",
        category: "Thermodynamics",
        class: "11",
        explanation: "Relates enthalpy change to internal energy change. Δn = moles of gaseous products minus reactants.",
        variables: "ΔU = internal energy change, Δn = change in gaseous moles, R = 8.314 J/mol·K",
        keywords: ["enthalpy", "internal energy", "gas", "PV work"],
        derivation: [
          "1. H = U + PV.",
          "2. For ideal gas: PV = nRT, so PΔV = ΔnRT.",
          "3. ΔH = ΔU + Δ(PV) = ΔU + ΔnRT.",
          "4. Δn = (moles of gaseous products) − (moles of gaseous reactants)."
        ],
        useCases: [
          "Converting bomb calorimeter data (ΔU) to standard enthalpy (ΔH)",
          "Understanding PV work in reactions"
        ],
        examples: [
          {
            problem: "N₂ + 3H₂ → 2NH₃. ΔU = −85 kJ at 298 K. Find ΔH.",
            solution: "Δn = 2−4 = −2. ΔH = −85 + (−2)(8.314×10⁻³)(298) = −85 − 4.95 ≈ −89.95 kJ"
          }
        ]
      },
      {
        id: "thermo-3",
        formula: "ΔG = ΔH − T·ΔS",
        name: "Gibbs Free Energy",
        category: "Thermodynamics",
        class: "11",
        explanation: "Gibbs free energy determines spontaneity. ΔG < 0: spontaneous; ΔG = 0: equilibrium; ΔG > 0: non-spontaneous.",
        variables: "ΔG = Gibbs energy (kJ), T = temperature (K), ΔS = entropy change (J/K)",
        keywords: ["spontaneity", "gibbs", "entropy", "equilibrium"],
        quickSolveParams: ["dG", "dH", "T", "dS"],
        derivation: [
          "1. Second law: total entropy change ΔS_universe ≥ 0 for spontaneous process.",
          "2. ΔS_universe = ΔS_system + ΔS_surroundings.",
          "3. ΔS_surroundings = −ΔH/T (at constant T, P).",
          "4. −T·ΔS_universe = ΔH − TΔS ≡ ΔG; spontaneous when ΔG < 0."
        ],
        useCases: [
          "Predicting reaction feasibility without running the experiment",
          "Battery and fuel cell thermodynamics",
          "Biochemistry (ATP hydrolysis drives biosynthesis)"
        ],
        examples: [
          {
            problem: "ΔH=−100 kJ, ΔS=200 J/K, T=300 K. Find ΔG.",
            solution: "ΔG = −100 − (300×0.200) = −100 − 60 = −160 kJ. Spontaneous."
          }
        ]
      },
      {
        id: "thermo-4",
        formula: "q = m·c·ΔT",
        name: "Heat Energy",
        category: "Thermodynamics",
        class: "11",
        explanation: "Heat gained or lost = mass × specific heat capacity × temperature change.",
        variables: "q = heat (J), m = mass (g), c = specific heat (J/g·K), ΔT = temp change (K)",
        keywords: ["heat", "calorimetry", "specific heat", "temperature"],
        quickSolveParams: ["q", "m", "c", "dT"],
        useCases: [
          "Calorimetry lab experiments",
          "Solar water heating design",
          "HVAC system sizing"
        ],
        examples: [
          {
            problem: "Heat 200 g water from 25°C to 75°C (c=4.18 J/g·K).",
            solution: "q = 200 × 4.18 × 50 = 41,800 J = 41.8 kJ"
          }
        ]
      },
      {
        id: "thermo-5",
        formula: "ΔH_total = Σ(ΔH_steps)",
        name: "Hess's Law",
        category: "Thermodynamics",
        class: "11",
        explanation: "Total enthalpy change equals sum of enthalpy changes for each step. Path-independent.",
        variables: "ΔH_steps = enthalpy of each intermediate reaction",
        keywords: ["Hess", "path independent", "enthalpy cycles"],
        derivation: [
          "1. Enthalpy is a state function — its value depends only on the state, not the path.",
          "2. Therefore ΔH for A→C is the same whether it goes directly or via B.",
          "3. ΔH(A→C) = ΔH(A→B) + ΔH(B→C) regardless of actual mechanism."
        ],
        useCases: [
          "Calculating enthalpy of reactions that can't be measured directly",
          "Born-Haber cycle for lattice energy",
          "Formation enthalpies from combustion data"
        ],
        examples: [
          {
            problem: "If A→B: −50 kJ and B→C: −30 kJ, find ΔH for A→C.",
            solution: "ΔH = −50 + (−30) = −80 kJ"
          }
        ]
      },
      {
        id: "thermo-6",
        formula: "ΔS = q_rev / T",
        name: "Entropy Change",
        category: "Thermodynamics",
        class: "11",
        explanation: "Entropy change equals reversible heat divided by absolute temperature. Entropy measures disorder.",
        variables: "ΔS = entropy change (J/K), q_rev = reversible heat (J), T = temp (K)",
        keywords: ["entropy", "disorder", "reversible", "second law"],
        useCases: [
          "Phase transition calculations (melting, boiling)",
          "Refrigeration cycle analysis",
          "Understanding why reactions proceed"
        ],
        examples: [
          {
            problem: "Water melts at 273 K absorbing 6000 J/mol. Find ΔS.",
            solution: "ΔS = 6000/273 = 21.98 J/mol·K"
          }
        ]
      },
      {
        id: "thermo-7",
        formula: "ΔU = 0 (isothermal ideal gas)",
        name: "Isothermal Process",
        category: "Thermodynamics",
        class: "11",
        explanation: "For an ideal gas at constant temperature, internal energy change is zero. All absorbed heat converts to work.",
        variables: "Valid for ideal gas at constant temperature",
        keywords: ["isothermal", "ideal gas", "internal energy"],
        useCases: [
          "Isothermal compression of gases",
          "Understanding Carnot cycle stages"
        ]
      },
      {
        id: "thermo-8",
        formula: "ΔG° = −RT ln K",
        name: "Gibbs Energy and Equilibrium",
        category: "Thermodynamics",
        class: "11",
        explanation: "Standard Gibbs free energy relates to equilibrium constant K. Large −ΔG° means large K (reaction favours products).",
        variables: "R = 8.314 J/mol·K, T = temperature (K), K = equilibrium constant",
        keywords: ["equilibrium constant", "Gibbs", "spontaneous", "K"],
        quickSolveParams: ["dG0", "R", "T", "K"],
        derivation: [
          "1. At equilibrium: ΔG = 0 and Q = K.",
          "2. The general relation is ΔG = ΔG° + RT ln Q.",
          "3. At equilibrium (ΔG=0, Q=K): 0 = ΔG° + RT ln K.",
          "4. Therefore: ΔG° = −RT ln K."
        ],
        useCases: [
          "Predicting equilibrium position",
          "Biochemistry — ATP hydrolysis free energy",
          "Industrial process optimisation"
        ],
        examples: [
          {
            problem: "K=100 at 298 K. Find ΔG°.",
            solution: "ΔG° = −(8.314)(298)ln(100) = −8.314×298×4.605 ≈ −11,400 J = −11.4 kJ"
          }
        ]
      }
    ]
  },
  {
    id: "atomic",
    title: "Atomic Structure",
    color: "from-violet-400/20 to-purple-400/20 border-violet-400/30",
    formulas: [
      {
        id: "atomic-1",
        formula: "Eₙ = −13.6 / n² eV",
        name: "Bohr Energy Levels",
        category: "Atomic Structure",
        class: "11",
        explanation: "Energy of an electron in the nth orbit of hydrogen. Negative indicates bound state. E₁ = −13.6 eV (ground state).",
        variables: "Eₙ = energy of nth orbit (eV), n = principal quantum number",
        keywords: ["hydrogen", "Bohr", "energy levels", "spectrum"],
        quickSolveParams: ["En", "n"],
        derivation: [
          "1. Bohr postulated electrons orbit in fixed circular orbits with quantised angular momentum: mvr = nℏ.",
          "2. Equating centripetal force to Coulomb force: mv²/r = ke²/r².",
          "3. Solving simultaneously: rₙ = n²a₀ where a₀ = 0.529 Å.",
          "4. Total energy = KE + PE = −ke²/2r; substituting rₙ gives Eₙ = −13.6/n² eV."
        ],
        useCases: [
          "Calculating hydrogen spectral line wavelengths",
          "Laser physics — population inversion",
          "JEE/NEET spectroscopy problems"
        ],
        examples: [
          {
            problem: "Find energy of electron in n=3 of hydrogen.",
            solution: "E₃ = −13.6/9 = −1.51 eV"
          }
        ]
      },
      {
        id: "atomic-2",
        formula: "rₙ = 0.529 × n² Å",
        name: "Bohr Radius",
        category: "Atomic Structure",
        class: "11",
        explanation: "Radius of the nth orbit in hydrogen. r₁ = 0.529 Å (Bohr radius). Increases with n².",
        variables: "rₙ = radius (Å), n = principal quantum number",
        keywords: ["Bohr radius", "orbit", "radius"],
        quickSolveParams: ["rn", "n"],
        useCases: [
          "Estimating atomic size",
          "Understanding ionisation in high Rydberg states"
        ],
        examples: [
          {
            problem: "Find radius of 3rd orbit in H.",
            solution: "r₃ = 0.529 × 9 = 4.76 Å"
          }
        ]
      },
      {
        id: "atomic-3",
        formula: "E = hν = hc/λ",
        name: "Planck's Equation",
        category: "Atomic Structure",
        class: "11",
        explanation: "Energy of a photon equals Planck's constant times frequency, or hc/λ.",
        variables: "h = 6.626×10⁻³⁴ J·s, ν = frequency (Hz), λ = wavelength (m), c = 3×10⁸ m/s",
        keywords: ["photon", "Planck", "wavelength", "frequency", "light"],
        quickSolveParams: ["E", "h", "v", "lam"],
        useCases: [
          "Photoelectric effect calculations",
          "LED and laser design",
          "Spectroscopy"
        ],
        examples: [
          {
            problem: "Find energy of photon with λ = 500 nm.",
            solution: "E = (6.626×10⁻³⁴ × 3×10⁸) / (500×10⁻⁹) = 3.98×10⁻¹⁹ J"
          }
        ]
      },
      {
        id: "atomic-4",
        formula: "λ = h / (mv)",
        name: "de Broglie Wavelength",
        category: "Atomic Structure",
        class: "11",
        explanation: "Every moving particle has an associated wavelength. Explains electron waves in atoms.",
        variables: "λ = wavelength (m), h = 6.626×10⁻³⁴ J·s, m = mass (kg), v = velocity (m/s)",
        keywords: ["de Broglie", "wave-particle duality", "electron"],
        useCases: [
          "Electron microscopy (wavelength smaller than visible light)",
          "Quantum confinement in semiconductors",
          "Neutron diffraction for crystal structures"
        ],
        examples: [
          {
            problem: "Find de Broglie wavelength of electron (m=9.1×10⁻³¹ kg) moving at 10⁶ m/s.",
            solution: "λ = 6.626×10⁻³⁴ / (9.1×10⁻³¹ × 10⁶) = 7.28×10⁻¹⁰ m = 0.728 nm"
          }
        ]
      },
      {
        id: "atomic-5",
        formula: "Δx·Δp ≥ h/(4π)",
        name: "Heisenberg Uncertainty",
        category: "Atomic Structure",
        class: "11",
        explanation: "Cannot simultaneously determine exact position and momentum. Fundamental limit, not experimental.",
        variables: "Δx = position uncertainty, Δp = momentum uncertainty, h = Planck's constant",
        keywords: ["Heisenberg", "uncertainty", "quantum mechanics"],
        useCases: [
          "Explains why electrons don't spiral into nucleus",
          "Quantum tunnelling in transistors",
          "NMR linewidth analysis"
        ],
        examples: [
          {
            problem: "If Δx = 10⁻¹⁰ m, find minimum Δp.",
            solution: "Δp ≥ (6.626×10⁻³⁴)/(4π × 10⁻¹⁰) = 5.27×10⁻²⁵ kg·m/s"
          }
        ]
      },
      {
        id: "atomic-6",
        formula: "1/λ = R_H × (1/n₁² − 1/n₂²)",
        name: "Rydberg Equation",
        category: "Atomic Structure",
        class: "11",
        explanation: "Wavelength of spectral lines in hydrogen. R_H = 1.097×10⁷ m⁻¹. n₂ > n₁ for emission.",
        variables: "R_H = 1.097×10⁷ m⁻¹, n₁, n₂ = principal quantum numbers",
        keywords: ["Rydberg", "spectral lines", "hydrogen spectrum", "Balmer"],
        derivation: [
          "1. Energy difference: ΔE = −13.6(1/n₁² − 1/n₂²) eV.",
          "2. Photon energy: E = hc/λ.",
          "3. Setting equal: 1/λ = ΔE/(hc) = R_H(1/n₁² − 1/n₂²).",
          "4. R_H = me⁴/(8ε₀²h³c) = 1.097×10⁷ m⁻¹."
        ],
        useCases: [
          "Calculating wavelengths in Lyman, Balmer, Paschen series",
          "Stellar spectroscopy",
          "JEE/NEET spectroscopy problems"
        ],
        examples: [
          {
            problem: "n₁=2, n₂=3 (Balmer). Find wavelength.",
            solution: "1/λ = 1.097×10⁷(1/4−1/9) = 1.097×10⁷×5/36 → λ = 656 nm (red line)"
          }
        ]
      },
      {
        id: "atomic-7",
        formula: "Max electrons = 2n²",
        name: "Shell Capacity",
        category: "Atomic Structure",
        class: "11",
        explanation: "Maximum electrons in nth shell: n=1→2, n=2→8, n=3→18, n=4→32.",
        variables: "n = principal quantum number",
        keywords: ["electron configuration", "shells", "capacity", "quantum"],
        useCases: [
          "Writing electronic configurations",
          "Understanding periodicity of elements",
          "Predicting chemical behaviour"
        ],
        examples: [
          {
            problem: "Max electrons in M shell (n=3)?",
            solution: "2×3² = 18 electrons"
          }
        ]
      }
    ]
  },
  {
    id: "states",
    title: "States of Matter",
    color: "from-teal-400/20 to-green-400/20 border-teal-400/30",
    formulas: [
      {
        id: "states-1",
        formula: "PV = nRT",
        name: "Ideal Gas Law",
        category: "States of Matter",
        class: "11",
        explanation: "Pressure × Volume = moles × gas constant × temperature. R = 8.314 J/mol·K or 0.0821 L·atm/mol·K.",
        variables: "P = pressure, V = volume (L), n = moles, R = 8.314 J/mol·K, T = temp (K)",
        keywords: ["ideal gas", "gas law", "pressure", "volume", "temperature"],
        quickSolveParams: ["P", "V", "n", "T"],
        derivation: [
          "1. Boyle's Law: P ∝ 1/V at constant T and n.",
          "2. Charles's Law: V ∝ T at constant P and n.",
          "3. Avogadro's Law: V ∝ n at constant P and T.",
          "4. Combining: PV ∝ nT, introducing gas constant R: PV = nRT."
        ],
        useCases: [
          "Calculating gas volumes in chemical reactions",
          "Hot air balloon buoyancy",
          "Internal combustion engine analysis"
        ],
        examples: [
          {
            problem: "2 mol gas at 300 K in 10 L. Find P (atm).",
            solution: "P = nRT/V = 2×0.0821×300/10 = 4.93 atm"
          }
        ]
      },
      {
        id: "states-2",
        formula: "P₁V₁ = P₂V₂",
        name: "Boyle's Law",
        category: "States of Matter",
        class: "11",
        explanation: "At constant temperature, pressure and volume are inversely proportional.",
        variables: "P₁, V₁ = initial pressure, volume; P₂, V₂ = final",
        keywords: ["Boyle", "pressure", "volume", "isothermal"],
        quickSolveParams: ["P1", "V1", "P2", "V2"],
        useCases: ["Scuba diving depth calculations", "Syringe mechanics"],
        examples: [
          {
            problem: "1 L at 2 atm compressed to 0.5 L. New pressure?",
            solution: "P₂ = P₁V₁/V₂ = 2×1/0.5 = 4 atm"
          }
        ]
      },
      {
        id: "states-3",
        formula: "V₁/T₁ = V₂/T₂",
        name: "Charles's Law",
        category: "States of Matter",
        class: "11",
        explanation: "At constant pressure, volume is directly proportional to absolute temperature.",
        variables: "V = volume, T = temperature in Kelvin",
        keywords: ["Charles", "volume", "temperature", "isobaric"],
        useCases: ["Hot air balloons", "Gas thermometry"],
        examples: [
          {
            problem: "Gas at 300 K, 4 L. Volume at 600 K?",
            solution: "V₂ = V₁×T₂/T₁ = 4×600/300 = 8 L"
          }
        ]
      },
      {
        id: "states-4",
        formula: "P₁/T₁ = P₂/T₂",
        name: "Gay-Lussac's Law",
        category: "States of Matter",
        class: "11",
        explanation: "At constant volume, pressure is directly proportional to absolute temperature.",
        variables: "P = pressure, T = temperature (K)",
        keywords: ["Gay-Lussac", "pressure", "temperature", "isochoric"],
        useCases: ["Pressure cooker safety valves", "Tyre pressure in summer"],
        examples: [
          {
            problem: "Gas at 300 K, 2 atm. Pressure at 450 K?",
            solution: "P₂ = 2×450/300 = 3 atm"
          }
        ]
      },
      {
        id: "states-5",
        formula: "P_total = P_A + P_B + …",
        name: "Dalton's Law",
        category: "States of Matter",
        class: "11",
        explanation: "Total pressure of gas mixture = sum of partial pressures of each component.",
        variables: "P_A, P_B = partial pressures of each gas",
        keywords: ["Dalton", "partial pressure", "gas mixture"],
        useCases: [
          "Atmospheric pressure composition (N₂ + O₂ + Ar + CO₂)",
          "Diving — oxygen toxicity limits",
          "Anaesthesia gas mixtures"
        ],
        examples: [
          {
            problem: "P_N₂=0.8 atm, P_O₂=0.2 atm. Total pressure?",
            solution: "P_total = 0.8 + 0.2 = 1.0 atm"
          }
        ]
      },
      {
        id: "states-6",
        formula: "P_A = χ_A × P_total",
        name: "Partial Pressure",
        category: "States of Matter",
        class: "11",
        explanation: "Partial pressure of gas A = its mole fraction × total pressure.",
        variables: "χ_A = mole fraction of A, P_total = total pressure",
        keywords: ["partial pressure", "mole fraction"],
        useCases: ["Gas collection over water", "Respiratory physiology"],
        examples: [
          {
            problem: "χ_O₂=0.21, P_total=1 atm. Find P_O₂.",
            solution: "P_O₂ = 0.21 × 1 = 0.21 atm"
          }
        ]
      },
      {
        id: "states-7",
        formula: "(P + a/V²)(V − b) = nRT",
        name: "van der Waals Equation",
        category: "States of Matter",
        class: "11",
        explanation: "Real gas equation. 'a' corrects for intermolecular attractions; 'b' corrects for finite molecular volume.",
        variables: "a = attraction correction, b = volume correction (gas-specific constants)",
        keywords: ["van der Waals", "real gas", "intermolecular forces"],
        useCases: [
          "Accurate gas behaviour at high P or low T",
          "Liquefaction of gases",
          "Natural gas pipeline calculations"
        ],
        examples: [
          {
            problem: "At very high pressure, is ideal or van der Waals more accurate?",
            solution: "van der Waals — finite molecular volume (b term) becomes significant at high pressure."
          }
        ]
      },
      {
        id: "states-8",
        formula: "KE_avg = (3/2)k_B·T",
        name: "Average Kinetic Energy",
        category: "States of Matter",
        class: "11",
        explanation: "Average translational KE of a gas molecule. Depends only on temperature, not molar mass.",
        variables: "k_B = 1.38×10⁻²³ J/K, T = temperature (K)",
        keywords: ["kinetic theory", "kinetic energy", "temperature"],
        useCases: [
          "Maxwell-Boltzmann speed distribution",
          "Effusion rate calculations"
        ],
        examples: [
          {
            problem: "Average KE of gas molecule at 300 K?",
            solution: "KE = 1.5 × 1.38×10⁻²³ × 300 = 6.21×10⁻²¹ J"
          }
        ]
      }
    ]
  },
  {
    id: "equilibrium",
    title: "Chemical Equilibrium",
    color: "from-lime-400/20 to-emerald-400/20 border-lime-400/30",
    formulas: [
      {
        id: "eq-1",
        formula: "K_c = [C]^c[D]^d / [A]^a[B]^b",
        name: "Equilibrium Constant Kc",
        category: "Chemical Equilibrium",
        class: "11",
        explanation: "For aA + bB ⇌ cC + dD, Kc is the ratio of product concentrations to reactant concentrations, each raised to stoichiometric coefficient.",
        variables: "[X] = molar concentration of X, a,b,c,d = stoichiometric coefficients",
        keywords: ["equilibrium", "Kc", "concentration", "Le Chatelier"],
        derivation: [
          "1. At equilibrium, forward rate = reverse rate.",
          "2. Rate_forward = k_f[A]^a[B]^b; Rate_reverse = k_r[C]^c[D]^d.",
          "3. At equilibrium: k_f/k_r = K_c = [C]^c[D]^d / [A]^a[B]^b."
        ],
        useCases: [
          "Predicting equilibrium compositions",
          "Haber process for ammonia (N₂ + 3H₂ ⇌ 2NH₃)",
          "Buffer solution calculations"
        ],
        examples: [
          {
            problem: "N₂ + 3H₂ ⇌ 2NH₃. Write Kc expression.",
            solution: "Kc = [NH₃]² / ([N₂][H₂]³)"
          }
        ]
      },
      {
        id: "eq-2",
        formula: "Kp = Kc × (RT)^Δn",
        name: "Relation Between Kp and Kc",
        category: "Chemical Equilibrium",
        class: "11",
        explanation: "Kp uses partial pressures; Kc uses concentrations. Related via ideal gas law.",
        variables: "Δn = (moles gas products − moles gas reactants), R = 0.0821 L·atm/mol·K",
        keywords: ["Kp", "Kc", "gas equilibrium"],
        useCases: [
          "Converting between pressure and concentration equilibrium constants"
        ],
        examples: [
          {
            problem: "For N₂+3H₂⇌2NH₃, Δn=2−4=−2. At 500 K, if Kc=0.5, find Kp.",
            solution: "Kp = 0.5 × (0.0821×500)^(−2) = 0.5/1687 ≈ 2.96×10⁻⁴"
          }
        ]
      },
      {
        id: "eq-3",
        formula: "Ka = [H⁺][A⁻] / [HA]",
        name: "Acid Dissociation Constant",
        category: "Chemical Equilibrium",
        class: "11",
        explanation: "Ka measures strength of a weak acid. Larger Ka = stronger acid (more dissociation). pKa = −log Ka.",
        variables: "[H⁺] = hydrogen ion concentration, [A⁻] = conjugate base, [HA] = undissociated acid",
        keywords: ["acid", "Ka", "weak acid", "dissociation", "pH"],
        useCases: [
          "Buffer design (Henderson-Hasselbalch)",
          "Pharmaceutical formulation pH control",
          "Ocean acidification modelling"
        ],
        examples: [
          {
            problem: "CH₃COOH: Ka=1.8×10⁻⁵. Is it weak or strong?",
            solution: "Ka << 1 → weak acid (only partially dissociates)"
          }
        ]
      }
    ]
  }
];
const CLASS12_CATEGORIES = [
  {
    id: "electrochem",
    title: "Electrochemistry",
    color: "from-yellow-400/20 to-amber-400/20 border-yellow-400/30",
    formulas: [
      {
        id: "ec-1",
        formula: "E_cell = E_cathode − E_anode",
        name: "Standard Cell Potential",
        category: "Electrochemistry",
        class: "12",
        explanation: "EMF of an electrochemical cell under standard conditions. Positive E means spontaneous.",
        variables: "E values from standard reduction potential table",
        keywords: ["cell potential", "EMF", "electrochemistry", "standard"],
        quickSolveParams: ["Ecell", "Ecathode", "Eanode"],
        derivation: [
          "1. Cathode (reduction): higher reduction potential.",
          "2. Anode (oxidation): lower reduction potential.",
          "3. Cell does work equal to n·F·E_cell.",
          "4. E_cell = E_cathode(reduction) − E_anode(reduction)."
        ],
        useCases: [
          "Battery design (Li-ion, lead-acid)",
          "Corrosion prediction (galvanic corrosion)",
          "Electroplating industry"
        ],
        examples: [
          {
            problem: "Zn-Cu cell: E(Cu²⁺/Cu)=+0.34V, E(Zn²⁺/Zn)=−0.76V. Find E_cell.",
            solution: "E_cell = 0.34 − (−0.76) = 1.10 V"
          }
        ]
      },
      {
        id: "ec-2",
        formula: "ΔG = −nFE_cell",
        name: "Gibbs Energy from Cell EMF",
        category: "Electrochemistry",
        class: "12",
        explanation: "Relates standard Gibbs free energy to cell potential. n = moles of electrons; F = 96485 C/mol.",
        variables: "n = electrons transferred, F = 96485 C/mol, E_cell = standard EMF (V)",
        keywords: ["Gibbs", "EMF", "Faraday", "spontaneous"],
        quickSolveParams: ["dG", "n", "F", "Ecell"],
        useCases: [
          "Fuel cell thermodynamics",
          "Evaluating battery feasibility"
        ],
        examples: [
          {
            problem: "Zn-Cu cell: E_cell=1.10 V, n=2. Find ΔG.",
            solution: "ΔG = −2×96485×1.10 = −212,267 J ≈ −212.3 kJ"
          }
        ]
      },
      {
        id: "ec-3",
        formula: "E = E° − (0.0592/n) log Q",
        name: "Nernst Equation (25°C)",
        category: "Electrochemistry",
        class: "12",
        explanation: "Cell potential at non-standard conditions. At equilibrium E=0 and Q=K_eq.",
        variables: "E° = standard potential, n = electrons, Q = reaction quotient, T = 298 K",
        keywords: ["Nernst", "non-standard", "concentration", "Q"],
        derivation: [
          "1. ΔG = ΔG° + RT ln Q.",
          "2. Substituting ΔG = −nFE and ΔG° = −nFE°:",
          "3. −nFE = −nFE° + RT ln Q.",
          "4. E = E° − (RT/nF) ln Q = E° − (0.0592/n) log Q at 298 K."
        ],
        useCases: [
          "pH meter calibration",
          "Concentration cell EMF",
          "Ion-selective electrode design"
        ],
        examples: [
          {
            problem: "E°=1.10 V, n=2, Q=0.01. Find E.",
            solution: "E = 1.10 − (0.0592/2)log(0.01) = 1.10 − (0.0296)(−2) = 1.10 + 0.059 = 1.159 V"
          }
        ]
      },
      {
        id: "ec-4",
        formula: "Q = I × t",
        name: "Charge Passed",
        category: "Electrochemistry",
        class: "12",
        explanation: "Electrical charge = current × time. Q in coulombs, I in amperes, t in seconds.",
        variables: "Q = charge (C), I = current (A), t = time (s)",
        keywords: ["charge", "current", "electrolysis"],
        quickSolveParams: ["Q", "I", "t"],
        useCases: ["Electrolysis calculations", "Battery capacity (Ah → C)"],
        examples: [
          {
            problem: "2 A for 30 min. Find charge.",
            solution: "Q = 2 × 1800 = 3600 C"
          }
        ]
      },
      {
        id: "ec-5",
        formula: "m = (M × Q) / (n × F)",
        name: "Faraday's Law of Electrolysis",
        category: "Electrochemistry",
        class: "12",
        explanation: "Mass deposited at electrode during electrolysis. M = molar mass, n = valency.",
        variables: "m = mass (g), M = molar mass, Q = charge (C), n = valency, F = 96485 C/mol",
        keywords: ["Faraday", "electrolysis", "mass deposited"],
        quickSolveParams: ["m", "M", "Q", "n", "F"],
        derivation: [
          "1. 1 mole of electrons (Faraday = 96485 C) deposits 1 equivalent of substance.",
          "2. Equivalents = Q/F.",
          "3. Mass = equivalents × equivalent mass = (Q/F) × (M/n)."
        ],
        useCases: [
          "Electroplating thickness control",
          "Copper refining industry",
          "Chlor-alkali process"
        ],
        examples: [
          {
            problem: "Plate Cu (M=63.5, n=2) with 3600 C. Mass?",
            solution: "m = (63.5 × 3600) / (2 × 96485) = 1.18 g"
          }
        ]
      },
      {
        id: "ec-6",
        formula: "K_eq = 10^(n·E°/0.0592)",
        name: "Equilibrium Constant from EMF",
        category: "Electrochemistry",
        class: "12",
        explanation: "At 25°C, equilibrium constant from standard cell potential.",
        variables: "K_eq = equilibrium constant, n = electrons, E° = standard cell potential (V)",
        keywords: ["equilibrium", "EMF", "K_eq"],
        useCases: [
          "Predicting whether cell reaction reaches equilibrium easily"
        ],
        examples: [
          {
            problem: "n=2, E°=0.0592 V. Find K_eq.",
            solution: "K_eq = 10^(2×0.0592/0.0592) = 10² = 100"
          }
        ]
      },
      {
        id: "ec-7",
        formula: "Λm = (κ × 1000) / M",
        name: "Molar Conductivity",
        category: "Electrochemistry",
        class: "12",
        explanation: "Molar conductivity from specific conductivity κ. Increases on dilution for weak electrolytes.",
        variables: "κ = specific conductivity (S/cm), M = molarity (mol/L), Λm in S·cm²/mol",
        keywords: ["conductivity", "molar conductivity", "electrolyte"],
        useCases: ["Water purity testing", "Electrolyte quality control"],
        examples: [
          {
            problem: "κ=0.1 S/cm, M=0.1 mol/L. Find Λm.",
            solution: "Λm = (0.1 × 1000)/0.1 = 1000 S·cm²/mol"
          }
        ]
      }
    ]
  },
  {
    id: "kinetics",
    title: "Chemical Kinetics",
    color: "from-emerald-400/20 to-cyan-400/20 border-emerald-400/30",
    formulas: [
      {
        id: "kin-1",
        formula: "Rate = k[A]^m[B]^n",
        name: "Rate Law",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "Rate depends on concentrations raised to reaction orders m and n (determined experimentally).",
        variables: "k = rate constant, [A],[B] = concentrations, m,n = reaction orders",
        keywords: ["rate law", "order", "rate constant"],
        derivation: [
          "1. Rate = Δ[product]/Δt = −Δ[reactant]/Δt.",
          "2. Experimentally, rate ∝ [A]^m[B]^n for reactants.",
          "3. Proportionality constant k depends on T (Arrhenius equation).",
          "4. Overall order = m + n."
        ],
        useCases: [
          "Pharmaceutical drug stability",
          "Atmospheric chemistry",
          "Industrial reactor design"
        ],
        examples: [
          {
            problem: "If m=1, n=2, [A]=0.1 M, [B]=0.2 M, k=0.5. Find rate.",
            solution: "Rate = 0.5 × 0.1 × 0.04 = 0.002 mol/L·s"
          }
        ]
      },
      {
        id: "kin-2",
        formula: "[A]_t = [A]₀ − kt",
        name: "Zero Order Integrated Rate",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "For zero order, concentration decreases linearly with time. t₁/₂ = [A]₀/2k.",
        variables: "[A]₀ = initial concentration, k = rate constant",
        keywords: ["zero order", "integrated rate"],
        useCases: [
          "Some enzyme catalysed reactions (substrate saturation)",
          "Catalyst surface reactions"
        ],
        examples: [
          {
            problem: "[A]₀=0.5 M, k=0.1 M/s. Find [A] at t=3 s.",
            solution: "[A] = 0.5 − 0.1×3 = 0.2 M"
          }
        ]
      },
      {
        id: "kin-3",
        formula: "ln[A]_t = ln[A]₀ − kt",
        name: "First Order Integrated Rate",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "For first order, ln[A] vs time is linear. Radioactive decay and drug elimination follow this.",
        variables: "k = first order rate constant (s⁻¹)",
        keywords: ["first order", "radioactive decay", "half life"],
        quickSolveParams: ["A_t", "A0", "k", "t"],
        useCases: [
          "Radioactive dating",
          "Pharmacokinetics",
          "Thermal decomposition"
        ],
        examples: [
          {
            problem: "[A]₀=1 M, k=0.1 s⁻¹. Find [A] at t=10 s.",
            solution: "ln[A] = ln(1)−0.1×10 = −1. [A] = e⁻¹ = 0.368 M"
          }
        ]
      },
      {
        id: "kin-4",
        formula: "t₁/₂ = 0.693 / k",
        name: "First Order Half-Life",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "Half-life for first order is constant, independent of initial concentration.",
        variables: "t₁/₂ = half-life (s), k = first order rate constant (s⁻¹)",
        keywords: ["half life", "radioactive", "first order"],
        quickSolveParams: ["t_half", "k"],
        derivation: [
          "1. First order: [A] = [A]₀ e^(−kt).",
          "2. At half-life: [A] = [A]₀/2.",
          "3. [A]₀/2 = [A]₀ e^(−kt₁/₂).",
          "4. Taking ln: ln(1/2) = −kt₁/₂ → t₁/₂ = ln2/k = 0.693/k."
        ],
        useCases: [
          "Carbon-14 dating",
          "Medical radioisotopes (Tc-99m t₁/₂=6h)",
          "Drug dosing schedules"
        ],
        examples: [
          {
            problem: "k = 0.0693 s⁻¹. Find half-life.",
            solution: "t₁/₂ = 0.693/0.0693 = 10 s"
          }
        ]
      },
      {
        id: "kin-5",
        formula: "1/[A]_t = 1/[A]₀ + kt",
        name: "Second Order Integrated Rate",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "For second order, 1/[A] vs time is linear. t₁/₂ = 1/(k[A]₀).",
        variables: "k = second order rate constant (L/mol·s)",
        keywords: ["second order", "integrated rate"],
        useCases: ["Gas-phase bimolecular reactions", "NO₂ decomposition"],
        examples: [
          {
            problem: "[A]₀=1 M, k=0.5 L/mol·s, t=2 s. Find [A].",
            solution: "1/[A] = 1/1 + 0.5×2 = 2. [A] = 0.5 M"
          }
        ]
      },
      {
        id: "kin-6",
        formula: "k = A·e^(−Ea/RT)",
        name: "Arrhenius Equation",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "Rate constant depends exponentially on activation energy. Higher Ea = slower reaction.",
        variables: "A = pre-exponential factor, Ea = activation energy (J/mol), R = 8.314 J/mol·K, T = temp (K)",
        keywords: [
          "Arrhenius",
          "activation energy",
          "temperature dependence",
          "rate constant"
        ],
        derivation: [
          "1. Collision theory: only high-energy collisions lead to reaction.",
          "2. Fraction of molecules with E ≥ Ea = e^(−Ea/RT) (Maxwell-Boltzmann).",
          "3. k = A × (fraction with sufficient energy) = A·e^(−Ea/RT).",
          "4. Taking ln: ln k = ln A − Ea/RT (linear in 1/T)."
        ],
        useCases: [
          "Predicting rate at new temperature",
          "Food spoilage modelling",
          "Determining activation energy from experiment"
        ],
        examples: [
          {
            problem: "Ea=50 kJ/mol, A=10¹³. Find k at 500 K.",
            solution: "k = 10¹³ × e^(−50000/(8.314×500)) = 10¹³ × e^(−12.02) ≈ 10¹³ × 6×10⁻⁶ ≈ 6×10⁷"
          }
        ]
      },
      {
        id: "kin-7",
        formula: "ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂)",
        name: "Temperature Dependence of k",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "Compares rate constants at two temperatures to find activation energy.",
        variables: "T₁, T₂ = temperatures (K), k₁, k₂ = rate constants",
        keywords: ["Arrhenius", "two temperatures", "activation energy"],
        useCases: [
          "Finding Ea from two rate measurements",
          "Estimating rate at body temperature"
        ],
        examples: [
          {
            problem: "k doubles from 300→310 K. Find Ea.",
            solution: "ln(2) = (Ea/8.314)(1/300−1/310). Ea = 0.693×8.314×300×310/10 ≈ 53.6 kJ/mol"
          }
        ]
      }
    ]
  },
  {
    id: "organic",
    title: "Organic Named Reactions",
    color: "from-pink-400/20 to-rose-400/20 border-pink-400/30",
    formulas: [
      {
        id: "org-1",
        formula: "2CH₃CHO → CH₃CH(OH)CH₂CHO",
        name: "Aldol Condensation",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "Self-condensation of acetaldehyde in dilute NaOH. Produces a β-hydroxy aldehyde. Can dehydrate to α,β-unsaturated carbonyl.",
        variables: "Reagent: dilute NaOH, room temperature",
        keywords: ["aldol", "condensation", "NaOH", "carbonyl"],
        useCases: [
          "C–C bond formation in synthesis",
          "Industrial synthesis of 2-ethyl hexanol"
        ],
        examples: [
          {
            problem: "Which reagent triggers Aldol condensation?",
            solution: "Dilute NaOH (or acid). The enolate acts as nucleophile attacking carbonyl carbon of another aldehyde."
          }
        ]
      },
      {
        id: "org-2",
        formula: "2HCHO → HCOOH + CH₃OH",
        name: "Cannizzaro Reaction",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "Disproportionation of aldehydes with no α-H in conc. NaOH. One oxidised (acid), other reduced (alcohol).",
        variables: "Reagent: concentrated NaOH; applies to HCHO, C₆H₅CHO etc.",
        keywords: ["Cannizzaro", "disproportionation", "no alpha-H"],
        useCases: ["Synthesis of benzyl alcohol from benzaldehyde"],
        examples: [
          {
            problem: "Why doesn't acetaldehyde (CH₃CHO) undergo Cannizzaro?",
            solution: "It has α-H, so it prefers Aldol condensation over Cannizzaro."
          }
        ]
      },
      {
        id: "org-3",
        formula: "C₆H₅ONa + CO₂ → sodium salicylate",
        name: "Kolbe Reaction",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "Sodium phenoxide + CO₂ under pressure and heat → sodium salicylate → acidified → salicylic acid.",
        variables: "Conditions: CO₂ at 125°C, 5 atm pressure",
        keywords: ["Kolbe", "phenol", "salicylic acid", "aspirin"],
        useCases: [
          "Industrial synthesis of salicylic acid (precursor to aspirin)"
        ],
        examples: [
          {
            problem: "What is the final product if salicylate is acetylated?",
            solution: "Aspirin (acetylsalicylic acid) — the active ingredient in Aspirin tablets."
          }
        ]
      },
      {
        id: "org-4",
        formula: "C₆H₅OH + CHCl₃ + NaOH → o-HOC₆H₄CHO",
        name: "Reimer-Tiemann Reaction",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "Phenol + chloroform in alkaline solution → o-hydroxybenzaldehyde (salicylaldehyde). Electrophilic substitution.",
        variables: "Reagents: CHCl₃, aqueous NaOH",
        keywords: ["Reimer-Tiemann", "phenol", "CHCl₃", "aldehyde"],
        useCases: ["Introducing aldehyde group into phenol ring"],
        examples: [
          {
            problem: "What electrophile forms in the Reimer-Tiemann reaction?",
            solution: "Dichlorocarbene (:CCl₂) from CHCl₃ + NaOH — it is the active electrophile."
          }
        ]
      },
      {
        id: "org-5",
        formula: "R−O⁻ + R′X → R−O−R′ + X⁻",
        name: "Williamson Synthesis",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "SN2 reaction of alkoxide with alkyl halide → ether. Best with primary alkyl halides.",
        variables: "R-O⁻ = alkoxide ion, R′X = primary alkyl halide",
        keywords: ["Williamson", "ether", "SN2", "alkoxide"],
        useCases: [
          "Preparation of unsymmetrical ethers",
          "Pharmaceutical synthesis"
        ],
        examples: [
          {
            problem: "Make methyl ethyl ether by Williamson synthesis.",
            solution: "CH₃O⁻ + C₂H₅Br → CH₃OC₂H₅ + Br⁻. Use methoxide (strong base) with ethyl bromide (primary)."
          }
        ]
      },
      {
        id: "org-6",
        formula: "ArH + RX → ArR + HX [AlCl₃]",
        name: "Friedel-Crafts Alkylation",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "Electrophilic aromatic substitution using Lewis acid (AlCl₃). Adds alkyl group to benzene ring.",
        variables: "RX = alkyl halide, AlCl₃ = Lewis acid catalyst",
        keywords: ["Friedel-Crafts", "alkylation", "benzene", "EAS"],
        useCases: [
          "Synthesis of ethylbenzene (precursor to styrene/polystyrene)",
          "Petrochemical industry"
        ],
        examples: [
          {
            problem: "Why does rearrangement occur in Friedel-Crafts alkylation?",
            solution: "The carbocation intermediate can rearrange to a more stable form before attacking the ring."
          }
        ]
      },
      {
        id: "org-7",
        formula: "ArH + RCOCl → ArCOR + HCl [AlCl₃]",
        name: "Friedel-Crafts Acylation",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "EAS to introduce acyl group. No rearrangement unlike alkylation. Gives ketone.",
        variables: "RCOCl = acyl chloride, AlCl₃ = Lewis acid catalyst",
        keywords: ["Friedel-Crafts", "acylation", "ketone", "EAS"],
        useCases: ["Acetophenone synthesis", "Anthraquinone dye synthesis"],
        examples: [
          {
            problem: "Acetylate benzene using Friedel-Crafts. Product?",
            solution: "C₆H₅COCH₃ (acetophenone) using CH₃COCl/AlCl₃"
          }
        ]
      },
      {
        id: "org-8",
        formula: "R−CN + H₂ → R−CH₂NH₂ [catalyst]",
        name: "Nitrile Reduction",
        category: "Organic Named Reactions",
        class: "12",
        explanation: "Reduction of nitrile to primary amine using H₂/Ni or LiAlH₄. Key amine synthesis method.",
        variables: "Catalyst: Ni/Raney Ni or LiAlH₄ (lithium aluminium hydride)",
        keywords: ["nitrile", "amine", "reduction", "LiAlH4"],
        useCases: ["Synthesis of alkylamines", "Nylon-6,6 precursors"],
        examples: [
          {
            problem: "Reduce CH₃CN to form an amine.",
            solution: "CH₃CN + 2H₂ → CH₃CH₂NH₂ (ethylamine)"
          }
        ]
      }
    ]
  },
  {
    id: "coordination",
    title: "Coordination Chemistry",
    color: "from-indigo-400/20 to-blue-400/20 border-indigo-400/30",
    formulas: [
      {
        id: "coord-1",
        formula: "EAN = Z − ox.state + 2×(ligands)",
        name: "Effective Atomic Number",
        category: "Coordination Chemistry",
        class: "12",
        explanation: "EAN = atomic number − oxidation state + electrons donated by ligands. Stable complexes often reach noble gas EAN.",
        variables: "Z = atomic number, each ligand donates 2 electrons (2-electron donor)",
        keywords: ["EAN", "coordination", "18-electron rule"],
        useCases: [
          "Predicting stability of metal complexes",
          "Organometallic chemistry"
        ],
        examples: [
          {
            problem: "Find EAN for [Fe(CO)₅]. Fe has Z=26, OS=0, 5 CO each donates 2e.",
            solution: "EAN = 26 + 0 + 5×2 = 36 = Kr configuration (stable!)"
          }
        ]
      },
      {
        id: "coord-2",
        formula: "CFSE = −0.4Δo·n(t₂g) + 0.6Δo·n(eg)",
        name: "Crystal Field Stabilization Energy",
        category: "Coordination Chemistry",
        class: "12",
        explanation: "CFSE measures stability from d-orbital splitting in octahedral field. t₂g electrons lower energy; eg raise it.",
        variables: "Δo = crystal field splitting energy, n(t₂g), n(eg) = electrons in each set",
        keywords: ["CFSE", "crystal field", "d-orbital", "ligand field"],
        derivation: [
          "1. In octahedral field, d-orbitals split into t₂g (lower, −0.4Δo) and eg (upper, +0.6Δo).",
          "2. Electrons in t₂g lower energy; electrons in eg raise energy relative to spherical field.",
          "3. CFSE = (−0.4Δo × n_t₂g) + (0.6Δo × n_eg).",
          "4. More negative CFSE = more stabilised complex."
        ],
        useCases: [
          "Explaining colour of coordination compounds",
          "Magnetic properties of complexes",
          "Spectrochemical series"
        ],
        examples: [
          {
            problem: "d⁶ low-spin octahedral: t₂g⁶ eg⁰. Find CFSE.",
            solution: "CFSE = −0.4×6 + 0.6×0 = −2.4Δo"
          }
        ]
      },
      {
        id: "coord-3",
        formula: "Primary valence = oxidation state",
        name: "Werner's Primary Valence",
        category: "Coordination Chemistry",
        class: "12",
        explanation: "Primary valence = metal oxidation state, satisfied by counter-ions.",
        variables: "Example: [Co(NH₃)₆]Cl₃ has Co³⁺ oxidation state",
        keywords: ["Werner", "oxidation state", "primary valence"],
        useCases: [
          "Naming coordination compounds",
          "Counter-ion determination"
        ],
        examples: [
          {
            problem: "In [Co(NH₃)₆]Cl₃, what is Co's primary valence?",
            solution: "3+ (three Cl⁻ counter-ions satisfy primary valence)"
          }
        ]
      },
      {
        id: "coord-4",
        formula: "Secondary valence = coordination number",
        name: "Werner's Secondary Valence",
        category: "Coordination Chemistry",
        class: "12",
        explanation: "Secondary valence = coordination number = ligands directly bonded in coordination sphere.",
        variables: "Example: [Co(NH₃)₆]Cl₃ has CN = 6",
        keywords: ["Werner", "coordination number", "secondary valence"],
        useCases: [
          "Predicting geometry of complexes",
          "Understanding isomerism in coordination compounds"
        ],
        examples: [
          {
            problem: "Find CN in [PtCl₂(NH₃)₂].",
            solution: "CN = 4 (2 Cl⁻ + 2 NH₃ directly bonded to Pt)"
          }
        ]
      }
    ]
  },
  {
    id: "solidstate",
    title: "Solid State",
    color: "from-slate-400/20 to-zinc-400/20 border-slate-400/30",
    formulas: [
      {
        id: "ss-1",
        formula: "Z × M = ρ × NA × a³",
        name: "Density of Unit Cell",
        category: "Solid State",
        class: "12",
        explanation: "Density of crystal from unit cell parameters. Z = atoms per unit cell, a = edge length.",
        variables: "Z = atoms/unit cell, M = molar mass, ρ = density, NA = 6.022×10²³, a = edge length (cm)",
        keywords: ["density", "unit cell", "crystal", "lattice"],
        quickSolveParams: ["Z", "M", "rho", "a"],
        derivation: [
          "1. Mass of unit cell = Z × M/NA.",
          "2. Volume of unit cell = a³.",
          "3. Density ρ = mass/volume = ZM/(NA·a³).",
          "4. Rearranged: Z × M = ρ × NA × a³."
        ],
        useCases: [
          "Calculating crystal density from X-ray data",
          "Identifying unknown crystals"
        ],
        examples: [
          {
            problem: "NaCl: Z=4, M=58.5, a=5.64×10⁻⁸ cm. Find ρ.",
            solution: "ρ = (4×58.5)/(6.022×10²³×(5.64×10⁻⁸)³) = 2.17 g/cm³"
          }
        ]
      },
      {
        id: "ss-2",
        formula: "r_octahedral = 0.414 r (sphere)",
        name: "Octahedral Void Radius",
        category: "Solid State",
        class: "12",
        explanation: "In close-packed structures, the radius of atom that fits in an octahedral void = 0.414 times the sphere radius.",
        variables: "r = radius of close-packed spheres",
        keywords: ["void", "octahedral", "packing", "radius ratio"],
        useCases: [
          "Ionic crystal structure prediction",
          "Understanding NaCl vs CsCl structures"
        ],
        examples: [
          {
            problem: "If anion radius = 100 pm, what cation fits in octahedral void?",
            solution: "r_cation = 0.414 × 100 = 41.4 pm"
          }
        ]
      },
      {
        id: "ss-3",
        formula: "Packing efficiency (FCC) = 74%",
        name: "FCC Packing Efficiency",
        category: "Solid State",
        class: "12",
        explanation: "Face-centred cubic (cubic close packing) has 74% packing efficiency — the maximum for identical spheres.",
        variables: "Z=4 atoms per unit cell, relationship: 4r = √2·a",
        keywords: ["FCC", "CCP", "packing efficiency", "close packing"],
        derivation: [
          "1. FCC: Z = 4 atoms/unit cell.",
          "2. Face diagonal = 4r = √2·a → r = a√2/4.",
          "3. Volume of 4 spheres = 4×(4/3)π(a√2/4)³.",
          "4. Efficiency = sphere volume / a³ = π√2/6 ≈ 74.05%."
        ],
        useCases: [
          "Metals that adopt FCC: Cu, Al, Ag, Au",
          "Ceramic and alloy design"
        ],
        examples: [
          {
            problem: "BCC vs FCC — which has higher packing efficiency?",
            solution: "FCC: 74%, BCC: 68%. FCC packs more efficiently."
          }
        ]
      }
    ]
  },
  {
    id: "organic-extra",
    title: "Organic Chemistry",
    color: "from-orange-400/20 to-amber-400/20 border-orange-400/30",
    formulas: [
      {
        id: "org-1",
        formula: "DBE = (2C + 2 + N - H - X) / 2",
        name: "Degree of Unsaturation (DBE)",
        category: "Organic Chemistry",
        class: "12",
        explanation: "DBE (Degree of Unsaturation / Index of Hydrogen Deficiency) counts rings + pi bonds. Each ring or double bond = 1 DBE. Triple bond = 2 DBE. Oxygen and sulfur are NOT counted.",
        variables: "C = carbons, N = nitrogens, H = hydrogens, X = halogens. O/S not counted.",
        keywords: ["DBE", "unsaturation", "rings", "pi bonds", "IHD"],
        derivation: [
          "1. Saturated CnH(2n+2) has DBE = 0 (all single bonds).",
          "2. Each pi bond removes 2 H atoms: DBE +1 per pi bond.",
          "3. Each ring also removes 2 H (cyclization): DBE +1 per ring.",
          "4. N adds 1 H (trivalent N), so we add N. Halogens replace H, so subtract X.",
          "5. Combined formula: DBE = (2C + 2 + N - H - X) / 2."
        ],
        useCases: [
          "Determining molecular structure from molecular formula",
          "Identifying benzene ring (DBE = 4) in unknown compound",
          "First step in JEE/NEET structure elucidation problems"
        ],
        examples: [
          {
            problem: "Find DBE for C6H5Cl (chlorobenzene).",
            solution: "DBE = (2x6 + 2 - 5 - 1) / 2 = 8/2 = 4. (Benzene ring: 3 C=C + 1 ring = 4)"
          },
          {
            problem: "Find DBE for C4H6.",
            solution: "DBE = (8 + 2 - 6)/2 = 4/2 = 2. Could be 2 double bonds, 1 triple bond, or 1 ring + 1 double bond."
          }
        ]
      },
      {
        id: "org-2",
        formula: "Alkane: CnH(2n+2) + (3n+1)/2 O2 -> nCO2 + (n+1)H2O",
        name: "Alkane Combustion (General)",
        category: "Organic Chemistry",
        class: "12",
        explanation: "Complete combustion of alkane CnH(2n+2) gives CO2 and H2O. The O2 coefficient is (3n+1)/2. For methane (n=1): CH4 + 2O2 -> CO2 + 2H2O.",
        variables: "n = number of carbon atoms. O2 coefficient = (3n+1)/2.",
        keywords: ["combustion", "alkane", "oxygen", "CO2"],
        useCases: [
          "Balancing combustion reactions",
          "Calorimetry and heat of combustion",
          "Industrial fuel analysis"
        ],
        examples: [
          {
            problem: "Balance combustion of C4H10 (butane, n=4).",
            solution: "O2 = (3x4+1)/2 = 13/2. Full: 2C4H10 + 13O2 -> 8CO2 + 10H2O."
          }
        ]
      },
      {
        id: "org-3",
        formula: "Markovnikov: H adds to C with more H (less substituted C)",
        name: "Markovnikov's Rule",
        category: "Organic Chemistry",
        class: "12",
        explanation: "In HX addition to an unsymmetrical alkene, H attaches to the carbon with more hydrogens (less substituted). The X goes to the more substituted carbon because that carbocation is more stable.",
        variables: "HX = HBr, HCl, HI, H2SO4/H2O. Anti-Markovnikov applies only to HBr + ROOR.",
        keywords: [
          "Markovnikov",
          "HBr",
          "alkene",
          "addition",
          "anti-Markovnikov"
        ],
        useCases: [
          "Predicting HX addition products to propene, butene",
          "Acid-catalyzed hydration of alkenes",
          "Industrial synthesis of isopropanol from propene"
        ],
        examples: [
          {
            problem: "Product of HBr + CH3CH=CH2 (no peroxide).",
            solution: "Markovnikov: H to less-substituted C. Product: CH3CHBrCH3 (2-bromopropane)."
          },
          {
            problem: "Product of HBr + CH3CH=CH2 (with ROOR peroxide).",
            solution: "Anti-Markovnikov (radical): Br to less-substituted C. Product: CH3CH2CH2Br (1-bromopropane)."
          }
        ]
      }
    ]
  },
  {
    id: "extra-ec",
    title: "Electrochemistry (Extra)",
    color: "from-violet-400/20 to-purple-400/20 border-violet-400/30",
    formulas: [
      {
        id: "ec-extra-1",
        formula: "E = E0 - (0.0592/n) log Q",
        name: "Nernst Equation (at 25 degrees C)",
        category: "Electrochemistry",
        class: "12",
        explanation: "The Nernst equation gives cell potential under non-standard conditions. Q is the reaction quotient. At equilibrium E = 0 and log K = nE0/0.0592.",
        variables: "E = cell potential (V), E0 = standard potential (V), n = electrons transferred, Q = reaction quotient",
        keywords: ["Nernst", "cell potential", "concentration", "EMF"],
        derivation: [
          "1. From thermodynamics: dG = dG0 + RT ln Q.",
          "2. Substituting dG = -nFE and dG0 = -nFE0:",
          "3. -nFE = -nFE0 + RT ln Q.",
          "4. Dividing by -nF: E = E0 - (RT/nF) ln Q.",
          "5. At 25 C: RT/F = 0.02569 V; converting ln to log: E = E0 - (0.0592/n) log Q."
        ],
        useCases: [
          "Calculating cell potential at non-standard concentrations",
          "Concentration cells (same metal, different concentrations)",
          "pH sensors (glass electrode uses Nernst equation)"
        ],
        examples: [
          {
            problem: "Calculate E for Cu2+/Cu when [Cu2+] = 0.01 M. E0 = +0.34 V.",
            solution: "E = 0.34 - (0.0592/2) log (1/0.01) = 0.34 - 0.0296 x 2 = 0.281 V."
          }
        ]
      },
      {
        id: "ec-extra-2",
        formula: "Lm = k x 1000 / M",
        name: "Molar Conductance",
        category: "Electrochemistry",
        class: "12",
        explanation: "Molar conductance Lm = specific conductance (k) times 1000 divided by molarity M (units: S cm2/mol). Kohlrausch law: Lm0 = sum of individual ionic conductances. Degree of dissociation a = Lm/Lm0.",
        variables: "k = specific conductance (S/cm), M = molarity (mol/L), Lm0 = limiting molar conductance",
        keywords: ["Kohlrausch", "molar conductance", "degree of dissociation"],
        useCases: [
          "Measuring dissociation of weak electrolytes",
          "Testing water purity via conductivity",
          "Industrial desalination monitoring"
        ],
        examples: [
          {
            problem: "Find Lm0 for CH3COOH given: CH3COONa = 91, HCl = 426, NaCl = 126 S cm2/mol.",
            solution: "Lm0(CH3COOH) = 91 + 426 - 126 = 391 S cm2/mol (Kohlrausch law)."
          }
        ]
      }
    ]
  },
  {
    id: "extra-thermo",
    title: "Thermodynamics (Extra)",
    color: "from-green-400/20 to-teal-400/20 border-green-400/30",
    formulas: [
      {
        id: "thermo-extra-1",
        formula: "dG = dH - T*dS",
        name: "Gibbs Free Energy",
        category: "Thermodynamics",
        class: "12",
        explanation: "Gibbs free energy determines spontaneity at constant T and P. dG < 0: spontaneous. dG = 0: equilibrium. dG > 0: non-spontaneous. Also: dG0 = -RT ln K = -nFE0.",
        variables: "dH = enthalpy change (kJ/mol), T = temperature (K), dS = entropy change (J/mol K)",
        keywords: [
          "Gibbs",
          "spontaneity",
          "entropy",
          "enthalpy",
          "thermodynamics"
        ],
        quickSolveParams: ["dG", "dH", "T", "dS"],
        derivation: [
          "1. Combined laws: G = H - TS (at constant T, P).",
          "2. Change: dG = dH - T*dS.",
          "3. Spontaneous process: dG < 0.",
          "4. At equilibrium: dG = 0, so dG0 = -RT ln K.",
          "5. Also linked to electrochemistry: dG0 = -nFE0."
        ],
        useCases: [
          "Predicting reaction spontaneity at given temperature",
          "Linking equilibrium constant K to thermodynamic values",
          "Industrial process temperature optimization"
        ],
        examples: [
          {
            problem: "dH = -92 kJ/mol, dS = -198 J/mol K at 298 K (Haber). Find dG.",
            solution: "dG = -92000 - 298 x (-198) = -92000 + 58998 = -33002 J/mol = -33 kJ/mol. Spontaneous."
          }
        ]
      },
      {
        id: "thermo-extra-2",
        formula: "ln(K2/K1) = -(dH0/R) x (1/T2 - 1/T1)",
        name: "Van't Hoff Equation",
        category: "Thermodynamics",
        class: "12",
        explanation: "Shows how equilibrium constant K changes with temperature. Exothermic (dH < 0): K decreases with rising T. Endothermic (dH > 0): K increases with T. Used to optimize industrial reactions.",
        variables: "K1, K2 = equilibrium constants at T1, T2; dH0 = standard enthalpy (J/mol); R = 8.314 J/mol K",
        keywords: ["Van't Hoff", "equilibrium", "temperature", "K"],
        useCases: [
          "Effect of temperature on Haber, Contact processes",
          "Biochemistry: enzyme kinetics temperature dependence",
          "Industrial reactor temperature selection"
        ],
        examples: [
          {
            problem: "dH0 = +30 kJ/mol, K(300K) = 0.5. Does K increase at 320 K?",
            solution: "Endothermic: K increases with T. ln(K2/0.5) = -30000/8.314 x (1/320-1/300) = 0.75. K2 = 0.5 x e^0.75 = 1.06. K increased."
          }
        ]
      }
    ]
  },
  {
    id: "extra-kinetics",
    title: "Chemical Kinetics (Extra)",
    color: "from-red-400/20 to-rose-400/20 border-red-400/30",
    formulas: [
      {
        id: "kin-extra-1",
        formula: "ln[A] = ln[A]0 - kt",
        name: "Integrated Rate Law (1st Order)",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "For first-order reaction, ln[A] decreases linearly with time. Slope of ln[A] vs t = -k. Half-life t(1/2) = 0.693/k (independent of initial concentration). Radioactive decay is always first order.",
        variables: "[A] = concentration at time t, [A]0 = initial concentration, k = rate constant (s^-1)",
        keywords: ["first order", "rate constant", "half-life", "kinetics"],
        useCases: [
          "Radioactive decay (always 1st order)",
          "Drug elimination pharmacokinetics",
          "Decomposition reactions in solutions"
        ],
        examples: [
          {
            problem: "1st order reaction, k = 0.693 s-1. Fraction remaining after 2 s?",
            solution: "t(1/2) = 0.693/0.693 = 1 s. After 2 s = 2 half-lives. Fraction = (1/2)^2 = 0.25 (25%)."
          }
        ]
      },
      {
        id: "kin-extra-2",
        formula: "1/[A] = 1/[A]0 + kt",
        name: "Integrated Rate Law (2nd Order)",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "For second-order reaction, 1/[A] increases linearly with time. Half-life t(1/2) = 1/(k[A]0) depends on initial concentration (unlike 1st order). Slope of 1/[A] vs t = +k.",
        variables: "[A] = concentration at time t, [A]0 = initial concentration, k = rate constant (L/mol/s)",
        keywords: ["second order", "rate constant", "half-life", "2nd order"],
        useCases: [
          "Gas-phase reactions: 2NO2 -> 2NO + O2",
          "Bimolecular reactions in solution"
        ],
        examples: [
          {
            problem: "2nd order: k = 0.01 L/mol/s, [A]0 = 2 mol/L. Find t(1/2).",
            solution: "t(1/2) = 1/(0.01 x 2) = 50 s."
          }
        ]
      },
      {
        id: "kin-extra-3",
        formula: "ln(k2/k1) = (Ea/R) x (1/T1 - 1/T2)",
        name: "Activation Energy (Arrhenius Two-Temperature)",
        category: "Chemical Kinetics",
        class: "12",
        explanation: "Derived from Arrhenius equation: k = A*e^(-Ea/RT). Allows calculation of Ea from rate constants at two temperatures. Arrhenius plot of ln k vs 1/T is linear with slope -Ea/R.",
        variables: "k1, k2 = rate constants at T1, T2 (in K); Ea = activation energy (J/mol); R = 8.314 J/mol K",
        keywords: [
          "Arrhenius",
          "activation energy",
          "temperature",
          "rate constant"
        ],
        useCases: [
          "Finding Ea from experimental data",
          "Comparing catalyst efficiency",
          "Predicting rate change with temperature"
        ],
        examples: [
          {
            problem: "Rate doubles from 300 K to 310 K. Find Ea.",
            solution: "ln 2 = Ea/8.314 x (1/300-1/310). 1/300-1/310 = 1.075e-4. Ea = 0.693x8.314/1.075e-4 = 53600 J/mol = 53.6 kJ/mol."
          }
        ]
      }
    ]
  },
  {
    id: "extra-atomic",
    title: "Atomic Structure (Extra)",
    color: "from-cyan-400/20 to-sky-400/20 border-cyan-400/30",
    formulas: [
      {
        id: "atomic-extra-1",
        formula: "lambda = h/mv = h/sqrt(2mKE)",
        name: "de Broglie Wavelength",
        category: "Atomic Structure",
        class: "11",
        explanation: "Matter has wave properties. The de Broglie wavelength is inversely proportional to momentum. For electron accelerated through V volts: lambda = 12.27/sqrt(V) angstroms.",
        variables: "h = 6.626e-34 J s, m = mass (kg), v = velocity (m/s), KE = kinetic energy (J)",
        keywords: ["de Broglie", "wavelength", "matter wave", "electron"],
        useCases: [
          "Explaining electron diffraction in crystals",
          "Electron microscopy (shorter lambda = higher resolution)",
          "Quantum mechanical basis for atomic orbitals"
        ],
        examples: [
          {
            problem: "Find de Broglie wavelength for electron accelerated through 100 V.",
            solution: "lambda = 12.27/sqrt(100) = 12.27/10 = 1.227 angstroms (X-ray range)."
          }
        ]
      },
      {
        id: "atomic-extra-2",
        formula: "dx * dp >= h/(4*pi)",
        name: "Heisenberg Uncertainty Principle",
        category: "Atomic Structure",
        class: "11",
        explanation: "Cannot simultaneously determine exact position and momentum of a particle. This is a fundamental quantum property, not an experimental limitation. It is the reason electrons exist in probability clouds (orbitals) rather than fixed orbits.",
        variables: "dx = uncertainty in position (m), dp = uncertainty in momentum (kg m/s), h = Planck constant",
        keywords: ["Heisenberg", "uncertainty", "position", "momentum"],
        useCases: [
          "Explains why electrons cannot exist in the nucleus",
          "Fundamental limit for quantum measurement",
          "Basis of orbital probability density model"
        ],
        examples: [
          {
            problem: "If dx = 1e-10 m, find minimum dv for electron (m = 9.1e-31 kg).",
            solution: "dp >= h/(4*pi*dx) = 6.626e-34/(4*pi*1e-10) = 5.27e-25. dv = dp/m = 5.27e-25/9.1e-31 = 5.8e5 m/s."
          }
        ]
      },
      {
        id: "atomic-extra-3",
        formula: "rn = 0.529 * n^2/Z angstrom; En = -13.6 * Z^2/n^2 eV",
        name: "Bohr Model (Radius and Energy)",
        category: "Atomic Structure",
        class: "11",
        explanation: "Bohr radius rn = 0.529n^2/Z angstroms and orbit energy En = -13.6Z^2/n^2 eV for hydrogen-like atoms. Negative sign = electron is bound. Photon energy: dE = 13.6Z^2(1/n1^2 - 1/n2^2) eV.",
        variables: "n = principal quantum number, Z = atomic number, r in angstroms, E in eV",
        keywords: ["Bohr", "radius", "energy", "orbit", "hydrogen"],
        useCases: [
          "Calculating energy of spectral lines",
          "Ionization energy of hydrogen-like ions",
          "Lyman and Balmer series calculations"
        ],
        examples: [
          {
            problem: "Find r1 for He+ (Z=2) and E1 for H (Z=1).",
            solution: "r1(He+) = 0.529*1/2 = 0.265 angstroms. E1(H) = -13.6*1/1 = -13.6 eV."
          }
        ]
      }
    ]
  }
];
const ALL_FORMULAS = [
  ...CLASS11_CATEGORIES.flatMap((c) => c.formulas),
  ...CLASS12_CATEGORIES.flatMap((c) => c.formulas)
];
function getFormulaOfTheDay() {
  const today = /* @__PURE__ */ new Date();
  const seed = today.getFullYear() * 1e4 + (today.getMonth() + 1) * 100 + today.getDate();
  return ALL_FORMULAS[seed % ALL_FORMULAS.length];
}
const QuickSolvePanel = reactExports.memo(function QuickSolvePanel2({
  formula
}) {
  const params = formula.quickSolveParams ?? [];
  const [values, setValues] = reactExports.useState({});
  const [solveFor, setSolveFor] = reactExports.useState(params[params.length - 1] ?? "");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const handleSolve = reactExports.useCallback(() => {
    setError(null);
    setResult(null);
    const known = params.filter((p) => p !== solveFor);
    const missing = known.filter((p) => !values[p]);
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}`);
      return;
    }
    try {
      const knownVals = {};
      for (const p of known) {
        knownVals[p] = Number.parseFloat(values[p]);
      }
      let calcResult = null;
      const allRearrangements = {
        "states-1": {
          P: "n*0.0821*T/V",
          V: "n*0.0821*T/P",
          n: "P*V/(0.0821*T)",
          T: "P*V/(n*0.0821)"
        },
        "thermo-4": {
          q: "m*c*dT",
          m: "q/(c*dT)",
          c: "q/(m*dT)",
          dT: "q/(m*c)"
        },
        "mole-1": { n: "m/M", m: "n*M", M: "m/n" },
        "mole-4": { M: "n/V", n: "M*V", V: "n/M" },
        "mole-5": { m: "n/kg", n: "m*kg", kg: "n/m" },
        "ec-4": { Q: "I*t", I: "Q/t", t: "Q/I" },
        "ec-5": { m: "(M*Q)/(n*F)", M: "(m*n*F)/Q", Q: "(m*n*F)/M" },
        "thermo-3": {
          dG: "dH-T*dS",
          dH: "dG+T*dS",
          T: "(dH-dG)/dS",
          dS: "(dH-dG)/T"
        },
        "mole-9": {
          dTb: "i*Kb*m",
          i: "dTb/(Kb*m)",
          Kb: "dTb/(i*m)",
          m: "dTb/(i*Kb)"
        },
        "mole-10": {
          dTf: "i*Kf*m",
          i: "dTf/(Kf*m)",
          Kf: "dTf/(i*m)",
          m: "dTf/(i*Kf)"
        },
        "kin-4": { t_half: "0.693/k", k: "0.693/t_half" },
        "atomic-1": { En: "-13.6/(n*n)", n: "Math.sqrt(13.6/Math.abs(En))" },
        "atomic-2": { rn: "0.529*n*n", n: "Math.sqrt(rn/0.529)" },
        "ec-2": {
          dG: "-n*96485*Ecell",
          n: "-dG/(96485*Ecell)",
          Ecell: "-dG/(n*96485)"
        },
        "ec-1": {
          Ecell: "Ecathode-Eanode",
          Ecathode: "Ecell+Eanode",
          Eanode: "Ecathode-Ecell"
        },
        "ss-1": {
          rho: "(Z*M)/(6.022e23*Math.pow(a,3))",
          Z: "(rho*6.022e23*Math.pow(a,3))/M",
          M: "(rho*6.022e23*Math.pow(a,3))/Z"
        },
        "kin-3": {
          A_t: "A0*Math.exp(-k*t)",
          k: "-Math.log(A_t/A0)/t",
          t: "-Math.log(A_t/A0)/k"
        }
      };
      const formulaRearrange = allRearrangements[formula.id];
      if (formulaRearrange == null ? void 0 : formulaRearrange[solveFor]) {
        const exprToEval = formulaRearrange[solveFor];
        let evalStr = exprToEval;
        for (const [k, v] of Object.entries(knownVals)) {
          evalStr = evalStr.replace(
            new RegExp(`\\b${k}\\b`, "g"),
            v.toString()
          );
        }
        try {
          calcResult = Function(
            `"use strict"; return (${evalStr});`
          )();
        } catch {
          setError("Could not evaluate formula. Check your values.");
          return;
        }
      }
      if (calcResult !== null && !Number.isNaN(calcResult)) {
        setResult(`${solveFor} = ${calcResult.toPrecision(4)}`);
      } else {
        setError("Formula evaluation not available for this combination.");
      }
    } catch {
      setError("Error evaluating formula.");
    }
  }, [formula, params, solveFor, values]);
  if (params.length < 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3",
      "data-ocid": `formula.quicksolve.${formula.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-3.5 h-3.5 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-cyan-400 uppercase tracking-wider", children: "Quick Solve" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Solve for" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: params.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setSolveFor(p);
                setResult(null);
                setError(null);
              },
              className: cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all",
                solveFor === p ? "bg-primary/80 text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"
              ),
              "data-ocid": `formula.solve_for.${formula.id}.${p}`,
              children: p
            },
            p
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mb-3", children: params.filter((p) => p !== solveFor).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `qs-${formula.id}-${p}`,
              className: "text-[10px] text-muted-foreground font-mono",
              children: [
                p,
                " ="
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `qs-${formula.id}-${p}`,
              type: "number",
              placeholder: "enter value",
              value: values[p] ?? "",
              onChange: (e) => setValues((prev) => ({ ...prev, [p]: e.target.value })),
              className: "w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/40",
              "data-ocid": `formula.input.${formula.id}.${p}`
            }
          )
        ] }, p)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleSolve,
            className: "w-full py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold transition-all border border-primary/20",
            "data-ocid": `formula.solve_button.${formula.id}`,
            children: "Calculate"
          }
        ),
        result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold",
            "data-ocid": `formula.result.${formula.id}`,
            children: [
              "✓ ",
              result
            ]
          }
        ),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mt-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs",
            "data-ocid": `formula.error.${formula.id}`,
            children: error
          }
        )
      ]
    }
  );
});
const FormulaCard = reactExports.memo(function FormulaCard2({
  formula,
  index,
  categoryId
}) {
  var _a, _b, _c;
  const [expanded, setExpanded] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("detail");
  const [expandedExample, setExpandedExample] = reactExports.useState(null);
  const handleCopy = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(formula.formula).then(() => {
        setCopied(true);
        ue.success("Formula copied!", {
          description: formula.formula,
          duration: 2500
        });
        setTimeout(() => setCopied(false), 2e3);
      });
    },
    [formula.formula]
  );
  const allTabs = [
    { id: "detail", label: "Details", show: true },
    {
      id: "derivation",
      label: "Derivation",
      show: !!((_a = formula.derivation) == null ? void 0 : _a.length)
    },
    { id: "usecases", label: "Use Cases", show: !!((_b = formula.useCases) == null ? void 0 : _b.length) },
    { id: "examples", label: "Examples", show: !!((_c = formula.examples) == null ? void 0 : _c.length) }
  ];
  const tabs = allTabs.filter((t) => t.show);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2, delay: Math.min(index * 0.03, 0.3) },
      className: "border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] transition-colors duration-200",
      "data-ocid": `formula.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((v) => !v),
            className: "w-full flex items-center gap-3 px-4 py-3 text-left group",
            "aria-expanded": expanded,
            "data-ocid": `formula.toggle.${categoryId}.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex items-center gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-sm text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-400/20 whitespace-nowrap flex-shrink-0", children: formula.formula }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium truncate", children: formula.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleCopy,
                    "aria-label": `Copy ${formula.name}`,
                    className: cn(
                      "p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100",
                      copied ? "bg-accent/20 text-accent" : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
                    ),
                    "data-ocid": `formula.copy_button.${categoryId}.${index + 1}`,
                    children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                  }
                ),
                formula.quickSolveParams && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Calculator,
                  {
                    className: "w-3.5 h-3.5 text-cyan-400/50",
                    "aria-label": "Quick solve available"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    className: cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-200",
                      expanded && "rotate-180"
                    )
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.22, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-1 border-t border-white/[0.08]", children: [
              tabs.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-3 flex-wrap", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(tab.id),
                  className: cn(
                    "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                    activeTab === tab.id ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  ),
                  "data-ocid": `formula.subtab.${categoryId}.${index + 1}.${tab.id}`,
                  children: tab.label
                },
                tab.id
              )) }),
              activeTab === "detail" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-2", children: formula.explanation }),
                formula.variables && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mt-0.5 flex-shrink-0", children: "Variables" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/80 font-mono leading-relaxed", children: formula.variables })
                ] }),
                formula.quickSolveParams && /* @__PURE__ */ jsxRuntimeExports.jsx(QuickSolvePanel, { formula })
              ] }),
              activeTab === "derivation" && formula.derivation && /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: formula.derivation.map((step, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: ordered steps
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.replace(/^\d+\.\s*/, "") })
                ] }, `step-${i}`)
              )) }),
              activeTab === "usecases" && formula.useCases && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3.5 h-3.5 text-amber-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-amber-400 uppercase tracking-wider", children: "Where is this used?" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: formula.useCases.map((uc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex gap-2 text-sm text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent/60 mt-0.5 flex-shrink-0", children: "▸" }),
                      uc
                    ]
                  },
                  `uc-${i}`
                )) })
              ] }),
              activeTab === "examples" && formula.examples && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: formula.examples.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border border-white/10 rounded-xl overflow-hidden",
                  "data-ocid": `formula.example.${categoryId}.${index + 1}.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setExpandedExample(expandedExample === i ? null : i),
                        className: "w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/[0.03]",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-relaxed pr-2", children: ex.problem }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ChevronDown,
                            {
                              className: cn(
                                "w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/50 transition-transform duration-200",
                                expandedExample === i && "rotate-180"
                              )
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expandedExample === i && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { height: 0 },
                        animate: { height: "auto" },
                        exit: { height: 0 },
                        transition: { duration: 0.18 },
                        className: "overflow-hidden",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 pt-1 border-t border-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-accent/90 leading-relaxed", children: ex.solution }) })
                      }
                    ) })
                  ]
                },
                `ex-${i}`
              )) })
            ] })
          }
        ) })
      ]
    }
  );
});
const CategoryPanel = reactExports.memo(function CategoryPanel2({
  category,
  searchQuery,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  const filteredFormulas = reactExports.useMemo(() => {
    if (!searchQuery) return category.formulas;
    const q = searchQuery.toLowerCase();
    return category.formulas.filter(
      (f) => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q) || f.explanation.toLowerCase().includes(q) || (f.keywords ?? []).some((k) => k.toLowerCase().includes(q)) || (f.useCases ?? []).some((u) => u.toLowerCase().includes(q)) || f.category.toLowerCase().includes(q)
    );
  }, [category.formulas, searchQuery]);
  const forceOpen = searchQuery.length > 0 && filteredFormulas.length > 0;
  const isOpen = forceOpen || open;
  if (searchQuery && filteredFormulas.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-2xl overflow-hidden border backdrop-blur-[32px] bg-gradient-to-br bg-card/30",
        category.color
      ),
      "data-ocid": `formula.category.${category.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between px-5 py-4",
            "data-ocid": `formula.category_toggle.${category.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground", children: category.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  filteredFormulas.length,
                  " formula",
                  filteredFormulas.length !== 1 ? "s" : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 space-y-2 border-t border-white/[0.08] pt-3", children: filteredFormulas.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormulaCard,
              {
                formula: f,
                index: i,
                categoryId: category.id
              },
              f.id
            )) })
          }
        ) })
      ]
    }
  );
});
const FormulaOfTheDay = reactExports.memo(function FormulaOfTheDay2() {
  const [dismissed, setDismissed] = reactExports.useState(false);
  const formula = reactExports.useMemo(() => getFormulaOfTheDay(), []);
  if (dismissed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.3 },
      className: "relative rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-400/10 via-orange-400/8 to-yellow-400/10 backdrop-blur-[24px] p-4 mb-6",
      "data-ocid": "formula.fotd_banner",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber-400 fill-amber-400/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-amber-400 uppercase tracking-widest", children: "Formula of the Day" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/60", children: [
                "· Class ",
                formula.class
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-base text-amber-200 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20 whitespace-nowrap", children: formula.formula }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: formula.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-2", children: formula.explanation })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setDismissed(true),
            className: "p-1 rounded-lg hover:bg-white/10 text-muted-foreground/50 hover:text-muted-foreground flex-shrink-0 transition-colors",
            "aria-label": "Dismiss",
            "data-ocid": "formula.fotd_dismiss",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] })
    }
  );
});
function FormulaPage() {
  var _a;
  const [activeClass, setActiveClass] = reactExports.useState("11");
  const [activeCategoryId, setActiveCategoryId] = reactExports.useState(
    "all"
  );
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const searchRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handler = (e) => {
      var _a2, _b, _c;
      if (e.key === "/" && ((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) !== "INPUT" && ((_b = document.activeElement) == null ? void 0 : _b.tagName) !== "TEXTAREA") {
        e.preventDefault();
        (_c = searchRef.current) == null ? void 0 : _c.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const allCategories = activeClass === "11" ? CLASS11_CATEGORIES : CLASS12_CATEGORIES;
  const categories = reactExports.useMemo(
    () => activeCategoryId === "all" ? allCategories : allCategories.filter((c) => c.id === activeCategoryId),
    [allCategories, activeCategoryId]
  );
  const totalFormulas = reactExports.useMemo(
    () => allCategories.reduce((sum, c) => sum + c.formulas.length, 0),
    [allCategories]
  );
  const filteredCount = reactExports.useMemo(() => {
    if (!searchQuery)
      return allCategories.reduce((s, c) => s + c.formulas.length, 0);
    const q = searchQuery.toLowerCase();
    return allCategories.reduce(
      (sum, c) => sum + c.formulas.filter(
        (f) => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q) || f.explanation.toLowerCase().includes(q) || (f.keywords ?? []).some((k) => k.toLowerCase().includes(q)) || (f.useCases ?? []).some((u) => u.toLowerCase().includes(q)) || f.category.toLowerCase().includes(q)
      ).length,
      0
    );
  }, [allCategories, searchQuery]);
  const handleClassChange = reactExports.useCallback((cls) => {
    setActiveClass(cls);
    setActiveCategoryId("all");
    setSearchQuery("");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-10", "data-ocid": "formula.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.38 },
        className: "text-center mb-8 max-w-2xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Class 11 & 12 Chemistry Formulas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent", children: "Formula Library" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "70+ essential formulas for JEE, NEET & board exams. Step-by-step derivations, real-world use cases, and solved examples." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormulaOfTheDay, {}, "fotd") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.1 },
          className: "flex flex-col sm:flex-row gap-3 mb-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex glass rounded-2xl p-1 gap-1 flex-shrink-0", children: ["11", "12"].map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleClassChange(cls),
                className: cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  activeClass === cls ? "bg-primary/80 text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                ),
                "data-ocid": `formula.tab.class${cls}`,
                children: [
                  "Class ",
                  cls
                ]
              },
              cls
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: searchRef,
                  type: "search",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: 'Search formulas… (press "/" to focus)',
                  className: "w-full glass rounded-2xl pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all",
                  "data-ocid": "formula.search_input"
                }
              ),
              searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSearchQuery(""),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 text-muted-foreground/50 hover:text-muted-foreground transition-colors",
                  "aria-label": "Clear search",
                  "data-ocid": "formula.clear_search_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ]
        }
      ),
      !searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.15 },
          className: "flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none",
          "data-ocid": "formula.category_tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveCategoryId("all"),
                className: cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                  activeCategoryId === "all" ? "bg-white/15 text-foreground" : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
                ),
                "data-ocid": "formula.filter.all",
                children: [
                  "All (",
                  totalFormulas,
                  ")"
                ]
              }
            ),
            allCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveCategoryId(cat.id),
                className: cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                  activeCategoryId === cat.id ? "bg-white/15 text-foreground" : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
                ),
                "data-ocid": `formula.filter.${cat.id}`,
                children: [
                  cat.title,
                  " (",
                  cat.formulas.length,
                  ")"
                ]
              },
              cat.id
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: searchQuery ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: filteredCount }),
          " ",
          "of ",
          totalFormulas,
          " formulas match"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: activeCategoryId === "all" ? totalFormulas : ((_a = categories[0]) == null ? void 0 : _a.formulas.length) ?? 0 }),
          " ",
          "formulas in Class ",
          activeClass
        ] }) }),
        searchQuery && filteredCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60", children: "No results found" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          transition: { duration: 0.25 },
          className: "space-y-4",
          "data-ocid": `formula.class${activeClass}_list`,
          children: [
            categories.map((cat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryPanel,
              {
                category: cat,
                searchQuery,
                defaultOpen: idx === 0
              },
              cat.id
            )),
            searchQuery && filteredCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass rounded-2xl p-10 text-center",
                "data-ocid": "formula.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-10 h-10 mx-auto mb-3 opacity-20" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                    "No formulas match “",
                    searchQuery,
                    "”"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSearchQuery(""),
                      className: "mt-3 text-xs text-primary underline-offset-4 hover:underline",
                      "data-ocid": "formula.clear_search_empty_button",
                      children: "Clear search"
                    }
                  )
                ]
              }
            )
          ]
        },
        `${activeClass}-${activeCategoryId}`
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5 },
          className: "text-center text-xs text-muted-foreground/50 mt-10 pb-8",
          children: [
            "Press",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]", children: "/" }),
            " ",
            "to search · Tap to expand · Hover for copy"
          ]
        }
      )
    ] })
  ] });
}
export {
  FormulaPage
};
