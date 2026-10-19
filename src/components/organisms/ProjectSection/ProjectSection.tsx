"use client";

import { useState } from "react";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { SectionSubtitle } from "@/components/atoms/SectionSubtitle";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
  className?: string;
}

export function ProjectSection({ className }: ProjectSectionProps) {
  const { titleAccent, titleMain, subtitle, initialCount, seeLabel } =
    siteConfig.projects;

  // Show a subset first; the arrow button reveals the next batch
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

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
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            seeLabel={seeLabel}
          />
        ))}
      </div>

      {/* Load more arrow */}
      {hasMore && (
        <div className="mt-20 md:mt-34 flex justify-center">
          <ArrowButton
            direction="down"
            onClick={showMore}
            aria-label="Show more projects"
          />
        </div>
      )}
    </section>
  );
}

