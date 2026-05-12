import { type ReactNode, memo, useCallback, useRef } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onHover?: (hovered: boolean) => void;
  glowColor?: string;
  float?: boolean;
}

/**
 * GlassCard — reusable premium glass card.
 * - True liquid glass: rgba(255,255,255,0.04), backdrop-blur-xl, layered box-shadows
 * - Inner highlight layer (diagonal gradient)
 * - Subtle noise texture
 * - 3D tilt on hover (desktop only) — perspective(800px) rotateX/Y up to ±5°
 * - Lift: translateY(-6px)
 * - Glow border intensifies on hover
 * - Optional float animation (slow vertical oscillation)
 * - Mobile: 3D tilt disabled, blur reduced via CSS class override
 */
export const GlassCard = memo(function GlassCard({
  children,
  className = "",
  onHover,
  glowColor = "#6366f1",
  float = false,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // 3D tilt: track mouse relative to card center
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2); // -1 to +1
        const dy = (e.clientY - cy) / (rect.height / 2); // -1 to +1
        const rotX = -dy * 5; // ±5°
        const rotY = dx * 5;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;
        card.style.boxShadow = [
          "0 20px 56px rgba(0,0,0,0.5)",
          `0 0 32px ${glowColor}40`,
          "inset 0 1px 0 rgba(255,255,255,0.18)",
          "0 0 0 1px rgba(255,255,255,0.14)",
          "inset 0 0 20px rgba(255,255,255,0.04)",
        ].join(", ");
      });
    },
    [glowColor],
  );

  const handleMouseEnter = useCallback(() => {
    onHover?.(true);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (card) {
      card.style.transform = float ? "" : "";
      card.style.boxShadow = "";
    }
    onHover?.(false);
  }, [onHover, float]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={[
        "glass-card-component",
        float ? "glass-card-float" : "",
        "rounded-2xl",
        "overflow-hidden",
        "relative",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: [
          "0 12px 40px rgba(0,0,0,0.4)",
          "inset 0 1px 0 rgba(255,255,255,0.14)",
          "inset 0 -1px 0 rgba(0,0,0,0.1)",
          "0 0 0 1px rgba(255,255,255,0.08)",
          "inset 0 0 16px rgba(255,255,255,0.03)",
        ].join(", "),
        transition:
          "transform 0.45s cubic-bezier(0,0,0.2,1), box-shadow 0.45s cubic-bezier(0,0,0.2,1), border-color 0.3s ease",
        willChange: "transform",
      }}
    >
      {/* Inner highlight — diagonal light reflection */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          opacity: 0.018,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Card content — above pseudo layers */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
});
