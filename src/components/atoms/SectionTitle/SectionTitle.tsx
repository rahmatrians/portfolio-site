import { cn } from "@/lib/utils";
import { textAlignClass, type TextAlign } from "@/lib/text-align";

interface SectionTitleProps {
  // First line (e.g. "Lil a bit", "Explore")
  accent: string;
  // Second line (e.g. "About me", "my Projects")
  main: string;
  align?: TextAlign;
  id?: string;
  className?: string;
}

// Two-line bold section heading shared by all page sections
export function SectionTitle({
  accent,
  main,
  align = "left",
  id,
  className,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-4xl md:text-5xl font-bold font-poppins",
        textAlignClass[align],
        className
      )}
    >
      {accent}
      <br />
      {main}
    </h2>
  );
}
