import { ContactItem } from "@/components/atoms/ContactItem";
import { DotPattern } from "@/components/atoms/DotPattern";
import { LinkButton } from "@/components/atoms/LinkButton";
import { SectionSubtitle } from "@/components/atoms/SectionSubtitle";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
  className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  const { titleAccent, titleMain, subtitle, links } = siteConfig.contact;
  const { cvButton } = siteConfig.about;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={cn(
        "relative isolate w-full overflow-hidden px-6 md:px-12 lg:px-24 py-24 md:py-48",
        className
      )}
    >
      {/* Decorative halftone background */}
      <DotPattern className="-z-10 text-[#E6E6E6]" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <SectionTitle
          id="contact-heading"
          accent={titleAccent}
          main={titleMain}
          align="left"
        />
        <SectionSubtitle className="mt-10">{subtitle}</SectionSubtitle>

        {/* Contact links + CV button */}
        <div className="mt-16 md:mt-20 flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <ul className="grid grid-cols-1 gap-y-12 sm:grid-cols-[repeat(2,minmax(0,312px))]">
            {links.map((link) => (
              <li key={link.label}>
                <ContactItem link={link} />
              </li>
            ))}
          </ul>

          <LinkButton href={cvButton.href} className="self-start md:self-auto">
            {cvButton.label}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
