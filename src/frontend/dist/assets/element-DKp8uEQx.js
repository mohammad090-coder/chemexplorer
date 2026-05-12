const CATEGORY_LABELS = {
  "alkali-metal": "Alkali Metal",
  "alkaline-earth-metal": "Alkaline Earth Metal",
  "transition-metal": "Transition Metal",
  "post-transition-metal": "Post-Transition Metal",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  halogen: "Halogen",
  "noble-gas": "Noble Gas",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
  unknown: "Unknown"
};
const CATEGORY_GRADIENT = {
  "alkali-metal": "from-cyan-400/70 to-sky-500/70",
  "alkaline-earth-metal": "from-fuchsia-400/70 to-pink-500/70",
  "transition-metal": "from-violet-400/70 to-purple-600/70",
  "post-transition-metal": "from-blue-400/70 to-indigo-500/70",
  metalloid: "from-rose-400/70 to-pink-500/70",
  nonmetal: "from-orange-400/70 to-amber-500/70",
  halogen: "from-emerald-400/70 to-teal-500/70",
  "noble-gas": "from-yellow-400/70 to-amber-400/70",
  lanthanide: "from-indigo-400/70 to-blue-500/70",
  actinide: "from-red-400/70 to-rose-600/70",
  unknown: "from-muted/60 to-muted/80"
};
const CATEGORY_TEXT = {
  "alkali-metal": "text-cyan-300",
  "alkaline-earth-metal": "text-fuchsia-300",
  "transition-metal": "text-violet-300",
  "post-transition-metal": "text-blue-300",
  metalloid: "text-rose-300",
  nonmetal: "text-orange-300",
  halogen: "text-emerald-300",
  "noble-gas": "text-yellow-300",
  lanthanide: "text-indigo-300",
  actinide: "text-red-300",
  unknown: "text-muted-foreground"
};
export {
  CATEGORY_TEXT as C,
  CATEGORY_GRADIENT as a,
  CATEGORY_LABELS as b
};
