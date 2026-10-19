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

// "instant" so a CSS `scroll-behavior: smooth` can't fight our per-frame steps
const jumpTo = (top: number) => window.scrollTo({ top, behavior: "instant" });

interface SmoothScrollOptions {
  // Fixed duration in ms; defaults to one based on scroll distance
  duration?: number;
  // Extra space kept above the target (e.g. for a fixed header)
  offset?: number;
  // Push the hash to the URL without the browser's instant jump
  updateHash?: boolean;
}

/**
 * Smoothly scrolls to the element matching `hash` (e.g. "#contact").
 * Returns false if no element was found so callers can fall back.
 */
export function smoothScrollTo(
  hash: string,
  { duration, offset = 0, updateHash = true }: SmoothScrollOptions = {}
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
    return true;
  }

  // Cancel any scroll already in progress
  if (activeFrame !== null) cancelAnimationFrame(activeFrame);

  const totalDuration = duration ?? durationFor(getTargetY() - startY);
  let startTime: number | null = null;
  const step = (now: number) => {
    startTime ??= now;
    const progress = Math.min((now - startTime) / totalDuration, 1);
    const distance = getTargetY() - startY;
    jumpTo(startY + distance * easeInOutCubic(progress));
    activeFrame = progress < 1 ? requestAnimationFrame(step) : null;
  };
  activeFrame = requestAnimationFrame(step);

  return true;
}
