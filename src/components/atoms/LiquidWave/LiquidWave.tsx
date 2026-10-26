"use client";

import { useEffect, useRef } from "react";
import { LIQUID_FILTER_ID } from "@/components/atoms/LiquidFilter";
import { cn } from "@/lib/utils";

interface LiquidWaveProps {
  className?: string;
}

// Shared look of both wave fronts. They sit at the cursor's entry point
// (--wave-x/--wave-y), are sized to cover the host (--wave-size), and are
// scaled to 0 with NO transition while idle, so leaving resets instantly.
const waveClass =
  "absolute left-(--wave-x) top-(--wave-y) size-(--wave-size) -translate-1/2 rounded-full scale-0 transition-none group-data-active/wave:scale-100 group-data-active/wave:transition-[scale] group-data-active/wave:duration-700 group-data-active/wave:ease-[cubic-bezier(0.65,0,0.35,1)]";

// Each wave gets its own goo pass so both fronts stay crisp and liquid
const gooStyle = { filter: `url(#${LIQUID_FILTER_ID})` };

// Edge-triggered liquid dual wave. Drop inside any element with
// `relative isolate overflow-hidden` (the Button `liquid` variant does this).
//
// The layer sits ABOVE the host's text with `mix-blend-difference`:
//  - Wave 1 (white) inverts everything under it: black bg -> white,
//    white text -> black (and the mirror for outline buttons).
//  - Wave 2 (black), 0.35s later, is the identity for `difference`, so the
//    button returns to its original colours as it flows over.
// The text itself is never filtered, so it stays sharp.
export function LiquidWave({ className }: LiquidWaveProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  // Listen on the host (parent) and write straight to the DOM: no re-renders
  useEffect(() => {
    const root = rootRef.current;
    const host = root?.parentElement;
    if (!root || !host) return;

    const handleEnter = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      // Clamp to the boundary so the origin is exactly where the cursor crossed
      const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
      const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
      // Twice the distance to the farthest corner covers the whole host
      const size =
        2 * Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));

      // Commit the idle state first so a quick re-entry always restarts at 0
      delete root.dataset.active;
      void root.offsetWidth;

      root.style.setProperty("--wave-x", `${x}px`);
      root.style.setProperty("--wave-y", `${y}px`);
      root.style.setProperty("--wave-size", `${size}px`);
      root.dataset.active = "";
    };

    const handleLeave = () => {
      delete root.dataset.active;
    };

    host.addEventListener("pointerenter", handleEnter);
    host.addEventListener("pointerleave", handleLeave);
    return () => {
      host.removeEventListener("pointerenter", handleEnter);
      host.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <span
      ref={rootRef}
      aria-hidden
      className={cn(
        "group/wave pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] mix-blend-difference motion-reduce:hidden",
        className
      )}
    >
      <span className="absolute inset-0" style={gooStyle}>
        <span className={cn(waveClass, "bg-white")} />
      </span>
      <span className="absolute inset-0" style={gooStyle}>
        <span className={cn(waveClass, "bg-black group-data-active/wave:delay-350")} />
      </span>
    </span>
  );
}
