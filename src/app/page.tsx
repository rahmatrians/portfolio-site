import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ClientSection } from "@/components/organisms/ClientSection";
import { AboutSection } from "@/components/organisms/AboutSection";
import { ProjectSection } from "@/components/organisms/ProjectSection";
import { ContactSection } from "@/components/organisms/ContactSection";

// ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default function HomePage() {
  return (
    <MainLayout className="md:px-32">
      <div id="home">
        <HeroSection />
      </div>
      <AboutSection />
      <ClientSection />
      <ProjectSection />
      <ContactSection />
    </MainLayout>
  );
}
