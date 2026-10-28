"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  items: string[];
  // Full cycle per item in ms: 12.5% in, 75% hold, 12.5% out
  duration?: number;
  className?: string;
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// "Slide-up & fade-out-up": rise in from below, hold, rise out the top
const KEYFRAMES: Keyframe[] = [
  { offset: 0, opacity: 0, transform: "translateY(40px)", easing: EASE },
  { offset: 0.125, opacity: 1, transform: "translateY(0)", easing: "linear" },
  { offset: 0.875, opacity: 1, transform: "translateY(0)", easing: EASE },
  { offset: 1, opacity: 0, transform: "translateY(-40px)" },
];

// Cycles through `items`, one animation run per item. Driven by the Web
// Animations API so motion and text swap are a single source of truth
// (each run's `finish` advances to the next item).
// Reduced motion: shows the first item, static.
export function RotatingText({ items, duration = 4000, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || items.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = el.animate(KEYFRAMES, { duration, fill: "both" });
    animation.onfinish = () => setIndex((i) => (i + 1) % items.length);
    return () => animation.cancel();
  }, [index, items.length, duration]);

  if (items.length === 0) return null;

  return (
    <span className={cn("inline-block", className)} aria-live="polite">
      <span ref={textRef} className="inline-block will-change-transform">
        {items[index]}
      </span>
    </span>
  );
}
