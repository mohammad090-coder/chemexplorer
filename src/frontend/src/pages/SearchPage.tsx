import { ElementOverlay } from "@/components/ElementOverlay";
import { useFilteredElements } from "@/hooks/useElements";
import { ELEMENTS } from "@/lib/elements-data";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
  type Element,
  type ElementCategory,
} from "@/types/element";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const CATEGORIES: Array<{ key: ElementCategory | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "alkali-metal", label: "Alkali Metals" },
  { key: "alkaline-earth-metal", label: "Alkaline Earth" },
  { key: "transition-metal", label: "Transition Metals" },
  { key: "post-transition-metal", label: "Post-Transition" },
  { key: "metalloid", label: "Metalloids" },
  { key: "nonmetal", label: "Nonmetals" },
  { key: "halogen", label: "Halogens" },
  { key: "noble-gas", label: "Noble Gases" },
  { key: "lanthanide", label: "Lanthanides" },
  { key: "actinide", label: "Actinides" },
];

// ── Memoized result card ──────────────────────────────────────────────────────
const ResultCard = memo(function ResultCard({
  el,
  index,
  onClick,
}: {
  el: Element;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.02, 0.4), duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "relative glass rounded-2xl p-4 text-left overflow-hidden group bg-gradient-to-br",
        CATEGORY_GRADIENT[el.category],
      )}
      data-ocid={`search.result.${index + 1}`}
    >
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors rounded-2xl" />
      <div className="relative z-10">
        <div className="text-xs text-foreground/60 mb-1">
          #{el.atomicNumber}
        </div>
        <div className="font-display text-3xl font-bold text-foreground mb-0.5">
          {el.symbol}
        </div>
        <div className="text-sm font-medium text-foreground/90 truncate">
          {el.name}
        </div>
        <div className={cn("text-xs mt-1", CATEGORY_TEXT[el.category])}>
          {CATEGORY_LABELS[el.category]}
        </div>
      </div>
    </motion.button>
  );
});

export function SearchPage() {
  const { searchQuery, categoryFilter, setSearchQuery, setCategoryFilter } =
    useChemStore();
  const results = useFilteredElements();

  // ── Overlay state ────────────────────────────────────────────────────────
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // ── Debounced search ─────────────────────────────────────────────────────
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchLocal, setSearchLocal] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Autocomplete suggestions (up to 6, based on current input)
  const suggestions = useMemo(() => {
    const q = searchLocal.trim().toLowerCase();
    if (!q) return [];
    return ELEMENTS.filter(
      (el) =>
        el.name.toLowerCase().startsWith(q) ||
        el.symbol.toLowerCase().startsWith(q) ||
        String(el.atomicNumber) === q,
    ).slice(0, 6);
  }, [searchLocal]);

  // Click-outside closes suggestions
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchLocal(val);
      setShowSuggestions(true);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setSearchQuery(val), 300);
    },
    [setSearchQuery],
  );

  const clearSearch = useCallback(() => {
    setSearchLocal("");
    setSearchQuery("");
    setShowSuggestions(false);
  }, [setSearchQuery]);

  // ── Click / navigate handlers ────────────────────────────────────────────
  const handleElementClick = useCallback((el: Element) => {
    setSelectedElement(el);
    setOverlayOpen(true);
  }, []);

  const handleClose = useCallback(() => setOverlayOpen(false), []);

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    setSelectedElement((current) => {
      if (!current) return current;
      const targetNum =
        direction === "next"
          ? current.atomicNumber + 1
          : current.atomicNumber - 1;
      return ELEMENTS.find((e) => e.atomicNumber === targetNum) ?? current;
    });
  }, []);

  // ── Memoized click handlers per result ──────────────────────────────────
  const clickHandlers = useMemo(
    () => results.map((el) => () => handleElementClick(el)),
    [results, handleElementClick],
  );

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="font-display text-4xl font-bold mb-2">
          Search Elements
        </h1>
        <p className="text-muted-foreground">
          Find any of the 118 elements instantly
        </p>
      </motion.div>

      {/* Search bar with autocomplete */}
      <div className="relative max-w-xl mx-auto mb-6" ref={searchWrapperRef}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, symbol, or atomic number…"
          value={searchLocal}
          onChange={handleSearch}
          onFocus={() => searchLocal.trim() && setShowSuggestions(true)}
          className="w-full glass rounded-2xl pl-12 pr-12 py-4 text-base bg-transparent outline-none placeholder:text-muted-foreground border border-border/30 focus:border-accent/50 transition-colors"
          data-ocid="search.search_input"
        />
        {searchLocal && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            data-ocid="search.clear_button"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Autocomplete suggestions dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 9999,
                marginTop: "8px",
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                padding: "8px 0",
                overflow: "hidden",
              }}
              data-ocid="search.suggestions_dropdown"
            >
              {suggestions.map((el) => (
                <button
                  key={el.symbol}
                  type="button"
                  onMouseDown={() => {
                    setSearchLocal(el.name);
                    setSearchQuery(el.name);
                    setShowSuggestions(false);
                    handleElementClick(el);
                  }}
                  className="w-full flex items-center gap-3 text-left transition-colors duration-150"
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                  }}
                  data-ocid={`search.suggestion.${el.atomicNumber}`}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0"
                    style={{
                      background: `${el.colorHex}22`,
                      color: el.colorHex,
                      border: `1px solid ${el.colorHex}44`,
                    }}
                  >
                    {el.symbol}
                  </span>
                  <span className="flex-1 text-sm">{el.name}</span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "rgba(148,163,184,0.7)" }}
                  >
                    #{el.atomicNumber}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2 justify-center mb-8"
        data-ocid="search.category_filters"
      >
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.key}
            onClick={() => setCategoryFilter(cat.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              categoryFilter === cat.key
                ? "bg-accent text-accent-foreground shadow-md"
                : "glass text-muted-foreground hover:text-foreground",
            )}
            data-ocid={`search.filter.${cat.key}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {results.length} element{results.length !== 1 ? "s" : ""} found
      </div>

      {results.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 glass rounded-3xl"
          data-ocid="search.empty_state"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-display text-xl font-bold mb-2">
            No elements found
          </h3>
          <p className="text-muted-foreground">
            Try a different search term or clear filters.
          </p>
        </motion.div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          data-ocid="search.results_list"
        >
          {results.map((el, i) => (
            <ResultCard
              key={el.symbol}
              el={el}
              index={i}
              onClick={clickHandlers[i]}
            />
          ))}
        </div>
      )}

      {/* Element Overlay */}
      <ElementOverlay
        element={selectedElement}
        isOpen={overlayOpen}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
