import { cn } from "@/lib/utils";
import {
  ACHIEVEMENTS_CATALOG,
  useChemStore,
  xpToLevel,
} from "@/store/useChemStore";
import type { Achievement } from "@/types/chemistry";
import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";

// ── XP progress for current level (0-100) ─────────────────────────────────────
function xpProgress(xp: number): number {
  return xp % 100;
}

// ── Level badge ────────────────────────────────────────────────────────────────
const LEVEL_LABELS: Record<number, string> = {
  1: "Novice",
  2: "Learner",
  3: "Student",
  4: "Scholar",
  5: "Chemist",
  6: "Expert",
  7: "Master",
  8: "Elite",
  9: "Genius",
  10: "Legend",
};

function getLevelLabel(level: number): string {
  return LEVEL_LABELS[Math.min(level, 10)] ?? "Legend";
}

function getLevelColor(level: number): string {
  if (level < 3) return "from-slate-400 to-slate-500";
  if (level < 5) return "from-emerald-400 to-teal-500";
  if (level < 7) return "from-blue-400 to-cyan-500";
  if (level < 9) return "from-violet-400 to-purple-500";
  return "from-amber-400 to-orange-500";
}

// ── Achievement item ───────────────────────────────────────────────────────────
const AchievementItem = memo(function AchievementItem({
  achievement,
}: {
  achievement: Achievement;
}) {
  const isUnlocked = !!achievement.unlockedAt;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
        isUnlocked
          ? "bg-white/[0.06] border border-white/[0.12]"
          : "bg-white/[0.02] border border-white/[0.05] opacity-50",
      )}
    >
      <span
        className={cn(
          "text-xl leading-none flex-shrink-0 transition-all duration-300",
          !isUnlocked && "grayscale opacity-40",
        )}
      >
        {achievement.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-xs font-semibold truncate",
            isUnlocked ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {achievement.title}
        </div>
        <div className="text-[10px] text-muted-foreground leading-tight truncate">
          {achievement.description}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        {isUnlocked ? (
          <span className="text-[10px] text-emerald-400 font-semibold">
            +{achievement.xpReward} XP
          </span>
        ) : (
          <span className="text-[10px] text-muted-foreground/50">
            {achievement.xpReward} XP
          </span>
        )}
      </div>
    </div>
  );
});

// ── Achievement toast notification ────────────────────────────────────────────
export const AchievementToast = memo(function AchievementToast() {
  const { pendingAchievement, clearPendingAchievement } = useChemStore();

  useEffect(() => {
    if (!pendingAchievement) return;
    const t = setTimeout(clearPendingAchievement, 3000);
    return () => clearTimeout(t);
  }, [pendingAchievement, clearPendingAchievement]);

  return (
    <AnimatePresence>
      {pendingAchievement && (
        <motion.div
          key={pendingAchievement.id}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-28 right-4 z-[200] max-w-[280px] pointer-events-none"
          data-ocid="gamification.achievement_toast"
        >
          <div
            className="rounded-2xl border border-amber-400/30 px-4 py-3 flex items-center gap-3"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,15,25,0.92) 0%, rgba(30,20,10,0.9) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 0 24px rgba(251,191,36,0.2), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <span className="text-2xl leading-none flex-shrink-0">
              {pendingAchievement.icon}
            </span>
            <div className="min-w-0">
              <div className="text-[10px] text-amber-400/80 font-semibold uppercase tracking-wider mb-0.5">
                Achievement Unlocked!
              </div>
              <div className="text-xs font-bold text-foreground truncate">
                {pendingAchievement.title}
              </div>
              <div className="text-[10px] text-amber-300 font-semibold">
                +{pendingAchievement.xpReward} XP
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ── Main GamificationBadge ─────────────────────────────────────────────────────
export const GamificationBadge = memo(function GamificationBadge() {
  const { gamification } = useChemStore();
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { xp, level, achievements } = gamification;

  const progress = xpProgress(xp);
  const levelLabel = getLevelLabel(level);
  const levelColor = getLevelColor(level);
  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;

  // Close on outside click
  useEffect(() => {
    if (!expanded) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [expanded]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Badge trigger */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 transition-all duration-200 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 12px rgba(255,255,255,0.04)",
        }}
        data-ocid="gamification.badge_button"
        aria-label={`Level ${level} — ${xp} XP. Click to see achievements`}
      >
        {/* Level orb */}
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 bg-gradient-to-br",
            levelColor,
          )}
          style={{
            boxShadow: "0 0 10px rgba(100,200,255,0.3)",
          }}
        >
          {level}
        </div>

        {/* XP info */}
        <div className="hidden sm:flex flex-col min-w-[72px]">
          <div className="text-[10px] font-semibold text-foreground leading-none">
            {levelLabel}
          </div>
          <div className="text-[9px] text-muted-foreground mt-0.5">{xp} XP</div>
          {/* XP bar */}
          <div className="mt-1 h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #34d399)",
              }}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.button>

      {/* Expanded achievements panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-[300px] sm:w-[320px] rounded-2xl border border-white/10 z-[150] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(12,12,20,0.96) 0%, rgba(8,16,28,0.96) 100%)",
              backdropFilter: "blur(24px)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
            data-ocid="gamification.achievements_panel"
          >
            {/* Header */}
            <div className="px-4 py-4 border-b border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-bold text-foreground">
                    {levelLabel} · Level {level}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {unlockedCount}/{ACHIEVEMENTS_CATALOG.length} achievements
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      "text-sm font-bold bg-gradient-to-r bg-clip-text text-transparent",
                      levelColor,
                    )}
                  >
                    {xp} XP
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    {100 - progress} to next level
                  </div>
                </div>
              </div>

              {/* XP progress bar */}
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #38bdf8, #34d399)",
                    boxShadow: "0 0 8px rgba(56,189,248,0.4)",
                  }}
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground/60 mt-1">
                <span>Level {level}</span>
                <span>Level {level + 1}</span>
              </div>
            </div>

            {/* Achievements list */}
            <div
              className="overflow-y-auto px-3 py-3 space-y-1.5"
              style={{ maxHeight: "320px" }}
              data-ocid="gamification.achievements_list"
            >
              {achievements.map((achievement) => (
                <AchievementItem
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
