import { r as reactExports, j as jsxRuntimeExports, h as cn } from "./index-DyyHqAHL.js";
function snapToStep(raw, min, max, step) {
  const clamped = Math.max(min, Math.min(max, raw));
  const steps = Math.round((clamped - min) / step);
  return Math.max(min, Math.min(max, min + steps * step));
}
const GlassSlider = reactExports.memo(function GlassSlider2({
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
  "aria-label": ariaLabel
}) {
  const displayVal = Math.abs(max - min) <= 10 ? value.toFixed(1) : Number.isInteger(step) && step >= 1 ? Math.round(value).toLocaleString() : value.toFixed(1);
  const trackRef = reactExports.useRef(null);
  const rafId = reactExports.useRef(0);
  const rectRef = reactExports.useRef(null);
  const pendingValue = reactExports.useRef(value);
  const isDragging = reactExports.useRef(false);
  const [visualPct, setVisualPct] = reactExports.useState(
    () => Math.max(0, Math.min(100, (value - min) / (max - min) * 100))
  );
  const [dragging, setDragging] = reactExports.useState(false);
  const [hovered, setHovered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isDragging.current) {
      setVisualPct(
        Math.max(0, Math.min(100, (value - min) / (max - min) * 100))
      );
    }
  }, [value, min, max]);
  const calcValue = reactExports.useCallback(
    (clientX, rect) => {
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      return snapToStep(min + ratio * (max - min), min, max, step);
    },
    [min, max, step]
  );
  const handlePointerDown = reactExports.useCallback(
    (e) => {
      var _a;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      setDragging(true);
      rectRef.current = ((_a = trackRef.current) == null ? void 0 : _a.getBoundingClientRect()) ?? null;
      if (rectRef.current) {
        const newVal = calcValue(e.clientX, rectRef.current);
        pendingValue.current = newVal;
        setVisualPct(
          Math.max(0, Math.min(100, (newVal - min) / (max - min) * 100))
        );
        onChange(newVal);
      }
    },
    [calcValue, min, max, onChange]
  );
  const handlePointerMove = reactExports.useCallback(
    (e) => {
      if (!isDragging.current || !rectRef.current) return;
      e.preventDefault();
      const newVal = calcValue(e.clientX, rectRef.current);
      if (newVal === pendingValue.current) return;
      pendingValue.current = newVal;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setVisualPct(
          Math.max(0, Math.min(100, (newVal - min) / (max - min) * 100))
        );
        onChange(newVal);
      });
    },
    [calcValue, min, max, onChange]
  );
  const handlePointerUp = reactExports.useCallback(
    (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setDragging(false);
      cancelAnimationFrame(rafId.current);
      e.currentTarget.releasePointerCapture(e.pointerId);
      if (rectRef.current) {
        const finalVal = calcValue(e.clientX, rectRef.current);
        setVisualPct(
          Math.max(0, Math.min(100, (finalVal - min) / (max - min) * 100))
        );
        onChange(finalVal);
      }
      rectRef.current = null;
    },
    [calcValue, min, max, onChange]
  );
  const handleKeyDown = reactExports.useCallback(
    (e) => {
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
        Math.max(0, Math.min(100, (newVal - min) / (max - min) * 100))
      );
      onChange(newVal);
    },
    [value, step, min, max, onChange]
  );
  const thumbScale = dragging ? 1.15 : hovered ? 1.2 : 1;
  const thumbGlow = dragging ? "0 0 24px rgba(96,165,250,1.0), 0 0 12px rgba(52,211,153,0.7), 0 2px 8px rgba(0,0,0,0.4)" : hovered ? "0 0 20px rgba(96,165,250,0.8), 0 2px 6px rgba(0,0,0,0.35)" : "0 0 12px rgba(96,165,250,0.6), 0 2px 8px rgba(0,0,0,0.3)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("select-none", className), children: [
    (label || unit !== void 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5 text-sm leading-none", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-medium",
          style: { color: "rgba(255,255,255,0.8)" },
          children: label
        }
      ),
      unit !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "font-mono font-semibold tabular-nums",
          style: { color: "rgba(255,255,255,0.9)" },
          children: [
            displayVal,
            unit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: { color: "rgba(255,255,255,0.55)", marginLeft: 2 },
                children: unit
              }
            ) : null
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: trackRef,
        role: "slider",
        tabIndex: 0,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": value,
        "aria-label": ariaLabel ?? label,
        "data-ocid": ocid,
        className: "relative flex items-center focus:outline-none",
        style: {
          minHeight: 44,
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none"
        },
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerCancel: handlePointerUp,
        onKeyDown: handleKeyDown,
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-y-0 my-auto w-full rounded-full overflow-hidden",
              style: {
                height: 8,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 9999,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-y-0 left-0 rounded-full",
                  style: {
                    width: `${visualPct}%`,
                    background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
                    boxShadow: "0 0 8px rgba(96,165,250,0.5)",
                    borderRadius: 9999,
                    transition: isDragging.current ? "width 0.05s linear" : "width 0.15s ease",
                    willChange: "width"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute pointer-events-none rounded-full",
              style: {
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
                willChange: "transform"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "15%",
                    left: "20%",
                    width: "40%",
                    height: "30%",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.45)",
                    filter: "blur(1px)"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute pointer-events-none",
              style: {
                width: 44,
                height: 44,
                left: `${visualPct}%`,
                top: "50%",
                transform: "translate(-50%, -50%)"
              }
            }
          )
        ]
      }
    )
  ] });
});
export {
  GlassSlider as G
};
