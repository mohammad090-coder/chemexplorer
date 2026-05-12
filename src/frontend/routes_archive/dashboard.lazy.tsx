import { useFavoriteElements, useRecentElements } from "@/hooks/useElements";
import { ELEMENTS } from "@/lib/elements-data";
import { cn } from "@/lib/utils";
import { CATEGORY_GRADIENT, CATEGORY_TEXT } from "@/types/element";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Atom, Clock, GitCompare, LayoutDashboard, Star } from "lucide-react";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/dashboard")({
  component: DashboardPage,
});

function MiniElementCard({
  symbol,
  name,
  atomicNumber,
  category,
  onClick,
}: {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: import("@/types/element").ElementCategory;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "relative glass rounded-xl p-3 text-left overflow-hidden",
        CATEGORY_GRADIENT[category],
      )}
    >
      <div className="absolute inset-0 bg-black/35 rounded-xl" />
      <div className="relative z-10">
        <div className="text-[9px] text-foreground/60">#{atomicNumber}</div>
        <div className="font-display text-2xl font-bold text-foreground">
          {symbol}
        </div>
        <div className="text-xs text-foreground/80 truncate">{name}</div>
      </div>
    </motion.button>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const favorites = useFavoriteElements();
  const recent = useRecentElements();

  // Stats
  const categoryCounts = ELEMENTS.reduce<Record<string, number>>((acc, el) => {
    acc[el.category] = (acc[el.category] ?? 0) + 1;
    return acc;
  }, {});
  const topCats = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <LayoutDashboard className="w-8 h-8 text-accent" />
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Your chemistry exploration hub
          </p>
        </div>
      </motion.div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Elements",
            value: ELEMENTS.length,
            icon: Atom,
            color: "text-primary",
          },
          {
            label: "Favorites",
            value: favorites.length,
            icon: Star,
            color: "text-yellow-400",
          },
          {
            label: "Recently Viewed",
            value: recent.length,
            icon: Clock,
            color: "text-accent",
          },
          {
            label: "Categories",
            value: Object.keys(categoryCounts).length,
            icon: GitCompare,
            color: "text-violet-400",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5"
          >
            <s.icon className={cn("w-7 h-7 mb-2", s.color)} />
            <div className="text-3xl font-display font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recently Viewed */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        data-ocid="dashboard.recent_section"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">
            Recently Viewed
          </h2>
        </div>
        {recent.length === 0 ? (
          <div
            className="glass rounded-2xl p-8 text-center text-muted-foreground"
            data-ocid="dashboard.recent_empty_state"
          >
            No elements visited yet. Start exploring!
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {recent.slice(0, 16).map((el) => (
              <MiniElementCard
                key={el.symbol}
                symbol={el.symbol}
                name={el.name}
                atomicNumber={el.atomicNumber}
                category={el.category}
                onClick={() =>
                  navigate({
                    to: "/element/$symbol",
                    params: { symbol: el.symbol },
                  })
                }
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Favorites */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        data-ocid="dashboard.favorites_section"
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
          <h2 className="font-display text-xl font-semibold">Favorites</h2>
        </div>
        {favorites.length === 0 ? (
          <div
            className="glass rounded-2xl p-8 text-center text-muted-foreground"
            data-ocid="dashboard.favorites_empty_state"
          >
            No favorites yet. Star elements you love!
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {favorites.slice(0, 16).map((el) => (
              <MiniElementCard
                key={el.symbol}
                symbol={el.symbol}
                name={el.name}
                atomicNumber={el.atomicNumber}
                category={el.category}
                onClick={() =>
                  navigate({
                    to: "/element/$symbol",
                    params: { symbol: el.symbol },
                  })
                }
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Category breakdown */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        data-ocid="dashboard.categories_section"
      >
        <h2 className="font-display text-xl font-semibold mb-4">
          Element Categories
        </h2>
        <div className="glass rounded-2xl p-6 space-y-3">
          {topCats.map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-3">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full flex-shrink-0 bg-gradient-to-br",
                  CATEGORY_GRADIENT[
                    cat as import("@/types/element").ElementCategory
                  ] ?? "",
                )}
              />
              <div className="flex-1 text-sm capitalize text-foreground">
                {cat.replace(/-/g, " ")}
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                {count}
              </div>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / 40) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r",
                    CATEGORY_GRADIENT[
                      cat as import("@/types/element").ElementCategory
                    ] ?? "",
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
