import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type ReactionGroup =
  | "Basic Inorganic"
  | "Organic Basics"
  | "Industrial Chemistry"
  | "Electrochemistry";

type JEEFrequency = "High" | "Medium" | "Low";

interface Reaction {
  id: string;
  name: string;
  equation: string;
  conditions: string;
  group: ReactionGroup;
  significance: string;
  industrial: string;
  jeeFrequency: JEEFrequency;
}

const GROUP_COLORS: Record<ReactionGroup, { bg: string; text: string }> = {
  "Basic Inorganic": {
    bg: "oklch(0.68 0.16 258 / 0.2)",
    text: "oklch(0.72 0.18 258)",
  },
  "Organic Basics": {
    bg: "oklch(0.7 0.21 140 / 0.2)",
    text: "oklch(0.72 0.2 140)",
  },
  "Industrial Chemistry": {
    bg: "oklch(0.72 0.25 50 / 0.2)",
    text: "oklch(0.74 0.22 50)",
  },
  Electrochemistry: {
    bg: "oklch(0.68 0.18 200 / 0.2)",
    text: "oklch(0.7 0.2 200)",
  },
};

const FREQ_STYLES: Record<
  JEEFrequency,
  { bg: string; text: string; label: string }
> = {
  High: {
    bg: "oklch(0.7 0.22 140 / 0.18)",
    text: "oklch(0.72 0.22 140)",
    label: "★★★ High",
  },
  Medium: {
    bg: "oklch(0.72 0.2 85 / 0.18)",
    text: "oklch(0.8 0.18 85)",
    label: "★★ Medium",
  },
  Low: {
    bg: "oklch(0.6 0.1 250 / 0.18)",
    text: "oklch(0.68 0.12 258)",
    label: "★ Low",
  },
};

const REACTIONS: Reaction[] = [
  // ── BASIC INORGANIC ───────────────────────────────────────────────────────
  {
    id: "thermite",
    name: "Thermite Reaction",
    equation: "Fe₂O₃ + 2Al → Al₂O₃ + 2Fe",
    conditions: "Ignition, >2000°C",
    group: "Basic Inorganic",
    significance: "Aluminothermic reduction; used in railway track welding",
    industrial:
      "Thermite welding for railway tracks. Temperature exceeds 2500°C — hot enough to melt steel. Related aluminothermic reductions produce Cr and Mn metals. Used in incendiary devices and military applications.",
    jeeFrequency: "Medium",
  },
  {
    id: "hcl-naoh",
    name: "HCl + NaOH (Neutralization)",
    equation: "HCl + NaOH → NaCl + H₂O",
    conditions: "Aqueous, room temp",
    group: "Basic Inorganic",
    significance: "Classic strong acid-base neutralization; ΔH = −57.1 kJ/mol",
    industrial:
      "NaCl produced is table salt. Neutralization reactions are fundamental in pharmaceutical manufacturing, food processing, and industrial waste treatment.",
    jeeFrequency: "High",
  },
  {
    id: "h2so4-naoh",
    name: "H₂SO₄ + NaOH",
    equation: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
    conditions: "Aqueous solution",
    group: "Basic Inorganic",
    significance:
      "Diprotic acid neutralization; produces sodium sulfate (Glauber's salt)",
    industrial:
      "Na₂SO₄·10H₂O (Glauber's salt) used in detergent powders, kraft paper production, and glass manufacturing.",
    jeeFrequency: "Medium",
  },
  {
    id: "nh3-hcl",
    name: "NH₃ + HCl → White Fumes",
    equation: "NH₃(g) + HCl(g) → NH₄Cl(s)",
    conditions: "Gas phase",
    group: "Basic Inorganic",
    significance:
      "Dense white fumes of ammonium chloride — classic test for HCl/NH₃",
    industrial:
      "NH₄Cl used as nitrogen fertilizer, flux in soldering and galvanizing, electrolyte in dry cell (Leclanché) batteries.",
    jeeFrequency: "Medium",
  },
  {
    id: "mg-combustion",
    name: "Magnesium Combustion",
    equation: "2Mg + O₂ → 2MgO",
    conditions: "Ignition in air",
    group: "Basic Inorganic",
    significance:
      "Brilliant white flame (~3100°C); Mg cannot be extinguished with CO₂ or H₂O",
    industrial:
      "Mg in aerospace alloys (35% lighter than Al), flash photography, incendiary flares. MgO used as refractory material (furnace linings) and antacid.",
    jeeFrequency: "Low",
  },
  {
    id: "fe-displacement",
    name: "Fe Displaces Cu",
    equation: "Fe + CuSO₄ → FeSO₄ + Cu",
    conditions: "Aqueous, room temp",
    group: "Basic Inorganic",
    significance:
      "Activity series demonstration; blue color fades as Cu deposits on Fe",
    industrial:
      "Hydrometallurgy (cementation) for copper recovery from mine drainage water. Fe scrap precipitates Cu²⁺ from acidic runoff.",
    jeeFrequency: "Medium",
  },
  {
    id: "zn-h2so4",
    name: "Zn + H₂SO₄ → H₂",
    equation: "Zn + H₂SO₄ → ZnSO₄ + H₂↑",
    conditions: "Dilute H₂SO₄, room temp",
    group: "Basic Inorganic",
    significance:
      "Classic H₂ evolution; demonstrates metal reactivity with acids",
    industrial:
      "ZnSO₄ is major micronutrient fertilizer. Basis of Kipp's apparatus for laboratory H₂ generation.",
    jeeFrequency: "Medium",
  },
  {
    id: "na2o2-h2o",
    name: "Na₂O₂ with Water",
    equation: "2Na₂O₂ + 2H₂O → 4NaOH + O₂",
    conditions: "Room temp",
    group: "Basic Inorganic",
    significance:
      "Sodium peroxide disproportionates in water; used as O₂ source",
    industrial:
      "Na₂O₂ used in submarines and breathing apparatus (releases O₂ from CO₂/H₂O in expired air). 2Na₂O₂ + 2CO₂ → 2Na₂CO₃ + O₂.",
    jeeFrequency: "High",
  },
  {
    id: "conc-hno3-cu",
    name: "Cu + Conc. HNO₃",
    equation: "Cu + 4HNO₃(conc.) → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O",
    conditions: "Concentrated HNO₃, cold",
    group: "Basic Inorganic",
    significance:
      "Conc. HNO₃ gives NO₂ (brown fumes); dilute gives NO (colorless)",
    industrial:
      "Copper dissolution for electroplating baths and chemical analysis. Nitric acid passivates Fe and Al (protective oxide layer) — crucial to stainless steel industry.",
    jeeFrequency: "High",
  },
  {
    id: "dilute-hno3-cu",
    name: "Cu + Dilute HNO₃",
    equation: "3Cu + 8HNO₃(dil.) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O",
    conditions: "Dilute HNO₃",
    group: "Basic Inorganic",
    significance:
      "Dilute HNO₃ gives NO (colorless gas); different from concentrated",
    industrial:
      "Used in analytical chemistry and metal dissolution. NO gas formed is colorless but oxidizes to brown NO₂ in air — useful field test.",
    jeeFrequency: "High",
  },
  {
    id: "kclo3",
    name: "KClO₃ Decomposition",
    equation: "2KClO₃ → 2KCl + 3O₂",
    conditions: "Heat + MnO₂ catalyst",
    group: "Basic Inorganic",
    significance: "Laboratory method for preparing O₂ gas",
    industrial:
      "Used in safety matches (friction ignites KClO₃ with red phosphorus). Oxygen candles for submarines/spacecraft. Fireworks (KClO₃ as oxidizer). Controlled manufacturing due to explosive potential.",
    jeeFrequency: "Medium",
  },
  {
    id: "h2o2-disp",
    name: "H₂O₂ Disproportionation",
    equation: "2H₂O₂ → 2H₂O + O₂",
    conditions: "MnO₂ catalyst",
    group: "Basic Inorganic",
    significance: "Self-oxidation-reduction; H₂O₂ is both oxidized and reduced",
    industrial:
      "H₂O₂ (~5 Mt/year) used as bleaching agent, rocket propellant (concentrated), antiseptic (3% solution), wastewater treatment. Space Shuttle used concentrated H₂O₂.",
    jeeFrequency: "Medium",
  },
  {
    id: "fe-steam",
    name: "Fe + Steam",
    equation: "3Fe + 4H₂O → Fe₃O₄ + 4H₂",
    conditions: "Red-hot iron, steam",
    group: "Basic Inorganic",
    significance: "Iron reacts with steam but not cold water (unlike Na, K)",
    industrial:
      "Historical basis of water-gas shift reaction. Demonstrates reactivity order: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu.",
    jeeFrequency: "Medium",
  },
  {
    id: "na-water",
    name: "Na + Water",
    equation: "2Na + 2H₂O → 2NaOH + H₂",
    conditions: "Room temperature, violent",
    group: "Basic Inorganic",
    significance:
      "Highly exothermic; Na melts into ball, moves rapidly, H₂ may ignite",
    industrial:
      "Basis of understanding alkali metal reactivity. Na is stored in mineral oil to prevent reaction with moisture. Used in production of NaOH and H₂.",
    jeeFrequency: "Medium",
  },
  {
    id: "caso4-barium",
    name: "BaCl₂ + Na₂SO₄",
    equation: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
    conditions: "Aqueous solution",
    group: "Basic Inorganic",
    significance:
      "White precipitate of BaSO₄; test for SO₄²⁻ ion — insoluble in HCl",
    industrial:
      "BaSO₄ (barytes) used as filler in paints, X-ray contrast agent, drilling fluid in oil wells. Test: adding HCl doesn't dissolve precipitate (unlike BaCO₃, BaSO₃).",
    jeeFrequency: "Medium",
  },
  {
    id: "cl2-water",
    name: "Cl₂ + Water",
    equation: "Cl₂ + H₂O ⇌ HCl + HOCl",
    conditions: "Room temp, equilibrium",
    group: "Basic Inorganic",
    significance:
      "Chlorine water contains HOCl (hypochlorous acid) — the active bleaching/disinfecting agent",
    industrial:
      "HOCl oxidizes bacteria's cell membranes (water treatment). Bleaching powder = Ca(OCl)Cl (chlorinated lime). Cl₂ + NaOH → NaCl + NaOCl + H₂O (at room temp); 3Cl₂ + 6NaOH (hot) → 5NaCl + NaClO₃ + 3H₂O.",
    jeeFrequency: "High",
  },
  {
    id: "znoh2-naoh",
    name: "Zn(OH)₂ + NaOH (Amphoteric)",
    equation: "Zn(OH)₂ + 2NaOH → Na₂[Zn(OH)₄]",
    conditions: "Aqueous, excess NaOH",
    group: "Basic Inorganic",
    significance: "Zn(OH)₂ is amphoteric — reacts with both acid and base",
    industrial:
      "Demonstrates amphoteric character of Zn, Al, Be. ZnO + H₂SO₄ → ZnSO₄ + H₂O (with acid). ZnO + NaOH → Na₂ZnO₂ + H₂O (with base).",
    jeeFrequency: "Medium",
  },

  // ── ORGANIC BASICS ────────────────────────────────────────────────────────
  {
    id: "ethylene-br2",
    name: "Ethylene + Br₂ (Electrophilic Addition)",
    equation: "CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br",
    conditions: "Dry CCl₄ solvent, room temp",
    group: "Organic Basics",
    significance:
      "Decolorizes bromine water — test for alkene unsaturation; anti addition",
    industrial:
      "1,2-dibromoethane used as gasoline additive (anti-knock, leaded fuel era), fumigant. Now largely phased out due to toxicity. The decolorization of bromine is the standard unsaturation test.",
    jeeFrequency: "High",
  },
  {
    id: "markovnikov-hbr",
    name: "Propylene + HBr (Markovnikov)",
    equation: "CH₃CH=CH₂ + HBr → CH₃CHBr–CH₃",
    conditions: "Anhydrous, no peroxides",
    group: "Organic Basics",
    significance:
      "H adds to C with more H (CH₂); 2-bromopropane (Markovnikov product)",
    industrial:
      "Alkyl halides are key synthetic intermediates. 2-Bromopropane is precursor to isopropyl Grignard and isopropanol. Anti-Markovnikov (peroxide) gives 1-bromopropane — demonstrates how conditions control regioselectivity.",
    jeeFrequency: "High",
  },
  {
    id: "benzene-nitration",
    name: "Benzene Nitration",
    equation: "C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O",
    conditions: "Conc. H₂SO₄ + HNO₃ (mixed acid), 50°C",
    group: "Organic Basics",
    significance: "EAS nitration; NO₂⁺ (nitronium ion) is the electrophile",
    industrial:
      "Nitrobenzene → aniline (reduction) → key precursor to dyes (indigo, azo dyes), pharmaceuticals, and polyurethane synthesis. 2,4,6-trinitrotoluene (TNT) from toluene by multiple nitration.",
    jeeFrequency: "High",
  },
  {
    id: "ester-formation",
    name: "Fischer Esterification",
    equation: "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    conditions: "H⁺ catalyst (H₂SO₄), heat, equilibrium",
    group: "Organic Basics",
    significance:
      "Nucleophilic acyl substitution; driven to completion by removing H₂O",
    industrial:
      "Esters used as flavors (ethyl acetate = nail polish remover + pear flavor), plasticizers (phthalate esters), and solvents. Le Chatelier: excess alcohol or removal of H₂O drives ester formation right.",
    jeeFrequency: "High",
  },
  {
    id: "saponification",
    name: "Saponification (Ester Hydrolysis)",
    equation: "RCOOR' + NaOH → RCOONa + R'OH",
    conditions: "Aqueous NaOH, heat",
    group: "Organic Basics",
    significance:
      "Base hydrolysis of ester gives soap (sodium carboxylate); irreversible",
    industrial:
      "Industrial soap production: fats (glyceryl esters) + NaOH → soap (sodium stearate/palmitate) + glycerol. Hard soap = Na salt; soft soap = K salt. Glycerol byproduct used in cosmetics, pharmaceuticals.",
    jeeFrequency: "High",
  },
  {
    id: "alcohol-hbr",
    name: "Alcohol + HBr",
    equation: "R–OH + HBr → R–Br + H₂O",
    conditions: "H₂SO₄ catalyst or PBr₃",
    group: "Organic Basics",
    significance: "Converts alcohol to alkyl halide; reactivity: 3° > 2° > 1°",
    industrial:
      "Alkyl bromides are precursors for Grignard reagents, pharmaceutical synthesis, and alkylating agents. Lucas test: 3° alcohol reacts instantly with ZnCl₂/HCl (turbidity), 2° reacts slowly, 1° very slowly (useful for classification).",
    jeeFrequency: "High",
  },
  {
    id: "oxidation-primary-alcohol",
    name: "Primary Alcohol Oxidation",
    equation: "RCH₂OH → RCHO → RCOOH",
    conditions: "K₂Cr₂O₇/H₂SO₄ or KMnO₄",
    group: "Organic Basics",
    significance:
      "Primary alcohol → aldehyde → carboxylic acid (complete oxidation with K₂Cr₂O₇)",
    industrial:
      "Industrial oxidation of ethanol to acetic acid (ethanoic acid). Selective oxidation to aldehyde using Swern or Oppenauer conditions. Breathalyzer test: K₂Cr₂O₇ (orange) → Cr³⁺ (green) with alcohol.",
    jeeFrequency: "High",
  },
  {
    id: "dehydration-alcohol",
    name: "Alcohol Dehydration",
    equation: "CH₃CH₂OH → CH₂=CH₂ + H₂O",
    conditions: "Conc. H₂SO₄, 170°C (alkene); 140°C gives ether",
    group: "Organic Basics",
    significance:
      "Higher temp (170°C) → alkene (intramolecular); lower temp (140°C) → ether (intermolecular)",
    industrial:
      "Industrial ethylene production. Diethyl ether (anesthetic) from ethanol. Saytzeff's rule: more substituted alkene preferred (Zaitsev elimination).",
    jeeFrequency: "High",
  },
  {
    id: "acyl-chloride-amine",
    name: "Acid Chloride + Amine",
    equation: "RCOCl + NH₃ → RCONH₂ + HCl",
    conditions: "Room temp, anhydrous or aqueous",
    group: "Organic Basics",
    significance:
      "Fast amide formation — reactivity order follows nucleophilic acyl substitution",
    industrial:
      "Synthesis of pharmaceuticals (amide bond is present in ~25% of all drugs). Paracetamol (acetaminophen) synthesis: p-aminophenol + acetic anhydride → paracetamol. Aspirin = salicylic acid + acetic anhydride.",
    jeeFrequency: "Medium",
  },
  {
    id: "diazotization",
    name: "Diazotization of Aniline",
    equation: "C₆H₅NH₂ + NaNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O",
    conditions: "0–5°C (ice), HNO₂",
    group: "Organic Basics",
    significance:
      "Forms diazonium salt — key intermediate for azo dyes and Sandmeyer reactions",
    industrial:
      "Azo dyes (from diazonium + coupling with phenols/amines): ~60% of all synthetic dyes used in textiles are azo compounds. Congo Red, Methyl Orange are azo dyes. Must keep cold to prevent decomposition to phenol.",
    jeeFrequency: "High",
  },
  {
    id: "ozonolysis",
    name: "Ozonolysis of Alkene",
    equation: "RCH=CHR' + O₃ → RCHO + R'CHO (reductive workup)",
    conditions: "O₃ in DCM; then Zn/AcOH or Me₂S",
    group: "Organic Basics",
    significance: "Cleaves C=C double bond; used to determine alkene structure",
    industrial:
      "Used in analytical chemistry to locate double bond position. Industrial ozonolysis of oleic acid → azelaic acid (nylon precursor) + pelargonic acid (lubricants). Perfumery: breakdown of unsaturated fatty aldehydes.",
    jeeFrequency: "Medium",
  },
  {
    id: "grignard-co2",
    name: "Grignard + CO₂ → Carboxylic Acid",
    equation: "RMgX + CO₂ → RCOOMgX → RCOOH (after H₂O)",
    conditions: "Dry ether, then H₃O⁺",
    group: "Organic Basics",
    significance:
      "Adds one C to chain; primary route from RX to RCOOH with one extra carbon",
    industrial:
      "Synthesis of ibuprofen, other anti-inflammatory drugs via Grignard carbonation. Adds exactly one carbon — useful for chain extension by one unit. Frequently tested in JEE as combination reaction.",
    jeeFrequency: "High",
  },
  {
    id: "haloform",
    name: "Haloform Reaction",
    equation: "CH₃COR + 3X₂ + 3NaOH → CHX₃ + RCOONa",
    conditions: "X₂ = Cl₂, Br₂, or I₂; NaOH(aq)",
    group: "Organic Basics",
    significance:
      "CH₃CO– group → CHX₃ (haloform) + carboxylate; Iodoform test for CH₃CO–",
    industrial:
      "Iodoform (CHI₃) test: positive with acetaldehyde (CH₃CHO), methyl ketones (CH₃COR), and secondary alcohols with CH₃CHOH– group (oxidized to ketone in situ). Yellow precipitate of CHI₃ is diagnostic. Industrial source of chloroform (CHCl₃) and iodoform.",
    jeeFrequency: "High",
  },
  {
    id: "fehling-test",
    name: "Fehling's Test",
    equation: "RCHO + 2[Cu(OH)₄]²⁻ → RCOONa + Cu₂O↓ + H₂O",
    conditions: "Alkaline copper tartrate complex, heat",
    group: "Organic Basics",
    significance:
      "Red precipitate of Cu₂O — positive for aldehydes, not ketones (except fructose)",
    industrial:
      "Clinical test for reducing sugars (glucose) in urine (diabetes diagnosis before modern glucometers). Glucose, fructose, and other reducing sugars give positive Fehling's. Sucrose (non-reducing) gives negative. Tollens' is more sensitive (silver mirror test).",
    jeeFrequency: "Medium",
  },
  {
    id: "aldehyde-kmno4",
    name: "Alkene + KMnO₄ (Baeyer's Test)",
    equation: "3R₂C=CR₂ + 2KMnO₄ + 4H₂O → 3R₂C(OH)–C(OH)R₂ + 2MnO₂ + 2KOH",
    conditions: "Cold, dilute KMnO₄ (alkaline)",
    group: "Organic Basics",
    significance:
      "Purple KMnO₄ decolorized — Baeyer's test for unsaturation (syn dihydroxylation)",
    industrial:
      "Glycols (1,2-diols) from Baeyer oxidation of alkenes. Acidic KMnO₄ (hot) cleaves C=C entirely → ketones or carboxylic acids (oxidative cleavage). Useful for structural determination.",
    jeeFrequency: "Medium",
  },
  {
    id: "carbylamine",
    name: "Carbylamine Reaction",
    equation: "RNH₂ + CHCl₃ + 3KOH → RNC + 3KCl + 3H₂O",
    conditions: "Alcoholic KOH, heat",
    group: "Organic Basics",
    significance:
      "Isocyanide (RNC) has extremely foul smell — test for primary amines only",
    industrial:
      "Diagnostic test for primary amines. 2° and 3° amines do NOT give positive carbylamine test. Isocyanides are useful synthetic intermediates in multicomponent reactions (Ugi reaction).",
    jeeFrequency: "Medium",
  },

  // ── INDUSTRIAL CHEMISTRY ──────────────────────────────────────────────────
  {
    id: "haber",
    name: "Haber Process",
    equation: "N₂ + 3H₂ ⇌ 2NH₃",
    conditions: "450°C, 200 atm, Fe catalyst",
    group: "Industrial Chemistry",
    significance:
      "Produces ammonia for fertilizers — feeds ~50% of world population",
    industrial:
      "~175 Mt of NH₃ produced annually; 80% in fertilizers (urea, ammonium nitrate), remainder in explosives (TNT, RDX), refrigerants, cleaning products. Responsible for sustaining ~half the world's food supply.",
    jeeFrequency: "High",
  },
  {
    id: "contact",
    name: "Contact Process",
    equation: "2SO₂ + O₂ ⇌ 2SO₃",
    conditions: "450°C, V₂O₅ catalyst",
    group: "Industrial Chemistry",
    significance:
      "Step in manufacturing H₂SO₄, the most produced industrial chemical",
    industrial:
      "~270 Mt of H₂SO₄ produced yearly. Used in fertilizer production (superphosphate), petroleum refining, car batteries (lead-acid), steel pickling, dye manufacturing.",
    jeeFrequency: "High",
  },
  {
    id: "ostwald",
    name: "Ostwald Process",
    equation: "4NH₃ + 5O₂ → 4NO + 6H₂O",
    conditions: "Pt catalyst, ~900°C",
    group: "Industrial Chemistry",
    significance:
      "Converts ammonia to nitric oxide — key step in HNO₃ production",
    industrial:
      "~60 Mt of HNO₃ produced per year globally. Used in ammonium nitrate (fertilizer/explosives), nitrobenzene (→ aniline), adipic acid (nylon).",
    jeeFrequency: "High",
  },
  {
    id: "solvay",
    name: "Solvay Process",
    equation: "NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl",
    conditions: "Room temp, CO₂ pressurized",
    group: "Industrial Chemistry",
    significance:
      "Major industrial process for producing sodium carbonate (washing soda)",
    industrial:
      "~50 Mt of Na₂CO₃ produced per year. Used in glass manufacturing (~50% of output), detergents, paper pulp, and water softening. NH₃ is recovered and recycled.",
    jeeFrequency: "Medium",
  },
  {
    id: "bayer-alcl3",
    name: "Bayer Process (Alumina)",
    equation: "Al₂O₃·xH₂O + 2NaOH → 2NaAlO₂ + (x+1)H₂O",
    conditions: "Hot concentrated NaOH, ~250°C",
    group: "Industrial Chemistry",
    significance:
      "Extracts Al₂O₃ (alumina) from bauxite — precursor to aluminium metal",
    industrial:
      "Followed by Hall-Héroult electrolysis (Al₂O₃ dissolved in molten cryolite at 950°C → Al metal). Global Al production ~65 Mt/year. Al is the most abundant metal in Earth's crust, but expensive due to electrolysis energy costs.",
    jeeFrequency: "Medium",
  },
  {
    id: "bessemer",
    name: "Bessemer/Basic Oxygen Process (Steel)",
    equation: "2C + O₂ → 2CO; Si + O₂ → SiO₂",
    conditions: "Blast of O₂ through molten pig iron",
    group: "Industrial Chemistry",
    significance:
      "Removes carbon and impurities from pig iron to produce steel",
    industrial:
      "Basic oxygen furnace (BOF): O₂ blown through molten pig iron removes C as CO/CO₂, Si as SiO₂ (slag). 70% of world's steel made this way. Electric arc furnace (EAF) used for recycled steel. Steel = iron + 0.2–2% C + alloying elements.",
    jeeFrequency: "Low",
  },
  {
    id: "blast-furnace",
    name: "Blast Furnace (Fe Extraction)",
    equation: "Fe₂O₃ + 3CO → 2Fe + 3CO₂",
    conditions: "1500–2000°C in blast furnace",
    group: "Industrial Chemistry",
    significance: "Carbon monoxide reduces iron ore to pig iron",
    industrial:
      "Global iron production ~1.2 billion tonnes/year. Coke (C) burns with hot air → CO₂ → CO (reducing agent). CaCO₃ (limestone) added as flux → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (slag, removes silica impurities).",
    jeeFrequency: "Medium",
  },
  {
    id: "chloralkali",
    name: "Chlor-Alkali Process",
    equation: "2NaCl + 2H₂O → 2NaOH + H₂ + Cl₂",
    conditions: "Electrolysis of brine",
    group: "Industrial Chemistry",
    significance:
      "Produces NaOH, H₂, and Cl₂ — all essential industrial chemicals",
    industrial:
      "Global Cl₂ production ~70 Mt/year. NaOH in paper, textiles (viscose), soap, alumina production. Cl₂ in PVC manufacture, water disinfection, pharmaceutical synthesis. H₂ byproduct used as clean fuel or hydrogenation.",
    jeeFrequency: "High",
  },
  {
    id: "methanol-synthesis",
    name: "Methanol Synthesis",
    equation: "CO + 2H₂ ⇌ CH₃OH",
    conditions: "250°C, 50 atm, Cu/ZnO/Al₂O₃ catalyst",
    group: "Industrial Chemistry",
    significance:
      "Major industrial chemical synthesis; methanol is feedstock for formaldehyde, acetic acid, MTBE",
    industrial:
      "~110 Mt of methanol produced annually. Used in biodiesel production, fuel cells, as antifreeze, and precursor to formaldehyde (Bakelite, plywood adhesives). Syngas (CO+H₂) from steam reforming of natural gas.",
    jeeFrequency: "Low",
  },
  {
    id: "cracking",
    name: "Catalytic Cracking",
    equation: "C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆ (typical)",
    conditions: "500–700°C, zeolite catalyst (acidic sites)",
    group: "Industrial Chemistry",
    significance:
      "Breaks large hydrocarbons into smaller, more useful fractions (petrol range)",
    industrial:
      "FCC (fluid catalytic cracking) — largest application of heterogeneous catalysis globally. Converts heavy gas oil to gasoline. Gives branched alkanes (better octane rating) and alkenes. Also produces LPG and C₃/C₄ olefins for petrochemicals.",
    jeeFrequency: "Low",
  },

  // ── ELECTROCHEMISTRY ──────────────────────────────────────────────────────
  {
    id: "zinc-copper-cell",
    name: "Daniell Cell (Zn-Cu)",
    equation: "Zn + Cu²⁺ → Zn²⁺ + Cu",
    conditions: "Standard conditions: E°cell = 1.10 V",
    group: "Electrochemistry",
    significance:
      "First practical electrochemical cell; anode = Zn (oxidation), cathode = Cu (reduction)",
    industrial:
      "Principle behind all galvanic cells. E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V. ΔG° = −nFE° = −2 × 96485 × 1.10 = −212 kJ/mol. Basis of modern battery chemistry.",
    jeeFrequency: "High",
  },
  {
    id: "electrolysis-water",
    name: "Electrolysis of Water",
    equation: "2H₂O → 2H₂ + O₂",
    conditions: "Dilute H₂SO₄ electrolyte, Pt electrodes, 1.23V minimum",
    group: "Electrochemistry",
    significance:
      "Splits water into H₂ (cathode) and O₂ (anode); minimum voltage = 1.23 V",
    industrial:
      "Green hydrogen production using renewable electricity (electrolysis). Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻. Anode: 2H₂O → O₂ + 4H⁺ + 4e⁻. PEM electrolyzers for high-purity H₂. Key technology for decarbonization.",
    jeeFrequency: "High",
  },
  {
    id: "electrolysis-brine-hg",
    name: "Electrolysis of Brine (Mercury Cell)",
    equation: "2NaCl + 2Hg → 2NaHg (amalgam) + Cl₂",
    conditions: "Mercury cathode, electrolysis",
    group: "Electrochemistry",
    significance:
      "Produces Cl₂ at anode, Na amalgam at Hg cathode (then reacted with water)",
    industrial:
      "Historical industrial process now largely replaced (Hg toxicity). Membrane cell (modern): ion-exchange membrane separates anolyte and catholyte. Produces 98% pure NaOH. Cl₂ + NaOH + H₂ are the three products of Chlor-Alkali.",
    jeeFrequency: "Medium",
  },
  {
    id: "hall-heroult",
    name: "Hall-Héroult Process (Al)",
    equation: "Al₂O₃ → 2Al + 3/2 O₂",
    conditions: "Electrolysis of Al₂O₃ in molten cryolite at 950°C",
    group: "Electrochemistry",
    significance: "Electrochemical reduction of alumina to aluminium metal",
    industrial:
      "Cathode: Al³⁺ + 3e⁻ → Al (liquid). Anode: O²⁻ → O₂ + 2e⁻ (anodes are consumed). Cryolite (Na₃AlF₆) lowers Al₂O₃ melting point from 2050°C to 950°C. ~14 kWh per kg Al — highly energy intensive.",
    jeeFrequency: "High",
  },
  {
    id: "downs-cell",
    name: "Down's Cell (Na Extraction)",
    equation: "2NaCl(l) → 2Na(l) + Cl₂(g)",
    conditions: "Electrolysis of molten NaCl, 600°C; CaCl₂ added to lower mp",
    group: "Electrochemistry",
    significance: "Industrial production of metallic sodium by electrolysis",
    industrial:
      "CaCl₂ added to molten NaCl to lower melting point from 800°C to 600°C (energy saving). Iron gauze separates Na and Cl₂ (otherwise they'd react). Na used as heat transfer medium in nuclear reactors, in sodium vapor lamps, and in synthesis of tetraethyllead (historical).",
    jeeFrequency: "Medium",
  },
  {
    id: "copper-plating",
    name: "Copper Electroplating",
    equation: "Cu²⁺ + 2e⁻ → Cu (cathode deposition)",
    conditions: "CuSO₄ electrolyte; Cu anode dissolves",
    group: "Electrochemistry",
    significance: "Demonstrates Faraday's laws; Cu deposits on cathode object",
    industrial:
      "Electroplating protects metals from corrosion and improves appearance. Cu plating thickness controlled by Q = It (Faraday's law). Silver, gold, zinc plating use same principle. Printed circuit boards made by copper electroplating through-holes.",
    jeeFrequency: "Medium",
  },
  {
    id: "lead-acid-discharge",
    name: "Lead-Acid Battery (Discharge)",
    equation: "Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O",
    conditions: "6-cell, 12V standard car battery",
    group: "Electrochemistry",
    significance:
      "Rechargeable battery; PbSO₄ forms on both electrodes during discharge",
    industrial:
      "Anode (Pb): Pb + SO₄²⁻ → PbSO₄ + 2e⁻. Cathode (PbO₂): PbO₂ + 4H⁺ + SO₄²⁻ + 2e⁻ → PbSO₄ + 2H₂O. On charging, reactions reverse. H₂SO₄ concentration increases on charging (can test with hydrometer). ~250 Mt of lead-acid batteries in use globally.",
    jeeFrequency: "High",
  },
  {
    id: "leclanche-cell",
    name: "Leclanché Dry Cell",
    equation: "Zn + 2MnO₂ + NH₄Cl → Zn(NH₃)₂Cl₂ + Mn₂O₃ + H₂O",
    conditions: "Zn container (anode), MnO₂+C (cathode), NH₄Cl paste",
    group: "Electrochemistry",
    significance: "Common dry cell battery (~1.5 V); Zn casing is the anode",
    industrial:
      "Most widely used primary battery. Alkaline version: Zn powder anode, KOH electrolyte, MnO₂ cathode (~1.5V). Better capacity and shelf life than acid version. ~15 billion dry cells manufactured annually worldwide.",
    jeeFrequency: "Medium",
  },
];

const ALL_GROUPS: ReactionGroup[] = [
  "Basic Inorganic",
  "Organic Basics",
  "Industrial Chemistry",
  "Electrochemistry",
];

function ReactionCard({ r, i }: { r: Reaction; i: number }) {
  const [open, setOpen] = useState(false);
  const freq = FREQ_STYLES[r.jeeFrequency];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.03 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.18 0.02 250 / 0.55)",
        backdropFilter: "blur(24px)",
        border: `1px solid ${GROUP_COLORS[r.group].text}33`,
      }}
      data-ocid={`reactions.item.${i + 1}`}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="font-display text-sm font-semibold leading-tight">
            {r.name}
          </h3>
          <div className="flex gap-2 flex-shrink-0 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: GROUP_COLORS[r.group].bg,
                color: GROUP_COLORS[r.group].text,
              }}
            >
              {r.group}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: freq.bg, color: freq.text }}
            >
              {freq.label}
            </span>
          </div>
        </div>

        <div
          className="rounded-xl px-3 py-2 font-mono text-sm text-center"
          style={{
            background: "oklch(0.14 0.02 250 / 0.6)",
            border: "1px solid oklch(0.28 0.02 250 / 0.4)",
          }}
        >
          {r.equation}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs px-2.5 py-1 rounded-lg font-medium"
            style={{
              background: "oklch(0.68 0.14 260 / 0.15)",
              border: "1px solid oklch(0.68 0.14 260 / 0.3)",
              color: "oklch(0.72 0.14 260)",
            }}
          >
            ⚗ {r.conditions}
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {r.significance}
        </p>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: GROUP_COLORS[r.group].text }}
          data-ocid={`reactions.expand.${i + 1}`}
        >
          {open ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
          Industrial / Applications
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div
                className="rounded-xl p-3 text-xs leading-relaxed"
                style={{
                  background: "oklch(0.7 0.18 200 / 0.08)",
                  border: "1px solid oklch(0.7 0.18 200 / 0.25)",
                  color: "oklch(0.82 0.06 200)",
                }}
              >
                🏭 {r.industrial}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ImportantReactionsTab() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ReactionGroup | "All">("All");

  const filtered = REACTIONS.filter((r) => {
    const matchGroup = filter === "All" || r.group === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.equation.toLowerCase().includes(q) ||
      r.conditions.toLowerCase().includes(q) ||
      r.significance.toLowerCase().includes(q);
    return matchGroup && matchSearch;
  });

  return (
    <div className="space-y-4" data-ocid="reactions.panel">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reactions, equations, conditions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-transparent border border-border/50 focus:outline-none focus:border-primary/60 placeholder:text-muted-foreground"
            style={{
              background: "oklch(0.18 0.02 250 / 0.5)",
              backdropFilter: "blur(16px)",
            }}
            data-ocid="reactions.search_input"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setFilter("All")}
            className="px-3 py-2 rounded-xl text-xs font-medium transition-colors"
            style={
              filter === "All"
                ? {
                    background: "oklch(0.68 0.16 258 / 0.25)",
                    color: "oklch(0.72 0.18 258)",
                    border: "1px solid oklch(0.68 0.16 258 / 0.4)",
                  }
                : {
                    background: "oklch(0.18 0.02 250 / 0.4)",
                    color: "oklch(0.58 0 0)",
                    border: "1px solid oklch(0.28 0.02 250 / 0.4)",
                  }
            }
            data-ocid="reactions.filter.all"
          >
            All ({REACTIONS.length})
          </button>
          {ALL_GROUPS.map((group) => {
            const count = REACTIONS.filter((r) => r.group === group).length;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setFilter(group)}
                className="px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                style={
                  filter === group
                    ? {
                        background: GROUP_COLORS[group].bg,
                        color: GROUP_COLORS[group].text,
                        border: `1px solid ${GROUP_COLORS[group].text}55`,
                      }
                    : {
                        background: "oklch(0.18 0.02 250 / 0.4)",
                        color: "oklch(0.58 0 0)",
                        border: "1px solid oklch(0.28 0.02 250 / 0.4)",
                      }
                }
                data-ocid={`reactions.filter.${group.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
              >
                {group} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Reaction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((r, i) => (
          <ReactionCard key={r.id} r={r} i={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="reactions.empty_state"
        >
          No reactions match your search.
        </div>
      )}
    </div>
  );
}
