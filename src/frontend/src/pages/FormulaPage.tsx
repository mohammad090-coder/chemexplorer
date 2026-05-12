import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calculator,
  CheckCheck,
  ChevronDown,
  Copy,
  Lightbulb,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  CLASS11_CATEGORIES,
  CLASS12_CATEGORIES,
  type Formula,
  type FormulaCategory,
  getFormulaOfTheDay,
} from "./formulaData";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ActiveTab = "detail" | "derivation" | "usecases" | "examples";

// ─── Quick Solve Panel ────────────────────────────────────────────────────────

const QuickSolvePanel = memo(function QuickSolvePanel({
  formula,
}: {
  formula: Formula;
}) {
  const params = formula.quickSolveParams ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const [solveFor, setSolveFor] = useState(params[params.length - 1] ?? "");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = useCallback(() => {
    setError(null);
    setResult(null);
    const known = params.filter((p) => p !== solveFor);
    const missing = known.filter((p) => !values[p]);
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}`);
      return;
    }
    try {
      // Build numeric values map for known variables
      const knownVals: Record<string, number> = {};
      for (const p of known) {
        knownVals[p] = Number.parseFloat(values[p]);
      }

      let calcResult: number | null = null;

      // Per-formula rearrangement expressions
      const allRearrangements: Record<string, Record<string, string>> = {
        "states-1": {
          P: "n*0.0821*T/V",
          V: "n*0.0821*T/P",
          n: "P*V/(0.0821*T)",
          T: "P*V/(n*0.0821)",
        },
        "thermo-4": {
          q: "m*c*dT",
          m: "q/(c*dT)",
          c: "q/(m*dT)",
          dT: "q/(m*c)",
        },
        "mole-1": { n: "m/M", m: "n*M", M: "m/n" },
        "mole-4": { M: "n/V", n: "M*V", V: "n/M" },
        "mole-5": { m: "n/kg", n: "m*kg", kg: "n/m" },
        "ec-4": { Q: "I*t", I: "Q/t", t: "Q/I" },
        "ec-5": { m: "(M*Q)/(n*F)", M: "(m*n*F)/Q", Q: "(m*n*F)/M" },
        "thermo-3": {
          dG: "dH-T*dS",
          dH: "dG+T*dS",
          T: "(dH-dG)/dS",
          dS: "(dH-dG)/T",
        },
        "mole-9": {
          dTb: "i*Kb*m",
          i: "dTb/(Kb*m)",
          Kb: "dTb/(i*m)",
          m: "dTb/(i*Kb)",
        },
        "mole-10": {
          dTf: "i*Kf*m",
          i: "dTf/(Kf*m)",
          Kf: "dTf/(i*m)",
          m: "dTf/(i*Kf)",
        },
        "kin-4": { t_half: "0.693/k", k: "0.693/t_half" },
        "atomic-1": { En: "-13.6/(n*n)", n: "Math.sqrt(13.6/Math.abs(En))" },
        "atomic-2": { rn: "0.529*n*n", n: "Math.sqrt(rn/0.529)" },
        "ec-2": {
          dG: "-n*96485*Ecell",
          n: "-dG/(96485*Ecell)",
          Ecell: "-dG/(n*96485)",
        },
        "ec-1": {
          Ecell: "Ecathode-Eanode",
          Ecathode: "Ecell+Eanode",
          Eanode: "Ecathode-Ecell",
        },
        "ss-1": {
          rho: "(Z*M)/(6.022e23*Math.pow(a,3))",
          Z: "(rho*6.022e23*Math.pow(a,3))/M",
          M: "(rho*6.022e23*Math.pow(a,3))/Z",
        },
        "kin-3": {
          A_t: "A0*Math.exp(-k*t)",
          k: "-Math.log(A_t/A0)/t",
          t: "-Math.log(A_t/A0)/k",
        },
      };

      const formulaRearrange = allRearrangements[formula.id];
      if (formulaRearrange?.[solveFor]) {
        const exprToEval = formulaRearrange[solveFor];
        // Replace variable names with their numeric values
        let evalStr = exprToEval;
        for (const [k, v] of Object.entries(knownVals)) {
          evalStr = evalStr.replace(
            new RegExp(`\\b${k}\\b`, "g"),
            v.toString(),
          );
        }
        try {
          // Safe eval using Function constructor
          calcResult = Function(
            `"use strict"; return (${evalStr});`,
          )() as number;
        } catch {
          setError("Could not evaluate formula. Check your values.");
          return;
        }
      }

      if (calcResult !== null && !Number.isNaN(calcResult)) {
        setResult(`${solveFor} = ${calcResult.toPrecision(4)}`);
      } else {
        setError("Formula evaluation not available for this combination.");
      }
    } catch {
      setError("Error evaluating formula.");
    }
  }, [formula, params, solveFor, values]);

  if (params.length < 2) return null;

  return (
    <div
      className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
      data-ocid={`formula.quicksolve.${formula.id}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          Quick Solve
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Solve for
          </span>
          <div className="flex gap-1">
            {params.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setSolveFor(p);
                  setResult(null);
                  setError(null);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all",
                  solveFor === p
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10",
                )}
                data-ocid={`formula.solve_for.${formula.id}.${p}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {params
          .filter((p) => p !== solveFor)
          .map((p) => (
            <div key={p} className="flex flex-col gap-1">
              <label
                htmlFor={`qs-${formula.id}-${p}`}
                className="text-[10px] text-muted-foreground font-mono"
              >
                {p} =
              </label>
              <input
                id={`qs-${formula.id}-${p}`}
                type="number"
                placeholder="enter value"
                value={values[p] ?? ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [p]: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/40"
                data-ocid={`formula.input.${formula.id}.${p}`}
              />
            </div>
          ))}
      </div>

      <button
        type="button"
        onClick={handleSolve}
        className="w-full py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold transition-all border border-primary/20"
        data-ocid={`formula.solve_button.${formula.id}`}
      >
        Calculate
      </button>

      {result && (
        <div
          className="mt-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold"
          data-ocid={`formula.result.${formula.id}`}
        >
          ✓ {result}
        </div>
      )}
      {error && (
        <div
          className="mt-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs"
          data-ocid={`formula.error.${formula.id}`}
        >
          {error}
        </div>
      )}
    </div>
  );
});

// ─── Formula Card Component ───────────────────────────────────────────────────

const FormulaCard = memo(function FormulaCard({
  formula,
  index,
  categoryId,
}: {
  formula: Formula;
  index: number;
  categoryId: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("detail");
  const [expandedExample, setExpandedExample] = useState<number | null>(null);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(formula.formula).then(() => {
        setCopied(true);
        toast.success("Formula copied!", {
          description: formula.formula,
          duration: 2500,
        });
        setTimeout(() => setCopied(false), 2000);
      });
    },
    [formula.formula],
  );

  const allTabs: Array<{ id: ActiveTab; label: string; show: boolean }> = [
    { id: "detail", label: "Details", show: true },
    {
      id: "derivation",
      label: "Derivation",
      show: !!formula.derivation?.length,
    },
    { id: "usecases", label: "Use Cases", show: !!formula.useCases?.length },
    { id: "examples", label: "Examples", show: !!formula.examples?.length },
  ];
  const tabs = allTabs.filter((t) => t.show);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
      className="border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] transition-colors duration-200"
      data-ocid={`formula.item.${index + 1}`}
    >
      {/* Row header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left group"
        aria-expanded={expanded}
        data-ocid={`formula.toggle.${categoryId}.${index + 1}`}
      >
        <div className="flex-1 min-w-0 flex items-center gap-3 flex-wrap">
          <code className="font-mono text-sm text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-400/20 whitespace-nowrap flex-shrink-0">
            {formula.formula}
          </code>
          <span className="text-sm text-foreground font-medium truncate">
            {formula.name}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${formula.name}`}
            className={cn(
              "p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100",
              copied
                ? "bg-accent/20 text-accent"
                : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10",
            )}
            data-ocid={`formula.copy_button.${categoryId}.${index + 1}`}
          >
            {copied ? (
              <CheckCheck className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          {formula.quickSolveParams && (
            <Calculator
              className="w-3.5 h-3.5 text-cyan-400/50"
              aria-label="Quick solve available"
            />
          )}
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-white/[0.08]">
              {/* Sub-tabs */}
              {tabs.length > 1 && (
                <div className="flex gap-1 mb-3 flex-wrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                        activeTab === tab.id
                          ? "bg-white/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                      )}
                      data-ocid={`formula.subtab.${categoryId}.${index + 1}.${tab.id}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Detail tab */}
              {activeTab === "detail" && (
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {formula.explanation}
                  </p>
                  {formula.variables && (
                    <div className="flex items-start gap-2 mt-2">
                      <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mt-0.5 flex-shrink-0">
                        Variables
                      </span>
                      <p className="text-xs text-muted-foreground/80 font-mono leading-relaxed">
                        {formula.variables}
                      </p>
                    </div>
                  )}
                  {formula.quickSolveParams && (
                    <QuickSolvePanel formula={formula} />
                  )}
                </div>
              )}

              {/* Derivation tab */}
              {activeTab === "derivation" && formula.derivation && (
                <ol className="space-y-2">
                  {formula.derivation.map((step, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: ordered steps
                    <li key={`step-${i}`} className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.replace(/^\d+\.\s*/, "")}
                      </p>
                    </li>
                  ))}
                </ol>
              )}

              {/* Use Cases tab */}
              {activeTab === "usecases" && formula.useCases && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Where is this used?
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {formula.useCases.map((uc, i) => (
                      <li
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list items
                        key={`uc-${i}`}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-accent/60 mt-0.5 flex-shrink-0">
                          ▸
                        </span>
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Examples tab */}
              {activeTab === "examples" && formula.examples && (
                <div className="space-y-2">
                  {formula.examples.map((ex, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list items
                      key={`ex-${i}`}
                      className="border border-white/10 rounded-xl overflow-hidden"
                      data-ocid={`formula.example.${categoryId}.${index + 1}.${i + 1}`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedExample(expandedExample === i ? null : i)
                        }
                        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/[0.03]"
                      >
                        <span className="text-xs text-muted-foreground leading-relaxed pr-2">
                          {ex.problem}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/50 transition-transform duration-200",
                            expandedExample === i && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedExample === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3 pt-1 border-t border-white/[0.06]">
                              <p className="text-xs font-mono text-accent/90 leading-relaxed">
                                {ex.solution}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// ─── Category Panel ───────────────────────────────────────────────────────────

const CategoryPanel = memo(function CategoryPanel({
  category,
  searchQuery,
  defaultOpen = false,
}: {
  category: FormulaCategory;
  searchQuery: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const filteredFormulas = useMemo(() => {
    if (!searchQuery) return category.formulas;
    const q = searchQuery.toLowerCase();
    return category.formulas.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.explanation.toLowerCase().includes(q) ||
        (f.keywords ?? []).some((k) => k.toLowerCase().includes(q)) ||
        (f.useCases ?? []).some((u) => u.toLowerCase().includes(q)) ||
        f.category.toLowerCase().includes(q),
    );
  }, [category.formulas, searchQuery]);

  const forceOpen = searchQuery.length > 0 && filteredFormulas.length > 0;
  const isOpen = forceOpen || open;

  if (searchQuery && filteredFormulas.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border backdrop-blur-[32px] bg-gradient-to-br bg-card/30",
        category.color,
      )}
      data-ocid={`formula.category.${category.id}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4"
        data-ocid={`formula.category_toggle.${category.id}`}
      >
        <div className="text-left">
          <h3 className="font-display font-semibold text-base text-foreground">
            {category.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {filteredFormulas.length} formula
            {filteredFormulas.length !== 1 ? "s" : ""}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-white/[0.08] pt-3">
              {filteredFormulas.map((f, i) => (
                <FormulaCard
                  key={f.id}
                  formula={f}
                  index={i}
                  categoryId={category.id}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─── Formula of the Day Banner ────────────────────────────────────────────────

const FormulaOfTheDay = memo(function FormulaOfTheDay() {
  const [dismissed, setDismissed] = useState(false);
  const formula = useMemo(() => getFormulaOfTheDay(), []);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-400/10 via-orange-400/8 to-yellow-400/10 backdrop-blur-[24px] p-4 mb-6"
      data-ocid="formula.fotd_banner"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400/30" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                Formula of the Day
              </span>
              <span className="text-[10px] text-muted-foreground/60">
                · Class {formula.class}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <code className="font-mono text-base text-amber-200 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20 whitespace-nowrap">
                {formula.formula}
              </code>
              <span className="font-semibold text-foreground text-sm">
                {formula.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
              {formula.explanation}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 rounded-lg hover:bg-white/10 text-muted-foreground/50 hover:text-muted-foreground flex-shrink-0 transition-colors"
          aria-label="Dismiss"
          data-ocid="formula.fotd_dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
});

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function FormulaPage() {
  const [activeClass, setActiveClass] = useState<"11" | "12">("11");
  const [activeCategoryId, setActiveCategoryId] = useState<string | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const allCategories =
    activeClass === "11" ? CLASS11_CATEGORIES : CLASS12_CATEGORIES;

  const categories = useMemo(
    () =>
      activeCategoryId === "all"
        ? allCategories
        : allCategories.filter((c) => c.id === activeCategoryId),
    [allCategories, activeCategoryId],
  );

  const totalFormulas = useMemo(
    () => allCategories.reduce((sum, c) => sum + c.formulas.length, 0),
    [allCategories],
  );

  const filteredCount = useMemo(() => {
    if (!searchQuery)
      return allCategories.reduce((s, c) => s + c.formulas.length, 0);
    const q = searchQuery.toLowerCase();
    return allCategories.reduce(
      (sum, c) =>
        sum +
        c.formulas.filter(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.formula.toLowerCase().includes(q) ||
            f.explanation.toLowerCase().includes(q) ||
            (f.keywords ?? []).some((k) => k.toLowerCase().includes(q)) ||
            (f.useCases ?? []).some((u) => u.toLowerCase().includes(q)) ||
            f.category.toLowerCase().includes(q),
        ).length,
      0,
    );
  }, [allCategories, searchQuery]);

  const handleClassChange = useCallback((cls: "11" | "12") => {
    setActiveClass(cls);
    setActiveCategoryId("all");
    setSearchQuery("");
  }, []);

  return (
    <div className="min-h-screen px-4 py-10" data-ocid="formula.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Class 11 &amp; 12 Chemistry Formulas</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
          Formula Library
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          70+ essential formulas for JEE, NEET &amp; board exams. Step-by-step
          derivations, real-world use cases, and solved examples.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Formula of the Day */}
        <AnimatePresence>
          <FormulaOfTheDay key="fotd" />
        </AnimatePresence>

        {/* Class tabs + Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-4"
        >
          <div className="flex glass rounded-2xl p-1 gap-1 flex-shrink-0">
            {(["11", "12"] as const).map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => handleClassChange(cls)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  activeClass === cls
                    ? "bg-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
                data-ocid={`formula.tab.class${cls}`}
              >
                Class {cls}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search formulas… (press "/" to focus)'
              className="w-full glass rounded-2xl pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              data-ocid="formula.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                aria-label="Clear search"
                data-ocid="formula.clear_search_button"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category sub-tabs */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none"
            data-ocid="formula.category_tabs"
          >
            <button
              type="button"
              onClick={() => setActiveCategoryId("all")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                activeCategoryId === "all"
                  ? "bg-white/15 text-foreground"
                  : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10",
              )}
              data-ocid="formula.filter.all"
            >
              All ({totalFormulas})
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                  activeCategoryId === cat.id
                    ? "bg-white/15 text-foreground"
                    : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10",
                )}
                data-ocid={`formula.filter.${cat.id}`}
              >
                {cat.title} ({cat.formulas.length})
              </button>
            ))}
          </motion.div>
        )}

        {/* Stats strip */}
        <div className="flex items-center gap-4 mb-5 px-1">
          <span className="text-xs text-muted-foreground">
            {searchQuery ? (
              <>
                <span className="text-foreground font-semibold">
                  {filteredCount}
                </span>{" "}
                of {totalFormulas} formulas match
              </>
            ) : (
              <>
                <span className="text-foreground font-semibold">
                  {activeCategoryId === "all"
                    ? totalFormulas
                    : (categories[0]?.formulas.length ?? 0)}
                </span>{" "}
                formulas in Class {activeClass}
              </>
            )}
          </span>
          {searchQuery && filteredCount === 0 && (
            <span className="text-xs text-muted-foreground/60">
              No results found
            </span>
          )}
        </div>

        {/* Categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeClass}-${activeCategoryId}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
            data-ocid={`formula.class${activeClass}_list`}
          >
            {categories.map((cat, idx) => (
              <CategoryPanel
                key={cat.id}
                category={cat}
                searchQuery={searchQuery}
                defaultOpen={idx === 0}
              />
            ))}

            {searchQuery && filteredCount === 0 && (
              <div
                className="glass rounded-2xl p-10 text-center"
                data-ocid="formula.empty_state"
              >
                <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-muted-foreground text-sm">
                  No formulas match &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs text-primary underline-offset-4 hover:underline"
                  data-ocid="formula.clear_search_empty_button"
                >
                  Clear search
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground/50 mt-10 pb-8"
        >
          Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">
            /
          </kbd>{" "}
          to search · Tap to expand · Hover for copy
        </motion.p>
      </div>
    </div>
  );
}
