import { GlassSlider } from "@/components/ui/GlassSlider";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import { TheoryPanel } from "./TheoryPanel";

// ─── Rust data ────────────────────────────────────────────────────────────────
const DAY_STEPS = [
  { day: 0, label: "Day 0: Clean nail, metallic silver surface" },
  { day: 2, label: "Day 2: Tiny reddish-orange spots appear" },
  { day: 5, label: "Day 5: Rust spreads, surface darkens" },
  { day: 7, label: "Day 7: Heavily rusted, flaky brown coating" },
];

type Condition = "normal" | "no-water" | "no-air";

const CONDITIONS: {
  id: Condition;
  label: string;
  desc: string;
  rusts: boolean;
}[] = [
  {
    id: "normal",
    label: "Water + Air",
    desc: "Normal conditions",
    rusts: true,
  },
  { id: "no-water", label: "No Water", desc: "Dry air only", rusts: false },
  {
    id: "no-air",
    label: "No Air (boiled water)",
    desc: "No dissolved O₂",
    rusts: false,
  },
];

// ─── SVG Nail ─────────────────────────────────────────────────────────────────
const RustNailSVG = memo(function RustNailSVG({
  day,
  rusts,
}: {
  day: number;
  rusts: boolean;
}) {
  const t = rusts ? day / 7 : 0; // 0 = clean, 1 = heavily rusted

  // Nail body color interpolation: silver → orange → dark brown
  const r = Math.round(200 + (rusts ? t * (160 - 200) : 0));
  const g = Math.round(200 + (rusts ? t * (80 - 200) : 0));
  const b = Math.round(210 + (rusts ? t * (30 - 210) : 0));
  const nailColor = `rgb(${r},${g},${b})`;

  // Rust spot positions (deterministic)
  const SPOTS = [
    { cx: 38, cy: 55, r: 4 },
    { cx: 42, cy: 75, r: 5 },
    { cx: 35, cy: 90, r: 3.5 },
    { cx: 40, cy: 110, r: 6 },
    { cx: 36, cy: 130, r: 4.5 },
    { cx: 43, cy: 148, r: 5 },
    { cx: 37, cy: 165, r: 3 },
    { cx: 41, cy: 38, r: 3 },
  ];

  const spotOpacity = rusts ? Math.min(1, (day / 2) * 0.5) : 0;

  return (
    <svg
      width={80}
      height={220}
      viewBox="0 0 80 220"
      aria-label="Iron nail"
      role="img"
    >
      {/* Nail head */}
      <ellipse
        cx={40}
        cy={20}
        rx={18}
        ry={5}
        fill={nailColor}
        style={{ transition: "fill 1.5s ease" }}
      />
      <rect
        x={36}
        y={20}
        width={8}
        height={180}
        rx={3}
        fill={nailColor}
        style={{ transition: "fill 1.5s ease" }}
      />
      {/* Nail tip */}
      <polygon
        points="36,200 44,200 40,215"
        fill={nailColor}
        style={{ transition: "fill 1.5s ease" }}
      />
      {/* Highlight */}
      <rect
        x={38}
        y={24}
        width={2.5}
        height={160}
        rx={1}
        fill="rgba(255,255,255,0.18)"
      />
      {/* Rust spots */}
      {SPOTS.map((s) => (
        <ellipse
          key={`${s.cx}-${s.cy}`}
          cx={s.cx}
          cy={s.cy}
          rx={s.r * Math.min(1, day / 3)}
          ry={s.r * 0.6 * Math.min(1, day / 3)}
          fill={`rgba(180,70,20,${spotOpacity})`}
          style={{ transition: "all 1.5s ease" }}
        />
      ))}
      {/* Heavy rust layer day 5+ */}
      {rusts && day >= 5 && (
        <rect
          x={35}
          y={22}
          width={10}
          height={178}
          rx={4}
          fill={`rgba(160,60,15,${Math.min(0.55, ((day - 5) / 2) * 0.55)})`}
          style={{ transition: "all 1.5s ease" }}
        />
      )}
    </svg>
  );
});

// ─── Water level in tube ──────────────────────────────────────────────────────
const TestTubeWithNail = memo(function TestTubeWithNail({
  day,
  condition,
}: {
  day: number;
  condition: Condition;
}) {
  const hasWater = condition !== "no-water";
  const waterColor =
    day > 4 && condition === "normal"
      ? "rgba(180,120,60,0.35)"
      : "rgba(56,189,248,0.30)";

  return (
    <div className="relative flex flex-col items-center">
      {/* Test tube outline */}
      <svg
        width={100}
        height={230}
        viewBox="0 0 100 230"
        className="absolute top-0 left-1/2 -translate-x-1/2"
        role="img"
        aria-label="Test tube containing nail"
      >
        <title>Test tube with iron nail</title>
        {/* Water fill */}
        {hasWater && (
          <rect
            x={16}
            y={100}
            width={68}
            height={118}
            rx={4}
            fill={waterColor}
            style={{ transition: "fill 1.5s ease" }}
          />
        )}
        {hasWater && (
          <ellipse
            cx={50}
            cy={218}
            rx={34}
            ry={6}
            fill={waterColor}
            style={{ transition: "fill 1.5s ease" }}
          />
        )}
        {/* Glass tube */}
        <rect
          x={14}
          y={0}
          width={72}
          height={218}
          rx={8}
          fill="none"
          stroke="rgba(150,200,255,0.35)"
          strokeWidth={3}
        />
        <ellipse
          cx={50}
          cy={218}
          rx={36}
          ry={7}
          fill="none"
          stroke="rgba(150,200,255,0.3)"
          strokeWidth={3}
        />
        {/* Highlight */}
        <line
          x1={20}
          y1={8}
          x2={20}
          y2={200}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* Label tag */}
        {condition === "no-water" && (
          <text x={22} y={80} fontSize="9" fill="rgba(200,200,200,0.5)">
            Dry air
          </text>
        )}
        {condition === "no-air" && (
          <text x={22} y={80} fontSize="9" fill="rgba(200,200,200,0.5)">
            Boiled
          </text>
        )}
      </svg>
      <div className="mt-3">
        <RustNailSVG day={day} rusts={condition === "normal"} />
      </div>
    </div>
  );
});

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export const RustingTab = memo(function RustingTab() {
  const [day, setDay] = useState(0);
  const [condition, setCondition] = useState<Condition>("normal");

  const currentStep =
    DAY_STEPS.slice()
      .reverse()
      .find((s) => s.day <= day) ?? DAY_STEPS[0];

  const rusts = condition === "normal";
  const rustDesc = rusts
    ? currentStep.label
    : "No rust forms — one of the required conditions (water AND air) is absent.";

  return (
    <div className="space-y-6" data-ocid="virtual_lab.rusting.panel">
      <TheoryPanel
        principle="Rusting is an electrochemical process requiring both water (moisture) and dissolved oxygen. Iron acts as an anode (oxidised: Fe → Fe²⁺ + 2e⁻) while oxygen at the cathode is reduced (O₂ + 2H₂O + 4e⁻ → 4OH⁻). The ions combine to form Fe(OH)₂, which is further oxidised to hydrated iron(III) oxide — rust (Fe₂O₃·3H₂O)."
        observations="Gradual orange-brown discolouration starting at surface imperfections. Texture becomes flaky over days. Removing either water (dry box) or dissolved oxygen (boiled water, sealed) completely stops rust formation — confirming both are required."
        application="Understanding rusting drives corrosion prevention: galvanising (zinc coating), painting, cathodic protection (sacrificial anodes on ships and pipelines), and stainless steel alloys (chromium forms a passive oxide layer). Annual global cost of corrosion exceeds $2.5 trillion."
      />
      {/* Apparatus - three test tubes side by side */}
      <div className="grid grid-cols-3 gap-3 items-end justify-items-center">
        {CONDITIONS.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider text-center leading-tight",
                condition === c.id
                  ? "text-foreground"
                  : "text-muted-foreground/60",
              )}
            >
              {c.label}
            </span>
            <button
              type="button"
              className={cn(
                "rounded-2xl p-1 transition-all duration-300 cursor-pointer bg-transparent border-0",
                condition === c.id
                  ? "ring-2 ring-primary/50 bg-primary/5"
                  : "opacity-60 hover:opacity-80",
              )}
              onClick={() => setCondition(c.id)}
            >
              <TestTubeWithNail day={day} condition={c.id} />
            </button>
            <div
              className={cn(
                "text-[9px] text-center leading-tight max-w-[80px]",
                c.rusts ? "text-orange-400/80" : "text-green-400/80",
              )}
            >
              {c.rusts ? "Rusts ✓" : "No rust ✗"}
            </div>
          </div>
        ))}
      </div>

      {/* Day slider */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <GlassSlider
          min={0}
          max={7}
          step={0.5}
          value={day}
          onChange={setDay}
          label="Simulation Time"
          unit=" days"
          colorFrom="rgba(251,146,60,0.7)"
          colorTo="rgba(180,70,20,0.9)"
          data-ocid="virtual_lab.rusting.day_slider"
          aria-label="Rusting simulation days"
        />
        {/* Day step labels */}
        <div className="flex justify-between text-[9px] text-muted-foreground/60">
          {DAY_STEPS.map((s) => (
            <span key={s.day}>Day {s.day}</span>
          ))}
        </div>
      </div>

      {/* Condition selector */}
      <div className="grid grid-cols-3 gap-2">
        {CONDITIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCondition(c.id)}
            className={cn(
              "glass rounded-xl px-3 py-3 text-center transition-all duration-200",
              condition === c.id
                ? "ring-2 ring-primary/50 bg-primary/10 text-foreground"
                : "text-muted-foreground hover:bg-card/30",
            )}
            data-ocid={`virtual_lab.rusting.condition_${c.id}`}
          >
            <div className="text-xs font-semibold leading-tight">{c.label}</div>
            <div className="text-[9px] mt-0.5 opacity-70">{c.desc}</div>
          </button>
        ))}
      </div>

      {/* Explanation */}
      <div
        className="glass rounded-xl p-4 border-l-2 border-primary/40"
        data-ocid="virtual_lab.rusting.explanation"
      >
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          {rusts ? "Observation" : "Why no rust?"}
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{rustDesc}</p>
        {rusts && (
          <div className="mt-3 glass rounded-lg p-3 font-mono text-sm text-center text-foreground/90">
            4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → 2Fe₂O₃·3H₂O (rust)
          </div>
        )}
        {!rusts && (
          <p className="text-sm text-muted-foreground mt-2">
            Rusting requires <strong className="text-foreground">both</strong>{" "}
            water (moisture) and oxygen. Remove either one and the
            electrochemical corrosion process cannot proceed.
          </p>
        )}
      </div>
    </div>
  );
});
