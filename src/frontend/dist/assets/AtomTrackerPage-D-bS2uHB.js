import { r as reactExports, E as ELEMENTS, j as jsxRuntimeExports, l as AnimatePresence, m as motion } from "./index-DyyHqAHL.js";
import { A as AtomicStructure } from "./AtomicStructure-DUFrMLIO.js";
const SUPERSCRIPT_MAP = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9"
};
function normalizeSuperscripts(str) {
  return str.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => SUPERSCRIPT_MAP[c] ?? c);
}
function parseConfig(raw) {
  const normalized = normalizeSuperscripts(raw);
  const tokenRe = /(\d+)([spdf])(\d+)/g;
  const steps = [];
  let cumulative = 0;
  let match = tokenRe.exec(normalized);
  while (match !== null) {
    const shell = Number.parseInt(match[1], 10);
    const blockType = match[2];
    const electrons = Number.parseInt(match[3], 10);
    const maxElectrons = blockType === "s" ? 2 : blockType === "p" ? 6 : blockType === "d" ? 10 : 14;
    cumulative += electrons;
    steps.push({
      subshell: `${match[1]}${match[2]}`,
      shell,
      electrons,
      maxElectrons,
      cumulative,
      blockType
    });
    match = tokenRe.exec(normalized);
  }
  return steps;
}
function getValenceElectrons(steps) {
  if (steps.length === 0) return 0;
  const maxShell = Math.max(...steps.map((s) => s.shell));
  return steps.filter((s) => s.shell === maxShell).reduce((sum, s) => sum + s.electrons, 0);
}
function getBlock(steps) {
  if (steps.length === 0) return "—";
  const last = steps[steps.length - 1];
  return last.blockType.toUpperCase();
}
function isParamagnetic(steps) {
  for (const step of steps) {
    const pairs = Math.floor(step.electrons / 2);
    const unpaired = step.electrons - pairs * 2;
    if (unpaired > 0) return true;
  }
  return false;
}
const BLOCK_COLOR = {
  s: "text-cyan-300",
  p: "text-violet-300",
  d: "text-amber-300",
  f: "text-rose-300"
};
const BLOCK_BG = {
  s: "bg-cyan-500/15 border-cyan-500/30",
  p: "bg-violet-500/15 border-violet-500/30",
  d: "bg-amber-500/15 border-amber-500/30",
  f: "bg-rose-500/15 border-rose-500/30"
};
function ElectronDot({
  filled,
  index,
  isActive
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "inline-block w-4 h-4 rounded-full border transition-all duration-300",
      style: {
        transitionDelay: filled ? `${index * 60}ms` : "0ms",
        background: filled ? "radial-gradient(circle at 35% 35%, oklch(0.92 0.18 200), oklch(0.65 0.22 205))" : "transparent",
        borderColor: filled ? "oklch(0.72 0.22 200 / 0.8)" : "oklch(0.45 0.06 250 / 0.5)",
        boxShadow: filled ? `0 0 8px oklch(0.72 0.22 200 / ${isActive ? "0.9" : "0.4"})` : "none",
        transform: filled ? "scale(1)" : "scale(0.7)",
        opacity: filled ? 1 : 0.35
      }
    }
  );
}
function OrbitalRow({
  step,
  revealedElectrons,
  isCurrentShell,
  isCompleted,
  isActive
}) {
  const dots = Array.from(
    { length: step.maxElectrons },
    (_, i) => i < revealedElectrons
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [
        "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-500",
        isCurrentShell && !isCompleted ? "border-cyan-400/40 bg-cyan-500/8 shadow-[0_0_20px_oklch(0.72_0.22_200/0.12)]" : isCompleted ? "border-border/30 bg-white/3 opacity-70" : "border-border/20 bg-white/2 opacity-40"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: [
              "font-mono text-sm w-8 shrink-0 font-semibold",
              BLOCK_COLOR[step.blockType]
            ].join(" "),
            children: step.subshell
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: [
              "text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0",
              BLOCK_BG[step.blockType],
              BLOCK_COLOR[step.blockType]
            ].join(" "),
            children: step.blockType
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap flex-1", children: dots.map((filled, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ElectronDot,
          {
            filled,
            index: i,
            isActive
          },
          `dot-${step.subshell}-${i}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground shrink-0 w-12 text-right", children: [
          revealedElectrons,
          "/",
          step.maxElectrons
        ] }),
        revealedElectrons === step.electrons && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cyan-400/70 font-mono shrink-0 w-12 text-right", children: [
          "Σ ",
          step.cumulative
        ] })
      ]
    }
  );
}
function AtomTrackerPage() {
  const [query, setQuery] = reactExports.useState("");
  const [selectedElement, setSelectedElement] = reactExports.useState(ELEMENTS[0]);
  const [showSuggestions, setShowSuggestions] = reactExports.useState(false);
  const [currentStep, setCurrentStep] = reactExports.useState(-1);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [atomModel, setAtomModel] = reactExports.useState("bohr");
  const timerRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const suggestionsRef = reactExports.useRef(null);
  const inputWrapperRef = reactExports.useRef(null);
  const prevSymbolRef = reactExports.useRef(selectedElement.symbol);
  reactExports.useEffect(() => {
    function handleClickOutside(e) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) && inputWrapperRef.current && !inputWrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const steps = parseConfig(selectedElement.electronConfiguration);
  const totalSteps = steps.length;
  const suggestions = query.trim().length > 0 ? ELEMENTS.filter(
    (el) => el.name.toLowerCase().includes(query.toLowerCase()) || el.symbol.toLowerCase().includes(query.toLowerCase()) || String(el.atomicNumber).startsWith(query)
  ).slice(0, 8) : [];
  if (prevSymbolRef.current !== selectedElement.symbol) {
    prevSymbolRef.current = selectedElement.symbol;
    setCurrentStep(-1);
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }
  reactExports.useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= totalSteps - 1) {
      setIsPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, 800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, totalSteps]);
  const handlePlay = reactExports.useCallback(() => {
    if (currentStep >= totalSteps - 1) {
      setCurrentStep(-1);
      setTimeout(() => setIsPlaying(true), 50);
    } else {
      setIsPlaying((p) => !p);
    }
  }, [currentStep, totalSteps]);
  const handleNext = reactExports.useCallback(() => {
    if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1);
  }, [currentStep, totalSteps]);
  const handleReset = reactExports.useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);
  const selectElement = (el) => {
    setSelectedElement(el);
    setQuery("");
    setShowSuggestions(false);
  };
  function getRevealedElectrons(stepIdx) {
    if (currentStep < stepIdx) return 0;
    if (currentStep > stepIdx) return steps[stepIdx].electrons;
    return steps[stepIdx].electrons;
  }
  const shellGroups = Array.from(new Set(steps.map((s) => s.shell))).sort(
    (a, b) => a - b
  );
  const currentShell = currentStep >= 0 && currentStep < steps.length ? steps[currentStep].shell : -1;
  const completedSteps = steps.slice(0, currentStep + 1);
  const valence = getValenceElectrons(completedSteps);
  const blockLabel = getBlock(completedSteps);
  const paramagnetic = isParamagnetic(completedSteps);
  const totalRevealedElectrons = currentStep >= 0 ? steps[currentStep].cumulative : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background px-4 py-6 md:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display font-bold text-foreground", children: "Atom Tracker" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base", children: "Visualize electron configuration filling step-by-step" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border/40 p-5",
        style: {
          background: "oklch(0.18 0.02 250 / 0.6)",
          backdropFilter: "blur(32px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "element-search",
              className: "block text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider",
              children: "Select Element"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: inputWrapperRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "element-search",
                ref: inputRef,
                type: "text",
                value: query,
                onChange: (e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                },
                onFocus: () => setShowSuggestions(true),
                placeholder: `${selectedElement.name} (${selectedElement.symbol})`,
                className: "w-full bg-white/5 border border-border/40 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all text-sm",
                "data-ocid": "atom-tracker.search_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-0.5 rounded-lg text-xs font-mono font-bold",
                  style: {
                    background: `${selectedElement.colorHex}22`,
                    color: selectedElement.colorHex,
                    border: `1px solid ${selectedElement.colorHex}44`
                  },
                  children: selectedElement.symbol
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Z=",
                selectedElement.atomicNumber
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                ref: suggestionsRef,
                initial: { opacity: 0, scale: 0.95, y: -8 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.95, y: -8 },
                transition: { duration: 0.15, ease: "easeOut" },
                className: "absolute left-0 right-0 top-full mt-2 rounded-xl overflow-hidden",
                style: {
                  position: "absolute",
                  zIndex: 9999,
                  background: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                  padding: "8px 0"
                },
                "data-ocid": "atom-tracker.suggestions_dropdown",
                children: suggestions.map((el) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onMouseDown: () => selectElement(el),
                    className: "w-full flex items-center gap-3 text-left transition-colors duration-150",
                    style: {
                      padding: "10px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.9)"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                    },
                    "data-ocid": `atom-tracker.suggestion.${el.atomicNumber}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0",
                          style: {
                            background: `${el.colorHex}22`,
                            color: el.colorHex,
                            border: `1px solid ${el.colorHex}44`
                          },
                          children: el.symbol
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: el.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "ml-auto text-xs font-mono",
                          style: { color: "rgba(148,163,184,0.7)" },
                          children: [
                            "Z=",
                            el.atomicNumber
                          ]
                        }
                      )
                    ]
                  },
                  el.symbol
                ))
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border/40 p-5 flex flex-col items-center gap-4",
        style: {
          background: "oklch(0.18 0.02 250 / 0.6)",
          backdropFilter: "blur(32px)"
        },
        "data-ocid": "atom-tracker.atom_preview",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: [
              "Atom Preview — ",
              selectedElement.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex rounded-lg overflow-hidden border border-white/10",
                "data-ocid": "atom-tracker.model_toggle",
                children: ["bohr", "orbital"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAtomModel(m),
                    className: "px-3 py-1.5 text-[11px] font-medium transition-all duration-200 capitalize",
                    style: {
                      background: atomModel === m ? "oklch(0.72 0.22 200 / 0.18)" : "transparent",
                      color: atomModel === m ? "oklch(0.88 0.16 200)" : "rgba(148,163,184,0.7)",
                      borderRight: m === "bohr" ? "1px solid rgba(255,255,255,0.08)" : "none"
                    },
                    "data-ocid": `atom-tracker.model_toggle.${m}`,
                    "aria-pressed": atomModel === m,
                    children: m === "bohr" ? "Bohr Model" : "Orbital Model"
                  },
                  m
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AtomicStructure,
            {
              atomicNumber: selectedElement.atomicNumber,
              electronConfiguration: selectedElement.electronConfiguration,
              category: selectedElement.category,
              visible: true,
              model: atomModel,
              size: "md"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70 font-mono text-center", children: selectedElement.electronConfiguration })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border/40 p-4 flex flex-wrap items-center gap-3",
        style: {
          background: "oklch(0.18 0.02 250 / 0.6)",
          backdropFilter: "blur(32px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handlePlay,
              className: "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95",
              style: {
                background: isPlaying ? "oklch(0.65 0.18 22 / 0.2)" : "oklch(0.72 0.22 200 / 0.2)",
                border: isPlaying ? "1px solid oklch(0.65 0.18 22 / 0.5)" : "1px solid oklch(0.72 0.22 200 / 0.5)",
                color: isPlaying ? "oklch(0.8 0.2 22)" : "oklch(0.88 0.16 200)",
                boxShadow: isPlaying ? "0 0 16px oklch(0.65 0.18 22 / 0.2)" : "0 0 16px oklch(0.72 0.22 200 / 0.2)"
              },
              "data-ocid": "atom-tracker.play_button",
              children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, {}),
                "Pause"
              ] }) : currentStep >= totalSteps - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ReplayIcon, {}),
                "Replay"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, {}),
                currentStep === -1 ? "Auto Play" : "Resume"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleNext,
              disabled: currentStep >= totalSteps - 1 || isPlaying,
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/40 bg-white/5 text-sm font-medium text-foreground hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95",
              "data-ocid": "atom-tracker.next_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(NextIcon, {}),
                "Next Step"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleReset,
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/30 bg-white/3 text-sm text-muted-foreground hover:bg-white/8 hover:text-foreground transition-all duration-200 active:scale-95",
              "data-ocid": "atom-tracker.reset_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ResetIcon, {}),
                "Reset"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              "Step ",
              Math.max(0, currentStep + 1),
              "/",
              totalSteps
            ] }),
            currentStep >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cyan-400/80 font-mono", children: [
              "· ",
              totalRevealedElectrons,
              "e⁻"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full transition-all duration-500",
        style: {
          width: `${totalSteps > 0 ? (currentStep + 1) / totalSteps * 100 : 0}%`,
          background: "linear-gradient(90deg, oklch(0.72 0.22 200), oklch(0.68 0.2 260))",
          boxShadow: "0 0 12px oklch(0.72 0.22 200 / 0.5)"
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border/40 p-5 space-y-4",
        style: {
          background: "oklch(0.16 0.02 250 / 0.55)",
          backdropFilter: "blur(32px)"
        },
        "data-ocid": "atom-tracker.orbital_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Orbital Filling" }),
          steps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-6", children: "Could not parse electron configuration for this element." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: shellGroups.map((shell) => {
            const shellSteps = steps.filter((s) => s.shell === shell);
            const shellIndices = shellSteps.map((s) => steps.indexOf(s));
            const isShellActive = currentShell === shell;
            const isShellDone = shellIndices.every((i) => i <= currentStep);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: [
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border transition-all duration-300",
                      isShellActive ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" : isShellDone ? "bg-white/5 border-border/30 text-muted-foreground" : "bg-transparent border-border/20 text-muted-foreground/40"
                    ].join(" "),
                    children: [
                      "Shell n=",
                      shell
                    ]
                  }
                ),
                isShellActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 pl-2", children: shellSteps.map((step, localIdx) => {
                const globalIdx = shellIndices[localIdx];
                const revealed = getRevealedElectrons(globalIdx);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  OrbitalRow,
                  {
                    step,
                    revealedElectrons: revealed,
                    isCurrentShell: isShellActive,
                    isCompleted: globalIdx < currentStep,
                    isActive: globalIdx === currentStep
                  },
                  step.subshell
                );
              }) })
            ] }, shell);
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border/40 p-5 space-y-4",
        style: {
          background: "oklch(0.18 0.025 250 / 0.6)",
          backdropFilter: "blur(32px)"
        },
        "data-ocid": "atom-tracker.summary_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-xl p-3 font-mono text-sm text-cyan-300 leading-relaxed break-all",
              style: {
                background: "oklch(0.72 0.22 200 / 0.06)",
                border: "1px solid oklch(0.72 0.22 200 / 0.2)"
              },
              children: currentStep < 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "Press Play or Next to begin filling orbitals…" }) : steps.slice(0, currentStep + 1).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: BLOCK_COLOR[s.blockType], children: [
                  s.subshell,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { children: s.electrons })
                ] }),
                i < currentStep ? " " : ""
              ] }, s.subshell))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryCard,
              {
                label: "Valence e⁻",
                value: currentStep < 0 ? "—" : String(valence),
                color: "cyan"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryCard,
              {
                label: "Block",
                value: currentStep < 0 ? "—" : blockLabel,
                color: blockLabel === "S" ? "cyan" : blockLabel === "P" ? "violet" : blockLabel === "D" ? "amber" : "rose"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryCard,
              {
                label: "Total e⁻",
                value: currentStep < 0 ? "—" : String(totalRevealedElectrons),
                color: "cyan"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryCard,
              {
                label: "Magnetic",
                value: currentStep < 0 ? "—" : paramagnetic ? "Paramagnetic" : "Diamagnetic",
                color: paramagnetic ? "amber" : "violet",
                small: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-lg shrink-0",
                style: {
                  background: `${selectedElement.colorHex}20`,
                  color: selectedElement.colorHex,
                  border: `1px solid ${selectedElement.colorHex}40`,
                  boxShadow: `0 0 20px ${selectedElement.colorHex}20`
                },
                children: selectedElement.symbol
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-base", children: selectedElement.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "Atomic Number ",
                selectedElement.atomicNumber,
                " · Period",
                " ",
                selectedElement.period,
                " · Group ",
                selectedElement.group || "—"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Config" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-cyan-300/80 max-w-[140px] truncate", children: selectedElement.electronConfiguration })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl border border-border/30 px-5 py-4",
        style: {
          background: "oklch(0.15 0.01 250 / 0.4)",
          backdropFilter: "blur(24px)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-xs text-muted-foreground", children: [
          ["s", "p", "d", "f"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-3 h-3 rounded-sm border ${BLOCK_BG[b]}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: BLOCK_COLOR[b], children: [
              b.toUpperCase(),
              "-block"
            ] })
          ] }, b)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-3 h-3 rounded-full",
                style: {
                  background: "radial-gradient(circle, oklch(0.88 0.18 200), oklch(0.65 0.22 205))",
                  boxShadow: "0 0 6px oklch(0.72 0.22 200 / 0.6)"
                }
              }
            ),
            "Filled electron"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border border-muted-foreground/30 opacity-40" }),
            "Empty slot"
          ] })
        ] })
      }
    )
  ] }) });
}
function SummaryCard({
  label,
  value,
  color,
  small
}) {
  const colorMap = {
    cyan: "oklch(0.72 0.22 200)",
    violet: "oklch(0.68 0.2 280)",
    amber: "oklch(0.75 0.2 60)",
    rose: "oklch(0.68 0.2 20)"
  };
  const c = colorMap[color];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-3 border space-y-1",
      style: {
        background: `${c.replace(")", " / 0.06)")}`,
        borderColor: `${c.replace(")", " / 0.25)")}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `font-bold font-mono ${small ? "text-sm" : "text-xl"}`,
            style: { color: c },
            children: value
          }
        )
      ]
    }
  );
}
function PlayIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" })
    }
  );
}
function PauseIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" })
    }
  );
}
function ResetIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" })
    }
  );
}
function NextIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" })
    }
  );
}
function ReplayIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" })
    }
  );
}
export {
  AtomTrackerPage
};
