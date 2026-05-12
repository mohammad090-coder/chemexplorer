import { useAnimationLevel } from "@/lib/performance";
import { cn } from "@/lib/utils";
import {
  Cylinder,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Sphere,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Atom,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Loader2,
  RotateCcw,
  Search,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

/* ─────────────────────── types ─────────────────────── */
interface MoleculeInfo {
  id: string;
  name: string;
  formula: string;
  geometry: string;
  angle: string;
  polarity: string;
  fact: string;
  vsepr: string;
  uses: string[];
  color: string;
  glowColor: string;
}

interface CrystalInfo {
  id: string;
  name: string;
  label: string;
  material: string;
  description: string;
  fact: string;
  color: string;
  glowColor: string;
}

/* ─────────────────────── data ─────────────────────── */
const MOLECULES: MoleculeInfo[] = [
  {
    id: "h2o",
    name: "Water",
    formula: "H₂O",
    geometry: "Bent",
    angle: "104.5°",
    polarity: "Polar",
    fact: "Cohesion, surface tension, universal solvent — life depends on water's polarity.",
    vsepr:
      "2 bonding pairs + 2 lone pairs → bent geometry. The lone pairs compress the H–O–H angle below tetrahedral.",
    uses: [
      "Universal solvent",
      "Cooling agent",
      "Photosynthesis medium",
      "Hydration in biology",
    ],
    color: "from-blue-400/20 to-cyan-500/20",
    glowColor: "oklch(0.72 0.22 200)",
  },
  {
    id: "co2",
    name: "Carbon Dioxide",
    formula: "CO₂",
    geometry: "Linear",
    angle: "180°",
    polarity: "Nonpolar",
    fact: "Greenhouse gas — traps infrared radiation. Used in fire extinguishers and carbonation.",
    vsepr:
      "2 double bonds, no lone pairs → perfectly linear. Individual C=O dipoles cancel by symmetry.",
    uses: [
      "Fire extinguishers",
      "Carbonated beverages",
      "Dry ice refrigerant",
      "Plant photosynthesis",
    ],
    color: "from-slate-400/20 to-gray-500/20",
    glowColor: "oklch(0.65 0.04 250)",
  },
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄",
    geometry: "Tetrahedral",
    angle: "109.5°",
    polarity: "Nonpolar",
    fact: "Natural gas — simplest alkane. Burns cleanly and is a key energy source worldwide.",
    vsepr:
      "4 bonding pairs, 0 lone pairs → perfect tetrahedral. All C–H dipoles cancel symmetrically.",
    uses: [
      "Natural gas fuel",
      "Chemical feedstock",
      "Hydrogen production",
      "Rocket propellant",
    ],
    color: "from-amber-400/20 to-yellow-500/20",
    glowColor: "oklch(0.75 0.2 80)",
  },
  {
    id: "nh3",
    name: "Ammonia",
    formula: "NH₃",
    geometry: "Pyramidal",
    angle: "107°",
    polarity: "Polar",
    fact: "Essential for fertilizers — roughly half the world's food supply depends on ammonia synthesis.",
    vsepr:
      "3 bonding pairs + 1 lone pair → trigonal pyramidal. Lone pair pushes bonds slightly inward.",
    uses: [
      "Nitrogen fertilizers",
      "Cleaning agents",
      "Refrigerant",
      "Pharmaceutical synthesis",
    ],
    color: "from-indigo-400/20 to-blue-600/20",
    glowColor: "oklch(0.68 0.2 258)",
  },
  {
    id: "c2h2",
    name: "Acetylene",
    formula: "C₂H₂",
    geometry: "Linear",
    angle: "180°",
    polarity: "Nonpolar",
    fact: "H–C≡C–H: the simplest alkyne. Burns at 3500°C — used for cutting metal.",
    vsepr:
      "sp hybridisation on each carbon → linear geometry. The triple bond consists of one σ and two π bonds.",
    uses: [
      "Oxyacetylene welding",
      "Organic synthesis",
      "Lighting (carbide lamps)",
      "PVC precursor",
    ],
    color: "from-orange-400/20 to-amber-500/20",
    glowColor: "oklch(0.72 0.22 55)",
  },
  {
    id: "c6h6",
    name: "Benzene",
    formula: "C₆H₆",
    geometry: "Planar Hexagonal",
    angle: "120°",
    polarity: "Nonpolar",
    fact: "Aromatic compound — delocalized π electrons give extraordinary stability and unique reactivity.",
    vsepr:
      "6 sp² carbons, one H each, internal angles 120°. The ring's delocalized electrons are shown as an inner circle.",
    uses: [
      "Plastics & resins",
      "Rubber synthesis",
      "Drug intermediates",
      "Dyes & detergents",
    ],
    color: "from-violet-400/20 to-purple-500/20",
    glowColor: "oklch(0.68 0.22 295)",
  },
  {
    id: "no2",
    name: "Nitrogen Dioxide",
    formula: "NO₂",
    geometry: "Bent",
    angle: "134°",
    polarity: "Polar",
    fact: "Reddish-brown gas — a major air pollutant. One unpaired electron makes it a radical.",
    vsepr:
      "2 bonding pairs + 1 lone electron (not full lone pair) → bent but angle wider than H₂O at 134°.",
    uses: [
      "Rocket fuel oxidiser",
      "Bleaching agent",
      "Nitric acid production",
      "Chemical sensor",
    ],
    color: "from-rose-400/20 to-red-500/20",
    glowColor: "oklch(0.65 0.22 22)",
  },
  {
    id: "pcl5",
    name: "Phosphorus Pentachloride",
    formula: "PCl₅",
    geometry: "Trigonal Bipyramidal",
    angle: "90°/120°",
    polarity: "Nonpolar",
    fact: "Expands octet to 10 electrons — 3 equatorial Cl (120°) and 2 axial Cl (90° from equatorial).",
    vsepr:
      "5 bonding pairs, 0 lone pairs → trigonal bipyramidal. Two distinct bond angles exist: axial 90° and equatorial 120°.",
    uses: [
      "Organic synthesis",
      "Chlorination reagent",
      "Flame retardants",
      "Pesticide production",
    ],
    color: "from-teal-400/20 to-cyan-600/20",
    glowColor: "oklch(0.72 0.18 190)",
  },
];

const CRYSTALS: CrystalInfo[] = [
  {
    id: "nacl",
    name: "Rock Salt",
    label: "NaCl",
    material: "Sodium Chloride",
    description:
      "Face-centred cubic lattice — alternating Na⁺ and Cl⁻ ions. Every ion is surrounded by 6 oppositely charged neighbours.",
    fact: "Table salt. The strong electrostatic attraction between ions gives NaCl a melting point of 801°C.",
    color: "from-purple-400/20 to-green-500/20",
    glowColor: "oklch(0.68 0.22 290)",
  },
  {
    id: "diamond",
    name: "Diamond Cubic",
    label: "C",
    material: "Carbon — Diamond",
    description:
      "Each carbon atom is sp³-hybridised and covalently bonded to 4 others in a face-centred cubic arrangement with 4 interior atoms.",
    fact: "Hardest known natural material — Mohs 10. The extended covalent network makes it extremely rigid.",
    color: "from-sky-300/20 to-indigo-400/20",
    glowColor: "oklch(0.72 0.18 220)",
  },
  {
    id: "bcc",
    name: "Body-Centred Cubic",
    label: "Fe",
    material: "Iron (α-Fe) — BCC",
    description:
      "8 corner atoms share with neighbouring cells (⅛ each) + 1 whole centre atom = 2 atoms per unit cell.",
    fact: "BCC iron is the stable phase below 912°C and above 1394°C. Carbon dissolved in BCC iron gives steel.",
    color: "from-orange-400/20 to-red-500/20",
    glowColor: "oklch(0.72 0.22 40)",
  },
];

/* ─────────────────────── 3D helpers ─────────────────────── */
interface AtomMeshProps {
  position: [number, number, number];
  color: string;
  emissive?: string;
  label: string;
  radius?: number;
  onHover?: (label: string | null) => void;
}

const AtomMesh = memo(function AtomMesh({
  position,
  color,
  emissive,
  label,
  radius = 0.35,
  onHover,
}: AtomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const scale = hovered ? 1.18 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.12);
    }
  });

  return (
    <Sphere
      ref={meshRef}
      position={position}
      args={[radius, 32, 32]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover?.(label);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover?.(null);
      }}
    >
      <meshPhongMaterial
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={hovered ? 0.55 : 0.28}
        shininess={90}
        specular="#ffffff"
      />
      {hovered && (
        <Html distanceFactor={4} center style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "oklch(0.16 0.04 258 / 0.92)",
              border: "1px solid oklch(0.72 0.18 258 / 0.5)",
              backdropFilter: "blur(12px)",
              borderRadius: "8px",
              padding: "4px 10px",
              color: "oklch(0.95 0 0)",
              fontFamily: "monospace",
              fontSize: "13px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px oklch(0 0 0 / 0.4)",
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </Sphere>
  );
});

interface BondMeshProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  radius?: number;
  offset?: [number, number, number];
}

const BondMesh = memo(function BondMesh({
  start,
  end,
  color = "#8899cc",
  radius = 0.07,
  offset = [0, 0, 0],
}: BondMeshProps) {
  const s = new THREE.Vector3(...start);
  const e = new THREE.Vector3(...end);
  const dir = e.clone().sub(s);
  const len = dir.length();
  const mid = s.clone().add(e).multiplyScalar(0.5);
  const off = new THREE.Vector3(...offset);
  const pos: [number, number, number] = [
    mid.x + off.x,
    mid.y + off.y,
    mid.z + off.z,
  ];

  const q = new THREE.Quaternion();
  q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());

  return (
    <Cylinder position={pos} quaternion={q} args={[radius, radius, len, 12]}>
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        shininess={60}
        transparent
        opacity={0.82}
      />
    </Cylinder>
  );
});

/* ─────────────────────── Auto-rotate group ─────────────────────── */
function AutoRotateGroup({
  children,
  speed = 0.4,
  paused,
}: { children: React.ReactNode; speed?: number; paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current && !paused) {
      groupRef.current.rotation.y += delta * speed;
    }
  });
  return <group ref={groupRef}>{children}</group>;
}

/* ═════════════════════ 3D Molecule Models ═════════════════════ */

const H2O3D = memo(function H2O3D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  const a = (104.5 * Math.PI) / 180 / 2;
  const bl = 1.0;
  const h1: [number, number, number] = [
    -Math.sin(a) * bl,
    -Math.cos(a) * bl,
    0,
  ];
  const h2: [number, number, number] = [Math.sin(a) * bl, -Math.cos(a) * bl, 0];
  return (
    <group>
      <BondMesh start={[0, 0, 0]} end={h1} color="#4488cc" />
      <BondMesh start={[0, 0, 0]} end={h2} color="#4488cc" />
      <AtomMesh
        position={[0, 0, 0]}
        color="#cc3322"
        emissive="#991100"
        label="O (Oxygen)"
        radius={0.42}
        onHover={onHover}
      />
      <AtomMesh
        position={h1}
        color="#ddddee"
        emissive="#aabbdd"
        label="H (Hydrogen)"
        radius={0.28}
        onHover={onHover}
      />
      <AtomMesh
        position={h2}
        color="#ddddee"
        emissive="#aabbdd"
        label="H (Hydrogen)"
        radius={0.28}
        onHover={onHover}
      />
    </group>
  );
});

const CO23D = memo(function CO23D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      <BondMesh
        start={[0, 0, 0]}
        end={[-1.2, 0, 0]}
        color="#cc3322"
        radius={0.05}
        offset={[0, 0.1, 0]}
      />
      <BondMesh
        start={[0, 0, 0]}
        end={[-1.2, 0, 0]}
        color="#cc3322"
        radius={0.05}
        offset={[0, -0.1, 0]}
      />
      <BondMesh
        start={[0, 0, 0]}
        end={[1.2, 0, 0]}
        color="#cc3322"
        radius={0.05}
        offset={[0, 0.1, 0]}
      />
      <BondMesh
        start={[0, 0, 0]}
        end={[1.2, 0, 0]}
        color="#cc3322"
        radius={0.05}
        offset={[0, -0.1, 0]}
      />
      <AtomMesh
        position={[-1.2, 0, 0]}
        color="#cc3322"
        emissive="#991100"
        label="O (Oxygen)"
        radius={0.38}
        onHover={onHover}
      />
      <AtomMesh
        position={[0, 0, 0]}
        color="#556677"
        emissive="#334455"
        label="C (Carbon)"
        radius={0.4}
        onHover={onHover}
      />
      <AtomMesh
        position={[1.2, 0, 0]}
        color="#cc3322"
        emissive="#991100"
        label="O (Oxygen)"
        radius={0.38}
        onHover={onHover}
      />
    </group>
  );
});

const CH4_TETRA: [number, number, number][] = (() => {
  const k = 1.0 / Math.sqrt(3);
  return [
    [k, k, k],
    [-k, -k, k],
    [-k, k, -k],
    [k, -k, -k],
  ];
})();

const CH43D = memo(function CH43D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {CH4_TETRA.map((p) => (
        <BondMesh
          key={`ch4-bond-${p[0].toFixed(3)}`}
          start={[0, 0, 0]}
          end={p}
          color="#ccaa44"
        />
      ))}
      <AtomMesh
        position={[0, 0, 0]}
        color="#334455"
        emissive="#223344"
        label="C (Carbon)"
        radius={0.42}
        onHover={onHover}
      />
      {CH4_TETRA.map((p) => (
        <AtomMesh
          key={`ch4-h-${p[0].toFixed(3)}`}
          position={p}
          color="#ddeeff"
          emissive="#aabbcc"
          label="H (Hydrogen)"
          radius={0.28}
          onHover={onHover}
        />
      ))}
    </group>
  );
});

const NH3_POSITIONS: [number, number, number][] = (() => {
  const a = (107 * Math.PI) / 180;
  const bl = 1.0;
  return [
    [Math.sin(a) * Math.cos(0) * bl, -0.35, Math.sin(a) * Math.sin(0) * bl],
    [
      Math.sin(a) * Math.cos((2 * Math.PI) / 3) * bl,
      -0.35,
      Math.sin(a) * Math.sin((2 * Math.PI) / 3) * bl,
    ],
    [
      Math.sin(a) * Math.cos((4 * Math.PI) / 3) * bl,
      -0.35,
      Math.sin(a) * Math.sin((4 * Math.PI) / 3) * bl,
    ],
  ] as [number, number, number][];
})();

const NH33D = memo(function NH33D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {NH3_POSITIONS.map((p) => (
        <BondMesh
          key={`nh3-bond-${p[0].toFixed(3)}`}
          start={[0, 0.1, 0]}
          end={p}
          color="#5566cc"
        />
      ))}
      <AtomMesh
        position={[0, 0.1, 0]}
        color="#3344bb"
        emissive="#2233aa"
        label="N (Nitrogen)"
        radius={0.42}
        onHover={onHover}
      />
      {NH3_POSITIONS.map((p) => (
        <AtomMesh
          key={`nh3-h-${p[0].toFixed(3)}`}
          position={p}
          color="#ddeeff"
          emissive="#aabbcc"
          label="H (Hydrogen)"
          radius={0.28}
          onHover={onHover}
        />
      ))}
      {/* Lone pair indicator */}
      <Sphere position={[0, 0.9, 0]} args={[0.12, 12, 12]}>
        <meshPhongMaterial
          color="#7788ee"
          emissive="#5566cc"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </Sphere>
    </group>
  );
});

const C2H23D = memo(function C2H23D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {/* H–C single bond */}
      <BondMesh start={[-1.8, 0, 0]} end={[-0.9, 0, 0]} color="#ee8833" />
      {/* C≡C triple bond: 3 parallel cylinders */}
      <BondMesh
        start={[-0.9, 0, 0]}
        end={[0.9, 0, 0]}
        color="#ee8833"
        radius={0.06}
        offset={[0, 0.12, 0]}
      />
      <BondMesh
        start={[-0.9, 0, 0]}
        end={[0.9, 0, 0]}
        color="#ee8833"
        radius={0.06}
        offset={[0, -0.12, 0]}
      />
      <BondMesh
        start={[-0.9, 0, 0]}
        end={[0.9, 0, 0]}
        color="#ee8833"
        radius={0.06}
      />
      {/* C–H single bond */}
      <BondMesh start={[0.9, 0, 0]} end={[1.8, 0, 0]} color="#ee8833" />
      <AtomMesh
        position={[-1.8, 0, 0]}
        color="#ddeeff"
        emissive="#aabbcc"
        label="H (Hydrogen)"
        radius={0.26}
        onHover={onHover}
      />
      <AtomMesh
        position={[-0.9, 0, 0]}
        color="#334466"
        emissive="#223355"
        label="C (Carbon)"
        radius={0.38}
        onHover={onHover}
      />
      <AtomMesh
        position={[0.9, 0, 0]}
        color="#334466"
        emissive="#223355"
        label="C (Carbon)"
        radius={0.38}
        onHover={onHover}
      />
      <AtomMesh
        position={[1.8, 0, 0]}
        color="#ddeeff"
        emissive="#aabbcc"
        label="H (Hydrogen)"
        radius={0.26}
        onHover={onHover}
      />
    </group>
  );
});

const BENZ_N = 6;
const BENZ_R = 1.1;
const BENZ_RH = 1.75;
const BENZ_CS = Array.from({ length: BENZ_N }, (_, i) => {
  const a = (i * (2 * Math.PI)) / BENZ_N - Math.PI / 2;
  return { x: Math.cos(a) * BENZ_R, z: Math.sin(a) * BENZ_R };
});
const BENZ_HS = Array.from({ length: BENZ_N }, (_, i) => {
  const a = (i * (2 * Math.PI)) / BENZ_N - Math.PI / 2;
  return { x: Math.cos(a) * BENZ_RH, z: Math.sin(a) * BENZ_RH };
});

const C6H63D = memo(function C6H63D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {BENZ_CS.map((c, i) => {
        const next = BENZ_CS[(i + 1) % BENZ_N];
        const isDouble = i % 2 === 0;
        return isDouble ? (
          <group key={`benz-ring-${c.x.toFixed(2)}`}>
            <BondMesh
              start={[c.x, 0, c.z]}
              end={[next.x, 0, next.z]}
              color="#9966dd"
              radius={0.05}
              offset={[0, 0.1, 0]}
            />
            <BondMesh
              start={[c.x, 0, c.z]}
              end={[next.x, 0, next.z]}
              color="#9966dd"
              radius={0.05}
              offset={[0, -0.1, 0]}
            />
          </group>
        ) : (
          <BondMesh
            key={`benz-ring-${c.x.toFixed(2)}`}
            start={[c.x, 0, c.z]}
            end={[next.x, 0, next.z]}
            color="#9966dd"
          />
        );
      })}
      {BENZ_CS.map((c, i) => (
        <BondMesh
          key={`benz-ch-${c.x.toFixed(2)}`}
          start={[c.x, 0, c.z]}
          end={[BENZ_HS[i].x, 0, BENZ_HS[i].z]}
          color="#7755bb"
          radius={0.055}
        />
      ))}
      {BENZ_CS.map((c) => (
        <AtomMesh
          key={`benz-c-${c.x.toFixed(2)}`}
          position={[c.x, 0, c.z]}
          color="#334466"
          emissive="#223355"
          label="C (Carbon)"
          radius={0.3}
          onHover={onHover}
        />
      ))}
      {BENZ_HS.map((h) => (
        <AtomMesh
          key={`benz-h-${h.x.toFixed(2)}`}
          position={[h.x, 0, h.z]}
          color="#ddeeff"
          emissive="#aabbcc"
          label="H (Hydrogen)"
          radius={0.2}
          onHover={onHover}
        />
      ))}
    </group>
  );
});

const NO23D = memo(function NO23D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  const a = (134 * Math.PI) / 180 / 2;
  const bl = 1.1;
  const o1: [number, number, number] = [
    -Math.sin(a) * bl,
    -Math.cos(a) * bl,
    0,
  ];
  const o2: [number, number, number] = [Math.sin(a) * bl, -Math.cos(a) * bl, 0];
  return (
    <group>
      <BondMesh
        start={[0, 0, 0]}
        end={o1}
        color="#dd4422"
        radius={0.05}
        offset={[0, 0, 0.1]}
      />
      <BondMesh
        start={[0, 0, 0]}
        end={o1}
        color="#dd4422"
        radius={0.05}
        offset={[0, 0, -0.1]}
      />
      <BondMesh
        start={[0, 0, 0]}
        end={o2}
        color="#dd4422"
        radius={0.05}
        offset={[0, 0, 0.1]}
      />
      <BondMesh
        start={[0, 0, 0]}
        end={o2}
        color="#dd4422"
        radius={0.05}
        offset={[0, 0, -0.1]}
      />
      {/* radical electron */}
      <Sphere position={[0, 0.8, 0]} args={[0.1, 12, 12]}>
        <meshPhongMaterial
          color="#ee6644"
          emissive="#ee4422"
          emissiveIntensity={0.8}
        />
      </Sphere>
      <AtomMesh
        position={[0, 0, 0]}
        color="#aa3311"
        emissive="#882200"
        label="N (Nitrogen)"
        radius={0.42}
        onHover={onHover}
      />
      <AtomMesh
        position={o1}
        color="#cc3322"
        emissive="#991100"
        label="O (Oxygen)"
        radius={0.34}
        onHover={onHover}
      />
      <AtomMesh
        position={o2}
        color="#cc3322"
        emissive="#991100"
        label="O (Oxygen)"
        radius={0.34}
        onHover={onHover}
      />
    </group>
  );
});

const PCL5_EQR = 1.2;
const PCL5_AXR = 1.4;
const PCL5_EQUATORIAL: [number, number, number][] = Array.from(
  { length: 3 },
  (_, i) => {
    const a = (i * (2 * Math.PI)) / 3 - Math.PI / 2;
    return [Math.cos(a) * PCL5_EQR, 0, Math.sin(a) * PCL5_EQR] as [
      number,
      number,
      number,
    ];
  },
);
const PCL5_AXIAL: [number, number, number][] = [
  [0, PCL5_AXR, 0],
  [0, -PCL5_AXR, 0],
];

const PCl53D = memo(function PCl53D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {PCL5_EQUATORIAL.map((p) => (
        <BondMesh
          key={`pcl5-eq-${p[0].toFixed(3)}`}
          start={[0, 0, 0]}
          end={p}
          color="#33bbaa"
        />
      ))}
      {PCL5_AXIAL.map((p) => (
        <BondMesh
          key={`pcl5-ax-${p[1].toFixed(1)}`}
          start={[0, 0, 0]}
          end={p}
          color="#229988"
        />
      ))}
      <AtomMesh
        position={[0, 0, 0]}
        color="#227766"
        emissive="#115544"
        label="P (Phosphorus)"
        radius={0.44}
        onHover={onHover}
      />
      {PCL5_EQUATORIAL.map((p) => (
        <AtomMesh
          key={`pcl5-cleq-${p[0].toFixed(3)}`}
          position={p}
          color="#44bb55"
          emissive="#339944"
          label="Cl (Chlorine)"
          radius={0.34}
          onHover={onHover}
        />
      ))}
      {PCL5_AXIAL.map((p) => (
        <AtomMesh
          key={`pcl5-clax-${p[1].toFixed(1)}`}
          position={p}
          color="#33aa44"
          emissive="#228833"
          label="Cl (Chlorine)"
          radius={0.34}
          onHover={onHover}
        />
      ))}
    </group>
  );
});

/* ─────────────────────── Crystal 3D models ─────────────────────── */
const NACL_CELLS: { pos: [number, number, number]; isNa: boolean }[] = [];
for (let x = -1; x <= 1; x++)
  for (let y = -1; y <= 1; y++)
    for (let z = -1; z <= 1; z++)
      NACL_CELLS.push({
        pos: [x, y, z],
        isNa: (Math.abs(x) + Math.abs(y) + Math.abs(z)) % 2 === 0,
      });

const NaCl3D = memo(function NaCl3D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {NACL_CELLS.map(({ pos, isNa }) => (
        <AtomMesh
          key={`nacl-${pos[0]}-${pos[1]}-${pos[2]}`}
          position={pos}
          color={isNa ? "#8855cc" : "#44cc55"}
          emissive={isNa ? "#6633aa" : "#33aa44"}
          label={isNa ? "Na⁺ (Sodium)" : "Cl⁻ (Chloride)"}
          radius={isNa ? 0.22 : 0.28}
          onHover={onHover}
        />
      ))}
    </group>
  );
});

const DIAMOND_S = 0.9;
const DIAMOND_H = DIAMOND_S / 2;
const DIAMOND_CORNERS: [number, number, number][] = [
  [-DIAMOND_H, -DIAMOND_H, -DIAMOND_H],
  [DIAMOND_H, -DIAMOND_H, -DIAMOND_H],
  [DIAMOND_H, DIAMOND_H, -DIAMOND_H],
  [-DIAMOND_H, DIAMOND_H, -DIAMOND_H],
  [-DIAMOND_H, -DIAMOND_H, DIAMOND_H],
  [DIAMOND_H, -DIAMOND_H, DIAMOND_H],
  [DIAMOND_H, DIAMOND_H, DIAMOND_H],
  [-DIAMOND_H, DIAMOND_H, DIAMOND_H],
  [0, 0, 0],
];
const DIAMOND_BONDS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
  [8, 1],
  [8, 2],
  [8, 5],
  [8, 6],
];

const Diamond3D = memo(function Diamond3D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {DIAMOND_BONDS.map(([a, b]) => (
        <BondMesh
          key={`d-bond-${a}-${b}`}
          start={DIAMOND_CORNERS[a]}
          end={DIAMOND_CORNERS[b]}
          color="#5588dd"
          radius={0.04}
        />
      ))}
      {DIAMOND_CORNERS.map((c, i) => (
        <AtomMesh
          key={`d-c-${c[0].toFixed(2)}-${c[1].toFixed(2)}-${c[2].toFixed(2)}`}
          position={c}
          color="#6699ee"
          emissive="#4477cc"
          label="C (Carbon)"
          radius={i === 8 ? 0.2 : 0.16}
          onHover={onHover}
        />
      ))}
    </group>
  );
});

const BCC_S = 0.9;
const BCC_H = BCC_S / 2;
const BCC_CORNERS: [number, number, number][] = [
  [-BCC_H, -BCC_H, -BCC_H],
  [BCC_H, -BCC_H, -BCC_H],
  [BCC_H, BCC_H, -BCC_H],
  [-BCC_H, BCC_H, -BCC_H],
  [-BCC_H, -BCC_H, BCC_H],
  [BCC_H, -BCC_H, BCC_H],
  [BCC_H, BCC_H, BCC_H],
  [-BCC_H, BCC_H, BCC_H],
];
const BCC_CENTER: [number, number, number] = [0, 0, 0];
const BCC_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

const BCC3D = memo(function BCC3D({
  onHover,
}: { onHover?: (l: string | null) => void }) {
  return (
    <group>
      {BCC_EDGES.map(([a, b]) => (
        <BondMesh
          key={`bcc-e-${a}-${b}`}
          start={BCC_CORNERS[a]}
          end={BCC_CORNERS[b]}
          color="#cc6622"
          radius={0.03}
        />
      ))}
      {BCC_CORNERS.map((c) => (
        <BondMesh
          key={`bcc-s-${c[0].toFixed(2)}-${c[1].toFixed(2)}`}
          start={BCC_CENTER}
          end={c}
          color="#dd7733"
          radius={0.04}
        />
      ))}
      {BCC_CORNERS.map((c) => (
        <AtomMesh
          key={`bcc-corner-${c[0].toFixed(2)}-${c[1].toFixed(2)}-${c[2].toFixed(2)}`}
          position={c}
          color="#dd8833"
          emissive="#bb6622"
          label="Fe (Iron)"
          radius={0.16}
          onHover={onHover}
        />
      ))}
      <AtomMesh
        position={BCC_CENTER}
        color="#ee9944"
        emissive="#cc7722"
        label="Fe (Iron) — center"
        radius={0.22}
        onHover={onHover}
      />
    </group>
  );
});

/* ─────────────────────── R3F Canvas wrapper ─────────────────────── */
const MOLECULE_3D_COMPONENTS: Record<
  string,
  React.FC<{ onHover?: (l: string | null) => void }>
> = {
  h2o: H2O3D,
  co2: CO23D,
  ch4: CH43D,
  nh3: NH33D,
  c2h2: C2H23D,
  c6h6: C6H63D,
  no2: NO23D,
  pcl5: PCl53D,
};

const CRYSTAL_3D_COMPONENTS: Record<
  string,
  React.FC<{ onHover?: (l: string | null) => void }>
> = {
  nacl: NaCl3D,
  diamond: Diamond3D,
  bcc: BCC3D,
};

interface Molecule3DCanvasProps {
  id: string;
  glowColor: string;
  compact?: boolean;
  autoRotate?: boolean;
  focused?: boolean;
  isCrystal?: boolean;
}

const Molecule3DCanvas = memo(function Molecule3DCanvas({
  id,
  glowColor,
  compact,
  autoRotate = true,
  isCrystal,
}: Molecule3DCanvasProps) {
  const [hoveredAtom, setHoveredAtom] = useState<string | null>(null);
  const [interacting, setInteracting] = useState(false);
  const canvasSize = compact ? 200 : 280;
  const ModelComponent = isCrystal
    ? CRYSTAL_3D_COMPONENTS[id]
    : MOLECULE_3D_COMPONENTS[id];
  if (!ModelComponent) return null;

  const camZ = isCrystal
    ? id === "nacl"
      ? 6
      : 4
    : ["pcl5", "c6h6", "c2h2"].includes(id)
      ? 5
      : 4;

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        width: canvasSize,
        height: canvasSize,
        willChange: "transform",
        background: "transparent",
      }}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => {
        setInteracting(false);
        setHoveredAtom(null);
      }}
    >
      <Canvas
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, camZ]} fov={40} />
        <ambientLight intensity={0.55} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#aaccff" />
        <pointLight position={[-4, -2, 2]} intensity={0.5} color={glowColor} />
        <Suspense fallback={null}>
          <AutoRotateGroup speed={0.35} paused={!autoRotate || interacting}>
            <ModelComponent onHover={setHoveredAtom} />
          </AutoRotateGroup>
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          autoRotate={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
        />
      </Canvas>
      {/* Atom hover label at bottom */}
      <AnimatePresence>
        {hoveredAtom && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              background: "oklch(0.14 0.04 258 / 0.88)",
              border: "1px solid oklch(0.72 0.18 258 / 0.4)",
              backdropFilter: "blur(12px)",
              borderRadius: "8px",
              padding: "3px 10px",
              color: "oklch(0.92 0 0)",
              fontFamily: "monospace",
              fontSize: "12px",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            {hoveredAtom}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Drag hint */}
      {!interacting && (
        <div
          className="absolute top-2 right-2 pointer-events-none opacity-40"
          style={{
            fontSize: "9px",
            color: "oklch(0.8 0 0)",
            fontFamily: "monospace",
          }}
        >
          drag · zoom
        </div>
      )}
    </div>
  );
});

/* ─────────────────────── Focus overlay ─────────────────────── */
const FocusOverlay = memo(function FocusOverlay({
  mol,
  onClose,
}: { mol: MoleculeInfo; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "oklch(0 0 0 / 0.65)",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClose}
      data-ocid="molecules.focus_overlay"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass-premium rounded-3xl overflow-hidden max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
        data-ocid="molecules.focus_dialog"
        style={{
          background: "oklch(0.13 0.04 258 / 0.95)",
          border: "1px solid oklch(0.72 0.18 258 / 0.3)",
          boxShadow: `0 40px 100px oklch(0 0 0 / 0.6), 0 0 80px ${mol.glowColor}28, inset 0 1px 0 oklch(1 0 0 / 0.1)`,
        }}
      >
        {/* Header with full 3D canvas */}
        <div
          className={cn(
            "relative flex items-center justify-center py-6 bg-gradient-to-br",
            mol.color,
          )}
          style={{ minHeight: 280 }}
        >
          <Molecule3DCanvas
            id={mol.id}
            glowColor={mol.glowColor}
            compact={false}
            autoRotate
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 glass rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
            data-ocid="molecules.focus_close_button"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-3 text-xs font-mono text-white/50">
            drag to rotate · scroll to zoom
          </div>
        </div>
        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-bold">{mol.name}</h3>
              <div className="font-mono text-base text-muted-foreground">
                {mol.formula}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span
                className="text-sm glass px-3 py-1 rounded-full font-semibold"
                style={{ color: mol.glowColor }}
              >
                {mol.geometry}
              </span>
              <span className="text-sm glass px-3 py-1 rounded-full font-mono font-bold">
                {mol.angle}
              </span>
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              VSEPR Theory
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">
              {mol.vsepr}
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Real-World Uses
            </div>
            <ul className="space-y-1.5">
              {mol.uses.map((u) => (
                <li
                  key={u}
                  className="text-sm text-foreground/80 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ─────────────────────── Molecule Card ─────────────────────── */
const MoleculeCard = memo(function MoleculeCard({
  mol,
  index,
  onFocus,
}: { mol: MoleculeInfo; index: number; onFocus: (mol: MoleculeInfo) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const animLevel = useAnimationLevel();
  const handleFocus = useCallback(() => {
    onFocus(mol);
  }, [mol, onFocus]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.42 }}
      className="glass-molecule-card rounded-2xl overflow-hidden group"
      data-ocid={`molecules.mol_card.${index + 1}`}
    >
      {/* 3D canvas area */}
      <div
        className={cn(
          "relative flex items-center justify-center py-6 bg-gradient-to-br cursor-grab active:cursor-grabbing",
          mol.color,
        )}
        style={{ minHeight: 220 }}
        onPointerEnter={() => setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
      >
        {animLevel === "minimal" ? (
          <div className="flex items-center justify-center w-full h-32 text-muted-foreground text-sm font-mono">
            {mol.formula}
          </div>
        ) : (
          <Molecule3DCanvas
            id={mol.id}
            glowColor={mol.glowColor}
            compact
            autoRotate={!interacting}
          />
        )}
        {/* Zoom to focus button */}
        <button
          type="button"
          onClick={handleFocus}
          className="absolute bottom-2 right-2 glass rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
          aria-label={`Zoom into ${mol.name}`}
          data-ocid={`molecules.mol_zoom.${index + 1}`}
          style={{ opacity: interacting ? 0.95 : 0.35 }}
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-t-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: interacting ? 1 : 0,
            background: `radial-gradient(ellipse at 50% 0%, ${mol.glowColor}22 0%, transparent 70%)`,
            border: `1px solid ${mol.glowColor}35`,
          }}
        />
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-display text-lg font-bold leading-tight">
              {mol.name}
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              {mol.formula}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs glass px-2 py-0.5 rounded-full">
              {mol.geometry}
            </span>
            <span className="text-xs glass px-2 py-0.5 rounded-full font-mono font-semibold">
              {mol.angle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs px-2.5 py-1 rounded-full font-semibold",
              mol.polarity === "Polar"
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                : "bg-muted/40 text-muted-foreground border border-border/30",
            )}
          >
            {mol.polarity}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {mol.fact}
        </p>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          data-ocid={`molecules.mol_expand.${index + 1}`}
          aria-expanded={expanded}
          aria-label={expanded ? "Hide details" : "Show VSEPR details"}
        >
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          {expanded ? "Hide details" : "VSEPR theory + uses"}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 pt-1 overflow-hidden"
              data-ocid={`molecules.mol_detail.${index + 1}`}
            >
              <div className="glass rounded-xl p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  VSEPR Theory
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {mol.vsepr}
                </p>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Real-World Uses
                </div>
                <ul className="space-y-1">
                  {mol.uses.map((u) => (
                    <li
                      key={u}
                      className="text-sm text-foreground/80 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

/* ─────────────────────── Crystal Card ─────────────────────── */
const CrystalCard = memo(function CrystalCard({
  crystal,
  index,
}: { crystal: CrystalInfo; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const animLevel = useAnimationLevel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.48 }}
      className="glass-molecule-card rounded-2xl overflow-hidden"
      data-ocid={`molecules.crystal_card.${index + 1}`}
    >
      <div
        className={cn(
          "relative flex items-center justify-center py-6 bg-gradient-to-br cursor-grab active:cursor-grabbing",
          crystal.color,
        )}
        style={{ minHeight: 220 }}
        onPointerEnter={() => setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
      >
        {animLevel === "minimal" ? (
          <div className="flex items-center justify-center w-full h-32 text-muted-foreground text-sm font-mono">
            {crystal.label}
          </div>
        ) : (
          <Molecule3DCanvas
            id={crystal.id}
            glowColor={crystal.glowColor}
            compact
            autoRotate={!interacting}
            isCrystal
          />
        )}
        <div
          className="absolute inset-0 rounded-t-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: interacting ? 1 : 0,
            background: `radial-gradient(ellipse at 50% 0%, ${crystal.glowColor}22 0%, transparent 70%)`,
            border: `1px solid ${crystal.glowColor}35`,
          }}
        />
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-display text-lg font-bold leading-tight">
              {crystal.name}
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              {crystal.material}
            </div>
          </div>
          <span className="font-mono text-lg font-bold glass px-3 py-1 rounded-xl shrink-0">
            {crystal.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {crystal.description}
        </p>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          data-ocid={`molecules.crystal_expand.${index + 1}`}
          aria-expanded={expanded}
          aria-label={expanded ? "Hide fact" : "Show key fact"}
        >
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          {expanded ? "Hide" : "Key fact"}
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="crystal-expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="glass rounded-xl p-3 overflow-hidden"
              data-ocid={`molecules.crystal_detail.${index + 1}`}
            >
              <p className="text-sm text-foreground/85 leading-relaxed">
                {crystal.fact}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════════════════════
   PubChem-powered 3D Molecule Search
═══════════════════════════════════════════════════════════ */

// CPK coloring for dynamic molecules
const CPK_COLORS: Record<string, string> = {
  H: "#e0e0ee",
  C: "#444466",
  N: "#2244cc",
  O: "#cc2200",
  S: "#ccaa00",
  Cl: "#22bb33",
  Br: "#993300",
  I: "#6600aa",
  F: "#33cc88",
  P: "#ee8800",
  Na: "#aa44ff",
  K: "#8800cc",
  Ca: "#5599cc",
  Fe: "#dd6600",
  Mg: "#22aa55",
  Zn: "#888800",
};
const CPK_RADII: Record<string, number> = {
  H: 0.22,
  C: 0.36,
  N: 0.34,
  O: 0.33,
  S: 0.4,
  Cl: 0.35,
  Br: 0.37,
  I: 0.39,
  F: 0.28,
  P: 0.39,
  Na: 0.32,
  K: 0.36,
  Ca: 0.35,
  Fe: 0.3,
  Mg: 0.3,
  Zn: 0.29,
};
function cpkColor(el: string) {
  return CPK_COLORS[el] ?? "#aaaaaa";
}
function cpkRadius(el: string) {
  return CPK_RADII[el] ?? 0.3;
}

interface DynAtom {
  element: string;
  x: number;
  y: number;
  z: number;
}
interface DynBond {
  start: number;
  end: number;
  order: number;
}
interface DynMolData {
  atoms: DynAtom[];
  bonds: DynBond[];
  name: string;
  formula: string;
  weight: string;
}

// Centroid-center atoms
function centerAtoms(atoms: DynAtom[]): DynAtom[] {
  if (!atoms.length) return atoms;
  const cx = atoms.reduce((s, a) => s + a.x, 0) / atoms.length;
  const cy = atoms.reduce((s, a) => s + a.y, 0) / atoms.length;
  const cz = atoms.reduce((s, a) => s + a.z, 0) / atoms.length;
  return atoms.map((a) => ({ ...a, x: a.x - cx, y: a.y - cy, z: a.z - cz }));
}

// Scale atoms to fit in view (max radius ~1.8)
function scaleAtoms(atoms: DynAtom[], targetRadius = 1.8): DynAtom[] {
  if (!atoms.length) return atoms;
  const maxR = Math.max(
    ...atoms.map((a) => Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)),
    0.001,
  );
  if (maxR < targetRadius) return atoms;
  const scale = targetRadius / maxR;
  return atoms.map((a) => ({
    ...a,
    x: a.x * scale,
    y: a.y * scale,
    z: a.z * scale,
  }));
}

// Simple SVG 2D fallback for minimal devices
function Molecule2DFallback({
  atoms,
  bonds,
}: { atoms: DynAtom[]; bonds: DynBond[] }) {
  const W = 240;
  const H = 200;
  // Project onto XY plane, scale to W×H
  const xs = atoms.map((a) => a.x);
  const ys = atoms.map((a) => a.y);
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 0);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys, 0);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const pad = 24;
  function px(x: number) {
    return pad + ((x - minX) / rangeX) * (W - pad * 2);
  }
  function py(y: number) {
    return pad + ((y - minY) / rangeY) * (H - pad * 2);
  }

  return (
    <svg
      width={W}
      height={H}
      style={{ display: "block" }}
      role="img"
      aria-label="2D molecular structure"
    >
      {bonds.map((b, _i) => {
        const a0 = atoms[b.start];
        const a1 = atoms[b.end];
        if (!a0 || !a1) return null;
        return (
          <line
            key={`svgb-${b.start}-${b.end}`}
            x1={px(a0.x)}
            y1={py(a0.y)}
            x2={px(a1.x)}
            y2={py(a1.y)}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={b.order >= 2 ? 2.5 : 1.5}
          />
        );
      })}
      {atoms.map((a, i) => (
        <circle
          key={`svga-${a.element}-${i}`}
          cx={px(a.x)}
          cy={py(a.y)}
          r={cpkRadius(a.element) * 14}
          fill={cpkColor(a.element)}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={0.5}
        />
      ))}
      {atoms.map((a, i) => (
        <text
          key={`svgt-${a.element}-${i}`}
          x={px(a.x)}
          y={py(a.y) + 4}
          textAnchor="middle"
          fontSize={9}
          fontFamily="monospace"
          fontWeight="bold"
          fill="#fff"
        >
          {a.element}
        </text>
      ))}
    </svg>
  );
}

// 3D dynamic mesh group
function DynMolGroup({
  atoms,
  bonds,
  segments,
}: {
  atoms: DynAtom[];
  bonds: DynBond[];
  segments: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.42;
    }
  });

  return (
    <group ref={groupRef}>
      {bonds.map((b, _i) => {
        const a0 = atoms[b.start];
        const a1 = atoms[b.end];
        if (!a0 || !a1) return null;
        const start: [number, number, number] = [a0.x, a0.y, a0.z];
        const end: [number, number, number] = [a1.x, a1.y, a1.z];
        // Render double bonds as 2 offset cylinders; triple as 3
        const offsets: [number, number, number][] =
          b.order >= 3
            ? [
                [0, 0.08, 0],
                [0, -0.08, 0],
                [0, 0, 0.08],
              ]
            : b.order === 2
              ? [
                  [0, 0.07, 0],
                  [0, -0.07, 0],
                ]
              : [[0, 0, 0]];
        return offsets.map((off, oi) => (
          <BondMesh
            key={`dynbond-${b.start}-${b.end}-${oi}`}
            start={start}
            end={end}
            color="#8899cc"
            radius={0.055}
            offset={off}
          />
        ));
      })}
      {atoms.map((a, _i) => (
        <Sphere
          key={`dynatom-${a.element}-${a.x.toFixed(2)}-${a.y.toFixed(2)}`}
          position={[a.x, a.y, a.z]}
          args={[cpkRadius(a.element), segments, segments]}
        >
          <meshPhongMaterial
            color={cpkColor(a.element)}
            emissive={cpkColor(a.element)}
            emissiveIntensity={0.28}
            shininess={85}
            specular="#ffffff"
          />
        </Sphere>
      ))}
    </group>
  );
}

// Canvas wrapper for dynamic molecule
const DynamicMolecule3D = memo(function DynamicMolecule3D({
  atoms,
  bonds,
  glowColor,
}: {
  atoms: DynAtom[];
  bonds: DynBond[];
  glowColor?: string;
}) {
  const animLevel = useAnimationLevel();
  const segments =
    animLevel === "full" ? 20 : animLevel === "reduced" ? 14 : 10;

  if (animLevel === "minimal") {
    return (
      <div className="flex items-center justify-center p-4">
        <Molecule2DFallback atoms={atoms} bonds={bonds} />
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ height: 280, background: "transparent" }}
    >
      <Canvas
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, animLevel === "full" ? 2 : 1.5]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#aaccff" />
        <pointLight
          position={[-3, -2, 2]}
          intensity={0.5}
          color={glowColor ?? "#8899ff"}
        />
        <Suspense fallback={null}>
          <DynMolGroup atoms={atoms} bonds={bonds} segments={segments} />
        </Suspense>
        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={2}
          maxDistance={12}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
});

/* ─────────────────────── PubChem fetch helpers ─────────────────────── */
interface PubChemProp {
  urn: { label: string; name?: string };
  value: { sval?: string; fval?: number; ival?: number };
}
interface PubChemCompound {
  props?: PubChemProp[];
  coords?: Array<{
    aid: number[];
    conformers: Array<{ x: number[]; y: number[]; z?: number[] }>;
  }>;
  atoms?: { aid: number[]; element: number[] };
  bonds?: { aid1: number[]; aid2: number[]; order: number[] };
}

const ELEMENT_SYMBOLS = [
  "",
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Sc",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "Ga",
  "Ge",
  "As",
  "Se",
  "Br",
  "Kr",
  "Rb",
  "Sr",
  "Y",
  "Zr",
  "Nb",
  "Mo",
  "Tc",
  "Ru",
  "Rh",
  "Pd",
  "Ag",
  "Cd",
  "In",
  "Sn",
  "Sb",
  "Te",
  "I",
  "Xe",
];

function elementSymbol(atomicNum: number): string {
  return ELEMENT_SYMBOLS[atomicNum] ?? "X";
}

async function fetchMoleculeData(name: string): Promise<DynMolData | null> {
  const encoded = encodeURIComponent(name.trim());

  // Step 1: Get CID + compound data
  const res1 = await fetch(
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encoded}/JSON?record_type=3d`,
  );
  let data1: { PC_Compounds?: PubChemCompound[] } | null = null;
  if (res1.ok) data1 = await res1.json();

  // Step 2: Fallback to 2D if 3D not available
  if (!data1?.PC_Compounds?.[0]?.coords?.[0]?.conformers?.[0]) {
    const res2 = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encoded}/JSON`,
    );
    if (!res2.ok) return null;
    data1 = await res2.json();
  }

  const comp = data1?.PC_Compounds?.[0];
  if (!comp) return null;

  // Parse atoms
  const atomAids = comp.atoms?.aid ?? [];
  const atomNums = comp.atoms?.element ?? [];
  const atoms: DynAtom[] = [];

  const coordBlock = comp.coords?.[0];
  const conformer = coordBlock?.conformers?.[0];
  const xArr = conformer?.x ?? [];
  const yArr = conformer?.y ?? [];
  const zArr = conformer?.z ?? [];
  // Aid array from coords block if different from atoms block
  const coordAids = coordBlock?.aid ?? atomAids;

  // Map aid → index in coords
  const aidToCoordIdx = new Map<number, number>();
  coordAids.forEach((aid, idx) => aidToCoordIdx.set(aid, idx));

  for (let i = 0; i < atomAids.length; i++) {
    const aid = atomAids[i];
    const ci = aidToCoordIdx.get(aid) ?? i;
    atoms.push({
      element: elementSymbol(atomNums[i] ?? 0),
      x: xArr[ci] ?? 0,
      y: yArr[ci] ?? 0,
      z: zArr[ci] ?? 0,
    });
  }

  // Parse bonds — aid1/aid2 are 1-indexed, convert to 0-indexed
  const bonds: DynBond[] = [];
  const rawBonds = comp.bonds;
  if (rawBonds) {
    const { aid1, aid2, order } = rawBonds;
    // Build aid → atom array index map
    const aidToAtomIdx = new Map<number, number>();
    atomAids.forEach((aid, idx) => aidToAtomIdx.set(aid, idx));
    for (let i = 0; i < aid1.length; i++) {
      const s = aidToAtomIdx.get(aid1[i]);
      const e = aidToAtomIdx.get(aid2[i]);
      if (s !== undefined && e !== undefined) {
        bonds.push({ start: s, end: e, order: order[i] ?? 1 });
      }
    }
  }

  // Parse props
  let formula = "";
  let weight = "";
  let iupacName = "";
  for (const prop of comp.props ?? []) {
    const label = prop.urn?.label ?? "";
    const pName = prop.urn?.name ?? "";
    if (label === "Molecular Formula") formula = prop.value.sval ?? "";
    if (label === "Molecular Weight")
      weight = String(prop.value.sval ?? prop.value.fval ?? "");
    if (label === "IUPAC Name" && pName === "Preferred")
      iupacName = prop.value.sval ?? "";
  }

  return {
    atoms: scaleAtoms(centerAtoms(atoms)),
    bonds,
    name: iupacName || name,
    formula,
    weight,
  };
}

/* ─────────────────────── Molecule Search Section ─────────────────────── */
/* ─────────────────────── Recent search persistence ─────────────────────── */
const RECENT_KEY = "chem_recent_molecules";
const RECENT_MAX = 5;

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecent(list: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota errors */
  }
}

function prependRecent(name: string, current: string[]): string[] {
  const deduped = current.filter((r) => r.toLowerCase() !== name.toLowerCase());
  return [name, ...deduped].slice(0, RECENT_MAX);
}

/* ─────────────────────── Quick-search fallback names ─────────────────────── */
const QUICK_SEARCH = [
  "water",
  "ethanol",
  "glucose",
  "caffeine",
  "aspirin",
  "ATP",
];

// IDs that already exist in the static MOLECULES list, keyed by common name
const PREDEFINED_IDS: Record<string, string> = {
  water: "h2o",
  methane: "ch4",
  benzene: "c6h6",
  ammonia: "nh3",
  acetylene: "c2h2",
};

export function MoleculeSearchSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [molData, setMolData] = useState<DynMolData | null>(null);
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sugLoading, setSugLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecent);

  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sugAbortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setSuggestions([]);
        setSelectedIdx(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      debounceRef.current && clearTimeout(debounceRef.current);
      sugAbortRef.current?.abort();
    };
  }, []);

  /* ── Autocomplete: fetch PubChem suggest when query ≥ 3 chars ── */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 3) {
      setSuggestions([]);
      setSugLoading(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      sugAbortRef.current?.abort();
      sugAbortRef.current = new AbortController();
      setSugLoading(true);
      try {
        const res = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${encodeURIComponent(query)}/JSON?limit=6`,
          { signal: sugAbortRef.current.signal },
        );
        if (!res.ok) throw new Error("autocomplete failed");
        const json = (await res.json()) as {
          dictionary_terms?: { compound?: string[] };
        };
        const names: string[] = json.dictionary_terms?.compound ?? [];
        setSuggestions(names);
        setSelectedIdx(-1);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError")
          setSuggestions([]);
      } finally {
        setSugLoading(false);
      }
    }, 300);
  }, [query]);

  /* ── Whether to show the dropdown ── */
  const showDropdown = useMemo(() => {
    if (!focused) return false;
    if (query.length === 0) return recentSearches.length > 0;
    return suggestions.length > 0 || sugLoading;
  }, [focused, query, suggestions, sugLoading, recentSearches]);

  /* ── Core search function ── */
  const handleSearch = useCallback(async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return;
    setSuggestions([]);
    setSelectedIdx(-1);
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    setError(null);
    setMolData(null);
    try {
      const result = await fetchMoleculeData(q);
      if (result && result.atoms.length > 0) {
        setMolData(result);
        const updated = prependRecent(q, loadRecent());
        setRecentSearches(updated);
        saveRecent(updated);
      } else {
        setError(
          `"${q}" not found — try another name (e.g. caffeine, ethanol, aspirin)`,
        );
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Keyboard navigation in dropdown ── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const list = query.length === 0 ? recentSearches : suggestions;
    if (showDropdown && list.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, list.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, -1));
        return;
      }
      if (e.key === "Enter" && selectedIdx >= 0) {
        e.preventDefault();
        const chosen = list[selectedIdx];
        setQuery(chosen);
        setSuggestions([]);
        setSelectedIdx(-1);
        handleSearch(chosen);
        return;
      }
    }
    if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIdx(-1);
      return;
    }
    if (e.key === "Enter") handleSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    setMolData(null);
    setError(null);
    setSuggestions([]);
    setSelectedIdx(-1);
    inputRef.current?.focus();
  };

  const removeRecent = useCallback((name: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((r) => r !== name);
      saveRecent(next);
      return next;
    });
  }, []);

  const selectSuggestion = useCallback(
    (name: string) => {
      setQuery(name);
      setSuggestions([]);
      setSelectedIdx(-1);
      handleSearch(name);
    },
    [handleSearch],
  );

  // Glow color based on top element count
  const glowColor = molData
    ? cpkColor(molData.atoms[0]?.element ?? "C")
    : "#8899ff";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mb-14"
      data-ocid="molecules.search_section"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-5 h-5 text-accent" />
        <h2 className="font-display text-2xl font-bold">3D Structure Search</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent" />
        <span
          className="text-xs font-mono px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          PubChem API
        </span>
      </div>

      {/* Search bar + dropdown wrapper */}
      <div className="relative">
        <div
          className="relative flex items-center transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: focused
              ? "1px solid rgba(255,255,255,0.28)"
              : "1px solid rgba(255,255,255,0.14)",
            borderRadius: "9999px",
            boxShadow: focused
              ? "0 4px 24px rgba(0,0,0,0.3), 0 0 0 2px rgba(136,153,255,0.18), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
            padding: "0 8px 0 20px",
          }}
        >
          <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 180)}
            placeholder="Search molecule (e.g. methane, benzene, water)"
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/60 py-3.5 min-w-0"
            data-ocid="molecules.search_input"
            aria-label="Search molecule by name"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            autoComplete="off"
          />
          {/* inline spinner */}
          {sugLoading && query.length >= 3 && (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground shrink-0 mr-2" />
          )}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center w-7 h-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200 shrink-0 mr-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => handleSearch(query)}
            disabled={!query.trim() || loading}
            data-ocid="molecules.search_button"
            style={{
              background:
                loading || !query.trim()
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "9999px",
              color: !query.trim()
                ? "rgba(255,255,255,0.3)"
                : "rgba(255,255,255,0.85)",
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: !query.trim() || loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 200ms ease",
              flexShrink: 0,
            }}
            className="hover:scale-[1.03] active:scale-95"
            aria-label="Search"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              "Search"
            )}
          </button>
        </div>

        {/* Dropdown: autocomplete suggestions or recent searches */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute z-50 w-full mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(18,18,30,0.92)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow:
                  "0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Recent searches (when query is empty) */}
              {query.length === 0 && recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-4 pt-3 pb-1.5">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Recent
                    </span>
                  </div>
                  {recentSearches.map((name, idx) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150"
                      style={{
                        background:
                          selectedIdx === idx
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",
                      }}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      onMouseLeave={() => setSelectedIdx(-1)}
                      onClick={() => selectSuggestion(name)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectSuggestion(name);
                        }
                      }}
                    >
                      <Clock
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      />
                      <span
                        className="flex-1 text-sm truncate"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecent(name);
                        }}
                        className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors duration-150 shrink-0"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                        aria-label={`Remove ${name} from recent`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Autocomplete suggestions (when query ≥ 3 chars) */}
              {query.length >= 3 && sugLoading && (
                <div className="flex items-center gap-2.5 px-4 py-3">
                  <Loader2
                    className="w-3.5 h-3.5 animate-spin"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Searching…
                  </span>
                </div>
              )}
              {query.length >= 3 && !sugLoading && suggestions.length > 0 && (
                <div>
                  <div className="px-4 pt-3 pb-1.5">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Suggestions
                    </span>
                  </div>
                  {suggestions.map((name, idx) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150"
                      style={{
                        background:
                          selectedIdx === idx
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",
                      }}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      onMouseLeave={() => setSelectedIdx(-1)}
                      onClick={() => selectSuggestion(name)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectSuggestion(name);
                        }
                      }}
                    >
                      <Atom
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "rgba(136,153,255,0.55)" }}
                      />
                      <span
                        className="flex-1 text-sm truncate"
                        style={{ color: "rgba(255,255,255,0.80)" }}
                      >
                        {name}
                      </span>
                      {PREDEFINED_IDS[name.toLowerCase()] && (
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                          style={{
                            background: "rgba(136,153,255,0.12)",
                            color: "rgba(136,153,255,0.65)",
                          }}
                        >
                          3D
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Quick fallback when no suggestions */}
              {query.length >= 3 && !sugLoading && suggestions.length === 0 && (
                <div>
                  <div className="px-4 pt-3 pb-1.5">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Try These
                    </span>
                  </div>
                  {QUICK_SEARCH.map((name, idx) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150"
                      style={{
                        background:
                          selectedIdx === idx
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",
                      }}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      onMouseLeave={() => setSelectedIdx(-1)}
                      onClick={() => selectSuggestion(name)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectSuggestion(name);
                        }
                      }}
                    >
                      <Search
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom padding */}
              <div className="h-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick suggestions pills (shown when no result/loading/error) */}
      {!molData && !loading && !error && (
        <div className="flex flex-wrap gap-2 mt-3 px-2">
          {QUICK_SEARCH.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                handleSearch(s);
              }}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="mt-6 flex flex-col items-center justify-center gap-4 py-12 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)",
            }}
            data-ocid="molecules.search_loading_state"
          >
            {/* Atom-themed pulsing loading animation */}
            <div className="relative flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-full animate-ping absolute"
                style={{
                  background: "rgba(99,153,255,0.15)",
                  animationDuration: "1.2s",
                }}
              />
              <div
                className="w-8 h-8 rounded-full animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99,153,255,0.4) 0%, rgba(99,153,255,0.05) 100%)",
                  border: "1px solid rgba(99,153,255,0.4)",
                  boxShadow: "0 0 20px rgba(99,153,255,0.3)",
                }}
              />
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              Fetching 3D structure from PubChem…
            </span>
          </motion.div>
        )}

        {/* Error state */}
        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{
              background: "rgba(200,50,30,0.08)",
              border: "1px solid rgba(200,50,30,0.2)",
            }}
            data-ocid="molecules.search_error_state"
          >
            <span className="text-2xl">⚠</span>
            <p className="text-sm text-foreground/80">{error}</p>
          </motion.div>
        )}

        {/* Result */}
        {molData && !loading && (
          <motion.div
            key={molData.name}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px) saturate(1.8)",
              WebkitBackdropFilter: "blur(24px) saturate(1.8)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: `0 0 60px ${glowColor}25, 0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.1)`,
            }}
            data-ocid="molecules.search_result"
          >
            {/* 3D viewer */}
            <div
              className="relative flex items-center justify-center"
              style={{
                background: `radial-gradient(ellipse at center, ${glowColor}15 0%, rgba(0,0,0,0.1) 70%)`,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                minHeight: 280,
              }}
            >
              <DynamicMolecule3D
                atoms={molData.atoms}
                bonds={molData.bonds}
                glowColor={glowColor}
              />
              <div
                className="absolute bottom-2 left-3 text-xs font-mono pointer-events-none"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                drag · zoom
              </div>
            </div>

            {/* Info card */}
            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <div
                className="rounded-xl px-4 py-3 mb-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className="font-display text-xl font-bold leading-snug truncate"
                      title={molData.name}
                    >
                      {molData.name}
                    </h3>
                    <div
                      className="font-mono text-base mt-0.5"
                      style={{ color: glowColor }}
                    >
                      {molData.formula || "—"}
                    </div>
                  </div>
                  {molData.weight && (
                    <div
                      className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold"
                      style={{
                        background: `${glowColor}18`,
                        border: `1px solid ${glowColor}35`,
                        color: glowColor,
                        whiteSpace: "nowrap",
                        boxShadow: `0 0 12px ${glowColor}20`,
                      }}
                    >
                      {molData.weight} g/mol
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Atoms", value: String(molData.atoms.length) },
                  { label: "Bonds", value: String(molData.bonds.length) },
                  { label: "Formula", value: molData.formula || "—" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {label}
                    </div>
                    <div className="text-sm font-semibold font-mono truncate">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────── Page ─────────────────────── */
export function MoleculesPage() {
  const [focusedMol, setFocusedMol] = useState<MoleculeInfo | null>(null);
  const handleFocus = useCallback(
    (mol: MoleculeInfo) => setFocusedMol(mol),
    [],
  );
  const handleClose = useCallback(() => setFocusedMol(null), []);

  return (
    <div className="min-h-screen px-4 py-10" data-ocid="molecules.page">
      <AnimatePresence>
        {focusedMol && <FocusOverlay mol={focusedMol} onClose={handleClose} />}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4">
          <Atom className="w-4 h-4 text-foreground/70" />
          <span className="font-mono">
            VSEPR · Bond Types · Crystal Structures · True 3D Interactive
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground/90 via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
          Molecules & Crystal Structures
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          True 3D interactive models — drag to rotate, scroll to zoom, hover
          atoms for details. All 11 structures are fully live.
        </p>
        <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground/60 font-mono">
          <span className="flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> drag to rotate
          </span>
          <span>·</span>
          <span>scroll to zoom</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <ZoomIn className="w-3 h-3" /> click icon to focus
          </span>
        </div>
      </motion.div>

      {/* Molecules */}
      <MoleculeSearchSection />

      {/* Divider */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>

      {/* Popular Molecules header note */}
      <div className="max-w-6xl mx-auto mb-14" data-ocid="molecules.section">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <Atom className="w-5 h-5 text-accent" />
          <h2 className="font-display text-2xl font-bold">Popular Molecules</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MOLECULES.map((mol, i) => (
            <MoleculeCard
              key={mol.id}
              mol={mol}
              index={i}
              onFocus={handleFocus}
            />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 glass rounded-xl p-4 flex flex-wrap gap-4 justify-center"
          data-ocid="molecules.legend"
        >
          {[
            { label: "Oxygen (O)", color: "#cc3322" },
            { label: "Hydrogen (H)", color: "#ddddee" },
            { label: "Carbon (C)", color: "#334466" },
            { label: "Nitrogen (N)", color: "#3344bb" },
            { label: "Chlorine (Cl)", color: "#44bb55" },
            { label: "Phosphorus (P)", color: "#227766" },
          ].map(({ label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ background: color, boxShadow: `0 0 8px ${color}` }}
              />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Crystal Structures */}
      <div className="max-w-6xl mx-auto" data-ocid="molecules.crystals_section">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <Layers className="w-5 h-5 text-accent" />
          <h2 className="font-display text-2xl font-bold">
            Crystal Structures
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CRYSTALS.map((crystal, i) => (
            <CrystalCard key={crystal.id} crystal={crystal} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 glass rounded-xl p-4 flex flex-wrap gap-4 justify-center"
          data-ocid="molecules.crystal_legend"
        >
          {[
            { label: "Na⁺ (Purple)", color: "#8855cc" },
            { label: "Cl⁻ (Green)", color: "#44cc55" },
            { label: "Carbon (Blue)", color: "#6699ee" },
            { label: "Iron (Orange)", color: "#ee9944" },
          ].map(({ label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ background: color, boxShadow: `0 0 8px ${color}` }}
              />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
