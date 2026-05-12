import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useState } from "react";

// ── Real-Life Uses ────────────────────────────────────────────────────────────
const REAL_LIFE_USES = [
  {
    category: "⛽ Carbon in Fuels",
    color: "from-orange-400/20 to-red-400/20",
    border: "border-orange-400/30",
    accent: "text-orange-300",
    items: [
      {
        title: "Natural Gas (Methane)",
        detail:
          "CH₄ — cleanest burning fossil fuel. Used for heating, cooking, power generation. ΔH combustion = −890 kJ/mol. Extracted from underground reservoirs and as landfill biogas.",
      },
      {
        title: "Petroleum/Crude Oil",
        detail:
          "Complex mixture of alkanes (C₅–C₂₅). Fractional distillation separates: petroleum gas, petrol, kerosene, diesel, fuel oil, lubricants, bitumen. Global energy backbone.",
      },
      {
        title: "Coal",
        detail:
          "Mainly carbon + hydrocarbons. Anthracite (94% C), bituminous coal, lignite. Used in power plants, steel-making (coke). Carbon cycle concern: releases CO₂ stored for millions of years.",
      },
      {
        title: "Biofuels",
        detail:
          "Ethanol from fermentation of sugars (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂). Biodiesel from esterification of vegetable oils. Carbon-neutral in theory — CO₂ fixed by next crop.",
      },
    ],
  },
  {
    category: "🧬 Carbon in Biology",
    color: "from-green-400/20 to-teal-400/20",
    border: "border-green-400/30",
    accent: "text-green-300",
    items: [
      {
        title: "Organic Molecules of Life",
        detail:
          "All biomolecules are carbon-based: carbohydrates, proteins, lipids, nucleic acids. Carbon's tetravalency and ability to form chains makes molecular diversity possible — >10 million known compounds.",
      },
      {
        title: "DNA and RNA",
        detail:
          "Deoxyribose (C₅H₁₀O₄) and ribose sugars form the backbone. Nitrogen bases (adenine, guanine, etc.) contain aromatic carbon rings. DNA is the most information-dense carbon compound known.",
      },
      {
        title: "Proteins and Enzymes",
        detail:
          "Amino acids (H₂N-CHR-COOH) — carbon with both amine and acid groups. Peptide bonds (C-N) link them. Enzymes catalyse reactions at rate 10⁶–10¹² times faster than uncatalysed.",
      },
      {
        title: "Carbohydrates",
        detail:
          "CₙH₂ₙOₙ general formula. Glucose (C₆H₁₂O₆) — primary cellular fuel. Starch and cellulose are both (C₆H₁₀O₅)ₙ polymers but differ in glycosidic linkage — α vs β.",
      },
    ],
  },
  {
    category: "🔩 Carbon in Materials",
    color: "from-sky-400/20 to-indigo-400/20",
    border: "border-sky-400/30",
    accent: "text-sky-300",
    items: [
      {
        title: "Carbon Fibre",
        detail:
          "Graphite-like sheets aligned in fibres. 5× stronger than steel, 2× stiffer, ¼ the weight. Used in aircraft, F1 cars, bicycles, sports equipment. Produced by pyrolysis of PAN (polyacrylonitrile).",
      },
      {
        title: "Graphene Electronics",
        detail:
          "Single atom layer — electron mobility 200,000 cm²/Vs (100× silicon). Transparent yet conducts well. Potential for flexible displays, ultrafast transistors, biosensors, water filters.",
      },
      {
        title: "Diamond Tools",
        detail:
          "Industrial diamond powder (synthetic or mined) coats cutting/grinding tools. Mohs 10 — scratches everything. Diamond-tipped drill bits used in oil exploration and precision machining.",
      },
      {
        title: "Activated Carbon",
        detail:
          "Highly porous charcoal (surface area 500–1500 m²/g). Adsorbs toxins, gases, contaminants. Used in water purifiers, air filters, emergency poison treatment, and gold extraction.",
      },
      {
        title: "Carbon Nanotubes",
        detail:
          "Rolled graphene sheets — diameter 1 nm. Tensile strength 100× steel. Thermal conductivity > diamond. Applications: nano-electronics, drug delivery, high-strength composites.",
      },
      {
        title: "Fullerene C₆₀ in Medicine",
        detail:
          "Buckminsterfullerene — drug delivery cage, free radical scavenger. Research in HIV protease inhibition, targeted cancer therapy, and neuroprotection. Explored as hydrogen storage medium.",
      },
    ],
  },
];

// ── Quick Revision ────────────────────────────────────────────────────────────
const FORMULAS = [
  {
    label: "Alkane",
    formula: "CₙH₂ₙ₊₂",
    note: "Max H; no double/triple bonds",
    color: "text-orange-300",
  },
  {
    label: "Alkene",
    formula: "CₙH₂ₙ",
    note: "One C=C double bond",
    color: "text-green-300",
  },
  {
    label: "Alkyne",
    formula: "CₙH₂ₙ₋₂",
    note: "One C≡C triple bond",
    color: "text-violet-300",
  },
  {
    label: "Cycloalkane",
    formula: "CₙH₂ₙ",
    note: "Ring; same as alkene — isomers",
    color: "text-sky-300",
  },
  {
    label: "Benzene",
    formula: "C₆H₆",
    note: "Aromatic; (CₙH₂ₙ₋₆) general",
    color: "text-purple-300",
  },
  {
    label: "Alcohol",
    formula: "CₙH₂ₙ₊₂O",
    note: "Contains –OH group",
    color: "text-blue-300",
  },
  {
    label: "Carboxylic Acid",
    formula: "CₙH₂ₙO₂",
    note: "Contains –COOH group",
    color: "text-red-300",
  },
  {
    label: "Aldehyde",
    formula: "CₙH₂ₙO",
    note: "Contains –CHO group",
    color: "text-yellow-300",
  },
];

const IMPORTANT_POINTS = [
  {
    emoji: "🎯",
    title: "Markovnikov's Rule",
    text: "In electrophilic addition to alkenes, H adds to C with more H; halogen (or other group) to C with fewer H (more substituted C).",
  },
  {
    emoji: "🔄",
    title: "Anti-Markovnikov (Peroxide)",
    text: "In presence of peroxide, HBr adds via free-radical mechanism — reversal of Markovnikov. Only for HBr (not HCl or HI).",
  },
  {
    emoji: "⚡",
    title: "Saytzeff's Rule",
    text: "In elimination reactions, the more substituted (more stable) alkene is the major product. More alkyl groups = more stable alkene.",
  },
  {
    emoji: "🔬",
    title: "SN1 vs SN2",
    text: "SN2: primary halides + strong nucleophile + polar aprotic. SN1: tertiary halides + weak nucleophile + polar protic. Order: CH₃X > 1° for SN2; 3° > 2° for SN1.",
  },
  {
    emoji: "💡",
    title: "sp³ vs sp² vs sp",
    text: "sp³: tetrahedral (109.5°), all σ bonds, alkanes/diamond. sp²: trigonal planar (120°), one π bond, alkenes/graphene. sp: linear (180°), two π bonds, alkynes/CO₂.",
  },
  {
    emoji: "🧪",
    title: "Test for Aldehyde vs Ketone",
    text: "Tollens' (silver mirror) and Fehling's (brick-red ppt) are positive for aldehydes, negative for ketones. Iodoform (+) for CH₃CO– (methyl ketones) and ethanol.",
  },
  {
    emoji: "🔗",
    title: "Peptide Bond",
    text: "–CO–NH– linkage between amino acids. Formed by condensation (loss of H₂O). 'C-terminal' and 'N-terminal' describe protein chain directionality.",
  },
  {
    emoji: "⚗️",
    title: "Combustion Degree Rule",
    text: "Degree of unsaturation (DBE) = (2C + 2 + N – H – X) / 2. Each ring or double bond = 1 DBE; triple bond = 2 DBE.",
  },
  {
    emoji: "🌡️",
    title: "Boiling Point Trends",
    text: "Branching lowers BP (less surface area). OH/COOH raise BP dramatically (H-bonding). Homologous series: BP rises ~30°C per CH₂.",
  },
  {
    emoji: "📝",
    title: "JEE Key: Isomers of C₄H₁₀",
    text: "n-Butane (straight) and isobutane/2-methylpropane (branched) are the only two chain isomers. Isobutane has lower BP (−11.7°C vs −0.5°C).",
  },
];

const NAMED_REACTIONS_SUMMARY = [
  {
    name: "Aldol",
    from: "Aldehyde/ketone with α-H",
    to: "β-hydroxy carbonyl (aldol product)",
    catalyst: "Dil. NaOH",
  },
  {
    name: "Cannizzaro",
    from: "Aldehyde without α-H (e.g. HCHO)",
    to: "Salt of acid + alcohol",
    catalyst: "Conc. NaOH",
  },
  {
    name: "Grignard",
    from: "RX + Mg + carbonyl",
    to: "Alcohol (1°, 2°, or 3°)",
    catalyst: "Dry ether, Mg",
  },
  {
    name: "Esterification",
    from: "RCOOH + R'OH",
    to: "RCOOR' + H₂O",
    catalyst: "H₂SO₄, heat",
  },
  {
    name: "Ozonolysis",
    from: "Alkene + O₃",
    to: "2 Aldehydes (reductive) or Acids (oxidative)",
    catalyst: "O₃, then Zn/H₂O or H₂O₂",
  },
  {
    name: "Wittig",
    from: "Carbonyl + ylide",
    to: "Alkene + Ph₃P=O",
    catalyst: "Base + Ph₃P=CR₂",
  },
  {
    name: "Diels-Alder",
    from: "Diene + dienophile",
    to: "6-membered ring",
    catalyst: "Heat, [4+2]",
  },
  {
    name: "Sandmeyer",
    from: "ArN₂⁺ + CuX",
    to: "Aryl halide / nitrile",
    catalyst: "CuCl/CuBr/CuCN",
  },
];

function ExpandableRealLifeCard({
  category,
  color,
  border,
  accent,
  items,
  index,
}: (typeof REAL_LIFE_USES)[number] & { index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
      whileHover={{ y: -2 }}
      className={cn(
        "glass-carbon rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow",
        border,
      )}
      data-ocid={`carbon.reallife.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-card/20 transition-colors"
        aria-expanded={open}
      >
        <span className={cn("font-display font-bold text-base", accent)}>
          {category}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "border-t border-border/20 px-5 py-4 bg-gradient-to-br to-transparent space-y-3",
              color,
            )}
          >
            {items.map((item, ii) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ii * 0.07 }}
                className="glass-carbon rounded-xl p-3"
              >
                <div className={cn("font-semibold text-sm mb-1", accent)}>
                  {item.title}
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const CarbonRealLife = memo(function CarbonRealLife() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
      data-ocid="carbon.reallife_section"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold mb-2">
          Carbon in the Real World
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          From the fuels that power civilisation to the molecules of life —
          carbon is everywhere.
        </p>
      </div>
      <div className="space-y-3">
        {REAL_LIFE_USES.map((cat, i) => (
          <ExpandableRealLifeCard key={cat.category} {...cat} index={i} />
        ))}
      </div>
    </motion.div>
  );
});

export const CarbonRevision = memo(function CarbonRevision() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
      data-ocid="carbon.revision_section"
    >
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">
          ⚡ Quick Revision
        </h2>
        <p className="text-muted-foreground text-sm">
          JEE/NEET flashcards — key formulas, rules, and named reactions at a
          glance.
        </p>
      </div>

      {/* General Formulas */}
      <div>
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
          General Formulae
        </h3>
        <div className="flex flex-wrap gap-2">
          {FORMULAS.map((f) => (
            <div
              key={f.label}
              className="glass-carbon rounded-xl px-4 py-3 flex-shrink-0"
              data-ocid={`carbon.revision.formula.${f.label.toLowerCase().replace(/\s+/g, "_")}`}
            >
              <div className={cn("font-mono text-lg font-bold", f.color)}>
                {f.formula}
              </div>
              <div className="text-xs font-semibold">{f.label}</div>
              <div className="text-xs text-muted-foreground">{f.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Points */}
      <div>
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
          JEE / NEET Key Points
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {IMPORTANT_POINTS.map((pt, i) => (
            <motion.div
              key={pt.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-carbon rounded-xl p-3"
              data-ocid={`carbon.revision.point.${i + 1}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{pt.emoji}</span>
                <span className="font-semibold text-sm">{pt.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {pt.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Named Reactions Quick Table */}
      <div>
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
          Named Reactions Quick Reference
        </h3>
        <div
          className="glass-carbon rounded-2xl overflow-hidden"
          data-ocid="carbon.revision.named_reactions"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/20">
                  {[
                    "Reaction",
                    "Reactants",
                    "Products",
                    "Catalyst/Conditions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {NAMED_REACTIONS_SUMMARY.map((r, i) => (
                  <tr
                    key={r.name}
                    className="border-b border-border/10 hover:bg-card/20 transition-colors"
                    data-ocid={`carbon.revision.reaction.${i + 1}`}
                  >
                    <td className="px-4 py-2.5 font-semibold text-foreground">
                      {r.name}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.from}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.to}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {r.catalyst}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
