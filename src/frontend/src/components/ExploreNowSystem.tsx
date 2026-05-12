import { EXPLORE_FEATURES, useExploreStore } from "@/store/exploreStore";
import { useNavigate } from "@tanstack/react-router";
import {
  Atom,
  BookOpen,
  FlaskConical,
  Grid3x3,
  Hexagon,
  Microscope,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICONS = [
  Grid3x3, // Periodic Table
  FlaskConical, // Reaction Lab
  Microscope, // Virtual Lab
  Atom, // Molecule Builder
  Hexagon, // Carbon
  BookOpen, // Practice Mode
] as const;

const ICON_COLORS = [
  "text-blue-400", // Periodic Table
  "text-orange-400", // Reaction Lab
  "text-purple-400", // Virtual Lab
  "text-cyan-400", // Molecule Builder (cyan per spec)
  "text-green-400", // Carbon
  "text-pink-400", // Practice Mode (magenta)
] as const;

// ── Popup ─────────────────────────────────────────────────────────────────────
function ExplorePopup({
  onSelect,
  onClose,
  isDismissing,
}: {
  onSelect: (index: number) => void;
  onClose: () => void;
  isDismissing: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  // Trigger entry animation on mount — 400ms easeOut per spec
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keyboard: Escape to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCardClick = useCallback(
    (index: number) => {
      setPressedIndex(index);
      // Give a brief glow-pulse then call onSelect
      setTimeout(() => onSelect(index), 220);
    },
    [onSelect],
  );

  // When isDismissing, animate out: scale down + fade
  const isOut = isDismissing || !visible;

  return (
    <dialog
      aria-label="Explore Chemistry"
      open
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-transparent border-0 m-0 max-w-none max-h-none w-full h-full"
      data-ocid="explore.popup_overlay"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "opacity 350ms ease",
          opacity: isOut ? 0 : 1,
        }}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-hidden="true"
        role="presentation"
      />

      {/* Modal */}
      <div
        style={{
          width: "min(92vw, 480px)",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "24px",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 0 48px rgba(255,255,255,0.07), 0 12px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
          // Entry: scale 0.95→1 + opacity 0→1 over 400ms easeOut
          // Dismiss: scale 0.96 + fade out
          transform: isOut
            ? isDismissing
              ? "scale(0.96) translateY(4px)"
              : "scale(0.95) translateY(8px)"
            : "scale(1) translateY(0)",
          opacity: isOut ? 0 : 1,
          transition: isDismissing
            ? "transform 280ms cubic-bezier(0.4,0,1,1), opacity 280ms ease"
            : "transform 400ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease",
          willChange: "transform, opacity",
          position: "relative",
          zIndex: 1,
        }}
        data-ocid="explore.popup_modal"
      >
        {/* Inner highlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 45%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">
                Explore Chemistry
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose where to begin
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close explore popup"
              data-ocid="explore.popup_close_button"
              className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200 shrink-0 ml-3 mt-0.5"
              style={{ minHeight: 44, minWidth: 44 }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Feature grid */}
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            {EXPLORE_FEATURES.map((feature, index) => {
              const Icon = ICONS[index];
              const iconColor = ICON_COLORS[index];
              const isPressed = pressedIndex === index;

              return (
                <button
                  key={feature.route}
                  type="button"
                  onClick={() => handleCardClick(index)}
                  data-ocid={`explore.feature_card.${index + 1}`}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid rgba(255,255,255,${isPressed ? 0.28 : 0.1})`,
                    borderRadius: "16px",
                    padding: "16px 12px",
                    minHeight: 84,
                    cursor: "pointer",
                    transform: isPressed ? "scale(0.96)" : "scale(1)",
                    boxShadow: isPressed
                      ? `0 0 20px ${feature.glowRgba}`
                      : "none",
                    transition:
                      "transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms ease, border-color 200ms ease, background 200ms ease",
                    willChange: "transform",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    textAlign: "center",
                  }}
                  className="group hover:scale-[1.04] hover:border-white/25 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      boxShadow: isPressed
                        ? `0 0 12px ${feature.glowRgba}`
                        : "none",
                      transition: "box-shadow 200ms ease",
                    }}
                  >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold text-foreground/90 leading-tight">
                    {feature.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </dialog>
  );
}

// ── Floating Controller ───────────────────────────────────────────────────────
function FloatingController() {
  const activeIndex = useExploreStore((s) => s.activeFeatureIndex);
  const isTransitioning = useExploreStore((s) => s.isTransitioning);
  const goNext = useExploreStore((s) => s.goNext);
  const goBack = useExploreStore((s) => s.goBack);
  const dismiss = useExploreStore((s) => s.dismissController);
  const setTransitioning = useExploreStore((s) => s.setTransitioning);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [tapped, setTapped] = useState(false);
  const navPendingRef = useRef<"next" | "back" | null>(null);
  const prevIndexRef = useRef(activeIndex);

  // Entry animation — delay lets popup dismiss animation finish first
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(id);
  }, []);

  // Tap feedback
  const handleTap = useCallback(() => {
    setTapped(true);
    setTimeout(() => setTapped(false), 180);
  }, []);

  // Navigate when activeIndex changes (after goNext/goBack)
  useEffect(() => {
    if (!isTransitioning) return;
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;

    const feature = EXPLORE_FEATURES[activeIndex];
    navigate({
      to: feature.route as Parameters<typeof navigate>[0]["to"],
    }).catch(() => {});
    // Clear transitioning flag after navigation
    const t = setTimeout(() => setTransitioning(false), 500);
    return () => clearTimeout(t);
  }, [activeIndex, isTransitioning, navigate, setTransitioning]);

  const feature = EXPLORE_FEATURES[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === EXPLORE_FEATURES.length - 1;
  const glowRgba = feature.glowRgba;

  const handleNext = useCallback(() => {
    if (isLast) return;
    navPendingRef.current = "next";
    goNext();
  }, [isLast, goNext]);

  const handleBack = useCallback(() => {
    if (isFirst) return;
    navPendingRef.current = "back";
    goBack();
  }, [isFirst, goBack]);

  return (
    <nav
      aria-label={`Exploring: ${feature.label}`}
      data-ocid="explore.floating_controller"
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleTap();
      }}
      style={{
        position: "fixed",
        // Safe area aware: above dock (dock ~60px) + safe area
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)",
        left: "50%",
        // Two-state transform: visible state respects tap feedback
        transform: visible
          ? tapped
            ? "translateX(-50%) translateY(0px) scale(0.96)"
            : "translateX(-50%) translateY(0px) scale(1)"
          : "translateX(-50%) translateY(20px) scale(0.95)",
        opacity: visible ? 1 : 0,
        width: "min(92vw, 460px)",
        zIndex: 150,
        // Separate transitions for tap-in (fast) vs appear (slow)
        transition: tapped
          ? "transform 120ms cubic-bezier(0.22,1,0.36,1)"
          : "transform 500ms cubic-bezier(0.22,1,0.36,1), opacity 450ms ease",
        willChange: "transform, opacity",
      }}
    >
      {/* Per-section glow keyframes + mobile backdrop-blur reduction */}
      <style>{`
        @keyframes ctrl-glow-pulse-${activeIndex} {
          0%   { box-shadow: 0 0 14px ${glowRgba}, 0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10); }
          50%  { box-shadow: 0 0 32px ${glowRgba}, 0 6px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14); }
          100% { box-shadow: 0 0 14px ${glowRgba}, 0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10); }
        }
        .ctrl-pill {
          animation: ctrl-glow-pulse-${activeIndex} 4.5s ease-in-out infinite;
          transition: box-shadow 300ms ease;
        }
        @media (max-width: 640px) {
          .ctrl-pill {
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
          }
        }
      `}</style>

      {/* Main pill */}
      <div
        className="ctrl-pill"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: "9999px",
          // Top-to-bottom inner gradient for glass depth
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 6,
          paddingRight: 6,
          gap: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top inner highlight streak */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.40), transparent)",
            borderRadius: "9999px",
            pointerEvents: "none",
          }}
        />
        {/* Dynamic left-edge color accent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            bottom: "20%",
            width: 2,
            background: `linear-gradient(180deg, transparent, ${glowRgba}, transparent)`,
            borderRadius: "9999px",
            pointerEvents: "none",
            transition: "background 300ms ease",
          }}
        />

        {/* Back button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleBack();
          }}
          disabled={isFirst}
          aria-label="Go to previous feature"
          data-ocid="explore.controller_back_button"
          style={{
            minHeight: 44,
            minWidth: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            background: "transparent",
            border: "none",
            color: isFirst
              ? "rgba(255,255,255,0.22)"
              : "rgba(255,255,255,0.85)",
            cursor: isFirst ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 600,
            padding: "0 14px",
            letterSpacing: "0.01em",
            transition: "transform 150ms ease, color 200ms ease",
            willChange: "transform",
          }}
          className="hover:scale-[1.06] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          ← Back
        </button>

        {/* Center: feature name + progress dots */}
        <div
          className="flex flex-col items-center justify-center gap-1.5 flex-1 min-w-0"
          style={{ paddingTop: 2 }}
        >
          <span
            className="text-sm font-bold text-foreground truncate w-full text-center leading-tight"
            style={{
              maxWidth: 140,
              textShadow: `0 0 14px ${glowRgba}`,
              transition: "text-shadow 300ms ease",
              fontSize: "clamp(11px, 2.5vw, 13px)",
            }}
          >
            {feature.label}
          </span>
          {/* Progress dots */}
          <div className="flex items-center gap-1" style={{ flexShrink: 0 }}>
            {EXPLORE_FEATURES.map((feat, i) => (
              <button
                key={feat.route}
                type="button"
                aria-label={`Go to ${EXPLORE_FEATURES[i].label}`}
                data-ocid={`explore.dot.${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  useExploreStore.getState().selectFeature(i);
                  navigate({
                    to: EXPLORE_FEATURES[i].route as Parameters<
                      typeof navigate
                    >[0]["to"],
                  }).catch(() => {});
                }}
                style={{
                  width: i === activeIndex ? 18 : 5,
                  height: 5,
                  borderRadius: "9999px",
                  background:
                    i === activeIndex
                      ? feature.glowColor
                      : "rgba(255,255,255,0.28)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  flexShrink: 0,
                  boxShadow: i === activeIndex ? `0 0 8px ${glowRgba}` : "none",
                  transition:
                    "width 320ms cubic-bezier(0.22,1,0.36,1), background 300ms ease, box-shadow 300ms ease",
                  willChange: "width",
                }}
              />
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={isLast}
          aria-label="Go to next feature"
          data-ocid="explore.controller_next_button"
          style={{
            minHeight: 44,
            minWidth: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            background: "transparent",
            border: "none",
            color: isLast ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.85)",
            cursor: isLast ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 600,
            padding: "0 14px",
            letterSpacing: "0.01em",
            transition: "transform 150ms ease, color 200ms ease",
            willChange: "transform",
          }}
          className="hover:scale-[1.06] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          Next →
        </button>

        {/* Dismiss × */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          aria-label="Dismiss guided navigation"
          data-ocid="explore.controller_dismiss_button"
          style={{
            minHeight: 36,
            minWidth: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.45)",
            cursor: "pointer",
            marginRight: 2,
            flexShrink: 0,
            transition:
              "transform 150ms ease, background 200ms ease, color 200ms ease",
          }}
          className="hover:bg-white/[0.12] hover:text-white/70 active:scale-90"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export function ExploreNowSystem() {
  const isPopupOpen = useExploreStore((s) => s.isPopupOpen);
  const isDismissingPopup = useExploreStore((s) => s.isDismissingPopup);
  const isControllerVisible = useExploreStore((s) => s.isControllerVisible);
  const closePopup = useExploreStore((s) => s.closePopup);
  const setDismissingPopup = useExploreStore((s) => s.setDismissingPopup);
  const selectFeature = useExploreStore((s) => s.selectFeature);
  const navigate = useNavigate();

  // Popup → controller morph:
  // 1. Mark dismissing (triggers shrink+fade animation on popup)
  // 2. After dismiss animation (300ms), close popup + show controller
  const handleSelect = useCallback(
    (index: number) => {
      setDismissingPopup(true);
      setTimeout(() => {
        selectFeature(index);
        navigate({
          to: EXPLORE_FEATURES[index].route as Parameters<
            typeof navigate
          >[0]["to"],
        }).catch(() => {});
      }, 300);
    },
    [selectFeature, setDismissingPopup, navigate],
  );

  const handleClose = useCallback(() => {
    setDismissingPopup(true);
    setTimeout(() => closePopup(), 300);
  }, [closePopup, setDismissingPopup]);

  // Show popup when open OR while dismissing (so exit animation plays)
  const showPopup = isPopupOpen || isDismissingPopup;

  return (
    <>
      {showPopup && (
        <ExplorePopup
          onSelect={handleSelect}
          onClose={handleClose}
          isDismissing={isDismissingPopup}
        />
      )}
      {isControllerVisible && !isPopupOpen && !isDismissingPopup && (
        <FloatingController />
      )}
    </>
  );
}
