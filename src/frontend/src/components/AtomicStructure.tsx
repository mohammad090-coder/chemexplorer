import { useAnimationLevel } from "@/lib/performance";
import type { ElementCategory } from "@/types/element";
import { motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ── Noble gas core electron counts ───────────────────────────────────────────
const NOBLE_GAS_SHELLS: Record<string, number[]> = {
  He: [2],
  Ne: [2, 8],
  Ar: [2, 8, 8],
  Kr: [2, 8, 18, 8],
  Xe: [2, 8, 18, 18, 8],
  Rn: [2, 8, 18, 32, 18, 8],
};

const SUBSHELL_CAPACITY: Record<string, number> = {
  s: 2,
  p: 6,
  d: 10,
  f: 14,
};

function parseOrbitalToken(
  token: string,
): { n: number; sub: string; count: number } | null {
  const m = token.match(/^(\d)([spdf])(\d+)$/);
  if (!m) return null;
  const n = Number.parseInt(m[1], 10);
  const sub = m[2];
  const raw = Number.parseInt(m[3], 10);
  const count = Math.min(raw, SUBSHELL_CAPACITY[sub] ?? raw);
  return { n, sub, count };
}

function normalizeSuperscripts(s: string): string {
  const superMap: Record<string, string> = {
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9",
  };
  return s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (ch) => superMap[ch] ?? ch);
}

export function parseShells(electronConfiguration: string): number[] {
  const normalized = normalizeSuperscripts(electronConfiguration.trim());
  let base: number[] = [];
  let rest = normalized;

  const nobleMatch = rest.match(/^\[([A-Z][a-z]?)\]\s*/);
  if (nobleMatch) {
    const symbol = nobleMatch[1];
    base = [...(NOBLE_GAS_SHELLS[symbol] ?? [])];
    rest = rest.slice(nobleMatch[0].length);
  }

  const shellMap: Record<number, number> = {};
  base.forEach((count, i) => {
    shellMap[i + 1] = (shellMap[i + 1] ?? 0) + count;
  });

  const tokens =
    rest.match(/\d[spdf]\d+/g) ??
    rest.replace(/\s+/g, "").match(/\d[spdf]\d+/g) ??
    [];

  for (const tok of tokens) {
    const parsed = parseOrbitalToken(tok);
    if (parsed) {
      shellMap[parsed.n] = (shellMap[parsed.n] ?? 0) + parsed.count;
    }
  }

  const maxN = Math.max(...Object.keys(shellMap).map(Number), 1);
  const shells: number[] = [];
  for (let n = 1; n <= maxN; n++) {
    const c = shellMap[n] ?? 0;
    if (c > 0) shells.push(c);
  }

  if (shells.length === 0) return [1];
  return shells.slice(0, 5);
}

// Parse subshell types per shell for orbital model visuals
function parseShellSubshells(
  electronConfiguration: string,
): Record<number, string[]> {
  const normalized = normalizeSuperscripts(electronConfiguration.trim());
  let rest = normalized;

  const nobleMatch = rest.match(/^\[([A-Z][a-z]?)\]\s*/);
  if (nobleMatch) rest = rest.slice(nobleMatch[0].length);

  const tokens = rest.match(/\d[spdf]\d+/g) ?? [];
  const map: Record<number, string[]> = {};
  for (const tok of tokens) {
    const parsed = parseOrbitalToken(tok);
    if (parsed) {
      if (!map[parsed.n]) map[parsed.n] = [];
      if (!map[parsed.n].includes(parsed.sub)) map[parsed.n].push(parsed.sub);
    }
  }
  return map;
}

// ── Category → raw color values ───────────────────────────────────────────────
const CATEGORY_ELECTRON_COLOR: Record<string, string> = {
  "alkali-metal": "#22d3ee",
  "alkaline-earth-metal": "#e879f9",
  "transition-metal": "#a78bfa",
  "post-transition-metal": "#60a5fa",
  metalloid: "#fb7185",
  nonmetal: "#fb923c",
  halogen: "#34d399",
  "noble-gas": "#facc15",
  lanthanide: "#818cf8",
  actinide: "#f87171",
  unknown: "#94a3b8",
};

const CATEGORY_NUCLEUS_COLOR: Record<string, string> = {
  "alkali-metal": "#06b6d4",
  "alkaline-earth-metal": "#d946ef",
  "transition-metal": "#8b5cf6",
  "post-transition-metal": "#3b82f6",
  metalloid: "#f43f5e",
  nonmetal: "#f97316",
  halogen: "#10b981",
  "noble-gas": "#eab308",
  lanthanide: "#6366f1",
  actinide: "#ef4444",
  unknown: "#64748b",
};

const SHELL_DURATIONS = [2000, 3200, 4800, 7000, 10000];
const SHELL_RADII = [38, 62, 86, 110, 134];

// Nucleus cluster particles: [offsetX, offsetY, size, isProton]
const NUCLEUS_PARTICLES = [
  [0, 0, 9, true],
  [-4, -4, 7, false],
  [5, -3, 7, true],
  [-5, 4, 6, false],
  [4, 5, 6, true],
  [-2, 6, 5, false],
  [6, 1, 5, true],
  [-6, -1, 5, false],
  [1, -7, 5, true],
] as const;

// Minimal nucleus: just 3 particles for low-end devices
const NUCLEUS_PARTICLES_MINIMAL = [
  [0, 0, 9, true],
  [-4, -4, 7, false],
  [5, -3, 7, true],
] as const;

export type AtomModel = "bohr" | "orbital";

interface AtomicStructureProps {
  atomicNumber: number;
  electronConfiguration: string;
  category: ElementCategory;
  visible?: boolean;
  model?: AtomModel;
  onModelChange?: (m: AtomModel) => void;
  showToggle?: boolean;
  size?: "sm" | "md";
}

// ── Electron tooltip ──────────────────────────────────────────────────────────
interface TooltipInfo {
  label: string;
  x: number;
  y: number;
}

export const AtomicStructure = memo(function AtomicStructure({
  atomicNumber,
  electronConfiguration,
  category,
  visible = true,
  model = "bohr",
  onModelChange,
  showToggle = false,
  size = "md",
}: AtomicStructureProps) {
  const animationLevel = useAnimationLevel();

  const allShells = useMemo(
    () => parseShells(electronConfiguration),
    [electronConfiguration],
  );

  // Cap shells based on animation level
  const maxShells =
    animationLevel === "minimal" ? 2 : animationLevel === "reduced" ? 3 : 5;
  const shells = useMemo(
    () => allShells.slice(0, maxShells),
    [allShells, maxShells],
  );

  const shellSubshells = useMemo(
    () => parseShellSubshells(electronConfiguration),
    [electronConfiguration],
  );

  const electronColor = CATEGORY_ELECTRON_COLOR[category] ?? "#94a3b8";
  const nucleusColor = CATEGORY_NUCLEUS_COLOR[category] ?? "#64748b";
  const protonColor = "#f97316";
  const neutronColor = "#60a5fa";

  const numShells = shells.length;
  const maxRadius = SHELL_RADII[numShells - 1] ?? SHELL_RADII[0];
  const naturalSize = (maxRadius + 14) * 2;
  const center = naturalSize / 2;
  const targetSize = size === "sm" ? 180 : 220;
  const scale = targetSize / naturalSize;

  // Drag-to-rotate — disabled for reduced/minimal
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    rx: number;
    ry: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);

  const safeCat = category.replace(/-/g, "_");
  const pulseAnim = `atomNucleusPulse_${safeCat}`;
  const pulseScaleAnim = `atomNucleusScale_${safeCat}`;

  // ── Drag handlers — only active for 'full' level ──────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (animationLevel !== "full") return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        rx: rotX,
        ry: rotY,
      };
    },
    [rotX, rotY, animationLevel],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (animationLevel !== "full" || !dragRef.current) return;
      const dx = (e.clientX - dragRef.current.startX) * 0.4;
      const dy = (e.clientY - dragRef.current.startY) * 0.4;
      setRotY(Math.max(-30, Math.min(30, dragRef.current.ry + dx)));
      setRotX(Math.max(-30, Math.min(30, dragRef.current.rx - dy)));
    },
    [animationLevel],
  );

  const onPointerUp = useCallback(() => {
    if (animationLevel !== "full") return;
    dragRef.current = null;
    const springBack = () => {
      setRotX((rx) => {
        const next = rx * 0.88;
        return Math.abs(next) < 0.2 ? 0 : next;
      });
      setRotY((ry) => {
        const next = ry * 0.88;
        return Math.abs(next) < 0.2 ? 0 : next;
      });
    };
    let frame = 0;
    const animate = () => {
      springBack();
      frame++;
      if (frame < 40) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [animationLevel]);

  // ── Electron hover ────────────────────────────────────────────────────────
  const getOrbitalLabel = useCallback(
    (shellIdx: number, eIdx: number) => {
      const n = shellIdx + 1;
      const subs = shellSubshells[n] ?? ["s"];
      let cumCount = 0;
      for (const sub of subs) {
        const cap = SUBSHELL_CAPACITY[sub] ?? 2;
        if (eIdx < cumCount + cap) {
          const ml =
            sub === "s"
              ? 0
              : Math.floor((eIdx - cumCount) / 2) - Math.floor(cap / 4);
          return `${n}${sub} orbital, l=${sub === "s" ? 0 : sub === "p" ? 1 : sub === "d" ? 2 : 3}, mₗ=${ml}`;
        }
        cumCount += cap;
      }
      return `Shell ${n}, e⁻ ${eIdx + 1}`;
    },
    [shellSubshells],
  );

  // Dismiss tooltip on click outside
  useEffect(() => {
    if (!tooltip) return;
    const handler = () => setTooltip(null);
    window.addEventListener("click", handler, { once: true });
    return () => window.removeEventListener("click", handler);
  }, [tooltip]);

  // ── Minimal mode: pure CSS animation, no RAF, no drag ────────────────────
  if (animationLevel === "minimal") {
    return (
      <div
        className="flex flex-col items-center gap-3 w-full select-none"
        role="img"
        aria-label={`Atomic structure diagram showing ${numShells} electron shell${numShells !== 1 ? "s" : ""}`}
      >
        <div
          style={{
            width: targetSize,
            height: targetSize,
            position: "relative",
          }}
        >
          {/* Simple nucleus */}
          <div
            className="absolute rounded-full"
            style={{
              width: 18,
              height: 18,
              top: targetSize / 2 - 9,
              left: targetSize / 2 - 9,
              background: `radial-gradient(circle at 35% 30%, ${protonColor}ff, ${protonColor}88)`,
              boxShadow: `0 0 12px 6px ${nucleusColor}55`,
            }}
            aria-hidden="true"
          />
          <span
            className="absolute font-bold text-white/90 pointer-events-none select-none z-10"
            style={{
              top: targetSize / 2 - 5,
              left: targetSize / 2 - 5,
              width: 10,
              textAlign: "center",
              lineHeight: 1,
              fontSize: atomicNumber > 99 ? "5px" : "7px",
            }}
            aria-hidden="true"
          >
            {atomicNumber}
          </span>
          {/* CSS-only orbiting electrons — no RAF */}
          {shells.slice(0, 2).map((electronCount, shellIdx) => {
            const radius = (SHELL_RADII[shellIdx] * targetSize) / naturalSize;
            const angleStep = 360 / electronCount;
            return Array.from({ length: electronCount }).map((_item, eIdx) => {
              const angle = eIdx * angleStep;
              const rad = (angle * Math.PI) / 180;
              const ex = targetSize / 2 + radius * Math.cos(rad);
              const ey = targetSize / 2 + radius * Math.sin(rad);
              const dur = SHELL_DURATIONS[shellIdx] / 1000;
              const eKey = `minimal-s${shellIdx}-e${eIdx}-a${Math.round(angle)}`;
              return (
                <div
                  key={eKey}
                  className="absolute rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    top: ey - 2.5,
                    left: ex - 2.5,
                    background: electronColor,
                    boxShadow: `0 0 4px 2px ${electronColor}88`,
                    animation: `orbit ${dur}s linear infinite`,
                    transformOrigin: `${targetSize / 2 - ex + 2.5}px ${targetSize / 2 - ey + 2.5}px`,
                  }}
                  aria-hidden="true"
                />
              );
            });
          })}
        </div>

        {showToggle && onModelChange && (
          <div
            className="flex rounded-lg overflow-hidden border"
            style={{
              borderColor: `${electronColor}33`,
              background: "rgba(0,0,0,0.3)",
            }}
            data-ocid="atom.model_toggle"
          >
            {(["bohr", "orbital"] as AtomModel[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onModelChange(m)}
                className="px-3 py-1 text-[11px] font-medium transition-colors duration-200 capitalize"
                style={{
                  background:
                    model === m ? `${electronColor}22` : "transparent",
                  color: model === m ? electronColor : "rgba(148,163,184,0.7)",
                  borderRight:
                    m === "bohr" ? `1px solid ${electronColor}22` : "none",
                }}
                data-ocid={`atom.model_toggle.${m}`}
                aria-pressed={model === m}
              >
                {m === "bohr" ? "Bohr" : "Orbital"}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Full / Reduced mode: RAF-based animation ──────────────────────────────
  const nucleusParticles =
    animationLevel === "reduced"
      ? NUCLEUS_PARTICLES_MINIMAL
      : NUCLEUS_PARTICLES;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 w-full select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.05,
      }}
      role="img"
      aria-label={`Atomic structure diagram showing ${numShells} electron shell${numShells !== 1 ? "s" : ""}`}
    >
      {/* ── Atom canvas ───────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className={
          animationLevel === "full"
            ? "relative shrink-0 cursor-grab active:cursor-grabbing"
            : "relative shrink-0"
        }
        style={{
          width: naturalSize * scale,
          height: naturalSize * scale,
          touchAction: animationLevel === "full" ? "none" : "auto",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          style={{
            width: naturalSize,
            height: naturalSize,
            transform: `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transformOrigin: "top left",
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: dragRef.current ? "none" : undefined,
          }}
        >
          {/* ── SVG orbit rings ─────────────────────────────────────────── */}
          <svg
            width={naturalSize}
            height={naturalSize}
            className="absolute inset-0 pointer-events-none"
            overflow="visible"
            aria-hidden="true"
          >
            {shells.map((_, shellIdx) => {
              const r = SHELL_RADII[shellIdx];
              const n = shellIdx + 1;
              const subs = shellSubshells[n] ?? ["s"];
              const hasP = subs.includes("p");
              const isOrbital = model === "orbital";

              if (isOrbital && hasP) {
                return (
                  <ellipse
                    key={`orbit-${r}`}
                    cx={center}
                    cy={center}
                    rx={r * 1.15}
                    ry={r * 0.72}
                    fill="none"
                    stroke={electronColor}
                    strokeWidth={1}
                    strokeOpacity={0.22 + shellIdx * 0.04}
                    strokeDasharray="4 5"
                    transform={`rotate(${shellIdx * 25} ${center} ${center})`}
                  />
                );
              }
              return (
                <circle
                  key={`orbit-${r}`}
                  cx={center}
                  cy={center}
                  r={r}
                  fill="none"
                  stroke={electronColor}
                  strokeWidth={1}
                  strokeOpacity={0.18 + shellIdx * 0.04}
                  strokeDasharray="3 4"
                />
              );
            })}

            {/* Orbital model: p-orbital lobe pairs — skip on reduced */}
            {model === "orbital" &&
              animationLevel === "full" &&
              shells.map((_, shellIdx) => {
                const n = shellIdx + 1;
                const subs = shellSubshells[n] ?? [];
                if (!subs.includes("p")) return null;
                const r = SHELL_RADII[shellIdx];
                return (
                  <g key={`lobe-${n}`} opacity={0.14}>
                    <ellipse
                      cx={center - r * 0.7}
                      cy={center}
                      rx={r * 0.55}
                      ry={r * 0.28}
                      fill={electronColor}
                      transform={`rotate(-10 ${center} ${center})`}
                    />
                    <ellipse
                      cx={center + r * 0.7}
                      cy={center}
                      rx={r * 0.55}
                      ry={r * 0.28}
                      fill={electronColor}
                      transform={`rotate(-10 ${center} ${center})`}
                    />
                    <ellipse
                      cx={center}
                      cy={center - r * 0.7}
                      rx={r * 0.28}
                      ry={r * 0.55}
                      fill={electronColor}
                      transform={`rotate(15 ${center} ${center})`}
                    />
                    <ellipse
                      cx={center}
                      cy={center + r * 0.7}
                      rx={r * 0.28}
                      ry={r * 0.55}
                      fill={electronColor}
                      transform={`rotate(15 ${center} ${center})`}
                    />
                  </g>
                );
              })}

            {/* Shell number labels (Bohr model) */}
            {model === "bohr" &&
              shells.map((_, shellIdx) => {
                const r = SHELL_RADII[shellIdx];
                const n = shellIdx + 1;
                return (
                  <text
                    key={`label-n${n}`}
                    x={center + r + 4}
                    y={center + 4}
                    fontSize="8"
                    fill={electronColor}
                    fillOpacity={0.55}
                    fontFamily="monospace"
                  >
                    n={n}
                  </text>
                );
              })}
          </svg>

          {/* ── Nucleus cluster ─────────────────────────────────────────── */}
          {nucleusParticles.map((particle) => {
            const [ox, oy, sz, isProton] = particle as [
              number,
              number,
              number,
              boolean,
            ];
            const col = isProton ? protonColor : neutronColor;
            const particleKey = `nuc-${ox}-${oy}`;
            const isCenter = ox === 0 && oy === 0;
            return (
              <div
                key={particleKey}
                className="absolute rounded-full"
                style={{
                  width: sz,
                  height: sz,
                  top: center + oy - sz / 2,
                  left: center + ox - sz / 2,
                  background: `radial-gradient(circle at 35% 30%, ${col}ff, ${col}88)`,
                  boxShadow: `0 0 ${sz * 1.2}px ${sz * 0.6}px ${col}55`,
                  zIndex: isCenter ? 5 : 3,
                  willChange: "transform",
                  animationName: isCenter
                    ? `${pulseAnim}, ${pulseScaleAnim}`
                    : undefined,
                  animationDuration: isCenter ? "2.4s, 2.4s" : undefined,
                  animationTimingFunction: isCenter
                    ? "ease-in-out, ease-in-out"
                    : undefined,
                  animationIterationCount: isCenter
                    ? "infinite, infinite"
                    : undefined,
                }}
                aria-hidden="true"
              />
            );
          })}

          {/* Nucleus glow ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 32,
              height: 32,
              top: center - 16,
              left: center - 16,
              boxShadow: `0 0 18px 8px ${nucleusColor}44, 0 0 40px 16px ${nucleusColor}22`,
              animationName: pulseAnim,
              animationDuration: "2.4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              willChange: "box-shadow",
            }}
            aria-hidden="true"
          />

          {/* Atomic number label */}
          <span
            className="absolute font-bold text-white/95 pointer-events-none select-none z-10"
            style={{
              top: center - 5,
              left: center - 5,
              width: 10,
              textAlign: "center",
              lineHeight: 1,
              fontSize: atomicNumber > 99 ? "5px" : "7px",
            }}
            aria-hidden="true"
          >
            {atomicNumber}
          </span>

          {/* ── Electrons per shell (with depth illusion) ──────────────── */}
          {shells.map((electronCount, shellIdx) => {
            const radius = SHELL_RADII[shellIdx];
            const duration = SHELL_DURATIONS[shellIdx];
            const angleStep = 360 / electronCount;
            const n = shellIdx + 1;
            const subs = shellSubshells[n] ?? ["s"];
            const hasP = subs.includes("p");
            const isOrbital = model === "orbital";

            return Array.from({ length: electronCount }).map((_item, eIdx) => {
              const initialAngle = eIdx * angleStep;
              const electronKey = `r${radius}-a${Math.round(initialAngle)}`;

              const rx = isOrbital && hasP ? radius * 1.15 : radius;
              const ry = isOrbital && hasP ? radius * 0.72 : radius;
              const tiltAngle = isOrbital && hasP ? shellIdx * 25 : 0;

              return (
                <ElectronOrbit
                  key={electronKey}
                  center={center}
                  rx={rx}
                  ry={ry}
                  tiltDeg={tiltAngle}
                  initialAngle={initialAngle}
                  duration={duration}
                  electronColor={electronColor}
                  label={getOrbitalLabel(shellIdx, eIdx)}
                  onHover={setTooltip}
                  enableBlur={animationLevel === "full"}
                />
              );
            });
          })}
        </div>
      </div>

      {/* ── Tooltip ───────────────────────────────────────────────────────── */}
      {tooltip && (
        <div
          className="fixed z-[200] pointer-events-none px-2.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y - 36,
            background: "rgba(10,10,20,0.95)",
            border: `1px solid ${electronColor}55`,
            boxShadow: `0 0 12px ${electronColor}33`,
            color: electronColor,
            transform: "translateX(-50%)",
          }}
          aria-live="polite"
        >
          {tooltip.label}
        </div>
      )}

      {/* ── Model toggle ──────────────────────────────────────────────────── */}
      {showToggle && onModelChange && (
        <div
          className="flex rounded-lg overflow-hidden border"
          style={{
            borderColor: `${electronColor}33`,
            background: "rgba(0,0,0,0.3)",
          }}
          data-ocid="atom.model_toggle"
        >
          {(["bohr", "orbital"] as AtomModel[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onModelChange(m)}
              className="px-3 py-1 text-[11px] font-medium transition-all duration-200 capitalize"
              style={{
                background: model === m ? `${electronColor}22` : "transparent",
                color: model === m ? electronColor : "rgba(148,163,184,0.7)",
                borderRight:
                  m === "bohr" ? `1px solid ${electronColor}22` : "none",
              }}
              data-ocid={`atom.model_toggle.${m}`}
              aria-pressed={model === m}
            >
              {m === "bohr" ? "Bohr" : "Orbital"}
            </button>
          ))}
        </div>
      )}

      {/* ── CSS keyframes ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes ${pulseAnim} {
          0%, 100% { box-shadow: 0 0 18px 8px ${nucleusColor}44, 0 0 40px 16px ${nucleusColor}22; }
          50%       { box-shadow: 0 0 28px 12px ${nucleusColor}77, 0 0 60px 24px ${nucleusColor}44; }
        }
        @keyframes ${pulseScaleAnim} {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }
      `}</style>
    </motion.div>
  );
});

// ── ElectronOrbit — single animated electron with depth illusion ──────────────

interface ElectronOrbitProps {
  center: number;
  rx: number;
  ry: number;
  tiltDeg: number;
  initialAngle: number;
  duration: number;
  electronColor: string;
  label: string;
  onHover: (t: TooltipInfo | null) => void;
  enableBlur?: boolean;
}

const ElectronOrbit = memo(function ElectronOrbit({
  center,
  rx,
  ry,
  tiltDeg,
  initialAngle,
  duration,
  electronColor,
  label,
  onHover,
  enableBlur = true,
}: ElectronOrbitProps) {
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(-1);
  const divRef = useRef<HTMLDivElement>(null);
  const offsetMs = (initialAngle / 360) * duration;
  const tiltRad = (tiltDeg * Math.PI) / 180;

  useEffect(() => {
    let cancelled = false;

    const animate = (ts: number) => {
      if (cancelled) return;
      if (startTimeRef.current < 0) startTimeRef.current = ts - offsetMs;
      const elapsed = ts - startTimeRef.current;
      const angle = ((elapsed / duration) * Math.PI * 2) % (Math.PI * 2);

      const localX = rx * Math.cos(angle);
      const localY = ry * Math.sin(angle);

      const cosT = Math.cos(tiltRad);
      const sinT = Math.sin(tiltRad);
      const worldX = localX * cosT - localY * sinT;
      const worldY = localX * sinT + localY * cosT;

      const z = Math.sin(angle + tiltRad);
      const depthScale = 0.6 + 0.4 * ((z + 1) / 2);
      const depthOpacity = 0.4 + 0.6 * ((z + 1) / 2);
      // Only apply blur when enableBlur is true (full mode) and electron is "behind"
      const blur = enableBlur && z < 0 ? Math.abs(z) * 1.5 : 0;

      if (divRef.current) {
        divRef.current.style.transform = `translate(${center + worldX}px, ${center + worldY}px) scale(${depthScale})`;
        divRef.current.style.opacity = String(depthOpacity);
        divRef.current.style.filter =
          blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
        divRef.current.style.zIndex = String(z > 0 ? 10 : 2);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [center, rx, ry, tiltRad, duration, offsetMs, enableBlur]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      onHover({ label, x: e.clientX, y: e.clientY });
    },
    [label, onHover],
  );

  const handleMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  return (
    <div
      ref={divRef}
      className="absolute pointer-events-auto"
      style={{
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        willChange: "transform, opacity, filter",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full cursor-pointer"
        style={{
          width: 6,
          height: 6,
          top: -3,
          left: -3,
          background: electronColor,
          boxShadow: [
            `0 0 4px 2px ${electronColor}ff`,
            `0 0 10px 4px ${electronColor}88`,
            `0 0 18px 6px ${electronColor}44`,
          ].join(", "),
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={(e) => {
          const t = e.touches[0];
          onHover({ label, x: t.clientX, y: t.clientY });
          setTimeout(() => onHover(null), 2000);
        }}
      />
    </div>
  );
});
