import { useChemStore } from "@/store/useChemStore";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  RotateCcw,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── QUICK FORMULAS ────────────────────────────────────────────────────────────
interface QuickFormula {
  id: string;
  name: string;
  formula: string;
  color: string;
}

const QUICK_FORMULAS: QuickFormula[] = [
  {
    id: "qf1",
    name: "pH definition",
    formula: "pH = −log[H⁺]",
    color: "oklch(0.7 0.21 140)",
  },
  {
    id: "qf2",
    name: "Molarity",
    formula: "M = moles / litres",
    color: "oklch(0.68 0.16 258)",
  },
  {
    id: "qf3",
    name: "Gibbs Free Energy",
    formula: "ΔG = ΔH − TΔS",
    color: "oklch(0.72 0.25 50)",
  },
  {
    id: "qf4",
    name: "Planck's relation",
    formula: "E = hν",
    color: "oklch(0.72 0.22 30)",
  },
  {
    id: "qf5",
    name: "de Broglie",
    formula: "λ = h/mv",
    color: "oklch(0.72 0.22 30)",
  },
  {
    id: "qf6",
    name: "Ideal Gas Law",
    formula: "pV = nRT",
    color: "oklch(0.68 0.2 330)",
  },
  {
    id: "qf7",
    name: "Hess's Law (formation)",
    formula: "ΔH° = Σ ΔHf°(prod) − Σ ΔHf°(react)",
    color: "oklch(0.72 0.25 50)",
  },
  {
    id: "qf8",
    name: "Kp from Kc",
    formula: "Kp = Kc(RT)^Δng",
    color: "oklch(0.68 0.16 258)",
  },
  {
    id: "qf9",
    name: "Half-life (first order)",
    formula: "t½ = 0.693 / k",
    color: "oklch(0.7 0.2 22)",
  },
  {
    id: "qf10",
    name: "Rate law",
    formula: "rate = k[A]ᵐ[B]ⁿ",
    color: "oklch(0.7 0.2 22)",
  },
  {
    id: "qf11",
    name: "Nernst equation",
    formula: "E = E° − (0.0592/n) log Q",
    color: "oklch(0.68 0.2 330)",
  },
  {
    id: "qf12",
    name: "Bohr orbit energy",
    formula: "Eₙ = −13.6 Z²/n² eV",
    color: "oklch(0.72 0.22 30)",
  },
  {
    id: "qf13",
    name: "Faraday's law",
    formula: "m = M·I·t / (n·F)",
    color: "oklch(0.68 0.2 330)",
  },
  {
    id: "qf14",
    name: "Boiling point elevation",
    formula: "ΔTb = Kb · m · i",
    color: "oklch(0.68 0.16 258)",
  },
  {
    id: "qf15",
    name: "Freezing point depression",
    formula: "ΔTf = Kf · m · i",
    color: "oklch(0.68 0.16 258)",
  },
  {
    id: "qf16",
    name: "van der Waals",
    formula: "(P + a/V²)(V − b) = RT",
    color: "oklch(0.68 0.2 330)",
  },
  {
    id: "qf17",
    name: "Henderson-Hasselbalch",
    formula: "pH = pKa + log([A⁻]/[HA])",
    color: "oklch(0.7 0.21 140)",
  },
  {
    id: "qf18",
    name: "Bond order (MO)",
    formula: "BO = (Nb − Na) / 2",
    color: "oklch(0.7 0.21 140)",
  },
  {
    id: "qf19",
    name: "Degrees of unsaturation",
    formula: "DBE = (2C + 2 + N − H − X) / 2",
    color: "oklch(0.72 0.25 50)",
  },
  {
    id: "qf20",
    name: "ΔG° and equilibrium",
    formula: "ΔG° = −RT ln K = −nFE°cell",
    color: "oklch(0.72 0.25 50)",
  },
];

function FormulaItem({ f }: { f: QuickFormula }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(`${f.name}: ${f.formula}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div
      className="flex items-center gap-2 rounded-xl border p-3 transition-all"
      style={{ background: `${f.color}0d`, borderColor: `${f.color}2a` }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5 truncate">
          {f.name}
        </p>
        <p
          className="font-mono text-sm font-semibold truncate"
          style={{ color: f.color }}
        >
          {f.formula}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex-shrink-0 p-1.5 rounded-lg border transition-all"
        style={
          copied
            ? {
                background: "oklch(0.7 0.21 140 / 0.15)",
                borderColor: "oklch(0.7 0.21 140 / 0.4)",
                color: "oklch(0.7 0.21 140)",
              }
            : {
                background: "oklch(0.2 0.02 250 / 0.5)",
                borderColor: "oklch(0.28 0.02 250)",
                color: "oklch(0.58 0 0)",
              }
        }
        aria-label={`Copy ${f.name}`}
        data-ocid={`revision.formula_copy.${f.id}`}
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}

function QuickFormulasSection() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border mb-7 overflow-hidden"
      style={{
        background: "oklch(0.15 0.02 258 / 0.7)",
        borderColor: "oklch(0.68 0.16 258 / 0.3)",
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setOpen((o) => !o)}
        data-ocid="revision.quick_formulas_toggle"
      >
        <div>
          <p className="font-semibold text-sm text-foreground">
            ⚡ Quick Formulas
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {QUICK_FORMULAS.length} essential formulas — click to copy
          </p>
        </div>
        <ChevronDown
          className="w-4 h-4 text-muted-foreground transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "900px" : "0" }}
      >
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUICK_FORMULAS.map((f) => (
            <FormulaItem key={f.id} f={f} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface RevisionCard {
  id: string;
  topic: string;
  question: string;
  answer: string;
  category:
    | "Periodic Trends"
    | "Atomic Structure"
    | "Chemical Bonding"
    | "Organic Fundamentals"
    | "Electrochemistry"
    | "Thermochemistry"
    | "Common Mistakes"
    | "Mnemonics"
    | "Industrial"
    | "Real Life";
}

const CATEGORY_COLORS: Record<RevisionCard["category"], string> = {
  "Periodic Trends": "oklch(0.68 0.16 258)",
  "Atomic Structure": "oklch(0.72 0.22 30)",
  "Chemical Bonding": "oklch(0.7 0.21 140)",
  "Organic Fundamentals": "oklch(0.72 0.25 50)",
  Electrochemistry: "oklch(0.68 0.2 330)",
  Thermochemistry: "oklch(0.7 0.18 200)",
  "Common Mistakes": "oklch(0.7 0.2 22)",
  Mnemonics: "oklch(0.68 0.22 295)",
  Industrial: "oklch(0.7 0.22 165)",
  "Real Life": "oklch(0.72 0.18 180)",
};

const REVISION_CARDS: RevisionCard[] = [
  // ── PERIODIC TRENDS (10 cards) ───────────────────────────────────────────
  {
    id: "pt-1",
    topic: "Atomic Radius — Period",
    question: "Why does atomic radius decrease across a period?",
    answer:
      "As you move right across a period, nuclear charge (protons) increases while electrons are added to the SAME shell. More protons pull the electron cloud inward with stronger Zeff (effective nuclear charge). Shielding by same-shell electrons is poor (~0.35 per e⁻), so the net pull increases sharply.",
    category: "Periodic Trends",
  },
  {
    id: "pt-2",
    topic: "Ionization Energy Anomalies",
    question: "Why is IE₁(N) > IE₁(O) and IE₁(Be) > IE₁(B)?",
    answer:
      "N has a half-filled 2p³ configuration (each p orbital singly occupied) — extra stability makes it harder to remove an electron. O has a paired 2p electron; the extra repulsion makes it EASIER to remove. Similarly, Be has a filled 2s² — stable. B has a single 2p electron that is easier to remove than Be's 2s electrons.",
    category: "Periodic Trends",
  },
  {
    id: "pt-3",
    topic: "Electron Affinity: Cl > F",
    question:
      "Why does Cl have higher electron affinity than F despite F being more electronegative?",
    answer:
      "F's 2p orbital is very small — adding an electron causes significant electron-electron repulsion in that compact space. Cl's 3p orbital is larger, so the incoming electron experiences less repulsion. Result: Cl EA = −349 kJ/mol, F EA = −328 kJ/mol. This is one of the most commonly tested EA exceptions.",
    category: "Periodic Trends",
  },
  {
    id: "pt-4",
    topic: "Lanthanide Contraction",
    question: "What is lanthanide contraction and its consequences?",
    answer:
      "Lanthanide contraction = steady decrease in ionic radius from La³⁺ to Lu³⁺ due to poor shielding by 4f electrons (they penetrate poorly, shield poorly). Consequences: (1) 4d and 5d transition metals have nearly equal sizes (Zr ≈ Hf), (2) 5d metals have higher IE than expected, (3) Au, Pt, Ir are denser and less reactive than predicted.",
    category: "Periodic Trends",
  },
  {
    id: "pt-5",
    topic: "Isoelectronic Series",
    question: "Arrange in order of increasing size: O²⁻, F⁻, Ne, Na⁺, Mg²⁺",
    answer:
      "O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺. All have 10 electrons (isoelectronic). Greater nuclear charge = smaller size. Z: O=8, F=9, Ne=10, Na=11, Mg=12. The more protons pulling 10 electrons, the smaller the ion. Mg²⁺ is smallest (Z=12, 10e⁻). O²⁻ is largest (Z=8, 10e⁻).",
    category: "Periodic Trends",
  },
  {
    id: "pt-6",
    topic: "Metallic/Non-Metallic Border",
    question:
      "Name the metalloids and explain why they're called semiconductors.",
    answer:
      "Metalloids: B, Si, Ge, As, Sb, Te (and sometimes At, Po). They lie along the staircase in the periodic table. Called semiconductors because their electrical conductivity is between metals (conductors) and non-metals (insulators). Silicon has a band gap of 1.1 eV — thermal energy can promote electrons across it, giving controllable conductivity. Basis of all modern electronics.",
    category: "Periodic Trends",
  },
  {
    id: "pt-7",
    topic: "Ionic Radius: Cation vs Anion",
    question:
      "How does ionic radius compare to parent atom for cations and anions?",
    answer:
      "Cation: always SMALLER than parent atom. Removing electrons reduces e–e repulsion and the same nuclear charge pulls fewer electrons closer. Example: Na (186 pm) → Na⁺ (102 pm). Anion: always LARGER than parent atom. Extra electrons increase e–e repulsion, expanding the cloud. Example: Cl (99 pm) → Cl⁻ (181 pm). This is a fundamental ionic radius rule.",
    category: "Periodic Trends",
  },
  {
    id: "pt-8",
    topic: "Electronegativity Scale",
    question:
      "Write the Pauling electronegativity values for F, O, N, Cl, Br, C, H.",
    answer:
      "F (3.98) > O (3.44) > Cl (3.16) > N (3.04) > Br (2.96) > C (2.55) > H (2.20) > Na (0.93). Note: Cl (3.16) > N (3.04) — frequently tested. EN difference: >1.7 ionic; 0.4–1.7 polar covalent; <0.4 nonpolar. Noble gases have no defined EN (Pauling scale).",
    category: "Periodic Trends",
  },
  {
    id: "pt-9",
    topic: "Diagonal Relationship",
    question:
      "State the diagonal relationships in the periodic table and their basis.",
    answer:
      "Li–Mg, Be–Al, B–Si show similar properties. Basis: similar charge-to-radius ratio (charge density/polarizing power). Li like Mg: both form nitrides directly, normal oxides (not peroxides), LiCO₃ decomposes on heating like MgCO₃. Be like Al: both amphoteric (dissolve in NaOH), form covalent bonds, react with alkalis to give H₂. B like Si: covalent hydrides, halides that hydrolyze.",
    category: "Periodic Trends",
  },
  {
    id: "pt-10",
    topic: "Non-metallic Oxides",
    question: "What is the acid-base nature of oxides across Period 3?",
    answer:
      "Na₂O (strongly basic) → MgO (basic) → Al₂O₃ (amphoteric) → SiO₂ (weakly acidic) → P₄O₁₀ (acidic) → SO₃ (strongly acidic) → Cl₂O₇ (strongly acidic). The transition from basic (metals) to acidic (non-metals) oxides occurs across a period. Al₂O₃ reacts with both HCl (acid) and NaOH (base) — it's amphoteric.",
    category: "Periodic Trends",
  },

  // ── ATOMIC STRUCTURE (8 cards) ────────────────────────────────────────────
  {
    id: "as-1",
    topic: "Bohr Model Energies",
    question:
      "Write the formula for energy of nth orbit in Bohr model and calculate E₁ for He⁺.",
    answer:
      "Eₙ = −13.6 × Z²/n² eV. For He⁺ (Z=2): E₁ = −13.6 × 4/1 = −54.4 eV. For H (Z=1): E₁ = −13.6 eV. Negative sign = electron is bound. Energy of photon emitted: ΔE = 13.6Z²(1/n₁² − 1/n₂²) eV. Radius formula: rₙ = 0.529 × n²/Z Å.",
    category: "Atomic Structure",
  },
  {
    id: "as-2",
    topic: "Spectral Series",
    question:
      "Name all hydrogen spectral series and the regions they appear in.",
    answer:
      "Lyman (n→1): UV. Balmer (n→2): Visible — 4 visible lines (Hα red 656nm, Hβ blue-green, Hγ, Hδ). Paschen (n→3): near-IR. Brackett (n→4): IR. Pfund (n→5): far-IR. Mnemonic: 'Let Babies Poop Beyond Patience'. Only Balmer is visible.",
    category: "Atomic Structure",
  },
  {
    id: "as-3",
    topic: "Quantum Numbers",
    question: "What are the four quantum numbers and what does each describe?",
    answer:
      "n (principal) = shell size/energy (1,2,3...). l (azimuthal) = orbital shape (0=s, 1=p, 2=d, 3=f). mₗ (magnetic) = orbital orientation (−l to +l; 2l+1 values). mₛ (spin) = +½ or −½. Mnemonic: 'n=Shell, l=Shape, m=Map, s=Spin'. Max electrons in shell = 2n².",
    category: "Atomic Structure",
  },
  {
    id: "as-4",
    topic: "de Broglie Wavelength",
    question:
      "Write de Broglie's equation and calculate λ for an electron at 100V.",
    answer:
      "λ = h/mv = h/p. For electron accelerated through V volts: λ = 12.27/√V Å. At 100V: λ = 12.27/10 = 1.227 Å (X-ray range — explains electron diffraction). Heavier particles have shorter λ — a baseball's de Broglie wavelength is ~10⁻³⁴ m (undetectable). Heisenberg: Δx·Δp ≥ h/4π.",
    category: "Atomic Structure",
  },
  {
    id: "as-5",
    topic: "Aufbau Filling Order",
    question:
      "What is the Aufbau order and write the electron configuration of Fe (Z=26)?",
    answer:
      "Aufbau order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p... Fe (Z=26): 1s²2s²2p⁶3s²3p⁶3d⁶4s². Exceptions: Cr (Z=24) = [Ar]3d⁵4s¹ (half-filled 3d is stable). Cu (Z=29) = [Ar]3d¹⁰4s¹ (filled 3d is stable). These are the two most tested exceptions.",
    category: "Atomic Structure",
  },
  {
    id: "as-6",
    topic: "Photoelectric Effect",
    question: "State the photoelectric effect and what it proves.",
    answer:
      "When light of frequency ≥ threshold (ν₀) hits a metal surface, electrons are emitted. Key observations: (1) KE of electrons depends on frequency (not intensity), (2) intensity only affects number of electrons, (3) instantaneous — no time delay. This proves light comes in quanta (photons) with E = hν. Einstein's explanation earned the Nobel Prize 1921. W (work function) = hν₀.",
    category: "Atomic Structure",
  },
  {
    id: "as-7",
    topic: "Hund's Rule",
    question:
      "State Hund's rule and write the electron configuration of N (Z=7).",
    answer:
      "Hund's rule: In degenerate orbitals (same energy), electrons fill one per orbital first (maximizing unpaired spins) before pairing. N (Z=7): 1s²2s²2p³ — the three 2p electrons each occupy a separate 2p orbital with parallel spins (↑↑↑). This is why N has a half-filled p³ configuration that gives extra stability and anomalous IE.",
    category: "Atomic Structure",
  },
  {
    id: "as-8",
    topic: "Orbital Shapes",
    question: "Describe the shapes of s, p, and d orbitals.",
    answer:
      "s orbitals: spherical (1 per subshell). p orbitals: dumbbell/figure-8 along x, y, z axes (3 per subshell). d orbitals: 5 per subshell — 4 clover-leaf shapes (dxy, dxz, dyz, dx²-y²) + 1 dumbbell with donut (dz²). f orbitals: 7 per subshell, complex shapes. Shape determines directional bonding: p orbitals participate in π bonds, d orbitals in transition metal coordination.",
    category: "Atomic Structure",
  },

  // ── CHEMICAL BONDING (10 cards) ───────────────────────────────────────────
  {
    id: "cb-1",
    topic: "VSEPR Geometries",
    question: "Predict the geometry of SF₆, PCl₅, XeF₂, IF₇, NH₃, H₂O.",
    answer:
      "SF₆: octahedral (sp³d²). PCl₅: trigonal bipyramidal (sp³d). XeF₂: linear (sp³d, 3 lone pairs on Xe in equatorial). IF₇: pentagonal bipyramidal (sp³d³). NH₃: trigonal pyramidal (sp³, 1 lone pair). H₂O: V-shape/bent (sp³, 2 lone pairs). Lone pairs compress bond angles — NH₃ (107°), H₂O (104.5°) below tetrahedral (109.5°).",
    category: "Chemical Bonding",
  },
  {
    id: "cb-2",
    topic: "Hybridization",
    question:
      "Determine hybridization from the formula: BeCl₂, BF₃, CCl₄, PCl₅, SF₆.",
    answer:
      "BeCl₂: sp (linear, 180°). BF₃: sp² (trigonal planar, 120°). CCl₄: sp³ (tetrahedral, 109.5°). PCl₅: sp³d (trigonal bipyramidal). SF₆: sp³d² (octahedral). Rule: count σ bonds + lone pairs on central atom = steric number → sp=2, sp²=3, sp³=4, sp³d=5, sp³d²=6.",
    category: "Chemical Bonding",
  },
  {
    id: "cb-3",
    topic: "Hydrogen Bonding",
    question:
      "Why does H₂O have an anomalously high boiling point? Why is ice less dense than water?",
    answer:
      "H₂O forms 4 H-bonds per molecule (O is both donor×2 and acceptor×2). The O–H⁺⁺⁺O hydrogen bond (3.5 Å) requires significant energy to break, raising bp to 100°C (expected ~−80°C for size). Ice: H-bonds force each O to adopt a tetrahedral arrangement with 4 neighbors — open hexagonal lattice with empty channels → lower density. Melting breaks some H-bonds and molecules pack more densely (max density at 4°C).",
    category: "Chemical Bonding",
  },
  {
    id: "cb-4",
    topic: "Resonance Structures",
    question:
      "Draw resonance structures of benzene, CO₃²⁻, and SO₃. What is resonance energy?",
    answer:
      "Benzene: 2 Kekulé structures with alternating C=C/C–C → actual structure is intermediate with equal 1.5 bond order for all C–C (139 pm). CO₃²⁻: 3 equivalent structures (C=O + 2 C–O⁻ in each permutation). SO₃: 3 structures with S=O at different positions. Resonance energy = stability gained compared to any one structure. For benzene: ~152 kJ/mol (experimental).",
    category: "Chemical Bonding",
  },
  {
    id: "cb-5",
    topic: "Fajan's Rules",
    question:
      "State Fajan's rules for predicting covalent character in ionic compounds.",
    answer:
      "Covalent character increases when: (1) High charge on cation (Mg²⁺ > Na⁺ — more polarizing), (2) Small cation size (more charge density = more polarizing), (3) Large anion size (more polarizable, electron cloud easily distorted), (4) High charge on anion. AlCl₃ is covalent (Al³⁺ is small, 3+ charge). NaCl is ionic (Na⁺ is +1, I⁻ is large — but NaCl is still ionic since Na⁺ polarizing power is moderate).",
    category: "Chemical Bonding",
  },
  {
    id: "cb-6",
    topic: "MOT for O₂",
    question: "Write the MO configuration of O₂ and explain its paramagnetism.",
    answer:
      "O₂ MO config: (σ1s)²(σ*1s)²(σ2s)²(σ*2s)²(σ2p)²(π2p)⁴(π*2p)². The two degenerate π*2p orbitals each get one electron (Hund's rule) → 2 unpaired electrons → O₂ is PARAMAGNETIC. Bond order = (8−4)/2 = 2 (double bond). This was a triumph of MO theory — VB theory incorrectly predicts diamagnetic O₂.",
    category: "Chemical Bonding",
  },
  {
    id: "cb-7",
    topic: "Lattice Enthalpy",
    question:
      "Define lattice enthalpy and explain why MgO has a much higher lattice enthalpy than NaCl.",
    answer:
      "Lattice enthalpy = energy required to completely separate one mole of ionic solid into gaseous ions. MgO: ~3795 kJ/mol. NaCl: ~787 kJ/mol. Reason: Lattice enthalpy ∝ (charge product)/(sum of radii). MgO has Mg²⁺ and O²⁻ (charge product = 4) vs NaCl Na⁺Cl⁻ (charge product = 1), AND Mg²⁺ is smaller than Na⁺. Both factors multiply to give ~5× higher lattice enthalpy.",
    category: "Chemical Bonding",
  },
  {
    id: "cb-8",
    topic: "Bond Order and Bond Length",
    question: "Arrange N₂, N₂⁺, N₂²⁺ in order of increasing bond length.",
    answer:
      "N₂: bond order = 3 (triple bond, 110 pm). N₂⁺: remove electron from bonding MO → bond order = 2.5 (longer). N₂²⁺: bond order = 2 (longest among these). Order: N₂ < N₂⁺ < N₂²⁺ (bond length). Higher bond order = shorter, stronger bond. For comparison: F₂ bond order = 1, bond length 142 pm; O₂ = 2, 121 pm; N₂ = 3, 110 pm.",
    category: "Chemical Bonding",
  },
  {
    id: "cb-9",
    topic: "Dipole Moment",
    question: "Why does CO₂ have zero dipole moment but SO₂ does not?",
    answer:
      "CO₂: O=C=O is LINEAR (sp hybridized). The two C=O dipoles point in exactly opposite directions (180°) and cancel → μ = 0. SO₂: S is sp² hybridized with 1 lone pair → V-shape (bent, ~119°). The two S=O dipoles point in similar directions — they DO NOT cancel → μ ≠ 0 (1.63 D). Geometry determines whether bond dipoles cancel. BF₃ (trigonal planar) = 0; NF₃ (pyramidal) ≠ 0.",
    category: "Chemical Bonding",
  },
  {
    id: "cb-10",
    topic: "Van der Waals Forces",
    question:
      "Rank these intermolecular forces in order of strength and give examples.",
    answer:
      "Strongest to weakest: Ion-dipole (salt dissolved in water) > H-bonding (H₂O, HF, NH₃) > Dipole-dipole (HCl, SO₂) > London dispersion/van der Waals (noble gases, alkanes, I₂). London forces increase with molecular size/surface area (I₂ has high bp despite being nonpolar). This explains why branched alkanes have lower bp than straight-chain isomers (less surface contact).",
    category: "Chemical Bonding",
  },

  // ── ORGANIC FUNDAMENTALS (12 cards) ───────────────────────────────────────
  {
    id: "of-1",
    topic: "Inductive Effect vs Resonance",
    question:
      "Compare inductive effect and resonance (mesomeric effect) in terms of mechanism and range.",
    answer:
      "Inductive effect: electron withdrawal or donation through σ bonds. Decreases rapidly with distance (negligible beyond 2–3 bonds). Permanent, non-directional. Resonance/Mesomeric: electron delocalization through conjugated π system. Transmitted through bonds without diminishing (throughout the conjugated system). Stronger effect when π system is involved. Example: COOH group — −I and −M both withdraw electrons; OH group — −I but +M (donation through lone pair into ring).",
    category: "Organic Fundamentals",
  },
  {
    id: "of-2",
    topic: "Markovnikov's Rule",
    question: "State Markovnikov's rule and the anti-Markovnikov exception.",
    answer:
      "Markovnikov's rule: In HX addition to alkene, H adds to carbon with more H atoms (less substituted C), X adds to more substituted C. Reason: more stable (more substituted) carbocation forms as intermediate. Anti-Markovnikov: HBr addition in presence of peroxides (ROOR) goes via free radical mechanism → Br adds to less substituted C (radical stability). H₂O addition (acid-catalyzed) follows Markovnikov.",
    category: "Organic Fundamentals",
  },
  {
    id: "of-3",
    topic: "Degrees of Unsaturation (DBE)",
    question: "Calculate DBE for C₆H₅Cl and C₄H₆.",
    answer:
      "DBE = (2C + 2 + N − H − X) / 2. For C₆H₅Cl: (12+2−5−1)/2 = 8/2 = 4 → benzene ring (1 ring + 3 double bonds = 4). For C₄H₆: (8+2−6)/2 = 4/2 = 2 → could be 2 double bonds (1,3-butadiene), 1 triple bond (but-1-yne), or 1 ring + 1 double bond (cyclobutene, methylenecyclopropane).",
    category: "Organic Fundamentals",
  },
  {
    id: "of-4",
    topic: "EAS: Ortho/Para vs Meta",
    question:
      "Classify these as o/p or meta directors: OH, NO₂, COOH, Cl, CH₃, NH₂, CN, SO₃H.",
    answer:
      "O/P directors (activate ring, EXCEPT halogens deactivate): OH, OR, NH₂, NHR, NR₂, CH₃, C₂H₅, halogens (X). Meta directors (deactivate ring): NO₂, CHO, COR, COOH, COOR, SO₃H, CN, NR₃⁺, CCl₃. Rule: atom attached to ring has lone pair → o/p director. Atom has π bond or positive charge → meta director. Halogens: o/p directors despite being deactivators (lone pair wins over −I effect for direction).",
    category: "Organic Fundamentals",
  },
  {
    id: "of-5",
    topic: "SN1 vs SN2 Conditions",
    question:
      "Predict whether SN1 or SN2 for: (a) tert-BuBr + NaCN in DMSO, (b) MeBr + NaOH in water.",
    answer:
      "(a) tert-BuBr: 3° substrate, CN⁻ is strong nucleophile but DMSO is polar aprotic. The steric bulk of 3° carbon prevents SN2 backside attack → SN1 occurs (3° carbocation) or E2 (elimination competing). In DMSO: if heat → E2 major. (b) MeBr: 1° substrate, OH⁻ strong nucleophile, water is polar protic but OH⁻ concentration is high → SN2 (inversion at Me, though Me has no stereocentre). 1° always favors SN2.",
    category: "Organic Fundamentals",
  },
  {
    id: "of-6",
    topic: "Aldol vs Cannizzaro",
    question: "When does Aldol occur vs Cannizzaro? Give one example of each.",
    answer:
      "Aldol: requires α-H on carbonyl compound. CH₃CHO + dil. NaOH → 3-hydroxy butanal (aldol product) → heat → but-2-enal (crotonic acid type). Cannizzaro: requires NO α-H. HCHO + conc. NaOH → methanol + sodium formate. PhCHO + conc. NaOH → benzyl alcohol + sodium benzoate. If both α-H and no-α-H present together: crossed Cannizzaro — HCHO always gets oxidized.",
    category: "Organic Fundamentals",
  },
  {
    id: "of-7",
    topic: "Reducing Agents in Organic",
    question: "Compare LiAlH₄ vs NaBH₄ vs H₂/Pd — what does each reduce?",
    answer:
      "LiAlH₄: reduces ALL C=O (RCHO, RCOR, RCOOR, RCOOH, RCONR₂). Very strong. Can't use in protic solvents (reacts violently). NaBH₄: reduces only RCHO and RCOR (aldehydes and ketones). Does NOT reduce esters, acids, or amides. Safe in aqueous/alcohol solvents. H₂/Pd (catalytic hydrogenation): reduces C=C and C≡C. Also reduces aldehydes/ketones. Chemo-selectivity: NaBH₄ can selectively reduce ketone in presence of ester.",
    category: "Organic Fundamentals",
  },
  {
    id: "of-8",
    topic: "Optical Isomerism",
    question:
      "Define chiral centre, enantiomers, diastereomers, and meso compounds.",
    answer:
      "Chiral centre: sp³ C with 4 different substituents. Enantiomers: non-superimposable mirror images (same chemical properties, opposite optical rotation). Diastereomers: stereoisomers that are NOT mirror images (different physical properties, e.g., cis/trans or R,S vs R,R for 2 chiral centres). Meso: has chiral centres but overall achiral due to internal plane of symmetry (e.g., meso-tartaric acid: 2R,3S). For n chiral centres: max 2ⁿ stereoisomers.",
    category: "Organic Fundamentals",
  },
  {
    id: "of-9",
    topic: "Carboxylic Acid Derivatives Reactivity",
    question:
      "Rank carboxylic acid derivatives in order of reactivity toward nucleophiles.",
    answer:
      "Acid chloride > Acid anhydride > Ester > Amide > Carboxylate ion. More electronegative leaving group = better leaving group = more reactive. Cl⁻ > RCOO⁻ > OR⁻ > NR₂⁻. Acid chlorides react with water at room temp; amides need acid/base hydrolysis at 100°C+. This reactivity order also predicts synthesis routes: to make amide, first convert acid to acid chloride (SOCl₂), then react with amine.",
    category: "Organic Fundamentals",
  },
  {
    id: "of-10",
    topic: "Polymer Classification",
    question:
      "Classify these as addition or condensation polymers: PVC, Nylon-6,6, Bakelite, Teflon, Dacron.",
    answer:
      "Addition: PVC (vinyl chloride), Teflon (PTFE, tetrafluoroethylene), polystyrene, polyethylene — all have alkene monomers, no small molecule released. Condensation: Nylon-6,6 (hexamethylenediamine + adipic acid → releases H₂O), Dacron/PET (terephthalic acid + ethylene glycol → H₂O), Bakelite (phenol + formaldehyde → H₂O). Special: Nylon-6 = ring-opening of ε-caprolactam (NOT condensation in the traditional sense).",
    category: "Organic Fundamentals",
  },
  {
    id: "of-11",
    topic: "Functional Group Tests",
    question:
      "How do you test for: (a) aldehyde, (b) phenol, (c) primary amine, (d) unsaturation?",
    answer:
      "(a) Aldehyde: Fehling's (red precipitate Cu₂O), Tollens' (silver mirror), 2,4-DNP (yellow precipitate). (b) Phenol: FeCl₃ → violet/purple color; bromine water → white precipitate (2,4,6-tribromophenol). (c) Primary amine: isocyanide test (carbylamines — foul smell); Hinsberg test (sulfonamide with benzenesulfonyl chloride). (d) Unsaturation: decolorizes Br₂/CCl₄ (orange → colorless); decolorizes KMnO₄ (purple → colorless).",
    category: "Organic Fundamentals",
  },
  {
    id: "of-12",
    topic: "Aromaticity",
    question:
      "State Hückel's rule and classify benzene, cyclobutadiene, and [18]annulene.",
    answer:
      "Aromatic (Hückel's rule): planar, fully conjugated, (4n+2) π electrons. n=0: 2e (cyclopropylium cation C₃H₃⁺). n=1: 6e (benzene — aromatic ✓). n=2: 10e (naphthalene). n=4: 18e ([18]annulene — aromatic ✓). Anti-aromatic: 4n π electrons, planar, conjugated → highly destabilized. Cyclobutadiene: 4π electrons (n=1, 4n=4) → anti-aromatic, extremely unstable.",
    category: "Organic Fundamentals",
  },
  // ── ORGANIC CHEMISTRY QUICK REFERENCE (5 new cards) ────────────────
  {
    id: "ocqr-1",
    topic: "Hybridization & Geometry",
    question:
      "What are the geometries and bond angles for sp, sp², and sp³ hybridization?",
    answer:
      "sp = linear 180° (acetylene, CO₂, BeCl₂). sp² = trigonal planar 120° (ethylene, benzene, BF₃, carbocations). sp³ = tetrahedral 109.5° (methane, all alkanes). More s character = shorter, stronger bond, more electronegative C = more acidic C–H (alkyne C–H pKa ~25 vs alkane ~50). Hybridization sets geometry; lone pairs compress angles (NH₃ 107°, H₂O 104.5°).",
    category: "Organic Fundamentals",
  },
  {
    id: "ocqr-2",
    topic: "IUPAC Suffixes",
    question:
      "Write IUPAC suffixes and prefixes for the major functional groups.",
    answer:
      "Suffixes: -ane (alkane), -ene (alkene), -yne (alkyne), -ol (alcohol), -al (aldehyde), -one (ketone), -oic acid (carboxylic acid), -amine (amine), -amide (amide), -ester (-oate suffix). Priority for principal chain: COOH > CHO > C=O > OH > NH₂ > C≡C > C=C. Prefixes when not the principal chain: hydroxy-, oxo-, carboxy-, amino-, halo-.",
    category: "Organic Fundamentals",
  },
  {
    id: "ocqr-3",
    topic: "Acidity Order in Organic",
    question:
      "Arrange in decreasing acidity: RCOOH, phenol, water, alcohol, alkyne, alkene, alkane.",
    answer:
      "RCOOH (pKa~5) > phenol (~10) > H₂O (~15.7) > alcohol (~16–18) > alkyne (~25) > alkene (~44) > alkane (~50). Stronger acid = more stable conjugate base. Carboxylate is resonance-stabilized over 2 oxygens. Phenoxide over the ring. Inductive effect (EWG increase acidity): Cl₂CHCOOH > CH₂ClCOOH > CH₃COOH. More electronegative = more acidic.",
    category: "Organic Fundamentals",
  },
  {
    id: "ocqr-4",
    topic: "SN2 Requirements",
    question:
      "What four factors favour SN2? What is the stereoochemical outcome?",
    answer:
      "SN2 favoured by: (1) Primary or methyl substrate — minimal steric hindrance for backside attack. (2) Strong nucleophile (CN⁻, I⁻, RS⁻, RO⁻). (3) Polar aprotic solvent (DMSO, DMF, acetone) — naked nucleophile. (4) Lower temperature favours SN2 over E2. Result: Walden inversion of configuration (S → R or R → S at chiral centre). 3° substrates blocked by steric hindrance.",
    category: "Organic Fundamentals",
  },
  {
    id: "ocqr-5",
    topic: "SN1 Requirements",
    question:
      "What four factors favour SN1? What is the stereochemical outcome?",
    answer:
      "SN1 favoured by: (1) Tertiary (or 2°, allylic, benzylic) substrate — stable carbocation. (2) Weak nucleophile or solvent as nucleophile (H₂O, ROH). (3) Polar protic solvent (water, ethanol) — stabilizes carbocation by solvation and hydrogen bonding. (4) Heat. Result: racemization (planar carbocation attacked from both faces). Benzylic/allylic behave like 2°–3° due to resonance stabilization.",
    category: "Organic Fundamentals",
  },

  // ── ELECTROCHEMISTRY ADDITIONS (4 new cards) ──────────────────────
  {
    id: "ec-new-1",
    topic: "Faraday’s 1st Law",
    question:
      "Write Faraday’s first law of electrolysis and define the electrochemical equivalent Z.",
    answer:
      "m = ZIt (or m = ZQ where Q = It). Z = M/(nF) in g/C. M = molar mass, n = electrons per ion, F = 96485 C/mol. For Cu (M=64, n=2): Z = 64/(2×96485) = 3.32×10⁻⁴ g/C. To deposit 1 g Cu: Q = 1/Z ≈ 3012 C. Faraday’s 2nd law: same charge deposits masses proportional to equivalent weight M/n.",
    category: "Electrochemistry",
  },
  {
    id: "ec-new-2",
    topic: "Nernst Equation Derivation",
    question:
      "Derive the simplified Nernst equation at 25°C from the full thermodynamic form.",
    answer:
      "Full form: E = E° − (RT/nF) ln Q. At T = 298 K: RT/F = (8.314×298)/96485 = 0.02569 V. Converting ln to log (multiply by 2.303): E = E° − (0.0592/n) log Q. At equilibrium E = 0: log K = nE°/0.0592. For concentration cell (same electrode, different [C]): E = (0.0592/n) log(C₁/C₂).",
    category: "Electrochemistry",
  },
  {
    id: "ec-new-3",
    topic: "Kohlrausch’s Law",
    question:
      "State Kohlrausch’s law and use it to find the molar conductance of acetic acid.",
    answer:
      "Λ°m(weak electrolyte) = Σ λ° ions. For CH₃COOH: Λ°m = Λ°m(CH₃COONa) + Λ°m(HCl) − Λ°m(NaCl). Example values: CH₃COONa = 91, HCl = 426, NaCl = 126 S cm²/mol → Λ°m(CH₃COOH) = 391 S cm²/mol. Weak electrolytes can’t be measured at infinite dilution directly (degree of dissociation increases with dilution). Kohlrausch allows indirect calculation. Degree of dissociation α = Λm/Λ°m.",
    category: "Electrochemistry",
  },
  {
    id: "ec-new-4",
    topic: "EMF and Spontaneity",
    question:
      "How are E°cell, ΔG°, and K related? What does each sign tell you?",
    answer:
      "E°cell = E°cathode − E°anode. If E°cell > 0: ΔG° < 0, K > 1 (spontaneous, product-favored). ΔG° = −nFE°cell = −RT ln K. Example: Zn–Cu: E° = +1.10 V → ΔG° = −212 kJ/mol, K ≈ 10³⁷. SHE = 0.00 V. F₂ has highest E° (+2.87 V) = strongest oxidiser; Li has lowest (−3.04 V) = strongest reducer.",
    category: "Electrochemistry",
  },

  // ── KINETICS + THERMODYNAMICS (5 new cards) ──────────────────────
  {
    id: "kt-1",
    topic: "Rate Law & Orders",
    question:
      "Write the rate law for a reaction of order m in A and n in B. How are k units determined?",
    answer:
      "Rate = k[A]^m[B]^n. Overall order = m + n. Order is ALWAYS experimental. Units of k: (mol/L)^(1−(m+n)) s⁻¹. Zero order: mol L⁻¹ s⁻¹. 1st order: s⁻¹ (most common in JEE). 2nd order: L mol⁻¹ s⁻¹. Radioactive decay: always 1st order. Pseudo-first-order example: CH₃COOC₂H₅ + H₂O (excess water) appears 1st order.",
    category: "Thermochemistry",
  },
  {
    id: "kt-2",
    topic: "Half-Life Formulas",
    question:
      "Derive half-life for zero, first, and second order. Which is concentration-independent?",
    answer:
      "Zero order: t½ = [A]₀/2k (depends on [A]₀). First order: t½ = 0.693/k (INDEPENDENT of [A]₀ — unique and JEE-tested). Second order: t½ = 1/(k[A]₀) (inversely proportional to [A]₀). First-order independence is the most tested feature. Carbon-14 dating uses t½ = 5730 years (1st order radioactive decay). Successive half-lives are equal ONLY for 1st order.",
    category: "Thermochemistry",
  },
  {
    id: "kt-3",
    topic: "Gibbs Free Energy Conditions",
    question:
      "For each sign combination of ΔH and ΔS, state whether the reaction is always/never/temperature-dependent spontaneous.",
    answer:
      "ΔH<0, ΔS>0: ALWAYS spontaneous (exothermic + disorder; combustion). ΔH>0, ΔS<0: NEVER spontaneous (endothermic + order increasing). ΔH<0, ΔS<0: spontaneous at LOW T (enthalpy drives it; e.g. water freezing). ΔH>0, ΔS>0: spontaneous at HIGH T (entropy drives it; e.g. CaCO₃ decomposition). Crossover T = ΔH/ΔS.",
    category: "Thermochemistry",
  },
  {
    id: "kt-4",
    topic: "Hess’s Law Application",
    question:
      "Calculate ΔH for C(s) + O₂(g) → CO(g) using: C + O₂ → CO₂ (−393) and CO + ½O₂ → CO₂ (−283) kJ/mol.",
    answer:
      "Target: C + O₂ → CO. Rearrange steps: (1) C + O₂ → CO₂ (−393). (2) REVERSE CO + ½O₂ → CO₂: becomes CO₂ → CO + ½O₂ (+283). Add: C + O₂ + CO₂ → CO₂ + CO + ½O₂. Simplify: C + ½O₂ → CO. ΔH = −393 + 283 = −110 kJ/mol. Kirchhoff: ΔH(T₂) = ΔH(T₁) + ΔCp(T₂−T₁) accounts for temperature dependence.",
    category: "Thermochemistry",
  },
  {
    id: "kt-5",
    topic: "Arrhenius Equation",
    question:
      "Write the Arrhenius equation and use it to find the ratio k₂/k₁ when T rises from 300 K to 310 K with Ea = 50 kJ/mol.",
    answer:
      "k = A·e^(−Ea/RT). ln(k₂/k₁) = Ea/R × (1/T₁ − 1/T₂). Ea = 50000 J/mol, T₁=300, T₂=310, R=8.314. 1/300 − 1/310 = (310−300)/(300×310) = 10/93000 = 1.075×10⁻⁴. ln(k₂/k₁) = 50000/8.314 × 1.075×10⁻⁴ = 6017 × 1.075×10⁻⁴ = 0.647. k₂/k₁ = e^0.647 ≈ 1.91. Rate almost doubles with 10°C rise.",
    category: "Thermochemistry",
  },

  // ── ELECTROCHEMISTRY (8 original cards) ─────────────────────────────
  {
    id: "ec-1",
    topic: "Nernst Equation",
    question:
      "Write the Nernst equation and calculate E for Cu²⁺/Cu at 25°C when [Cu²⁺] = 0.01 M.",
    answer:
      "E = E° − (0.0592/n) log Q at 25°C. For Cu²⁺ + 2e⁻ → Cu; E° = +0.34 V, n=2. Q = 1/[Cu²⁺] = 100. E = 0.34 − (0.0592/2) log 100 = 0.34 − 0.0296 × 2 = 0.34 − 0.0592 = 0.281 V. Lower [Cu²⁺] = lower reduction potential (less tendency to be reduced).",
    category: "Electrochemistry",
  },
  {
    id: "ec-2",
    topic: "Cell Potential and Spontaneity",
    question: "If E°cell = +1.10 V for Zn-Cu cell, calculate ΔG° and K.",
    answer:
      "ΔG° = −nFE°cell. For Zn-Cu cell: n=2 (2 electrons transferred). ΔG° = −2 × 96485 × 1.10 = −212,267 J/mol ≈ −212 kJ/mol. ΔG° = −RT ln K → ln K = nFE°/RT = 212267/(8.314×298) = 85.7 → K = e^85.7 ≈ 10^37. Spontaneous (ΔG° < 0, E° > 0, K >> 1).",
    category: "Electrochemistry",
  },
  {
    id: "ec-3",
    topic: "Faraday's Laws",
    question:
      "Calculate mass of Cu deposited by 2 amperes flowing for 30 minutes.",
    answer:
      "Faraday's 1st law: m = ZIt (Z = electrochemical equivalent = M/nF). For Cu: M=64, n=2. Z = 64/(2×96485) = 3.315×10⁻⁴ g/C. t = 30×60 = 1800 s. Q = It = 2×1800 = 3600 C. m = ZQ = 3.315×10⁻⁴ × 3600 = 1.193 g. Faraday's 2nd law: same charge deposits masses proportional to equivalent weight (M/n).",
    category: "Electrochemistry",
  },
  {
    id: "ec-4",
    topic: "Electrolytic Cells",
    question: "What is the difference between galvanic and electrolytic cells?",
    answer:
      "Galvanic (voltaic): spontaneous redox reaction → produces electrical energy. Anode = negative (oxidation), Cathode = positive (reduction). Example: Zn-Cu cell. Electrolytic: non-spontaneous reaction driven by external electrical energy. Anode = positive (connected to +ve terminal), Cathode = negative. Examples: electroplating, Chlor-Alkali, Hall-Héroult. In both: oxidation at anode, reduction at cathode.",
    category: "Electrochemistry",
  },
  {
    id: "ec-5",
    topic: "Standard Reduction Potentials",
    question:
      "If E°(F₂/F⁻) = +2.87 V and E°(Li⁺/Li) = −3.04 V, what are the strongest oxidizing and reducing agents?",
    answer:
      "Highest (most positive) E° = strongest oxidizing agent: F₂ (+2.87 V) — most easily reduced = strongest oxidizer. Lowest (most negative) E° = strongest reducing agent: Li (−3.04 V) — hardest to reduce = most easily oxidized = strongest reducer. Standard hydrogen electrode = 0.00 V (reference). Above SHE: weaker reducing agents. Below SHE: weaker oxidizing agents.",
    category: "Electrochemistry",
  },
  {
    id: "ec-6",
    topic: "Kohlrausch's Law",
    question:
      "State Kohlrausch's law and calculate Λ°m of CH₃COOH given relevant data.",
    answer:
      "Kohlrausch's law: limiting molar conductivity Λ°m = sum of individual ionic conductivities. Λ°m(CH₃COOH) = Λ°m(CH₃COONa) + Λ°m(HCl) − Λ°m(NaCl). If CH₃COONa = 91, HCl = 426, NaCl = 126 S cm²/mol: Λ°m = 91+426−126 = 391 S cm²/mol. Weak electrolytes can't be measured directly (infinite dilution problem) — Kohlrausch lets us calculate from strong electrolyte data.",
    category: "Electrochemistry",
  },
  {
    id: "ec-7",
    topic: "Corrosion",
    question:
      "Explain the electrochemical mechanism of iron rusting and why salt accelerates it.",
    answer:
      "Rusting is an electrochemical process: Anode (Fe): Fe → Fe²⁺ + 2e⁻. Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻. Fe²⁺ + 2OH⁻ → Fe(OH)₂ → oxidized to Fe(OH)₃ → dehydrates to Fe₂O₃·xH₂O (rust). Requires both O₂ AND moisture. Salt: NaCl ionizes to Na⁺ and Cl⁻ in water → increases electrolyte conductivity → electrons flow faster between anodic and cathodic regions. Galvanizing (Zn) protects Fe by sacrificial anode: Zn oxidizes preferentially.",
    category: "Electrochemistry",
  },
  {
    id: "ec-8",
    topic: "Batteries",
    question: "Compare dry cell, lead-acid battery, and Li-ion battery.",
    answer:
      "Dry cell (Leclanché): Zn (anode) | NH₄Cl paste | MnO₂+graphite (cathode). E = 1.5 V. Not rechargeable. Lead-acid: Pb (anode) | H₂SO₄(aq) | PbO₂ (cathode). E = 2V per cell, 12V total (6 cells). Rechargeable. Heavy, toxic Pb. Li-ion: LiCoO₂ (cathode) | LiPF₆ electrolyte | graphite (anode). E = 3.7 V per cell. High energy density, lightweight, rechargeable. Used in phones, EVs. Never short circuit (thermal runaway risk).",
    category: "Electrochemistry",
  },

  // ── THERMOCHEMISTRY (7 cards) ─────────────────────────────────────────────
  {
    id: "tc-1",
    topic: "First Law of Thermodynamics",
    question:
      "State the first law and explain the sign conventions for q and w.",
    answer:
      "First law: ΔU = q + w (internal convention) or ΔU = q − w (IUPAC/engineering). q: positive = heat added to system. w: positive = work done ON system (compression). Work = −PΔV. At constant P: ΔH = qₚ. At constant V: ΔU = qᵥ. For ideal gas: ΔU depends only on T (not V or P). Isothermal process: ΔU = 0 → q = −w.",
    category: "Thermochemistry",
  },
  {
    id: "tc-2",
    topic: "Hess's Law",
    question:
      "Calculate ΔHf° of CO₂ using Hess's law given: C+O₂→CO₂ (−393), H₂+½O₂→H₂O (−286).",
    answer:
      "Hess's law: ΔH of a reaction = sum of ΔH of individual steps, regardless of path (enthalpy is a state function). The calculation is already given: C(s) + O₂(g) → CO₂(g) ΔH = −393 kJ/mol (this IS the formation reaction for CO₂). No further calculation needed here. Application: to find ΔHf° of CH₄, use combustion data: CH₄ + 2O₂ → CO₂ + 2H₂O (ΔH_comb) and subtract formation enthalpies of CO₂ and H₂O.",
    category: "Thermochemistry",
  },
  {
    id: "tc-3",
    topic: "Gibbs Free Energy",
    question:
      "When is a reaction spontaneous based on ΔH, ΔS, and ΔG = ΔH − TΔS?",
    answer:
      "ΔG < 0 → spontaneous. ΔH<0, ΔS>0: always spontaneous (exothermic + disorder increasing). ΔH>0, ΔS<0: never spontaneous (endothermic + disorder decreasing). ΔH<0, ΔS<0: spontaneous at LOW T (−TΔS is positive but |ΔH| dominates at low T). ΔH>0, ΔS>0: spontaneous at HIGH T (−TΔS becomes very negative at high T). Crossover temperature: T = ΔH/ΔS.",
    category: "Thermochemistry",
  },
  {
    id: "tc-4",
    topic: "Entropy",
    question:
      "Rank these processes by increase in entropy: gas condensing, solid dissolving, polymerization, NaCl dissolving in water.",
    answer:
      "ΔS>0 (entropy increases): solid dissolving (increased disorder), NaCl dissolving (ions dispersed, more positional states), any liquid→gas process. ΔS<0 (entropy decreases): gas condensing (less disorder), polymerization (many small molecules → one large molecule, fewer positional states). 3rd law: S=0 for perfect crystal at 0 K. Every spontaneous isolated system: ΔS_total > 0 (2nd law).",
    category: "Thermochemistry",
  },
  {
    id: "tc-5",
    topic: "Bond Enthalpy",
    question: "Estimate ΔH for CH₄ + Cl₂ → CH₃Cl + HCl using bond enthalpies.",
    answer:
      "Bonds broken: 1 C–H (414 kJ/mol), 1 Cl–Cl (243 kJ/mol). Total broken = +657 kJ/mol. Bonds formed: 1 C–Cl (326 kJ/mol), 1 H–Cl (432 kJ/mol). Total formed = −758 kJ/mol. ΔH ≈ 657 − 758 = −101 kJ/mol. Note: bond enthalpy method gives approximate ΔH (average values used). More bonds formed than broken → exothermic.",
    category: "Thermochemistry",
  },
  {
    id: "tc-6",
    topic: "Neutralization Enthalpy",
    question:
      "Why is ΔH of neutralization for weak acid + strong base less than −57.1 kJ/mol?",
    answer:
      "Strong acid + strong base: H⁺(aq) + OH⁻(aq) → H₂O(l). ΔH = −57.1 kJ/mol (same regardless of acid/base, as long as both strong). Weak acid + strong base: Extra energy consumed to ionize the weak acid (ΔHionization > 0). Net ΔH = −57.1 + ΔHionization = less negative. Example: CH₃COOH + NaOH: ΔH ≈ −55.9 kJ/mol (less exothermic by ~1.2 kJ, the ionization energy of acetic acid).",
    category: "Thermochemistry",
  },
  {
    id: "tc-7",
    topic: "Kirchhoff's Law",
    question:
      "What is Kirchhoff's law and why does ΔH of reaction change with temperature?",
    answer:
      "Kirchhoff's law: dΔH/dT = ΔCp (where ΔCp = Cp_products − Cp_reactants). ΔH varies with temperature because reactants and products have different heat capacities. If ΔCp > 0: ΔH becomes more positive (less exothermic) as T increases. If ΔCp < 0: ΔH becomes more negative (more exothermic) as T rises. ΔH at T₂ = ΔH at T₁ + ΔCp(T₂ − T₁) (approximate, assuming constant Cp).",
    category: "Thermochemistry",
  },

  // ── COMMON MISTAKES (5 cards) ────────────────────────────────────────────
  {
    id: "cm-1",
    topic: "Molarity vs Molality",
    question:
      "Mistake: confusing molarity with molality — what is the key difference?",
    answer:
      "Molarity (M) = moles of solute / litres of solution (changes with temperature because volume changes). Molality (m) = moles of solute / kg of solvent (temperature-independent). For colligative properties (ΔTb, ΔTf, π): always use molality. For concentration-related equilibrium: use molarity. For dilute aqueous solutions: M ≈ m numerically, but never treat as identical in calculations.",
    category: "Common Mistakes",
  },
  {
    id: "cm-2",
    topic: "Kp vs Kc",
    question:
      "Mistake: using Kp and Kc interchangeably — when are they different?",
    answer:
      "Kp = Kc(RT)^Δng where R = 0.0821 L·atm/mol·K and Δng = moles of gaseous products − moles of gaseous reactants. Kp = Kc ONLY when Δng = 0. For N₂ + 3H₂ ⇌ 2NH₃, Δng = 2−4 = −2, so Kp = Kc(RT)⁻² ≠ Kc. Pure solids and liquids are excluded from K expressions.",
    category: "Common Mistakes",
  },
  {
    id: "cm-3",
    topic: "Oxidation State of O",
    question: "Mistake: assuming oxygen is always −2 — when is this wrong?",
    answer:
      "Oxygen is −1 in peroxides (H₂O₂, Na₂O₂, BaO₂), −½ in superoxides (KO₂), +2 in OF₂ (F is more electronegative), and 0 in O₂. The −2 rule holds for most compounds but fails for these common cases. Na₂O₂ + H₂O → NaOH + H₂O₂ (O²²⁻ is hydrolyzed to H₂O₂, not O²⁻).",
    category: "Common Mistakes",
  },
  {
    id: "cm-4",
    topic: "SN1 vs SN2 Substrate",
    question:
      "Mistake: applying wrong substitution mechanism — what are the key factors?",
    answer:
      "SN2: BEST for 1° substrates + strong nucleophile + polar aprotic solvent. Inversion of configuration. SN1: BEST for 3° (or 2°) + weak nucleophile + polar protic solvent. Racemization. Errors: (1) SN2 on 3° → doesn't work, steric block. (2) SN1 on 1° → doesn't work, 1° carbocation too unstable. Allyl/benzyl behave like 2° in SN reactions (resonance-stabilized cation).",
    category: "Common Mistakes",
  },
  {
    id: "cm-5",
    topic: "Rate Order from Stoichiometry",
    question:
      "Mistake: determining reaction order from stoichiometric coefficients.",
    answer:
      "NEVER determine reaction order from balanced equation stoichiometry. Order is ALWAYS determined experimentally. Example: H₂ + I₂ → 2HI appears to be 2nd order from stoichiometry, and happens to be 2nd order experimentally — but this is COINCIDENCE (simple mechanism). Enzymatic reactions may appear 0th order when substrate is saturating. Rate = k[A]ⁿ — exponent n must be found from experiment (initial rates, half-life, graphical methods).",
    category: "Common Mistakes",
  },

  // ── INDUSTRIAL (3 cards) ──────────────────────────────────────────────────
  {
    id: "ind-1",
    topic: "Haber Process Economics",
    question:
      "Why is 450°C chosen for the Haber Process despite better yield at lower temperature?",
    answer:
      "N₂ + 3H₂ ⇌ 2NH₃ is exothermic (ΔH = −92 kJ/mol). Lower T → higher equilibrium yield but TOO SLOW rate. Higher T → faster rate but very LOW equilibrium yield. 450°C is economic optimum — ~15% yield at acceptable rate. Fe catalyst makes 450°C feasible. High pressure (200 atm) pushes equilibrium toward NH₃ (Δng = −2). This is a classic Le Chatelier optimization case.",
    category: "Industrial",
  },
  {
    id: "ind-2",
    topic: "Hall-Héroult Process",
    question:
      "Why is cryolite (Na₃AlF₆) added in the Hall-Héroult process for aluminium extraction?",
    answer:
      "Al₂O₃ has a melting point of 2050°C — too high for practical electrolysis. Dissolving Al₂O₃ in molten cryolite (Na₃AlF₆) lowers the melting point to ~950°C. Cryolite provides a conducting ionic melt. Cathode: Al³⁺ + 3e⁻ → Al (liquid Al sinks to bottom). Anode: O²⁻ → O₂ + 4e⁻ (anodes are consumed by O₂ and must be replaced regularly). The high electricity consumption (~14 kWh per kg Al) makes aluminium smelting energy-intensive.",
    category: "Industrial",
  },
  {
    id: "ind-3",
    topic: "Contact Process for H₂SO₄",
    question:
      "List all steps of the Contact Process and why SO₃ isn't dissolved directly in water.",
    answer:
      "Step 1: S + O₂ → SO₂. Step 2: 2SO₂ + O₂ ⇌ 2SO₃ (450°C, V₂O₅ catalyst, 1–2 atm). Step 3: SO₃ + H₂SO₄ → H₂S₂O₇ (oleum/fuming sulfuric acid). Step 4: H₂S₂O₇ + H₂O → 2H₂SO₄. SO₃ can't be dissolved directly in water because it forms an acid mist (aerosol of tiny H₂SO₄ droplets that float in air and are hard to absorb in packed towers).",
    category: "Industrial",
  },
  // ── REAL LIFE chemistry (5 new cards) ─────────────────────────────
  {
    id: "rl-1",
    topic: "Chemistry of Cooking",
    question:
      "Explain the Maillard reaction and caramelization — what is the chemistry behind browning food?",
    answer:
      "Maillard reaction (110–165°C): reducing sugars react with amino acids to form hundreds of flavour compounds (melanoidins). NOT caramelization. Caramelization (>170°C): pure sugar pyrolysis — sucrose breaks into fructose + glucose, which dehydrate and polymerize. Baking soda raises pH → accelerates Maillard (dark bread crust). Acidic pH slows it. Both produce brown color and complex flavours — crucial in bread, meat, coffee, chocolate.",
    category: "Real Life",
  },
  {
    id: "rl-2",
    topic: "Chemistry of Rust Prevention",
    question:
      "Name four methods to prevent iron corrosion and explain the chemistry behind each.",
    answer:
      "(1) Galvanizing (Zn coating): Zn is sacrificial anode; even if coating breaks, Zn oxidizes preferentially (E° Zn = −0.76 V vs Fe = −0.44 V). (2) Alloying: stainless steel (18% Cr, 8% Ni) forms passive Cr₂O₃ layer. (3) Cathodic protection: external DC current makes Fe the cathode (electrons flow in, not out). (4) Painting/coating: physical barrier prevents moisture and O₂ contact. (5) Sacrificial anode: Mg blocks attached to ship's hull (Mg has more negative E°).",
    category: "Real Life",
  },
  {
    id: "rl-3",
    topic: "Chemistry of Soap and Detergents",
    question:
      "How does soap clean? Why doesn't soap work in hard water? What makes synthetic detergents better?",
    answer:
      "Soap (RCOONa): hydrophobic tail dissolves in oil/grease; hydrophilic head (-COO⁻Na⁺) faces water. Micelles trap oil and are washed away. Hard water problem: Ca²⁺ and Mg²⁺ react with soap anion: 2RCOONa + CaCl₂ → (RCOO)₂Ca↓ (scum, insoluble). Detergents: synthetic sulfonate or sulfate groups (−OSO₃⁻Na⁺) do NOT precipitate with Ca²⁺/Mg²⁺ → work in hard water. Enzyme detergents: protease/lipase break down protein/fat stains directly.",
    category: "Real Life",
  },
  {
    id: "rl-4",
    topic: "Chemistry of Polymers in Daily Life",
    question:
      "Match the polymer to its monomer and use: PVC, Nylon-6,6, Teflon, Bakelite, Natural rubber.",
    answer:
      "PVC (polyvinyl chloride): monomer = CH₂=CHCl. Uses: pipes, cables, flooring. Nylon-6,6: monomers = hexamethylenediamine + adipic acid. Uses: textiles, rope. Teflon (PTFE): monomer = CF₂=CF₂. Uses: non-stick cookware, electrical insulation. Bakelite: monomers = phenol + formaldehyde. Uses: electrical switches, handles. Natural rubber (polyisoprene): monomer = isoprene (2-methylbutadiene). Vulcanization (S crosslinks) makes it harder.",
    category: "Real Life",
  },
  {
    id: "rl-5",
    topic: "Medicines and Drug Chemistry",
    question:
      "What is aspirin chemically? How does it work? What are some named medicines and their chemistry?",
    answer:
      "Aspirin = acetylsalicylic acid (ASA). Made by acetylation of salicylic acid with acetic anhydride (esterification). Mechanism: irreversibly inhibits COX-1 and COX-2 enzymes → blocks prostaglandin synthesis → reduces pain, fever, inflammation, blood clotting. Paracetamol: selective COX-3 inhibitor, antipyretic/analgesic. Penicillin: β-lactam ring inhibits bacterial cell-wall synthesis (transpeptidase enzyme). Sulfanilamide: earliest antibiotic, structural analog of PABA — blocks folic acid synthesis in bacteria.",
    category: "Real Life",
  },
];

export function RevisionCardsTab() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [category, setCategory] = useState<RevisionCard["category"] | "All">(
    "All",
  );
  const { addBookmark, removeBookmark, isBookmarked } = useChemStore();

  const categories = ["All", ...Object.keys(CATEGORY_COLORS)] as Array<
    RevisionCard["category"] | "All"
  >;
  const filtered =
    category === "All"
      ? REVISION_CARDS
      : REVISION_CARDS.filter((c) => c.category === category);
  const card = filtered[index] ?? filtered[0];
  const color = card ? CATEGORY_COLORS[card.category] : "oklch(0.68 0.16 258)";
  const bookmarkId = card ? `revision-card-${card.id}` : "";
  const bookmarked = card ? isBookmarked(bookmarkId) : false;

  function next() {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % filtered.length), 80);
  }
  function prev() {
    setFlipped(false);
    setTimeout(
      () => setIndex((i) => (i - 1 + filtered.length) % filtered.length),
      80,
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Quick Formulas */}
      <QuickFormulasSection />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              setIndex(0);
              setFlipped(false);
            }}
            className="text-xs px-3 py-1.5 rounded-xl border transition-all"
            style={
              category === cat
                ? {
                    background: `${cat === "All" ? "oklch(0.68 0.16 258)" : CATEGORY_COLORS[cat as RevisionCard["category"]]}22`,
                    color:
                      cat === "All"
                        ? "oklch(0.68 0.16 258)"
                        : CATEGORY_COLORS[cat as RevisionCard["category"]],
                    borderColor: `${cat === "All" ? "oklch(0.68 0.16 258)" : CATEGORY_COLORS[cat as RevisionCard["category"]]}55`,
                  }
                : {
                    borderColor: "oklch(0.3 0.02 250)",
                    color: "oklch(0.58 0 0)",
                  }
            }
            data-ocid={`smart.revision_filter.${cat.toLowerCase().replace(/\s+/g, "_")}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count badge */}
      <p className="text-center text-xs text-muted-foreground mb-4">
        {filtered.length} card{filtered.length !== 1 ? "s" : ""} in this set ·{" "}
        {REVISION_CARDS.length} total
      </p>

      {/* Flashcard */}
      {card && (
        <div className="relative">
          <button
            type="button"
            className="relative w-full cursor-pointer select-none text-left"
            onClick={() => setFlipped((f) => !f)}
            style={{ perspective: "1200px" }}
            data-ocid="smart.revision_card"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Front */}
              <div
                className="rounded-2xl border p-8 min-h-[240px] flex flex-col items-center justify-center text-center"
                style={{
                  background: `${color}11`,
                  borderColor: `${color}33`,
                  backfaceVisibility: "hidden",
                }}
              >
                <span
                  className="text-xs font-semibold mb-3 px-3 py-1 rounded-xl"
                  style={{ background: `${color}22`, color }}
                >
                  {card.category}
                </span>
                <p className="text-xs text-muted-foreground mb-2 font-medium">
                  {card.topic}
                </p>
                <p className="text-foreground font-semibold text-base leading-relaxed">
                  {card.question}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Tap to reveal answer
                </p>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl border p-8 flex flex-col items-center justify-center text-center"
                style={{
                  background: `${color}18`,
                  borderColor: `${color}44`,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span
                  className="text-xs font-semibold mb-3 px-3 py-1 rounded-xl"
                  style={{ background: `${color}22`, color }}
                >
                  Answer
                </span>
                <p className="text-foreground/90 text-sm leading-relaxed">
                  {card.answer}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Tap to see question
                </p>
              </div>
            </motion.div>
          </button>
          {/* Bookmark button */}
          <button
            type="button"
            onClick={() => {
              if (bookmarked) removeBookmark(bookmarkId);
              else addBookmark(bookmarkId);
            }}
            className="absolute top-3 right-3 z-10 p-2 rounded-xl transition-transform hover:scale-110"
            style={{
              background: bookmarked
                ? "oklch(0.82 0.18 85 / 0.15)"
                : "oklch(0.18 0.02 250 / 0.6)",
            }}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark card"}
            data-ocid="smart.revision_bookmark"
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
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={prev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/20 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
          style={{ background: "oklch(0.16 0.018 250 / 0.7)" }}
          data-ocid="smart.revision_prev"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="p-1.5 rounded-lg hover:bg-card/30 transition-colors"
            aria-label="Reset card"
            data-ocid="smart.revision_reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span>
            {(filtered[index] ? index : 0) + 1} / {filtered.length}
          </span>
        </div>
        <button
          type="button"
          onClick={next}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/20 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
          style={{ background: "oklch(0.16 0.018 250 / 0.7)" }}
          data-ocid="smart.revision_next"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
        {filtered.slice(0, 20).map((dotCard, i) => (
          <button
            key={dotCard.id}
            type="button"
            onClick={() => {
              setIndex(i);
              setFlipped(false);
            }}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background:
                i === (filtered[index] ? index : 0)
                  ? color
                  : "oklch(0.3 0.02 250)",
            }}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
        {filtered.length > 20 && (
          <span className="text-xs text-muted-foreground self-center">
            +{filtered.length - 20} more
          </span>
        )}
      </div>
    </div>
  );
}
