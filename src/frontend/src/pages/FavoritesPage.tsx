import { ElementOverlay } from "@/components/ElementOverlay";
import { useAuth } from "@/hooks/useAuth";
import { useFavoriteElements } from "@/hooks/useElements";
import { ELEMENTS } from "@/lib/elements-data";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
  type Element,
} from "@/types/element";
import { useNavigate } from "@tanstack/react-router";
import { LogIn, Star, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { memo, useCallback, useState } from "react";

// ── Memoized favorite card ────────────────────────────────────────────────────
const FavoriteCard = memo(function FavoriteCard({
  el,
  index,
  onOpen,
  onRemove,
}: {
  el: Element;
  index: number;
  onOpen: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      className={cn(
        "relative glass rounded-2xl p-5 overflow-hidden group bg-gradient-to-br",
        CATEGORY_GRADIENT[el.category],
      )}
      data-ocid={`favorites.item.${index + 1}`}
    >
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors rounded-2xl" />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 z-20 p-1.5 rounded-lg text-foreground/50 hover:text-red-400 hover:bg-red-400/10 transition-all"
        data-ocid={`favorites.remove_button.${index + 1}`}
        aria-label={`Remove ${el.name} from favorites`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onOpen}
        className="relative z-10 w-full text-left"
      >
        <div className="text-xs text-foreground/60 mb-1">
          #{el.atomicNumber}
        </div>
        <div className="font-display text-4xl font-bold text-foreground mb-0.5">
          {el.symbol}
        </div>
        <div className="text-sm font-medium text-foreground/90 truncate">
          {el.name}
        </div>
        <div className={cn("text-xs mt-1", CATEGORY_TEXT[el.category])}>
          {CATEGORY_LABELS[el.category]}
        </div>
        <div className="text-xs text-foreground/50 mt-1">
          {el.atomicMass.toFixed(3)} u
        </div>
      </button>
    </motion.div>
  );
});

export function FavoritesPage() {
  const navigate = useNavigate();
  const favorites = useFavoriteElements();
  const { toggleFavorite } = useChemStore();
  const { isAuthenticated, login, isLoading } = useAuth();

  // ── Overlay state ────────────────────────────────────────────────────────
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleOpen = useCallback((el: Element) => {
    setSelectedElement(el);
    setOverlayOpen(true);
  }, []);

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

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
          <h1 className="font-display text-4xl font-bold">Favorites</h1>
        </div>
        <p className="text-muted-foreground">
          {favorites.length} element{favorites.length !== 1 ? "s" : ""} saved
        </p>
      </motion.div>

      {/* Login CTA for unauthenticated users */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 glass rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 border border-primary/20 bg-primary/5"
          data-ocid="favorites.login_cta"
        >
          <LogIn className="w-8 h-8 text-primary shrink-0" />
          <div className="text-center sm:text-left">
            <p className="font-medium text-foreground">
              Connect to sync favorites
            </p>
            <p className="text-sm text-muted-foreground">
              Your favorites are saved locally. Connect with Internet Identity
              to sync them across devices.
            </p>
          </div>
          <button
            type="button"
            onClick={login}
            disabled={isLoading}
            className="shrink-0 glass px-5 py-2.5 rounded-xl text-sm font-medium bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30 transition-all disabled:opacity-50 flex items-center gap-2"
            data-ocid="favorites.login_button"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? "Connecting…" : "Connect"}
          </button>
        </motion.div>
      )}

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 glass rounded-3xl"
          data-ocid="favorites.empty_state"
        >
          <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="font-display text-xl font-bold mb-2">
            No favorites yet
          </h3>
          <p className="text-muted-foreground mb-8">
            Explore the periodic table and star elements you love.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/periodic-table" })}
            className="glass px-6 py-3 rounded-full font-medium hover:bg-card/60 transition-all"
            data-ocid="favorites.explore_button"
          >
            Explore Elements
          </button>
        </motion.div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          data-ocid="favorites.list"
        >
          {favorites.map((el, i) => (
            <FavoriteCard
              key={el.symbol}
              el={el}
              index={i}
              onOpen={() => handleOpen(el)}
              onRemove={() => toggleFavorite(el.symbol)}
            />
          ))}
        </div>
      )}

      {/* Element Overlay */}
      <ElementOverlay
        element={selectedElement}
        isOpen={overlayOpen}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
