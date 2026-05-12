import { u as useNavigate, a as useChemStore, n as useAuth, r as reactExports, E as ELEMENTS, j as jsxRuntimeExports, m as motion, k as Star, o as LogIn, p as Trash2, h as cn } from "./index-DyyHqAHL.js";
import { E as ElementOverlay } from "./ElementOverlay-CHo7W3gD.js";
import { b as useFavoriteElements } from "./useElements-DiNxzQrV.js";
import { b as CATEGORY_LABELS, C as CATEGORY_TEXT, a as CATEGORY_GRADIENT } from "./element-DKp8uEQx.js";
import "./AtomicStructure-DUFrMLIO.js";
import "./chevron-left-oyoINw6R.js";
import "./chevron-right-6gh7dKif.js";
const FavoriteCard = reactExports.memo(function FavoriteCard2({
  el,
  index,
  onOpen,
  onRemove
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.06 },
      className: cn(
        "relative glass rounded-2xl p-5 overflow-hidden group bg-gradient-to-br",
        CATEGORY_GRADIENT[el.category]
      ),
      "data-ocid": `favorites.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: "absolute top-2 right-2 z-20 p-1.5 rounded-lg text-foreground/50 hover:text-red-400 hover:bg-red-400/10 transition-all",
            "data-ocid": `favorites.remove_button.${index + 1}`,
            "aria-label": `Remove ${el.name} from favorites`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onOpen,
            className: "relative z-10 w-full text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/60 mb-1", children: [
                "#",
                el.atomicNumber
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl font-bold text-foreground mb-0.5", children: el.symbol }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground/90 truncate", children: el.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-xs mt-1", CATEGORY_TEXT[el.category]), children: CATEGORY_LABELS[el.category] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/50 mt-1", children: [
                el.atomicMass.toFixed(3),
                " u"
              ] })
            ]
          }
        )
      ]
    }
  );
});
function FavoritesPage() {
  const navigate = useNavigate();
  const favorites = useFavoriteElements();
  const { toggleFavorite } = useChemStore();
  const { isAuthenticated, login, isLoading } = useAuth();
  const [selectedElement, setSelectedElement] = reactExports.useState(null);
  const [overlayOpen, setOverlayOpen] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-8 h-8 text-yellow-400", fill: "currentColor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold", children: "Favorites" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            favorites.length,
            " element",
            favorites.length !== 1 ? "s" : "",
            " saved"
          ] })
        ]
      }
    ),
    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        className: "mb-6 glass rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 border border-primary/20 bg-primary/5",
        "data-ocid": "favorites.login_cta",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-8 h-8 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Connect to sync favorites" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your favorites are saved locally. Connect with Internet Identity to sync them across devices." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: login,
              disabled: isLoading,
              className: "shrink-0 glass px-5 py-2.5 rounded-xl text-sm font-medium bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30 transition-all disabled:opacity-50 flex items-center gap-2",
              "data-ocid": "favorites.login_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                isLoading ? "Connecting…" : "Connect"
              ]
            }
          )
        ]
      }
    ),
    favorites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-24 glass rounded-3xl",
        "data-ocid": "favorites.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-16 h-16 mx-auto mb-4 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mb-2", children: "No favorites yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Explore the periodic table and star elements you love." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/periodic-table" }),
              className: "glass px-6 py-3 rounded-full font-medium hover:bg-card/60 transition-all",
              "data-ocid": "favorites.explore_button",
              children: "Explore Elements"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
        "data-ocid": "favorites.list",
        children: favorites.map((el, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FavoriteCard,
          {
            el,
            index: i,
            onOpen: () => handleOpen(el),
            onRemove: () => toggleFavorite(el.symbol)
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
  FavoritesPage
};
