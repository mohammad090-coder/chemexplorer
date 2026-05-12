import { GlassSlider } from "@/components/ui/GlassSlider";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { TheoryPanel } from "./TheoryPanel";

// ─── Keyframes injected once ─────────────────────────────────────────────────
const ELECTROLYSIS_KEYFRAMES = `
@keyframes elec-bubble-rise {
  0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
  50%  { transform: translateY(-30px) translateX(2px) scale(0.85); opacity: 0.6; }
  100% { transform: translateY(-72px) translateX(-1px) scale(0.35); opacity: 0; }
}
@keyframes wire-current {
  0%   { opacity: 0.4; }
  50%  { opacity: 1; }
  100% { opacity: 0.4; }
}
`;

interface ElecBubble {
  id: number;
  x: number;
  size: number;
  dur: number;
  side: "left" | "right";
}

// ─── Bubble emitter ───────────────────────────────────────────────────────────
const BubbleEmitter = memo(function BubbleEmitter({
  active,
  rate,
  side,
  color,
}: {
  active: boolean;
  rate: number; // 0–1
  side: "left" | "right";
  color: string;
}) {
  const [bubbles, setBubbles] = useState<ElecBubble[]>([]);
  const counterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spawnNext = useCallback(() => {
    if (!active) return;
    const id = ++counterRef.current;
    const bubble: ElecBubble = {
      id,
      x: 30 + Math.random() * 40,
      size: 3 + Math.random() * 4,
      dur: 0.7 + Math.random() * 0.5,
      side,
    };
    setBubbles((prev) => [...prev.slice(-20), bubble]);
    const removeAfter = (bubble.dur + 0.05) * 1000;
    setTimeout(
      () => setBubbles((prev) => prev.filter((b) => b.id !== id)),
      removeAfter,
    );
    const interval = Math.max(80, 500 - rate * 420);
    timerRef.current = setTimeout(spawnNext, interval + Math.random() * 150);
  }, [active, rate, side]);

  useEffect(() => {
    if (active) {
      timerRef.current = setTimeout(spawnNext, 50);
    } else {
      setBubbles([]);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, spawnNext]);

  if (!active || bubbles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            bottom: "18%",
            backgroundColor: color,
            border: "0.5px solid rgba(255,255,255,0.3)",
            animation: `elec-bubble-rise ${b.dur}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
});

// ─── SVG Electrolysis Apparatus ───────────────────────────────────────────────
const ElectrolysisApparatus = memo(function ElectrolysisApparatus({
  running,
  voltage,
  h2Vol,
  o2Vol,
}: {
  running: boolean;
  voltage: number;
  h2Vol: number;
  o2Vol: number;
}) {
  const h2Pct = Math.min(95, (h2Vol / 20) * 100);
  const o2Pct = Math.min(95, (o2Vol / 10) * 100);
  const waterColor = "rgba(56,189,248,0.35)";
  const currentOpacity = running ? 1 : 0.3;
  const wireAnim = running ? "wire-current 0.8s ease-in-out infinite" : "none";

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <style>{ELECTROLYSIS_KEYFRAMES}</style>

      {/* Battery */}
      <div
        className="flex items-center gap-1 glass rounded-lg px-4 py-2"
        style={{ opacity: currentOpacity, transition: "opacity 0.4s" }}
      >
        <span className="text-xs font-mono text-yellow-300/80">−</span>
        <div
          className="w-16 h-3 rounded-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(251,146,60,0.7), rgba(234,179,8,0.8))",
            boxShadow: running ? "0 0 8px rgba(234,179,8,0.5)" : "none",
            transition: "box-shadow 0.4s",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              animation: wireAnim,
            }}
          />
        </div>
        <span className="text-xs font-mono text-yellow-300/80">+</span>
        <span className="text-xs text-muted-foreground ml-2 font-mono">
          {voltage.toFixed(1)} V
        </span>
      </div>

      {/* Wires + trough */}
      <div className="relative flex gap-6 items-end">
        {/* Left wire (−) → cathode */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2,
            height: 28,
            top: -28,
            left: "50%",
            transform: "translateX(calc(-50% - 48px))",
            background:
              "linear-gradient(to bottom, rgba(251,146,60,0.7), rgba(251,146,60,0.3))",
            animation: wireAnim,
          }}
        />
        {/* Right wire (+) → anode */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2,
            height: 28,
            top: -28,
            left: "50%",
            transform: "translateX(calc(-50% + 48px))",
            background:
              "linear-gradient(to bottom, rgba(234,179,8,0.7), rgba(234,179,8,0.3))",
            animation: wireAnim,
          }}
        />

        {/* Water trough */}
        <div
          className="relative rounded-b-2xl border border-border/30 overflow-hidden"
          style={{
            width: 200,
            height: 100,
            background: waterColor,
            backdropFilter: "blur(4px)",
            boxShadow: running
              ? "0 0 16px rgba(56,189,248,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "box-shadow 0.5s",
          }}
        >
          {/* Cathode (−) test tube — LEFT, H2 */}
          <div
            className="absolute flex flex-col items-center"
            style={{ left: 28, bottom: 0 }}
          >
            {/* Gas column */}
            <div
              className="rounded-t-full relative overflow-hidden"
              style={{
                width: 28,
                height: 80,
                border: "1.5px solid rgba(150,200,255,0.4)",
                background: "rgba(0,0,0,0.05)",
                borderBottom: "none",
              }}
            >
              {/* Water fill from bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-b"
                style={{
                  height: `${100 - h2Pct}%`,
                  background: waterColor,
                  transition: "height 0.8s ease",
                }}
              />
              {/* Gas (H2) at top */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: `${h2Pct}%`,
                  background:
                    "linear-gradient(to bottom, rgba(147,197,253,0.5), rgba(147,197,253,0.15))",
                  transition: "height 0.8s ease",
                }}
              />
              <BubbleEmitter
                active={running}
                rate={Math.min(1, voltage / 12)}
                side="left"
                color="rgba(147,197,253,0.7)"
              />
              {/* Volume bar */}
              <div
                className="absolute top-1 left-0 right-0 text-center text-[8px] font-mono font-bold"
                style={{ color: "rgba(147,197,253,0.9)" }}
              >
                {h2Pct > 15 ? `${h2Vol.toFixed(1)}mL` : ""}
              </div>
            </div>
            <div className="text-[9px] font-bold text-blue-300/80 mt-1">
              H₂ (−)
            </div>
          </div>

          {/* Anode (+) test tube — RIGHT, O2 */}
          <div
            className="absolute flex flex-col items-center"
            style={{ right: 28, bottom: 0 }}
          >
            <div
              className="rounded-t-full relative overflow-hidden"
              style={{
                width: 28,
                height: 80,
                border: "1.5px solid rgba(150,200,255,0.4)",
                background: "rgba(0,0,0,0.05)",
                borderBottom: "none",
              }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 rounded-b"
                style={{
                  height: `${100 - o2Pct}%`,
                  background: waterColor,
                  transition: "height 0.8s ease",
                }}
              />
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: `${o2Pct}%`,
                  background:
                    "linear-gradient(to bottom, rgba(252,211,77,0.5), rgba(252,211,77,0.15))",
                  transition: "height 0.8s ease",
                }}
              />
              <BubbleEmitter
                active={running}
                rate={Math.min(0.5, voltage / 24)}
                side="right"
                color="rgba(252,211,77,0.7)"
              />
              <div
                className="absolute top-1 left-0 right-0 text-center text-[8px] font-mono font-bold"
                style={{ color: "rgba(252,211,77,0.9)" }}
              >
                {o2Pct > 15 ? `${o2Vol.toFixed(1)}mL` : ""}
              </div>
            </div>
            <div className="text-[9px] font-bold text-yellow-300/80 mt-1">
              O₂ (+)
            </div>
          </div>

          {/* Electrode rods */}
          <div
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 70,
              left: 40,
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(100,150,220,0.9), rgba(150,200,255,0.5))",
              boxShadow: running ? "0 0 6px rgba(100,150,220,0.6)" : "none",
              transition: "box-shadow 0.4s",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 70,
              right: 40,
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(200,160,50,0.9), rgba(234,179,8,0.5))",
              boxShadow: running ? "0 0 6px rgba(200,160,50,0.6)" : "none",
              transition: "box-shadow 0.4s",
            }}
          />
        </div>
      </div>
    </div>
  );
});

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export const ElectrolysisTab = memo(function ElectrolysisTab() {
  const [voltage, setVoltage] = useState(6);
  const [running, setRunning] = useState(false);
  const [h2Vol, setH2Vol] = useState(0);
  const [o2Vol, setO2Vol] = useState(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const h2Ref = useRef(0);
  const o2Ref = useRef(0);
  const voltRef = useRef(voltage);
  const runRef = useRef(running);

  voltRef.current = voltage;
  runRef.current = running;

  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    function tick(ts: number) {
      if (!runRef.current) return;
      const dt = lastTimeRef.current ? (ts - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = ts;

      // Rate proportional to voltage (mL/s) — H2 is 2× O2
      const rate = Math.max(0, (voltRef.current - 1.23) / 10) * 0.4;
      h2Ref.current = Math.min(20, h2Ref.current + rate * 2 * dt);
      o2Ref.current = Math.min(10, o2Ref.current + rate * dt);

      setH2Vol(Number.parseFloat(h2Ref.current.toFixed(2)));
      setO2Vol(Number.parseFloat(o2Ref.current.toFixed(2)));

      rafRef.current = requestAnimationFrame(tick);
    }

    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  function handleReset() {
    setRunning(false);
    setH2Vol(0);
    setO2Vol(0);
    h2Ref.current = 0;
    o2Ref.current = 0;
  }

  const ratio = o2Vol > 0.01 ? (h2Vol / o2Vol).toFixed(1) : "—";

  return (
    <div className="space-y-6" data-ocid="virtual_lab.electrolysis.panel">
      <TheoryPanel
        principle="Water (H₂O) is split into hydrogen and oxygen gas by passing direct electric current through the solution. Electrolytes like H₂SO₄ or NaOH are added to improve conductivity — pure water is a very poor conductor."
        observations="Bubbles form at both electrodes immediately after switching on. The cathode (−) produces H₂ at twice the volume of the anode (+) which produces O₂ — reflecting the 2:1 ratio in 2H₂O → 2H₂ + O₂."
        application="Industrial-scale hydrogen production for fuel cells and energy storage. Commercial oxygen generation for hospitals and welding. Electroplating and metal refining also rely on the same principles."
      />
      <div className="flex flex-col items-center gap-4">
        <ElectrolysisApparatus
          running={running}
          voltage={voltage}
          h2Vol={h2Vol}
          o2Vol={o2Vol}
        />

        {/* Live readings */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-[10px] text-blue-300/70 font-semibold uppercase tracking-wider mb-1">
              H₂
            </div>
            <div className="font-mono text-lg font-bold text-blue-300">
              {h2Vol.toFixed(1)}
            </div>
            <div className="text-[9px] text-muted-foreground">mL</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-1"
              style={{ color: "rgba(252,211,77,0.7)" }}
            >
              O₂
            </div>
            <div
              className="font-mono text-lg font-bold"
              style={{ color: "rgba(252,211,77,0.9)" }}
            >
              {o2Vol.toFixed(1)}
            </div>
            <div className="text-[9px] text-muted-foreground">mL</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">
              H₂:O₂
            </div>
            <div className="font-mono text-lg font-bold text-foreground">
              {ratio}
            </div>
            <div className="text-[9px] text-muted-foreground">ratio</div>
          </div>
        </div>

        {/* Ratio bar */}
        {(h2Vol > 0 || o2Vol > 0) && (
          <div className="w-full max-w-xs space-y-1">
            <div className="text-[10px] text-muted-foreground text-center">
              Gas ratio (theoretical 2:1)
            </div>
            <div className="flex gap-1 h-4 rounded-full overflow-hidden">
              <div
                className="rounded-l-full transition-all duration-500"
                style={{
                  flex: h2Vol,
                  background:
                    "linear-gradient(90deg, rgba(56,189,248,0.7), rgba(147,197,253,0.9))",
                }}
              />
              <div
                className="rounded-r-full transition-all duration-500"
                style={{
                  flex: o2Vol || 0.01,
                  background:
                    "linear-gradient(90deg, rgba(234,179,8,0.7), rgba(252,211,77,0.9))",
                }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground">
              <span>H₂ (cathode −)</span>
              <span>O₂ (anode +)</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <GlassSlider
          min={1}
          max={12}
          step={0.5}
          value={voltage}
          onChange={(v) => {
            setVoltage(v);
            if (!running) handleReset();
          }}
          label="Voltage"
          unit="V"
          colorFrom="rgba(234,179,8,0.7)"
          colorTo="rgba(251,191,36,0.9)"
          data-ocid="virtual_lab.electrolysis.voltage_slider"
          aria-label="Electrolysis voltage"
        />
        <div className="text-[10px] text-muted-foreground/70">
          Minimum decomposition voltage: 1.23 V — below this, no electrolysis
          occurs.
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className={cn(
              "flex-1 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
              running
                ? "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30"
                : "bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30",
            )}
            data-ocid="virtual_lab.electrolysis.start_button"
          >
            {running ? "⏹ Stop" : "▶ Start Electrolysis"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="glass px-5 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all text-sm"
            data-ocid="virtual_lab.electrolysis.reset_button"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Explanation */}
      <div className="glass rounded-xl p-4 border-l-2 border-primary/40">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          How it works
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Passing electricity through water breaks H₂O into hydrogen (H₂) at the
          cathode (−) and oxygen (O₂) at the anode (+). Hydrogen is produced at
          twice the volume of oxygen, reflecting the 2:1 ratio in the formula
          2H₂O → 2H₂ + O₂.
        </p>
        <div className="mt-3 glass rounded-lg p-3 font-mono text-sm text-center text-foreground/90">
          2H₂O(l) → 2H₂(g) + O₂(g)
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="glass rounded-lg p-2">
            <span className="text-blue-300 font-semibold">Cathode (−): </span>
            4H⁺ + 4e⁻ → 2H₂↑
          </div>
          <div className="glass rounded-lg p-2">
            <span className="text-yellow-300 font-semibold">Anode (+): </span>
            2H₂O → O₂↑ + 4H⁺ + 4e⁻
          </div>
        </div>
      </div>
    </div>
  );
});
