import { useMemo } from "react";

export type AnimationLevel = "full" | "reduced" | "minimal";

/**
 * Returns true if this is likely a low-end or constrained device.
 * Uses hardware concurrency, deviceMemory (Safari lacks this), and
 * prefers-reduced-motion as a combined proxy — all checks are synchronous
 * so they can be called once at module load time.
 */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;

  // Prefer reduced motion is the strongest signal
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return true;

  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores <= 2) return true;

  // navigator.deviceMemory is optional (not in Firefox or Safari)
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem < 4) return true;

  return false;
}

/**
 * Checks whether the current device is a touch/mobile device.
 * Prefers the pointer media query over UA sniffing.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

/**
 * Returns the appropriate animation level for this device:
 * - 'full'    → high-end desktop, no constraints
 * - 'reduced' → mobile / mid-range (coarse pointer or ≤4 CPU cores)
 * - 'minimal' → low-end device OR prefers-reduced-motion
 */
export function getAnimationLevel(): AnimationLevel {
  if (typeof window === "undefined") return "full";

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    isLowEndDevice()
  ) {
    return "minimal";
  }

  if (isMobileDevice() || (navigator.hardwareConcurrency ?? 8) <= 4) {
    return "reduced";
  }

  return "full";
}

/**
 * React hook — reads the animation level once on mount and memoises it.
 * Re-computing on every render would be wasteful; device capabilities
 * don't change during a session.
 */
export function useAnimationLevel(): AnimationLevel {
  return useMemo(() => getAnimationLevel(), []);
}
