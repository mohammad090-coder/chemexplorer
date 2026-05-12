import { ElementOverlay } from "@/components/ElementOverlay";
import { ELEMENTS } from "@/lib/elements-data";
import { useExploreStore } from "@/store/exploreStore";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_TEXT,
  type Element,
} from "@/types/element";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Atom,
  BarChart2,
  BookOpen,
  Brain,
  CircleDot,
  ClipboardList,
  Compass,
  Diamond,
  FlaskConical,
  GitCompare,
  Heart,
  Keyboard,
  LayoutDashboard,
  Lightbulb,
  Pencil,
  TestTube,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ── Daily featured element (rotates by day of year) ──────────────────────────
const DAILY_PICKS = ["Au", "C", "Fe", "Ne", "Ag", "U", "He", "O", "N", "Si"];
const dayOfYear = Math.floor(
  (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
    86_400_000,
);
const DAILY_SYMBOL = DAILY_PICKS[dayOfYear % DAILY_PICKS.length];

// Element facts keyed by symbol
const ELEMENT_FACTS: Record<string, string> = {
  Au: "Gold has been treasured since antiquity and is so malleable that 1g can be hammered into a 1 m² sheet.",
  C: "Carbon is the basis of all known life and exists as diamond, graphite, graphene, and fullerene.",
  Fe: "Iron is the most abundant element on Earth by mass and the core of haemoglobin in your blood.",
  Ne: "Neon produces a bright orange-red glow in signs and is the 5th most abundant element in the universe.",
  Ag: "Silver has the highest thermal and electrical conductivity of any metal and is a natural antimicrobial.",
  U: "Uranium contains more energy per gram than any other fuel — one pellet equals about 17,000 cubic feet of gas.",
  He: "Helium is the second most abundant element in the universe and the only element discovered in the Sun first.",
  O: "Oxygen makes up 21% of Earth's atmosphere and is present in more compounds than any other element.",
  N: "Nitrogen gas makes up 78% of Earth's atmosphere and is essential for all amino acids and DNA bases.",
  Si: "Silicon is the second most abundant element in Earth's crust and the backbone of modern electronics.",
};

const STATS = [
  { label: "Elements", value: "118", suffix: "" },
  { label: "Questions", value: "300", suffix: "+" },
  { label: "Reactions", value: "200", suffix: "+" },
  { label: "Curriculum", value: "11 & 12", suffix: "" },
];

const ALL_FEATURES = [
  {
    icon: Atom,
    label: "Periodic Table",
    desc: "Explore all 118 elements with temperature states & trends",
    to: "/periodic-table",
    gradient: "from-blue-500/20 via-violet-500/10 to-violet-500/20",
    border: "hover:border-blue-400/50",
    glow: "hover:shadow-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: FlaskConical,
    label: "Reaction Lab",
    desc: "Mix chemicals, balance equations, and see reactions animate",
    to: "/reaction-lab",
    gradient: "from-emerald-500/20 via-teal-500/10 to-teal-500/20",
    border: "hover:border-emerald-400/50",
    glow: "hover:shadow-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Diamond,
    label: "Carbon Lab",
    desc: "Diamond, Graphite, Graphene, Fullerene — structures & uses",
    to: "/carbon",
    gradient: "from-slate-400/20 via-zinc-500/10 to-zinc-500/20",
    border: "hover:border-slate-300/50",
    glow: "hover:shadow-slate-400/20",
    iconColor: "text-slate-300",
  },
  {
    icon: Brain,
    label: "Practice Mode",
    desc: "300+ MCQ, assertion-reason, numerical & reaction questions",
    to: "/practice",
    gradient: "from-rose-500/20 via-pink-500/10 to-pink-500/20",
    border: "hover:border-rose-400/50",
    glow: "hover:shadow-rose-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: TestTube,
    label: "Virtual Lab",
    desc: "Titration, heating reactions, and precipitation experiments",
    to: "/virtual-lab",
    gradient: "from-lime-500/20 via-emerald-500/10 to-emerald-500/20",
    border: "hover:border-lime-400/50",
    glow: "hover:shadow-lime-500/20",
    iconColor: "text-lime-400",
  },
  {
    icon: CircleDot,
    label: "Molecules",
    desc: "3D rotating models: H₂O, CH₄, CO₂, benzene & more",
    to: "/molecules",
    gradient: "from-sky-500/20 via-blue-500/10 to-blue-500/20",
    border: "hover:border-sky-400/50",
    glow: "hover:shadow-sky-500/20",
    iconColor: "text-sky-400",
  },
  {
    icon: Pencil,
    label: "Molecule Builder",
    desc: "Drag & drop atoms, draw bonds, detect compounds instantly",
    to: "/molecule-builder",
    gradient: "from-teal-500/20 via-cyan-500/10 to-cyan-500/20",
    border: "hover:border-teal-400/50",
    glow: "hover:shadow-teal-500/20",
    iconColor: "text-teal-300",
  },
  {
    icon: Atom,
    label: "Atom Tracker",
    desc: "Step-by-step electron configuration with animated orbitals",
    to: "/atom-tracker",
    gradient: "from-violet-500/20 via-purple-500/10 to-purple-500/20",
    border: "hover:border-violet-400/50",
    glow: "hover:shadow-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: BookOpen,
    label: "Formula Hub",
    desc: "Class 11 & 12 formulas with derivations and quick solve",
    to: "/formulas",
    gradient: "from-amber-500/20 via-orange-500/10 to-orange-500/20",
    border: "hover:border-amber-400/50",
    glow: "hover:shadow-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Zap,
    label: "Reactivity Series",
    desc: "Metal reactivity rankings and reaction simulations",
    to: "/reactivity-series",
    gradient: "from-yellow-500/20 via-amber-500/10 to-amber-500/20",
    border: "hover:border-yellow-400/50",
    glow: "hover:shadow-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Lightbulb,
    label: "Smart Features",
    desc: "Periodic trends, named reactions, revision cards & notes",
    to: "/smart-features",
    gradient: "from-orange-500/20 via-red-500/10 to-red-500/20",
    border: "hover:border-orange-400/50",
    glow: "hover:shadow-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: BarChart2,
    label: "Progress",
    desc: "Track learning with skill graphs and analytics dashboards",
    to: "/progress",
    gradient: "from-indigo-500/20 via-blue-500/10 to-blue-500/20",
    border: "hover:border-indigo-400/50",
    glow: "hover:shadow-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: GitCompare,
    label: "Compare",
    desc: "Side-by-side comparison of any two elements",
    to: "/compare",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-pink-500/20",
    border: "hover:border-fuchsia-400/50",
    glow: "hover:shadow-fuchsia-500/20",
    iconColor: "text-fuchsia-400",
  },
  {
    icon: Heart,
    label: "Favorites",
    desc: "Save and revisit your favorite elements instantly",
    to: "/favorites",
    gradient: "from-red-500/20 via-rose-500/10 to-rose-500/20",
    border: "hover:border-red-400/50",
    glow: "hover:shadow-red-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    desc: "Your personal chemistry learning overview",
    to: "/dashboard",
    gradient: "from-teal-500/20 via-cyan-500/10 to-cyan-500/20",
    border: "hover:border-teal-400/50",
    glow: "hover:shadow-teal-500/20",
    iconColor: "text-teal-400",
  },
  {
    icon: ClipboardList,
    label: "Exam Mode",
    desc: "Chapter-wise timed exams with score tracking & performance breakdown",
    to: "/exam-mode",
    gradient: "from-cyan-500/20 via-sky-500/10 to-sky-500/20",
    border: "hover:border-cyan-400/50",
    glow: "hover:shadow-cyan-500/20",
    iconColor: "text-cyan-400",
  },
];

// ── Top 5 spotlight tools ───────────────────────────────────────────────────
const SPOTLIGHT_TOOLS = [
  {
    emoji: "🧪",
    title: "Virtual Lab",
    tagline: "Run real chemistry experiments",
    to: "/virtual-lab",
    animationType: "bubbles" as const,
    glowColor: "rgba(163,230,53,0.15)",
    borderHover: "hover:border-lime-400/40",
    shadowHover: "hover:shadow-lime-500/15",
  },
  {
    emoji: "⚗️",
    title: "Reaction Simulator",
    tagline: "200+ reactions with step-by-step explanations",
    to: "/reaction-lab",
    animationType: "equation" as const,
    glowColor: "rgba(52,211,153,0.15)",
    borderHover: "hover:border-emerald-400/40",
    shadowHover: "hover:shadow-emerald-500/15",
  },
  {
    emoji: "⚛️",
    title: "Molecule Builder",
    tagline: "Build molecules atom by atom",
    to: "/molecule-builder",
    animationType: "atoms" as const,
    glowColor: "rgba(34,211,238,0.15)",
    borderHover: "hover:border-cyan-400/40",
    shadowHover: "hover:shadow-cyan-500/15",
  },
  {
    emoji: "💎",
    title: "Carbon Explorer",
    tagline: "From allotropes to organic chemistry",
    to: "/carbon",
    animationType: "hexagon" as const,
    glowColor: "rgba(148,163,184,0.15)",
    borderHover: "hover:border-slate-300/40",
    shadowHover: "hover:shadow-slate-400/15",
  },
  {
    emoji: "🎓",
    title: "Practice Mode",
    tagline: "300+ questions with instant feedback",
    to: "/practice",
    animationType: "progress" as const,
    glowColor: "rgba(251,113,133,0.15)",
    borderHover: "hover:border-rose-400/40",
    shadowHover: "hover:shadow-rose-500/15",
  },
] as const;

// ── Spotlight animation previews ──────────────────────────────────────────────
const SpotlightPreview = memo(function SpotlightPreview({
  type,
}: {
  type: (typeof SPOTLIGHT_TOOLS)[number]["animationType"];
}) {
  if (type === "bubbles") {
    return (
      <div className="flex items-end justify-center gap-3 h-16">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-lime-400/70"
            style={{
              animation: `spotlight-bubble 1.4s ease-in-out ${i * 0.22}s infinite`,
            }}
          />
        ))}
        <div
          className="w-8 h-14 rounded-t-full rounded-b-sm border border-lime-400/40 flex items-end justify-center pb-1"
          style={{ background: "rgba(163,230,53,0.08)" }}
        />
      </div>
    );
  }
  if (type === "equation") {
    return (
      <div
        className="h-16 flex items-center justify-center font-mono text-sm text-emerald-300/90 font-semibold"
        style={{ animation: "spotlight-fade-cycle 3s ease-in-out infinite" }}
      >
        H₂ + O₂ → H₂O
      </div>
    );
  }
  if (type === "atoms") {
    return (
      <div
        className="h-16 flex items-center justify-center"
        style={{ animation: "spotlight-spin 6s linear infinite" }}
      >
        <svg width="64" height="52" viewBox="0 0 64 52" aria-hidden="true">
          <line
            x1="32"
            y1="8"
            x2="8"
            y2="44"
            stroke="rgba(34,211,238,0.5)"
            strokeWidth="1.5"
          />
          <line
            x1="32"
            y1="8"
            x2="56"
            y2="44"
            stroke="rgba(34,211,238,0.5)"
            strokeWidth="1.5"
          />
          <line
            x1="8"
            y1="44"
            x2="56"
            y2="44"
            stroke="rgba(34,211,238,0.5)"
            strokeWidth="1.5"
          />
          <circle cx="32" cy="8" r="6" fill="rgba(34,211,238,0.7)" />
          <circle cx="8" cy="44" r="6" fill="rgba(167,243,208,0.7)" />
          <circle cx="56" cy="44" r="6" fill="rgba(251,191,36,0.7)" />
        </svg>
      </div>
    );
  }
  if (type === "hexagon") {
    return (
      <div
        className="h-16 flex items-center justify-center"
        style={{ animation: "spotlight-spin 8s linear infinite" }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
          <polygon
            points="26,4 46,15 46,37 26,48 6,37 6,15"
            fill="none"
            stroke="rgba(148,163,184,0.7)"
            strokeWidth="1.5"
          />
          <circle cx="26" cy="26" r="4" fill="rgba(148,163,184,0.5)" />
        </svg>
      </div>
    );
  }
  // progress
  return (
    <div className="h-16 flex flex-col justify-center gap-2 w-full px-2">
      <div className="flex items-center justify-between text-xs text-rose-300/70">
        <span>Progress</span>
        <span>80%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-400/80 to-pink-400/80"
          style={{ animation: "spotlight-progress 2.5s ease-out infinite" }}
        />
      </div>
    </div>
  );
});

// ── Spotlight card ────────────────────────────────────────────────────────────
const SpotlightCard = memo(function SpotlightCard({
  tool,
  index,
}: {
  tool: (typeof SPOTLIGHT_TOOLS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={tool.to}
        className={[
          "group relative flex flex-col gap-3 rounded-2xl p-5 h-full",
          "backdrop-blur-xl bg-white/5 border border-white/10",
          tool.borderHover,
          "shadow-lg",
          tool.shadowHover,
          "transition-all duration-300",
        ].join(" ")}
        style={{
          background: `linear-gradient(135deg, ${tool.glowColor} 0%, rgba(255,255,255,0.02) 100%)`,
        }}
        data-ocid={`home.spotlight_card.${index + 1}`}
      >
        {/* Subtle inner glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `inset 0 0 20px ${tool.glowColor}` }}
        />
        {/* Animation preview */}
        <div className="relative z-10 w-full">
          <SpotlightPreview type={tool.animationType} />
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={tool.title}>
              {tool.emoji}
            </span>
            <span className="font-display font-bold text-base text-foreground">
              {tool.title}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {tool.tagline}
          </p>
        </div>
        {/* Try Now button */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300 border border-blue-400/40 group-hover:bg-blue-500/20 transition-colors duration-200">
            Try Now
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
});

// ── Feature card icon animation class by label ────────────────────────────────
function getIconAnimClass(label: string): string {
  if (label === "Virtual Lab") return "icon-bubble-float";
  if (label === "Molecule Builder" || label === "Molecules")
    return "icon-slow-rotate";
  if (label === "Carbon Lab") return "icon-carbon-glow";
  if (label === "Practice Mode" || label === "Exam Mode")
    return "icon-practice-pulse";
  if (label === "Reaction Lab") return "icon-reaction-shimmer";
  return "icon-glow-pulse";
}

// ── Feature card with 3D tilt + float animation ───────────────────────────────
const FeatureCard = memo(function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof ALL_FEATURES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const card = innerRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * -8, y: dx * 8 });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const iconAnimClass = getIconAnimClass(feature.label);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        ref={innerRef}
        to={feature.to}
        className={[
          "group relative flex flex-col items-start gap-3 rounded-2xl p-6 min-h-[130px]",
          "feature-card-glass",
          "bg-gradient-to-br",
          feature.gradient,
        ].join(" ")}
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.4s cubic-bezier(0,0,0.2,1)",
          animationDelay: `${(index % 4) * 0.4}s`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        data-ocid={`home.feature_card.${index + 1}`}
      >
        {/* Gradient inner reflection */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow:
              "inset 0 0 18px rgba(255,255,255,0.06), 0 0 20px rgba(99,153,237,0.12)",
          }}
        />
        <div className="flex items-center gap-3 w-full relative z-10">
          <div className="p-2 rounded-xl bg-foreground/5 border border-white/10 group-hover:border-white/25 transition-colors duration-300 shrink-0">
            <feature.icon
              className={[
                `w-5 h-5 ${feature.iconColor}`,
                inView ? iconAnimClass : "icon-anim-paused",
              ].join(" ")}
            />
          </div>
          <span className="font-display font-semibold text-sm text-foreground min-w-0 truncate">
            {feature.label}
          </span>
          <span
            className="ml-auto shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold
              bg-white/8 border border-white/15 text-white/70
              opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-300"
          >
            Try
            <ArrowRight
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
              aria-hidden="true"
            />
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
          {feature.desc}
        </p>
      </Link>
    </motion.div>
  );
});

// ── Daily featured element card ───────────────────────────────────────────────
const DailyElementCard = memo(function DailyElementCard({
  el,
  onClick,
}: {
  el: Element;
  onClick: () => void;
}) {
  const fact = ELEMENT_FACTS[el.symbol] ?? `Atomic number ${el.atomicNumber}.`;
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.93 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={[
        "group relative rounded-3xl p-8 text-left overflow-hidden w-full",
        "bg-gradient-to-br",
        CATEGORY_GRADIENT[el.category],
        "shadow-2xl hover:shadow-[0_32px_64px_rgba(0,0,0,0.5)] transition-shadow duration-500",
      ].join(" ")}
      data-ocid="home.daily_element_card"
      aria-label={`Featured element: ${el.name}. Click to learn more.`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-400 rounded-3xl pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/25 transition-all duration-400 pointer-events-none" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="shrink-0">
          <div className="text-xs text-foreground/60 font-mono mb-1">
            #{el.atomicNumber} · {el.category.replace(/-/g, " ")}
          </div>
          <div className="text-7xl sm:text-8xl font-display font-bold text-foreground leading-none drop-shadow-lg">
            {el.symbol}
          </div>
          <div className="text-xl font-semibold text-foreground/90 mt-1">
            {el.name}
          </div>
          <div
            className={`text-sm mt-1 font-mono font-medium ${CATEGORY_TEXT[el.category]}`}
          >
            {el.atomicMass?.toFixed ? `A = ${el.atomicMass.toFixed(3)}` : ""}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
            {fact}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 group-hover:gap-3 transition-all duration-300">
            Explore element
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.button>
  );
});

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = memo(function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="glass-card rounded-2xl p-6 text-center flex flex-col items-center gap-1"
      data-ocid={`home.stat_card.${index + 1}`}
    >
      <div className="text-3xl font-display font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
        {stat.value}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
});

// ── Page ──────────────────────────────────────────────────────────────────────
export function HomePage() {
  const navigate = useNavigate();
  useChemStore((s) => s.startTour);
  const openExplore = useExploreStore((s) => s.openPopup);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const dailyElement = useMemo(
    () => ELEMENTS.find((e) => e.symbol === DAILY_SYMBOL) ?? ELEMENTS[79],
    [],
  );

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
    <div className="min-h-screen">
      {/* ── Local keyframes ────────────────────────────────────────────── */}
      <style>{`
        @keyframes spotlight-bubble {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-18px); opacity: 1; }
        }
        @keyframes spotlight-fade-cycle {
          0%, 100% { opacity: 0.4; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes spotlight-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spotlight-progress {
          0% { width: 0%; }
          60% { width: 80%; }
          80% { width: 80%; }
          100% { width: 0%; }
        }
        @keyframes hero-glow-ring {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.06); opacity: 0.55; }
        }
        @keyframes cinematic-orb {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-16px) scale(1.04); opacity: 0.28; }
        }
        @keyframes feature-card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[88vh] px-4 text-center overflow-hidden">
        {/* Cinematic deep blue/purple gradient orbs */}
        <div
          aria-hidden="true"
          className="absolute top-[-10%] left-[-5%] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.52 0.22 258) 0%, transparent 68%)",
            filter: "blur(90px)",
            opacity: 0.22,
            animation: "cinematic-orb 7s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.48 0.28 295) 0%, transparent 68%)",
            filter: "blur(90px)",
            opacity: 0.18,
            animation: "cinematic-orb 9s ease-in-out 1.5s infinite",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-[38%] right-[18%] w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.2 200) 0%, transparent 70%)",
            filter: "blur(60px)",
            opacity: 0.12,
          }}
        />
        {/* Shimmer sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              background:
                "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)",
              animation: "shimmer-sweep-anim 8s ease-in-out infinite",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl w-full"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-sm text-muted-foreground mb-8"
          >
            <Atom className="w-4 h-4 text-accent" />
            <span>
              All 118 elements · Interactive &amp; Animated · Class 11 &amp; 12
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 pl-2 ml-1 border-l border-white/20 text-xs text-muted-foreground/60">
              <Keyboard className="w-3 h-3" />
              Press{" "}
              <kbd className="mx-0.5 px-1 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] font-mono">
                &#47;
              </kbd>{" "}
              to search
            </span>
          </motion.div>

          {/* Glowing pulsing ring + headline */}
          <div className="relative inline-block w-full">
            {/* Pulsing glow ring behind the title */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 40% at 50% 50%, oklch(0.55 0.22 270 / 0.38) 0%, transparent 70%)",
                animation: "hero-glow-ring 4s ease-in-out infinite",
              }}
            />

            {/* Hero headline — Welcome to ChemisteryX */}
            <motion.h1
              className="font-display text-5xl md:text-7xl font-bold leading-tight mb-5 relative"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                filter: "drop-shadow(0 0 28px oklch(0.6 0.22 270 / 0.5))",
              }}
            >
              <span className="bg-gradient-to-br from-blue-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Welcome to ChemisteryX
              </span>
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl font-medium text-foreground/85 max-w-2xl mx-auto mb-3 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55, ease: "easeOut" }}
          >
            Your immersive chemistry experience
          </motion.p>
          <motion.p
            className="text-base text-muted-foreground/70 max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55, ease: "easeOut" }}
          >
            Explore every element, balance equations, run virtual experiments,
            and master concepts with rich educational content — all in a
            stunning glass interface.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ to: "/periodic-table" })}
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
              data-ocid="hero.periodic_table_button"
            >
              Explore Periodic Table
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ to: "/practice" })}
              className="inline-flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-semibold text-base hover:bg-card/60 transition-all duration-300"
              data-ocid="hero.practice_button"
            >
              <Brain className="w-5 h-5 text-accent" />
              Start Practice
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={openExplore}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300"
              data-ocid="hero.start_exploring_button"
            >
              <Compass className="w-5 h-5" />
              Explore Now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Feature Spotlight ───────────────────────────────────────────────── */}
      <section className="py-20 px-4" data-ocid="home.spotlight_section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm text-muted-foreground mb-5">
              <span aria-hidden="true">✨</span>
              Top Features
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Everything to Master Chemistry
              </span>
            </h2>
            <div className="mx-auto w-20 h-0.5 rounded-full bg-gradient-to-r from-blue-400/60 to-cyan-400/60 mb-4" />
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Start with our most powerful tools — pick one and dive in
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SPOTLIGHT_TOOLS.map((tool, i) => (
              <SpotlightCard key={tool.to} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <section
        className="py-10 px-4 bg-muted/20"
        data-ocid="home.stats_section"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* ── Feature grid ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4" data-ocid="home.features_section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Explore Everything
            </h2>
            <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-primary to-accent mb-4" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              15 powerful tools to master chemistry — from atomic structure to
              organic reactions
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ALL_FEATURES.map((feature, i) => (
              <FeatureCard key={feature.to} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Element of the Day ────────────────────────────────────── */}
      <section
        className="py-20 px-4 bg-muted/20"
        data-ocid="home.featured_section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Element of the Day
            </h2>
            <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-accent to-primary mb-4" />
            <p className="text-muted-foreground text-base">
              Discover a fascinating element every day
            </p>
          </motion.div>
          <DailyElementCard
            el={dailyElement}
            onClick={() => handleOpen(dailyElement)}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              type="button"
              onClick={() => navigate({ to: "/periodic-table" })}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors duration-200 group"
              data-ocid="home.view_all_button"
            >
              View All 118 Elements
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        className="py-10 px-4 border-t border-border/30 bg-card/20"
        data-ocid="home.footer"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Atom className="w-5 h-5 text-accent" />
            <span className="font-display font-semibold text-foreground">
              ChemisteryX
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Explore Chemistry Like Never Before.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
            <Link
              to="/periodic-table"
              className="hover:text-foreground transition-colors duration-200"
            >
              Periodic Table
            </Link>
            <Link
              to="/practice"
              className="hover:text-foreground transition-colors duration-200"
            >
              Practice
            </Link>
            <Link
              to="/formulas"
              className="hover:text-foreground transition-colors duration-200"
            >
              Formulas
            </Link>
          </div>
        </div>
      </footer>

      {/* ── Element overlay ────────────────────────────────────────────────── */}
      <ElementOverlay
        element={selectedElement}
        isOpen={overlayOpen}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
