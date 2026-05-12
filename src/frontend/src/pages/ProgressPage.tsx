import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChemStore } from "@/store/useChemStore";
import type { QuizHistoryEntry } from "@/types/chemistry";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Circle,
  Info,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface TopicStats {
  name: string;
  total: number;
  correct: number;
  pct: number;
  lastAttempted?: number;
}

interface HeatmapCell {
  date: string; // "YYYY-MM-DD"
  count: number;
  ts: number; // day start timestamp
}

// ── Constants ─────────────────────────────────────────────────────────────────
const TOPICS = [
  { name: "Periodic Table", keys: ["element", "symbol", "periodic"] },
  {
    name: "Atomic Structure",
    keys: ["atomic", "atom", "electron", "orbital", "shell"],
  },
  { name: "Reactions", keys: ["reaction", "react", "equation", "product"] },
  {
    name: "Molecules",
    keys: ["molecule", "mol", "trend", "radius", "electronegativity"],
  },
  {
    name: "Formulas",
    keys: ["formula", "mole", "thermo", "electro", "kinetic"],
  },
  {
    name: "Lab Skills",
    keys: ["lab", "titration", "precipitate", "organic", "carbon"],
  },
];

const RADAR_LABELS = TOPICS.map((t) => t.name);

const TOPIC_IMPROVEMENT_NOTES: Record<string, string> = {
  "Periodic Table":
    "Review group trends and periodicity. Practice element identification quizzes.",
  "Atomic Structure":
    "Focus on electron configurations and quantum numbers. Try Atom Tracker.",
  Reactions:
    "Work through balancing equations and identifying reaction types in the Reaction Lab.",
  Molecules:
    "Study VSEPR theory and bond angles. Use the 3D Molecule Visualizer.",
  Formulas: "Revisit mole concept and formula derivations in the Formula Tab.",
  "Lab Skills": "Practice titration experiments in the Virtual Lab section.",
};

const FEATURES = [
  { key: "visited_periodic_table", label: "Periodic Table", icon: "⚛️" },
  { key: "visited_reaction_lab", label: "Reaction Lab", icon: "⚗️" },
  { key: "visited_carbon", label: "Carbon Section", icon: "💎" },
  { key: "visited_reactivity_series", label: "Reactivity Series", icon: "🔥" },
  { key: "visited_atom_tracker", label: "Atom Tracker", icon: "🔬" },
  { key: "visited_formula_tab", label: "Formula Tab", icon: "📐" },
  { key: "visited_molecules", label: "Molecules", icon: "🧬" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function topicFromId(id: string): string {
  const lower = id.toLowerCase();
  for (const t of TOPICS) {
    if (t.keys.some((k) => lower.includes(k))) return t.name;
  }
  return "Periodic Table";
}

function difficultyFromId(id: string): string {
  if (id.includes("hard") || id.includes("h_")) return "hard";
  if (id.includes("med") || id.includes("m_")) return "medium";
  return "easy";
}

function scoreFromHistory(history: QuizHistoryEntry[]) {
  if (!history.length)
    return { total: 0, correct: 0, pct: 0, streak: 0, best: 0, improvement: 0 };
  const correct = history.filter((h) => h.correct).length;
  const pct = Math.round((correct / history.length) * 100);
  const sorted = [...history].sort((a, b) => a.timestamp - b.timestamp);
  const firstFive = sorted.slice(0, 5);
  const lastFive = sorted.slice(-5);
  const firstPct = firstFive.length
    ? Math.round(
        (firstFive.filter((h) => h.correct).length / firstFive.length) * 100,
      )
    : 0;
  const lastPct = lastFive.length
    ? Math.round(
        (lastFive.filter((h) => h.correct).length / lastFive.length) * 100,
      )
    : 0;
  return {
    total: history.length,
    correct,
    pct,
    streak: 0,
    best: pct,
    improvement: lastPct - firstPct,
  };
}

function topicStats(history: QuizHistoryEntry[]): TopicStats[] {
  return TOPICS.map(({ name, keys }) => {
    const entries = history.filter((h) =>
      keys.some((k) => h.questionId.toLowerCase().includes(k)),
    );
    if (!entries.length) return { name, total: 0, correct: 0, pct: 0 };
    const correct = entries.filter((e) => e.correct).length;
    const lastAttempted = Math.max(...entries.map((e) => e.timestamp));
    return {
      name,
      total: entries.length,
      correct,
      pct: Math.round((correct / entries.length) * 100),
      lastAttempted,
    };
  });
}

function weekScore(history: QuizHistoryEntry[]): number {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const week = history.filter((h) => h.timestamp >= weekAgo);
  if (!week.length) return 0;
  return Math.round((week.filter((h) => h.correct).length / week.length) * 100);
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function scoreColor(pct: number): string {
  if (pct >= 70) return "text-emerald-400";
  if (pct >= 40) return "text-amber-400";
  return "text-red-400";
}

function barColor(pct: number): string {
  if (pct >= 70) return "bg-emerald-500";
  if (pct >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function circleStroke(pct: number): string {
  if (pct >= 70) return "oklch(0.72 0.18 142)";
  if (pct >= 40) return "oklch(0.78 0.22 85)";
  return "oklch(0.65 0.19 22)";
}

function buildAttemptSeries(
  history: QuizHistoryEntry[],
  maxPoints = 10,
): { x: number; y: number }[] {
  if (history.length === 0) return [];
  const sorted = [...history].sort((a, b) => a.timestamp - b.timestamp);
  const bucketSize = Math.max(1, Math.ceil(sorted.length / maxPoints));
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < sorted.length; i += bucketSize) {
    const bucket = sorted.slice(i, i + bucketSize);
    const pct = Math.round(
      (bucket.filter((h) => h.correct).length / bucket.length) * 100,
    );
    points.push({ x: points.length + 1, y: pct });
  }
  return points;
}

/** Build 84-day heatmap grid, padded to start on Monday */
function buildHeatmapData(history: QuizHistoryEntry[]): HeatmapCell[][] {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  // Map "YYYY-MM-DD" → count
  const counts: Record<string, number> = {};
  for (const h of history) {
    const d = new Date(h.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }

  // Go back 83 days from today → 84 cells total
  const cells: HeatmapCell[] = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    cells.push({ date: key, count: counts[key] ?? 0, ts: d.getTime() });
  }

  // Group by week columns (7 rows each column)
  const weeks: HeatmapCell[][] = [];
  for (let col = 0; col < 12; col++) {
    weeks.push(cells.slice(col * 7, col * 7 + 7));
  }
  return weeks;
}

function heatmapCellColor(count: number): string {
  if (count === 0) return "oklch(0.22 0.02 265 / 0.5)";
  if (count <= 5) return "oklch(0.72 0.22 195 / 0.55)";
  if (count <= 15) return "oklch(0.65 0.22 260 / 0.75)";
  return "oklch(0.72 0.22 300 / 0.9)";
}

function heatmapCellBorder(count: number): string {
  if (count === 0) return "oklch(0.35 0.02 265 / 0.3)";
  if (count <= 5) return "oklch(0.72 0.22 195 / 0.4)";
  if (count <= 15) return "oklch(0.65 0.22 260 / 0.6)";
  return "oklch(0.72 0.22 300 / 0.8)";
}

function getMonthLabels(
  weeks: HeatmapCell[][],
): { col: number; label: string }[] {
  const labels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const month = new Date(week[0].ts).getMonth();
    if (month !== lastMonth) {
      labels.push({
        col,
        label: new Date(week[0].ts).toLocaleString("default", {
          month: "short",
        }),
      });
      lastMonth = month;
    }
  });
  return labels;
}

// ── Sub-components ────────────────────────────────────────────────────────────

const AnimatedNumber = memo(function AnimatedNumber({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - (1 - t) ** 3;
      setVal(Math.round(ease * target));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
});

const StatCard = memo(function StatCard({
  icon,
  label,
  value,
  suffix = "",
  delay = 0,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
  highlight?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      data-ocid="progress.stat_card"
      className={`glass rounded-2xl p-5 flex flex-col gap-3 transition-smooth ${highlight ? "ring-1 ring-emerald-500/30 shadow-[0_0_16px_oklch(0.72_0.18_142/0.15)]" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-accent">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-foreground">
          {visible ? <AnimatedNumber target={value} suffix={suffix} /> : "0"}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
});

// ── Activity Heatmap ──────────────────────────────────────────────────────────
const DAY_KEY_MAP = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const ActivityHeatmap = memo(function ActivityHeatmap({
  history,
}: { history: QuizHistoryEntry[] }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const weeks = buildHeatmapData(history);
  const displayWeeks = isMobile ? weeks.slice(6) : weeks; // last 6 weeks on mobile
  const monthLabels = getMonthLabels(displayWeeks);
  const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];
  const cellSize = isMobile ? 8 : 10;
  const cellGap = 2;

  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleCellHover = useCallback(
    (cell: HeatmapCell, e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        date: cell.date,
        count: cell.count,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [],
  );

  const totalActivity = history.length;

  return (
    <div
      data-ocid="progress.heatmap_section"
      className="glass rounded-2xl p-5"
      ref={containerRef}
      style={{ position: "relative" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            Activity Heatmap
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {totalActivity} questions answered in last {isMobile ? "6" : "12"}{" "}
            weeks
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          {[0, 3, 9, 20].map((v) => (
            <div
              key={v}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: heatmapCellColor(v),
                border: `1px solid ${heatmapCellBorder(v)}`,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Month labels row */}
      <div className="flex mb-1 pl-8" style={{ gap: cellGap }}>
        {displayWeeks.map((_, colIdx) => {
          const label = monthLabels.find((m) => m.col === colIdx);
          return (
            <div
              key={`month-col-${colIdx}-${label?.label ?? ""}`}
              style={{
                width: cellSize,
                fontSize: 9,
                color: "oklch(0.6 0.01 265 / 0.7)",
                flexShrink: 0,
              }}
            >
              {label ? label.label : ""}
            </div>
          );
        })}
      </div>

      {/* Grid: day labels + cells */}
      <div className="flex gap-1">
        {/* Day of week labels */}
        <div
          className="flex flex-col"
          style={{ gap: cellGap, marginRight: 4, width: 24 }}
        >
          {DAY_LABELS.map((d, dayIdx) => (
            <div
              key={DAY_KEY_MAP[dayIdx]}
              style={{
                height: cellSize,
                fontSize: 8,
                color: "oklch(0.6 0.01 265 / 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cell grid */}
        <div className="flex" style={{ gap: cellGap }}>
          {displayWeeks.map((week) => (
            <div
              key={week[0].date}
              className="flex flex-col"
              style={{ gap: cellGap }}
            >
              {week.map((cell) => (
                <div
                  key={cell.date}
                  title={`${cell.date}: ${cell.count} questions`}
                  onMouseEnter={(e) => handleCellHover(cell, e)}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderRadius: 2,
                    background: heatmapCellColor(cell.count),
                    border: `1px solid ${heatmapCellBorder(cell.count)}`,
                    cursor: "default",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.5)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none glass rounded-lg px-3 py-2 text-xs font-medium shadow-lg z-20 border border-border/40"
          style={{
            left: tooltip.x,
            top: tooltip.y - 52,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <p className="text-foreground font-semibold">
            {new Date(tooltip.date).toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </p>
          <p
            className={
              tooltip.count > 0 ? "text-cyan-400" : "text-muted-foreground"
            }
          >
            {tooltip.count === 0
              ? "No activity"
              : `${tooltip.count} question${tooltip.count !== 1 ? "s" : ""} answered`}
          </p>
        </div>
      )}
    </div>
  );
});

// ── Radar Chart (Canvas-based with requestAnimationFrame animation) ───────────
const RadarChartCanvas = memo(function RadarChartCanvas({
  values,
  labels,
}: { values: number[]; labels: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(canvas.parentElement?.clientWidth ?? 300, 300);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.35;
    const n = labels.length;
    const startTime = performance.now();
    const duration = 1000;

    function getPoint(factor: number, i: number) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return {
        x: cx + factor * r * Math.cos(angle),
        y: cy + factor * r * Math.sin(angle),
      };
    }

    function draw(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - (1 - t) ** 3;
      progressRef.current = ease;

      ctx.clearRect(0, 0, size, size);

      // Grid rings
      for (const factor of [0.25, 0.5, 0.75, 1.0]) {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const p = getPoint(factor, i);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = "oklch(0.55 0.015 265 / 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        // Ring pct label
        ctx.font = `${size * 0.028}px JetBrains Mono, monospace`;
        ctx.fillStyle = "oklch(0.55 0.015 265 / 0.7)";
        ctx.textAlign = "left";
        ctx.fillText(
          `${Math.round(factor * 100)}%`,
          cx + 3,
          cy - factor * r - 3,
        );
      }

      // Axis lines
      for (let i = 0; i < n; i++) {
        const p = getPoint(1, i);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = "oklch(0.55 0.015 265 / 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Filled polygon (animated)
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const factor = ease * ((values[i] ?? 0) / 100);
        const p = getPoint(factor, i);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();

      // Gradient fill
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, "oklch(0.72 0.22 260 / 0.5)");
      grad.addColorStop(1, "oklch(0.55 0.18 295 / 0.2)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke with glow
      ctx.shadowColor = "oklch(0.72 0.22 265 / 0.7)";
      ctx.shadowBlur = 8;
      ctx.strokeStyle = "oklch(0.75 0.22 265)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Vertex dots
      for (let i = 0; i < n; i++) {
        const factor = ease * ((values[i] ?? 0) / 100);
        const p = getPoint(factor, i);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.75 0.22 265)";
        ctx.fill();
        ctx.strokeStyle = "oklch(0.12 0.02 265)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Axis labels (always at full radius, no animation)
      const labelR = r * 1.25;
      ctx.shadowBlur = 0;
      for (let i = 0; i < n; i++) {
        const lp = getPoint(labelR / r, i);
        const pct = values[i] ?? 0;

        const isLeft = lp.x < cx - 8;
        const isRight = lp.x > cx + 8;
        ctx.textAlign = isLeft ? "right" : isRight ? "left" : "center";

        ctx.font = `bold ${size * 0.032}px General Sans, sans-serif`;
        ctx.fillStyle = "oklch(0.90 0.01 265)";
        ctx.fillText(labels[i], lp.x, lp.y - 5);

        ctx.font = `${size * 0.03}px JetBrains Mono, monospace`;
        ctx.fillStyle = circleStroke(pct);
        ctx.fillText(`${pct}%`, lp.x, lp.y + 8);
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(draw);
      }
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [values, labels]);

  return (
    <div
      data-ocid="progress.radar_chart"
      className="w-full flex justify-center"
    >
      <canvas ref={canvasRef} aria-label="Skill radar chart" role="img" />
    </div>
  );
});

// ── Legacy SVG Radar (kept for fallback, hidden) ──────────────────────────────
const RadarChart = memo(function RadarChart({
  values,
  labels,
}: { values: number[]; labels: string[] }) {
  return <RadarChartCanvas values={values} labels={labels} />;
});

// ── Line Chart ────────────────────────────────────────────────────────────────
const LineChart = memo(function LineChart({
  points,
}: { points: { x: number; y: number }[] }) {
  const [drawn, setDrawn] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    attempt: number;
    score: number;
  } | null>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const handleMouseEnter = useCallback(
    (p: { x: number; y: number }, svgX: number, svgY: number) => {
      setTooltip({ x: svgX, y: svgY, attempt: p.x, score: p.y });
    },
    [],
  );

  const W = 500;
  const H = 180;
  const PAD = { top: 16, right: 24, bottom: 32, left: 40 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const gridLines = [25, 50, 75, 100];

  if (points.length === 0) {
    return (
      <div
        data-ocid="progress.line_chart_empty"
        className="flex items-center justify-center h-32 text-muted-foreground text-sm"
      >
        Take more quizzes to see your score trend
      </div>
    );
  }

  const maxX = Math.max(points.length - 1, 1);
  const px = (xi: number) => PAD.left + (xi / maxX) * chartW;
  const py = (yi: number) => PAD.top + chartH - (yi / 100) * chartH;

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(p.y)}`)
    .join(" ");

  return (
    <div
      data-ocid="progress.line_chart"
      className="relative w-full overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Score trend line chart"
        style={{ overflow: "visible" }}
      >
        {gridLines.map((g) => (
          <g key={`grid-${g}`}>
            <line
              x1={PAD.left}
              y1={py(g)}
              x2={W - PAD.right}
              y2={py(g)}
              stroke="oklch(0.55 0.015 265 / 0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={PAD.left - 6}
              y={py(g) + 4}
              fontSize="9"
              fill="oklch(0.55 0.015 265 / 0.7)"
              textAnchor="end"
            >
              {g}%
            </text>
          </g>
        ))}

        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="oklch(0.65 0.22 265)"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.65 0.22 265)"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>
        {points.length > 1 && (
          <path
            d={`${d} L ${px(points.length - 1)} ${py(0)} L ${px(0)} ${py(0)} Z`}
            fill="url(#lineAreaGrad)"
          />
        )}

        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="oklch(0.65 0.22 265)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            pathLen > 0
              ? {
                  strokeDasharray: pathLen,
                  strokeDashoffset: drawn ? 0 : pathLen,
                  transition:
                    "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }
              : {}
          }
        />

        {points.map((p, i) => (
          <text
            key={`xl-${p.x}`}
            x={px(i)}
            y={H - 4}
            fontSize="9"
            fill="oklch(0.55 0.015 265 / 0.7)"
            textAnchor="middle"
          >
            #{p.x}
          </text>
        ))}

        {points.map((p, i) => (
          <circle
            key={`dot-${p.x}`}
            cx={px(i)}
            cy={py(p.y)}
            r="5"
            fill="oklch(0.65 0.22 265)"
            stroke="oklch(0.12 0.02 265)"
            strokeWidth="2"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => handleMouseEnter(p, px(i), py(p.y))}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
      </svg>

      {tooltip && (
        <div
          className="absolute pointer-events-none glass rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg border border-border/40 z-10"
          style={{
            left: `${(tooltip.x / W) * 100}%`,
            top: `${(tooltip.y / H) * 100}%`,
            transform: "translate(-50%, -110%)",
          }}
        >
          <span className="text-foreground">Attempt #{tooltip.attempt}: </span>
          <span className={scoreColor(tooltip.score)}>{tooltip.score}%</span>
        </div>
      )}
    </div>
  );
});

// ── Circular Progress ─────────────────────────────────────────────────────────
const CircleChart = memo(function CircleChart({
  pct,
  label,
  sublabel,
  delay = 0,
}: { pct: number; label: string; sublabel: string; delay?: number }) {
  const [animPct, setAnimPct] = useState(0);
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animPct / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => {
      const duration = 1200;
      const start = performance.now();
      const step = (now: number) => {
        const t2 = Math.min((now - start) / duration, 1);
        const ease = 1 - (1 - t2) ** 3;
        setAnimPct(Math.round(ease * pct));
        if (t2 < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div
      data-ocid="progress.circle_chart"
      className="glass rounded-2xl p-5 flex flex-col items-center gap-3 transition-smooth hover:scale-105"
    >
      <div className="relative">
        <svg
          width="112"
          height="112"
          aria-label={`${label}: ${animPct}%`}
          role="img"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="56"
            cy="56"
            r={r}
            fill="none"
            style={{ stroke: "oklch(0.28 0.015 265 / 0.4)" }}
            strokeWidth="10"
          />
          <circle
            cx="56"
            cy="56"
            r={r}
            fill="none"
            stroke={circleStroke(pct)}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-display font-bold ${scoreColor(pct)}`}>
            {animPct}%
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
});

// ── Topic Progress Bar ────────────────────────────────────────────────────────
const TopicProgressBar = memo(function TopicProgressBar({
  stat,
  index,
}: { stat: TopicStats; index: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(stat.pct), 300 + index * 80);
    return () => clearTimeout(t);
  }, [stat.pct, index]);

  return (
    <div
      data-ocid={`progress.topic_bar.${index + 1}`}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground font-medium">{stat.name}</span>
        <span className={`font-mono font-bold ${scoreColor(stat.pct)}`}>
          {stat.total === 0 ? (
            <span className="text-xs text-muted-foreground">Not started</span>
          ) : (
            `${stat.pct}%`
          )}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor(stat.pct)}`}
          style={{ width: `${width}%` }}
        />
      </div>
      {stat.total > 0 && (
        <p className="text-xs text-muted-foreground">
          {stat.correct}/{stat.total} correct
        </p>
      )}
    </div>
  );
});

// ── Weak Areas Topic Grid ─────────────────────────────────────────────────────
const WeakAreasGrid = memo(function WeakAreasGrid({
  topics,
}: { topics: TopicStats[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  function tileAccuracyStyle(pct: number, total: number) {
    if (total === 0) {
      return {
        bg: "oklch(0.22 0.02 265 / 0.4)",
        border: "oklch(0.35 0.02 265 / 0.3)",
        label: "text-muted-foreground",
        badge: "Not started",
        badgeClass: "bg-muted/50 text-muted-foreground",
      };
    }
    if (pct < 40) {
      return {
        bg: "oklch(0.4 0.15 22 / 0.2)",
        border: "oklch(0.65 0.19 22 / 0.45)",
        label: "text-red-400",
        badge: "Weak",
        badgeClass: "bg-red-500/15 text-red-400 border-red-500/30 border",
      };
    }
    if (pct < 70) {
      return {
        bg: "oklch(0.5 0.15 85 / 0.15)",
        border: "oklch(0.78 0.22 85 / 0.4)",
        label: "text-amber-400",
        badge: "Improving",
        badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30 border",
      };
    }
    return {
      bg: "oklch(0.4 0.12 142 / 0.15)",
      border: "oklch(0.72 0.18 142 / 0.45)",
      label: "text-emerald-400",
      badge: "Strong",
      badgeClass:
        "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 border",
    };
  }

  const selectedTopic = selected
    ? topics.find((t) => t.name === selected)
    : null;
  const selectedStyle = selectedTopic
    ? tileAccuracyStyle(selectedTopic.pct, selectedTopic.total)
    : null;

  return (
    <div data-ocid="progress.weak_areas_grid">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {topics.map((topic, i) => {
          const style = tileAccuracyStyle(topic.pct, topic.total);
          const isSelected = selected === topic.name;
          return (
            <button
              type="button"
              key={topic.name}
              data-ocid={`progress.topic_tile.${i + 1}`}
              onClick={() => setSelected(isSelected ? null : topic.name)}
              className="rounded-xl p-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
                transform: isSelected ? "scale(1.03)" : "scale(1)",
                boxShadow: isSelected
                  ? `0 0 16px ${style.border}, inset 0 1px 0 oklch(1 0 0 / 0.08)`
                  : "inset 0 1px 0 oklch(1 0 0 / 0.05)",
              }}
              aria-expanded={isSelected}
              aria-label={`${topic.name}: ${topic.pct}% accuracy`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-semibold text-foreground truncate pr-1">
                  {topic.name}
                </p>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ${style.badgeClass}`}
                >
                  {style.badge}
                </span>
              </div>
              <p className={`text-xl font-display font-bold ${style.label}`}>
                {topic.total === 0 ? "—" : `${topic.pct}%`}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {topic.total === 0
                  ? "No attempts yet"
                  : `${topic.correct}/${topic.total} correct`}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedTopic && selectedStyle && (
        <div
          data-ocid="progress.topic_detail_panel"
          className="mt-3 rounded-xl p-4 transition-all duration-300"
          style={{
            background: selectedStyle.bg,
            border: `1px solid ${selectedStyle.border}`,
            boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.07)",
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                {selectedTopic.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-lg font-display font-bold ${selectedStyle.label}`}
                >
                  {selectedTopic.total === 0
                    ? "No data"
                    : `${selectedTopic.pct}% accuracy`}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Close panel"
              data-ocid="progress.topic_panel_close_button"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
            <div className="glass rounded-lg p-2 text-center">
              <p className={`text-base font-bold ${selectedStyle.label}`}>
                {selectedTopic.total === 0 ? "—" : `${selectedTopic.pct}%`}
              </p>
              <p className="text-muted-foreground">Accuracy</p>
            </div>
            <div className="glass rounded-lg p-2 text-center">
              <p className="text-base font-bold text-foreground">
                {selectedTopic.total}
              </p>
              <p className="text-muted-foreground">Attempted</p>
            </div>
            <div className="glass rounded-lg p-2 text-center">
              <p className="text-base font-bold text-foreground truncate">
                {selectedTopic.lastAttempted
                  ? new Date(selectedTopic.lastAttempted).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                      },
                    )
                  : "—"}
              </p>
              <p className="text-muted-foreground">Last tried</p>
            </div>
          </div>

          {selectedTopic.total > 0 && (
            <div
              className="flex items-start gap-2 text-xs text-muted-foreground mb-3 p-2 rounded-lg"
              style={{ background: "oklch(0.2 0.02 265 / 0.4)" }}
            >
              <Info size={12} className="shrink-0 mt-0.5 text-primary/70" />
              <p>
                {TOPIC_IMPROVEMENT_NOTES[selectedTopic.name] ??
                  "Keep practicing to improve your score."}
              </p>
            </div>
          )}

          <Button
            asChild
            size="sm"
            className="gap-1.5 text-xs w-full"
            data-ocid="progress.topic_practice_button"
          >
            <Link to="/practice">
              Practice {selectedTopic.name} Now <ArrowRight size={12} />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
});

// ── Difficulty Badge ──────────────────────────────────────────────────────────
const DifficultyBadge = memo(function DifficultyBadge({ id }: { id: string }) {
  const diff = difficultyFromId(id);
  const map: Record<string, string> = {
    easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    hard: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${map[diff]}`}
    >
      {diff}
    </span>
  );
});

// ── Main Page ─────────────────────────────────────────────────────────────────
export function ProgressPage() {
  const { quizHistory, quizScore, quizStreak, recentlyViewed } = useChemStore();

  const stats = scoreFromHistory(quizHistory);
  const topics = topicStats(quizHistory);
  const weekPct = weekScore(quizHistory);
  const elementsLearned = Math.min(recentlyViewed.length, 118);
  const elementsLearntPct = Math.round((elementsLearned / 118) * 100);
  const overallMastery =
    stats.total === 0
      ? 0
      : Math.round((quizScore / Math.max(stats.total, 1)) * 100);

  const weakTopics = topics.filter(
    (t) => t.total > 0 && (t.pct < 50 || t.total < 2),
  );
  const recentActivity = quizHistory.slice(0, 5);
  const attemptSeries = buildAttemptSeries(quizHistory, 10);
  const radarValues = topics.map((t) => t.pct);

  const [exploredFeatures, setExploredFeatures] = useState<
    Record<string, boolean>
  >({});
  useEffect(() => {
    const result: Record<string, boolean> = {};
    for (const f of FEATURES)
      result[f.key] = localStorage.getItem(f.key) === "true";
    setExploredFeatures(result);
  }, []);
  const exploredCount = Object.values(exploredFeatures).filter(Boolean).length;
  const hasData = quizHistory.length > 0;

  return (
    <div data-ocid="progress.page" className="min-h-screen pb-32">
      {/* Header */}
      <div className="px-4 pt-8 pb-6 md:px-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-accent">
            <BarChart3 size={20} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Learning Progress
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your chemistry mastery
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 space-y-8 max-w-5xl mx-auto">
        {/* ── 1. Performance Analytics ─────────────────────── */}
        <section data-ocid="progress.overview_section">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Performance Analytics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              icon={<BookOpen size={18} />}
              label="Quizzes Taken"
              value={stats.total}
              delay={0}
            />
            <StatCard
              icon={<Target size={18} />}
              label="Average Score"
              value={stats.pct}
              suffix="%"
              delay={100}
            />
            <StatCard
              icon={<Zap size={18} />}
              label="Current Streak"
              value={quizStreak}
              delay={200}
            />
            <StatCard
              icon={<TrendingUp size={18} />}
              label="Improvement"
              value={Math.abs(stats.improvement)}
              suffix={stats.improvement >= 0 ? "% ↑" : "% ↓"}
              delay={300}
              highlight={stats.improvement > 0}
            />
          </div>
          {!hasData && (
            <div
              data-ocid="progress.overview_empty_state"
              className="mt-4 glass rounded-2xl p-6 text-center"
            >
              <p className="text-3xl mb-2">🚀</p>
              <p className="font-display font-semibold text-foreground mb-1">
                Start your chemistry journey!
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Take a quiz to start tracking your progress.
              </p>
              <Button asChild size="sm" className="gap-2">
                <Link to="/practice" data-ocid="progress.start_practice_button">
                  Practice Now <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          )}
        </section>

        {/* ── 2. Activity Heatmap ───────────────────────────── */}
        <section data-ocid="progress.heatmap_container_section">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Daily Activity
          </h2>
          <ActivityHeatmap history={quizHistory} />
        </section>

        {/* ── 3. Skill Radar Graph ──────────────────────────── */}
        <section data-ocid="progress.skill_graph_section">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Skill Graph
          </h2>
          <div className="glass rounded-2xl p-5">
            <p className="text-xs text-muted-foreground mb-4 text-center">
              Your proficiency across 6 chemistry topics
            </p>
            <RadarChart values={radarValues} labels={RADAR_LABELS} />
            {!hasData && (
              <p className="text-xs text-center text-muted-foreground mt-3">
                Complete quizzes to populate your skill graph
              </p>
            )}
          </div>
        </section>

        {/* ── 4. Score Trend Line Chart ─────────────────────── */}
        <section data-ocid="progress.trend_section">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Score Trend
            {attemptSeries.length > 0 && (
              <span className="ml-2 text-xs normal-case font-normal text-muted-foreground">
                ({quizHistory.length} total answer
                {quizHistory.length !== 1 ? "s" : ""})
              </span>
            )}
          </h2>
          <div className="glass rounded-2xl p-5">
            <LineChart points={attemptSeries} />
          </div>
        </section>

        {/* ── 5. Mastery Indicators ─────────────────────────── */}
        <section data-ocid="progress.circles_section">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Mastery Indicators
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <CircleChart
              pct={overallMastery}
              label="Overall Mastery"
              sublabel={`${quizScore} pts earned`}
              delay={0}
            />
            <CircleChart
              pct={weekPct}
              label="This Week"
              sublabel="7-day score"
              delay={150}
            />
            <CircleChart
              pct={elementsLearntPct}
              label="Elements Learned"
              sublabel={`${elementsLearned} / 118`}
              delay={300}
            />
          </div>
        </section>

        {/* ── 6. Accuracy by Topic (Weak Areas Grid) ───────── */}
        <section data-ocid="progress.accuracy_section">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Accuracy by Topic
            </h2>
            {weakTopics.length > 0 && (
              <Badge className="bg-red-500/15 text-red-400 border-red-500/30 border text-xs gap-1 font-medium">
                <AlertTriangle size={10} />
                {weakTopics.length} weak
              </Badge>
            )}
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-xs text-muted-foreground mb-4">
              Click any topic tile to see accuracy details and practice
              suggestions
            </p>
            <WeakAreasGrid topics={topics} />
          </div>
        </section>

        {/* ── 7. Topics Progress Bars ───────────────────────── */}
        <section data-ocid="progress.topics_section">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Topics Progress
          </h2>
          <div className="glass rounded-2xl p-5 space-y-5">
            {topics.map((stat, i) => (
              <TopicProgressBar key={stat.name} stat={stat} index={i} />
            ))}
          </div>
        </section>

        {/* ── 8. Weak Topic Detection ───────────────────────── */}
        <section data-ocid="progress.weak_topics_section">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Weak Topics
            </h2>
            {weakTopics.length > 0 && (
              <Badge className="bg-red-500/15 text-red-400 border-red-500/30 border text-xs gap-1 font-medium">
                <AlertTriangle size={10} />
                {weakTopics.length} needs practice
              </Badge>
            )}
          </div>
          {weakTopics.length === 0 ? (
            <div
              data-ocid="progress.weak_topics_empty_state"
              className="glass rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Star size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {hasData
                    ? "Great job! All practiced topics above 50%"
                    : "No data yet — take a quiz first!"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {hasData
                    ? "Keep pushing all topics above 70% for full mastery."
                    : "Your weak topics will appear here after you practice."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {weakTopics.map((t, i) => (
                <div
                  key={t.name}
                  data-ocid={`progress.weak_topic.${i + 1}`}
                  className="glass rounded-xl p-4 flex items-center justify-between gap-4 border border-red-500/15 hover:border-red-500/30 transition-smooth"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
                      <AlertTriangle size={14} className="text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-red-400 font-mono font-semibold">
                          {t.pct}%
                        </span>{" "}
                        correct • {t.total} attempt{t.total !== 1 ? "s" : ""}
                        {t.total < 2 && (
                          <span className="ml-1 text-amber-400">
                            (too few attempts)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="shrink-0 gap-1.5 text-xs"
                    data-ocid={`progress.practice_weak_button.${i + 1}`}
                  >
                    <Link to="/practice">
                      Practice Now <ArrowRight size={12} />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 9. Recent Activity ────────────────────────────── */}
        <section data-ocid="progress.recent_activity_section">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Recent Activity
          </h2>
          {recentActivity.length === 0 ? (
            <div
              data-ocid="progress.recent_activity_empty_state"
              className="glass rounded-2xl p-8 text-center"
            >
              <p className="text-4xl mb-3">📚</p>
              <p className="font-semibold text-foreground mb-1">
                No quizzes taken yet
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Try Practice Mode to start building your history!
              </p>
              <Button asChild size="sm" variant="outline" className="gap-2">
                <Link to="/practice" data-ocid="progress.go_practice_button">
                  Try Practice Mode <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="glass rounded-2xl overflow-hidden divide-y divide-border/30">
              {recentActivity.map((entry, i) => (
                <div
                  key={`${entry.questionId}-${entry.timestamp}`}
                  data-ocid={`progress.activity_item.${i + 1}`}
                  className="px-5 py-3.5 flex items-center gap-4"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${entry.correct ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {entry.correct ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Circle size={14} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {topicFromId(entry.questionId)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <DifficultyBadge id={entry.questionId} />
                    <Badge
                      variant="outline"
                      className={
                        entry.correct
                          ? "border-emerald-500/40 text-emerald-400"
                          : "border-red-500/40 text-red-400"
                      }
                    >
                      {entry.correct ? "Correct" : "Wrong"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 10. Features Explored ──────────────────────────── */}
        <section data-ocid="progress.features_section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Features Explored
            </h2>
            <Badge variant="secondary" className="text-xs gap-1">
              <Activity size={11} />
              {exploredCount} / {FEATURES.length}
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {FEATURES.map((f, i) => {
              const done = exploredFeatures[f.key] ?? false;
              return (
                <div
                  key={f.key}
                  data-ocid={`progress.feature_tile.${i + 1}`}
                  className={`rounded-xl p-4 flex flex-col items-center gap-2 text-center transition-smooth border ${done ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_oklch(0.72_0.18_142/0.18)]" : "glass opacity-50"}`}
                >
                  <span className="text-2xl">{f.icon}</span>
                  <p
                    className={`text-xs font-medium ${done ? "text-emerald-400" : "text-muted-foreground"}`}
                  >
                    {f.label}
                  </p>
                  {done && (
                    <CheckCircle2 size={14} className="text-emerald-400" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
