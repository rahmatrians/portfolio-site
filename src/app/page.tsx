import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { AboutSection } from "@/components/organisms/AboutSection";

// ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default function HomePage() {
  return (
    <MainLayout className="md:px-32">
      <div id="home">
        <HeroSection />
      </div>
      <AboutSection />
    </MainLayout>
  );
}
