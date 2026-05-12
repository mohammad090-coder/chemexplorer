import { useCompareElements } from "@/hooks/useElements";
import { ELEMENTS } from "@/lib/elements-data";
import { cn } from "@/lib/utils";
import { useChemStore } from "@/store/useChemStore";
import {
  CATEGORY_GRADIENT,
  CATEGORY_LABELS,
  CATEGORY_TEXT,
} from "@/types/element";
import type { Element, ElementCategory } from "@/types/element";
import { useNavigate } from "@tanstack/react-router";
import { GitCompare, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const COMPARE_PROPS: Array<{
  key: keyof Element;
  label: string;
  fmt?: (v: unknown) => string;
}> = [
  { key: "atomicNumber", label: "Atomic Number" },
  {
    key: "atomicMass",
    label: "Atomic Mass (u)",
    fmt: (v) => Number(v).toFixed(3),
  },
  {
    key: "category",
    label: "Category",
    fmt: (v) => CATEGORY_LABELS[v as ElementCategory] ?? String(v),
  },
  { key: "block", label: "Block", fmt: (v) => String(v).toUpperCase() },
  { key: "group", label: "Group", fmt: (v) => (v ? String(v) : "—") },
  { key: "period", label: "Period" },
  { key: "state", label: "State at RT" },
  {
    key: "density",
    label: "Density (g/cm³)",
    fmt: (v) => (v ? Number(v).toFixed(4) : "—"),
  },
  {
    key: "meltingPoint",
    label: "Melting Point (°C)",
    fmt: (v) => (v ? Number(v).toFixed(1) : "—"),
  },
  {
    key: "boilingPoint",
    label: "Boiling Point (°C)",
    fmt: (v) => (v ? Number(v).toFixed(1) : "—"),
  },
  {
    key: "electronegativity",
    label: "Electronegativity",
    fmt: (v) => (v ? Number(v).toFixed(2) : "—"),
  },
  {
    key: "ionizationEnergy",
    label: "Ionization Energy (eV)",
    fmt: (v) => (v ? Number(v).toFixed(3) : "—"),
  },
  {
    key: "atomicRadius",
    label: "Atomic Radius (pm)",
    fmt: (v) => (v ? String(v) : "—"),
  },
  { key: "electronConfiguration", label: "Electron Config" },
];

function ElementPicker({
  slot,
  selectedSymbol,
  onSelect,
  onClear,
}: {
  slot: 0 | 1;
  selectedSymbol: string | null;
  onSelect: (symbol: string) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const results = query
    ? ELEMENTS.filter(
        (e) =>
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.symbol.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 8)
    : [];

  const selected = selectedSymbol
    ? ELEMENTS.find((e) => e.symbol === selectedSymbol)
    : null;

  if (selected) {
    return (
      <div
        className={cn(
          "relative glass rounded-2xl p-6 text-center overflow-hidden bg-gradient-to-br",
          CATEGORY_GRADIENT[selected.category],
        )}
        data-ocid={`compare.slot_${slot + 1}_card`}
      >
        <div className="absolute inset-0 bg-black/40 rounded-2xl" />
        <button
          type="button"
          onClick={onClear}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full glass text-foreground/60 hover:text-foreground"
          data-ocid={`compare.clear_slot_${slot + 1}_button`}
          aria-label="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="relative z-10">
          <div className="text-xs text-foreground/60 mb-1">
            #{selected.atomicNumber}
          </div>
          <div className="font-display text-6xl font-bold text-foreground mb-1">
            {selected.symbol}
          </div>
          <div className="font-display text-xl font-semibold text-foreground/90">
            {selected.name}
          </div>
          <div className={cn("text-xs mt-2", CATEGORY_TEXT[selected.category])}>
            {CATEGORY_LABELS[selected.category]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="glass rounded-2xl p-4"
      data-ocid={`compare.slot_${slot + 1}_picker`}
    >
      <div className="text-sm text-muted-foreground mb-3 text-center">
        Select Element {slot + 1}
      </div>
      <input
        type="text"
        placeholder="Search element…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full glass rounded-xl px-4 py-2.5 text-sm bg-transparent outline-none border border-border/30 focus:border-accent/50 mb-2"
        data-ocid={`compare.slot_${slot + 1}_search_input`}
      />
      {results.length > 0 && (
        <div className="space-y-1">
          {results.map((el) => (
            <button
              type="button"
              key={el.symbol}
              onClick={() => {
                onSelect(el.symbol);
                setQuery("");
              }}
              className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-card/60 transition-all"
              data-ocid={`compare.slot_${slot + 1}_option.${el.atomicNumber}`}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold bg-gradient-to-br",
                  CATEGORY_GRADIENT[el.category],
                )}
              >
                {el.symbol}
              </div>
              <div>
                <div className="text-sm font-medium">{el.name}</div>
                <div className="text-xs text-muted-foreground">
                  #{el.atomicNumber}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {!query && (
        <div className="text-center text-muted-foreground text-xs py-8">
          Type to search 118 elements
        </div>
      )}
    </div>
  );
}

export function ComparePage() {
  const { compareElements, setCompareElement, clearCompare } = useChemStore();
  const [el1, el2] = useCompareElements();

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <GitCompare className="w-8 h-8 text-accent" />
        <div>
          <h1 className="font-display text-3xl font-bold">Compare Elements</h1>
          <p className="text-muted-foreground text-sm">
            Side-by-side element analysis
          </p>
        </div>
        {(compareElements[0] || compareElements[1]) && (
          <button
            type="button"
            onClick={clearCompare}
            className="ml-auto glass px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
            data-ocid="compare.clear_all_button"
          >
            Clear All
          </button>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <ElementPicker
          slot={0}
          selectedSymbol={compareElements[0]}
          onSelect={(s) => setCompareElement(0, s)}
          onClear={() => setCompareElement(0, null)}
        />
        <ElementPicker
          slot={1}
          selectedSymbol={compareElements[1]}
          onSelect={(s) => setCompareElement(1, s)}
          onClear={() => setCompareElement(1, null)}
        />
      </div>

      {el1 && el2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl overflow-hidden"
          data-ocid="compare.table"
        >
          <div className="grid grid-cols-3 border-b border-border/30">
            <div className="p-4 text-sm font-semibold text-muted-foreground">
              Property
            </div>
            <div
              className={cn(
                "p-4 text-center font-display font-bold text-lg",
                CATEGORY_TEXT[el1.category],
              )}
            >
              {el1.symbol}
            </div>
            <div
              className={cn(
                "p-4 text-center font-display font-bold text-lg",
                CATEGORY_TEXT[el2.category],
              )}
            >
              {el2.symbol}
            </div>
          </div>

          {COMPARE_PROPS.map((prop, i) => {
            const v1 = prop.fmt
              ? prop.fmt(el1[prop.key])
              : String(el1[prop.key]);
            const v2 = prop.fmt
              ? prop.fmt(el2[prop.key])
              : String(el2[prop.key]);
            const n1 = Number(el1[prop.key]);
            const n2 = Number(el2[prop.key]);
            const isNum =
              !Number.isNaN(n1) && !Number.isNaN(n2) && n1 > 0 && n2 > 0;
            const higher = isNum ? (n1 > n2 ? 0 : n1 < n2 ? 1 : -1) : -1;

            return (
              <div
                key={prop.key}
                className={cn(
                  "grid grid-cols-3 border-b border-border/20",
                  i % 2 === 0 ? "bg-card/20" : "",
                )}
              >
                <div className="p-3 text-xs text-muted-foreground">
                  {prop.label}
                </div>
                <div
                  className={cn(
                    "p-3 text-center text-sm font-mono",
                    higher === 0 ? "text-accent font-bold" : "text-foreground",
                  )}
                >
                  {v1}
                </div>
                <div
                  className={cn(
                    "p-3 text-center text-sm font-mono",
                    higher === 1 ? "text-accent font-bold" : "text-foreground",
                  )}
                >
                  {v2}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
