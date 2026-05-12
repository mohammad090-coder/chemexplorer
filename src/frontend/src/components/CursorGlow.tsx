import { memo, useEffect, useRef } from "react";

// CursorGlow — fixed radial gradient that follows the cursor.
// Disabled on mobile (no cursor to follow, saves composite layer).
export const CursorGlow = memo(function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (el) {
          el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
        }
      });
    }

    function onDown() {
      if (el) el.style.opacity = "0.9";
    }

    function onUp() {
      if (el) el.style.opacity = "0.6";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow-dot"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(120,80,255,0.4) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.6,
        willChange: "transform",
        // Start off-screen until first mousemove
        transform: "translate(-100px, -100px)",
      }}
    />
  );
});
