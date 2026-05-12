import { ELEMENTS } from "@/lib/elements-data";
import { useNavigate } from "@tanstack/react-router";
import {
  Atom,
  BarChart2,
  BookOpen,
  Brain,
  CircleDot,
  Diamond,
  FlaskConical,
  GitCompare,
  Lightbulb,
  Pencil,
  Search,
  TestTube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface PaletteResult {
  id: string;
  label: string;
  category: "Element" | "Page" | "Reaction";
  to: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

const PAGE_RESULTS: PaletteResult[] = [
  {
    id: "p-periodic",
    label: "Periodic Table",
    category: "Page",
    to: "/periodic-table",
    icon: <Atom className="w-4 h-4 text-blue-400" />,
  },
  {
    id: "p-virtual-lab",
    label: "Virtual Lab",
    category: "Page",
    to: "/virtual-lab",
    icon: <TestTube className="w-4 h-4 text-lime-400" />,
  },
  {
    id: "p-reaction-lab",
    label: "Reaction Lab",
    category: "Page",
    to: "/reaction-lab",
    icon: <FlaskConical className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "p-practice",
    label: "Practice Mode",
    category: "Page",
    to: "/practice",
    icon: <Brain className="w-4 h-4 text-rose-400" />,
  },
  {
    id: "p-carbon",
    label: "Carbon Explorer",
    category: "Page",
    to: "/carbon",
    icon: <Diamond className="w-4 h-4 text-slate-300" />,
  },
  {
    id: "p-molecule-builder",
    label: "Molecule Builder",
    category: "Page",
    to: "/molecule-builder",
    icon: <Pencil className="w-4 h-4 text-teal-300" />,
  },
  {
    id: "p-molecules",
    label: "3D Molecules",
    category: "Page",
    to: "/molecules",
    icon: <CircleDot className="w-4 h-4 text-sky-400" />,
  },
  {
    id: "p-atom-tracker",
    label: "Atom Tracker",
    category: "Page",
    to: "/atom-tracker",
    icon: <Atom className="w-4 h-4 text-violet-400" />,
  },
  {
    id: "p-formulas",
    label: "Formula Hub",
    category: "Page",
    to: "/formulas",
    icon: <BookOpen className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "p-progress",
    label: "Progress",
    category: "Page",
    to: "/progress",
    icon: <BarChart2 className="w-4 h-4 text-indigo-400" />,
  },
  {
    id: "p-smart",
    label: "Smart Features",
    category: "Page",
    to: "/smart-features",
    icon: <Lightbulb className="w-4 h-4 text-orange-400" />,
  },
  {
    id: "p-exam",
    label: "Exam Mode",
    category: "Page",
    to: "/exam-mode",
    icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: "p-compare",
    label: "Compare Elements",
    category: "Page",
    to: "/compare",
    icon: <GitCompare className="w-4 h-4 text-fuchsia-400" />,
  },
  {
    id: "p-reactivity",
    label: "Reactivity Series",
    category: "Page",
    to: "/reactivity-series",
    icon: <Zap className="w-4 h-4 text-yellow-400" />,
  },
];

const QUICK_REACTIONS: PaletteResult[] = [
  {
    id: "r-water",
    label: "H₂ + O₂ → H₂O",
    category: "Reaction",
    to: "/reaction-lab",
    sublabel: "Synthesis of Water",
  },
  {
    id: "r-combustion",
    label: "CH₄ + O₂ → CO₂ + H₂O",
    category: "Reaction",
    to: "/reaction-lab",
    sublabel: "Methane Combustion",
  },
  {
    id: "r-haber",
    label: "N₂ + H₂ → NH₃",
    category: "Reaction",
    to: "/reaction-lab",
    sublabel: "Haber Process",
  },
  {
    id: "r-contact",
    label: "SO₂ + O₂ → SO₃",
    category: "Reaction",
    to: "/reaction-lab",
    sublabel: "Contact Process",
  },
  {
    id: "r-rust",
    label: "Fe + O₂ + H₂O → Fe₂O₃",
    category: "Reaction",
    to: "/reaction-lab",
    sublabel: "Rusting of Iron",
  },
  {
    id: "r-electrolysis",
    label: "H₂O → H₂ + O₂",
    category: "Reaction",
    to: "/virtual-lab",
    sublabel: "Electrolysis",
  },
  {
    id: "r-neutralize",
    label: "HCl + NaOH → NaCl + H₂O",
    category: "Reaction",
    to: "/reaction-lab",
    sublabel: "Acid-Base Neutralization",
  },
  {
    id: "r-kmno4",
    label: "KMnO₄ + Mohr Salt",
    category: "Reaction",
    to: "/virtual-lab",
    sublabel: "Redox Titration",
  },
];

const CATEGORY_COLORS: Record<PaletteResult["category"], string> = {
  Element: "bg-blue-500/20 text-blue-300",
  Page: "bg-violet-500/20 text-violet-300",
  Reaction: "bg-emerald-500/20 text-emerald-300",
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette = memo(function CommandPalette({
  open,
  onClose,
}: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Build element results from ELEMENTS array
  const elementResults = useMemo(
    (): PaletteResult[] =>
      ELEMENTS.map((el) => ({
        id: `e-${el.symbol}`,
        label: el.name,
        category: "Element" as const,
        to: `/element/${el.symbol}`,
        sublabel: `${el.symbol} · #${el.atomicNumber}`,
        icon: (
          <span className="font-mono text-xs font-bold text-blue-400 w-4 text-center">
            {el.symbol}
          </span>
        ),
      })),
    [],
  );

  const allResults = useMemo(
    () => [...PAGE_RESULTS, ...QUICK_REACTIONS, ...elementResults],
    [elementResults],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [...PAGE_RESULTS, ...QUICK_REACTIONS.slice(0, 4)];
    return allResults
      .filter(
        (r) =>
          r.label.toLowerCase().includes(q) ||
          (r.sublabel?.toLowerCase().includes(q) ?? false),
      )
      .slice(0, 8);
  }, [query, allResults]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleSelect = useCallback(
    (result: PaletteResult) => {
      onClose();
      navigate({ to: result.to as Parameters<typeof navigate>[0]["to"] });
    },
    [navigate, onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const result = filtered[activeIndex];
        if (result) handleSelect(result);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filtered, activeIndex, handleSelect, onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998]"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal — truly centered via translate(-50%,-50%) */}
          <motion.div
            key="cp-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[9999]"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(92vw, 480px)",
            }}
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* True liquid glass panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(48px) saturate(2)",
                WebkitBackdropFilter: "blur(48px) saturate(2)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.2), 0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Top-of-panel diagonal light reflection overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* Search input — rounded-full glass inner row */}
              <div className="relative z-10 p-4 sm:p-5">
                <div
                  className="cp-search-wrap flex items-center gap-3 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "9999px",
                    padding: "0 16px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <Search className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search elements, pages, reactions…"
                    className="cp-search-input flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-sm py-3"
                    data-ocid="command_palette.search_input"
                    aria-label="Search"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <kbd
                    className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-muted-foreground/50 text-xs"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Esc
                  </kbd>
                </div>
              </div>

              {/* Results */}
              <ul
                ref={listRef}
                aria-label="Search results"
                className="max-h-72 overflow-y-auto pb-2 px-2 space-y-0.5"
                style={{ WebkitOverflowScrolling: "touch" }}
                data-ocid="command_palette.results_list"
              >
                {filtered.length === 0 ? (
                  <li className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No results found
                  </li>
                ) : (
                  filtered.map((result, i) => (
                    <li
                      key={result.id}
                      aria-selected={i === activeIndex}
                      data-ocid={`command_palette.result.${i + 1}`}
                    >
                      <button
                        type="button"
                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-150"
                        style={{
                          background:
                            i === activeIndex
                              ? "rgba(255,255,255,0.1)"
                              : "transparent",
                          transform:
                            i === activeIndex ? "scale(1.02)" : "scale(1)",
                          boxShadow:
                            i === activeIndex
                              ? "0 2px 12px rgba(136,153,255,0.12)"
                              : "none",
                        }}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => handleSelect(result)}
                      >
                        <span className="shrink-0 w-6 h-6 flex items-center justify-center">
                          {result.icon ?? (
                            <Search className="w-4 h-4 text-muted-foreground" />
                          )}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium text-foreground truncate">
                            {result.label}
                          </span>
                          {result.sublabel && (
                            <span className="block text-xs text-muted-foreground truncate">
                              {result.sublabel}
                            </span>
                          )}
                        </span>
                        <span
                          className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            CATEGORY_COLORS[result.category]
                          }`}
                        >
                          {result.category}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>

              {/* Footer hint */}
              <div
                className="px-5 py-3 flex items-center gap-4 text-xs text-muted-foreground/50"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="flex items-center gap-1">
                  <kbd
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    ↑↓
                  </kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    ↵
                  </kbd>
                  open
                </span>
                <span className="flex items-center gap-1">
                  <kbd
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Esc
                  </kbd>
                  close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
