import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  routeKey?: string;
}

// GPU-safe transitions: only transform + opacity — no filter/blur on the page wrapper.
// blur(8px) on the full page forces a compositing layer re-paint on every frame,
// causing 200–500ms lag when navigating to heavy pages like the Periodic Table.
export function PageTransition({ children, routeKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
