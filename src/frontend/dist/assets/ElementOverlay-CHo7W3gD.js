import { c as createLucideIcon, r as reactExports, a as useChemStore, j as jsxRuntimeExports, l as AnimatePresence, m as motion, k as Star, X, R as ReactDOM } from "./index-DyyHqAHL.js";
import { A as AtomicStructure } from "./AtomicStructure-DUFrMLIO.js";
import { a as CATEGORY_GRADIENT, b as CATEGORY_LABELS, C as CATEGORY_TEXT } from "./element-DKp8uEQx.js";
import { C as ChevronLeft } from "./chevron-left-oyoINw6R.js";
import { C as ChevronRight } from "./chevron-right-6gh7dKif.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43", key: "16m0ql" }],
  ["path", { d: "M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91", key: "1vt8nq" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
];
const StarOff = createLucideIcon("star-off", __iconNode);
const CATEGORY_GLOW_COLOR = {
  "alkali-metal": "rgba(34,211,238,0.35)",
  "alkaline-earth-metal": "rgba(232,121,249,0.35)",
  "transition-metal": "rgba(167,139,250,0.35)",
  "post-transition-metal": "rgba(96,165,250,0.35)",
  metalloid: "rgba(251,113,133,0.35)",
  nonmetal: "rgba(251,146,60,0.35)",
  halogen: "rgba(52,211,153,0.35)",
  "noble-gas": "rgba(250,204,21,0.35)",
  lanthanide: "rgba(129,140,248,0.35)",
  actinide: "rgba(248,113,113,0.35)",
  unknown: "rgba(148,163,184,0.25)"
};
const CATEGORY_BORDER_COLOR = {
  "alkali-metal": "rgba(34,211,238,0.5)",
  "alkaline-earth-metal": "rgba(232,121,249,0.5)",
  "transition-metal": "rgba(167,139,250,0.5)",
  "post-transition-metal": "rgba(96,165,250,0.5)",
  metalloid: "rgba(251,113,133,0.5)",
  nonmetal: "rgba(251,146,60,0.5)",
  halogen: "rgba(52,211,153,0.5)",
  "noble-gas": "rgba(250,204,21,0.5)",
  lanthanide: "rgba(129,140,248,0.5)",
  actinide: "rgba(248,113,113,0.5)",
  unknown: "rgba(148,163,184,0.4)"
};
const CATEGORY_BADGE_BG = {
  "alkali-metal": "rgba(34,211,238,0.15)",
  "alkaline-earth-metal": "rgba(232,121,249,0.15)",
  "transition-metal": "rgba(167,139,250,0.15)",
  "post-transition-metal": "rgba(96,165,250,0.15)",
  metalloid: "rgba(251,113,133,0.15)",
  nonmetal: "rgba(251,146,60,0.15)",
  halogen: "rgba(52,211,153,0.15)",
  "noble-gas": "rgba(250,204,21,0.15)",
  lanthanide: "rgba(129,140,248,0.15)",
  actinide: "rgba(248,113,113,0.15)",
  unknown: "rgba(148,163,184,0.12)"
};
function PropRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2 py-1.5 border-b border-white/5 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground text-right break-all", children: value === 0 || value ? value : "—" })
  ] });
}
const ElementOverlay = reactExports.memo(function ElementOverlay2({
  element,
  isOpen,
  onClose,
  onNavigate,
  clickOrigin
}) {
  const closeButtonRef = reactExports.useRef(null);
  const { favorites, toggleFavorite } = useChemStore();
  const [favPulse, setFavPulse] = reactExports.useState(false);
  const [slideDir, setSlideDir] = reactExports.useState("next");
  const [atomModel, setAtomModel] = reactExports.useState("bohr");
  const [isMobile, setIsMobile] = reactExports.useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  reactExports.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  reactExports.useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        var _a;
        return (_a = closeButtonRef.current) == null ? void 0 : _a.focus();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);
  reactExports.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
  const handleNavigate = reactExports.useCallback(
    (dir) => {
      setSlideDir(dir);
      onNavigate(dir);
    },
    [onNavigate]
  );
  const handleToggleFavorite = reactExports.useCallback(() => {
    if (!element) return;
    toggleFavorite(element.symbol);
    setFavPulse(true);
    setTimeout(() => setFavPulse(false), 400);
  }, [element, toggleFavorite]);
  const isFav = element ? favorites.includes(element.symbol) : false;
  const glowColor = element ? CATEGORY_GLOW_COLOR[element.category] ?? "rgba(148,163,184,0.25)" : "rgba(148,163,184,0.25)";
  const borderColor = element ? CATEGORY_BORDER_COLOR[element.category] ?? "rgba(148,163,184,0.4)" : "rgba(148,163,184,0.4)";
  const badgeBg = element ? CATEGORY_BADGE_BG[element.category] ?? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.12)";
  const slideOffset = slideDir === "next" ? 24 : -24;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const ox = clickOrigin ? clickOrigin.x - vw / 2 : 0;
  const oy = clickOrigin ? clickOrigin.y - vh / 2 : 0;
  const panelInitial = isMobile ? { scale: 0.92, opacity: 0, x: 0, y: 16 } : { scale: 0.08, opacity: 0, x: ox, y: oy };
  const panelAnimate = { scale: 1, opacity: 1, x: 0, y: 0 };
  const panelExit = isMobile ? { scale: 0.96, opacity: 0, x: 0, y: 8 } : { scale: 0.08, opacity: 0, x: ox, y: oy };
  const panelTransition = isMobile ? {
    duration: 0.25,
    ease: [0.25, 0.46, 0.45, 0.94]
  } : {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1]
  };
  const overlay = /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && element && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "fixed inset-0 z-[100]",
        style: {
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: isMobile ? void 0 : "blur(6px)"
        },
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        onClick: onClose,
        "aria-hidden": "true"
      },
      "backdrop"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[101] flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.dialog,
      {
        open: true,
        "aria-labelledby": "overlay-element-name",
        className: "pointer-events-auto relative w-full mx-3 md:mx-4 md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl md:rounded-2xl p-0 m-0 border-0",
        style: {
          background: "rgba(12,12,22,0.88)",
          backdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
          WebkitBackdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
          border: `1px solid ${borderColor}`,
          boxShadow: `0 0 40px 0 ${glowColor}, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
          willChange: "transform, opacity",
          transformOrigin: "center center",
          scrollbarWidth: "thin",
          scrollbarColor: `${borderColor} transparent`,
          colorScheme: "dark"
        },
        initial: panelInitial,
        animate: panelAnimate,
        exit: panelExit,
        transition: panelTransition,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { x: slideOffset, opacity: 0.6 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.22, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "sticky top-0 z-10 flex items-start gap-4 p-4 md:p-6 rounded-t-xl md:rounded-t-2xl",
                  style: {
                    background: "rgba(12,12,22,0.96)",
                    backdropFilter: "blur(8px)",
                    borderBottom: `1px solid ${borderColor}`
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENT[element.category]}`,
                        style: { boxShadow: `0 0 20px 0 ${glowColor}` },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl md:text-3xl font-bold text-white leading-none", children: element.symbol }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/70 mt-0.5", children: element.atomicNumber })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h1",
                        {
                          id: "overlay-element-name",
                          className: "text-xl md:text-3xl font-bold text-foreground leading-tight truncate",
                          children: element.name
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_TEXT[element.category]}`,
                            style: { backgroundColor: badgeBg },
                            children: CATEGORY_LABELS[element.category]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-muted-foreground", children: [
                          "Group ",
                          element.group,
                          " · Period ",
                          element.period,
                          " ·",
                          " ",
                          element.block,
                          "-block"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-muted-foreground", children: [
                          element.state,
                          " at RT"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.button,
                        {
                          type: "button",
                          "data-ocid": "element.overlay.favorite_button",
                          onClick: handleToggleFavorite,
                          animate: favPulse ? { scale: [1, 1.35, 1] } : { scale: 1 },
                          transition: { duration: 0.35 },
                          className: `w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-colors ${isFav ? "bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`,
                          "aria-label": isFav ? "Remove from favorites" : "Add to favorites",
                          children: isFav ? /* @__PURE__ */ jsxRuntimeExports.jsx(StarOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 18 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          ref: closeButtonRef,
                          "data-ocid": "element.overlay.close_button",
                          onClick: onClose,
                          className: "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors",
                          "aria-label": "Close overlay",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4 flex flex-col items-center gap-3",
                    style: {
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${borderColor}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Atomic Structure" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex rounded-lg overflow-hidden border",
                            style: { borderColor: `${borderColor}` },
                            "data-ocid": "element.overlay.model_toggle",
                            children: ["bohr", "orbital"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setAtomModel(m),
                                className: "px-2.5 py-1 text-[10px] font-medium transition-all duration-200 capitalize",
                                style: {
                                  background: atomModel === m ? `${borderColor.replace("0.5)", "0.18)")}` : "transparent",
                                  color: atomModel === m ? "var(--foreground)" : "var(--muted-foreground)",
                                  borderRight: m === "bohr" ? `1px solid ${borderColor}` : "none"
                                },
                                "data-ocid": `element.overlay.model_toggle.${m}`,
                                "aria-pressed": atomModel === m,
                                children: m === "bohr" ? "Bohr" : "Orbital"
                              },
                              m
                            ))
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AtomicStructure,
                        {
                          atomicNumber: element.atomicNumber,
                          electronConfiguration: element.electronConfiguration,
                          category: element.category,
                          visible: isOpen,
                          model: atomModel
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70 font-mono", children: element.electronConfiguration })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-4 space-y-0.5",
                      style: {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Identity" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Atomic Number",
                            value: element.atomicNumber
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Atomic Mass",
                            value: `${element.atomicMass} u`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Category",
                            value: CATEGORY_LABELS[element.category]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PropRow, { label: "Group", value: element.group }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PropRow, { label: "Period", value: element.period }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PropRow, { label: "Block", value: `${element.block}-block` }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PropRow, { label: "State at RT", value: element.state })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-4 space-y-0.5",
                      style: {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Properties" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Electron Config",
                            value: element.electronConfiguration
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Density",
                            value: element.density > 0 ? `${element.density} g/cm³` : "—"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Melting Point",
                            value: element.meltingPoint !== 0 ? `${element.meltingPoint}°C` : "—"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Boiling Point",
                            value: element.boilingPoint !== 0 ? `${element.boilingPoint}°C` : "—"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Electronegativity",
                            value: element.electronegativity > 0 ? element.electronegativity : "—"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Ionization Energy",
                            value: element.ionizationEnergy > 0 ? `${element.ionizationEnergy} kJ/mol` : "—"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PropRow,
                          {
                            label: "Atomic Radius",
                            value: element.atomicRadius > 0 ? `${element.atomicRadius} pm` : "—"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                element.description && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4",
                    style: {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "About" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/85 leading-relaxed", children: element.description })
                    ]
                  }
                ),
                element.uses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4",
                    style: {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Uses" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: element.uses.map((use) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex gap-2.5 text-sm text-foreground/80 leading-snug",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `mt-1 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br ${CATEGORY_GRADIENT[element.category]}`
                              }
                            ),
                            use
                          ]
                        },
                        use
                      )) })
                    ]
                  }
                ),
                element.facts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4",
                    style: {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Interesting Facts" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: element.facts.map((fact, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex gap-2.5 text-sm text-foreground/80 leading-snug",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground shrink-0 text-xs mt-0.5 font-mono", children: String(idx + 1).padStart(2, "0") }),
                            fact
                          ]
                        },
                        fact
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 pt-2 pb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "element.overlay.prev_button",
                      onClick: () => handleNavigate("prev"),
                      disabled: element.atomicNumber <= 1,
                      className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-foreground/80 hover:text-foreground min-h-[44px]",
                      "aria-label": "Previous element",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Previous" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                    "#",
                    element.atomicNumber,
                    " / 118"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "element.overlay.next_button",
                      onClick: () => handleNavigate("next"),
                      disabled: element.atomicNumber >= 118,
                      className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-foreground/80 hover:text-foreground min-h-[44px]",
                      "aria-label": "Next element",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Next" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                      ]
                    }
                  )
                ] })
              ] })
            ]
          },
          element.atomicNumber
        )
      },
      `panel-${element.atomicNumber}`
    ) })
  ] }) });
  return ReactDOM.createPortal(overlay, document.body);
});
export {
  ElementOverlay as E
};
