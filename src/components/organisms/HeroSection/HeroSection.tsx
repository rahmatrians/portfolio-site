import { HeroContent } from "@/components/molecules/HeroContent";
import { HeroAvatar } from "@/components/molecules/HeroAvatar";

interface HeroSectionProps {
    className?: string;
}

export function HeroSection({ className = "" }: HeroSectionProps) {
    return (
        <section
            className={`w-full min-h-[calc(100vh-120px)] flex items-center px-6 md:px-12 lg:px-24 py-12 ${className}`}
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
                    {/* Left side - Content */}
                    <div className="flex-1 max-w-xl">
                        <HeroContent />
                    </div>

                    {/* Right side - Avatar */}
                    <div className="flex-shrink-0">
                        <HeroAvatar />
                    </div>
                </div>
            </div>
        </section>
    );
}
