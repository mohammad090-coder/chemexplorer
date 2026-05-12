import { GlassSlider } from "@/components/ui/GlassSlider";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { TheoryPanel } from "./TheoryPanel";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const NAOH_KEYFRAMES = `
@keyframes naoh-pour-stream {
  0%   { transform: scaleY(0) translateX(-50%); opacity: 0; }
  15%  { transform: scaleY(1) translateX(-50%); opacity: 0.85; }
  85%  { transform: scaleY(1) translateX(-50%); opacity: 0.75; }
  100% { transform: scaleY(0.2) translateX(-50%); opacity: 0; }
}
@keyframes pink-endpoint-pulse {
  0%,100% { box-shadow: 0 0 10px 2px rgba(252,196,213,0.4); }
  50%      { box-shadow: 0 0 28px 10px rgba(252,196,213,0.7); }
}
@keyframes indicator-drop {
  0%   { transform: translateY(-20px) scale(0.5); opacity: 0; }
  60%  { transform: translateY(4px) scale(1.1); opacity: 0.9; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
`;

// ─── Color logic ─────────────────────────────────────────────────────────────

function getFlaskColor(vol: number, indicatorAdded: boolean): string {
  if (!indicatorAdded) return "rgba(220,252,231,0.5)";
  if (vol <= 42) return "rgba(220,252,231,0.5)";
  return "rgba(252,196,213,0.75)";
}

function getStep(
  vol: number,
  indicatorAdded: boolean,
  endpointReached: boolean,
): string {
  if (vol === 0 && !indicatorAdded)
    return "Initial setup: oxalic acid in flask, NaOH solution in burette. Add phenolphthalein indicator.";
  if (!indicatorAdded)
    return "Add phenolphthalein indicator before starting titration. Solution should remain colourless in acid.";
  if (endpointReached)
    return "✅ ENDPOINT: Permanent faint pink colour (phenolphthalein). All oxalic acid neutralised by NaOH.";
  if (vol < 20)
    return `${vol.toFixed(1)} mL NaOH added. Oxalic acid still in excess. Indicator colourless — no endpoint yet.`;
  if (vol < 42)
    return `${vol.toFixed(1)} mL NaOH added. Approaching equivalence point. Watch for first permanent pink colour.`;
  return "Near endpoint — next drop may complete neutralisation.";
}

// ─── Burette SVG ─────────────────────────────────────────────────────────────

const NaOHBuretteSVG = memo(function NaOHBuretteSVG({
  fillPct,
}: {
  fillPct: number;
}) {
  const w = 28;
  const h = 180;
  const tipH = 18;

  return (
    <svg
      width={w + 16}
      height={h + tipH + 8}
      viewBox={`-8 -4 ${w + 16} ${h + tipH + 8}`}
      role="img"
      aria-label="NaOH burette"
    >
      {/* Graduation marks */}
      {[20, 40, 60, 80].map((pct) => {
        const y = 4 + (h * pct) / 100;
        return (
          <g key={pct}>
            <line
              x1={w}
              y1={y}
              x2={w + 5}
              y2={y}
              stroke="rgba(180,200,255,0.3)"
              strokeWidth={0.8}
            />
            <text
              x={w + 7}
              y={y + 3}
              fontSize="5.5"
              fill="rgba(160,180,220,0.4)"
            >
              {pct}
            </text>
          </g>
        );
      })}

      {/* Liquid fill (colorless NaOH) */}
      {fillPct > 0 && (
        <rect
          x={2}
          y={4 + (h * (100 - fillPct)) / 100}
          width={w - 4}
          height={(h * fillPct) / 100}
          fill="rgba(200,230,255,0.4)"
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
        x={w / 2 - 7}
        y={h}
        width={14}
        height={6}
        rx={2}
        fill="rgba(100,150,200,0.2)"
        stroke="rgba(150,200,255,0.3)"
        strokeWidth={1}
      />

      {/* Tip */}
      <path
        d={`M${w / 2 - 2.5},${h + 6} L${w / 2 + 2.5},${h + 6} L${w / 2 + 1},${h + tipH} L${w / 2 - 1},${h + tipH} Z`}
        fill="none"
        stroke="rgba(150,200,255,0.35)"
        strokeWidth={1.5}
      />
    </svg>
  );
});

// ─── Flask SVG ────────────────────────────────────────────────────────────────

const OxalicFlaskSVG = memo(function OxalicFlaskSVG({
  liquidColor,
  endpointReached,
  indicatorAdded,
}: {
  liquidColor: string;
  endpointReached: boolean;
  indicatorAdded: boolean;
}) {
  const w = 100;
  const h = 120;
  const neckW = 28;
  const neckH = 32;
  const cx = w / 2;

  return (
    <svg
      width={w + 4}
      height={h + 12}
      viewBox={`-2 -2 ${w + 4} ${h + 12}`}
      role="img"
      aria-label="oxalic acid flask"
    >
      <defs>
        <clipPath id="flask-clip-naoh">
          <path
            d={`M${cx - neckW / 2},0 L${cx + neckW / 2},0 L${cx + neckW / 2},${neckH} L${w},${h} Q${cx},${h + 8} 0,${h} L${cx - neckW / 2},${neckH} Z`}
          />
        </clipPath>
      </defs>

      {/* Liquid */}
      <rect
        x={0}
        y={h - (h - neckH) * 0.7 + neckH - (h - neckH)}
        width={w}
        height={(h - neckH) * 0.7}
        fill={liquidColor}
        clipPath="url(#flask-clip-naoh)"
        style={{ transition: "fill 0.7s ease" }}
      />

      {/* Indicator drop animation */}
      {indicatorAdded && (
        <circle
          cx={cx}
          cy={neckH + 20}
          r={5}
          fill="rgba(252,196,213,0.6)"
          style={{ animation: "indicator-drop 0.5s ease-out both" }}
        />
      )}

      {/* Flask outline */}
      <path
        d={`M${cx - neckW / 2},0 L${cx - neckW / 2},${neckH} L0,${h} Q${cx},${h + 8} ${w},${h} L${cx + neckW / 2},${neckH} L${cx + neckW / 2},0`}
        fill="none"
        stroke="rgba(150,200,255,0.38)"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <line
        x1={cx - neckW / 2}
        y1={0}
        x2={cx + neckW / 2}
        y2={0}
        stroke="rgba(150,200,255,0.3)"
        strokeWidth={2}
      />

      {/* Endpoint glow */}
      {endpointReached && (
        <ellipse
          cx={cx}
          cy={h - 8}
          rx={42}
          ry={12}
          fill="rgba(252,196,213,0.12)"
          stroke="rgba(252,196,213,0.45)"
          strokeWidth={1.5}
          style={{ animation: "pink-endpoint-pulse 1.3s ease-in-out infinite" }}
        />
      )}

      <line
        x1={cx - neckW / 2 + 2}
        y1={4}
        x2={8}
        y2={h - 8}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
});

// ─── Pour stream ─────────────────────────────────────────────────────────────

const NaOHPourStream = memo(function NaOHPourStream({
  active,
}: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        bottom: -40,
        left: "50%",
        transform: "translateX(-50%)",
        width: 4,
        height: 40,
        background:
          "linear-gradient(to bottom, rgba(200,230,255,0.9), rgba(200,230,255,0.1))",
        borderRadius: 2,
        transformOrigin: "top center",
        animation: "naoh-pour-stream 0.6s ease-in-out",
      }}
    />
  );
});

// ─── NaOHOxalicTab ────────────────────────────────────────────────────────────

export const NaOHOxalicTab = memo(function NaOHOxalicTab() {
  const [volumeAdded, setVolumeAdded] = useState(0);
  const [concentration, setConcentration] = useState(0.1);
  const [indicatorAdded, setIndicatorAdded] = useState(false);
  const [isPouring, setIsPouring] = useState(false);
  const [autoPouring, setAutoPouring] = useState(false);
  const autoPourRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pourTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const endpointReached = volumeAdded > 42 && indicatorAdded;
  const flaskColor = getFlaskColor(volumeAdded, indicatorAdded);
  const buretteFill = 100 - (volumeAdded / 50) * 100;
  const completionPct = Math.min(100, (volumeAdded / 42) * 100).toFixed(1);
  const molesNaOH = ((volumeAdded / 1000) * concentration * 2).toFixed(5);

  const pourDrop = useCallback(() => {
    setVolumeAdded((v) => Math.min(50, v + 0.5));
    setIsPouring(true);
    if (pourTimerRef.current) clearTimeout(pourTimerRef.current);
    pourTimerRef.current = setTimeout(() => setIsPouring(false), 600);
  }, []);

  const handleReset = useCallback(() => {
    setAutoPouring(false);
    setVolumeAdded(0);
    setIndicatorAdded(false);
    setIsPouring(false);
  }, []);

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
    <div className="space-y-6" data-ocid="virtual_lab.naoh.panel">
      <style>{NAOH_KEYFRAMES}</style>
      <TheoryPanel
        principle="Oxalic acid (H₂C₂O₄) is a diprotic weak acid — it donates two protons. NaOH is a strong base. Neutralisation: H₂C₂O₄ + 2NaOH → Na₂C₂O₄ + 2H₂O. Phenolphthalein indicator is colourless in acidic/neutral solution and turns pink in alkaline solution (pH > 8.2), marking the endpoint when excess NaOH is just present."
        observations="Before endpoint: solution remains colourless even with phenolphthalein added (still acidic or neutral). At endpoint: the last drop of NaOH produces a faint but persistent pink that does not fade within 30 seconds — all oxalic acid has been neutralised."
        application="Pharmaceutical standardisation — NaOH solutions must be standardised with a primary standard acid before analytical use. Oxalic acid is the preferred primary standard: stable, pure, and inexpensive. Used in quality control for antacids, detergents, and cleaning agents."
      />

      {/* Apparatus */}
      <div className="flex flex-col sm:flex-row items-end justify-center gap-8">
        {/* Burette */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Burette — NaOH
          </span>
          <div className="relative">
            <NaOHBuretteSVG fillPct={buretteFill} />
            <NaOHPourStream active={isPouring} />
          </div>
          <span className="text-xs font-mono text-foreground/70">
            {volumeAdded.toFixed(1)} mL dispensed
          </span>
        </div>

        {/* Flask */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Flask — Oxalic Acid
          </span>
          <OxalicFlaskSVG
            liquidColor={flaskColor}
            endpointReached={endpointReached}
            indicatorAdded={indicatorAdded}
          />
          {endpointReached && (
            <div
              className="glass rounded-lg px-3 py-1.5 text-center border border-pink-400/50"
              style={{
                animation: "pink-endpoint-pulse 1.3s ease-in-out infinite",
              }}
              data-ocid="virtual_lab.naoh.endpoint_badge"
            >
              <span className="text-xs text-pink-300 font-bold">
                🩷 Endpoint Reached!
              </span>
            </div>
          )}
          {!indicatorAdded && (
            <div className="glass rounded-lg px-3 py-1.5 text-[10px] text-muted-foreground text-center">
              Add indicator first
            </div>
          )}
        </div>
      </div>

      {/* Live Readings */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Vol Added
          </div>
          <div className="font-mono font-bold text-foreground text-lg">
            {volumeAdded.toFixed(1)}
          </div>
          <div className="text-[10px] text-muted-foreground">mL NaOH</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Moles NaOH
          </div>
          <div className="font-mono font-bold text-foreground text-sm">
            {molesNaOH}
          </div>
          <div className="text-[10px] text-muted-foreground">mol</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
            Completion
          </div>
          <div
            className={cn(
              "font-bold text-sm",
              endpointReached ? "text-pink-300" : "text-green-400",
            )}
          >
            {completionPct}%
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
          onChange={setVolumeAdded}
          label="Volume NaOH Added"
          unit="mL"
          colorFrom="rgba(56,189,248,0.7)"
          colorTo="rgba(99,179,237,0.9)"
          data-ocid="virtual_lab.naoh.volume_slider"
        />
        <GlassSlider
          value={concentration}
          min={0.05}
          max={0.5}
          step={0.05}
          onChange={setConcentration}
          label="Concentration"
          unit="M"
          colorFrom="rgba(52,211,153,0.7)"
          colorTo="rgba(20,184,166,0.9)"
          data-ocid="virtual_lab.naoh.conc_slider"
        />

        <div className="flex flex-wrap gap-2 pt-1">
          {!indicatorAdded && (
            <button
              type="button"
              onClick={() => setIndicatorAdded(true)}
              className="glass px-4 py-2.5 rounded-xl text-sm font-semibold text-pink-300 hover:bg-pink-500/15 border border-pink-400/30 transition-all"
              data-ocid="virtual_lab.naoh.add_indicator_button"
            >
              🧪 Add Indicator
            </button>
          )}
          <button
            type="button"
            onClick={pourDrop}
            disabled={endpointReached || !indicatorAdded}
            className="glass px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-blue-500/15 transition-all disabled:opacity-40"
            data-ocid="virtual_lab.naoh.pour_drop_button"
          >
            + Pour Drop
          </button>
          <button
            type="button"
            onClick={() => setAutoPouring((p) => !p)}
            disabled={endpointReached || !indicatorAdded}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40",
              autoPouring
                ? "bg-blue-500/30 border border-blue-400/50 text-blue-200"
                : "glass text-foreground hover:bg-blue-500/15",
            )}
            data-ocid="virtual_lab.naoh.auto_pour_button"
          >
            {autoPouring ? "⏹ Stop" : "▶ Auto Pour"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="glass px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-all"
            data-ocid="virtual_lab.naoh.reset_button"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Step Display */}
      <div
        className="glass rounded-xl p-4 border-l-2 border-blue-400/40"
        data-ocid="virtual_lab.naoh.step_display"
      >
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
          Step-by-Step
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {getStep(volumeAdded, indicatorAdded, endpointReached)}
        </p>
      </div>

      {/* Reaction */}
      <div className="glass rounded-xl p-3 text-center border border-blue-400/20">
        <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">
          Balanced Equation
        </div>
        <div className="font-mono text-sm text-foreground">
          H₂C₂O₄ + 2NaOH → Na₂C₂O₄ + 2H₂O
        </div>
      </div>
    </div>
  );
});
