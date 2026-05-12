import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Layers,
  Star,
  TestTube2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FlashcardsTab } from "../components/smart/FlashcardsTab";
import { ImportantReactionsTab } from "../components/smart/ImportantReactionsTab";
import { JeeNeetHubTab } from "../components/smart/JeeNeetHubTab";
import { NamedReactionsTab } from "../components/smart/NamedReactionsTab";
import { NotesTab } from "../components/smart/NotesTab";
import { PeriodicTrendsTab } from "../components/smart/PeriodicTrendsTab";
import { ReactionMechanismTab } from "../components/smart/ReactionMechanismTab";
import { RevisionCardsTab } from "../components/smart/RevisionCardsTab";

const TABS = [
  {
    id: "trends",
    label: "Periodic Trends",
    icon: TrendingUp,
    color: "oklch(0.68 0.16 258)",
  },
  {
    id: "reactions",
    label: "Important Reactions",
    icon: FlaskConical,
    color: "oklch(0.7 0.21 140)",
  },
  {
    id: "named",
    label: "Named Reactions",
    icon: TestTube2,
    color: "oklch(0.72 0.25 50)",
  },
  {
    id: "cards",
    label: "Revision Cards",
    icon: BookOpen,
    color: "oklch(0.68 0.18 280)",
  },
  {
    id: "jeeneet",
    label: "JEE/NEET Hub",
    icon: Star,
    color: "oklch(0.82 0.18 85)",
  },
  {
    id: "flashcards",
    label: "Flashcards",
    icon: Layers,
    color: "oklch(0.72 0.22 30)",
  },
  {
    id: "notes",
    label: "Notes",
    icon: GraduationCap,
    color: "oklch(0.7 0.2 330)",
  },
  {
    id: "mechanisms",
    label: "Mechanisms",
    icon: Zap,
    color: "oklch(0.68 0.22 185)",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function SmartFeaturesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("trends");

  return (
    <div className="min-h-screen px-4 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Smart Chemistry
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Class 11 &amp; 12 — Periodic trends, industrial reactions, organic
          named reactions, rapid revision cards, JEE/NEET exam hub, flashcards,
          study notes, and animated reaction mechanisms.
        </p>
      </motion.div>

      {/* Tab Bar */}
      <style>{".smart-tab-bar::-webkit-scrollbar { display: none; }"}</style>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="smart-tab-bar relative flex gap-1 p-1 rounded-2xl mb-8"
        style={
          {
            background: "oklch(0.18 0.02 250 / 0.6)",
            backdropFilter: "blur(20px)",
            overflowX: "auto",
            scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"],
            msOverflowStyle: "none",
          } as React.CSSProperties
        }
        data-ocid="smart.tab_bar"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-ocid={`smart.tab.${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="relative flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-colors duration-200 z-10"
              style={{
                color: isActive ? "oklch(0.96 0 0)" : "oklch(0.58 0 0)",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `${tab.color}33`,
                    border: `1px solid ${tab.color}55`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className="w-4 h-4 relative z-10 flex-shrink-0"
                style={{ color: isActive ? tab.color : undefined }}
              />
              <span className="relative z-10 whitespace-nowrap">
                {tab.label}
              </span>
              {/* Highlight badge for JEE/NEET tab */}
              {tab.id === "jeeneet" && !isActive && (
                <span
                  className="relative z-10 ml-0.5 text-xs px-1 py-0.5 rounded-md font-bold"
                  style={{
                    background: "oklch(0.82 0.18 85 / 0.2)",
                    color: "oklch(0.82 0.18 85)",
                    fontSize: "0.6rem",
                  }}
                >
                  NEW
                </span>
              )}
              {/* Highlight badge for Mechanisms tab */}
              {tab.id === "mechanisms" && !isActive && (
                <span
                  className="relative z-10 ml-0.5 text-xs px-1 py-0.5 rounded-md font-bold"
                  style={{
                    background: "oklch(0.68 0.22 185 / 0.2)",
                    color: "oklch(0.68 0.22 185)",
                    fontSize: "0.6rem",
                  }}
                >
                  NEW
                </span>
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "trends" && <PeriodicTrendsTab />}
          {activeTab === "reactions" && <ImportantReactionsTab />}
          {activeTab === "named" && <NamedReactionsTab />}
          {activeTab === "cards" && <RevisionCardsTab />}
          {activeTab === "jeeneet" && <JeeNeetHubTab />}
          {activeTab === "flashcards" && <FlashcardsTab />}
          {activeTab === "notes" && <NotesTab />}
          {activeTab === "mechanisms" && <ReactionMechanismTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
