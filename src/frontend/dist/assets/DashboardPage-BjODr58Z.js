import { u as useNavigate, E as ELEMENTS, j as jsxRuntimeExports, m as motion, A as Atom, k as Star, G as GitCompare, h as cn } from "./index-DyyHqAHL.js";
import { b as useFavoriteElements, c as useRecentElements } from "./useElements-DiNxzQrV.js";
import { a as CATEGORY_GRADIENT } from "./element-DKp8uEQx.js";
import { L as LayoutDashboard } from "./layout-dashboard--eGv8RUJ.js";
import { C as Clock } from "./clock-BRnjJeJI.js";
function MiniElementCard({
  symbol,
  name,
  atomicNumber,
  category,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      whileHover: { y: -3, scale: 1.04 },
      whileTap: { scale: 0.96 },
      onClick,
      className: cn(
        "relative glass rounded-xl p-3 text-left overflow-hidden bg-gradient-to-br",
        CATEGORY_GRADIENT[category]
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/35 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-foreground/60", children: [
            "#",
            atomicNumber
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: symbol }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/80 truncate", children: name })
        ] })
      ]
    }
  );
}
function DashboardPage() {
  const navigate = useNavigate();
  const favorites = useFavoriteElements();
  const recent = useRecentElements();
  const categoryCounts = ELEMENTS.reduce((acc, el) => {
    acc[el.category] = (acc[el.category] ?? 0) + 1;
    return acc;
  }, {});
  const topCats = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-8 max-w-5xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-8 h-8 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your chemistry exploration hub" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      {
        label: "Total Elements",
        value: ELEMENTS.length,
        icon: Atom,
        color: "text-primary"
      },
      {
        label: "Favorites",
        value: favorites.length,
        icon: Star,
        color: "text-yellow-400"
      },
      {
        label: "Recently Viewed",
        value: recent.length,
        icon: Clock,
        color: "text-accent"
      },
      {
        label: "Categories",
        value: Object.keys(categoryCounts).length,
        icon: GitCompare,
        color: "text-violet-400"
      }
    ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08 },
        className: "glass rounded-2xl p-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: cn("w-7 h-7 mb-2", s.color) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        "data-ocid": "dashboard.recent_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Recently Viewed" })
          ] }),
          recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass rounded-2xl p-8 text-center text-muted-foreground",
              "data-ocid": "dashboard.recent_empty_state",
              children: "No elements visited yet. Start exploring!"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2", children: recent.slice(0, 16).map((el) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniElementCard,
            {
              symbol: el.symbol,
              name: el.name,
              atomicNumber: el.atomicNumber,
              category: el.category,
              onClick: () => navigate({
                to: "/element/$symbol",
                params: { symbol: el.symbol }
              })
            },
            el.symbol
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        "data-ocid": "dashboard.favorites_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-yellow-400", fill: "currentColor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Favorites" })
          ] }),
          favorites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass rounded-2xl p-8 text-center text-muted-foreground",
              "data-ocid": "dashboard.favorites_empty_state",
              children: "No favorites yet. Star elements you love!"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2", children: favorites.slice(0, 16).map((el) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniElementCard,
            {
              symbol: el.symbol,
              name: el.name,
              atomicNumber: el.atomicNumber,
              category: el.category,
              onClick: () => navigate({
                to: "/element/$symbol",
                params: { symbol: el.symbol }
              })
            },
            el.symbol
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4 },
        "data-ocid": "dashboard.categories_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold mb-4", children: "Element Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-6 space-y-3", children: topCats.map(([cat, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-2.5 h-2.5 rounded-full flex-shrink-0 bg-gradient-to-br",
                  CATEGORY_GRADIENT[cat] ?? ""
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-sm capitalize text-foreground", children: cat.replace(/-/g, " ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono text-muted-foreground", children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${count / 40 * 100}%` },
                transition: { delay: 0.5, duration: 0.6, ease: "easeOut" },
                className: cn(
                  "h-full rounded-full bg-gradient-to-r",
                  CATEGORY_GRADIENT[cat] ?? ""
                )
              }
            ) })
          ] }, cat)) })
        ]
      }
    )
  ] });
}
export {
  DashboardPage
};
