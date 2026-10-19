import { cn } from "@/lib/utils";

interface NavLineProps {
  // track = full-width light line; active = black indicator on top of it
  variant: "track" | "active";
  className?: string;
  style?: React.CSSProperties;
}

// 2px line along the bottom of the nav list (parent must be `relative`)
export function NavLine({ variant, className, style }: NavLineProps) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        "absolute bottom-0 h-[2px] rounded-full",
        variant === "track" ? "left-0 right-0 bg-gray-100" : "bg-black",
        className
      )}
    />
  );
}
