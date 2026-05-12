import { cn } from "@/lib/utils";
import type { ChemicalReaction } from "@/types/chemistry";
import { memo, useState } from "react";
import { useReactions } from "../../hooks/useChemistry";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const AUTO_KEYFRAMES = `
@keyframes card-enter {
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

const CATEGORIES = [
  "All",
  "Inorganic",
  "Organic",
  "Named",
  "Industrial",
] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<Category, string> = {
  All: "text-foreground",
  Inorganic: "text-cyan-400",
  Organic: "text-emerald-400",
  Named: "text-purple-400",
  Industrial: "text-orange-400",
};

const TYPE_BADGE_COLORS: Record<string, string> = {
  inorganic: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  organic: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  named: "bg-purple-500/15 text-purple-300 border-purple-400/30",
  industrial: "bg-orange-500/15 text-orange-300 border-orange-400/30",
  redox: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30",
  acidbase: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  precipitation: "bg-pink-500/15 text-pink-300 border-pink-400/30",
  thermal: "bg-red-500/15 text-red-300 border-red-400/30",
};

function getTypeBadgeClass(type: string): string {
  const lower = type.toLowerCase();
  for (const [key, cls] of Object.entries(TYPE_BADGE_COLORS)) {
    if (lower.includes(key)) return cls;
  }
  return "bg-card/30 text-muted-foreground border-border/30";
}

// ─── Reaction Card ────────────────────────────────────────────────────────────

const ReactionCard = memo(function ReactionCard({
  reaction,
  index,
}: {
  reaction: ChemicalReaction;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 border border-border/20"
      style={{
        animation: `card-enter 0.4s ease-out ${index * 0.08}s both`,
      }}
      data-ocid={`virtual_lab.auto.reaction.item.${index + 1}`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-card/20 transition-colors"
        data-ocid={`virtual_lab.auto.reaction.expand.${index + 1}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-sm text-foreground leading-tight">
              {reaction.name}
            </span>
            <span
              className={cn(
                "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                getTypeBadgeClass(reaction.reactionType),
              )}
            >
              {reaction.reactionType}
            </span>
          </div>
          <div className="font-mono text-xs text-primary/90 bg-primary/5 px-2 py-1 rounded truncate">
            {reaction.balancedEquation}
          </div>
        </div>
        <span
          className={cn(
            "text-muted-foreground transition-transform duration-200 mt-0.5 flex-shrink-0",
            expanded ? "rotate-180" : "",
          )}
        >
          ▼
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-border/15 pt-3">
          <div className="font-mono text-sm text-foreground bg-primary/8 px-3 py-2 rounded-lg break-all">
            {reaction.balancedEquation}
          </div>

          {reaction.energyChange && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Energy:
              </span>
              <span className="text-xs font-medium text-foreground">
                {reaction.energyChange}
              </span>
            </div>
          )}

          <p className="text-sm text-foreground/75 leading-relaxed">
            {reaction.description}
          </p>

          {reaction.observations.length > 0 && (
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                Observations
              </div>
              <ul className="space-y-1">
                {reaction.observations.map((obs) => (
                  <li
                    key={obs}
                    className="text-xs text-foreground/70 flex gap-2"
                  >
                    <span className="text-primary/60 flex-shrink-0">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

// ─── AutoReactionTab ──────────────────────────────────────────────────────────

export const AutoReactionTab = memo(function AutoReactionTab() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<ChemicalReaction[]>([]);

  const { data: allReactions, isLoading } = useReactions();

  function runSearch() {
    if (!allReactions) return;
    setSearched(true);

    let filtered = allReactions;

    // Category filter
    if (activeCategory !== "All") {
      const catLower = activeCategory.toLowerCase();
      filtered = filtered.filter((r) =>
        r.reactionType.toLowerCase().includes(catLower),
      );
    }

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.balancedEquation.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.reactants.some(
            (rc) =>
              rc.name.toLowerCase().includes(q) ||
              rc.symbol.toLowerCase().includes(q),
          ) ||
          r.products.some(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.symbol.toLowerCase().includes(q),
          ),
      );
    }

    setResults(filtered.slice(0, 5));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <div className="space-y-5" data-ocid="virtual_lab.auto.panel">
      <style>{AUTO_KEYFRAMES}</style>

      {/* Search input */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter compound or element (e.g. sodium, ethanol, HCl)"
            className="w-full glass rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 bg-transparent outline-none focus:ring-2 focus:ring-primary/40 border border-border/30 transition-all"
            data-ocid="virtual_lab.auto.search_input"
          />
          <button
            type="button"
            onClick={runSearch}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/20 hover:bg-primary/35 text-primary rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50"
            data-ocid="virtual_lab.auto.run_button"
          >
            ⚗️ Run
          </button>
        </div>

        {/* Category pills */}
        <div
          className="flex flex-wrap gap-2"
          data-ocid="virtual_lab.auto.category_filter"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setSearched(false);
              }}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                activeCategory === cat
                  ? `${CATEGORY_COLORS[cat]} bg-card/40 border-current/40`
                  : "text-muted-foreground glass border-border/20 hover:text-foreground",
              )}
              data-ocid={`virtual_lab.auto.category_${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="flex items-center justify-center gap-3 py-8 text-muted-foreground"
          data-ocid="virtual_lab.auto.loading_state"
        >
          <div className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
          <span className="text-sm">Loading reaction database...</span>
        </div>
      )}

      {/* Results */}
      {!isLoading && searched && (
        <div className="space-y-3">
          {results.length > 0 ? (
            <>
              <div className="text-xs text-muted-foreground">
                {results.length} reaction{results.length !== 1 ? "s" : ""} found
              </div>
              {results.map((r, i) => (
                <ReactionCard key={r.id} reaction={r} index={i} />
              ))}
            </>
          ) : (
            <div
              className="glass rounded-xl p-6 text-center border border-border/20"
              data-ocid="virtual_lab.auto.empty_state"
            >
              <div className="text-3xl mb-3">🔍</div>
              <div className="font-semibold text-foreground mb-1">
                No reaction data found
              </div>
              <p className="text-sm text-muted-foreground">
                Try:{" "}
                <span className="text-primary/80 font-mono">
                  &quot;sodium&quot;, &quot;ethanol&quot;, &quot;HCl&quot;
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Prompt state */}
      {!isLoading && !searched && (
        <div className="glass rounded-xl p-6 text-center border border-border/15">
          <div className="text-4xl mb-3">⚗️</div>
          <div className="font-semibold text-foreground mb-1">
            Search the Reaction Database
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter a compound name, element, or formula above and press{" "}
            <strong className="text-foreground">Run Reaction</strong> to find
            matching reactions with equations, types, and explanations.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {["sodium", "ethanol", "HCl + NaOH", "copper"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setQuery(ex);
                  setSearched(false);
                }}
                className="glass px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground font-mono transition-all border border-border/20"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
