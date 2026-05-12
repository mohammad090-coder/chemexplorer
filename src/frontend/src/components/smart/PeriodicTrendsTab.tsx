import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Trend {
  id: string;
  title: string;
  groupDir: "up" | "down";
  periodDir: "up" | "down";
  groupLabel: string;
  periodLabel: string;
  explanation: string;
  deepDive: string;
  example: string;
  exception?: string;
  realWorld: string;
  jeeNeetPoints: string[];
  gradientFrom: string;
  gradientTo: string;
  gridColors: [string, string, string, string, string, string];
}

const TRENDS: Trend[] = [
  {
    id: "atomic-radius",
    title: "Atomic Radius",
    groupDir: "down",
    periodDir: "up",
    groupLabel: "Increases ↓ group",
    periodLabel: "Decreases → period",
    explanation:
      "Moving down a group, more electron shells are added, increasing the atomic radius. Moving across a period, the nuclear charge increases (more protons) which pulls electrons closer, shrinking the atom despite the same number of shells.",
    deepDive:
      "The key force at play is effective nuclear charge (Zeff = Z − σ, where σ = shielding). As you go right across Period 2, Z increases from 3 to 10, but shielding by same-shell electrons is poor (~0.35 per electron). So Zeff rises sharply, pulling the electron cloud inward. Going down a group, adding a new principal quantum shell always overwhelms the increased nuclear charge because inner-shell electrons shield very effectively (~0.85 for n−1 shells).",
    example:
      "Na (186 pm) > Li (152 pm) in Group 1. Li (152 pm) > Be (112 pm) across Period 2.",
    realWorld:
      "Atomic radius determines how tightly metals pack in crystal lattices — smaller radius = denser, stronger metal (e.g. titanium's small radius gives it extraordinary strength-to-weight ratio). The precise size difference between Na⁺ (102 pm) and K⁺ (138 pm) is what makes ion channel selectivity possible in neurons.",
    jeeNeetPoints: [
      "Atomic radius decreases across a period due to increasing Zeff (effective nuclear charge).",
      "Down a group, atomic radius increases due to addition of new electron shells despite increased nuclear charge.",
      "Exception: Cr (128 pm) vs Mo (139 pm) — d-block contraction can slow the increase.",
      "Lanthanide contraction makes 4d and 5d elements nearly identical in size (e.g., Zr ≈ Hf).",
      "Covalent radius < atomic radius < van der Waals radius for the same element.",
      "Across Period 3: Na (186) > Mg (160) > Al (143) > Si (117) > P (110) > S (104) > Cl (99) pm.",
    ],
    gradientFrom: "oklch(0.6 0.18 220)",
    gradientTo: "oklch(0.45 0.12 230)",
    gridColors: [
      "oklch(0.75 0.2 220)",
      "oklch(0.5 0.1 220)",
      "oklch(0.68 0.18 220)",
      "oklch(0.44 0.09 220)",
      "oklch(0.6 0.15 220)",
      "oklch(0.38 0.07 220)",
    ],
  },
  {
    id: "ionization-energy",
    title: "Ionization Energy",
    groupDir: "up",
    periodDir: "down",
    groupLabel: "Decreases ↓ group",
    periodLabel: "Increases → period",
    explanation:
      "Moving down a group, electrons are further from nucleus (more shielding), making them easier to remove. Moving across a period, smaller atom + higher nuclear charge means more energy is needed to remove an electron.",
    deepDive:
      "Key exceptions: IE₁(B) < IE₁(Be) because B's 2p electron is higher energy and more easily removed than Be's paired 2s electrons. IE₁(O) < IE₁(N) because O has a paired 2p electron (extra e–e repulsion lowers energy needed to remove one). These are the two most tested IE anomalies in JEE. The huge jump in successive IEs (IE₂ >> IE₁ for Na) reveals the noble-gas core and indicates the oxidation state of the element.",
    example:
      "Na (496 kJ/mol) < Li (520 kJ/mol) in Group 1. Li (520) < Ne (2081) across Period 2.",
    exception:
      "N (1402 kJ/mol) > O (1314 kJ/mol): half-filled 2p³ in N is extra stable. B (800) < Be (900): B's 2p is easier to remove than Be's 2s.",
    realWorld:
      "Metals with low IE (Na, K, Cs) give electrons easily — used in batteries and photoelectric cells. Cs's IE is so low (376 kJ/mol) that visible light can eject its electrons (used in photocells). High IE of noble gases explains their chemical inertness.",
    jeeNeetPoints: [
      "IE₁ of N > O and IE₁ of Be > B — anomalies due to half-filled/fully-filled stability.",
      "2nd ionization energy is always higher than 1st; a huge jump indicates removal from a noble gas core.",
      "For JEE: IE order across Period 2 is Li < B < Be < C < O < N < F < Ne.",
      "IE helps predict oxidation states: large IE jump between IE₂ and IE₃ → element is +2 in stable compounds.",
      "Group 2 elements have anomalously high IE₂ compared to Group 1 IE₂ (both go to Group 18 config).",
      "Across a period: IE generally increases but dips at Group 3 (ns² → np¹) and Group 6 (half-filled → paired p).",
    ],
    gradientFrom: "oklch(0.68 0.22 50)",
    gradientTo: "oklch(0.55 0.15 55)",
    gridColors: [
      "oklch(0.5 0.1 50)",
      "oklch(0.78 0.24 50)",
      "oklch(0.44 0.09 50)",
      "oklch(0.7 0.2 50)",
      "oklch(0.38 0.07 50)",
      "oklch(0.62 0.18 50)",
    ],
  },
  {
    id: "electronegativity",
    title: "Electronegativity",
    groupDir: "up",
    periodDir: "down",
    groupLabel: "Decreases ↓ group",
    periodLabel: "Increases → period",
    explanation:
      "Electronegativity measures an atom's ability to attract bonding electrons. Fluorine (F) tops the scale at 3.98. Like ionization energy, smaller atoms with higher nuclear charge attract electrons more strongly.",
    deepDive:
      "Pauling electronegativity is derived from bond dissociation energies. Mulliken EN = (IE + EA) / 2. Key insight: EN determines bond polarity. When ΔEN > 1.7, the bond is predominantly ionic. Between 0.4–1.7, polar covalent. Below 0.4, nonpolar covalent. The massive EN difference between O (3.44) and H (2.20) is why water has hydrogen bonds — and why life as we know it exists.",
    example:
      "F (3.98) > Cl (3.16) > Br (2.96) in Group 17. Na (0.93) < Cl (3.16) across Period 3.",
    realWorld:
      "EN drives inductive effects in organic chemistry — the electron-withdrawing power of the carbonyl group (C=O) makes it reactive toward nucleophiles. Water's high EN on O creates partial charges that enable hydrogen bonding, surface tension, and the unique density maximum at 4°C.",
    jeeNeetPoints: [
      "Pauling scale: F (3.98) > O (3.44) > N (3.04) — note Cl (3.16) > N (3.04), tested frequently.",
      "EN difference > 1.7 → ionic bond; 0.4–1.7 → polar covalent; < 0.4 → nonpolar covalent.",
      "EN controls bond polarity, dipole moment, and acid-base character of compounds.",
      "Noble gases have no defined EN on Pauling scale (no stable compounds when Pauling formulated it).",
      "Higher EN on O in H₂O makes it the negative end of the dipole — explains its universal solvent properties.",
      "Diagonal relationship: Li ≈ Mg and Be ≈ Al in EN (explains similar chemistry).",
    ],
    gradientFrom: "oklch(0.72 0.2 140)",
    gradientTo: "oklch(0.55 0.14 145)",
    gridColors: [
      "oklch(0.45 0.09 140)",
      "oklch(0.76 0.22 140)",
      "oklch(0.4 0.08 140)",
      "oklch(0.68 0.18 140)",
      "oklch(0.35 0.06 140)",
      "oklch(0.6 0.15 140)",
    ],
  },
  {
    id: "electron-affinity",
    title: "Electron Affinity",
    groupDir: "up",
    periodDir: "down",
    groupLabel: "Decreases ↓ group",
    periodLabel: "Generally increases → period",
    explanation:
      "Electron affinity is the energy change when a gaseous atom gains an electron. More negative = more favorable. Halogens have very high (negative) electron affinity. Noble gases have positive EA (don't want electrons).",
    deepDive:
      "EA is less regular than IE because it depends on the orbital being filled. Group 2 (filled s) and Group 15 (half-filled p) have anomalously low EA — adding an electron goes into a higher-energy orbital or pairs an existing electron (repulsion). The EA of F is less negative than Cl because of extra electron-electron repulsion in F's tiny 2p orbital — this is why Cl is actually a better oxidizing agent in halogenation reactions than its electronegativity might suggest.",
    example:
      "Cl has EA of −349 kJ/mol, highest in the periodic table. F has −328 kJ/mol (less negative than Cl due to small size repulsion).",
    exception:
      "Cl has higher EA than F due to less electron–electron repulsion in the larger 3p orbital.",
    realWorld:
      "High electron affinity makes halogens powerful oxidizing agents — chlorine purifies water and bleaches paper because it desperately captures electrons. Oxygen's high EA drives cellular respiration: mitochondria exploit O₂'s electron-hunger to extract energy from glucose.",
    jeeNeetPoints: [
      "Cl has highest EA (−349 kJ/mol) in the periodic table, not F — small size of F causes extra e⁻–e⁻ repulsion.",
      "Group 2 (filled s) and Group 15 (half-filled p) have anomalously low EA due to stability.",
      "EA₂ of oxygen is positive (+780 kJ/mol) — energy required, not released — second electron enters already negative O⁻.",
      "Noble gases have positive EA (impossible to gain electron into filled shell).",
      "EA trend is less regular than IE — exceptions at Be, N, Mg, P are more common and frequently tested.",
    ],
    gradientFrom: "oklch(0.65 0.2 290)",
    gradientTo: "oklch(0.5 0.14 295)",
    gridColors: [
      "oklch(0.45 0.09 290)",
      "oklch(0.72 0.22 290)",
      "oklch(0.4 0.08 290)",
      "oklch(0.65 0.18 290)",
      "oklch(0.35 0.06 290)",
      "oklch(0.58 0.16 290)",
    ],
  },
  {
    id: "metallic",
    title: "Metallic Character",
    groupDir: "down",
    periodDir: "up",
    groupLabel: "Increases ↓ group",
    periodLabel: "Decreases → period",
    explanation:
      "Metallic character describes how easily an atom loses electrons to form positive ions. Increases down a group (outer electrons are further away, easier to lose). Decreases across a period (more nuclear charge holds electrons tighter).",
    deepDive:
      "Metallic character is the inverse of ionization energy. Metals are reducing agents — they donate electrons. The most metallic element is Fr (most reactive), and the trend Na > Mg > Al > Si is directly tested. Metalloids (Si, Ge, As, Sb, Te) lie along the staircase boundary between metals and nonmetals and show intermediate properties (semiconductors).",
    example:
      "Cs is more metallic than Li in Group 1. Na is more metallic than Cl in Period 3.",
    realWorld:
      "Metallic character explains reactivity with water: highly metallic cesium reacts explosively with water at room temperature, while less metallic aluminum forms a protective oxide layer. This trend underpins the entire science of electrochemical corrosion protection.",
    jeeNeetPoints: [
      "Most metallic element: Francium (Fr); least metallic nonmetal: Fluorine (most electronegative).",
      "Metallic character is opposite to ionization energy trend.",
      "Along Period 3: Na > Mg > Al > Si (metalloid) > P > S > Cl (metallic decreasing).",
      "Metalloids (Si, Ge, As, Sb, Te) lie along the 'staircase' — border between metals and nonmetals.",
      "Reducing power of metals follows metallic character: greater metallic = stronger reducing agent.",
      "Metallic character increases with more delocalized electrons and lower ionization energy.",
    ],
    gradientFrom: "oklch(0.65 0.14 200)",
    gradientTo: "oklch(0.52 0.1 205)",
    gridColors: [
      "oklch(0.72 0.18 200)",
      "oklch(0.48 0.08 200)",
      "oklch(0.65 0.15 200)",
      "oklch(0.42 0.07 200)",
      "oklch(0.58 0.13 200)",
      "oklch(0.36 0.05 200)",
    ],
  },
  {
    id: "nonmetallic",
    title: "Non-Metallic Character",
    groupDir: "up",
    periodDir: "down",
    groupLabel: "Decreases ↓ group",
    periodLabel: "Increases → period",
    explanation:
      "Non-metallic character is the tendency to gain electrons and form anions. It is the direct opposite of metallic character. Fluorine is the most non-metallic element. Non-metallic character increases across a period and decreases down a group.",
    deepDive:
      "Non-metallic elements have high ionization energies and high electron affinities. They form acidic oxides (SO₃, P₄O₁₀, NO₂, Cl₂O₇). Non-metals at the top of a group are more electronegative (F > Cl > Br > I). The oxidizing power of Group 17 decreases down the group: F₂ > Cl₂ > Br₂ > I₂ — F₂ can even oxidize noble gases (XeF₂). Contrast with metallic oxides, which are basic.",
    example:
      "F is more non-metallic than I in Group 17. O is more non-metallic than Na in Period 2.",
    realWorld:
      "Non-metallic character drives the chemistry of halogens in water treatment: Cl₂ (strong non-metal) oxidizes bacteria and pathogens. Sulfur's non-metallic character makes it form SO₂ during combustion — causing acid rain when dissolved in atmospheric water to form H₂SO₃.",
    jeeNeetPoints: [
      "Most non-metallic element: Fluorine (F) — highest EN, highest electron affinity (except Cl beats F in EA).",
      "Non-metallic oxides are acidic: SO₃ + H₂O → H₂SO₄; CO₂ + H₂O → H₂CO₃.",
      "Non-metallic character order across Period 3: Cl > S > P > Si > Al > Mg > Na.",
      "Oxidizing power follows non-metallic character: F₂ > Cl₂ > Br₂ > I₂.",
      "Non-metals form anions (Cl⁻, O²⁻, N³⁻); metals form cations.",
      "At the boundary (metalloids), elements show semiconductor behavior (Si) or amphoteric oxide behavior (Al₂O₃).",
    ],
    gradientFrom: "oklch(0.72 0.22 320)",
    gradientTo: "oklch(0.58 0.16 325)",
    gridColors: [
      "oklch(0.42 0.08 320)",
      "oklch(0.75 0.22 320)",
      "oklch(0.38 0.07 320)",
      "oklch(0.68 0.18 320)",
      "oklch(0.33 0.06 320)",
      "oklch(0.6 0.16 320)",
    ],
  },
  {
    id: "ionic-radius",
    title: "Ionic Radius",
    groupDir: "down",
    periodDir: "down",
    groupLabel: "Increases ↓ group",
    periodLabel: "Cations decrease, anions decrease → period",
    explanation:
      "Cations (positive ions) are always smaller than their parent atoms — electrons removed. Anions (negative ions) are always larger — extra electrons increase repulsion. Ionic radius increases down a group as more shells are added.",
    deepDive:
      "Isoelectronic series: ions with the same number of electrons but different nuclear charges. The more protons, the smaller the ion. O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺ > Al³⁺ — all have 10 electrons, but nuclear charge varies from 8 to 13. This is a very high-frequency JEE question type. The radius ratio rule (r⁺/r⁻) determines crystal structure: 0.155–0.225 → trigonal, 0.225–0.414 → tetrahedral, 0.414–0.732 → octahedral (NaCl), 0.732–1.0 → cubic (CsCl).",
    example:
      "Li⁺ (76 pm) < Na⁺ (102 pm) < K⁺ (138 pm). O²⁻ (140 pm) is larger than O (66 pm).",
    realWorld:
      "Ionic radius governs which ions fit into crystal structures — determining whether NaCl, CsCl, or ZnS forms. In biology, the size difference between Na⁺ and K⁺ enables ion channel selectivity — your neurons fire because channels distinguish these ions by size.",
    jeeNeetPoints: [
      "Isoelectronic species: for same electron count, larger nuclear charge → smaller radius. O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺.",
      "Cation is always smaller than neutral atom; anion is always larger.",
      "Lanthanide contraction: 5d elements have nearly same ionic radius as 4d counterparts (Zr⁴⁺ ≈ Hf⁴⁺).",
      "Ionic radius of transition metals decreases on oxidation: Fe > Fe²⁺ > Fe³⁺.",
      "Radius ratio rule: determines crystal structure — NaCl (0.414–0.732), CsCl (0.732–1.0), ZnS (0.225–0.414).",
    ],
    gradientFrom: "oklch(0.7 0.22 330)",
    gradientTo: "oklch(0.55 0.15 335)",
    gridColors: [
      "oklch(0.55 0.12 330)",
      "oklch(0.75 0.2 330)",
      "oklch(0.62 0.16 330)",
      "oklch(0.8 0.22 330)",
      "oklch(0.7 0.2 330)",
      "oklch(0.85 0.25 330)",
    ],
  },
];

function TrendArrow({
  direction,
  color,
  label,
}: {
  direction: "horizontal" | "vertical";
  color: string;
  label: string;
}) {
  const isHorizontal = direction === "horizontal";
  return (
    <div
      className={`flex ${isHorizontal ? "flex-col items-start" : "flex-row items-center"} gap-1.5`}
    >
      <span className="text-xs font-medium" style={{ color }}>
        {label}
      </span>
      <div
        className={`${isHorizontal ? "h-2 w-full" : "w-2 h-12"} rounded-full relative overflow-hidden`}
        style={{
          background: `linear-gradient(${isHorizontal ? "to right" : "to bottom"}, ${color}22, ${color}99)`,
        }}
      >
        <div
          className={`absolute ${isHorizontal ? "right-0 top-0 bottom-0 w-3" : "bottom-0 left-0 right-0 h-3"} flex items-center justify-center`}
          style={{ color }}
        >
          <span className="text-[10px] leading-none">
            {isHorizontal ? "▶" : "▼"}
          </span>
        </div>
      </div>
    </div>
  );
}

function TrendMiniGrid({ colors }: { colors: Trend["gridColors"] }) {
  const [tl, tr, ml, mr, bl, br] = colors;
  const cells = [
    [tl, tr],
    [ml, mr],
    [bl, br],
  ];
  const ROW_KEYS = ["top", "mid", "bot"] as const;
  return (
    <div className="flex flex-col gap-0.5 rounded-lg overflow-hidden w-16 h-12 flex-shrink-0">
      {cells.map((row, ri) => (
        <div key={ROW_KEYS[ri]} className="flex gap-0.5 flex-1">
          {row.map((color) => (
            <div
              key={color}
              className="flex-1 rounded-sm"
              style={{ background: color }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function PeriodicTrendsTab() {
  const [expanded, setExpanded] = useState<string | null>("atomic-radius");
  const [trendsExplainedOpen, setTrendsExplainedOpen] = useState(false);

  return (
    <div className="space-y-3" data-ocid="trends.list">
      {TRENDS.map((trend, i) => {
        const isOpen = expanded === trend.id;
        return (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.18 0.02 250 / 0.55)",
              backdropFilter: "blur(24px)",
              border: `1px solid ${trend.gradientFrom}44`,
            }}
            data-ocid={`trends.item.${i + 1}`}
          >
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : trend.id)}
              className="w-full flex items-center gap-4 p-4 text-left"
              data-ocid={`trends.expand.${i + 1}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: `${trend.gradientFrom}22` }}
              >
                <span className="text-lg">{isOpen ? "▼" : "▶"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold mb-0.5">
                  {trend.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${trend.gradientFrom}22`,
                      color: trend.gradientFrom,
                    }}
                  >
                    {trend.groupLabel}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${trend.gradientTo}22`,
                      color: trend.gradientTo,
                    }}
                  >
                    {trend.periodLabel}
                  </span>
                </div>
              </div>
              <TrendMiniGrid colors={trend.gridColors} />
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-4 pb-5 space-y-3"
                    style={{ borderTop: `1px solid ${trend.gradientFrom}22` }}
                  >
                    {/* Trend Arrow Visualizations */}
                    <div
                      className="grid grid-cols-2 gap-3 pt-3 px-2"
                      style={{
                        background: `${trend.gradientFrom}0A`,
                        borderRadius: "0.75rem",
                        padding: "0.75rem",
                        border: `1px solid ${trend.gradientFrom}20`,
                      }}
                    >
                      <div>
                        <p
                          className="text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: trend.gradientFrom }}
                        >
                          ↕ Down a Group
                        </p>
                        <TrendArrow
                          direction="vertical"
                          color={
                            trend.groupDir === "down"
                              ? "oklch(0.72 0.22 140)"
                              : "oklch(0.68 0.22 22)"
                          }
                          label={
                            trend.groupDir === "down"
                              ? "Increases ↓"
                              : "Decreases ↑"
                          }
                        />
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: trend.gradientTo }}
                        >
                          ↔ Across Period
                        </p>
                        <TrendArrow
                          direction="horizontal"
                          color={
                            trend.periodDir === "down"
                              ? "oklch(0.68 0.22 22)"
                              : "oklch(0.72 0.22 140)"
                          }
                          label={
                            trend.periodDir === "down"
                              ? "Decreases →"
                              : "Increases →"
                          }
                        />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {trend.explanation}
                    </p>

                    {/* Deep Dive */}
                    <div
                      className="rounded-xl p-3 text-sm space-y-1"
                      style={{
                        background: `${trend.gradientFrom}10`,
                        border: `1px solid ${trend.gradientFrom}28`,
                      }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: trend.gradientFrom }}
                      >
                        🔬 Deep Dive
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {trend.deepDive}
                      </p>
                    </div>

                    <div
                      className="rounded-xl p-3 text-sm"
                      style={{
                        background: `${trend.gradientFrom}15`,
                        border: `1px solid ${trend.gradientFrom}30`,
                      }}
                    >
                      <span className="font-semibold text-xs uppercase tracking-wider opacity-60">
                        Example ·{" "}
                      </span>
                      {trend.example}
                    </div>

                    {trend.exception && (
                      <div
                        className="rounded-xl p-3 text-sm"
                        style={{
                          background: "oklch(0.65 0.19 22 / 0.1)",
                          border: "1px solid oklch(0.65 0.19 22 / 0.3)",
                        }}
                      >
                        <span
                          className="font-semibold text-xs uppercase tracking-wider"
                          style={{ color: "oklch(0.75 0.15 50)" }}
                        >
                          ⚠ Exception ·{" "}
                        </span>
                        {trend.exception}
                      </div>
                    )}

                    {/* Real-world significance */}
                    <div
                      className="rounded-xl p-3 text-sm space-y-1"
                      style={{
                        background: "oklch(0.7 0.18 200 / 0.08)",
                        border: "1px solid oklch(0.7 0.18 200 / 0.25)",
                      }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: "oklch(0.7 0.18 200)" }}
                      >
                        🌍 Real-World Significance
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {trend.realWorld}
                      </p>
                    </div>

                    {/* JEE/NEET callout */}
                    <div
                      className="rounded-xl p-3 space-y-2"
                      style={{
                        background: "oklch(0.82 0.18 85 / 0.1)",
                        border: "1px solid oklch(0.82 0.18 85 / 0.35)",
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "oklch(0.82 0.18 85)" }}
                      >
                        🎯 JEE / NEET Key Points
                      </p>
                      <ul className="space-y-1.5">
                        {trend.jeeNeetPoints.map((pt) => (
                          <li
                            key={pt}
                            className="flex gap-2 text-xs leading-relaxed"
                            style={{ color: "oklch(0.88 0.1 85)" }}
                          >
                            <span
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: "oklch(0.82 0.18 85)" }}
                            >
                              ●
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Trends Explained — deep theory cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl overflow-hidden mt-2"
        style={{
          background: "oklch(0.18 0.02 250 / 0.55)",
          backdropFilter: "blur(24px)",
          border: "1px solid oklch(0.68 0.16 258 / 0.3)",
        }}
        data-ocid="trends.explained_section"
      >
        <button
          type="button"
          onClick={() => setTrendsExplainedOpen((o) => !o)}
          className="w-full flex items-center justify-between p-4 text-left"
          data-ocid="trends.explained_toggle"
        >
          <div>
            <p
              className="font-display font-bold text-sm"
              style={{ color: "oklch(0.78 0.2 258)" }}
            >
              📖 Trends Explained — Theory & JEE/NEET Tips
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Deep theory for Atomic Radius, Electronegativity, Ionization
              Energy
            </p>
          </div>
          {trendsExplainedOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {trendsExplainedOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                className="px-4 pb-5 space-y-4"
                style={{ borderTop: "1px solid oklch(0.68 0.16 258 / 0.2)" }}
              >
                {/* Atomic Radius */}
                <div
                  className="rounded-xl p-4 space-y-2 mt-3"
                  style={{
                    background: "oklch(0.6 0.18 220 / 0.1)",
                    border: "1px solid oklch(0.6 0.18 220 / 0.3)",
                  }}
                >
                  <p
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.72 0.18 220)" }}
                  >
                    ⚛ Atomic Radius — Core Theory
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Atomic radius decreases across a period (left→right) because
                    increasing nuclear charge pulls electrons closer. Increases
                    down a group because new electron shells are added.
                  </p>
                  <div
                    className="rounded-lg p-2.5 text-xs"
                    style={{
                      background: "oklch(0.72 0.18 180 / 0.08)",
                      border: "1px solid oklch(0.72 0.18 180 / 0.25)",
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.72 0.18 180)" }}
                    >
                      Why it matters:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      Larger atoms have weaker nuclear hold on outer electrons,
                      making them more reactive metals.
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-xs"
                    style={{
                      background: "oklch(0.82 0.18 85 / 0.08)",
                      border: "1px solid oklch(0.82 0.18 85 / 0.25)",
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{ color: "oklch(0.82 0.18 85)" }}
                    >
                      🎯 JEE/NEET:{" "}
                    </span>
                    <span style={{ color: "oklch(0.88 0.1 85)" }}>
                      "Li &gt; Na &gt; K" is WRONG. Correct order: K &gt; Na
                      &gt; Li (down the group = larger). F has the smallest
                      atomic radius (64 pm), Cs the largest (265 pm).
                    </span>
                  </div>
                </div>

                {/* Electronegativity */}
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(0.72 0.2 140 / 0.1)",
                    border: "1px solid oklch(0.72 0.2 140 / 0.3)",
                  }}
                >
                  <p
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.72 0.2 140)" }}
                  >
                    🔗 Electronegativity — Pauling Scale
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Electronegativity increases across a period (more protons
                    attract electrons more) and decreases down a group (larger
                    atoms = weaker pull on bonding electrons).
                  </p>
                  <div
                    className="rounded-lg p-2.5 text-xs"
                    style={{
                      background: "oklch(0.7 0.18 200 / 0.08)",
                      border: "1px solid oklch(0.7 0.18 200 / 0.25)",
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.7 0.18 200)" }}
                    >
                      Pauling Scale:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      F = 4.0 (highest), Fr ≈ 0.7 (lowest). Noble gases
                      excluded. EN difference &gt; 1.7 → ionic; 0.5–1.7 → polar
                      covalent; &lt; 0.5 → nonpolar covalent.
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-xs"
                    style={{
                      background: "oklch(0.82 0.18 85 / 0.08)",
                      border: "1px solid oklch(0.82 0.18 85 / 0.25)",
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{ color: "oklch(0.82 0.18 85)" }}
                    >
                      🎯 JEE/NEET:{" "}
                    </span>
                    <span style={{ color: "oklch(0.88 0.1 85)" }}>
                      F &gt; O &gt; N &gt; Cl &gt; Br is the order for high EN
                      elements. Note Cl (3.16) &gt; N (3.04) — frequently
                      tested!
                    </span>
                  </div>
                </div>

                {/* Ionization Energy */}
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(0.68 0.22 50 / 0.1)",
                    border: "1px solid oklch(0.68 0.22 50 / 0.3)",
                  }}
                >
                  <p
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.75 0.2 50)" }}
                  >
                    ⚡ Ionization Energy — Anomalies
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    First IE: energy to remove the outermost electron from a
                    neutral gaseous atom. Increases across a period (stronger
                    nuclear attraction), decreases down a group (electrons
                    farther from nucleus).
                  </p>
                  <div
                    className="rounded-lg p-2.5 text-xs"
                    style={{
                      background: "oklch(0.65 0.19 22 / 0.1)",
                      border: "1px solid oklch(0.65 0.19 22 / 0.3)",
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.75 0.15 50)" }}
                    >
                      ⚠ Key Anomalies:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      IE of B &lt; Be (B has 2p¹ easier to remove than 2s²). IE
                      of O &lt; N (N’s half-filled 2p is extra stable; O has a
                      paired 2p with extra repulsion). Formula: IE = E(M⁺) −
                      E(M) in kJ/mol.
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-xs"
                    style={{
                      background: "oklch(0.82 0.18 85 / 0.08)",
                      border: "1px solid oklch(0.82 0.18 85 / 0.25)",
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{ color: "oklch(0.82 0.18 85)" }}
                    >
                      🎯 JEE/NEET:{" "}
                    </span>
                    <span style={{ color: "oklch(0.88 0.1 85)" }}>
                      Know anomalies: Group 2 &gt; Group 13, Group 15 &gt; Group
                      16 in same period. IE order Period 2: Li &lt; B &lt; Be
                      &lt; C &lt; O &lt; N &lt; F &lt; Ne.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
