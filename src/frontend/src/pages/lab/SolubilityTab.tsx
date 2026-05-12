import { GlassSlider } from "@/components/ui/GlassSlider";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const SOLUBILITY_KEYFRAMES = `
@keyframes particle-dissolve {
  0%   { transform: scale(1);    opacity: 0.85; }
  100% { transform: scale(0);    opacity: 0; }
}
@keyframes particle-settle {
  0%   { transform: translateY(0); opacity: 0.9; }
  100% { transform: translateY(40px); opacity: 0.7; }
}
@keyframes shimmer-beaker {
  0%,100% { opacity: 0.8; }
  50%      { opacity: 1; }
}
`;

// ─── Solubility data ──────────────────────────────────────────────────────────
interface Solute {
  id: string;
  name: string;
  formula: string;
  color: string;
  satAt25: number; // g/100mL at 25°C
  tempCoeff: number; // extra g/100mL per 10°C
}

const SOLUTES: Solute[] = [
  {
    id: "nacl",
    name: "NaCl",
    formula: "Salt",
    color: "rgba(255,255,255,0.7)",
    satAt25: 36,
    tempCoeff: 0.4,
  },
  {
    id: "kno3",
    name: "KNO₃",
    formula: "Potassium Nitrate",
    color: "rgba(200,220,255,0.7)",
    satAt25: 31,
    tempCoeff: 6.5,
  },
  {
    id: "cuso4",
    name: "CuSO₄",
    formula: "Copper Sulfate",
    color: "rgba(56,189,248,0.75)",
    satAt25: 20,
    tempCoeff: 1.8,
  },
  {
    id: "sugar",
    name: "C₁₂H₂₂O₁₁",
    formula: "Sucrose",
    color: "rgba(251,191,36,0.6)",
    satAt25: 200,
    tempCoeff: 8,
  },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  dissolved: boolean;
  precipitate: boolean;
}

function genParticles(n: number): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: 15 + (i % 8) * 9 + (Math.floor(i / 8) % 2) * 4,
    y: 20 + Math.floor(i / 8) * 12,
    dissolved: false,
    precipitate: false,
  }));
}

// ─── Beaker visual ────────────────────────────────────────────────────────────
const SolubilityBeaker = memo(function SolubilityBeaker({
  dissolved,
  satLimit,
  solute,
  tempPct,
  particles,
}: {
  dissolved: number;
  satLimit: number;
  solute: Solute;
  tempPct: number;
  particles: Particle[];
}) {
  const excessG = Math.max(0, dissolved - satLimit);
  const solventColor =
    tempPct < 30
      ? "rgba(56,189,248,0.30)"
      : tempPct < 65
        ? "rgba(56,189,248,0.25)"
        : "rgba(251,146,60,0.25)";

  // Mix solute color into water when dissolved
  const mixFrac = Math.min(1, dissolved / Math.max(1, satLimit));
  const soluteRGB = solute.color;
  const beakerGlow =
    tempPct < 30
      ? "0 0 12px rgba(56,189,248,0.25)"
      : tempPct < 65
        ? "0 0 12px rgba(251,191,36,0.2)"
        : "0 0 18px rgba(251,146,60,0.35)";

  return (
    <div
      className="relative rounded-b-2xl border border-border/30 overflow-hidden mx-auto"
      style={{
        width: 120,
        height: 140,
        background: solventColor,
        boxShadow: beakerGlow,
        transition: "background 0.6s ease, box-shadow 0.5s ease",
      }}
      aria-label="Beaker with solute"
    >
      {/* Dissolved color tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: soluteRGB.replace(
            /[\d.]+\)$/,
            `${(mixFrac * 0.3).toFixed(2)})`,
          ),
          transition: "background 0.8s ease",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            width: 5,
            height: 5,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: solute.color,
            animation: p.dissolved
              ? "particle-dissolve 0.8s ease forwards"
              : p.precipitate
                ? "particle-settle 0.7s ease forwards"
                : "none",
            opacity: p.dissolved || p.precipitate ? undefined : 0.85,
          }}
        />
      ))}

      {/* Precipitate layer */}
      {excessG > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-2xl"
          style={{
            height: Math.min(30, excessG * 0.6),
            background: solute.color.replace(/[\d.]+\)$/, "0.65)"),
            transition: "height 0.8s ease",
          }}
        />
      )}

      {/* Shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
          animation: "shimmer-beaker 2s ease-in-out infinite",
        }}
      />

      {/* Glass walls */}
      <div
        className="absolute inset-0 rounded-b-2xl pointer-events-none"
        style={{
          border: "2px solid rgba(150,200,255,0.30)",
          borderTop: "none",
        }}
      />
    </div>
  );
});

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export const SolubilityTab = memo(function SolubilityTab() {
  const [soluteId, setSoluteId] = useState("nacl");
  const [dissolved, setDissolved] = useState(0);
  const [tempPct, setTempPct] = useState(25); // 0-100 maps to 0-100°C
  const particleCounterRef = useRef(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  const solute = useMemo(
    () => SOLUTES.find((s) => s.id === soluteId)!,
    [soluteId],
  );
  const tempC = Math.round(tempPct);
  const satLimit = Math.round(
    solute.satAt25 + ((tempC - 25) / 10) * solute.tempCoeff,
  );
  const state =
    dissolved === 0
      ? "empty"
      : dissolved < satLimit * 0.9
        ? "unsaturated"
        : dissolved <= satLimit
          ? "saturated"
          : "supersaturated";

  const stateColor = {
    empty: "text-muted-foreground",
    unsaturated: "text-green-400",
    saturated: "text-yellow-400",
    supersaturated: "text-red-400",
  }[state];

  const stateLabel = {
    empty: "No solute added",
    unsaturated: "Unsaturated — dissolves fully",
    saturated: "Saturated — at limit",
    supersaturated: "Supersaturated — excess precipitates!",
  }[state];

  // Spawn particles when amount increases
  useEffect(() => {
    const n = Math.min(48, Math.round(dissolved / 2));
    const allParticles = genParticles(n).map((p) => ({
      ...p,
      id: ++particleCounterRef.current,
      dissolved: dissolved <= satLimit,
      precipitate: dissolved > satLimit && p.y > 60,
    }));
    setParticles(allParticles);
  }, [dissolved, satLimit]);

  const handleSoluteChange = useCallback((id: string) => {
    setSoluteId(id);
    setDissolved(0);
  }, []);

  const tempColorFrom =
    tempPct < 30
      ? "rgba(56,189,248,0.7)"
      : tempPct < 65
        ? "rgba(251,191,36,0.7)"
        : "rgba(239,68,68,0.75)";
  const tempColorTo =
    tempPct < 30
      ? "rgba(99,179,237,0.9)"
      : tempPct < 65
        ? "rgba(251,146,60,0.9)"
        : "rgba(239,68,68,0.95)";
  const tempIcon = tempPct < 30 ? "❄️" : tempPct < 65 ? "🌡️" : "🔥";

  return (
    <div className="space-y-6" data-ocid="virtual_lab.solubility.panel">
      <style>{SOLUBILITY_KEYFRAMES}</style>

      {/* Apparatus */}
      <div className="flex flex-col items-center gap-4">
        <SolubilityBeaker
          dissolved={dissolved}
          satLimit={satLimit}
          solute={solute}
          tempPct={tempPct}
          particles={particles}
        />

        {/* Status badges */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1">
              Added
            </div>
            <div className="font-mono text-lg font-bold text-foreground">
              {dissolved}
            </div>
            <div className="text-[9px] text-muted-foreground">g</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1">
              Sat. Limit
            </div>
            <div className="font-mono text-lg font-bold text-yellow-300">
              {satLimit}
            </div>
            <div className="text-[9px] text-muted-foreground">g/100mL</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1">
              Temp
            </div>
            <div className="font-mono text-lg font-bold text-foreground">
              {tempC}
            </div>
            <div className="text-[9px] text-muted-foreground">°C</div>
          </div>
        </div>

        <div
          className={cn(
            "glass rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-500",
            stateColor,
          )}
        >
          {stateLabel}
        </div>
      </div>

      {/* Solute selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SOLUTES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleSoluteChange(s.id)}
            className={cn(
              "glass rounded-xl px-3 py-2.5 text-center transition-all duration-200",
              soluteId === s.id
                ? "ring-2 ring-primary/50 bg-primary/10 text-foreground"
                : "text-muted-foreground hover:bg-card/30",
            )}
            data-ocid={`virtual_lab.solubility.solute_${s.id}`}
          >
            <div className="font-mono font-bold text-xs">{s.name}</div>
            <div className="text-[9px] mt-0.5 opacity-70 leading-tight">
              {s.formula}
            </div>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <GlassSlider
          min={0}
          max={Math.round(satLimit * 2)}
          step={1}
          value={dissolved}
          onChange={setDissolved}
          label="Solute Amount"
          unit="g"
          colorFrom="rgba(52,211,153,0.7)"
          colorTo="rgba(56,189,248,0.9)"
          data-ocid="virtual_lab.solubility.amount_slider"
          aria-label="Solute amount"
        />
        <GlassSlider
          min={0}
          max={100}
          step={1}
          value={tempPct}
          onChange={setTempPct}
          label={`${tempIcon} Temperature`}
          unit="°C"
          colorFrom={tempColorFrom}
          colorTo={tempColorTo}
          data-ocid="virtual_lab.solubility.temp_slider"
          aria-label="Temperature"
        />
        <div className="text-[10px] text-muted-foreground/70">
          Saturation limit of {solute.name} changes with temperature. Raise the
          temperature to dissolve more!
        </div>
      </div>

      {/* Explanation */}
      <div className="glass rounded-xl p-4 border-l-2 border-primary/40">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          Solubility Concepts
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          <strong className="text-foreground">Unsaturated:</strong> Solute
          dissolves completely — more can be added.{" "}
          <strong className="text-foreground">Saturated:</strong> Maximum solute
          dissolved at that temperature.{" "}
          <strong className="text-foreground">Supersaturated:</strong> Excess
          solute sinks as precipitate. Most ionic solids become more soluble at
          higher temperatures (positive solubility curve).
        </p>
      </div>
    </div>
  );
});
