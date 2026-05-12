import { useFilteredElements } from "@/hooks/useElements";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
  type ElementCategory,
} from "@/types/element";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/search")({
  component: SearchPage,
});

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

function SearchPage() {
  const navigate = useNavigate();
  const { searchQuery, categoryFilter, setSearchQuery, setCategoryFilter } =
    useChemStore();
  const results = useFilteredElements();

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

      {/* Search bar */}
      <div className="relative max-w-xl mx-auto mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, symbol, or atomic number…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full glass rounded-2xl pl-12 pr-12 py-4 text-base bg-transparent outline-none placeholder:text-muted-foreground border border-border/30 focus:border-accent/50 transition-colors"
          data-ocid="search.search_input"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            data-ocid="search.clear_button"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
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

      {/* Results */}
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
            <motion.button
              type="button"
              key={el.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.02, 0.4), duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                navigate({
                  to: "/element/$symbol",
                  params: { symbol: el.symbol },
                })
              }
              className={cn(
                "relative glass rounded-2xl p-4 text-left overflow-hidden group",
                CATEGORY_GRADIENT[el.category],
              )}
              data-ocid={`search.result.${i + 1}`}
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
          ))}
        </div>
      )}
    </div>
  );
}
