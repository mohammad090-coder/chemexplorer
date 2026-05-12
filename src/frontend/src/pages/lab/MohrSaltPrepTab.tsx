import { GlassSlider } from "@/components/ui/GlassSlider";
import { cn } from "@/lib/utils";
import { memo, useMemo, useState } from "react";

// ─── Temperature Style ────────────────────────────────────────────────────────

export function getTemperatureStyle(temp: number): {
  liquidColor: string;
  boxShadow: string;
  shimmer: boolean;
} {
  if (temp < 0)
    return {
      liquidColor: "rgba(96,165,250,0.7)",
      boxShadow: "0 0 30px rgba(96,165,250,0.5)",
      shimmer: false,
    };
  if (temp <= 25)
    return {
      liquidColor: "rgba(125,211,252,0.7)",
      boxShadow: "0 0 20px rgba(125,211,252,0.3)",
      shimmer: false,
    };
  if (temp <= 75)
    return {
      liquidColor: "rgba(250,204,21,0.6)",
      boxShadow: "0 0 25px rgba(250,204,21,0.3)",
      shimmer: false,
    };
  if (temp <= 150)
    return {
      liquidColor: "rgba(251,146,60,0.7)",
      boxShadow: "0 0 30px rgba(251,146,60,0.5)",
      shimmer: true,
    };
  return {
    liquidColor: "rgba(239,68,68,0.8)",
    boxShadow: "0 0 40px rgba(239,68,68,0.6)",
    shimmer: true,
  };
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const MOHR_KEYFRAMES = `
@keyframes crystal-grow {
  0%   { transform: scale(0) rotate(0deg); opacity: 0; }
  60%  { transform: scale(1.1) rotate(20deg); opacity: 0.9; }
  100% { transform: scale(1) rotate(15deg); opacity: 1; }
}
@keyframes shimmer-wave {
  0%,100% { opacity: 0.85; }
  50%      { opacity: 1; }
}
@keyframes thermometer-fill {
  from { height: 0; }
}
`;

// ─── Stage Logic ─────────────────────────────────────────────────────────────

type Stage = "dissolving" | "heating" | "crystallizing" | "cooling" | "done";

function getStage(
  temp: number,
  mixingTime: number,
  coolingRate: "slow" | "medium" | "fast",
): Stage {
  if (temp <= 20) return "dissolving";
  if (temp <= 100) return "heating";
  if (temp > 100 && mixingTime > 15) {
    if (coolingRate !== "slow" && mixingTime > 30) return "done";
    if (coolingRate !== "slow") return "cooling";
    return "crystallizing";
  }
  return "crystallizing";
}

function getStageLabel(stage: Stage): string {
  switch (stage) {
    case "dissolving":
      return "Dissolving ferrous ammonium sulphate in dilute H₂SO₄";
    case "heating":
      return "Heating the solution to remove excess acid and concentrate";
    case "crystallizing":
      return "Crystals forming! Mohr salt crystallising from hot solution";
    case "cooling":
      return "Cooling — crystals growing and solidifying";
    case "done":
      return "✅ Mohr salt crystals ready. Filter and dry on filter paper.";
  }
}

function getStageColor(stage: Stage): string {
  switch (stage) {
    case "dissolving":
      return "text-cyan-400";
    case "heating":
      return "text-yellow-400";
    case "crystallizing":
      return "text-emerald-400";
    case "cooling":
      return "text-blue-400";
    case "done":
      return "text-green-300";
  }
}

// ─── Thermometer SVG ─────────────────────────────────────────────────────────

const ThermometerSVG = memo(function ThermometerSVG({
  temp,
}: { temp: number }) {
  const maxTemp = 300;
  const pct = Math.min(100, (temp / maxTemp) * 100);
  const fillH = (140 * pct) / 100;
  const mercuryColor =
    pct < 30
      ? "rgba(96,165,250,0.85)"
      : pct < 60
        ? "rgba(250,204,21,0.85)"
        : "rgba(239,68,68,0.9)";

  return (
    <svg
      width={24}
      height={170}
      viewBox="0 0 24 170"
      role="img"
      aria-label="thermometer"
    >
      {/* Stem */}
      <rect
        x={9}
        y={4}
        width={6}
        height={148}
        rx={3}
        fill="rgba(150,200,255,0.1)"
        stroke="rgba(150,200,255,0.3)"
        strokeWidth={1.5}
      />
      {/* Mercury fill */}
      <rect
        x={10.5}
        y={152 - fillH}
        width={3}
        height={fillH}
        rx={1.5}
        fill={mercuryColor}
        style={{ transition: "all 0.6s ease" }}
      />
      {/* Bulb */}
      <circle
        cx={12}
        cy={156}
        r={8}
        fill={mercuryColor}
        stroke="rgba(150,200,255,0.3)"
        strokeWidth={1.5}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Tick marks */}
      {[25, 50, 75].map((pctMark) => {
        const y = 152 - (140 * pctMark) / 100;
        return (
          <line
            key={pctMark}
            x1={15}
            y1={y}
            x2={20}
            y2={y}
            stroke="rgba(150,200,255,0.25)"
            strokeWidth={0.8}
          />
        );
      })}
    </svg>
  );
});

// ─── Crystal shapes ───────────────────────────────────────────────────────────

const Crystals = memo(function Crystals({ active }: { active: boolean }) {
  const crystals = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: 12 + i * 16,
        delay: i * 0.15,
        size: 8 + (i % 3) * 3,
      })),
    [],
  );

  if (!active) return null;

  return (
    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 pointer-events-none">
      {crystals.map((c) => (
        <div
          key={c.id}
          style={{
            width: c.size,
            height: c.size,
            background:
              "linear-gradient(135deg, rgba(167,243,208,0.9), rgba(52,211,153,0.7))",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            animation: `crystal-grow 0.6s ease-out ${c.delay}s both`,
          }}
        />
      ))}
    </div>
  );
});

// ─── Beaker SVG ───────────────────────────────────────────────────────────────

const BeakerSVGMohr = memo(function BeakerSVGMohr({
  liquidColor,
  boxShadow,
  shimmer,
  stage,
}: {
  liquidColor: string;
  boxShadow: string;
  shimmer: boolean;
  stage: Stage;
}) {
  const w = 100;
  const h = 120;
  const liquidPct = 65;
  const liquidH = (h * 0.75 * liquidPct) / 100;
  const liquidY = h - liquidH;

  return (
    <div className="relative" style={{ width: w + 4, height: h + 20 }}>
      <svg
        width={w + 4}
        height={h + 16}
        viewBox={`-2 -2 ${w + 4} ${h + 16}`}
        role="img"
        aria-label="beaker"
      >
        {/* Liquid */}
        <rect
          x={4}
          y={liquidY}
          width={w - 8}
          height={liquidH}
          rx={2}
          fill={liquidColor}
          style={{
            transition: "fill 0.6s ease",
            animation: shimmer
              ? "shimmer-wave 1.5s ease-in-out infinite"
              : "none",
          }}
        />
        {/* Body */}
        <rect
          x={0}
          y={0}
          width={w}
          height={h}
          rx={4}
          fill="none"
          stroke="rgba(150,200,255,0.35)"
          strokeWidth={2.5}
        />
        {/* Spout */}
        <path
          d="M0,0 L-8,8 M0,0 L4,0"
          fill="none"
          stroke="rgba(150,200,255,0.3)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* Highlight */}
        <line
          x1={3}
          y1={6}
          x2={3}
          y2={h - 6}
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>

      {/* Glow overlay */}
      <div
        className="absolute inset-0 rounded pointer-events-none"
        style={{ boxShadow, transition: "box-shadow 0.6s ease" }}
      />

      <Crystals
        active={
          stage === "crystallizing" || stage === "cooling" || stage === "done"
        }
      />
    </div>
  );
});

// ─── MohrSaltPrepTab ──────────────────────────────────────────────────────────

export const MohrSaltPrepTab = memo(function MohrSaltPrepTab() {
  const [temperature, setTemperature] = useState(25);
  const [mixingTime, setMixingTime] = useState(0);
  const [coolingRate, setCoolingRate] = useState<"slow" | "medium" | "fast">(
    "slow",
  );

  const stage = getStage(temperature, mixingTime, coolingRate);
  const { liquidColor, boxShadow, shimmer } = getTemperatureStyle(temperature);

  return (
    <div className="space-y-6" data-ocid="virtual_lab.mohr.panel">
      <style>{MOHR_KEYFRAMES}</style>

      {/* Apparatus */}
      <div className="flex flex-col sm:flex-row items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Reaction Beaker
          </span>
          <BeakerSVGMohr
            liquidColor={liquidColor}
            boxShadow={boxShadow}
            shimmer={shimmer}
            stage={stage}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Thermometer
          </span>
          <ThermometerSVG temp={temperature} />
          <span className="font-mono text-sm text-foreground/80">
            {temperature}°C
          </span>
        </div>
      </div>

      {/* Stage Badge */}
      <div className="glass rounded-xl p-4 text-center">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          Current Stage
        </div>
        <div className={cn("font-semibold text-sm", getStageColor(stage))}>
          {getStageLabel(stage)}
        </div>
      </div>

      {/* Controls */}
      <div className="glass-reaction rounded-2xl p-5 space-y-4">
        <GlassSlider
          value={temperature}
          min={0}
          max={300}
          step={5}
          onChange={setTemperature}
          label="Temperature"
          unit="°C"
          colorFrom="rgba(56,189,248,0.7)"
          colorTo="rgba(239,68,68,0.9)"
          data-ocid="virtual_lab.mohr.temp_slider"
        />
        <GlassSlider
          value={mixingTime}
          min={0}
          max={60}
          step={1}
          onChange={setMixingTime}
          label="Mixing Time"
          unit="min"
          colorFrom="rgba(52,211,153,0.7)"
          colorTo="rgba(20,184,166,0.9)"
          data-ocid="virtual_lab.mohr.mixing_slider"
        />

        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Cooling Rate
          </div>
          <div className="flex gap-2">
            {(["slow", "medium", "fast"] as const).map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setCoolingRate(rate)}
                className={cn(
                  "flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                  coolingRate === rate
                    ? "bg-primary/20 border border-primary/40 text-foreground"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-card/30",
                )}
                data-ocid={`virtual_lab.mohr.cooling_${rate}`}
              >
                {rate.charAt(0).toUpperCase() + rate.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Readings */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Temperature
          </div>
          <div className="font-mono font-bold text-foreground">
            {temperature}°C
          </div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Mix Time
          </div>
          <div className="font-mono font-bold text-foreground">
            {mixingTime} min
          </div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Cooling
          </div>
          <div className="font-mono font-bold text-foreground capitalize">
            {coolingRate}
          </div>
        </div>
      </div>

      {/* Equations */}
      <div className="space-y-2">
        <div className="glass rounded-xl p-3 border border-border/20">
          <div className="text-[10px] text-muted-foreground mb-1">
            Step 1 — Dissolution
          </div>
          <div className="font-mono text-xs text-foreground">
            FeSO₄·7H₂O + (NH₄)₂SO₄ → FeSO₄·(NH₄)₂SO₄·6H₂O↓
          </div>
        </div>
        <div className="glass rounded-xl p-3 border border-border/20">
          <div className="text-[10px] text-muted-foreground mb-1">
            Formula — Mohr Salt
          </div>
          <div className="font-mono text-xs text-foreground">
            (NH₄)₂Fe(SO₄)₂·6H₂O — Double salt, pale green crystals
          </div>
        </div>
      </div>
    </div>
  );
});
