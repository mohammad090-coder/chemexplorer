import { cn } from "@/lib/utils";
import { ChevronDown, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useMemo, useState } from "react";

type ReactionType =
  | "Combustion"
  | "Addition"
  | "Substitution"
  | "Elimination"
  | "Aromatic"
  | "Oxidation"
  | "Reduction"
  | "Named";

interface CarbonReaction {
  id: number;
  name: string;
  equation: string;
  type: ReactionType;
  conditions: string;
  explanation: string;
  mechanism?: string;
}

const ALL_REACTIONS: CarbonReaction[] = [
  // Combustion
  {
    id: 1,
    name: "Complete combustion of methane",
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation:
      "Produces CO₂ and H₂O. Primary reaction in natural gas appliances and power generation.",
  },
  {
    id: 2,
    name: "Incomplete combustion of methane",
    equation: "2CH₄ + 3O₂ → 2CO + 4H₂O",
    type: "Combustion",
    conditions: "Limited oxygen",
    explanation:
      "Produces toxic carbon monoxide. Dangerous in poorly ventilated spaces.",
  },
  {
    id: 3,
    name: "Combustion of ethane",
    equation: "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation:
      "Ethane burns with a clean blue flame. Used in liquid petroleum gas mixtures.",
  },
  {
    id: 4,
    name: "Combustion of propane",
    equation: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation:
      "LPG combustion reaction. Propane has high energy density, ideal for portable fuels.",
  },
  {
    id: 5,
    name: "Combustion of ethanol",
    equation: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O",
    type: "Combustion",
    conditions: "Excess oxygen, ignition",
    explanation:
      "Bioethanol as renewable fuel. Burns cleanly compared to petrol.",
  },
  {
    id: 6,
    name: "Combustion of glucose",
    equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    type: "Combustion",
    conditions: "Biological (cellular respiration)",
    explanation:
      "The fundamental energy-releasing reaction in living cells. ΔH = −2803 kJ/mol.",
  },
  {
    id: 7,
    name: "Combustion of acetylene",
    equation: "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    type: "Combustion",
    conditions: "Oxygen, spark; temp 3500°C",
    explanation:
      "Oxy-acetylene welding reaches 3500°C — hot enough to cut through steel.",
  },
  {
    id: 8,
    name: "Combustion of benzene",
    equation: "2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O",
    type: "Combustion",
    conditions: "Excess oxygen",
    explanation:
      "Benzene burns with a smoky yellow flame due to its high carbon content.",
  },

  // Addition Reactions
  {
    id: 9,
    name: "Hydrogenation of ethene",
    equation: "C₂H₄ + H₂ → C₂H₆",
    type: "Addition",
    conditions: "Ni catalyst, 150°C",
    explanation:
      "Adds H₂ across the double bond. Used industrially to harden vegetable oils into margarine.",
  },
  {
    id: 10,
    name: "Halogenation of ethene (Br₂)",
    equation: "C₂H₄ + Br₂ → CH₂BrCH₂Br",
    type: "Addition",
    conditions: "CCl₄ solvent, room temp",
    explanation:
      "Electrophilic addition. Decolorises bromine water — a standard alkene test.",
  },
  {
    id: 11,
    name: "Hydration of ethene",
    equation: "C₂H₄ + H₂O → C₂H₅OH",
    type: "Addition",
    conditions: "H₃PO₄ catalyst, 300°C, 60 atm",
    explanation:
      "Industrial production of ethanol. Phosphoric acid is the catalyst in the steam-hydration process.",
  },
  {
    id: 12,
    name: "HBr addition to propene (Markovnikov)",
    equation: "C₃H₆ + HBr → CH₃CHBrCH₃",
    type: "Addition",
    conditions: "HBr gas, no peroxide",
    explanation:
      "Markovnikov's rule: H adds to the carbon with more H atoms. Gives 2-bromopropane (major product).",
  },
  {
    id: 13,
    name: "HBr addition to propene (Anti-Markovnikov)",
    equation: "C₃H₆ + HBr → CH₃CH₂CH₂Br",
    type: "Addition",
    conditions: "HBr + peroxide (ROOR)",
    explanation:
      "Peroxide causes free-radical mechanism — reversal of Markovnikov. Gives 1-bromopropane.",
  },
  {
    id: 14,
    name: "Hydrogenation of ethyne to ethene",
    equation: "C₂H₂ + H₂ → C₂H₄",
    type: "Addition",
    conditions: "Lindlar catalyst (Pd/CaCO₃), room temp",
    explanation:
      "Lindlar catalyst gives partial hydrogenation, stopping at cis-alkene stage.",
  },
  {
    id: 15,
    name: "Hydrogenation of ethyne to ethane",
    equation: "C₂H₂ + 2H₂ → C₂H₆",
    type: "Addition",
    conditions: "Ni catalyst, heat",
    explanation:
      "Complete reduction of triple bond to single bond via excess H₂.",
  },
  {
    id: 16,
    name: "Chlorination of ethene",
    equation: "C₂H₄ + Cl₂ → CH₂ClCH₂Cl",
    type: "Addition",
    conditions: "Dark, room temperature",
    explanation:
      "Gives 1,2-dichloroethane. Industrially used to make vinyl chloride (PVC precursor).",
  },
  {
    id: 17,
    name: "Ozonolysis of ethene",
    equation: "C₂H₄ + O₃ → 2HCHO (after reductive workup)",
    type: "Addition",
    conditions: "O₃, then Zn/H₂O",
    explanation:
      "Cleaves double bond. Used to determine position of C=C in unknown compounds.",
  },
  {
    id: 18,
    name: "Polymerization of ethene",
    equation: "nCH₂=CH₂ → −(CH₂–CH₂)ₙ−",
    type: "Addition",
    conditions: "High pressure, TiCl₄ catalyst or peroxide",
    explanation:
      "Forms polyethylene (PE). Ziegler-Natta catalysts give HDPE; free radical gives LDPE.",
  },

  // Substitution
  {
    id: 19,
    name: "Free radical chlorination of methane",
    equation: "CH₄ + Cl₂ → CH₃Cl + HCl",
    type: "Substitution",
    conditions: "UV light or 300°C",
    explanation:
      "Free radical chain reaction. Initiation by UV splits Cl₂. Product is chloromethane.",
  },
  {
    id: 20,
    name: "Free radical bromination of methane",
    equation: "CH₄ + Br₂ → CH₃Br + HBr",
    type: "Substitution",
    conditions: "UV light or heat",
    explanation:
      "Slower than chlorination but more selective. Selectivity increases with branching.",
  },
  {
    id: 21,
    name: "SN1 — tert-butyl bromide hydrolysis",
    equation: "(CH₃)₃CBr + H₂O → (CH₃)₃COH + HBr",
    type: "Substitution",
    conditions: "Aqueous, weak nucleophile",
    explanation:
      "Unimolecular. Step 1: ionisation to carbocation. Step 2: nucleophile attacks. Rate = k[RBr]. Retention + inversion (racemisation).",
  },
  {
    id: 22,
    name: "SN2 — methyl bromide + NaOH",
    equation: "CH₃Br + NaOH → CH₃OH + NaBr",
    type: "Substitution",
    conditions: "Polar aprotic solvent (DMSO/acetone)",
    explanation:
      "Bimolecular one-step backside attack. Rate = k[CH₃Br][OH⁻]. Complete inversion (Walden inversion).",
  },
  {
    id: 23,
    name: "Nucleophilic acyl substitution (ester formation)",
    equation: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O",
    type: "Substitution",
    conditions: "H₂SO₄ catalyst, heat (Fischer esterification)",
    explanation:
      "Reversible. Le Chatelier: remove water to shift right. Used to make ethyl acetate.",
  },
  {
    id: 24,
    name: "Halogenation of benzene (Friedel-Crafts)",
    equation: "C₆H₆ + Cl₂ → C₆H₅Cl + HCl",
    type: "Substitution",
    conditions: "AlCl₃ catalyst, anhydrous",
    explanation:
      "Electrophilic aromatic substitution. AlCl₃ generates Cl⁺ electrophile. Preserves aromatic ring.",
  },
  {
    id: 25,
    name: "Nitration of benzene",
    equation: "C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O",
    type: "Substitution",
    conditions: "Conc. H₂SO₄ + conc. HNO₃, 50°C",
    explanation:
      "H₂SO₄ generates NO₂⁺ electrophile. Electrophilic aromatic substitution. Forms nitrobenzene.",
  },
  {
    id: 26,
    name: "Sulfonation of benzene",
    equation: "C₆H₆ + H₂SO₄ → C₆H₅SO₃H + H₂O",
    type: "Substitution",
    conditions: "Fuming H₂SO₄ (oleum), heat",
    explanation:
      "Reversible electrophilic aromatic substitution. Sulfonation can be reversed by steam at 180°C.",
  },
  {
    id: 27,
    name: "Friedel-Crafts alkylation",
    equation: "C₆H₆ + RCl → C₆H₅R + HCl",
    type: "Substitution",
    conditions: "AlCl₃ or BF₃ catalyst",
    explanation:
      "Introduces alkyl group onto benzene ring. Susceptible to polyalkylation and carbocation rearrangements.",
  },

  // Elimination
  {
    id: 28,
    name: "Dehydration of ethanol (E1)",
    equation: "C₂H₅OH → C₂H₄ + H₂O",
    type: "Elimination",
    conditions: "Conc. H₂SO₄, 170°C (excess acid)",
    explanation:
      "E1 mechanism. At 170°C ethene is the major product; at 140°C ether forms.",
  },
  {
    id: 29,
    name: "Dehydrohalogenation (E2) of ethyl bromide",
    equation: "CH₃CH₂Br + KOH → CH₂=CH₂ + KBr + H₂O",
    type: "Elimination",
    conditions: "Alcoholic KOH, heat",
    explanation:
      "E2 bimolecular mechanism. Requires anti-periplanar geometry. Saytzeff's rule: more substituted alkene is major.",
  },
  {
    id: 30,
    name: "Dehydrohalogenation of 2-bromobutane",
    equation: "CH₃CHBrCH₂CH₃ + KOH(alc) → but-2-ene (major) + but-1-ene",
    type: "Elimination",
    conditions: "Alcoholic KOH, heat",
    explanation:
      "Saytzeff's rule: more substituted, more stable alkene predominates. But-2-ene is trans predominantly.",
  },
  {
    id: 31,
    name: "Thermal cracking of hexane",
    equation: "C₆H₁₄ → C₃H₈ + C₃H₆ (one possibility)",
    type: "Elimination",
    conditions: "700–900°C, no catalyst",
    explanation:
      "Random C-C bond homolysis. Produces smaller alkanes + alkenes. Industrial source of alkenes.",
  },
  {
    id: 32,
    name: "Catalytic cracking",
    equation: "C₁₀H₂₂ → C₄H₈ + C₃H₆ + CH₄ + ...",
    type: "Elimination",
    conditions: "Zeolite catalyst, 450–500°C",
    explanation:
      "Produces high-octane petrol fractions and alkene feedstocks for petrochemical industry.",
  },

  // Aromatic
  {
    id: 33,
    name: "Hydrogenation of benzene",
    equation: "C₆H₆ + 3H₂ → C₆H₁₂ (cyclohexane)",
    type: "Aromatic",
    conditions: "Ni catalyst, 200°C, high pressure",
    explanation:
      "Requires 3 mol H₂. Ring is unusually stable (resonance energy 150 kJ/mol) — conditions are harsher than for alkenes.",
  },
  {
    id: 34,
    name: "Birch reduction of benzene",
    equation: "C₆H₆ + 2Na + 2EtOH → 1,4-cyclohexadiene",
    type: "Aromatic",
    conditions: "Na/NH₃(l), alcohol",
    explanation:
      "Partial reduction of benzene ring. Electron-withdrawing groups — double bonds end on substituted carbons.",
  },
  {
    id: 35,
    name: "Benzene + acetyl chloride (Friedel-Crafts acylation)",
    equation: "C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl",
    type: "Aromatic",
    conditions: "AlCl₃, anhydrous, reflux",
    explanation:
      "Gives acetophenone. No polyacylation unlike alkylation — the acyl group deactivates the ring.",
  },
  {
    id: 36,
    name: "Oxidation of toluene → benzoic acid",
    equation: "C₆H₅CH₃ + [O] → C₆H₅COOH",
    type: "Aromatic",
    conditions: "KMnO₄, H₂SO₄, heat; or K₂Cr₂O₇",
    explanation:
      "Alkyl side chains on benzene are oxidised to –COOH. Useful for identifying substituted benzenes.",
  },
  {
    id: 37,
    name: "Coupling of benzene diazonium with phenol",
    equation: "C₆H₅N₂⁺ + C₆H₅OH → C₆H₅-N=N-C₆H₄OH + H⁺",
    type: "Aromatic",
    conditions: "Alkaline, cold (0–5°C)",
    explanation:
      "Azo coupling reaction. Produces an azo dye. Used in textile and food colouring industries.",
  },

  // Oxidation
  {
    id: 38,
    name: "Oxidation of ethanol to ethanal",
    equation: "C₂H₅OH + [O] → CH₃CHO + H₂O",
    type: "Oxidation",
    conditions: "K₂Cr₂O₇/H₂SO₄, warm (distil off product)",
    explanation:
      "Primary alcohol → aldehyde. Use excess alcohol and distil to prevent over-oxidation to acid.",
  },
  {
    id: 39,
    name: "Oxidation of ethanal to acetic acid",
    equation: "CH₃CHO + [O] → CH₃COOH",
    type: "Oxidation",
    conditions: "KMnO₄ or K₂Cr₂O₇, H₂SO₄",
    explanation:
      "Aldehyde → carboxylic acid. Cr²O₇ changes from orange to green — colour change indicator.",
  },
  {
    id: 40,
    name: "Oxidation of secondary alcohol (propan-2-ol)",
    equation: "(CH₃)₂CHOH + [O] → (CH₃)₂C=O (acetone)",
    type: "Oxidation",
    conditions: "K₂Cr₂O₇/H₂SO₄, warm",
    explanation:
      "Secondary alcohol → ketone. Ketones resist further oxidation under mild conditions.",
  },
  {
    id: 41,
    name: "Tollens' silver mirror test (aldehyde)",
    equation: "RCHO + Ag(NH₃)₂⁺ + OH⁻ → RCOO⁻ + Ag↓ + NH₃",
    type: "Oxidation",
    conditions: "Tollens' reagent, warm water bath",
    explanation:
      "Positive: silver mirror on tube. Ketones give negative — distinguishes aldehydes from ketones.",
  },
  {
    id: 42,
    name: "Fehling's test for aldehyde",
    equation: "RCHO + 2Cu²⁺ + 5OH⁻ → RCOO⁻ + Cu₂O↓ + 3H₂O",
    type: "Oxidation",
    conditions: "Fehling solution A+B, heat",
    explanation:
      "Blue Cu²⁺ reduced to brick-red Cu₂O precipitate. Aliphatic aldehydes only (not aromatic).",
  },
  {
    id: 43,
    name: "Oxidation of glucose to gluconic acid",
    equation: "C₆H₁₂O₆ + [O] → C₆H₁₂O₇",
    type: "Oxidation",
    conditions: "Mild oxidant (Tollens' or Fehling)",
    explanation:
      "Glucose is an aldehyde (aldohexose) — gives positive Tollens and Fehling tests.",
  },
  {
    id: 44,
    name: "Combustion of carbon to CO₂",
    equation: "C + O₂ → CO₂",
    type: "Oxidation",
    conditions: "Excess oxygen, heat",
    explanation:
      "Complete oxidation. ΔH = −394 kJ/mol. Basis of carbon fuel energy.",
  },

  // Reduction
  {
    id: 45,
    name: "Reduction of ethanal to ethanol",
    equation: "CH₃CHO + 2[H] → C₂H₅OH",
    type: "Reduction",
    conditions: "LiAlH₄/ether (dry) or NaBH₄/methanol",
    explanation:
      "Aldehyde → primary alcohol. NaBH₄ is selective (won't reduce esters/acids); LiAlH₄ is a stronger reductant.",
  },
  {
    id: 46,
    name: "Reduction of acetone to propan-2-ol",
    equation: "(CH₃)₂CO + 2[H] → (CH₃)₂CHOH",
    type: "Reduction",
    conditions: "NaBH₄, methanol, 0°C",
    explanation:
      "Ketone → secondary alcohol. NaBH₄ is safe to use in protic solvents unlike LiAlH₄.",
  },
  {
    id: 47,
    name: "Reduction of acetic acid to ethanol",
    equation: "CH₃COOH + 4[H] → C₂H₅OH + H₂O",
    type: "Reduction",
    conditions: "LiAlH₄/ether (dry, reflux)",
    explanation:
      "Carboxylic acid requires LiAlH₄ (strong reductant). NaBH₄ cannot reduce acids.",
  },
  {
    id: 48,
    name: "Hydrogenation of fats (industrial)",
    equation: "−CH=CH− + H₂ → −CH₂−CH₂−",
    type: "Reduction",
    conditions: "Ni catalyst, 150°C, high pressure",
    explanation:
      "Converts unsaturated vegetable oils to semi-solid fats (margarine). Partial hydrogenation creates trans fats.",
  },
  {
    id: 49,
    name: "Wolff-Kishner reduction",
    equation: "R₂C=O + NH₂NH₂ + KOH → R₂CH₂ + N₂ + H₂O",
    type: "Reduction",
    conditions: "N₂H₄, KOH, ethylene glycol, 200°C",
    explanation:
      "Reduces ketone/aldehyde C=O directly to CH₂. Complement to Clemmensen (which uses Zn-Hg/HCl).",
  },
  {
    id: 50,
    name: "Clemmensen reduction",
    equation: "R₂C=O + Zn(Hg)/HCl → R₂CH₂",
    type: "Reduction",
    conditions: "Zn-Hg amalgam, conc. HCl, reflux",
    explanation:
      "Reduces C=O to CH₂ in acid-sensitive substrates. Used for aromatic ketones. Complementary to Wolff-Kishner.",
  },

  // Named Reactions
  {
    id: 51,
    name: "Aldol Condensation",
    equation: "2CH₃CHO → CH₃CH(OH)CH₂CHO (aldol)",
    type: "Named",
    conditions: "Dil. NaOH, cold (addition); or heat (condensation)",
    explanation:
      "α-hydrogen is acidic — forms enolate which attacks carbonyl of another molecule. Aldol = 3-hydroxybutanal.",
    mechanism:
      "1. Base removes α-H → enolate\n2. Enolate attacks C=O\n3. Aldol product (3-hydroxybutanal)\n4. On heating: dehydration → α,β-unsaturated aldehyde (but-2-enal)",
  },
  {
    id: 52,
    name: "Cannizzaro Reaction",
    equation: "2HCHO + NaOH → HCOONa + CH₃OH",
    type: "Named",
    conditions: "Conc. NaOH, formaldehyde (no α-H aldehyde)",
    explanation:
      "Disproportionation: one molecule of aldehyde oxidised to acid, another reduced to alcohol. Requires no α-H.",
    mechanism:
      "1. OH⁻ attacks C=O of HCHO → hydride transfer\n2. One HCHO → HCOO⁻ (formate)\n3. Other HCHO → CH₃OH (methanol)",
  },
  {
    id: 53,
    name: "Grignard Synthesis",
    equation: "RMgX + R'CHO → R-CHOH-R' (after hydrolysis)",
    type: "Named",
    conditions: "Dry ether, anhydrous, then aq. NH₄Cl",
    explanation:
      "Grignard reagent (RMgX) is a powerful nucleophile. Reacts with aldehydes/ketones to give secondary/tertiary alcohols.",
    mechanism:
      "1. Mg inserts into C-X bond: R-X + Mg → RMgX\n2. Nucleophilic addition to C=O\n3. Magnesium alkoxide formed\n4. Hydrolysis gives alcohol",
  },
  {
    id: 54,
    name: "Williamson Ether Synthesis",
    equation: "RONa + R'X → R-O-R' + NaX",
    type: "Named",
    conditions: "Sodium alkoxide + primary alkyl halide, reflux",
    explanation:
      "SN2 reaction. Works best with primary halides (secondary gives elimination by E2). Used to make both symmetric and mixed ethers.",
    mechanism:
      "1. Sodium alkoxide is nucleophile\n2. Backside attack on C-X\n3. Inversion at C; halide leaves\n4. Mixed ether product",
  },
  {
    id: 55,
    name: "Lucas Test (distinguish 1°, 2°, 3° alcohols)",
    equation: "ROH + HCl/ZnCl₂ → RCl + H₂O",
    type: "Named",
    conditions: "Lucas reagent (conc. HCl + ZnCl₂), RT",
    explanation:
      "3° alcohol: immediate turbidity. 2° alcohol: turbidity in 5 min. 1° alcohol: no turbidity at RT (reacts only on heating).",
  },
  {
    id: 56,
    name: "Kolbe Electrolysis",
    equation: "2RCOONa → R-R + 2CO₂ + H₂ + 2NaOH",
    type: "Named",
    conditions: "Electrolysis of concentrated sodium carboxylate",
    explanation:
      "Electrolytic decarboxylation. Anode: carboxylate loses e⁻ → radical → C-C bond. Used for symmetric hydrocarbon synthesis.",
  },
  {
    id: 57,
    name: "Reimer-Tiemann Reaction",
    equation: "C₆H₅OH + CHCl₃ + 2NaOH → 2-HOC₆H₄CHO",
    type: "Named",
    conditions: "Phenol + CHCl₃ + NaOH, heat",
    explanation:
      "Introduces –CHO group at ortho position of phenol. Mechanism involves dichlorocarbene (CCl₂).",
  },
  {
    id: 58,
    name: "Hell-Volhard-Zelinsky Reaction",
    equation: "RCH₂COOH + Br₂ (P) → RCHBrCOOH + HBr",
    type: "Named",
    conditions: "Red phosphorus or PCl₃ + Br₂",
    explanation:
      "Selective α-bromination of carboxylic acids. P activates the acid as acyl halide. Used to introduce functionality at α-carbon.",
  },
  {
    id: 59,
    name: "Sandmeyer Reaction",
    equation: "C₆H₅N₂⁺Cl⁻ + CuCN → C₆H₅CN + N₂ + CuCl",
    type: "Named",
    conditions: "Diazonium salt + CuX (CuCl, CuBr, CuCN), warm",
    explanation:
      "Replaces diazonium group with Cl, Br, or CN. Key route to aryl halides and nitriles from primary aromatic amines.",
  },
  {
    id: 60,
    name: "Diels-Alder Reaction",
    equation: "CH₂=CH-CH=CH₂ + CH₂=CH₂ → cyclohexene",
    type: "Named",
    conditions: "Heat, [4+2] cycloaddition",
    explanation:
      "Diene + dienophile → 6-membered ring. Stereospecific — syn addition. Powerful route to cyclohexene derivatives.",
    mechanism:
      "1. Diene must be in s-cis conformation\n2. Concerted pericyclic mechanism\n3. 6 electrons reorganise simultaneously\n4. Forms 2 new σ bonds + ring",
  },
  {
    id: 61,
    name: "Wacker Oxidation",
    equation: "C₂H₄ + ½O₂ → CH₃CHO",
    type: "Named",
    conditions: "PdCl₂/CuCl₂ catalyst, water, 50°C",
    explanation:
      "Industrial oxidation of ethylene to acetaldehyde. Pd²⁺ is the active catalyst, Cu²⁺ regenerates it. Markovnikov selectivity.",
  },
  {
    id: 62,
    name: "Ozonolysis (reductive workup)",
    equation: "R-CH=CH-R' + O₃ → RCHO + R'CHO",
    type: "Named",
    conditions: "O₃ then Zn/H₂O or Me₂S",
    explanation:
      "Cleaves C=C completely to aldehydes (reductive) or carboxylic acids (oxidative). Key tool for structure determination.",
  },
  {
    id: 63,
    name: "Baeyer-Villiger Oxidation",
    equation: "R₂C=O + m-CPBA → R₂C=O + lactone/ester",
    type: "Named",
    conditions: "Peracid (mCPBA or H₂O₂), room temperature",
    explanation:
      "Oxidises ketone to ester (or cyclic ketone to lactone). Migrating group: hydride > tertiary > secondary > primary > methyl.",
  },
  {
    id: 64,
    name: "Rosenmund Reduction",
    equation: "RCOCl + H₂ → RCHO + HCl",
    type: "Named",
    conditions: "Pd/BaSO₄ catalyst (poisoned), H₂, xylene",
    explanation:
      "Reduces acyl chloride to aldehyde only. Catalyst is poisoned to prevent further reduction to alcohol.",
  },
  {
    id: 65,
    name: "Claisén Condensation",
    equation: "2CH₃COOC₂H₅ → CH₃COCH₂COOC₂H₅ + C₂H₅OH",
    type: "Named",
    conditions: "NaOEt (base), diethyl ether",
    explanation:
      "Two ester molecules condense — one acts as nucleophile via enolate, other as electrophile. Gives β-ketoester.",
  },
  {
    id: 66,
    name: "Hofmann Bromamide Reaction",
    equation: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O",
    type: "Named",
    conditions: "Br₂, NaOH, heat",
    explanation:
      "Converts amide to amine — product has one fewer carbon (decarboxylation). Used to make primary amines.",
  },
  {
    id: 67,
    name: "Kolbe-Schmitt Reaction (sodium phenoxide + CO₂)",
    equation: "C₆H₅ONa + CO₂ → 2-HOC₆H₄COONa (sodium salicylate)",
    type: "Named",
    conditions: "CO₂ at 125°C, 5 atm, then acidify",
    explanation:
      "Industrial synthesis of salicylic acid — precursor to aspirin. CO₂ is an electrophile attacking the ring ortho to OH.",
  },
  {
    id: 68,
    name: "Beckmann Rearrangement",
    equation: "R₂C=NOH → RCONHR' (lactam if cyclic)",
    type: "Named",
    conditions: "H₂SO₄ or PCl₅, oxime starting material",
    explanation:
      "Oxime → amide. In Nylon-6 synthesis: cyclohexanone oxime → caprolactam via Beckmann rearrangement.",
  },
  {
    id: 69,
    name: "Fries Rearrangement",
    equation: "ArOCOR → o-HO-Ar-COR + p-HO-Ar-COR",
    type: "Named",
    conditions: "AlCl₃, heat (thermal) or UV (photo-Fries)",
    explanation:
      "Aryl ester rearranges to hydroxyaryl ketone. Ortho product favoured at high temperature, para at low.",
  },
  {
    id: 70,
    name: "Dakin Reaction",
    equation: "ArCHO + H₂O₂ + NaOH → ArOH + HCOOH",
    type: "Named",
    conditions: "H₂O₂, NaOH, room temperature",
    explanation:
      "Converts ortho/para-hydroxybenzaldehyde to catechol/hydroquinone using H₂O₂ as oxidant. Mild, selective.",
  },
  // Additional reactions to reach ~100+
  {
    id: 71,
    name: "Esterification (Fischer)",
    equation: "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    type: "Named",
    conditions: "H₂SO₄ cat., heat; remove water",
    explanation:
      "Reversible. Equilibrium constant ~4. Drive right by removing water (mol. sieves, Dean-Stark trap, or excess alcohol).",
  },
  {
    id: 72,
    name: "Saponification",
    equation: "RCOOR' + NaOH → RCOONa + R'OH",
    type: "Named",
    conditions: "Aqueous NaOH, heat",
    explanation:
      "Irreversible base hydrolysis of ester. Product is carboxylate salt (soap) + alcohol. Basis of soap making from fats.",
  },
  {
    id: 73,
    name: "Iodoform Test",
    equation: "CH₃COR + I₂ + NaOH → CHI₃↓ + RCOONa",
    type: "Named",
    conditions: "I₂, NaOH (or NaOI), warm",
    explanation:
      "Positive for CH₃CO– compounds (methylketones, ethanol, acetaldehyde). Yellow CHI₃ precipitate with antiseptic smell.",
  },
  {
    id: 74,
    name: "Benzoin Condensation",
    equation: "2C₆H₅CHO → C₆H₅COCH(OH)C₆H₅",
    type: "Named",
    conditions: "NaCN catalyst (or thiamine as enzymatic equivalent)",
    explanation:
      "CN⁻ is the umpolung catalyst. Converts two benzaldehyde molecules into benzoin — classic acyl-anion chemistry.",
  },
  {
    id: 75,
    name: "Pinacol-Pinacolone Rearrangement",
    equation: "(CH₃)₂C(OH)–C(OH)(CH₃)₂ → (CH₃)₃CCO·CH₃",
    type: "Named",
    conditions: "H₂SO₄, heat",
    explanation:
      "1,2-diol dehydrates and rearranges to carbonyl compound. Methyl migrates to form tertiary carbocation stabilised intermediate.",
  },
  {
    id: 76,
    name: "Perkin Condensation",
    equation: "ArCHO + (RCO)₂O → ArCH=CRCOOH",
    type: "Named",
    conditions: "RCOONa (base), heat",
    explanation:
      "Aromatic aldehyde + anhydride → α,β-unsaturated carboxylic acid. Mechanism similar to aldol via enolate of anhydride.",
  },
  {
    id: 77,
    name: "Knoevenagel Condensation",
    equation: "RCHO + CH₂(COOC₂H₅)₂ → RCH=C(COOC₂H₅)₂ + H₂O",
    type: "Named",
    conditions: "Amine base (piperidine), warm",
    explanation:
      "Aldehyde + active methylene compound → knoevenagel product. Milder than aldol, useful in synthesis of pharmaceuticals.",
  },
  {
    id: 78,
    name: "Robinson Annulation",
    equation: "Cyclohex-2-enone + CH₂=CHCOCH₃ → bicyclic product",
    type: "Named",
    conditions: "NaOH, Michael addition then aldol cyclisation",
    explanation:
      "Michael addition followed by intramolecular aldol to form a 6-membered ring. Key in synthesis of steroids and terpenes.",
  },
  {
    id: 79,
    name: "Stork Enamine Reaction",
    equation: "Cyclohexanone + pyrrolidine → enamine → alkylated product",
    type: "Named",
    conditions: "Acid or base catalysis, alkyl/acyl halide",
    explanation:
      "Enamine serves as enolate equivalent. Avoids over-alkylation. Useful for regioselective functionalization of ketones.",
  },
  {
    id: 80,
    name: "Wittig Reaction",
    equation: "R₂C=O + Ph₃P=CHR' → R₂C=CHR' + Ph₃P=O",
    type: "Named",
    conditions: "Triphenylphosphonium ylide, base, RT",
    explanation:
      "Converts carbonyl to alkene. Stereoselective: stabilised ylides → trans; non-stabilised ylides → cis alkenes.",
  },
  {
    id: 81,
    name: "Gabriel Synthesis of primary amines",
    equation: "phthalimide + RX + N₂H₄ → RNH₂",
    type: "Named",
    conditions: "KOH (first), then hydrazine",
    explanation:
      "Uses phthalimide anion as N-nucleophile in SN2. Acid/base hydrolysis liberates pure primary amine — avoids secondary/tertiary.",
  },
  {
    id: 82,
    name: "Curtius Rearrangement",
    equation: "RCON₃ → R-N=C=O (isocyanate) + N₂",
    type: "Named",
    conditions: "Acyl azide, heat or photolysis",
    explanation:
      "Nitrene rearrangement. Isocyanate intermediate reacts with water → amine + CO₂. One fewer carbon in product.",
  },
  {
    id: 83,
    name: "Schmidt Reaction",
    equation: "RCOOH + HN₃ + H₂SO₄ → RNH₂ + CO₂ + N₂",
    type: "Named",
    conditions: "Hydrazoic acid, H₂SO₄",
    explanation:
      "Carboxylic acid → primary amine. One fewer carbon. Mechanism via nitrenium ion (similar to Curtius).",
  },
  {
    id: 84,
    name: "Acid-catalysed dehydration (E1)",
    equation: "(CH₃)₃COH → (CH₃)₂C=CH₂ + H₂O",
    type: "Elimination",
    conditions: "Conc. H₂SO₄ or H₃PO₄, heat",
    explanation:
      "tert-Butyl alcohol forms stable carbocation. Follows Saytzeff's rule — most substituted alkene.",
  },
  {
    id: 85,
    name: "Cycloaddition: Maleic anhydride + butadiene",
    equation: "CH₂=CHCH=CH₂ + maleic anhydride → adduct",
    type: "Aromatic",
    conditions: "Heat, [4+2] Diels-Alder",
    explanation:
      "Electron-poor dienophile reacts with diene stereospecifically. Endo rule: endo product kinetically favoured.",
  },
  {
    id: 86,
    name: "Decarboxylation of β-keto acid",
    equation: "CH₃COCH₂COOH → CH₃COCH₃ + CO₂",
    type: "Elimination",
    conditions: "Heat (>150°C)",
    explanation:
      "β-keto acids readily lose CO₂. 6-membered cyclic transition state makes this facile. Used in acetoacetic ester synthesis.",
  },
  {
    id: 87,
    name: "Acyloin condensation",
    equation: "2RCOOEt → RCO-C(OH)R",
    type: "Named",
    conditions: "Na metal in toluene, reflux",
    explanation:
      "Reductive coupling of two ester molecules via radical mechanism on sodium surface. Gives α-hydroxy ketone (acyloin).",
  },
  {
    id: 88,
    name: "Reformatsky Reaction",
    equation: "RCOR' + BrCH₂COOC₂H₅ + Zn → β-hydroxy ester",
    type: "Named",
    conditions: "Zn metal, ether, then H₂O",
    explanation:
      "Organozinc intermediate (less reactive than Grignard) adds to carbonyl. Mild — tolerates many functional groups.",
  },
  {
    id: 89,
    name: "Oppenauer Oxidation",
    equation: "R₂CHOH + acetone → R₂C=O + isopropanol",
    type: "Oxidation",
    conditions: "Al(OiPr)₃ catalyst, acetone",
    explanation:
      "Transfer hydrogenation — oxidises secondary alcohol using ketone as H-acceptor. Reverse of Meerwein-Ponndorf-Verley.",
  },
  {
    id: 90,
    name: "Meerwein-Ponndorf-Verley Reduction",
    equation: "R₂C=O + (CH₃)₂CHOH → R₂CHOH + acetone",
    type: "Reduction",
    conditions: "Al(OiPr)₃ catalyst, isopropanol",
    explanation:
      "Transfer hydrogenation using aluminium alkoxide. Selective for C=O; does not reduce C=C. Reverse of Oppenauer.",
  },
  {
    id: 91,
    name: "Ene Reaction",
    equation: "C=C + C=O → homoallylic alcohol",
    type: "Addition",
    conditions: "Lewis acid catalyst (SnBr₄) or heat",
    explanation:
      "Allylic C-H reacts with electrophilic enophile. Bond reorganisation: new C-C bond, H transfer, and double bond shift.",
  },
  {
    id: 92,
    name: "Olefin Metathesis (Grubbs)",
    equation: "2 RCH=CH₂ → RCH=CHR + CH₂=CH₂",
    type: "Named",
    conditions: "Grubbs Ru catalyst, CH₂Cl₂, RT",
    explanation:
      "Catalytic exchange of double bond partners. Nobel Prize 2005. Used in ring-closing metathesis (RCM) for cyclic compounds.",
  },
  {
    id: 93,
    name: "Shapiro Reaction",
    equation: "R₂C=NNHTs + 2n-BuLi → R₂C=CH₂ (vinyl lithium)",
    type: "Named",
    conditions: "p-Toluenesulfonylhydrazone + 2 equiv n-BuLi, THF, -78°C",
    explanation:
      "Converts carbonyl to vinyl anion via tosylhydrazone. Useful for alkene synthesis with regiocontrol.",
  },
  {
    id: 94,
    name: "Oxymercuration-Demercuration",
    equation: "C₂H₄ + Hg(OAc)₂/H₂O → C₂H₅OH (after NaBH₄)",
    type: "Addition",
    conditions: "Hg(OAc)₂ in water/THF, then NaBH₄",
    explanation:
      "Markovnikov hydration without carbocation rearrangement. Hg electrophile opens alkene; NaBH₄ removes Hg.",
  },
  {
    id: 95,
    name: "Hydroboration-Oxidation",
    equation: "R-CH=CH₂ → R-CH₂-CH₂OH (anti-Markovnikov)",
    type: "Addition",
    conditions: "BH₃·THF then H₂O₂/NaOH",
    explanation:
      "Anti-Markovnikov, syn addition. B goes to less hindered carbon. H₂O₂/NaOH converts B-C to OH with retention of config.",
  },
  {
    id: 96,
    name: "Sharpless Asymmetric Epoxidation",
    equation:
      "allylic alcohol + TBHP + Ti(OiPr)₄ + tartrate → chiral epoxy alcohol",
    type: "Named",
    conditions: "Ti(OiPr)₄, DET or DIPT, TBHP, -20°C",
    explanation:
      "Epoxidises allylic alcohols enantioselectively. L-(+)-tartrate gives β-face; D-(-)-tartrate gives α-face attack.",
  },
  {
    id: 97,
    name: "Mitsunobu Reaction",
    equation: "R-OH + R'COOH + PPh₃ + DIAD → R-OOCR' (inverted config)",
    type: "Named",
    conditions: "PPh₃, DIAD (diethyl azodicarboxylate), toluene, RT",
    explanation:
      "Converts alcohol to ester with inversion of configuration. Used to invert stereocentres in synthesis.",
  },
  {
    id: 98,
    name: "Swern Oxidation",
    equation: "R-CH(OH)-R' → R-CO-R'",
    type: "Oxidation",
    conditions: "(COCl)₂, DMSO, then Et₃N, -78°C",
    explanation:
      "Mild oxidation of alcohols to aldehydes/ketones. No over-oxidation. Activated DMSO is the oxidant.",
  },
  {
    id: 99,
    name: "Jones Oxidation",
    equation: "R-CH₂OH → RCOOH; R₂CHOH → R₂C=O",
    type: "Oxidation",
    conditions: "CrO₃ + H₂SO₄ in acetone",
    explanation:
      "Primary alcohols → carboxylic acids; secondary → ketones. Orange Cr⁶⁺ → green Cr³⁺ colour change.",
  },
  {
    id: 100,
    name: "Dehydrogenation of cyclohexane to benzene",
    equation: "C₆H₁₂ → C₆H₆ + 3H₂",
    type: "Aromatic",
    conditions: "Cr₂O₃/Al₂O₃ catalyst, 500°C",
    explanation:
      "Industrial catalytic reforming. Produces benzene and aromatic compounds from naphtha fractions.",
  },
  {
    id: 101,
    name: "Polymerization of styrene",
    equation: "nCH₂=CHC₆H₅ → −(CH₂-CHC₆H₅)ₙ−",
    type: "Addition",
    conditions: "Free radical, 100°C; or BF₃/anionic",
    explanation:
      "Forms polystyrene (PS). Cationic polymerisation gives atactic PS; anionic Ziegler-Natta gives isotactic/syndiotactic.",
  },
  {
    id: 102,
    name: "Criegee Ozonolysis (oxidative workup)",
    equation: "R-CH=CH-R' + O₃ → RCOOH + R'COOH",
    type: "Oxidation",
    conditions: "O₃ then H₂O₂ (oxidative workup)",
    explanation:
      "Gives carboxylic acids (vs aldehydes in reductive workup). Allows both oxidative and reductive structure determination.",
  },
  {
    id: 103,
    name: "Leuckart Reaction",
    equation: "R₂C=O + HCOONH₄ → R₂CHNHCHO → R₂CHNH₂",
    type: "Named",
    conditions: "Ammonium formate, heat; then acid hydrolysis",
    explanation:
      "Reductive amination using formic acid as reductant. Converts ketone to N-formyl amine, then hydrolysis gives amine.",
  },
  {
    id: 104,
    name: "Mannich Reaction",
    equation: "R₂CO + HCHO + HNR'₂ → R₂C(CH₂NR'₂)–CO (Mannich base)",
    type: "Named",
    conditions: "Aqueous acid, 0–25°C, active methylene compound",
    explanation:
      "Three-component: carbonyl + formaldehyde + amine → β-amino carbonyl (Mannich base). Key in alkaloid synthesis.",
  },
];

const FILTER_TYPES: ReactionType[] = [
  "Combustion",
  "Addition",
  "Substitution",
  "Elimination",
  "Aromatic",
  "Oxidation",
  "Reduction",
  "Named",
];

const TYPE_COLORS: Record<ReactionType, string> = {
  Combustion:
    "from-orange-400/20 to-red-400/20 border-orange-400/30 text-orange-300",
  Addition:
    "from-green-400/20 to-emerald-400/20 border-green-400/30 text-green-300",
  Substitution:
    "from-blue-400/20 to-sky-400/20 border-blue-400/30 text-blue-300",
  Elimination:
    "from-yellow-400/20 to-amber-400/20 border-yellow-400/30 text-yellow-300",
  Aromatic:
    "from-purple-400/20 to-violet-400/20 border-purple-400/30 text-purple-300",
  Oxidation: "from-red-400/20 to-rose-400/20 border-red-400/30 text-red-300",
  Reduction: "from-teal-400/20 to-cyan-400/20 border-teal-400/30 text-teal-300",
  Named:
    "from-indigo-400/20 to-blue-400/20 border-indigo-400/30 text-indigo-300",
};

export const CarbonReactions = memo(function CarbonReactions() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<ReactionType | "All">("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      ALL_REACTIONS.filter((r) => {
        const matchType = activeType === "All" || r.type === activeType;
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.equation.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q);
        return matchType && matchSearch;
      }),
    [search, activeType],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
      data-ocid="carbon.reactions_section"
    >
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold mb-2">
          Carbon Reactions Library
        </h2>
        <p className="text-muted-foreground text-sm">
          {ALL_REACTIONS.length}+ reactions — organic, named, and more. Search
          or filter by type.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, equation, or type…"
          className="w-full glass-carbon rounded-xl pl-9 pr-9 py-2.5 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-border/50 transition-all"
          data-ocid="carbon.reactions.search_input"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
      </div>

      {/* Type filter */}
      <div
        className="flex flex-wrap justify-center gap-2"
        data-ocid="carbon.reactions.type_filters"
      >
        <button
          type="button"
          onClick={() => setActiveType("All")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
            activeType === "All"
              ? "glass ring-1 ring-border/40 scale-105"
              : "glass-carbon hover:bg-card/30 hover:scale-105",
          )}
          data-ocid="carbon.reactions.filter.all"
        >
          All ({ALL_REACTIONS.length})
        </button>
        {FILTER_TYPES.map((t) => {
          const colors = TYPE_COLORS[t].split(" ");
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActiveType(activeType === t ? "All" : t)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 bg-gradient-to-r to-transparent",
                activeType === t
                  ? `${colors.join(" ")} ring-1 ring-white/20 scale-105`
                  : "glass-carbon border-transparent hover:bg-card/30 hover:scale-105",
              )}
              data-ocid={`carbon.reactions.filter.${t.toLowerCase()}`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {filtered.length} reaction{filtered.length !== 1 ? "s" : ""} shown
      </p>

      {/* Reaction cards */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((r, idx) => {
            const colors = TYPE_COLORS[r.type].split(" ");
            const isOpen = expanded === r.id;
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  delay: Math.min(idx * 0.025, 0.4),
                  duration: 0.3,
                }}
                className={cn(
                  "glass-carbon rounded-2xl overflow-hidden border transition-all duration-300",
                  isOpen
                    ? "ring-1 ring-border/30 shadow-lg"
                    : "hover:shadow-md",
                )}
                data-ocid={`carbon.reaction.${r.id}`}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                  className="w-full text-left px-4 py-3 hover:bg-card/20 transition-colors flex items-start gap-3"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full bg-gradient-to-r to-transparent border mt-0.5 flex-shrink-0",
                      colors.join(" "),
                    )}
                  >
                    {r.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {r.name}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mt-0.5 break-all">
                      {r.equation}
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className={cn(
                        "border-t border-border/20 px-4 py-4 space-y-3 bg-gradient-to-br to-transparent",
                        colors[0],
                        colors[1],
                      )}
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="glass-carbon rounded-lg px-3 py-2">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Conditions
                          </div>
                          <div className="text-xs text-foreground/90">
                            {r.conditions}
                          </div>
                        </div>
                        <div className="glass-carbon rounded-lg px-3 py-2">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Explanation
                          </div>
                          <div className="text-xs text-foreground/90">
                            {r.explanation}
                          </div>
                        </div>
                      </div>
                      {r.mechanism && (
                        <div className="glass-carbon rounded-lg px-3 py-2">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Mechanism
                          </div>
                          <pre className="text-xs font-mono text-foreground/80 whitespace-pre-wrap leading-relaxed">
                            {r.mechanism}
                          </pre>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});
