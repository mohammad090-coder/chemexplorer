import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, S as Search, X, h as cn, g as ChevronDown, Z as Zap } from "./index-DyyHqAHL.js";
import { u as useReactivitySeries } from "./useChemistry-LgPqHx3p.js";
import { C as ChevronUp } from "./chevron-up-B48SwRlR.js";
import { I as Info } from "./info-BRZoTdGs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode);
const REACTIVITY_COLORS = {
  "1": "from-red-500/60 to-rose-600/60",
  "2": "from-orange-500/60 to-red-500/60",
  "3": "from-amber-500/60 to-orange-500/60",
  "4": "from-yellow-500/60 to-amber-500/60",
  "5": "from-lime-500/60 to-yellow-500/60",
  "6": "from-green-500/60 to-lime-500/60",
  "7": "from-emerald-500/60 to-green-500/60",
  "8": "from-teal-500/60 to-emerald-500/60",
  "9": "from-cyan-500/60 to-teal-500/60",
  "10": "from-sky-500/60 to-cyan-500/60"
};
function getReactivityColor(rank) {
  const key = String(Math.min(rank, 10));
  return REACTIVITY_COLORS[key] ?? "from-muted/40 to-muted/60";
}
function getReactivityLabel(rank) {
  if (rank <= 2) return "Extremely Reactive";
  if (rank <= 4) return "Highly Reactive";
  if (rank <= 7) return "Moderately Reactive";
  if (rank <= 11) return "Low Reactivity";
  return "Very Unreactive";
}
const FALLBACK_METALS = [
  {
    symbol: "K",
    name: "Potassium",
    rank: 1n,
    reactions: [
      {
        reactionType: "with water",
        partner: "Water",
        equation: "2K + 2H₂O → 2KOH + H₂↑",
        observation: "Violent reaction — molten metal skates across water, purple/lilac flame, may explode"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2K + 2HCl → 2KCl + H₂↑",
        observation: "Explosive — reacts far too violently to be safe"
      }
    ],
    interestingFacts: [
      "Reacts explosively with water",
      "Burns with lilac flame",
      "Stored under mineral oil"
    ]
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
        observation: "Vigorous fizzing — metal melts into a ball, yellow flame, may ignite hydrogen"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2Na + 2HCl → 2NaCl + H₂↑",
        observation: "Dangerously vigorous — hydrogen ignites immediately"
      }
    ],
    interestingFacts: [
      "Reacts vigorously with water",
      "Burns with bright yellow flame",
      "Essential for nerve signals"
    ]
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
        observation: "Steady fizzing — floats, crimson flame, less violent than Na/K"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2Li + 2HCl → 2LiCl + H₂↑",
        observation: "Vigorous bubbling, heat released"
      }
    ],
    interestingFacts: [
      "Lightest metal element",
      "Burns with crimson flame",
      "Used in batteries and medicine"
    ]
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
        observation: "Steady bubbling — milky solution of calcium hydroxide forms"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Ca + 2HCl → CaCl₂ + H₂↑",
        observation: "Vigorous effervescence, solution warms up"
      }
    ],
    interestingFacts: [
      "Reacts steadily with water",
      "Burns with brick-red flame",
      "Most abundant metal in human body"
    ]
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
        observation: "Very slow with cold water; rapid with steam, white Mg(OH)₂ precipitate"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Mg + 2HCl → MgCl₂ + H₂↑",
        observation: "Rapid bubbling — metal dissolves quickly, solution heats up"
      }
    ],
    interestingFacts: [
      "Burns with intense white light",
      "Reacts slowly with cold water",
      "Used in alloys for aircraft"
    ]
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
        observation: "Slow — protective oxide layer must be removed first; then steady reaction"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "2Al + 6HCl → 2AlCl₃ + 3H₂↑",
        observation: "Moderate bubbling after oxide layer dissolves"
      }
    ],
    interestingFacts: [
      "Protected by oxide layer",
      "Most abundant metal in Earth's crust",
      "Thermite reaction with Fe₂O₃"
    ]
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
        observation: "No reaction with cold water; reacts with steam at high temperature"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
        observation: "Moderate bubbling — zinc slowly dissolves, gas collected burns with pop"
      }
    ],
    interestingFacts: [
      "Used to galvanise steel",
      "Reacts with dilute acids",
      "Essential trace element for humans"
    ]
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
        observation: "Only with steam — forms black iron oxide; cold water causes rusting (slow oxidation)"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Fe + 2HCl → FeCl₂ + H₂↑",
        observation: "Slow bubbling — pale green FeCl₂ solution forms"
      }
    ],
    interestingFacts: [
      "Rusts in presence of water and oxygen",
      "Core of Earth is mostly iron",
      "Backbone of industrial civilisation"
    ]
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
        observation: "No reaction at room temperature; reacts very slowly with steam"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Ni + 2HCl → NiCl₂ + H₂↑",
        observation: "Slow reaction — green solution of nickel chloride forms"
      }
    ],
    interestingFacts: [
      "Slow to react with dilute acids",
      "Used in alloys and batteries",
      "Toxic in large quantities"
    ]
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
        observation: "No reaction with cold water; reacts very slowly with steam only"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Sn + 2HCl → SnCl₂ + H₂↑",
        observation: "Very slow bubbling — tin chloride forms in pale solution"
      }
    ],
    interestingFacts: [
      "Used in tin cans (steel coated)",
      "Alloys with copper to make bronze",
      "Very resistant to corrosion"
    ]
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
        observation: "Lead does not react with water under normal conditions"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "Pb + 2HCl → PbCl₂ + H₂↑",
        observation: "Slow — PbCl₂ is sparingly soluble, forms a protective layer that inhibits reaction"
      }
    ],
    interestingFacts: [
      "Dense and malleable metal",
      "Used in radiation shielding",
      "Highly toxic — phased out of paint/fuel"
    ]
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
        observation: "Hydrogen separates metals that react with dilute acids from those that do not"
      }
    ],
    interestingFacts: [
      "Only non-metal in reactivity series",
      "Burns to form water",
      "Most abundant element in universe"
    ]
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
        observation: "Copper does not react with water or steam"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "No reaction",
        observation: "Below hydrogen — does not displace H₂ from dilute acids; reacts with conc. HNO₃"
      }
    ],
    interestingFacts: [
      "Below hydrogen — doesn't react with dilute acids",
      "Forms blue solutions with sulfate",
      "Used in electrical wiring for 5000+ years"
    ]
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
        observation: "Silver is completely unreactive with water"
      },
      {
        reactionType: "with acid",
        partner: "HCl",
        equation: "No reaction",
        observation: "Does not react with dilute acids; attacked only by oxidising acids like conc. HNO₃"
      }
    ],
    interestingFacts: [
      "Best electrical conductor of all metals",
      "Tarnishes in sulfur compounds",
      "Antimicrobial properties"
    ]
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
        observation: "Gold is completely inert to water and most chemicals"
      },
      {
        reactionType: "with acid",
        partner: "Aqua Regia",
        equation: "Au + HNO₃ + 3HCl → AuCl₃ + NO + 2H₂O",
        observation: "Only dissolves in aqua regia (3:1 HCl:HNO₃) — the 'royal water'"
      }
    ],
    interestingFacts: [
      "Almost completely unreactive",
      "Dissolves only in aqua regia",
      "Has been prized for 7000+ years"
    ]
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
        observation: "Platinum shows no reaction with water or common acids"
      },
      {
        reactionType: "with acid",
        partner: "Aqua Regia",
        equation: "3Pt + 4HNO₃ + 18HCl → 3H₂PtCl₆ + 4NO + 8H₂O",
        observation: "Only dissolved by boiling aqua regia — extremely resistant to corrosion"
      }
    ],
    interestingFacts: [
      "Extremely resistant to corrosion",
      "Used as a catalyst in catalytic converters",
      "More rare than gold"
    ]
  }
];
const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: "very-high", label: "Extremely Reactive" },
  { key: "high", label: "Highly Reactive" },
  { key: "moderate", label: "Moderate" },
  { key: "low", label: "Unreactive" }
];
function matchesFilter(rank, filter) {
  if (filter === "all") return true;
  if (filter === "very-high") return rank <= 2;
  if (filter === "high") return rank >= 3 && rank <= 4;
  if (filter === "moderate") return rank >= 5 && rank <= 11;
  if (filter === "low") return rank >= 12;
  return true;
}
function ReactivitySeriesPage() {
  const { data: seriesData, isLoading } = useReactivitySeries();
  const metals = (seriesData && seriesData.length > 0 ? seriesData : FALLBACK_METALS).slice().sort((a, b) => Number(a.rank) - Number(b.rank));
  const [expandedSymbol, setExpandedSymbol] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const filteredMetals = reactExports.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return metals.filter((m) => {
      const rank = Number(m.rank);
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.symbol.toLowerCase().includes(q) || getReactivityLabel(rank).toLowerCase().includes(q);
      return matchSearch && matchesFilter(rank, activeFilter);
    });
  }, [metals, searchQuery, activeFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-10", "data-ocid": "reactivity.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "text-center mb-8 max-w-3xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-orange-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ranked most reactive → least reactive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent", children: "Reactivity Series" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "The reactivity series ranks metals by how vigorously they react with oxygen, water, and acids. More reactive metals displace less reactive ones from their compounds." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto mb-6 space-y-3",
        "data-ocid": "reactivity.filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by name or symbol…",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full glass rounded-xl pl-10 pr-10 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground focus:border-accent/50 border border-border/30",
                "data-ocid": "reactivity.search_input"
              }
            ),
            searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSearchQuery(""),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "Clear search",
                "data-ocid": "reactivity.clear_search_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveFilter(opt.key),
              className: cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                activeFilter === opt.key ? "bg-amber-500/20 border-amber-400/40 text-amber-300" : "glass text-muted-foreground hover:text-foreground"
              ),
              "data-ocid": `reactivity.filter.${opt.key}`,
              children: opt.label
            },
            opt.key
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto mb-3 text-xs text-muted-foreground", children: [
      filteredMetals.length,
      " of ",
      metals.length,
      " metals shown"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto space-y-2", "data-ocid": "reactivity.list", children: isLoading ? Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass rounded-2xl h-16 animate-pulse",
        "data-ocid": "reactivity.loading_state"
      },
      `skeleton-${i + 1}`
    )) : filteredMetals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-2xl p-10 text-center text-muted-foreground",
        "data-ocid": "reactivity.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-8 h-8 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No metals match your search." })
        ]
      }
    ) : filteredMetals.map((metal, index) => {
      const rank = Number(metal.rank);
      const isExpanded = expandedSymbol === metal.symbol;
      const colorClass = getReactivityColor(rank);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: {
            delay: Math.min(index * 0.03, 0.4),
            duration: 0.3
          },
          className: "glass-reactivity rounded-2xl overflow-hidden",
          "data-ocid": `reactivity.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setExpandedSymbol(isExpanded ? null : metal.symbol),
                className: "w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-card/20 transition-colors",
                "data-ocid": `reactivity.toggle.${index + 1}`,
                "aria-expanded": isExpanded,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground", children: rank }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center font-display font-bold text-lg text-foreground shadow-md",
                        colorClass
                      ),
                      children: metal.symbol
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: metal.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: getReactivityLabel(rank) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex flex-col items-end gap-1 w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: cn(
                        "h-full rounded-full bg-gradient-to-r",
                        colorClass
                      ),
                      initial: { width: 0 },
                      animate: {
                        width: `${Math.max(5, 100 - rank / metals.length * 95)}%`
                      },
                      transition: {
                        delay: Math.min(index * 0.03, 0.4) + 0.2,
                        duration: 0.5
                      }
                    }
                  ) }) }),
                  isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandSection, { isOpen: isExpanded, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 pt-1 border-t border-border/20", children: [
              metal.reactions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Chemical Reactions" }),
                metal.reactions.map((rxn) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass rounded-xl p-3 space-y-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        rxn.reactionType.includes("water") ? /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-3 h-3 text-sky-400 flex-shrink-0" }) : rxn.reactionType.includes("acid") ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-amber-400 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium capitalize", children: [
                          rxn.reactionType,
                          " ",
                          rxn.partner !== rxn.reactionType ? `(${rxn.partner})` : ""
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground/90 bg-background/30 px-2 py-1 rounded-lg", children: rxn.equation }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground italic leading-relaxed", children: rxn.observation })
                    ]
                  },
                  `${rxn.reactionType}-${rxn.partner}`
                ))
              ] }),
              metal.interestingFacts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Key Facts" }),
                metal.interestingFacts.map((fact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-2 text-sm text-foreground/80",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400 mt-0.5 flex-shrink-0", children: "•" }),
                      fact
                    ]
                  },
                  fact
                ))
              ] })
            ] }) })
          ]
        },
        metal.symbol
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "max-w-2xl mx-auto mt-10 glass rounded-2xl p-6",
        "data-ocid": "reactivity.displacement_rule",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold mb-2 text-amber-300", children: "⚡ Displacement Rule" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
            "A more reactive metal will displace a less reactive metal from its salt solution. For example, zinc displaces copper from copper sulfate solution:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground/90 bg-card/50 px-1.5 py-0.5 rounded", children: "Zn + CuSO₄ → ZnSO₄ + Cu" })
          ] })
        ]
      }
    )
  ] });
}
function ExpandSection({
  isOpen,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: false,
      animate: { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 },
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      style: { overflow: "hidden" },
      children
    }
  );
}
export {
  ReactivitySeriesPage
};
