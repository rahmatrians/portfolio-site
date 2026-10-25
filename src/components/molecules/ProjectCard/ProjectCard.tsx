import { ImageFrame } from "@/components/atoms/ImageFrame";
import { LinkButton } from "@/components/atoms/LinkButton";
import { StackDots } from "@/components/atoms/StackDots";
import { getProjectHref, type Project } from "@/config/projects";
import { cardSurfaceClass } from "@/lib/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  seeLabel?: string;
  className?: string;
}

export function ProjectCard({
  project,
  seeLabel = "See",
  className,
}: ProjectCardProps) {
  const { slug, title, category, gallery, stack } = project;

  return (
    <article
      className={cn(cardSurfaceClass, className)}
    >
      {/* Thumbnail (first gallery image, gray placeholder if none) */}
      <ImageFrame
        image={gallery[0]}
        sizes="(min-width: 1024px) 252px, (min-width: 640px) 45vw, 90vw"
        className="aspect-252/214 w-full rounded-[13px]"
      />

      {/* Title + category */}
      <h3 className="mt-7 text-[20px] font-semibold leading-[1.4] text-black">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-normal text-[#808080]">
        {category}
      </p>

      {/* Stack dots + See button */}
      <div className="mt-auto flex items-center justify-between pt-12">
        <StackDots items={stack} />
        <LinkButton href={getProjectHref(slug)} aria-label={`${seeLabel} ${title}`}>
          {seeLabel}
        </LinkButton>
      </div>
    </article>
  );
}
