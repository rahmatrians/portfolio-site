import { ScrollLink } from "@/components/atoms/ScrollLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  // "solid" = black (e.g. "Get in touch"), "outline" = bordered (e.g. "Explore more")
  variant?: "solid" | "outline";
  "aria-label"?: string;
  className?: string;
}

// Rounded CTA link with left-aligned label, shared across sections
export function LinkButton({
  href,
  children,
  variant = "solid",
  "aria-label": ariaLabel,
  className,
}: LinkButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      variant={variant === "outline" ? "outline" : "default"}
      className={cn(
        "rounded-xl pr-14 py-auto",
        variant === "outline" && "border-black",
        className
      )}
    >
      <ScrollLink href={href} aria-label={ariaLabel} className="text-left">
        {children}
      </ScrollLink>
    </Button>
  );
}
