import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackNavigation } from "@/components/molecules/BackNavigation";
import { ContactSection } from "@/components/organisms/ContactSection";
import { ProjectDetail } from "@/components/organisms/ProjectDetail";
import { MainLayout } from "@/components/templates/MainLayout";
import { getProjectBySlug, projects } from "@/config/projects";
import { siteConfig } from "@/config/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render every project at build time
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description[0],
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const { back } = siteConfig.projectDetail;

  return (
    <MainLayout navigation={<BackNavigation label={back.label} href={back.href} />}>
      <ProjectDetail project={project} />
      <ContactSection />
    </MainLayout>
  );
}
