import { type AtomModel, AtomicStructure } from "@/components/AtomicStructure";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
  type Element,
} from "@/types/element";
import { ChevronLeft, ChevronRight, Star, StarOff, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

// ── Category color maps (raw CSS values for inline styles) ──────────────────
const CATEGORY_GLOW_COLOR: Record<string, string> = {
  "alkali-metal": "rgba(34,211,238,0.35)",
  "alkaline-earth-metal": "rgba(232,121,249,0.35)",
  "transition-metal": "rgba(167,139,250,0.35)",
  "post-transition-metal": "rgba(96,165,250,0.35)",
  metalloid: "rgba(251,113,133,0.35)",
  nonmetal: "rgba(251,146,60,0.35)",
  halogen: "rgba(52,211,153,0.35)",
  "noble-gas": "rgba(250,204,21,0.35)",
  lanthanide: "rgba(129,140,248,0.35)",
  actinide: "rgba(248,113,113,0.35)",
  unknown: "rgba(148,163,184,0.25)",
};

const CATEGORY_BORDER_COLOR: Record<string, string> = {
  "alkali-metal": "rgba(34,211,238,0.5)",
  "alkaline-earth-metal": "rgba(232,121,249,0.5)",
  "transition-metal": "rgba(167,139,250,0.5)",
  "post-transition-metal": "rgba(96,165,250,0.5)",
  metalloid: "rgba(251,113,133,0.5)",
  nonmetal: "rgba(251,146,60,0.5)",
  halogen: "rgba(52,211,153,0.5)",
  "noble-gas": "rgba(250,204,21,0.5)",
  lanthanide: "rgba(129,140,248,0.5)",
  actinide: "rgba(248,113,113,0.5)",
  unknown: "rgba(148,163,184,0.4)",
};

const CATEGORY_BADGE_BG: Record<string, string> = {
  "alkali-metal": "rgba(34,211,238,0.15)",
  "alkaline-earth-metal": "rgba(232,121,249,0.15)",
  "transition-metal": "rgba(167,139,250,0.15)",
  "post-transition-metal": "rgba(96,165,250,0.15)",
  metalloid: "rgba(251,113,133,0.15)",
  nonmetal: "rgba(251,146,60,0.15)",
  halogen: "rgba(52,211,153,0.15)",
  "noble-gas": "rgba(250,204,21,0.15)",
  lanthanide: "rgba(129,140,248,0.15)",
  actinide: "rgba(248,113,113,0.15)",
  unknown: "rgba(148,163,184,0.12)",
};

// ── Types ────────────────────────────────────────────────────────────────────
export interface ElementOverlayProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  /** Screen position of the clicked tile — drives origin animation */
  clickOrigin?: { x: number; y: number };
}

// ── Property Row ─────────────────────────────────────────────────────────────
function PropRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-foreground text-right break-all">
        {value === 0 || value ? value : "—"}
      </span>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export const ElementOverlay = memo(function ElementOverlay({
  element,
  isOpen,
  onClose,
  onNavigate,
  clickOrigin,
}: ElementOverlayProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { favorites, toggleFavorite } = useChemStore();
  const [favPulse, setFavPulse] = useState(false);
  const [slideDir, setSlideDir] = useState<"prev" | "next">("next");
  const [atomModel, setAtomModel] = useState<AtomModel>("bohr");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  // Track mobile breakpoint for perf-aware animations
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Focus close button when overlay opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleNavigate = useCallback(
    (dir: "prev" | "next") => {
      setSlideDir(dir);
      onNavigate(dir);
    },
    [onNavigate],
  );

  const handleToggleFavorite = useCallback(() => {
    if (!element) return;
    toggleFavorite(element.symbol);
    setFavPulse(true);
    setTimeout(() => setFavPulse(false), 400);
  }, [element, toggleFavorite]);

  const isFav = element ? favorites.includes(element.symbol) : false;
  const glowColor = element
    ? (CATEGORY_GLOW_COLOR[element.category] ?? "rgba(148,163,184,0.25)")
    : "rgba(148,163,184,0.25)";
  const borderColor = element
    ? (CATEGORY_BORDER_COLOR[element.category] ?? "rgba(148,163,184,0.4)")
    : "rgba(148,163,184,0.4)";
  const badgeBg = element
    ? (CATEGORY_BADGE_BG[element.category] ?? "rgba(148,163,184,0.12)")
    : "rgba(148,163,184,0.12)";

  const slideOffset = slideDir === "next" ? 24 : -24;

  // ── Origin-based transform for opening animation ──────────────────────────
  // Compute where in viewport the origin is, relative to viewport center
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const ox = clickOrigin ? clickOrigin.x - vw / 2 : 0;
  const oy = clickOrigin ? clickOrigin.y - vh / 2 : 0;

  // On mobile skip origin-based translate for simpler animation
  const panelInitial = isMobile
    ? { scale: 0.92, opacity: 0, x: 0, y: 16 }
    : { scale: 0.08, opacity: 0, x: ox, y: oy };
  const panelAnimate = { scale: 1, opacity: 1, x: 0, y: 0 };
  const panelExit = isMobile
    ? { scale: 0.96, opacity: 0, x: 0, y: 8 }
    : { scale: 0.08, opacity: 0, x: ox, y: oy };

  const panelTransition = isMobile
    ? {
        duration: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }
    : {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      };

  const overlay = (
    <AnimatePresence>
      {isOpen && element && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100]"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: isMobile ? undefined : "blur(6px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel wrapper — center in viewport */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none">
            <motion.dialog
              key={`panel-${element.atomicNumber}`}
              open
              aria-labelledby="overlay-element-name"
              className="pointer-events-auto relative w-full mx-3 md:mx-4 md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl md:rounded-2xl p-0 m-0 border-0"
              style={{
                background: "rgba(12,12,22,0.88)",
                backdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
                WebkitBackdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
                border: `1px solid ${borderColor}`,
                boxShadow: `0 0 40px 0 ${glowColor}, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
                willChange: "transform, opacity",
                transformOrigin: "center center",
                scrollbarWidth: "thin",
                scrollbarColor: `${borderColor} transparent`,
                colorScheme: "dark",
              }}
              initial={panelInitial}
              animate={panelAnimate}
              exit={panelExit}
              transition={panelTransition}
            >
              {/* Slide wrapper — animates when switching elements */}
              <motion.div
                key={element.atomicNumber}
                initial={{ x: slideOffset, opacity: 0.6 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {/* ── Header ──────────────────────────────────────── */}
                <div
                  className="sticky top-0 z-10 flex items-start gap-4 p-4 md:p-6 rounded-t-xl md:rounded-t-2xl"
                  style={{
                    background: "rgba(12,12,22,0.96)",
                    backdropFilter: "blur(8px)",
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  {/* Symbol tile */}
                  <div
                    className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENT[element.category]}`}
                    style={{ boxShadow: `0 0 20px 0 ${glowColor}` }}
                  >
                    <span className="text-2xl md:text-3xl font-bold text-white leading-none">
                      {element.symbol}
                    </span>
                    <span className="text-[10px] text-white/70 mt-0.5">
                      {element.atomicNumber}
                    </span>
                  </div>

                  {/* Name + badges */}
                  <div className="flex-1 min-w-0">
                    <h1
                      id="overlay-element-name"
                      className="text-xl md:text-3xl font-bold text-foreground leading-tight truncate"
                    >
                      {element.name}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_TEXT[element.category]}`}
                        style={{ backgroundColor: badgeBg }}
                      >
                        {CATEGORY_LABELS[element.category]}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-muted-foreground">
                        Group {element.group} · Period {element.period} ·{" "}
                        {element.block}-block
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-muted-foreground">
                        {element.state} at RT
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <motion.button
                      type="button"
                      data-ocid="element.overlay.favorite_button"
                      onClick={handleToggleFavorite}
                      animate={
                        favPulse ? { scale: [1, 1.35, 1] } : { scale: 1 }
                      }
                      transition={{ duration: 0.35 }}
                      className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isFav
                          ? "bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30"
                          : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      }`}
                      aria-label={
                        isFav ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      {isFav ? <StarOff size={18} /> : <Star size={18} />}
                    </motion.button>
                    <button
                      type="button"
                      ref={closeButtonRef}
                      data-ocid="element.overlay.close_button"
                      onClick={onClose}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
                      aria-label="Close overlay"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* ── Body ────────────────────────────────────────── */}
                <div className="p-4 md:p-6 space-y-6">
                  {/* Atomic structure visualization */}
                  <div
                    className="rounded-xl p-4 flex flex-col items-center gap-3"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Atomic Structure
                      </p>
                      {/* Model toggle */}
                      <div
                        className="flex rounded-lg overflow-hidden border"
                        style={{ borderColor: `${borderColor}` }}
                        data-ocid="element.overlay.model_toggle"
                      >
                        {(["bohr", "orbital"] as AtomModel[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setAtomModel(m)}
                            className="px-2.5 py-1 text-[10px] font-medium transition-all duration-200 capitalize"
                            style={{
                              background:
                                atomModel === m
                                  ? `${borderColor.replace("0.5)", "0.18)")}`
                                  : "transparent",
                              color:
                                atomModel === m
                                  ? "var(--foreground)"
                                  : "var(--muted-foreground)",
                              borderRight:
                                m === "bohr"
                                  ? `1px solid ${borderColor}`
                                  : "none",
                            }}
                            data-ocid={`element.overlay.model_toggle.${m}`}
                            aria-pressed={atomModel === m}
                          >
                            {m === "bohr" ? "Bohr" : "Orbital"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <AtomicStructure
                      atomicNumber={element.atomicNumber}
                      electronConfiguration={element.electronConfiguration}
                      category={element.category}
                      visible={isOpen}
                      model={atomModel}
                    />
                    <p className="text-[11px] text-muted-foreground/70 font-mono">
                      {element.electronConfiguration}
                    </p>
                  </div>

                  {/* Two-column grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Identity */}
                    <div
                      className="rounded-xl p-4 space-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Identity
                      </p>
                      <PropRow
                        label="Atomic Number"
                        value={element.atomicNumber}
                      />
                      <PropRow
                        label="Atomic Mass"
                        value={`${element.atomicMass} u`}
                      />
                      <PropRow
                        label="Category"
                        value={CATEGORY_LABELS[element.category]}
                      />
                      <PropRow label="Group" value={element.group} />
                      <PropRow label="Period" value={element.period} />
                      <PropRow label="Block" value={`${element.block}-block`} />
                      <PropRow label="State at RT" value={element.state} />
                    </div>

                    {/* Physical & Chemical */}
                    <div
                      className="rounded-xl p-4 space-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Properties
                      </p>
                      <PropRow
                        label="Electron Config"
                        value={element.electronConfiguration}
                      />
                      <PropRow
                        label="Density"
                        value={
                          element.density > 0 ? `${element.density} g/cm³` : "—"
                        }
                      />
                      <PropRow
                        label="Melting Point"
                        value={
                          element.meltingPoint !== 0
                            ? `${element.meltingPoint}°C`
                            : "—"
                        }
                      />
                      <PropRow
                        label="Boiling Point"
                        value={
                          element.boilingPoint !== 0
                            ? `${element.boilingPoint}°C`
                            : "—"
                        }
                      />
                      <PropRow
                        label="Electronegativity"
                        value={
                          element.electronegativity > 0
                            ? element.electronegativity
                            : "—"
                        }
                      />
                      <PropRow
                        label="Ionization Energy"
                        value={
                          element.ionizationEnergy > 0
                            ? `${element.ionizationEnergy} kJ/mol`
                            : "—"
                        }
                      />
                      <PropRow
                        label="Atomic Radius"
                        value={
                          element.atomicRadius > 0
                            ? `${element.atomicRadius} pm`
                            : "—"
                        }
                      />
                    </div>
                  </div>

                  {/* Description */}
                  {element.description && (
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        About
                      </p>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {element.description}
                      </p>
                    </div>
                  )}

                  {/* Uses */}
                  {element.uses.length > 0 && (
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Uses
                      </p>
                      <ul className="space-y-1.5">
                        {element.uses.map((use) => (
                          <li
                            key={use}
                            className="flex gap-2.5 text-sm text-foreground/80 leading-snug"
                          >
                            <span
                              className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br ${CATEGORY_GRADIENT[element.category]}`}
                            />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Facts */}
                  {element.facts.length > 0 && (
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Interesting Facts
                      </p>
                      <ul className="space-y-1.5">
                        {element.facts.map((fact, idx) => (
                          <li
                            key={fact}
                            className="flex gap-2.5 text-sm text-foreground/80 leading-snug"
                          >
                            <span className="text-muted-foreground shrink-0 text-xs mt-0.5 font-mono">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ── Navigation ──────────────────────────────────── */}
                  <div className="flex items-center justify-between gap-3 pt-2 pb-1">
                    <button
                      type="button"
                      data-ocid="element.overlay.prev_button"
                      onClick={() => handleNavigate("prev")}
                      disabled={element.atomicNumber <= 1}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-foreground/80 hover:text-foreground min-h-[44px]"
                      aria-label="Previous element"
                    >
                      <ChevronLeft size={16} />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <span className="text-xs text-muted-foreground font-mono">
                      #{element.atomicNumber} / 118
                    </span>

                    <button
                      type="button"
                      data-ocid="element.overlay.next_button"
                      onClick={() => handleNavigate("next")}
                      disabled={element.atomicNumber >= 118}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-foreground/80 hover:text-foreground min-h-[44px]"
                      aria-label="Next element"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.dialog>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(overlay, document.body);
});
