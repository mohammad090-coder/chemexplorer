import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface Flashcard {
  id: string;
  topic: string;
  question: string;
  answer: string;
}

interface FlashcardTopic {
  id: string;
  label: string;
  color: string;
  cards: Flashcard[];
}

const FLASHCARD_TOPICS: FlashcardTopic[] = [
  {
    id: "atomic",
    label: "Atomic Structure",
    color: "oklch(0.72 0.22 30)",
    cards: [
      {
        id: "a1",
        topic: "Atomic Structure",
        question: "What is the atomic number of Carbon?",
        answer: "6 — Carbon has 6 protons in its nucleus.",
      },
      {
        id: "a2",
        topic: "Atomic Structure",
        question: "Who proposed the nuclear model of the atom?",
        answer:
          "Ernest Rutherford (1911), based on the gold foil experiment showing a dense, positive nucleus.",
      },
      {
        id: "a3",
        topic: "Atomic Structure",
        question: "What is the Aufbau principle?",
        answer:
          "Electrons fill orbitals in order of increasing energy: 1s → 2s → 2p → 3s → 3p → 4s → 3d …",
      },
      {
        id: "a4",
        topic: "Atomic Structure",
        question: "State Pauli's Exclusion Principle.",
        answer:
          "No two electrons in an atom can have the same set of four quantum numbers. Each orbital holds at most 2 electrons with opposite spins.",
      },
      {
        id: "a5",
        topic: "Atomic Structure",
        question: "What is Hund's Rule of maximum multiplicity?",
        answer:
          "Electrons fill degenerate orbitals singly with parallel spins before any pairing occurs. This minimises repulsion.",
      },
      {
        id: "a6",
        topic: "Atomic Structure",
        question: "Write de Broglie's wavelength equation.",
        answer:
          "λ = h / mv, where h is Planck's constant, m is mass, and v is velocity. Matter has wave-particle duality.",
      },
      {
        id: "a7",
        topic: "Atomic Structure",
        question: "State Heisenberg's Uncertainty Principle.",
        answer:
          "Δx · Δp ≥ h / 4π. The position and momentum of a particle cannot both be known precisely simultaneously.",
      },
      {
        id: "a8",
        topic: "Atomic Structure",
        question: "Which hydrogen spectral series falls in the visible region?",
        answer:
          "The Balmer series (n → 2 transitions). It produces 4 visible lines: red (Hα, 656 nm), blue-green (Hβ), and two violet lines.",
      },
      {
        id: "a9",
        topic: "Atomic Structure",
        question: "What is the energy of an electron in the nth Bohr orbit?",
        answer: "Eₙ = −13.6 × Z² / n² eV. For hydrogen (Z=1): E₁ = −13.6 eV.",
      },
      {
        id: "a10",
        topic: "Atomic Structure",
        question: "What quantum number describes the shape of an orbital?",
        answer:
          "The azimuthal (angular momentum) quantum number l. l = 0 → s (spherical); l = 1 → p (dumbbell); l = 2 → d (clover).",
      },
    ],
  },
  {
    id: "bonding",
    label: "Chemical Bonding",
    color: "oklch(0.7 0.21 140)",
    cards: [
      {
        id: "b1",
        topic: "Chemical Bonding",
        question: "What type of bond forms between Na and Cl?",
        answer:
          "Ionic bond — Na donates its 3s electron to Cl, forming Na⁺ and Cl⁻ ions held by electrostatic attraction.",
      },
      {
        id: "b2",
        topic: "Chemical Bonding",
        question: "What is VSEPR theory?",
        answer:
          "Valence Shell Electron Pair Repulsion — electron pairs arrange to minimise repulsion, determining molecular geometry.",
      },
      {
        id: "b3",
        topic: "Chemical Bonding",
        question: "What is the shape and bond angle of H₂O?",
        answer:
          "V-shape (bent), bond angle 104.5°. Two lone pairs on O compress the H-O-H angle below tetrahedral (109.5°).",
      },
      {
        id: "b4",
        topic: "Chemical Bonding",
        question: "What is hybridisation of the central atom in BF₃?",
        answer:
          "sp² hybridisation — trigonal planar, 120° bond angles. Three sp² orbitals form σ bonds; one empty p orbital is perpendicular.",
      },
      {
        id: "b5",
        topic: "Chemical Bonding",
        question: "Why does H₂O have a high boiling point compared to H₂S?",
        answer:
          "Extensive hydrogen bonding in H₂O (each molecule forms ~4 H-bonds). H₂S has only weak van der Waals forces.",
      },
      {
        id: "b6",
        topic: "Chemical Bonding",
        question: "Define bond order. What is the bond order of N₂?",
        answer:
          "Bond order = (bonding electrons − antibonding electrons) / 2. N₂ has bond order 3 (triple bond) — the strongest diatomic bond.",
      },
      {
        id: "b7",
        topic: "Chemical Bonding",
        question: "Why is CO₂ non-polar despite polar C=O bonds?",
        answer:
          "CO₂ is linear (sp hybridised). The two C=O bond dipoles point in opposite directions and cancel perfectly → net dipole = 0.",
      },
      {
        id: "b8",
        topic: "Chemical Bonding",
        question: "State Fajan's rules for covalent character.",
        answer:
          "Covalent character increases with: (1) high cation charge, (2) small cation, (3) large anion, (4) high anion charge. Example: AlCl₃ is more covalent than NaCl.",
      },
      {
        id: "b9",
        topic: "Chemical Bonding",
        question: "Why is O₂ paramagnetic according to MO theory?",
        answer:
          "O₂ has two unpaired electrons in degenerate π*2p antibonding orbitals (Hund's rule). VB theory incorrectly predicts it as diamagnetic.",
      },
      {
        id: "b10",
        topic: "Chemical Bonding",
        question: "What is the resonance energy of benzene?",
        answer:
          "~152 kJ/mol — the extra stability benzene has compared to a hypothetical 'Kekulé' cyclohexadiene with alternating single and double bonds.",
      },
    ],
  },
  {
    id: "thermo",
    label: "Thermodynamics",
    color: "oklch(0.72 0.25 50)",
    cards: [
      {
        id: "t1",
        topic: "Thermodynamics",
        question: "What is Hess's Law?",
        answer:
          "Enthalpy change of a reaction is independent of the pathway; it depends only on the initial and final states (enthalpy is a state function).",
      },
      {
        id: "t2",
        topic: "Thermodynamics",
        question: "Write the Gibbs free energy equation.",
        answer: "ΔG = ΔH − TΔS. A reaction is spontaneous when ΔG < 0.",
      },
      {
        id: "t3",
        topic: "Thermodynamics",
        question: "State the First Law of Thermodynamics.",
        answer:
          "Energy cannot be created or destroyed, only converted. ΔU = q + w (heat added to system plus work done on system).",
      },
      {
        id: "t4",
        topic: "Thermodynamics",
        question: "When is a reaction spontaneous at all temperatures?",
        answer:
          "When ΔH < 0 (exothermic) AND ΔS > 0 (entropy increases). Then ΔG = ΔH − TΔS is always negative.",
      },
      {
        id: "t5",
        topic: "Thermodynamics",
        question: "What does Kirchhoff's law state?",
        answer:
          "dΔH/dT = ΔCp. The enthalpy of reaction changes with temperature proportional to the difference in heat capacities of products and reactants.",
      },
      {
        id: "t6",
        topic: "Thermodynamics",
        question: "Define standard enthalpy of formation.",
        answer:
          "Enthalpy change when 1 mole of a compound is formed from its elements in their standard states at 298 K and 1 atm. ΔHf° of elements = 0.",
      },
      {
        id: "t7",
        topic: "Thermodynamics",
        question:
          "Why is ΔH of neutralisation of weak acid less than −57.1 kJ/mol?",
        answer:
          "Energy is consumed to ionise the weak acid first. Net ΔH = −57.1 + ΔHionisation, which is less negative (less exothermic).",
      },
      {
        id: "t8",
        topic: "Thermodynamics",
        question: "What is bond enthalpy and how is it used to estimate ΔH?",
        answer:
          "Energy to break 1 mole of a bond in gaseous state. ΔH ≈ Σ(bonds broken) − Σ(bonds formed). Positive = endothermic; negative = exothermic.",
      },
      {
        id: "t9",
        topic: "Thermodynamics",
        question: "State the Third Law of Thermodynamics.",
        answer:
          "The entropy of a perfect crystal at absolute zero (0 K) is exactly zero. All entropy values at higher temperatures are positive.",
      },
      {
        id: "t10",
        topic: "Thermodynamics",
        question: "What does ΔG° = −RT ln K tell us?",
        answer:
          "The standard free energy change is directly related to the equilibrium constant K. Large positive K → ΔG° very negative → strongly spontaneous.",
      },
    ],
  },
  {
    id: "organic",
    label: "Organic Chemistry",
    color: "oklch(0.7 0.2 170)",
    cards: [
      {
        id: "o1",
        topic: "Organic Chemistry",
        question: "What is a nucleophile?",
        answer:
          "Electron-rich species that attacks electrophiles. Examples: OH⁻, CN⁻, NH₃, halide ions, water. Donate electron pairs to form bonds.",
      },
      {
        id: "o2",
        topic: "Organic Chemistry",
        question: "What is Markovnikov's Rule?",
        answer:
          "In HX addition to an asymmetric alkene, H adds to the carbon with more H atoms (less substituted C), X adds to the more substituted C via the more stable carbocation.",
      },
      {
        id: "o3",
        topic: "Organic Chemistry",
        question: "What is the difference between SN1 and SN2?",
        answer:
          "SN2: one step, backside attack, inversion, favoured by 1° substrates + strong nucleophile + polar aprotic solvent. SN1: two steps via carbocation, racemisation, favoured by 3° substrates + polar protic solvent.",
      },
      {
        id: "o4",
        topic: "Organic Chemistry",
        question: "State Hückel's rule for aromaticity.",
        answer:
          "A compound is aromatic if it is planar, fully conjugated, and contains (4n + 2) π electrons (n = 0, 1, 2…). Benzene: n=1, 6π electrons — aromatic.",
      },
      {
        id: "o5",
        topic: "Organic Chemistry",
        question: "What is the inductive effect?",
        answer:
          "Electron withdrawal or donation through σ bonds. Diminishes rapidly with distance (negligible beyond 3 bonds). Electron-withdrawing groups: NO₂, CN, COOH. Donating: alkyl groups.",
      },
      {
        id: "o6",
        topic: "Organic Chemistry",
        question: "When does Aldol condensation occur vs Cannizzaro reaction?",
        answer:
          "Aldol: requires α-hydrogen on the carbonyl (dil. NaOH). Cannizzaro: requires NO α-hydrogen (conc. NaOH) — disproportionation to alcohol + acid salt.",
      },
      {
        id: "o7",
        topic: "Organic Chemistry",
        question: "What does LiAlH₄ reduce vs NaBH₄?",
        answer:
          "LiAlH₄ reduces all carbonyls (RCHO, RCOR, RCOOH, RCOOR, RCONR₂). NaBH₄ reduces only aldehydes and ketones — safer, selective, works in protic solvents.",
      },
      {
        id: "o8",
        topic: "Organic Chemistry",
        question: "What is the degrees of unsaturation (DBE) formula?",
        answer:
          "DBE = (2C + 2 + N − H − X) / 2. Example: C₆H₆ (benzene) = (12 + 2 − 6) / 2 = 4 → 1 ring + 3 double bonds.",
      },
      {
        id: "o9",
        topic: "Organic Chemistry",
        question:
          "Classify these as ortho/para or meta directors: OH, NO₂, Cl, COOH.",
        answer:
          "O/P directors: OH (activates), Cl (deactivates but o/p via lone pair). Meta directors: NO₂ (deactivates), COOH (deactivates). Lone pair on ring-attached atom → o/p director.",
      },
      {
        id: "o10",
        topic: "Organic Chemistry",
        question: "What is a meso compound?",
        answer:
          "A molecule with chiral centres but overall achiral due to an internal plane of symmetry. Example: meso-tartaric acid (2R,3S configuration). Optically inactive despite having stereocentres.",
      },
    ],
  },
  {
    id: "kinetics",
    label: "Chemical Kinetics",
    color: "oklch(0.7 0.2 22)",
    cards: [
      {
        id: "k1",
        topic: "Chemical Kinetics",
        question:
          "What is the Arrhenius equation and what do its components represent?",
        answer:
          "k = Ae^(-Ea/RT). A = frequency/pre-exponential factor. Ea = activation energy (J/mol). R = 8.314 J/mol·K. T = temperature (K). Higher T or lower Ea → faster reaction. ln(k₂/k₁) = Ea/R × (1/T₁ − 1/T₂) is used to find Ea from two rate constants at two temperatures.",
      },
      {
        id: "k2",
        topic: "Chemical Kinetics",
        question:
          "Why does the reaction rate approximately double for every 10°C rise?",
        answer:
          "Using Arrhenius: for Ea ≈ 60 kJ/mol, a 10°C rise from 300 K to 310 K gives k₂/k₁ ≈ 1.9 ≈ 2. More molecules exceed Ea at higher T (Maxwell-Boltzmann distribution shifts right). Empirical rule of thumb: rate doubles per 10°C (temperature coefficient ≈ 2).",
      },
      {
        id: "k3",
        topic: "Chemical Kinetics",
        question:
          "Define order and molecularity of a reaction. Are they always equal?",
        answer:
          "Order: experimentally determined exponent in rate = k[A]^m[B]^n — can be 0, fractional, negative. Molecularity: number of molecules in an elementary step (1=unimolecular, 2=bimolecular). Equal ONLY for elementary reactions. Multi-step reactions can have non-integer order despite integer molecularity at each step.",
      },
      {
        id: "k4",
        topic: "Chemical Kinetics",
        question: "What is a pseudo-first-order reaction? Give an example.",
        answer:
          "When one reactant is in such excess that its concentration is effectively constant, the reaction appears first-order. Example: CH₃COOC₂H₅ + H₂O → products. With excess water: rate = k'[ester], where k' = k[H₂O] is the pseudo-first-order rate constant. Used in enzyme kinetics and many industrial analyses.",
      },
      {
        id: "k5",
        topic: "Chemical Kinetics",
        question: "What does a catalyst do and what does it NOT change?",
        answer:
          "A catalyst provides an alternative pathway with lower Ea — increases both forward and reverse rate constants equally. Does NOT change: ΔH, ΔG, equilibrium constant K, or thermodynamics. Heterogeneous catalysis: reactants adsorb on solid surface. Enzymes: active-site geometry perfectly matches substrate (lock-and-key / induced-fit).",
      },
    ],
  },
  {
    id: "equilibrium",
    label: "Chemical Equilibrium",
    color: "oklch(0.7 0.18 200)",
    cards: [
      {
        id: "eq1",
        topic: "Chemical Equilibrium",
        question: "State Le Chatelier's Principle with examples.",
        answer:
          "If a dynamic equilibrium is disturbed, the system shifts to oppose the change. Example: N₂ + 3H₂ ⇌ 2NH₃ (ΔH = −92 kJ/mol). Increase P → shifts right (fewer gas moles). Increase T → shifts left (exothermic back reaction). Add N₂ → shifts right. For 2NO₂ ⇌ N₂O₄: cool flask → colorless (exothermic forward reaction favored).",
      },
      {
        id: "eq2",
        topic: "Chemical Equilibrium",
        question: "Write the expressions for Kc and Kp. When are they equal?",
        answer:
          "Kc = [products]^coeff / [reactants]^coeff (pure solids/liquids excluded). Kp = Kc(RT)^Δng where Δng = moles gaseous products − moles gaseous reactants. Kp = Kc when Δng = 0 (e.g. H₂ + I₂ ⇌ 2HI). For N₂ + 3H₂ ⇌ 2NH₃: Δng = −2, so Kp = Kc(RT)^−2 ≠ Kc.",
      },
      {
        id: "eq3",
        topic: "Chemical Equilibrium",
        question:
          "What does the reaction quotient Q tell you about the direction of reaction?",
        answer:
          "Q is calculated exactly like Kc using current (non-equilibrium) concentrations. If Q < K: reaction goes forward (more products needed). If Q > K: reaction reverses (products decompose). If Q = K: system is at equilibrium. Q is essential for predicting reaction direction before equilibrium is established.",
      },
    ],
  },
  {
    id: "electro",
    label: "Electrochemistry",
    color: "oklch(0.68 0.2 330)",
    cards: [
      {
        id: "e1",
        topic: "Electrochemistry",
        question: "What is the standard hydrogen electrode (SHE) potential?",
        answer:
          "0 V by convention. SHE consists of H₂ gas (1 atm) bubbled over a Pt electrode in 1 M HCl at 25°C. It is the universal reference electrode.",
      },
      {
        id: "e2",
        topic: "Electrochemistry",
        question: "Write the Nernst equation.",
        answer:
          "E = E° − (0.0592/n) log Q at 25°C. Here E° is standard potential, n is electrons transferred, Q is reaction quotient.",
      },
      {
        id: "e3",
        topic: "Electrochemistry",
        question: "State Faraday's First Law of Electrolysis.",
        answer:
          "Mass of substance deposited/dissolved at an electrode is directly proportional to the quantity of charge passed: m = ZIt = ZQ, where Z = M/(nF).",
      },
      {
        id: "e4",
        topic: "Electrochemistry",
        question: "What is Kohlrausch's Law?",
        answer:
          "At infinite dilution, the molar conductivity Λ°m = sum of contributions from individual ions (λ⁺ + λ⁻). Used to calculate Λ°m of weak electrolytes indirectly.",
      },
      {
        id: "e5",
        topic: "Electrochemistry",
        question: "What is the relationship between ΔG° and E°cell?",
        answer:
          "ΔG° = −nFE°cell. Spontaneous reaction (ΔG° < 0) ↔ positive E°cell. At equilibrium: E°cell = (0.0592/n) log K at 25°C.",
      },
      {
        id: "e6",
        topic: "Electrochemistry",
        question: "What is the EMF of a Zn-Cu Daniell cell?",
        answer:
          "E°cell = E°cathode − E°anode = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) = +0.34 − (−0.76) = +1.10 V. Zn is oxidised (anode), Cu²⁺ reduced (cathode).",
      },
      {
        id: "e7",
        topic: "Electrochemistry",
        question: "In a dry cell, what are the anode and cathode materials?",
        answer:
          "Anode: zinc (Zn) — oxidised. Cathode: MnO₂ + graphite (carbon rod) — MnO₂ is reduced. Electrolyte: NH₄Cl + ZnCl₂ paste. EMF ≈ 1.5 V.",
      },
      {
        id: "e8",
        topic: "Electrochemistry",
        question: "Why does corrosion of iron require both O₂ and moisture?",
        answer:
          "Iron rusting is electrochemical: Fe → Fe²⁺ + 2e⁻ (anode); O₂ + 2H₂O + 4e⁻ → 4OH⁻ (cathode). Water acts as electrolyte; O₂ is the oxidising agent. Without either, the circuit is broken.",
      },
      {
        id: "e9",
        topic: "Electrochemistry",
        question: "What is the advantage of a Li-ion battery over lead-acid?",
        answer:
          "Li-ion: higher energy density (~150-200 Wh/kg vs ~35 Wh/kg), lighter, 3.7 V per cell, rechargeable, no memory effect. Lead-acid: cheaper, reliable for high current, but heavy and contains toxic lead.",
      },
      {
        id: "e10",
        topic: "Electrochemistry",
        question:
          "What is the difference between galvanic and electrolytic cells?",
        answer:
          "Galvanic: spontaneous redox → produces electricity (anode = negative). Electrolytic: non-spontaneous, driven by external electricity (anode = positive, connected to +ve terminal).",
      },
    ],
  },
];

const ALL_CARDS = FLASHCARD_TOPICS.flatMap((t) =>
  t.cards.map((c) => ({ ...c, topicColor: t.color, topicId: t.id })),
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardsTab() {
  const [topicId, setTopicId] = useState<string>("all");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState(ALL_CARDS);

  // Touch/swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const filteredDeck =
    topicId === "all" ? deck : deck.filter((c) => c.topicId === topicId);
  const card = filteredDeck[cardIndex] ?? filteredDeck[0];
  const safeIndex = filteredDeck[cardIndex] ? cardIndex : 0;
  const topicColor = card
    ? (FLASHCARD_TOPICS.find((t) => t.id === card.topicId)?.color ??
      "oklch(0.68 0.16 258)")
    : "oklch(0.68 0.16 258)";

  const goNext = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => (i + 1) % filteredDeck.length), 80);
  }, [filteredDeck.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setTimeout(
      () =>
        setCardIndex(
          (i) => (i - 1 + filteredDeck.length) % filteredDeck.length,
        ),
      80,
    );
  }, [filteredDeck.length]);

  function handleTopicChange(id: string) {
    setTopicId(id);
    setCardIndex(0);
    setFlipped(false);
  }

  function handleShuffle() {
    setDeck(shuffle(ALL_CARDS));
    setCardIndex(0);
    setFlipped(false);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 50 && dy < 60) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Topic selector */}
      <div className="flex flex-wrap gap-2 mb-5 justify-center">
        <button
          type="button"
          data-ocid="flashcards.topic.all"
          onClick={() => handleTopicChange("all")}
          className="text-xs px-3 py-1.5 rounded-xl border transition-all"
          style={
            topicId === "all"
              ? {
                  background: "oklch(0.68 0.16 258 / 0.18)",
                  color: "oklch(0.68 0.16 258)",
                  borderColor: "oklch(0.68 0.16 258 / 0.4)",
                }
              : { borderColor: "oklch(0.3 0.02 250)", color: "oklch(0.58 0 0)" }
          }
        >
          All ({ALL_CARDS.length})
        </button>
        {FLASHCARD_TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            data-ocid={`flashcards.topic.${t.id}`}
            onClick={() => handleTopicChange(t.id)}
            className="text-xs px-3 py-1.5 rounded-xl border transition-all"
            style={
              topicId === t.id
                ? {
                    background: `${t.color}22`,
                    color: t.color,
                    borderColor: `${t.color}55`,
                  }
                : {
                    borderColor: "oklch(0.3 0.02 250)",
                    color: "oklch(0.58 0 0)",
                  }
            }
          >
            {t.label} ({t.cards.length})
          </button>
        ))}
      </div>

      {/* Progress & shuffle row */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs text-muted-foreground">
          Card{" "}
          <span className="font-semibold text-foreground">{safeIndex + 1}</span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {filteredDeck.length}
          </span>
          {topicId !== "all" && (
            <span className="ml-1 opacity-70">
              · {FLASHCARD_TOPICS.find((t) => t.id === topicId)?.label}
            </span>
          )}
        </p>
        <button
          type="button"
          data-ocid="flashcards.shuffle_button"
          onClick={handleShuffle}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-border/30 text-muted-foreground hover:text-foreground transition-all"
          style={{ background: "oklch(0.16 0.018 250 / 0.7)" }}
        >
          <Shuffle className="w-3.5 h-3.5" />
          Shuffle
        </button>
      </div>

      {/* Card */}
      {card && (
        <div
          className="mb-6 select-none"
          style={{ perspective: "1200px" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          data-ocid="flashcards.card"
        >
          <button
            type="button"
            className="relative w-full cursor-pointer text-left"
            onClick={() => setFlipped((f) => !f)}
            aria-label={
              flipped ? "Click to see question" : "Click to reveal answer"
            }
          >
            {/* Flip container */}
            <div
              className="relative w-full"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.5s ease-in-out",
                minHeight: "220px",
              }}
            >
              {/* Front face */}
              <div
                className="absolute inset-0 rounded-2xl border p-8 flex flex-col items-center justify-center text-center"
                style={{
                  background: `${topicColor}11`,
                  borderColor: `${topicColor}33`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="text-xs font-semibold mb-3 px-3 py-1 rounded-full"
                  style={{ background: `${topicColor}22`, color: topicColor }}
                >
                  {card.topic}
                </span>
                <p className="text-foreground font-semibold text-base leading-relaxed">
                  {card.question}
                </p>
                <p className="text-xs text-muted-foreground mt-5 opacity-70">
                  Tap to flip ↓
                </p>
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 rounded-2xl border p-8 flex flex-col items-center justify-center text-center"
                style={{
                  background: "oklch(0.12 0.06 140 / 0.6)",
                  borderColor: "oklch(0.56 0.18 140 / 0.4)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="text-xs font-semibold mb-3 px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.7 0.21 140 / 0.22)",
                    color: "oklch(0.7 0.21 140)",
                  }}
                >
                  Answer
                </span>
                <p className="text-foreground/90 text-sm leading-relaxed">
                  {card.answer}
                </p>
                <p className="text-xs text-muted-foreground mt-5 opacity-70">
                  Tap to see question ↑
                </p>
              </div>
            </div>
          </button>

          {/* Mobile swipe hint */}
          <p className="text-center text-xs text-muted-foreground mt-2 opacity-60 sm:hidden">
            ← Swipe left/right to navigate
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          data-ocid="flashcards.prev_button"
          onClick={goPrev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/20 text-sm font-medium text-muted-foreground hover:text-foreground transition-all flex-1 justify-center"
          style={{ background: "oklch(0.16 0.018 250 / 0.7)" }}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          type="button"
          data-ocid="flashcards.next_button"
          onClick={goNext}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/20 text-sm font-medium text-muted-foreground hover:text-foreground transition-all flex-1 justify-center"
          style={{ background: "oklch(0.16 0.018 250 / 0.7)" }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-5 flex-wrap">
        {filteredDeck.slice(0, 25).map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setCardIndex(i);
              setFlipped(false);
            }}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: i === safeIndex ? topicColor : "oklch(0.28 0.02 250)",
            }}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
        {filteredDeck.length > 25 && (
          <span className="text-xs text-muted-foreground self-center">
            +{filteredDeck.length - 25}
          </span>
        )}
      </div>
    </div>
  );
}
