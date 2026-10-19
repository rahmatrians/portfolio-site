import { LinkButton } from "@/components/atoms/LinkButton";
import { SectionSubtitle } from "@/components/atoms/SectionSubtitle";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { siteConfig } from "@/config/site";

interface AboutContentProps {
  className?: string;
}

export function AboutContent({ className = "" }: AboutContentProps) {
  const { titleAccent, titleMain, subtitle, cvButton, paragraphs } =
    siteConfig.about;

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Title - Right aligned */}
      <SectionTitle
        accent={titleAccent}
        main={titleMain}
        align="right"
        className="mb-8"
      />

      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 mb-12">
        <LinkButton href={cvButton.href}>{cvButton.label}</LinkButton>

        {/* Subtitle - Right aligned */}
        <SectionSubtitle align="right">{subtitle}</SectionSubtitle>
      </div>

      {/* Paragraphs - Justified */}
      <div className="space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-sm md:text-base font-medium font-poppins text-black text-justify leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
