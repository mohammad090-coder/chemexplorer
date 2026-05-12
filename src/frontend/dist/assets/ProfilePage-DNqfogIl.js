import { c as createLucideIcon, n as useAuth, r as reactExports, a as useChemStore, y as useAnimationLevel, j as jsxRuntimeExports, m as motion, Z as Zap, g as ChevronDown, l as AnimatePresence, d as BookOpen, p as Trash2, bP as LogOut, X, bN as Check, u as useNavigate } from "./index-DyyHqAHL.js";
import { C as ChevronUp } from "./chevron-up-B48SwRlR.js";
import { T as TrendingUp } from "./trending-up-SgpPowcz.js";
import { H as Heart } from "./heart-CGvPZOYr.js";
import { B as Bookmark } from "./bookmark-DtvmtHn5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
];
const StickyNote = createLucideIcon("sticky-note", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const PRESET_AVATARS = [
  {
    id: "atom",
    emoji: "⚛️",
    bg: "linear-gradient(135deg, oklch(0.45 0.18 258) 0%, oklch(0.38 0.16 280) 100%)"
  },
  {
    id: "flask",
    emoji: "🧪",
    bg: "linear-gradient(135deg, oklch(0.42 0.18 150) 0%, oklch(0.36 0.16 165) 100%)"
  },
  {
    id: "microscope",
    emoji: "🔬",
    bg: "linear-gradient(135deg, oklch(0.44 0.17 210) 0%, oklch(0.38 0.14 225) 100%)"
  },
  {
    id: "dna",
    emoji: "🧬",
    bg: "linear-gradient(135deg, oklch(0.44 0.2 290) 0%, oklch(0.37 0.18 305) 100%)"
  },
  {
    id: "diamond",
    emoji: "💎",
    bg: "linear-gradient(135deg, oklch(0.48 0.15 200) 0%, oklch(0.4 0.13 215) 100%)"
  },
  {
    id: "alembic",
    emoji: "⚗️",
    bg: "linear-gradient(135deg, oklch(0.46 0.19 40) 0%, oklch(0.4 0.17 55) 100%)"
  },
  {
    id: "thermometer",
    emoji: "🌡️",
    bg: "linear-gradient(135deg, oklch(0.5 0.22 22) 0%, oklch(0.43 0.2 35) 100%)"
  },
  {
    id: "magnet",
    emoji: "🧲",
    bg: "linear-gradient(135deg, oklch(0.44 0.18 340) 0%, oklch(0.38 0.16 355) 100%)"
  }
];
function useProfile() {
  const { isAuthenticated, principal } = useAuth();
  const [profile, setProfile] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const loadProfile = reactExports.useCallback(() => {
    if (!isAuthenticated || !principal) return;
    setIsLoading(true);
    try {
      const stored = localStorage.getItem(`chemx-profile-${principal}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      } else {
        const defaultProfile = {
          userId: principal,
          username: `${principal.slice(0, 8)}...`,
          displayName: "ChemisteryX User",
          bio: "Passionate about exploring the world of chemistry.",
          joinDate: Date.now(),
          avatarUrl: null,
          presetAvatar: "atom"
        };
        setProfile(defaultProfile);
      }
      const storedStats = localStorage.getItem(`chemx-stats-${principal}`);
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      } else {
        setStats({ activityCount: 0, savedItemsCount: 0, progressScore: 0 });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, principal]);
  reactExports.useEffect(() => {
    loadProfile();
  }, [loadProfile]);
  const saveProfile = reactExports.useCallback(
    async (input) => {
      if (!isAuthenticated || !principal) return;
      setIsSaving(true);
      try {
        const updated = {
          userId: principal,
          username: input.username,
          displayName: input.displayName,
          bio: input.bio,
          joinDate: (profile == null ? void 0 : profile.joinDate) ?? Date.now(),
          avatarUrl: input.avatarUrl,
          presetAvatar: input.presetAvatar ?? null
        };
        localStorage.setItem(
          `chemx-profile-${principal}`,
          JSON.stringify(updated)
        );
        setProfile(updated);
      } finally {
        setIsSaving(false);
      }
    },
    [isAuthenticated, principal, profile == null ? void 0 : profile.joinDate]
  );
  const uploadAvatar = reactExports.useCallback(
    async (file) => {
      setIsUploading(true);
      try {
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } finally {
        setIsUploading(false);
      }
    },
    []
  );
  const selectPresetAvatar = reactExports.useCallback(
    async (presetId) => {
      if (!profile) return;
      await saveProfile({
        ...profile,
        avatarUrl: null,
        presetAvatar: presetId
      });
    },
    [profile, saveProfile]
  );
  return {
    profile,
    stats,
    isLoading,
    isSaving,
    isUploading,
    saveProfile,
    uploadAvatar,
    selectPresetAvatar
  };
}
function applyDarkMode(on) {
  if (on) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("chemx-dark-mode", String(on));
}
function getStoredDarkMode() {
  const v = localStorage.getItem("chemx-dark-mode");
  if (v !== null) return v === "true";
  return true;
}
function useCountUp(target, durationMs = 600, active = false) {
  const [count, setCount] = reactExports.useState(0);
  const rafRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
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
function useInView(ref) {
  const [inView, setInView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}
const Avatar = reactExports.memo(function Avatar2({
  avatarUrl,
  presetAvatar,
  displayName,
  onUpload
}) {
  const initials = displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const preset = PRESET_AVATARS.find((p) => p.id === presetAvatar);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group shrink-0", "data-ocid": "profile.avatar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute -inset-1 rounded-full animate-glow-pulse",
        style: {
          background: "linear-gradient(135deg, oklch(0.68 0.22 258 / 0.7) 0%, oklch(0.72 0.24 285 / 0.6) 50%, oklch(0.78 0.18 310 / 0.5) 100%)",
          filter: "blur(6px)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 transition-transform duration-300 group-hover:scale-105",
        style: {
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)"
        },
        children: [
          avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: avatarUrl,
              alt: displayName,
              className: "w-full h-full object-cover",
              loading: "lazy"
            }
          ) : preset ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full flex items-center justify-center text-4xl transition-all duration-300",
              style: { background: preset.bg },
              children: preset.emoji
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full flex items-center justify-center text-2xl font-bold text-white",
              style: {
                background: "linear-gradient(135deg, oklch(0.45 0.18 258) 0%, oklch(0.35 0.16 290) 100%)"
              },
              children: initials || "CX"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onUpload,
              "aria-label": "Upload profile picture",
              className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              style: { background: "rgba(0,0,0,0.55)" },
              "data-ocid": "profile.upload_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-white" })
            }
          )
        ]
      }
    )
  ] });
});
const PresetAvatarPicker = reactExports.memo(function PresetAvatarPicker2({
  selected,
  onSelect,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -12, scale: 0.96 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -12, scale: 0.96 },
      transition: { duration: 0.25, ease: [0, 0, 0.2, 1] },
      className: "glass-card rounded-3xl p-5",
      "data-ocid": "profile.avatar_picker",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Choose Avatar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close avatar picker",
              className: "w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors",
              "data-ocid": "profile.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: PRESET_AVATARS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelect(p.id),
            "aria-label": `Select ${p.id} avatar`,
            className: "relative w-full aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95",
            style: {
              background: p.bg,
              boxShadow: selected === p.id ? "0 0 0 2px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.25)" : "0 0 0 1px rgba(255,255,255,0.1)"
            },
            children: [
              p.emoji,
              selected === p.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-2.5 h-2.5 text-black" }) })
            ]
          },
          p.id
        )) })
      ]
    }
  );
});
function InlineEdit({
  value,
  onSave,
  multiline = false,
  label,
  className = ""
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(value);
  const commit = reactExports.useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onSave(trimmed);
    setEditing(false);
  }, [draft, value, onSave]);
  if (editing) {
    const sharedProps = {
      value: draft,
      onChange: (e) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e) => {
        if (e.key === "Enter" && !multiline) commit();
        if (e.key === "Escape") {
          setDraft(value);
          setEditing(false);
        }
      },
      autoFocus: true,
      "aria-label": label,
      className: `bg-transparent border-b border-white/30 focus:border-white/60 outline-none text-foreground w-full resize-none px-1 py-0.5 transition-colors duration-200 ${className}`
    };
    return multiline ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, ...sharedProps }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", ...sharedProps });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => {
        setDraft(value);
        setEditing(true);
      },
      className: `text-left group/edit flex items-center gap-1.5 hover:opacity-80 transition-opacity ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5 opacity-0 group-hover/edit:opacity-60 transition-opacity shrink-0" })
      ]
    }
  );
}
const StatRow = reactExports.memo(function StatRow2({
  label,
  value,
  max,
  color,
  active
}) {
  const pct = max > 0 ? Math.round(value / max * 100) : 0;
  const displayCount = useCountUp(value, 600, active);
  const displayPct = useCountUp(pct, 600, active);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/80", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground tabular-nums", children: [
        displayCount,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: [
          "(",
          displayPct,
          "%)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-2 rounded-full overflow-hidden",
        style: { background: "rgba(255,255,255,0.08)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full transition-none",
            style: {
              width: active ? `${pct}%` : "0%",
              background: color,
              transition: active ? "width 0.6s cubic-bezier(0.16,1,0.3,1)" : "none",
              boxShadow: `0 0 8px ${color}66`
            }
          }
        )
      }
    )
  ] });
});
const ProgressSection = reactExports.memo(function ProgressSection2({
  recentlyViewed,
  quizHistory,
  delay,
  animate
}) {
  const containerRef = reactExports.useRef(null);
  const inView = useInView(containerRef);
  const elementsExplored = recentlyViewed.length;
  const reactionsCompleted = quizHistory.length > 0 ? Math.floor(quizHistory.length / 5) : 0;
  const correctCount = quizHistory.filter((q) => q.correct).length;
  const accuracyPct = quizHistory.length > 0 ? Math.round(correctCount / quizHistory.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: animate ? { opacity: 0, y: 20 } : false,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: [0, 0, 0.2, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1", children: "Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: containerRef,
            className: "glass-card rounded-3xl p-6 space-y-5",
            "data-ocid": "profile.progress_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Elements Explored",
                  value: elementsExplored,
                  max: 118,
                  color: "oklch(0.68 0.22 258)",
                  active: inView
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Reactions Completed",
                  value: reactionsCompleted,
                  max: 50,
                  color: "oklch(0.68 0.22 150)",
                  active: inView
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Practice Accuracy",
                  value: accuracyPct,
                  max: 100,
                  color: "oklch(0.72 0.22 45)",
                  active: inView
                }
              )
            ]
          }
        )
      ]
    }
  );
});
const ELEMENT_NAMES = {
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
  Pt: "Platinum"
};
function relativeTime(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
const ActivitySection = reactExports.memo(function ActivitySection2({
  recentlyViewed,
  quizHistory,
  quickNotes,
  delay,
  animate
}) {
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(true);
  const recentElements = recentlyViewed.slice(0, 10);
  const recentQuiz = quizHistory.slice(0, 5);
  const recentNotes = quickNotes.slice(0, 3);
  const hasContent = recentElements.length > 0 || recentQuiz.length > 0 || recentNotes.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: animate ? { opacity: 0, y: 20 } : false,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: [0, 0, 0.2, 1] },
      "data-ocid": "profile.activity_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "flex items-center gap-2 mb-3 px-1 w-full text-left",
            "data-ocid": "profile.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest flex-1", children: "Recent Activity" }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.3 },
            className: "glass-card rounded-3xl p-5 overflow-hidden",
            children: !hasContent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-muted-foreground text-center py-4",
                "data-ocid": "profile.empty_state",
                children: "No activity yet — start exploring! ⚡"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              recentElements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
                  " Recently Viewed"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: recentElements.map((sym, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    initial: animate ? { opacity: 0, x: -8 } : false,
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: delay + i * 0.04 },
                    onClick: () => navigate({
                      to: "/element/$symbol",
                      params: { symbol: sym }
                    }),
                    className: "w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-left",
                    "data-ocid": `profile.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0",
                          style: { background: "oklch(0.38 0.16 258 / 0.8)" },
                          children: sym
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: ELEMENT_NAMES[sym] ?? sym })
                    ]
                  },
                  sym
                )) })
              ] }),
              recentQuiz.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                  " Recent Practice"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: recentQuiz.map((q, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 px-3 py-2 rounded-xl",
                    style: { background: "rgba(255,255,255,0.02)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                          style: {
                            background: q.correct ? "oklch(0.65 0.18 150 / 0.3)" : "oklch(0.55 0.2 22 / 0.3)"
                          },
                          children: q.correct ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-green-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-red-400" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1", children: "Practice question" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: relativeTime(q.timestamp) })
                    ]
                  },
                  `quiz-${q.questionId}`
                )) })
              ] }),
              recentNotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-3.5 h-3.5" }),
                  " Quick Notes"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: recentNotes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-3 px-3 py-2 rounded-xl",
                    style: { background: "rgba(255,255,255,0.02)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-4 h-4 text-yellow-400 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: note.text }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: relativeTime(note.createdAt) })
                      ] })
                    ]
                  },
                  note.id
                )) })
              ] })
            ] })
          }
        ) })
      ]
    }
  );
});
const ELEM_GRADIENTS = {
  H: "linear-gradient(135deg, oklch(0.5 0.12 200) 0%, oklch(0.42 0.1 215) 100%)",
  He: "linear-gradient(135deg, oklch(0.6 0.18 50) 0%, oklch(0.52 0.15 65) 100%)",
  Li: "linear-gradient(135deg, oklch(0.55 0.2 200) 0%, oklch(0.47 0.17 215) 100%)"
};
function elemGradient(sym) {
  return ELEM_GRADIENTS[sym] ?? `linear-gradient(135deg, oklch(0.42 0.15 ${sym.charCodeAt(0) * 47 % 360}) 0%, oklch(0.36 0.12 ${(sym.charCodeAt(0) * 47 + 30) % 360}) 100%)`;
}
const FavoritesSection = reactExports.memo(function FavoritesSection2({
  favorites,
  toggleFavorite,
  delay,
  animate
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: animate ? { opacity: 0, y: 20 } : false,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: [0, 0, 0.2, 1] },
      "data-ocid": "profile.favorites_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1", children: "Favorites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-3xl p-5", children: favorites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", "data-ocid": "profile.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No favorites yet — explore elements and tap ♥" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2.5", children: favorites.map((sym, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: animate ? { opacity: 0, scale: 0.8 } : false,
            animate: { opacity: 1, scale: 1 },
            transition: { delay: delay + i * 0.04 },
            className: "relative group rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95",
            style: { background: elemGradient(sym) },
            onClick: () => navigate({ to: "/element/$symbol", params: { symbol: sym } }),
            "data-ocid": `profile.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-white", children: sym }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/70 truncate px-1", children: ELEMENT_NAMES[sym] ?? sym }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleFavorite(sym);
                  },
                  "aria-label": `Remove ${sym} from favorites`,
                  className: "absolute top-1 right-1 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                  "data-ocid": `profile.delete_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-white" })
                }
              )
            ]
          },
          sym
        )) }) })
      ]
    }
  );
});
const BookmarksSection = reactExports.memo(function BookmarksSection2({
  bookmarks,
  removeBookmark,
  delay,
  animate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: animate ? { opacity: 0, y: 20 } : false,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: [0, 0, 0.2, 1] },
      "data-ocid": "profile.bookmarks_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1", children: "Bookmarks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-3xl p-5", children: bookmarks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", "data-ocid": "profile.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No bookmarks yet — bookmark pages for quick access" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: bookmarks.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors",
            style: { background: "rgba(255,255,255,0.02)" },
            "data-ocid": `profile.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4 text-blue-400 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1 truncate", children: id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeBookmark(id),
                  "aria-label": "Remove bookmark",
                  className: "w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shrink-0",
                  "data-ocid": `profile.delete_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
                }
              )
            ]
          },
          id
        )) }) })
      ]
    }
  );
});
function ToggleSwitch({
  checked,
  onChange,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange(!checked),
      role: "switch",
      "aria-checked": checked,
      "aria-label": label,
      className: "w-10 h-6 rounded-full relative transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50",
      style: {
        background: checked ? "oklch(0.68 0.22 258)" : "rgba(255,255,255,0.1)"
      },
      "data-ocid": "profile.toggle",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
          style: {
            transform: checked ? "translateX(18px)" : "translateX(4px)"
          }
        }
      )
    }
  );
}
function ProfilePage() {
  const { isAuthenticated, logout } = useAuth();
  const {
    profile,
    isLoading,
    isSaving,
    saveProfile,
    uploadAvatar,
    selectPresetAvatar
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
    clearQuizHistory
  } = useChemStore();
  const animLevel = useAnimationLevel();
  const shouldAnimate = animLevel !== "minimal";
  const [showEditPanel, setShowEditPanel] = reactExports.useState(false);
  const [showPresetPicker, setShowPresetPicker] = reactExports.useState(false);
  const [darkMode, setDarkMode] = reactExports.useState(getStoredDarkMode);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    applyDarkMode(darkMode);
  }, [darkMode]);
  const handleDarkModeToggle = reactExports.useCallback((v) => {
    setDarkMode(v);
    applyDarkMode(v);
  }, []);
  const joinDate = (profile == null ? void 0 : profile.joinDate) ? new Date(profile.joinDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  }) : null;
  const handleSave = reactExports.useCallback(
    async (data) => {
      if (!profile) return;
      await saveProfile({
        ...data,
        avatarUrl: profile.avatarUrl,
        presetAvatar: profile.presetAvatar
      });
      setShowEditPanel(false);
    },
    [profile, saveProfile]
  );
  const handleAvatarUpload = reactExports.useCallback(() => {
    var _a;
    setShowPresetPicker(false);
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  }, []);
  const handleFileChange = reactExports.useCallback(
    async (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file || !profile) return;
      const url = await uploadAvatar(file);
      if (url) {
        await saveProfile({ ...profile, avatarUrl: url, presetAvatar: null });
      }
      e.target.value = "";
    },
    [profile, uploadAvatar, saveProfile]
  );
  const handlePresetSelect = reactExports.useCallback(
    async (id) => {
      await selectPresetAvatar(id);
      setShowPresetPicker(false);
    },
    [selectPresetAvatar]
  );
  const handleClearData = reactExports.useCallback(() => {
    clearQuizHistory();
  }, [clearQuizHistory]);
  const level = gamification.level;
  const xp = gamification.xp;
  const xpLabel = reactExports.useMemo(() => {
    if (level <= 2) return "Learner";
    if (level <= 5) return "Explorer";
    if (level <= 10) return "Chemist";
    return "Master";
  }, [level]);
  const D = (n) => shouldAnimate ? n * 0.15 : 0;
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "glass-card rounded-3xl p-10 text-center max-w-sm w-full",
        "data-ocid": "profile.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔐" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-2", children: "Sign In Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Connect with Internet Identity to view and manage your profile." })
        ]
      }
    ) });
  }
  if (isLoading || !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-12 h-12 rounded-full border-2 border-t-transparent animate-spin",
        style: {
          borderColor: "oklch(0.68 0.22 258 / 0.5)",
          borderTopColor: "oklch(0.68 0.22 258)"
        },
        "data-ocid": "profile.loading_state"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-y-auto pb-36 pt-4 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFileChange,
        "aria-label": "Upload profile picture file"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: shouldAnimate ? { opacity: 0, y: 24 } : false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
          className: "glass-card rounded-3xl p-6 sm:p-8",
          "data-ocid": "profile.card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  avatarUrl: profile.avatarUrl,
                  presetAvatar: profile.presetAvatar ?? null,
                  displayName: profile.displayName,
                  onUpload: () => setShowPresetPicker((v) => !v)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPresetPicker((v) => !v),
                  "aria-label": "Change avatar",
                  className: "absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95",
                  style: {
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)"
                  },
                  "data-ocid": "profile.secondary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 text-white" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InlineEdit,
                {
                  value: profile.displayName,
                  label: "Display name",
                  onSave: (v) => saveProfile({ ...profile, displayName: v }),
                  className: "text-2xl sm:text-3xl font-bold text-foreground"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-semibold px-2.5 py-1 rounded-full",
                    style: {
                      background: "oklch(0.55 0.22 258 / 0.25)",
                      border: "1px solid oklch(0.68 0.22 258 / 0.4)",
                      color: "oklch(0.78 0.18 258)"
                    },
                    children: [
                      "Level ",
                      level,
                      " · ",
                      xpLabel
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-yellow-400/80 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
                  xp,
                  " XP"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InlineEdit,
                {
                  value: profile.username,
                  label: "Username",
                  onSave: (v) => saveProfile({ ...profile, username: v }),
                  className: "text-sm text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InlineEdit,
                {
                  value: profile.bio,
                  label: "Bio",
                  multiline: true,
                  onSave: (v) => saveProfile({ ...profile, bio: v }),
                  className: "text-sm text-foreground/80 leading-relaxed"
                }
              ),
              joinDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Member since ",
                joinDate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowEditPanel((v) => !v),
                  className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]",
                  style: {
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)"
                  },
                  "data-ocid": "profile.edit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
                    "Edit Profile",
                    showEditPanel ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
                  ]
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showPresetPicker && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PresetAvatarPicker,
        {
          selected: profile.presetAvatar ?? null,
          onSelect: handlePresetSelect,
          onClose: () => setShowPresetPicker(false)
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showPresetPicker && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleAvatarUpload,
              className: "w-full py-2.5 rounded-2xl text-sm text-muted-foreground flex items-center justify-center gap-2 hover:bg-white/5 transition-colors",
              style: { border: "1px dashed rgba(255,255,255,0.15)" },
              "data-ocid": "profile.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                "Upload custom photo"
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showEditPanel && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditPanel,
        {
          profile,
          onSave: handleSave,
          onClose: () => setShowEditPanel(false),
          isSaving,
          onAvatarChange: handleAvatarUpload
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: shouldAnimate ? { opacity: 0, y: 24 } : false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: D(1), ease: [0, 0, 0.2, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1", children: "Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", "data-ocid": "profile.section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatOverviewCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" }),
                  value: favorites.length + recentlyViewed.length,
                  label: "Activity",
                  accent: "oklch(0.55 0.22 258)",
                  ocid: "profile.item.1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatOverviewCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-white" }),
                  value: favorites.length + bookmarkedItems.length,
                  label: "Saved",
                  accent: "oklch(0.55 0.18 290)",
                  ocid: "profile.item.2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatOverviewCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-white" }),
                  value: gamification.achievements.filter((a) => a.unlockedAt).length,
                  label: "Achievements",
                  accent: "oklch(0.65 0.2 130)",
                  ocid: "profile.item.3"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProgressSection,
        {
          recentlyViewed,
          quizHistory,
          delay: D(2),
          animate: shouldAnimate
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActivitySection,
        {
          recentlyViewed,
          quizHistory,
          quickNotes,
          delay: D(3),
          animate: shouldAnimate
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FavoritesSection,
        {
          favorites,
          toggleFavorite,
          delay: D(4),
          animate: shouldAnimate
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BookmarksSection,
        {
          bookmarks: bookmarkedItems,
          removeBookmark,
          delay: D(5),
          animate: shouldAnimate
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: shouldAnimate ? { opacity: 0, y: 24 } : false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: D(6), ease: [0, 0, 0.2, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1", children: "Settings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card rounded-3xl divide-y divide-white/[0.06] overflow-hidden",
                "data-ocid": "profile.panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-9 h-9 rounded-xl flex items-center justify-center",
                          style: { background: "rgba(255,255,255,0.07)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4 text-blue-300" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Dark Mode" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: darkMode ? "Currently dark" : "Currently light" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ToggleSwitch,
                      {
                        checked: darkMode,
                        onChange: handleDarkModeToggle,
                        label: "Dark Mode toggle"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "w-full flex items-center gap-3 px-6 py-4 hover:bg-white/5 transition-colors text-left",
                      "data-ocid": "profile.secondary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-9 h-9 rounded-xl flex items-center justify-center",
                            style: { background: "rgba(255,255,255,0.07)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-green-400" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Privacy Settings" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage your data" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Danger Zone" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleClearData,
                        className: "w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.48 0.18 22) 0%, oklch(0.42 0.2 35) 100%)",
                          boxShadow: "0 4px 16px oklch(0.48 0.18 22 / 0.3)"
                        },
                        "data-ocid": "profile.delete_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                          "Clear Progress Data"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: logout,
                        className: "w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.52 0.22 22) 0%, oklch(0.45 0.24 28) 100%)",
                          boxShadow: "0 4px 20px oklch(0.52 0.22 22 / 0.35)"
                        },
                        "data-ocid": "profile.confirm_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                          "Sign Out"
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const StatOverviewCard = reactExports.memo(function StatOverviewCard2({
  icon,
  value,
  label,
  accent,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-2xl p-4 flex flex-col items-center gap-2",
      style: { background: "rgba(255,255,255,0.04)" },
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-xl flex items-center justify-center",
            style: { background: accent, boxShadow: `0 0 14px ${accent}55` },
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-foreground tabular-nums", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-center leading-tight", children: label })
      ]
    }
  );
});
function EditPanel({
  profile,
  onSave,
  onClose,
  isSaving,
  onAvatarChange
}) {
  const [displayName, setDisplayName] = reactExports.useState(profile.displayName);
  const [username, setUsername] = reactExports.useState(profile.username);
  const [bio, setBio] = reactExports.useState(profile.bio);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -16, scale: 0.97 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -16, scale: 0.97 },
      transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
      className: "glass-card rounded-3xl p-6 space-y-5",
      "data-ocid": "profile.edit_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: "Edit Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close edit panel",
              className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors",
              "data-ocid": "profile.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mb-2 block", children: "Profile Picture" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: onAvatarChange,
                className: "w-full rounded-2xl border-2 border-dashed border-white/20 p-5 flex flex-col items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-all duration-200",
                "data-ocid": "profile.dropzone",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Upload custom photo" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-xs text-muted-foreground mb-1 block",
                  htmlFor: "edit-display-name",
                  children: "Full Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "edit-display-name",
                  type: "text",
                  value: displayName,
                  onChange: (e) => setDisplayName(e.target.value),
                  className: "w-full rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-200",
                  style: {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)"
                  },
                  placeholder: "Your display name",
                  "data-ocid": "profile.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-xs text-muted-foreground mb-1 block",
                  htmlFor: "edit-username",
                  children: "Username"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "edit-username",
                  type: "text",
                  value: username,
                  onChange: (e) => setUsername(e.target.value),
                  className: "w-full rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-200",
                  style: {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)"
                  },
                  placeholder: "@username"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-xs text-muted-foreground mb-1 block",
                  htmlFor: "edit-bio",
                  children: "Bio"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "edit-bio",
                  value: bio,
                  onChange: (e) => setBio(e.target.value),
                  rows: 3,
                  className: "w-full rounded-xl px-4 py-2.5 text-sm text-foreground outline-none resize-none transition-all duration-200",
                  style: {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)"
                  },
                  placeholder: "Tell the world about yourself...",
                  "data-ocid": "profile.textarea"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: isSaving,
            onClick: () => onSave({ displayName, username, bio }),
            className: "w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50",
            style: {
              background: "linear-gradient(135deg, oklch(0.55 0.22 258) 0%, oklch(0.45 0.2 290) 100%)",
              boxShadow: "0 4px 20px oklch(0.55 0.22 258 / 0.35)"
            },
            "data-ocid": "profile.save_button",
            children: [
              isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              isSaving ? "Saving…" : "Save Changes"
            ]
          }
        )
      ]
    }
  );
}
export {
  ProfilePage
};
