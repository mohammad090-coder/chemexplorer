import { useNavigate } from "@tanstack/react-router";
import { Atom, Brain, Diamond, FlaskConical, TestTube, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

const TOUR_STORAGE_KEY = "chem-explorer-tour-done";

interface TourStep {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  ctaLabel?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    icon: <Atom className="w-10 h-10 text-blue-400" />,
    title: "Periodic Table",
    description:
      "Explore all 118 elements with interactive details, 3D atomic structures, and state-change simulation. Hover any element to see its properties instantly.",
    to: "/periodic-table",
  },
  {
    step: 2,
    icon: <TestTube className="w-10 h-10 text-lime-400" />,
    title: "Virtual Lab",
    description:
      "Run real chemistry experiments with realistic animations — titrations, electrolysis, flame tests, and more. Watch reactions unfold step by step.",
    to: "/virtual-lab",
  },
  {
    step: 3,
    icon: <FlaskConical className="w-10 h-10 text-emerald-400" />,
    title: "Reaction Simulator",
    description:
      "Type any chemical equation and get it balanced, explained, and animated with our database of 200+ reactions. See bonds break and form in real time.",
    to: "/reaction-lab",
  },
  {
    step: 4,
    icon: <Diamond className="w-10 h-10 text-slate-300" />,
    title: "Carbon Explorer",
    description:
      "Dive deep into carbon chemistry: allotropes in 3D, organic basics, hybridization (sp, sp², sp³), and 100+ carbon reactions with search and filter.",
    to: "/carbon",
  },
  {
    step: 5,
    icon: <Brain className="w-10 h-10 text-rose-400" />,
    title: "Practice Mode",
    description:
      "Test yourself with 300+ questions: MCQ, assertion-reason, numericals — with instant feedback and detailed explanations to reinforce every concept.",
    to: "/practice",
    ctaLabel: "Start Practice",
  },
];

interface GuidedTourProps {
  active: boolean;
  onClose: () => void;
}

export const GuidedTour = memo(function GuidedTour({
  active,
  onClose,
}: GuidedTourProps) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const isMounted = useRef(false);

  const step = TOUR_STEPS[stepIndex];
  const isLast = stepIndex === TOUR_STEPS.length - 1;

  useEffect(() => {
    if (active) {
      setStepIndex(0);
      isMounted.current = true;
    }
  }, [active]);

  const handleNext = useCallback(() => {
    if (!step) return;
    navigate({ to: step.to as Parameters<typeof navigate>[0]["to"] });
    if (isLast) {
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
      onClose();
    } else {
      setStepIndex((i) => i + 1);
    }
  }, [step, isLast, navigate, onClose]);

  const handleSkip = useCallback(() => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    onClose();
  }, [onClose]);

  if (!step) return null;

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Backdrop */}
          <motion.div
            key="tour-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
            onClick={handleSkip}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key={`tour-step-${stepIndex}`}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9991] w-full max-w-md px-4"
            aria-modal="true"
            aria-label={`Tour step ${stepIndex + 1} of ${TOUR_STEPS.length}`}
            data-ocid="guided_tour.dialog"
          >
            <div className="rounded-3xl border border-white/10 bg-background/90 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Header gradient accent */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

              <div className="p-8">
                {/* Close */}
                <button
                  type="button"
                  onClick={handleSkip}
                  className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Skip tour"
                  data-ocid="guided_tour.close_button"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Step badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground mb-6">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                    {stepIndex + 1}
                  </span>
                  Step {stepIndex + 1} of {TOUR_STEPS.length}
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    {step.icon}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {step.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {step.description}
                </p>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {TOUR_STEPS.map((_, i) => (
                    <div
                      key={TOUR_STEPS[i].step}
                      className={[
                        "rounded-full transition-all duration-300",
                        i === stepIndex
                          ? "w-6 h-2 bg-primary"
                          : i < stepIndex
                            ? "w-2 h-2 bg-primary/50"
                            : "w-2 h-2 bg-white/20",
                      ].join(" ")}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    data-ocid="guided_tour.cancel_button"
                  >
                    Skip Tour
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow duration-300"
                    data-ocid="guided_tour.confirm_button"
                  >
                    {step.ctaLabel ?? "Next →"}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export function useTourAutoShow(): {
  tourActive: boolean;
  startTour: () => void;
  closeTour: () => void;
} {
  const [tourActive, setTourActive] = useState(false);

  const startTour = useCallback(() => setTourActive(true), []);
  const closeTour = useCallback(() => setTourActive(false), []);

  return { tourActive, startTour, closeTour };
}
