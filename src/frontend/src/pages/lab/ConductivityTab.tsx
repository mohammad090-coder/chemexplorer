import { cn } from "@/lib/utils";
import { memo, useEffect, useRef, useState } from "react";
import { TheoryPanel } from "./TheoryPanel";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const CONDUCTIVITY_KEYFRAMES = `
@keyframes ion-move-pos {
  0%   { transform: translateX(0); opacity: 0.8; }
  100% { transform: translateX(30px); opacity: 0.2; }
}
@keyframes ion-move-neg {
  0%   { transform: translateX(0); opacity: 0.8; }
  100% { transform: translateX(-30px); opacity: 0.2; }
}
@keyframes bulb-flicker {
  0%,100% { opacity: 1; }
  45%      { opacity: 0.85; }
  50%      { opacity: 0.92; }
}
@keyframes current-flow {
  0%   { stroke-dashoffset: 60; opacity: 0.6; }
  100% { stroke-dashoffset: 0;  opacity: 1; }
}
`;

// ─── Solution data ────────────────────────────────────────────────────────────
type ConductivityLevel = "none" | "weak" | "strong";

interface Solution {
  id: string;
  name: string;
  formula: string;
  type: string;
  level: ConductivityLevel;
  ions: string;
  color: string;
}

const SOLUTIONS: Solution[] = [
  {
    id: "distilled",
    name: "Distilled Water",
    formula: "H₂O",
    type: "Non-electrolyte",
    level: "none",
    ions: "H₂O ⇌ H⁺ + OH⁻ (negligible)",
    color: "rgba(56,189,248,0.25)",
  },
  {
    id: "nacl",
    name: "Salt Water",
    formula: "NaCl (aq)",
    type: "Strong electrolyte",
    level: "strong",
    ions: "Na⁺ + Cl⁻",
    color: "rgba(200,220,255,0.3)",
  },
  {
    id: "sugar",
    name: "Sugar Water",
    formula: "C₁₂H₂₂O₁₁ (aq)",
    type: "Non-electrolyte",
    level: "none",
    ions: "No ions — molecules stay intact",
    color: "rgba(251,191,36,0.2)",
  },
  {
    id: "acetic",
    name: "Acetic Acid",
    formula: "CH₃COOH (aq)",
    type: "Weak electrolyte",
    level: "weak",
    ions: "CH₃COO⁻ + H⁺ (partial)",
    color: "rgba(200,230,200,0.3)",
  },
  {
    id: "hcl",
    name: "Hydrochloric Acid",
    formula: "HCl (aq)",
    type: "Strong electrolyte",
    level: "strong",
    ions: "H⁺ + Cl⁻",
    color: "rgba(251,146,60,0.2)",
  },
  {
    id: "ethanol",
    name: "Ethanol",
    formula: "C₂H₅OH",
    type: "Non-electrolyte",
    level: "none",
    ions: "No ions formed",
    color: "rgba(200,200,200,0.15)",
  },
];

// ─── Ion Particle ─────────────────────────────────────────────────────────────
interface Ion {
  id: number;
  x: number;
  y: number;
  charge: "+" | "-";
  dur: number;
}

const IonParticles = memo(function IonParticles({
  level,
}: {
  level: ConductivityLevel;
}) {
  const [ions, setIons] = useState<Ion[]>([]);
  const counterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (level === "none") {
      setIons([]);
      return;
    }

    const rate = level === "strong" ? 300 : 700;

    function spawnIon() {
      const id = ++counterRef.current;
      const charge: "+" | "-" = Math.random() > 0.5 ? "+" : "-";
      const ion: Ion = {
        id,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        charge,
        dur: 0.8 + Math.random() * 0.4,
      };
      setIons((prev) => [...prev.slice(-16), ion]);
      setTimeout(
        () => setIons((prev) => prev.filter((i) => i.id !== id)),
        (ion.dur + 0.05) * 1000,
      );
      timerRef.current = setTimeout(spawnIon, rate + Math.random() * 200);
    }

    timerRef.current = setTimeout(spawnIon, 100);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [level]);

  if (level === "none" || ions.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {ions.map((ion) => (
        <div
          key={ion.id}
          className="absolute rounded-full flex items-center justify-center text-[8px] font-bold"
          style={{
            width: 12,
            height: 12,
            left: `${ion.x}%`,
            top: `${ion.y}%`,
            backgroundColor:
              ion.charge === "+"
                ? "rgba(239,68,68,0.7)"
                : "rgba(59,130,246,0.7)",
            color: "rgba(255,255,255,0.9)",
            animation: `${ion.charge === "+" ? "ion-move-pos" : "ion-move-neg"} ${ion.dur}s ease-out forwards`,
          }}
        >
          {ion.charge}
        </div>
      ))}
    </div>
  );
});

// ─── Circuit SVG ──────────────────────────────────────────────────────────────
const CircuitSVG = memo(function CircuitSVG({
  level,
  solution,
}: {
  level: ConductivityLevel;
  solution: Solution;
}) {
  const brightness = level === "none" ? 0 : level === "weak" ? 0.35 : 1;

  const bulbColor =
    level === "none"
      ? "rgba(150,150,120,0.3)"
      : level === "weak"
        ? "rgba(251,191,36,0.5)"
        : "rgba(251,191,36,0.95)";

  const wireOpacity = level === "none" ? 0.25 : 0.7;
  const wireDashAnim =
    level !== "none" ? "current-flow 0.8s linear infinite" : "none";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: 200 }}
    >
      <style>{CONDUCTIVITY_KEYFRAMES}</style>
      <svg
        width={280}
        height={200}
        viewBox="0 0 280 200"
        aria-label="Electrical conductivity circuit with bulb and beaker"
      >
        <title>Electrical conductivity circuit</title>
        {/* Battery */}
        <rect
          x={10}
          y={70}
          width={24}
          height={50}
          rx={4}
          fill="rgba(80,80,100,0.6)"
          stroke="rgba(150,200,255,0.3)"
          strokeWidth={1}
        />
        <rect
          x={14}
          y={80}
          width={16}
          height={8}
          rx={2}
          fill="rgba(251,146,60,0.6)"
        />
        <rect
          x={14}
          y={92}
          width={16}
          height={8}
          rx={2}
          fill="rgba(200,200,200,0.4)"
        />
        <text
          x={22}
          y={66}
          fontSize="8"
          fill="rgba(200,200,200,0.6)"
          textAnchor="middle"
        >
          +
        </text>
        <text
          x={22}
          y={136}
          fontSize="8"
          fill="rgba(200,200,200,0.6)"
          textAnchor="middle"
        >
          −
        </text>

        {/* Top wire */}
        <path
          d="M34 80 L140 80 L140 40 L200 40 L200 80 L240 80"
          fill="none"
          stroke="rgba(150,200,255,0.35)"
          strokeWidth={2}
          strokeDasharray="6 4"
          style={{
            animation: wireDashAnim,
            opacity: wireOpacity,
            transition: "opacity 0.5s",
          }}
        />

        {/* Bottom wire */}
        <path
          d="M34 110 L140 110 L140 160 L200 160 L200 110 L240 110"
          fill="none"
          stroke="rgba(150,200,255,0.35)"
          strokeWidth={2}
          strokeDasharray="6 4"
          style={{
            animation: wireDashAnim,
            opacity: wireOpacity,
            transition: "opacity 0.5s",
          }}
        />

        {/* Bulb socket */}
        <circle
          cx={140}
          cy={80}
          r={16}
          fill="rgba(60,60,80,0.7)"
          stroke="rgba(150,200,255,0.3)"
          strokeWidth={1.5}
        />
        {/* Bulb glass */}
        <ellipse
          cx={140}
          cy={76}
          rx={10}
          ry={11}
          fill={bulbColor}
          style={{
            transition: "fill 0.5s ease",
            filter:
              level !== "none"
                ? `brightness(${1 + brightness}) drop-shadow(0 0 ${6 + brightness * 10}px rgba(251,191,36,0.8))`
                : "none",
            animation:
              level === "strong"
                ? "bulb-flicker 0.6s ease-in-out infinite"
                : "none",
          }}
        />
        {/* Filament */}
        <path
          d="M136 80 L138 76 L142 80 L144 76"
          fill="none"
          stroke={
            level !== "none" ? "rgba(255,220,100,0.9)" : "rgba(180,180,150,0.4)"
          }
          strokeWidth={1.2}
          style={{ transition: "stroke 0.5s" }}
        />

        {/* Beaker outline */}
        <rect
          x={200}
          y={75}
          width={50}
          height={60}
          rx={4}
          fill={solution.color}
          stroke="rgba(150,200,255,0.3)"
          strokeWidth={1.5}
          style={{ transition: "fill 0.6s ease" }}
        />
        {/* Electrodes */}
        <rect
          x={210}
          y={78}
          width={4}
          height={50}
          rx={2}
          fill="rgba(100,150,220,0.8)"
          style={{
            filter:
              level !== "none"
                ? "drop-shadow(0 0 3px rgba(100,150,220,0.7))"
                : "none",
            transition: "filter 0.5s",
          }}
        />
        <rect
          x={236}
          y={78}
          width={4}
          height={50}
          rx={2}
          fill="rgba(200,150,50,0.8)"
          style={{
            filter:
              level !== "none"
                ? "drop-shadow(0 0 3px rgba(200,150,50,0.7))"
                : "none",
            transition: "filter 0.5s",
          }}
        />
        {/* Electrode labels */}
        <text x={212} y={74} fontSize="7" fill="rgba(100,150,220,0.7)">
          −
        </text>
        <text x={238} y={74} fontSize="7" fill="rgba(200,150,50,0.7)">
          +
        </text>

        {/* Conductivity bar label */}
        <text
          x={140}
          y={185}
          fontSize="8"
          fill="rgba(200,200,200,0.5)"
          textAnchor="middle"
        >
          {level === "none"
            ? "No current"
            : level === "weak"
              ? "Weak current"
              : "Strong current"}
        </text>
      </svg>

      {/* Ion particles inside beaker */}
      <div
        className="absolute overflow-hidden rounded-sm"
        style={{ left: 200, top: 78, width: 50, height: 57 }}
      >
        <IonParticles level={level} />
      </div>
    </div>
  );
});

// ─── Conductivity bar ─────────────────────────────────────────────────────────
const ConductivityBar = memo(function ConductivityBar({
  level,
}: {
  level: ConductivityLevel;
}) {
  const pct = level === "none" ? 0 : level === "weak" ? 33 : 90;
  const color =
    level === "none"
      ? "rgba(150,150,150,0.4)"
      : level === "weak"
        ? "rgba(251,191,36,0.7)"
        : "rgba(52,211,153,0.8)";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-muted-foreground/70">
        <span>Conductivity</span>
        <span
          className="font-semibold"
          style={{ color, transition: "color 0.5s" }}
        >
          {level === "none" ? "None" : level === "weak" ? "Low" : "High"}
        </span>
      </div>
      <div
        className="h-2.5 rounded-full overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color.replace(/[\d.]+\)$/, "0.95)")})`,
            boxShadow: `0 0 6px ${color}`,
            transition: "width 0.6s ease, background 0.5s ease",
          }}
        />
      </div>
    </div>
  );
});

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export const ConductivityTab = memo(function ConductivityTab() {
  const [selectedId, setSelectedId] = useState("nacl");
  const solution = SOLUTIONS.find((s) => s.id === selectedId)!;

  return (
    <div className="space-y-6" data-ocid="virtual_lab.conductivity.panel">
      <TheoryPanel
        principle="Electrical conductivity in solutions depends on the presence of mobile ions. Strong electrolytes (NaCl, HCl, NaOH) fully dissociate into ions, creating many charge carriers. Weak electrolytes (acetic acid, NH₄OH) only partially ionise — fewer ions, less current. Non-electrolytes (sucrose, ethanol) remain molecular and carry no charge."
        observations="Strong electrolyte: bulb glows brightly, many ions visible moving in solution. Weak electrolyte: dim glow, lower ion count. Non-electrolyte: bulb stays off completely. Ion concentration directly tracks bulb brightness — a quantitative relationship."
        application="Water quality testing — pure water should not conduct significantly, so high conductivity indicates dissolved salts or contaminants. Industrial electrochemistry (electroplating, electrolysis) and biology (nerve impulse transmission via Na⁺/K⁺ ion gradients) rely on these principles."
      />
      {/* Circuit diagram */}
      <CircuitSVG level={solution.level} solution={solution} />

      {/* Conductivity bar */}
      <ConductivityBar level={solution.level} />

      {/* Info row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-xl p-3">
          <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1">
            Type
          </div>
          <div
            className={cn(
              "text-sm font-semibold",
              solution.level === "strong"
                ? "text-green-400"
                : solution.level === "weak"
                  ? "text-yellow-400"
                  : "text-muted-foreground",
            )}
          >
            {solution.type}
          </div>
        </div>
        <div className="glass rounded-xl p-3">
          <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1">
            Ions Present
          </div>
          <div className="text-sm font-mono text-foreground/80">
            {solution.ions}
          </div>
        </div>
      </div>

      {/* Solution selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SOLUTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedId(s.id)}
            className={cn(
              "glass rounded-xl px-3 py-3 text-left transition-all duration-200",
              selectedId === s.id
                ? "ring-2 ring-primary/50 bg-primary/10 text-foreground"
                : "text-muted-foreground hover:bg-card/30",
            )}
            data-ocid={`virtual_lab.conductivity.solution_${s.id}`}
          >
            <div className="text-xs font-bold">{s.name}</div>
            <div className="text-[9px] font-mono mt-0.5 opacity-70">
              {s.formula}
            </div>
            <div
              className={cn(
                "text-[9px] mt-1 font-semibold",
                s.level === "strong"
                  ? "text-green-400"
                  : s.level === "weak"
                    ? "text-yellow-400"
                    : "text-red-400/70",
              )}
            >
              {s.level === "none"
                ? "Non-electrolyte"
                : s.level === "weak"
                  ? "Weak electrolyte"
                  : "Strong electrolyte"}
            </div>
          </button>
        ))}
      </div>

      {/* Explanation */}
      <div className="glass rounded-xl p-4 border-l-2 border-primary/40">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          How conductivity works
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Electrical conductivity in solution depends on the presence of mobile
          ions. <strong className="text-foreground">Strong electrolytes</strong>{" "}
          (NaCl, HCl) fully dissociate — many ions, bright bulb.{" "}
          <strong className="text-foreground">Weak electrolytes</strong> (acetic
          acid) partially ionise — dim bulb.{" "}
          <strong className="text-foreground">Non-electrolytes</strong> (sugar,
          ethanol) don't form ions — bulb stays off.
        </p>
      </div>
    </div>
  );
});
