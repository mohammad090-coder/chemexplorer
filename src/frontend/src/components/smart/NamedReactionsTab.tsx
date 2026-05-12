import { useChemStore } from "@/store/useChemStore";
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type ReactionKind =
  | "C-C Bond Forming"
  | "C-X Bond"
  | "Oxidation"
  | "Reduction"
  | "Rearrangement"
  | "Condensation";

interface NamedReaction {
  name: string;
  substrate: string;
  reagent: string;
  product: string;
  mechanism: string;
  mechanismDetail: string;
  significance: string;
  realProducts: string;
  jeeNeetTip: string;
  kind: ReactionKind;
}

const KIND_COLORS: Record<ReactionKind, string> = {
  "C-C Bond Forming": "oklch(0.68 0.16 258)",
  "C-X Bond": "oklch(0.7 0.21 140)",
  Oxidation: "oklch(0.72 0.22 30)",
  Reduction: "oklch(0.7 0.18 200)",
  Rearrangement: "oklch(0.68 0.2 330)",
  Condensation: "oklch(0.72 0.25 50)",
};

const NAMED_REACTIONS: NamedReaction[] = [
  // ── NEWLY ADDED REACTIONS ─────────────────────────────────────────────────
  {
    name: "Markovnikov's Rule",
    substrate: "Asymmetric alkene (R-CH=CH₂)",
    reagent: "HBr / HCl / HI (or H₂O + H⁺)",
    product: "H adds to less-substituted C; X to more-substituted C",
    mechanism:
      "H⁺ protonates less-substituted C, forming more stable carbocation; X⁻ attacks",
    mechanismDetail:
      "H⁺ from HX protonates the π bond at the less-substituted carbon → generates the more-substituted (more stable) carbocation → X⁻ attacks carbocation → Markovnikov product. Anti-Markovnikov via radical chain (peroxide effect): Br• adds to less-substituted carbon, radical at more-substituted carbon. ONLY HBr undergoes anti-Markovnikov radical addition (not HCl or HI).",
    significance: "Predicts regioselectivity of HX and H₂O addition to alkenes",
    realProducts:
      "2-bromopropane from CH₃CH=CH₂ + HBr (Markovnikov). 1-bromopropane with ROOR (anti-Markovnikov). Acid-catalyzed hydration always follows Markovnikov (industrial production of alcohols from alkenes). Vinyl chloride from ethylene + HCl.",
    jeeNeetTip:
      "JEE: HBr + propene (Markovnikov) → 2-bromopropane; with ROOR → 1-bromopropane. Anti-Markovnikov ONLY for HBr free radical, not HCl or HI. H₂SO₄/H₂O addition is always Markovnikov. Every HX addition question in JEE tests whether conditions are Markovnikov or anti-Markovnikov.",
    kind: "C-X Bond",
  },
  {
    name: "Crossed Aldol Condensation",
    substrate: "Two different carbonyls: one with α-H, one without",
    reagent: "Dilute NaOH (cold = aldol product; heat = condensed product)",
    product: "α,β-unsaturated carbonyl (e.g. cinnamaldehyde, benzalacetone)",
    mechanism:
      "Enolate from one carbonyl attacks the other; dehydration gives conjugated product",
    mechanismDetail:
      "The component with α-H (e.g. CH₃CHO) forms enolate under base. The other component (e.g. PhCHO, which has no α-H) acts ONLY as electrophile. Enolate attacks PhCHO carbonyl C → β-hydroxy aldehyde (aldol product) → heat → dehydration → PhCH=CHCHO (cinnamaldehyde). Used where self-condensation of one reactant would give multiple products.",
    significance:
      "Selective C–C bond formation to make flavors, fragrances, and pharmaceutical intermediates",
    realProducts:
      "Cinnamaldehyde (~9000 t/year, cinnamon flavor) from PhCHO + CH₃CHO. Benzalacetone (raspberry ketone precursor) from PhCHO + acetone. Jasminaldehyde (perfume) from PhCHO + n-heptanal. Diacetone alcohol from acetone self-aldol.",
    jeeNeetTip:
      "JEE: PhCHO has NO α-H so it cannot enolize — it ALWAYS acts as electrophile in crossed aldol. CH₃CHO or acetone provides the enolate. Final product after dehydration: PhCH=CHCHO (cinnamaldehyde) from CH₃CHO, or PhCH=CHCOCH₃ (benzalacetone) from acetone.",
    kind: "Condensation",
  },
  // ── ORIGINAL REACTIONS ───────────────────────────────────────────────────
  {
    name: "Aldol Condensation",
    substrate: "Aldehyde/Ketone with α-H",
    reagent: "Dilute NaOH, heat",
    product: "β-hydroxy carbonyl → α,β-unsaturated carbonyl",
    mechanism: "Enolate attacks carbonyl; dehydration gives conjugated product",
    mechanismDetail:
      "Base abstracts α-H to form enolate ion → enolate attacks carbonyl carbon of second molecule → β-hydroxy carbonyl (aldol product) → on heating, dehydration removes water to give α,β-unsaturated carbonyl (conjugated system).",
    significance:
      "Key C–C bond forming reaction; used industrially for 2-ethyl hexanol",
    realProducts:
      "2-ethylhexanol (plasticizer precursor, ~2 million t/year), cinnamaldehyde (cinnamon flavor), diacetone alcohol (solvent), jasminaldehyde (perfume ingredient).",
    jeeNeetTip:
      "JEE: Crossed aldol between two different carbonyls gives multiple products — only asked when one has no α-H. Self-aldol of acetaldehyde gives 3-hydroxybutanal. Identify α-H before predicting aldol product.",
    kind: "Condensation",
  },
  {
    name: "Claisen Condensation",
    substrate: "Ester with α-H",
    reagent: "Sodium ethoxide (NaOEt)",
    product: "β-keto ester",
    mechanism:
      "Enolate of ester attacks carbonyl of second ester; ethoxide expelled",
    mechanismDetail:
      "NaOEt abstracts α-H from ester → enolate attacks carbonyl of second ester → tetrahedral intermediate → ethoxide leaves → β-keto ester product (stabilized by deprotonation at α-carbon between two carbonyls). Requires >1 equiv. base to drive to completion.",
    significance:
      "Produces β-keto esters — key building blocks in organic synthesis",
    realProducts:
      "Ethyl acetoacetate (acetoacetic ester synthesis for ketones and acids). Used in synthesis of barbiturates, vitamins, and pharmaceutical intermediates. Crossed Claisen with non-enolizable esters (formate, oxalate, carbonate) gives single products.",
    jeeNeetTip:
      "JEE Advanced: Claisen needs 2 equivalents of NaOEt — 1 for enolate, 1 to deprotonate product to drive equilibrium. Distinguish Claisen (ester+ester → β-keto ester) from Aldol (aldehyde+aldehyde → β-hydroxy aldehyde). Dieckmann condensation = intramolecular Claisen of diesters (gives cyclic β-keto ester).",
    kind: "Condensation",
  },
  {
    name: "Grignard Reaction",
    substrate: "Carbonyl compound (aldehyde, ketone, ester)",
    reagent: "RMgX in dry ether",
    product: "Alcohol after hydrolysis",
    mechanism: "Nucleophilic addition of carbanion to carbonyl",
    mechanismDetail:
      "Grignard reagent (RMgX) acts as carbanion source (R⁻) → nucleophilic addition to C=O → magnesium alkoxide intermediate → hydrolysis (H₂O or dilute acid) gives alcohol. Ester gives tertiary alcohol after two equivalents of Grignard react.",
    significance: "Most important C–C bond formation; all classes of alcohols",
    realProducts:
      "Synthesis of vitamins (retinol/Vitamin A), pharmaceutical intermediates, agrochemicals. Industrial route to triphenylmethanol. Used in synthesis of ibuprofen, nevirapine (HIV drug), and thousands of pharmaceutical compounds at scale.",
    jeeNeetTip:
      "JEE: HCHO → 1° alcohol, RCHO → 2° alcohol, R₂C=O → 3° alcohol, ester → 3° (same group twice). Must use dry conditions — water destroys Grignard. CO₂ + Grignard → carboxylic acid (very common JEE question).",
    kind: "C-C Bond Forming",
  },
  {
    name: "Cannizzaro Reaction",
    substrate: "Aldehyde without α-H (HCHO, PhCHO)",
    reagent: "Conc. NaOH",
    product: "Alcohol + Carboxylate salt",
    mechanism: "Hydride transfer from one aldehyde to another",
    mechanismDetail:
      "OH⁻ attacks one aldehyde to form tetrahedral intermediate → hydride (H⁻) transferred to second aldehyde molecule → one is oxidized to carboxylate, other reduced to alcohol. Both molecules must lack α-hydrogen to prevent aldol reaction.",
    significance:
      "Disproportionation; distinguishes aldehydes with/without α-H",
    realProducts:
      "Formaldehyde → methanol + sodium formate. Benzaldehyde → benzyl alcohol + sodium benzoate (food preservative E211). Crossed Cannizzaro: HCHO always gets oxidized.",
    jeeNeetTip:
      "JEE: Cannizzaro requires NO α-H. In crossed Cannizzaro, HCHO always gets oxidized (acts as reducing agent). Often tested with PhCHO + HCHO combination.",
    kind: "Oxidation",
  },
  {
    name: "Diels-Alder Reaction",
    substrate: "Diene (s-cis) + dienophile",
    reagent: "Heat or pressure",
    product: "Cyclohexene derivative",
    mechanism: "[4+2] concerted pericyclic cycloaddition",
    mechanismDetail:
      "Diene must be in s-cis conformation → simultaneous [4+2] cycloaddition with electron-poor dienophile → forms two new C–C σ bonds in a single concerted step (no intermediate). Stereochemistry is retained: syn addition from same face.",
    significance:
      "Stereospecific ring formation; key in natural product synthesis",
    realProducts:
      "Synthesis of cortisone, vitamin D, reserpine, colchicine. Industrial preparation of cyclohexene from butadiene + ethylene. Norbornene synthesis (specialty plastics).",
    jeeNeetTip:
      "JEE: Diene must be in s-cis conformation (s-trans cannot react). Electron-donating groups on diene and electron-withdrawing groups on dienophile accelerate reaction. Endo rule: bulky groups prefer endo addition in kinetic product.",
    kind: "C-C Bond Forming",
  },
  {
    name: "Friedel-Crafts Alkylation",
    substrate: "Benzene ring",
    reagent: "RX + AlCl₃ (Lewis acid)",
    product: "Alkylbenzene",
    mechanism: "AlCl₃ generates carbocation; electrophilic ring attack",
    mechanismDetail:
      "AlCl₃ (Lewis acid) abstracts X⁻ from RX → generates carbocation R⁺ → electrophilic attack on π electrons of benzene ring → arenium ion (Wheland intermediate) → proton loss restores aromaticity. Polyalkylation and rearrangement are common side reactions.",
    significance: "Introduces alkyl groups onto benzene",
    realProducts:
      "Ethylbenzene (→ styrene → polystyrene, ~25 million t/year), cumene (→ phenol + acetone), detergent alkylbenzenes.",
    jeeNeetTip:
      "JEE: Alkylation limitations — (1) polyalkylation (alkyl groups activate ring), (2) carbocation rearrangement gives unexpected products. Acylation is preferred when specific product is needed.",
    kind: "C-X Bond",
  },
  {
    name: "Friedel-Crafts Acylation",
    substrate: "Benzene ring",
    reagent: "RCOCl + AlCl₃",
    product: "Aryl ketone",
    mechanism: "Acylium ion (R–C≡O⁺) electrophile; no rearrangement",
    mechanismDetail:
      "AlCl₃ abstracts Cl⁻ from acyl chloride → resonance-stabilized acylium ion R–C≡O⁺ → electrophilic aromatic substitution → aryl ketone. Complex formation between product ketone and AlCl₃ requires >1 equiv AlCl₃. No carbocation rearrangement.",
    significance: "Cleaner than alkylation; no rearrangement side products",
    realProducts:
      "Acetophenone (solvent, fragrance, pharmaceutical precursor), anthraquinone (dyes and laxatives), ketoprofen, synthetic musks.",
    jeeNeetTip:
      "JEE: Acylation requires >1 mole of AlCl₃. NO polyacylation (product is deactivated) and NO rearrangement. The acylium ion is the electrophile — must know its resonance structure.",
    kind: "C-X Bond",
  },
  {
    name: "Hofmann Bromamide Degradation",
    substrate: "Primary amide (RCONH₂)",
    reagent: "Br₂ + NaOH (aq)",
    product: "Primary amine RNH₂ (one C less)",
    mechanism: "N-bromo intermediate → isocyanate → hydrolysis",
    mechanismDetail:
      "NaOH + Br₂ forms NaOBr → N-bromination of amide nitrogen → base abstracts N–H → nitrene/isocyanate intermediate → water adds → carbamic acid → CO₂ loss gives primary amine with one carbon less.",
    significance: "Converts amide to amine losing one carbon",
    realProducts:
      "Industrial synthesis of anthranilic acid (→ indigo dye) from phthalimide. Synthesis of 2-aminopyridine from nicotinamide. Laboratory synthesis of primary amines.",
    jeeNeetTip:
      "JEE: Carbon count decreases by ONE in Hofmann degradation. One of the few reactions that reduces carbon chain length. Contrast with Gabriel synthesis (gives primary amine, no carbon loss).",
    kind: "Rearrangement",
  },
  {
    name: "Gabriel Synthesis",
    substrate: "Potassium phthalimide",
    reagent: "RX (alkyl halide), then hydrazine or KOH/EtOH",
    product: "Primary amine RNH₂ (only primary, no secondary)",
    mechanism: "N-alkylation of phthalimide, then hydrolysis",
    mechanismDetail:
      "Phthalimide + KOH → potassium phthalimide (N-anion) → N-alkylation with RX → N-alkyl phthalimide → hydrazinolysis (NH₂NH₂) cleaves N-CO bonds → phthalhydrazide + primary amine. Classic method to avoid secondary amine contamination.",
    significance:
      "Gives pure primary amines; nitrogen is protected from over-alkylation",
    realProducts:
      "Synthesis of amino acids (glycine, alanine) for pharmaceutical use. Synthesis of primary aromatic amines not accessible by direct reduction. Used in peptide synthesis precursor preparation.",
    jeeNeetTip:
      "JEE: Gabriel synthesis advantage — gives ONLY primary amine, no secondary or tertiary contamination. Phthalimide anion is the nitrogen source. Final hydrolysis uses hydrazine (Ing-Manske modification) not acid/base to avoid racemization in amino acid synthesis.",
    kind: "C-X Bond",
  },
  {
    name: "Reimer-Tiemann Reaction",
    substrate: "Phenol",
    reagent: "CHCl₃ + NaOH, then H⁺",
    product: "Ortho-hydroxybenzaldehyde (salicylaldehyde)",
    mechanism: "Dichlorocarbene attacks phenoxide; ortho selective",
    mechanismDetail:
      "Strong base (NaOH) converts CHCl₃ to dichlorocarbene (:CCl₂) via α-elimination → :CCl₂ is electrophilic → attacks ortho position of phenoxide anion → dichloromethyl intermediate → hydrolysis of C–Cl bonds → aldehyde group forms. ~70% ortho selectivity.",
    significance: "Converts phenol to phenolic aldehyde",
    realProducts:
      "Salicylaldehyde → used in perfumery, synthesis of coumarin, and 3-formyl salicylic acid. Also gives para-hydroxybenzaldehyde (minority) used in synthesis of paracetamol and vanillin precursors.",
    jeeNeetTip:
      "JEE: Reimer-Tiemann is specific to PHENOLS (phenoxide anion is crucial). Product is salicylaldehyde (2-hydroxybenzaldehyde). The electrophile is dichlorocarbene (:CCl₂). Distinguish from Kolbe (CO₂ + phenol → salicylic acid).",
    kind: "C-C Bond Forming",
  },
  {
    name: "Kolbe Synthesis (Phenol)",
    substrate: "Sodium phenoxide",
    reagent: "CO₂ (high pressure), 125°C",
    product: "Salicylic acid (2-hydroxybenzoic acid)",
    mechanism: "Electrophilic carboxylation of phenoxide at ortho position",
    mechanismDetail:
      "Dry sodium phenoxide heated with CO₂ under pressure → CO₂ acts as electrophile → attacks ortho carbon of phenoxide → rearrangement → sodium salicylate → acidification gives salicylic acid. The Kolbe-Schmitt reaction is essentially electrophilic aromatic substitution by CO₂.",
    significance: "Industrial synthesis of salicylic acid → aspirin",
    realProducts:
      "Salicylic acid → acetylated to form aspirin (acetylsalicylic acid). Global aspirin production >50,000 tonnes/year. Also used in manufacture of dyes, disinfectants, and food preservatives.",
    jeeNeetTip:
      "JEE: Kolbe synthesis uses CO₂ + sodium phenoxide → salicylic acid (ortho). Distinguish from Reimer-Tiemann (CHCl₃ + NaOH → salicylaldehyde). Aspirin = salicylic acid + acetic anhydride → acetylsalicylic acid + acetic acid.",
    kind: "C-C Bond Forming",
  },
  {
    name: "Clemmensen Reduction",
    substrate: "Aldehyde or Ketone",
    reagent: "Zn(Hg) + conc. HCl",
    product: "Alkane (C=O → CH₂)",
    mechanism: "Carbene intermediate on zinc surface",
    mechanismDetail:
      "Amalgamated zinc surface provides electrons → C=O is reduced to carbene-like intermediate adsorbed on Zn → further reduction with H⁺ from HCl → CH₂ group. Mechanism is heterogeneous (occurs on metal surface). Requires acid conditions.",
    significance: "Reduces carbonyl under acidic conditions",
    realProducts:
      "Synthesis of long-chain hydrocarbons from fatty acids. Production of tetralin from β-tetralone. Reduction of aryl ketones to alkylbenzenes — important in pharmaceutical synthesis.",
    jeeNeetTip:
      "JEE: Clemmensen reduces C=O to CH₂ under ACIDIC conditions. Use Wolff-Kishner for base-sensitive substrates. KEY: Friedel-Crafts acylation + Clemmensen = net addition of unbranched alkyl chain to benzene (avoids alkylation rearrangement).",
    kind: "Reduction",
  },
  {
    name: "Wolff-Kishner Reduction",
    substrate: "Aldehyde or Ketone",
    reagent: "NH₂NH₂, KOH, diethylene glycol, heat",
    product: "Alkane (C=O → CH₂)",
    mechanism: "Hydrazone intermediate → N₂ loss",
    mechanismDetail:
      "Carbonyl reacts with hydrazine (NH₂NH₂) to form hydrazone (C=NNH₂) → base (KOH) deprotonates → resonance-stabilized anion → tautomerism → N₂ loss (driving force: N≡N triple bond) → carbanion → protonation gives CH₂.",
    significance:
      "Reduces carbonyl under basic conditions; complement to Clemmensen",
    realProducts:
      "Synthesis of steroidal alkaloids, long-chain alkanes. Huang Minlon modification (excess KOH, high boiling diol) is industrially preferred.",
    jeeNeetTip:
      "JEE: Wolff-Kishner = BASIC conditions (Clemmensen = acidic). Both give alkane from carbonyl. If acid-sensitive → use Wolff-Kishner. If base-sensitive → use Clemmensen. Hydrazone formation is intermediate.",
    kind: "Reduction",
  },
  {
    name: "Rosenmund Reduction",
    substrate: "Acyl chloride (RCOCl)",
    reagent: "H₂/Pd-BaSO₄ (poisoned catalyst)",
    product: "Aldehyde (RCHO)",
    mechanism:
      "Selective hydrogenolysis of C–Cl bond, catalyst poisoned to prevent over-reduction",
    mechanismDetail:
      "Pd catalyst is poisoned with BaSO₄ and quinoline to reduce its activity → selective reduction stops at aldehyde stage → if unpoisoned Pd were used, aldehyde would be further reduced to alcohol. The poison prevents adsorption of aldehyde product on catalyst surface.",
    significance: "Specific synthesis of aldehydes from acyl chlorides",
    realProducts:
      "Synthesis of aromatic aldehydes not accessible by direct methods. Used in pharmaceutical synthesis where oxidation of alcohol would be non-selective. Selective preparation of aliphatic aldehydes in multi-step synthesis.",
    jeeNeetTip:
      "JEE: Rosenmund reduces acid chloride (RCOCl) to aldehyde (RCHO) — NOT to alcohol. Catalyst must be POISONED (BaSO₄ + quinoline/thiourea). If fully active catalyst: would give alcohol. Often paired as a contrast to LiAlH₄ (reduces acid chloride all the way to alcohol).",
    kind: "Reduction",
  },
  {
    name: "Stephen Reduction",
    substrate: "Nitrile (RCN)",
    reagent: "SnCl₂ + HCl, then H₂O",
    product: "Aldehyde (RCHO)",
    mechanism:
      "SnCl₂ reduces nitrile to aldimine tin complex; hydrolysis gives aldehyde",
    mechanismDetail:
      "SnCl₂ + HCl reduces nitrile to an imine tin chloride complex (RCH=NH·SnCl₂) → complex is hydrolyzed by water to give aldimine (RCH=NH) → further hydrolysis yields aldehyde (RCHO) + NH₃. Useful for preparing aromatic aldehydes from ArCN.",
    significance: "Converts nitrile to aldehyde via controlled reduction",
    realProducts:
      "Preparation of aromatic aldehydes (benzaldehyde from benzonitrile) for fine chemical synthesis. Useful when Rosenmund is not applicable (no acyl chloride available). Key in synthesis of pharmaceutical intermediates from cyano precursors.",
    jeeNeetTip:
      "JEE Advanced: Stephen reduction (RCN → RCHO) vs Rosenmund (RCOCl → RCHO) — both give aldehydes but from different starting materials. Stephen uses nitrile + SnCl₂/HCl. Distinguish from hydrolysis of nitrile (RCN + H₂O → RCOOH) which gives carboxylic acid.",
    kind: "Reduction",
  },
  {
    name: "Sandmeyer Reaction",
    substrate: "Aryl diazonium salt (ArN₂⁺)",
    reagent: "CuCl, CuBr, CuCN, or CuSCN",
    product: "ArCl, ArBr, ArCN, or ArSCN",
    mechanism:
      "Copper-catalyzed radical substitution of diazonium with cuprous salt",
    mechanismDetail:
      "Cu(I) salt reduces ArN₂⁺ → ArN₂ radical → N₂ loss → aryl radical (Ar•) → aryl radical reacts with CuX → ArX + regenerated Cu(I). One-electron process on copper surface. Gattermann modification uses Cu metal powder with HX (cheaper, less selective).",
    significance: "Replaces NH₂ with Cl, Br, CN on aromatic ring",
    realProducts:
      "Synthesis of aryl chlorides and bromides not accessible by direct EAS (meta-chloro compounds). ArCN → ArCOOH (hydrolysis) → useful for introducing COOH at specific ring positions. Used in synthesis of dyes, agrochemicals, and pharmaceutical intermediates.",
    jeeNeetTip:
      "JEE: Sandmeyer with CuCl → ArCl; CuBr → ArBr; CuCN → ArCN (→ ArCOOH). With KI, no copper needed (ArN₂⁺ + KI → ArI + N₂). Balz-Schiemann reaction: ArN₂⁺BF₄⁻ heated → ArF (fluoride) — only way to get ArF. Gattermann = Cu powder + HX (cheaper Sandmeyer).",
    kind: "C-X Bond",
  },
  {
    name: "Balz-Schiemann Reaction",
    substrate: "Aryl diazonium tetrafluoroborate (ArN₂⁺BF₄⁻)",
    reagent: "Dry heat (thermolysis)",
    product: "Fluorobenzene (ArF)",
    mechanism:
      "Thermal decomposition of diazonium fluoroborate gives aryl fluoride",
    mechanismDetail:
      "Aniline + HBF₄ + NaNO₂ forms ArN₂⁺BF₄⁻ (insoluble salt, isolated) → dry heating causes thermal decomposition → ArF + N₂ + BF₃. The fluoroborate anion is the fluoride source. No copper catalyst needed.",
    significance: "The primary route to aryl fluorides (aromatic fluorination)",
    realProducts:
      "Fluorobenzene and substituted fluorobenzenes for pharmaceutical synthesis (many drugs contain ArF). Aryl fluorides are metabolically stable — important in drug design to block cytochrome P450 oxidation. Used in liquid crystals for LCD displays.",
    jeeNeetTip:
      "JEE: Balz-Schiemann is the ONLY reliable way to introduce F onto benzene ring. Sandmeyer does NOT work for F (no CuF equivalent). Remember: ArNH₂ → (HBF₄, NaNO₂) → ArN₂⁺BF₄⁻ → (heat) → ArF.",
    kind: "C-X Bond",
  },
  {
    name: "Gattermann Reaction",
    substrate: "Aromatic ring (activated)",
    reagent: "Cu powder + HX (or HCN)",
    product: "ArX (haloaromatic) or ArCHO (from HCN)",
    mechanism: "Copper-mediated radical substitution (variant of Sandmeyer)",
    mechanismDetail:
      "Gattermann reaction = Sandmeyer using copper metal (powder) instead of CuX salt. Cheaper and less selective. Gattermann-Koch: benzene + CO + HCl + AlCl₃ (or AlCl₃ + CuCl) → benzaldehyde. Gattermann synthesis of aldehydes: ArH + HCN + AlCl₃ (Friedel-Crafts type) → ArCHO via imine intermediate hydrolysis.",
    significance:
      "Alternative to Sandmeyer; also used for aromatic aldehydes via formylation",
    realProducts:
      "Benzaldehyde from benzene (Gattermann-Koch). Various aryl halides for pharmaceutical intermediates. Hydroxybenzaldehyde from phenol (Gattermann synthesis using Zn(CN)₂).",
    jeeNeetTip:
      "JEE: Gattermann uses Cu powder + HX (cheaper Sandmeyer). Gattermann-Koch uses CO/HCl/AlCl₃ to introduce CHO onto benzene. Reimer-Tiemann is phenol-specific; Gattermann aldehyde works on activated rings (phenols, phenolic ethers).",
    kind: "C-C Bond Forming",
  },
  {
    name: "Beckmann Rearrangement",
    substrate: "Oxime of ketone",
    reagent: "H₂SO₄ or PCl₅",
    product: "Amide (N-substituted)",
    mechanism: "Anti group migrates; ring expansion for cyclic ketones",
    mechanismDetail:
      "Acid protonates oxime hydroxyl → water leaves generating nitrilium-like cation → the anti group migrates from C to N (1,2-shift, always anti to leaving group) → water attacks electrophilic carbon → amide product. For cyclohexanone oxime, ring expands from 6 to 7 membered caprolactam.",
    significance: "Cyclohexanone oxime → caprolactam (nylon-6 precursor)",
    realProducts:
      "Caprolactam is the most important product — ~5 million tonnes/year, polymerized to nylon-6 (stockings, toothbrush bristles, rope, parachutes, carpets, airbags). Nicotinamide (vitamin B₃) manufactured via related route.",
    jeeNeetTip:
      "JEE: The group that migrates is ANTI to the OH group (trans to OH). Cyclohexanone → cyclohexanone oxime → caprolactam (ring expansion to 7-membered lactam) is the industrial nylon-6 route. Frequently asked in JEE Advanced as mechanism-based question.",
    kind: "Rearrangement",
  },
  {
    name: "Hell-Volhard-Zelinsky (HVZ)",
    substrate: "Carboxylic acid with α-H",
    reagent: "Br₂ + P (or PBr₃)",
    product: "α-Bromo carboxylic acid",
    mechanism: "In situ formation of acyl bromide; enolization; α-bromination",
    mechanismDetail:
      "P reacts with Br₂ to form PBr₃ → PBr₃ converts RCOOH to acyl bromide RCOBr → acyl bromide enolizes readily (lower barrier than carboxylic acid) → Br₂ brominates at α-carbon → hydrolysis gives α-bromo acid. Selectivity: only α position brominated.",
    significance: "Introduces Br at α-carbon of carboxylic acid",
    realProducts:
      "α-Bromoacids as intermediates for α-amino acid synthesis (Strecker degradation). α-Bromoacetic acid → glycine (after treatment with NH₃). 2-Bromopropionic acid → alanine. Key step in synthesis of amino acid analogs for drug development.",
    jeeNeetTip:
      "JEE: HVZ is the α-bromination of carboxylic acids. The trick is that carboxylic acids cannot enolize directly (OH group is there, but enolization is slow) — PBr₃ converts acid to acyl bromide which enolizes readily. Product is α-bromo acid. HVZ is a 3-reagent reaction (RCOOH + Br₂ + P → α-BrRCOOH).",
    kind: "C-X Bond",
  },
  {
    name: "Perkin Condensation",
    substrate: "Aromatic aldehyde (no α-H)",
    reagent: "Acetic anhydride + sodium acetate",
    product: "α,β-Unsaturated acid (cinnamic acid type)",
    mechanism:
      "Enolate of anhydride attacks aromatic aldehyde; dehydration gives α,β-unsaturated acid",
    mechanismDetail:
      "Sodium acetate abstracts α-H from acetic anhydride → enolate anion → nucleophilic addition to aromatic aldehyde → β-hydroxy mixed anhydride intermediate → intramolecular dehydration → free acid with conjugated double bond after hydrolysis of anhydride linkage.",
    significance: "Synthesis of cinnamic acid and α,β-unsaturated acids",
    realProducts:
      "Cinnamic acid (from benzaldehyde + Ac₂O), used in pharmaceuticals and fragrances. Umbellic acid (from p-hydroxybenzaldehyde). Atropic acid (from PhCHO + propionic anhydride). Basis of some industrial routes to aromatic acids.",
    jeeNeetTip:
      "JEE Advanced: Perkin reaction is specific to AROMATIC aldehydes (no α-H) with acid anhydride + sodium salt of same acid. Gives cinnamic acid type product (PhCH=CHCOOH). Distinguish from Aldol (aliphatic, both need α-H) and Knoevenagel (uses active methylene compounds).",
    kind: "Condensation",
  },
  {
    name: "Knoevenagel Condensation",
    substrate: "Aldehyde + active methylene compound",
    reagent: "Weak base (piperidine, pyridine)",
    product: "α,β-Unsaturated carbonyl compound",
    mechanism: "Enolate of active methylene attacks aldehyde; dehydration",
    mechanismDetail:
      "Active methylene compound (malonic acid, malononitrile, Meldrum's acid) has α-H flanked by two electron-withdrawing groups (very acidic) → base forms enolate → enolate attacks aldehyde → β-hydroxy intermediate → dehydration → Knoevenagel product (α,β-unsaturated). Often followed by decarboxylation (Doebner modification).",
    significance:
      "C-C bond formation for synthesis of α,β-unsaturated diacids and dinitriles",
    realProducts:
      "Synthesis of coumarin (Knoevenagel + Perkin), Doebner modification gives cinnamic acids. 7-Aminocephalosporanic acid intermediate synthesis. Synthesis of BODIPY dyes (fluorescent) and pharmaceuticals.",
    jeeNeetTip:
      "JEE: Knoevenagel uses active methylene compound (has 2 EWG flanking CH₂). Example: PhCHO + CH₂(COOH)₂ + piperidine → PhCH=C(COOH)₂ → heat → PhCH=CHCOOH (Doebner modification — decarboxylation). Milder conditions than Aldol.",
    kind: "Condensation",
  },
  {
    name: "Kolbe Electrolysis",
    substrate: "Carboxylate salt (RCOONa)",
    reagent: "Aqueous solution, electrolysis",
    product: "Alkane (R–R) + CO₂ at anode",
    mechanism: "Decarboxylative radical coupling at anode",
    mechanismDetail:
      "At anode: RCOO⁻ → RCOO• (radical) + e⁻ → RCOO• loses CO₂ → R• radical → two R• radicals couple → R–R (symmetric alkane). At cathode: H₂O → H₂ + OH⁻. Requires concentrated carboxylate solution and smooth platinum electrode.",
    significance: "Produces symmetrical alkanes",
    realProducts:
      "Synthesis of sebacic acid esters (plasticizers) from adipic acid. Long-chain hydrocarbons for waxy coatings. Historical significance: one of first electroorganic synthesis reactions (1849).",
    jeeNeetTip:
      "JEE: Kolbe electrolysis gives symmetrical alkane from two carboxylate ions — always same R groups couple. The reaction occurs at the ANODE (oxidation). Contrast with normal electrolysis. RCOO⁻ oxidized, not reduced.",
    kind: "Oxidation",
  },
  {
    name: "Schmidt Reaction",
    substrate: "Carboxylic acid or ketone",
    reagent: "Hydrazoic acid (HN₃) + H₂SO₄",
    product: "Primary amine (from acid) or amide (from ketone)",
    mechanism: "N₃⁻ attacks activated C=O; migration of R group; N₂ loss",
    mechanismDetail:
      "H₂SO₄ activates carbonyl → N₃⁻ attacks → tetrahedral intermediate → anti group migrates to N → N₂ loss (driven by N₂ stability) → isocyanate (from acid) → hydrolysis gives amine. From ketone: gives amide (N inserted into C–C bond adjacent to carbonyl).",
    significance: "Converts carboxylic acid to amine with one fewer carbon",
    realProducts:
      "Synthesis of ε-caprolactam (cyclohexanone + HN₃ → ring expanded lactam → nylon-6). Important in pharmaceutical synthesis for nitrogen introduction. Industrial route to primary amines from fatty acids.",
    jeeNeetTip:
      "JEE Advanced: Schmidt reaction of acid → amine (carbon chain decreases by 1, similar to Hofmann). Schmidt reaction of ketone → amide (carbon chain maintained, N inserted). The anti group migrates just like Beckmann. HN₃ is the key reagent.",
    kind: "Rearrangement",
  },
  {
    name: "Birch Reduction",
    substrate: "Aromatic ring (or conjugated system)",
    reagent: "Na (or Li) in liquid NH₃ + alcohol (proton source)",
    product: "1,4-Cyclohexadiene (unconjugated diene)",
    mechanism:
      "Electron from dissolved metal reduces ring; protonation by alcohol",
    mechanismDetail:
      "Na dissolves in liquid NH₃ to form solvated electrons (e⁻_aq in NH₃) → e⁻ attacks π system of benzene → radical anion → protonation by alcohol at unsubstituted carbon → second electron → second protonation → 1,4-cyclohexadiene. EWG-substituted benzenes: reduction occurs at ipso/ortho carbons (leaving EWG on unreduced double bond). EDG-substituted: reduction occurs at ipso/ortho (leaving EDG on reduced portion).",
    significance:
      "Converts benzene ring to partially reduced non-conjugated diene",
    realProducts:
      "Synthesis of steroid skeletons (Woodward). Partial reduction of anisole → 1-methoxy-1,4-cyclohexadiene → key intermediate in terpene synthesis. Synthesis of 6-membered ring compounds with specific unsaturation patterns in medicinal chemistry.",
    jeeNeetTip:
      "JEE Advanced: Birch reduction uses dissolving metal (Na/Li in NH₃). Unconjugated 1,4-diene is the product. EWG on ring: substituent stays on double bond (C=C near EWG). EDG on ring: substituent stays on saturated carbon. Regioselectivity is a key exam question.",
    kind: "Reduction",
  },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-muted-foreground font-medium w-24 flex-shrink-0">
        {label}
      </span>
      <span className="text-foreground/90 leading-relaxed">{value}</span>
    </div>
  );
}

function ReactionCard({
  reaction,
  index,
}: { reaction: NamedReaction; index: number }) {
  const [open, setOpen] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useChemStore();
  const bookmarkId = `named-reaction-${reaction.name.toLowerCase().replace(/\s+/g, "-")}`;
  const bookmarked = isBookmarked(bookmarkId);
  const color = KIND_COLORS[reaction.kind];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="rounded-xl border border-border/20 overflow-hidden"
      style={{
        background: "oklch(0.16 0.018 250 / 0.7)",
        backdropFilter: "blur(12px)",
      }}
      data-ocid={`smart.named_reaction.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-card/20 transition-colors"
        aria-expanded={open}
      >
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-md flex-shrink-0 hidden sm:inline"
          style={{ background: `${color}22`, color }}
        >
          {reaction.kind}
        </span>
        <span className="font-semibold text-sm text-foreground flex-1 min-w-0">
          {reaction.name}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (bookmarked) removeBookmark(bookmarkId);
            else addBookmark(bookmarkId);
          }}
          className="flex-shrink-0 p-1 transition-transform hover:scale-110"
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark reaction"}
          data-ocid={`smart.named_reaction_bookmark.${index + 1}`}
        >
          {bookmarked ? (
            <Bookmark
              className="w-3.5 h-3.5 fill-current"
              style={{ color: "oklch(0.82 0.18 85)" }}
            />
          ) : (
            <Bookmark className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
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
            <div className="px-4 pb-4 pt-1 border-t border-border/10 space-y-3">
              {/* Kind badge on mobile */}
              <span
                className="sm:hidden inline text-xs font-semibold px-2 py-0.5 rounded-md"
                style={{ background: `${color}22`, color }}
              >
                {reaction.kind}
              </span>
              <Row label="Substrate" value={reaction.substrate} />
              <Row label="Reagent" value={reaction.reagent} />
              <Row label="Product" value={reaction.product} />

              {/* Mechanism overview */}
              <div
                className="rounded-xl p-3 text-xs leading-relaxed space-y-1"
                style={{
                  background: `${color}0D`,
                  border: `1px solid ${color}30`,
                }}
              >
                <p
                  className="font-semibold text-xs uppercase tracking-wider mb-1"
                  style={{ color }}
                >
                  ⚙ Mechanism
                </p>
                <p className="text-muted-foreground">
                  {reaction.mechanismDetail}
                </p>
              </div>

              {/* Real-world products */}
              <div
                className="rounded-xl p-3 text-xs leading-relaxed space-y-1"
                style={{
                  background: "oklch(0.7 0.18 200 / 0.08)",
                  border: "1px solid oklch(0.7 0.18 200 / 0.25)",
                }}
              >
                <p
                  className="font-semibold text-xs uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.7 0.18 200)" }}
                >
                  🏭 Real-World Products
                </p>
                <p style={{ color: "oklch(0.82 0.06 200)" }}>
                  {reaction.realProducts}
                </p>
              </div>

              {/* JEE/NEET tip */}
              <div
                className="rounded-xl p-3 text-xs leading-relaxed"
                style={{
                  background: "oklch(0.82 0.18 85 / 0.1)",
                  border: "1px solid oklch(0.82 0.18 85 / 0.35)",
                }}
              >
                <p
                  className="font-bold text-xs uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.82 0.18 85)" }}
                >
                  🎯 JEE / NEET Tip
                </p>
                <p style={{ color: "oklch(0.88 0.1 85)" }}>
                  {reaction.jeeNeetTip}
                </p>
              </div>

              <Row label="Significance" value={reaction.significance} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const ALL_KINDS: ReactionKind[] = [
  "C-C Bond Forming",
  "C-X Bond",
  "Condensation",
  "Oxidation",
  "Reduction",
  "Rearrangement",
];

export function NamedReactionsTab() {
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<ReactionKind | "All">("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = NAMED_REACTIONS.filter((r) => {
    const matchKind = kindFilter === "All" || r.kind === kindFilter;
    const q = query.toLowerCase();
    const matchSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.kind.toLowerCase().includes(q) ||
      r.substrate.toLowerCase().includes(q) ||
      r.product.toLowerCase().includes(q);
    return matchKind && matchSearch;
  });

  return (
    <div>
      {/* Search bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-3 border border-border/20"
        style={{
          background: "oklch(0.16 0.018 250 / 0.7)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reactions, substrates, products…"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          data-ocid="smart.named_reactions_search"
        />
        <button
          type="button"
          onClick={() => setShowFilters((f) => !f)}
          className="flex items-center gap-1 text-xs font-medium transition-colors px-2 py-1 rounded-lg"
          style={
            showFilters
              ? {
                  background: "oklch(0.68 0.16 258 / 0.2)",
                  color: "oklch(0.72 0.18 258)",
                }
              : { color: "oklch(0.58 0 0)" }
          }
          data-ocid="smart.named_reactions_filter_toggle"
        >
          <Filter className="w-3.5 h-3.5" />
          Filter
        </button>
      </div>

      {/* Type filter chips */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="flex flex-wrap gap-2 py-2">
              <button
                type="button"
                onClick={() => setKindFilter("All")}
                className="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                style={
                  kindFilter === "All"
                    ? {
                        background: "oklch(0.68 0.16 258 / 0.2)",
                        color: "oklch(0.72 0.18 258)",
                        borderColor: "oklch(0.68 0.16 258 / 0.4)",
                      }
                    : {
                        background: "oklch(0.18 0.02 250 / 0.4)",
                        color: "oklch(0.58 0 0)",
                        borderColor: "oklch(0.28 0.02 250 / 0.4)",
                      }
                }
                data-ocid="smart.named_reactions_filter.all"
              >
                All ({NAMED_REACTIONS.length})
              </button>
              {ALL_KINDS.map((kind) => {
                const count = NAMED_REACTIONS.filter(
                  (r) => r.kind === kind,
                ).length;
                const color = KIND_COLORS[kind];
                return (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => setKindFilter(kind)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                    style={
                      kindFilter === kind
                        ? {
                            background: `${color}22`,
                            color,
                            borderColor: `${color}50`,
                          }
                        : {
                            background: "oklch(0.18 0.02 250 / 0.4)",
                            color: "oklch(0.58 0 0)",
                            borderColor: "oklch(0.28 0.02 250 / 0.4)",
                          }
                    }
                    data-ocid={`smart.named_reactions_filter.${kind.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  >
                    {kind} ({count})
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground mb-3">
        Showing{" "}
        <span className="font-semibold text-foreground/80">
          {filtered.length}
        </span>{" "}
        of {NAMED_REACTIONS.length} reactions
      </p>

      {filtered.length === 0 ? (
        <p
          className="text-center text-muted-foreground py-12"
          data-ocid="smart.named_reactions_empty"
        >
          No reactions found
        </p>
      ) : (
        <div className="grid gap-2">
          {filtered.map((r, i) => (
            <ReactionCard key={r.name} reaction={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
