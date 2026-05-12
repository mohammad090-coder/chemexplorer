import { CommandPalette } from "@/components/CommandPalette";
import { ExploreNowSystem } from "@/components/ExploreNowSystem";
import { GuidedTour } from "@/components/GuidedTour";
import { Toaster } from "@/components/ui/sonner";
import { useChemStore } from "@/store/useChemStore";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { CursorGlow } from "./CursorGlow";
import { Dock } from "./Dock";
import { AchievementToast, GamificationBadge } from "./GamificationBadge";
import { Navbar } from "./Navbar";
import { ParticleBackground } from "./ParticleBackground";
import { QuickNotesFAB, QuickNotesPanel } from "./QuickNotesPanel";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const noteCount = useChemStore((s) => s.quickNotes.length);
  const unlockAchievement = useChemStore((s) => s.unlockAchievement);
  const achievements = useChemStore((s) => s.gamification.achievements);
  const tourActive = useChemStore((s) => s.tourActive);
  const closeTour = useChemStore((s) => s.closeTour);
  const firstStepGranted = useRef(false);

  // Grant "First Step" achievement on first visit (once)
  useEffect(() => {
    if (firstStepGranted.current) return;
    const a = achievements.find((x) => x.id === "first-step");
    if (!a?.unlockedAt) {
      firstStepGranted.current = true;
      unlockAchievement("first-step");
    }
  }, [achievements, unlockAchievement]);

  // Global "/" keyboard shortcut → open command palette
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea" ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      if (e.key === "/") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ParticleBackground />
      <Navbar />

      {/* Gamification badge — fixed top-right */}
      <div
        className="fixed top-3 right-4 z-[100]"
        data-ocid="gamification.badge_container"
      >
        <GamificationBadge />
      </div>

      <main
        className="flex-1"
        style={{
          paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {children}
      </main>

      {/* Bottom Dock */}
      <Dock />

      {/* Quick Notes FAB + Panel */}
      <QuickNotesFAB onClick={() => setNotesOpen(true)} noteCount={noteCount} />
      <QuickNotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />

      {/* Achievement unlock toast */}
      <AchievementToast />

      {/* Command Palette (press "/" anywhere) */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />

      {/* Guided Tour */}
      <GuidedTour active={tourActive} onClose={closeTour} />

      {/* Explore Now Guided Navigation System */}
      <ExploreNowSystem />

      <Toaster />

      {/* Cursor glow — desktop only, disabled on touch */}
      <CursorGlow />
    </div>
  );
}
