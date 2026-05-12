import { useAnimationLevel } from "@/lib/performance";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Brain, Diamond, FlaskConical, Home, Table2, User } from "lucide-react";
import { motion } from "motion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

const DOCK_ITEMS = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Table2, label: "Table", to: "/periodic-table" },
  { icon: FlaskConical, label: "Reaction", to: "/reaction-lab" },
  { icon: Brain, label: "Practice", to: "/practice" },
  { icon: Diamond, label: "Carbon", to: "/carbon" },
  { icon: User, label: "Profile", to: "/profile" },
];

// First-visit tooltip system — shows once per session on desktop
const TOOLTIP_STORAGE_KEY = "chem-dock-tips-shown";
const TOOLTIP_ITEMS = ["Table", "Reaction", "Practice"];

export const Dock = memo(function Dock() {
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const animLevel = useAnimationLevel();
  const useAnimations = animLevel !== "minimal";
  const [bouncingItem, setBouncingItem] = useState<string | null>(null);
  const [visibleTip, setVisibleTip] = useState<string | null>(null);
  const tipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show first-visit tooltip sequence (desktop only)
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) return;
    const shown = localStorage.getItem(TOOLTIP_STORAGE_KEY);
    if (shown) return;
    let tipIdx = 0;
    const showNext = () => {
      if (tipIdx >= TOOLTIP_ITEMS.length) {
        localStorage.setItem(TOOLTIP_STORAGE_KEY, "true");
        setVisibleTip(null);
        return;
      }
      setVisibleTip(TOOLTIP_ITEMS[tipIdx]);
      tipIdx++;
      tipTimerRef.current = setTimeout(() => {
        setVisibleTip(null);
        tipTimerRef.current = setTimeout(showNext, 600);
      }, 3500);
    };
    const initial = setTimeout(showNext, 1200);
    return () => {
      clearTimeout(initial);
      if (tipTimerRef.current) clearTimeout(tipTimerRef.current);
    };
  }, []);

  const handleItemClick = useCallback((to: string) => {
    setBouncingItem(to);
    setTimeout(() => setBouncingItem(null), 420);
  }, []);

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50 rounded-full"
      style={{
        backdropFilter: "blur(16px) saturate(1.6)",
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.04)",
        x: "-50%",
      }}
      initial={{ opacity: 0, y: 80, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      data-ocid="dock.container"
      aria-label="Main navigation"
    >
      {/* Top reflection line */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
        }}
      />

      <div
        className="flex items-center justify-around px-3 py-2"
        style={{
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0.5rem))",
        }}
      >
        {DOCK_ITEMS.map((item) => {
          const isActive =
            item.to === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.to);

          return (
            <div key={item.to} className="relative">
              {/* First-visit tooltip pill */}
              {visibleTip === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap pointer-events-none z-[100]"
                  aria-hidden="true"
                >
                  <div
                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/90"
                    style={{
                      backdropFilter: "blur(12px)",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    Tap to explore →
                  </div>
                </motion.div>
              )}

              <Link
                to={item.to}
                onClick={() => handleItemClick(item.to)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5",
                  "w-[52px] min-h-[52px] rounded-2xl",
                  "touch-manipulation select-none",
                  "transition-all duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground",
                  bouncingItem === item.to && "dock-bounce",
                )}
                style={
                  isActive
                    ? { transform: "translateY(-3px) scale(1.05)" }
                    : undefined
                }
                data-ocid={`dock.${item.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active bg pill — animated if allowed, static if minimal */}
                {isActive && useAnimations ? (
                  <motion.div
                    layoutId="dock-pill"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      backgroundColor: "oklch(var(--accent) / 0.2)",
                      border: "1px solid oklch(var(--accent) / 0.4)",
                      boxShadow:
                        animLevel === "full"
                          ? "0 0 14px oklch(var(--accent) / 0.55), inset 0 1px 0 oklch(1 0 0 / 0.12)"
                          : "0 0 6px oklch(var(--accent) / 0.3)",
                    }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.45 }}
                  />
                ) : isActive ? (
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      backgroundColor: "oklch(var(--accent) / 0.2)",
                      border: "1px solid oklch(var(--accent) / 0.35)",
                    }}
                  />
                ) : null}

                {/* Icon — hover scale + drop-shadow glow on desktop */}
                <item.icon
                  className={cn(
                    "relative z-10 transition-all duration-200 dock-item-glow",
                    isActive ? "w-[20px] h-[20px]" : "w-[18px] h-[18px]",
                    !isActive &&
                      "hover:scale-110 hover:drop-shadow-[0_0_6px_oklch(var(--accent)/0.7)]",
                  )}
                />
                <span
                  className={cn(
                    "text-[9px] font-medium relative z-10 leading-none text-center w-full px-0.5 truncate",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>

                {/* Active dot indicator */}
                {isActive && useAnimations ? (
                  <motion.div
                    layoutId="dock-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: "oklch(var(--accent) / 0.9)",
                      boxShadow: "0 0 6px oklch(var(--accent) / 0.8)",
                    }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.45 }}
                  />
                ) : isActive ? (
                  <div
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(var(--accent) / 0.9)" }}
                  />
                ) : null}
              </Link>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
});
