import { cn } from "@/lib/utils";
import { textAlignClass, type TextAlign } from "@/lib/text-align";

interface SectionSubtitleProps {
  children: React.ReactNode;
  align?: TextAlign;
  className?: string;
}

// Muted gray subtitle shown under/next to a SectionTitle
export function SectionSubtitle({
  children,
  align = "left",
  className,
}: SectionSubtitleProps) {
  return (
    <p
      className={cn(
        "text-xl md:text-2xl font-bold font-poppins text-gray-400",
        textAlignClass[align],
        className
      )}
    >
      {children}
    </p>
  );
}
