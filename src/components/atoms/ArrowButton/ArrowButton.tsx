import { ArrowIcon, type ArrowDirection } from "@/components/atoms/ArrowIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArrowButtonProps {
  direction: ArrowDirection;
  onClick: () => void;
  "aria-label": string;
  className?: string;
}

// Same look and size as the outline CTA ("Explore more"), holding an arrow.
// Vertical arrows swap the padding so the button keeps the same thickness.
export function ArrowButton({
  direction,
  onClick,
  "aria-label": ariaLabel,
  className,
}: ArrowButtonProps) {
  const isVertical = direction === "down";

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "rounded-xl border-black px-6 has-[>svg]:px-6",
        isVertical && "h-auto w-10 px-0 py-6 has-[>svg]:px-0",
        className
      )}
    >
      {/* size-auto opts out of Button's forced 16px svg size */}
      <ArrowIcon direction={direction} className="size-auto" />
    </Button>
  );
}
