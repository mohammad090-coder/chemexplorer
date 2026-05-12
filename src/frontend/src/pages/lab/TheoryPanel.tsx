import { cn } from "@/lib/utils";
import { memo, useState } from "react";

interface TheorySubSection {
  title: string;
  icon: string;
  content: string;
}

interface TheoryPanelProps {
  principle: string;
  observations: string;
  application: string;
  className?: string;
}

export const TheoryPanel = memo(function TheoryPanel({
  principle,
  observations,
  application,
  className,
}: TheoryPanelProps) {
  const [open, setOpen] = useState(false);

  const sections: TheorySubSection[] = [
    { title: "Scientific Principle", icon: "⚗️", content: principle },
    { title: "Observations to Expect", icon: "👁️", content: observations },
    { title: "Real-Life Application", icon: "🌍", content: application },
  ];

  return (
    <div className={cn("mb-6", className)} data-ocid="theory_panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between glass rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-card/30"
        aria-expanded={open}
        data-ocid="theory_panel.toggle"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">📚</span>
          <span className="text-sm font-semibold text-foreground">
            Theory &amp; Background
          </span>
        </div>
        <span
          className="text-muted-foreground transition-transform duration-300 text-sm"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>

      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? "600px" : "0px",
          transition: "max-height 300ms ease",
        }}
      >
        <div className="pt-3 grid sm:grid-cols-3 gap-3">
          {sections.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                "glass rounded-xl p-4 border-l-2",
                i === 0 && "border-cyan-400/50",
                i === 1 && "border-amber-400/50",
                i === 2 && "border-emerald-400/50",
              )}
            >
              <div
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5",
                  i === 0 && "text-cyan-400",
                  i === 1 && "text-amber-400",
                  i === 2 && "text-emerald-400",
                )}
              >
                <span>{s.icon}</span>
                {s.title}
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
