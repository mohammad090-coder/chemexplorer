import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, bK as React, bL as clsx, h as cn, a as useChemStore, d as BookOpen, Z as Zap, f as Link, k as Star } from "./index-DyyHqAHL.js";
import { T as Target } from "./target-BZowL3Z9.js";
import { T as TrendingUp } from "./trending-up-SgpPowcz.js";
import { A as ArrowRight } from "./arrow-right-CLwuw6ws.js";
import { T as TriangleAlert } from "./triangle-alert-rWTe8B-d.js";
import { I as Info } from "./info-BRZoTdGs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const TOPICS = [
  { name: "Periodic Table", keys: ["element", "symbol", "periodic"] },
  {
    name: "Atomic Structure",
    keys: ["atomic", "atom", "electron", "orbital", "shell"]
  },
  { name: "Reactions", keys: ["reaction", "react", "equation", "product"] },
  {
    name: "Molecules",
    keys: ["molecule", "mol", "trend", "radius", "electronegativity"]
  },
  {
    name: "Formulas",
    keys: ["formula", "mole", "thermo", "electro", "kinetic"]
  },
  {
    name: "Lab Skills",
    keys: ["lab", "titration", "precipitate", "organic", "carbon"]
  }
];
const RADAR_LABELS = TOPICS.map((t) => t.name);
const TOPIC_IMPROVEMENT_NOTES = {
  "Periodic Table": "Review group trends and periodicity. Practice element identification quizzes.",
  "Atomic Structure": "Focus on electron configurations and quantum numbers. Try Atom Tracker.",
  Reactions: "Work through balancing equations and identifying reaction types in the Reaction Lab.",
  Molecules: "Study VSEPR theory and bond angles. Use the 3D Molecule Visualizer.",
  Formulas: "Revisit mole concept and formula derivations in the Formula Tab.",
  "Lab Skills": "Practice titration experiments in the Virtual Lab section."
};
const FEATURES = [
  { key: "visited_periodic_table", label: "Periodic Table", icon: "⚛️" },
  { key: "visited_reaction_lab", label: "Reaction Lab", icon: "⚗️" },
  { key: "visited_carbon", label: "Carbon Section", icon: "💎" },
  { key: "visited_reactivity_series", label: "Reactivity Series", icon: "🔥" },
  { key: "visited_atom_tracker", label: "Atom Tracker", icon: "🔬" },
  { key: "visited_formula_tab", label: "Formula Tab", icon: "📐" },
  { key: "visited_molecules", label: "Molecules", icon: "🧬" }
];
function topicFromId(id) {
  const lower = id.toLowerCase();
  for (const t of TOPICS) {
    if (t.keys.some((k) => lower.includes(k))) return t.name;
  }
  return "Periodic Table";
}
function difficultyFromId(id) {
  if (id.includes("hard") || id.includes("h_")) return "hard";
  if (id.includes("med") || id.includes("m_")) return "medium";
  return "easy";
}
function scoreFromHistory(history) {
  if (!history.length)
    return { total: 0, correct: 0, pct: 0, streak: 0, best: 0, improvement: 0 };
  const correct = history.filter((h) => h.correct).length;
  const pct = Math.round(correct / history.length * 100);
  const sorted = [...history].sort((a, b) => a.timestamp - b.timestamp);
  const firstFive = sorted.slice(0, 5);
  const lastFive = sorted.slice(-5);
  const firstPct = firstFive.length ? Math.round(
    firstFive.filter((h) => h.correct).length / firstFive.length * 100
  ) : 0;
  const lastPct = lastFive.length ? Math.round(
    lastFive.filter((h) => h.correct).length / lastFive.length * 100
  ) : 0;
  return {
    total: history.length,
    correct,
    pct,
    streak: 0,
    best: pct,
    improvement: lastPct - firstPct
  };
}
function topicStats(history) {
  return TOPICS.map(({ name, keys }) => {
    const entries = history.filter(
      (h) => keys.some((k) => h.questionId.toLowerCase().includes(k))
    );
    if (!entries.length) return { name, total: 0, correct: 0, pct: 0 };
    const correct = entries.filter((e) => e.correct).length;
    const lastAttempted = Math.max(...entries.map((e) => e.timestamp));
    return {
      name,
      total: entries.length,
      correct,
      pct: Math.round(correct / entries.length * 100),
      lastAttempted
    };
  });
}
function weekScore(history) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1e3;
  const week = history.filter((h) => h.timestamp >= weekAgo);
  if (!week.length) return 0;
  return Math.round(week.filter((h) => h.correct).length / week.length * 100);
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function scoreColor(pct) {
  if (pct >= 70) return "text-emerald-400";
  if (pct >= 40) return "text-amber-400";
  return "text-red-400";
}
function barColor(pct) {
  if (pct >= 70) return "bg-emerald-500";
  if (pct >= 40) return "bg-amber-500";
  return "bg-red-500";
}
function circleStroke(pct) {
  if (pct >= 70) return "oklch(0.72 0.18 142)";
  if (pct >= 40) return "oklch(0.78 0.22 85)";
  return "oklch(0.65 0.19 22)";
}
function buildAttemptSeries(history, maxPoints = 10) {
  if (history.length === 0) return [];
  const sorted = [...history].sort((a, b) => a.timestamp - b.timestamp);
  const bucketSize = Math.max(1, Math.ceil(sorted.length / maxPoints));
  const points = [];
  for (let i = 0; i < sorted.length; i += bucketSize) {
    const bucket = sorted.slice(i, i + bucketSize);
    const pct = Math.round(
      bucket.filter((h) => h.correct).length / bucket.length * 100
    );
    points.push({ x: points.length + 1, y: pct });
  }
  return points;
}
function buildHeatmapData(history) {
  const now = /* @__PURE__ */ new Date();
  now.setHours(23, 59, 59, 999);
  const counts = {};
  for (const h of history) {
    const d = new Date(h.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  const cells = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    cells.push({ date: key, count: counts[key] ?? 0, ts: d.getTime() });
  }
  const weeks = [];
  for (let col = 0; col < 12; col++) {
    weeks.push(cells.slice(col * 7, col * 7 + 7));
  }
  return weeks;
}
function heatmapCellColor(count) {
  if (count === 0) return "oklch(0.22 0.02 265 / 0.5)";
  if (count <= 5) return "oklch(0.72 0.22 195 / 0.55)";
  if (count <= 15) return "oklch(0.65 0.22 260 / 0.75)";
  return "oklch(0.72 0.22 300 / 0.9)";
}
function heatmapCellBorder(count) {
  if (count === 0) return "oklch(0.35 0.02 265 / 0.3)";
  if (count <= 5) return "oklch(0.72 0.22 195 / 0.4)";
  if (count <= 15) return "oklch(0.65 0.22 260 / 0.6)";
  return "oklch(0.72 0.22 300 / 0.8)";
}
function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const month = new Date(week[0].ts).getMonth();
    if (month !== lastMonth) {
      labels.push({
        col,
        label: new Date(week[0].ts).toLocaleString("default", {
          month: "short"
        })
      });
      lastMonth = month;
    }
  });
  return labels;
}
const AnimatedNumber = reactExports.memo(function AnimatedNumber2({
  target,
  suffix = ""
}) {
  const [val, setVal] = reactExports.useState(0);
  const raf = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - (1 - t) ** 3;
      setVal(Math.round(ease * target));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    val,
    suffix
  ] });
});
const StatCard = reactExports.memo(function StatCard2({
  icon,
  label,
  value,
  suffix = "",
  delay = 0,
  highlight = false
}) {
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "progress.stat_card",
      className: `glass rounded-2xl p-5 flex flex-col gap-3 transition-smooth ${highlight ? "ring-1 ring-emerald-500/30 shadow-[0_0_16px_oklch(0.72_0.18_142/0.15)]" : ""}`,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl glass flex items-center justify-center text-accent", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { target: value, suffix }) : "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: label })
        ] })
      ]
    }
  );
});
const DAY_KEY_MAP = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const ActivityHeatmap = reactExports.memo(function ActivityHeatmap2({
  history
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const weeks = buildHeatmapData(history);
  const displayWeeks = isMobile ? weeks.slice(6) : weeks;
  const monthLabels = getMonthLabels(displayWeeks);
  const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];
  const cellSize = isMobile ? 8 : 10;
  const cellGap = 2;
  const [tooltip, setTooltip] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);
  const handleCellHover = reactExports.useCallback(
    (cell, e) => {
      var _a;
      const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        date: cell.date,
        count: cell.count,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    },
    []
  );
  const totalActivity = history.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "progress.heatmap_section",
      className: "glass rounded-2xl p-5",
      ref: containerRef,
      style: { position: "relative" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Activity Heatmap" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              totalActivity,
              " questions answered in last ",
              isMobile ? "6" : "12",
              " ",
              "weeks"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Less" }),
            [0, 3, 9, 20].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: heatmapCellColor(v),
                  border: `1px solid ${heatmapCellBorder(v)}`
                }
              },
              v
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "More" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex mb-1 pl-8", style: { gap: cellGap }, children: displayWeeks.map((_, colIdx) => {
          const label = monthLabels.find((m) => m.col === colIdx);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                width: cellSize,
                fontSize: 9,
                color: "oklch(0.6 0.01 265 / 0.7)",
                flexShrink: 0
              },
              children: label ? label.label : ""
            },
            `month-col-${colIdx}-${(label == null ? void 0 : label.label) ?? ""}`
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col",
              style: { gap: cellGap, marginRight: 4, width: 24 },
              children: DAY_LABELS.map((d, dayIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    height: cellSize,
                    fontSize: 8,
                    color: "oklch(0.6 0.01 265 / 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  },
                  children: d
                },
                DAY_KEY_MAP[dayIdx]
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", style: { gap: cellGap }, children: displayWeeks.map((week) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col",
              style: { gap: cellGap },
              children: week.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  title: `${cell.date}: ${cell.count} questions`,
                  onMouseEnter: (e) => handleCellHover(cell, e),
                  onMouseLeave: () => setTooltip(null),
                  style: {
                    width: cellSize,
                    height: cellSize,
                    borderRadius: 2,
                    background: heatmapCellColor(cell.count),
                    border: `1px solid ${heatmapCellBorder(cell.count)}`,
                    cursor: "default",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.5)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                    flexShrink: 0
                  }
                },
                cell.date
              ))
            },
            week[0].date
          )) })
        ] }),
        tooltip && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute pointer-events-none glass rounded-lg px-3 py-2 text-xs font-medium shadow-lg z-20 border border-border/40",
            style: {
              left: tooltip.x,
              top: tooltip.y - 52,
              transform: "translateX(-50%)",
              whiteSpace: "nowrap"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: new Date(tooltip.date).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: tooltip.count > 0 ? "text-cyan-400" : "text-muted-foreground",
                  children: tooltip.count === 0 ? "No activity" : `${tooltip.count} question${tooltip.count !== 1 ? "s" : ""} answered`
                }
              )
            ]
          }
        )
      ]
    }
  );
});
const RadarChartCanvas = reactExports.memo(function RadarChartCanvas2({
  values,
  labels
}) {
  const canvasRef = reactExports.useRef(null);
  const animRef = reactExports.useRef(0);
  const progressRef = reactExports.useRef(0);
  reactExports.useLayoutEffect(() => {
    var _a;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(((_a = canvas.parentElement) == null ? void 0 : _a.clientWidth) ?? 300, 300);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx = ctxRaw;
    ctx.scale(dpr, dpr);
    const cx2 = size / 2;
    const cy = size / 2;
    const r = size * 0.35;
    const n = labels.length;
    const startTime = performance.now();
    const duration = 1e3;
    function getPoint(factor, i) {
      const angle = Math.PI * 2 * i / n - Math.PI / 2;
      return {
        x: cx2 + factor * r * Math.cos(angle),
        y: cy + factor * r * Math.sin(angle)
      };
    }
    function draw(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - (1 - t) ** 3;
      progressRef.current = ease;
      ctx.clearRect(0, 0, size, size);
      for (const factor of [0.25, 0.5, 0.75, 1]) {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const p = getPoint(factor, i);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = "oklch(0.55 0.015 265 / 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = `${size * 0.028}px JetBrains Mono, monospace`;
        ctx.fillStyle = "oklch(0.55 0.015 265 / 0.7)";
        ctx.textAlign = "left";
        ctx.fillText(
          `${Math.round(factor * 100)}%`,
          cx2 + 3,
          cy - factor * r - 3
        );
      }
      for (let i = 0; i < n; i++) {
        const p = getPoint(1, i);
        ctx.beginPath();
        ctx.moveTo(cx2, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = "oklch(0.55 0.015 265 / 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const factor = ease * ((values[i] ?? 0) / 100);
        const p = getPoint(factor, i);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx2, cy, 0, cx2, cy, r);
      grad.addColorStop(0, "oklch(0.72 0.22 260 / 0.5)");
      grad.addColorStop(1, "oklch(0.55 0.18 295 / 0.2)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.shadowColor = "oklch(0.72 0.22 265 / 0.7)";
      ctx.shadowBlur = 8;
      ctx.strokeStyle = "oklch(0.75 0.22 265)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
      for (let i = 0; i < n; i++) {
        const factor = ease * ((values[i] ?? 0) / 100);
        const p = getPoint(factor, i);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.75 0.22 265)";
        ctx.fill();
        ctx.strokeStyle = "oklch(0.12 0.02 265)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      const labelR = r * 1.25;
      ctx.shadowBlur = 0;
      for (let i = 0; i < n; i++) {
        const lp = getPoint(labelR / r, i);
        const pct = values[i] ?? 0;
        const isLeft = lp.x < cx2 - 8;
        const isRight = lp.x > cx2 + 8;
        ctx.textAlign = isLeft ? "right" : isRight ? "left" : "center";
        ctx.font = `bold ${size * 0.032}px General Sans, sans-serif`;
        ctx.fillStyle = "oklch(0.90 0.01 265)";
        ctx.fillText(labels[i], lp.x, lp.y - 5);
        ctx.font = `${size * 0.03}px JetBrains Mono, monospace`;
        ctx.fillStyle = circleStroke(pct);
        ctx.fillText(`${pct}%`, lp.x, lp.y + 8);
      }
      if (t < 1) {
        animRef.current = requestAnimationFrame(draw);
      }
    }
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [values, labels]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "progress.radar_chart",
      className: "w-full flex justify-center",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, "aria-label": "Skill radar chart", role: "img" })
    }
  );
});
const RadarChart = reactExports.memo(function RadarChart2({
  values,
  labels
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadarChartCanvas, { values, labels });
});
const LineChart = reactExports.memo(function LineChart2({
  points
}) {
  const [drawn, setDrawn] = reactExports.useState(false);
  const pathRef = reactExports.useRef(null);
  const [tooltip, setTooltip] = reactExports.useState(null);
  const [pathLen, setPathLen] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);
  const handleMouseEnter = reactExports.useCallback(
    (p, svgX, svgY) => {
      setTooltip({ x: svgX, y: svgY, attempt: p.x, score: p.y });
    },
    []
  );
  const W = 500;
  const H = 180;
  const PAD = { top: 16, right: 24, bottom: 32, left: 40 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const gridLines = [25, 50, 75, 100];
  if (points.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "progress.line_chart_empty",
        className: "flex items-center justify-center h-32 text-muted-foreground text-sm",
        children: "Take more quizzes to see your score trend"
      }
    );
  }
  const maxX = Math.max(points.length - 1, 1);
  const px = (xi) => PAD.left + xi / maxX * chartW;
  const py = (yi) => PAD.top + chartH - yi / 100 * chartH;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(p.y)}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "progress.line_chart",
      className: "relative w-full overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: `0 0 ${W} ${H}`,
            width: "100%",
            role: "img",
            "aria-label": "Score trend line chart",
            style: { overflow: "visible" },
            children: [
              gridLines.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: PAD.left,
                    y1: py(g),
                    x2: W - PAD.right,
                    y2: py(g),
                    stroke: "oklch(0.55 0.015 265 / 0.2)",
                    strokeWidth: "1",
                    strokeDasharray: "4 4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "text",
                  {
                    x: PAD.left - 6,
                    y: py(g) + 4,
                    fontSize: "9",
                    fill: "oklch(0.55 0.015 265 / 0.7)",
                    textAnchor: "end",
                    children: [
                      g,
                      "%"
                    ]
                  }
                )
              ] }, `grid-${g}`)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "lineAreaGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "stop",
                  {
                    offset: "0%",
                    stopColor: "oklch(0.65 0.22 265)",
                    stopOpacity: "0.3"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "stop",
                  {
                    offset: "100%",
                    stopColor: "oklch(0.65 0.22 265)",
                    stopOpacity: "0.02"
                  }
                )
              ] }) }),
              points.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: `${d} L ${px(points.length - 1)} ${py(0)} L ${px(0)} ${py(0)} Z`,
                  fill: "url(#lineAreaGrad)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  ref: pathRef,
                  d,
                  fill: "none",
                  stroke: "oklch(0.65 0.22 265)",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  style: pathLen > 0 ? {
                    strokeDasharray: pathLen,
                    strokeDashoffset: drawn ? 0 : pathLen,
                    transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  } : {}
                }
              ),
              points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "text",
                {
                  x: px(i),
                  y: H - 4,
                  fontSize: "9",
                  fill: "oklch(0.55 0.015 265 / 0.7)",
                  textAnchor: "middle",
                  children: [
                    "#",
                    p.x
                  ]
                },
                `xl-${p.x}`
              )),
              points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: px(i),
                  cy: py(p.y),
                  r: "5",
                  fill: "oklch(0.65 0.22 265)",
                  stroke: "oklch(0.12 0.02 265)",
                  strokeWidth: "2",
                  style: { cursor: "pointer" },
                  onMouseEnter: () => handleMouseEnter(p, px(i), py(p.y)),
                  onMouseLeave: () => setTooltip(null)
                },
                `dot-${p.x}`
              ))
            ]
          }
        ),
        tooltip && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute pointer-events-none glass rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg border border-border/40 z-10",
            style: {
              left: `${tooltip.x / W * 100}%`,
              top: `${tooltip.y / H * 100}%`,
              transform: "translate(-50%, -110%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                "Attempt #",
                tooltip.attempt,
                ": "
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: scoreColor(tooltip.score), children: [
                tooltip.score,
                "%"
              ] })
            ]
          }
        )
      ]
    }
  );
});
const CircleChart = reactExports.memo(function CircleChart2({
  pct,
  label,
  sublabel,
  delay = 0
}) {
  const [animPct, setAnimPct] = reactExports.useState(0);
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - animPct / 100 * circ;
  reactExports.useEffect(() => {
    const t = setTimeout(() => {
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const t2 = Math.min((now - start) / duration, 1);
        const ease = 1 - (1 - t2) ** 3;
        setAnimPct(Math.round(ease * pct));
        if (t2 < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "progress.circle_chart",
      className: "glass rounded-2xl p-5 flex flex-col items-center gap-3 transition-smooth hover:scale-105",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              width: "112",
              height: "112",
              "aria-label": `${label}: ${animPct}%`,
              role: "img",
              style: { transform: "rotate(-90deg)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "56",
                    cy: "56",
                    r,
                    fill: "none",
                    style: { stroke: "oklch(0.28 0.015 265 / 0.4)" },
                    strokeWidth: "10"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "56",
                    cy: "56",
                    r,
                    fill: "none",
                    stroke: circleStroke(pct),
                    strokeWidth: "10",
                    strokeLinecap: "round",
                    strokeDasharray: circ,
                    strokeDashoffset: offset,
                    style: { transition: "stroke-dashoffset 0.05s linear" }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xl font-display font-bold ${scoreColor(pct)}`, children: [
            animPct,
            "%"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sublabel })
        ] })
      ]
    }
  );
});
const TopicProgressBar = reactExports.memo(function TopicProgressBar2({
  stat,
  index
}) {
  const [width, setWidth] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setWidth(stat.pct), 300 + index * 80);
    return () => clearTimeout(t);
  }, [stat.pct, index]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `progress.topic_bar.${index + 1}`,
      className: "flex flex-col gap-1.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: stat.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono font-bold ${scoreColor(stat.pct)}`, children: stat.total === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Not started" }) : `${stat.pct}%` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-full rounded-full transition-all duration-700 ease-out ${barColor(stat.pct)}`,
            style: { width: `${width}%` }
          }
        ) }),
        stat.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          stat.correct,
          "/",
          stat.total,
          " correct"
        ] })
      ]
    }
  );
});
const WeakAreasGrid = reactExports.memo(function WeakAreasGrid2({
  topics
}) {
  const [selected, setSelected] = reactExports.useState(null);
  function tileAccuracyStyle(pct, total) {
    if (total === 0) {
      return {
        bg: "oklch(0.22 0.02 265 / 0.4)",
        border: "oklch(0.35 0.02 265 / 0.3)",
        label: "text-muted-foreground",
        badge: "Not started",
        badgeClass: "bg-muted/50 text-muted-foreground"
      };
    }
    if (pct < 40) {
      return {
        bg: "oklch(0.4 0.15 22 / 0.2)",
        border: "oklch(0.65 0.19 22 / 0.45)",
        label: "text-red-400",
        badge: "Weak",
        badgeClass: "bg-red-500/15 text-red-400 border-red-500/30 border"
      };
    }
    if (pct < 70) {
      return {
        bg: "oklch(0.5 0.15 85 / 0.15)",
        border: "oklch(0.78 0.22 85 / 0.4)",
        label: "text-amber-400",
        badge: "Improving",
        badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30 border"
      };
    }
    return {
      bg: "oklch(0.4 0.12 142 / 0.15)",
      border: "oklch(0.72 0.18 142 / 0.45)",
      label: "text-emerald-400",
      badge: "Strong",
      badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border"
    };
  }
  const selectedTopic = selected ? topics.find((t) => t.name === selected) : null;
  const selectedStyle = selectedTopic ? tileAccuracyStyle(selectedTopic.pct, selectedTopic.total) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "progress.weak_areas_grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: topics.map((topic, i) => {
      const style = tileAccuracyStyle(topic.pct, topic.total);
      const isSelected = selected === topic.name;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `progress.topic_tile.${i + 1}`,
          onClick: () => setSelected(isSelected ? null : topic.name),
          className: "rounded-xl p-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          style: {
            background: style.bg,
            border: `1px solid ${style.border}`,
            transform: isSelected ? "scale(1.03)" : "scale(1)",
            boxShadow: isSelected ? `0 0 16px ${style.border}, inset 0 1px 0 oklch(1 0 0 / 0.08)` : "inset 0 1px 0 oklch(1 0 0 / 0.05)"
          },
          "aria-expanded": isSelected,
          "aria-label": `${topic.name}: ${topic.pct}% accuracy`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate pr-1", children: topic.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ${style.badgeClass}`,
                  children: style.badge
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-display font-bold ${style.label}`, children: topic.total === 0 ? "—" : `${topic.pct}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: topic.total === 0 ? "No attempts yet" : `${topic.correct}/${topic.total} correct` })
          ]
        },
        topic.name
      );
    }) }),
    selectedTopic && selectedStyle && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "progress.topic_detail_panel",
        className: "mt-3 rounded-xl p-4 transition-all duration-300",
        style: {
          background: selectedStyle.bg,
          border: `1px solid ${selectedStyle.border}`,
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.07)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: selectedTopic.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-lg font-display font-bold ${selectedStyle.label}`,
                  children: selectedTopic.total === 0 ? "No data" : `${selectedTopic.pct}% accuracy`
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelected(null),
                className: "text-muted-foreground hover:text-foreground transition-colors p-1",
                "aria-label": "Close panel",
                "data-ocid": "progress.topic_panel_close_button",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mb-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-base font-bold ${selectedStyle.label}`, children: selectedTopic.total === 0 ? "—" : `${selectedTopic.pct}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Accuracy" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: selectedTopic.total }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Attempted" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground truncate", children: selectedTopic.lastAttempted ? new Date(selectedTopic.lastAttempted).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short"
                }
              ) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Last tried" })
            ] })
          ] }),
          selectedTopic.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2 text-xs text-muted-foreground mb-3 p-2 rounded-lg",
              style: { background: "oklch(0.2 0.02 265 / 0.4)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "shrink-0 mt-0.5 text-primary/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: TOPIC_IMPROVEMENT_NOTES[selectedTopic.name] ?? "Keep practicing to improve your score." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              className: "gap-1.5 text-xs w-full",
              "data-ocid": "progress.topic_practice_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/practice", children: [
                "Practice ",
                selectedTopic.name,
                " Now ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
              ] })
            }
          )
        ]
      }
    )
  ] });
});
const DifficultyBadge = reactExports.memo(function DifficultyBadge2({ id }) {
  const diff = difficultyFromId(id);
  const map = {
    easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    hard: "bg-red-500/20 text-red-400 border-red-500/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-xs px-2 py-0.5 rounded-full border font-medium ${map[diff]}`,
      children: diff
    }
  );
});
function ProgressPage() {
  const { quizHistory, quizScore, quizStreak, recentlyViewed } = useChemStore();
  const stats = scoreFromHistory(quizHistory);
  const topics = topicStats(quizHistory);
  const weekPct = weekScore(quizHistory);
  const elementsLearned = Math.min(recentlyViewed.length, 118);
  const elementsLearntPct = Math.round(elementsLearned / 118 * 100);
  const overallMastery = stats.total === 0 ? 0 : Math.round(quizScore / Math.max(stats.total, 1) * 100);
  const weakTopics = topics.filter(
    (t) => t.total > 0 && (t.pct < 50 || t.total < 2)
  );
  const recentActivity = quizHistory.slice(0, 5);
  const attemptSeries = buildAttemptSeries(quizHistory, 10);
  const radarValues = topics.map((t) => t.pct);
  const [exploredFeatures, setExploredFeatures] = reactExports.useState({});
  reactExports.useEffect(() => {
    const result = {};
    for (const f of FEATURES)
      result[f.key] = localStorage.getItem(f.key) === "true";
    setExploredFeatures(result);
  }, []);
  const exploredCount = Object.values(exploredFeatures).filter(Boolean).length;
  const hasData = quizHistory.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "progress.page", className: "min-h-screen pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-8 pb-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl glass flex items-center justify-center text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold text-foreground", children: "Learning Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track your chemistry mastery" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 space-y-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.overview_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "Performance Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18 }),
              label: "Quizzes Taken",
              value: stats.total,
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 18 }),
              label: "Average Score",
              value: stats.pct,
              suffix: "%",
              delay: 100
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18 }),
              label: "Current Streak",
              value: quizStreak,
              delay: 200
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
              label: "Improvement",
              value: Math.abs(stats.improvement),
              suffix: stats.improvement >= 0 ? "% ↑" : "% ↓",
              delay: 300,
              highlight: stats.improvement > 0
            }
          )
        ] }),
        !hasData && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "progress.overview_empty_state",
            className: "mt-4 glass rounded-2xl p-6 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "🚀" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "Start your chemistry journey!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Take a quiz to start tracking your progress." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/practice", "data-ocid": "progress.start_practice_button", children: [
                "Practice Now ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              ] }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.heatmap_container_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "Daily Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityHeatmap, { history: quizHistory })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.skill_graph_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "Skill Graph" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4 text-center", children: "Your proficiency across 6 chemistry topics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadarChart, { values: radarValues, labels: RADAR_LABELS }),
          !hasData && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground mt-3", children: "Complete quizzes to populate your skill graph" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.trend_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: [
          "Score Trend",
          attemptSeries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs normal-case font-normal text-muted-foreground", children: [
            "(",
            quizHistory.length,
            " total answer",
            quizHistory.length !== 1 ? "s" : "",
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LineChart, { points: attemptSeries }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.circles_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "Mastery Indicators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleChart,
            {
              pct: overallMastery,
              label: "Overall Mastery",
              sublabel: `${quizScore} pts earned`,
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleChart,
            {
              pct: weekPct,
              label: "This Week",
              sublabel: "7-day score",
              delay: 150
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleChart,
            {
              pct: elementsLearntPct,
              label: "Elements Learned",
              sublabel: `${elementsLearned} / 118`,
              delay: 300
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.accuracy_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Accuracy by Topic" }),
          weakTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/15 text-red-400 border-red-500/30 border text-xs gap-1 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 10 }),
            weakTopics.length,
            " weak"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Click any topic tile to see accuracy details and practice suggestions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeakAreasGrid, { topics })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.topics_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "Topics Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-5 space-y-5", children: topics.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TopicProgressBar, { stat, index: i }, stat.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.weak_topics_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Weak Topics" }),
          weakTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/15 text-red-400 border-red-500/30 border text-xs gap-1 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 10 }),
            weakTopics.length,
            " needs practice"
          ] })
        ] }),
        weakTopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "progress.weak_topics_empty_state",
            className: "glass rounded-2xl p-6 flex items-center gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 18, className: "text-emerald-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: hasData ? "Great job! All practiced topics above 50%" : "No data yet — take a quiz first!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: hasData ? "Keep pushing all topics above 70% for full mastery." : "Your weak topics will appear here after you practice." })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: weakTopics.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `progress.weak_topic.${i + 1}`,
            className: "glass rounded-xl p-4 flex items-center justify-between gap-4 border border-red-500/15 hover:border-red-500/30 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 14, className: "text-red-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400 font-mono font-semibold", children: [
                      t.pct,
                      "%"
                    ] }),
                    " ",
                    "correct • ",
                    t.total,
                    " attempt",
                    t.total !== 1 ? "s" : "",
                    t.total < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-amber-400", children: "(too few attempts)" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "sm",
                  variant: "secondary",
                  className: "shrink-0 gap-1.5 text-xs",
                  "data-ocid": `progress.practice_weak_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/practice", children: [
                    "Practice Now ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
                  ] })
                }
              )
            ]
          },
          t.name
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.recent_activity_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "Recent Activity" }),
        recentActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "progress.recent_activity_empty_state",
            className: "glass rounded-2xl p-8 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "📚" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No quizzes taken yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Try Practice Mode to start building your history!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/practice", "data-ocid": "progress.go_practice_button", children: [
                "Try Practice Mode ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              ] }) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl overflow-hidden divide-y divide-border/30", children: recentActivity.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `progress.activity_item.${i + 1}`,
            className: "px-5 py-3.5 flex items-center gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${entry.correct ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`,
                  children: entry.correct ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: topicFromId(entry.questionId) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(entry.timestamp) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { id: entry.questionId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: entry.correct ? "border-emerald-500/40 text-emerald-400" : "border-red-500/40 text-red-400",
                    children: entry.correct ? "Correct" : "Wrong"
                  }
                )
              ] })
            ]
          },
          `${entry.questionId}-${entry.timestamp}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.features_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Features Explored" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 11 }),
            exploredCount,
            " / ",
            FEATURES.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: FEATURES.map((f, i) => {
          const done = exploredFeatures[f.key] ?? false;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `progress.feature_tile.${i + 1}`,
              className: `rounded-xl p-4 flex flex-col items-center gap-2 text-center transition-smooth border ${done ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_oklch(0.72_0.18_142/0.18)]" : "glass opacity-50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: f.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs font-medium ${done ? "text-emerald-400" : "text-muted-foreground"}`,
                    children: f.label
                  }
                ),
                done && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, className: "text-emerald-400" })
              ]
            },
            f.key
          );
        }) })
      ] })
    ] })
  ] });
}
export {
  ProgressPage
};
