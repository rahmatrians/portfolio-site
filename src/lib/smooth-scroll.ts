// Eased in-page scrolling shared by nav links and CTA buttons.

// Duration scales with distance so long jumps don't feel rushed
const MIN_DURATION = 600; // ms
const MAX_DURATION = 1400; // ms
const durationFor = (distance: number) =>
  Math.min(MAX_DURATION, Math.max(MIN_DURATION, 400 + Math.abs(distance) * 0.25));

// Slow start, fast middle, slow end
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let activeFrame: number | null = null;
let pendingComplete: (() => void) | null = null;

// "instant" so a CSS `scroll-behavior: smooth` can't fight our per-frame steps
const jumpTo = (top: number) => window.scrollTo({ top, behavior: "instant" });

interface SmoothScrollOptions {
  // Fixed duration in ms; defaults to one based on scroll distance
  duration?: number;
  // Extra space kept above the target (e.g. for a fixed header)
  offset?: number;
  // Push the hash to the URL without the browser's instant jump
  updateHash?: boolean;
  // Called once the scroll has finished (or been replaced by a newer one)
  onComplete?: () => void;
}

/**
 * Smoothly scrolls to the element matching `hash` (e.g. "#contact").
 * Returns false if no element was found so callers can fall back.
 */
export function smoothScrollTo(
  hash: string,
  { duration, offset = 0, updateHash = true, onComplete }: SmoothScrollOptions = {}
): boolean {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;

  const startY = window.scrollY;
  // Recomputed each frame so late layout shifts (fonts, images) don't throw
  // us off, and clamped so targets near the page bottom still ease to a stop.
  const getTargetY = () => {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    return Math.max(0, Math.min(y, maxY));
  };

  if (updateHash) window.history.pushState(null, "", hash);

  // Respect users who prefer reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || getTargetY() === startY) {
    jumpTo(getTargetY());
    onComplete?.();
    return true;
  }

  // Cancel any scroll already in progress (and let its owner know)
  if (activeFrame !== null) cancelAnimationFrame(activeFrame);
  pendingComplete?.();
  pendingComplete = onComplete ?? null;

  const totalDuration = duration ?? durationFor(getTargetY() - startY);
  let startTime: number | null = null;
  const step = (now: number) => {
    startTime ??= now;
    const progress = Math.min((now - startTime) / totalDuration, 1);
    const distance = getTargetY() - startY;
    jumpTo(startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      activeFrame = requestAnimationFrame(step);
    } else {
      activeFrame = null;
      const done = pendingComplete;
      pendingComplete = null;
      done?.();
    }
  };
  activeFrame = requestAnimationFrame(step);

  return true;
}
