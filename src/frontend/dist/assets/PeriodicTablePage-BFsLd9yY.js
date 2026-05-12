import { a as useChemStore, r as reactExports, E as ELEMENTS, j as jsxRuntimeExports, S as Search, X, g as ChevronDown, h as cn } from "./index-DyyHqAHL.js";
import { E as ElementOverlay } from "./ElementOverlay-CHo7W3gD.js";
import { G as GlassSlider } from "./GlassSlider-CEDEo6xS.js";
import { u as useFilteredElements } from "./useElements-DiNxzQrV.js";
import { b as CATEGORY_LABELS, a as CATEGORY_GRADIENT, C as CATEGORY_TEXT } from "./element-DKp8uEQx.js";
import { T as Thermometer } from "./thermometer-BlCba5xD.js";
import { T as TrendingUp } from "./trending-up-SgpPowcz.js";
import "./AtomicStructure-DUFrMLIO.js";
import "./chevron-left-oyoINw6R.js";
import "./chevron-right-6gh7dKif.js";
const GROUPS = Array.from({ length: 18 }, (_, i) => i + 1);
const PERIODS = Array.from({ length: 7 }, (_, i) => i + 1);
function getElementAtPosition(period, group) {
  return ELEMENTS.find((e) => {
    if (e.category === "lanthanide" || e.category === "actinide")
      return false;
    return e.period === period && e.group === group;
  }) ?? null;
}
const LANTHANIDES = ELEMENTS.filter((e) => e.category === "lanthanide").sort(
  (a, b) => a.atomicNumber - b.atomicNumber
);
const ACTINIDES = ELEMENTS.filter((e) => e.category === "actinide").sort(
  (a, b) => a.atomicNumber - b.atomicNumber
);
const CATEGORIES = [
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
  { key: "actinide", label: "Actinide" }
];
const TREND_OPTIONS = [
  { key: "none", label: "None", unit: "" },
  { key: "atomicRadius", label: "Atomic Radius", unit: "pm" },
  { key: "electronegativity", label: "Electronegativity", unit: "" },
  { key: "ionizationEnergy", label: "Ionization Energy", unit: "eV" },
  { key: "atomicMass", label: "Atomic Mass", unit: "u" }
];
function getTrendValue(el, trend) {
  if (trend === "none") return null;
  const v = el[trend];
  if (typeof v !== "number" || v <= 0) return null;
  return v;
}
function buildTrendMap(trend) {
  const map = /* @__PURE__ */ new Map();
  if (trend === "none") return map;
  const values = ELEMENTS.map((el) => getTrendValue(el, trend)).filter(
    (v) => v !== null
  );
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  for (const el of ELEMENTS) {
    const v = getTrendValue(el, trend);
    map.set(el.symbol, v !== null ? (v - min) / range : null);
  }
  return map;
}
function trendColor(norm) {
  if (norm <= 0.5) {
    const t = norm * 2;
    const r = Math.round(0 + t * 0);
    const g = Math.round(50 + t * 150);
    const b = Math.round(255 - t * 175);
    return `rgba(${r},${g},${b},0.55)`;
  }
  const t2 = (norm - 0.5) * 2;
  const r2 = Math.round(0 + t2 * 220);
  const g2 = Math.round(200 - t2 * 160);
  const b2 = Math.round(80 - t2 * 40);
  return `rgba(${r2},${g2},${b2},0.55)`;
}
function getPhysicalState(temp, meltingPoint, boilingPoint) {
  if (boilingPoint !== 0 && temp >= boilingPoint) return "gas";
  if (meltingPoint !== 0 && temp >= meltingPoint) return "liquid";
  return "solid";
}
function buildStateMap(temp) {
  const map = /* @__PURE__ */ new Map();
  for (const el of ELEMENTS) {
    map.set(
      el.symbol,
      getPhysicalState(temp, el.meltingPoint, el.boilingPoint)
    );
  }
  return map;
}
const TemperatureSlider = reactExports.memo(function TemperatureSlider2() {
  const { temperature, setTemperature } = useChemStore();
  const rafRef = reactExports.useRef(null);
  const [localTemp, setLocalTemp] = reactExports.useState(temperature);
  const handleChange = reactExports.useCallback(
    (v) => {
      setLocalTemp(v);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setTemperature(v));
    },
    [setTemperature]
  );
  reactExports.useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );
  const fahrenheit = Math.round(localTemp * 1.8 + 32);
  const sliderColorFrom = localTemp < 0 ? "rgba(96,165,250,0.75)" : localTemp < 500 ? "rgba(167,139,250,0.75)" : localTemp < 2e3 ? "rgba(251,146,60,0.75)" : "rgba(239,68,68,0.75)";
  const sliderColorTo = localTemp < 0 ? "rgba(56,189,248,0.9)" : localTemp < 500 ? "rgba(196,181,253,0.9)" : localTemp < 2e3 ? "rgba(251,191,36,0.9)" : "rgba(248,113,113,0.9)";
  const tempLabel = localTemp < -200 ? "Cryogenic" : localTemp < 0 ? "Sub-Zero" : localTemp < 100 ? "Ambient" : localTemp < 1e3 ? "Hot" : localTemp < 3e3 ? "Extreme" : "Plasma-Like";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl px-5 py-4 flex flex-col gap-3",
      style: {
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        background: "rgba(18,18,32,0.72)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 0 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Thermometer,
              {
                className: "w-4 h-4 shrink-0",
                style: { color: sliderColorTo }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground/80 tracking-wide uppercase", children: "Temperature" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs px-2 py-0.5 rounded-full font-medium",
                style: {
                  background: sliderColorTo.replace(/[\d.]+\)$/, "0.15)"),
                  color: sliderColorTo,
                  border: `1px solid ${sliderColorTo.replace(/[\d.]+\)$/, "0.3)")}`
                },
                children: tempLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-bold text-foreground leading-none", children: [
                localTemp.toLocaleString(),
                "°C"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[10px] text-muted-foreground font-mono", children: [
                fahrenheit.toLocaleString(),
                "°F"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono shrink-0 w-10 text-right", children: "−273°" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            GlassSlider,
            {
              min: -273,
              max: 6e3,
              step: 1,
              value: localTemp,
              onChange: handleChange,
              colorFrom: sliderColorFrom,
              colorTo: sliderColorTo,
              "data-ocid": "periodic_table.temperature_slider",
              "aria-label": `Temperature: ${localTemp}°C`
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono shrink-0 w-12", children: "6000°" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 text-[10px] text-muted-foreground justify-center", children: [
          { color: "rgba(96,165,250,0.8)", label: "Solid" },
          { color: "rgba(251,146,60,0.8)", label: "Liquid" },
          { color: "rgba(167,139,250,0.8)", label: "Gas" }
        ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-2 h-2 rounded-full inline-block",
              style: { background: color }
            }
          ),
          label
        ] }, label)) })
      ]
    }
  );
});
const TrendSelector = reactExports.memo(function TrendSelector2({
  activeTrend,
  onChangeTrend
}) {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl px-5 py-4 flex flex-col gap-3",
      style: {
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        background: "rgba(18,18,32,0.72)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 0 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-accent shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground/80 tracking-wide uppercase", children: "Trend Highlight" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap gap-2",
            "data-ocid": "periodic_table.trend_filters",
            children: TREND_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onChangeTrend(opt.key),
                className: cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150",
                  activeTrend === opt.key ? "bg-accent/30 text-accent border border-accent/50" : "bg-white/5 text-muted-foreground border border-white/10 hover:text-foreground hover:bg-white/10"
                ),
                "data-ocid": `periodic_table.trend.${opt.key}`,
                children: opt.label
              },
              opt.key
            ))
          }
        ),
        activeTrend !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: "Low" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 h-2 rounded-full",
              style: {
                background: "linear-gradient(to right, rgba(0,50,255,0.7), rgba(0,200,80,0.7), rgba(220,40,40,0.7))"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: "High" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/60 ml-1", children: ((_a = TREND_OPTIONS.find((o) => o.key === activeTrend)) == null ? void 0 : _a.unit) || "" })
        ] })
      ]
    }
  );
});
const ElementTile = reactExports.memo(
  function ElementTile2({
    el,
    isFiltered,
    physicalState,
    trendNorm,
    onClick
  }) {
    const gradClass = CATEGORY_GRADIENT[el.category];
    const textClass = CATEGORY_TEXT[el.category];
    const trendOverlay = typeof trendNorm === "number" ? trendColor(trendNorm) : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick,
        disabled: !isFiltered,
        className: cn(
          "relative rounded-lg p-1.5 text-left overflow-hidden group",
          "w-full aspect-square flex flex-col justify-between bg-gradient-to-br",
          "transition-[transform,opacity,border-color] duration-150 will-change-transform",
          gradClass,
          isFiltered ? [
            "opacity-100 cursor-pointer",
            "hover:-translate-y-0.5 hover:scale-[1.07] hover:z-50",
            "hover:brightness-110",
            physicalState === "solid" && "border border-blue-400/20",
            physicalState === "liquid" && "border border-amber-400/30",
            physicalState === "gas" && "border border-violet-400/30"
          ] : "opacity-20 cursor-default border border-border/20"
        ),
        "data-ocid": `periodic_table.element.${el.atomicNumber}`,
        "aria-label": `${el.name} (${el.symbol}) — ${physicalState} at current temperature`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-opacity duration-150 rounded-lg" }),
          trendOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 rounded-lg pointer-events-none",
              style: { background: trendOverlay }
            }
          ),
          trendNorm === null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 rounded-lg pointer-events-none",
              style: { background: "rgba(100,100,120,0.45)" }
            }
          ),
          isFiltered && physicalState === "liquid" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 rounded-lg pointer-events-none",
              style: {
                background: "linear-gradient(45deg, transparent 30%, rgba(251,191,36,0.18) 50%, transparent 70%)",
                animation: "tileShimmer 2.2s ease-in-out infinite"
              }
            }
          ),
          isFiltered && physicalState === "gas" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 rounded-lg pointer-events-none",
              style: {
                background: "radial-gradient(circle at 50% 50%, rgba(167,139,250,0.22) 0%, transparent 70%)",
                animation: "tileGasFloat 2.8s ease-in-out infinite"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[8px] text-foreground/60 leading-none", children: el.atomicNumber }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground leading-none text-base", children: el.symbol }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-[7px] truncate leading-none", textClass), children: el.name }) })
        ]
      }
    );
  },
  (prev, next) => prev.el.symbol === next.el.symbol && prev.isFiltered === next.isFiltered && prev.physicalState === next.physicalState && prev.trendNorm === next.trendNorm && prev.onClick === next.onClick
);
function EmptyCell() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-square" });
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[700px]", "aria-label": "Loading periodic table…", children: PERIODS.map((period) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        GROUPS.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full aspect-square rounded-lg",
            style: {
              background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
              backgroundSize: "200% 100%",
              animation: "skeletonSweep 1.4s ease-in-out infinite",
              animationDelay: `${(period * 18 + group) % 10 * 0.06}s`
            }
          },
          group
        ))
      ]
    },
    period
  )) });
}
function FilterPanel({
  showFilters,
  categoryFilter,
  groupFilter,
  periodFilter,
  setCategoryFilter,
  setGroupFilter,
  setPeriodFilter
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
      style: {
        maxHeight: showFilters ? "300px" : "0px",
        opacity: showFilters ? 1 : 0
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap gap-2 justify-center",
            "data-ocid": "periodic_table.category_filters",
            children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setCategoryFilter(cat.key),
                className: cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  categoryFilter === cat.key ? "bg-accent text-accent-foreground shadow-md" : "glass text-muted-foreground hover:text-foreground"
                ),
                "data-ocid": `periodic_table.filter.${cat.key}`,
                children: cat.label
              },
              cat.key
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-3 justify-center",
            "data-ocid": "periodic_table.group_period_filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "group-filter",
                    className: "text-xs text-muted-foreground font-medium",
                    children: "Group"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "group-filter",
                    value: groupFilter ?? "",
                    onChange: (e) => setGroupFilter(e.target.value ? Number(e.target.value) : null),
                    className: "glass rounded-lg px-2.5 py-1.5 text-xs bg-transparent border border-border/30 outline-none focus:border-accent/50 text-foreground",
                    "data-ocid": "periodic_table.group_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Groups" }),
                      GROUPS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: g, children: [
                        "Group ",
                        g
                      ] }, g))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "period-filter",
                    className: "text-xs text-muted-foreground font-medium",
                    children: "Period"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "period-filter",
                    value: periodFilter ?? "",
                    onChange: (e) => setPeriodFilter(e.target.value ? Number(e.target.value) : null),
                    className: "glass rounded-lg px-2.5 py-1.5 text-xs bg-transparent border border-border/30 outline-none focus:border-accent/50 text-foreground",
                    "data-ocid": "periodic_table.period_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Periods" }),
                      PERIODS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p, children: [
                        "Period ",
                        p
                      ] }, p))
                    ]
                  }
                )
              ] }),
              (groupFilter !== null || periodFilter !== null) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setGroupFilter(null);
                    setPeriodFilter(null);
                  },
                  className: "text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2",
                  "data-ocid": "periodic_table.clear_group_period_button",
                  children: "Clear"
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function PeriodicTablePage() {
  const {
    searchQuery,
    categoryFilter,
    groupFilter,
    periodFilter,
    temperature,
    setSearchQuery,
    setCategoryFilter,
    setGroupFilter,
    setPeriodFilter,
    addRecentlyViewed
  } = useChemStore();
  const filteredElements = useFilteredElements();
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [isReady, setIsReady] = reactExports.useState(false);
  const [activeTrend, setActiveTrend] = reactExports.useState("none");
  reactExports.useEffect(() => {
    const raf = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const stateMap = reactExports.useMemo(() => buildStateMap(temperature), [temperature]);
  const trendMap = reactExports.useMemo(() => buildTrendMap(activeTrend), [activeTrend]);
  const [selectedElement, setSelectedElement] = reactExports.useState(null);
  const [overlayOpen, setOverlayOpen] = reactExports.useState(false);
  const [clickOrigin, setClickOrigin] = reactExports.useState(void 0);
  const searchDebounceRef = reactExports.useRef(null);
  const [searchLocal, setSearchLocal] = reactExports.useState(searchQuery);
  const handleSearch = reactExports.useCallback(
    (e) => {
      const val = e.target.value;
      setSearchLocal(val);
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = setTimeout(() => setSearchQuery(val), 300);
    },
    [setSearchQuery]
  );
  const clearSearch = reactExports.useCallback(() => {
    setSearchLocal("");
    setSearchQuery("");
  }, [setSearchQuery]);
  const handleElementClick = reactExports.useCallback(
    (el, e) => {
      addRecentlyViewed(el.symbol);
      const rect = e.currentTarget.getBoundingClientRect();
      setClickOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
      setSelectedElement(el);
      setOverlayOpen(true);
    },
    [addRecentlyViewed]
  );
  const handleClose = reactExports.useCallback(() => setOverlayOpen(false), []);
  const handleNavigate = reactExports.useCallback((direction) => {
    setSelectedElement((current) => {
      if (!current) return current;
      const targetNum = direction === "next" ? current.atomicNumber + 1 : current.atomicNumber - 1;
      return ELEMENTS.find((e) => e.atomicNumber === targetNum) ?? current;
    });
  }, []);
  const filteredSet = reactExports.useMemo(
    () => new Set(filteredElements.map((e) => e.symbol)),
    [filteredElements]
  );
  const clickHandlers = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const el of ELEMENTS) {
      map.set(el.symbol, (e) => handleElementClick(el, e));
    }
    return map;
  }, [handleElementClick]);
  const mainGrid = reactExports.useMemo(
    () => PERIODS.map((period) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center text-[10px] text-muted-foreground/60", children: period }),
          GROUPS.map((group) => {
            const el = getElementAtPosition(period, group);
            if (!el) {
              if (period === 6 && group === 3 || period === 7 && group === 3) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full aspect-square glass rounded-lg flex items-center justify-center",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] text-muted-foreground", children: period === 6 ? "La-Lu" : "Ac-Lr" })
                  },
                  group
                );
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyCell, {}, group);
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              ElementTile,
              {
                el,
                isFiltered: filteredSet.has(el.symbol),
                physicalState: stateMap.get(el.symbol) ?? "solid",
                trendNorm: activeTrend !== "none" ? trendMap.get(el.symbol) ?? null : void 0,
                onClick: clickHandlers.get(el.symbol)
              },
              el.symbol
            );
          })
        ]
      },
      period
    )),
    [filteredSet, clickHandlers, stateMap, trendMap, activeTrend]
  );
  const lanthanideRow = reactExports.useMemo(
    () => LANTHANIDES.map((el) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ElementTile,
      {
        el,
        isFiltered: filteredSet.has(el.symbol),
        physicalState: stateMap.get(el.symbol) ?? "solid",
        trendNorm: activeTrend !== "none" ? trendMap.get(el.symbol) ?? null : void 0,
        onClick: clickHandlers.get(el.symbol)
      },
      el.symbol
    )),
    [filteredSet, clickHandlers, stateMap, trendMap, activeTrend]
  );
  const actinideRow = reactExports.useMemo(
    () => ACTINIDES.map((el) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ElementTile,
      {
        el,
        isFiltered: filteredSet.has(el.symbol),
        physicalState: stateMap.get(el.symbol) ?? "solid",
        trendNorm: activeTrend !== "none" ? trendMap.get(el.symbol) ?? null : void 0,
        onClick: clickHandlers.get(el.symbol)
      },
      el.symbol
    )),
    [filteredSet, clickHandlers, stateMap, trendMap, activeTrend]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-2 md:px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes tileShimmer {
          0%, 100% { opacity: 0.3; transform: translateX(-30%); }
          50%       { opacity: 1;   transform: translateX(30%); }
        }
        @keyframes tileGasFloat {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes skeletonSweep {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input[type=range]::-webkit-slider-thumb { appearance: none; width: 0; height: 0; }
        input[type=range]::-moz-range-thumb { appearance: none; width: 0; height: 0; border: none; }      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center mb-8",
          style: { animation: "fadeSlideIn 0.3s ease-out both" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-2", children: "Periodic Table" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Click any element to explore its properties" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 max-w-xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by name, symbol, or number…",
                value: searchLocal,
                onChange: handleSearch,
                className: "w-full glass rounded-xl pl-10 pr-10 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground focus:border-accent/50 border border-border/30",
                "data-ocid": "periodic_table.search_input"
              }
            ),
            searchLocal && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearSearch,
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                "data-ocid": "periodic_table.clear_search_button",
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowFilters(!showFilters),
              className: cn(
                "glass px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all",
                showFilters ? "bg-accent/20 border-accent/40 text-accent" : ""
              ),
              "data-ocid": "periodic_table.filter_toggle",
              children: [
                "Filter",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    className: cn(
                      "w-4 h-4 transition-transform duration-200",
                      showFilters ? "rotate-180" : ""
                    )
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterPanel,
          {
            showFilters,
            categoryFilter,
            groupFilter,
            periodFilter,
            setCategoryFilter,
            setGroupFilter,
            setPeriodFilter
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TemperatureSlider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TrendSelector,
          {
            activeTrend,
            onChangeTrend: setActiveTrend
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center mb-6 text-xs", children: Object.keys(CATEGORY_LABELS).filter((c) => c !== "unknown").map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1.5 glass px-2.5 py-1 rounded-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-2.5 h-2.5 rounded-full bg-gradient-to-br",
                  CATEGORY_GRADIENT[cat]
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: CATEGORY_LABELS[cat] })
          ]
        },
        cat
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto pb-4", children: !isReady ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[700px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          GROUPS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center text-[10px] text-muted-foreground/60 leading-5",
              children: g
            },
            g
          ))
        ] }),
        mainGrid,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center text-[9px] text-muted-foreground/60", children: "6*" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2" }),
          lanthanideRow,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[32px_repeat(18,1fr)] gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center text-[9px] text-muted-foreground/60", children: "7*" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2" }),
          actinideRow,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mt-4 text-xs text-muted-foreground", children: [
        filteredElements.length,
        " of ",
        ELEMENTS.length,
        " elements shown"
      ] }),
      activeTrend !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mt-4 max-w-2xl mx-auto rounded-xl px-5 py-3 border border-white/10 text-sm text-foreground/75 leading-relaxed",
          style: {
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(18,18,32,0.55)"
          },
          children: {
            atomicRadius: "Atomic radius decreases across a period: nuclear charge increases while electrons enter the same shell, so Zeff pulls the cloud inward. It increases down a group as new shells are added, moving electrons further from the nucleus.",
            electronegativity: "Electronegativity increases across a period (more protons attract shared electrons) and decreases down a group (outer electrons are shielded and further away). Fluorine is the most electronegative element (Pauling: 3.98).",
            ionizationEnergy: "Ionization energy generally increases across a period (stronger nuclear attraction) and decreases down a group (outer electrons are farther away). Key exceptions: IE₁(N) > IE₁(O) due to N's stable half-filled 2p³; IE₁(Be) > IE₁(B).",
            atomicMass: "Atomic mass increases roughly with atomic number. Exceptions occur where isotope distribution differs — notably Ar (39.9) > K (39.1), reversing the order."
          }[activeTrend]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ElementOverlay,
      {
        element: selectedElement,
        isOpen: overlayOpen,
        onClose: handleClose,
        onNavigate: handleNavigate,
        clickOrigin
      }
    )
  ] });
}
export {
  PeriodicTablePage
};
