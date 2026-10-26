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

// Extra wave radius (px) beyond the farthest corner. The goo filter
// (blur 8 + alpha threshold) erodes the edge, so push it well outside.
const GOO_MARGIN = 24;

// Each wave gets its own goo pass so both fronts stay crisp and liquid
const gooStyle = { filter: `url(#${LIQUID_FILTER_ID})` };

// The wave layer covers the host's whole border box (corners included) and
// the host's border is redrawn by a ring on top of it. The real border is
// made transparent (its background shows through, so it inverts evenly).
// Otherwise its anti-aliased inner curve gets inverted too and a white
// sliver peeks out in every rounded corner.
function syncGeometry(host: HTMLElement, root: HTMLElement, ring: HTMLElement) {
  const style = getComputedStyle(host);
  const edges = {
    top: style.borderTopWidth,
    right: style.borderRightWidth,
    bottom: style.borderBottomWidth,
    left: style.borderLeftWidth,
  };
  for (const el of [root, ring]) {
    el.style.top = `-${edges.top}`;
    el.style.right = `-${edges.right}`;
    el.style.bottom = `-${edges.bottom}`;
    el.style.left = `-${edges.left}`;
    el.style.borderRadius = style.borderRadius;
  }
  ring.style.borderStyle = style.borderStyle;
  ring.style.borderWidth = style.borderWidth;
}

// Hand the visible border over to the ring; returns a restore function
function takeOverBorder(host: HTMLElement, ring: HTMLElement) {
  ring.style.borderColor = getComputedStyle(host).borderColor;
  const previous = host.style.borderColor;
  host.style.borderColor = "transparent";
  return () => {
    host.style.borderColor = previous;
  };
}

// Edge-triggered liquid dual wave. Drop inside any element with
// `relative isolate` (the Button `liquid` variant does this).
//
// The layer sits ABOVE the host's text with `mix-blend-difference`:
//  - Wave 1 (white) inverts everything under it: black bg -> white,
//    white text -> black (and the mirror for outline buttons).
//  - Wave 2 (black), 0.35s later, is the identity for `difference`, so the
//    button returns to its original colours as it flows over.
// The text itself is never filtered, so it stays sharp.
export function LiquidWave({ className }: LiquidWaveProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const finalWaveRef = useRef<HTMLSpanElement>(null);

  // Listen on the host (parent) and write straight to the DOM: no re-renders
  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const host = root?.parentElement;
    if (!root || !ring || !host) return;

    syncGeometry(host, root, ring);
    const restoreBorder = takeOverBorder(host, ring);

    const handleEnter = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      // Clamp to the boundary so the origin is exactly where the cursor crossed
      const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
      const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
      // Twice the distance to the farthest corner covers the whole host;
      // the extra margin keeps the goo-eroded rim fully outside the corners
      const size =
        2 *
        (Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) +
          GOO_MARGIN);

      // Commit the idle state first so a quick re-entry always restarts at 0
      delete root.dataset.active;
      delete root.dataset.done;
      void root.offsetWidth;

      root.style.setProperty("--wave-x", `${x}px`);
      root.style.setProperty("--wave-y", `${y}px`);
      root.style.setProperty("--wave-size", `${size}px`);
      syncGeometry(host, root, ring);
      root.dataset.active = "";
    };

    const handleLeave = () => {
      delete root.dataset.active;
      delete root.dataset.done;
    };

    // Black wave finished: the button is back to its base colours, so hide
    // the layer to leave no white rim behind
    const handleWaveEnd = (event: TransitionEvent) => {
      if (event.target === finalWaveRef.current && root.dataset.active !== undefined) {
        root.dataset.done = "";
      }
    };

    host.addEventListener("pointerenter", handleEnter);
    host.addEventListener("pointerleave", handleLeave);
    root.addEventListener("transitionend", handleWaveEnd);
    return () => {
      restoreBorder();
      host.removeEventListener("pointerenter", handleEnter);
      host.removeEventListener("pointerleave", handleLeave);
      root.removeEventListener("transitionend", handleWaveEnd);
    };
  }, []);

  return (
    <>
      <span
        ref={rootRef}
        aria-hidden
        className={cn(
          // Clips itself with the host's outer radius (set in syncToBorderBox)
          "group/wave pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] mix-blend-difference data-done:invisible motion-reduce:hidden",
          className
        )}
      >
        <span className="absolute" style={gooStyle}>
          <span className={cn(waveClass, "bg-white")} />
        </span>
        <span className="absolute" style={gooStyle}>
          <span
            ref={finalWaveRef}
            className={cn(waveClass, "bg-black group-data-active/wave:delay-350")}
          />
        </span>
      </span>
      {/* Copy of the host's border, painted above the (blended) waves */}
      <span
        ref={ringRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] border-0"
      />
    </>
  );
}
