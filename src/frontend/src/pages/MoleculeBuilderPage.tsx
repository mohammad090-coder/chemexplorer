import { useAnimationLevel } from "@/lib/performance";
import { isMobileDevice } from "@/lib/performance";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type AtomType =
  | "C"
  | "H"
  | "O"
  | "N"
  | "Cl"
  | "Br"
  | "I"
  | "S"
  | "P"
  | "F"
  | "Na"
  | "K"
  | "Ca";
type BondType = 1 | 2 | 3;

interface PlacedAtom {
  id: number;
  type: AtomType;
  x: number;
  y: number;
}

interface Bond {
  from: number;
  to: number;
  order: BondType;
}

interface CompoundInfo {
  name: string;
  formula: string;
  type: string;
  hybridization: string;
  shape: string;
  uses: string;
}

// ── Atom visual config ─────────────────────────────────────────────────────
const ATOM_CONFIG: Record<
  AtomType,
  {
    color: string;
    glow: string;
    radius: number;
    textColor: string;
    valence: string;
    fullName: string;
  }
> = {
  C: {
    color: "#6b7280",
    glow: "rgba(107,114,128,0.6)",
    radius: 22,
    textColor: "#fff",
    valence: "4",
    fullName: "Carbon",
  },
  H: {
    color: "#e5e7eb",
    glow: "rgba(229,231,235,0.5)",
    radius: 16,
    textColor: "#111",
    valence: "1",
    fullName: "Hydrogen",
  },
  O: {
    color: "#ef4444",
    glow: "rgba(239,68,68,0.6)",
    radius: 20,
    textColor: "#fff",
    valence: "2",
    fullName: "Oxygen",
  },
  N: {
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.6)",
    radius: 20,
    textColor: "#fff",
    valence: "3",
    fullName: "Nitrogen",
  },
  Cl: {
    color: "#00FF88",
    glow: "rgba(0,255,136,0.6)",
    radius: 21,
    textColor: "#111",
    valence: "1",
    fullName: "Chlorine",
  },
  Br: {
    color: "#A0522D",
    glow: "rgba(160,82,45,0.6)",
    radius: 22,
    textColor: "#fff",
    valence: "1",
    fullName: "Bromine",
  },
  I: {
    color: "#6A0DAD",
    glow: "rgba(106,13,173,0.6)",
    radius: 23,
    textColor: "#fff",
    valence: "1",
    fullName: "Iodine",
  },
  S: {
    color: "#FFD700",
    glow: "rgba(255,215,0,0.6)",
    radius: 21,
    textColor: "#111",
    valence: "2/6",
    fullName: "Sulfur",
  },
  P: {
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.6)",
    radius: 21,
    textColor: "#fff",
    valence: "3/5",
    fullName: "Phosphorus",
  },
  F: {
    color: "#00BFFF",
    glow: "rgba(0,191,255,0.6)",
    radius: 17,
    textColor: "#111",
    valence: "1",
    fullName: "Fluorine",
  },
  Na: {
    color: "#C0C0C0",
    glow: "rgba(192,192,192,0.6)",
    radius: 22,
    textColor: "#111",
    valence: "1",
    fullName: "Sodium",
  },
  K: {
    color: "#9370DB",
    glow: "rgba(147,112,219,0.6)",
    radius: 23,
    textColor: "#fff",
    valence: "1",
    fullName: "Potassium",
  },
  Ca: {
    color: "#3CB371",
    glow: "rgba(60,179,113,0.6)",
    radius: 22,
    textColor: "#fff",
    valence: "2",
    fullName: "Calcium",
  },
};

const BOND_GLOW: Record<BondType, string> = {
  1: "rgba(255,255,255,0.7)",
  2: "rgba(34,211,238,0.85)",
  3: "rgba(167,139,250,0.9)",
};

const BOND_WIDTH: Record<BondType, number> = { 1: 2, 2: 3, 3: 4 };
const BOND_OFFSET: Record<BondType, number> = { 1: 0, 2: 4, 3: 5 };

// ── Bond angle data ────────────────────────────────────────────────────────
const BOND_ANGLES: Record<string, string> = {
  linear: "180°",
  "linear (diatomic)": "180°",
  "linear (diradical)": "180°",
  "linear (triple bond)": "180°",
  bent: "104.5°",
  "bent (v-shape)": "104.5°",
  "v-shape": "104.5°",
  "trigonal planar": "120°",
  "planar hexagonal (delocalized)": "120°",
  tetrahedral: "109.5°",
  "trigonal pyramidal": "107°",
  "trigonal bipyramidal": "90° / 120°",
  octahedral: "90°",
};

// Shape → badge colour
const SHAPE_BADGE: Record<string, { label: string; cls: string }> = {
  linear: {
    label: "Linear",
    cls: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  bent: {
    label: "Bent",
    cls: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  "v-shape": {
    label: "Bent",
    cls: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  "trigonal planar": {
    label: "Trigonal Planar",
    cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  tetrahedral: {
    label: "Tetrahedral",
    cls: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  "trigonal pyramidal": {
    label: "Trigonal Pyramidal",
    cls: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  "trigonal bipyramidal": {
    label: "Trig. Bipyramidal",
    cls: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  octahedral: {
    label: "Octahedral",
    cls: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  ionic: {
    label: "Ionic",
    cls: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  },
};

function getShapeBadge(shape: string): { label: string; cls: string } | null {
  const lower = shape.toLowerCase();
  for (const key of Object.keys(SHAPE_BADGE)) {
    if (lower.includes(key)) return SHAPE_BADGE[key];
  }
  return null;
}

function getBondAngle(shape: string): string | null {
  const lower = shape.toLowerCase();
  for (const key of Object.keys(BOND_ANGLES)) {
    if (lower.includes(key)) return BOND_ANGLES[key];
  }
  return null;
}

// Tiny inline SVG shapes
function ShapeIcon({ shape }: { shape: string }) {
  const lower = shape.toLowerCase();
  if (lower.includes("linear") || lower.includes("diatomic")) {
    return (
      <svg
        width="48"
        height="24"
        viewBox="0 0 48 24"
        fill="none"
        role="img"
        aria-label="Linear molecular geometry"
      >
        <circle cx="6" cy="12" r="5" fill="rgba(99,202,255,0.7)" />
        <line
          x1="11"
          y1="12"
          x2="37"
          y2="12"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <circle cx="42" cy="12" r="5" fill="rgba(99,202,255,0.7)" />
      </svg>
    );
  }
  if (lower.includes("bent") || lower.includes("v-shape")) {
    return (
      <svg
        width="48"
        height="30"
        viewBox="0 0 48 30"
        fill="none"
        role="img"
        aria-label="Bent V-shape molecular geometry"
      >
        <circle cx="6" cy="24" r="5" fill="rgba(239,68,68,0.8)" />
        <line
          x1="10"
          y1="21"
          x2="23"
          y2="7"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <circle cx="24" cy="5" r="5" fill="rgba(59,130,246,0.8)" />
        <line
          x1="25"
          y1="7"
          x2="38"
          y2="21"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <circle cx="42" cy="24" r="5" fill="rgba(239,68,68,0.8)" />
      </svg>
    );
  }
  if (
    lower.includes("trigonal planar") ||
    lower.includes("planar hexagonal") ||
    lower.includes("planar")
  ) {
    return (
      <svg
        width="48"
        height="40"
        viewBox="0 0 48 40"
        fill="none"
        role="img"
        aria-label="Trigonal planar molecular geometry"
      >
        <circle cx="24" cy="4" r="5" fill="rgba(52,211,153,0.8)" />
        <line
          x1="20"
          y1="8"
          x2="7"
          y2="32"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <line
          x1="28"
          y1="8"
          x2="41"
          y2="32"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <line
          x1="9"
          y1="35"
          x2="39"
          y2="35"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <circle cx="5" cy="35" r="5" fill="rgba(52,211,153,0.8)" />
        <circle cx="43" cy="35" r="5" fill="rgba(52,211,153,0.8)" />
      </svg>
    );
  }
  if (lower.includes("tetrahedral")) {
    return (
      <svg
        width="48"
        height="44"
        viewBox="0 0 48 44"
        fill="none"
        role="img"
        aria-label="Tetrahedral molecular geometry"
      >
        <circle cx="24" cy="4" r="5" fill="rgba(251,146,60,0.9)" />
        <line
          x1="24"
          y1="9"
          x2="5"
          y2="38"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <line
          x1="24"
          y1="9"
          x2="43"
          y2="38"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <line
          x1="24"
          y1="9"
          x2="24"
          y2="38"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <line
          x1="5"
          y1="40"
          x2="43"
          y2="40"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
        <circle cx="5" cy="40" r="4" fill="rgba(251,146,60,0.8)" />
        <circle cx="43" cy="40" r="4" fill="rgba(251,146,60,0.8)" />
        <circle cx="24" cy="40" r="4" fill="rgba(251,146,60,0.6)" />
      </svg>
    );
  }
  if (lower.includes("trigonal pyramidal")) {
    return (
      <svg
        width="48"
        height="40"
        viewBox="0 0 48 40"
        fill="none"
        role="img"
        aria-label="Trigonal pyramidal molecular geometry"
      >
        <circle cx="24" cy="4" r="5" fill="rgba(236,72,153,0.9)" />
        <line
          x1="24"
          y1="9"
          x2="8"
          y2="34"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <line
          x1="24"
          y1="9"
          x2="40"
          y2="34"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        <line
          x1="24"
          y1="9"
          x2="24"
          y2="35"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <circle cx="8" cy="36" r="4" fill="rgba(236,72,153,0.7)" />
        <circle cx="40" cy="36" r="4" fill="rgba(236,72,153,0.7)" />
        <circle cx="24" cy="37" r="4" fill="rgba(236,72,153,0.5)" />
      </svg>
    );
  }
  return null;
}

// ── Compound detection ─────────────────────────────────────────────────────
type Signature = string;

function atomSignature(atoms: PlacedAtom[]): Signature {
  const count: Partial<Record<AtomType, number>> = {};
  for (const a of atoms) count[a.type] = (count[a.type] ?? 0) + 1;
  return (Object.entries(count) as [AtomType, number][])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([t, n]) => `${t}${n}`)
    .join("");
}

const COMPOUND_DB: Record<Signature, CompoundInfo> = {
  // ── Water-family / small inorganic ───────────────────────────────────────
  H2O1: {
    name: "Water",
    formula: "H₂O",
    type: "Inorganic",
    hybridization: "sp³",
    shape: "Bent (V-shape)",
    uses: "Universal solvent, essential for all life, cooling systems",
  },
  C1O2: {
    name: "Carbon Dioxide",
    formula: "CO₂",
    type: "Inorganic",
    hybridization: "sp",
    shape: "Linear",
    uses: "Photosynthesis reactant, fire extinguishers, carbonated drinks",
  },
  C1H4: {
    name: "Methane",
    formula: "CH₄",
    type: "Organic",
    hybridization: "sp³",
    shape: "Tetrahedral",
    uses: "Natural gas fuel, chemical feedstock, biogas production",
  },
  H3N1: {
    name: "Ammonia",
    formula: "NH₃",
    type: "Inorganic",
    hybridization: "sp³",
    shape: "Trigonal pyramidal",
    uses: "Fertilizers, cleaning agents, refrigerant (Haber process)",
  },
  C2H6O1: {
    name: "Ethanol",
    formula: "C₂H₅OH",
    type: "Organic",
    hybridization: "sp³",
    shape: "Tetrahedral + bent at O",
    uses: "Alcoholic beverages, antiseptic, fuel additive",
  },
  C2H4: {
    name: "Ethylene",
    formula: "C₂H₄",
    type: "Organic",
    hybridization: "sp²",
    shape: "Trigonal planar",
    uses: "Plastic production (polyethylene), fruit ripening agent",
  },
  C2H2: {
    name: "Acetylene",
    formula: "C₂H₂",
    type: "Organic",
    hybridization: "sp",
    shape: "Linear",
    uses: "Welding fuel, organic synthesis, lighting",
  },
  C1H4O1: {
    name: "Methanol",
    formula: "CH₃OH",
    type: "Organic",
    hybridization: "sp³",
    shape: "Tetrahedral + bent at O",
    uses: "Fuel, antifreeze, solvent, chemical feedstock",
  },
  C6H6: {
    name: "Benzene",
    formula: "C₆H₆",
    type: "Organic",
    hybridization: "sp²",
    shape: "Planar hexagonal (delocalized)",
    uses: "Petrochemicals, dyes, pharmaceuticals, plastics",
  },
  C1H2O2: {
    name: "Formic Acid",
    formula: "HCOOH",
    type: "Organic",
    hybridization: "sp² (carboxyl)",
    shape: "Trigonal planar",
    uses: "Food preservative, leather tanning, ant venom",
  },
  C2H4O2: {
    name: "Acetic Acid",
    formula: "CH₃COOH",
    type: "Organic",
    hybridization: "sp³ + sp²",
    shape: "Trigonal planar (carboxyl group)",
    uses: "Vinegar, solvent, chemical synthesis",
  },
  H2: {
    name: "Hydrogen Gas",
    formula: "H₂",
    type: "Inorganic",
    hybridization: "s–s sigma bond",
    shape: "Linear (diatomic)",
    uses: "Fuel cells, ammonia synthesis, hydrogenation",
  },
  C2: {
    name: "Dicarbon",
    formula: "C₂",
    type: "Inorganic",
    hybridization: "sp",
    shape: "Linear (diatomic)",
    uses: "Found in stellar spectra and flames",
  },
  N2: {
    name: "Nitrogen Gas",
    formula: "N₂",
    type: "Inorganic",
    hybridization: "sp",
    shape: "Linear (triple bond)",
    uses: "Inert gas blanket, fertilizer synthesis, cryogenics",
  },
  O2: {
    name: "Oxygen Gas",
    formula: "O₂",
    type: "Inorganic",
    hybridization: "sp²",
    shape: "Linear (diradical)",
    uses: "Respiration, combustion, steel manufacturing",
  },
  // ── Halogens / halogen compounds ─────────────────────────────────────────
  Cl1H1: {
    name: "Hydrochloric Acid",
    formula: "HCl",
    type: "Inorganic acid",
    hybridization: "sp³",
    shape: "Linear",
    uses: "Lab reagent, stomach acid (gastric HCl), PVC production",
  },
  Br1H1: {
    name: "Hydrobromic Acid",
    formula: "HBr",
    type: "Inorganic acid",
    hybridization: "sp³",
    shape: "Linear",
    uses: "Organic synthesis, catalyst, flame retardants",
  },
  F1H1: {
    name: "Hydrofluoric Acid",
    formula: "HF",
    type: "Inorganic acid",
    hybridization: "sp³",
    shape: "Linear",
    uses: "Glass etching, semiconductor manufacture, uranium processing",
  },
  H1I1: {
    name: "Hydroiodic Acid",
    formula: "HI",
    type: "Inorganic acid",
    hybridization: "sp³",
    shape: "Linear",
    uses: "Organic synthesis, reducing agent, pharmaceuticals",
  },
  C1Cl1H3: {
    name: "Chloromethane",
    formula: "CH₃Cl",
    type: "Haloalkane",
    hybridization: "sp³",
    shape: "Tetrahedral",
    uses: "Refrigerant, methylating agent, organic synthesis",
  },
  Cl2: {
    name: "Chlorine Gas",
    formula: "Cl₂",
    type: "Inorganic",
    hybridization: "sp³",
    shape: "Linear (diatomic)",
    uses: "Water disinfection, PVC synthesis, bleaching agents",
  },
  // ── Sulfur compounds ─────────────────────────────────────────────────────
  O2S1: {
    name: "Sulfur Dioxide",
    formula: "SO₂",
    type: "Inorganic",
    hybridization: "sp²",
    shape: "Bent (V-shape)",
    uses: "Food preservative (E220), bleaching, acid rain precursor",
  },
  O3S1: {
    name: "Sulfur Trioxide",
    formula: "SO₃",
    type: "Inorganic",
    hybridization: "sp²",
    shape: "Trigonal planar",
    uses: "Sulfuric acid production (contact process)",
  },
  H2O4S1: {
    name: "Sulfuric Acid",
    formula: "H₂SO₄",
    type: "Strong acid",
    hybridization: "sp³",
    shape: "Tetrahedral at S",
    uses: "Fertilizer, batteries, industrial chemical, dehydrating agent",
  },
  // ── Nitrogen/acid compounds ───────────────────────────────────────────────
  H1N1O3: {
    name: "Nitric Acid",
    formula: "HNO₃",
    type: "Strong acid",
    hybridization: "sp²",
    shape: "Trigonal planar",
    uses: "Fertilizers, explosives (TNT), stainless steel etching",
  },
  // ── Phosphorus compounds ──────────────────────────────────────────────────
  Cl3P1: {
    name: "Phosphorus Trichloride",
    formula: "PCl₃",
    type: "Inorganic",
    hybridization: "sp³",
    shape: "Trigonal pyramidal",
    uses: "Organic synthesis, pesticide production, flame retardants",
  },
  Cl5P1: {
    name: "Phosphorus Pentachloride",
    formula: "PCl₅",
    type: "Inorganic",
    hybridization: "sp³d",
    shape: "Trigonal bipyramidal",
    uses: "Chlorinating agent, pharmaceutical synthesis",
  },
  H3O4P1: {
    name: "Phosphoric Acid",
    formula: "H₃PO₄",
    type: "Inorganic acid",
    hybridization: "sp³",
    shape: "Tetrahedral",
    uses: "Fertilizers, food additive (cola drinks), rust removal",
  },
  // ── Sodium compounds ──────────────────────────────────────────────────────
  Cl1Na1: {
    name: "Sodium Chloride",
    formula: "NaCl",
    type: "Ionic salt",
    hybridization: "Ionic",
    shape: "Ionic lattice",
    uses: "Table salt, food preservation, de-icing roads",
  },
  H1Na1O1: {
    name: "Sodium Hydroxide",
    formula: "NaOH",
    type: "Strong base",
    hybridization: "Ionic",
    shape: "Ionic",
    uses: "Soap making, paper production, drain cleaner",
  },
  // ── Potassium compounds ───────────────────────────────────────────────────
  H1K1O1: {
    name: "Potassium Hydroxide",
    formula: "KOH",
    type: "Strong base",
    hybridization: "Ionic",
    shape: "Ionic",
    uses: "Soap making, electrolyte in batteries, fertilizer",
  },
  // ── Calcium compounds ─────────────────────────────────────────────────────
  C1Ca1O3: {
    name: "Calcium Carbonate",
    formula: "CaCO₃",
    type: "Ionic compound",
    hybridization: "sp² at C",
    shape: "Trigonal planar CO₃",
    uses: "Limestone, chalk, antacid (Tums), cement raw material",
  },
  Ca1O1: {
    name: "Calcium Oxide",
    formula: "CaO",
    type: "Ionic oxide",
    hybridization: "Ionic",
    shape: "Ionic",
    uses: "Quicklime, steel industry, water treatment",
  },
  // ── Extended organics ────────────────────────────────────────────────────
  C3H8: {
    name: "Propane",
    formula: "C₃H₈",
    type: "Alkane",
    hybridization: "sp³",
    shape: "Tetrahedral (each C)",
    uses: "LPG fuel, portable heaters, BBQ grills",
  },
  C4H10: {
    name: "Butane",
    formula: "C₄H₁₀",
    type: "Alkane",
    hybridization: "sp³",
    shape: "Tetrahedral (each C)",
    uses: "Lighter fluid, camping gas, aerosol propellant",
  },
  C3H6: {
    name: "Propene",
    formula: "C₃H₆",
    type: "Alkene",
    hybridization: "sp²",
    shape: "Trigonal planar (C=C)",
    uses: "Polypropylene production, organic synthesis",
  },
  C2H6: {
    name: "Ethane",
    formula: "C₂H₆",
    type: "Alkane",
    hybridization: "sp³",
    shape: "Tetrahedral",
    uses: "Cracking feedstock for ethylene, natural gas component",
  },
  C1O1: {
    name: "Carbon Monoxide",
    formula: "CO",
    type: "Inorganic",
    hybridization: "sp",
    shape: "Linear",
    uses: "Reducing agent in metallurgy, syngas component, fuel",
  },
  C1H1N1: {
    name: "Hydrogen Cyanide",
    formula: "HCN",
    type: "Inorganic acid",
    hybridization: "sp",
    shape: "Linear",
    uses: "Pesticide manufacture, electroplating, organic synthesis",
  },
  C1H3N1: {
    name: "Methylamine",
    formula: "CH₃NH₂",
    type: "Organic amine",
    hybridization: "sp³",
    shape: "Trigonal pyramidal (N)",
    uses: "Pharmaceuticals, dye intermediates, solvent",
  },
  C1H2O1: {
    name: "Formaldehyde",
    formula: "HCHO",
    type: "Aldehyde",
    hybridization: "sp²",
    shape: "Trigonal planar",
    uses: "Resin production, preservative (formalin), disinfectant",
  },
  C2H4O1: {
    name: "Acetaldehyde",
    formula: "CH₃CHO",
    type: "Aldehyde",
    hybridization: "sp²",
    shape: "Trigonal planar (carbonyl)",
    uses: "Acetic acid synthesis, flavourings, resin production",
  },
  C3H6O1: {
    name: "Acetone",
    formula: "(CH₃)₂CO",
    type: "Ketone",
    hybridization: "sp²",
    shape: "Trigonal planar (carbonyl)",
    uses: "Solvent (nail polish remover), lacquers, pharmaceuticals",
  },
};

// ── Canvas rendering helpers ───────────────────────────────────────────────
function drawAtom(
  ctx: CanvasRenderingContext2D,
  atom: PlacedAtom,
  selected: boolean,
  pending: boolean,
) {
  const cfg = ATOM_CONFIG[atom.type];
  const r = cfg.radius;
  const x = atom.x;
  const y = atom.y;

  // Outer glow on select / pending
  if (selected || pending) {
    ctx.save();
    ctx.shadowColor = pending ? "rgba(251,191,36,0.9)" : "rgba(99,255,200,0.9)";
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(x, y, r + 4, 0, Math.PI * 2);
    ctx.strokeStyle = pending ? "rgba(251,191,36,0.7)" : "rgba(99,255,200,0.7)";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();
  }

  // Atom body glow halo
  ctx.save();
  ctx.shadowColor = cfg.glow;
  ctx.shadowBlur = 18;

  const grad = ctx.createRadialGradient(
    x - r * 0.3,
    y - r * 0.3,
    r * 0.1,
    x,
    y,
    r,
  );
  grad.addColorStop(0, lighten(cfg.color, 0.38));
  grad.addColorStop(0.55, cfg.color);
  grad.addColorStop(1, darken(cfg.color, 0.38));
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Specular highlight
  const spec = ctx.createRadialGradient(
    x - r * 0.28,
    y - r * 0.35,
    0,
    x - r * 0.1,
    y - r * 0.15,
    r * 0.55,
  );
  spec.addColorStop(0, "rgba(255,255,255,0.38)");
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = spec;
  ctx.fill();
  ctx.restore();

  // Symbol text
  ctx.save();
  const fontSize = atom.type.length > 1 ? (r < 18 ? 9 : 11) : r < 18 ? 11 : 13;
  ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
  ctx.fillStyle = cfg.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(atom.type, x, y);
  ctx.restore();
}

function drawBond(
  ctx: CanvasRenderingContext2D,
  a1: PlacedAtom,
  a2: PlacedAtom,
  order: BondType,
) {
  const dx = a2.x - a1.x;
  const dy = a2.y - a1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  const nx = -dy / len;
  const ny = dx / len;
  const off = BOND_OFFSET[order];
  const lines: number[] =
    order === 1 ? [0] : order === 2 ? [-1, 1] : [-1, 0, 1];

  ctx.save();
  ctx.shadowColor = BOND_GLOW[order];
  ctx.shadowBlur = order === 1 ? 6 : order === 2 ? 10 : 15;
  ctx.strokeStyle = BOND_GLOW[order];
  ctx.lineWidth = BOND_WIDTH[order];
  ctx.lineCap = "round";

  for (const m of lines) {
    const ox = nx * off * m;
    const oy = ny * off * m;
    const r1 = ATOM_CONFIG[a1.type].radius;
    const r2 = ATOM_CONFIG[a2.type].radius;
    const startX = a1.x + (dx / len) * r1 + ox;
    const startY = a1.y + (dy / len) * r1 + oy;
    const endX = a2.x - (dx / len) * r2 + ox;
    const endY = a2.y - (dy / len) * r2 + oy;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const step = 32;
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.055)";
  for (let x = step; x < w; x += step) {
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function lighten(hex: string, amount: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const clamp = (v: number) =>
    Math.min(255, Math.round(v + (255 - v) * amount));
  return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`;
}

function darken(hex: string, amount: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const clamp = (v: number) => Math.max(0, Math.round(v * (1 - amount)));
  return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`;
}

// ── Palette atom button component ───────────────────────────────────────────
type PaletteAtomProps = {
  type: AtomType;
  onDragStart: (e: React.DragEvent<HTMLButtonElement>, t: AtomType) => void;
  onDragEnd: () => void;
  onTap: (t: AtomType) => void;
};

function PaletteAtomBtn({
  type,
  onDragStart,
  onDragEnd,
  onTap,
}: PaletteAtomProps) {
  const cfg = ATOM_CONFIG[type];
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={onDragEnd}
      onClick={() => onTap(type)}
      title={`${cfg.fullName} — valence: ${cfg.valence}`}
      data-ocid={`builder.palette_atom_${type.toLowerCase()}`}
      className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 cursor-grab active:cursor-grabbing border transition-all duration-200 select-none hover:scale-105 active:scale-95"
      style={{
        background: `${cfg.color}20`,
        borderColor: `${cfg.color}50`,
        minWidth: type.length > 1 ? 44 : 40,
      }}
    >
      <span
        className="flex items-center justify-center rounded-full font-bold leading-none"
        style={{
          width: 28,
          height: 28,
          background: cfg.color,
          color: cfg.textColor,
          fontSize: type.length > 1 ? 9 : 12,
          boxShadow: `0 0 8px ${cfg.glow}`,
        }}
      >
        {type}
      </span>
      <span
        className="text-[9px] font-medium leading-none opacity-60 truncate"
        style={{ color: cfg.color, maxWidth: 38 }}
      >
        {cfg.fullName.slice(0, 4)}
      </span>
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function MoleculeBuilderPage() {
  const animLevel = useAnimationLevel();
  const mobile = useMemo(() => isMobileDevice(), []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const isDraggingPaletteAtom = useRef<AtomType | null>(null);

  const [atoms, setAtoms] = useState<PlacedAtom[]>([]);
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [nextId, setNextId] = useState(1);
  const [selectedAtomId, setSelectedAtomId] = useState<number | null>(null);
  const [pendingBondId, setPendingBondId] = useState<number | null>(null);
  const [bondType, setBondType] = useState<BondType>(1);
  const [rotating, setRotating] = useState(false);
  const [compound, setCompound] = useState<CompoundInfo | null>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 600, h: 500 });
  const [draggingAtomId, setDraggingAtomId] = useState<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const PALETTE_ATOMS: AtomType[] = [
    "C",
    "H",
    "O",
    "N",
    "Cl",
    "Br",
    "I",
    "S",
    "P",
    "F",
    "Na",
    "K",
    "Ca",
  ];

  // ── Compound detection ────────────────────────────────────────────────────
  useEffect(() => {
    if (atoms.length === 0) {
      setCompound(null);
      return;
    }
    const sig = atomSignature(atoms);
    setCompound(COMPOUND_DB[sig] ?? null);
  }, [atoms]);

  // ── Canvas sizing ─────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCanvasSize({ w: Math.floor(width), h: Math.floor(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Draw ──────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = canvasSize;
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h);

    if (atoms.length === 0) {
      ctx.save();
      ctx.font = "15px 'Inter', sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Drag atoms here to build a molecule", w / 2, h / 2 - 12);
      ctx.font = "12px 'Inter', sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      ctx.fillText(
        "Click two atoms to add a bond between them",
        w / 2,
        h / 2 + 14,
      );
      ctx.restore();
      return;
    }

    const cx = atoms.reduce((s, a) => s + a.x, 0) / atoms.length;
    const cy = atoms.reduce((s, a) => s + a.y, 0) / atoms.length;
    const angle = rotating ? rotationRef.current : 0;

    const transform = (atom: PlacedAtom) => {
      if (!rotating) return atom;
      const dx = atom.x - cx;
      const dy = atom.y - cy;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        ...atom,
        x: cx + dx * cos - dy * sin,
        y: cy + dx * sin + dy * cos,
      };
    };

    for (const bond of bonds) {
      const a1 = atoms.find((a) => a.id === bond.from);
      const a2 = atoms.find((a) => a.id === bond.to);
      if (!a1 || !a2) continue;
      drawBond(ctx, transform(a1), transform(a2), bond.order);
    }
    for (const atom of atoms) {
      drawAtom(
        ctx,
        transform(atom),
        atom.id === selectedAtomId,
        atom.id === pendingBondId,
      );
    }
  }, [atoms, bonds, canvasSize, rotating, selectedAtomId, pendingBondId]);

  // ── Animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!rotating) {
      draw();
      return;
    }
    const speed = animLevel === "minimal" ? 0.003 : 0.007;
    const loop = () => {
      rotationRef.current += speed;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rotating, draw, animLevel]);

  useEffect(() => {
    if (!rotating) draw();
  }, [draw, rotating]);

  // ── Hit test ──────────────────────────────────────────────────────────────
  const hitAtom = useCallback(
    (x: number, y: number): PlacedAtom | null => {
      for (let i = atoms.length - 1; i >= 0; i--) {
        const a = atoms[i];
        const r = ATOM_CONFIG[a.type].radius + 4; // generous hit target
        const dx = x - a.x;
        const dy = y - a.y;
        if (dx * dx + dy * dy <= r * r) return a;
      }
      return null;
    },
    [atoms],
  );

  const clientToCanvas = useCallback((clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  // ── Shared bond logic ─────────────────────────────────────────────────────
  const handleBondClick = useCallback(
    (hitId: number) => {
      if (pendingBondId === null) {
        setPendingBondId(hitId);
        setSelectedAtomId(null);
      } else if (pendingBondId !== hitId) {
        const from = pendingBondId;
        const to = hitId;
        const existing = bonds.find(
          (b) =>
            (b.from === from && b.to === to) ||
            (b.from === to && b.to === from),
        );
        if (existing) {
          setBonds((prev) =>
            prev.map((b) =>
              (b.from === from && b.to === to) ||
              (b.from === to && b.to === from)
                ? { ...b, order: ((b.order % 3) + 1) as BondType }
                : b,
            ),
          );
        } else {
          setBonds((prev) => [...prev, { from, to, order: bondType }]);
        }
        setPendingBondId(null);
        setSelectedAtomId(hitId);
      } else {
        setPendingBondId(null);
        setSelectedAtomId(hitId);
      }
    },
    [pendingBondId, bonds, bondType],
  );

  // ── Mouse events ──────────────────────────────────────────────────────────
  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDraggingPaletteAtom.current !== null) return;
      const pos = clientToCanvas(e.clientX, e.clientY);
      const hit = hitAtom(pos.x, pos.y);
      if (hit && e.button === 0) {
        handleBondClick(hit.id);
        dragOffset.current = { x: pos.x - hit.x, y: pos.y - hit.y };
        setDraggingAtomId(hit.id);
      } else if (!hit) {
        setPendingBondId(null);
        setSelectedAtomId(null);
      }
    },
    [hitAtom, clientToCanvas, handleBondClick],
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (draggingAtomId === null) return;
      const pos = clientToCanvas(e.clientX, e.clientY);
      setAtoms((prev) =>
        prev.map((a) =>
          a.id === draggingAtomId
            ? {
                ...a,
                x: pos.x - dragOffset.current.x,
                y: pos.y - dragOffset.current.y,
              }
            : a,
        ),
      );
    },
    [draggingAtomId, clientToCanvas],
  );

  const handleCanvasMouseUp = useCallback(() => setDraggingAtomId(null), []);

  // ── Touch events ──────────────────────────────────────────────────────────
  const handleCanvasTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const pos = clientToCanvas(t.clientX, t.clientY);
      const hit = hitAtom(pos.x, pos.y);
      if (hit) {
        dragOffset.current = { x: pos.x - hit.x, y: pos.y - hit.y };
        setDraggingAtomId(hit.id);
        handleBondClick(hit.id);
      } else {
        setPendingBondId(null);
        setSelectedAtomId(null);
      }
    },
    [hitAtom, clientToCanvas, handleBondClick],
  );

  const handleCanvasTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (draggingAtomId === null || e.touches.length !== 1) return;
      e.preventDefault();
      const t = e.touches[0];
      const pos = clientToCanvas(t.clientX, t.clientY);
      setAtoms((prev) =>
        prev.map((a) =>
          a.id === draggingAtomId
            ? {
                ...a,
                x: pos.x - dragOffset.current.x,
                y: pos.y - dragOffset.current.y,
              }
            : a,
        ),
      );
    },
    [draggingAtomId, clientToCanvas],
  );

  const handleCanvasTouchEnd = useCallback(() => setDraggingAtomId(null), []);

  // ── Drop from palette ─────────────────────────────────────────────────────
  const handleCanvasDrop = useCallback(
    (e: React.DragEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const atomType = e.dataTransfer.getData("atomType") as AtomType;
      if (!atomType) return;
      const pos = clientToCanvas(e.clientX, e.clientY);
      setAtoms((prev) => [
        ...prev,
        { id: nextId, type: atomType, x: pos.x, y: pos.y },
      ]);
      setNextId((n) => n + 1);
    },
    [clientToCanvas, nextId],
  );

  const handleCanvasDragOver = useCallback(
    (e: React.DragEvent<HTMLCanvasElement>) => e.preventDefault(),
    [],
  );

  // ── Delete / clear ────────────────────────────────────────────────────────
  const handleDeleteSelected = useCallback(() => {
    if (selectedAtomId === null) return;
    setAtoms((prev) => prev.filter((a) => a.id !== selectedAtomId));
    setBonds((prev) =>
      prev.filter((b) => b.from !== selectedAtomId && b.to !== selectedAtomId),
    );
    setSelectedAtomId(null);
    setPendingBondId(null);
  }, [selectedAtomId]);

  const handleClear = useCallback(() => {
    setAtoms([]);
    setBonds([]);
    setSelectedAtomId(null);
    setPendingBondId(null);
    setNextId(1);
    rotationRef.current = 0;
  }, []);

  // ── Save as image ─────────────────────────────────────────────────────────
  const handleSaveImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const off = document.createElement("canvas");
    off.width = canvas.width;
    off.height = canvas.height;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.fillStyle = "#0d1117";
    octx.fillRect(0, 0, off.width, off.height);
    octx.drawImage(canvas, 0, 0);
    const link = document.createElement("a");
    link.download = "molecule.png";
    link.href = off.toDataURL("image/png");
    link.click();
  }, []);

  // ── Palette handlers ──────────────────────────────────────────────────────
  const handlePaletteDragStart = useCallback(
    (e: React.DragEvent<HTMLButtonElement>, type: AtomType) => {
      isDraggingPaletteAtom.current = type;
      e.dataTransfer.setData("atomType", type);
    },
    [],
  );
  const handlePaletteDragEnd = useCallback(() => {
    isDraggingPaletteAtom.current = null;
  }, []);
  const handlePaletteTap = useCallback(
    (type: AtomType) => {
      const { w, h } = canvasSize;
      const jitter = {
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 80,
      };
      setAtoms((prev) => [
        ...prev,
        { id: nextId, type, x: w / 2 + jitter.x, y: h / 2 + jitter.y },
      ]);
      setNextId((n) => n + 1);
    },
    [canvasSize, nextId],
  );

  const bondLabel: Record<BondType, string> = {
    1: "Single",
    2: "Double",
    3: "Triple",
  };
  const shapeBadge = compound ? getShapeBadge(compound.shape) : null;
  const bondAngle = compound ? getBondAngle(compound.shape) : null;

  // ── Bond selector helper ─────────────────────────────────────────────────
  const BondSelector = ({ compact }: { compact?: boolean }) => (
    <>
      {([1, 2, 3] as BondType[]).map((b) => (
        <button
          key={b}
          type="button"
          onClick={() => setBondType(b)}
          className={[
            compact
              ? "shrink-0 rounded-lg px-2.5 py-2 text-[11px]"
              : "rounded-lg px-2 py-1.5 text-xs",
            "font-semibold border transition-all duration-200",
            bondType === b
              ? b === 1
                ? "bg-white/20 border-white/40 text-foreground"
                : b === 2
                  ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
                  : "bg-violet-500/20 border-violet-400/50 text-violet-300"
              : "bg-transparent border-white/10 text-muted-foreground hover:border-white/25",
          ].join(" ")}
          data-ocid={
            compact ? `builder.mobile_bond_${b}` : `builder.bond_type_${b}`
          }
        >
          {bondLabel[b]}
        </button>
      ))}
    </>
  );

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)] min-h-[500px] select-none"
      data-ocid="molecule_builder.page"
    >
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-2 flex items-center justify-between gap-3 border-b border-white/10">
        <div>
          <h1 className="font-display font-bold text-xl text-foreground leading-tight">
            Molecule Builder
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {mobile
              ? "Tap palette to add atoms. Tap two atoms to bond."
              : "Drag atoms onto canvas. Click two atoms to create a bond."}
          </p>
        </div>
        {compound && (
          <div className="hidden sm:flex items-center gap-2 glass rounded-xl px-3 py-1.5 border border-white/10 shrink-0">
            <span className="text-accent font-semibold text-sm">
              {compound.formula}
            </span>
            <span className="text-xs text-muted-foreground">
              {compound.name}
            </span>
            {shapeBadge && (
              <span
                className={`text-[10px] font-bold uppercase tracking-wide rounded px-1.5 py-0.5 border ${shapeBadge.cls}`}
              >
                {shapeBadge.label}
              </span>
            )}
          </div>
        )}
      </div>

      <div
        className={[
          "flex flex-1 min-h-0 overflow-hidden",
          mobile ? "flex-col" : "flex-row",
        ].join(" ")}
      >
        {/* Desktop left palette */}
        {!mobile && (
          <aside
            className="shrink-0 w-36 flex flex-col gap-2 p-3 border-r border-white/10 bg-card/30 backdrop-blur-sm overflow-y-auto"
            data-ocid="builder.atom_palette"
          >
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider px-1">
              Atoms
            </p>
            {/* 2-column grid for 13 elements */}
            <div className="grid grid-cols-2 gap-1.5">
              {PALETTE_ATOMS.map((t) => (
                <PaletteAtomBtn
                  key={t}
                  type={t}
                  onDragStart={handlePaletteDragStart}
                  onDragEnd={handlePaletteDragEnd}
                  onTap={handlePaletteTap}
                />
              ))}
            </div>
            <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2">
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider px-1">
                Bond
              </p>
              <BondSelector />
            </div>
          </aside>
        )}

        {/* Canvas */}
        <div
          ref={containerRef}
          className="flex-1 min-w-0 min-h-0 relative bg-black/30 backdrop-blur-sm"
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.w}
            height={canvasSize.h}
            className="absolute inset-0 w-full h-full touch-none"
            style={{
              cursor: draggingAtomId !== null ? "grabbing" : "crosshair",
            }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            onTouchStart={handleCanvasTouchStart}
            onTouchMove={handleCanvasTouchMove}
            onTouchEnd={handleCanvasTouchEnd}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            data-ocid="builder.canvas_target"
          />

          {/* Controls overlay */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
            {selectedAtomId !== null && (
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="glass rounded-lg px-3 py-2 text-xs font-semibold text-rose-400 border border-rose-400/30 hover:bg-rose-500/20 transition-all duration-200"
                data-ocid="builder.delete_button"
              >
                Delete Atom
              </button>
            )}
            <button
              type="button"
              onClick={() => setRotating((r) => !r)}
              className={[
                "glass rounded-lg px-3 py-2 text-xs font-semibold border transition-all duration-200",
                rotating
                  ? "border-accent/50 text-accent bg-accent/10"
                  : "border-white/15 text-muted-foreground hover:border-white/30",
              ].join(" ")}
              data-ocid="builder.rotate_toggle"
            >
              {rotating ? "Stop Rotation" : "Auto Rotate"}
            </button>
            <button
              type="button"
              onClick={handleSaveImage}
              className="glass rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground border border-white/10 hover:border-white/30 hover:text-foreground transition-all duration-200"
              data-ocid="builder.save_image_button"
            >
              Save PNG
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="glass rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground border border-white/10 hover:border-white/25 hover:text-foreground transition-all duration-200"
              data-ocid="builder.clear_button"
            >
              Clear All
            </button>
          </div>

          {/* Pending bond hint */}
          {pendingBondId !== null && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 glass rounded-full px-4 py-1.5 text-xs text-amber-300 border border-amber-400/30 pointer-events-none">
              Click another atom to create a {bondLabel[bondType].toLowerCase()}{" "}
              bond
            </div>
          )}
        </div>

        {/* Desktop right info panel */}
        {!mobile && (
          <aside
            className="shrink-0 flex flex-col gap-3 p-4 border-l border-white/10 bg-card/30 backdrop-blur-sm overflow-y-auto"
            style={{ width: 272 }}
            data-ocid="builder.info_panel"
          >
            {compound ? (
              <>
                {/* Formula header */}
                <div className="glass rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-display font-bold text-accent mb-0.5">
                    {compound.formula}
                  </div>
                  <div className="text-base font-semibold text-foreground mb-2">
                    {compound.name}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className={[
                        "text-[10px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5",
                        compound.type.toLowerCase().includes("organic") &&
                        !compound.type.toLowerCase().includes("inorganic")
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-sky-500/20 text-sky-300",
                      ].join(" ")}
                    >
                      {compound.type}
                    </span>
                    {shapeBadge && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wide rounded px-1.5 py-0.5 border ${shapeBadge.cls}`}
                      >
                        {shapeBadge.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Geometry + bond angle + SVG icon */}
                <div className="glass rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">
                    Geometry
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="opacity-80 shrink-0">
                      <ShapeIcon shape={compound.shape} />
                    </div>
                    <div>
                      <div className="text-sm text-foreground font-medium">
                        {compound.shape}
                      </div>
                      {bondAngle && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Bond angle:{" "}
                          <span className="text-accent font-semibold">
                            {bondAngle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hybridization */}
                <div className="glass rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                    Hybridization
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    {compound.hybridization}
                  </div>
                </div>

                {/* Uses */}
                <div className="glass rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                    Uses
                  </div>
                  <div className="text-sm text-foreground leading-relaxed">
                    {compound.uses}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3 opacity-50">
                <div className="text-4xl">⚗️</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Build a molecule to detect compound info
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Try H₂O, CO₂, CH₄, NH₃, HCl, NaCl, SO₂…
                </p>
              </div>
            )}

            {/* Bond legend */}
            <div className="mt-auto pt-3 border-t border-white/10">
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                Bond Legend
              </p>
              {([1, 2, 3] as BondType[]).map((b) => (
                <div key={b} className="flex items-center gap-2 mb-1.5">
                  <div
                    className="rounded-full"
                    style={{
                      width: 32,
                      height: b * 2,
                      background: BOND_GLOW[b],
                      boxShadow: `0 0 ${b * 4}px ${BOND_GLOW[b]}`,
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {bondLabel[b]}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Mobile bottom palette */}
      {mobile && (
        <div
          className="shrink-0 flex items-center gap-2 px-3 py-2.5 border-t border-white/10 bg-card/40 backdrop-blur-md overflow-x-auto"
          data-ocid="builder.mobile_palette"
        >
          <p className="text-[10px] text-muted-foreground shrink-0 mr-1">
            Add:
          </p>
          {PALETTE_ATOMS.map((t) => (
            <PaletteAtomBtn
              key={t}
              type={t}
              onDragStart={handlePaletteDragStart}
              onDragEnd={handlePaletteDragEnd}
              onTap={handlePaletteTap}
            />
          ))}
          <div className="w-px h-8 bg-white/10 shrink-0 mx-1" />
          <BondSelector compact />
          <div className="w-px h-8 bg-white/10 shrink-0 mx-1" />
          <button
            type="button"
            onClick={() => setRotating((r) => !r)}
            className={[
              "shrink-0 rounded-lg px-2.5 py-2 text-[11px] font-semibold border transition-all duration-200",
              rotating
                ? "border-accent/50 text-accent bg-accent/10"
                : "border-white/10 text-muted-foreground",
            ].join(" ")}
            data-ocid="builder.mobile_rotate_toggle"
          >
            {rotating ? "Stop" : "Rotate"}
          </button>
          <button
            type="button"
            onClick={handleSaveImage}
            className="shrink-0 rounded-lg px-2.5 py-2 text-[11px] font-semibold border border-white/10 text-muted-foreground"
            data-ocid="builder.mobile_save_button"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 rounded-lg px-2.5 py-2 text-[11px] font-semibold border border-white/10 text-muted-foreground"
            data-ocid="builder.mobile_clear_button"
          >
            Clear
          </button>
        </div>
      )}

      {/* Mobile compound strip */}
      {mobile && compound && (
        <div
          className="shrink-0 flex items-center gap-3 px-4 py-2.5 bg-card/50 backdrop-blur-md border-t border-white/10 overflow-x-auto"
          data-ocid="builder.mobile_compound_info"
        >
          <span className="font-semibold text-accent shrink-0">
            {compound.formula}
          </span>
          <span className="text-sm text-foreground shrink-0">
            {compound.name}
          </span>
          {shapeBadge && (
            <span
              className={`text-[10px] font-bold uppercase tracking-wide rounded px-1.5 py-0.5 border shrink-0 ${shapeBadge.cls}`}
            >
              {shapeBadge.label}
            </span>
          )}
          {bondAngle && (
            <span className="text-xs text-muted-foreground shrink-0">
              {bondAngle}
            </span>
          )}
          <span className="text-xs text-muted-foreground shrink-0">
            {compound.hybridization}
          </span>
        </div>
      )}
    </div>
  );
}
