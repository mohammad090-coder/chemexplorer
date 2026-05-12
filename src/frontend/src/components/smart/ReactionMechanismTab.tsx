import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MechAtom {
  id: string;
  label: string;
  x: number;
  y: number;
  role?: "nucleophile" | "electrophile" | "leaving" | "neutral";
}

interface MechBond {
  id: string;
  from: string;
  to: string;
  order: 1 | 2 | 3;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

interface MechArrow {
  id: string;
  path: string; // SVG path d attr
}

interface MechStep {
  title: string;
  description: string;
  atoms: MechAtom[];
  bonds: MechBond[];
  arrows: MechArrow[];
  // atoms with transforms relative to base position
  moveAtoms?: Record<string, { dx: number; dy: number }>;
}

interface Mechanism {
  id: string;
  name: string;
  fullName: string;
  type: string;
  conditions: string[];
  steps: MechStep[];
}

// ─── Colour helpers ───────────────────────────────────────────────────────────
const ROLE_COLORS: Record<NonNullable<MechAtom["role"]>, string> = {
  nucleophile: "oklch(0.55 0.22 258)", // blue
  electrophile: "oklch(0.6 0.22 28)", // red-orange
  leaving: "oklch(0.55 0.06 0)", // grey
  neutral: "oklch(0.78 0.12 140)", // green
};
const ROLE_GLOWS: Record<NonNullable<MechAtom["role"]>, string> = {
  nucleophile: "drop-shadow(0 0 6px oklch(0.55 0.22 258 / 0.8))",
  electrophile: "drop-shadow(0 0 6px oklch(0.6 0.22 28 / 0.8))",
  leaving: "drop-shadow(0 0 4px oklch(0.55 0.06 0 / 0.5))",
  neutral: "drop-shadow(0 0 5px oklch(0.78 0.12 140 / 0.6))",
};

// ─── SVG Panel ────────────────────────────────────────────────────────────────
const VW = 360;
const VH = 200;
const R = 18;

function getBondOffset(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  order: 1 | 2 | 3,
  lineIdx: number,
): { x1: number; y1: number; x2: number; y2: number } {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const spread = order === 1 ? 0 : order === 2 ? 4 : 5;
  const offsets =
    order === 1
      ? [0]
      : order === 2
        ? [-spread, spread]
        : [-spread * 1.1, 0, spread * 1.1];
  const off = offsets[lineIdx] ?? 0;
  return {
    x1: ax + px * off,
    y1: ay + py * off,
    x2: bx + px * off,
    y2: by + py * off,
  };
}

function MechSVG({ step, active }: { step: MechStep; active: boolean }) {
  const atomMap = Object.fromEntries(step.atoms.map((a) => [a.id, a]));

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="w-full"
      style={{ maxHeight: 200 }}
      aria-hidden="true"
    >
      {/* Bonds */}
      {step.bonds.map((bond) => {
        const a = atomMap[bond.from];
        const b = atomMap[bond.to];
        if (!a || !b) return null;
        const lines = Array.from({ length: bond.order }, (_, i) => i);
        return lines.map((lineIdx) => {
          const { x1, y1, x2, y2 } = getBondOffset(
            a.x,
            a.y,
            b.x,
            b.y,
            bond.order,
            lineIdx,
          );
          return (
            <motion.line
              key={`${bond.id}-${lineIdx}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="oklch(0.72 0.06 250)"
              strokeWidth={bond.order > 1 ? 2 : 2.5}
              strokeLinecap="round"
              initial={bond.fadeIn ? { opacity: 0 } : { opacity: 1 }}
              animate={
                active
                  ? { opacity: bond.fadeOut ? 0 : 1 }
                  : { opacity: bond.fadeIn ? 0 : 1 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          );
        });
      })}

      {/* Arrows */}
      {step.arrows.map((arrow) => (
        <motion.path
          key={arrow.id}
          d={arrow.path}
          fill="none"
          stroke="oklch(0.82 0.18 85)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#arrowhead)"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
        />
      ))}

      {/* Atoms */}
      {step.atoms.map((atom) => {
        const color = atom.role
          ? ROLE_COLORS[atom.role]
          : "oklch(0.88 0.04 250)";
        const glow = atom.role ? ROLE_GLOWS[atom.role] : undefined;
        const move = step.moveAtoms?.[atom.id];
        return (
          <motion.g
            key={atom.id}
            initial={{ x: 0, y: 0 }}
            animate={
              active && move ? { x: move.dx, y: move.dy } : { x: 0, y: 0 }
            }
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 }}
          >
            <circle
              cx={atom.x}
              cy={atom.y}
              r={R}
              fill="oklch(0.12 0.03 250)"
              stroke={color}
              strokeWidth={1.8}
              style={{ filter: glow, opacity: 0.95 }}
            />
            <text
              x={atom.x}
              y={atom.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={atom.label.length > 2 ? "9" : "12"}
              fontWeight="600"
              fill={color}
              style={{ fontFamily: "monospace" }}
            >
              {atom.label}
            </text>
          </motion.g>
        );
      })}

      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="oklch(0.82 0.18 85)" />
        </marker>
      </defs>
    </svg>
  );
}

// ─── Mechanism Data ───────────────────────────────────────────────────────────
const MECHANISMS: Mechanism[] = [
  {
    id: "sn2",
    name: "SN2",
    fullName: "Bimolecular Nucleophilic Substitution",
    type: "Substitution",
    conditions: [
      "Strong nucleophile",
      "Polar aprotic solvent",
      "Primary substrate",
    ],
    steps: [
      {
        title: "Starting Materials",
        description:
          "Nucleophile (Nu⁻) and substrate (R–X) approach each other. The leaving group X is still bonded, and the nucleophile is far away.",
        atoms: [
          { id: "nu", label: "Nu⁻", x: 50, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 180, y: 100, role: "neutral" },
          { id: "x", label: "X", x: 310, y: 100, role: "leaving" },
          { id: "r1", label: "R", x: 180, y: 40 },
          { id: "r2", label: "R", x: 145, y: 152 },
          { id: "r3", label: "R", x: 215, y: 152 },
        ],
        bonds: [
          { id: "c-x", from: "c", to: "x", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [],
      },
      {
        title: "Transition State (SN2)",
        description:
          "Backside attack! The nucleophile attacks the carbon 180° from the leaving group simultaneously as X⁻ departs — a single concerted step with a pentacoordinate transition state.",
        atoms: [
          { id: "nu", label: "Nu", x: 60, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 180, y: 100, role: "neutral" },
          { id: "x", label: "X⁻", x: 300, y: 100, role: "leaving" },
          { id: "r1", label: "R", x: 180, y: 40 },
          { id: "r2", label: "R", x: 155, y: 162 },
          { id: "r3", label: "R", x: 205, y: 162 },
        ],
        bonds: [
          { id: "nu-c", from: "nu", to: "c", order: 1, fadeIn: true },
          { id: "c-x", from: "c", to: "x", order: 1, fadeOut: true },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [
          { id: "arr1", path: "M 75 100 Q 120 80 162 100" },
          { id: "arr2", path: "M 198 100 Q 245 120 288 100" },
        ],
      },
      {
        title: "Product Formation",
        description:
          "Inversion of configuration (Walden inversion). Nu is now bonded to C, X⁻ has fully departed. The product has the opposite stereochemistry at the carbon center.",
        atoms: [
          { id: "nu", label: "Nu", x: 70, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 180, y: 100, role: "neutral" },
          { id: "x", label: "X⁻", x: 320, y: 100, role: "leaving" },
          { id: "r1", label: "R", x: 180, y: 42 },
          { id: "r2", label: "R", x: 155, y: 162 },
          { id: "r3", label: "R", x: 205, y: 162 },
        ],
        bonds: [
          { id: "nu-c", from: "nu", to: "c", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [],
      },
    ],
  },
  {
    id: "sn1",
    name: "SN1",
    fullName: "Unimolecular Nucleophilic Substitution",
    type: "Substitution",
    conditions: [
      "Weak nucleophile",
      "Polar protic solvent",
      "Tertiary/allylic substrate",
    ],
    steps: [
      {
        title: "Starting Material",
        description:
          "A tertiary alkyl halide (R₃C–X) in a polar protic solvent. The C–X bond is polarized, making the carbon electrophilic.",
        atoms: [
          { id: "c", label: "C⁺", x: 180, y: 100, role: "electrophile" },
          { id: "x", label: "X", x: 300, y: 100, role: "leaving" },
          { id: "r1", label: "R", x: 180, y: 40 },
          { id: "r2", label: "R", x: 100, y: 148 },
          { id: "r3", label: "R", x: 260, y: 148 },
        ],
        bonds: [
          { id: "c-x", from: "c", to: "x", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [],
      },
      {
        title: "Carbocation Intermediate",
        description:
          "Rate-determining step: the leaving group X⁻ departs, generating a planar carbocation. This is stabilized by the three R groups (hyperconjugation/induction).",
        atoms: [
          { id: "c", label: "C⁺", x: 180, y: 100, role: "electrophile" },
          { id: "x", label: "X⁻", x: 320, y: 85, role: "leaving" },
          { id: "r1", label: "R", x: 180, y: 40 },
          { id: "r2", label: "R", x: 100, y: 148 },
          { id: "r3", label: "R", x: 260, y: 148 },
        ],
        bonds: [
          { id: "c-x", from: "c", to: "x", order: 1, fadeOut: true },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [{ id: "arr1", path: "M 215 100 Q 265 85 305 87" }],
        moveAtoms: { x: { dx: 25, dy: -15 } },
      },
      {
        title: "Nucleophile Attacks",
        description:
          "The nucleophile (Nu⁻) attacks the flat carbocation from either face, giving a racemic mixture (equal amounts of both enantiomers).",
        atoms: [
          { id: "nu", label: "Nu⁻", x: 50, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 180, y: 100, role: "neutral" },
          { id: "r1", label: "R", x: 180, y: 40 },
          { id: "r2", label: "R", x: 100, y: 148 },
          { id: "r3", label: "R", x: 260, y: 148 },
        ],
        bonds: [
          { id: "nu-c", from: "nu", to: "c", order: 1, fadeIn: true },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [{ id: "arr1", path: "M 70 100 Q 120 75 160 100" }],
      },
      {
        title: "Racemic Product",
        description:
          "Inversion AND retention both occur — racemic mixture produced. Nu is bonded to C. X⁻ is gone. The product can be both R and S configuration.",
        atoms: [
          { id: "nu", label: "Nu", x: 70, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 180, y: 100, role: "neutral" },
          { id: "r1", label: "R", x: 180, y: 40 },
          { id: "r2", label: "R", x: 100, y: 148 },
          { id: "r3", label: "R", x: 260, y: 148 },
        ],
        bonds: [
          { id: "nu-c", from: "nu", to: "c", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [],
      },
    ],
  },
  {
    id: "elec-add",
    name: "Electrophilic Addition",
    fullName: "Electrophilic Addition (HBr to Alkene)",
    type: "Addition",
    conditions: ["HBr reagent", "Markovnikov's rule", "No peroxide"],
    steps: [
      {
        title: "Alkene + HBr",
        description:
          "An alkene (C=C double bond) encounters HBr. The π electrons of the double bond are polarized toward the H of HBr — the first step is electrophilic attack.",
        atoms: [
          { id: "c1", label: "C", x: 130, y: 100, role: "neutral" },
          { id: "c2", label: "C", x: 230, y: 100, role: "neutral" },
          { id: "h", label: "H", x: 295, y: 55, role: "electrophile" },
          { id: "br", label: "Br", x: 320, y: 100, role: "leaving" },
          { id: "r1", label: "R", x: 65, y: 55 },
          { id: "r2", label: "R", x: 65, y: 148 },
          { id: "r3", label: "R", x: 295, y: 148 },
        ],
        bonds: [
          { id: "c1-c2", from: "c1", to: "c2", order: 2 },
          { id: "h-br", from: "h", to: "br", order: 1 },
          { id: "c1-r1", from: "c1", to: "r1", order: 1 },
          { id: "c1-r2", from: "c1", to: "r2", order: 1 },
          { id: "c2-r3", from: "c2", to: "r3", order: 1 },
        ],
        arrows: [],
      },
      {
        title: "Carbocation Intermediate",
        description:
          "H⁺ adds to the less-substituted carbon (Markovnikov). The π bond breaks; a carbocation forms at the more-substituted carbon. HBr's H–Br bond breaks heterolytically.",
        atoms: [
          { id: "c1", label: "CH", x: 130, y: 100, role: "neutral" },
          { id: "c2", label: "C⁺", x: 230, y: 100, role: "electrophile" },
          { id: "br", label: "Br⁻", x: 310, y: 58, role: "leaving" },
          { id: "r1", label: "R", x: 65, y: 55 },
          { id: "r2", label: "R", x: 65, y: 148 },
          { id: "r3", label: "R", x: 295, y: 148 },
        ],
        bonds: [
          { id: "c1-c2", from: "c1", to: "c2", order: 1 },
          { id: "c1-r1", from: "c1", to: "r1", order: 1 },
          { id: "c1-r2", from: "c1", to: "r2", order: 1 },
          { id: "c2-r3", from: "c2", to: "r3", order: 1 },
        ],
        arrows: [
          { id: "arr1", path: "M 170 90 Q 195 65 225 88" },
          { id: "arr2", path: "M 295 75 Q 295 63 311 65" },
        ],
      },
      {
        title: "Br⁻ Attacks Carbocation",
        description:
          "The bromide anion (Br⁻) attacks the electrophilic carbocation from either face. This is the product-forming step.",
        atoms: [
          { id: "c1", label: "CH", x: 130, y: 100, role: "neutral" },
          { id: "c2", label: "C", x: 230, y: 100, role: "neutral" },
          { id: "br", label: "Br", x: 310, y: 100, role: "leaving" },
          { id: "r1", label: "R", x: 65, y: 55 },
          { id: "r2", label: "R", x: 65, y: 148 },
          { id: "r3", label: "R", x: 295, y: 148 },
        ],
        bonds: [
          { id: "c1-c2", from: "c1", to: "c2", order: 1 },
          { id: "c2-br", from: "c2", to: "br", order: 1, fadeIn: true },
          { id: "c1-r1", from: "c1", to: "r1", order: 1 },
          { id: "c1-r2", from: "c1", to: "r2", order: 1 },
          { id: "c2-r3", from: "c2", to: "r3", order: 1 },
        ],
        arrows: [{ id: "arr1", path: "M 295 100 Q 270 80 250 100" }],
      },
    ],
  },
  {
    id: "esterification",
    name: "Esterification",
    fullName: "Fischer Esterification",
    type: "Condensation",
    conditions: [
      "H₂SO₄ catalyst",
      "Heat (reflux)",
      "Carboxylic acid + Alcohol",
    ],
    steps: [
      {
        title: "Reactants",
        description:
          "Carboxylic acid and alcohol meet. The carbonyl carbon of the acid is electrophilic (δ+) due to the C=O polarization.",
        atoms: [
          { id: "c", label: "C", x: 145, y: 100, role: "electrophile" },
          { id: "o1", label: "O", x: 145, y: 42, role: "neutral" },
          { id: "oh", label: "OH", x: 235, y: 100 },
          { id: "r1", label: "R", x: 65, y: 100 },
          { id: "oh2", label: "HO", x: 280, y: 100, role: "nucleophile" },
          { id: "r2", label: "R'", x: 340, y: 100 },
        ],
        bonds: [
          { id: "c-o1", from: "c", to: "o1", order: 2 },
          { id: "c-oh", from: "c", to: "oh", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "oh2-r2", from: "oh2", to: "r2", order: 1 },
        ],
        arrows: [],
      },
      {
        title: "Nucleophilic Attack",
        description:
          "H⁺ catalyst protonates the carbonyl oxygen, making the carbon more electrophilic. The alcohol oxygen (nucleophile) attacks the carbonyl carbon to form a tetrahedral intermediate.",
        atoms: [
          { id: "c", label: "C", x: 145, y: 100, role: "electrophile" },
          { id: "o1", label: "O", x: 145, y: 42, role: "neutral" },
          { id: "oh", label: "OH", x: 215, y: 100 },
          { id: "r1", label: "R", x: 65, y: 100 },
          { id: "or2", label: "OR'", x: 215, y: 155, role: "nucleophile" },
        ],
        bonds: [
          { id: "c-o1", from: "c", to: "o1", order: 1 },
          { id: "c-oh", from: "c", to: "oh", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-or2", from: "c", to: "or2", order: 1, fadeIn: true },
        ],
        arrows: [{ id: "arr1", path: "M 185 152 Q 175 130 162 112" }],
      },
      {
        title: "Water Elimination",
        description:
          "The –OH group (from the original acid) is protonated and expelled as water (H₂O). This restores the C=O double bond.",
        atoms: [
          { id: "c", label: "C", x: 145, y: 100, role: "neutral" },
          { id: "o1", label: "O", x: 145, y: 42, role: "neutral" },
          { id: "oh", label: "OH", x: 248, y: 62, role: "leaving" },
          { id: "r1", label: "R", x: 65, y: 100 },
          { id: "or2", label: "OR'", x: 228, y: 100 },
        ],
        bonds: [
          { id: "c-o1", from: "c", to: "o1", order: 2 },
          { id: "c-oh", from: "c", to: "oh", order: 1, fadeOut: true },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-or2", from: "c", to: "or2", order: 1 },
        ],
        arrows: [{ id: "arr1", path: "M 175 80 Q 208 65 240 68" }],
        moveAtoms: { oh: { dx: 18, dy: -12 } },
      },
      {
        title: "Ester Product",
        description:
          "The ester (R–COO–R') is formed along with water as the by-product. The reaction is reversible (equilibrium), so excess alcohol or removal of water drives it to completion.",
        atoms: [
          { id: "c", label: "C", x: 145, y: 100, role: "neutral" },
          { id: "o1", label: "O", x: 145, y: 42, role: "neutral" },
          { id: "r1", label: "R", x: 65, y: 100 },
          { id: "or2", label: "OR'", x: 228, y: 100 },
          { id: "h2o", label: "H₂O", x: 305, y: 70 },
        ],
        bonds: [
          { id: "c-o1", from: "c", to: "o1", order: 2 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-or2", from: "c", to: "or2", order: 1 },
        ],
        arrows: [],
      },
    ],
  },
  {
    id: "aldol",
    name: "Aldol Condensation",
    fullName: "Aldol Condensation",
    type: "Condensation",
    conditions: ["Dilute NaOH", "Heat for dehydration", "Requires α-H"],
    steps: [
      {
        title: "Enolate Formation",
        description:
          "Base (OH⁻) abstracts the α-hydrogen from one aldehyde molecule, forming a resonance-stabilized enolate anion.",
        atoms: [
          { id: "c1", label: "C", x: 120, y: 100, role: "nucleophile" },
          { id: "ca", label: "Cα", x: 210, y: 100, role: "nucleophile" },
          { id: "o", label: "O", x: 120, y: 42, role: "neutral" },
          { id: "oh", label: "OH⁻", x: 310, y: 70, role: "nucleophile" },
          { id: "r", label: "R", x: 48, y: 100 },
        ],
        bonds: [
          { id: "c1-o", from: "c1", to: "o", order: 2 },
          { id: "c1-ca", from: "c1", to: "ca", order: 1 },
          { id: "c1-r", from: "c1", to: "r", order: 1 },
        ],
        arrows: [{ id: "arr1", path: "M 290 75 Q 260 85 228 97" }],
      },
      {
        title: "Enolate Attacks Carbonyl",
        description:
          "The enolate carbon attacks the carbonyl carbon of a second aldehyde molecule — C–C bond forms. This is the key step of Aldol.",
        atoms: [
          { id: "c1", label: "C", x: 80, y: 100, role: "nucleophile" },
          { id: "ca", label: "Cα", x: 160, y: 100, role: "nucleophile" },
          { id: "o1", label: "O", x: 80, y: 42 },
          { id: "c2", label: "C", x: 255, y: 100, role: "electrophile" },
          { id: "o2", label: "O", x: 255, y: 42 },
          { id: "r1", label: "R", x: 20, y: 100 },
          { id: "r2", label: "R", x: 325, y: 100 },
        ],
        bonds: [
          { id: "c1-o1", from: "c1", to: "o1", order: 2 },
          { id: "c1-ca", from: "c1", to: "ca", order: 1 },
          { id: "c1-r1", from: "c1", to: "r1", order: 1 },
          { id: "c2-o2", from: "c2", to: "o2", order: 2 },
          { id: "c2-r2", from: "c2", to: "r2", order: 1 },
          { id: "ca-c2", from: "ca", to: "c2", order: 1, fadeIn: true },
        ],
        arrows: [{ id: "arr1", path: "M 178 100 Q 210 80 237 100" }],
      },
      {
        title: "β-Hydroxy Aldehyde (Aldol Product)",
        description:
          "After protonation, the β-hydroxy aldehyde (aldol product) is formed. Contains a new C–C bond. Can be isolated here (if no heat).",
        atoms: [
          { id: "c1", label: "C", x: 80, y: 100, role: "neutral" },
          { id: "ca", label: "Cα", x: 160, y: 100 },
          { id: "o1", label: "O", x: 80, y: 42, role: "neutral" },
          { id: "cb", label: "Cβ", x: 240, y: 100 },
          { id: "oh", label: "OH", x: 240, y: 42 },
          { id: "c2", label: "C", x: 320, y: 100 },
          { id: "o2", label: "O", x: 320, y: 42, role: "neutral" },
          { id: "r1", label: "R", x: 20, y: 100 },
        ],
        bonds: [
          { id: "c1-o1", from: "c1", to: "o1", order: 2 },
          { id: "c1-ca", from: "c1", to: "ca", order: 1 },
          { id: "c1-r1", from: "c1", to: "r1", order: 1 },
          { id: "ca-cb", from: "ca", to: "cb", order: 1 },
          { id: "cb-oh", from: "cb", to: "oh", order: 1 },
          { id: "cb-c2", from: "cb", to: "c2", order: 1 },
          { id: "c2-o2", from: "c2", to: "o2", order: 2 },
        ],
        arrows: [],
      },
    ],
  },
  {
    id: "grignard",
    name: "Grignard",
    fullName: "Grignard Reaction",
    type: "C-C Bond Forming",
    conditions: ["Dry ether solvent", "No water/moisture", "RMgX reagent"],
    steps: [
      {
        title: "Grignard Reagent + Carbonyl",
        description:
          "The Grignard reagent RMgX acts as a carbanion source (R⁻). It approaches the carbonyl compound. The C=O bond is electrophilic at carbon.",
        atoms: [
          { id: "r", label: "R", x: 50, y: 100, role: "nucleophile" },
          { id: "mg", label: "MgX", x: 130, y: 100 },
          { id: "c", label: "C", x: 255, y: 100, role: "electrophile" },
          { id: "o", label: "O", x: 255, y: 42 },
          { id: "r2", label: "R'", x: 325, y: 60 },
          { id: "r3", label: "R'", x: 325, y: 142 },
        ],
        bonds: [
          { id: "r-mg", from: "r", to: "mg", order: 1 },
          { id: "c-o", from: "c", to: "o", order: 2 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [],
      },
      {
        title: "Nucleophilic Addition",
        description:
          "R⁻ attacks the electrophilic carbonyl carbon. The C=O π bond breaks — electrons go to oxygen, forming Mg alkoxide intermediate.",
        atoms: [
          { id: "r", label: "R", x: 70, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 180, y: 100, role: "neutral" },
          { id: "o", label: "O⁻", x: 255, y: 55 },
          { id: "mg", label: "MgX", x: 305, y: 55 },
          { id: "r2", label: "R'", x: 248, y: 148 },
          { id: "r3", label: "R'", x: 125, y: 148 },
        ],
        bonds: [
          { id: "r-c", from: "r", to: "c", order: 1, fadeIn: true },
          { id: "c-o", from: "c", to: "o", order: 1 },
          { id: "o-mg", from: "o", to: "mg", order: 1, fadeIn: true },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [
          { id: "arr1", path: "M 88 100 Q 130 80 162 100" },
          { id: "arr2", path: "M 198 90 Q 228 65 250 60" },
        ],
      },
      {
        title: "Hydrolysis → Alcohol",
        description:
          "Workup with dilute acid or water hydrolyzes the Mg alkoxide to give the final alcohol product. New C–C bond is formed!",
        atoms: [
          { id: "r", label: "R", x: 80, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 180, y: 100, role: "neutral" },
          { id: "oh", label: "OH", x: 258, y: 55, role: "neutral" },
          { id: "r2", label: "R'", x: 248, y: 148 },
          { id: "r3", label: "R'", x: 125, y: 148 },
        ],
        bonds: [
          { id: "r-c", from: "r", to: "c", order: 1 },
          { id: "c-oh", from: "c", to: "oh", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [],
      },
    ],
  },
  {
    id: "e2",
    name: "E2 Elimination",
    fullName: "Bimolecular Elimination",
    type: "Elimination",
    conditions: [
      "Strong base",
      "Polar aprotic solvent",
      "Anti-periplanar geometry",
    ],
    steps: [
      {
        title: "Base + Substrate",
        description:
          "A strong base (e.g., KOH in ethanol) and alkyl halide. The β-hydrogen and the leaving group must be anti-periplanar (180° apart) for E2 to occur.",
        atoms: [
          { id: "base", label: "B⁻", x: 45, y: 65, role: "nucleophile" },
          { id: "hb", label: "Hβ", x: 115, y: 65 },
          { id: "cb", label: "Cβ", x: 160, y: 100 },
          { id: "ca", label: "Cα", x: 245, y: 100, role: "electrophile" },
          { id: "x", label: "X", x: 315, y: 135, role: "leaving" },
          { id: "r1", label: "R", x: 160, y: 152 },
          { id: "r2", label: "R", x: 245, y: 50 },
        ],
        bonds: [
          { id: "hb-cb", from: "hb", to: "cb", order: 1 },
          { id: "cb-ca", from: "cb", to: "ca", order: 1 },
          { id: "ca-x", from: "ca", to: "x", order: 1 },
          { id: "cb-r1", from: "cb", to: "r1", order: 1 },
          { id: "ca-r2", from: "ca", to: "r2", order: 1 },
        ],
        arrows: [],
      },
      {
        title: "Concerted E2 Step",
        description:
          "In a single concerted step: base abstracts the β-H, the Cβ–Cα bond becomes a double bond, and X⁻ leaves. All three bonds break/form simultaneously.",
        atoms: [
          { id: "bh", label: "BH", x: 45, y: 65, role: "nucleophile" },
          { id: "cb", label: "Cβ", x: 160, y: 100, role: "neutral" },
          { id: "ca", label: "Cα", x: 245, y: 100, role: "neutral" },
          { id: "x", label: "X⁻", x: 325, y: 148, role: "leaving" },
          { id: "r1", label: "R", x: 160, y: 152 },
          { id: "r2", label: "R", x: 245, y: 50 },
        ],
        bonds: [
          { id: "cb-ca", from: "cb", to: "ca", order: 2, fadeIn: true },
          { id: "ca-x", from: "ca", to: "x", order: 1, fadeOut: true },
          { id: "cb-r1", from: "cb", to: "r1", order: 1 },
          { id: "ca-r2", from: "ca", to: "r2", order: 1 },
        ],
        arrows: [
          { id: "arr1", path: "M 65 68 Q 110 58 142 88" },
          { id: "arr2", path: "M 178 100 Q 213 88 227 100" },
          { id: "arr3", path: "M 263 104 Q 290 122 310 138" },
        ],
      },
      {
        title: "Alkene Product",
        description:
          "An alkene is produced. X⁻ and BH are the byproducts. The double bond (Cβ=Cα) is formed. E2 follows Zaitsev's rule — major product has more substituted double bond.",
        atoms: [
          { id: "cb", label: "Cβ", x: 155, y: 100, role: "neutral" },
          { id: "ca", label: "Cα", x: 240, y: 100, role: "neutral" },
          { id: "r1", label: "R", x: 90, y: 70 },
          { id: "r2", label: "R", x: 90, y: 132 },
          { id: "r3", label: "R", x: 305, y: 70 },
          { id: "r4", label: "R", x: 305, y: 132 },
        ],
        bonds: [
          { id: "cb-ca", from: "cb", to: "ca", order: 2 },
          { id: "cb-r1", from: "cb", to: "r1", order: 1 },
          { id: "cb-r2", from: "cb", to: "r2", order: 1 },
          { id: "ca-r3", from: "ca", to: "r3", order: 1 },
          { id: "ca-r4", from: "ca", to: "r4", order: 1 },
        ],
        arrows: [],
      },
    ],
  },
  {
    id: "nu-add-carbonyl",
    name: "Nu Addition",
    fullName: "Nucleophilic Addition to Carbonyl",
    type: "Addition",
    conditions: [
      "Strong nucleophile (Nu:)",
      "Electrophilic carbonyl C",
      "Proton source for workup",
    ],
    steps: [
      {
        title: "Carbonyl — Electrophilic Carbon",
        description:
          "The C=O group is polarized: oxygen is electronegative, making the carbon electrophilic (delta+). A nucleophile (Nu:-) approaches this carbonyl carbon.",
        atoms: [
          { id: "nu", label: "Nu:⁻", x: 50, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 185, y: 100, role: "electrophile" },
          { id: "o", label: "O", x: 185, y: 42, role: "neutral" },
          { id: "r1", label: "R", x: 115, y: 148 },
          { id: "r2", label: "R'", x: 255, y: 148 },
        ],
        bonds: [
          { id: "c-o", from: "c", to: "o", order: 2 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
        ],
        arrows: [],
      },
      {
        title: "Nucleophile Attacks C=O",
        description:
          "The nucleophile attacks the electrophilic carbonyl carbon. The pi bond breaks, electrons shift to oxygen forming an alkoxide (O-) intermediate. The carbon changes from sp2 (planar) to sp3 (tetrahedral).",
        atoms: [
          { id: "nu", label: "Nu", x: 80, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 185, y: 100, role: "neutral" },
          { id: "o", label: "O⁻", x: 255, y: 42, role: "neutral" },
          { id: "r1", label: "R", x: 115, y: 160 },
          { id: "r2", label: "R'", x: 255, y: 160 },
        ],
        bonds: [
          { id: "nu-c", from: "nu", to: "c", order: 1, fadeIn: true },
          { id: "c-o", from: "c", to: "o", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
        ],
        arrows: [
          { id: "arr1", path: "M 96 100 Q 138 82 168 100" },
          { id: "arr2", path: "M 200 88 Q 228 65 248 50" },
        ],
      },
      {
        title: "Protonation — Alcohol Product",
        description:
          "The alkoxide intermediate (O-) is protonated by water or dilute acid during workup. The O- accepts H+ to give an alcohol product. New Nu-C bond formed.",
        atoms: [
          { id: "nu", label: "Nu", x: 80, y: 100, role: "nucleophile" },
          { id: "c", label: "C", x: 185, y: 100, role: "neutral" },
          { id: "oh", label: "OH", x: 255, y: 42, role: "neutral" },
          { id: "r1", label: "R", x: 115, y: 160 },
          { id: "r2", label: "R'", x: 255, y: 160 },
        ],
        bonds: [
          { id: "nu-c", from: "nu", to: "c", order: 1 },
          { id: "c-oh", from: "c", to: "oh", order: 1 },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
        ],
        arrows: [],
      },
    ],
  },
  {
    id: "e1-elimination",
    name: "E1 Elimination",
    fullName: "Unimolecular Elimination (E1)",
    type: "Elimination",
    conditions: [
      "Weak base or heat",
      "Polar protic solvent",
      "Tertiary substrate",
    ],
    steps: [
      {
        title: "Ionization: Carbocation Forms",
        description:
          "A tertiary alkyl halide in polar protic solvent ionizes: X- departs, generating a stable 3 degrees carbocation. This is the slow (rate-determining) step.",
        atoms: [
          { id: "c", label: "C+", x: 185, y: 100, role: "electrophile" },
          { id: "x", label: "X⁻", x: 310, y: 85, role: "leaving" },
          { id: "r1", label: "R", x: 185, y: 40 },
          { id: "r2", label: "R", x: 110, y: 148 },
          { id: "r3", label: "R", x: 260, y: 148 },
        ],
        bonds: [
          { id: "c-x", from: "c", to: "x", order: 1, fadeOut: true },
          { id: "c-r1", from: "c", to: "r1", order: 1 },
          { id: "c-r2", from: "c", to: "r2", order: 1 },
          { id: "c-r3", from: "c", to: "r3", order: 1 },
        ],
        arrows: [{ id: "arr1", path: "M 218 100 Q 260 88 294 88" }],
        moveAtoms: { x: { dx: 20, dy: -12 } },
      },
      {
        title: "Proton Loss — E1 Product",
        description:
          "A weak base (or solvent molecule) abstracts a beta-hydrogen from the carbocation. The electrons form a new pi bond. An alkene is produced (E1 = unimolecular, rate depends only on [substrate]).",
        atoms: [
          { id: "cb", label: "Cβ", x: 130, y: 100, role: "neutral" },
          { id: "ca", label: "Cα", x: 230, y: 100, role: "neutral" },
          { id: "r1", label: "R", x: 75, y: 60 },
          { id: "r2", label: "R", x: 75, y: 140 },
          { id: "r3", label: "R", x: 295, y: 60 },
          { id: "r4", label: "R", x: 295, y: 140 },
        ],
        bonds: [
          { id: "cb-ca", from: "cb", to: "ca", order: 2, fadeIn: true },
          { id: "cb-r1", from: "cb", to: "r1", order: 1 },
          { id: "cb-r2", from: "cb", to: "r2", order: 1 },
          { id: "ca-r3", from: "ca", to: "r3", order: 1 },
          { id: "ca-r4", from: "ca", to: "r4", order: 1 },
        ],
        arrows: [],
      },
    ],
  },
];

// ─── Legend ───────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs mb-4">
      {(
        [
          ["Nucleophile", "nucleophile"],
          ["Electrophile", "electrophile"],
          ["Leaving Group", "leaving"],
          ["Neutral", "neutral"],
        ] as const
      ).map(([label, role]) => (
        <span
          key={role}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg font-medium"
          style={{
            background: `${ROLE_COLORS[role]}18`,
            color: ROLE_COLORS[role],
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: ROLE_COLORS[role] }}
          />
          {label}
        </span>
      ))}
      <span
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg font-medium"
        style={{
          background: "oklch(0.82 0.18 85 / 0.12)",
          color: "oklch(0.82 0.18 85)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "oklch(0.82 0.18 85)" }}
        />
        Arrow (electron flow)
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ReactionMechanismTab() {
  const [selectedId, setSelectedId] = useState<string>(MECHANISMS[0].id);
  const [stepIdx, setStepIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mechanism =
    MECHANISMS.find((m) => m.id === selectedId) ?? MECHANISMS[0];
  const totalSteps = mechanism.steps.length;
  const currentStep = mechanism.steps[stepIdx];

  // Reset step when mechanism changes
  const prevIdRef = useRef(selectedId);
  if (prevIdRef.current !== selectedId) {
    prevIdRef.current = selectedId;
    setStepIdx(0);
    setAutoPlay(false);
  }

  // Auto-play
  useEffect(() => {
    if (!autoPlay) {
      if (autoRef.current) clearTimeout(autoRef.current);
      return;
    }
    autoRef.current = setTimeout(() => {
      if (stepIdx < totalSteps - 1) {
        setStepIdx((s) => s + 1);
      } else {
        setAutoPlay(false);
      }
    }, 1800);
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [autoPlay, stepIdx, totalSteps]);

  const goNext = () => {
    if (stepIdx < totalSteps - 1) setStepIdx((s) => s + 1);
  };
  const goPrev = () => {
    if (stepIdx > 0) setStepIdx((s) => s - 1);
  };

  return (
    <div data-ocid="mechanism.page">
      {/* Mechanism Selector */}
      <div
        className="rounded-2xl p-4 mb-5 border border-border/20"
        style={{
          background: "oklch(0.14 0.02 250 / 0.8)",
          backdropFilter: "blur(16px)",
        }}
      >
        <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
          Select Reaction Mechanism
        </p>
        <div
          className="flex flex-wrap gap-2"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
          data-ocid="mechanism.selector"
        >
          {MECHANISMS.map((m) => {
            const active = m.id === selectedId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedId(m.id)}
                data-ocid={`mechanism.select.${m.id}`}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200"
                style={
                  active
                    ? {
                        background: "oklch(0.55 0.22 258 / 0.25)",
                        color: "oklch(0.72 0.2 258)",
                        borderColor: "oklch(0.55 0.22 258 / 0.5)",
                      }
                    : {
                        background: "oklch(0.18 0.02 250 / 0.5)",
                        color: "oklch(0.58 0 0)",
                        borderColor: "oklch(0.28 0.02 250 / 0.3)",
                      }
                }
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mechanism Header */}
      <motion.div
        key={selectedId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl p-4 mb-4 border border-border/20"
        style={{
          background: "oklch(0.14 0.02 250 / 0.8)",
          backdropFilter: "blur(16px)",
        }}
        data-ocid="mechanism.header"
      >
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {mechanism.fullName}
            </h2>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-md mt-1 inline-block"
              style={{
                background: "oklch(0.55 0.22 258 / 0.15)",
                color: "oklch(0.72 0.2 258)",
              }}
            >
              {mechanism.type}
            </span>
          </div>
          {/* Conditions */}
          <div className="flex flex-wrap gap-1.5">
            {mechanism.conditions.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-lg border"
                style={{
                  background: "oklch(0.72 0.25 50 / 0.1)",
                  color: "oklch(0.82 0.18 50)",
                  borderColor: "oklch(0.72 0.25 50 / 0.25)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <Legend />
      </motion.div>

      {/* Step Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedId}-${stepIdx}`}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-border/20 overflow-hidden mb-4"
          style={{
            background: "oklch(0.12 0.025 250 / 0.9)",
            backdropFilter: "blur(20px)",
          }}
          data-ocid="mechanism.step_panel"
        >
          {/* Step Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-border/15"
            style={{ background: "oklch(0.18 0.03 258 / 0.4)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: "oklch(0.55 0.22 258 / 0.25)",
                  color: "oklch(0.72 0.2 258)",
                }}
              >
                {stepIdx + 1}
              </span>
              <span className="font-semibold text-sm text-foreground">
                {currentStep.title}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {stepIdx + 1} / {totalSteps}
            </span>
          </div>

          {/* SVG Diagram */}
          <div
            className="p-4"
            style={{ background: "oklch(0.10 0.02 250 / 0.6)" }}
          >
            <MechSVG step={currentStep} active />
          </div>

          {/* Description */}
          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step Progress Dots */}
      <div className="flex justify-center gap-2 mb-5">
        {mechanism.steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => {
              setStepIdx(i);
              setAutoPlay(false);
            }}
            data-ocid={`mechanism.step_dot.${i + 1}`}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === stepIdx ? 24 : 8,
              height: 8,
              background:
                i === stepIdx ? "oklch(0.55 0.22 258)" : "oklch(0.32 0.02 250)",
            }}
            aria-label={`Go to step ${i + 1}: ${s.title}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div
        className="rounded-2xl p-4 border border-border/20 flex items-center gap-3 flex-wrap"
        style={{
          background: "oklch(0.14 0.02 250 / 0.8)",
          backdropFilter: "blur(16px)",
        }}
        data-ocid="mechanism.controls"
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={stepIdx === 0}
          data-ocid="mechanism.prev_button"
          className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: "oklch(0.18 0.02 250 / 0.6)",
            color: "oklch(0.78 0.05 250)",
            borderColor: "oklch(0.28 0.02 250 / 0.4)",
          }}
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={() => setAutoPlay((a) => !a)}
          data-ocid="mechanism.autoplay_toggle"
          className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200"
          style={
            autoPlay
              ? {
                  background: "oklch(0.6 0.22 28 / 0.2)",
                  color: "oklch(0.72 0.2 28)",
                  borderColor: "oklch(0.6 0.22 28 / 0.4)",
                }
              : {
                  background: "oklch(0.55 0.22 258 / 0.15)",
                  color: "oklch(0.72 0.2 258)",
                  borderColor: "oklch(0.55 0.22 258 / 0.3)",
                }
          }
        >
          {autoPlay ? "⏸ Pause" : "▶ Auto Play"}
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={stepIdx === totalSteps - 1}
          data-ocid="mechanism.next_button"
          className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: "oklch(0.55 0.22 258 / 0.2)",
            color: "oklch(0.72 0.2 258)",
            borderColor: "oklch(0.55 0.22 258 / 0.4)",
          }}
        >
          Next →
        </button>

        <button
          type="button"
          onClick={() => {
            setStepIdx(0);
            setAutoPlay(false);
          }}
          data-ocid="mechanism.reset_button"
          className="ml-auto px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200"
          style={{
            background: "oklch(0.18 0.02 250 / 0.4)",
            color: "oklch(0.52 0 0)",
            borderColor: "oklch(0.28 0.02 250 / 0.3)",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
