import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";

interface NavBarProps {
  // Right-hand side of the bar (nav list)
  children: React.ReactNode;
  className?: string;
}

// Fixed, blurred top bar with the logo on the left
export function NavBar({ children, className }: NavBarProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-start justify-between w-full px-56 pt-6 bg-white/60 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] transform-gpu",
        className
      )}
    >
      <Logo />
      {children}
    </nav>
  );
}
