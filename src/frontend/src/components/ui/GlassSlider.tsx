import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";

export interface GlassSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  label?: string;
  unit?: string;
  /** Color stop for the left side of the gradient fill, e.g. "rgba(96,165,250,0.8)" */
  colorFrom?: string;
  /** Color stop for the right side of the gradient fill */
  colorTo?: string;
  className?: string;
  "data-ocid"?: string;
  "aria-label"?: string;
}

/** Snap a raw value to the nearest step, clamped to [min, max]. */
function snapToStep(raw: number, min: number, max: number, step: number) {
  const clamped = Math.max(min, Math.min(max, raw));
  const steps = Math.round((clamped - min) / step);
  return Math.max(min, Math.min(max, min + steps * step));
}

const GlassSlider = memo(function GlassSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  label,
  unit,
  colorFrom = "rgba(96,165,250,0.8)",
  colorTo = "rgba(52,211,153,0.8)",
  className,
  "data-ocid": ocid,
  "aria-label": ariaLabel,
}: GlassSliderProps) {
  // ── Derived display value ──────────────────────────────────────────────────
  const displayVal =
    Math.abs(max - min) <= 10
      ? value.toFixed(1)
      : Number.isInteger(step) && step >= 1
        ? Math.round(value).toLocaleString()
        : value.toFixed(1);

  // ── Refs for pointer-event drag (zero re-renders during drag) ─────────────
  const trackRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const rectRef = useRef<DOMRect | null>(null);
  const pendingValue = useRef<number>(value);
  const isDragging = useRef(false);

  // ── Visual-only state (drives CSS only, not re-render of parent) ──────────
  const [visualPct, setVisualPct] = useState(() =>
    Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)),
  );
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Sync visual pct when value prop changes externally (not during drag)
  useEffect(() => {
    if (!isDragging.current) {
      setVisualPct(
        Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)),
      );
    }
  }, [value, min, max]);

  // ── Pointer calculation ───────────────────────────────────────────────────
  const calcValue = useCallback(
    (clientX: number, rect: DOMRect) => {
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      return snapToStep(min + ratio * (max - min), min, max, step);
    },
    [min, max, step],
  );

  // ── Pointer event handlers ────────────────────────────────────────────────
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      setDragging(true);

      // Cache rect once — avoids repeated reflow during drag
      rectRef.current = trackRef.current?.getBoundingClientRect() ?? null;

      if (rectRef.current) {
        const newVal = calcValue(e.clientX, rectRef.current);
        pendingValue.current = newVal;
        setVisualPct(
          Math.max(0, Math.min(100, ((newVal - min) / (max - min)) * 100)),
        );
        onChange(newVal);
      }
    },
    [calcValue, min, max, onChange],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || !rectRef.current) return;
      e.preventDefault();

      const newVal = calcValue(e.clientX, rectRef.current);
      if (newVal === pendingValue.current) return;

      pendingValue.current = newVal;

      // Batch visual update via rAF — no layout thrash
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setVisualPct(
          Math.max(0, Math.min(100, ((newVal - min) / (max - min)) * 100)),
        );
        onChange(newVal);
      });
    },
    [calcValue, min, max, onChange],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setDragging(false);
      cancelAnimationFrame(rafId.current);
      e.currentTarget.releasePointerCapture(e.pointerId);

      if (rectRef.current) {
        const finalVal = calcValue(e.clientX, rectRef.current);
        setVisualPct(
          Math.max(0, Math.min(100, ((finalVal - min) / (max - min)) * 100)),
        );
        onChange(finalVal);
      }
      rectRef.current = null;
    },
    [calcValue, min, max, onChange],
  );

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let newVal = value;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        newVal = snapToStep(value + step, min, max, step);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        newVal = snapToStep(value - step, min, max, step);
      } else if (e.key === "Home") {
        newVal = min;
      } else if (e.key === "End") {
        newVal = max;
      } else {
        return;
      }
      e.preventDefault();
      setVisualPct(
        Math.max(0, Math.min(100, ((newVal - min) / (max - min)) * 100)),
      );
      onChange(newVal);
    },
    [value, step, min, max, onChange],
  );

  // ── Derived styles ────────────────────────────────────────────────────────
  const thumbScale = dragging ? 1.15 : hovered ? 1.2 : 1.0;
  const thumbGlow = dragging
    ? "0 0 24px rgba(96,165,250,1.0), 0 0 12px rgba(52,211,153,0.7), 0 2px 8px rgba(0,0,0,0.4)"
    : hovered
      ? "0 0 20px rgba(96,165,250,0.8), 0 2px 6px rgba(0,0,0,0.35)"
      : "0 0 12px rgba(96,165,250,0.6), 0 2px 8px rgba(0,0,0,0.3)";

  return (
    <div className={cn("select-none", className)}>
      {/* Label + value row */}
      {(label || unit !== undefined) && (
        <div className="flex items-center justify-between mb-2.5 text-sm leading-none">
          {label && (
            <span
              className="font-medium"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {label}
            </span>
          )}
          {unit !== undefined && (
            <span
              className="font-mono font-semibold tabular-nums"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {displayVal}
              {unit ? (
                <span
                  style={{ color: "rgba(255,255,255,0.55)", marginLeft: 2 }}
                >
                  {unit}
                </span>
              ) : null}
            </span>
          )}
        </div>
      )}

      {/* Interactive zone — 44px tall for thumb hit area */}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={ariaLabel ?? label}
        data-ocid={ocid}
        className="relative flex items-center focus:outline-none"
        style={{
          minHeight: 44,
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Track background ─────────────────────────────────────────── */}
        <div
          className="absolute inset-y-0 my-auto w-full rounded-full overflow-hidden"
          style={{
            height: 8,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 9999,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            boxShadow:
              "inset 0 1px 3px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* ── Progress fill ──────────────────────────────────────────── */}
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${visualPct}%`,
              background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
              boxShadow: "0 0 8px rgba(96,165,250,0.5)",
              borderRadius: 9999,
              transition: isDragging.current
                ? "width 0.05s linear"
                : "width 0.15s ease",
              willChange: "width",
            }}
          />
        </div>

        {/* ── Thumb — centered via translate ───────────────────────────── */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 20,
            height: 20,
            left: `${visualPct}%`,
            top: "50%",
            transform: `translate(-50%, -50%) scale(${thumbScale})`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.25)",
            border: "1.5px solid rgba(255,255,255,0.5)",
            boxShadow: thumbGlow,
            borderRadius: "50%",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            willChange: "transform",
          }}
        >
          {/* Inner specular highlight */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "20%",
              width: "40%",
              height: "30%",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.45)",
              filter: "blur(1px)",
            }}
          />
        </div>

        {/* ── Mobile touch hit-area overlay (44×44) ────────────────────── */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 44,
            height: 44,
            left: `${visualPct}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
});

export { GlassSlider };
export default GlassSlider;
