import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/components/organisms/HeroSection";

// ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
    </MainLayout>
  );
}
