import { r as reactExports, j as jsxRuntimeExports, h as cn, a as useChemStore, m as motion, l as AnimatePresence } from "./index-DyyHqAHL.js";
import { G as GlassSlider } from "./GlassSlider-CEDEo6xS.js";
import { a as useReactions } from "./useChemistry-LgPqHx3p.js";
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
  "Industrial"
];
const CATEGORY_COLORS = {
  All: "text-foreground",
  Inorganic: "text-cyan-400",
  Organic: "text-emerald-400",
  Named: "text-purple-400",
  Industrial: "text-orange-400"
};
const TYPE_BADGE_COLORS = {
  inorganic: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  organic: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  named: "bg-purple-500/15 text-purple-300 border-purple-400/30",
  industrial: "bg-orange-500/15 text-orange-300 border-orange-400/30",
  redox: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30",
  acidbase: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  precipitation: "bg-pink-500/15 text-pink-300 border-pink-400/30",
  thermal: "bg-red-500/15 text-red-300 border-red-400/30"
};
function getTypeBadgeClass(type) {
  const lower = type.toLowerCase();
  for (const [key, cls] of Object.entries(TYPE_BADGE_COLORS)) {
    if (lower.includes(key)) return cls;
  }
  return "bg-card/30 text-muted-foreground border-border/30";
}
const ReactionCard = reactExports.memo(function ReactionCard2({
  reaction,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 border border-border/20",
      style: {
        animation: `card-enter 0.4s ease-out ${index * 0.08}s both`
      },
      "data-ocid": `virtual_lab.auto.reaction.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((e) => !e),
            className: "w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-card/20 transition-colors",
            "data-ocid": `virtual_lab.auto.reaction.expand.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground leading-tight", children: reaction.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                        getTypeBadgeClass(reaction.reactionType)
                      ),
                      children: reaction.reactionType
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-primary/90 bg-primary/5 px-2 py-1 rounded truncate", children: reaction.balancedEquation })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-muted-foreground transition-transform duration-200 mt-0.5 flex-shrink-0",
                    expanded ? "rotate-180" : ""
                  ),
                  children: "▼"
                }
              )
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 space-y-3 border-t border-border/15 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground bg-primary/8 px-3 py-2 rounded-lg break-all", children: reaction.balancedEquation }),
          reaction.energyChange && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Energy:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: reaction.energyChange })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/75 leading-relaxed", children: reaction.description }),
          reaction.observations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5", children: "Observations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: reaction.observations.map((obs) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "text-xs text-foreground/70 flex gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/60 flex-shrink-0", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: obs })
                ]
              },
              obs
            )) })
          ] })
        ] })
      ]
    }
  );
});
const AutoReactionTab = reactExports.memo(function AutoReactionTab2() {
  const [query, setQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [searched, setSearched] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const { data: allReactions, isLoading } = useReactions();
  function runSearch() {
    if (!allReactions) return;
    setSearched(true);
    let filtered = allReactions;
    if (activeCategory !== "All") {
      const catLower = activeCategory.toLowerCase();
      filtered = filtered.filter(
        (r) => r.reactionType.toLowerCase().includes(catLower)
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (r) => r.balancedEquation.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.reactants.some(
          (rc) => rc.name.toLowerCase().includes(q) || rc.symbol.toLowerCase().includes(q)
        ) || r.products.some(
          (p) => p.name.toLowerCase().includes(q) || p.symbol.toLowerCase().includes(q)
        )
      );
    }
    setResults(filtered.slice(0, 5));
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "virtual_lab.auto.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: AUTO_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: "Enter compound or element (e.g. sodium, ethanol, HCl)",
            className: "w-full glass rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 bg-transparent outline-none focus:ring-2 focus:ring-primary/40 border border-border/30 transition-all",
            "data-ocid": "virtual_lab.auto.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: runSearch,
            disabled: isLoading,
            className: "absolute right-2 top-1/2 -translate-y-1/2 bg-primary/20 hover:bg-primary/35 text-primary rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50",
            "data-ocid": "virtual_lab.auto.run_button",
            children: "⚗️ Run"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-2",
          "data-ocid": "virtual_lab.auto.category_filter",
          children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setActiveCategory(cat);
                setSearched(false);
              },
              className: cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                activeCategory === cat ? `${CATEGORY_COLORS[cat]} bg-card/40 border-current/40` : "text-muted-foreground glass border-border/20 hover:text-foreground"
              ),
              "data-ocid": `virtual_lab.auto.category_${cat.toLowerCase()}`,
              children: cat
            },
            cat
          ))
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-center gap-3 py-8 text-muted-foreground",
        "data-ocid": "virtual_lab.auto.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Loading reaction database..." })
        ]
      }
    ),
    !isLoading && searched && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: results.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        results.length,
        " reaction",
        results.length !== 1 ? "s" : "",
        " found"
      ] }),
      results.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReactionCard, { reaction: r, index: i }, r.id))
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl p-6 text-center border border-border/20",
        "data-ocid": "virtual_lab.auto.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "No reaction data found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Try:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/80 font-mono", children: '"sodium", "ethanol", "HCl"' })
          ] })
        ]
      }
    ) }),
    !isLoading && !searched && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-6 text-center border border-border/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "⚗️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "Search the Reaction Database" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
        "Enter a compound name, element, or formula above and press",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Run Reaction" }),
        " to find matching reactions with equations, types, and explanations."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2 justify-center", children: ["sodium", "ethanol", "HCl + NaOH", "copper"].map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setQuery(ex);
            setSearched(false);
          },
          className: "glass px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground font-mono transition-all border border-border/20",
          children: ex
        },
        ex
      )) })
    ] })
  ] });
});
const TheoryPanel = reactExports.memo(function TheoryPanel2({
  principle,
  observations,
  application,
  className
}) {
  const [open, setOpen] = reactExports.useState(false);
  const sections = [
    { title: "Scientific Principle", icon: "⚗️", content: principle },
    { title: "Observations to Expect", icon: "👁️", content: observations },
    { title: "Real-Life Application", icon: "🌍", content: application }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("mb-6", className), "data-ocid": "theory_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "w-full flex items-center justify-between glass rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-card/30",
        "aria-expanded": open,
        "data-ocid": "theory_panel.toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "📚" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Theory & Background" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-muted-foreground transition-transform duration-300 text-sm",
              style: { transform: open ? "rotate(180deg)" : "rotate(0deg)" },
              children: "▼"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "overflow-hidden",
        style: {
          maxHeight: open ? "600px" : "0px",
          transition: "max-height 300ms ease"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 grid sm:grid-cols-3 gap-3", children: sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "glass rounded-xl p-4 border-l-2",
              i === 0 && "border-cyan-400/50",
              i === 1 && "border-amber-400/50",
              i === 2 && "border-emerald-400/50"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5",
                    i === 0 && "text-cyan-400",
                    i === 1 && "text-amber-400",
                    i === 2 && "text-emerald-400"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.icon }),
                    s.title
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed", children: s.content })
            ]
          },
          s.title
        )) })
      }
    )
  ] });
});
const CONDUCTIVITY_KEYFRAMES = `
@keyframes ion-move-pos {
  0%   { transform: translateX(0); opacity: 0.8; }
  100% { transform: translateX(30px); opacity: 0.2; }
}
@keyframes ion-move-neg {
  0%   { transform: translateX(0); opacity: 0.8; }
  100% { transform: translateX(-30px); opacity: 0.2; }
}
@keyframes bulb-flicker {
  0%,100% { opacity: 1; }
  45%      { opacity: 0.85; }
  50%      { opacity: 0.92; }
}
@keyframes current-flow {
  0%   { stroke-dashoffset: 60; opacity: 0.6; }
  100% { stroke-dashoffset: 0;  opacity: 1; }
}
`;
const SOLUTIONS = [
  {
    id: "distilled",
    name: "Distilled Water",
    formula: "H₂O",
    type: "Non-electrolyte",
    level: "none",
    ions: "H₂O ⇌ H⁺ + OH⁻ (negligible)",
    color: "rgba(56,189,248,0.25)"
  },
  {
    id: "nacl",
    name: "Salt Water",
    formula: "NaCl (aq)",
    type: "Strong electrolyte",
    level: "strong",
    ions: "Na⁺ + Cl⁻",
    color: "rgba(200,220,255,0.3)"
  },
  {
    id: "sugar",
    name: "Sugar Water",
    formula: "C₁₂H₂₂O₁₁ (aq)",
    type: "Non-electrolyte",
    level: "none",
    ions: "No ions — molecules stay intact",
    color: "rgba(251,191,36,0.2)"
  },
  {
    id: "acetic",
    name: "Acetic Acid",
    formula: "CH₃COOH (aq)",
    type: "Weak electrolyte",
    level: "weak",
    ions: "CH₃COO⁻ + H⁺ (partial)",
    color: "rgba(200,230,200,0.3)"
  },
  {
    id: "hcl",
    name: "Hydrochloric Acid",
    formula: "HCl (aq)",
    type: "Strong electrolyte",
    level: "strong",
    ions: "H⁺ + Cl⁻",
    color: "rgba(251,146,60,0.2)"
  },
  {
    id: "ethanol",
    name: "Ethanol",
    formula: "C₂H₅OH",
    type: "Non-electrolyte",
    level: "none",
    ions: "No ions formed",
    color: "rgba(200,200,200,0.15)"
  }
];
const IonParticles = reactExports.memo(function IonParticles2({
  level
}) {
  const [ions, setIons] = reactExports.useState([]);
  const counterRef = reactExports.useRef(0);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (level === "none") {
      setIons([]);
      return;
    }
    const rate = level === "strong" ? 300 : 700;
    function spawnIon() {
      const id = ++counterRef.current;
      const charge = Math.random() > 0.5 ? "+" : "-";
      const ion = {
        id,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        charge,
        dur: 0.8 + Math.random() * 0.4
      };
      setIons((prev) => [...prev.slice(-16), ion]);
      setTimeout(
        () => setIons((prev) => prev.filter((i) => i.id !== id)),
        (ion.dur + 0.05) * 1e3
      );
      timerRef.current = setTimeout(spawnIon, rate + Math.random() * 200);
    }
    timerRef.current = setTimeout(spawnIon, 100);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [level]);
  if (level === "none" || ions.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: ions.map((ion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute rounded-full flex items-center justify-center text-[8px] font-bold",
      style: {
        width: 12,
        height: 12,
        left: `${ion.x}%`,
        top: `${ion.y}%`,
        backgroundColor: ion.charge === "+" ? "rgba(239,68,68,0.7)" : "rgba(59,130,246,0.7)",
        color: "rgba(255,255,255,0.9)",
        animation: `${ion.charge === "+" ? "ion-move-pos" : "ion-move-neg"} ${ion.dur}s ease-out forwards`
      },
      children: ion.charge
    },
    ion.id
  )) });
});
const CircuitSVG = reactExports.memo(function CircuitSVG2({
  level,
  solution
}) {
  const brightness = level === "none" ? 0 : level === "weak" ? 0.35 : 1;
  const bulbColor = level === "none" ? "rgba(150,150,120,0.3)" : level === "weak" ? "rgba(251,191,36,0.5)" : "rgba(251,191,36,0.95)";
  const wireOpacity = level === "none" ? 0.25 : 0.7;
  const wireDashAnim = level !== "none" ? "current-flow 0.8s linear infinite" : "none";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { height: 200 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: CONDUCTIVITY_KEYFRAMES }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: 280,
            height: 200,
            viewBox: "0 0 280 200",
            "aria-label": "Electrical conductivity circuit with bulb and beaker",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Electrical conductivity circuit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: 10,
                  y: 70,
                  width: 24,
                  height: 50,
                  rx: 4,
                  fill: "rgba(80,80,100,0.6)",
                  stroke: "rgba(150,200,255,0.3)",
                  strokeWidth: 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: 14,
                  y: 80,
                  width: 16,
                  height: 8,
                  rx: 2,
                  fill: "rgba(251,146,60,0.6)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: 14,
                  y: 92,
                  width: 16,
                  height: 8,
                  rx: 2,
                  fill: "rgba(200,200,200,0.4)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: 22,
                  y: 66,
                  fontSize: "8",
                  fill: "rgba(200,200,200,0.6)",
                  textAnchor: "middle",
                  children: "+"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: 22,
                  y: 136,
                  fontSize: "8",
                  fill: "rgba(200,200,200,0.6)",
                  textAnchor: "middle",
                  children: "−"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M34 80 L140 80 L140 40 L200 40 L200 80 L240 80",
                  fill: "none",
                  stroke: "rgba(150,200,255,0.35)",
                  strokeWidth: 2,
                  strokeDasharray: "6 4",
                  style: {
                    animation: wireDashAnim,
                    opacity: wireOpacity,
                    transition: "opacity 0.5s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M34 110 L140 110 L140 160 L200 160 L200 110 L240 110",
                  fill: "none",
                  stroke: "rgba(150,200,255,0.35)",
                  strokeWidth: 2,
                  strokeDasharray: "6 4",
                  style: {
                    animation: wireDashAnim,
                    opacity: wireOpacity,
                    transition: "opacity 0.5s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: 140,
                  cy: 80,
                  r: 16,
                  fill: "rgba(60,60,80,0.7)",
                  stroke: "rgba(150,200,255,0.3)",
                  strokeWidth: 1.5
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  cx: 140,
                  cy: 76,
                  rx: 10,
                  ry: 11,
                  fill: bulbColor,
                  style: {
                    transition: "fill 0.5s ease",
                    filter: level !== "none" ? `brightness(${1 + brightness}) drop-shadow(0 0 ${6 + brightness * 10}px rgba(251,191,36,0.8))` : "none",
                    animation: level === "strong" ? "bulb-flicker 0.6s ease-in-out infinite" : "none"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M136 80 L138 76 L142 80 L144 76",
                  fill: "none",
                  stroke: level !== "none" ? "rgba(255,220,100,0.9)" : "rgba(180,180,150,0.4)",
                  strokeWidth: 1.2,
                  style: { transition: "stroke 0.5s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: 200,
                  y: 75,
                  width: 50,
                  height: 60,
                  rx: 4,
                  fill: solution.color,
                  stroke: "rgba(150,200,255,0.3)",
                  strokeWidth: 1.5,
                  style: { transition: "fill 0.6s ease" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: 210,
                  y: 78,
                  width: 4,
                  height: 50,
                  rx: 2,
                  fill: "rgba(100,150,220,0.8)",
                  style: {
                    filter: level !== "none" ? "drop-shadow(0 0 3px rgba(100,150,220,0.7))" : "none",
                    transition: "filter 0.5s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: 236,
                  y: 78,
                  width: 4,
                  height: 50,
                  rx: 2,
                  fill: "rgba(200,150,50,0.8)",
                  style: {
                    filter: level !== "none" ? "drop-shadow(0 0 3px rgba(200,150,50,0.7))" : "none",
                    transition: "filter 0.5s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 212, y: 74, fontSize: "7", fill: "rgba(100,150,220,0.7)", children: "−" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 238, y: 74, fontSize: "7", fill: "rgba(200,150,50,0.7)", children: "+" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: 140,
                  y: 185,
                  fontSize: "8",
                  fill: "rgba(200,200,200,0.5)",
                  textAnchor: "middle",
                  children: level === "none" ? "No current" : level === "weak" ? "Weak current" : "Strong current"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute overflow-hidden rounded-sm",
            style: { left: 200, top: 78, width: 50, height: 57 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonParticles, { level })
          }
        )
      ]
    }
  );
});
const ConductivityBar = reactExports.memo(function ConductivityBar2({
  level
}) {
  const pct = level === "none" ? 0 : level === "weak" ? 33 : 90;
  const color = level === "none" ? "rgba(150,150,150,0.4)" : level === "weak" ? "rgba(251,191,36,0.7)" : "rgba(52,211,153,0.8)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Conductivity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-semibold",
          style: { color, transition: "color 0.5s" },
          children: level === "none" ? "None" : level === "weak" ? "Low" : "High"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-2.5 rounded-full overflow-hidden",
        style: {
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full",
            style: {
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${color}, ${color.replace(/[\d.]+\)$/, "0.95)")})`,
              boxShadow: `0 0 6px ${color}`,
              transition: "width 0.6s ease, background 0.5s ease"
            }
          }
        )
      }
    )
  ] });
});
const ConductivityTab = reactExports.memo(function ConductivityTab2() {
  const [selectedId, setSelectedId] = reactExports.useState("nacl");
  const solution = SOLUTIONS.find((s) => s.id === selectedId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.conductivity.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TheoryPanel,
      {
        principle: "Electrical conductivity in solutions depends on the presence of mobile ions. Strong electrolytes (NaCl, HCl, NaOH) fully dissociate into ions, creating many charge carriers. Weak electrolytes (acetic acid, NH₄OH) only partially ionise — fewer ions, less current. Non-electrolytes (sucrose, ethanol) remain molecular and carry no charge.",
        observations: "Strong electrolyte: bulb glows brightly, many ions visible moving in solution. Weak electrolyte: dim glow, lower ion count. Non-electrolyte: bulb stays off completely. Ion concentration directly tracks bulb brightness — a quantitative relationship.",
        application: "Water quality testing — pure water should not conduct significantly, so high conductivity indicates dissolved salts or contaminants. Industrial electrochemistry (electroplating, electrolysis) and biology (nerve impulse transmission via Na⁺/K⁺ ion gradients) rely on these principles."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircuitSVG, { level: solution.level, solution }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ConductivityBar, { level: solution.level }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "text-sm font-semibold",
              solution.level === "strong" ? "text-green-400" : solution.level === "weak" ? "text-yellow-400" : "text-muted-foreground"
            ),
            children: solution.type
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1", children: "Ions Present" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono text-foreground/80", children: solution.ions })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: SOLUTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setSelectedId(s.id),
        className: cn(
          "glass rounded-xl px-3 py-3 text-left transition-all duration-200",
          selectedId === s.id ? "ring-2 ring-primary/50 bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-card/30"
        ),
        "data-ocid": `virtual_lab.conductivity.solution_${s.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-mono mt-0.5 opacity-70", children: s.formula }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "text-[9px] mt-1 font-semibold",
                s.level === "strong" ? "text-green-400" : s.level === "weak" ? "text-yellow-400" : "text-red-400/70"
              ),
              children: s.level === "none" ? "Non-electrolyte" : s.level === "weak" ? "Weak electrolyte" : "Strong electrolyte"
            }
          )
        ]
      },
      s.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border-l-2 border-primary/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-2", children: "How conductivity works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80 leading-relaxed", children: [
        "Electrical conductivity in solution depends on the presence of mobile ions. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Strong electrolytes" }),
        " ",
        "(NaCl, HCl) fully dissociate — many ions, bright bulb.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Weak electrolytes" }),
        " (acetic acid) partially ionise — dim bulb.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Non-electrolytes" }),
        " (sugar, ethanol) don't form ions — bulb stays off."
      ] })
    ] })
  ] });
});
const ELECTROLYSIS_KEYFRAMES = `
@keyframes elec-bubble-rise {
  0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
  50%  { transform: translateY(-30px) translateX(2px) scale(0.85); opacity: 0.6; }
  100% { transform: translateY(-72px) translateX(-1px) scale(0.35); opacity: 0; }
}
@keyframes wire-current {
  0%   { opacity: 0.4; }
  50%  { opacity: 1; }
  100% { opacity: 0.4; }
}
`;
const BubbleEmitter = reactExports.memo(function BubbleEmitter2({
  active,
  rate,
  side,
  color
}) {
  const [bubbles, setBubbles] = reactExports.useState([]);
  const counterRef = reactExports.useRef(0);
  const timerRef = reactExports.useRef(null);
  const spawnNext = reactExports.useCallback(() => {
    if (!active) return;
    const id = ++counterRef.current;
    const bubble = {
      id,
      x: 30 + Math.random() * 40,
      size: 3 + Math.random() * 4,
      dur: 0.7 + Math.random() * 0.5,
      side
    };
    setBubbles((prev) => [...prev.slice(-20), bubble]);
    const removeAfter = (bubble.dur + 0.05) * 1e3;
    setTimeout(
      () => setBubbles((prev) => prev.filter((b) => b.id !== id)),
      removeAfter
    );
    const interval = Math.max(80, 500 - rate * 420);
    timerRef.current = setTimeout(spawnNext, interval + Math.random() * 150);
  }, [active, rate, side]);
  reactExports.useEffect(() => {
    if (active) {
      timerRef.current = setTimeout(spawnNext, 50);
    } else {
      setBubbles([]);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, spawnNext]);
  if (!active || bubbles.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: bubbles.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute rounded-full",
      style: {
        width: b.size,
        height: b.size,
        left: `${b.x}%`,
        bottom: "18%",
        backgroundColor: color,
        border: "0.5px solid rgba(255,255,255,0.3)",
        animation: `elec-bubble-rise ${b.dur}s ease-out forwards`
      }
    },
    b.id
  )) });
});
const ElectrolysisApparatus = reactExports.memo(function ElectrolysisApparatus2({
  running,
  voltage,
  h2Vol,
  o2Vol
}) {
  const h2Pct = Math.min(95, h2Vol / 20 * 100);
  const o2Pct = Math.min(95, o2Vol / 10 * 100);
  const waterColor = "rgba(56,189,248,0.35)";
  const currentOpacity = running ? 1 : 0.3;
  const wireAnim = running ? "wire-current 0.8s ease-in-out infinite" : "none";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: ELECTROLYSIS_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1 glass rounded-lg px-4 py-2",
        style: { opacity: currentOpacity, transition: "opacity 0.4s" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-yellow-300/80", children: "−" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-3 rounded-full relative overflow-hidden",
              style: {
                background: "linear-gradient(90deg, rgba(251,146,60,0.7), rgba(234,179,8,0.8))",
                boxShadow: running ? "0 0 8px rgba(234,179,8,0.5)" : "none",
                transition: "box-shadow 0.4s"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 rounded-full",
                  style: {
                    background: "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    animation: wireAnim
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-yellow-300/80", children: "+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-2 font-mono", children: [
            voltage.toFixed(1),
            " V"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-6 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute rounded-full pointer-events-none",
          style: {
            width: 2,
            height: 28,
            top: -28,
            left: "50%",
            transform: "translateX(calc(-50% - 48px))",
            background: "linear-gradient(to bottom, rgba(251,146,60,0.7), rgba(251,146,60,0.3))",
            animation: wireAnim
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute rounded-full pointer-events-none",
          style: {
            width: 2,
            height: 28,
            top: -28,
            left: "50%",
            transform: "translateX(calc(-50% + 48px))",
            background: "linear-gradient(to bottom, rgba(234,179,8,0.7), rgba(234,179,8,0.3))",
            animation: wireAnim
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative rounded-b-2xl border border-border/30 overflow-hidden",
          style: {
            width: 200,
            height: 100,
            background: waterColor,
            backdropFilter: "blur(4px)",
            boxShadow: running ? "0 0 16px rgba(56,189,248,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" : "inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "box-shadow 0.5s"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute flex flex-col items-center",
                style: { left: 28, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-t-full relative overflow-hidden",
                      style: {
                        width: 28,
                        height: 80,
                        border: "1.5px solid rgba(150,200,255,0.4)",
                        background: "rgba(0,0,0,0.05)",
                        borderBottom: "none"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute bottom-0 left-0 right-0 rounded-b",
                            style: {
                              height: `${100 - h2Pct}%`,
                              background: waterColor,
                              transition: "height 0.8s ease"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute top-0 left-0 right-0",
                            style: {
                              height: `${h2Pct}%`,
                              background: "linear-gradient(to bottom, rgba(147,197,253,0.5), rgba(147,197,253,0.15))",
                              transition: "height 0.8s ease"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          BubbleEmitter,
                          {
                            active: running,
                            rate: Math.min(1, voltage / 12),
                            side: "left",
                            color: "rgba(147,197,253,0.7)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute top-1 left-0 right-0 text-center text-[8px] font-mono font-bold",
                            style: { color: "rgba(147,197,253,0.9)" },
                            children: h2Pct > 15 ? `${h2Vol.toFixed(1)}mL` : ""
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold text-blue-300/80 mt-1", children: "H₂ (−)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute flex flex-col items-center",
                style: { right: 28, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-t-full relative overflow-hidden",
                      style: {
                        width: 28,
                        height: 80,
                        border: "1.5px solid rgba(150,200,255,0.4)",
                        background: "rgba(0,0,0,0.05)",
                        borderBottom: "none"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute bottom-0 left-0 right-0 rounded-b",
                            style: {
                              height: `${100 - o2Pct}%`,
                              background: waterColor,
                              transition: "height 0.8s ease"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute top-0 left-0 right-0",
                            style: {
                              height: `${o2Pct}%`,
                              background: "linear-gradient(to bottom, rgba(252,211,77,0.5), rgba(252,211,77,0.15))",
                              transition: "height 0.8s ease"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          BubbleEmitter,
                          {
                            active: running,
                            rate: Math.min(0.5, voltage / 24),
                            side: "right",
                            color: "rgba(252,211,77,0.7)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute top-1 left-0 right-0 text-center text-[8px] font-mono font-bold",
                            style: { color: "rgba(252,211,77,0.9)" },
                            children: o2Pct > 15 ? `${o2Vol.toFixed(1)}mL` : ""
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold text-yellow-300/80 mt-1", children: "O₂ (+)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute rounded-full",
                style: {
                  width: 4,
                  height: 70,
                  left: 40,
                  bottom: 0,
                  background: "linear-gradient(to top, rgba(100,150,220,0.9), rgba(150,200,255,0.5))",
                  boxShadow: running ? "0 0 6px rgba(100,150,220,0.6)" : "none",
                  transition: "box-shadow 0.4s"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute rounded-full",
                style: {
                  width: 4,
                  height: 70,
                  right: 40,
                  bottom: 0,
                  background: "linear-gradient(to top, rgba(200,160,50,0.9), rgba(234,179,8,0.5))",
                  boxShadow: running ? "0 0 6px rgba(200,160,50,0.6)" : "none",
                  transition: "box-shadow 0.4s"
                }
              }
            )
          ]
        }
      )
    ] })
  ] });
});
const ElectrolysisTab = reactExports.memo(function ElectrolysisTab2() {
  const [voltage, setVoltage] = reactExports.useState(6);
  const [running, setRunning] = reactExports.useState(false);
  const [h2Vol, setH2Vol] = reactExports.useState(0);
  const [o2Vol, setO2Vol] = reactExports.useState(0);
  const rafRef = reactExports.useRef(0);
  const lastTimeRef = reactExports.useRef(0);
  const h2Ref = reactExports.useRef(0);
  const o2Ref = reactExports.useRef(0);
  const voltRef = reactExports.useRef(voltage);
  const runRef = reactExports.useRef(running);
  voltRef.current = voltage;
  runRef.current = running;
  reactExports.useEffect(() => {
    if (!running) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    function tick(ts) {
      if (!runRef.current) return;
      const dt = lastTimeRef.current ? (ts - lastTimeRef.current) / 1e3 : 0;
      lastTimeRef.current = ts;
      const rate = Math.max(0, (voltRef.current - 1.23) / 10) * 0.4;
      h2Ref.current = Math.min(20, h2Ref.current + rate * 2 * dt);
      o2Ref.current = Math.min(10, o2Ref.current + rate * dt);
      setH2Vol(Number.parseFloat(h2Ref.current.toFixed(2)));
      setO2Vol(Number.parseFloat(o2Ref.current.toFixed(2)));
      rafRef.current = requestAnimationFrame(tick);
    }
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);
  function handleReset() {
    setRunning(false);
    setH2Vol(0);
    setO2Vol(0);
    h2Ref.current = 0;
    o2Ref.current = 0;
  }
  const ratio = o2Vol > 0.01 ? (h2Vol / o2Vol).toFixed(1) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.electrolysis.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TheoryPanel,
      {
        principle: "Water (H₂O) is split into hydrogen and oxygen gas by passing direct electric current through the solution. Electrolytes like H₂SO₄ or NaOH are added to improve conductivity — pure water is a very poor conductor.",
        observations: "Bubbles form at both electrodes immediately after switching on. The cathode (−) produces H₂ at twice the volume of the anode (+) which produces O₂ — reflecting the 2:1 ratio in 2H₂O → 2H₂ + O₂.",
        application: "Industrial-scale hydrogen production for fuel cells and energy storage. Commercial oxygen generation for hospitals and welding. Electroplating and metal refining also rely on the same principles."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ElectrolysisApparatus,
        {
          running,
          voltage,
          h2Vol,
          o2Vol
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 w-full max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-blue-300/70 font-semibold uppercase tracking-wider mb-1", children: "H₂" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-blue-300", children: h2Vol.toFixed(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: "mL" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-[10px] font-semibold uppercase tracking-wider mb-1",
              style: { color: "rgba(252,211,77,0.7)" },
              children: "O₂"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "font-mono text-lg font-bold",
              style: { color: "rgba(252,211,77,0.9)" },
              children: o2Vol.toFixed(1)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: "mL" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1", children: "H₂:O₂" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-foreground", children: ratio }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: "ratio" })
        ] })
      ] }),
      (h2Vol > 0 || o2Vol > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground text-center", children: "Gas ratio (theoretical 2:1)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 h-4 rounded-full overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-l-full transition-all duration-500",
              style: {
                flex: h2Vol,
                background: "linear-gradient(90deg, rgba(56,189,248,0.7), rgba(147,197,253,0.9))"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-r-full transition-all duration-500",
              style: {
                flex: o2Vol || 0.01,
                background: "linear-gradient(90deg, rgba(234,179,8,0.7), rgba(252,211,77,0.9))"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[9px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "H₂ (cathode −)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "O₂ (anode +)" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          min: 1,
          max: 12,
          step: 0.5,
          value: voltage,
          onChange: (v) => {
            setVoltage(v);
            if (!running) handleReset();
          },
          label: "Voltage",
          unit: "V",
          colorFrom: "rgba(234,179,8,0.7)",
          colorTo: "rgba(251,191,36,0.9)",
          "data-ocid": "virtual_lab.electrolysis.voltage_slider",
          "aria-label": "Electrolysis voltage"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/70", children: "Minimum decomposition voltage: 1.23 V — below this, no electrolysis occurs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setRunning((r) => !r),
            className: cn(
              "flex-1 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
              running ? "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30" : "bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30"
            ),
            "data-ocid": "virtual_lab.electrolysis.start_button",
            children: running ? "⏹ Stop" : "▶ Start Electrolysis"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleReset,
            className: "glass px-5 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all text-sm",
            "data-ocid": "virtual_lab.electrolysis.reset_button",
            children: "Reset"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border-l-2 border-primary/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-2", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "Passing electricity through water breaks H₂O into hydrogen (H₂) at the cathode (−) and oxygen (O₂) at the anode (+). Hydrogen is produced at twice the volume of oxygen, reflecting the 2:1 ratio in the formula 2H₂O → 2H₂ + O₂." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 glass rounded-lg p-3 font-mono text-sm text-center text-foreground/90", children: "2H₂O(l) → 2H₂(g) + O₂(g)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-300 font-semibold", children: "Cathode (−): " }),
          "4H⁺ + 4e⁻ → 2H₂↑"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-300 font-semibold", children: "Anode (+): " }),
          "2H₂O → O₂↑ + 4H⁺ + 4e⁻"
        ] })
      ] })
    ] })
  ] });
});
const FLAME_KEYFRAMES = `
@keyframes flame-flicker-fast {
  0%,100% { transform: scaleY(1)    scaleX(1);    opacity: 0.95; }
  25%      { transform: scaleY(1.12) scaleX(0.88); opacity: 1; }
  50%      { transform: scaleY(0.93) scaleX(1.07); opacity: 0.88; }
  75%      { transform: scaleY(1.08) scaleX(0.92); opacity: 0.97; }
}
@keyframes flame-inner {
  0%,100% { transform: scaleY(1)   scaleX(1);    opacity: 0.8; }
  33%      { transform: scaleY(1.1) scaleX(0.9);  opacity: 1; }
  66%      { transform: scaleY(0.9) scaleX(1.1);  opacity: 0.75; }
}
@keyframes glow-pulse {
  0%,100% { opacity: 0.5; }
  50%      { opacity: 0.85; }
}
`;
const SALTS = [
  {
    id: "li",
    name: "Lithium",
    formula: "LiCl",
    color: "#dc2626",
    innerColor: "#fca5a5",
    glowColor: "rgba(220,38,38,0.6)",
    description: "Crimson red — due to Li⁺ ion emitting at ~670 nm"
  },
  {
    id: "na",
    name: "Sodium",
    formula: "NaCl",
    color: "#eab308",
    innerColor: "#fef08a",
    glowColor: "rgba(234,179,8,0.65)",
    description: "Golden yellow — Na⁺ emits strongly at 589 nm (D-line)"
  },
  {
    id: "k",
    name: "Potassium",
    formula: "KCl",
    color: "#a855f7",
    innerColor: "#d8b4fe",
    glowColor: "rgba(168,85,247,0.5)",
    description: "Lilac / violet — K⁺ emits at 766 nm and 770 nm"
  },
  {
    id: "cu",
    name: "Copper",
    formula: "CuCl₂",
    color: "#06b6d4",
    innerColor: "#a5f3fc",
    glowColor: "rgba(6,182,212,0.6)",
    description: "Blue-green — Cu²⁺ band emission across 500–540 nm"
  },
  {
    id: "ca",
    name: "Calcium",
    formula: "CaCl₂",
    color: "#f97316",
    innerColor: "#fdba74",
    glowColor: "rgba(249,115,22,0.55)",
    description: "Brick red — Ca²⁺ emission at 622 nm and 646 nm"
  },
  {
    id: "ba",
    name: "Barium",
    formula: "BaCl₂",
    color: "#84cc16",
    innerColor: "#d9f99d",
    glowColor: "rgba(132,204,22,0.5)",
    description: "Pale green — Ba²⁺ molecular band emissions ~524 nm"
  }
];
const FlameSVG = reactExports.memo(function FlameSVG2({
  salt,
  active
}) {
  const flameColor = active ? salt.color : "#f97316";
  const innerColor = active ? salt.innerColor : "#fed7aa";
  const glowColor = active ? salt.glowColor : "rgba(249,115,22,0.4)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center select-none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: FLAME_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute rounded-full pointer-events-none",
        style: {
          width: 80,
          height: 80,
          background: glowColor,
          filter: "blur(18px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          animation: "glow-pulse 1.2s ease-in-out infinite",
          transition: "background 0.8s ease"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: 48,
          height: 90,
          borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
          background: `radial-gradient(ellipse at 40% 85%, ${flameColor} 0%, ${flameColor}aa 40%, transparent 75%)`,
          animation: "flame-flicker-fast 0.15s ease-in-out infinite",
          transformOrigin: "bottom center",
          position: "relative",
          transition: "background 0.8s ease"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 4,
              left: "50%",
              transform: "translateX(-50%)",
              width: 22,
              height: 55,
              borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
              background: `radial-gradient(ellipse at 40% 85%, ${innerColor} 0%, ${innerColor}88 50%, transparent 80%)`,
              animation: "flame-inner 0.13s ease-in-out infinite reverse",
              transformOrigin: "bottom center",
              transition: "background 0.8s ease"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mt-1 z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-14 border border-border/30 rounded-t-sm",
          style: { background: "rgba(100,110,130,0.4)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-14 h-4 border border-border/30 rounded-sm",
          style: { background: "rgba(80,90,110,0.5)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-20 h-3 border border-border/20 rounded",
          style: { background: "rgba(60,70,90,0.4)" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute pointer-events-none",
        style: {
          top: "22%",
          left: "50%",
          transform: "translateX(-50%) rotate(-30deg)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: 28,
            height: 40,
            viewBox: "0 0 28 40",
            role: "img",
            "aria-label": "Wire loop with salt residue",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Wire loop with salt residue" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: 14,
                  y1: 0,
                  x2: 14,
                  y2: 28,
                  stroke: "rgba(180,180,160,0.8)",
                  strokeWidth: 2
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: 14,
                  cy: 32,
                  r: 6,
                  fill: "none",
                  stroke: "rgba(180,180,160,0.8)",
                  strokeWidth: 2
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: 14,
                  cy: 32,
                  r: 3,
                  fill: active ? `${flameColor}cc` : "rgba(200,200,180,0.3)",
                  style: { transition: "fill 0.8s ease" }
                }
              )
            ]
          }
        )
      }
    )
  ] });
});
const ColorSwatch = reactExports.memo(function ColorSwatch2({ salt }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-5 h-5 rounded-full flex-shrink-0",
      style: {
        background: salt.color,
        boxShadow: `0 0 8px ${salt.glowColor}`
      }
    }
  );
});
const FlameTestTab = reactExports.memo(function FlameTestTab2() {
  const [selectedId, setSelectedId] = reactExports.useState("na");
  const [lit, setLit] = reactExports.useState(true);
  const salt = SALTS.find((s) => s.id === selectedId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.flame_test.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TheoryPanel,
      {
        principle: "Metal salts contain metal ions (Na⁺, K⁺, Cu²⁺ etc.). Heat energy from the Bunsen flame promotes outer electrons to excited, higher-energy orbitals. When they fall back to the ground state they release energy as photons of specific wavelengths — producing characteristic visible colours unique to each element.",
        observations: "Na→ intense yellow/orange; K → lilac/violet; Cu → green/blue-green; Ca → brick-red; Li → crimson; Ba → pale green. Colours are highly specific and reproducible — each element has a unique emission spectrum.",
        application: "Fireworks manufacture relies on these characteristic colours to produce displays. Atomic emission spectroscopy and flame photometry are used in analytical labs to identify and quantify metal ions in water samples, soil, and blood."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "relative flex items-end justify-center",
          style: { height: 200 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlameSVG, { salt, active: lit })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-2xl px-6 py-3 flex items-center gap-3 transition-all duration-700",
          style: {
            borderColor: `${salt.color}50`,
            boxShadow: lit ? `0 0 20px ${salt.glowColor}` : "none",
            transition: "box-shadow 0.8s ease, border-color 0.8s ease"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ColorSwatch, { salt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-sm font-bold",
                  style: { color: salt.color, transition: "color 0.8s" },
                  children: [
                    salt.name,
                    " (",
                    salt.formula,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: salt.description })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Select Salt" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: SALTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setSelectedId(s.id);
            setLit(true);
          },
          className: cn(
            "glass rounded-xl px-3 py-3 flex items-center gap-2.5 transition-all duration-200",
            selectedId === s.id ? "ring-2 bg-card/20 text-foreground" : "text-muted-foreground hover:bg-card/30"
          ),
          style: selectedId === s.id ? { boxShadow: `0 0 12px ${s.glowColor}` } : {},
          "data-ocid": `virtual_lab.flame_test.salt_${s.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-4 h-4 rounded-full flex-shrink-0",
                style: { background: s.color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold truncate", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] opacity-70 font-mono", children: s.formula })
            ] })
          ]
        },
        s.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setLit((l) => !l),
        className: cn(
          "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
          lit ? "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30" : "bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30"
        ),
        "data-ocid": "virtual_lab.flame_test.toggle_button",
        children: lit ? "🕯️ Extinguish" : "🔥 Light Burner"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border-l-2 border-primary/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-2", children: "Why does the flame change color?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "When metal salts are heated in a flame, the energy excites electrons to higher energy levels. As they return to ground state, they emit photons at specific wavelengths — producing characteristic colors unique to each element. This is the basis of atomic emission spectroscopy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: SALTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-lg px-3 py-2 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-3 h-3 rounded-full flex-shrink-0",
                style: { background: s.color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                s.name,
                ":",
                " "
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: s.formula })
            ] })
          ]
        },
        s.id
      )) })
    ] })
  ] });
});
const KMNO4_KEYFRAMES = `
@keyframes kmno4-pour {
  0%   { transform: scaleY(0); opacity: 0; }
  20%  { transform: scaleY(1); opacity: 0.85; }
  80%  { transform: scaleY(1); opacity: 0.75; }
  100% { transform: scaleY(0); opacity: 0; }
}
@keyframes endpoint-pulse {
  0%,100% { box-shadow: 0 0 10px 2px rgba(216,180,254,0.4); }
  50%      { box-shadow: 0 0 24px 8px rgba(216,180,254,0.8); }
}
@keyframes badge-glow {
  0%,100% { opacity: 0.9; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.04); }
}
`;
const BuretteSVG = reactExports.memo(function BuretteSVG2({
  fillPct,
  color
}) {
  const w = 34;
  const h = 200;
  const tipH = 20;
  const markPositions = [10, 25, 50, 75, 90];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: w + 20,
      height: h + tipH + 10,
      viewBox: `-10 -5 ${w + 20} ${h + tipH + 10}`,
      role: "img",
      "aria-label": "burette",
      children: [
        markPositions.map((pct) => {
          const y = 4 + h * pct / 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: w - 2,
                y1: y,
                x2: w + 6,
                y2: y,
                stroke: "rgba(180,200,255,0.3)",
                strokeWidth: 0.8
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: w + 8,
                y: y + 3,
                fontSize: "6",
                fill: "rgba(160,180,220,0.45)",
                children: pct
              }
            )
          ] }, pct);
        }),
        fillPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 2,
            y: 4 + h * (100 - fillPct) / 100,
            width: w - 4,
            height: h * fillPct / 100,
            fill: color,
            rx: 2,
            style: { transition: "all 0.5s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 0,
            y: 4,
            width: w,
            height: h,
            rx: 4,
            fill: "none",
            stroke: "rgba(150,200,255,0.35)",
            strokeWidth: 2.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: w / 2 - 8,
            y: h,
            width: 16,
            height: 6,
            rx: 2,
            fill: "rgba(100,150,200,0.25)",
            stroke: "rgba(150,200,255,0.3)",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: `M${w / 2 - 3},${h + 6} L${w / 2 + 3},${h + 6} L${w / 2 + 1},${h + tipH} L${w / 2 - 1},${h + tipH} Z`,
            fill: "none",
            stroke: "rgba(150,200,255,0.35)",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: 3,
            y1: 8,
            x2: 3,
            y2: h - 4,
            stroke: "rgba(255,255,255,0.1)",
            strokeWidth: 1.5,
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
});
const FlaskSVG = reactExports.memo(function FlaskSVG2({
  liquidColor,
  volumeAdded,
  endpointReached
}) {
  const w = 110;
  const h = 130;
  const neckW = 30;
  const neckH = 35;
  const bodyW = w;
  const bodyH = h - neckH;
  const cx = w / 2;
  const liquidFill = Math.min(75, 10 + volumeAdded / 50 * 65);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: w + 4,
      height: h + 10,
      viewBox: `-2 -2 ${w + 4} ${h + 10}`,
      role: "img",
      "aria-label": "conical flask",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "flask-clip-kmno4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: `M${cx - neckW / 2},0 L${cx + neckW / 2},0 L${cx + neckW / 2},${neckH} L${w},${h} Q${cx},${h + 8} 0,${h} L${cx - neckW / 2},${neckH} Z`
          }
        ) }) }),
        volumeAdded > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 0,
            y: h - bodyH * liquidFill / 100 + neckH,
            width: w,
            height: bodyH * liquidFill / 100,
            fill: liquidColor,
            clipPath: "url(#flask-clip-kmno4)",
            style: { transition: "all 0.6s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: `M${cx - neckW / 2},0 L${cx - neckW / 2},${neckH} L0,${h} Q${cx},${h + 8} ${w},${h} L${cx + neckW / 2},${neckH} L${cx + neckW / 2},0`,
            fill: "none",
            stroke: "rgba(150,200,255,0.38)",
            strokeWidth: 2.5,
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: cx - neckW / 2,
            y1: 0,
            x2: cx + neckW / 2,
            y2: 0,
            stroke: "rgba(150,200,255,0.3)",
            strokeWidth: 2
          }
        ),
        endpointReached && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx,
            cy: h - 10,
            rx: bodyW / 2 - 4,
            ry: 14,
            fill: "rgba(216,180,254,0.15)",
            stroke: "rgba(216,180,254,0.5)",
            strokeWidth: 1.5,
            style: { animation: "endpoint-pulse 1.2s ease-in-out infinite" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: cx - neckW / 2 + 2,
            y1: 4,
            x2: 8,
            y2: h - 8,
            stroke: "rgba(255,255,255,0.09)",
            strokeWidth: 1.5,
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
});
const PourStreamKMnO4 = reactExports.memo(function PourStreamKMnO42({
  active
}) {
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute pointer-events-none",
      style: {
        bottom: -44,
        left: "50%",
        transform: "translateX(-50%)",
        width: 4,
        height: 44,
        background: "linear-gradient(to bottom, rgba(147,51,234,0.85), rgba(147,51,234,0.2))",
        borderRadius: 2,
        transformOrigin: "top center",
        animation: "kmno4-pour 0.6s ease-in-out"
      }
    }
  );
});
function getStep$1(vol) {
  if (vol === 0)
    return "Initial: KMnO₄ (purple) in burette, Mohr salt solution in flask.";
  if (vol < 20)
    return "Titration in progress: KMnO₄ oxidising Mohr salt (Fe²⁺ → Fe³⁺). Solution turning faint pink.";
  if (vol < 45)
    return "Nearing endpoint: excess KMnO₄ building up, solution turning pink/light purple.";
  return "ENDPOINT REACHED: Permanent pink/purple colour. KMnO₄ no longer decolourised.";
}
function getFlaskColor$1(vol) {
  if (vol <= 15) return "rgba(210,255,240,0.5)";
  if (vol <= 40) return "rgba(251,182,206,0.6)";
  return "rgba(216,180,254,0.7)";
}
const KMnO4TitrationTab = reactExports.memo(function KMnO4TitrationTab2() {
  const [volumeAdded, setVolumeAdded] = reactExports.useState(0);
  const [concentration, setConcentration] = reactExports.useState(0.05);
  const [isPouring, setIsPouring] = reactExports.useState(false);
  const [autoPouring, setAutoPouring] = reactExports.useState(false);
  const autoPourRef = reactExports.useRef(null);
  const pourTimerRef = reactExports.useRef(null);
  const endpointReached = volumeAdded >= 45;
  const flaskColor = getFlaskColor$1(volumeAdded);
  const buretteFill = 100 - volumeAdded / 50 * 100;
  const molesKMnO4 = (volumeAdded / 1e3 * concentration).toFixed(5);
  const pourDrop = reactExports.useCallback(() => {
    setVolumeAdded((v) => {
      const next = Math.min(50, v + 0.5);
      return next;
    });
    setIsPouring(true);
    if (pourTimerRef.current) clearTimeout(pourTimerRef.current);
    pourTimerRef.current = setTimeout(() => setIsPouring(false), 650);
  }, []);
  const startAutoPour = reactExports.useCallback(() => {
    setAutoPouring(true);
  }, []);
  const stopAutoPour = reactExports.useCallback(() => {
    setAutoPouring(false);
  }, []);
  const handleReset = reactExports.useCallback(() => {
    setAutoPouring(false);
    setVolumeAdded(0);
    setIsPouring(false);
  }, []);
  reactExports.useEffect(() => {
    if (autoPouring && !endpointReached) {
      autoPourRef.current = setInterval(() => {
        setVolumeAdded((v) => {
          if (v >= 50) {
            setAutoPouring(false);
            return 50;
          }
          return Math.min(50, v + 0.5);
        });
        setIsPouring(true);
        setTimeout(() => setIsPouring(false), 400);
      }, 300);
    } else {
      if (autoPourRef.current) {
        clearInterval(autoPourRef.current);
        autoPourRef.current = null;
      }
      if (endpointReached) setAutoPouring(false);
    }
    return () => {
      if (autoPourRef.current) clearInterval(autoPourRef.current);
    };
  }, [autoPouring, endpointReached]);
  reactExports.useEffect(() => {
    return () => {
      if (autoPourRef.current) clearInterval(autoPourRef.current);
      if (pourTimerRef.current) clearTimeout(pourTimerRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.kmno4.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: KMNO4_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TheoryPanel,
      {
        principle: "KMnO₄ (potassium permanganate) is a powerful oxidising agent. In acidic solution it oxidises Fe²⁺ ions (in Mohr salt) to Fe³⁺, and is itself reduced from Mn⁷⁺ (purple) to Mn²⁺ (colourless). Ionic equation: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. KMnO₄ is self-indicating — no separate indicator needed.",
        observations: "Before endpoint: each drop of KMnO₄ turns the solution pink/purple then immediately decolourises as Mn²⁺ forms. At endpoint: the final drop produces a faint permanent pink/purple that does NOT decolourise within 30 seconds — all Fe²⁺ has been consumed.",
        application: "Quantitative analysis of iron content in ores, pharmaceutical iron supplements, and water treatment chemicals. The technique (permanganometry) is also used in water treatment to determine oxidisable organic matter and Mn²⁺ concentration."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Burette — KMnO₄" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BuretteSVG, { fillPct: buretteFill, color: "rgba(147,51,234,0.75)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PourStreamKMnO4, { active: isPouring })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground/70", children: [
          volumeAdded.toFixed(1),
          " mL dispensed"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Flask — Mohr Salt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative",
            style: endpointReached ? { animation: "endpoint-pulse 1.2s ease-in-out infinite" } : {},
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FlaskSVG,
              {
                liquidColor: flaskColor,
                volumeAdded,
                endpointReached
              }
            )
          }
        ),
        endpointReached && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass rounded-lg px-3 py-1.5 text-center border border-purple-400/50",
            style: { animation: "badge-glow 1.2s ease-in-out infinite" },
            "data-ocid": "virtual_lab.kmno4.endpoint_badge",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-purple-300 font-bold", children: "🟣 Endpoint Reached!" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Volume Added" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground text-lg", children: volumeAdded.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "mL" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Moles KMnO₄" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground text-sm", children: molesKMnO4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "mol" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "font-semibold text-sm",
              endpointReached ? "text-purple-300" : "text-green-400"
            ),
            children: endpointReached ? "Endpoint" : "Titrating"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-reaction rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: volumeAdded,
          min: 0,
          max: 50,
          step: 0.5,
          onChange: (v) => setVolumeAdded(v),
          label: "Volume Added",
          unit: "mL",
          colorFrom: "rgba(147,51,234,0.6)",
          colorTo: "rgba(192,132,252,0.9)",
          "data-ocid": "virtual_lab.kmno4.volume_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: concentration,
          min: 0.01,
          max: 0.1,
          step: 0.01,
          onChange: setConcentration,
          label: "Concentration (M)",
          unit: "M",
          colorFrom: "rgba(139,92,246,0.6)",
          colorTo: "rgba(167,139,250,0.9)",
          "data-ocid": "virtual_lab.kmno4.conc_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: pourDrop,
            disabled: endpointReached,
            className: "glass px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-purple-500/15 transition-all disabled:opacity-40",
            "data-ocid": "virtual_lab.kmno4.pour_drop_button",
            children: "+ Pour Drop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: autoPouring ? stopAutoPour : startAutoPour,
            disabled: endpointReached,
            className: cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40",
              autoPouring ? "bg-purple-500/30 border border-purple-400/50 text-purple-200" : "glass text-foreground hover:bg-purple-500/15"
            ),
            "data-ocid": "virtual_lab.kmno4.auto_pour_button",
            children: autoPouring ? "⏹ Stop" : "▶ Auto Pour"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleReset,
            className: "glass px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-all",
            "data-ocid": "virtual_lab.kmno4.reset_button",
            children: "Reset"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl p-4 border-l-2 border-purple-400/40",
        "data-ocid": "virtual_lab.kmno4.step_display",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2", children: "Step-by-Step" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: getStep$1(volumeAdded) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center border border-purple-400/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Net Ionic Equation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground", children: "MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O" })
    ] })
  ] });
});
function getTemperatureStyle(temp) {
  if (temp < 0)
    return {
      liquidColor: "rgba(96,165,250,0.7)",
      boxShadow: "0 0 30px rgba(96,165,250,0.5)",
      shimmer: false
    };
  if (temp <= 25)
    return {
      liquidColor: "rgba(125,211,252,0.7)",
      boxShadow: "0 0 20px rgba(125,211,252,0.3)",
      shimmer: false
    };
  if (temp <= 75)
    return {
      liquidColor: "rgba(250,204,21,0.6)",
      boxShadow: "0 0 25px rgba(250,204,21,0.3)",
      shimmer: false
    };
  if (temp <= 150)
    return {
      liquidColor: "rgba(251,146,60,0.7)",
      boxShadow: "0 0 30px rgba(251,146,60,0.5)",
      shimmer: true
    };
  return {
    liquidColor: "rgba(239,68,68,0.8)",
    boxShadow: "0 0 40px rgba(239,68,68,0.6)",
    shimmer: true
  };
}
const MOHR_KEYFRAMES = `
@keyframes crystal-grow {
  0%   { transform: scale(0) rotate(0deg); opacity: 0; }
  60%  { transform: scale(1.1) rotate(20deg); opacity: 0.9; }
  100% { transform: scale(1) rotate(15deg); opacity: 1; }
}
@keyframes shimmer-wave {
  0%,100% { opacity: 0.85; }
  50%      { opacity: 1; }
}
@keyframes thermometer-fill {
  from { height: 0; }
}
`;
function getStage(temp, mixingTime, coolingRate) {
  if (temp <= 20) return "dissolving";
  if (temp <= 100) return "heating";
  if (temp > 100 && mixingTime > 15) {
    if (coolingRate !== "slow" && mixingTime > 30) return "done";
    if (coolingRate !== "slow") return "cooling";
    return "crystallizing";
  }
  return "crystallizing";
}
function getStageLabel(stage) {
  switch (stage) {
    case "dissolving":
      return "Dissolving ferrous ammonium sulphate in dilute H₂SO₄";
    case "heating":
      return "Heating the solution to remove excess acid and concentrate";
    case "crystallizing":
      return "Crystals forming! Mohr salt crystallising from hot solution";
    case "cooling":
      return "Cooling — crystals growing and solidifying";
    case "done":
      return "✅ Mohr salt crystals ready. Filter and dry on filter paper.";
  }
}
function getStageColor(stage) {
  switch (stage) {
    case "dissolving":
      return "text-cyan-400";
    case "heating":
      return "text-yellow-400";
    case "crystallizing":
      return "text-emerald-400";
    case "cooling":
      return "text-blue-400";
    case "done":
      return "text-green-300";
  }
}
const ThermometerSVG = reactExports.memo(function ThermometerSVG2({
  temp
}) {
  const maxTemp = 300;
  const pct = Math.min(100, temp / maxTemp * 100);
  const fillH = 140 * pct / 100;
  const mercuryColor = pct < 30 ? "rgba(96,165,250,0.85)" : pct < 60 ? "rgba(250,204,21,0.85)" : "rgba(239,68,68,0.9)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: 24,
      height: 170,
      viewBox: "0 0 24 170",
      role: "img",
      "aria-label": "thermometer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 9,
            y: 4,
            width: 6,
            height: 148,
            rx: 3,
            fill: "rgba(150,200,255,0.1)",
            stroke: "rgba(150,200,255,0.3)",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 10.5,
            y: 152 - fillH,
            width: 3,
            height: fillH,
            rx: 1.5,
            fill: mercuryColor,
            style: { transition: "all 0.6s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: 12,
            cy: 156,
            r: 8,
            fill: mercuryColor,
            stroke: "rgba(150,200,255,0.3)",
            strokeWidth: 1.5,
            style: { transition: "fill 0.6s ease" }
          }
        ),
        [25, 50, 75].map((pctMark) => {
          const y = 152 - 140 * pctMark / 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: 15,
              y1: y,
              x2: 20,
              y2: y,
              stroke: "rgba(150,200,255,0.25)",
              strokeWidth: 0.8
            },
            pctMark
          );
        })
      ]
    }
  );
});
const Crystals = reactExports.memo(function Crystals2({ active }) {
  const crystals = reactExports.useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 12 + i * 16,
      delay: i * 0.15,
      size: 8 + i % 3 * 3
    })),
    []
  );
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-0 right-0 flex justify-center gap-2 pointer-events-none", children: crystals.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        width: c.size,
        height: c.size,
        background: "linear-gradient(135deg, rgba(167,243,208,0.9), rgba(52,211,153,0.7))",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        animation: `crystal-grow 0.6s ease-out ${c.delay}s both`
      }
    },
    c.id
  )) });
});
const BeakerSVGMohr = reactExports.memo(function BeakerSVGMohr2({
  liquidColor,
  boxShadow,
  shimmer,
  stage
}) {
  const w = 100;
  const h = 120;
  const liquidPct = 65;
  const liquidH = h * 0.75 * liquidPct / 100;
  const liquidY = h - liquidH;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: w + 4, height: h + 20 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: w + 4,
        height: h + 16,
        viewBox: `-2 -2 ${w + 4} ${h + 16}`,
        role: "img",
        "aria-label": "beaker",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: 4,
              y: liquidY,
              width: w - 8,
              height: liquidH,
              rx: 2,
              fill: liquidColor,
              style: {
                transition: "fill 0.6s ease",
                animation: shimmer ? "shimmer-wave 1.5s ease-in-out infinite" : "none"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: 0,
              y: 0,
              width: w,
              height: h,
              rx: 4,
              fill: "none",
              stroke: "rgba(150,200,255,0.35)",
              strokeWidth: 2.5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M0,0 L-8,8 M0,0 L4,0",
              fill: "none",
              stroke: "rgba(150,200,255,0.3)",
              strokeWidth: 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: 3,
              y1: 6,
              x2: 3,
              y2: h - 6,
              stroke: "rgba(255,255,255,0.09)",
              strokeWidth: 1.5,
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 rounded pointer-events-none",
        style: { boxShadow, transition: "box-shadow 0.6s ease" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Crystals,
      {
        active: stage === "crystallizing" || stage === "cooling" || stage === "done"
      }
    )
  ] });
});
const MohrSaltPrepTab = reactExports.memo(function MohrSaltPrepTab2() {
  const [temperature, setTemperature] = reactExports.useState(25);
  const [mixingTime, setMixingTime] = reactExports.useState(0);
  const [coolingRate, setCoolingRate] = reactExports.useState(
    "slow"
  );
  const stage = getStage(temperature, mixingTime, coolingRate);
  const { liquidColor, boxShadow, shimmer } = getTemperatureStyle(temperature);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.mohr.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: MOHR_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-end justify-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Reaction Beaker" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BeakerSVGMohr,
          {
            liquidColor,
            boxShadow,
            shimmer,
            stage
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Thermometer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThermometerSVG, { temp: temperature }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm text-foreground/80", children: [
          temperature,
          "°C"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Current Stage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-semibold text-sm", getStageColor(stage)), children: getStageLabel(stage) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-reaction rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: temperature,
          min: 0,
          max: 300,
          step: 5,
          onChange: setTemperature,
          label: "Temperature",
          unit: "°C",
          colorFrom: "rgba(56,189,248,0.7)",
          colorTo: "rgba(239,68,68,0.9)",
          "data-ocid": "virtual_lab.mohr.temp_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: mixingTime,
          min: 0,
          max: 60,
          step: 1,
          onChange: setMixingTime,
          label: "Mixing Time",
          unit: "min",
          colorFrom: "rgba(52,211,153,0.7)",
          colorTo: "rgba(20,184,166,0.9)",
          "data-ocid": "virtual_lab.mohr.mixing_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-2", children: "Cooling Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["slow", "medium", "fast"].map((rate) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setCoolingRate(rate),
            className: cn(
              "flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
              coolingRate === rate ? "bg-primary/20 border border-primary/40 text-foreground" : "glass text-muted-foreground hover:text-foreground hover:bg-card/30"
            ),
            "data-ocid": `virtual_lab.mohr.cooling_${rate}`,
            children: rate.charAt(0).toUpperCase() + rate.slice(1)
          },
          rate
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Temperature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-bold text-foreground", children: [
          temperature,
          "°C"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Mix Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-bold text-foreground", children: [
          mixingTime,
          " min"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Cooling" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground capitalize", children: coolingRate })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 border border-border/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1", children: "Step 1 — Dissolution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-foreground", children: "FeSO₄·7H₂O + (NH₄)₂SO₄ → FeSO₄·(NH₄)₂SO₄·6H₂O↓" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 border border-border/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1", children: "Formula — Mohr Salt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-foreground", children: "(NH₄)₂Fe(SO₄)₂·6H₂O — Double salt, pale green crystals" })
      ] })
    ] })
  ] });
});
const NAOH_KEYFRAMES = `
@keyframes naoh-pour-stream {
  0%   { transform: scaleY(0) translateX(-50%); opacity: 0; }
  15%  { transform: scaleY(1) translateX(-50%); opacity: 0.85; }
  85%  { transform: scaleY(1) translateX(-50%); opacity: 0.75; }
  100% { transform: scaleY(0.2) translateX(-50%); opacity: 0; }
}
@keyframes pink-endpoint-pulse {
  0%,100% { box-shadow: 0 0 10px 2px rgba(252,196,213,0.4); }
  50%      { box-shadow: 0 0 28px 10px rgba(252,196,213,0.7); }
}
@keyframes indicator-drop {
  0%   { transform: translateY(-20px) scale(0.5); opacity: 0; }
  60%  { transform: translateY(4px) scale(1.1); opacity: 0.9; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
`;
function getFlaskColor(vol, indicatorAdded) {
  if (!indicatorAdded) return "rgba(220,252,231,0.5)";
  if (vol <= 42) return "rgba(220,252,231,0.5)";
  return "rgba(252,196,213,0.75)";
}
function getStep(vol, indicatorAdded, endpointReached) {
  if (vol === 0 && !indicatorAdded)
    return "Initial setup: oxalic acid in flask, NaOH solution in burette. Add phenolphthalein indicator.";
  if (!indicatorAdded)
    return "Add phenolphthalein indicator before starting titration. Solution should remain colourless in acid.";
  if (endpointReached)
    return "✅ ENDPOINT: Permanent faint pink colour (phenolphthalein). All oxalic acid neutralised by NaOH.";
  if (vol < 20)
    return `${vol.toFixed(1)} mL NaOH added. Oxalic acid still in excess. Indicator colourless — no endpoint yet.`;
  if (vol < 42)
    return `${vol.toFixed(1)} mL NaOH added. Approaching equivalence point. Watch for first permanent pink colour.`;
  return "Near endpoint — next drop may complete neutralisation.";
}
const NaOHBuretteSVG = reactExports.memo(function NaOHBuretteSVG2({
  fillPct
}) {
  const w = 28;
  const h = 180;
  const tipH = 18;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: w + 16,
      height: h + tipH + 8,
      viewBox: `-8 -4 ${w + 16} ${h + tipH + 8}`,
      role: "img",
      "aria-label": "NaOH burette",
      children: [
        [20, 40, 60, 80].map((pct) => {
          const y = 4 + h * pct / 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: w,
                y1: y,
                x2: w + 5,
                y2: y,
                stroke: "rgba(180,200,255,0.3)",
                strokeWidth: 0.8
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: w + 7,
                y: y + 3,
                fontSize: "5.5",
                fill: "rgba(160,180,220,0.4)",
                children: pct
              }
            )
          ] }, pct);
        }),
        fillPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 2,
            y: 4 + h * (100 - fillPct) / 100,
            width: w - 4,
            height: h * fillPct / 100,
            fill: "rgba(200,230,255,0.4)",
            rx: 2,
            style: { transition: "all 0.5s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 0,
            y: 4,
            width: w,
            height: h,
            rx: 4,
            fill: "none",
            stroke: "rgba(150,200,255,0.35)",
            strokeWidth: 2.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: w / 2 - 7,
            y: h,
            width: 14,
            height: 6,
            rx: 2,
            fill: "rgba(100,150,200,0.2)",
            stroke: "rgba(150,200,255,0.3)",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: `M${w / 2 - 2.5},${h + 6} L${w / 2 + 2.5},${h + 6} L${w / 2 + 1},${h + tipH} L${w / 2 - 1},${h + tipH} Z`,
            fill: "none",
            stroke: "rgba(150,200,255,0.35)",
            strokeWidth: 1.5
          }
        )
      ]
    }
  );
});
const OxalicFlaskSVG = reactExports.memo(function OxalicFlaskSVG2({
  liquidColor,
  endpointReached,
  indicatorAdded
}) {
  const w = 100;
  const h = 120;
  const neckW = 28;
  const neckH = 32;
  const cx = w / 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: w + 4,
      height: h + 12,
      viewBox: `-2 -2 ${w + 4} ${h + 12}`,
      role: "img",
      "aria-label": "oxalic acid flask",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "flask-clip-naoh", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: `M${cx - neckW / 2},0 L${cx + neckW / 2},0 L${cx + neckW / 2},${neckH} L${w},${h} Q${cx},${h + 8} 0,${h} L${cx - neckW / 2},${neckH} Z`
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 0,
            y: h - (h - neckH) * 0.7 + neckH - (h - neckH),
            width: w,
            height: (h - neckH) * 0.7,
            fill: liquidColor,
            clipPath: "url(#flask-clip-naoh)",
            style: { transition: "fill 0.7s ease" }
          }
        ),
        indicatorAdded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx,
            cy: neckH + 20,
            r: 5,
            fill: "rgba(252,196,213,0.6)",
            style: { animation: "indicator-drop 0.5s ease-out both" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: `M${cx - neckW / 2},0 L${cx - neckW / 2},${neckH} L0,${h} Q${cx},${h + 8} ${w},${h} L${cx + neckW / 2},${neckH} L${cx + neckW / 2},0`,
            fill: "none",
            stroke: "rgba(150,200,255,0.38)",
            strokeWidth: 2.5,
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: cx - neckW / 2,
            y1: 0,
            x2: cx + neckW / 2,
            y2: 0,
            stroke: "rgba(150,200,255,0.3)",
            strokeWidth: 2
          }
        ),
        endpointReached && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx,
            cy: h - 8,
            rx: 42,
            ry: 12,
            fill: "rgba(252,196,213,0.12)",
            stroke: "rgba(252,196,213,0.45)",
            strokeWidth: 1.5,
            style: { animation: "pink-endpoint-pulse 1.3s ease-in-out infinite" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: cx - neckW / 2 + 2,
            y1: 4,
            x2: 8,
            y2: h - 8,
            stroke: "rgba(255,255,255,0.08)",
            strokeWidth: 1.5,
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
});
const NaOHPourStream = reactExports.memo(function NaOHPourStream2({
  active
}) {
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute pointer-events-none",
      style: {
        bottom: -40,
        left: "50%",
        transform: "translateX(-50%)",
        width: 4,
        height: 40,
        background: "linear-gradient(to bottom, rgba(200,230,255,0.9), rgba(200,230,255,0.1))",
        borderRadius: 2,
        transformOrigin: "top center",
        animation: "naoh-pour-stream 0.6s ease-in-out"
      }
    }
  );
});
const NaOHOxalicTab = reactExports.memo(function NaOHOxalicTab2() {
  const [volumeAdded, setVolumeAdded] = reactExports.useState(0);
  const [concentration, setConcentration] = reactExports.useState(0.1);
  const [indicatorAdded, setIndicatorAdded] = reactExports.useState(false);
  const [isPouring, setIsPouring] = reactExports.useState(false);
  const [autoPouring, setAutoPouring] = reactExports.useState(false);
  const autoPourRef = reactExports.useRef(null);
  const pourTimerRef = reactExports.useRef(null);
  const endpointReached = volumeAdded > 42 && indicatorAdded;
  const flaskColor = getFlaskColor(volumeAdded, indicatorAdded);
  const buretteFill = 100 - volumeAdded / 50 * 100;
  const completionPct = Math.min(100, volumeAdded / 42 * 100).toFixed(1);
  const molesNaOH = (volumeAdded / 1e3 * concentration * 2).toFixed(5);
  const pourDrop = reactExports.useCallback(() => {
    setVolumeAdded((v) => Math.min(50, v + 0.5));
    setIsPouring(true);
    if (pourTimerRef.current) clearTimeout(pourTimerRef.current);
    pourTimerRef.current = setTimeout(() => setIsPouring(false), 600);
  }, []);
  const handleReset = reactExports.useCallback(() => {
    setAutoPouring(false);
    setVolumeAdded(0);
    setIndicatorAdded(false);
    setIsPouring(false);
  }, []);
  reactExports.useEffect(() => {
    if (autoPouring && !endpointReached) {
      autoPourRef.current = setInterval(() => {
        setVolumeAdded((v) => {
          if (v >= 50) {
            setAutoPouring(false);
            return 50;
          }
          return Math.min(50, v + 0.5);
        });
        setIsPouring(true);
        setTimeout(() => setIsPouring(false), 400);
      }, 300);
    } else {
      if (autoPourRef.current) {
        clearInterval(autoPourRef.current);
        autoPourRef.current = null;
      }
      if (endpointReached) setAutoPouring(false);
    }
    return () => {
      if (autoPourRef.current) clearInterval(autoPourRef.current);
    };
  }, [autoPouring, endpointReached]);
  reactExports.useEffect(() => {
    return () => {
      if (autoPourRef.current) clearInterval(autoPourRef.current);
      if (pourTimerRef.current) clearTimeout(pourTimerRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.naoh.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: NAOH_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TheoryPanel,
      {
        principle: "Oxalic acid (H₂C₂O₄) is a diprotic weak acid — it donates two protons. NaOH is a strong base. Neutralisation: H₂C₂O₄ + 2NaOH → Na₂C₂O₄ + 2H₂O. Phenolphthalein indicator is colourless in acidic/neutral solution and turns pink in alkaline solution (pH > 8.2), marking the endpoint when excess NaOH is just present.",
        observations: "Before endpoint: solution remains colourless even with phenolphthalein added (still acidic or neutral). At endpoint: the last drop of NaOH produces a faint but persistent pink that does not fade within 30 seconds — all oxalic acid has been neutralised.",
        application: "Pharmaceutical standardisation — NaOH solutions must be standardised with a primary standard acid before analytical use. Oxalic acid is the preferred primary standard: stable, pure, and inexpensive. Used in quality control for antacids, detergents, and cleaning agents."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-end justify-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Burette — NaOH" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NaOHBuretteSVG, { fillPct: buretteFill }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NaOHPourStream, { active: isPouring })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground/70", children: [
          volumeAdded.toFixed(1),
          " mL dispensed"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Flask — Oxalic Acid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OxalicFlaskSVG,
          {
            liquidColor: flaskColor,
            endpointReached,
            indicatorAdded
          }
        ),
        endpointReached && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass rounded-lg px-3 py-1.5 text-center border border-pink-400/50",
            style: {
              animation: "pink-endpoint-pulse 1.3s ease-in-out infinite"
            },
            "data-ocid": "virtual_lab.naoh.endpoint_badge",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-pink-300 font-bold", children: "🩷 Endpoint Reached!" })
          }
        ),
        !indicatorAdded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-lg px-3 py-1.5 text-[10px] text-muted-foreground text-center", children: "Add indicator first" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Vol Added" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground text-lg", children: volumeAdded.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "mL NaOH" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Moles NaOH" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground text-sm", children: molesNaOH }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "mol" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Completion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "font-bold text-sm",
              endpointReached ? "text-pink-300" : "text-green-400"
            ),
            children: [
              completionPct,
              "%"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-reaction rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: volumeAdded,
          min: 0,
          max: 50,
          step: 0.5,
          onChange: setVolumeAdded,
          label: "Volume NaOH Added",
          unit: "mL",
          colorFrom: "rgba(56,189,248,0.7)",
          colorTo: "rgba(99,179,237,0.9)",
          "data-ocid": "virtual_lab.naoh.volume_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: concentration,
          min: 0.05,
          max: 0.5,
          step: 0.05,
          onChange: setConcentration,
          label: "Concentration",
          unit: "M",
          colorFrom: "rgba(52,211,153,0.7)",
          colorTo: "rgba(20,184,166,0.9)",
          "data-ocid": "virtual_lab.naoh.conc_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
        !indicatorAdded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIndicatorAdded(true),
            className: "glass px-4 py-2.5 rounded-xl text-sm font-semibold text-pink-300 hover:bg-pink-500/15 border border-pink-400/30 transition-all",
            "data-ocid": "virtual_lab.naoh.add_indicator_button",
            children: "🧪 Add Indicator"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: pourDrop,
            disabled: endpointReached || !indicatorAdded,
            className: "glass px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-blue-500/15 transition-all disabled:opacity-40",
            "data-ocid": "virtual_lab.naoh.pour_drop_button",
            children: "+ Pour Drop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setAutoPouring((p) => !p),
            disabled: endpointReached || !indicatorAdded,
            className: cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40",
              autoPouring ? "bg-blue-500/30 border border-blue-400/50 text-blue-200" : "glass text-foreground hover:bg-blue-500/15"
            ),
            "data-ocid": "virtual_lab.naoh.auto_pour_button",
            children: autoPouring ? "⏹ Stop" : "▶ Auto Pour"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleReset,
            className: "glass px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-all",
            "data-ocid": "virtual_lab.naoh.reset_button",
            children: "Reset"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl p-4 border-l-2 border-blue-400/40",
        "data-ocid": "virtual_lab.naoh.step_display",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2", children: "Step-by-Step" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: getStep(volumeAdded, indicatorAdded, endpointReached) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center border border-blue-400/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wider", children: "Balanced Equation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground", children: "H₂C₂O₄ + 2NaOH → Na₂C₂O₄ + 2H₂O" })
    ] })
  ] });
});
const DAY_STEPS = [
  { day: 0, label: "Day 0: Clean nail, metallic silver surface" },
  { day: 2, label: "Day 2: Tiny reddish-orange spots appear" },
  { day: 5, label: "Day 5: Rust spreads, surface darkens" },
  { day: 7, label: "Day 7: Heavily rusted, flaky brown coating" }
];
const CONDITIONS = [
  {
    id: "normal",
    label: "Water + Air",
    desc: "Normal conditions",
    rusts: true
  },
  { id: "no-water", label: "No Water", desc: "Dry air only", rusts: false },
  {
    id: "no-air",
    label: "No Air (boiled water)",
    desc: "No dissolved O₂",
    rusts: false
  }
];
const RustNailSVG = reactExports.memo(function RustNailSVG2({
  day,
  rusts
}) {
  const t = rusts ? day / 7 : 0;
  const r = Math.round(200 + (rusts ? t * (160 - 200) : 0));
  const g = Math.round(200 + (rusts ? t * (80 - 200) : 0));
  const b = Math.round(210 + (rusts ? t * (30 - 210) : 0));
  const nailColor = `rgb(${r},${g},${b})`;
  const SPOTS = [
    { cx: 38, cy: 55, r: 4 },
    { cx: 42, cy: 75, r: 5 },
    { cx: 35, cy: 90, r: 3.5 },
    { cx: 40, cy: 110, r: 6 },
    { cx: 36, cy: 130, r: 4.5 },
    { cx: 43, cy: 148, r: 5 },
    { cx: 37, cy: 165, r: 3 },
    { cx: 41, cy: 38, r: 3 }
  ];
  const spotOpacity = rusts ? Math.min(1, day / 2 * 0.5) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: 80,
      height: 220,
      viewBox: "0 0 80 220",
      "aria-label": "Iron nail",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: 40,
            cy: 20,
            rx: 18,
            ry: 5,
            fill: nailColor,
            style: { transition: "fill 1.5s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 36,
            y: 20,
            width: 8,
            height: 180,
            rx: 3,
            fill: nailColor,
            style: { transition: "fill 1.5s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: "36,200 44,200 40,215",
            fill: nailColor,
            style: { transition: "fill 1.5s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 38,
            y: 24,
            width: 2.5,
            height: 160,
            rx: 1,
            fill: "rgba(255,255,255,0.18)"
          }
        ),
        SPOTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: s.cx,
            cy: s.cy,
            rx: s.r * Math.min(1, day / 3),
            ry: s.r * 0.6 * Math.min(1, day / 3),
            fill: `rgba(180,70,20,${spotOpacity})`,
            style: { transition: "all 1.5s ease" }
          },
          `${s.cx}-${s.cy}`
        )),
        rusts && day >= 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 35,
            y: 22,
            width: 10,
            height: 178,
            rx: 4,
            fill: `rgba(160,60,15,${Math.min(0.55, (day - 5) / 2 * 0.55)})`,
            style: { transition: "all 1.5s ease" }
          }
        )
      ]
    }
  );
});
const TestTubeWithNail = reactExports.memo(function TestTubeWithNail2({
  day,
  condition
}) {
  const hasWater = condition !== "no-water";
  const waterColor = day > 4 && condition === "normal" ? "rgba(180,120,60,0.35)" : "rgba(56,189,248,0.30)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: 100,
        height: 230,
        viewBox: "0 0 100 230",
        className: "absolute top-0 left-1/2 -translate-x-1/2",
        role: "img",
        "aria-label": "Test tube containing nail",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Test tube with iron nail" }),
          hasWater && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: 16,
              y: 100,
              width: 68,
              height: 118,
              rx: 4,
              fill: waterColor,
              style: { transition: "fill 1.5s ease" }
            }
          ),
          hasWater && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: 50,
              cy: 218,
              rx: 34,
              ry: 6,
              fill: waterColor,
              style: { transition: "fill 1.5s ease" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: 14,
              y: 0,
              width: 72,
              height: 218,
              rx: 8,
              fill: "none",
              stroke: "rgba(150,200,255,0.35)",
              strokeWidth: 3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: 50,
              cy: 218,
              rx: 36,
              ry: 7,
              fill: "none",
              stroke: "rgba(150,200,255,0.3)",
              strokeWidth: 3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: 20,
              y1: 8,
              x2: 20,
              y2: 200,
              stroke: "rgba(255,255,255,0.1)",
              strokeWidth: 2,
              strokeLinecap: "round"
            }
          ),
          condition === "no-water" && /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 22, y: 80, fontSize: "9", fill: "rgba(200,200,200,0.5)", children: "Dry air" }),
          condition === "no-air" && /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 22, y: 80, fontSize: "9", fill: "rgba(200,200,200,0.5)", children: "Boiled" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RustNailSVG, { day, rusts: condition === "normal" }) })
  ] });
});
const RustingTab = reactExports.memo(function RustingTab2() {
  const [day, setDay] = reactExports.useState(0);
  const [condition, setCondition] = reactExports.useState("normal");
  const currentStep = DAY_STEPS.slice().reverse().find((s) => s.day <= day) ?? DAY_STEPS[0];
  const rusts = condition === "normal";
  const rustDesc = rusts ? currentStep.label : "No rust forms — one of the required conditions (water AND air) is absent.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.rusting.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TheoryPanel,
      {
        principle: "Rusting is an electrochemical process requiring both water (moisture) and dissolved oxygen. Iron acts as an anode (oxidised: Fe → Fe²⁺ + 2e⁻) while oxygen at the cathode is reduced (O₂ + 2H₂O + 4e⁻ → 4OH⁻). The ions combine to form Fe(OH)₂, which is further oxidised to hydrated iron(III) oxide — rust (Fe₂O₃·3H₂O).",
        observations: "Gradual orange-brown discolouration starting at surface imperfections. Texture becomes flaky over days. Removing either water (dry box) or dissolved oxygen (boiled water, sealed) completely stops rust formation — confirming both are required.",
        application: "Understanding rusting drives corrosion prevention: galvanising (zinc coating), painting, cathodic protection (sacrificial anodes on ships and pipelines), and stainless steel alloys (chromium forms a passive oxide layer). Annual global cost of corrosion exceeds $2.5 trillion."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 items-end justify-items-center", children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "text-[10px] font-semibold uppercase tracking-wider text-center leading-tight",
            condition === c.id ? "text-foreground" : "text-muted-foreground/60"
          ),
          children: c.label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: cn(
            "rounded-2xl p-1 transition-all duration-300 cursor-pointer bg-transparent border-0",
            condition === c.id ? "ring-2 ring-primary/50 bg-primary/5" : "opacity-60 hover:opacity-80"
          ),
          onClick: () => setCondition(c.id),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestTubeWithNail, { day, condition: c.id })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "text-[9px] text-center leading-tight max-w-[80px]",
            c.rusts ? "text-orange-400/80" : "text-green-400/80"
          ),
          children: c.rusts ? "Rusts ✓" : "No rust ✗"
        }
      )
    ] }, c.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          min: 0,
          max: 7,
          step: 0.5,
          value: day,
          onChange: setDay,
          label: "Simulation Time",
          unit: " days",
          colorFrom: "rgba(251,146,60,0.7)",
          colorTo: "rgba(180,70,20,0.9)",
          "data-ocid": "virtual_lab.rusting.day_slider",
          "aria-label": "Rusting simulation days"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between text-[9px] text-muted-foreground/60", children: DAY_STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Day ",
        s.day
      ] }, s.day)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setCondition(c.id),
        className: cn(
          "glass rounded-xl px-3 py-3 text-center transition-all duration-200",
          condition === c.id ? "ring-2 ring-primary/50 bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-card/30"
        ),
        "data-ocid": `virtual_lab.rusting.condition_${c.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold leading-tight", children: c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] mt-0.5 opacity-70", children: c.desc })
        ]
      },
      c.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl p-4 border-l-2 border-primary/40",
        "data-ocid": "virtual_lab.rusting.explanation",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-2", children: rusts ? "Observation" : "Why no rust?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: rustDesc }),
          rusts && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 glass rounded-lg p-3 font-mono text-sm text-center text-foreground/90", children: "4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → 2Fe₂O₃·3H₂O (rust)" }),
          !rusts && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
            "Rusting requires ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "both" }),
            " ",
            "water (moisture) and oxygen. Remove either one and the electrochemical corrosion process cannot proceed."
          ] })
        ]
      }
    )
  ] });
});
const SOLUBILITY_KEYFRAMES = `
@keyframes particle-dissolve {
  0%   { transform: scale(1);    opacity: 0.85; }
  100% { transform: scale(0);    opacity: 0; }
}
@keyframes particle-settle {
  0%   { transform: translateY(0); opacity: 0.9; }
  100% { transform: translateY(40px); opacity: 0.7; }
}
@keyframes shimmer-beaker {
  0%,100% { opacity: 0.8; }
  50%      { opacity: 1; }
}
`;
const SOLUTES = [
  {
    id: "nacl",
    name: "NaCl",
    formula: "Salt",
    color: "rgba(255,255,255,0.7)",
    satAt25: 36,
    tempCoeff: 0.4
  },
  {
    id: "kno3",
    name: "KNO₃",
    formula: "Potassium Nitrate",
    color: "rgba(200,220,255,0.7)",
    satAt25: 31,
    tempCoeff: 6.5
  },
  {
    id: "cuso4",
    name: "CuSO₄",
    formula: "Copper Sulfate",
    color: "rgba(56,189,248,0.75)",
    satAt25: 20,
    tempCoeff: 1.8
  },
  {
    id: "sugar",
    name: "C₁₂H₂₂O₁₁",
    formula: "Sucrose",
    color: "rgba(251,191,36,0.6)",
    satAt25: 200,
    tempCoeff: 8
  }
];
function genParticles(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: 15 + i % 8 * 9 + Math.floor(i / 8) % 2 * 4,
    y: 20 + Math.floor(i / 8) * 12,
    dissolved: false,
    precipitate: false
  }));
}
const SolubilityBeaker = reactExports.memo(function SolubilityBeaker2({
  dissolved,
  satLimit,
  solute,
  tempPct,
  particles
}) {
  const excessG = Math.max(0, dissolved - satLimit);
  const solventColor = tempPct < 30 ? "rgba(56,189,248,0.30)" : tempPct < 65 ? "rgba(56,189,248,0.25)" : "rgba(251,146,60,0.25)";
  const mixFrac = Math.min(1, dissolved / Math.max(1, satLimit));
  const soluteRGB = solute.color;
  const beakerGlow = tempPct < 30 ? "0 0 12px rgba(56,189,248,0.25)" : tempPct < 65 ? "0 0 12px rgba(251,191,36,0.2)" : "0 0 18px rgba(251,146,60,0.35)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-b-2xl border border-border/30 overflow-hidden mx-auto",
      style: {
        width: 120,
        height: 140,
        background: solventColor,
        boxShadow: beakerGlow,
        transition: "background 0.6s ease, box-shadow 0.5s ease"
      },
      "aria-label": "Beaker with solute",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: soluteRGB.replace(
                /[\d.]+\)$/,
                `${(mixFrac * 0.3).toFixed(2)})`
              ),
              transition: "background 0.8s ease"
            }
          }
        ),
        particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-sm pointer-events-none",
            style: {
              width: 5,
              height: 5,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: solute.color,
              animation: p.dissolved ? "particle-dissolve 0.8s ease forwards" : p.precipitate ? "particle-settle 0.7s ease forwards" : "none",
              opacity: p.dissolved || p.precipitate ? void 0 : 0.85
            }
          },
          p.id
        )),
        excessG > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 right-0 rounded-b-2xl",
            style: {
              height: Math.min(30, excessG * 0.6),
              background: solute.color.replace(/[\d.]+\)$/, "0.65)"),
              transition: "height 0.8s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
              animation: "shimmer-beaker 2s ease-in-out infinite"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-b-2xl pointer-events-none",
            style: {
              border: "2px solid rgba(150,200,255,0.30)",
              borderTop: "none"
            }
          }
        )
      ]
    }
  );
});
const SolubilityTab = reactExports.memo(function SolubilityTab2() {
  const [soluteId, setSoluteId] = reactExports.useState("nacl");
  const [dissolved, setDissolved] = reactExports.useState(0);
  const [tempPct, setTempPct] = reactExports.useState(25);
  const particleCounterRef = reactExports.useRef(0);
  const [particles, setParticles] = reactExports.useState([]);
  const solute = reactExports.useMemo(
    () => SOLUTES.find((s) => s.id === soluteId),
    [soluteId]
  );
  const tempC = Math.round(tempPct);
  const satLimit = Math.round(
    solute.satAt25 + (tempC - 25) / 10 * solute.tempCoeff
  );
  const state = dissolved === 0 ? "empty" : dissolved < satLimit * 0.9 ? "unsaturated" : dissolved <= satLimit ? "saturated" : "supersaturated";
  const stateColor = {
    empty: "text-muted-foreground",
    unsaturated: "text-green-400",
    saturated: "text-yellow-400",
    supersaturated: "text-red-400"
  }[state];
  const stateLabel = {
    empty: "No solute added",
    unsaturated: "Unsaturated — dissolves fully",
    saturated: "Saturated — at limit",
    supersaturated: "Supersaturated — excess precipitates!"
  }[state];
  reactExports.useEffect(() => {
    const n = Math.min(48, Math.round(dissolved / 2));
    const allParticles = genParticles(n).map((p) => ({
      ...p,
      id: ++particleCounterRef.current,
      dissolved: dissolved <= satLimit,
      precipitate: dissolved > satLimit && p.y > 60
    }));
    setParticles(allParticles);
  }, [dissolved, satLimit]);
  const handleSoluteChange = reactExports.useCallback((id) => {
    setSoluteId(id);
    setDissolved(0);
  }, []);
  const tempColorFrom = tempPct < 30 ? "rgba(56,189,248,0.7)" : tempPct < 65 ? "rgba(251,191,36,0.7)" : "rgba(239,68,68,0.75)";
  const tempColorTo = tempPct < 30 ? "rgba(99,179,237,0.9)" : tempPct < 65 ? "rgba(251,146,60,0.9)" : "rgba(239,68,68,0.95)";
  const tempIcon = tempPct < 30 ? "❄️" : tempPct < 65 ? "🌡️" : "🔥";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.solubility.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: SOLUBILITY_KEYFRAMES }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SolubilityBeaker,
        {
          dissolved,
          satLimit,
          solute,
          tempPct,
          particles
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 w-full max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1", children: "Added" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-foreground", children: dissolved }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: "g" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1", children: "Sat. Limit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-yellow-300", children: satLimit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: "g/100mL" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-1", children: "Temp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-foreground", children: tempC }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: "°C" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "glass rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-500",
            stateColor
          ),
          children: stateLabel
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: SOLUTES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleSoluteChange(s.id),
        className: cn(
          "glass rounded-xl px-3 py-2.5 text-center transition-all duration-200",
          soluteId === s.id ? "ring-2 ring-primary/50 bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-card/30"
        ),
        "data-ocid": `virtual_lab.solubility.solute_${s.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-xs", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] mt-0.5 opacity-70 leading-tight", children: s.formula })
        ]
      },
      s.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          min: 0,
          max: Math.round(satLimit * 2),
          step: 1,
          value: dissolved,
          onChange: setDissolved,
          label: "Solute Amount",
          unit: "g",
          colorFrom: "rgba(52,211,153,0.7)",
          colorTo: "rgba(56,189,248,0.9)",
          "data-ocid": "virtual_lab.solubility.amount_slider",
          "aria-label": "Solute amount"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          min: 0,
          max: 100,
          step: 1,
          value: tempPct,
          onChange: setTempPct,
          label: `${tempIcon} Temperature`,
          unit: "°C",
          colorFrom: tempColorFrom,
          colorTo: tempColorTo,
          "data-ocid": "virtual_lab.solubility.temp_slider",
          "aria-label": "Temperature"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground/70", children: [
        "Saturation limit of ",
        solute.name,
        " changes with temperature. Raise the temperature to dissolve more!"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border-l-2 border-primary/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-2", children: "Solubility Concepts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80 leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Unsaturated:" }),
        " Solute dissolves completely — more can be added.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Saturated:" }),
        " Maximum solute dissolved at that temperature.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Supersaturated:" }),
        " Excess solute sinks as precipitate. Most ionic solids become more soluble at higher temperatures (positive solubility curve)."
      ] })
    ] })
  ] });
});
const HEATING_CHEMICALS = [
  {
    id: "caco3",
    label: "CaCO₃",
    formula: "Calcium Carbonate",
    threshold: 840,
    color: "#e8e8e8",
    reactionColor: "#f5f0e8",
    gasColor: "rgba(200,200,220,0.6)",
    equation: "CaCO₃ → CaO + CO₂↑",
    observation: "White powder glows faintly, CO₂ gas bubbles rise, solid shrinks as CaO forms",
    explanation: "At 840°C, thermal energy breaks the C–O bond in carbonate. Calcium oxide (quicklime) remains and carbon dioxide escapes."
  },
  {
    id: "kmno4",
    label: "KMnO₄",
    formula: "Potassium Permanganate",
    threshold: 240,
    color: "#7b2d8b",
    reactionColor: "#2d2d2d",
    gasColor: "rgba(220,150,50,0.5)",
    equation: "2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑",
    observation: "Deep purple solid turns dark green/black, oxygen gas evolves, mixture darkens",
    explanation: "Manganese is reduced from +7 to +6 (manganate) and +4 (MnO₂). Oxygen is released from the unstable permanganate."
  },
  {
    id: "nh4cl",
    label: "NH₄Cl",
    formula: "Ammonium Chloride",
    threshold: 338,
    color: "#f0f0f0",
    reactionColor: "rgba(240,240,240,0.1)",
    gasColor: "rgba(240,240,255,0.7)",
    equation: "NH₄Cl(s) → NH₃(g) + HCl(g)",
    observation: "White solid sublimates (fades), dense white fumes of NH₃ and HCl appear above solid",
    explanation: "Ammonium chloride dissociates into ammonia and hydrogen chloride gases — a reversible thermal decomposition."
  },
  {
    id: "cuno3",
    label: "Cu(NO₃)₂",
    formula: "Copper(II) Nitrate",
    threshold: 170,
    color: "#3b82f6",
    reactionColor: "#1a1a1a",
    gasColor: "rgba(180,80,20,0.6)",
    equation: "2Cu(NO₃)₂ → 2CuO + 4NO₂↑ + O₂↑",
    observation: "Blue-green crystals turn black (CuO), reddish-brown NO₂ fumes rise, pungent smell",
    explanation: "The nitrate group decomposes above 170°C. Copper is oxidised to CuO, and toxic brown NO₂ gas is produced along with O₂."
  }
];
const REAGENTS_A = [
  { id: "bacl2", label: "BaCl₂", color: "rgba(200,230,255,0.35)" },
  { id: "agno3", label: "AgNO₃", color: "rgba(230,230,210,0.35)" },
  { id: "pbno3", label: "Pb(NO₃)₂", color: "rgba(210,225,200,0.3)" },
  { id: "cacl2", label: "CaCl₂", color: "rgba(210,240,255,0.3)" }
];
const REAGENTS_B = [
  { id: "na2so4", label: "Na₂SO₄", color: "rgba(200,220,255,0.3)" },
  { id: "nacl", label: "NaCl", color: "rgba(225,225,235,0.3)" },
  { id: "nai", label: "NaI", color: "rgba(215,210,180,0.3)" },
  { id: "na2co3", label: "Na₂CO₃", color: "rgba(200,235,220,0.3)" }
];
const PRECIP_RESULTS = {
  bacl2_na2so4: {
    precipitate: "BaSO₄↓",
    precipColor: "#f5f5f5",
    equation: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
    explanation: "Barium ions combine with sulfate ions to form insoluble barium sulfate — a white precipitate used in X-ray imaging."
  },
  bacl2_nacl: {
    precipitate: null,
    precipColor: "",
    equation: "BaCl₂ + 2NaCl → Ba²⁺ + 4Cl⁻ + 2Na⁺ (no reaction)",
    explanation: "All ions remain in solution. No insoluble product forms."
  },
  bacl2_nai: {
    precipitate: null,
    precipColor: "",
    equation: "BaCl₂ + 2NaI → Ba²⁺ + 2I⁻ + 2Na⁺ + 2Cl⁻ (no reaction)",
    explanation: "Barium iodide is soluble. No precipitate forms."
  },
  bacl2_na2co3: {
    precipitate: "BaCO₃↓",
    precipColor: "#efefef",
    equation: "BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl",
    explanation: "Barium and carbonate ions combine to form insoluble barium carbonate, a white precipitate."
  },
  agno3_na2so4: {
    precipitate: "Ag₂SO₄↓",
    precipColor: "#fffde7",
    equation: "2AgNO₃ + Na₂SO₄ → Ag₂SO₄↓ + 2NaNO₃",
    explanation: "Silver sulfate is sparingly soluble — a pale yellow/cream precipitate forms."
  },
  agno3_nacl: {
    precipitate: "AgCl↓",
    precipColor: "#f9f9f0",
    equation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
    explanation: "Silver chloride is virtually insoluble — a white/cream curdy precipitate forms instantly."
  },
  agno3_nai: {
    precipitate: "AgI↓",
    precipColor: "#ffe066",
    equation: "AgNO₃ + NaI → AgI↓ + NaNO₃",
    explanation: "Silver iodide is highly insoluble — a bright yellow precipitate forms rapidly."
  },
  agno3_na2co3: {
    precipitate: "Ag₂CO₃↓",
    precipColor: "#fffacd",
    equation: "2AgNO₃ + Na₂CO₃ → Ag₂CO₃↓ + 2NaNO₃",
    explanation: "Silver carbonate precipitates as a pale yellow solid."
  },
  pbno3_na2so4: {
    precipitate: "PbSO₄↓",
    precipColor: "#f0f0ee",
    equation: "Pb(NO₃)₂ + Na₂SO₄ → PbSO₄↓ + 2NaNO₃",
    explanation: "Lead sulfate is insoluble — a white precipitate forms."
  },
  pbno3_nacl: {
    precipitate: "PbCl₂↓",
    precipColor: "#f8f8f0",
    equation: "Pb(NO₃)₂ + 2NaCl → PbCl₂↓ + 2NaNO₃",
    explanation: "Lead chloride precipitates as a white solid, soluble in hot water."
  },
  pbno3_nai: {
    precipitate: "PbI₂↓",
    precipColor: "#ffe834",
    equation: "Pb(NO₃)₂ + 2NaI → PbI₂↓ + 2NaNO₃",
    explanation: "Lead iodide forms a striking bright yellow precipitate — the 'golden rain' reaction."
  },
  pbno3_na2co3: {
    precipitate: "PbCO₃↓",
    precipColor: "#f5f5f0",
    equation: "Pb(NO₃)₂ + Na₂CO₃ → PbCO₃↓ + 2NaNO₃",
    explanation: "Lead carbonate precipitates as a white solid."
  },
  cacl2_na2so4: {
    precipitate: "CaSO₄↓",
    precipColor: "#f8f8f4",
    equation: "CaCl₂ + Na₂SO₄ → CaSO₄↓ + 2NaCl",
    explanation: "Calcium sulfate (gypsum) is sparingly soluble — a white precipitate forms."
  },
  cacl2_nacl: {
    precipitate: null,
    precipColor: "",
    equation: "CaCl₂ + 2NaCl → Ca²⁺ + 4Cl⁻ + 2Na⁺ (no reaction)",
    explanation: "All ions remain in solution. No precipitate forms."
  },
  cacl2_nai: {
    precipitate: null,
    precipColor: "",
    equation: "CaCl₂ + 2NaI → Ca²⁺ + 2I⁻ + 2Na⁺ + 2Cl⁻ (no reaction)",
    explanation: "Calcium iodide is soluble. No precipitate forms."
  },
  cacl2_na2co3: {
    precipitate: "CaCO₃↓",
    precipColor: "#f5f5f5",
    equation: "CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl",
    explanation: "Calcium carbonate is insoluble in water — limestone/chalk precipitate forms as a white solid."
  }
};
const LAB_KEYFRAMES = `
@keyframes droplet-fall {
  0%   { transform: translateY(0) scale(1);    opacity: 0.9; }
  80%  { transform: translateY(60px) scale(0.85); opacity: 0.7; }
  100% { transform: translateY(72px) scale(0.6);  opacity: 0; }
}
@keyframes bubble-rise {
  0%   { transform: translateY(0) translateX(0) scale(1);      opacity: 0.75; }
  40%  { transform: translateY(-32px) translateX(3px) scale(0.9); opacity: 0.6; }
  100% { transform: translateY(-80px) translateX(-2px) scale(0.4); opacity: 0; }
}
@keyframes precip-fall {
  0%   { transform: translateY(0);    opacity: 0.9; }
  100% { transform: translateY(62px); opacity: 0.35; }
}
@keyframes flame-flicker {
  0%,100% { transform: scaleY(1)    scaleX(1);    opacity: 0.95; }
  33%      { transform: scaleY(1.1)  scaleX(0.9);  opacity: 1; }
  66%      { transform: scaleY(0.92) scaleX(1.06); opacity: 0.88; }
}
@keyframes flame-inner {
  0%,100% { transform: scaleY(1)    scaleX(1);    opacity: 0.6; }
  50%      { transform: scaleY(1.18) scaleX(0.88); opacity: 1; }
}
@keyframes flame-micro-flicker {
  0%,100% { transform: translateX(0); }
  25%      { transform: translateX(-1.5px); }
  75%      { transform: translateX(1.5px); }
}
@keyframes pour-stream {
  0%   { transform: scaleX(1);   opacity: 0.8; }
  50%  { transform: scaleX(1.3); opacity: 1; }
  100% { transform: scaleX(0.6); opacity: 0; }
}
@keyframes heat-glow-pulse {
  0%,100% { opacity: 0.5; }
  50%      { opacity: 0.9; }
}
@keyframes shimmer-liquid {
  0%,100% { opacity: 0.85; }
  50%      { opacity: 1; }
}
@keyframes liquid-surface {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-2px); }
}
@keyframes heat-shimmer {
  0%,100% { opacity: 0; transform: scaleX(1); }
  50%      { opacity: 0.4; transform: scaleX(1.04); }
}
@keyframes test-tube-tilt {
  0%   { transform: rotate(0deg); }
  30%  { transform: rotate(-58deg); }
  70%  { transform: rotate(-58deg); }
  100% { transform: rotate(0deg); }
}
@keyframes reaction-endpoint-pulse {
  0%,100% { opacity: 0; transform: scale(0.95); }
  50%      { opacity: 1; transform: scale(1.02); }
}
`;
const BeakerSVG = reactExports.memo(function BeakerSVG2({
  liquidColor,
  liquidPct,
  label,
  children,
  width = 90,
  height = 120
}) {
  const w = width;
  const h = height;
  const topW = w * 0.88;
  const botW = w * 0.72;
  const wallT = 3;
  const spoTW = 10;
  const spoH = 7;
  const offsetX = (w - topW) / 2;
  const offsetXBot = (w - botW) / 2;
  const outerPath = `M${offsetX - spoTW},${spoH} L${w - offsetX},0 L${w - offsetXBot},${h} Q${w / 2},${h + 8} ${offsetXBot},${h} L${offsetX},${spoH}`;
  const innerLeft = offsetX + wallT;
  const innerRight = w - offsetX - wallT;
  const innerBotLeft = offsetXBot + wallT;
  const innerBotRight = w - offsetXBot - wallT;
  const innerTop = spoH + wallT;
  const innerBot = h - wallT;
  const liquidH = (innerBot - innerTop) * liquidPct / 100;
  const liquidTop = innerBot - liquidH;
  const marks = [20, 40, 60, 80];
  function innerX(pct, side) {
    const frac = pct / 100;
    if (side === "left") {
      return innerLeft + (innerBotLeft - innerLeft) * (1 - frac);
    }
    return innerRight - (innerRight - innerBotRight) * (1 - frac);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        role: "img",
        "aria-label": label ?? "beaker",
        width: w + 2,
        height: h + 16,
        viewBox: `-1 -2 ${w + 4} ${h + 16}`,
        children: [
          liquidPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: `beaker-clip-${label ?? "b"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M${innerLeft + (innerBotLeft - innerLeft) * (1 - liquidPct / 100)},${liquidTop}
                L${innerRight - (innerRight - innerBotRight) * (1 - liquidPct / 100)},${liquidTop}
                L${innerBotRight},${innerBot}
                Q${w / 2},${innerBot + 5} ${innerBotLeft},${innerBot}
                Z`
            }
          ) }),
          liquidPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M${innerX(liquidPct, "left")},${liquidTop}
              L${innerX(liquidPct, "right")},${liquidTop}
              L${innerBotRight},${innerBot}
              Q${w / 2},${innerBot + 5} ${innerBotLeft},${innerBot}
              Z`,
              fill: liquidColor,
              style: { transition: "all 0.6s ease" }
            }
          ),
          liquidPct > 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: innerX(liquidPct, "left") + 2,
              y1: liquidTop,
              x2: innerX(liquidPct, "right") - 2,
              y2: liquidTop,
              stroke: "rgba(255,255,255,0.25)",
              strokeWidth: 1,
              style: { animation: "liquid-surface 2s ease-in-out infinite" }
            }
          ),
          marks.map((m) => {
            const markY = innerBot - (innerBot - innerTop) * m / 100;
            const rx = innerX(m, "right");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: rx - 6,
                  y1: markY,
                  x2: rx + 1,
                  y2: markY,
                  stroke: "rgba(180,200,255,0.25)",
                  strokeWidth: 0.8
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: rx - 8,
                  y: markY + 3,
                  fontSize: "5",
                  fill: "rgba(160,180,220,0.4)",
                  textAnchor: "end",
                  children: m
                }
              )
            ] }, m);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: outerPath,
              fill: "none",
              stroke: "rgba(150,200,255,0.35)",
              strokeWidth: wallT,
              strokeLinejoin: "round",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: offsetX + 1,
              y1: spoH + 4,
              x2: offsetXBot + 2,
              y2: h - 4,
              stroke: "rgba(255,255,255,0.10)",
              strokeWidth: 1.5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M${offsetX - spoTW},${spoH} L${offsetX},${spoH} L${offsetX + 3},${spoH - spoH * 0.6}`,
              fill: "none",
              stroke: "rgba(150,200,255,0.3)",
              strokeWidth: 2,
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/70 tracking-wide", children: label }),
    children
  ] });
});
const TestTubeSVG = reactExports.memo(function TestTubeSVG2({
  liquidColor,
  liquidPct,
  label,
  tilting = false
}) {
  const w = 32;
  const h = 100;
  const rx = 7;
  const wallT = 2.5;
  const liquidH = h * liquidPct / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          transformOrigin: "50% 0%",
          animation: tilting ? "test-tube-tilt 1s ease-in-out forwards" : "none"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            role: "img",
            "aria-label": label ?? "test tube",
            width: w + 4,
            height: h + 12,
            viewBox: `-2 -2 ${w + 4} ${h + 12}`,
            children: [
              liquidPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: wallT,
                  y: h - liquidH,
                  width: w - wallT * 2,
                  height: liquidH,
                  rx: liquidH > 14 ? 0 : rx - 1,
                  fill: liquidColor,
                  style: { transition: "all 0.5s ease" }
                }
              ),
              liquidPct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  cx: w / 2,
                  cy: h,
                  rx: (w - wallT * 2) / 2,
                  ry: 5,
                  fill: liquidColor,
                  style: { transition: "all 0.5s ease" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: wallT / 2,
                  y: 0,
                  width: w - wallT,
                  height: h,
                  rx,
                  fill: "none",
                  stroke: "rgba(150,200,255,0.38)",
                  strokeWidth: wallT
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  cx: w / 2,
                  cy: h,
                  rx: (w - wallT) / 2,
                  ry: 5.5,
                  fill: "none",
                  stroke: "rgba(150,200,255,0.35)",
                  strokeWidth: wallT
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: wallT + 2,
                  y1: 8,
                  x2: wallT + 2,
                  y2: h - 14,
                  stroke: "rgba(255,255,255,0.12)",
                  strokeWidth: 1.5,
                  strokeLinecap: "round"
                }
              )
            ]
          }
        )
      }
    ),
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/70", children: label })
  ] });
});
const PourStream = reactExports.memo(function PourStream2({
  color,
  active
}) {
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute pointer-events-none",
      style: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 5,
        height: 48,
        background: `linear-gradient(to bottom, ${color}, transparent)`,
        borderRadius: 3,
        animation: "pour-stream 0.9s ease-in-out",
        opacity: 0.85
      }
    }
  );
});
const BubbleField = reactExports.memo(function BubbleField2({
  active,
  intensity = 1,
  gasColor
}) {
  const [bubbles, setBubbles] = reactExports.useState([]);
  const counterRef = reactExports.useRef(0);
  const timeoutsRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    if (!active) {
      setBubbles([]);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      return;
    }
    const interval = Math.max(120, 400 - intensity * 280);
    function spawnBubble() {
      const id = ++counterRef.current;
      const bubble = {
        id,
        x: 8 + Math.random() * 84,
        size: 3 + Math.random() * 5,
        duration: 0.7 + Math.random() * 0.6,
        delay: 0
      };
      setBubbles((prev) => [...prev.slice(-14), bubble]);
      const removeT = setTimeout(
        () => {
          setBubbles((prev) => prev.filter((b) => b.id !== id));
        },
        (bubble.duration + 0.1) * 1e3
      );
      timeoutsRef.current.push(removeT);
      if (active) {
        const spawnT = setTimeout(spawnBubble, interval + Math.random() * 200);
        timeoutsRef.current.push(spawnT);
      }
    }
    const init = setTimeout(spawnBubble, 50);
    timeoutsRef.current.push(init);
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [active, intensity]);
  if (!active || bubbles.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden rounded-b-xl", children: bubbles.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute rounded-full",
      style: {
        width: b.size,
        height: b.size,
        left: `${b.x}%`,
        bottom: "12%",
        backgroundColor: gasColor ?? "rgba(200,220,255,0.55)",
        border: "0.5px solid rgba(200,220,255,0.25)",
        animation: `bubble-rise ${b.duration}s ease-out forwards`
      }
    },
    b.id
  )) });
});
const PrecipitateParticles = reactExports.memo(function PrecipitateParticles2({
  color,
  active
}) {
  const particles = reactExports.useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 5 + i % 9 * 10 + Math.floor(i / 9) % 2 * 5,
      size: 2 + i % 3,
      delay: i * 0.055
    }));
  }, []);
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden rounded-b-xl", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute rounded-sm",
      style: {
        width: p.size,
        height: p.size,
        left: `${p.x}%`,
        top: "10%",
        backgroundColor: color,
        animation: `precip-fall 0.7s ease-in ${p.delay}s both`
      }
    },
    p.id
  )) });
});
const HeatGlow = reactExports.memo(function HeatGlow2({ heatPct }) {
  const glowColor = heatPct < 30 ? `rgba(99,179,237,${0.2 + heatPct * 0.01})` : heatPct < 65 ? `rgba(251,146,60,${0.25 + (heatPct - 30) * 8e-3})` : `rgba(239,68,68,${0.35 + (heatPct - 65) * 0.01})`;
  const glowSize = 8 + heatPct * 0.5;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none",
      style: {
        width: 80,
        height: 20,
        background: glowColor,
        boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${glowColor}`,
        animation: heatPct > 20 ? "heat-glow-pulse 1.2s ease-in-out infinite" : "none",
        transition: "background 0.6s, box-shadow 0.6s"
      }
    }
  );
});
const HeatSlider = reactExports.memo(function HeatSlider2({
  value,
  onChange
}) {
  const colorFrom = value < 30 ? "rgba(56,189,248,0.7)" : value < 65 ? "rgba(251,146,60,0.75)" : "rgba(220,38,38,0.8)";
  const colorTo = value < 30 ? "rgba(99,179,237,0.9)" : value < 65 ? "rgba(251,191,36,0.9)" : "rgba(251,113,133,0.9)";
  const flameIcon = value < 30 ? "❄️" : value < 65 ? "🔥" : "🌋";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between text-sm mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
      flameIcon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Heat Intensity" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassSlider,
      {
        min: 0,
        max: 100,
        step: 1,
        value,
        onChange,
        label: "",
        unit: "%",
        colorFrom,
        colorTo,
        "data-ocid": "virtual_lab.heat_slider",
        "aria-label": "Heat intensity"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground/60 mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cold ❄️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Medium 🔥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Extreme 🌋" })
    ] })
  ] });
});
const GlassPanel = reactExports.memo(function GlassPanel2({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("glass-reaction rounded-2xl p-5 md:p-6", className), children });
});
function calcPH(volAcidMl, concAcid, volBaseMl, concBase) {
  const molesAcid = volAcidMl / 1e3 * concAcid;
  const molesBase = volBaseMl / 1e3 * concBase;
  const diff = molesAcid - molesBase;
  const totalVol = (volAcidMl + volBaseMl) / 1e3;
  if (Math.abs(diff) < 1e-9) return 7;
  if (diff > 0) {
    const cH = diff / totalVol;
    return Math.max(0, -Math.log10(cH));
  }
  const cOH = -diff / totalVol;
  const pOH = Math.max(0, -Math.log10(cOH));
  return Math.min(14, 14 - pOH);
}
function pHToColor(pH) {
  if (pH < 4) return "#ef4444";
  if (pH < 6) return "#f97316";
  if (pH < 6.8) return "#eab308";
  if (pH <= 7.2) return "#22c55e";
  if (pH <= 9) return "#3b82f6";
  return "#8b5cf6";
}
function pHLabel(pH) {
  if (pH < 4) return "Strongly Acidic";
  if (pH < 6) return "Weakly Acidic";
  if (pH < 6.8) return "Slightly Acidic";
  if (pH <= 7.2) return "Neutral";
  if (pH <= 9) return "Slightly Basic";
  return "Strongly Basic";
}
function titrationExplanation(vol, concAcid, pH, eqVol) {
  if (vol === 0)
    return "No acid added yet. Flask contains 25 mL NaOH solution — strongly basic.";
  if (vol < eqVol - 0.5)
    return `Added ${vol.toFixed(0)} mL HCl (${concAcid.toFixed(2)} M). Excess NaOH remains. pH = ${pH.toFixed(2)} — below equivalence point.`;
  if (Math.abs(pH - 7) < 0.3)
    return `⭐ Equivalence point reached at ~${vol.toFixed(0)} mL! All HCl and NaOH have neutralised. pH = 7.0 (neutral salt solution NaCl + H₂O).`;
  return `Past equivalence point. Excess HCl present. pH = ${pH.toFixed(2)} — solution is now acidic.`;
}
const TitrationExperiment = reactExports.memo(function TitrationExperiment2() {
  const [volAcid, setVolAcid] = reactExports.useState(0);
  const [concAcid, setConcAcid] = reactExports.useState(0.1);
  const [heatPct, setHeatPct] = reactExports.useState(0);
  const [pouring, setPouring] = reactExports.useState(false);
  const dropTimer = reactExports.useRef(null);
  const volBase = 25;
  const concBase = 0.1;
  const pH = calcPH(volAcid, concAcid, volBase, concBase);
  const flaskColor = pHToColor(pH);
  const eqVol = volBase * concBase / concAcid;
  const isEquivalence = Math.abs(pH - 7) < 0.3;
  const bubblesActive = heatPct > 40;
  const bubbleIntensity = heatPct / 100;
  const buretteLiquid = `rgba(99,179,237,${0.35 + volAcid / 50 * 0.3})`;
  const flaskLiquidColor = `${flaskColor}55`;
  const handleVolChange = reactExports.useCallback((v) => {
    setVolAcid(v);
    setPouring(true);
    if (dropTimer.current) clearTimeout(dropTimer.current);
    dropTimer.current = setTimeout(() => setPouring(false), 1e3);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (dropTimer.current) clearTimeout(dropTimer.current);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.titration.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Burette — HCl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TestTubeSVG,
            {
              liquidColor: buretteLiquid,
              liquidPct: 100 - volAcid / 50 * 100,
              tilting: pouring
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PourStream, { color: "rgba(99,179,237,0.8)", active: pouring })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground/70 mt-1", children: [
          volAcid.toFixed(1),
          " mL dispensed"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-4 py-2.5 text-center w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-0.5", children: "pH Meter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-3xl font-bold font-mono transition-all duration-500",
              style: { color: flaskColor },
              children: pH.toFixed(2)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-xs font-medium mt-0.5 transition-all duration-500",
              style: { color: flaskColor },
              children: pHLabel(pH)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BeakerSVG,
            {
              liquidColor: flaskLiquidColor,
              liquidPct: 65,
              width: 96,
              height: 110
            }
          ),
          bubblesActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none overflow-hidden",
              style: { borderRadius: "0 0 14px 14px" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                BubbleField,
                {
                  active: bubblesActive,
                  intensity: bubbleIntensity,
                  gasColor: `${flaskColor}88`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeatGlow, { heatPct }),
          isEquivalence && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-2xl",
              style: { filter: "drop-shadow(0 0 8px gold)" },
              children: "⭐"
            }
          ) })
        ] }),
        isEquivalence && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-lg px-3 py-1.5 text-center border border-green-500/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-green-400 font-semibold", children: "⭐ Equivalence Point" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Flask — NaOH" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 w-full text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Volume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground", children: "25 mL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Concentration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground", children: "0.1 M" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Eq. Volume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "font-mono font-semibold text-sm transition-colors duration-500",
              style: { color: flaskColor },
              children: [
                eqVol.toFixed(1),
                " mL"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: volAcid,
          min: 0,
          max: 50,
          step: 0.5,
          onChange: handleVolChange,
          label: "HCl Volume Added",
          unit: "mL",
          colorFrom: "rgba(56,189,248,0.7)",
          colorTo: "rgba(99,179,237,0.9)",
          "data-ocid": "virtual_lab.titration.volume_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: concAcid,
          min: 0.05,
          max: 0.2,
          step: 0.01,
          onChange: setConcAcid,
          label: "HCl Concentration",
          unit: "M",
          colorFrom: "rgba(52,211,153,0.7)",
          colorTo: "rgba(20,184,166,0.9)",
          "data-ocid": "virtual_lab.titration.conc_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeatSlider, { value: heatPct, onChange: setHeatPct })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl p-4 border-l-2 border-primary/40",
        "data-ocid": "virtual_lab.titration.explanation",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-2", children: "Step-by-Step" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: titrationExplanation(volAcid, concAcid, pH, eqVol) })
        ]
      }
    )
  ] });
});
const HeatingExperiment = reactExports.memo(function HeatingExperiment2() {
  const [temp, setTemp] = reactExports.useState(25);
  const [heatPct, setHeatPct] = reactExports.useState(0);
  const [selectedId, setSelectedId] = reactExports.useState("caco3");
  const chem = reactExports.useMemo(
    () => HEATING_CHEMICALS.find((c) => c.id === selectedId),
    [selectedId]
  );
  const handleHeatChange = reactExports.useCallback((v) => {
    setHeatPct(v);
    setTemp(Math.round(v * 12));
  }, []);
  const reacting = temp >= chem.threshold;
  const intensity = reacting ? Math.min(1, (temp - chem.threshold) / 200) : 0;
  const solidColor = reacting ? chem.reactionColor : chem.color;
  const solidPct = reacting ? Math.max(10, 70 - intensity * 50) : 70;
  const liquidPctBeaker = Math.min(85, 20 + temp / 1200 * 65);
  const flameH = Math.max(0, temp / 1200 * 60 + 20);
  const { liquidColor: tempLiquidColor, boxShadow: tempBoxShadow } = getTemperatureStyle(Math.min(300, temp / 4));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.heating.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-20 h-32 rounded-b-3xl border border-border/40 relative overflow-hidden transition-all duration-700",
            style: {
              backgroundColor: `${solidColor}22`,
              borderColor: reacting ? `${chem.reactionColor}55` : "",
              boxShadow: reacting ? `0 0 ${20 * intensity}px 4px ${chem.reactionColor}44, ${tempBoxShadow}` : tempBoxShadow
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-0 left-0 right-0 transition-all duration-700 rounded-b-3xl",
                  style: {
                    height: `${solidPct}%`,
                    backgroundColor: solidColor,
                    opacity: chem.id === "nh4cl" && reacting ? 1 - intensity * 0.9 : 0.85
                  }
                }
              ),
              reacting && intensity > 0.5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none rounded-b-3xl",
                  style: {
                    background: "linear-gradient(to top, transparent 40%, rgba(255,200,100,0.08) 100%)",
                    animation: "heat-shimmer 1.5s ease-in-out infinite"
                  }
                }
              ),
              reacting && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute left-0 right-0 transition-all duration-700",
                  style: {
                    bottom: `${solidPct}%`,
                    height: `${intensity * 35}%`,
                    backgroundColor: chem.gasColor
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                BubbleField,
                {
                  active: reacting && intensity > 0.1,
                  intensity,
                  gasColor: chem.gasColor
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-3 border-t-0 border border-border/30 rounded-t mx-auto" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-6 bg-border/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
        temp > 50 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex justify-center",
            style: {
              height: flameH,
              width: 32,
              marginBottom: -4,
              animation: "flame-micro-flicker 0.18s ease-in-out infinite"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-0 rounded-full",
                  style: {
                    width: 28,
                    height: flameH,
                    background: `radial-gradient(ellipse at bottom, rgba(251,146,60,${0.6 + intensity * 0.4}), rgba(234,179,8,0.4) 50%, transparent 80%)`,
                    animation: "flame-flicker 0.3s ease-in-out infinite",
                    transformOrigin: "bottom center"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-0 rounded-full",
                  style: {
                    width: 14,
                    height: flameH * 0.55,
                    background: `radial-gradient(ellipse at bottom, rgba(147,197,253,${0.3 + intensity * 0.5}), rgba(251,146,60,0.3) 60%, transparent)`,
                    animation: "flame-inner 1s ease-in-out infinite",
                    transformOrigin: "bottom center"
                  }
                }
              ),
              intensity > 0.3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-0 rounded-full",
                  style: {
                    width: 8,
                    height: flameH * 0.3,
                    background: `radial-gradient(ellipse at bottom, rgba(255,255,255,${0.3 * intensity}), transparent)`,
                    animation: "flame-flicker 0.15s ease-in-out infinite reverse",
                    transformOrigin: "bottom center"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-10 rounded-t-sm bg-card/50 border border-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-4 rounded-sm bg-card/60 border border-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-3 rounded bg-card/40 border border-border/30" })
        ] }),
        reacting && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            className: "absolute -right-28 bottom-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              BeakerSVG,
              {
                liquidColor: reacting ? `${chem.reactionColor}80` : tempLiquidColor,
                liquidPct: liquidPctBeaker,
                label: "Product",
                width: 72,
                height: 90
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: HEATING_CHEMICALS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setSelectedId(c.id),
        className: cn(
          "glass rounded-xl p-3 text-center transition-all duration-200",
          selectedId === c.id ? "ring-2 ring-accent/60 bg-accent/10" : "hover:bg-card/30"
        ),
        "data-ocid": `virtual_lab.heating.chem_${c.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-sm text-foreground", children: c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: c.formula })
        ]
      },
      c.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeatSlider, { value: heatPct, onChange: handleHeatChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: temp,
          min: 0,
          max: 1200,
          step: 5,
          onChange: (v) => {
            setTemp(v);
            setHeatPct(Math.round(v / 12));
          },
          label: "Temperature",
          unit: "°C",
          colorFrom: "rgba(251,146,60,0.7)",
          colorTo: "rgba(239,68,68,0.9)",
          "data-ocid": "virtual_lab.heating.temp_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0°C" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "font-semibold transition-colors duration-300",
              reacting ? "text-orange-400" : "text-foreground/50"
            ),
            children: reacting ? `🔥 Reaction at ${chem.threshold}°C` : `Reaction starts at ${chem.threshold}°C`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1200°C" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: reacting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        className: "space-y-3",
        "data-ocid": "virtual_lab.heating.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 text-center border border-orange-400/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-orange-400/70 mb-1 font-semibold uppercase tracking-wider", children: "Balanced Equation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground", children: chem.equation })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border-l-2 border-orange-400/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1.5", children: "Observation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80", children: chem.observation })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border-l-2 border-primary/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1.5", children: "Explanation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80", children: chem.explanation })
          ] })
        ]
      },
      "reacting"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "glass rounded-xl p-4 border-l-2 border-border/30",
        "data-ocid": "virtual_lab.heating.explanation",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Heating",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: chem.formula }),
          ". Reaction begins at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
            chem.threshold,
            "°C"
          ] }),
          ". Use the heat slider or temperature slider to start the reaction."
        ] })
      },
      "idle"
    ) })
  ] });
});
const PrecipitationExperiment = reactExports.memo(function PrecipitationExperiment2() {
  var _a, _b, _c, _d;
  const [reagentA, setReagentA] = reactExports.useState("bacl2");
  const [reagentB, setReagentB] = reactExports.useState("na2so4");
  const [mixed, setMixed] = reactExports.useState(false);
  const [mixing, setMixing] = reactExports.useState(false);
  const [pouring, setPouring] = reactExports.useState(false);
  const [quantityA, setQuantityA] = reactExports.useState(50);
  const [quantityB, setQuantityB] = reactExports.useState(50);
  const resultKey = `${reagentA}_${reagentB}`;
  const result = PRECIP_RESULTS[resultKey] ?? {
    precipitate: null,
    precipColor: "",
    equation: "No reaction — all ions remain in solution",
    explanation: "These reagents do not form an insoluble product together."
  };
  const colorA = ((_a = REAGENTS_A.find((r) => r.id === reagentA)) == null ? void 0 : _a.color) ?? "rgba(200,220,255,0.35)";
  const colorB = ((_b = REAGENTS_B.find((r) => r.id === reagentB)) == null ? void 0 : _b.color) ?? "rgba(200,220,255,0.3)";
  const mixedBgColor = result.precipitate ? `${result.precipColor}40` : "rgba(200,220,240,0.2)";
  function handleMix() {
    setPouring(true);
    setTimeout(() => setPouring(false), 1100);
    setMixing(true);
    setTimeout(() => {
      setMixed(true);
      setMixing(false);
    }, 900);
  }
  function handleReset() {
    setMixed(false);
    setMixing(false);
    setPouring(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "virtual_lab.precip.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Solution A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          pouring && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute -top-8 left-1/2 -translate-x-1/2",
              style: { zIndex: 10 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TestTubeSVG,
                  {
                    liquidColor: colorA,
                    liquidPct: quantityA,
                    tilting: pouring
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PourStream, { color: colorA, active: pouring })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BeakerSVG,
            {
              liquidColor: mixed ? "transparent" : colorA,
              liquidPct: mixed ? 0 : quantityA / 100 * 75,
              width: 88,
              height: 108
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground/70", children: (_c = REAGENTS_A.find((r) => r.id === reagentA)) == null ? void 0 : _c.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Result" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BeakerSVG,
            {
              liquidColor: mixed ? mixedBgColor : "rgba(150,170,200,0.1)",
              liquidPct: mixed ? 75 : 0,
              width: 92,
              height: 112
            }
          ),
          mixing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "rounded-full",
              animate: { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] },
              transition: { duration: 0.8, repeat: 1 },
              style: {
                width: 50,
                height: 50,
                backgroundColor: "rgba(180,200,230,0.25)"
              }
            }
          ) }),
          mixed && result.precipitate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PrecipitateParticles,
              {
                color: result.precipColor,
                active: mixed
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0 },
                animate: { height: "18%" },
                transition: { duration: 0.9, delay: 0.4 },
                className: "absolute bottom-1 left-2 right-2 rounded-b-lg",
                style: { backgroundColor: `${result.precipColor}cc` }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 flex items-center justify-center", children: mixed && result.precipitate ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono font-semibold text-foreground/80", children: result.precipitate }) : mixed ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "No precipitate" }) : null })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Solution B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BeakerSVG,
          {
            liquidColor: mixed ? "transparent" : colorB,
            liquidPct: mixed ? 0 : quantityB / 100 * 75,
            width: 88,
            height: 108
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground/70", children: (_d = REAGENTS_B.find((r) => r.id === reagentB)) == null ? void 0 : _d.label })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: quantityA,
          min: 10,
          max: 100,
          step: 5,
          onChange: (v) => {
            setQuantityA(v);
            handleReset();
          },
          label: "Volume of Reagent A",
          unit: "mL",
          colorFrom: "rgba(56,189,248,0.7)",
          colorTo: "rgba(99,179,237,0.9)",
          "data-ocid": "virtual_lab.precip.vol_a_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          value: quantityB,
          min: 10,
          max: 100,
          step: 5,
          onChange: (v) => {
            setQuantityB(v);
            handleReset();
          },
          label: "Volume of Reagent B",
          unit: "mL",
          colorFrom: "rgba(52,211,153,0.7)",
          colorTo: "rgba(20,184,166,0.9)",
          "data-ocid": "virtual_lab.precip.vol_b_slider"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Reagent A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: REAGENTS_A.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setReagentA(r.id);
              handleReset();
            },
            className: cn(
              "glass rounded-xl px-3 py-2.5 text-center transition-all duration-200 font-mono text-sm",
              reagentA === r.id ? "ring-2 ring-primary/60 bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-card/30"
            ),
            "data-ocid": `virtual_lab.precip.reagent_a_${r.id}`,
            children: r.label
          },
          r.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Reagent B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: REAGENTS_B.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setReagentB(r.id);
              handleReset();
            },
            className: cn(
              "glass rounded-xl px-3 py-2.5 text-center transition-all duration-200 font-mono text-sm",
              reagentB === r.id ? "ring-2 ring-accent/60 bg-accent/10 text-foreground" : "text-muted-foreground hover:bg-card/30"
            ),
            "data-ocid": `virtual_lab.precip.reagent_b_${r.id}`,
            children: r.label
          },
          r.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          type: "button",
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.97 },
          onClick: handleMix,
          disabled: mixing || mixed,
          className: "flex-1 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50",
          "data-ocid": "virtual_lab.precip.mix_button",
          children: mixing ? "Pouring…" : mixed ? "Mixed ✓" : "Pour & Mix"
        }
      ),
      mixed && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleReset,
          className: "glass px-5 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all text-sm",
          "data-ocid": "virtual_lab.precip.reset_button",
          children: "Reset"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: mixed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-3",
        "data-ocid": "virtual_lab.precip.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "glass rounded-xl p-3 text-center",
                result.precipitate ? "border border-green-500/30" : "border border-border/20"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Balanced Equation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground", children: result.equation })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border-l-2 border-primary/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1.5", children: "Explanation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80", children: result.explanation })
          ] })
        ]
      },
      "result"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "glass rounded-xl p-4 border-l-2 border-border/30",
        "data-ocid": "virtual_lab.precip.explanation",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Select reagents A and B, adjust volumes, then press",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Pour & Mix" }),
          " to observe whether a precipitate forms."
        ] })
      },
      "idle"
    ) })
  ] });
});
const TABS = [
  {
    id: "titration",
    label: "Acid-Base Titration",
    icon: "⚗️",
    desc: "Neutralise HCl with NaOH and track pH"
  },
  {
    id: "heating",
    label: "Heating Reactions",
    icon: "🔥",
    desc: "Thermal decomposition at controlled temperatures"
  },
  {
    id: "precipitation",
    label: "Precipitation",
    icon: "🧪",
    desc: "Mix ionic solutions and observe precipitate formation"
  },
  {
    id: "kmno4",
    label: "KMnO₄ Titration",
    icon: "🟣",
    desc: "KMnO₄ oxidises Mohr salt — track endpoint"
  },
  {
    id: "mohr",
    label: "Mohr Salt Prep",
    icon: "🟩",
    desc: "Prepare Mohr salt via crystallisation"
  },
  {
    id: "naoh-oxalic",
    label: "NaOH vs Oxalic",
    icon: "🔵",
    desc: "Phenolphthalein titration of oxalic acid"
  },
  {
    id: "auto-reaction",
    label: "Auto Reaction",
    icon: "⚗️",
    desc: "Search 200+ reactions by compound or formula"
  },
  {
    id: "electrolysis",
    label: "Electrolysis",
    icon: "⚡",
    desc: "Split water into H₂ and O₂ with electricity"
  },
  {
    id: "rusting",
    label: "Rusting of Iron",
    icon: "🟫",
    desc: "Time-based corrosion simulation"
  },
  {
    id: "flame-test",
    label: "Flame Test",
    icon: "🔥",
    desc: "Identify metal salts by flame colour"
  },
  {
    id: "solubility",
    label: "Solubility",
    icon: "🧂",
    desc: "Dissolve solutes with temperature control"
  },
  {
    id: "conductivity",
    label: "Conductivity",
    icon: "💡",
    desc: "Test electrolyte strength with a circuit"
  }
];
function VirtualLabPage() {
  const [activeTab, setActiveTab] = reactExports.useState("titration");
  const { addXP, unlockAchievement } = useChemStore();
  const visitedTabs = reactExports.useRef(/* @__PURE__ */ new Set(["titration"]));
  function handleTabChange(tab) {
    setActiveTab(tab);
    if (!visitedTabs.current.has(tab)) {
      visitedTabs.current.add(tab);
      addXP(3);
      if (visitedTabs.current.size >= 5) {
        unlockAchievement("lab-expert");
      }
    }
  }
  reactExports.useEffect(() => {
    addXP(3);
  }, [addXP]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen px-4 py-8 md:py-12",
      "data-ocid": "virtual_lab.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: LAB_KEYFRAMES }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "text-center mb-8 max-w-2xl mx-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔬" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Interactive Chemistry Lab" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent", children: "Virtual Lab" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: "Conduct chemistry experiments with real-time feedback, animated visualisations, and step-by-step explanations." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass rounded-2xl p-1.5 flex gap-1 overflow-x-auto",
            style: { scrollbarWidth: "none" },
            "data-ocid": "virtual_lab.tab_bar",
            children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleTabChange(tab.id),
                className: cn(
                  "flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-250 text-left",
                  activeTab === tab.id ? "bg-primary/20 border border-primary/30 text-foreground" : "text-muted-foreground hover:bg-card/30 hover:text-foreground"
                ),
                "data-ocid": `virtual_lab.tab_${tab.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg flex-shrink-0", children: tab.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold leading-tight whitespace-nowrap text-xs", children: tab.label }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold leading-tight text-xs whitespace-nowrap", children: tab.label }) })
                ]
              },
              tab.id
            ))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { children: [
              activeTab === "titration" && /* @__PURE__ */ jsxRuntimeExports.jsx(TitrationExperiment, {}),
              activeTab === "heating" && /* @__PURE__ */ jsxRuntimeExports.jsx(HeatingExperiment, {}),
              activeTab === "precipitation" && /* @__PURE__ */ jsxRuntimeExports.jsx(PrecipitationExperiment, {}),
              activeTab === "kmno4" && /* @__PURE__ */ jsxRuntimeExports.jsx(KMnO4TitrationTab, {}),
              activeTab === "mohr" && /* @__PURE__ */ jsxRuntimeExports.jsx(MohrSaltPrepTab, {}),
              activeTab === "naoh-oxalic" && /* @__PURE__ */ jsxRuntimeExports.jsx(NaOHOxalicTab, {}),
              activeTab === "auto-reaction" && /* @__PURE__ */ jsxRuntimeExports.jsx(AutoReactionTab, {}),
              activeTab === "electrolysis" && /* @__PURE__ */ jsxRuntimeExports.jsx(ElectrolysisTab, {}),
              activeTab === "rusting" && /* @__PURE__ */ jsxRuntimeExports.jsx(RustingTab, {}),
              activeTab === "flame-test" && /* @__PURE__ */ jsxRuntimeExports.jsx(FlameTestTab, {}),
              activeTab === "solubility" && /* @__PURE__ */ jsxRuntimeExports.jsx(SolubilityTab, {}),
              activeTab === "conductivity" && /* @__PURE__ */ jsxRuntimeExports.jsx(ConductivityTab, {})
            ] })
          },
          activeTab
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.6 },
            className: "text-center mt-8 text-xs text-muted-foreground/50 max-w-lg mx-auto",
            children: "All experiments are simulated. Real lab work requires proper safety equipment and supervision."
          }
        )
      ]
    }
  );
}
export {
  VirtualLabPage
};
