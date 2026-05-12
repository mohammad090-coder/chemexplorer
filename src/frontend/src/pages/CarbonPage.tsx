import { cn } from "@/lib/utils";
import { Atom } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useState } from "react";
import { CarbonAllotropes } from "./carbon/CarbonAllotropes";
import {
  CarbonFunctionalGroups,
  CarbonHybridization,
  CarbonIsomerism,
  CarbonOrganicBasics,
} from "./carbon/CarbonChemistry";
import { CarbonReactions } from "./carbon/CarbonReactions";
import { CarbonRealLife, CarbonRevision } from "./carbon/CarbonRealLife";

type TabId =
  | "allotropes"
  | "hybridization"
  | "organic"
  | "functional"
  | "isomerism"
  | "reactions"
  | "reallife"
  | "revision";

const TABS: { id: TabId; label: string; short: string }[] = [
  { id: "allotropes", label: "Allotropes", short: "Allotropes" },
  { id: "hybridization", label: "Hybridization", short: "Hybrid." },
  { id: "organic", label: "Organic Series", short: "Organic" },
  { id: "functional", label: "Functional Groups", short: "F. Groups" },
  { id: "isomerism", label: "Isomerism", short: "Isomers" },
  { id: "reactions", label: "Reactions", short: "Rxns" },
  { id: "reallife", label: "Real-Life Uses", short: "Real Life" },
  { id: "revision", label: "Quick Revision", short: "Revision" },
];

export const CarbonPage = memo(function CarbonPage() {
  const [activeTab, setActiveTab] = useState<TabId>("allotropes");

  return (
    <div className="min-h-screen px-4 py-10" data-ocid="carbon.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-8 max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-4"
        >
          <Atom className="w-4 h-4 text-foreground/70" />
          <span className="font-mono">
            C · Atomic Number 6 · Interactive 3D
          </span>
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground/90 via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
          The Many Faces of Carbon
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Carbon forms more compounds than any other element. Explore
          interactive 3D allotropes, hybridization, organic chemistry,
          reactions, and real-world applications.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto mb-8">
        <div
          className="glass-carbon rounded-2xl p-1.5 overflow-x-auto"
          role="tablist"
          aria-label="Carbon chemistry sections"
          data-ocid="carbon.section_tabs"
        >
          <div className="flex gap-1 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center relative">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/20",
                )}
                data-ocid={`carbon.tab.${tab.id}`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="carbon-tab-pill"
                    className="absolute inset-0 bg-card/60 rounded-xl border border-border/20 shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  <span className="sm:hidden">{tab.short}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content with AnimatePresence crossfade */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            data-ocid={`carbon.section.${activeTab}`}
          >
            {activeTab === "allotropes" && <CarbonAllotropes />}
            {activeTab === "hybridization" && <CarbonHybridization />}
            {activeTab === "organic" && <CarbonOrganicBasics />}
            {activeTab === "functional" && <CarbonFunctionalGroups />}
            {activeTab === "isomerism" && <CarbonIsomerism />}
            {activeTab === "reactions" && <CarbonReactions />}
            {activeTab === "reallife" && <CarbonRealLife />}
            {activeTab === "revision" && <CarbonRevision />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});
