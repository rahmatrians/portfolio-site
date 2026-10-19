import { cn } from "@/lib/utils";
import { textAlignClass, type TextAlign } from "@/lib/text-align";

interface SectionTitleProps {
  // Optional first line (e.g. "Lil a bit", "Explore"); omit for a one-line title
  accent?: string;
  // Main line (e.g. "About me", "my Projects", a project title)
  main: string;
  // Heading level; use "h1" for a page's main title
  as?: "h1" | "h2";
  align?: TextAlign;
  id?: string;
  className?: string;
}

// Bold heading shared by page sections and the project detail title
export function SectionTitle({
  accent,
  main,
  as: Heading = "h2",
  align = "left",
  id,
  className,
}: SectionTitleProps) {
  return (
    <Heading
      id={id}
      className={cn(
        "text-4xl md:text-5xl font-bold font-poppins",
        textAlignClass[align],
        className
      )}
    >
      {accent && (
        <>
          {accent}
          <br />
        </>
      )}
      {main}
    </Heading>
  );
}
