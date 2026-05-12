import { useFilteredElements } from "@/hooks/useElements";
import { ELEMENTS } from "@/lib/elements-data";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
  type ElementCategory,
} from "@/types/element";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export const Route = createLazyFileRoute("/periodic-table")({
  component: PeriodicTablePage,
});

// Correct periodic table layout
// [period][group] -> atomic number, 0 = empty
const GROUPS = Array.from({ length: 18 }, (_, i) => i + 1);
const PERIODS = Array.from({ length: 7 }, (_, i) => i + 1);

// Returns element at [period, group] or null
function getElementAtPosition(period: number, group: number) {
  // Lanthanides period 6, groups N/A (shown below)
  // Actinides period 7, groups N/A
  return (
    ELEMENTS.find((e) => {
      if (e.category === "lanthanide" || e.category === "actinide")
        return false;
      return e.period === period && e.group === group;
    }) ?? null
  );
}

function getLanthanides() {
  return ELEMENTS.filter((e) => e.category === "lanthanide").sort(
    (a, b) => a.atomicNumber - b.atomicNumber,
  );
}

function getActinides() {
  return ELEMENTS.filter((e) => e.category === "actinide").sort(
    (a, b) => a.atomicNumber - b.atomicNumber,
  );
}

const CATEGORIES: Array<{ key: ElementCategory | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "alkali-metal", label: "Alkali" },
  { key: "alkaline-earth-metal", label: "Alkaline Earth" },
  { key: "transition-metal", label: "Transition" },
  { key: "post-transition-metal", label: "Post-Transition" },
  { key: "metalloid", label: "Metalloid" },
  { key: "nonmetal", label: "Nonmetal" },
  { key: "halogen", label: "Halogen" },
  { key: "noble-gas", label: "Noble Gas" },
  { key: "lanthanide", label: "Lanthanide" },
  { key: "actinide", label: "Actinide" },
];

function ElementTile({
  atomicNumber,
  symbol,
  name,
  category,
  isFiltered,
  onClick,
  index,
}: {
  atomicNumber: number;
  symbol: string;
  name: string;
  category: ElementCategory;
  isFiltered: boolean;
  onClick: () => void;
  index: number;
}) {
  const gradClass = CATEGORY_GRADIENT[category];
  const textClass = CATEGORY_TEXT[category];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isFiltered ? 1 : 0.2, scale: 1 }}
      transition={{ delay: Math.min(index * 0.003, 0.3), duration: 0.2 }}
      whileHover={isFiltered ? { y: -3, scale: 1.08, zIndex: 50 } : {}}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={!isFiltered}
      className={cn(
        "relative rounded-lg p-1.5 text-left overflow-hidden transition-all duration-200 group",
        "border border-border/20 backdrop-blur-sm",
        "w-full aspect-square flex flex-col justify-between",
        gradClass,
        isFiltered
          ? "cursor-pointer hover:shadow-lg hover:border-white/30"
          : "cursor-default",
      )}
      data-ocid={`periodic_table.element.${atomicNumber}`}
      aria-label={`${name} (${symbol})`}
    >
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors rounded-lg" />
      <div className="relative z-10">
        <div className="text-[8px] text-foreground/60 leading-none">
          {atomicNumber}
        </div>
      </div>
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <span className="font-display font-bold text-foreground leading-none text-base">
          {symbol}
        </span>
      </div>
      <div className="relative z-10">
        <div className={cn("text-[7px] truncate leading-none", textClass)}>
          {name}
        </div>
      </div>
    </motion.button>
  );
}

function EmptyCell() {
  return <div className="w-full aspect-square" />;
}

function PeriodicTablePage() {
  const navigate = useNavigate();
  const { searchQuery, categoryFilter, setSearchQuery, setCategoryFilter } =
    useChemStore();
  const filteredElements = useFilteredElements();
  const filteredSet = new Set(filteredElements.map((e) => e.symbol));
  const [showFilters, setShowFilters] = useState(false);

  const lanthanides = getLanthanides();
  const actinides = getActinides();

  return (
    <div className="min-h-screen px-2 md:px-4 py-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Periodic Table
          </h1>
          <p className="text-muted-foreground">
            Click any element to explore its properties
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, symbol, or number…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass rounded-xl pl-10 pr-10 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground focus:border-accent/50 border border-border/30"
                data-ocid="periodic_table.search_input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-ocid="periodic_table.clear_search_button"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "glass px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all",
                showFilters ? "bg-accent/20 border-accent/40 text-accent" : "",
              )}
              data-ocid="periodic_table.filter_toggle"
            >
              Filter
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  showFilters ? "rotate-180" : "",
                )}
              />
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden"
            >
              <div
                className="flex flex-wrap gap-2 justify-center"
                data-ocid="periodic_table.category_filters"
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
                    data-ocid={`periodic_table.filter.${cat.key}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 justify-center mb-6 text-xs">
          {(Object.keys(CATEGORY_LABELS) as ElementCategory[])
            .filter((c) => c !== "unknown")
            .map((cat) => (
              <div
                key={cat}
                className={cn(
                  "flex items-center gap-1.5 glass px-2.5 py-1 rounded-full",
                )}
              >
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full bg-gradient-to-br",
                    CATEGORY_GRADIENT[cat],
                  )}
                />
                <span className="text-muted-foreground">
                  {CATEGORY_LABELS[cat]}
                </span>
              </div>
            ))}
        </div>

        {/* Grid wrapper for scroll */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[700px]">
            {/* Group numbers */}
            <div className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5">
              <div />
              {GROUPS.map((g) => (
                <div
                  key={g}
                  className="text-center text-[10px] text-muted-foreground/60 leading-5"
                >
                  {g}
                </div>
              ))}
            </div>

            {/* Main table */}
            {PERIODS.map((period) => (
              <div
                key={period}
                className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5"
              >
                <div className="flex items-center justify-center text-[10px] text-muted-foreground/60">
                  {period}
                </div>
                {GROUPS.map((group) => {
                  const el = getElementAtPosition(period, group);
                  // Placeholder for lanthanide/actinide series
                  if (!el) {
                    if (
                      (period === 6 && group === 3) ||
                      (period === 7 && group === 3)
                    ) {
                      return (
                        <div
                          key={group}
                          className="w-full aspect-square glass rounded-lg flex items-center justify-center"
                        >
                          <span className="text-[7px] text-muted-foreground">
                            {period === 6 ? "La-Lu" : "Ac-Lr"}
                          </span>
                        </div>
                      );
                    }
                    return <EmptyCell key={group} />;
                  }
                  return (
                    <ElementTile
                      key={el.symbol}
                      atomicNumber={el.atomicNumber}
                      symbol={el.symbol}
                      name={el.name}
                      category={el.category}
                      isFiltered={filteredSet.has(el.symbol)}
                      onClick={() =>
                        navigate({
                          to: "/element/$symbol",
                          params: { symbol: el.symbol },
                        })
                      }
                      index={el.atomicNumber}
                    />
                  );
                })}
              </div>
            ))}

            {/* Gap */}
            <div className="h-4" />

            {/* Lanthanides */}
            <div className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5">
              <div className="flex items-center justify-center text-[9px] text-muted-foreground/60">
                6*
              </div>
              <div className="col-span-2" />
              {lanthanides.map((el) => (
                <ElementTile
                  key={el.symbol}
                  atomicNumber={el.atomicNumber}
                  symbol={el.symbol}
                  name={el.name}
                  category={el.category}
                  isFiltered={filteredSet.has(el.symbol)}
                  onClick={() =>
                    navigate({
                      to: "/element/$symbol",
                      params: { symbol: el.symbol },
                    })
                  }
                  index={el.atomicNumber}
                />
              ))}
              <div className="col-span-1" />
            </div>

            {/* Actinides */}
            <div className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5">
              <div className="flex items-center justify-center text-[9px] text-muted-foreground/60">
                7*
              </div>
              <div className="col-span-2" />
              {actinides.map((el) => (
                <ElementTile
                  key={el.symbol}
                  atomicNumber={el.atomicNumber}
                  symbol={el.symbol}
                  name={el.name}
                  category={el.category}
                  isFiltered={filteredSet.has(el.symbol)}
                  onClick={() =>
                    navigate({
                      to: "/element/$symbol",
                      params: { symbol: el.symbol },
                    })
                  }
                  index={el.atomicNumber}
                />
              ))}
              <div className="col-span-1" />
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-muted-foreground">
          {filteredElements.length} of {ELEMENTS.length} elements shown
        </div>
      </div>
    </div>
  );
}
