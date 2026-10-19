import Image from "next/image";
import { LinkButton } from "@/components/atoms/LinkButton";
import { StackDots } from "@/components/atoms/StackDots";
import type { ProjectItem } from "@/config/site";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  seeLabel?: string;
  className?: string;
}

export function ProjectCard({
  project,
  seeLabel = "See",
  className,
}: ProjectCardProps) {
  const { title, category, href, image, stack } = project;

  return (
    <article
      className={cn(
        "flex flex-col rounded-[14px] border border-gray-100 bg-white p-7 font-poppins transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {/* Thumbnail (gray placeholder when no image is provided) */}
      <div className="relative aspect-252/214 w-full overflow-hidden rounded-[13px] bg-[#D9D9D9]">
        {image && (
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            sizes="(min-width: 1024px) 252px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        )}
      </div>

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
        <LinkButton href={href} aria-label={`${seeLabel} ${title}`}>
          {seeLabel}
        </LinkButton>
      </div>
    </article>
  );
}
