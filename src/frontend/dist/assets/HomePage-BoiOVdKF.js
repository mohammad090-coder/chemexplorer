import { c as createLucideIcon, u as useNavigate, a as useChemStore, b as useExploreStore, r as reactExports, E as ELEMENTS, j as jsxRuntimeExports, m as motion, A as Atom, B as Brain, F as FlaskConical, D as Diamond, T as TestTube, C as CircleDot, P as Pencil, d as BookOpen, Z as Zap, L as Lightbulb, e as ChartNoAxesColumn, G as GitCompare, f as Link } from "./index-DyyHqAHL.js";
import { E as ElementOverlay } from "./ElementOverlay-CHo7W3gD.js";
import { C as CATEGORY_TEXT, a as CATEGORY_GRADIENT } from "./element-DKp8uEQx.js";
import { A as ArrowRight } from "./arrow-right-CLwuw6ws.js";
import { H as Heart } from "./heart-CGvPZOYr.js";
import { L as LayoutDashboard } from "./layout-dashboard--eGv8RUJ.js";
import "./AtomicStructure-DUFrMLIO.js";
import "./chevron-left-oyoINw6R.js";
import "./chevron-right-6gh7dKif.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$2);
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
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
];
const Keyboard = createLucideIcon("keyboard", __iconNode);
const DAILY_PICKS = ["Au", "C", "Fe", "Ne", "Ag", "U", "He", "O", "N", "Si"];
const dayOfYear = Math.floor(
  (Date.now() - new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 0).getTime()) / 864e5
);
const DAILY_SYMBOL = DAILY_PICKS[dayOfYear % DAILY_PICKS.length];
const ELEMENT_FACTS = {
  Au: "Gold has been treasured since antiquity and is so malleable that 1g can be hammered into a 1 m² sheet.",
  C: "Carbon is the basis of all known life and exists as diamond, graphite, graphene, and fullerene.",
  Fe: "Iron is the most abundant element on Earth by mass and the core of haemoglobin in your blood.",
  Ne: "Neon produces a bright orange-red glow in signs and is the 5th most abundant element in the universe.",
  Ag: "Silver has the highest thermal and electrical conductivity of any metal and is a natural antimicrobial.",
  U: "Uranium contains more energy per gram than any other fuel — one pellet equals about 17,000 cubic feet of gas.",
  He: "Helium is the second most abundant element in the universe and the only element discovered in the Sun first.",
  O: "Oxygen makes up 21% of Earth's atmosphere and is present in more compounds than any other element.",
  N: "Nitrogen gas makes up 78% of Earth's atmosphere and is essential for all amino acids and DNA bases.",
  Si: "Silicon is the second most abundant element in Earth's crust and the backbone of modern electronics."
};
const STATS = [
  { label: "Elements", value: "118", suffix: "" },
  { label: "Questions", value: "300", suffix: "+" },
  { label: "Reactions", value: "200", suffix: "+" },
  { label: "Curriculum", value: "11 & 12", suffix: "" }
];
const ALL_FEATURES = [
  {
    icon: Atom,
    label: "Periodic Table",
    desc: "Explore all 118 elements with temperature states & trends",
    to: "/periodic-table",
    gradient: "from-blue-500/20 via-violet-500/10 to-violet-500/20",
    border: "hover:border-blue-400/50",
    glow: "hover:shadow-blue-500/20",
    iconColor: "text-blue-400"
  },
  {
    icon: FlaskConical,
    label: "Reaction Lab",
    desc: "Mix chemicals, balance equations, and see reactions animate",
    to: "/reaction-lab",
    gradient: "from-emerald-500/20 via-teal-500/10 to-teal-500/20",
    border: "hover:border-emerald-400/50",
    glow: "hover:shadow-emerald-500/20",
    iconColor: "text-emerald-400"
  },
  {
    icon: Diamond,
    label: "Carbon Lab",
    desc: "Diamond, Graphite, Graphene, Fullerene — structures & uses",
    to: "/carbon",
    gradient: "from-slate-400/20 via-zinc-500/10 to-zinc-500/20",
    border: "hover:border-slate-300/50",
    glow: "hover:shadow-slate-400/20",
    iconColor: "text-slate-300"
  },
  {
    icon: Brain,
    label: "Practice Mode",
    desc: "300+ MCQ, assertion-reason, numerical & reaction questions",
    to: "/practice",
    gradient: "from-rose-500/20 via-pink-500/10 to-pink-500/20",
    border: "hover:border-rose-400/50",
    glow: "hover:shadow-rose-500/20",
    iconColor: "text-rose-400"
  },
  {
    icon: TestTube,
    label: "Virtual Lab",
    desc: "Titration, heating reactions, and precipitation experiments",
    to: "/virtual-lab",
    gradient: "from-lime-500/20 via-emerald-500/10 to-emerald-500/20",
    border: "hover:border-lime-400/50",
    glow: "hover:shadow-lime-500/20",
    iconColor: "text-lime-400"
  },
  {
    icon: CircleDot,
    label: "Molecules",
    desc: "3D rotating models: H₂O, CH₄, CO₂, benzene & more",
    to: "/molecules",
    gradient: "from-sky-500/20 via-blue-500/10 to-blue-500/20",
    border: "hover:border-sky-400/50",
    glow: "hover:shadow-sky-500/20",
    iconColor: "text-sky-400"
  },
  {
    icon: Pencil,
    label: "Molecule Builder",
    desc: "Drag & drop atoms, draw bonds, detect compounds instantly",
    to: "/molecule-builder",
    gradient: "from-teal-500/20 via-cyan-500/10 to-cyan-500/20",
    border: "hover:border-teal-400/50",
    glow: "hover:shadow-teal-500/20",
    iconColor: "text-teal-300"
  },
  {
    icon: Atom,
    label: "Atom Tracker",
    desc: "Step-by-step electron configuration with animated orbitals",
    to: "/atom-tracker",
    gradient: "from-violet-500/20 via-purple-500/10 to-purple-500/20",
    border: "hover:border-violet-400/50",
    glow: "hover:shadow-violet-500/20",
    iconColor: "text-violet-400"
  },
  {
    icon: BookOpen,
    label: "Formula Hub",
    desc: "Class 11 & 12 formulas with derivations and quick solve",
    to: "/formulas",
    gradient: "from-amber-500/20 via-orange-500/10 to-orange-500/20",
    border: "hover:border-amber-400/50",
    glow: "hover:shadow-amber-500/20",
    iconColor: "text-amber-400"
  },
  {
    icon: Zap,
    label: "Reactivity Series",
    desc: "Metal reactivity rankings and reaction simulations",
    to: "/reactivity-series",
    gradient: "from-yellow-500/20 via-amber-500/10 to-amber-500/20",
    border: "hover:border-yellow-400/50",
    glow: "hover:shadow-yellow-500/20",
    iconColor: "text-yellow-400"
  },
  {
    icon: Lightbulb,
    label: "Smart Features",
    desc: "Periodic trends, named reactions, revision cards & notes",
    to: "/smart-features",
    gradient: "from-orange-500/20 via-red-500/10 to-red-500/20",
    border: "hover:border-orange-400/50",
    glow: "hover:shadow-orange-500/20",
    iconColor: "text-orange-400"
  },
  {
    icon: ChartNoAxesColumn,
    label: "Progress",
    desc: "Track learning with skill graphs and analytics dashboards",
    to: "/progress",
    gradient: "from-indigo-500/20 via-blue-500/10 to-blue-500/20",
    border: "hover:border-indigo-400/50",
    glow: "hover:shadow-indigo-500/20",
    iconColor: "text-indigo-400"
  },
  {
    icon: GitCompare,
    label: "Compare",
    desc: "Side-by-side comparison of any two elements",
    to: "/compare",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-pink-500/20",
    border: "hover:border-fuchsia-400/50",
    glow: "hover:shadow-fuchsia-500/20",
    iconColor: "text-fuchsia-400"
  },
  {
    icon: Heart,
    label: "Favorites",
    desc: "Save and revisit your favorite elements instantly",
    to: "/favorites",
    gradient: "from-red-500/20 via-rose-500/10 to-rose-500/20",
    border: "hover:border-red-400/50",
    glow: "hover:shadow-red-500/20",
    iconColor: "text-red-400"
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    desc: "Your personal chemistry learning overview",
    to: "/dashboard",
    gradient: "from-teal-500/20 via-cyan-500/10 to-cyan-500/20",
    border: "hover:border-teal-400/50",
    glow: "hover:shadow-teal-500/20",
    iconColor: "text-teal-400"
  },
  {
    icon: ClipboardList,
    label: "Exam Mode",
    desc: "Chapter-wise timed exams with score tracking & performance breakdown",
    to: "/exam-mode",
    gradient: "from-cyan-500/20 via-sky-500/10 to-sky-500/20",
    border: "hover:border-cyan-400/50",
    glow: "hover:shadow-cyan-500/20",
    iconColor: "text-cyan-400"
  }
];
const SPOTLIGHT_TOOLS = [
  {
    emoji: "🧪",
    title: "Virtual Lab",
    tagline: "Run real chemistry experiments",
    to: "/virtual-lab",
    animationType: "bubbles",
    glowColor: "rgba(163,230,53,0.15)",
    borderHover: "hover:border-lime-400/40",
    shadowHover: "hover:shadow-lime-500/15"
  },
  {
    emoji: "⚗️",
    title: "Reaction Simulator",
    tagline: "200+ reactions with step-by-step explanations",
    to: "/reaction-lab",
    animationType: "equation",
    glowColor: "rgba(52,211,153,0.15)",
    borderHover: "hover:border-emerald-400/40",
    shadowHover: "hover:shadow-emerald-500/15"
  },
  {
    emoji: "⚛️",
    title: "Molecule Builder",
    tagline: "Build molecules atom by atom",
    to: "/molecule-builder",
    animationType: "atoms",
    glowColor: "rgba(34,211,238,0.15)",
    borderHover: "hover:border-cyan-400/40",
    shadowHover: "hover:shadow-cyan-500/15"
  },
  {
    emoji: "💎",
    title: "Carbon Explorer",
    tagline: "From allotropes to organic chemistry",
    to: "/carbon",
    animationType: "hexagon",
    glowColor: "rgba(148,163,184,0.15)",
    borderHover: "hover:border-slate-300/40",
    shadowHover: "hover:shadow-slate-400/15"
  },
  {
    emoji: "🎓",
    title: "Practice Mode",
    tagline: "300+ questions with instant feedback",
    to: "/practice",
    animationType: "progress",
    glowColor: "rgba(251,113,133,0.15)",
    borderHover: "hover:border-rose-400/40",
    shadowHover: "hover:shadow-rose-500/15"
  }
];
const SpotlightPreview = reactExports.memo(function SpotlightPreview2({
  type
}) {
  if (type === "bubbles") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-center gap-3 h-16", children: [
      [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-3 h-3 rounded-full bg-lime-400/70",
          style: {
            animation: `spotlight-bubble 1.4s ease-in-out ${i * 0.22}s infinite`
          }
        },
        i
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-8 h-14 rounded-t-full rounded-b-sm border border-lime-400/40 flex items-end justify-center pb-1",
          style: { background: "rgba(163,230,53,0.08)" }
        }
      )
    ] });
  }
  if (type === "equation") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-16 flex items-center justify-center font-mono text-sm text-emerald-300/90 font-semibold",
        style: { animation: "spotlight-fade-cycle 3s ease-in-out infinite" },
        children: "H₂ + O₂ → H₂O"
      }
    );
  }
  if (type === "atoms") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-16 flex items-center justify-center",
        style: { animation: "spotlight-spin 6s linear infinite" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "64", height: "52", viewBox: "0 0 64 52", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "32",
              y1: "8",
              x2: "8",
              y2: "44",
              stroke: "rgba(34,211,238,0.5)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "32",
              y1: "8",
              x2: "56",
              y2: "44",
              stroke: "rgba(34,211,238,0.5)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "8",
              y1: "44",
              x2: "56",
              y2: "44",
              stroke: "rgba(34,211,238,0.5)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "8", r: "6", fill: "rgba(34,211,238,0.7)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "8", cy: "44", r: "6", fill: "rgba(167,243,208,0.7)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "56", cy: "44", r: "6", fill: "rgba(251,191,36,0.7)" })
        ] })
      }
    );
  }
  if (type === "hexagon") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-16 flex items-center justify-center",
        style: { animation: "spotlight-spin 8s linear infinite" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "52", height: "52", viewBox: "0 0 52 52", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "polygon",
            {
              points: "26,4 46,15 46,37 26,48 6,37 6,15",
              fill: "none",
              stroke: "rgba(148,163,184,0.7)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "26", r: "4", fill: "rgba(148,163,184,0.5)" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 flex flex-col justify-center gap-2 w-full px-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-rose-300/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "80%" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full bg-gradient-to-r from-rose-400/80 to-pink-400/80",
        style: { animation: "spotlight-progress 2.5s ease-out infinite" }
      }
    ) })
  ] });
});
const SpotlightCard = reactExports.memo(function SpotlightCard2({
  tool,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      },
      whileHover: { y: -4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: tool.to,
          className: [
            "group relative flex flex-col gap-3 rounded-2xl p-5 h-full",
            "backdrop-blur-xl bg-white/5 border border-white/10",
            tool.borderHover,
            "shadow-lg",
            tool.shadowHover,
            "transition-all duration-300"
          ].join(" "),
          style: {
            background: `linear-gradient(135deg, ${tool.glowColor} 0%, rgba(255,255,255,0.02) 100%)`
          },
          "data-ocid": `home.spotlight_card.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                style: { boxShadow: `inset 0 0 20px ${tool.glowColor}` }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SpotlightPreview, { type: tool.animationType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col gap-1 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", role: "img", "aria-label": tool.title, children: tool.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: tool.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: tool.tagline })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300 border border-blue-400/40 group-hover:bg-blue-500/20 transition-colors duration-200", children: [
              "Try Now",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" })
            ] }) })
          ]
        }
      )
    }
  );
});
function getIconAnimClass(label) {
  if (label === "Virtual Lab") return "icon-bubble-float";
  if (label === "Molecule Builder" || label === "Molecules")
    return "icon-slow-rotate";
  if (label === "Carbon Lab") return "icon-carbon-glow";
  if (label === "Practice Mode" || label === "Exam Mode")
    return "icon-practice-pulse";
  if (label === "Reaction Lab") return "icon-reaction-shimmer";
  return "icon-glow-pulse";
}
const FeatureCard = reactExports.memo(function FeatureCard2({
  feature,
  index
}) {
  const cardRef = reactExports.useRef(null);
  const innerRef = reactExports.useRef(null);
  const [inView, setInView] = reactExports.useState(false);
  const [tilt, setTilt] = reactExports.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(!!(entry == null ? void 0 : entry.isIntersecting)),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const handleMouseMove = reactExports.useCallback(
    (e) => {
      const card = innerRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * -8, y: dx * 8 });
    },
    []
  );
  const handleMouseLeave = reactExports.useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);
  const handleMouseEnter = reactExports.useCallback(() => setIsHovered(true), []);
  const iconAnimClass = getIconAnimClass(feature.label);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref: cardRef,
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        delay: index * 0.05,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          ref: innerRef,
          to: feature.to,
          className: [
            "group relative flex flex-col items-start gap-3 rounded-2xl p-6 min-h-[130px]",
            "feature-card-glass",
            "bg-gradient-to-br",
            feature.gradient
          ].join(" "),
          style: {
            transform: isHovered ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.02)` : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(0,0,0.2,1)",
            animationDelay: `${index % 4 * 0.4}s`
          },
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
          onMouseEnter: handleMouseEnter,
          "data-ocid": `home.feature_card.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                style: {
                  boxShadow: "inset 0 0 18px rgba(255,255,255,0.06), 0 0 20px rgba(99,153,237,0.12)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-foreground/5 border border-white/10 group-hover:border-white/25 transition-colors duration-300 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                feature.icon,
                {
                  className: [
                    `w-5 h-5 ${feature.iconColor}`,
                    inView ? iconAnimClass : "icon-anim-paused"
                  ].join(" ")
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground min-w-0 truncate", children: feature.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "ml-auto shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold\n              bg-white/8 border border-white/15 text-white/70\n              opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0\n              transition-all duration-300",
                  children: [
                    "Try",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowRight,
                      {
                        className: "w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200",
                        "aria-hidden": "true"
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed relative z-10", children: feature.desc })
          ]
        }
      )
    }
  );
});
const DailyElementCard = reactExports.memo(function DailyElementCard2({
  el,
  onClick
}) {
  var _a;
  const fact = ELEMENT_FACTS[el.symbol] ?? `Atomic number ${el.atomicNumber}.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, scale: 0.93 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      whileHover: { y: -4 },
      whileTap: { scale: 0.98 },
      onClick,
      className: [
        "group relative rounded-3xl p-8 text-left overflow-hidden w-full",
        "bg-gradient-to-br",
        CATEGORY_GRADIENT[el.category],
        "shadow-2xl hover:shadow-[0_32px_64px_rgba(0,0,0,0.5)] transition-shadow duration-500"
      ].join(" "),
      "data-ocid": "home.daily_element_card",
      "aria-label": `Featured element: ${el.name}. Click to learn more.`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-400 rounded-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/25 transition-all duration-400 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row sm:items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/60 font-mono mb-1", children: [
              "#",
              el.atomicNumber,
              " · ",
              el.category.replace(/-/g, " ")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl sm:text-8xl font-display font-bold text-foreground leading-none drop-shadow-lg", children: el.symbol }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold text-foreground/90 mt-1", children: el.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `text-sm mt-1 font-mono font-medium ${CATEGORY_TEXT[el.category]}`,
                children: ((_a = el.atomicMass) == null ? void 0 : _a.toFixed) ? `A = ${el.atomicMass.toFixed(3)}` : ""
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-foreground/80 leading-relaxed", children: fact }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 group-hover:gap-3 transition-all duration-300", children: [
              "Explore element",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" })
            ] })
          ] })
        ] })
      ]
    }
  );
});
const StatCard = reactExports.memo(function StatCard2({
  stat,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.08, duration: 0.45 },
      className: "glass-card rounded-2xl p-6 text-center flex flex-col items-center gap-1",
      "data-ocid": `home.stat_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-display font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent", children: [
          stat.value,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: stat.suffix })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-medium", children: stat.label })
      ]
    }
  );
});
function HomePage() {
  const navigate = useNavigate();
  useChemStore((s) => s.startTour);
  const openExplore = useExploreStore((s) => s.openPopup);
  const [selectedElement, setSelectedElement] = reactExports.useState(null);
  const [overlayOpen, setOverlayOpen] = reactExports.useState(false);
  const dailyElement = reactExports.useMemo(
    () => ELEMENTS.find((e) => e.symbol === DAILY_SYMBOL) ?? ELEMENTS[79],
    []
  );
  const handleOpen = reactExports.useCallback((el) => {
    setSelectedElement(el);
    setOverlayOpen(true);
  }, []);
  const handleClose = reactExports.useCallback(() => setOverlayOpen(false), []);
  const handleNavigate = reactExports.useCallback((direction) => {
    setSelectedElement((current) => {
      if (!current) return current;
      const targetNum = direction === "next" ? current.atomicNumber + 1 : current.atomicNumber - 1;
      return ELEMENTS.find((e) => e.atomicNumber === targetNum) ?? current;
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes spotlight-bubble {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-18px); opacity: 1; }
        }
        @keyframes spotlight-fade-cycle {
          0%, 100% { opacity: 0.4; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes spotlight-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spotlight-progress {
          0% { width: 0%; }
          60% { width: 80%; }
          80% { width: 80%; }
          100% { width: 0%; }
        }
        @keyframes hero-glow-ring {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.06); opacity: 0.55; }
        }
        @keyframes cinematic-orb {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-16px) scale(1.04); opacity: 0.28; }
        }
        @keyframes feature-card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col items-center justify-center min-h-[88vh] px-4 text-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "aria-hidden": "true",
          className: "absolute top-[-10%] left-[-5%] w-[560px] h-[560px] rounded-full pointer-events-none",
          style: {
            background: "radial-gradient(circle, oklch(0.52 0.22 258) 0%, transparent 68%)",
            filter: "blur(90px)",
            opacity: 0.22,
            animation: "cinematic-orb 7s ease-in-out infinite"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "aria-hidden": "true",
          className: "absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none",
          style: {
            background: "radial-gradient(circle, oklch(0.48 0.28 295) 0%, transparent 68%)",
            filter: "blur(90px)",
            opacity: 0.18,
            animation: "cinematic-orb 9s ease-in-out 1.5s infinite"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "aria-hidden": "true",
          className: "absolute top-[38%] right-[18%] w-[320px] h-[320px] rounded-full pointer-events-none",
          style: {
            background: "radial-gradient(circle, oklch(0.62 0.2 200) 0%, transparent 70%)",
            filter: "blur(60px)",
            opacity: 0.12
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "aria-hidden": "true",
          className: "absolute inset-0 pointer-events-none overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-[0.03]",
              style: {
                background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)",
                animation: "shimmer-sweep-anim 8s ease-in-out infinite"
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          className: "relative z-10 max-w-4xl w-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { scale: 0.85, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { delay: 0.12, duration: 0.45 },
                className: "inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-sm text-muted-foreground mb-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-4 h-4 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All 118 elements · Interactive & Animated · Class 11 & 12" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1 pl-2 ml-1 border-l border-white/20 text-xs text-muted-foreground/60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, { className: "w-3 h-3" }),
                    "Press",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "mx-0.5 px-1 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] font-mono", children: "/" }),
                    " ",
                    "to search"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "aria-hidden": "true",
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse 70% 40% at 50% 50%, oklch(0.55 0.22 270 / 0.38) 0%, transparent 70%)",
                    animation: "hero-glow-ring 4s ease-in-out infinite"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.h1,
                {
                  className: "font-display text-5xl md:text-7xl font-bold leading-tight mb-5 relative",
                  initial: { opacity: 0, scale: 0.92, y: 24 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: {
                    delay: 0.15,
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1]
                  },
                  style: {
                    filter: "drop-shadow(0 0 28px oklch(0.6 0.22 270 / 0.5))"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-br from-blue-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent", children: "Welcome to ChemisteryX" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-xl md:text-2xl font-medium text-foreground/85 max-w-2xl mx-auto mb-3 leading-relaxed",
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3, duration: 0.55, ease: "easeOut" },
                children: "Your immersive chemistry experience"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-base text-muted-foreground/70 max-w-xl mx-auto mb-10 leading-relaxed",
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.42, duration: 0.55, ease: "easeOut" },
                children: "Explore every element, balance equations, run virtual experiments, and master concepts with rich educational content — all in a stunning glass interface."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col sm:flex-row gap-4 justify-center",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.55, duration: 0.5, ease: "easeOut" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { scale: 1.04 },
                      whileTap: { scale: 0.97 },
                      onClick: () => navigate({ to: "/periodic-table" }),
                      className: "group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300",
                      "data-ocid": "hero.periodic_table_button",
                      children: [
                        "Explore Periodic Table",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { scale: 1.04 },
                      whileTap: { scale: 0.97 },
                      onClick: () => navigate({ to: "/practice" }),
                      className: "inline-flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-semibold text-base hover:bg-card/60 transition-all duration-300",
                      "data-ocid": "hero.practice_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-accent" }),
                        "Start Practice"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { scale: 1.04 },
                      whileTap: { scale: 0.97 },
                      onClick: openExplore,
                      className: "inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300",
                      "data-ocid": "hero.start_exploring_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-5 h-5" }),
                        "Explore Now"
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4", "data-ocid": "home.spotlight_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm text-muted-foreground mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "✨" }),
              "Top Features"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent", children: "Everything to Master Chemistry" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-20 h-0.5 rounded-full bg-gradient-to-r from-blue-400/60 to-cyan-400/60 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-md mx-auto", children: "Start with our most powerful tools — pick one and dive in" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: SPOTLIGHT_TOOLS.map((tool, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SpotlightCard, { tool, index: i }, tool.to)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 px-4 bg-muted/20",
        "data-ocid": "home.stats_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { stat, index: i }, stat.label)) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4", "data-ocid": "home.features_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-3 text-foreground", children: "Explore Everything" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-primary to-accent mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "15 powerful tools to master chemistry — from atomic structure to organic reactions" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: ALL_FEATURES.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { feature, index: i }, feature.to)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-4 bg-muted/20",
        "data-ocid": "home.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-3 text-foreground", children: "Element of the Day" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-accent to-primary mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "Discover a fascinating element every day" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DailyElementCard,
            {
              el: dailyElement,
              onClick: () => handleOpen(dailyElement)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              className: "text-center mt-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/periodic-table" }),
                  className: "inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors duration-200 group",
                  "data-ocid": "home.view_all_button",
                  children: [
                    "View All 118 Elements",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" })
                  ]
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "py-10 px-4 border-t border-border/30 bg-card/20",
        "data-ocid": "home.footer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-5 h-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "ChemisteryX" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Explore Chemistry Like Never Before." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-xs text-muted-foreground/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/periodic-table",
                className: "hover:text-foreground transition-colors duration-200",
                children: "Periodic Table"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/practice",
                className: "hover:text-foreground transition-colors duration-200",
                children: "Practice"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/formulas",
                className: "hover:text-foreground transition-colors duration-200",
                children: "Formulas"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ElementOverlay,
      {
        element: selectedElement,
        isOpen: overlayOpen,
        onClose: handleClose,
        onNavigate: handleNavigate
      }
    )
  ] });
}
export {
  HomePage
};
