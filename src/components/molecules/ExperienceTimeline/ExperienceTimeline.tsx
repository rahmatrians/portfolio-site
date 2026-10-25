"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import type { Experience } from "@/config/site";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  items: Experience[];
  // Card highlighted before any interaction (0 = newest)
  defaultActiveIndex?: number;
  className?: string;
}

// Height of the black marker that slides along the center line
const INDICATOR_HEIGHT = 57;

// Zig-zag timeline: even items on the left, odd items on the right, offset
// by half a card. Each card spans two equal grid rows, so the right column
// naturally starts halfway down the left card. Hovering/tapping a card
// highlights it and moves the center-line marker to its vertical middle.
export function ExperienceTimeline({
  items,
  defaultActiveIndex = 0,
  className,
}: ExperienceTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    const item = itemRefs.current[activeIndex];
    if (!container || !item) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const center = itemRect.top - containerRect.top + itemRect.height / 2;
    setIndicatorTop(center - INDICATOR_HEIGHT / 2);
  }, [activeIndex]);

  // Re-measure when the active card changes or the layout resizes
  useEffect(() => {
    updateIndicator();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);
    return () => observer.disconnect();
  }, [updateIndicator]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Center line + sliding marker (desktop only) */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-12 bottom-12 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 md:block"
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 left-1/2 hidden w-0.5 bg-black transition-transform duration-500 ease-out md:block",
          indicatorTop === null && "opacity-0",
        )}
        style={{
          height: INDICATOR_HEIGHT,
          transform: `translate(-50%, ${indicatorTop ?? 0}px)`,
        }}
      />

      <ol className="grid grid-cols-1 gap-y-6 md:auto-rows-fr md:grid-cols-2 md:gap-x-20 md:gap-y-[114px]">
        {items.map((experience, index) => (
          <li
            key={`${experience.company}-${experience.period}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            // Row placement: item i spans rows i+1 and i+2 in its column
            style={{ "--row": index + 1 } as React.CSSProperties}
            className={cn(
              "md:row-span-2 md:row-start-(--row)",
              index % 2 === 0 ? "md:col-start-1" : "md:col-start-2",
            )}
            onPointerEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <ExperienceCard
              experience={experience}
              active={index === activeIndex}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
