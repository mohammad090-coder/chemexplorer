import { GlassSlider } from "@/components/ui/GlassSlider";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { TheoryPanel } from "./TheoryPanel";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const KMNO4_KEYFRAMES = `
@keyframes kmno4-pour {
  0%   { transform: scaleY(0); opacity: 0; }
  20%  { transform: scaleY(1); opacity: 0.85; }
  80%  { transform: scaleY(1); opacity: 0.75; }
  100% { transform: scaleY(0); opacity: 0; }
}
@keyframes endpoint-pulse {
  0%,100% { box-shadow: 0 0 10px 2px rgba(216,180,254,0.4); }
  50%      { box-shadow: 0 0 24px 8px rgba(216,180,254,0.8); }
}
@keyframes badge-glow {
  0%,100% { opacity: 0.9; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.04); }
}
`;

// ─── Burette SVG ──────────────────────────────────────────────────────────────

const BuretteSVG = memo(function BuretteSVG({
  fillPct,
  color,
}: {
  fillPct: number;
  color: string;
}) {
  const w = 34;
  const h = 200;
  const tipH = 20;
  const markPositions = [10, 25, 50, 75, 90];

  return (
    <svg
      width={w + 20}
      height={h + tipH + 10}
      viewBox={`-10 -5 ${w + 20} ${h + tipH + 10}`}
      role="img"
      aria-label="burette"
    >
      {/* Graduation marks */}
      {markPositions.map((pct) => {
        const y = 4 + (h * pct) / 100;
        return (
          <g key={pct}>
            <line
              x1={w - 2}
              y1={y}
              x2={w + 6}
              y2={y}
              stroke="rgba(180,200,255,0.3)"
              strokeWidth={0.8}
            />
            <text
              x={w + 8}
              y={y + 3}
              fontSize="6"
              fill="rgba(160,180,220,0.45)"
            >
              {pct}
            </text>
          </g>
        );
      })}

      {/* Liquid fill */}
      {fillPct > 0 && (
        <rect
          x={2}
          y={4 + (h * (100 - fillPct)) / 100}
          width={w - 4}
          height={(h * fillPct) / 100}
          fill={color}
          rx={2}
          style={{ transition: "all 0.5s ease" }}
        />
      )}

      {/* Burette body */}
      <rect
        x={0}
        y={4}
        width={w}
        height={h}
        rx={4}
        fill="none"
        stroke="rgba(150,200,255,0.35)"
        strokeWidth={2.5}
      />

      {/* Stopcock */}
      <rect
        x={w / 2 - 8}
        y={h}
        width={16}
        height={6}
        rx={2}
        fill="rgba(100,150,200,0.25)"
        stroke="rgba(150,200,255,0.3)"
        strokeWidth={1}
      />

      {/* Tip */}
      <path
        d={`M${w / 2 - 3},${h + 6} L${w / 2 + 3},${h + 6} L${w / 2 + 1},${h + tipH} L${w / 2 - 1},${h + tipH} Z`}
        fill="none"
        stroke="rgba(150,200,255,0.35)"
        strokeWidth={1.5}
      />

      {/* Highlight */}
      <line
        x1={3}
        y1={8}
        x2={3}
        y2={h - 4}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
});

// ─── Flask SVG ────────────────────────────────────────────────────────────────

const FlaskSVG = memo(function FlaskSVG({
  liquidColor,
  volumeAdded,
  endpointReached,
}: {
  liquidColor: string;
  volumeAdded: number;
  endpointReached: boolean;
}) {
  const w = 110;
  const h = 130;
  const neckW = 30;
  const neckH = 35;
  const bodyW = w;
  const bodyH = h - neckH;
  const cx = w / 2;
  const liquidFill = Math.min(75, 10 + (volumeAdded / 50) * 65);

  return (
    <svg
      width={w + 4}
      height={h + 10}
      viewBox={`-2 -2 ${w + 4} ${h + 10}`}
      role="img"
      aria-label="conical flask"
    >
      <defs>
        <clipPath id="flask-clip-kmno4">
          <path
            d={`M${cx - neckW / 2},0 L${cx + neckW / 2},0 L${cx + neckW / 2},${neckH} L${w},${h} Q${cx},${h + 8} 0,${h} L${cx - neckW / 2},${neckH} Z`}
          />
        </clipPath>
      </defs>

      {/* Liquid */}
      {volumeAdded > 0 && (
        <rect
          x={0}
          y={h - (bodyH * liquidFill) / 100 + neckH}
          width={w}
          height={(bodyH * liquidFill) / 100}
          fill={liquidColor}
          clipPath="url(#flask-clip-kmno4)"
          style={{ transition: "all 0.6s ease" }}
        />
      )}

      {/* Flask body outline */}
      <path
        d={`M${cx - neckW / 2},0 L${cx - neckW / 2},${neckH} L0,${h} Q${cx},${h + 8} ${w},${h} L${cx + neckW / 2},${neckH} L${cx + neckW / 2},0`}
        fill="none"
        stroke="rgba(150,200,255,0.38)"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Neck top line */}
      <line
        x1={cx - neckW / 2}
        y1={0}
        x2={cx + neckW / 2}
        y2={0}
        stroke="rgba(150,200,255,0.3)"
        strokeWidth={2}
      />

      {/* Endpoint glow ring */}
      {endpointReached && (
        <ellipse
          cx={cx}
          cy={h - 10}
          rx={bodyW / 2 - 4}
          ry={14}
          fill="rgba(216,180,254,0.15)"
          stroke="rgba(216,180,254,0.5)"
          strokeWidth={1.5}
          style={{ animation: "endpoint-pulse 1.2s ease-in-out infinite" }}
        />
      )}

      {/* Highlight */}
      <line
        x1={cx - neckW / 2 + 2}
        y1={4}
        x2={8}
        y2={h - 8}
        stroke="rgba(255,255,255,0.09)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
});

// ─── Pour Stream ──────────────────────────────────────────────────────────────

const PourStreamKMnO4 = memo(function PourStreamKMnO4({
  active,
}: {
  active: boolean;
}) {
  if (!active) return null;
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        bottom: -44,
        left: "50%",
        transform: "translateX(-50%)",
        width: 4,
        height: 44,
        background:
          "linear-gradient(to bottom, rgba(147,51,234,0.85), rgba(147,51,234,0.2))",
        borderRadius: 2,
        transformOrigin: "top center",
        animation: "kmno4-pour 0.6s ease-in-out",
      }}
    />
  );
});

// ─── Step helper ─────────────────────────────────────────────────────────────

function getStep(vol: number): string {
  if (vol === 0)
    return "Initial: KMnO₄ (purple) in burette, Mohr salt solution in flask.";
  if (vol < 20)
    return "Titration in progress: KMnO₄ oxidising Mohr salt (Fe²⁺ → Fe³⁺). Solution turning faint pink.";
  if (vol < 45)
    return "Nearing endpoint: excess KMnO₄ building up, solution turning pink/light purple.";
  return "ENDPOINT REACHED: Permanent pink/purple colour. KMnO₄ no longer decolourised.";
}

function getFlaskColor(vol: number): string {
  if (vol <= 15) return "rgba(210,255,240,0.5)";
  if (vol <= 40) return "rgba(251,182,206,0.6)";
  return "rgba(216,180,254,0.7)";
}

// ─── KMnO4TitrationTab ────────────────────────────────────────────────────────

export const KMnO4TitrationTab = memo(function KMnO4TitrationTab() {
  const [volumeAdded, setVolumeAdded] = useState(0);
  const [concentration, setConcentration] = useState(0.05);
  const [isPouring, setIsPouring] = useState(false);
  const [autoPouring, setAutoPouring] = useState(false);
  const autoPourRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pourTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const endpointReached = volumeAdded >= 45;
  const flaskColor = getFlaskColor(volumeAdded);
  const buretteFill = 100 - (volumeAdded / 50) * 100;
  const molesKMnO4 = ((volumeAdded / 1000) * concentration).toFixed(5);

  const pourDrop = useCallback(() => {
    setVolumeAdded((v) => {
      const next = Math.min(50, v + 0.5);
      return next;
    });
    setIsPouring(true);
    if (pourTimerRef.current) clearTimeout(pourTimerRef.current);
    pourTimerRef.current = setTimeout(() => setIsPouring(false), 650);
  }, []);

  const startAutoPour = useCallback(() => {
    setAutoPouring(true);
  }, []);

  const stopAutoPour = useCallback(() => {
    setAutoPouring(false);
  }, []);

  const handleReset = useCallback(() => {
    setAutoPouring(false);
    setVolumeAdded(0);
    setIsPouring(false);
  }, []);

  // Auto pour interval
  useEffect(() => {
    if (autoPouring && !endpointReached) {
      autoPourRef.current = setInterval(() => {
        setVolumeAdded((v) => {
          if (v >= 50) {
            setAutoPouring(false);
            return 50;
          }
          return Math.min(50, v + 0.5);
        });
        setIsPouring(true);
        setTimeout(() => setIsPouring(false), 400);
      }, 300);
    } else {
      if (autoPourRef.current) {
        clearInterval(autoPourRef.current);
        autoPourRef.current = null;
      }
      if (endpointReached) setAutoPouring(false);
    }
    return () => {
      if (autoPourRef.current) clearInterval(autoPourRef.current);
    };
  }, [autoPouring, endpointReached]);

  useEffect(() => {
    return () => {
      if (autoPourRef.current) clearInterval(autoPourRef.current);
      if (pourTimerRef.current) clearTimeout(pourTimerRef.current);
    };
  }, []);

  return (
    <div className="space-y-6" data-ocid="virtual_lab.kmno4.panel">
      <style>{KMNO4_KEYFRAMES}</style>
      <TheoryPanel
        principle="KMnO₄ (potassium permanganate) is a powerful oxidising agent. In acidic solution it oxidises Fe²⁺ ions (in Mohr salt) to Fe³⁺, and is itself reduced from Mn⁷⁺ (purple) to Mn²⁺ (colourless). Ionic equation: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. KMnO₄ is self-indicating — no separate indicator needed."
        observations="Before endpoint: each drop of KMnO₄ turns the solution pink/purple then immediately decolourises as Mn²⁺ forms. At endpoint: the final drop produces a faint permanent pink/purple that does NOT decolourise within 30 seconds — all Fe²⁺ has been consumed."
        application="Quantitative analysis of iron content in ores, pharmaceutical iron supplements, and water treatment chemicals. The technique (permanganometry) is also used in water treatment to determine oxidisable organic matter and Mn²⁺ concentration."
      />

      {/* Apparatus */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
        {/* Burette column */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Burette — KMnO₄
          </span>
          <div className="relative">
            <BuretteSVG fillPct={buretteFill} color="rgba(147,51,234,0.75)" />
            <PourStreamKMnO4 active={isPouring} />
          </div>
          <span className="text-xs font-mono text-foreground/70">
            {volumeAdded.toFixed(1)} mL dispensed
          </span>
        </div>

        {/* Flask column */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Flask — Mohr Salt
          </span>
          <div
            className="relative"
            style={
              endpointReached
                ? { animation: "endpoint-pulse 1.2s ease-in-out infinite" }
                : {}
            }
          >
            <FlaskSVG
              liquidColor={flaskColor}
              volumeAdded={volumeAdded}
              endpointReached={endpointReached}
            />
          </div>

          {endpointReached && (
            <div
              className="glass rounded-lg px-3 py-1.5 text-center border border-purple-400/50"
              style={{ animation: "badge-glow 1.2s ease-in-out infinite" }}
              data-ocid="virtual_lab.kmno4.endpoint_badge"
            >
              <span className="text-xs text-purple-300 font-bold">
                🟣 Endpoint Reached!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Live Readings */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Volume Added
          </div>
          <div className="font-mono font-bold text-foreground text-lg">
            {volumeAdded.toFixed(1)}
          </div>
          <div className="text-[10px] text-muted-foreground">mL</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Moles KMnO₄
          </div>
          <div className="font-mono font-bold text-foreground text-sm">
            {molesKMnO4}
          </div>
          <div className="text-[10px] text-muted-foreground">mol</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Status
          </div>
          <div
            className={cn(
              "font-semibold text-sm",
              endpointReached ? "text-purple-300" : "text-green-400",
            )}
          >
            {endpointReached ? "Endpoint" : "Titrating"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-reaction rounded-2xl p-5 space-y-4">
        <GlassSlider
          value={volumeAdded}
          min={0}
          max={50}
          step={0.5}
          onChange={(v) => setVolumeAdded(v)}
          label="Volume Added"
          unit="mL"
          colorFrom="rgba(147,51,234,0.6)"
          colorTo="rgba(192,132,252,0.9)"
          data-ocid="virtual_lab.kmno4.volume_slider"
        />
        <GlassSlider
          value={concentration}
          min={0.01}
          max={0.1}
          step={0.01}
          onChange={setConcentration}
          label="Concentration (M)"
          unit="M"
          colorFrom="rgba(139,92,246,0.6)"
          colorTo="rgba(167,139,250,0.9)"
          data-ocid="virtual_lab.kmno4.conc_slider"
        />

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={pourDrop}
            disabled={endpointReached}
            className="glass px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-purple-500/15 transition-all disabled:opacity-40"
            data-ocid="virtual_lab.kmno4.pour_drop_button"
          >
            + Pour Drop
          </button>
          <button
            type="button"
            onClick={autoPouring ? stopAutoPour : startAutoPour}
            disabled={endpointReached}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40",
              autoPouring
                ? "bg-purple-500/30 border border-purple-400/50 text-purple-200"
                : "glass text-foreground hover:bg-purple-500/15",
            )}
            data-ocid="virtual_lab.kmno4.auto_pour_button"
          >
            {autoPouring ? "⏹ Stop" : "▶ Auto Pour"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="glass px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-all"
            data-ocid="virtual_lab.kmno4.reset_button"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Step Display */}
      <div
        className="glass rounded-xl p-4 border-l-2 border-purple-400/40"
        data-ocid="virtual_lab.kmno4.step_display"
      >
        <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
          Step-by-Step
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {getStep(volumeAdded)}
        </p>
      </div>

      {/* Reaction */}
      <div className="glass rounded-xl p-3 text-center border border-purple-400/20">
        <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
          Net Ionic Equation
        </div>
        <div className="font-mono text-sm text-foreground">
          MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O
        </div>
      </div>
    </div>
  );
});
