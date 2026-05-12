import { GlassSlider } from "@/components/ui/GlassSlider";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AutoReactionTab } from "./lab/AutoReactionTab";
import { ConductivityTab } from "./lab/ConductivityTab";
import { ElectrolysisTab } from "./lab/ElectrolysisTab";
import { FlameTestTab } from "./lab/FlameTestTab";
import { KMnO4TitrationTab } from "./lab/KMnO4TitrationTab";
import { MohrSaltPrepTab, getTemperatureStyle } from "./lab/MohrSaltPrepTab";
import { NaOHOxalicTab } from "./lab/NaOHOxalicTab";
import { RustingTab } from "./lab/RustingTab";
import { SolubilityTab } from "./lab/SolubilityTab";

// ─── Types ────────────────────────────────────────────────────────────────────

type LabTab =
  | "titration"
  | "heating"
  | "precipitation"
  | "kmno4"
  | "mohr"
  | "naoh-oxalic"
  | "auto-reaction"
  | "electrolysis"
  | "rusting"
  | "flame-test"
  | "solubility"
  | "conductivity";

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

interface PrecipParticle {
  id: number;
  x: number;
  size: number;
  delay: number;
}

interface HeatingChemical {
  id: string;
  label: string;
  formula: string;
  threshold: number;
  color: string;
  reactionColor: string;
  gasColor: string;
  equation: string;
  observation: string;
  explanation: string;
}

interface PrecipReagentA {
  id: string;
  label: string;
  color: string;
}
interface PrecipReagentB {
  id: string;
  label: string;
  color: string;
}
interface PrecipResult {
  precipitate: string | null;
  precipColor: string;
  equation: string;
  explanation: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HEATING_CHEMICALS: HeatingChemical[] = [
  {
    id: "caco3",
    label: "CaCO₃",
    formula: "Calcium Carbonate",
    threshold: 840,
    color: "#e8e8e8",
    reactionColor: "#f5f0e8",
    gasColor: "rgba(200,200,220,0.6)",
    equation: "CaCO₃ → CaO + CO₂↑",
    observation:
      "White powder glows faintly, CO₂ gas bubbles rise, solid shrinks as CaO forms",
    explanation:
      "At 840°C, thermal energy breaks the C–O bond in carbonate. Calcium oxide (quicklime) remains and carbon dioxide escapes.",
  },
  {
    id: "kmno4",
    label: "KMnO₄",
    formula: "Potassium Permanganate",
    threshold: 240,
    color: "#7b2d8b",
    reactionColor: "#2d2d2d",
    gasColor: "rgba(220,150,50,0.5)",
    equation: "2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑",
    observation:
      "Deep purple solid turns dark green/black, oxygen gas evolves, mixture darkens",
    explanation:
      "Manganese is reduced from +7 to +6 (manganate) and +4 (MnO₂). Oxygen is released from the unstable permanganate.",
  },
  {
    id: "nh4cl",
    label: "NH₄Cl",
    formula: "Ammonium Chloride",
    threshold: 338,
    color: "#f0f0f0",
    reactionColor: "rgba(240,240,240,0.1)",
    gasColor: "rgba(240,240,255,0.7)",
    equation: "NH₄Cl(s) → NH₃(g) + HCl(g)",
    observation:
      "White solid sublimates (fades), dense white fumes of NH₃ and HCl appear above solid",
    explanation:
      "Ammonium chloride dissociates into ammonia and hydrogen chloride gases — a reversible thermal decomposition.",
  },
  {
    id: "cuno3",
    label: "Cu(NO₃)₂",
    formula: "Copper(II) Nitrate",
    threshold: 170,
    color: "#3b82f6",
    reactionColor: "#1a1a1a",
    gasColor: "rgba(180,80,20,0.6)",
    equation: "2Cu(NO₃)₂ → 2CuO + 4NO₂↑ + O₂↑",
    observation:
      "Blue-green crystals turn black (CuO), reddish-brown NO₂ fumes rise, pungent smell",
    explanation:
      "The nitrate group decomposes above 170°C. Copper is oxidised to CuO, and toxic brown NO₂ gas is produced along with O₂.",
  },
];

const REAGENTS_A: PrecipReagentA[] = [
  { id: "bacl2", label: "BaCl₂", color: "rgba(200,230,255,0.35)" },
  { id: "agno3", label: "AgNO₃", color: "rgba(230,230,210,0.35)" },
  { id: "pbno3", label: "Pb(NO₃)₂", color: "rgba(210,225,200,0.3)" },
  { id: "cacl2", label: "CaCl₂", color: "rgba(210,240,255,0.3)" },
];

const REAGENTS_B: PrecipReagentB[] = [
  { id: "na2so4", label: "Na₂SO₄", color: "rgba(200,220,255,0.3)" },
  { id: "nacl", label: "NaCl", color: "rgba(225,225,235,0.3)" },
  { id: "nai", label: "NaI", color: "rgba(215,210,180,0.3)" },
  { id: "na2co3", label: "Na₂CO₃", color: "rgba(200,235,220,0.3)" },
];

const PRECIP_RESULTS: Record<string, PrecipResult> = {
  bacl2_na2so4: {
    precipitate: "BaSO₄↓",
    precipColor: "#f5f5f5",
    equation: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
    explanation:
      "Barium ions combine with sulfate ions to form insoluble barium sulfate — a white precipitate used in X-ray imaging.",
  },
  bacl2_nacl: {
    precipitate: null,
    precipColor: "",
    equation: "BaCl₂ + 2NaCl → Ba²⁺ + 4Cl⁻ + 2Na⁺ (no reaction)",
    explanation: "All ions remain in solution. No insoluble product forms.",
  },
  bacl2_nai: {
    precipitate: null,
    precipColor: "",
    equation: "BaCl₂ + 2NaI → Ba²⁺ + 2I⁻ + 2Na⁺ + 2Cl⁻ (no reaction)",
    explanation: "Barium iodide is soluble. No precipitate forms.",
  },
  bacl2_na2co3: {
    precipitate: "BaCO₃↓",
    precipColor: "#efefef",
    equation: "BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl",
    explanation:
      "Barium and carbonate ions combine to form insoluble barium carbonate, a white precipitate.",
  },
  agno3_na2so4: {
    precipitate: "Ag₂SO₄↓",
    precipColor: "#fffde7",
    equation: "2AgNO₃ + Na₂SO₄ → Ag₂SO₄↓ + 2NaNO₃",
    explanation:
      "Silver sulfate is sparingly soluble — a pale yellow/cream precipitate forms.",
  },
  agno3_nacl: {
    precipitate: "AgCl↓",
    precipColor: "#f9f9f0",
    equation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
    explanation:
      "Silver chloride is virtually insoluble — a white/cream curdy precipitate forms instantly.",
  },
  agno3_nai: {
    precipitate: "AgI↓",
    precipColor: "#ffe066",
    equation: "AgNO₃ + NaI → AgI↓ + NaNO₃",
    explanation:
      "Silver iodide is highly insoluble — a bright yellow precipitate forms rapidly.",
  },
  agno3_na2co3: {
    precipitate: "Ag₂CO₃↓",
    precipColor: "#fffacd",
    equation: "2AgNO₃ + Na₂CO₃ → Ag₂CO₃↓ + 2NaNO₃",
    explanation: "Silver carbonate precipitates as a pale yellow solid.",
  },
  pbno3_na2so4: {
    precipitate: "PbSO₄↓",
    precipColor: "#f0f0ee",
    equation: "Pb(NO₃)₂ + Na₂SO₄ → PbSO₄↓ + 2NaNO₃",
    explanation: "Lead sulfate is insoluble — a white precipitate forms.",
  },
  pbno3_nacl: {
    precipitate: "PbCl₂↓",
    precipColor: "#f8f8f0",
    equation: "Pb(NO₃)₂ + 2NaCl → PbCl₂↓ + 2NaNO₃",
    explanation:
      "Lead chloride precipitates as a white solid, soluble in hot water.",
  },
  pbno3_nai: {
    precipitate: "PbI₂↓",
    precipColor: "#ffe834",
    equation: "Pb(NO₃)₂ + 2NaI → PbI₂↓ + 2NaNO₃",
    explanation:
      "Lead iodide forms a striking bright yellow precipitate — the 'golden rain' reaction.",
  },
  pbno3_na2co3: {
    precipitate: "PbCO₃↓",
    precipColor: "#f5f5f0",
    equation: "Pb(NO₃)₂ + Na₂CO₃ → PbCO₃↓ + 2NaNO₃",
    explanation: "Lead carbonate precipitates as a white solid.",
  },
  cacl2_na2so4: {
    precipitate: "CaSO₄↓",
    precipColor: "#f8f8f4",
    equation: "CaCl₂ + Na₂SO₄ → CaSO₄↓ + 2NaCl",
    explanation:
      "Calcium sulfate (gypsum) is sparingly soluble — a white precipitate forms.",
  },
  cacl2_nacl: {
    precipitate: null,
    precipColor: "",
    equation: "CaCl₂ + 2NaCl → Ca²⁺ + 4Cl⁻ + 2Na⁺ (no reaction)",
    explanation: "All ions remain in solution. No precipitate forms.",
  },
  cacl2_nai: {
    precipitate: null,
    precipColor: "",
    equation: "CaCl₂ + 2NaI → Ca²⁺ + 2I⁻ + 2Na⁺ + 2Cl⁻ (no reaction)",
    explanation: "Calcium iodide is soluble. No precipitate forms.",
  },
  cacl2_na2co3: {
    precipitate: "CaCO₃↓",
    precipColor: "#f5f5f5",
    equation: "CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl",
    explanation:
      "Calcium carbonate is insoluble in water — limestone/chalk precipitate forms as a white solid.",
  },
};

// ─── CSS Keyframes ────────────────────────────────────────────────────────────

const LAB_KEYFRAMES = `
@keyframes droplet-fall {
  0%   { transform: translateY(0) scale(1);    opacity: 0.9; }
  80%  { transform: translateY(60px) scale(0.85); opacity: 0.7; }
  100% { transform: translateY(72px) scale(0.6);  opacity: 0; }
}
@keyframes bubble-rise {
  0%   { transform: translateY(0) translateX(0) scale(1);      opacity: 0.75; }
  40%  { transform: translateY(-32px) translateX(3px) scale(0.9); opacity: 0.6; }
  100% { transform: translateY(-80px) translateX(-2px) scale(0.4); opacity: 0; }
}
@keyframes precip-fall {
  0%   { transform: translateY(0);    opacity: 0.9; }
  100% { transform: translateY(62px); opacity: 0.35; }
}
@keyframes flame-flicker {
  0%,100% { transform: scaleY(1)    scaleX(1);    opacity: 0.95; }
  33%      { transform: scaleY(1.1)  scaleX(0.9);  opacity: 1; }
  66%      { transform: scaleY(0.92) scaleX(1.06); opacity: 0.88; }
}
@keyframes flame-inner {
  0%,100% { transform: scaleY(1)    scaleX(1);    opacity: 0.6; }
  50%      { transform: scaleY(1.18) scaleX(0.88); opacity: 1; }
}
@keyframes flame-micro-flicker {
  0%,100% { transform: translateX(0); }
  25%      { transform: translateX(-1.5px); }
  75%      { transform: translateX(1.5px); }
}
@keyframes pour-stream {
  0%   { transform: scaleX(1);   opacity: 0.8; }
  50%  { transform: scaleX(1.3); opacity: 1; }
  100% { transform: scaleX(0.6); opacity: 0; }
}
@keyframes heat-glow-pulse {
  0%,100% { opacity: 0.5; }
  50%      { opacity: 0.9; }
}
@keyframes shimmer-liquid {
  0%,100% { opacity: 0.85; }
  50%      { opacity: 1; }
}
@keyframes liquid-surface {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-2px); }
}
@keyframes heat-shimmer {
  0%,100% { opacity: 0; transform: scaleX(1); }
  50%      { opacity: 0.4; transform: scaleX(1.04); }
}
@keyframes test-tube-tilt {
  0%   { transform: rotate(0deg); }
  30%  { transform: rotate(-58deg); }
  70%  { transform: rotate(-58deg); }
  100% { transform: rotate(0deg); }
}
@keyframes reaction-endpoint-pulse {
  0%,100% { opacity: 0; transform: scale(0.95); }
  50%      { opacity: 1; transform: scale(1.02); }
}
`;

// ─── SVG Beaker ───────────────────────────────────────────────────────────────

interface BeakerSVGProps {
  liquidColor: string;
  liquidPct: number; // 0-100
  label?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

const BeakerSVG = memo(function BeakerSVG({
  liquidColor,
  liquidPct,
  label,
  children,
  width = 90,
  height = 120,
}: BeakerSVGProps) {
  const w = width;
  const h = height;
  // Beaker trapezoid: slightly wider at top
  const topW = w * 0.88;
  const botW = w * 0.72;
  const wallT = 3;
  const spoTW = 10; // pour spout width
  const spoH = 7;
  const offsetX = (w - topW) / 2;
  const offsetXBot = (w - botW) / 2;

  // Glass walls path: outer trapezoid
  const outerPath = `M${offsetX - spoTW},${spoH} L${w - offsetX},0 L${w - offsetXBot},${h} Q${w / 2},${h + 8} ${offsetXBot},${h} L${offsetX},${spoH}`;
  // Inner fill path (liquid area)
  const innerLeft = offsetX + wallT;
  const innerRight = w - offsetX - wallT;
  const innerBotLeft = offsetXBot + wallT;
  const innerBotRight = w - offsetXBot - wallT;
  const innerTop = spoH + wallT;
  const innerBot = h - wallT;

  // Liquid fill height from bottom
  const liquidH = ((innerBot - innerTop) * liquidPct) / 100;
  const liquidTop = innerBot - liquidH;

  // Graduated marks (right side, every ~20%)
  const marks = [20, 40, 60, 80];

  // Interpolated X at given Y for left/right inner wall
  function innerX(pct: number, side: "left" | "right"): number {
    const frac = pct / 100;
    if (side === "left") {
      return innerLeft + (innerBotLeft - innerLeft) * (1 - frac);
    }
    return innerRight - (innerRight - innerBotRight) * (1 - frac);
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        role="img"
        aria-label={label ?? "beaker"}
        width={w + 2}
        height={h + 16}
        viewBox={`-1 -2 ${w + 4} ${h + 16}`}
      >
        {/* Liquid fill */}
        {liquidPct > 0 && (
          <clipPath id={`beaker-clip-${label ?? "b"}`}>
            <path
              d={`M${innerLeft + (innerBotLeft - innerLeft) * (1 - liquidPct / 100)},${liquidTop}
                L${innerRight - (innerRight - innerBotRight) * (1 - liquidPct / 100)},${liquidTop}
                L${innerBotRight},${innerBot}
                Q${w / 2},${innerBot + 5} ${innerBotLeft},${innerBot}
                Z`}
            />
          </clipPath>
        )}
        {liquidPct > 0 && (
          <path
            d={`M${innerX(liquidPct, "left")},${liquidTop}
              L${innerX(liquidPct, "right")},${liquidTop}
              L${innerBotRight},${innerBot}
              Q${w / 2},${innerBot + 5} ${innerBotLeft},${innerBot}
              Z`}
            fill={liquidColor}
            style={{ transition: "all 0.6s ease" }}
          />
        )}
        {/* Liquid surface shimmer line */}
        {liquidPct > 5 && (
          <line
            x1={innerX(liquidPct, "left") + 2}
            y1={liquidTop}
            x2={innerX(liquidPct, "right") - 2}
            y2={liquidTop}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
            style={{ animation: "liquid-surface 2s ease-in-out infinite" }}
          />
        )}
        {/* Graduated marks */}
        {marks.map((m) => {
          const markY = innerBot - ((innerBot - innerTop) * m) / 100;
          const rx = innerX(m, "right");
          return (
            <g key={m}>
              <line
                x1={rx - 6}
                y1={markY}
                x2={rx + 1}
                y2={markY}
                stroke="rgba(180,200,255,0.25)"
                strokeWidth={0.8}
              />
              <text
                x={rx - 8}
                y={markY + 3}
                fontSize="5"
                fill="rgba(160,180,220,0.4)"
                textAnchor="end"
              >
                {m}
              </text>
            </g>
          );
        })}
        {/* Glass walls */}
        <path
          d={outerPath}
          fill="none"
          stroke="rgba(150,200,255,0.35)"
          strokeWidth={wallT}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Highlight on left wall */}
        <line
          x1={offsetX + 1}
          y1={spoH + 4}
          x2={offsetXBot + 2}
          y2={h - 4}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={1.5}
        />
        {/* Pour spout notch */}
        <path
          d={`M${offsetX - spoTW},${spoH} L${offsetX},${spoH} L${offsetX + 3},${spoH - spoH * 0.6}`}
          fill="none"
          stroke="rgba(150,200,255,0.3)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <span className="text-[10px] font-mono text-muted-foreground/70 tracking-wide">
          {label}
        </span>
      )}
      {children}
    </div>
  );
});

// ─── SVG Test Tube ────────────────────────────────────────────────────────────

interface TestTubeSVGProps {
  liquidColor: string;
  liquidPct: number;
  label?: string;
  tilting?: boolean;
}

const TestTubeSVG = memo(function TestTubeSVG({
  liquidColor,
  liquidPct,
  label,
  tilting = false,
}: TestTubeSVGProps) {
  const w = 32;
  const h = 100;
  const rx = 7;
  const wallT = 2.5;
  const liquidH = (h * liquidPct) / 100;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        style={{
          transformOrigin: "50% 0%",
          animation: tilting
            ? "test-tube-tilt 1s ease-in-out forwards"
            : "none",
        }}
      >
        <svg
          role="img"
          aria-label={label ?? "test tube"}
          width={w + 4}
          height={h + 12}
          viewBox={`-2 -2 ${w + 4} ${h + 12}`}
        >
          {/* Liquid */}
          {liquidPct > 0 && (
            <rect
              x={wallT}
              y={h - liquidH}
              width={w - wallT * 2}
              height={liquidH}
              rx={liquidH > 14 ? 0 : rx - 1}
              fill={liquidColor}
              style={{ transition: "all 0.5s ease" }}
            />
          )}
          {/* Rounded bottom fill */}
          {liquidPct > 0 && (
            <ellipse
              cx={w / 2}
              cy={h}
              rx={(w - wallT * 2) / 2}
              ry={5}
              fill={liquidColor}
              style={{ transition: "all 0.5s ease" }}
            />
          )}
          {/* Glass tube outline */}
          <rect
            x={wallT / 2}
            y={0}
            width={w - wallT}
            height={h}
            rx={rx}
            fill="none"
            stroke="rgba(150,200,255,0.38)"
            strokeWidth={wallT}
          />
          {/* Bottom cap */}
          <ellipse
            cx={w / 2}
            cy={h}
            rx={(w - wallT) / 2}
            ry={5.5}
            fill="none"
            stroke="rgba(150,200,255,0.35)"
            strokeWidth={wallT}
          />
          {/* Highlight */}
          <line
            x1={wallT + 2}
            y1={8}
            x2={wallT + 2}
            y2={h - 14}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      </div>
      {label && (
        <span className="text-[10px] font-mono text-muted-foreground/70">
          {label}
        </span>
      )}
    </div>
  );
});

// ─── Pour Stream ──────────────────────────────────────────────────────────────

const PourStream = memo(function PourStream({
  color,
  active,
}: {
  color: string;
  active: boolean;
}) {
  if (!active) return null;
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 5,
        height: 48,
        background: `linear-gradient(to bottom, ${color}, transparent)`,
        borderRadius: 3,
        animation: "pour-stream 0.9s ease-in-out",
        opacity: 0.85,
      }}
    />
  );
});

// ─── Bubble Field ─────────────────────────────────────────────────────────────

const BubbleField = memo(function BubbleField({
  active,
  intensity = 1,
  gasColor,
}: {
  active: boolean;
  intensity?: number;
  gasColor?: string;
}) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const counterRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) {
      setBubbles([]);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      return;
    }

    const interval = Math.max(120, 400 - intensity * 280);

    function spawnBubble() {
      const id = ++counterRef.current;
      const bubble: Bubble = {
        id,
        x: 8 + Math.random() * 84,
        size: 3 + Math.random() * 5,
        duration: 0.7 + Math.random() * 0.6,
        delay: 0,
      };
      setBubbles((prev) => [...prev.slice(-14), bubble]);

      const removeT = setTimeout(
        () => {
          setBubbles((prev) => prev.filter((b) => b.id !== id));
        },
        (bubble.duration + 0.1) * 1000,
      );

      timeoutsRef.current.push(removeT);

      if (active) {
        const spawnT = setTimeout(spawnBubble, interval + Math.random() * 200);
        timeoutsRef.current.push(spawnT);
      }
    }

    const init = setTimeout(spawnBubble, 50);
    timeoutsRef.current.push(init);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [active, intensity]);

  if (!active || bubbles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-xl">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            bottom: "12%",
            backgroundColor: gasColor ?? "rgba(200,220,255,0.55)",
            border: "0.5px solid rgba(200,220,255,0.25)",
            animation: `bubble-rise ${b.duration}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
});

// ─── Precipitate Particles ────────────────────────────────────────────────────

const PrecipitateParticles = memo(function PrecipitateParticles({
  color,
  active,
}: {
  color: string;
  active: boolean;
}) {
  const particles = useMemo<PrecipParticle[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 5 + (i % 9) * 10 + (Math.floor(i / 9) % 2) * 5,
      size: 2 + (i % 3),
      delay: i * 0.055,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-xl">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: "10%",
            backgroundColor: color,
            animation: `precip-fall 0.7s ease-in ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  );
});

// ─── Heat Glow ────────────────────────────────────────────────────────────────

const HeatGlow = memo(function HeatGlow({ heatPct }: { heatPct: number }) {
  const glowColor =
    heatPct < 30
      ? `rgba(99,179,237,${0.2 + heatPct * 0.01})`
      : heatPct < 65
        ? `rgba(251,146,60,${0.25 + (heatPct - 30) * 0.008})`
        : `rgba(239,68,68,${0.35 + (heatPct - 65) * 0.01})`;

  const glowSize = 8 + heatPct * 0.5;

  return (
    <div
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
      style={{
        width: 80,
        height: 20,
        background: glowColor,
        boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${glowColor}`,
        animation:
          heatPct > 20 ? "heat-glow-pulse 1.2s ease-in-out infinite" : "none",
        transition: "background 0.6s, box-shadow 0.6s",
      }}
    />
  );
});

// ─── Heat Slider ─────────────────────────────────────────────────────────────

const HeatSlider = memo(function HeatSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const colorFrom =
    value < 30
      ? "rgba(56,189,248,0.7)"
      : value < 65
        ? "rgba(251,146,60,0.75)"
        : "rgba(220,38,38,0.8)";

  const colorTo =
    value < 30
      ? "rgba(99,179,237,0.9)"
      : value < 65
        ? "rgba(251,191,36,0.9)"
        : "rgba(251,113,133,0.9)";

  const flameIcon = value < 30 ? "❄️" : value < 65 ? "🔥" : "🌋";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-muted-foreground flex items-center gap-1.5">
          {flameIcon}
          <span>Heat Intensity</span>
        </span>
      </div>
      <GlassSlider
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={onChange}
        label=""
        unit="%"
        colorFrom={colorFrom}
        colorTo={colorTo}
        data-ocid="virtual_lab.heat_slider"
        aria-label="Heat intensity"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground/60 mt-1">
        <span>Cold ❄️</span>
        <span>Medium 🔥</span>
        <span>Extreme 🌋</span>
      </div>
    </div>
  );
});

// ─── Shared glass panel ───────────────────────────────────────────────────────

const GlassPanel = memo(function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-reaction rounded-2xl p-5 md:p-6", className)}>
      {children}
    </div>
  );
});

// ─── pH helpers ───────────────────────────────────────────────────────────────

function calcPH(
  volAcidMl: number,
  concAcid: number,
  volBaseMl: number,
  concBase: number,
): number {
  const molesAcid = (volAcidMl / 1000) * concAcid;
  const molesBase = (volBaseMl / 1000) * concBase;
  const diff = molesAcid - molesBase;
  const totalVol = (volAcidMl + volBaseMl) / 1000;
  if (Math.abs(diff) < 1e-9) return 7.0;
  if (diff > 0) {
    const cH = diff / totalVol;
    return Math.max(0, -Math.log10(cH));
  }
  const cOH = -diff / totalVol;
  const pOH = Math.max(0, -Math.log10(cOH));
  return Math.min(14, 14 - pOH);
}

function pHToColor(pH: number): string {
  if (pH < 4) return "#ef4444";
  if (pH < 6) return "#f97316";
  if (pH < 6.8) return "#eab308";
  if (pH <= 7.2) return "#22c55e";
  if (pH <= 9) return "#3b82f6";
  return "#8b5cf6";
}

function pHLabel(pH: number): string {
  if (pH < 4) return "Strongly Acidic";
  if (pH < 6) return "Weakly Acidic";
  if (pH < 6.8) return "Slightly Acidic";
  if (pH <= 7.2) return "Neutral";
  if (pH <= 9) return "Slightly Basic";
  return "Strongly Basic";
}

function titrationExplanation(
  vol: number,
  concAcid: number,
  pH: number,
  eqVol: number,
): string {
  if (vol === 0)
    return "No acid added yet. Flask contains 25 mL NaOH solution — strongly basic.";
  if (vol < eqVol - 0.5)
    return `Added ${vol.toFixed(0)} mL HCl (${concAcid.toFixed(2)} M). Excess NaOH remains. pH = ${pH.toFixed(2)} — below equivalence point.`;
  if (Math.abs(pH - 7) < 0.3)
    return `⭐ Equivalence point reached at ~${vol.toFixed(0)} mL! All HCl and NaOH have neutralised. pH = 7.0 (neutral salt solution NaCl + H₂O).`;
  return `Past equivalence point. Excess HCl present. pH = ${pH.toFixed(2)} — solution is now acidic.`;
}

// ─── EXPERIMENT 1: ACID-BASE TITRATION ───────────────────────────────────────

const TitrationExperiment = memo(function TitrationExperiment() {
  const [volAcid, setVolAcid] = useState(0);
  const [concAcid, setConcAcid] = useState(0.1);
  const [heatPct, setHeatPct] = useState(0);
  const [pouring, setPouring] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const volBase = 25;
  const concBase = 0.1;
  const pH = calcPH(volAcid, concAcid, volBase, concBase);
  const flaskColor = pHToColor(pH);
  const eqVol = (volBase * concBase) / concAcid;
  const isEquivalence = Math.abs(pH - 7) < 0.3;

  const bubblesActive = heatPct > 40;
  const bubbleIntensity = heatPct / 100;

  // Burette liquid color tint
  const buretteLiquid = `rgba(99,179,237,${0.35 + (volAcid / 50) * 0.3})`;
  const flaskLiquidColor = `${flaskColor}55`;

  const handleVolChange = useCallback((v: number) => {
    setVolAcid(v);
    setPouring(true);
    if (dropTimer.current) clearTimeout(dropTimer.current);
    dropTimer.current = setTimeout(() => setPouring(false), 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (dropTimer.current) clearTimeout(dropTimer.current);
    };
  }, []);

  return (
    <div className="space-y-6" data-ocid="virtual_lab.titration.panel">
      {/* Visuals */}
      <div className="grid md:grid-cols-3 gap-6 items-end">
        {/* Burette (test tube that pours) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Burette — HCl
          </span>
          <div className="relative flex flex-col items-center">
            <TestTubeSVG
              liquidColor={buretteLiquid}
              liquidPct={100 - (volAcid / 50) * 100}
              tilting={pouring}
            />
            <PourStream color="rgba(99,179,237,0.8)" active={pouring} />
          </div>
          <span className="text-xs font-mono text-foreground/70 mt-1">
            {volAcid.toFixed(1)} mL dispensed
          </span>
        </div>

        {/* Flask + pH meter */}
        <div className="flex flex-col items-center gap-3">
          <div className="glass rounded-xl px-4 py-2.5 text-center w-full">
            <div className="text-[10px] text-muted-foreground mb-0.5">
              pH Meter
            </div>
            <div
              className="text-3xl font-bold font-mono transition-all duration-500"
              style={{ color: flaskColor }}
            >
              {pH.toFixed(2)}
            </div>
            <div
              className="text-xs font-medium mt-0.5 transition-all duration-500"
              style={{ color: flaskColor }}
            >
              {pHLabel(pH)}
            </div>
          </div>

          {/* Beaker as flask */}
          <div className="relative">
            <BeakerSVG
              liquidColor={flaskLiquidColor}
              liquidPct={65}
              width={96}
              height={110}
            />
            {bubblesActive && (
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ borderRadius: "0 0 14px 14px" }}
              >
                <BubbleField
                  active={bubblesActive}
                  intensity={bubbleIntensity}
                  gasColor={`${flaskColor}88`}
                />
              </div>
            )}
            <HeatGlow heatPct={heatPct} />
            {isEquivalence && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  className="text-2xl"
                  style={{ filter: "drop-shadow(0 0 8px gold)" }}
                >
                  ⭐
                </span>
              </div>
            )}
          </div>

          {isEquivalence && (
            <div className="glass rounded-lg px-3 py-1.5 text-center border border-green-500/40">
              <span className="text-xs text-green-400 font-semibold">
                ⭐ Equivalence Point
              </span>
            </div>
          )}
        </div>

        {/* NaOH info */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Flask — NaOH
          </span>
          <div className="glass rounded-xl p-3 w-full text-center space-y-1">
            <div className="text-xs text-muted-foreground">Volume</div>
            <div className="font-mono font-bold text-foreground">25 mL</div>
            <div className="text-xs text-muted-foreground mt-1">
              Concentration
            </div>
            <div className="font-mono font-bold text-foreground">0.1 M</div>
            <div className="text-xs text-muted-foreground mt-1">Eq. Volume</div>
            <div
              className="font-mono font-semibold text-sm transition-colors duration-500"
              style={{ color: flaskColor }}
            >
              {eqVol.toFixed(1)} mL
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <GlassPanel className="space-y-4">
        <GlassSlider
          value={volAcid}
          min={0}
          max={50}
          step={0.5}
          onChange={handleVolChange}
          label="HCl Volume Added"
          unit="mL"
          colorFrom="rgba(56,189,248,0.7)"
          colorTo="rgba(99,179,237,0.9)"
          data-ocid="virtual_lab.titration.volume_slider"
        />
        <GlassSlider
          value={concAcid}
          min={0.05}
          max={0.2}
          step={0.01}
          onChange={setConcAcid}
          label="HCl Concentration"
          unit="M"
          colorFrom="rgba(52,211,153,0.7)"
          colorTo="rgba(20,184,166,0.9)"
          data-ocid="virtual_lab.titration.conc_slider"
        />
        <HeatSlider value={heatPct} onChange={setHeatPct} />
      </GlassPanel>

      <div
        className="glass rounded-xl p-4 border-l-2 border-primary/40"
        data-ocid="virtual_lab.titration.explanation"
      >
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          Step-by-Step
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {titrationExplanation(volAcid, concAcid, pH, eqVol)}
        </p>
      </div>
    </div>
  );
});

// ─── EXPERIMENT 2: HEATING REACTIONS ─────────────────────────────────────────

const HeatingExperiment = memo(function HeatingExperiment() {
  const [temp, setTemp] = useState(25);
  const [heatPct, setHeatPct] = useState(0);
  const [selectedId, setSelectedId] = useState<string>("caco3");

  const chem = useMemo(
    () => HEATING_CHEMICALS.find((c) => c.id === selectedId)!,
    [selectedId],
  );

  // Sync heatPct → temp (0-100 maps to 0-1200)
  const handleHeatChange = useCallback((v: number) => {
    setHeatPct(v);
    setTemp(Math.round(v * 12));
  }, []);

  const reacting = temp >= chem.threshold;
  const intensity = reacting ? Math.min(1, (temp - chem.threshold) / 200) : 0;
  const solidColor = reacting ? chem.reactionColor : chem.color;
  const solidPct = reacting ? Math.max(10, 70 - intensity * 50) : 70;
  const liquidPctBeaker = Math.min(85, 20 + (temp / 1200) * 65);
  const flameH = Math.max(0, (temp / 1200) * 60 + 20);
  const { liquidColor: tempLiquidColor, boxShadow: tempBoxShadow } =
    getTemperatureStyle(Math.min(300, temp / 4));

  return (
    <div className="space-y-6" data-ocid="virtual_lab.heating.panel">
      <div className="flex flex-col items-center gap-0 relative">
        {/* Test tube with substance */}
        <div className="relative">
          <div
            className="w-20 h-32 rounded-b-3xl border border-border/40 relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: `${solidColor}22`,
              borderColor: reacting ? `${chem.reactionColor}55` : "",
              boxShadow: reacting
                ? `0 0 ${20 * intensity}px 4px ${chem.reactionColor}44, ${tempBoxShadow}`
                : tempBoxShadow,
            }}
          >
            {/* Solid substance */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-700 rounded-b-3xl"
              style={{
                height: `${solidPct}%`,
                backgroundColor: solidColor,
                opacity:
                  chem.id === "nh4cl" && reacting ? 1 - intensity * 0.9 : 0.85,
              }}
            />
            {/* Heat shimmer overlay */}
            {reacting && intensity > 0.5 && (
              <div
                className="absolute inset-0 pointer-events-none rounded-b-3xl"
                style={{
                  background:
                    "linear-gradient(to top, transparent 40%, rgba(255,200,100,0.08) 100%)",
                  animation: "heat-shimmer 1.5s ease-in-out infinite",
                }}
              />
            )}
            {/* Gas layer */}
            {reacting && (
              <div
                className="absolute left-0 right-0 transition-all duration-700"
                style={{
                  bottom: `${solidPct}%`,
                  height: `${intensity * 35}%`,
                  backgroundColor: chem.gasColor,
                }}
              />
            )}
            <BubbleField
              active={reacting && intensity > 0.1}
              intensity={intensity}
              gasColor={chem.gasColor}
            />
          </div>
          <div className="w-full h-3 border-t-0 border border-border/30 rounded-t mx-auto" />
        </div>

        <div className="w-1 h-6 bg-border/40" />

        {/* Bunsen burner with flame */}
        <div className="relative flex flex-col items-center">
          {temp > 50 && (
            <div
              className="relative flex justify-center"
              style={{
                height: flameH,
                width: 32,
                marginBottom: -4,
                animation: "flame-micro-flicker 0.18s ease-in-out infinite",
              }}
            >
              {/* Layer 1: outer flame */}
              <div
                className="absolute bottom-0 rounded-full"
                style={{
                  width: 28,
                  height: flameH,
                  background: `radial-gradient(ellipse at bottom, rgba(251,146,60,${0.6 + intensity * 0.4}), rgba(234,179,8,0.4) 50%, transparent 80%)`,
                  animation: "flame-flicker 0.3s ease-in-out infinite",
                  transformOrigin: "bottom center",
                }}
              />
              {/* Layer 2: bright inner core */}
              <div
                className="absolute bottom-0 rounded-full"
                style={{
                  width: 14,
                  height: flameH * 0.55,
                  background: `radial-gradient(ellipse at bottom, rgba(147,197,253,${0.3 + intensity * 0.5}), rgba(251,146,60,0.3) 60%, transparent)`,
                  animation: "flame-inner 1s ease-in-out infinite",
                  transformOrigin: "bottom center",
                }}
              />
              {/* Layer 3: tip flicker */}
              {intensity > 0.3 && (
                <div
                  className="absolute bottom-0 rounded-full"
                  style={{
                    width: 8,
                    height: flameH * 0.3,
                    background: `radial-gradient(ellipse at bottom, rgba(255,255,255,${0.3 * intensity}), transparent)`,
                    animation:
                      "flame-flicker 0.15s ease-in-out infinite reverse",
                    transformOrigin: "bottom center",
                  }}
                />
              )}
            </div>
          )}
          <div className="flex flex-col items-center">
            <div className="w-8 h-10 rounded-t-sm bg-card/50 border border-border/40" />
            <div className="w-12 h-4 rounded-sm bg-card/60 border border-border/40" />
            <div className="w-20 h-3 rounded bg-card/40 border border-border/30" />
          </div>

          {/* Separate product beaker beside burner */}
          {reacting && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -right-28 bottom-0"
            >
              <BeakerSVG
                liquidColor={
                  reacting ? `${chem.reactionColor}80` : tempLiquidColor
                }
                liquidPct={liquidPctBeaker}
                label="Product"
                width={72}
                height={90}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Chemical selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {HEATING_CHEMICALS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedId(c.id)}
            className={cn(
              "glass rounded-xl p-3 text-center transition-all duration-200",
              selectedId === c.id
                ? "ring-2 ring-accent/60 bg-accent/10"
                : "hover:bg-card/30",
            )}
            data-ocid={`virtual_lab.heating.chem_${c.id}`}
          >
            <div className="font-mono font-bold text-sm text-foreground">
              {c.label}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
              {c.formula}
            </div>
          </button>
        ))}
      </div>

      {/* Heat + Temperature sliders */}
      <GlassPanel className="space-y-4">
        <HeatSlider value={heatPct} onChange={handleHeatChange} />
        <GlassSlider
          value={temp}
          min={0}
          max={1200}
          step={5}
          onChange={(v) => {
            setTemp(v);
            setHeatPct(Math.round(v / 12));
          }}
          label="Temperature"
          unit="°C"
          colorFrom="rgba(251,146,60,0.7)"
          colorTo="rgba(239,68,68,0.9)"
          data-ocid="virtual_lab.heating.temp_slider"
        />
        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
          <span>0°C</span>
          <span
            className={cn(
              "font-semibold transition-colors duration-300",
              reacting ? "text-orange-400" : "text-foreground/50",
            )}
          >
            {reacting
              ? `🔥 Reaction at ${chem.threshold}°C`
              : `Reaction starts at ${chem.threshold}°C`}
          </span>
          <span>1200°C</span>
        </div>
      </GlassPanel>

      <AnimatePresence mode="wait">
        {reacting ? (
          <motion.div
            key="reacting"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
            data-ocid="virtual_lab.heating.success_state"
          >
            <div className="glass rounded-xl p-3 text-center border border-orange-400/30">
              <div className="text-xs text-orange-400/70 mb-1 font-semibold uppercase tracking-wider">
                Balanced Equation
              </div>
              <div className="font-mono text-sm text-foreground">
                {chem.equation}
              </div>
            </div>
            <div className="glass rounded-xl p-4 border-l-2 border-orange-400/40">
              <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1.5">
                Observation
              </div>
              <p className="text-sm text-foreground/80">{chem.observation}</p>
            </div>
            <div className="glass rounded-xl p-4 border-l-2 border-primary/40">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Explanation
              </div>
              <p className="text-sm text-foreground/80">{chem.explanation}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-xl p-4 border-l-2 border-border/30"
            data-ocid="virtual_lab.heating.explanation"
          >
            <p className="text-sm text-muted-foreground">
              Heating{" "}
              <strong className="text-foreground">{chem.formula}</strong>.
              Reaction begins at{" "}
              <strong className="text-foreground">{chem.threshold}°C</strong>.
              Use the heat slider or temperature slider to start the reaction.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─── EXPERIMENT 3: PRECIPITATION ─────────────────────────────────────────────

const PrecipitationExperiment = memo(function PrecipitationExperiment() {
  const [reagentA, setReagentA] = useState<string>("bacl2");
  const [reagentB, setReagentB] = useState<string>("na2so4");
  const [mixed, setMixed] = useState(false);
  const [mixing, setMixing] = useState(false);
  const [pouring, setPouring] = useState(false);
  const [quantityA, setQuantityA] = useState(50);
  const [quantityB, setQuantityB] = useState(50);

  const resultKey = `${reagentA}_${reagentB}`;
  const result: PrecipResult = PRECIP_RESULTS[resultKey] ?? {
    precipitate: null,
    precipColor: "",
    equation: "No reaction — all ions remain in solution",
    explanation: "These reagents do not form an insoluble product together.",
  };

  const colorA =
    REAGENTS_A.find((r) => r.id === reagentA)?.color ??
    "rgba(200,220,255,0.35)";
  const colorB =
    REAGENTS_B.find((r) => r.id === reagentB)?.color ?? "rgba(200,220,255,0.3)";

  const mixedBgColor = result.precipitate
    ? `${result.precipColor}40`
    : "rgba(200,220,240,0.2)";

  function handleMix() {
    setPouring(true);
    setTimeout(() => setPouring(false), 1100);
    setMixing(true);
    setTimeout(() => {
      setMixed(true);
      setMixing(false);
    }, 900);
  }

  function handleReset() {
    setMixed(false);
    setMixing(false);
    setPouring(false);
  }

  return (
    <div className="space-y-6" data-ocid="virtual_lab.precip.panel">
      {/* Beakers row */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {/* Beaker A */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Solution A
          </span>
          <div className="relative">
            {pouring && (
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2"
                style={{ zIndex: 10 }}
              >
                <TestTubeSVG
                  liquidColor={colorA}
                  liquidPct={quantityA}
                  tilting={pouring}
                />
                <PourStream color={colorA} active={pouring} />
              </div>
            )}
            <BeakerSVG
              liquidColor={mixed ? "transparent" : colorA}
              liquidPct={mixed ? 0 : (quantityA / 100) * 75}
              width={88}
              height={108}
            />
          </div>
          <span className="text-xs font-mono text-foreground/70">
            {REAGENTS_A.find((r) => r.id === reagentA)?.label}
          </span>
        </div>

        {/* Mixed beaker */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Result
          </span>
          <div className="relative">
            <BeakerSVG
              liquidColor={mixed ? mixedBgColor : "rgba(150,170,200,0.1)"}
              liquidPct={mixed ? 75 : 0}
              width={92}
              height={112}
            />
            {mixing && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                  className="rounded-full"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 0.8, repeat: 1 }}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "rgba(180,200,230,0.25)",
                  }}
                />
              </div>
            )}
            {mixed && result.precipitate && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <PrecipitateParticles
                  color={result.precipColor}
                  active={mixed}
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "18%" }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                  className="absolute bottom-1 left-2 right-2 rounded-b-lg"
                  style={{ backgroundColor: `${result.precipColor}cc` }}
                />
              </div>
            )}
          </div>
          <div className="h-5 flex items-center justify-center">
            {mixed && result.precipitate ? (
              <span className="text-[11px] font-mono font-semibold text-foreground/80">
                {result.precipitate}
              </span>
            ) : mixed ? (
              <span className="text-[10px] text-muted-foreground">
                No precipitate
              </span>
            ) : null}
          </div>
        </div>

        {/* Beaker B */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Solution B
          </span>
          <BeakerSVG
            liquidColor={mixed ? "transparent" : colorB}
            liquidPct={mixed ? 0 : (quantityB / 100) * 75}
            width={88}
            height={108}
          />
          <span className="text-xs font-mono text-foreground/70">
            {REAGENTS_B.find((r) => r.id === reagentB)?.label}
          </span>
        </div>
      </div>

      {/* Quantity sliders */}
      <GlassPanel className="space-y-4">
        <GlassSlider
          value={quantityA}
          min={10}
          max={100}
          step={5}
          onChange={(v) => {
            setQuantityA(v);
            handleReset();
          }}
          label="Volume of Reagent A"
          unit="mL"
          colorFrom="rgba(56,189,248,0.7)"
          colorTo="rgba(99,179,237,0.9)"
          data-ocid="virtual_lab.precip.vol_a_slider"
        />
        <GlassSlider
          value={quantityB}
          min={10}
          max={100}
          step={5}
          onChange={(v) => {
            setQuantityB(v);
            handleReset();
          }}
          label="Volume of Reagent B"
          unit="mL"
          colorFrom="rgba(52,211,153,0.7)"
          colorTo="rgba(20,184,166,0.9)"
          data-ocid="virtual_lab.precip.vol_b_slider"
        />
      </GlassPanel>

      {/* Reagent selectors */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Reagent A
          </div>
          <div className="grid grid-cols-2 gap-2">
            {REAGENTS_A.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setReagentA(r.id);
                  handleReset();
                }}
                className={cn(
                  "glass rounded-xl px-3 py-2.5 text-center transition-all duration-200 font-mono text-sm",
                  reagentA === r.id
                    ? "ring-2 ring-primary/60 bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-card/30",
                )}
                data-ocid={`virtual_lab.precip.reagent_a_${r.id}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Reagent B
          </div>
          <div className="grid grid-cols-2 gap-2">
            {REAGENTS_B.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setReagentB(r.id);
                  handleReset();
                }}
                className={cn(
                  "glass rounded-xl px-3 py-2.5 text-center transition-all duration-200 font-mono text-sm",
                  reagentB === r.id
                    ? "ring-2 ring-accent/60 bg-accent/10 text-foreground"
                    : "text-muted-foreground hover:bg-card/30",
                )}
                data-ocid={`virtual_lab.precip.reagent_b_${r.id}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mix button */}
      <div className="flex gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleMix}
          disabled={mixing || mixed}
          className="flex-1 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
          data-ocid="virtual_lab.precip.mix_button"
        >
          {mixing ? "Pouring…" : mixed ? "Mixed ✓" : "Pour & Mix"}
        </motion.button>
        {mixed && (
          <button
            type="button"
            onClick={handleReset}
            className="glass px-5 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all text-sm"
            data-ocid="virtual_lab.precip.reset_button"
          >
            Reset
          </button>
        )}
      </div>

      {/* Result explanation */}
      <AnimatePresence mode="wait">
        {mixed ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
            data-ocid="virtual_lab.precip.success_state"
          >
            <div
              className={cn(
                "glass rounded-xl p-3 text-center",
                result.precipitate
                  ? "border border-green-500/30"
                  : "border border-border/20",
              )}
            >
              <div className="text-xs text-muted-foreground mb-1">
                Balanced Equation
              </div>
              <div className="font-mono text-sm text-foreground">
                {result.equation}
              </div>
            </div>
            <div className="glass rounded-xl p-4 border-l-2 border-primary/40">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Explanation
              </div>
              <p className="text-sm text-foreground/80">{result.explanation}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-xl p-4 border-l-2 border-border/30"
            data-ocid="virtual_lab.precip.explanation"
          >
            <p className="text-sm text-muted-foreground">
              Select reagents A and B, adjust volumes, then press{" "}
              <strong className="text-foreground">Pour &amp; Mix</strong> to
              observe whether a precipitate forms.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─── Tab Definitions ──────────────────────────────────────────────────────────

const TABS: { id: LabTab; label: string; icon: string; desc: string }[] = [
  {
    id: "titration",
    label: "Acid-Base Titration",
    icon: "⚗️",
    desc: "Neutralise HCl with NaOH and track pH",
  },
  {
    id: "heating",
    label: "Heating Reactions",
    icon: "🔥",
    desc: "Thermal decomposition at controlled temperatures",
  },
  {
    id: "precipitation",
    label: "Precipitation",
    icon: "🧪",
    desc: "Mix ionic solutions and observe precipitate formation",
  },
  {
    id: "kmno4",
    label: "KMnO₄ Titration",
    icon: "🟣",
    desc: "KMnO₄ oxidises Mohr salt — track endpoint",
  },
  {
    id: "mohr",
    label: "Mohr Salt Prep",
    icon: "🟩",
    desc: "Prepare Mohr salt via crystallisation",
  },
  {
    id: "naoh-oxalic",
    label: "NaOH vs Oxalic",
    icon: "🔵",
    desc: "Phenolphthalein titration of oxalic acid",
  },
  {
    id: "auto-reaction",
    label: "Auto Reaction",
    icon: "⚗️",
    desc: "Search 200+ reactions by compound or formula",
  },
  {
    id: "electrolysis",
    label: "Electrolysis",
    icon: "⚡",
    desc: "Split water into H₂ and O₂ with electricity",
  },
  {
    id: "rusting",
    label: "Rusting of Iron",
    icon: "🟫",
    desc: "Time-based corrosion simulation",
  },
  {
    id: "flame-test",
    label: "Flame Test",
    icon: "🔥",
    desc: "Identify metal salts by flame colour",
  },
  {
    id: "solubility",
    label: "Solubility",
    icon: "🧂",
    desc: "Dissolve solutes with temperature control",
  },
  {
    id: "conductivity",
    label: "Conductivity",
    icon: "💡",
    desc: "Test electrolyte strength with a circuit",
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export function VirtualLabPage() {
  const [activeTab, setActiveTab] = useState<LabTab>("titration");
  const { addXP, unlockAchievement } = useChemStore();

  // Track unique lab tabs opened for achievements
  const visitedTabs = useRef<Set<string>>(new Set(["titration"]));

  function handleTabChange(tab: LabTab) {
    setActiveTab(tab);
    if (!visitedTabs.current.has(tab)) {
      visitedTabs.current.add(tab);
      addXP(3); // +3 XP per new experiment tab opened

      // Lab Expert: open 5 different experiment tabs
      if (visitedTabs.current.size >= 5) {
        unlockAchievement("lab-expert");
      }
    }
  }

  // "First Step" XP on visiting the lab
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    addXP(3);
  }, [addXP]);

  return (
    <div
      className="min-h-screen px-4 py-8 md:py-12"
      data-ocid="virtual_lab.page"
    >
      <style>{LAB_KEYFRAMES}</style>

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4">
          <span>🔬</span>
          <span>Interactive Chemistry Lab</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent">
          Virtual Lab
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Conduct chemistry experiments with real-time feedback, animated
          visualisations, and step-by-step explanations.
        </p>
      </motion.div>

      {/* Tab Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <div
          className="glass rounded-2xl p-1.5 flex gap-1 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
          data-ocid="virtual_lab.tab_bar"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-250 text-left",
                activeTab === tab.id
                  ? "bg-primary/20 border border-primary/30 text-foreground"
                  : "text-muted-foreground hover:bg-card/30 hover:text-foreground",
              )}
              data-ocid={`virtual_lab.tab_${tab.id}`}
            >
              <span className="text-lg flex-shrink-0">{tab.icon}</span>
              <div className="min-w-0 hidden sm:block">
                <div className="font-semibold leading-tight whitespace-nowrap text-xs">
                  {tab.label}
                </div>
              </div>
              <div className="min-w-0 sm:hidden">
                <div className="font-semibold leading-tight text-xs whitespace-nowrap">
                  {tab.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <GlassPanel>
              {activeTab === "titration" && <TitrationExperiment />}
              {activeTab === "heating" && <HeatingExperiment />}
              {activeTab === "precipitation" && <PrecipitationExperiment />}
              {activeTab === "kmno4" && <KMnO4TitrationTab />}
              {activeTab === "mohr" && <MohrSaltPrepTab />}
              {activeTab === "naoh-oxalic" && <NaOHOxalicTab />}
              {activeTab === "auto-reaction" && <AutoReactionTab />}
              {activeTab === "electrolysis" && <ElectrolysisTab />}
              {activeTab === "rusting" && <RustingTab />}
              {activeTab === "flame-test" && <FlameTestTab />}
              {activeTab === "solubility" && <SolubilityTab />}
              {activeTab === "conductivity" && <ConductivityTab />}
            </GlassPanel>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 text-xs text-muted-foreground/50 max-w-lg mx-auto"
      >
        All experiments are simulated. Real lab work requires proper safety
        equipment and supervision.
      </motion.div>
    </div>
  );
}
