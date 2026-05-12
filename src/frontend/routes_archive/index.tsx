import { ELEMENTS } from "@/lib/elements-data";
import { CATEGORY_GRADIENT, CATEGORY_TEXT } from "@/types/element";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Atom, FlaskConical, Star, Zap } from "lucide-react";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

const FEATURED_SYMBOLS = ["Au", "C", "Fe", "O", "Ne", "U", "Ag", "He"];
const STATS = [
  { label: "Elements", value: "118", icon: Atom },
  { label: "Categories", value: "10", icon: FlaskConical },
  { label: "Properties", value: "15+", icon: Zap },
  { label: "Facts", value: "300+", icon: Star },
];

function HomePage() {
  const navigate = useNavigate();
  const featured = FEATURED_SYMBOLS.map(
    (s) => ELEMENTS.find((e) => e.symbol === s)!,
  ).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground mb-6"
          >
            <Atom className="w-4 h-4 text-accent" />
            <span>All 118 elements • Interactive & Animated</span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl font-bold bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight mb-6">
            Explore the
            <br />
            Periodic Table
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover every element with rich properties, animated atom models,
            interactive visualizations, and fascinating science — all in a
            stunning glass interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ to: "/periodic-table" })}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
              data-ocid="hero.periodic_table_button"
            >
              Open Periodic Table
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ to: "/search" })}
              className="inline-flex items-center gap-2 glass px-8 py-4 rounded-full font-semibold text-base hover:bg-card/60 transition-all duration-300"
              data-ocid="hero.search_button"
            >
              <FlaskConical className="w-5 h-5 text-accent" />
              Search Elements
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-3xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Elements */}
      <section className="py-20 px-4" data-ocid="home.featured_section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Featured Elements
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover some of the most fascinating elements in the universe
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featured.map((el, i) => (
              <motion.button
                key={el.symbol}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  navigate({
                    to: "/element/$symbol",
                    params: { symbol: el.symbol },
                  })
                }
                className={`group relative glass rounded-2xl p-5 text-left overflow-hidden transition-all duration-300 hover:shadow-xl ${CATEGORY_GRADIENT[el.category]}`}
                data-ocid={`home.featured_element.${i + 1}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-2xl" />
                <div className="relative z-10">
                  <div className="text-xs text-foreground/70 mb-1">
                    #{el.atomicNumber}
                  </div>
                  <div className="text-4xl font-display font-bold text-foreground mb-1">
                    {el.symbol}
                  </div>
                  <div className="text-sm font-medium text-foreground/90">
                    {el.name}
                  </div>
                  <div
                    className={`text-xs mt-2 ${CATEGORY_TEXT[el.category]} capitalize`}
                  >
                    {el.category.replace(/-/g, " ")}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              type="button"
              onClick={() => navigate({ to: "/periodic-table" })}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
              data-ocid="home.view_all_button"
            >
              View All 118 Elements
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center mb-12"
          >
            Everything you need
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Atom,
                title: "Animated Atom Models",
                desc: "Watch electrons orbit in real-time 3D-like animations for every element.",
              },
              {
                icon: FlaskConical,
                title: "Rich Properties",
                desc: "Atomic mass, electronegativity, ionization energy, electron config, and 10+ more.",
              },
              {
                icon: Star,
                title: "Favorites & History",
                desc: "Save your favorite elements and pick up right where you left off.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <f.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
