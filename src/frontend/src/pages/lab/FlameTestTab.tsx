import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import { TheoryPanel } from "./TheoryPanel";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const FLAME_KEYFRAMES = `
@keyframes flame-flicker-fast {
  0%,100% { transform: scaleY(1)    scaleX(1);    opacity: 0.95; }
  25%      { transform: scaleY(1.12) scaleX(0.88); opacity: 1; }
  50%      { transform: scaleY(0.93) scaleX(1.07); opacity: 0.88; }
  75%      { transform: scaleY(1.08) scaleX(0.92); opacity: 0.97; }
}
@keyframes flame-inner {
  0%,100% { transform: scaleY(1)   scaleX(1);    opacity: 0.8; }
  33%      { transform: scaleY(1.1) scaleX(0.9);  opacity: 1; }
  66%      { transform: scaleY(0.9) scaleX(1.1);  opacity: 0.75; }
}
@keyframes glow-pulse {
  0%,100% { opacity: 0.5; }
  50%      { opacity: 0.85; }
}
`;

// ─── Salt data ────────────────────────────────────────────────────────────────
interface Salt {
  id: string;
  name: string;
  formula: string;
  color: string;
  innerColor: string;
  glowColor: string;
  description: string;
}

const SALTS: Salt[] = [
  {
    id: "li",
    name: "Lithium",
    formula: "LiCl",
    color: "#dc2626",
    innerColor: "#fca5a5",
    glowColor: "rgba(220,38,38,0.6)",
    description: "Crimson red — due to Li⁺ ion emitting at ~670 nm",
  },
  {
    id: "na",
    name: "Sodium",
    formula: "NaCl",
    color: "#eab308",
    innerColor: "#fef08a",
    glowColor: "rgba(234,179,8,0.65)",
    description: "Golden yellow — Na⁺ emits strongly at 589 nm (D-line)",
  },
  {
    id: "k",
    name: "Potassium",
    formula: "KCl",
    color: "#a855f7",
    innerColor: "#d8b4fe",
    glowColor: "rgba(168,85,247,0.5)",
    description: "Lilac / violet — K⁺ emits at 766 nm and 770 nm",
  },
  {
    id: "cu",
    name: "Copper",
    formula: "CuCl₂",
    color: "#06b6d4",
    innerColor: "#a5f3fc",
    glowColor: "rgba(6,182,212,0.6)",
    description: "Blue-green — Cu²⁺ band emission across 500–540 nm",
  },
  {
    id: "ca",
    name: "Calcium",
    formula: "CaCl₂",
    color: "#f97316",
    innerColor: "#fdba74",
    glowColor: "rgba(249,115,22,0.55)",
    description: "Brick red — Ca²⁺ emission at 622 nm and 646 nm",
  },
  {
    id: "ba",
    name: "Barium",
    formula: "BaCl₂",
    color: "#84cc16",
    innerColor: "#d9f99d",
    glowColor: "rgba(132,204,22,0.5)",
    description: "Pale green — Ba²⁺ molecular band emissions ~524 nm",
  },
];

// ─── Flame SVG ────────────────────────────────────────────────────────────────
const FlameSVG = memo(function FlameSVG({
  salt,
  active,
}: {
  salt: Salt;
  active: boolean;
}) {
  const flameColor = active ? salt.color : "#f97316";
  const innerColor = active ? salt.innerColor : "#fed7aa";
  const glowColor = active ? salt.glowColor : "rgba(249,115,22,0.4)";

  return (
    <div className="flex flex-col items-center select-none" aria-hidden>
      <style>{FLAME_KEYFRAMES}</style>

      {/* Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 80,
          height: 80,
          background: glowColor,
          filter: "blur(18px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          animation: "glow-pulse 1.2s ease-in-out infinite",
          transition: "background 0.8s ease",
        }}
      />

      {/* Outer flame */}
      <div
        style={{
          width: 48,
          height: 90,
          borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
          background: `radial-gradient(ellipse at 40% 85%, ${flameColor} 0%, ${flameColor}aa 40%, transparent 75%)`,
          animation: "flame-flicker-fast 0.15s ease-in-out infinite",
          transformOrigin: "bottom center",
          position: "relative",
          transition: "background 0.8s ease",
        }}
      >
        {/* Inner flame */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 22,
            height: 55,
            borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
            background: `radial-gradient(ellipse at 40% 85%, ${innerColor} 0%, ${innerColor}88 50%, transparent 80%)`,
            animation: "flame-inner 0.13s ease-in-out infinite reverse",
            transformOrigin: "bottom center",
            transition: "background 0.8s ease",
          }}
        />
      </div>

      {/* Bunsen burner body */}
      <div className="flex flex-col items-center mt-1 z-10">
        <div
          className="w-10 h-14 border border-border/30 rounded-t-sm"
          style={{ background: "rgba(100,110,130,0.4)" }}
        />
        <div
          className="w-14 h-4 border border-border/30 rounded-sm"
          style={{ background: "rgba(80,90,110,0.5)" }}
        />
        <div
          className="w-20 h-3 border border-border/20 rounded"
          style={{ background: "rgba(60,70,90,0.4)" }}
        />
      </div>

      {/* Wire loop */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "22%",
          left: "50%",
          transform: "translateX(-50%) rotate(-30deg)",
        }}
      >
        <svg
          width={28}
          height={40}
          viewBox="0 0 28 40"
          role="img"
          aria-label="Wire loop with salt residue"
        >
          <title>Wire loop with salt residue</title>{" "}
          <line
            x1={14}
            y1={0}
            x2={14}
            y2={28}
            stroke="rgba(180,180,160,0.8)"
            strokeWidth={2}
          />
          <circle
            cx={14}
            cy={32}
            r={6}
            fill="none"
            stroke="rgba(180,180,160,0.8)"
            strokeWidth={2}
          />
          {/* Salt residue dot */}
          <circle
            cx={14}
            cy={32}
            r={3}
            fill={active ? `${flameColor}cc` : "rgba(200,200,180,0.3)"}
            style={{ transition: "fill 0.8s ease" }}
          />
        </svg>
      </div>
    </div>
  );
});

// ─── Color swatch ─────────────────────────────────────────────────────────────
const ColorSwatch = memo(function ColorSwatch({ salt }: { salt: Salt }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex-shrink-0"
      style={{
        background: salt.color,
        boxShadow: `0 0 8px ${salt.glowColor}`,
      }}
    />
  );
});

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export const FlameTestTab = memo(function FlameTestTab() {
  const [selectedId, setSelectedId] = useState<string>("na");
  const [lit, setLit] = useState(true);

  const salt = SALTS.find((s) => s.id === selectedId)!;

  return (
    <div className="space-y-6" data-ocid="virtual_lab.flame_test.panel">
      <TheoryPanel
        principle="Metal salts contain metal ions (Na⁺, K⁺, Cu²⁺ etc.). Heat energy from the Bunsen flame promotes outer electrons to excited, higher-energy orbitals. When they fall back to the ground state they release energy as photons of specific wavelengths — producing characteristic visible colours unique to each element."
        observations="Na→ intense yellow/orange; K → lilac/violet; Cu → green/blue-green; Ca → brick-red; Li → crimson; Ba → pale green. Colours are highly specific and reproducible — each element has a unique emission spectrum."
        application="Fireworks manufacture relies on these characteristic colours to produce displays. Atomic emission spectroscopy and flame photometry are used in analytical labs to identify and quantify metal ions in water samples, soil, and blood."
      />
      {/* Apparatus */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="relative flex items-end justify-center"
          style={{ height: 200 }}
        >
          <FlameSVG salt={salt} active={lit} />
        </div>

        {/* Color display */}
        <div
          className="glass rounded-2xl px-6 py-3 flex items-center gap-3 transition-all duration-700"
          style={{
            borderColor: `${salt.color}50`,
            boxShadow: lit ? `0 0 20px ${salt.glowColor}` : "none",
            transition: "box-shadow 0.8s ease, border-color 0.8s ease",
          }}
        >
          <ColorSwatch salt={salt} />
          <div>
            <div
              className="text-sm font-bold"
              style={{ color: salt.color, transition: "color 0.8s" }}
            >
              {salt.name} ({salt.formula})
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {salt.description}
            </div>
          </div>
        </div>
      </div>

      {/* Salt selector */}
      <div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Select Salt
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SALTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSelectedId(s.id);
                setLit(true);
              }}
              className={cn(
                "glass rounded-xl px-3 py-3 flex items-center gap-2.5 transition-all duration-200",
                selectedId === s.id
                  ? "ring-2 bg-card/20 text-foreground"
                  : "text-muted-foreground hover:bg-card/30",
              )}
              style={
                selectedId === s.id
                  ? { boxShadow: `0 0 12px ${s.glowColor}` }
                  : {}
              }
              data-ocid={`virtual_lab.flame_test.salt_${s.id}`}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              />
              <div className="text-left min-w-0">
                <div className="text-xs font-semibold truncate">{s.name}</div>
                <div className="text-[9px] opacity-70 font-mono">
                  {s.formula}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Light/extinguish toggle */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setLit((l) => !l)}
          className={cn(
            "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
            lit
              ? "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30"
              : "bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30",
          )}
          data-ocid="virtual_lab.flame_test.toggle_button"
        >
          {lit ? "🕯️ Extinguish" : "🔥 Light Burner"}
        </button>
      </div>

      {/* Explanation */}
      <div className="glass rounded-xl p-4 border-l-2 border-primary/40">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          Why does the flame change color?
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          When metal salts are heated in a flame, the energy excites electrons
          to higher energy levels. As they return to ground state, they emit
          photons at specific wavelengths — producing characteristic colors
          unique to each element. This is the basis of atomic emission
          spectroscopy.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SALTS.map((s) => (
            <div
              key={s.id}
              className="glass rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              />
              <span className="text-xs font-mono">
                <span className="font-semibold text-foreground">
                  {s.name}:{" "}
                </span>
                <span className="text-muted-foreground">{s.formula}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
