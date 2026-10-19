import { ScrollLink } from "@/components/atoms/ScrollLink";
import { cn } from "@/lib/utils";

type Direction = "left" | "right" | "down";
type Size = "compact" | "long";

interface ArrowButtonBaseProps {
  direction: Direction;
  // compact = square with a short arrow; long = pill with a long thin arrow
  size?: Size;
  "aria-label": string;
  className?: string;
}

type ArrowButtonProps = ArrowButtonBaseProps &
  ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

const ARROW_LENGTH: Record<Size, number> = { compact: 20, long: 46 };

const boxClass = (direction: Direction, size: Size) => {
  if (size === "compact") return "size-13.5";
  return direction === "down" ? "h-25 w-13.5" : "h-13.5 w-25";
};

const rotateClass: Record<Direction, string> = {
  right: "",
  left: "rotate-180",
  down: "rotate-90",
};

// Outlined rounded button with a thin arrow; renders a link when `href` is set
export function ArrowButton({
  direction,
  size = "long",
  className,
  ...props
}: ArrowButtonProps) {
  const length = direction === "down" && size === "long" ? 52 : ARROW_LENGTH[size];
  const classes = cn(
    "flex shrink-0 items-center justify-center rounded-2xl border border-black text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
    boxClass(direction, size),
    className
  );

  const icon = (
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
      className={rotateClass[direction]}
    >
      <path d={`M1 7h${length - 2}M${length - 7} 1l6 6-6 6`} />
    </svg>
  );

  if (props.href !== undefined) {
    return (
      <ScrollLink href={props.href} aria-label={props["aria-label"]} className={classes}>
        {icon}
      </ScrollLink>
    );
  }

  return (
    <button
      type="button"
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      className={classes}
    >
      {icon}
    </button>
  );
}
