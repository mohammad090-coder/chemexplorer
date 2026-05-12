import { Atom, BookOpen, FlaskConical, Globe } from "lucide-react";
import { motion } from "motion/react";

export function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
          <Atom className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-4xl font-bold mb-3">
          About ChemExplorer
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          A premium, interactive chemistry platform for exploring all 118
          elements with beautiful animations and rich data.
        </p>
      </motion.div>

      <div className="space-y-6">
        {[
          {
            icon: FlaskConical,
            title: "Complete Element Database",
            desc: "All 118 elements with 15+ properties each, including atomic mass, electronegativity, ionization energy, electron configurations, real-world uses, and fascinating facts.",
          },
          {
            icon: Atom,
            title: "Animated Atom Models",
            desc: "Each element detail page features a live animated model showing electron shells orbiting the nucleus, bringing chemistry to life visually.",
          },
          {
            icon: Globe,
            title: "Interactive Periodic Table",
            desc: "A complete, responsive periodic table with color-coded categories, real-time search, category filters, and smooth hover animations.",
          },
          {
            icon: BookOpen,
            title: "Built with Modern Tech",
            desc: "React 19, TypeScript, Tailwind CSS, Framer Motion, TanStack Router, Zustand — all running on the Internet Computer blockchain for decentralized hosting.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 flex gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
