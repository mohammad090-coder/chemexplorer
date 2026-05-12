import { a as useChemStore, r as reactExports, E as ELEMENTS, j as jsxRuntimeExports, m as motion, S as Search, X, l as AnimatePresence, h as cn } from "./index-DyyHqAHL.js";
import { E as ElementOverlay } from "./ElementOverlay-CHo7W3gD.js";
import { u as useFilteredElements } from "./useElements-DiNxzQrV.js";
import { b as CATEGORY_LABELS, C as CATEGORY_TEXT, a as CATEGORY_GRADIENT } from "./element-DKp8uEQx.js";
import "./AtomicStructure-DUFrMLIO.js";
import "./chevron-left-oyoINw6R.js";
import "./chevron-right-6gh7dKif.js";
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "alkali-metal", label: "Alkali Metals" },
  { key: "alkaline-earth-metal", label: "Alkaline Earth" },
  { key: "transition-metal", label: "Transition Metals" },
  { key: "post-transition-metal", label: "Post-Transition" },
  { key: "metalloid", label: "Metalloids" },
  { key: "nonmetal", label: "Nonmetals" },
  { key: "halogen", label: "Halogens" },
  { key: "noble-gas", label: "Noble Gases" },
  { key: "lanthanide", label: "Lanthanides" },
  { key: "actinide", label: "Actinides" }
];
const ResultCard = reactExports.memo(function ResultCard2({
  el,
  index,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: Math.min(index * 0.02, 0.4), duration: 0.3 },
      whileHover: { y: -4, scale: 1.04 },
      whileTap: { scale: 0.96 },
      onClick,
      className: cn(
        "relative glass rounded-2xl p-4 text-left overflow-hidden group bg-gradient-to-br",
        CATEGORY_GRADIENT[el.category]
      ),
      "data-ocid": `search.result.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/60 mb-1", children: [
            "#",
            el.atomicNumber
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-foreground mb-0.5", children: el.symbol }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground/90 truncate", children: el.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-xs mt-1", CATEGORY_TEXT[el.category]), children: CATEGORY_LABELS[el.category] })
        ] })
      ]
    }
  );
});
function SearchPage() {
  const { searchQuery, categoryFilter, setSearchQuery, setCategoryFilter } = useChemStore();
  const results = useFilteredElements();
  const [selectedElement, setSelectedElement] = reactExports.useState(null);
  const [overlayOpen, setOverlayOpen] = reactExports.useState(false);
  const debounceRef = reactExports.useRef(null);
  const [searchLocal, setSearchLocal] = reactExports.useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = reactExports.useState(false);
  const searchWrapperRef = reactExports.useRef(null);
  const suggestionsRef = reactExports.useRef(null);
  const suggestions = reactExports.useMemo(() => {
    const q = searchLocal.trim().toLowerCase();
    if (!q) return [];
    return ELEMENTS.filter(
      (el) => el.name.toLowerCase().startsWith(q) || el.symbol.toLowerCase().startsWith(q) || String(el.atomicNumber) === q
    ).slice(0, 6);
  }, [searchLocal]);
  reactExports.useEffect(() => {
    function handleClickOutside(e) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSearch = reactExports.useCallback(
    (e) => {
      const val = e.target.value;
      setSearchLocal(val);
      setShowSuggestions(true);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setSearchQuery(val), 300);
    },
    [setSearchQuery]
  );
  const clearSearch = reactExports.useCallback(() => {
    setSearchLocal("");
    setSearchQuery("");
    setShowSuggestions(false);
  }, [setSearchQuery]);
  const handleElementClick = reactExports.useCallback((el) => {
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
  const clickHandlers = reactExports.useMemo(
    () => results.map((el) => () => handleElementClick(el)),
    [results, handleElementClick]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold mb-2", children: "Search Elements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Find any of the 118 elements instantly" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xl mx-auto mb-6", ref: searchWrapperRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by name, symbol, or atomic number…",
          value: searchLocal,
          onChange: handleSearch,
          onFocus: () => searchLocal.trim() && setShowSuggestions(true),
          className: "w-full glass rounded-2xl pl-12 pr-12 py-4 text-base bg-transparent outline-none placeholder:text-muted-foreground border border-border/30 focus:border-accent/50 transition-colors",
          "data-ocid": "search.search_input"
        }
      ),
      searchLocal && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: clearSearch,
          className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
          "data-ocid": "search.clear_button",
          "aria-label": "Clear search",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          ref: suggestionsRef,
          initial: { opacity: 0, scale: 0.95, y: -8 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: -8 },
          transition: { duration: 0.15, ease: "easeOut" },
          style: {
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 9999,
            marginTop: "8px",
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            padding: "8px 0",
            overflow: "hidden"
          },
          "data-ocid": "search.suggestions_dropdown",
          children: suggestions.map((el) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onMouseDown: () => {
                setSearchLocal(el.name);
                setSearchQuery(el.name);
                setShowSuggestions(false);
                handleElementClick(el);
              },
              className: "w-full flex items-center gap-3 text-left transition-colors duration-150",
              style: {
                padding: "10px 16px",
                cursor: "pointer",
                fontSize: "14px",
                color: "rgba(255,255,255,0.9)"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "transparent";
              },
              "data-ocid": `search.suggestion.${el.atomicNumber}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0",
                    style: {
                      background: `${el.colorHex}22`,
                      color: el.colorHex,
                      border: `1px solid ${el.colorHex}44`
                    },
                    children: el.symbol
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm", children: el.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-mono",
                    style: { color: "rgba(148,163,184,0.7)" },
                    children: [
                      "#",
                      el.atomicNumber
                    ]
                  }
                )
              ]
            },
            el.symbol
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap gap-2 justify-center mb-8",
        "data-ocid": "search.category_filters",
        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setCategoryFilter(cat.key),
            className: cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              categoryFilter === cat.key ? "bg-accent text-accent-foreground shadow-md" : "glass text-muted-foreground hover:text-foreground"
            ),
            "data-ocid": `search.filter.${cat.key}`,
            children: cat.label
          },
          cat.key
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 text-sm text-muted-foreground", children: [
      results.length,
      " element",
      results.length !== 1 ? "s" : "",
      " found"
    ] }),
    results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-20 glass rounded-3xl",
        "data-ocid": "search.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mb-2", children: "No elements found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Try a different search term or clear filters." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
        "data-ocid": "search.results_list",
        children: results.map((el, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultCard,
          {
            el,
            index: i,
            onClick: clickHandlers[i]
          },
          el.symbol
        ))
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
  SearchPage
};
