import { BodyText } from "@/components/atoms/BodyText";
import { LinkButton } from "@/components/atoms/LinkButton";
import { SectionSubtitle } from "@/components/atoms/SectionSubtitle";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { StackDots } from "@/components/atoms/StackDots";
import { Tag } from "@/components/atoms/Tag";
import { ProjectGallery } from "@/components/molecules/ProjectGallery";
import type { Project } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ProjectDetailProps {
  project: Project;
  className?: string;
}

export function ProjectDetail({ project, className }: ProjectDetailProps) {
  const { title, category, gallery, description, stack } = project;
  const { hire, stackLabel } = siteConfig.projectDetail;

  return (
    <article
      className={cn(
        "w-full px-6 md:px-12 lg:px-24 pt-28 md:pt-43 pb-24 font-poppins",
        className
      )}
    >
      {/* Same content container as every other section */}
      <div className="max-w-7xl mx-auto w-full">
        <ProjectGallery images={gallery} />

        {/* Title + stack dots */}
        <header className="mt-14">
          <div className="flex items-center justify-between gap-6">
            <SectionTitle as="h1" main={title} />
            <StackDots items={stack} />
          </div>

          {/* Category + CTA */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
            <SectionSubtitle>{category}</SectionSubtitle>
            <LinkButton href={hire.href}>{hire.label}</LinkButton>
          </div>
        </header>

        {/* Description */}
        <div className="mt-18 space-y-6">
          {description.map((paragraph, i) => (
            <BodyText key={i} className="md:text-[17px] md:leading-[1.36]">
              {paragraph}
            </BodyText>
          ))}
        </div>

        {/* Tech stack */}
        <section aria-labelledby="tech-stack-heading" className="mt-16">
          <h2 id="tech-stack-heading" className="text-[17px] font-normal text-[#808080]">
            {stackLabel}
          </h2>
          <ul className="mt-7.5 flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <li key={`${tech}-${i}`}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
