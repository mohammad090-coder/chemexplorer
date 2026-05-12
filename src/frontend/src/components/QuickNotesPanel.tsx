import type { NoteCategory, QuickNote } from "@/store/useChemStore";
import { useChemStore } from "@/store/useChemStore";
import {
  Check,
  ChevronDown,
  ClipboardCopy,
  FileText,
  Filter,
  FlaskConical,
  FunctionSquare,
  Lightbulb,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Category config ────────────────────────────────────────────────────────

type CatMeta = {
  label: string;
  color: string;
  icon: React.ReactNode;
};

const CAT_META: Record<NoteCategory, CatMeta> = {
  general: {
    label: "General",
    color: "oklch(0.72 0.16 258)",
    icon: <FileText className="w-3 h-3" />,
  },
  formula: {
    label: "Formula",
    color: "oklch(0.72 0.22 140)",
    icon: <FunctionSquare className="w-3 h-3" />,
  },
  reaction: {
    label: "Reaction",
    color: "oklch(0.72 0.22 185)",
    icon: <FlaskConical className="w-3 h-3" />,
  },
  concept: {
    label: "Concept",
    color: "oklch(0.72 0.22 55)",
    icon: <Lightbulb className="w-3 h-3" />,
  },
  revision: {
    label: "Revision",
    color: "oklch(0.72 0.22 320)",
    icon: <Star className="w-3 h-3" />,
  },
};

const ALL_CATS: NoteCategory[] = [
  "general",
  "formula",
  "reaction",
  "concept",
  "revision",
];

// ─── Preset imports ─────────────────────────────────────────────────────────

const PRESET_FORMULAS = [
  { text: "Ideal Gas Law: pV = nRT", category: "formula" as NoteCategory },
  {
    text: "Gibbs Free Energy: ΔG = ΔH − TΔS",
    category: "formula" as NoteCategory,
  },
  {
    text: "Nernst Equation: E = E° − (0.0592/n) log Q at 25°C",
    category: "formula" as NoteCategory,
  },
  {
    text: "Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])",
    category: "formula" as NoteCategory,
  },
  { text: "Arrhenius: k = A·e^(−Ea/RT)", category: "formula" as NoteCategory },
  {
    text: "Clausius-Clapeyron: ln(P₂/P₁) = −ΔHvap/R·(1/T₂ − 1/T₁)",
    category: "formula" as NoteCategory,
  },
  { text: "Van't Hoff: ΔG° = −RT ln K", category: "formula" as NoteCategory },
  { text: "Rate Law: r = k[A]^m[B]^n", category: "formula" as NoteCategory },
  {
    text: "Beer-Lambert: A = εlc (absorbance = molar absorptivity × path length × concentration)",
    category: "formula" as NoteCategory,
  },
  { text: "de Broglie: λ = h/mv", category: "formula" as NoteCategory },
  { text: "Heisenberg: Δx·Δp ≥ h/4π", category: "formula" as NoteCategory },
  {
    text: "Faraday: m = (M·I·t)/(n·F), F = 96485 C/mol",
    category: "formula" as NoteCategory,
  },
];

const PRESET_REACTIONS = [
  {
    text: "Haber Process: N₂ + 3H₂ ⇌ 2NH₃ | Fe catalyst, 450°C, 200 atm",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Contact Process: 2SO₂ + O₂ → 2SO₃ | V₂O₅ catalyst, 450°C",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Thermite: Fe₂O₃ + 2Al → Al₂O₃ + 2Fe | Highly exothermic",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Electrolysis of Brine: 2NaCl + 2H₂O → Cl₂ + H₂ + 2NaOH",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Diazotization: ArNH₂ + NaNO₂ + 2HCl → ArN₂⁺Cl⁻ + NaCl + 2H₂O | 0–5°C",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Aldol Condensation: 2CH₃CHO → CH₃CH(OH)CH₂CHO | dilute NaOH, Δ",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Grignard: RMgX + R'CHO → R-CH(OH)-R' after hydrolysis",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Saponification: RCOOR' + NaOH → RCOONa + R'OH (soap)",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Tollens Test: RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓ + 4NH₃ + 2H₂O",
    category: "reaction" as NoteCategory,
  },
  {
    text: "Sandmeyer: ArN₂⁺ + CuCN → ArCN | Cu catalyst",
    category: "reaction" as NoteCategory,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryPill({
  cat,
  active,
  onClick,
}: {
  cat: NoteCategory | "all";
  active: boolean;
  onClick: () => void;
}) {
  const meta = cat === "all" ? null : CAT_META[cat];
  const color = meta?.color ?? "oklch(0.72 0.16 258)";
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap flex-shrink-0"
      style={
        active
          ? { background: `${color}28`, borderColor: `${color}55`, color }
          : {
              background: "oklch(0.18 0.02 250 / 0.5)",
              borderColor: "oklch(0.28 0.02 250 / 0.4)",
              color: "oklch(0.52 0 0)",
            }
      }
    >
      {cat === "all" ? <Filter className="w-3 h-3" /> : meta?.icon}
      {cat === "all" ? "All" : meta?.label}
    </button>
  );
}

function ImportModal({
  type,
  onClose,
  onImport,
}: {
  type: "formulas" | "reactions";
  onClose: () => void;
  onImport: (text: string, category: NoteCategory) => void;
}) {
  const items = type === "formulas" ? PRESET_FORMULAS : PRESET_REACTIONS;
  const [imported, setImported] = useState<Set<string>>(new Set());

  function handleImport(item: { text: string; category: NoteCategory }) {
    onImport(item.text, item.category);
    setImported((s) => new Set(s).add(item.text));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4"
      style={{
        background: "oklch(0.05 0 0 / 0.65)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="w-full max-w-sm max-h-[70vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.14 0.025 250 / 0.97)",
          backdropFilter: "blur(32px)",
          border: "1px solid oklch(0.32 0.04 258 / 0.4)",
          boxShadow: "0 20px 60px oklch(0.05 0 0 / 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "oklch(0.28 0.02 250 / 0.3)" }}
        >
          <p
            className="text-sm font-semibold"
            style={{ color: "oklch(0.92 0 0)" }}
          >
            {type === "formulas" ? "📐 Key Formulas" : "⚗️ Important Reactions"}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-3 space-y-2">
          {items.map((item) => {
            const done = imported.has(item.text);
            const color = CAT_META[item.category].color;
            return (
              <div
                key={item.text}
                className="flex items-start gap-2 p-2.5 rounded-xl border"
                style={{
                  background: "oklch(0.18 0.02 250 / 0.5)",
                  borderColor: "oklch(0.28 0.02 250 / 0.4)",
                }}
              >
                <p
                  className="flex-1 text-xs leading-relaxed font-mono"
                  style={{ color: "oklch(0.85 0 0)" }}
                >
                  {item.text}
                </p>
                <button
                  type="button"
                  onClick={() => handleImport(item)}
                  className="flex-shrink-0 flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={
                    done
                      ? {
                          background: `${color}22`,
                          color,
                          borderColor: `${color}44`,
                        }
                      : {
                          background: "oklch(0.24 0.03 258 / 0.6)",
                          color: "oklch(0.75 0.14 258)",
                          border: "1px solid oklch(0.38 0.06 258 / 0.4)",
                        }
                  }
                  data-ocid="import_modal.add_button"
                >
                  {done ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                  {done ? "Added" : "Add"}
                </button>
              </div>
            );
          })}
        </div>
        <div
          className="px-4 py-3 border-t text-center"
          style={{ borderColor: "oklch(0.28 0.02 250 / 0.3)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="text-xs"
            style={{ color: "oklch(0.52 0 0)" }}
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NoteItem({
  note,
  index,
  onRemove,
  onPin,
}: {
  note: QuickNote;
  index: number;
  onRemove: () => void;
  onPin: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = CAT_META[note.category] ?? CAT_META.general;
  const isFormula = note.category === "formula";
  const isReaction = note.category === "reaction";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: isReaction
          ? "oklch(0.16 0.04 195 / 0.5)"
          : "oklch(0.17 0.02 250 / 0.55)",
        border: `1px solid ${isReaction ? "oklch(0.42 0.12 195 / 0.35)" : isFormula ? "oklch(0.38 0.06 258 / 0.3)" : "oklch(0.28 0.02 250 / 0.4)"}`,
      }}
      data-ocid={`quick_notes.item.${index + 1}`}
    >
      {/* Card header */}
      <div className="flex items-start gap-2 p-3">
        {/* Pin button */}
        <button
          type="button"
          onClick={onPin}
          className="flex-shrink-0 mt-0.5 transition-all"
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          data-ocid={`quick_notes.pin_button.${index + 1}`}
          style={{
            color: note.pinned ? "oklch(0.78 0.22 55)" : "oklch(0.38 0 0)",
          }}
        >
          <Star
            className="w-3.5 h-3.5"
            fill={note.pinned ? "currentColor" : "none"}
          />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category pill */}
          <span
            className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md font-medium mb-1.5"
            style={{
              background: `${meta.color}20`,
              color: meta.color,
              border: `1px solid ${meta.color}30`,
            }}
          >
            {meta.icon}
            {meta.label}
          </span>

          {/* Note text */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: expanded ? "400px" : "3.2em" }}
          >
            <p
              className="text-xs leading-relaxed break-words"
              style={{
                color: "oklch(0.88 0 0)",
                fontFamily: isFormula ? "monospace" : "inherit",
                background: isFormula
                  ? "oklch(0.13 0.02 250 / 0.6)"
                  : "transparent",
                borderRadius: isFormula ? "6px" : "0",
                padding: isFormula ? "4px 6px" : "0",
              }}
            >
              {note.text}
            </p>
          </div>

          {/* Timestamp + expand toggle */}
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-[10px]" style={{ color: "oklch(0.44 0 0)" }}>
              {new Date(note.createdAt).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {note.text.length > 80 && (
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="flex items-center gap-0.5 text-[10px] transition-colors"
                style={{ color: "oklch(0.55 0.08 258)" }}
                data-ocid={`quick_notes.expand.${index + 1}`}
              >
                <ChevronDown
                  className="w-3 h-3 transition-transform duration-200"
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                {expanded ? "Less" : "More"}
              </button>
            )}
          </div>
        </div>

        {/* Delete button */}
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 p-1 rounded-lg mt-0.5 opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: "oklch(0.65 0.19 22)" }}
          aria-label="Delete note"
          data-ocid={`quick_notes.delete_button.${index + 1}`}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main panel ──────────────────────────────────────────────────────────────

interface QuickNotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickNotesPanel({ isOpen, onClose }: QuickNotesPanelProps) {
  const { quickNotes, addNote, removeNote, togglePinNote } = useChemStore();
  const [draft, setDraft] = useState("");
  const [draftCategory, setDraftCategory] = useState<NoteCategory>("general");
  const [filterCat, setFilterCat] = useState<NoteCategory | "all">("all");
  const [importModal, setImportModal] = useState<
    "formulas" | "reactions" | null
  >(null);
  const [exportDone, setExportDone] = useState(false);

  function handleAdd() {
    if (!draft.trim()) return;
    addNote(draft, draftCategory);
    setDraft("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleAdd();
    }
  }

  function handleExport() {
    const text = quickNotes
      .map(
        (n) =>
          `[${CAT_META[n.category]?.label ?? n.category}] ${n.text}\n— ${new Date(n.createdAt).toLocaleString()}`,
      )
      .join("\n\n");
    navigator.clipboard.writeText(text).catch(() => {});
    setExportDone(true);
    setTimeout(() => setExportDone(false), 2500);
  }

  const visibleNotes = useMemo(() => {
    const filtered =
      filterCat === "all"
        ? quickNotes
        : quickNotes.filter((n) => n.category === filterCat);
    return [
      ...filtered.filter((n) => n.pinned),
      ...filtered.filter((n) => !n.pinned),
    ];
  }, [quickNotes, filterCat]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="notes-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "oklch(0.06 0 0 / 0.55)" }}
              onClick={onClose}
            />

            {/* Panel */}
            <motion.div
              key="notes-panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] z-50 flex flex-col"
              style={{
                background: "oklch(0.13 0.025 250 / 0.95)",
                backdropFilter: "blur(36px) saturate(1.7)",
                borderLeft: "1px solid oklch(0.72 0.16 258 / 0.22)",
                boxShadow:
                  "-8px 0 56px oklch(0.68 0.16 258 / 0.12), inset 1px 0 0 oklch(1 0 0 / 0.04)",
              }}
              data-ocid="quick_notes.panel"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3.5 border-b"
                style={{ borderColor: "oklch(0.28 0.02 250 / 0.25)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: "oklch(0.68 0.16 258 / 0.2)",
                      boxShadow: "0 0 12px oklch(0.68 0.16 258 / 0.2)",
                    }}
                  >
                    <FileText
                      className="w-4 h-4"
                      style={{ color: "oklch(0.78 0.18 258)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.94 0 0)" }}
                    >
                      Smart Notes
                    </p>
                    <p className="text-xs" style={{ color: "oklch(0.52 0 0)" }}>
                      {quickNotes.length} note
                      {quickNotes.length !== 1 ? "s" : ""} saved
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Export */}
                  {quickNotes.length > 0 && (
                    <button
                      type="button"
                      onClick={handleExport}
                      className="p-1.5 rounded-xl transition-colors"
                      title="Copy all notes to clipboard"
                      style={{
                        color: exportDone
                          ? "oklch(0.72 0.22 140)"
                          : "oklch(0.52 0 0)",
                      }}
                      data-ocid="quick_notes.export_button"
                    >
                      {exportDone ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ClipboardCopy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-xl transition-colors hover:bg-white/5"
                    aria-label="Close notes panel"
                    style={{ color: "oklch(0.52 0 0)" }}
                    data-ocid="quick_notes.close_button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick import buttons */}
              <div
                className="px-4 py-2.5 border-b flex gap-2"
                style={{ borderColor: "oklch(0.28 0.02 250 / 0.2)" }}
              >
                <button
                  type="button"
                  onClick={() => setImportModal("formulas")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: "oklch(0.72 0.22 140 / 0.12)",
                    border: "1px solid oklch(0.72 0.22 140 / 0.3)",
                    color: "oklch(0.72 0.22 140)",
                  }}
                  data-ocid="quick_notes.import_formulas_button"
                >
                  <FunctionSquare className="w-3.5 h-3.5" />
                  Import Formulas
                </button>
                <button
                  type="button"
                  onClick={() => setImportModal("reactions")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: "oklch(0.72 0.22 185 / 0.12)",
                    border: "1px solid oklch(0.72 0.22 185 / 0.3)",
                    color: "oklch(0.72 0.22 185)",
                  }}
                  data-ocid="quick_notes.import_reactions_button"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Import Reactions
                </button>
              </div>

              {/* Note input area */}
              <div
                className="px-4 py-3 border-b space-y-2"
                style={{ borderColor: "oklch(0.28 0.02 250 / 0.2)" }}
              >
                {/* Category selector */}
                <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                  {ALL_CATS.map((cat) => {
                    const m = CAT_META[cat];
                    const active = draftCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setDraftCategory(cat)}
                        className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border transition-all whitespace-nowrap flex-shrink-0"
                        style={
                          active
                            ? {
                                background: `${m.color}25`,
                                borderColor: `${m.color}55`,
                                color: m.color,
                              }
                            : {
                                background: "oklch(0.18 0.02 250 / 0.4)",
                                borderColor: "oklch(0.28 0.02 250 / 0.35)",
                                color: "oklch(0.48 0 0)",
                              }
                        }
                        data-ocid={`quick_notes.draft_category.${cat}`}
                      >
                        {m.icon}
                        {m.label}
                      </button>
                    );
                  })}
                </div>

                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a note… (Ctrl+Enter to save)"
                  rows={3}
                  className="w-full rounded-xl px-3 py-2.5 text-xs resize-none outline-none placeholder:text-muted-foreground leading-relaxed"
                  style={{
                    background: "oklch(0.17 0.02 250 / 0.65)",
                    border: "1px solid oklch(0.28 0.02 250 / 0.45)",
                    color: "oklch(0.92 0 0)",
                    fontFamily:
                      draftCategory === "formula" ? "monospace" : "inherit",
                  }}
                  data-ocid="quick_notes.textarea"
                />
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!draft.trim()}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-35"
                  style={{
                    background: "oklch(0.68 0.16 258 / 0.22)",
                    border: "1px solid oklch(0.68 0.16 258 / 0.4)",
                    color: "oklch(0.82 0.12 258)",
                  }}
                  data-ocid="quick_notes.add_button"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Note
                </button>
              </div>

              {/* Filter bar */}
              <div
                className="px-4 py-2.5 border-b"
                style={{ borderColor: "oklch(0.28 0.02 250 / 0.2)" }}
              >
                <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                  <CategoryPill
                    cat="all"
                    active={filterCat === "all"}
                    onClick={() => setFilterCat("all")}
                  />
                  {ALL_CATS.map((cat) => (
                    <CategoryPill
                      key={cat}
                      cat={cat}
                      active={filterCat === cat}
                      onClick={() => setFilterCat(cat)}
                    />
                  ))}
                </div>
              </div>

              {/* Notes list */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                {visibleNotes.length === 0 ? (
                  <div
                    className="text-center py-12"
                    style={{ color: "oklch(0.48 0 0)" }}
                    data-ocid="quick_notes.empty_state"
                  >
                    <FileText className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">
                      {filterCat === "all"
                        ? "No notes yet."
                        : `No ${CAT_META[filterCat]?.label} notes.`}
                    </p>
                    <p className="text-xs mt-1 opacity-60">
                      Jot down reactions, formulas, or exam tips.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {visibleNotes.map((note, i) => (
                      <NoteItem
                        key={note.id}
                        note={note}
                        index={i}
                        onRemove={() => removeNote(note.id)}
                        onPin={() => togglePinNote(note.id)}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2.5 border-t text-center"
                style={{ borderColor: "oklch(0.28 0.02 250 / 0.2)" }}
              >
                <p className="text-[10px]" style={{ color: "oklch(0.38 0 0)" }}>
                  Notes persist across sessions • {quickNotes.length}/100
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Import modal — renders outside panel so it's on top */}
      <AnimatePresence>
        {importModal && (
          <ImportModal
            type={importModal}
            onClose={() => setImportModal(null)}
            onImport={(text, category) => addNote(text, category)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Floating trigger button — place at bottom-right corner */
export function QuickNotesFAB({
  onClick,
  noteCount,
}: {
  onClick: () => void;
  noteCount: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-24 right-4 z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shadow-lg"
      style={{
        background: "oklch(0.68 0.16 258 / 0.2)",
        backdropFilter: "blur(20px)",
        border: "1px solid oklch(0.68 0.16 258 / 0.4)",
        boxShadow:
          "0 4px 20px oklch(0.68 0.16 258 / 0.22), inset 0 1px 0 oklch(1 0 0 / 0.08)",
      }}
      aria-label="Open smart notes"
      data-ocid="quick_notes.open_modal_button"
    >
      <FileText className="w-4 h-4" style={{ color: "oklch(0.78 0.14 258)" }} />
      <span
        className="text-xs font-semibold"
        style={{ color: "oklch(0.82 0.12 258)" }}
      >
        Notes
      </span>
      {noteCount > 0 && (
        <span
          className="text-xs font-bold px-1.5 py-0.5 rounded-full"
          style={{
            background: "oklch(0.68 0.16 258 / 0.4)",
            color: "oklch(0.92 0.08 258)",
          }}
        >
          {noteCount}
        </span>
      )}
    </motion.button>
  );
}
