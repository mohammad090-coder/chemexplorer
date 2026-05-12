import { useAuth } from "@/hooks/useAuth";
import { PRESET_AVATARS, useProfile } from "@/hooks/useProfile";
import { useAnimationLevel } from "@/lib/performance";
import { useChemStore } from "@/store/useChemStore";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Bookmark,
  Camera,
  Check,
  ChevronDown,
  ChevronUp,
  Edit3,
  Heart,
  LogOut,
  Moon,
  Shield,
  StickyNote,
  Trash2,
  TrendingUp,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ── Dark-mode helpers ────────────────────────────────────────────────────────
function applyDarkMode(on: boolean) {
  if (on) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("chemx-dark-mode", String(on));
}

function getStoredDarkMode(): boolean {
  const v = localStorage.getItem("chemx-dark-mode");
  if (v !== null) return v === "true";
  return true; // default dark
}

// ── useCountUp hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, durationMs = 600, active = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const from = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutCubic
      const ease = 1 - (1 - progress) ** 3;
      setCount(Math.round(from + (target - from) * ease));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, durationMs]);

  return count;
}

// ── useInView hook ───────────────────────────────────────────────────────────
function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

// ── Avatar (with preset support) ─────────────────────────────────────────────
const Avatar = memo(function Avatar({
  avatarUrl,
  presetAvatar,
  displayName,
  onUpload,
}: {
  avatarUrl: string | null;
  presetAvatar: string | null;
  displayName: string;
  onUpload: () => void;
}) {
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const preset = PRESET_AVATARS.find((p) => p.id === presetAvatar);

  return (
    <div className="relative group shrink-0" data-ocid="profile.avatar">
      {/* Pulsing glow ring */}
      <div
        className="absolute -inset-1 rounded-full animate-glow-pulse"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.22 258 / 0.7) 0%, oklch(0.72 0.24 285 / 0.6) 50%, oklch(0.78 0.18 310 / 0.5) 100%)",
          filter: "blur(6px)",
        }}
      />
      {/* Avatar circle */}
      <div
        className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 transition-transform duration-300 group-hover:scale-105"
        style={{
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : preset ? (
          <div
            className="w-full h-full flex items-center justify-center text-4xl transition-all duration-300"
            style={{ background: preset.bg }}
          >
            {preset.emoji}
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-2xl font-bold text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.45 0.18 258) 0%, oklch(0.35 0.16 290) 100%)",
            }}
          >
            {initials || "CX"}
          </div>
        )}
        {/* Upload overlay */}
        <button
          type="button"
          onClick={onUpload}
          aria-label="Upload profile picture"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.55)" }}
          data-ocid="profile.upload_button"
        >
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
});

// ── Preset avatar picker ──────────────────────────────────────────────────────
const PresetAvatarPicker = memo(function PresetAvatarPicker({
  selected,
  onSelect,
  onClose,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
      className="glass-card rounded-3xl p-5"
      data-ocid="profile.avatar_picker"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-foreground">Choose Avatar</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close avatar picker"
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          data-ocid="profile.close_button"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {PRESET_AVATARS.map((p) => (
          <button
            type="button"
            key={p.id}
            onClick={() => onSelect(p.id)}
            aria-label={`Select ${p.id} avatar`}
            className="relative w-full aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              background: p.bg,
              boxShadow:
                selected === p.id
                  ? "0 0 0 2px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.25)"
                  : "0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            {p.emoji}
            {selected === p.id && (
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-black" />
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
});

// ── Inline editable field ─────────────────────────────────────────────────────
function InlineEdit({
  value,
  onSave,
  multiline = false,
  label,
  className = "",
}: {
  value: string;
  onSave: (v: string) => void;
  multiline?: boolean;
  label: string;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onSave(trimmed);
    setEditing(false);
  }, [draft, value, onSave]);

  if (editing) {
    const sharedProps = {
      value: draft,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) commit();
        if (e.key === "Escape") {
          setDraft(value);
          setEditing(false);
        }
      },
      autoFocus: true,
      "aria-label": label,
      className: `bg-transparent border-b border-white/30 focus:border-white/60 outline-none text-foreground w-full resize-none px-1 py-0.5 transition-colors duration-200 ${className}`,
    };
    return multiline ? (
      <textarea rows={3} {...sharedProps} />
    ) : (
      <input type="text" {...sharedProps} />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      className={`text-left group/edit flex items-center gap-1.5 hover:opacity-80 transition-opacity ${className}`}
    >
      <span>{value}</span>
      <Edit3 className="w-3.5 h-3.5 opacity-0 group-hover/edit:opacity-60 transition-opacity shrink-0" />
    </button>
  );
}

// ── Animated stat row (progress bar + count) ──────────────────────────────────
const StatRow = memo(function StatRow({
  label,
  value,
  max,
  color,
  active,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  active: boolean;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const displayCount = useCountUp(value, 600, active);
  const displayPct = useCountUp(pct, 600, active);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground/80">{label}</span>
        <span className="text-sm font-bold text-foreground tabular-nums">
          {displayCount}
          <span className="text-xs text-muted-foreground font-normal ml-1">
            ({displayPct}%)
          </span>
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-none"
          style={{
            width: active ? `${pct}%` : "0%",
            background: color,
            transition: active
              ? "width 0.6s cubic-bezier(0.16,1,0.3,1)"
              : "none",
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
});

// ── Progress section ──────────────────────────────────────────────────────────
const ProgressSection = memo(function ProgressSection({
  recentlyViewed,
  quizHistory,
  delay,
  animate,
}: {
  recentlyViewed: string[];
  quizHistory: { correct: boolean }[];
  delay: number;
  animate: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  const elementsExplored = recentlyViewed.length;
  const reactionsCompleted =
    quizHistory.length > 0 ? Math.floor(quizHistory.length / 5) : 0;
  const correctCount = quizHistory.filter((q) => q.correct).length;
  const accuracyPct =
    quizHistory.length > 0
      ? Math.round((correctCount / quizHistory.length) * 100)
      : 0;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0, 0, 0.2, 1] }}
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
        Progress
      </h2>
      <div
        ref={containerRef}
        className="glass-card rounded-3xl p-6 space-y-5"
        data-ocid="profile.progress_section"
      >
        <StatRow
          label="Elements Explored"
          value={elementsExplored}
          max={118}
          color="oklch(0.68 0.22 258)"
          active={inView}
        />
        <StatRow
          label="Reactions Completed"
          value={reactionsCompleted}
          max={50}
          color="oklch(0.68 0.22 150)"
          active={inView}
        />
        <StatRow
          label="Practice Accuracy"
          value={accuracyPct}
          max={100}
          color="oklch(0.72 0.22 45)"
          active={inView}
        />
      </div>
    </motion.div>
  );
});

// ── Activity section ──────────────────────────────────────────────────────────

const ELEMENT_NAMES: Record<string, string> = {
  H: "Hydrogen",
  He: "Helium",
  Li: "Lithium",
  Be: "Beryllium",
  B: "Boron",
  C: "Carbon",
  N: "Nitrogen",
  O: "Oxygen",
  F: "Fluorine",
  Ne: "Neon",
  Na: "Sodium",
  Mg: "Magnesium",
  Al: "Aluminum",
  Si: "Silicon",
  P: "Phosphorus",
  S: "Sulfur",
  Cl: "Chlorine",
  Ar: "Argon",
  K: "Potassium",
  Ca: "Calcium",
  Fe: "Iron",
  Cu: "Copper",
  Zn: "Zinc",
  Ag: "Silver",
  Au: "Gold",
  Hg: "Mercury",
  Pb: "Lead",
  I: "Iodine",
  Br: "Bromine",
  Mn: "Manganese",
  Cr: "Chromium",
  Co: "Cobalt",
  Ni: "Nickel",
  Ti: "Titanium",
  Pt: "Platinum",
};

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const ActivitySection = memo(function ActivitySection({
  recentlyViewed,
  quizHistory,
  quickNotes,
  delay,
  animate,
}: {
  recentlyViewed: string[];
  quizHistory: { questionId: string; correct: boolean; timestamp: number }[];
  quickNotes: {
    id: string;
    text: string;
    category: string;
    createdAt: number;
  }[];
  delay: number;
  animate: boolean;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const recentElements = recentlyViewed.slice(0, 10);
  const recentQuiz = quizHistory.slice(0, 5);
  const recentNotes = quickNotes.slice(0, 3);

  const hasContent =
    recentElements.length > 0 ||
    recentQuiz.length > 0 ||
    recentNotes.length > 0;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0, 0, 0.2, 1] }}
      data-ocid="profile.activity_section"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 mb-3 px-1 w-full text-left"
        data-ocid="profile.toggle"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex-1">
          Recent Activity
        </h2>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-3xl p-5 overflow-hidden"
          >
            {!hasContent ? (
              <p
                className="text-sm text-muted-foreground text-center py-4"
                data-ocid="profile.empty_state"
              >
                No activity yet — start exploring! ⚡
              </p>
            ) : (
              <div className="space-y-5">
                {/* Recently viewed elements */}
                {recentElements.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Recently Viewed
                    </p>
                    <div className="space-y-1.5">
                      {recentElements.map((sym, i) => (
                        <motion.button
                          key={sym}
                          type="button"
                          initial={animate ? { opacity: 0, x: -8 } : false}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: delay + i * 0.04 }}
                          onClick={() =>
                            navigate({
                              to: "/element/$symbol",
                              params: { symbol: sym },
                            })
                          }
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-left"
                          data-ocid={`profile.item.${i + 1}`}
                        >
                          <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: "oklch(0.38 0.16 258 / 0.8)" }}
                          >
                            {sym}
                          </span>
                          <span className="text-sm text-foreground">
                            {ELEMENT_NAMES[sym] ?? sym}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quiz history */}
                {recentQuiz.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Recent Practice
                    </p>
                    <div className="space-y-1.5">
                      {recentQuiz.map((q, _i) => (
                        <div
                          key={`quiz-${q.questionId}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.02)" }}
                        >
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              background: q.correct
                                ? "oklch(0.65 0.18 150 / 0.3)"
                                : "oklch(0.55 0.2 22 / 0.3)",
                            }}
                          >
                            {q.correct ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <X className="w-3 h-3 text-red-400" />
                            )}
                          </span>
                          <span className="text-sm text-foreground flex-1">
                            Practice question
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {relativeTime(q.timestamp)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick notes */}
                {recentNotes.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                      <StickyNote className="w-3.5 h-3.5" /> Quick Notes
                    </p>
                    <div className="space-y-1.5">
                      {recentNotes.map((note) => (
                        <div
                          key={note.id}
                          className="flex items-start gap-3 px-3 py-2 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.02)" }}
                        >
                          <StickyNote className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-foreground truncate">
                              {note.text}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {relativeTime(note.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// ── Element category → gradient ───────────────────────────────────────────────
const ELEM_GRADIENTS: Record<string, string> = {
  H: "linear-gradient(135deg, oklch(0.5 0.12 200) 0%, oklch(0.42 0.1 215) 100%)",
  He: "linear-gradient(135deg, oklch(0.6 0.18 50) 0%, oklch(0.52 0.15 65) 100%)",
  Li: "linear-gradient(135deg, oklch(0.55 0.2 200) 0%, oklch(0.47 0.17 215) 100%)",
};
function elemGradient(sym: string): string {
  return (
    ELEM_GRADIENTS[sym] ??
    `linear-gradient(135deg, oklch(0.42 0.15 ${(sym.charCodeAt(0) * 47) % 360}) 0%, oklch(0.36 0.12 ${(sym.charCodeAt(0) * 47 + 30) % 360}) 100%)`
  );
}

// ── Favorites section ─────────────────────────────────────────────────────────
const FavoritesSection = memo(function FavoritesSection({
  favorites,
  toggleFavorite,
  delay,
  animate,
}: {
  favorites: string[];
  toggleFavorite: (s: string) => void;
  delay: number;
  animate: boolean;
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0, 0, 0.2, 1] }}
      data-ocid="profile.favorites_section"
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
        Favorites
      </h2>
      <div className="glass-card rounded-3xl p-5">
        {favorites.length === 0 ? (
          <div className="text-center py-6" data-ocid="profile.empty_state">
            <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">
              No favorites yet — explore elements and tap ♥
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {favorites.map((sym, i) => (
              <motion.div
                key={sym}
                initial={animate ? { opacity: 0, scale: 0.8 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + i * 0.04 }}
                className="relative group rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                style={{ background: elemGradient(sym) }}
                onClick={() =>
                  navigate({ to: "/element/$symbol", params: { symbol: sym } })
                }
                data-ocid={`profile.item.${i + 1}`}
              >
                <span className="text-lg font-bold text-white">{sym}</span>
                <span className="text-[10px] text-white/70 truncate px-1">
                  {ELEMENT_NAMES[sym] ?? sym}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(sym);
                  }}
                  aria-label={`Remove ${sym} from favorites`}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  data-ocid={`profile.delete_button.${i + 1}`}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

// ── Bookmarks section ─────────────────────────────────────────────────────────
const BookmarksSection = memo(function BookmarksSection({
  bookmarks,
  removeBookmark,
  delay,
  animate,
}: {
  bookmarks: string[];
  removeBookmark: (id: string) => void;
  delay: number;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0, 0, 0.2, 1] }}
      data-ocid="profile.bookmarks_section"
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
        Bookmarks
      </h2>
      <div className="glass-card rounded-3xl p-5">
        {bookmarks.length === 0 ? (
          <div className="text-center py-6" data-ocid="profile.empty_state">
            <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">
              No bookmarks yet — bookmark pages for quick access
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {bookmarks.map((id, i) => (
              <div
                key={id}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors"
                style={{ background: "rgba(255,255,255,0.02)" }}
                data-ocid={`profile.item.${i + 1}`}
              >
                <Bookmark className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-sm text-foreground flex-1 truncate">
                  {id}
                </span>
                <button
                  type="button"
                  onClick={() => removeBookmark(id)}
                  aria-label="Remove bookmark"
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
                  data-ocid={`profile.delete_button.${i + 1}`}
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

// ── Toggle switch ─────────────────────────────────────────────────────────────
function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="w-10 h-6 rounded-full relative transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
      style={{
        background: checked ? "oklch(0.68 0.22 258)" : "rgba(255,255,255,0.1)",
      }}
      data-ocid="profile.toggle"
    >
      <div
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
        style={{
          transform: checked ? "translateX(18px)" : "translateX(4px)",
        }}
      />
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { isAuthenticated, logout } = useAuth();
  const {
    profile,
    isLoading,
    isSaving,
    saveProfile,
    uploadAvatar,
    selectPresetAvatar,
  } = useProfile();
  const {
    favorites,
    bookmarkedItems,
    recentlyViewed,
    quizHistory,
    quickNotes,
    gamification,
    toggleFavorite,
    removeBookmark,
    clearQuizHistory,
  } = useChemStore();
  const animLevel = useAnimationLevel();
  const shouldAnimate = animLevel !== "minimal";

  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(getStoredDarkMode);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Apply dark mode on mount
  useEffect(() => {
    applyDarkMode(darkMode);
  }, [darkMode]);

  const handleDarkModeToggle = useCallback((v: boolean) => {
    setDarkMode(v);
    applyDarkMode(v);
  }, []);

  const joinDate = profile?.joinDate
    ? new Date(profile.joinDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const handleSave = useCallback(
    async (data: { displayName: string; username: string; bio: string }) => {
      if (!profile) return;
      await saveProfile({
        ...data,
        avatarUrl: profile.avatarUrl,
        presetAvatar: profile.presetAvatar,
      });
      setShowEditPanel(false);
    },
    [profile, saveProfile],
  );

  const handleAvatarUpload = useCallback(() => {
    setShowPresetPicker(false);
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !profile) return;
      const url = await uploadAvatar(file);
      if (url) {
        await saveProfile({ ...profile, avatarUrl: url, presetAvatar: null });
      }
      e.target.value = "";
    },
    [profile, uploadAvatar, saveProfile],
  );

  const handlePresetSelect = useCallback(
    async (id: string) => {
      await selectPresetAvatar(id);
      setShowPresetPicker(false);
    },
    [selectPresetAvatar],
  );

  const handleClearData = useCallback(() => {
    clearQuizHistory();
  }, [clearQuizHistory]);

  const level = gamification.level;
  const xp = gamification.xp;
  const xpLabel = useMemo(() => {
    if (level <= 2) return "Learner";
    if (level <= 5) return "Explorer";
    if (level <= 10) return "Chemist";
    return "Master";
  }, [level]);

  // Stagger delays (skipped on minimal)
  const D = (n: number) => (shouldAnimate ? n * 0.15 : 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 text-center max-w-sm w-full"
          data-ocid="profile.empty_state"
        >
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Sign In Required
          </h2>
          <p className="text-muted-foreground text-sm">
            Connect with Internet Identity to view and manage your profile.
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
          style={{
            borderColor: "oklch(0.68 0.22 258 / 0.5)",
            borderTopColor: "oklch(0.68 0.22 258)",
          }}
          data-ocid="profile.loading_state"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto pb-36 pt-4 px-4 sm:px-6 lg:px-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Upload profile picture file"
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* ── Profile header ───────────────────────────────────────────── */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="glass-card rounded-3xl p-6 sm:p-8"
          data-ocid="profile.card"
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar with double click to open picker */}
            <div className="relative shrink-0">
              <Avatar
                avatarUrl={profile.avatarUrl}
                presetAvatar={profile.presetAvatar ?? null}
                displayName={profile.displayName}
                onUpload={() => setShowPresetPicker((v) => !v)}
              />
              <button
                type="button"
                onClick={() => setShowPresetPicker((v) => !v)}
                aria-label="Change avatar"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
                data-ocid="profile.secondary_button"
              >
                <Upload className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              {/* Display name */}
              <InlineEdit
                value={profile.displayName}
                label="Display name"
                onSave={(v) => saveProfile({ ...profile, displayName: v })}
                className="text-2xl sm:text-3xl font-bold text-foreground"
              />

              {/* Level badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "oklch(0.55 0.22 258 / 0.25)",
                    border: "1px solid oklch(0.68 0.22 258 / 0.4)",
                    color: "oklch(0.78 0.18 258)",
                  }}
                >
                  Level {level} · {xpLabel}
                </span>
                <span className="text-xs text-yellow-400/80 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {xp} XP
                </span>
              </div>

              {/* Username */}
              <InlineEdit
                value={profile.username}
                label="Username"
                onSave={(v) => saveProfile({ ...profile, username: v })}
                className="text-sm text-muted-foreground"
              />

              {/* Bio */}
              <InlineEdit
                value={profile.bio}
                label="Bio"
                multiline
                onSave={(v) => saveProfile({ ...profile, bio: v })}
                className="text-sm text-foreground/80 leading-relaxed"
              />

              {/* Join date */}
              {joinDate && (
                <p className="text-xs text-muted-foreground">
                  Member since {joinDate}
                </p>
              )}

              {/* Edit button */}
              <button
                type="button"
                onClick={() => setShowEditPanel((v) => !v)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                data-ocid="profile.edit_button"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
                {showEditPanel ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Preset avatar picker ─────────────────────────────────────── */}
        <AnimatePresence>
          {showPresetPicker && (
            <PresetAvatarPicker
              selected={profile.presetAvatar ?? null}
              onSelect={handlePresetSelect}
              onClose={() => setShowPresetPicker(false)}
            />
          )}
        </AnimatePresence>

        {/* Upload button inside picker */}
        <AnimatePresence>
          {showPresetPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                onClick={handleAvatarUpload}
                className="w-full py-2.5 rounded-2xl text-sm text-muted-foreground flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                style={{ border: "1px dashed rgba(255,255,255,0.15)" }}
                data-ocid="profile.upload_button"
              >
                <Upload className="w-4 h-4" />
                Upload custom photo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Edit panel ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {showEditPanel && (
            <EditPanel
              profile={profile}
              onSave={handleSave}
              onClose={() => setShowEditPanel(false)}
              isSaving={isSaving}
              onAvatarChange={handleAvatarUpload}
            />
          )}
        </AnimatePresence>

        {/* ── Stats (quick) ────────────────────────────────────────────── */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: D(1), ease: [0, 0, 0.2, 1] }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Overview
          </h2>
          <div className="grid grid-cols-3 gap-3" data-ocid="profile.section">
            <StatOverviewCard
              icon={<TrendingUp className="w-4 h-4 text-white" />}
              value={favorites.length + recentlyViewed.length}
              label="Activity"
              accent="oklch(0.55 0.22 258)"
              ocid="profile.item.1"
            />
            <StatOverviewCard
              icon={<BookOpen className="w-4 h-4 text-white" />}
              value={favorites.length + bookmarkedItems.length}
              label="Saved"
              accent="oklch(0.55 0.18 290)"
              ocid="profile.item.2"
            />
            <StatOverviewCard
              icon={<Zap className="w-4 h-4 text-white" />}
              value={
                gamification.achievements.filter((a) => a.unlockedAt).length
              }
              label="Achievements"
              accent="oklch(0.65 0.2 130)"
              ocid="profile.item.3"
            />
          </div>
        </motion.div>

        {/* ── Progress dashboard ───────────────────────────────────────── */}
        <ProgressSection
          recentlyViewed={recentlyViewed}
          quizHistory={quizHistory}
          delay={D(2)}
          animate={shouldAnimate}
        />

        {/* ── Activity ────────────────────────────────────────────────── */}
        <ActivitySection
          recentlyViewed={recentlyViewed}
          quizHistory={quizHistory}
          quickNotes={quickNotes}
          delay={D(3)}
          animate={shouldAnimate}
        />

        {/* ── Favorites ───────────────────────────────────────────────── */}
        <FavoritesSection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          delay={D(4)}
          animate={shouldAnimate}
        />

        {/* ── Bookmarks ───────────────────────────────────────────────── */}
        <BookmarksSection
          bookmarks={bookmarkedItems}
          removeBookmark={removeBookmark}
          delay={D(5)}
          animate={shouldAnimate}
        />

        {/* ── Settings ────────────────────────────────────────────────── */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: D(6), ease: [0, 0, 0.2, 1] }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Settings
          </h2>
          <div
            className="glass-card rounded-3xl divide-y divide-white/[0.06] overflow-hidden"
            data-ocid="profile.panel"
          >
            {/* Dark mode */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <Moon className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dark Mode
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {darkMode ? "Currently dark" : "Currently light"}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                label="Dark Mode toggle"
              />
            </div>

            {/* Privacy */}
            <button
              type="button"
              className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/5 transition-colors text-left"
              data-ocid="profile.secondary_button"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <Shield className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Privacy Settings
                </p>
                <p className="text-xs text-muted-foreground">
                  Manage your data
                </p>
              </div>
            </button>

            {/* Danger zone */}
            <div className="px-6 py-5 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Danger Zone
              </p>
              <button
                type="button"
                onClick={handleClearData}
                className="w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.48 0.18 22) 0%, oklch(0.42 0.2 35) 100%)",
                  boxShadow: "0 4px 16px oklch(0.48 0.18 22 / 0.3)",
                }}
                data-ocid="profile.delete_button"
              >
                <Trash2 className="w-4 h-4" />
                Clear Progress Data
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.22 22) 0%, oklch(0.45 0.24 28) 100%)",
                  boxShadow: "0 4px 20px oklch(0.52 0.22 22 / 0.35)",
                }}
                data-ocid="profile.confirm_button"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── StatOverviewCard (small) ──────────────────────────────────────────────────
const StatOverviewCard = memo(function StatOverviewCard({
  icon,
  value,
  label,
  accent,
  ocid,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  accent: string;
  ocid: string;
}) {
  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2"
      style={{ background: "rgba(255,255,255,0.04)" }}
      data-ocid={ocid}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: accent, boxShadow: `0 0 14px ${accent}55` }}
      >
        {icon}
      </div>
      <span className="text-2xl font-bold text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </div>
  );
});

// ── Edit Panel ─────────────────────────────────────────────────────────────────
function EditPanel({
  profile,
  onSave,
  onClose,
  isSaving,
  onAvatarChange,
}: {
  profile: { displayName: string; username: string; bio: string };
  onSave: (data: {
    displayName: string;
    username: string;
    bio: string;
  }) => void;
  onClose: () => void;
  isSaving: boolean;
  onAvatarChange: () => void;
}) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="glass-card rounded-3xl p-6 space-y-5"
      data-ocid="profile.edit_panel"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          Edit Profile
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close edit panel"
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          data-ocid="profile.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs text-muted-foreground mb-2 block">
            Profile Picture
          </span>
          <button
            type="button"
            onClick={onAvatarChange}
            className="w-full rounded-2xl border-2 border-dashed border-white/20 p-5 flex flex-col items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            data-ocid="profile.dropzone"
          >
            <Upload className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Upload custom photo
            </span>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label
              className="text-xs text-muted-foreground mb-1 block"
              htmlFor="edit-display-name"
            >
              Full Name
            </label>
            <input
              id="edit-display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              placeholder="Your display name"
              data-ocid="profile.input"
            />
          </div>
          <div>
            <label
              className="text-xs text-muted-foreground mb-1 block"
              htmlFor="edit-username"
            >
              Username
            </label>
            <input
              id="edit-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              placeholder="@username"
            />
          </div>
          <div>
            <label
              className="text-xs text-muted-foreground mb-1 block"
              htmlFor="edit-bio"
            >
              Bio
            </label>
            <textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full rounded-xl px-4 py-2.5 text-sm text-foreground outline-none resize-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              placeholder="Tell the world about yourself..."
              data-ocid="profile.textarea"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={isSaving}
        onClick={() => onSave({ displayName, username, bio })}
        className="w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.22 258) 0%, oklch(0.45 0.2 290) 100%)",
          boxShadow: "0 4px 20px oklch(0.55 0.22 258 / 0.35)",
        }}
        data-ocid="profile.save_button"
      >
        {isSaving ? (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}
        {isSaving ? "Saving…" : "Save Changes"}
      </button>
    </motion.div>
  );
}
