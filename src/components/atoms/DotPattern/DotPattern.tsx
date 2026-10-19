import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  // Distance between dots in px
  spacing?: number;
  // Square dot size in px
  dotSize?: number;
  className?: string;
}

// Decorative grid of square dots that fades out along a diagonal ellipse.
// Dot color follows `currentColor`, so tint it with a text-* class.
export function DotPattern({
  spacing = 18,
  dotSize = 5,
  className,
}: DotPatternProps) {
  // Unique ids so multiple instances on one page don't clash
  const uid = useId();
  const patternId = `dots-${uid}`;
  const fadeId = `dots-fade-${uid}`;
  const maskId = `dots-mask-${uid}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern
          id={patternId}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <rect width={dotSize} height={dotSize} fill="currentColor" />
        </pattern>

        {/* Elliptical fade tilted from bottom-left to top-right */}
        <radialGradient
          id={fadeId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(0.6 0.52) rotate(-28) scale(0.6 0.3)"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${fadeId})`} />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
