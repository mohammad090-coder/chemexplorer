import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useState } from "react";

// ── Hybridization ────────────────────────────────────────────────────────────
const HYBRIDIZATIONS = [
  {
    type: "sp³",
    color: "from-sky-400/20 to-indigo-500/20",
    border: "border-sky-400/30",
    accent: "text-sky-300",
    glow: "oklch(0.72 0.22 220 / 0.3)",
    geometry: "Tetrahedral",
    angle: "109.5°",
    orbital: "One s + three p orbitals mix",
    examples: ["Methane (CH₄)", "Ethane (C₂H₆)", "Diamond lattice"],
    structure: "H₃C — C bonds pointing to 4 corners of a tetrahedron",
    realWorld: "Diamond hardness, saturated hydrocarbons, polymers",
    detail:
      "All four bonds are equivalent σ bonds. No free π electrons — this is why diamond is an insulator. Alkanes (CₙH₂ₙ₊₂) are all sp³ hybridised.",
  },
  {
    type: "sp²",
    color: "from-teal-400/20 to-cyan-500/20",
    border: "border-teal-400/30",
    accent: "text-teal-300",
    glow: "oklch(0.72 0.25 190 / 0.3)",
    geometry: "Trigonal Planar",
    angle: "120°",
    orbital: "One s + two p orbitals mix; one p remains unhybridised",
    examples: ["Ethene (C₂H₄)", "Benzene (C₆H₆)", "Graphene layer"],
    structure: "Three σ bonds in a plane + one π bond perpendicular",
    realWorld: "Graphene conductivity, alkenes, aromatic rings, polymers",
    detail:
      "The unhybridised p orbital forms the π bond. Graphene's delocalised π electrons make it an exceptional conductor. Alkenes (CₙH₂ₙ) are sp² hybridised.",
  },
  {
    type: "sp",
    color: "from-violet-400/20 to-purple-500/20",
    border: "border-violet-400/30",
    accent: "text-violet-300",
    glow: "oklch(0.65 0.22 290 / 0.3)",
    geometry: "Linear",
    angle: "180°",
    orbital: "One s + one p mix; two p orbitals remain unhybridised",
    examples: [
      "Ethyne (C₂H₂ / acetylene)",
      "Carbon dioxide (CO₂)",
      "Nitriles (R-C≡N)",
    ],
    structure: "Two σ bonds + two π bonds → triple bond total",
    realWorld: "Oxy-acetylene welding (3500°C flame), organic synthesis",
    detail:
      "Two unhybridised p orbitals form two perpendicular π bonds, giving a triple bond. Alkynes (CₙH₂ₙ₋₂) are sp hybridised. CO₂ is linear for the same reason.",
  },
];

// ── Organic Homologous Series ────────────────────────────────────────────────
const ORGANIC_SERIES = [
  {
    name: "Alkanes",
    formula: "CₙH₂ₙ₊₂",
    bond: "Single C-C bond (σ only)",
    color: "from-orange-400/20 to-amber-400/20",
    border: "border-orange-400/30",
    accent: "text-orange-300",
    members: [
      {
        name: "Methane",
        formula: "CH₄",
        use: "Natural gas fuel, greenhouse gas",
      },
      {
        name: "Ethane",
        formula: "C₂H₆",
        use: "Refrigerant, petrochemical feedstock",
      },
      {
        name: "Propane",
        formula: "C₃H₈",
        use: "LPG cooking gas, camping fuel",
      },
      {
        name: "Butane",
        formula: "C₄H₁₀",
        use: "Lighter fuel, aerosol propellant",
      },
    ],
    properties: "Non-polar, insoluble in water, low reactivity, good fuels",
    reactions: "Combustion, halogenation (free radical), cracking",
  },
  {
    name: "Alkenes",
    formula: "CₙH₂ₙ",
    bond: "C=C double bond (σ + π)",
    color: "from-green-400/20 to-emerald-400/20",
    border: "border-green-400/30",
    accent: "text-green-300",
    members: [
      {
        name: "Ethene",
        formula: "C₂H₄",
        use: "Polyethylene (plastic bags), fruit ripening hormone",
      },
      {
        name: "Propene",
        formula: "C₃H₆",
        use: "Polypropylene, acetone production",
      },
      {
        name: "But-1-ene",
        formula: "C₄H₈",
        use: "Synthetic rubber, fuel additive",
      },
      { name: "But-2-ene", formula: "C₄H₈", use: "Shows cis-trans isomerism" },
    ],
    properties: "More reactive than alkanes, electrophilic addition reactions",
    reactions:
      "Hydrogenation, halogenation, hydration (→ alcohol), polymerization",
  },
  {
    name: "Alkynes",
    formula: "CₙH₂ₙ₋₂",
    bond: "C≡C triple bond (σ + 2π)",
    color: "from-violet-400/20 to-purple-400/20",
    border: "border-violet-400/30",
    accent: "text-violet-300",
    members: [
      {
        name: "Ethyne (Acetylene)",
        formula: "C₂H₂",
        use: "Oxy-acetylene welding, organic synthesis",
      },
      {
        name: "Propyne",
        formula: "C₃H₄",
        use: "Specialty fuel, chemical intermediate",
      },
      {
        name: "But-1-yne",
        formula: "C₄H₆",
        use: "Synthesis of rubber, chemicals",
      },
      { name: "But-2-yne", formula: "C₄H₆", use: "Laboratory reagent" },
    ],
    properties: "Most reactive of the three series, acidic terminal H",
    reactions:
      "Hydrogenation (→ alkene/alkane), halogenation, hydration (Markovnikov)",
  },
];

// ── Functional Groups ────────────────────────────────────────────────────────
const FUNCTIONAL_GROUPS = [
  {
    name: "Alcohol",
    group: "–OH",
    example: "Ethanol (C₂H₅OH)",
    color: "from-blue-400/20",
    accent: "text-blue-300",
    reaction:
      "Oxidation → aldehyde/acid; Esterification with acids; Dehydration → alkene",
    use: "Beverages, antiseptic, solvent, fuel (bioethanol)",
  },
  {
    name: "Aldehyde",
    group: "–CHO",
    example: "Ethanal (CH₃CHO)",
    color: "from-yellow-400/20",
    accent: "text-yellow-300",
    reaction:
      "Oxidation → carboxylic acid; Reduction → alcohol; Tollens' / Fehling's test",
    use: "Preservative (formaldehyde), flavouring, synthesis intermediate",
  },
  {
    name: "Ketone",
    group: "C=O",
    example: "Propanone/Acetone (CH₃COCH₃)",
    color: "from-pink-400/20",
    accent: "text-pink-300",
    reaction:
      "Reduction → secondary alcohol; Nucleophilic addition; Aldol condensation",
    use: "Nail polish remover, solvent, paint thinner",
  },
  {
    name: "Carboxylic Acid",
    group: "–COOH",
    example: "Acetic acid (CH₃COOH)",
    color: "from-red-400/20",
    accent: "text-red-300",
    reaction:
      "Esterification with alcohol; Neutralisation with base; Decarboxylation",
    use: "Vinegar (acetic acid), aspirin, polymer production",
  },
  {
    name: "Amine",
    group: "–NH₂",
    example: "Methylamine (CH₃NH₂)",
    color: "from-teal-400/20",
    accent: "text-teal-300",
    reaction: "Acts as base; Reaction with acids → ammonium salt; Acylation",
    use: "Nylon, dyes, pharmaceuticals, amino acids",
  },
  {
    name: "Ester",
    group: "–COO–",
    example: "Ethyl acetate (CH₃COOC₂H₅)",
    color: "from-orange-400/20",
    accent: "text-orange-300",
    reaction: "Hydrolysis (acid or base) → acid + alcohol; Transesterification",
    use: "Fruit flavours, perfumes, solvents, biodiesel",
  },
];

// ── Isomerism ────────────────────────────────────────────────────────────────
const ISOMERISM_TYPES = [
  {
    name: "Chain Isomerism",
    category: "Structural",
    accent: "text-sky-300",
    border: "border-sky-400/30",
    bg: "from-sky-400/10",
    description:
      "Same molecular formula, different carbon chain arrangement (branching).",
    example: "C₄H₁₀ — Butane vs 2-Methylpropane",
    structures: [
      { label: "n-Butane", diagram: "CH₃ – CH₂ – CH₂ – CH₃  (straight chain)" },
      {
        label: "2-Methylpropane",
        diagram: "      CH₃\n       |\nCH₃ – CH – CH₃  (branched)",
      },
    ],
    note: "Branched isomers have lower boiling points — less surface area, weaker van der Waals.",
  },
  {
    name: "Position Isomerism",
    category: "Structural",
    accent: "text-green-300",
    border: "border-green-400/30",
    bg: "from-green-400/10",
    description: "Same functional group, different position on the chain.",
    example: "C₃H₇OH — Propan-1-ol vs Propan-2-ol",
    structures: [
      { label: "Propan-1-ol", diagram: "CH₃ – CH₂ – CH₂ – OH  (–OH on C1)" },
      { label: "Propan-2-ol", diagram: "CH₃ – CH(OH) – CH₃  (–OH on C2)" },
    ],
    note: "JEE tip: also applies to halides, alkenes, alkynes — count the position from the nearest end.",
  },
  {
    name: "Functional Group Isomerism",
    category: "Structural",
    accent: "text-amber-300",
    border: "border-amber-400/30",
    bg: "from-amber-400/10",
    description: "Same molecular formula, different functional groups.",
    example: "C₂H₆O — Ethanol vs Dimethyl ether",
    structures: [
      { label: "Ethanol", diagram: "CH₃ – CH₂ – OH  (alcohol)" },
      { label: "Dimethyl ether", diagram: "CH₃ – O – CH₃  (ether)" },
    ],
    note: "Ethanol boils at 78°C; dimethyl ether at −24°C — dramatic property difference despite same formula.",
  },
  {
    name: "Geometrical (Cis-Trans) Isomerism",
    category: "Stereoisomerism",
    accent: "text-violet-300",
    border: "border-violet-400/30",
    bg: "from-violet-400/10",
    description:
      "Different spatial arrangement around a C=C double bond (restricted rotation).",
    example: "But-2-ene (C₄H₈) — cis vs trans",
    structures: [
      {
        label: "cis-But-2-ene",
        diagram:
          " CH₃   CH₃\n    \\ /\n     C = C\n    / \\\n   H   H  (same groups on same side)",
      },
      {
        label: "trans-But-2-ene",
        diagram:
          " CH₃   H\n    \\ /\n     C = C\n    / \\\n   H   CH₃  (same groups on opposite sides)",
      },
    ],
    note: "Condition: each doubly bonded carbon must have two different substituents. cis and trans have different physical/chemical properties.",
  },
];

// ── Shared: CollapsibleCard ───────────────────────────────────────────────────

function CollapsibleCard({
  title,
  accent,
  border,
  bg,
  children,
  ocid,
}: {
  title: string;
  accent: string;
  border: string;
  bg: string;
  children: React.ReactNode;
  ocid: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "glass-carbon rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg",
        border,
      )}
      data-ocid={ocid}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/20 transition-colors"
        aria-expanded={open}
      >
        <span className={cn("font-semibold text-sm", accent)}>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className={cn(
              "border-t border-border/20 bg-gradient-to-br to-transparent px-5 py-4",
              bg,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── CarbonHybridization ───────────────────────────────────────────────────────

export const CarbonHybridization = memo(function CarbonHybridization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
      data-ocid="carbon.hybridization_section"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold mb-2">
          Hybridization of Carbon
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Carbon's four valence electrons can hybridise into sp³, sp², or sp
          orbitals — each giving a completely different molecular geometry and
          property set.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {HYBRIDIZATIONS.map((h, i) => (
          <motion.div
            key={h.type}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={cn(
              "glass-carbon rounded-2xl p-5 border space-y-3 transition-shadow hover:shadow-lg cursor-default",
              h.border,
            )}
            style={{ "--glow": h.glow } as React.CSSProperties}
            data-ocid={`carbon.hybridization.${h.type.toLowerCase()}`}
          >
            <div className={cn("text-3xl font-display font-black", h.accent)}>
              {h.type}
            </div>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gradient-to-r to-transparent border",
                h.color,
                h.border,
              )}
            >
              {h.geometry} · {h.angle}
            </div>
            <p className="text-xs text-muted-foreground">{h.orbital}</p>
            <div className="text-xs font-mono bg-card/30 rounded-lg px-3 py-2 text-foreground/80">
              {h.structure}
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Examples
              </div>
              <ul className="space-y-0.5">
                {h.examples.map((ex) => (
                  <li
                    key={ex}
                    className="flex items-center gap-1.5 text-xs text-foreground/80"
                  >
                    <ChevronRight className="w-3 h-3 text-accent flex-shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={cn(
                "text-xs rounded-lg px-3 py-2 bg-gradient-to-br to-transparent border",
                h.color,
                h.border,
                h.accent,
              )}
            >
              <span className="font-semibold">Real world: </span>
              <span className="text-foreground/80">{h.realWorld}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {h.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

// ── CarbonOrganicBasics ───────────────────────────────────────────────────────

export const CarbonOrganicBasics = memo(function CarbonOrganicBasics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
      data-ocid="carbon.organic_basics_section"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold mb-2">
          Organic Homologous Series
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Alkanes, alkenes, and alkynes form three core series. Each member
          differs by CH₂ and shows a gradual change in physical properties.
        </p>
      </div>
      <div className="space-y-4">
        {ORGANIC_SERIES.map((series, i) => (
          <motion.div
            key={series.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <CollapsibleCard
              title={`${series.name} · ${series.formula} · ${series.bond}`}
              accent={series.accent}
              border={series.border}
              bg={series.color}
              ocid={`carbon.organic.${series.name.toLowerCase()}`}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Members
                  </div>
                  <div className="space-y-2">
                    {series.members.map((m) => (
                      <div
                        key={m.name}
                        className="glass-carbon rounded-lg px-3 py-2"
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-sm">
                            {m.name}
                          </span>
                          <span
                            className={cn("font-mono text-xs", series.accent)}
                          >
                            {m.formula}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {m.use}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Properties
                    </div>
                    <p className="text-xs text-foreground/80">
                      {series.properties}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Key Reactions
                    </div>
                    <p className="text-xs text-foreground/80">
                      {series.reactions}
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

// ── CarbonFunctionalGroups ────────────────────────────────────────────────────

export const CarbonFunctionalGroups = memo(function CarbonFunctionalGroups() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
      data-ocid="carbon.functional_groups_section"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold mb-2">
          Functional Groups
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          A functional group determines the characteristic reactions of an
          organic compound. Tap a card to expand.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FUNCTIONAL_GROUPS.map((fg, i) => (
          <motion.div
            key={fg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActive(active === fg.name ? null : fg.name)}
            className={cn(
              "glass-carbon rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg",
              active === fg.name ? "ring-1 ring-border/40" : "",
            )}
            data-ocid={`carbon.fg.${fg.name.toLowerCase().replace(/\s+/g, "_")}`}
          >
            <div
              className={cn(
                "px-4 py-3 bg-gradient-to-r to-transparent",
                fg.color,
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{fg.name}</div>
                  <div className={cn("font-mono text-lg font-bold", fg.accent)}>
                    {fg.group}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  {fg.example.split("(")[0].trim()}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {active === fg.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="px-4 py-3 space-y-2"
                >
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Example
                    </div>
                    <div className="text-xs font-mono text-foreground/80">
                      {fg.example}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Reactions
                    </div>
                    <div className="text-xs text-foreground/80">
                      {fg.reaction}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Uses
                    </div>
                    <div className="text-xs text-foreground/80">{fg.use}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

// ── CarbonIsomerism ───────────────────────────────────────────────────────────

export const CarbonIsomerism = memo(function CarbonIsomerism() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
      data-ocid="carbon.isomerism_section"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold mb-2">Isomerism</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Compounds with the same molecular formula but different arrangements —
          structural or spatial.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {ISOMERISM_TYPES.map((iso, i) => (
          <motion.div
            key={iso.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={cn(
              "glass-carbon rounded-2xl p-5 border space-y-3 hover:shadow-lg transition-shadow cursor-default",
              iso.border,
            )}
            data-ocid={`carbon.isomerism.${iso.name.split(" ")[0].toLowerCase()}`}
          >
            <div className="flex items-center justify-between">
              <div className={cn("font-display font-bold text-lg", iso.accent)}>
                {iso.name}
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full glass text-muted-foreground">
                {iso.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{iso.description}</p>
            <div className="text-xs font-semibold text-foreground/70">
              Example: {iso.example}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {iso.structures.map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-xl p-3 bg-gradient-to-br to-transparent border",
                    iso.bg,
                    iso.border,
                  )}
                >
                  <div className="text-xs font-semibold mb-1.5">{s.label}</div>
                  <pre className="text-xs font-mono text-foreground/70 whitespace-pre-wrap leading-relaxed">
                    {s.diagram}
                  </pre>
                </div>
              ))}
            </div>
            <div
              className={cn(
                "text-xs px-3 py-2 rounded-lg bg-gradient-to-r to-transparent border",
                iso.bg,
                iso.border,
              )}
            >
              <span className={cn("font-semibold", iso.accent)}>
                💡 JEE/NEET:{" "}
              </span>
              <span className="text-foreground/80">{iso.note}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});
