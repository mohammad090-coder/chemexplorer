import { useElement } from "@/hooks/useElements";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
} from "@/types/element";
import {
  createLazyFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { ArrowLeft, GitCompare, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export const Route = createLazyFileRoute("/element/$symbol")({
  component: ElementDetailPage,
});

function AtomModel({ period, symbol }: { period: number; symbol: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
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
      // Nucleus
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

      // Symbol in nucleus
      ctx.fillStyle = "oklch(0.12 0 0)";
      ctx.font = `bold ${symbol.length > 2 ? 6 : 8}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol.slice(0, 2), cx, cy);

      for (let i = 0; i < shells; i++) {
        const r = 20 + i * 20;
        // Orbit ellipse
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.4, (i * Math.PI) / shells, 0, Math.PI * 2);
        ctx.strokeStyle = "oklch(0.68 0.16 258 / 0.3)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Electron
        const angle = t * (1 + i * 0.3) + (i * Math.PI * 2) / shells;
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

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="w-full max-w-[200px]"
    />
  );
}

const PROP_KEYS = [
  {
    key: "atomicMass",
    label: "Atomic Mass",
    unit: "u",
    fmt: (v: number) => v.toFixed(3),
  },
  {
    key: "density",
    label: "Density",
    unit: "g/cm³",
    fmt: (v: number) => (v ? v.toFixed(4) : "—"),
  },
  {
    key: "meltingPoint",
    label: "Melting Point",
    unit: "°C",
    fmt: (v: number) => (v ? v.toFixed(1) : "—"),
  },
  {
    key: "boilingPoint",
    label: "Boiling Point",
    unit: "°C",
    fmt: (v: number) => (v ? v.toFixed(1) : "—"),
  },
  {
    key: "electronegativity",
    label: "Electronegativity",
    unit: "(Pauling)",
    fmt: (v: number) => (v ? v.toFixed(2) : "—"),
  },
  {
    key: "ionizationEnergy",
    label: "Ionization Energy",
    unit: "eV",
    fmt: (v: number) => (v ? v.toFixed(3) : "—"),
  },
  {
    key: "atomicRadius",
    label: "Atomic Radius",
    unit: "pm",
    fmt: (v: number) => (v ? String(v) : "—"),
  },
] as const;

function ElementDetailPage() {
  const { symbol } = useParams({ from: "/element/$symbol" });
  const element = useElement(symbol);
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addRecentlyViewed } = useChemStore();

  useEffect(() => {
    if (symbol) addRecentlyViewed(symbol);
  }, [symbol, addRecentlyViewed]);

  if (!element) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-3xl p-12">
          <div className="text-6xl mb-4">🔬</div>
          <h2 className="font-display text-2xl font-bold mb-2">
            Element not found
          </h2>
          <p className="text-muted-foreground mb-6">
            "{symbol}" doesn't match any known element.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/periodic-table" })}
            className="glass px-6 py-3 rounded-full font-medium hover:bg-card/60 transition-all"
          >
            Back to Periodic Table
          </button>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(element.symbol);
  const gradClass = CATEGORY_GRADIENT[element.category];
  const textClass = CATEGORY_TEXT[element.category];

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      {/* Back + actions */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          type="button"
          whileHover={{ x: -4 }}
          onClick={() => navigate({ to: "/periodic-table" })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="element.back_button"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Periodic Table</span>
        </motion.button>

        <div className="flex gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(element.symbol)}
            className={`glass p-3 rounded-xl transition-all ${isFav ? "text-yellow-400 bg-yellow-400/10" : "text-muted-foreground hover:text-yellow-400"}`}
            data-ocid="element.favorite_button"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className="w-5 h-5" fill={isFav ? "currentColor" : "none"} />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate({ to: "/compare" })}
            className="glass p-3 rounded-xl text-muted-foreground hover:text-accent transition-all"
            data-ocid="element.compare_button"
            aria-label="Compare elements"
          >
            <GitCompare className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`glass rounded-3xl p-8 mb-8 overflow-hidden relative ${gradClass}`}
        data-ocid="element.hero_card"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 rounded-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Atom model */}
          <div className="flex-shrink-0">
            <AtomModel period={element.period} symbol={element.symbol} />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="text-sm text-foreground/70 mb-1">
              Element #{element.atomicNumber}
            </div>
            <h1 className="font-display text-6xl md:text-7xl font-bold text-foreground mb-1 leading-none">
              {element.symbol}
            </h1>
            <h2 className="font-display text-3xl font-semibold text-foreground/90 mb-2">
              {element.name}
            </h2>
            <div
              className={`inline-block text-sm font-medium mb-4 ${textClass}`}
            >
              {CATEGORY_LABELS[element.category]}
            </div>
            <p className="text-foreground/80 text-base leading-relaxed max-w-lg">
              {element.description}
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {[
              {
                label: "Atomic Mass",
                value: `${element.atomicMass.toFixed(3)} u`,
              },
              { label: "Block", value: element.block.toUpperCase() },
              {
                label: "Group",
                value: element.group ? String(element.group) : "—",
              },
              { label: "Period", value: String(element.period) },
              { label: "State", value: element.state },
              { label: "Config", value: element.electronConfiguration },
            ].map((s) => (
              <div
                key={s.label}
                className="glass-elevated rounded-xl p-3 min-w-[100px]"
              >
                <div className="text-xs text-foreground/60 mb-0.5">
                  {s.label}
                </div>
                <div className="text-sm font-mono font-semibold text-foreground truncate">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Properties grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {PROP_KEYS.map((p) => (
          <div key={p.key} className="glass rounded-2xl p-4">
            <div className="text-xs text-muted-foreground mb-1">{p.label}</div>
            <div className="text-xl font-mono font-bold text-foreground">
              {p.fmt((element as unknown as Record<string, number>)[p.key])}
            </div>
            <div className="text-xs text-muted-foreground">{p.unit}</div>
          </div>
        ))}
        <div className="glass rounded-2xl p-4">
          <div className="text-xs text-muted-foreground mb-1">
            Electron Config
          </div>
          <div className="text-sm font-mono font-bold text-foreground leading-relaxed">
            {element.electronConfiguration}
          </div>
        </div>
      </motion.div>

      {/* Uses & Facts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass rounded-2xl p-6"
          data-ocid="element.uses_section"
        >
          <h3 className="font-display text-xl font-semibold mb-4 text-accent">
            Real-World Uses
          </h3>
          <ul className="space-y-2">
            {element.uses.map((use) => (
              <li
                key={use}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-accent mt-0.5">▸</span>
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="glass rounded-2xl p-6"
          data-ocid="element.facts_section"
        >
          <h3 className="font-display text-xl font-semibold mb-4 text-primary">
            Fascinating Facts
          </h3>
          <ul className="space-y-2">
            {element.facts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary mt-0.5">✦</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
