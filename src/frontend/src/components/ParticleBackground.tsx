import { useAnimationLevel } from "@/lib/performance";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: "dot" | "molecule";
  shapePoints?: { x: number; y: number }[];
  radius?: number;
}

// Blue/purple palette for the deep-space homepage vibe
const COLORS = [
  "oklch(0.60 0.20 258)",
  "oklch(0.55 0.22 270)",
  "oklch(0.58 0.18 290)",
  "oklch(0.62 0.16 240)",
  "oklch(0.65 0.20 200)",
];

// Faint benzene-ring glowing outlines
const MOLECULE_COLORS = [
  "oklch(0.62 0.22 260)",
  "oklch(0.58 0.24 275)",
  "oklch(0.65 0.18 245)",
];

const PARTICLE_CONFIG = {
  full: { maxDots: 40, maxMolecules: 6, spawnInterval: 8, shadowBlur: 6 },
  reduced: { maxDots: 16, maxMolecules: 3, spawnInterval: 14, shadowBlur: 3 },
  minimal: { maxDots: 0, maxMolecules: 0, spawnInterval: 999, shadowBlur: 0 },
} as const;

const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

const FRAME_SKIP = 2;

function hexPoints(r: number): { x: number; y: number }[] {
  return Array.from({ length: 6 }, (_, i) => ({
    x: r * Math.cos((Math.PI / 3) * i - Math.PI / 6),
    y: r * Math.sin((Math.PI / 3) * i - Math.PI / 6),
  }));
}

export function ParticleBackground() {
  const animationLevel = useAnimationLevel();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const frameCountRef = useRef<number>(0);

  const cfg = PARTICLE_CONFIG[animationLevel];
  const maxDots = isTouchDevice ? Math.min(cfg.maxDots, 20) : cfg.maxDots;
  const maxMolecules = isTouchDevice
    ? Math.min(cfg.maxMolecules, 2)
    : cfg.maxMolecules;

  useEffect(() => {
    if (animationLevel === "minimal") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const spawnDot = () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      particlesRef.current.push({
        type: "dot",
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx:
          (Math.random() - 0.5) * (animationLevel === "reduced" ? 0.22 : 0.36),
        vy: -(
          0.28 +
          Math.random() * (animationLevel === "reduced" ? 0.32 : 0.46)
        ),
        size: 1 + Math.random() * 2,
        opacity: 0,
        color,
        life: 0,
        maxLife: 200 + Math.random() * 200,
      });
    };

    const spawnMolecule = () => {
      const color =
        MOLECULE_COLORS[Math.floor(Math.random() * MOLECULE_COLORS.length)];
      const r = isTouchDevice
        ? 10 + Math.random() * 8
        : 14 + Math.random() * 10;
      particlesRef.current.push({
        type: "molecule",
        x: Math.random() * canvas.width,
        y: canvas.height + 40,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.12 + Math.random() * 0.18),
        size: r,
        radius: r,
        opacity: 0,
        color,
        life: 0,
        maxLife: 400 + Math.random() * 300,
        shapePoints: hexPoints(r),
      });
    };

    const { spawnInterval, shadowBlur } = cfg;
    let spawnTimer = 0;
    let moleculeTimer = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (pausedRef.current) return;

      frameCountRef.current++;
      if (frameCountRef.current % FRAME_SKIP !== 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer++;
      moleculeTimer++;

      const dotCount = particlesRef.current.filter(
        (p) => p.type === "dot",
      ).length;
      if (spawnTimer % spawnInterval === 0 && dotCount < maxDots) spawnDot();

      const molCount = particlesRef.current.filter(
        (p) => p.type === "molecule",
      ).length;
      if (moleculeTimer % (spawnInterval * 5) === 0 && molCount < maxMolecules)
        spawnMolecule();

      particlesRef.current = particlesRef.current.filter(
        (p) => p.life < p.maxLife,
      );

      for (const p of particlesRef.current) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / p.maxLife;
        const rawOpacity = t < 0.1 ? t * 5 : t > 0.8 ? (1 - t) * 5 : 0.5;

        if (p.type === "dot") {
          p.opacity = Math.min(0.07, Math.max(0.015, rawOpacity * 0.12));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color
            .replace(")", ` / ${p.opacity})`)
            .replace("oklch(", "oklch(");
          if (animationLevel === "full") {
            ctx.shadowBlur = shadowBlur;
            ctx.shadowColor = p.color;
          }
          ctx.fill();
          if (animationLevel === "full") ctx.shadowBlur = 0;
        } else {
          // Benzene ring molecule outline
          p.opacity = Math.min(0.14, Math.max(0.03, rawOpacity * 0.22));
          if (!p.shapePoints) continue;

          const strokeAlpha = p.opacity;
          const r = p.radius ?? p.size;

          // Hexagon ring
          ctx.beginPath();
          for (let i = 0; i < p.shapePoints.length; i++) {
            const pt = p.shapePoints[i];
            if (i === 0) ctx.moveTo(p.x + pt.x, p.y + pt.y);
            else ctx.lineTo(p.x + pt.x, p.y + pt.y);
          }
          ctx.closePath();
          ctx.strokeStyle = p.color
            .replace(")", ` / ${strokeAlpha})`)
            .replace("oklch(", "oklch(");
          ctx.lineWidth = 1.0;
          if (animationLevel === "full") {
            ctx.shadowBlur = shadowBlur * 1.5;
            ctx.shadowColor = p.color;
          }
          ctx.stroke();
          if (animationLevel === "full") ctx.shadowBlur = 0;

          // Inner nucleus dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = p.color
            .replace(")", ` / ${strokeAlpha * 0.6})`)
            .replace("oklch(", "oklch(");
          ctx.fill();

          // Alternate spokes (bond lines)
          ctx.lineWidth = 0.7;
          for (let i = 0; i < p.shapePoints.length; i += 2) {
            const pt = p.shapePoints[i];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + pt.x, p.y + pt.y);
            ctx.strokeStyle = p.color
              .replace(")", ` / ${strokeAlpha * 0.45})`)
              .replace("oklch(", "oklch(");
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [animationLevel, maxDots, maxMolecules, cfg]);

  if (animationLevel === "minimal") return null;

  return <canvas ref={canvasRef} className="particle-bg" />;
}
