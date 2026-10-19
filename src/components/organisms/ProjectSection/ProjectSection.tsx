"use client";

import { useState } from "react";
import { SectionSubtitle } from "@/components/atoms/SectionSubtitle";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
  className?: string;
}

export function ProjectSection({ className }: ProjectSectionProps) {
  const { titleAccent, titleMain, subtitle, items, initialCount, seeLabel } =
    siteConfig.projects;

  // Show a subset first; the arrow button reveals the next batch
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visibleProjects = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const showMore = () => setVisibleCount((count) => count + initialCount);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={cn("w-full px-6 md:px-12 lg:px-24 py-24", className)}
    >
      {/* Heading */}
      <SectionTitle
        id="projects-heading"
        accent={titleAccent}
        main={titleMain}
        align="center"
      />
      <SectionSubtitle align="center" className="mt-6">
        {subtitle}
      </SectionSubtitle>

      {/* Cards grid */}
      <div className="mx-auto mt-20 md:mt-35 grid max-w-248 grid-cols-1 gap-x-8.5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={`${project.title}-${index}`}
            project={project}
            seeLabel={seeLabel}
          />
        ))}
      </div>

      {/* Load more arrow */}
      {hasMore && (
        <div className="mt-20 md:mt-34 flex justify-center">
          <ShowMoreButton onClick={showMore} />
        </div>
      )}
    </section>
  );
}

// Tall outlined pill with a thin down arrow
function ShowMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Show more projects"
      className="flex h-25 w-13.5 items-center justify-center rounded-2xl border border-black bg-white text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
    >
      <svg
        width="14"
        height="52"
        viewBox="0 0 14 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 1v50M1 45l6 6 6-6" />
      </svg>
    </button>
  );
}
