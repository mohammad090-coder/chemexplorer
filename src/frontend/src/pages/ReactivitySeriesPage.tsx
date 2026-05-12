import { useReactivitySeries } from "@/hooks/useChemistry";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Droplets,
  Flame,
  Info,
  Search,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

const REACTIVITY_COLORS: Record<string, string> = {
  "1": "from-red-500/60 to-rose-600/60",
  "2": "from-orange-500/60 to-red-500/60",
  "3": "from-amber-500/60 to-orange-500/60",
  "4": "from-yellow-500/60 to-amber-500/60",
  "5": "from-lime-500/60 to-yellow-500/60",
  "6": "from-green-500/60 to-lime-500/60",
  "7": "from-emerald-500/60 to-green-500/60",
  "8": "from-teal-500/60 to-emerald-500/60",
  "9": "from-cyan-500/60 to-teal-500/60",
  "10": "from-sky-500/60 to-cyan-500/60",
};

function getReactivityColor(rank: number): string {
  const key = String(Math.min(rank, 10));
  return REACTIVITY_COLORS[key] ?? "from-muted/40 to-muted/60";
}

function getReactivityLabel(rank: number): string {
  if (rank <= 2) return "Extremely Reactive";
  if (rank <= 4) return "Highly Reactive";
  if (rank <= 7) return "Moderately Reactive";
  if (rank <= 11) return "Low Reactivity";
  return "Very Unreactive";
}

interface MetalReaction {
  reactionType: string;
  partner: string;
  equation: string;
  observation: string;
}

interface FallbackMetal {
  symbol: string;
  name: string;
  rank: bigint;
  reactions: MetalReaction[];
  interestingFacts: string[];
}

const FALLBACK_METALS: FallbackMetal[] = [
  {
    symbol: "K",
    name: "Potassium",
    rank: 1n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "2K + 2H₂O → 2KOH + H₂↑",
        observation:
          "Violent reaction — molten metal skates across water, purple/lilac flame, may explode",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2K + 2HCl → 2KCl + H₂↑",
        observation: "Explosive — reacts far too violently to be safe",
      },
    ],
    interestingFacts: [
      "Reacts explosively with water",
      "Burns with lilac flame",
      "Stored under mineral oil",
    ],
  },
  {
    symbol: "Na",
    name: "Sodium",
    rank: 2n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "2Na + 2H₂O → 2NaOH + H₂↑",
        observation:
          "Vigorous fizzing — metal melts into a ball, yellow flame, may ignite hydrogen",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2Na + 2HCl → 2NaCl + H₂↑",
        observation: "Dangerously vigorous — hydrogen ignites immediately",
      },
    ],
    interestingFacts: [
      "Reacts vigorously with water",
      "Burns with bright yellow flame",
      "Essential for nerve signals",
    ],
  },
  {
    symbol: "Li",
    name: "Lithium",
    rank: 3n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "2Li + 2H₂O → 2LiOH + H₂↑",
        observation:
          "Steady fizzing — floats, crimson flame, less violent than Na/K",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2Li + 2HCl → 2LiCl + H₂↑",
        observation: "Vigorous bubbling, heat released",
      },
    ],
    interestingFacts: [
      "Lightest metal element",
      "Burns with crimson flame",
      "Used in batteries and medicine",
    ],
  },
  {
    symbol: "Ca",
    name: "Calcium",
    rank: 4n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "Ca + 2H₂O → Ca(OH)₂ + H₂↑",
        observation:
          "Steady bubbling — milky solution of calcium hydroxide forms",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Ca + 2HCl → CaCl₂ + H₂↑",
        observation: "Vigorous effervescence, solution warms up",
      },
    ],
    interestingFacts: [
      "Reacts steadily with water",
      "Burns with brick-red flame",
      "Most abundant metal in human body",
    ],
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    rank: 5n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "Mg + 2H₂O → Mg(OH)₂ + H₂↑",
        observation:
          "Very slow with cold water; rapid with steam, white Mg(OH)₂ precipitate",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Mg + 2HCl → MgCl₂ + H₂↑",
        observation:
          "Rapid bubbling — metal dissolves quickly, solution heats up",
      },
    ],
    interestingFacts: [
      "Burns with intense white light",
      "Reacts slowly with cold water",
      "Used in alloys for aircraft",
    ],
  },
  {
    symbol: "Al",
    name: "Aluminium",
    rank: 6n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "2Al + 6H₂O → 2Al(OH)₃ + 3H₂↑",
        observation:
          "Slow — protective oxide layer must be removed first; then steady reaction",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2Al + 6HCl → 2AlCl₃ + 3H₂↑",
        observation: "Moderate bubbling after oxide layer dissolves",
      },
    ],
    interestingFacts: [
      "Protected by oxide layer",
      "Most abundant metal in Earth's crust",
      "Thermite reaction with Fe₂O₃",
    ],
  },
  {
    symbol: "Zn",
    name: "Zinc",
    rank: 7n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "Zn + H₂O → ZnO + H₂↑",
        observation:
          "No reaction with cold water; reacts with steam at high temperature",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
        observation:
          "Moderate bubbling — zinc slowly dissolves, gas collected burns with pop",
      },
    ],
    interestingFacts: [
      "Used to galvanise steel",
      "Reacts with dilute acids",
      "Essential trace element for humans",
    ],
  },
  {
    symbol: "Fe",
    name: "Iron",
    rank: 8n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "3Fe + 4H₂O → Fe₃O₄ + 4H₂↑",
        observation:
          "Only with steam — forms black iron oxide; cold water causes rusting (slow oxidation)",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Fe + 2HCl → FeCl₂ + H₂↑",
        observation: "Slow bubbling — pale green FeCl₂ solution forms",
      },
    ],
    interestingFacts: [
      "Rusts in presence of water and oxygen",
      "Core of Earth is mostly iron",
      "Backbone of industrial civilisation",
    ],
  },
  {
    symbol: "Ni",
    name: "Nickel",
    rank: 9n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "Ni + H₂O → NiO + H₂↑",
        observation:
          "No reaction at room temperature; reacts very slowly with steam",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Ni + 2HCl → NiCl₂ + H₂↑",
        observation: "Slow reaction — green solution of nickel chloride forms",
      },
    ],
    interestingFacts: [
      "Slow to react with dilute acids",
      "Used in alloys and batteries",
      "Toxic in large quantities",
    ],
  },
  {
    symbol: "Sn",
    name: "Tin",
    rank: 10n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "Sn + 2H₂O → SnO₂ + 2H₂↑",
        observation:
          "No reaction with cold water; reacts very slowly with steam only",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Sn + 2HCl → SnCl₂ + H₂↑",
        observation: "Very slow bubbling — tin chloride forms in pale solution",
      },
    ],
    interestingFacts: [
      "Used in tin cans (steel coated)",
      "Alloys with copper to make bronze",
      "Very resistant to corrosion",
    ],
  },
  {
    symbol: "Pb",
    name: "Lead",
    rank: 11n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "No reaction",
        observation: "Lead does not react with water under normal conditions",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Pb + 2HCl → PbCl₂ + H₂↑",
        observation:
          "Slow — PbCl₂ is sparingly soluble, forms a protective layer that inhibits reaction",
      },
    ],
    interestingFacts: [
      "Dense and malleable metal",
      "Used in radiation shielding",
      "Highly toxic — phased out of paint/fuel",
    ],
  },
  {
    symbol: "H",
    name: "Hydrogen",
    rank: 12n,
    reactions: [
      {
        reactionType: "note",
        partner: "Position",
        equation: "Reference point in the series",
        observation:
          "Hydrogen separates metals that react with dilute acids from those that do not",
      },
    ],
    interestingFacts: [
      "Only non-metal in reactivity series",
      "Burns to form water",
      "Most abundant element in universe",
    ],
  },
  {
    symbol: "Cu",
    name: "Copper",
    rank: 13n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "No reaction",
        observation: "Copper does not react with water or steam",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "No reaction",
        observation:
          "Below hydrogen — does not displace H₂ from dilute acids; reacts with conc. HNO₃",
      },
    ],
    interestingFacts: [
      "Below hydrogen — doesn't react with dilute acids",
      "Forms blue solutions with sulfate",
      "Used in electrical wiring for 5000+ years",
    ],
  },
  {
    symbol: "Ag",
    name: "Silver",
    rank: 14n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "No reaction",
        observation: "Silver is completely unreactive with water",
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "No reaction",
        observation:
          "Does not react with dilute acids; attacked only by oxidising acids like conc. HNO₃",
      },
    ],
    interestingFacts: [
      "Best electrical conductor of all metals",
      "Tarnishes in sulfur compounds",
      "Antimicrobial properties",
    ],
  },
  {
    symbol: "Au",
    name: "Gold",
    rank: 15n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "No reaction",
        observation: "Gold is completely inert to water and most chemicals",
      },
      {
        reactionType: "with acid",
        partner: "Aqua Regia",
        equation: "Au + HNO₃ + 3HCl → AuCl₃ + NO + 2H₂O",
        observation:
          "Only dissolves in aqua regia (3:1 HCl:HNO₃) — the 'royal water'",
      },
    ],
    interestingFacts: [
      "Almost completely unreactive",
      "Dissolves only in aqua regia",
      "Has been prized for 7000+ years",
    ],
  },
  {
    symbol: "Pt",
    name: "Platinum",
    rank: 16n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "No reaction",
        observation: "Platinum shows no reaction with water or common acids",
      },
      {
        reactionType: "with acid",
        partner: "Aqua Regia",
        equation: "3Pt + 4HNO₃ + 18HCl → 3H₂PtCl₆ + 4NO + 8H₂O",
        observation:
          "Only dissolved by boiling aqua regia — extremely resistant to corrosion",
      },
    ],
    interestingFacts: [
      "Extremely resistant to corrosion",
      "Used as a catalyst in catalytic converters",
      "More rare than gold",
    ],
  },
];

type FilterLevel = "all" | "very-high" | "high" | "moderate" | "low";

const FILTER_OPTIONS: { key: FilterLevel; label: string }[] = [
  { key: "all", label: "All" },
  { key: "very-high", label: "Extremely Reactive" },
  { key: "high", label: "Highly Reactive" },
  { key: "moderate", label: "Moderate" },
  { key: "low", label: "Unreactive" },
];

function matchesFilter(rank: number, filter: FilterLevel): boolean {
  if (filter === "all") return true;
  if (filter === "very-high") return rank <= 2;
  if (filter === "high") return rank >= 3 && rank <= 4;
  if (filter === "moderate") return rank >= 5 && rank <= 11;
  if (filter === "low") return rank >= 12;
  return true;
}

export function ReactivitySeriesPage() {
  const { data: seriesData, isLoading } = useReactivitySeries();
  const metals = (
    seriesData && seriesData.length > 0 ? seriesData : FALLBACK_METALS
  )
    .slice()
    .sort((a, b) => Number(a.rank) - Number(b.rank));

  const [expandedSymbol, setExpandedSymbol] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterLevel>("all");

  const filteredMetals = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return metals.filter((m) => {
      const rank = Number(m.rank);
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.symbol.toLowerCase().includes(q) ||
        getReactivityLabel(rank).toLowerCase().includes(q);
      return matchSearch && matchesFilter(rank, activeFilter);
    });
  }, [metals, searchQuery, activeFilter]);

  return (
    <div className="min-h-screen px-4 py-10" data-ocid="reactivity.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4">
          <Flame className="w-4 h-4 text-orange-400" />
          <span>Ranked most reactive → least reactive</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
          Reactivity Series
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          The reactivity series ranks metals by how vigorously they react with
          oxygen, water, and acids. More reactive metals displace less reactive
          ones from their compounds.
        </p>
      </motion.div>

      {/* Search + Filter bar */}
      <div
        className="max-w-2xl mx-auto mb-6 space-y-3"
        data-ocid="reactivity.filters"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or symbol…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass rounded-xl pl-10 pr-10 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground focus:border-accent/50 border border-border/30"
            data-ocid="reactivity.search_input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
              data-ocid="reactivity.clear_search_button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Reactivity level filter pills */}
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setActiveFilter(opt.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                activeFilter === opt.key
                  ? "bg-amber-500/20 border-amber-400/40 text-amber-300"
                  : "glass text-muted-foreground hover:text-foreground",
              )}
              data-ocid={`reactivity.filter.${opt.key}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-2xl mx-auto mb-3 text-xs text-muted-foreground">
        {filteredMetals.length} of {metals.length} metals shown
      </div>

      {/* Reactivity List */}
      <div className="max-w-2xl mx-auto space-y-2" data-ocid="reactivity.list">
        {isLoading ? (
          Array.from({ length: 8 }, (_, i) => (
            <div
              key={`skeleton-${i + 1}`}
              className="glass rounded-2xl h-16 animate-pulse"
              data-ocid="reactivity.loading_state"
            />
          ))
        ) : filteredMetals.length === 0 ? (
          <div
            className="glass rounded-2xl p-10 text-center text-muted-foreground"
            data-ocid="reactivity.empty_state"
          >
            <Flame className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p>No metals match your search.</p>
          </div>
        ) : (
          filteredMetals.map((metal, index) => {
            const rank = Number(metal.rank);
            const isExpanded = expandedSymbol === metal.symbol;
            const colorClass = getReactivityColor(rank);

            return (
              <motion.div
                key={metal.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: Math.min(index * 0.03, 0.4),
                  duration: 0.3,
                }}
                className="glass-reactivity rounded-2xl overflow-hidden"
                data-ocid={`reactivity.item.${index + 1}`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSymbol(isExpanded ? null : metal.symbol)
                  }
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-card/20 transition-colors"
                  data-ocid={`reactivity.toggle.${index + 1}`}
                  aria-expanded={isExpanded}
                >
                  {/* Rank badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">
                      {rank}
                    </span>
                  </div>

                  {/* Element symbol tile */}
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center font-display font-bold text-lg text-foreground shadow-md",
                      colorClass,
                    )}
                  >
                    {metal.symbol}
                  </div>

                  {/* Name + reactivity label */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground">
                      {metal.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getReactivityLabel(rank)}
                    </div>
                  </div>

                  {/* Reactivity bar */}
                  <div className="hidden sm:flex flex-col items-end gap-1 w-32">
                    <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r",
                          colorClass,
                        )}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.max(5, 100 - (rank / metals.length) * 95)}%`,
                        }}
                        transition={{
                          delay: Math.min(index * 0.03, 0.4) + 0.2,
                          duration: 0.5,
                        }}
                      />
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {/* Expanded section */}
                <ExpandSection isOpen={isExpanded}>
                  <div className="px-5 pb-5 pt-1 border-t border-border/20">
                    {/* Reactions with water + acid */}
                    {metal.reactions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Chemical Reactions
                        </div>
                        {metal.reactions.map((rxn) => (
                          <div
                            key={`${rxn.reactionType}-${rxn.partner}`}
                            className="glass rounded-xl p-3 space-y-1"
                          >
                            <div className="flex items-center gap-1.5">
                              {rxn.reactionType.includes("water") ? (
                                <Droplets className="w-3 h-3 text-sky-400 flex-shrink-0" />
                              ) : rxn.reactionType.includes("acid") ? (
                                <Zap className="w-3 h-3 text-amber-400 flex-shrink-0" />
                              ) : (
                                <Info className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              )}
                              <span className="text-xs text-muted-foreground font-medium capitalize">
                                {rxn.reactionType}{" "}
                                {rxn.partner !== rxn.reactionType
                                  ? `(${rxn.partner})`
                                  : ""}
                              </span>
                            </div>
                            <div className="font-mono text-sm text-foreground/90 bg-background/30 px-2 py-1 rounded-lg">
                              {rxn.equation}
                            </div>
                            <div className="text-xs text-muted-foreground italic leading-relaxed">
                              {rxn.observation}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key Facts */}
                    {metal.interestingFacts.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Key Facts
                        </div>
                        {metal.interestingFacts.map((fact) => (
                          <div
                            key={fact}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <span className="text-orange-400 mt-0.5 flex-shrink-0">
                              •
                            </span>
                            {fact}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ExpandSection>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Displacement rule callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto mt-10 glass rounded-2xl p-6"
        data-ocid="reactivity.displacement_rule"
      >
        <h3 className="font-display text-lg font-bold mb-2 text-amber-300">
          ⚡ Displacement Rule
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          A more reactive metal will displace a less reactive metal from its
          salt solution. For example, zinc displaces copper from copper sulfate
          solution:{" "}
          <span className="font-mono text-foreground/90 bg-card/50 px-1.5 py-0.5 rounded">
            Zn + CuSO₄ → ZnSO₄ + Cu
          </span>
        </p>
      </motion.div>
    </div>
  );
}

function ExpandSection({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
