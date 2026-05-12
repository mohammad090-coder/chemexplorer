import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, A as Atom, F as FlaskConical, d as BookOpen } from "./index-DyyHqAHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode);
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-8 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "text-center mb-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-10 h-10 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold mb-3", children: "About ChemExplorer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "A premium, interactive chemistry platform for exploring all 118 elements with beautiful animations and rich data." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [
      {
        icon: FlaskConical,
        title: "Complete Element Database",
        desc: "All 118 elements with 15+ properties each, including atomic mass, electronegativity, ionization energy, electron configurations, real-world uses, and fascinating facts."
      },
      {
        icon: Atom,
        title: "Animated Atom Models",
        desc: "Each element detail page features a live animated model showing electron shells orbiting the nucleus, bringing chemistry to life visually."
      },
      {
        icon: Globe,
        title: "Interactive Periodic Table",
        desc: "A complete, responsive periodic table with color-coded categories, real-time search, category filters, and smooth hover animations."
      },
      {
        icon: BookOpen,
        title: "Built with Modern Tech",
        desc: "React 19, TypeScript, Tailwind CSS, Framer Motion, TanStack Router, Zustand — all running on the Internet Computer blockchain for decentralized hosting."
      }
    ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        className: "glass rounded-2xl p-6 flex gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-6 h-6 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mb-1", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.desc })
          ] })
        ]
      },
      item.title
    )) })
  ] });
}
export {
  AboutPage
};
