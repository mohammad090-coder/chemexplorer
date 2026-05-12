import { ElementOverlay } from "@/components/ElementOverlay";
import { GlassSlider } from "@/components/ui/GlassSlider";
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
import { ChevronDown, Search, Thermometer, TrendingUp, X } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const GROUPS = Array.from({ length: 18 }, (_, i) => i + 1);
const PERIODS = Array.from({ length: 7 }, (_, i) => i + 1);

function getElementAtPosition(period: number, group: number): Element | null {
  return (
    ELEMENTS.find((e) => {
      if (e.category === "lanthanide" || e.category === "actinide")
        return false;
      return e.period === period && e.group === group;
    }) ?? null
  );
}

const LANTHANIDES = ELEMENTS.filter((e) => e.category === "lanthanide").sort(
  (a, b) => a.atomicNumber - b.atomicNumber,
);
const ACTINIDES = ELEMENTS.filter((e) => e.category === "actinide").sort(
  (a, b) => a.atomicNumber - b.atomicNumber,
);

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

// ── Trend highlight ────────────────────────────────────────────────────────────
type TrendKey =
  | "none"
  | "atomicRadius"
  | "electronegativity"
  | "ionizationEnergy"
  | "atomicMass";

const TREND_OPTIONS: Array<{ key: TrendKey; label: string; unit: string }> = [
  { key: "none", label: "None", unit: "" },
  { key: "atomicRadius", label: "Atomic Radius", unit: "pm" },
  { key: "electronegativity", label: "Electronegativity", unit: "" },
  { key: "ionizationEnergy", label: "Ionization Energy", unit: "eV" },
  { key: "atomicMass", label: "Atomic Mass", unit: "u" },
];

/** Returns the raw value for a given trend key, or null if unavailable. */
function getTrendValue(el: Element, trend: TrendKey): number | null {
  if (trend === "none") return null;
  const v = el[trend as keyof Element];
  if (typeof v !== "number" || v <= 0) return null;
  return v;
}

/** Compute a normalized 0-1 map for each element symbol, given a trend. */
function buildTrendMap(trend: TrendKey): Map<string, number | null> {
  const map = new Map<string, number | null>();
  if (trend === "none") return map;

  const values = ELEMENTS.map((el) => getTrendValue(el, trend)).filter(
    (v): v is number => v !== null,
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

/** Interpolate blue → green → red for a 0-1 normalized value. */
function trendColor(norm: number): string {
  if (norm <= 0.5) {
    // blue (0,50,255) → green (0,200,80)
    const t = norm * 2;
    const r = Math.round(0 + t * 0);
    const g = Math.round(50 + t * 150);
    const b = Math.round(255 - t * 175);
    return `rgba(${r},${g},${b},0.55)`;
  }
  // green (0,200,80) → red (220,40,40)
  const t2 = (norm - 0.5) * 2;
  const r2 = Math.round(0 + t2 * 220);
  const g2 = Math.round(200 - t2 * 160);
  const b2 = Math.round(80 - t2 * 40);
  return `rgba(${r2},${g2},${b2},0.55)`;
}

// ── Physical state ─────────────────────────────────────────────────────────────
type PhysicalState = "solid" | "liquid" | "gas";

function getPhysicalState(
  temp: number,
  meltingPoint: number,
  boilingPoint: number,
): PhysicalState {
  if (boilingPoint !== 0 && temp >= boilingPoint) return "gas";
  if (meltingPoint !== 0 && temp >= meltingPoint) return "liquid";
  return "solid";
}

function buildStateMap(temp: number): Map<string, PhysicalState> {
  const map = new Map<string, PhysicalState>();
  for (const el of ELEMENTS) {
    map.set(
      el.symbol,
      getPhysicalState(temp, el.meltingPoint, el.boilingPoint),
    );
  }
  return map;
}

// ── Temperature Slider ─────────────────────────────────────────────────────────
const TemperatureSlider = memo(function TemperatureSlider() {
  const { temperature, setTemperature } = useChemStore();
  const rafRef = useRef<number | null>(null);
  const [localTemp, setLocalTemp] = useState(temperature);

  const handleChange = useCallback(
    (v: number) => {
      setLocalTemp(v);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setTemperature(v));
    },
    [setTemperature],
  );

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const fahrenheit = Math.round(localTemp * 1.8 + 32);

  const sliderColorFrom =
    localTemp < 0
      ? "rgba(96,165,250,0.75)"
      : localTemp < 500
        ? "rgba(167,139,250,0.75)"
        : localTemp < 2000
          ? "rgba(251,146,60,0.75)"
          : "rgba(239,68,68,0.75)";

  const sliderColorTo =
    localTemp < 0
      ? "rgba(56,189,248,0.9)"
      : localTemp < 500
        ? "rgba(196,181,253,0.9)"
        : localTemp < 2000
          ? "rgba(251,191,36,0.9)"
          : "rgba(248,113,113,0.9)";

  const tempLabel =
    localTemp < -200
      ? "Cryogenic"
      : localTemp < 0
        ? "Sub-Zero"
        : localTemp < 100
          ? "Ambient"
          : localTemp < 1000
            ? "Hot"
            : localTemp < 3000
              ? "Extreme"
              : "Plasma-Like";

  return (
    <div
      className="rounded-2xl px-5 py-4 flex flex-col gap-3"
      style={{
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        background: "rgba(18,18,32,0.72)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 0 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Thermometer
            className="w-4 h-4 shrink-0"
            style={{ color: sliderColorTo }}
          />
          <span className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
            Temperature
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: sliderColorTo.replace(/[\d.]+\)$/, "0.15)"),
              color: sliderColorTo,
              border: `1px solid ${sliderColorTo.replace(/[\d.]+\)$/, "0.3)")}`,
            }}
          >
            {tempLabel}
          </span>
          <div className="text-right">
            <span className="font-mono text-lg font-bold text-foreground leading-none">
              {localTemp.toLocaleString()}°C
            </span>
            <span className="block text-[10px] text-muted-foreground font-mono">
              {fahrenheit.toLocaleString()}°F
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground font-mono shrink-0 w-10 text-right">
          −273°
        </span>
        <div className="flex-1">
          <GlassSlider
            min={-273}
            max={6000}
            step={1}
            value={localTemp}
            onChange={handleChange}
            colorFrom={sliderColorFrom}
            colorTo={sliderColorTo}
            data-ocid="periodic_table.temperature_slider"
            aria-label={`Temperature: ${localTemp}°C`}
          />
        </div>
        <span className="text-[10px] text-muted-foreground font-mono shrink-0 w-12">
          6000°
        </span>
      </div>

      <div className="flex items-center gap-4 text-[10px] text-muted-foreground justify-center">
        {[
          { color: "rgba(96,165,250,0.8)", label: "Solid" },
          { color: "rgba(251,146,60,0.8)", label: "Liquid" },
          { color: "rgba(167,139,250,0.8)", label: "Gas" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
});

// ── Trend Selector ─────────────────────────────────────────────────────────────
const TrendSelector = memo(function TrendSelector({
  activeTrend,
  onChangeTrend,
}: {
  activeTrend: TrendKey;
  onChangeTrend: (t: TrendKey) => void;
}) {
  return (
    <div
      className="rounded-2xl px-5 py-4 flex flex-col gap-3"
      style={{
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        background: "rgba(18,18,32,0.72)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 0 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-4 h-4 text-accent shrink-0" />
        <span className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
          Trend Highlight
        </span>
      </div>

      <div
        className="flex flex-wrap gap-2"
        data-ocid="periodic_table.trend_filters"
      >
        {TREND_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChangeTrend(opt.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150",
              activeTrend === opt.key
                ? "bg-accent/30 text-accent border border-accent/50"
                : "bg-white/5 text-muted-foreground border border-white/10 hover:text-foreground hover:bg-white/10",
            )}
            data-ocid={`periodic_table.trend.${opt.key}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Color scale legend */}
      {activeTrend !== "none" && (
        <div className="flex items-center gap-3 pt-1">
          <span className="text-[10px] text-muted-foreground shrink-0">
            Low
          </span>
          <div
            className="flex-1 h-2 rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgba(0,50,255,0.7), rgba(0,200,80,0.7), rgba(220,40,40,0.7))",
            }}
          />
          <span className="text-[10px] text-muted-foreground shrink-0">
            High
          </span>
          <span className="text-[10px] text-muted-foreground/60 ml-1">
            {TREND_OPTIONS.find((o) => o.key === activeTrend)?.unit || ""}
          </span>
        </div>
      )}
    </div>
  );
});

// ── ElementTile ────────────────────────────────────────────────────────────────
const ElementTile = memo(
  function ElementTile({
    el,
    isFiltered,
    physicalState,
    trendNorm,
    onClick,
  }: {
    el: Element;
    isFiltered: boolean;
    physicalState: PhysicalState;
    trendNorm: number | null | undefined;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }) {
    const gradClass = CATEGORY_GRADIENT[el.category];
    const textClass = CATEGORY_TEXT[el.category];

    // Trend overlay color — only compute string when trendNorm is a number
    const trendOverlay =
      typeof trendNorm === "number" ? trendColor(trendNorm) : null;

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={!isFiltered}
        className={cn(
          "relative rounded-lg p-1.5 text-left overflow-hidden group",
          "w-full aspect-square flex flex-col justify-between bg-gradient-to-br",
          "transition-[transform,opacity,border-color] duration-150 will-change-transform",
          gradClass,
          isFiltered
            ? [
                "opacity-100 cursor-pointer",
                "hover:-translate-y-0.5 hover:scale-[1.07] hover:z-50",
                "hover:brightness-110",
                physicalState === "solid" && "border border-blue-400/20",
                physicalState === "liquid" && "border border-amber-400/30",
                physicalState === "gas" && "border border-violet-400/30",
              ]
            : "opacity-20 cursor-default border border-border/20",
        )}
        data-ocid={`periodic_table.element.${el.atomicNumber}`}
        aria-label={`${el.name} (${el.symbol}) — ${physicalState} at current temperature`}
      >
        {/* Dark overlay — lifts on hover */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-opacity duration-150 rounded-lg" />

        {/* Trend color overlay — static, no animation, GPU composited */}
        {trendOverlay && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ background: trendOverlay }}
          />
        )}

        {/* Trend = no data → grey overlay */}
        {trendNorm === null && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ background: "rgba(100,100,120,0.45)" }}
          />
        )}

        {/* Liquid shimmer — transform+opacity only */}
        {isFiltered && physicalState === "liquid" && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(251,191,36,0.18) 50%, transparent 70%)",
              animation: "tileShimmer 2.2s ease-in-out infinite",
            }}
          />
        )}

        {/* Gas pulse — transform+opacity only */}
        {isFiltered && physicalState === "gas" && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(167,139,250,0.22) 0%, transparent 70%)",
              animation: "tileGasFloat 2.8s ease-in-out infinite",
            }}
          />
        )}

        <div className="relative z-10">
          <div className="text-[8px] text-foreground/60 leading-none">
            {el.atomicNumber}
          </div>
        </div>
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <span className="font-display font-bold text-foreground leading-none text-base">
            {el.symbol}
          </span>
        </div>
        <div className="relative z-10">
          <div className={cn("text-[7px] truncate leading-none", textClass)}>
            {el.name}
          </div>
        </div>
      </button>
    );
  },
  (prev, next) =>
    prev.el.symbol === next.el.symbol &&
    prev.isFiltered === next.isFiltered &&
    prev.physicalState === next.physicalState &&
    prev.trendNorm === next.trendNorm &&
    prev.onClick === next.onClick,
);

function EmptyCell() {
  return <div className="w-full aspect-square" />;
}

function SkeletonGrid() {
  return (
    <div className="min-w-[700px]" aria-label="Loading periodic table…">
      {PERIODS.map((period) => (
        <div
          key={period}
          className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5"
        >
          <div />
          {GROUPS.map((group) => (
            <div
              key={group}
              className="w-full aspect-square rounded-lg"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
                backgroundSize: "200% 100%",
                animation: "skeletonSweep 1.4s ease-in-out infinite",
                animationDelay: `${((period * 18 + group) % 10) * 0.06}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function FilterPanel({
  showFilters,
  categoryFilter,
  groupFilter,
  periodFilter,
  setCategoryFilter,
  setGroupFilter,
  setPeriodFilter,
}: {
  showFilters: boolean;
  categoryFilter: ElementCategory | "all";
  groupFilter: number | null;
  periodFilter: number | null;
  setCategoryFilter: (c: ElementCategory | "all") => void;
  setGroupFilter: (g: number | null) => void;
  setPeriodFilter: (p: number | null) => void;
}) {
  return (
    <div
      className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
      style={{
        maxHeight: showFilters ? "300px" : "0px",
        opacity: showFilters ? 1 : 0,
      }}
    >
      <div className="pt-1 space-y-3">
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

        <div
          className="flex flex-wrap gap-3 justify-center"
          data-ocid="periodic_table.group_period_filters"
        >
          <div className="flex items-center gap-2">
            <label
              htmlFor="group-filter"
              className="text-xs text-muted-foreground font-medium"
            >
              Group
            </label>
            <select
              id="group-filter"
              value={groupFilter ?? ""}
              onChange={(e) =>
                setGroupFilter(e.target.value ? Number(e.target.value) : null)
              }
              className="glass rounded-lg px-2.5 py-1.5 text-xs bg-transparent border border-border/30 outline-none focus:border-accent/50 text-foreground"
              data-ocid="periodic_table.group_select"
            >
              <option value="">All Groups</option>
              {GROUPS.map((g) => (
                <option key={g} value={g}>
                  Group {g}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="period-filter"
              className="text-xs text-muted-foreground font-medium"
            >
              Period
            </label>
            <select
              id="period-filter"
              value={periodFilter ?? ""}
              onChange={(e) =>
                setPeriodFilter(e.target.value ? Number(e.target.value) : null)
              }
              className="glass rounded-lg px-2.5 py-1.5 text-xs bg-transparent border border-border/30 outline-none focus:border-accent/50 text-foreground"
              data-ocid="periodic_table.period_select"
            >
              <option value="">All Periods</option>
              {PERIODS.map((p) => (
                <option key={p} value={p}>
                  Period {p}
                </option>
              ))}
            </select>
          </div>
          {(groupFilter !== null || periodFilter !== null) && (
            <button
              type="button"
              onClick={() => {
                setGroupFilter(null);
                setPeriodFilter(null);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              data-ocid="periodic_table.clear_group_period_button"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page component ─────────────────────────────────────────────────────────────
export function PeriodicTablePage() {
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
    addRecentlyViewed,
  } = useChemStore();

  const filteredElements = useFilteredElements();
  const [showFilters, setShowFilters] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activeTrend, setActiveTrend] = useState<TrendKey>("none");

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Physical state map — computed once per temperature
  const stateMap = useMemo(() => buildStateMap(temperature), [temperature]);

  // Trend map — computed once per trend change, never per tile
  const trendMap = useMemo(() => buildTrendMap(activeTrend), [activeTrend]);

  // Overlay state
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [clickOrigin, setClickOrigin] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  // Search (debounced 300ms)
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchLocal, setSearchLocal] = useState(searchQuery);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchLocal(val);
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = setTimeout(() => setSearchQuery(val), 300);
    },
    [setSearchQuery],
  );

  const clearSearch = useCallback(() => {
    setSearchLocal("");
    setSearchQuery("");
  }, [setSearchQuery]);

  // Element click — capture origin for overlay entrance
  const handleElementClick = useCallback(
    (el: Element, e: React.MouseEvent<HTMLButtonElement>) => {
      addRecentlyViewed(el.symbol);
      const rect = e.currentTarget.getBoundingClientRect();
      setClickOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setSelectedElement(el);
      setOverlayOpen(true);
    },
    [addRecentlyViewed],
  );

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

  // Stable derived sets
  const filteredSet = useMemo(
    () => new Set(filteredElements.map((e) => e.symbol)),
    [filteredElements],
  );

  // Stable per-element click handlers
  const clickHandlers = useMemo(() => {
    const map = new Map<
      string,
      (e: React.MouseEvent<HTMLButtonElement>) => void
    >();
    for (const el of ELEMENTS) {
      map.set(el.symbol, (e) => handleElementClick(el, e));
    }
    return map;
  }, [handleElementClick]);

  // Grid memos — rebuild only when filter, state, or trend map changes
  const mainGrid = useMemo(
    () =>
      PERIODS.map((period) => (
        <div
          key={period}
          className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5"
        >
          <div className="flex items-center justify-center text-[10px] text-muted-foreground/60">
            {period}
          </div>
          {GROUPS.map((group) => {
            const el = getElementAtPosition(period, group);
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
                el={el}
                isFiltered={filteredSet.has(el.symbol)}
                physicalState={stateMap.get(el.symbol) ?? "solid"}
                trendNorm={
                  activeTrend !== "none"
                    ? (trendMap.get(el.symbol) ?? null)
                    : undefined
                }
                onClick={clickHandlers.get(el.symbol)!}
              />
            );
          })}
        </div>
      )),
    [filteredSet, clickHandlers, stateMap, trendMap, activeTrend],
  );

  const lanthanideRow = useMemo(
    () =>
      LANTHANIDES.map((el) => (
        <ElementTile
          key={el.symbol}
          el={el}
          isFiltered={filteredSet.has(el.symbol)}
          physicalState={stateMap.get(el.symbol) ?? "solid"}
          trendNorm={
            activeTrend !== "none"
              ? (trendMap.get(el.symbol) ?? null)
              : undefined
          }
          onClick={clickHandlers.get(el.symbol)!}
        />
      )),
    [filteredSet, clickHandlers, stateMap, trendMap, activeTrend],
  );

  const actinideRow = useMemo(
    () =>
      ACTINIDES.map((el) => (
        <ElementTile
          key={el.symbol}
          el={el}
          isFiltered={filteredSet.has(el.symbol)}
          physicalState={stateMap.get(el.symbol) ?? "solid"}
          trendNorm={
            activeTrend !== "none"
              ? (trendMap.get(el.symbol) ?? null)
              : undefined
          }
          onClick={clickHandlers.get(el.symbol)!}
        />
      )),
    [filteredSet, clickHandlers, stateMap, trendMap, activeTrend],
  );

  return (
    <div className="min-h-screen px-2 md:px-4 py-8">
      <style>{`
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
        input[type=range]::-moz-range-thumb { appearance: none; width: 0; height: 0; border: none; }      `}</style>

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div
          className="text-center mb-8"
          style={{ animation: "fadeSlideIn 0.3s ease-out both" }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Periodic Table
          </h1>
          <p className="text-muted-foreground">
            Click any element to explore its properties
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-5 space-y-3">
          <div className="flex gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, symbol, or number…"
                value={searchLocal}
                onChange={handleSearch}
                className="w-full glass rounded-xl pl-10 pr-10 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground focus:border-accent/50 border border-border/30"
                data-ocid="periodic_table.search_input"
              />
              {searchLocal && (
                <button
                  type="button"
                  onClick={clearSearch}
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
                  "w-4 h-4 transition-transform duration-200",
                  showFilters ? "rotate-180" : "",
                )}
              />
            </button>
          </div>

          <FilterPanel
            showFilters={showFilters}
            categoryFilter={categoryFilter}
            groupFilter={groupFilter}
            periodFilter={periodFilter}
            setCategoryFilter={setCategoryFilter}
            setGroupFilter={setGroupFilter}
            setPeriodFilter={setPeriodFilter}
          />
        </div>

        {/* Controls row: Temperature + Trend side by side on wide screens */}
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <TemperatureSlider />
          <TrendSelector
            activeTrend={activeTrend}
            onChangeTrend={setActiveTrend}
          />
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-2 justify-center mb-6 text-xs">
          {(Object.keys(CATEGORY_LABELS) as ElementCategory[])
            .filter((c) => c !== "unknown")
            .map((cat) => (
              <div
                key={cat}
                className="flex items-center gap-1.5 glass px-2.5 py-1 rounded-full"
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

        {/* Periodic Table Grid */}
        <div className="overflow-x-auto pb-4">
          {!isReady ? (
            <SkeletonGrid />
          ) : (
            <div className="min-w-[700px]">
              {/* Group headers */}
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

              {mainGrid}
              <div className="h-4" />

              {/* Lanthanides */}
              <div className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5 mb-0.5">
                <div className="flex items-center justify-center text-[9px] text-muted-foreground/60">
                  6*
                </div>
                <div className="col-span-2" />
                {lanthanideRow}
                <div className="col-span-1" />
              </div>

              {/* Actinides */}
              <div className="grid grid-cols-[32px_repeat(18,1fr)] gap-0.5">
                <div className="flex items-center justify-center text-[9px] text-muted-foreground/60">
                  7*
                </div>
                <div className="col-span-2" />
                {actinideRow}
                <div className="col-span-1" />
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4 text-xs text-muted-foreground">
          {filteredElements.length} of {ELEMENTS.length} elements shown
        </div>

        {/* Trend description panel */}
        {activeTrend !== "none" && (
          <div
            className="mt-4 max-w-2xl mx-auto rounded-xl px-5 py-3 border border-white/10 text-sm text-foreground/75 leading-relaxed"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(18,18,32,0.55)",
            }}
          >
            {
              {
                atomicRadius:
                  "Atomic radius decreases across a period: nuclear charge increases while electrons enter the same shell, so Zeff pulls the cloud inward. It increases down a group as new shells are added, moving electrons further from the nucleus.",
                electronegativity:
                  "Electronegativity increases across a period (more protons attract shared electrons) and decreases down a group (outer electrons are shielded and further away). Fluorine is the most electronegative element (Pauling: 3.98).",
                ionizationEnergy:
                  "Ionization energy generally increases across a period (stronger nuclear attraction) and decreases down a group (outer electrons are farther away). Key exceptions: IE\u2081(N) > IE\u2081(O) due to N's stable half-filled 2p\u00b3; IE\u2081(Be) > IE\u2081(B).",
                atomicMass:
                  "Atomic mass increases roughly with atomic number. Exceptions occur where isotope distribution differs — notably Ar (39.9) > K (39.1), reversing the order.",
              }[activeTrend]
            }
          </div>
        )}
      </div>

      <ElementOverlay
        element={selectedElement}
        isOpen={overlayOpen}
        onClose={handleClose}
        onNavigate={handleNavigate}
        clickOrigin={clickOrigin}
      />
    </div>
  );
}
