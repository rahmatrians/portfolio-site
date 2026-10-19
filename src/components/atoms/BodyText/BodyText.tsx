import { cn } from "@/lib/utils";

interface BodyTextProps {
  children: React.ReactNode;
  justify?: boolean;
  className?: string;
}

// Paragraph style for long-form copy (About, project description)
export function BodyText({ children, justify = false, className }: BodyTextProps) {
  return (
    <p
      className={cn(
        "text-sm md:text-base font-medium font-poppins text-black leading-relaxed",
        justify && "text-justify",
        className
      )}
    >
      {children}
    </p>
  );
}
