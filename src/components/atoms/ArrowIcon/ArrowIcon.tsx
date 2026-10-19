import { cn } from "@/lib/utils";

export type ArrowDirection = "left" | "right" | "down";

interface ArrowIconProps {
  direction: ArrowDirection;
  // Length of the arrow shaft in px
  length?: number;
  className?: string;
}

const rotateClass: Record<ArrowDirection, string> = {
  right: "",
  left: "rotate-180",
  down: "rotate-90",
};

// Thin line arrow that follows `currentColor`
export function ArrowIcon({ direction, length = 32, className }: ArrowIconProps) {
  return (
    <svg
      width={length}
      height="14"
      viewBox={`0 0 ${length} 14`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", rotateClass[direction], className)}
    >
      <path d={`M1 7h${length - 2}M${length - 7} 1l6 6-6 6`} />
    </svg>
  );
}
