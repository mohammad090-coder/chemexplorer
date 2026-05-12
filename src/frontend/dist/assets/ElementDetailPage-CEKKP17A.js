import { i as useParams, u as useNavigate, a as useChemStore, r as reactExports, j as jsxRuntimeExports, m as motion, k as Star, G as GitCompare } from "./index-DyyHqAHL.js";
import { a as useElement } from "./useElements-DiNxzQrV.js";
import { a as CATEGORY_GRADIENT, C as CATEGORY_TEXT, b as CATEGORY_LABELS } from "./element-DKp8uEQx.js";
import { A as ArrowLeft } from "./arrow-left-WGcdKg5e.js";
function AtomModel({ period, symbol }) {
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const shells = Math.min(period, 7);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
      grad.addColorStop(0, "oklch(0.85 0.20 50)");
      grad.addColorStop(1, "oklch(0.60 0.18 25)");
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = "oklch(0.75 0.25 50)";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "oklch(0.12 0 0)";
      ctx.font = `bold ${symbol.length > 2 ? 6 : 8}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol.slice(0, 2), cx, cy);
      for (let i = 0; i < shells; i++) {
        const r = 20 + i * 20;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.4, i * Math.PI / shells, 0, Math.PI * 2);
        ctx.strokeStyle = "oklch(0.68 0.16 258 / 0.3)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        const angle = t * (1 + i * 0.3) + i * Math.PI * 2 / shells;
        const ex = cx + r * Math.cos(angle);
        const ey = cy + r * 0.4 * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.72 0.22 200)";
        ctx.shadowColor = "oklch(0.72 0.22 200)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      t += 0.025;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [period, symbol]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 200,
      height: 200,
      className: "w-full max-w-[200px]"
    }
  );
}
const PROP_KEYS = [
  {
    key: "atomicMass",
    label: "Atomic Mass",
    unit: "u",
    fmt: (v) => v.toFixed(3)
  },
  {
    key: "density",
    label: "Density",
    unit: "g/cm³",
    fmt: (v) => v ? v.toFixed(4) : "—"
  },
  {
    key: "meltingPoint",
    label: "Melting Point",
    unit: "°C",
    fmt: (v) => v ? v.toFixed(1) : "—"
  },
  {
    key: "boilingPoint",
    label: "Boiling Point",
    unit: "°C",
    fmt: (v) => v ? v.toFixed(1) : "—"
  },
  {
    key: "electronegativity",
    label: "Electronegativity",
    unit: "(Pauling)",
    fmt: (v) => v ? v.toFixed(2) : "—"
  },
  {
    key: "ionizationEnergy",
    label: "Ionization Energy",
    unit: "eV",
    fmt: (v) => v ? v.toFixed(3) : "—"
  },
  {
    key: "atomicRadius",
    label: "Atomic Radius",
    unit: "pm",
    fmt: (v) => v ? String(v) : "—"
  }
];
function ElementDetailPage() {
  const { symbol } = useParams({ strict: false });
  const element = useElement(symbol);
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addRecentlyViewed } = useChemStore();
  reactExports.useEffect(() => {
    if (symbol) addRecentlyViewed(symbol);
  }, [symbol, addRecentlyViewed]);
  if (!element) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center glass rounded-3xl p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🔬" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Element not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
        '"',
        symbol,
        `" doesn't match any known element.`
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/periodic-table" }),
          className: "glass px-6 py-3 rounded-full font-medium hover:bg-card/60 transition-all",
          children: "Back to Periodic Table"
        }
      )
    ] }) });
  }
  const isFav = favorites.includes(element.symbol);
  const gradClass = CATEGORY_GRADIENT[element.category];
  const textClass = CATEGORY_TEXT[element.category];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          whileHover: { x: -4 },
          onClick: () => navigate({ to: "/periodic-table" }),
          className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "element.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Periodic Table" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileTap: { scale: 0.9 },
            onClick: () => toggleFavorite(element.symbol),
            className: `glass p-3 rounded-xl transition-all ${isFav ? "text-yellow-400 bg-yellow-400/10" : "text-muted-foreground hover:text-yellow-400"}`,
            "data-ocid": "element.favorite_button",
            "aria-label": isFav ? "Remove from favorites" : "Add to favorites",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5", fill: isFav ? "currentColor" : "none" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileTap: { scale: 0.9 },
            onClick: () => navigate({ to: "/compare" }),
            className: "glass p-3 rounded-xl text-muted-foreground hover:text-accent transition-all",
            "data-ocid": "element.compare_button",
            "aria-label": "Compare elements",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: `glass rounded-3xl p-8 mb-8 overflow-hidden relative bg-gradient-to-br ${gradClass}`,
        "data-ocid": "element.hero_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 rounded-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AtomModel, { period: element.period, symbol: element.symbol }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground/70 mb-1", children: [
                "Element #",
                element.atomicNumber
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-6xl md:text-7xl font-bold text-foreground mb-1 leading-none", children: element.symbol }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold text-foreground/90 mb-2", children: element.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `inline-block text-sm font-medium mb-4 ${textClass}`,
                  children: CATEGORY_LABELS[element.category]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-base leading-relaxed max-w-lg", children: element.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 flex-shrink-0", children: [
              {
                label: "Atomic Mass",
                value: `${element.atomicMass.toFixed(3)} u`
              },
              { label: "Block", value: element.block.toUpperCase() },
              {
                label: "Group",
                value: element.group ? String(element.group) : "—"
              },
              { label: "Period", value: String(element.period) },
              { label: "State", value: element.state },
              { label: "Config", value: element.electronConfiguration }
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-elevated rounded-xl p-3 min-w-[100px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/60 mb-0.5", children: s.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono font-semibold text-foreground truncate", children: s.value })
                ]
              },
              s.label
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15, duration: 0.5 },
        className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
        children: [
          PROP_KEYS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: p.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-mono font-bold text-foreground", children: p.fmt(element[p.key]) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.unit })
          ] }, p.key)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Electron Config" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono font-bold text-foreground leading-relaxed", children: element.electronConfiguration })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.2, duration: 0.5 },
          className: "glass rounded-2xl p-6",
          "data-ocid": "element.uses_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-4 text-accent", children: "Real-World Uses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: element.uses.map((use) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-0.5", children: "▸" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: use })
                ]
              },
              use
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.25, duration: 0.5 },
          className: "glass rounded-2xl p-6",
          "data-ocid": "element.facts_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-4 text-primary", children: "Fascinating Facts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: element.facts.map((fact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "✦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fact })
                ]
              },
              fact
            )) })
          ]
        }
      )
    ] })
  ] });
}
export {
  ElementDetailPage
};
