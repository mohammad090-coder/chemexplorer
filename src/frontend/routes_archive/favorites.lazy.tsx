import { useFavoriteElements } from "@/hooks/useElements";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
} from "@/types/element";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Star, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const navigate = useNavigate();
  const favorites = useFavoriteElements();
  const { toggleFavorite } = useChemStore();

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
            <motion.div
              key={el.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "relative glass rounded-2xl p-5 overflow-hidden group",
                CATEGORY_GRADIENT[el.category],
              )}
              data-ocid={`favorites.item.${i + 1}`}
            >
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors rounded-2xl" />

              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(el.symbol);
                }}
                className="absolute top-2 right-2 z-20 p-1.5 rounded-lg text-foreground/50 hover:text-red-400 hover:bg-red-400/10 transition-all"
                data-ocid={`favorites.remove_button.${i + 1}`}
                aria-label={`Remove ${el.name} from favorites`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate({
                    to: "/element/$symbol",
                    params: { symbol: el.symbol },
                  })
                }
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
          ))}
        </div>
      )}
    </div>
  );
}
