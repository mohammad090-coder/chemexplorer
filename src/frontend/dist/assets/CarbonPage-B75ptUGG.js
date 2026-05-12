import { r as reactExports, j as jsxRuntimeExports, m as motion, h as cn, l as AnimatePresence, w as getAnimationLevel, g as ChevronDown, S as Search, X, A as Atom } from "./index-DyyHqAHL.js";
import { C as ChevronRight } from "./chevron-right-6gh7dKif.js";
const DIAMOND_ATOMS = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1]
];
const DIAMOND_BONDS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  // bottom face
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  // top face
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
  // verticals
  [0, 6],
  [1, 7],
  [2, 4],
  [3, 5]
  // internal diagonals
];
function buildFullereneAtoms() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const r = 1;
  const base = [
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
    [-phi, 0, -1]
  ];
  const all = [...base];
  const pairs = [
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
    [10, 11]
  ];
  for (const [a, b] of pairs) {
    const [ax, ay, az] = base[a];
    const [bx, by, bz] = base[b];
    const mx = ax + bx;
    const my = ay + by;
    const mz = az + bz;
    const len = Math.sqrt(mx * mx + my * my + mz * mz);
    all.push([mx / len * phi, my / len * phi, mz / len * phi]);
  }
  const atoms = [];
  for (const p of all) {
    const len = Math.sqrt(p[0] ** 2 + p[1] ** 2 + p[2] ** 2);
    atoms.push([p[0] / len * r, p[1] / len * r, p[2] / len * r]);
  }
  return atoms.slice(0, 60);
}
const FULLERENE_ATOMS = buildFullereneAtoms();
const FULLERENE_BONDS = [];
for (let i = 0; i < FULLERENE_ATOMS.length; i++) {
  for (let j = i + 1; j < FULLERENE_ATOMS.length; j++) {
    const [ax, ay, az] = FULLERENE_ATOMS[i];
    const [bx, by, bz] = FULLERENE_ATOMS[j];
    const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
    if (d < 0.55) FULLERENE_BONDS.push([i, j]);
  }
}
function buildGraphiteAtoms() {
  const layers = [];
  const zOffsets = [-0.8, 0, 0.8];
  const hexCenters = [
    [0, 0],
    [2, 0],
    [-2, 0],
    [1, 1.73],
    [-1, 1.73],
    [1, -1.73],
    [-1, -1.73]
  ];
  for (const z of zOffsets) {
    for (const [cx, cy] of hexCenters) {
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i;
        layers.push([
          cx + Math.cos(angle) * 0.5,
          cy + Math.sin(angle) * 0.5,
          z
        ]);
      }
    }
  }
  return layers;
}
const GRAPHITE_ATOMS = buildGraphiteAtoms();
const GRAPHITE_BONDS = [];
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
function buildGrapheneAtoms() {
  const atoms = [];
  const hexCenters = [
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
    [0, -3.46]
  ];
  for (const [cx, cy] of hexCenters) {
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i;
      atoms.push([cx + Math.cos(angle) * 0.5, cy + Math.sin(angle) * 0.5, 0]);
    }
  }
  const unique = [];
  for (const a of atoms) {
    if (!unique.some(
      (u) => Math.abs(u[0] - a[0]) < 0.05 && Math.abs(u[1] - a[1]) < 0.05
    )) {
      unique.push(a);
    }
  }
  return unique;
}
const GRAPHENE_ATOMS = buildGrapheneAtoms();
const GRAPHENE_BONDS = [];
for (let i = 0; i < GRAPHENE_ATOMS.length; i++) {
  for (let j = i + 1; j < GRAPHENE_ATOMS.length; j++) {
    const [ax, ay] = GRAPHENE_ATOMS[i];
    const [bx, by] = GRAPHENE_ATOMS[j];
    const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
    if (d < 0.55) GRAPHENE_BONDS.push([i, j]);
  }
}
function rotatePoint(x, y, z, rx, ry) {
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
function project(x, y, z, fov) {
  const scale = fov / (fov + z);
  return [x * scale, y * scale, z];
}
const Scene3D = reactExports.memo(function Scene3D2({
  atoms,
  bonds,
  atomColor,
  bondColor,
  atomGlow,
  scale = 80,
  autoRotateSpeed = [2e-3, 4e-3, 0],
  initialRot = [0.3, 0.4],
  fov = 5,
  className,
  isHovered = false
}) {
  const canvasRef = reactExports.useRef(null);
  const rotRef = reactExports.useRef([...initialRot]);
  const velRef = reactExports.useRef([0, 0]);
  const isDragging = reactExports.useRef(false);
  const lastPointer = reactExports.useRef([0, 0]);
  const rafRef = reactExports.useRef(0);
  const isHoveredRef = reactExports.useRef(isHovered);
  const animLevel = getAnimationLevel();
  reactExports.useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);
  const draw = reactExports.useCallback(() => {
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
    const projected = atoms.map(
      ([ax, ay, az]) => {
        const [rx2, ry2, rz2] = rotatePoint(ax, ay, az, rx, ry);
        const [px, py, pz] = project(rx2, ry2, rz2, fov);
        return { sx: cx + px * scale, sy: cy + py * scale, z: pz };
      }
    );
    const atomOrder = projected.map((_, i) => i).sort((a, b) => projected[a].z - projected[b].z);
    ctx.lineWidth = 1.5;
    for (const [ai, bi] of bonds) {
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
            `${alpha * (isHoveredRef.current ? 0.55 : 0.4)})`
          )
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
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const size = canvas.getBoundingClientRect();
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);
  reactExports.useEffect(() => {
    let lastTime = 0;
    const loop = (time) => {
      rafRef.current = requestAnimationFrame(loop);
      if (document.visibilityState === "hidden") return;
      const dt = Math.min(time - lastTime, 32);
      lastTime = time;
      if (!isDragging.current && !isHoveredRef.current) {
        rotRef.current[0] += autoRotateSpeed[0] * dt * 0.3;
        rotRef.current[1] += autoRotateSpeed[1] * dt * 0.3;
      } else if (!isDragging.current) {
        rotRef.current[0] += velRef.current[0];
        rotRef.current[1] += velRef.current[1];
        velRef.current[0] *= 0.92;
        velRef.current[1] *= 0.92;
      } else {
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
  const handlePointerDown = reactExports.useCallback(
    (e) => {
      if (animLevel === "minimal") return;
      isDragging.current = true;
      lastPointer.current = [e.clientX, e.clientY];
      e.target.setPointerCapture(e.pointerId);
    },
    [animLevel]
  );
  const handlePointerMove = reactExports.useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current[0];
    const dy = e.clientY - lastPointer.current[1];
    lastPointer.current = [e.clientX, e.clientY];
    const speed = 8e-3;
    velRef.current[1] = dx * speed;
    velRef.current[0] = dy * speed;
    rotRef.current[1] += dx * speed;
    rotRef.current[0] += dy * speed;
  }, []);
  const handlePointerUp = reactExports.useCallback(() => {
    isDragging.current = false;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: cn(
        "touch-none cursor-grab active:cursor-grabbing block",
        className
      ),
      style: { willChange: "transform", margin: "auto" },
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp
    }
  );
});
const ALLOTROPE_GLOW_STYLES = {
  diamond: {
    normal: "0 0 40px rgba(147,210,255,0.7), 0 0 80px rgba(147,210,255,0.3), 0 4px 24px rgba(0,0,0,0.3)",
    hover: "0 0 60px rgba(147,210,255,0.9), 0 0 110px rgba(147,210,255,0.45), 0 4px 32px rgba(0,0,0,0.4)"
  },
  graphite: {
    normal: "0 0 35px rgba(160,160,160,0.6), 0 0 70px rgba(120,120,120,0.2), 0 4px 24px rgba(0,0,0,0.3)",
    hover: "0 0 55px rgba(180,180,180,0.8), 0 0 95px rgba(140,140,140,0.35), 0 4px 32px rgba(0,0,0,0.4)"
  },
  graphene: {
    normal: "0 0 45px rgba(0,255,150,0.7), 0 0 90px rgba(0,200,100,0.3), 0 4px 24px rgba(0,0,0,0.3)",
    hover: "0 0 65px rgba(0,255,150,0.95), 0 0 120px rgba(0,220,110,0.45), 0 4px 32px rgba(0,0,0,0.4)"
  },
  fullerene: {
    normal: "0 0 40px rgba(180,100,255,0.6), 0 0 80px rgba(150,50,255,0.2), 0 4px 24px rgba(0,0,0,0.3)",
    hover: "0 0 60px rgba(200,120,255,0.85), 0 0 110px rgba(160,70,255,0.35), 0 4px 32px rgba(0,0,0,0.4)"
  },
  nanotube: {
    normal: "0 0 40px rgba(0,210,210,0.6), 0 0 80px rgba(0,180,180,0.25), 0 4px 24px rgba(0,0,0,0.3)",
    hover: "0 0 60px rgba(0,240,240,0.85), 0 0 110px rgba(0,210,210,0.4), 0 4px 32px rgba(0,0,0,0.4)"
  }
};
const ALLOTROPE_VISUALS = [
  {
    id: "diamond",
    atoms: DIAMOND_ATOMS,
    bonds: DIAMOND_BONDS,
    atomColor: "rgba(200,230,255,0.9)",
    bondColor: "rgba(147,210,255,0.75)",
    atomGlow: "rgba(147,210,255,0.6)",
    scale: 62,
    autoRotateSpeed: [1e-3, 3e-3, 0],
    initialRot: [0.4, 0.5]
  },
  {
    id: "graphite",
    atoms: GRAPHITE_ATOMS,
    bonds: GRAPHITE_BONDS,
    atomColor: "rgba(180,180,180,0.85)",
    bondColor: "rgba(160,160,160,0.65)",
    atomGlow: "rgba(180,180,180,0.5)",
    scale: 18,
    autoRotateSpeed: [5e-4, 25e-4, 0],
    initialRot: [0.6, 0.3]
  },
  {
    id: "graphene",
    atoms: GRAPHENE_ATOMS,
    bonds: GRAPHENE_BONDS,
    atomColor: "rgba(0,255,150,0.9)",
    bondColor: "rgba(0,230,130,0.65)",
    atomGlow: "rgba(0,255,150,0.7)",
    scale: 14,
    autoRotateSpeed: [1e-3, 2e-3, 0],
    initialRot: [0.25, 0.1]
  },
  {
    id: "fullerene",
    atoms: FULLERENE_ATOMS,
    bonds: FULLERENE_BONDS,
    atomColor: "rgba(200,130,255,0.9)",
    bondColor: "rgba(180,100,255,0.65)",
    atomGlow: "rgba(200,120,255,0.6)",
    scale: 72,
    autoRotateSpeed: [15e-4, 3e-3, 8e-4],
    initialRot: [0.3, 0.2]
  },
  {
    id: "nanotube",
    // Re-use graphite atoms — tilted for cylindrical visual effect
    atoms: GRAPHITE_ATOMS,
    bonds: GRAPHITE_BONDS,
    atomColor: "rgba(0,240,240,0.9)",
    bondColor: "rgba(0,200,200,0.65)",
    atomGlow: "rgba(0,220,220,0.7)",
    scale: 18,
    autoRotateSpeed: [5e-4, 3e-3, 8e-4],
    initialRot: [1.1, 0.3]
  }
];
const AllotropeViewer = reactExports.memo(function AllotropeViewer2({ id }) {
  const cfg = ALLOTROPE_VISUALS.find((v) => v.id === id);
  const animLevel = getAnimationLevel();
  const [hovered, setHovered] = reactExports.useState(false);
  const labelMap = {
    diamond: "8 atoms · 14 bonds · Drag to rotate",
    graphite: "Layered hex lattice · 3 layers · Drag to rotate",
    graphene: "2D hex lattice · Single layer · Drag to tilt",
    fullerene: "60 atoms · Drag for full 3D rotation",
    nanotube: "Cylindrical lattice · Drag to rotate"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full flex flex-col items-center justify-center overflow-hidden",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onTouchStart: () => setHovered(true),
      onTouchEnd: () => setHovered(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Scene3D,
          {
            atoms: cfg.atoms,
            bonds: cfg.bonds,
            atomColor: cfg.atomColor,
            bondColor: cfg.bondColor,
            atomGlow: cfg.atomGlow,
            scale: cfg.scale,
            autoRotateSpeed: animLevel === "minimal" ? [0, 1e-3, 0] : cfg.autoRotateSpeed,
            initialRot: cfg.initialRot,
            fov: 5,
            isHovered: hovered,
            className: "w-full h-full"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-2 left-0 right-0 text-center text-[10px] text-muted-foreground/50 pointer-events-none select-none", children: labelMap[id] ?? "Drag to rotate" })
      ]
    }
  );
});
const ALLOTROPES = [
  {
    id: "diamond",
    name: "Diamond",
    shortName: "💎 Diamond",
    color: "from-sky-300/60 to-indigo-400/60",
    glowColor: "rgba(147,210,255,0.5)",
    structure: "3D tetrahedral covalent network — each carbon bonded to 4 others",
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
      "🪟 Optical windows for X-ray machines and high-power lasers"
    ],
    funFact: "A diamond is a single giant molecule. The covalent bonds extend throughout the entire crystal — every atom is connected to every other atom."
  },
  {
    id: "graphite",
    name: "Graphite",
    shortName: "🪨 Graphite",
    color: "from-slate-400/60 to-zinc-600/60",
    glowColor: "rgba(160,160,160,0.4)",
    structure: "Flat hexagonal layers — carbon atoms in planes, weakly held between layers",
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
      "☢️ Moderator in nuclear reactors"
    ],
    funFact: "A standard HB pencil can draw a line 56 km long and write about 45,000 words before running out of graphite."
  },
  {
    id: "graphene",
    name: "Graphene",
    shortName: "⚡ Graphene",
    color: "from-teal-400/60 to-cyan-500/60",
    glowColor: "rgba(0,255,150,0.4)",
    structure: "Single atom-thick hexagonal lattice — 2D material, one layer of graphite",
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
      "🔋 Energy storage: next-gen supercapacitors and batteries"
    ],
    funFact: "A graphene hammock the size of a football field would weigh only 1 mg, yet could support a 4 kg cat."
  },
  {
    id: "fullerene",
    name: "Fullerene C₆₀",
    shortName: "⚽ C₆₀",
    color: "from-amber-400/60 to-orange-500/60",
    glowColor: "rgba(180,100,255,0.4)",
    structure: "Hollow spherical cage of 60 carbon atoms — 20 hexagons + 12 pentagons",
    hardness: "Soft solid — molecules held by weak van der Waals forces",
    conductivity: "Semiconductor; can be made superconducting when doped",
    bondType: "Mixed sp² hybridisation",
    discovery: "Discovered 1985 by Kroto, Curl & Smalley (Nobel Prize 1996)",
    description: "Hollow C₆₀ cage molecule",
    uses: [
      "💊 Drug delivery — hollow cage encapsulates drug molecules for targeted therapy",
      "🧪 Antioxidant research — scavenges free radicals in biological systems",
      "⚙️ Lubricant additive — near-frictionless nanoscale rolling",
      "☀️ Solar cell research — improves organic photovoltaic efficiency"
    ],
    funFact: "C₆₀ resembles a soccer ball and was nicknamed 'Buckminster Fullerene' after architect Buckminster Fuller, who designed geodesic domes of the same shape."
  },
  {
    id: "nanotube",
    name: "Carbon Nanotube",
    shortName: "⚡ CNT",
    color: "from-cyan-400/60 to-teal-500/60",
    glowColor: "rgba(0,210,210,0.4)",
    structure: "Cylindrical arrangement of carbon hexagons — essentially rolled-up graphene. Single-walled (SWCNT) or multi-walled (MWCNT).",
    hardness: "Tensile strength ~100× stronger than steel at 1/6th the weight",
    conductivity: "Metallic or semiconducting depending on chirality — exceptional electron transport",
    bondType: "sp² (graphene-like, rolled into cylinder)",
    discovery: "First described by Iijima in 1991 (multi-walled); single-walled by Bethune & Iijima, 1993",
    description: "Rolled graphene cylinder",
    uses: [
      "🖥️ Nano-transistors — smaller, faster than silicon chips",
      "🏗️ Ultra-strong materials — 100× stronger than steel at 1/6th the weight",
      "🛡️ EMI shielding for electronics & military equipment",
      "💊 Drug delivery nanocarriers for cancer treatment",
      "⚡ Hydrogen storage for fuel cell vehicles"
    ],
    funFact: "A CNT 1 mm long contains ~4 million carbon rings. Electrical conductivity can exceed copper; tensile strength surpasses any natural material."
  }
];
const AllotropeViewerCard = reactExports.memo(function AllotropeViewerCard2({
  activeId,
  activeAllotrope
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  const glowStyles = ALLOTROPE_GLOW_STYLES[activeId] ?? ALLOTROPE_GLOW_STYLES.diamond;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "glass-carbon rounded-2xl overflow-hidden flex flex-col",
        "border border-border/20 transition-all duration-200"
      ),
      style: {
        // FIX 2: per-allotrope glow color + hover intensification
        boxShadow: hovered ? glowStyles.hover : glowStyles.normal,
        // FIX 4: scale on hover
        transform: hovered ? "scale(1.035)" : "scale(1)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        // FIX 1: ensure container doesn't clip canvas
        contain: "layout paint"
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onTouchStart: () => setHovered(true),
      onTouchEnd: () => setHovered(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden",
            style: {
              // Responsive height with centering
              minHeight: "clamp(180px, 28vw, 260px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AllotropeViewer, { id: activeId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
                  style: {
                    background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.2s ease"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-14 left-0 right-0 text-center px-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-display font-bold text-white drop-shadow", children: activeAllotrope.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/70 mt-0.5", children: activeAllotrope.description })
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 text-center border-t border-border/10 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold mb-0.5", children: activeAllotrope.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: activeAllotrope.bondType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "mt-2 text-xs px-3 py-1 rounded-full inline-block bg-gradient-to-r to-transparent border border-border/20",
                activeAllotrope.color
              ),
              children: "Interactive 3D · Drag to rotate"
            }
          )
        ] })
      ]
    }
  );
});
const CarbonAllotropes = reactExports.memo(function CarbonAllotropes2() {
  const [activeId, setActiveId] = reactExports.useState("diamond");
  const activeAllotrope = ALLOTROPES.find((a) => a.id === activeId) ?? ALLOTROPES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "carbon.allotropes_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap justify-center gap-2 mb-8 relative",
        "data-ocid": "carbon.allotrope_tabs",
        role: "tablist",
        children: ALLOTROPES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": activeId === a.id,
            whileHover: { scale: 1.04 },
            whileTap: { scale: 0.97 },
            onClick: () => setActiveId(a.id),
            className: "relative glass-carbon rounded-2xl px-5 py-2.5 text-sm font-medium transition-colors duration-200",
            "data-ocid": `carbon.tab.${a.id}`,
            children: [
              activeId === a.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  layoutId: "allotrope-pill",
                  className: cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-r border border-border/30 shadow-lg",
                    a.color
                  ),
                  transition: { type: "spring", stiffness: 400, damping: 30 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: a.shortName })
            ]
          },
          a.id
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -8, scale: 0.98 },
          transition: { duration: 0.3, ease: "easeOut" },
          className: "grid md:grid-cols-[280px_1fr] gap-6",
          "data-ocid": `carbon.allotrope_panel.${activeId}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AllotropeViewerCard,
              {
                activeId,
                activeAllotrope
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: [
                { label: "Hardness", value: activeAllotrope.hardness },
                {
                  label: "Conductivity",
                  value: activeAllotrope.conductivity
                },
                { label: "Discovery", value: activeAllotrope.discovery },
                { label: "Bond Type", value: activeAllotrope.bondType }
              ].map(({ label, value }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: i * 0.06 },
                  className: "glass-carbon rounded-xl p-3 hover:bg-card/30 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground leading-snug", children: value })
                  ]
                },
                label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.24 },
                  className: "glass-carbon rounded-xl p-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Crystal Structure" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed", children: activeAllotrope.structure })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3 },
                  className: "glass-carbon rounded-xl p-4",
                  "data-ocid": `carbon.uses_card.${activeId}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Real-World Uses" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: activeAllotrope.uses.map((use) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start gap-2 text-sm text-foreground/80 leading-snug",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs mt-0.5 flex-shrink-0", children: "→" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: use })
                        ]
                      },
                      use
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.36 },
                  className: cn(
                    "rounded-xl p-4 bg-gradient-to-br border border-border/20",
                    activeAllotrope.color
                  ),
                  "data-ocid": `carbon.fun_fact.${activeId}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider mb-2 text-foreground/80", children: "🌟 Did You Know?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed", children: activeAllotrope.funFact })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.42 },
                  className: "rounded-xl p-4 border border-amber-400/40 bg-amber-500/5",
                  "data-ocid": "carbon.exam_note",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold uppercase tracking-wider mb-2 text-amber-400", children: "📝 Exam Tip" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/90 leading-relaxed", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-300", children: "Graphite" }),
                      " conducts electricity due to",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-300", children: "delocalised π electrons" }),
                      " ",
                      "between layers — but",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-300", children: "diamond" }),
                      " does",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-red-400", children: "not" }),
                      " (all 4 valence electrons are in covalent bonds, none free to move). This is a",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-300", children: "common exam trap" }),
                      " — both are pure carbon, but their structures give completely opposite electrical properties."
                    ] })
                  ]
                }
              )
            ] })
          ]
        },
        activeId
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mt-10 glass-carbon rounded-2xl overflow-hidden",
          "data-ocid": "carbon.comparison_table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Allotrope Comparison" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/10", children: ["Allotrope", "Bond Type", "Hardness", "Conductivity"].map(
                (h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: cn(
                      "text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider",
                      i >= 2 && "hidden sm:table-cell",
                      i === 3 && "hidden md:table-cell"
                    ),
                    children: h
                  },
                  h
                )
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: ALLOTROPES.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.tr,
                {
                  initial: { opacity: 0, x: -10 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.08 },
                  className: cn(
                    "border-b border-border/10 hover:bg-card/20 transition-colors cursor-pointer",
                    activeId === a.id ? "bg-card/30" : ""
                  ),
                  onClick: () => setActiveId(a.id),
                  "data-ocid": `carbon.comparison_row.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-foreground", children: [
                      a.shortName,
                      " ",
                      a.name
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs max-w-[160px]", children: a.bondType }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell", children: a.hardness.split("—")[0].trim() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs hidden md:table-cell", children: a.conductivity.split(",")[0].trim() })
                  ]
                },
                a.id
              )) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mt-6 grid sm:grid-cols-3 gap-4",
          "data-ocid": "carbon.facts_section",
          children: [
            {
              value: "~10 million",
              label: "Known carbon compounds",
              sub: "More than all other elements combined"
            },
            {
              value: "15th",
              label: "Most abundant in Earth's crust",
              sub: "Despite being the basis of all life"
            },
            {
              value: "3,500°C",
              label: "Diamond's melting point",
              sub: "Highest of any element at room pressure"
            }
          ].map(({ value, label, sub }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              whileHover: { scale: 1.02, y: -2 },
              className: "glass-carbon rounded-2xl p-5 text-center transition-shadow hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground mb-1", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-1", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: sub })
              ]
            },
            label
          ))
        }
      )
    ] })
  ] });
});
const HYBRIDIZATIONS = [
  {
    type: "sp³",
    color: "from-sky-400/20 to-indigo-500/20",
    border: "border-sky-400/30",
    accent: "text-sky-300",
    glow: "oklch(0.72 0.22 220 / 0.3)",
    geometry: "Tetrahedral",
    angle: "109.5°",
    orbital: "One s + three p orbitals mix",
    examples: ["Methane (CH₄)", "Ethane (C₂H₆)", "Diamond lattice"],
    structure: "H₃C — C bonds pointing to 4 corners of a tetrahedron",
    realWorld: "Diamond hardness, saturated hydrocarbons, polymers",
    detail: "All four bonds are equivalent σ bonds. No free π electrons — this is why diamond is an insulator. Alkanes (CₙH₂ₙ₊₂) are all sp³ hybridised."
  },
  {
    type: "sp²",
    color: "from-teal-400/20 to-cyan-500/20",
    border: "border-teal-400/30",
    accent: "text-teal-300",
    glow: "oklch(0.72 0.25 190 / 0.3)",
    geometry: "Trigonal Planar",
    angle: "120°",
    orbital: "One s + two p orbitals mix; one p remains unhybridised",
    examples: ["Ethene (C₂H₄)", "Benzene (C₆H₆)", "Graphene layer"],
    structure: "Three σ bonds in a plane + one π bond perpendicular",
    realWorld: "Graphene conductivity, alkenes, aromatic rings, polymers",
    detail: "The unhybridised p orbital forms the π bond. Graphene's delocalised π electrons make it an exceptional conductor. Alkenes (CₙH₂ₙ) are sp² hybridised."
  },
  {
    type: "sp",
    color: "from-violet-400/20 to-purple-500/20",
    border: "border-violet-400/30",
    accent: "text-violet-300",
    glow: "oklch(0.65 0.22 290 / 0.3)",
    geometry: "Linear",
    angle: "180°",
    orbital: "One s + one p mix; two p orbitals remain unhybridised",
    examples: [
      "Ethyne (C₂H₂ / acetylene)",
      "Carbon dioxide (CO₂)",
      "Nitriles (R-C≡N)"
    ],
    structure: "Two σ bonds + two π bonds → triple bond total",
    realWorld: "Oxy-acetylene welding (3500°C flame), organic synthesis",
    detail: "Two unhybridised p orbitals form two perpendicular π bonds, giving a triple bond. Alkynes (CₙH₂ₙ₋₂) are sp hybridised. CO₂ is linear for the same reason."
  }
];
const ORGANIC_SERIES = [
  {
    name: "Alkanes",
    formula: "CₙH₂ₙ₊₂",
    bond: "Single C-C bond (σ only)",
    color: "from-orange-400/20 to-amber-400/20",
    border: "border-orange-400/30",
    accent: "text-orange-300",
    members: [
      {
        name: "Methane",
        formula: "CH₄",
        use: "Natural gas fuel, greenhouse gas"
      },
      {
        name: "Ethane",
        formula: "C₂H₆",
        use: "Refrigerant, petrochemical feedstock"
      },
      {
        name: "Propane",
        formula: "C₃H₈",
        use: "LPG cooking gas, camping fuel"
      },
      {
        name: "Butane",
        formula: "C₄H₁₀",
        use: "Lighter fuel, aerosol propellant"
      }
    ],
    properties: "Non-polar, insoluble in water, low reactivity, good fuels",
    reactions: "Combustion, halogenation (free radical), cracking"
  },
  {
    name: "Alkenes",
    formula: "CₙH₂ₙ",
    bond: "C=C double bond (σ + π)",
    color: "from-green-400/20 to-emerald-400/20",
    border: "border-green-400/30",
    accent: "text-green-300",
    members: [
      {
        name: "Ethene",
        formula: "C₂H₄",
        use: "Polyethylene (plastic bags), fruit ripening hormone"
      },
      {
        name: "Propene",
        formula: "C₃H₆",
        use: "Polypropylene, acetone production"
      },
      {
        name: "But-1-ene",
        formula: "C₄H₈",
        use: "Synthetic rubber, fuel additive"
      },
      { name: "But-2-ene", formula: "C₄H₈", use: "Shows cis-trans isomerism" }
    ],
    properties: "More reactive than alkanes, electrophilic addition reactions",
    reactions: "Hydrogenation, halogenation, hydration (→ alcohol), polymerization"
  },
  {
    name: "Alkynes",
    formula: "CₙH₂ₙ₋₂",
    bond: "C≡C triple bond (σ + 2π)",
    color: "from-violet-400/20 to-purple-400/20",
    border: "border-violet-400/30",
    accent: "text-violet-300",
    members: [
      {
        name: "Ethyne (Acetylene)",
        formula: "C₂H₂",
        use: "Oxy-acetylene welding, organic synthesis"
      },
      {
        name: "Propyne",
        formula: "C₃H₄",
        use: "Specialty fuel, chemical intermediate"
      },
      {
        name: "But-1-yne",
        formula: "C₄H₆",
        use: "Synthesis of rubber, chemicals"
      },
      { name: "But-2-yne", formula: "C₄H₆", use: "Laboratory reagent" }
    ],
    properties: "Most reactive of the three series, acidic terminal H",
    reactions: "Hydrogenation (→ alkene/alkane), halogenation, hydration (Markovnikov)"
  }
];
const FUNCTIONAL_GROUPS = [
  {
    name: "Alcohol",
    group: "–OH",
    example: "Ethanol (C₂H₅OH)",
    color: "from-blue-400/20",
    accent: "text-blue-300",
    reaction: "Oxidation → aldehyde/acid; Esterification with acids; Dehydration → alkene",
    use: "Beverages, antiseptic, solvent, fuel (bioethanol)"
  },
  {
    name: "Aldehyde",
    group: "–CHO",
    example: "Ethanal (CH₃CHO)",
    color: "from-yellow-400/20",
    accent: "text-yellow-300",
    reaction: "Oxidation → carboxylic acid; Reduction → alcohol; Tollens' / Fehling's test",
    use: "Preservative (formaldehyde), flavouring, synthesis intermediate"
  },
  {
    name: "Ketone",
    group: "C=O",
    example: "Propanone/Acetone (CH₃COCH₃)",
    color: "from-pink-400/20",
    accent: "text-pink-300",
    reaction: "Reduction → secondary alcohol; Nucleophilic addition; Aldol condensation",
    use: "Nail polish remover, solvent, paint thinner"
  },
  {
    name: "Carboxylic Acid",
    group: "–COOH",
    example: "Acetic acid (CH₃COOH)",
    color: "from-red-400/20",
    accent: "text-red-300",
    reaction: "Esterification with alcohol; Neutralisation with base; Decarboxylation",
    use: "Vinegar (acetic acid), aspirin, polymer production"
  },
  {
    name: "Amine",
    group: "–NH₂",
    example: "Methylamine (CH₃NH₂)",
    color: "from-teal-400/20",
    accent: "text-teal-300",
    reaction: "Acts as base; Reaction with acids → ammonium salt; Acylation",
    use: "Nylon, dyes, pharmaceuticals, amino acids"
  },
  {
    name: "Ester",
    group: "–COO–",
    example: "Ethyl acetate (CH₃COOC₂H₅)",
    color: "from-orange-400/20",
    accent: "text-orange-300",
    reaction: "Hydrolysis (acid or base) → acid + alcohol; Transesterification",
    use: "Fruit flavours, perfumes, solvents, biodiesel"
  }
];
const ISOMERISM_TYPES = [
  {
    name: "Chain Isomerism",
    category: "Structural",
    accent: "text-sky-300",
    border: "border-sky-400/30",
    bg: "from-sky-400/10",
    description: "Same molecular formula, different carbon chain arrangement (branching).",
    example: "C₄H₁₀ — Butane vs 2-Methylpropane",
    structures: [
      { label: "n-Butane", diagram: "CH₃ – CH₂ – CH₂ – CH₃  (straight chain)" },
      {
        label: "2-Methylpropane",
        diagram: "      CH₃\n       |\nCH₃ – CH – CH₃  (branched)"
      }
    ],
    note: "Branched isomers have lower boiling points — less surface area, weaker van der Waals."
  },
  {
    name: "Position Isomerism",
    category: "Structural",
    accent: "text-green-300",
    border: "border-green-400/30",
    bg: "from-green-400/10",
    description: "Same functional group, different position on the chain.",
    example: "C₃H₇OH — Propan-1-ol vs Propan-2-ol",
    structures: [
      { label: "Propan-1-ol", diagram: "CH₃ – CH₂ – CH₂ – OH  (–OH on C1)" },
      { label: "Propan-2-ol", diagram: "CH₃ – CH(OH) – CH₃  (–OH on C2)" }
    ],
    note: "JEE tip: also applies to halides, alkenes, alkynes — count the position from the nearest end."
  },
  {
    name: "Functional Group Isomerism",
    category: "Structural",
    accent: "text-amber-300",
    border: "border-amber-400/30",
    bg: "from-amber-400/10",
    description: "Same molecular formula, different functional groups.",
    example: "C₂H₆O — Ethanol vs Dimethyl ether",
    structures: [
      { label: "Ethanol", diagram: "CH₃ – CH₂ – OH  (alcohol)" },
      { label: "Dimethyl ether", diagram: "CH₃ – O – CH₃  (ether)" }
    ],
    note: "Ethanol boils at 78°C; dimethyl ether at −24°C — dramatic property difference despite same formula."
  },
  {
    name: "Geometrical (Cis-Trans) Isomerism",
    category: "Stereoisomerism",
    accent: "text-violet-300",
    border: "border-violet-400/30",
    bg: "from-violet-400/10",
    description: "Different spatial arrangement around a C=C double bond (restricted rotation).",
    example: "But-2-ene (C₄H₈) — cis vs trans",
    structures: [
      {
        label: "cis-But-2-ene",
        diagram: " CH₃   CH₃\n    \\ /\n     C = C\n    / \\\n   H   H  (same groups on same side)"
      },
      {
        label: "trans-But-2-ene",
        diagram: " CH₃   H\n    \\ /\n     C = C\n    / \\\n   H   CH₃  (same groups on opposite sides)"
      }
    ],
    note: "Condition: each doubly bonded carbon must have two different substituents. cis and trans have different physical/chemical properties."
  }
];
function CollapsibleCard({
  title,
  accent,
  border,
  bg,
  children,
  ocid
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      whileHover: { y: -2, scale: 1.005 },
      transition: { duration: 0.2 },
      className: cn(
        "glass-carbon rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg",
        border
      ),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(!open),
            className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/20 transition-colors",
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-semibold text-sm", accent), children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  animate: { rotate: open ? 180 : 0 },
                  transition: { duration: 0.2 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.28, ease: "easeInOut" },
            className: cn(
              "border-t border-border/20 bg-gradient-to-br to-transparent px-5 py-4",
              bg
            ),
            children
          }
        ) })
      ]
    }
  );
}
const CarbonHybridization = reactExports.memo(function CarbonHybridization2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-4",
      "data-ocid": "carbon.hybridization_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Hybridization of Carbon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xl mx-auto", children: "Carbon's four valence electrons can hybridise into sp³, sp², or sp orbitals — each giving a completely different molecular geometry and property set." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4", children: HYBRIDIZATIONS.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
            whileHover: { y: -4, scale: 1.02 },
            className: cn(
              "glass-carbon rounded-2xl p-5 border space-y-3 transition-shadow hover:shadow-lg cursor-default",
              h.border
            ),
            style: { "--glow": h.glow },
            "data-ocid": `carbon.hybridization.${h.type.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-3xl font-display font-black", h.accent), children: h.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gradient-to-r to-transparent border",
                    h.color,
                    h.border
                  ),
                  children: [
                    h.geometry,
                    " · ",
                    h.angle
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: h.orbital }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono bg-card/30 rounded-lg px-3 py-2 text-foreground/80", children: h.structure }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5", children: "Examples" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: h.examples.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-1.5 text-xs text-foreground/80",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-accent flex-shrink-0" }),
                      ex
                    ]
                  },
                  ex
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "text-xs rounded-lg px-3 py-2 bg-gradient-to-br to-transparent border",
                    h.color,
                    h.border,
                    h.accent
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Real world: " }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: h.realWorld })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: h.detail })
            ]
          },
          h.type
        )) })
      ]
    }
  );
});
const CarbonOrganicBasics = reactExports.memo(function CarbonOrganicBasics2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-4",
      "data-ocid": "carbon.organic_basics_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Organic Homologous Series" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xl mx-auto", children: "Alkanes, alkenes, and alkynes form three core series. Each member differs by CH₂ and shows a gradual change in physical properties." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ORGANIC_SERIES.map((series, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.1, duration: 0.4 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CollapsibleCard,
              {
                title: `${series.name} · ${series.formula} · ${series.bond}`,
                accent: series.accent,
                border: series.border,
                bg: series.color,
                ocid: `carbon.organic.${series.name.toLowerCase()}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Members" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: series.members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "glass-carbon rounded-lg px-3 py-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: m.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: cn("font-mono text-xs", series.accent),
                                children: m.formula
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: m.use })
                        ]
                      },
                      m.name
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Properties" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80", children: series.properties })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Key Reactions" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80", children: series.reactions })
                    ] })
                  ] })
                ] })
              }
            )
          },
          series.name
        )) })
      ]
    }
  );
});
const CarbonFunctionalGroups = reactExports.memo(function CarbonFunctionalGroups2() {
  const [active, setActive] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-4",
      "data-ocid": "carbon.functional_groups_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Functional Groups" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xl mx-auto", children: "A functional group determines the characteristic reactions of an organic compound. Tap a card to expand." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: FUNCTIONAL_GROUPS.map((fg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07, duration: 0.35 },
            whileHover: { y: -3, scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: () => setActive(active === fg.name ? null : fg.name),
            className: cn(
              "glass-carbon rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg",
              active === fg.name ? "ring-1 ring-border/40" : ""
            ),
            "data-ocid": `carbon.fg.${fg.name.toLowerCase().replace(/\s+/g, "_")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "px-4 py-3 bg-gradient-to-r to-transparent",
                    fg.color
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: fg.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-mono text-lg font-bold", fg.accent), children: fg.group })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground text-right", children: fg.example.split("(")[0].trim() })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: active === fg.name && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.25, ease: "easeInOut" },
                  className: "px-4 py-3 space-y-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Example" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-foreground/80", children: fg.example })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Reactions" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/80", children: fg.reaction })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Uses" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/80", children: fg.use })
                    ] })
                  ]
                }
              ) })
            ]
          },
          fg.name
        )) })
      ]
    }
  );
});
const CarbonIsomerism = reactExports.memo(function CarbonIsomerism2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-4",
      "data-ocid": "carbon.isomerism_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Isomerism" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xl mx-auto", children: "Compounds with the same molecular formula but different arrangements — structural or spatial." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: ISOMERISM_TYPES.map((iso, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: i % 2 === 0 ? -24 : 24 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.1, duration: 0.4 },
            whileHover: { y: -3, scale: 1.01 },
            className: cn(
              "glass-carbon rounded-2xl p-5 border space-y-3 hover:shadow-lg transition-shadow cursor-default",
              iso.border
            ),
            "data-ocid": `carbon.isomerism.${iso.name.split(" ")[0].toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-display font-bold text-lg", iso.accent), children: iso.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full glass text-muted-foreground", children: iso.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: iso.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-foreground/70", children: [
                "Example: ",
                iso.example
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: iso.structures.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "rounded-xl p-3 bg-gradient-to-br to-transparent border",
                    iso.bg,
                    iso.border
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mb-1.5", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono text-foreground/70 whitespace-pre-wrap leading-relaxed", children: s.diagram })
                  ]
                },
                s.label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "text-xs px-3 py-2 rounded-lg bg-gradient-to-r to-transparent border",
                    iso.bg,
                    iso.border
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("font-semibold", iso.accent), children: [
                      "💡 JEE/NEET:",
                      " "
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: iso.note })
                  ]
                }
              )
            ]
          },
          iso.name
        )) })
      ]
    }
  );
});
const ALL_REACTIONS = [
  // Combustion
  {
    id: 1,
    name: "Complete combustion of methane",
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation: "Produces CO₂ and H₂O. Primary reaction in natural gas appliances and power generation."
  },
  {
    id: 2,
    name: "Incomplete combustion of methane",
    equation: "2CH₄ + 3O₂ → 2CO + 4H₂O",
    type: "Combustion",
    conditions: "Limited oxygen",
    explanation: "Produces toxic carbon monoxide. Dangerous in poorly ventilated spaces."
  },
  {
    id: 3,
    name: "Combustion of ethane",
    equation: "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation: "Ethane burns with a clean blue flame. Used in liquid petroleum gas mixtures."
  },
  {
    id: 4,
    name: "Combustion of propane",
    equation: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation: "LPG combustion reaction. Propane has high energy density, ideal for portable fuels."
  },
  {
    id: 5,
    name: "Combustion of ethanol",
    equation: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O",
    type: "Combustion",
    conditions: "Excess oxygen, ignition",
    explanation: "Bioethanol as renewable fuel. Burns cleanly compared to petrol."
  },
  {
    id: 6,
    name: "Combustion of glucose",
    equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    type: "Combustion",
    conditions: "Biological (cellular respiration)",
    explanation: "The fundamental energy-releasing reaction in living cells. ΔH = −2803 kJ/mol."
  },
  {
    id: 7,
    name: "Combustion of acetylene",
    equation: "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    type: "Combustion",
    conditions: "Oxygen, spark; temp 3500°C",
    explanation: "Oxy-acetylene welding reaches 3500°C — hot enough to cut through steel."
  },
  {
    id: 8,
    name: "Combustion of benzene",
    equation: "2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation: "Benzene burns with a smoky yellow flame due to its high carbon content."
  },
  // Addition Reactions
  {
    id: 9,
    name: "Hydrogenation of ethene",
    equation: "C₂H₄ + H₂ → C₂H₆",
    type: "Addition",
    conditions: "Ni catalyst, 150°C",
    explanation: "Adds H₂ across the double bond. Used industrially to harden vegetable oils into margarine."
  },
  {
    id: 10,
    name: "Halogenation of ethene (Br₂)",
    equation: "C₂H₄ + Br₂ → CH₂BrCH₂Br",
    type: "Addition",
    conditions: "CCl₄ solvent, room temp",
    explanation: "Electrophilic addition. Decolorises bromine water — a standard alkene test."
  },
  {
    id: 11,
    name: "Hydration of ethene",
    equation: "C₂H₄ + H₂O → C₂H₅OH",
    type: "Addition",
    conditions: "H₃PO₄ catalyst, 300°C, 60 atm",
    explanation: "Industrial production of ethanol. Phosphoric acid is the catalyst in the steam-hydration process."
  },
  {
    id: 12,
    name: "HBr addition to propene (Markovnikov)",
    equation: "C₃H₆ + HBr → CH₃CHBrCH₃",
    type: "Addition",
    conditions: "HBr gas, no peroxide",
    explanation: "Markovnikov's rule: H adds to the carbon with more H atoms. Gives 2-bromopropane (major product)."
  },
  {
    id: 13,
    name: "HBr addition to propene (Anti-Markovnikov)",
    equation: "C₃H₆ + HBr → CH₃CH₂CH₂Br",
    type: "Addition",
    conditions: "HBr + peroxide (ROOR)",
    explanation: "Peroxide causes free-radical mechanism — reversal of Markovnikov. Gives 1-bromopropane."
  },
  {
    id: 14,
    name: "Hydrogenation of ethyne to ethene",
    equation: "C₂H₂ + H₂ → C₂H₄",
    type: "Addition",
    conditions: "Lindlar catalyst (Pd/CaCO₃), room temp",
    explanation: "Lindlar catalyst gives partial hydrogenation, stopping at cis-alkene stage."
  },
  {
    id: 15,
    name: "Hydrogenation of ethyne to ethane",
    equation: "C₂H₂ + 2H₂ → C₂H₆",
    type: "Addition",
    conditions: "Ni catalyst, heat",
    explanation: "Complete reduction of triple bond to single bond via excess H₂."
  },
  {
    id: 16,
    name: "Chlorination of ethene",
    equation: "C₂H₄ + Cl₂ → CH₂ClCH₂Cl",
    type: "Addition",
    conditions: "Dark, room temperature",
    explanation: "Gives 1,2-dichloroethane. Industrially used to make vinyl chloride (PVC precursor)."
  },
  {
    id: 17,
    name: "Ozonolysis of ethene",
    equation: "C₂H₄ + O₃ → 2HCHO (after reductive workup)",
    type: "Addition",
    conditions: "O₃, then Zn/H₂O",
    explanation: "Cleaves double bond. Used to determine position of C=C in unknown compounds."
  },
  {
    id: 18,
    name: "Polymerization of ethene",
    equation: "nCH₂=CH₂ → −(CH₂–CH₂)ₙ−",
    type: "Addition",
    conditions: "High pressure, TiCl₄ catalyst or peroxide",
    explanation: "Forms polyethylene (PE). Ziegler-Natta catalysts give HDPE; free radical gives LDPE."
  },
  // Substitution
  {
    id: 19,
    name: "Free radical chlorination of methane",
    equation: "CH₄ + Cl₂ → CH₃Cl + HCl",
    type: "Substitution",
    conditions: "UV light or 300°C",
    explanation: "Free radical chain reaction. Initiation by UV splits Cl₂. Product is chloromethane."
  },
  {
    id: 20,
    name: "Free radical bromination of methane",
    equation: "CH₄ + Br₂ → CH₃Br + HBr",
    type: "Substitution",
    conditions: "UV light or heat",
    explanation: "Slower than chlorination but more selective. Selectivity increases with branching."
  },
  {
    id: 21,
    name: "SN1 — tert-butyl bromide hydrolysis",
    equation: "(CH₃)₃CBr + H₂O → (CH₃)₃COH + HBr",
    type: "Substitution",
    conditions: "Aqueous, weak nucleophile",
    explanation: "Unimolecular. Step 1: ionisation to carbocation. Step 2: nucleophile attacks. Rate = k[RBr]. Retention + inversion (racemisation)."
  },
  {
    id: 22,
    name: "SN2 — methyl bromide + NaOH",
    equation: "CH₃Br + NaOH → CH₃OH + NaBr",
    type: "Substitution",
    conditions: "Polar aprotic solvent (DMSO/acetone)",
    explanation: "Bimolecular one-step backside attack. Rate = k[CH₃Br][OH⁻]. Complete inversion (Walden inversion)."
  },
  {
    id: 23,
    name: "Nucleophilic acyl substitution (ester formation)",
    equation: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O",
    type: "Substitution",
    conditions: "H₂SO₄ catalyst, heat (Fischer esterification)",
    explanation: "Reversible. Le Chatelier: remove water to shift right. Used to make ethyl acetate."
  },
  {
    id: 24,
    name: "Halogenation of benzene (Friedel-Crafts)",
    equation: "C₆H₆ + Cl₂ → C₆H₅Cl + HCl",
    type: "Substitution",
    conditions: "AlCl₃ catalyst, anhydrous",
    explanation: "Electrophilic aromatic substitution. AlCl₃ generates Cl⁺ electrophile. Preserves aromatic ring."
  },
  {
    id: 25,
    name: "Nitration of benzene",
    equation: "C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O",
    type: "Substitution",
    conditions: "Conc. H₂SO₄ + conc. HNO₃, 50°C",
    explanation: "H₂SO₄ generates NO₂⁺ electrophile. Electrophilic aromatic substitution. Forms nitrobenzene."
  },
  {
    id: 26,
    name: "Sulfonation of benzene",
    equation: "C₆H₆ + H₂SO₄ → C₆H₅SO₃H + H₂O",
    type: "Substitution",
    conditions: "Fuming H₂SO₄ (oleum), heat",
    explanation: "Reversible electrophilic aromatic substitution. Sulfonation can be reversed by steam at 180°C."
  },
  {
    id: 27,
    name: "Friedel-Crafts alkylation",
    equation: "C₆H₆ + RCl → C₆H₅R + HCl",
    type: "Substitution",
    conditions: "AlCl₃ or BF₃ catalyst",
    explanation: "Introduces alkyl group onto benzene ring. Susceptible to polyalkylation and carbocation rearrangements."
  },
  // Elimination
  {
    id: 28,
    name: "Dehydration of ethanol (E1)",
    equation: "C₂H₅OH → C₂H₄ + H₂O",
    type: "Elimination",
    conditions: "Conc. H₂SO₄, 170°C (excess acid)",
    explanation: "E1 mechanism. At 170°C ethene is the major product; at 140°C ether forms."
  },
  {
    id: 29,
    name: "Dehydrohalogenation (E2) of ethyl bromide",
    equation: "CH₃CH₂Br + KOH → CH₂=CH₂ + KBr + H₂O",
    type: "Elimination",
    conditions: "Alcoholic KOH, heat",
    explanation: "E2 bimolecular mechanism. Requires anti-periplanar geometry. Saytzeff's rule: more substituted alkene is major."
  },
  {
    id: 30,
    name: "Dehydrohalogenation of 2-bromobutane",
    equation: "CH₃CHBrCH₂CH₃ + KOH(alc) → but-2-ene (major) + but-1-ene",
    type: "Elimination",
    conditions: "Alcoholic KOH, heat",
    explanation: "Saytzeff's rule: more substituted, more stable alkene predominates. But-2-ene is trans predominantly."
  },
  {
    id: 31,
    name: "Thermal cracking of hexane",
    equation: "C₆H₁₄ → C₃H₈ + C₃H₆ (one possibility)",
    type: "Elimination",
    conditions: "700–900°C, no catalyst",
    explanation: "Random C-C bond homolysis. Produces smaller alkanes + alkenes. Industrial source of alkenes."
  },
  {
    id: 32,
    name: "Catalytic cracking",
    equation: "C₁₀H₂₂ → C₄H₈ + C₃H₆ + CH₄ + ...",
    type: "Elimination",
    conditions: "Zeolite catalyst, 450–500°C",
    explanation: "Produces high-octane petrol fractions and alkene feedstocks for petrochemical industry."
  },
  // Aromatic
  {
    id: 33,
    name: "Hydrogenation of benzene",
    equation: "C₆H₆ + 3H₂ → C₆H₁₂ (cyclohexane)",
    type: "Aromatic",
    conditions: "Ni catalyst, 200°C, high pressure",
    explanation: "Requires 3 mol H₂. Ring is unusually stable (resonance energy 150 kJ/mol) — conditions are harsher than for alkenes."
  },
  {
    id: 34,
    name: "Birch reduction of benzene",
    equation: "C₆H₆ + 2Na + 2EtOH → 1,4-cyclohexadiene",
    type: "Aromatic",
    conditions: "Na/NH₃(l), alcohol",
    explanation: "Partial reduction of benzene ring. Electron-withdrawing groups — double bonds end on substituted carbons."
  },
  {
    id: 35,
    name: "Benzene + acetyl chloride (Friedel-Crafts acylation)",
    equation: "C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl",
    type: "Aromatic",
    conditions: "AlCl₃, anhydrous, reflux",
    explanation: "Gives acetophenone. No polyacylation unlike alkylation — the acyl group deactivates the ring."
  },
  {
    id: 36,
    name: "Oxidation of toluene → benzoic acid",
    equation: "C₆H₅CH₃ + [O] → C₆H₅COOH",
    type: "Aromatic",
    conditions: "KMnO₄, H₂SO₄, heat; or K₂Cr₂O₇",
    explanation: "Alkyl side chains on benzene are oxidised to –COOH. Useful for identifying substituted benzenes."
  },
  {
    id: 37,
    name: "Coupling of benzene diazonium with phenol",
    equation: "C₆H₅N₂⁺ + C₆H₅OH → C₆H₅-N=N-C₆H₄OH + H⁺",
    type: "Aromatic",
    conditions: "Alkaline, cold (0–5°C)",
    explanation: "Azo coupling reaction. Produces an azo dye. Used in textile and food colouring industries."
  },
  // Oxidation
  {
    id: 38,
    name: "Oxidation of ethanol to ethanal",
    equation: "C₂H₅OH + [O] → CH₃CHO + H₂O",
    type: "Oxidation",
    conditions: "K₂Cr₂O₇/H₂SO₄, warm (distil off product)",
    explanation: "Primary alcohol → aldehyde. Use excess alcohol and distil to prevent over-oxidation to acid."
  },
  {
    id: 39,
    name: "Oxidation of ethanal to acetic acid",
    equation: "CH₃CHO + [O] → CH₃COOH",
    type: "Oxidation",
    conditions: "KMnO₄ or K₂Cr₂O₇, H₂SO₄",
    explanation: "Aldehyde → carboxylic acid. Cr²O₇ changes from orange to green — colour change indicator."
  },
  {
    id: 40,
    name: "Oxidation of secondary alcohol (propan-2-ol)",
    equation: "(CH₃)₂CHOH + [O] → (CH₃)₂C=O (acetone)",
    type: "Oxidation",
    conditions: "K₂Cr₂O₇/H₂SO₄, warm",
    explanation: "Secondary alcohol → ketone. Ketones resist further oxidation under mild conditions."
  },
  {
    id: 41,
    name: "Tollens' silver mirror test (aldehyde)",
    equation: "RCHO + Ag(NH₃)₂⁺ + OH⁻ → RCOO⁻ + Ag↓ + NH₃",
    type: "Oxidation",
    conditions: "Tollens' reagent, warm water bath",
    explanation: "Positive: silver mirror on tube. Ketones give negative — distinguishes aldehydes from ketones."
  },
  {
    id: 42,
    name: "Fehling's test for aldehyde",
    equation: "RCHO + 2Cu²⁺ + 5OH⁻ → RCOO⁻ + Cu₂O↓ + 3H₂O",
    type: "Oxidation",
    conditions: "Fehling solution A+B, heat",
    explanation: "Blue Cu²⁺ reduced to brick-red Cu₂O precipitate. Aliphatic aldehydes only (not aromatic)."
  },
  {
    id: 43,
    name: "Oxidation of glucose to gluconic acid",
    equation: "C₆H₁₂O₆ + [O] → C₆H₁₂O₇",
    type: "Oxidation",
    conditions: "Mild oxidant (Tollens' or Fehling)",
    explanation: "Glucose is an aldehyde (aldohexose) — gives positive Tollens and Fehling tests."
  },
  {
    id: 44,
    name: "Combustion of carbon to CO₂",
    equation: "C + O₂ → CO₂",
    type: "Oxidation",
    conditions: "Excess oxygen, heat",
    explanation: "Complete oxidation. ΔH = −394 kJ/mol. Basis of carbon fuel energy."
  },
  // Reduction
  {
    id: 45,
    name: "Reduction of ethanal to ethanol",
    equation: "CH₃CHO + 2[H] → C₂H₅OH",
    type: "Reduction",
    conditions: "LiAlH₄/ether (dry) or NaBH₄/methanol",
    explanation: "Aldehyde → primary alcohol. NaBH₄ is selective (won't reduce esters/acids); LiAlH₄ is a stronger reductant."
  },
  {
    id: 46,
    name: "Reduction of acetone to propan-2-ol",
    equation: "(CH₃)₂CO + 2[H] → (CH₃)₂CHOH",
    type: "Reduction",
    conditions: "NaBH₄, methanol, 0°C",
    explanation: "Ketone → secondary alcohol. NaBH₄ is safe to use in protic solvents unlike LiAlH₄."
  },
  {
    id: 47,
    name: "Reduction of acetic acid to ethanol",
    equation: "CH₃COOH + 4[H] → C₂H₅OH + H₂O",
    type: "Reduction",
    conditions: "LiAlH₄/ether (dry, reflux)",
    explanation: "Carboxylic acid requires LiAlH₄ (strong reductant). NaBH₄ cannot reduce acids."
  },
  {
    id: 48,
    name: "Hydrogenation of fats (industrial)",
    equation: "−CH=CH− + H₂ → −CH₂−CH₂−",
    type: "Reduction",
    conditions: "Ni catalyst, 150°C, high pressure",
    explanation: "Converts unsaturated vegetable oils to semi-solid fats (margarine). Partial hydrogenation creates trans fats."
  },
  {
    id: 49,
    name: "Wolff-Kishner reduction",
    equation: "R₂C=O + NH₂NH₂ + KOH → R₂CH₂ + N₂ + H₂O",
    type: "Reduction",
    conditions: "N₂H₄, KOH, ethylene glycol, 200°C",
    explanation: "Reduces ketone/aldehyde C=O directly to CH₂. Complement to Clemmensen (which uses Zn-Hg/HCl)."
  },
  {
    id: 50,
    name: "Clemmensen reduction",
    equation: "R₂C=O + Zn(Hg)/HCl → R₂CH₂",
    type: "Reduction",
    conditions: "Zn-Hg amalgam, conc. HCl, reflux",
    explanation: "Reduces C=O to CH₂ in acid-sensitive substrates. Used for aromatic ketones. Complementary to Wolff-Kishner."
  },
  // Named Reactions
  {
    id: 51,
    name: "Aldol Condensation",
    equation: "2CH₃CHO → CH₃CH(OH)CH₂CHO (aldol)",
    type: "Named",
    conditions: "Dil. NaOH, cold (addition); or heat (condensation)",
    explanation: "α-hydrogen is acidic — forms enolate which attacks carbonyl of another molecule. Aldol = 3-hydroxybutanal.",
    mechanism: "1. Base removes α-H → enolate\n2. Enolate attacks C=O\n3. Aldol product (3-hydroxybutanal)\n4. On heating: dehydration → α,β-unsaturated aldehyde (but-2-enal)"
  },
  {
    id: 52,
    name: "Cannizzaro Reaction",
    equation: "2HCHO + NaOH → HCOONa + CH₃OH",
    type: "Named",
    conditions: "Conc. NaOH, formaldehyde (no α-H aldehyde)",
    explanation: "Disproportionation: one molecule of aldehyde oxidised to acid, another reduced to alcohol. Requires no α-H.",
    mechanism: "1. OH⁻ attacks C=O of HCHO → hydride transfer\n2. One HCHO → HCOO⁻ (formate)\n3. Other HCHO → CH₃OH (methanol)"
  },
  {
    id: 53,
    name: "Grignard Synthesis",
    equation: "RMgX + R'CHO → R-CHOH-R' (after hydrolysis)",
    type: "Named",
    conditions: "Dry ether, anhydrous, then aq. NH₄Cl",
    explanation: "Grignard reagent (RMgX) is a powerful nucleophile. Reacts with aldehydes/ketones to give secondary/tertiary alcohols.",
    mechanism: "1. Mg inserts into C-X bond: R-X + Mg → RMgX\n2. Nucleophilic addition to C=O\n3. Magnesium alkoxide formed\n4. Hydrolysis gives alcohol"
  },
  {
    id: 54,
    name: "Williamson Ether Synthesis",
    equation: "RONa + R'X → R-O-R' + NaX",
    type: "Named",
    conditions: "Sodium alkoxide + primary alkyl halide, reflux",
    explanation: "SN2 reaction. Works best with primary halides (secondary gives elimination by E2). Used to make both symmetric and mixed ethers.",
    mechanism: "1. Sodium alkoxide is nucleophile\n2. Backside attack on C-X\n3. Inversion at C; halide leaves\n4. Mixed ether product"
  },
  {
    id: 55,
    name: "Lucas Test (distinguish 1°, 2°, 3° alcohols)",
    equation: "ROH + HCl/ZnCl₂ → RCl + H₂O",
    type: "Named",
    conditions: "Lucas reagent (conc. HCl + ZnCl₂), RT",
    explanation: "3° alcohol: immediate turbidity. 2° alcohol: turbidity in 5 min. 1° alcohol: no turbidity at RT (reacts only on heating)."
  },
  {
    id: 56,
    name: "Kolbe Electrolysis",
    equation: "2RCOONa → R-R + 2CO₂ + H₂ + 2NaOH",
    type: "Named",
    conditions: "Electrolysis of concentrated sodium carboxylate",
    explanation: "Electrolytic decarboxylation. Anode: carboxylate loses e⁻ → radical → C-C bond. Used for symmetric hydrocarbon synthesis."
  },
  {
    id: 57,
    name: "Reimer-Tiemann Reaction",
    equation: "C₆H₅OH + CHCl₃ + 2NaOH → 2-HOC₆H₄CHO",
    type: "Named",
    conditions: "Phenol + CHCl₃ + NaOH, heat",
    explanation: "Introduces –CHO group at ortho position of phenol. Mechanism involves dichlorocarbene (CCl₂)."
  },
  {
    id: 58,
    name: "Hell-Volhard-Zelinsky Reaction",
    equation: "RCH₂COOH + Br₂ (P) → RCHBrCOOH + HBr",
    type: "Named",
    conditions: "Red phosphorus or PCl₃ + Br₂",
    explanation: "Selective α-bromination of carboxylic acids. P activates the acid as acyl halide. Used to introduce functionality at α-carbon."
  },
  {
    id: 59,
    name: "Sandmeyer Reaction",
    equation: "C₆H₅N₂⁺Cl⁻ + CuCN → C₆H₅CN + N₂ + CuCl",
    type: "Named",
    conditions: "Diazonium salt + CuX (CuCl, CuBr, CuCN), warm",
    explanation: "Replaces diazonium group with Cl, Br, or CN. Key route to aryl halides and nitriles from primary aromatic amines."
  },
  {
    id: 60,
    name: "Diels-Alder Reaction",
    equation: "CH₂=CH-CH=CH₂ + CH₂=CH₂ → cyclohexene",
    type: "Named",
    conditions: "Heat, [4+2] cycloaddition",
    explanation: "Diene + dienophile → 6-membered ring. Stereospecific — syn addition. Powerful route to cyclohexene derivatives.",
    mechanism: "1. Diene must be in s-cis conformation\n2. Concerted pericyclic mechanism\n3. 6 electrons reorganise simultaneously\n4. Forms 2 new σ bonds + ring"
  },
  {
    id: 61,
    name: "Wacker Oxidation",
    equation: "C₂H₄ + ½O₂ → CH₃CHO",
    type: "Named",
    conditions: "PdCl₂/CuCl₂ catalyst, water, 50°C",
    explanation: "Industrial oxidation of ethylene to acetaldehyde. Pd²⁺ is the active catalyst, Cu²⁺ regenerates it. Markovnikov selectivity."
  },
  {
    id: 62,
    name: "Ozonolysis (reductive workup)",
    equation: "R-CH=CH-R' + O₃ → RCHO + R'CHO",
    type: "Named",
    conditions: "O₃ then Zn/H₂O or Me₂S",
    explanation: "Cleaves C=C completely to aldehydes (reductive) or carboxylic acids (oxidative). Key tool for structure determination."
  },
  {
    id: 63,
    name: "Baeyer-Villiger Oxidation",
    equation: "R₂C=O + m-CPBA → R₂C=O + lactone/ester",
    type: "Named",
    conditions: "Peracid (mCPBA or H₂O₂), room temperature",
    explanation: "Oxidises ketone to ester (or cyclic ketone to lactone). Migrating group: hydride > tertiary > secondary > primary > methyl."
  },
  {
    id: 64,
    name: "Rosenmund Reduction",
    equation: "RCOCl + H₂ → RCHO + HCl",
    type: "Named",
    conditions: "Pd/BaSO₄ catalyst (poisoned), H₂, xylene",
    explanation: "Reduces acyl chloride to aldehyde only. Catalyst is poisoned to prevent further reduction to alcohol."
  },
  {
    id: 65,
    name: "Claisén Condensation",
    equation: "2CH₃COOC₂H₅ → CH₃COCH₂COOC₂H₅ + C₂H₅OH",
    type: "Named",
    conditions: "NaOEt (base), diethyl ether",
    explanation: "Two ester molecules condense — one acts as nucleophile via enolate, other as electrophile. Gives β-ketoester."
  },
  {
    id: 66,
    name: "Hofmann Bromamide Reaction",
    equation: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O",
    type: "Named",
    conditions: "Br₂, NaOH, heat",
    explanation: "Converts amide to amine — product has one fewer carbon (decarboxylation). Used to make primary amines."
  },
  {
    id: 67,
    name: "Kolbe-Schmitt Reaction (sodium phenoxide + CO₂)",
    equation: "C₆H₅ONa + CO₂ → 2-HOC₆H₄COONa (sodium salicylate)",
    type: "Named",
    conditions: "CO₂ at 125°C, 5 atm, then acidify",
    explanation: "Industrial synthesis of salicylic acid — precursor to aspirin. CO₂ is an electrophile attacking the ring ortho to OH."
  },
  {
    id: 68,
    name: "Beckmann Rearrangement",
    equation: "R₂C=NOH → RCONHR' (lactam if cyclic)",
    type: "Named",
    conditions: "H₂SO₄ or PCl₅, oxime starting material",
    explanation: "Oxime → amide. In Nylon-6 synthesis: cyclohexanone oxime → caprolactam via Beckmann rearrangement."
  },
  {
    id: 69,
    name: "Fries Rearrangement",
    equation: "ArOCOR → o-HO-Ar-COR + p-HO-Ar-COR",
    type: "Named",
    conditions: "AlCl₃, heat (thermal) or UV (photo-Fries)",
    explanation: "Aryl ester rearranges to hydroxyaryl ketone. Ortho product favoured at high temperature, para at low."
  },
  {
    id: 70,
    name: "Dakin Reaction",
    equation: "ArCHO + H₂O₂ + NaOH → ArOH + HCOOH",
    type: "Named",
    conditions: "H₂O₂, NaOH, room temperature",
    explanation: "Converts ortho/para-hydroxybenzaldehyde to catechol/hydroquinone using H₂O₂ as oxidant. Mild, selective."
  },
  // Additional reactions to reach ~100+
  {
    id: 71,
    name: "Esterification (Fischer)",
    equation: "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    type: "Named",
    conditions: "H₂SO₄ cat., heat; remove water",
    explanation: "Reversible. Equilibrium constant ~4. Drive right by removing water (mol. sieves, Dean-Stark trap, or excess alcohol)."
  },
  {
    id: 72,
    name: "Saponification",
    equation: "RCOOR' + NaOH → RCOONa + R'OH",
    type: "Named",
    conditions: "Aqueous NaOH, heat",
    explanation: "Irreversible base hydrolysis of ester. Product is carboxylate salt (soap) + alcohol. Basis of soap making from fats."
  },
  {
    id: 73,
    name: "Iodoform Test",
    equation: "CH₃COR + I₂ + NaOH → CHI₃↓ + RCOONa",
    type: "Named",
    conditions: "I₂, NaOH (or NaOI), warm",
    explanation: "Positive for CH₃CO– compounds (methylketones, ethanol, acetaldehyde). Yellow CHI₃ precipitate with antiseptic smell."
  },
  {
    id: 74,
    name: "Benzoin Condensation",
    equation: "2C₆H₅CHO → C₆H₅COCH(OH)C₆H₅",
    type: "Named",
    conditions: "NaCN catalyst (or thiamine as enzymatic equivalent)",
    explanation: "CN⁻ is the umpolung catalyst. Converts two benzaldehyde molecules into benzoin — classic acyl-anion chemistry."
  },
  {
    id: 75,
    name: "Pinacol-Pinacolone Rearrangement",
    equation: "(CH₃)₂C(OH)–C(OH)(CH₃)₂ → (CH₃)₃CCO·CH₃",
    type: "Named",
    conditions: "H₂SO₄, heat",
    explanation: "1,2-diol dehydrates and rearranges to carbonyl compound. Methyl migrates to form tertiary carbocation stabilised intermediate."
  },
  {
    id: 76,
    name: "Perkin Condensation",
    equation: "ArCHO + (RCO)₂O → ArCH=CRCOOH",
    type: "Named",
    conditions: "RCOONa (base), heat",
    explanation: "Aromatic aldehyde + anhydride → α,β-unsaturated carboxylic acid. Mechanism similar to aldol via enolate of anhydride."
  },
  {
    id: 77,
    name: "Knoevenagel Condensation",
    equation: "RCHO + CH₂(COOC₂H₅)₂ → RCH=C(COOC₂H₅)₂ + H₂O",
    type: "Named",
    conditions: "Amine base (piperidine), warm",
    explanation: "Aldehyde + active methylene compound → knoevenagel product. Milder than aldol, useful in synthesis of pharmaceuticals."
  },
  {
    id: 78,
    name: "Robinson Annulation",
    equation: "Cyclohex-2-enone + CH₂=CHCOCH₃ → bicyclic product",
    type: "Named",
    conditions: "NaOH, Michael addition then aldol cyclisation",
    explanation: "Michael addition followed by intramolecular aldol to form a 6-membered ring. Key in synthesis of steroids and terpenes."
  },
  {
    id: 79,
    name: "Stork Enamine Reaction",
    equation: "Cyclohexanone + pyrrolidine → enamine → alkylated product",
    type: "Named",
    conditions: "Acid or base catalysis, alkyl/acyl halide",
    explanation: "Enamine serves as enolate equivalent. Avoids over-alkylation. Useful for regioselective functionalization of ketones."
  },
  {
    id: 80,
    name: "Wittig Reaction",
    equation: "R₂C=O + Ph₃P=CHR' → R₂C=CHR' + Ph₃P=O",
    type: "Named",
    conditions: "Triphenylphosphonium ylide, base, RT",
    explanation: "Converts carbonyl to alkene. Stereoselective: stabilised ylides → trans; non-stabilised ylides → cis alkenes."
  },
  {
    id: 81,
    name: "Gabriel Synthesis of primary amines",
    equation: "phthalimide + RX + N₂H₄ → RNH₂",
    type: "Named",
    conditions: "KOH (first), then hydrazine",
    explanation: "Uses phthalimide anion as N-nucleophile in SN2. Acid/base hydrolysis liberates pure primary amine — avoids secondary/tertiary."
  },
  {
    id: 82,
    name: "Curtius Rearrangement",
    equation: "RCON₃ → R-N=C=O (isocyanate) + N₂",
    type: "Named",
    conditions: "Acyl azide, heat or photolysis",
    explanation: "Nitrene rearrangement. Isocyanate intermediate reacts with water → amine + CO₂. One fewer carbon in product."
  },
  {
    id: 83,
    name: "Schmidt Reaction",
    equation: "RCOOH + HN₃ + H₂SO₄ → RNH₂ + CO₂ + N₂",
    type: "Named",
    conditions: "Hydrazoic acid, H₂SO₄",
    explanation: "Carboxylic acid → primary amine. One fewer carbon. Mechanism via nitrenium ion (similar to Curtius)."
  },
  {
    id: 84,
    name: "Acid-catalysed dehydration (E1)",
    equation: "(CH₃)₃COH → (CH₃)₂C=CH₂ + H₂O",
    type: "Elimination",
    conditions: "Conc. H₂SO₄ or H₃PO₄, heat",
    explanation: "tert-Butyl alcohol forms stable carbocation. Follows Saytzeff's rule — most substituted alkene."
  },
  {
    id: 85,
    name: "Cycloaddition: Maleic anhydride + butadiene",
    equation: "CH₂=CHCH=CH₂ + maleic anhydride → adduct",
    type: "Aromatic",
    conditions: "Heat, [4+2] Diels-Alder",
    explanation: "Electron-poor dienophile reacts with diene stereospecifically. Endo rule: endo product kinetically favoured."
  },
  {
    id: 86,
    name: "Decarboxylation of β-keto acid",
    equation: "CH₃COCH₂COOH → CH₃COCH₃ + CO₂",
    type: "Elimination",
    conditions: "Heat (>150°C)",
    explanation: "β-keto acids readily lose CO₂. 6-membered cyclic transition state makes this facile. Used in acetoacetic ester synthesis."
  },
  {
    id: 87,
    name: "Acyloin condensation",
    equation: "2RCOOEt → RCO-C(OH)R",
    type: "Named",
    conditions: "Na metal in toluene, reflux",
    explanation: "Reductive coupling of two ester molecules via radical mechanism on sodium surface. Gives α-hydroxy ketone (acyloin)."
  },
  {
    id: 88,
    name: "Reformatsky Reaction",
    equation: "RCOR' + BrCH₂COOC₂H₅ + Zn → β-hydroxy ester",
    type: "Named",
    conditions: "Zn metal, ether, then H₂O",
    explanation: "Organozinc intermediate (less reactive than Grignard) adds to carbonyl. Mild — tolerates many functional groups."
  },
  {
    id: 89,
    name: "Oppenauer Oxidation",
    equation: "R₂CHOH + acetone → R₂C=O + isopropanol",
    type: "Oxidation",
    conditions: "Al(OiPr)₃ catalyst, acetone",
    explanation: "Transfer hydrogenation — oxidises secondary alcohol using ketone as H-acceptor. Reverse of Meerwein-Ponndorf-Verley."
  },
  {
    id: 90,
    name: "Meerwein-Ponndorf-Verley Reduction",
    equation: "R₂C=O + (CH₃)₂CHOH → R₂CHOH + acetone",
    type: "Reduction",
    conditions: "Al(OiPr)₃ catalyst, isopropanol",
    explanation: "Transfer hydrogenation using aluminium alkoxide. Selective for C=O; does not reduce C=C. Reverse of Oppenauer."
  },
  {
    id: 91,
    name: "Ene Reaction",
    equation: "C=C + C=O → homoallylic alcohol",
    type: "Addition",
    conditions: "Lewis acid catalyst (SnBr₄) or heat",
    explanation: "Allylic C-H reacts with electrophilic enophile. Bond reorganisation: new C-C bond, H transfer, and double bond shift."
  },
  {
    id: 92,
    name: "Olefin Metathesis (Grubbs)",
    equation: "2 RCH=CH₂ → RCH=CHR + CH₂=CH₂",
    type: "Named",
    conditions: "Grubbs Ru catalyst, CH₂Cl₂, RT",
    explanation: "Catalytic exchange of double bond partners. Nobel Prize 2005. Used in ring-closing metathesis (RCM) for cyclic compounds."
  },
  {
    id: 93,
    name: "Shapiro Reaction",
    equation: "R₂C=NNHTs + 2n-BuLi → R₂C=CH₂ (vinyl lithium)",
    type: "Named",
    conditions: "p-Toluenesulfonylhydrazone + 2 equiv n-BuLi, THF, -78°C",
    explanation: "Converts carbonyl to vinyl anion via tosylhydrazone. Useful for alkene synthesis with regiocontrol."
  },
  {
    id: 94,
    name: "Oxymercuration-Demercuration",
    equation: "C₂H₄ + Hg(OAc)₂/H₂O → C₂H₅OH (after NaBH₄)",
    type: "Addition",
    conditions: "Hg(OAc)₂ in water/THF, then NaBH₄",
    explanation: "Markovnikov hydration without carbocation rearrangement. Hg electrophile opens alkene; NaBH₄ removes Hg."
  },
  {
    id: 95,
    name: "Hydroboration-Oxidation",
    equation: "R-CH=CH₂ → R-CH₂-CH₂OH (anti-Markovnikov)",
    type: "Addition",
    conditions: "BH₃·THF then H₂O₂/NaOH",
    explanation: "Anti-Markovnikov, syn addition. B goes to less hindered carbon. H₂O₂/NaOH converts B-C to OH with retention of config."
  },
  {
    id: 96,
    name: "Sharpless Asymmetric Epoxidation",
    equation: "allylic alcohol + TBHP + Ti(OiPr)₄ + tartrate → chiral epoxy alcohol",
    type: "Named",
    conditions: "Ti(OiPr)₄, DET or DIPT, TBHP, -20°C",
    explanation: "Epoxidises allylic alcohols enantioselectively. L-(+)-tartrate gives β-face; D-(-)-tartrate gives α-face attack."
  },
  {
    id: 97,
    name: "Mitsunobu Reaction",
    equation: "R-OH + R'COOH + PPh₃ + DIAD → R-OOCR' (inverted config)",
    type: "Named",
    conditions: "PPh₃, DIAD (diethyl azodicarboxylate), toluene, RT",
    explanation: "Converts alcohol to ester with inversion of configuration. Used to invert stereocentres in synthesis."
  },
  {
    id: 98,
    name: "Swern Oxidation",
    equation: "R-CH(OH)-R' → R-CO-R'",
    type: "Oxidation",
    conditions: "(COCl)₂, DMSO, then Et₃N, -78°C",
    explanation: "Mild oxidation of alcohols to aldehydes/ketones. No over-oxidation. Activated DMSO is the oxidant."
  },
  {
    id: 99,
    name: "Jones Oxidation",
    equation: "R-CH₂OH → RCOOH; R₂CHOH → R₂C=O",
    type: "Oxidation",
    conditions: "CrO₃ + H₂SO₄ in acetone",
    explanation: "Primary alcohols → carboxylic acids; secondary → ketones. Orange Cr⁶⁺ → green Cr³⁺ colour change."
  },
  {
    id: 100,
    name: "Dehydrogenation of cyclohexane to benzene",
    equation: "C₆H₁₂ → C₆H₆ + 3H₂",
    type: "Aromatic",
    conditions: "Cr₂O₃/Al₂O₃ catalyst, 500°C",
    explanation: "Industrial catalytic reforming. Produces benzene and aromatic compounds from naphtha fractions."
  },
  {
    id: 101,
    name: "Polymerization of styrene",
    equation: "nCH₂=CHC₆H₅ → −(CH₂-CHC₆H₅)ₙ−",
    type: "Addition",
    conditions: "Free radical, 100°C; or BF₃/anionic",
    explanation: "Forms polystyrene (PS). Cationic polymerisation gives atactic PS; anionic Ziegler-Natta gives isotactic/syndiotactic."
  },
  {
    id: 102,
    name: "Criegee Ozonolysis (oxidative workup)",
    equation: "R-CH=CH-R' + O₃ → RCOOH + R'COOH",
    type: "Oxidation",
    conditions: "O₃ then H₂O₂ (oxidative workup)",
    explanation: "Gives carboxylic acids (vs aldehydes in reductive workup). Allows both oxidative and reductive structure determination."
  },
  {
    id: 103,
    name: "Leuckart Reaction",
    equation: "R₂C=O + HCOONH₄ → R₂CHNHCHO → R₂CHNH₂",
    type: "Named",
    conditions: "Ammonium formate, heat; then acid hydrolysis",
    explanation: "Reductive amination using formic acid as reductant. Converts ketone to N-formyl amine, then hydrolysis gives amine."
  },
  {
    id: 104,
    name: "Mannich Reaction",
    equation: "R₂CO + HCHO + HNR'₂ → R₂C(CH₂NR'₂)–CO (Mannich base)",
    type: "Named",
    conditions: "Aqueous acid, 0–25°C, active methylene compound",
    explanation: "Three-component: carbonyl + formaldehyde + amine → β-amino carbonyl (Mannich base). Key in alkaloid synthesis."
  }
];
const FILTER_TYPES = [
  "Combustion",
  "Addition",
  "Substitution",
  "Elimination",
  "Aromatic",
  "Oxidation",
  "Reduction",
  "Named"
];
const TYPE_COLORS = {
  Combustion: "from-orange-400/20 to-red-400/20 border-orange-400/30 text-orange-300",
  Addition: "from-green-400/20 to-emerald-400/20 border-green-400/30 text-green-300",
  Substitution: "from-blue-400/20 to-sky-400/20 border-blue-400/30 text-blue-300",
  Elimination: "from-yellow-400/20 to-amber-400/20 border-yellow-400/30 text-yellow-300",
  Aromatic: "from-purple-400/20 to-violet-400/20 border-purple-400/30 text-purple-300",
  Oxidation: "from-red-400/20 to-rose-400/20 border-red-400/30 text-red-300",
  Reduction: "from-teal-400/20 to-cyan-400/20 border-teal-400/30 text-teal-300",
  Named: "from-indigo-400/20 to-blue-400/20 border-indigo-400/30 text-indigo-300"
};
const CarbonReactions = reactExports.memo(function CarbonReactions2() {
  const [search, setSearch] = reactExports.useState("");
  const [activeType, setActiveType] = reactExports.useState("All");
  const [expanded, setExpanded] = reactExports.useState(null);
  const filtered = reactExports.useMemo(
    () => ALL_REACTIONS.filter((r) => {
      const matchType = activeType === "All" || r.type === activeType;
      const q = search.toLowerCase();
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.equation.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
      return matchType && matchSearch;
    }),
    [search, activeType]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-5",
      "data-ocid": "carbon.reactions_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Carbon Reactions Library" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            ALL_REACTIONS.length,
            "+ reactions — organic, named, and more. Search or filter by type."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-lg mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search by name, equation, or type…",
              className: "w-full glass-carbon rounded-xl pl-9 pr-9 py-2.5 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-border/50 transition-all",
              "data-ocid": "carbon.reactions.search_input"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap justify-center gap-2",
            "data-ocid": "carbon.reactions.type_filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveType("All"),
                  className: cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                    activeType === "All" ? "glass ring-1 ring-border/40 scale-105" : "glass-carbon hover:bg-card/30 hover:scale-105"
                  ),
                  "data-ocid": "carbon.reactions.filter.all",
                  children: [
                    "All (",
                    ALL_REACTIONS.length,
                    ")"
                  ]
                }
              ),
              FILTER_TYPES.map((t) => {
                const colors = TYPE_COLORS[t].split(" ");
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setActiveType(activeType === t ? "All" : t),
                    className: cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 bg-gradient-to-r to-transparent",
                      activeType === t ? `${colors.join(" ")} ring-1 ring-white/20 scale-105` : "glass-carbon border-transparent hover:bg-card/30 hover:scale-105"
                    ),
                    "data-ocid": `carbon.reactions.filter.${t.toLowerCase()}`,
                    children: t
                  },
                  t
                );
              })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
          filtered.length,
          " reaction",
          filtered.length !== 1 ? "s" : "",
          " shown"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.map((r, idx) => {
          const colors = TYPE_COLORS[r.type].split(" ");
          const isOpen = expanded === r.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8, scale: 0.98 },
              transition: {
                delay: Math.min(idx * 0.025, 0.4),
                duration: 0.3
              },
              className: cn(
                "glass-carbon rounded-2xl overflow-hidden border transition-all duration-300",
                isOpen ? "ring-1 ring-border/30 shadow-lg" : "hover:shadow-md"
              ),
              "data-ocid": `carbon.reaction.${r.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpanded(isOpen ? null : r.id),
                    className: "w-full text-left px-4 py-3 hover:bg-card/20 transition-colors flex items-start gap-3",
                    "aria-expanded": isOpen,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "text-xs px-2 py-0.5 rounded-full bg-gradient-to-r to-transparent border mt-0.5 flex-shrink-0",
                            colors.join(" ")
                          ),
                          children: r.type
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm truncate", children: r.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground mt-0.5 break-all", children: r.equation })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          animate: { rotate: isOpen ? 180 : 0 },
                          transition: { duration: 0.2 },
                          className: "flex-shrink-0 mt-1",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { height: 0, opacity: 0 },
                    animate: { height: "auto", opacity: 1 },
                    exit: { height: 0, opacity: 0 },
                    transition: { duration: 0.25, ease: "easeInOut" },
                    className: cn(
                      "border-t border-border/20 px-4 py-4 space-y-3 bg-gradient-to-br to-transparent",
                      colors[0],
                      colors[1]
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-carbon rounded-lg px-3 py-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Conditions" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/90", children: r.conditions })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-carbon rounded-lg px-3 py-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Explanation" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/90", children: r.explanation })
                        ] })
                      ] }),
                      r.mechanism && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-carbon rounded-lg px-3 py-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Mechanism" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono text-foreground/80 whitespace-pre-wrap leading-relaxed", children: r.mechanism })
                      ] })
                    ]
                  }
                ) })
              ]
            },
            r.id
          );
        }) }) })
      ]
    }
  );
});
const REAL_LIFE_USES = [
  {
    category: "⛽ Carbon in Fuels",
    color: "from-orange-400/20 to-red-400/20",
    border: "border-orange-400/30",
    accent: "text-orange-300",
    items: [
      {
        title: "Natural Gas (Methane)",
        detail: "CH₄ — cleanest burning fossil fuel. Used for heating, cooking, power generation. ΔH combustion = −890 kJ/mol. Extracted from underground reservoirs and as landfill biogas."
      },
      {
        title: "Petroleum/Crude Oil",
        detail: "Complex mixture of alkanes (C₅–C₂₅). Fractional distillation separates: petroleum gas, petrol, kerosene, diesel, fuel oil, lubricants, bitumen. Global energy backbone."
      },
      {
        title: "Coal",
        detail: "Mainly carbon + hydrocarbons. Anthracite (94% C), bituminous coal, lignite. Used in power plants, steel-making (coke). Carbon cycle concern: releases CO₂ stored for millions of years."
      },
      {
        title: "Biofuels",
        detail: "Ethanol from fermentation of sugars (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂). Biodiesel from esterification of vegetable oils. Carbon-neutral in theory — CO₂ fixed by next crop."
      }
    ]
  },
  {
    category: "🧬 Carbon in Biology",
    color: "from-green-400/20 to-teal-400/20",
    border: "border-green-400/30",
    accent: "text-green-300",
    items: [
      {
        title: "Organic Molecules of Life",
        detail: "All biomolecules are carbon-based: carbohydrates, proteins, lipids, nucleic acids. Carbon's tetravalency and ability to form chains makes molecular diversity possible — >10 million known compounds."
      },
      {
        title: "DNA and RNA",
        detail: "Deoxyribose (C₅H₁₀O₄) and ribose sugars form the backbone. Nitrogen bases (adenine, guanine, etc.) contain aromatic carbon rings. DNA is the most information-dense carbon compound known."
      },
      {
        title: "Proteins and Enzymes",
        detail: "Amino acids (H₂N-CHR-COOH) — carbon with both amine and acid groups. Peptide bonds (C-N) link them. Enzymes catalyse reactions at rate 10⁶–10¹² times faster than uncatalysed."
      },
      {
        title: "Carbohydrates",
        detail: "CₙH₂ₙOₙ general formula. Glucose (C₆H₁₂O₆) — primary cellular fuel. Starch and cellulose are both (C₆H₁₀O₅)ₙ polymers but differ in glycosidic linkage — α vs β."
      }
    ]
  },
  {
    category: "🔩 Carbon in Materials",
    color: "from-sky-400/20 to-indigo-400/20",
    border: "border-sky-400/30",
    accent: "text-sky-300",
    items: [
      {
        title: "Carbon Fibre",
        detail: "Graphite-like sheets aligned in fibres. 5× stronger than steel, 2× stiffer, ¼ the weight. Used in aircraft, F1 cars, bicycles, sports equipment. Produced by pyrolysis of PAN (polyacrylonitrile)."
      },
      {
        title: "Graphene Electronics",
        detail: "Single atom layer — electron mobility 200,000 cm²/Vs (100× silicon). Transparent yet conducts well. Potential for flexible displays, ultrafast transistors, biosensors, water filters."
      },
      {
        title: "Diamond Tools",
        detail: "Industrial diamond powder (synthetic or mined) coats cutting/grinding tools. Mohs 10 — scratches everything. Diamond-tipped drill bits used in oil exploration and precision machining."
      },
      {
        title: "Activated Carbon",
        detail: "Highly porous charcoal (surface area 500–1500 m²/g). Adsorbs toxins, gases, contaminants. Used in water purifiers, air filters, emergency poison treatment, and gold extraction."
      },
      {
        title: "Carbon Nanotubes",
        detail: "Rolled graphene sheets — diameter 1 nm. Tensile strength 100× steel. Thermal conductivity > diamond. Applications: nano-electronics, drug delivery, high-strength composites."
      },
      {
        title: "Fullerene C₆₀ in Medicine",
        detail: "Buckminsterfullerene — drug delivery cage, free radical scavenger. Research in HIV protease inhibition, targeted cancer therapy, and neuroprotection. Explored as hydrogen storage medium."
      }
    ]
  }
];
const FORMULAS = [
  {
    label: "Alkane",
    formula: "CₙH₂ₙ₊₂",
    note: "Max H; no double/triple bonds",
    color: "text-orange-300"
  },
  {
    label: "Alkene",
    formula: "CₙH₂ₙ",
    note: "One C=C double bond",
    color: "text-green-300"
  },
  {
    label: "Alkyne",
    formula: "CₙH₂ₙ₋₂",
    note: "One C≡C triple bond",
    color: "text-violet-300"
  },
  {
    label: "Cycloalkane",
    formula: "CₙH₂ₙ",
    note: "Ring; same as alkene — isomers",
    color: "text-sky-300"
  },
  {
    label: "Benzene",
    formula: "C₆H₆",
    note: "Aromatic; (CₙH₂ₙ₋₆) general",
    color: "text-purple-300"
  },
  {
    label: "Alcohol",
    formula: "CₙH₂ₙ₊₂O",
    note: "Contains –OH group",
    color: "text-blue-300"
  },
  {
    label: "Carboxylic Acid",
    formula: "CₙH₂ₙO₂",
    note: "Contains –COOH group",
    color: "text-red-300"
  },
  {
    label: "Aldehyde",
    formula: "CₙH₂ₙO",
    note: "Contains –CHO group",
    color: "text-yellow-300"
  }
];
const IMPORTANT_POINTS = [
  {
    emoji: "🎯",
    title: "Markovnikov's Rule",
    text: "In electrophilic addition to alkenes, H adds to C with more H; halogen (or other group) to C with fewer H (more substituted C)."
  },
  {
    emoji: "🔄",
    title: "Anti-Markovnikov (Peroxide)",
    text: "In presence of peroxide, HBr adds via free-radical mechanism — reversal of Markovnikov. Only for HBr (not HCl or HI)."
  },
  {
    emoji: "⚡",
    title: "Saytzeff's Rule",
    text: "In elimination reactions, the more substituted (more stable) alkene is the major product. More alkyl groups = more stable alkene."
  },
  {
    emoji: "🔬",
    title: "SN1 vs SN2",
    text: "SN2: primary halides + strong nucleophile + polar aprotic. SN1: tertiary halides + weak nucleophile + polar protic. Order: CH₃X > 1° for SN2; 3° > 2° for SN1."
  },
  {
    emoji: "💡",
    title: "sp³ vs sp² vs sp",
    text: "sp³: tetrahedral (109.5°), all σ bonds, alkanes/diamond. sp²: trigonal planar (120°), one π bond, alkenes/graphene. sp: linear (180°), two π bonds, alkynes/CO₂."
  },
  {
    emoji: "🧪",
    title: "Test for Aldehyde vs Ketone",
    text: "Tollens' (silver mirror) and Fehling's (brick-red ppt) are positive for aldehydes, negative for ketones. Iodoform (+) for CH₃CO– (methyl ketones) and ethanol."
  },
  {
    emoji: "🔗",
    title: "Peptide Bond",
    text: "–CO–NH– linkage between amino acids. Formed by condensation (loss of H₂O). 'C-terminal' and 'N-terminal' describe protein chain directionality."
  },
  {
    emoji: "⚗️",
    title: "Combustion Degree Rule",
    text: "Degree of unsaturation (DBE) = (2C + 2 + N – H – X) / 2. Each ring or double bond = 1 DBE; triple bond = 2 DBE."
  },
  {
    emoji: "🌡️",
    title: "Boiling Point Trends",
    text: "Branching lowers BP (less surface area). OH/COOH raise BP dramatically (H-bonding). Homologous series: BP rises ~30°C per CH₂."
  },
  {
    emoji: "📝",
    title: "JEE Key: Isomers of C₄H₁₀",
    text: "n-Butane (straight) and isobutane/2-methylpropane (branched) are the only two chain isomers. Isobutane has lower BP (−11.7°C vs −0.5°C)."
  }
];
const NAMED_REACTIONS_SUMMARY = [
  {
    name: "Aldol",
    from: "Aldehyde/ketone with α-H",
    to: "β-hydroxy carbonyl (aldol product)",
    catalyst: "Dil. NaOH"
  },
  {
    name: "Cannizzaro",
    from: "Aldehyde without α-H (e.g. HCHO)",
    to: "Salt of acid + alcohol",
    catalyst: "Conc. NaOH"
  },
  {
    name: "Grignard",
    from: "RX + Mg + carbonyl",
    to: "Alcohol (1°, 2°, or 3°)",
    catalyst: "Dry ether, Mg"
  },
  {
    name: "Esterification",
    from: "RCOOH + R'OH",
    to: "RCOOR' + H₂O",
    catalyst: "H₂SO₄, heat"
  },
  {
    name: "Ozonolysis",
    from: "Alkene + O₃",
    to: "2 Aldehydes (reductive) or Acids (oxidative)",
    catalyst: "O₃, then Zn/H₂O or H₂O₂"
  },
  {
    name: "Wittig",
    from: "Carbonyl + ylide",
    to: "Alkene + Ph₃P=O",
    catalyst: "Base + Ph₃P=CR₂"
  },
  {
    name: "Diels-Alder",
    from: "Diene + dienophile",
    to: "6-membered ring",
    catalyst: "Heat, [4+2]"
  },
  {
    name: "Sandmeyer",
    from: "ArN₂⁺ + CuX",
    to: "Aryl halide / nitrile",
    catalyst: "CuCl/CuBr/CuCN"
  }
];
function ExpandableRealLifeCard({
  category,
  color,
  border,
  accent,
  items,
  index
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.12, duration: 0.4 },
      whileHover: { y: -2 },
      className: cn(
        "glass-carbon rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow",
        border
      ),
      "data-ocid": `carbon.reallife.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(!open),
            className: "w-full flex items-center justify-between px-5 py-4 hover:bg-card/20 transition-colors",
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-display font-bold text-base", accent), children: category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  animate: { rotate: open ? 180 : 0 },
                  transition: { duration: 0.2 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5 text-muted-foreground" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3, ease: "easeInOut" },
            className: cn(
              "border-t border-border/20 px-5 py-4 bg-gradient-to-br to-transparent space-y-3",
              color
            ),
            children: items.map((item, ii) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: ii * 0.07 },
                className: "glass-carbon rounded-xl p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-semibold text-sm mb-1", accent), children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed", children: item.detail })
                ]
              },
              item.title
            ))
          }
        ) })
      ]
    }
  );
}
const CarbonRealLife = reactExports.memo(function CarbonRealLife2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-4",
      "data-ocid": "carbon.reallife_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Carbon in the Real World" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xl mx-auto", children: "From the fuels that power civilisation to the molecules of life — carbon is everywhere." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: REAL_LIFE_USES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableRealLifeCard, { ...cat, index: i }, cat.category)) })
      ]
    }
  );
});
const CarbonRevision = reactExports.memo(function CarbonRevision2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "space-y-6",
      "data-ocid": "carbon.revision_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "⚡ Quick Revision" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "JEE/NEET flashcards — key formulas, rules, and named reactions at a glance." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3", children: "General Formulae" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: FORMULAS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-carbon rounded-xl px-4 py-3 flex-shrink-0",
              "data-ocid": `carbon.revision.formula.${f.label.toLowerCase().replace(/\s+/g, "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-mono text-lg font-bold", f.color), children: f.formula }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: f.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: f.note })
              ]
            },
            f.label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3", children: "JEE / NEET Key Points" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: IMPORTANT_POINTS.map((pt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: i % 2 === 0 ? -15 : 15 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.05 },
              className: "glass-carbon rounded-xl p-3",
              "data-ocid": `carbon.revision.point.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: pt.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: pt.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: pt.text })
              ]
            },
            pt.title
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3", children: "Named Reactions Quick Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass-carbon rounded-2xl overflow-hidden",
              "data-ocid": "carbon.revision.named_reactions",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20", children: [
                  "Reaction",
                  "Reactants",
                  "Products",
                  "Catalyst/Conditions"
                ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wider",
                    children: h
                  },
                  h
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: NAMED_REACTIONS_SUMMARY.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/10 hover:bg-card/20 transition-colors",
                    "data-ocid": `carbon.revision.reaction.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-semibold text-foreground", children: r.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: r.from }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: r.to }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: r.catalyst })
                    ]
                  },
                  r.name
                )) })
              ] }) })
            }
          )
        ] })
      ]
    }
  );
});
const TABS = [
  { id: "allotropes", label: "Allotropes", short: "Allotropes" },
  { id: "hybridization", label: "Hybridization", short: "Hybrid." },
  { id: "organic", label: "Organic Series", short: "Organic" },
  { id: "functional", label: "Functional Groups", short: "F. Groups" },
  { id: "isomerism", label: "Isomerism", short: "Isomers" },
  { id: "reactions", label: "Reactions", short: "Rxns" },
  { id: "reallife", label: "Real-Life Uses", short: "Real Life" },
  { id: "revision", label: "Quick Revision", short: "Revision" }
];
const CarbonPage = reactExports.memo(function CarbonPage2() {
  const [activeTab, setActiveTab] = reactExports.useState("allotropes");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-10", "data-ocid": "carbon.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
        className: "text-center mb-8 max-w-3xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.1, duration: 0.4 },
              className: "inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-4 h-4 text-foreground/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "C · Atomic Number 6 · Interactive 3D" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground/90 via-foreground/70 to-muted-foreground bg-clip-text text-transparent", children: "The Many Faces of Carbon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "Carbon forms more compounds than any other element. Explore interactive 3D allotropes, hybridization, organic chemistry, reactions, and real-world applications." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-carbon rounded-2xl p-1.5 overflow-x-auto",
        role: "tablist",
        "aria-label": "Carbon chemistry sections",
        "data-ocid": "carbon.section_tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center relative", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeTab === tab.id,
            onClick: () => setActiveTab(tab.id),
            className: cn(
              "relative px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap",
              activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card/20"
            ),
            "data-ocid": `carbon.tab.${tab.id}`,
            children: [
              activeTab === tab.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  layoutId: "carbon-tab-pill",
                  className: "absolute inset-0 bg-card/60 rounded-xl border border-border/20 shadow-sm",
                  transition: { type: "spring", stiffness: 500, damping: 35 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: tab.short }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: tab.label })
              ] })
            ]
          },
          tab.id
        )) })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 14, scale: 0.99 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.99 },
        transition: { duration: 0.3, ease: "easeOut" },
        "data-ocid": `carbon.section.${activeTab}`,
        children: [
          activeTab === "allotropes" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonAllotropes, {}),
          activeTab === "hybridization" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonHybridization, {}),
          activeTab === "organic" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonOrganicBasics, {}),
          activeTab === "functional" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonFunctionalGroups, {}),
          activeTab === "isomerism" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonIsomerism, {}),
          activeTab === "reactions" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonReactions, {}),
          activeTab === "reallife" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonRealLife, {}),
          activeTab === "revision" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonRevision, {})
        ]
      },
      activeTab
    ) }) })
  ] });
});
export {
  CarbonPage
};
