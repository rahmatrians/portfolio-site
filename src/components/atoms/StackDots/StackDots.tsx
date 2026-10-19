import { cn } from "@/lib/utils";

interface StackDotsProps {
  // Tech names; only the first `DOT_COLORS.length` are shown
  items: string[];
  className?: string;
}

// Gray shades of the overlapping dots (light -> dark)
const DOT_COLORS = ["bg-[#E6E6E6]", "bg-[#CFCFCF]", "bg-[#B3B3B3]"];

// Row of overlapping circles representing a project's tech stack
export function StackDots({ items, className }: StackDotsProps) {
  return (
    <ul className={cn("flex items-center", className)} aria-label="Tech stack">
      {items.slice(0, DOT_COLORS.length).map((tech, index) => (
        <li
          key={`${tech}-${index}`}
          title={tech}
          className={cn(
            "size-7.5 rounded-full",
            DOT_COLORS[index],
            index > 0 && "-ml-2.5"
          )}
        >
          <span className="sr-only">{tech}</span>
        </li>
      ))}
    </ul>
  );
}
