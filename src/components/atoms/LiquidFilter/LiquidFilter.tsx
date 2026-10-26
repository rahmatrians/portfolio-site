// Single global SVG "goo" filter used by every LiquidWave.
// Rendered once in the root layout; referenced via `filter: url(#id)`.
export const LIQUID_FILTER_ID = "liquid-goo";

// 14% viscosity profile: blur the alpha, then threshold it (22a - 11) so
// soft edges snap into thick, fluid shapes.
export function LiquidFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute size-0 overflow-hidden"
    >
      <defs>
        {/* Oversized region so the blur never clips at the host's edges */}
        <filter id={LIQUID_FILTER_ID} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
            result="goo"
          />
        </filter>
      </defs>
    </svg>
  );
}
