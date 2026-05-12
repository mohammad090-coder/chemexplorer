import { getAnimationLevel } from "@/lib/performance";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

// ── Static geometry (computed once outside components) ─────────────────────────

const DIAMOND_ATOMS = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
] as const;
const DIAMOND_BONDS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0], // bottom face
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4], // top face
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7], // verticals
  [0, 6],
  [1, 7],
  [2, 4],
  [3, 5], // internal diagonals
] as const;

function buildFullereneAtoms(): [number, number, number][] {
  const phi = (1 + Math.sqrt(5)) / 2;
  const r = 1.0;
  const base: [number, number, number][] = [
    [0, 1, phi],
    [0, -1, phi],
    [0, 1, -phi],
    [0, -1, -phi],
    [1, phi, 0],
    [-1, phi, 0],
    [1, -phi, 0],
    [-1, -phi, 0],
    [phi, 0, 1],
    [phi, 0, -1],
    [-phi, 0, 1],
    [-phi, 0, -1],
  ];
  const all: [number, number, number][] = [...base];
  const pairs: [number, number][] = [
    [0, 1],
    [0, 4],
    [0, 5],
    [0, 8],
    [0, 10],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 10],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 9],
    [2, 11],
    [3, 6],
    [3, 7],
    [3, 9],
    [3, 11],
    [4, 5],
    [4, 8],
    [4, 9],
    [5, 10],
    [5, 11],
    [6, 7],
    [6, 8],
    [6, 9],
    [7, 10],
    [7, 11],
    [8, 9],
    [10, 11],
  ];
  for (const [a, b] of pairs) {
    const [ax, ay, az] = base[a];
    const [bx, by, bz] = base[b];
    const mx = ax + bx;
    const my = ay + by;
    const mz = az + bz;
    const len = Math.sqrt(mx * mx + my * my + mz * mz);
    all.push([(mx / len) * phi, (my / len) * phi, (mz / len) * phi]);
  }
  const atoms: [number, number, number][] = [];
  for (const p of all) {
    const len = Math.sqrt(p[0] ** 2 + p[1] ** 2 + p[2] ** 2);
    atoms.push([(p[0] / len) * r, (p[1] / len) * r, (p[2] / len) * r]);
  }
  return atoms.slice(0, 60);
}
const FULLERENE_ATOMS = buildFullereneAtoms();
const FULLERENE_BONDS: [number, number][] = [];
for (let i = 0; i < FULLERENE_ATOMS.length; i++) {
  for (let j = i + 1; j < FULLERENE_ATOMS.length; j++) {
    const [ax, ay, az] = FULLERENE_ATOMS[i];
    const [bx, by, bz] = FULLERENE_ATOMS[j];
    const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
    if (d < 0.55) FULLERENE_BONDS.push([i, j]);
  }
}

function buildGraphiteAtoms() {
  const layers: [number, number, number][] = [];
  const zOffsets = [-0.8, 0, 0.8];
  const hexCenters: [number, number][] = [
    [0, 0],
    [2, 0],
    [-2, 0],
    [1, 1.73],
    [-1, 1.73],
    [1, -1.73],
    [-1, -1.73],
  ];
  for (const z of zOffsets) {
    for (const [cx, cy] of hexCenters) {
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        layers.push([
          cx + Math.cos(angle) * 0.5,
          cy + Math.sin(angle) * 0.5,
          z,
        ]);
      }
    }
  }
  return layers;
}
const GRAPHITE_ATOMS = buildGraphiteAtoms();
const GRAPHITE_BONDS: [number, number][] = [];
for (let i = 0; i < GRAPHITE_ATOMS.length; i++) {
  for (let j = i + 1; j < GRAPHITE_ATOMS.length; j++) {
    const [ax, ay, az] = GRAPHITE_ATOMS[i];
    const [bx, by, bz] = GRAPHITE_ATOMS[j];
    const dx = ax - bx;
    const dy = ay - by;
    const dz = az - bz;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (Math.abs(dz) < 0.1 && d < 0.55) GRAPHITE_BONDS.push([i, j]);
  }
}

function buildGrapheneAtoms(): [number, number, number][] {
  const atoms: [number, number, number][] = [];
  const hexCenters: [number, number][] = [
    [0, 0],
    [2, 0],
    [-2, 0],
    [1, 1.73],
    [-1, 1.73],
    [1, -1.73],
    [-1, -1.73],
    [3, 1.73],
    [-3, 1.73],
    [3, -1.73],
    [-3, -1.73],
    [0, 3.46],
    [0, -3.46],
  ];
  for (const [cx, cy] of hexCenters) {
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      atoms.push([cx + Math.cos(angle) * 0.5, cy + Math.sin(angle) * 0.5, 0]);
    }
  }
  const unique: [number, number, number][] = [];
  for (const a of atoms) {
    if (
      !unique.some(
        (u) => Math.abs(u[0] - a[0]) < 0.05 && Math.abs(u[1] - a[1]) < 0.05,
      )
    ) {
      unique.push(a);
    }
  }
  return unique;
}
const GRAPHENE_ATOMS = buildGrapheneAtoms();
const GRAPHENE_BONDS: [number, number][] = [];
for (let i = 0; i < GRAPHENE_ATOMS.length; i++) {
  for (let j = i + 1; j < GRAPHENE_ATOMS.length; j++) {
    const [ax, ay] = GRAPHENE_ATOMS[i];
    const [bx, by] = GRAPHENE_ATOMS[j];
    const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
    if (d < 0.55) GRAPHENE_BONDS.push([i, j]);
  }
}

// ── 3D projection utilities ────────────────────────────────────────────────────

function rotatePoint(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
): [number, number, number] {
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;
  return [x1, y2, z2];
}

function project(
  x: number,
  y: number,
  z: number,
  fov: number,
): [number, number, number] {
  const scale = fov / (fov + z);
  return [x * scale, y * scale, z];
}

// ── Interactive 3D Canvas ──────────────────────────────────────────────────────

interface Scene3DProps {
  atoms: readonly (readonly number[])[] | [number, number, number][];
  bonds: readonly [number, number][];
  atomColor: string;
  bondColor: string;
  atomGlow: string;
  scale?: number;
  autoRotateSpeed?: [number, number, number];
  initialRot?: [number, number];
  fov?: number;
  className?: string;
  isHovered?: boolean;
}

const Scene3D = memo(function Scene3D({
  atoms,
  bonds,
  atomColor,
  bondColor,
  atomGlow,
  scale = 80,
  autoRotateSpeed = [0.002, 0.004, 0],
  initialRot = [0.3, 0.4],
  fov = 5,
  className,
  isHovered = false,
}: Scene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef<[number, number]>([...initialRot]);
  const velRef = useRef<[number, number]>([0, 0]);
  const isDragging = useRef(false);
  const lastPointer = useRef<[number, number]>([0, 0]);
  const rafRef = useRef<number>(0);
  const isHoveredRef = useRef(isHovered);
  const animLevel = getAnimationLevel();

  // Keep ref in sync with prop to avoid stale closures
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    ctx.clearRect(0, 0, W, H);

    const [rx, ry] = rotRef.current;
    const projected = (atoms as [number, number, number][]).map(
      ([ax, ay, az]) => {
        const [rx2, ry2, rz2] = rotatePoint(ax, ay, az, rx, ry);
        const [px, py, pz] = project(rx2, ry2, rz2, fov);
        return { sx: cx + px * scale, sy: cy + py * scale, z: pz };
      },
    );

    const atomOrder = projected
      .map((_, i) => i)
      .sort((a, b) => projected[a].z - projected[b].z);

    ctx.lineWidth = 1.5;
    for (const [ai, bi] of bonds as [number, number][]) {
      const a = projected[ai];
      const b = projected[bi];
      const depth = (a.z + b.z) / 2;
      const alpha = Math.max(0.15, Math.min(0.85, 0.55 + depth * 0.18));
      ctx.strokeStyle = bondColor.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.stroke();
    }

    for (const idx of atomOrder) {
      const { sx, sy, z } = projected[idx];
      const depthScale = Math.max(0.5, Math.min(1.3, 1 + z * 0.1));
      const r = Math.max(2, 4 * depthScale);
      const alpha = Math.max(0.3, Math.min(1, 0.65 + z * 0.15));

      if (animLevel !== "minimal") {
        const glowR = r * (isHoveredRef.current ? 4 : 3);
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        grad.addColorStop(
          0,
          atomGlow.replace(
            /[\d.]+\)$/,
            `${alpha * (isHoveredRef.current ? 0.55 : 0.4)})`,
          ),
        );
        grad.addColorStop(1, atomGlow.replace(/[\d.]+\)$/, "0)"));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = atomColor.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [atoms, bonds, atomColor, bondColor, atomGlow, scale, fov, animLevel]);

  // Resize canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const size = canvas.getBoundingClientRect();
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // RAF animation loop — visibility-aware, hover-pause
  useEffect(() => {
    let lastTime = 0;
    const loop = (time: number) => {
      rafRef.current = requestAnimationFrame(loop);

      // Skip drawing when tab is hidden (performance)
      if (document.visibilityState === "hidden") return;

      const dt = Math.min(time - lastTime, 32);
      lastTime = time;

      if (!isDragging.current && !isHoveredRef.current) {
        // ~0.4 deg/frame at 60fps → full rotation in ~12s
        rotRef.current[0] += autoRotateSpeed[0] * dt * 0.3;
        rotRef.current[1] += autoRotateSpeed[1] * dt * 0.3;
      } else if (!isDragging.current) {
        // Apply lingering inertia only
        rotRef.current[0] += velRef.current[0];
        rotRef.current[1] += velRef.current[1];
        velRef.current[0] *= 0.92;
        velRef.current[1] *= 0.92;
      } else {
        // During drag: inertia
        rotRef.current[0] += velRef.current[0];
        rotRef.current[1] += velRef.current[1];
        velRef.current[0] *= 0.9;
        velRef.current[1] *= 0.9;
      }
      draw();
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, autoRotateSpeed]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (animLevel === "minimal") return;
      isDragging.current = true;
      lastPointer.current = [e.clientX, e.clientY];
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [animLevel],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current[0];
    const dy = e.clientY - lastPointer.current[1];
    lastPointer.current = [e.clientX, e.clientY];
    const speed = 0.008;
    velRef.current[1] = dx * speed;
    velRef.current[0] = dy * speed;
    rotRef.current[1] += dx * speed;
    rotRef.current[0] += dy * speed;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "touch-none cursor-grab active:cursor-grabbing block",
        className,
      )}
      style={{ willChange: "transform", margin: "auto" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  );
});

// ── Per-allotrope glow config ──────────────────────────────────────────────────

const ALLOTROPE_GLOW_STYLES: Record<string, { normal: string; hover: string }> =
  {
    diamond: {
      normal:
        "0 0 40px rgba(147,210,255,0.7), 0 0 80px rgba(147,210,255,0.3), 0 4px 24px rgba(0,0,0,0.3)",
      hover:
        "0 0 60px rgba(147,210,255,0.9), 0 0 110px rgba(147,210,255,0.45), 0 4px 32px rgba(0,0,0,0.4)",
    },
    graphite: {
      normal:
        "0 0 35px rgba(160,160,160,0.6), 0 0 70px rgba(120,120,120,0.2), 0 4px 24px rgba(0,0,0,0.3)",
      hover:
        "0 0 55px rgba(180,180,180,0.8), 0 0 95px rgba(140,140,140,0.35), 0 4px 32px rgba(0,0,0,0.4)",
    },
    graphene: {
      normal:
        "0 0 45px rgba(0,255,150,0.7), 0 0 90px rgba(0,200,100,0.3), 0 4px 24px rgba(0,0,0,0.3)",
      hover:
        "0 0 65px rgba(0,255,150,0.95), 0 0 120px rgba(0,220,110,0.45), 0 4px 32px rgba(0,0,0,0.4)",
    },
    fullerene: {
      normal:
        "0 0 40px rgba(180,100,255,0.6), 0 0 80px rgba(150,50,255,0.2), 0 4px 24px rgba(0,0,0,0.3)",
      hover:
        "0 0 60px rgba(200,120,255,0.85), 0 0 110px rgba(160,70,255,0.35), 0 4px 32px rgba(0,0,0,0.4)",
    },
    nanotube: {
      normal:
        "0 0 40px rgba(0,210,210,0.6), 0 0 80px rgba(0,180,180,0.25), 0 4px 24px rgba(0,0,0,0.3)",
      hover:
        "0 0 60px rgba(0,240,240,0.85), 0 0 110px rgba(0,210,210,0.4), 0 4px 32px rgba(0,0,0,0.4)",
    },
  };

// ── Per-allotrope visual configs ───────────────────────────────────────────────

interface AllotropeVisualConfig {
  id: string;
  atoms: [number, number, number][];
  bonds: [number, number][];
  atomColor: string;
  bondColor: string;
  atomGlow: string;
  scale: number;
  autoRotateSpeed: [number, number, number];
  initialRot: [number, number];
}

const ALLOTROPE_VISUALS: AllotropeVisualConfig[] = [
  {
    id: "diamond",
    atoms: DIAMOND_ATOMS as unknown as [number, number, number][],
    bonds: DIAMOND_BONDS as unknown as [number, number][],
    atomColor: "rgba(200,230,255,0.9)",
    bondColor: "rgba(147,210,255,0.75)",
    atomGlow: "rgba(147,210,255,0.6)",
    scale: 62,
    autoRotateSpeed: [0.001, 0.003, 0],
    initialRot: [0.4, 0.5],
  },
  {
    id: "graphite",
    atoms: GRAPHITE_ATOMS as unknown as [number, number, number][],
    bonds: GRAPHITE_BONDS as unknown as [number, number][],
    atomColor: "rgba(180,180,180,0.85)",
    bondColor: "rgba(160,160,160,0.65)",
    atomGlow: "rgba(180,180,180,0.5)",
    scale: 18,
    autoRotateSpeed: [0.0005, 0.0025, 0],
    initialRot: [0.6, 0.3],
  },
  {
    id: "graphene",
    atoms: GRAPHENE_ATOMS as unknown as [number, number, number][],
    bonds: GRAPHENE_BONDS as unknown as [number, number][],
    atomColor: "rgba(0,255,150,0.9)",
    bondColor: "rgba(0,230,130,0.65)",
    atomGlow: "rgba(0,255,150,0.7)",
    scale: 14,
    autoRotateSpeed: [0.001, 0.002, 0],
    initialRot: [0.25, 0.1],
  },
  {
    id: "fullerene",
    atoms: FULLERENE_ATOMS as unknown as [number, number, number][],
    bonds: FULLERENE_BONDS as unknown as [number, number][],
    atomColor: "rgba(200,130,255,0.9)",
    bondColor: "rgba(180,100,255,0.65)",
    atomGlow: "rgba(200,120,255,0.6)",
    scale: 72,
    autoRotateSpeed: [0.0015, 0.003, 0.0008],
    initialRot: [0.3, 0.2],
  },
  {
    id: "nanotube",
    // Re-use graphite atoms — tilted for cylindrical visual effect
    atoms: GRAPHITE_ATOMS as unknown as [number, number, number][],
    bonds: GRAPHITE_BONDS as unknown as [number, number][],
    atomColor: "rgba(0,240,240,0.9)",
    bondColor: "rgba(0,200,200,0.65)",
    atomGlow: "rgba(0,220,220,0.7)",
    scale: 18,
    autoRotateSpeed: [0.0005, 0.003, 0.0008],
    initialRot: [1.1, 0.3],
  },
];

// ── Allotrope viewer with hover state ─────────────────────────────────────────

const AllotropeViewer = memo(function AllotropeViewer({ id }: { id: string }) {
  const cfg = ALLOTROPE_VISUALS.find((v) => v.id === id)!;
  const animLevel = getAnimationLevel();
  const [hovered, setHovered] = useState(false);

  const labelMap: Record<string, string> = {
    diamond: "8 atoms · 14 bonds · Drag to rotate",
    graphite: "Layered hex lattice · 3 layers · Drag to rotate",
    graphene: "2D hex lattice · Single layer · Drag to tilt",
    fullerene: "60 atoms · Drag for full 3D rotation",
    nanotube: "Cylindrical lattice · Drag to rotate",
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <Scene3D
        atoms={cfg.atoms}
        bonds={cfg.bonds}
        atomColor={cfg.atomColor}
        bondColor={cfg.bondColor}
        atomGlow={cfg.atomGlow}
        scale={cfg.scale}
        autoRotateSpeed={
          animLevel === "minimal" ? [0, 0.001, 0] : cfg.autoRotateSpeed
        }
        initialRot={cfg.initialRot}
        fov={5}
        isHovered={hovered}
        className="w-full h-full"
      />
      <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-muted-foreground/50 pointer-events-none select-none">
        {labelMap[id] ?? "Drag to rotate"}
      </p>
    </div>
  );
});

// ── Allotrope data ──────────────────────────────────────────────────────────────

interface AllotropeData {
  id: string;
  name: string;
  shortName: string;
  color: string;
  glowColor: string;
  structure: string;
  hardness: string;
  conductivity: string;
  uses: string[];
  funFact: string;
  bondType: string;
  discovery: string;
  description: string;
}

const ALLOTROPES: AllotropeData[] = [
  {
    id: "diamond",
    name: "Diamond",
    shortName: "💎 Diamond",
    color: "from-sky-300/60 to-indigo-400/60",
    glowColor: "rgba(147,210,255,0.5)",
    structure:
      "3D tetrahedral covalent network — each carbon bonded to 4 others",
    hardness: "10 / 10 (Mohs) — hardest known natural substance",
    conductivity: "Electrical insulator, exceptional thermal conductor",
    bondType: "sp³ hybridisation",
    discovery: "Known since antiquity; structure solved 1913",
    description: "Hardest natural substance",
    uses: [
      "💍 Jewellery — rarest, most coveted gemstone (hardest natural material)",
      "🔧 Industrial cutting & drilling tools — cuts through any material",
      "⚙️ High-performance bearings & precision machinery",
      "🔬 Heat sinks in electronics — highest thermal conductivity of any solid",
      "🪟 Optical windows for X-ray machines and high-power lasers",
    ],
    funFact:
      "A diamond is a single giant molecule. The covalent bonds extend throughout the entire crystal — every atom is connected to every other atom.",
  },
  {
    id: "graphite",
    name: "Graphite",
    shortName: "🪨 Graphite",
    color: "from-slate-400/60 to-zinc-600/60",
    glowColor: "rgba(160,160,160,0.4)",
    structure:
      "Flat hexagonal layers — carbon atoms in planes, weakly held between layers",
    hardness: "1–2 / 10 (Mohs) — soft and slippery",
    conductivity: "Good electrical conductor along layers",
    bondType: "sp² hybridisation + delocalised π electrons",
    discovery: "Known since antiquity; used as pencil lead since 16th century",
    description: "Soft, layered conductor",
    uses: [
      "✏️ Pencil lead — mixed with clay, transfers layers onto paper",
      "🔧 Industrial dry lubricant — reduces friction in engines & locks",
      "⚡ Carbon brushes in electric motors & generators",
      "🔋 Anode material in lithium-ion batteries (smartphones, EVs)",
      "🏭 Foundry crucibles — withstands extreme temperatures",
      "☢️ Moderator in nuclear reactors",
    ],
    funFact:
      "A standard HB pencil can draw a line 56 km long and write about 45,000 words before running out of graphite.",
  },
  {
    id: "graphene",
    name: "Graphene",
    shortName: "⚡ Graphene",
    color: "from-teal-400/60 to-cyan-500/60",
    glowColor: "rgba(0,255,150,0.4)",
    structure:
      "Single atom-thick hexagonal lattice — 2D material, one layer of graphite",
    hardness: "Strongest material ever tested — 200× stronger than steel",
    conductivity: "Exceptional electrical and thermal conductor",
    bondType: "sp² hybridisation, massless Dirac fermions",
    discovery: "Isolated 2004 by Geim & Novoselov (Nobel Prize 2010)",
    description: "2D wonder material",
    uses: [
      "💻 Next-generation semiconductors & ultra-fast transistors",
      "🏋️ Ultra-strong composites for aerospace & body armour",
      "📱 Flexible & foldable touchscreen displays",
      "💧 Water filtration membranes — filters salt and pollutants",
      "🔋 Energy storage: next-gen supercapacitors and batteries",
    ],
    funFact:
      "A graphene hammock the size of a football field would weigh only 1 mg, yet could support a 4 kg cat.",
  },
  {
    id: "fullerene",
    name: "Fullerene C₆₀",
    shortName: "⚽ C₆₀",
    color: "from-amber-400/60 to-orange-500/60",
    glowColor: "rgba(180,100,255,0.4)",
    structure:
      "Hollow spherical cage of 60 carbon atoms — 20 hexagons + 12 pentagons",
    hardness: "Soft solid — molecules held by weak van der Waals forces",
    conductivity: "Semiconductor; can be made superconducting when doped",
    bondType: "Mixed sp² hybridisation",
    discovery: "Discovered 1985 by Kroto, Curl & Smalley (Nobel Prize 1996)",
    description: "Hollow C₆₀ cage molecule",
    uses: [
      "💊 Drug delivery — hollow cage encapsulates drug molecules for targeted therapy",
      "🧪 Antioxidant research — scavenges free radicals in biological systems",
      "⚙️ Lubricant additive — near-frictionless nanoscale rolling",
      "☀️ Solar cell research — improves organic photovoltaic efficiency",
    ],
    funFact:
      "C₆₀ resembles a soccer ball and was nicknamed 'Buckminster Fullerene' after architect Buckminster Fuller, who designed geodesic domes of the same shape.",
  },
  {
    id: "nanotube",
    name: "Carbon Nanotube",
    shortName: "⚡ CNT",
    color: "from-cyan-400/60 to-teal-500/60",
    glowColor: "rgba(0,210,210,0.4)",
    structure:
      "Cylindrical arrangement of carbon hexagons — essentially rolled-up graphene. Single-walled (SWCNT) or multi-walled (MWCNT).",
    hardness: "Tensile strength ~100× stronger than steel at 1/6th the weight",
    conductivity:
      "Metallic or semiconducting depending on chirality — exceptional electron transport",
    bondType: "sp² (graphene-like, rolled into cylinder)",
    discovery:
      "First described by Iijima in 1991 (multi-walled); single-walled by Bethune & Iijima, 1993",
    description: "Rolled graphene cylinder",
    uses: [
      "🖥️ Nano-transistors — smaller, faster than silicon chips",
      "🏗️ Ultra-strong materials — 100× stronger than steel at 1/6th the weight",
      "🛡️ EMI shielding for electronics & military equipment",
      "💊 Drug delivery nanocarriers for cancer treatment",
      "⚡ Hydrogen storage for fuel cell vehicles",
    ],
    funFact:
      "A CNT 1 mm long contains ~4 million carbon rings. Electrical conductivity can exceed copper; tensile strength surpasses any natural material.",
  },
];

// ── 3D Viewer Card with all glow/hover effects ─────────────────────────────────

const AllotropeViewerCard = memo(function AllotropeViewerCard({
  activeId,
  activeAllotrope,
}: {
  activeId: string;
  activeAllotrope: AllotropeData;
}) {
  const [hovered, setHovered] = useState(false);
  const glowStyles =
    ALLOTROPE_GLOW_STYLES[activeId] ?? ALLOTROPE_GLOW_STYLES.diamond;

  return (
    <div
      className={cn(
        "glass-carbon rounded-2xl overflow-hidden flex flex-col",
        "border border-border/20 transition-all duration-200",
      )}
      style={{
        // FIX 2: per-allotrope glow color + hover intensification
        boxShadow: hovered ? glowStyles.hover : glowStyles.normal,
        // FIX 4: scale on hover
        transform: hovered ? "scale(1.035)" : "scale(1)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        // FIX 1: ensure container doesn't clip canvas
        contain: "layout paint",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {/* FIX 1: Centered canvas wrapper */}
      <div
        className="relative overflow-hidden"
        style={{
          // Responsive height with centering
          minHeight: "clamp(180px, 28vw, 260px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AllotropeViewer id={activeId} />

        {/* FIX 4: label overlay — fade in on hover */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <div className="absolute bottom-14 left-0 right-0 text-center px-3">
            <div className="text-base font-display font-bold text-white drop-shadow">
              {activeAllotrope.name}
            </div>
            <div className="text-xs text-white/70 mt-0.5">
              {activeAllotrope.description}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 text-center border-t border-border/10 pt-3">
        <div className="font-display text-xl font-bold mb-0.5">
          {activeAllotrope.name}
        </div>
        <div className="text-xs text-muted-foreground">
          {activeAllotrope.bondType}
        </div>
        <div
          className={cn(
            "mt-2 text-xs px-3 py-1 rounded-full inline-block bg-gradient-to-r to-transparent border border-border/20",
            activeAllotrope.color,
          )}
        >
          Interactive 3D · Drag to rotate
        </div>
      </div>
    </div>
  );
});

// ── Main CarbonAllotropes export ───────────────────────────────────────────────

export const CarbonAllotropes = memo(function CarbonAllotropes() {
  const [activeId, setActiveId] = useState<string>("diamond");
  const activeAllotrope =
    ALLOTROPES.find((a) => a.id === activeId) ?? ALLOTROPES[0];

  return (
    <div data-ocid="carbon.allotropes_section">
      {/* Allotrope Selector */}
      <div
        className="flex flex-wrap justify-center gap-2 mb-8 relative"
        data-ocid="carbon.allotrope_tabs"
        role="tablist"
      >
        {ALLOTROPES.map((a) => (
          <motion.button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={activeId === a.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveId(a.id)}
            className="relative glass-carbon rounded-2xl px-5 py-2.5 text-sm font-medium transition-colors duration-200"
            data-ocid={`carbon.tab.${a.id}`}
          >
            {activeId === a.id && (
              <motion.span
                layoutId="allotrope-pill"
                className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-r border border-border/30 shadow-lg",
                  a.color,
                )}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{a.shortName}</span>
          </motion.button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid md:grid-cols-[280px_1fr] gap-6"
            data-ocid={`carbon.allotrope_panel.${activeId}`}
          >
            {/* FIX 1 + 2 + 4: 3D Viewer Card */}
            <AllotropeViewerCard
              activeId={activeId}
              activeAllotrope={activeAllotrope}
            />

            {/* Info Cards */}
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "Hardness", value: activeAllotrope.hardness },
                  {
                    label: "Conductivity",
                    value: activeAllotrope.conductivity,
                  },
                  { label: "Discovery", value: activeAllotrope.discovery },
                  { label: "Bond Type", value: activeAllotrope.bondType },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass-carbon rounded-xl p-3 hover:bg-card/30 transition-colors"
                  >
                    <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">
                      {label}
                    </div>
                    <div className="text-sm text-foreground leading-snug">
                      {value}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="glass-carbon rounded-xl p-4"
              >
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Crystal Structure
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {activeAllotrope.structure}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-carbon rounded-xl p-4"
                data-ocid={`carbon.uses_card.${activeId}`}
              >
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Real-World Uses
                </div>
                <div className="space-y-1.5">
                  {activeAllotrope.uses.map((use) => (
                    <div
                      key={use}
                      className="flex items-start gap-2 text-sm text-foreground/80 leading-snug"
                    >
                      <span className="text-xs mt-0.5 flex-shrink-0">→</span>
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className={cn(
                  "rounded-xl p-4 bg-gradient-to-br border border-border/20",
                  activeAllotrope.color,
                )}
                data-ocid={`carbon.fun_fact.${activeId}`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-foreground/80">
                  🌟 Did You Know?
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {activeAllotrope.funFact}
                </p>
              </motion.div>

              {/* Exam-focused note pinned below fun fact */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="rounded-xl p-4 border border-amber-400/40 bg-amber-500/5"
                data-ocid="carbon.exam_note"
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-2 text-amber-400">
                  📝 Exam Tip
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  <strong className="text-amber-300">Graphite</strong> conducts
                  electricity due to{" "}
                  <strong className="text-amber-300">
                    delocalised π electrons
                  </strong>{" "}
                  between layers — but{" "}
                  <strong className="text-amber-300">diamond</strong> does{" "}
                  <strong className="text-red-400">not</strong> (all 4 valence
                  electrons are in covalent bonds, none free to move). This is a{" "}
                  <strong className="text-amber-300">common exam trap</strong> —
                  both are pure carbon, but their structures give completely
                  opposite electrical properties.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-carbon rounded-2xl overflow-hidden"
          data-ocid="carbon.comparison_table"
        >
          <div className="px-5 py-4 border-b border-border/20">
            <h2 className="font-display text-lg font-bold">
              Allotrope Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/10">
                  {["Allotrope", "Bond Type", "Hardness", "Conductivity"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={cn(
                          "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider",
                          i >= 2 && "hidden sm:table-cell",
                          i === 3 && "hidden md:table-cell",
                        )}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {ALLOTROPES.map((a, i) => (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={cn(
                      "border-b border-border/10 hover:bg-card/20 transition-colors cursor-pointer",
                      activeId === a.id ? "bg-card/30" : "",
                    )}
                    onClick={() => setActiveId(a.id)}
                    data-ocid={`carbon.comparison_row.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {a.shortName} {a.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs max-w-[160px]">
                      {a.bondType}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                      {a.hardness.split("—")[0].trim()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                      {a.conductivity.split(",")[0].trim()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Fact cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 grid sm:grid-cols-3 gap-4"
          data-ocid="carbon.facts_section"
        >
          {[
            {
              value: "~10 million",
              label: "Known carbon compounds",
              sub: "More than all other elements combined",
            },
            {
              value: "15th",
              label: "Most abundant in Earth's crust",
              sub: "Despite being the basis of all life",
            },
            {
              value: "3,500°C",
              label: "Diamond's melting point",
              sub: "Highest of any element at room pressure",
            },
          ].map(({ value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-carbon rounded-2xl p-5 text-center transition-shadow hover:shadow-lg"
            >
              <div className="text-2xl font-display font-bold text-foreground mb-1">
                {value}
              </div>
              <div className="text-sm font-medium mb-1">{label}</div>
              <div className="text-xs text-muted-foreground">{sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
});
