import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AboutContent } from "@/components/molecules/AboutContent";
import { siteConfig } from "@/config/site";

interface AboutSectionProps {
    className?: string;
}

export function AboutSection({ className = "" }: AboutSectionProps) {
    return (
        <section
            id="about"
            className={`w-full px-6 md:px-12 lg:px-24 py-24 ${className}`}
        >
            <div className="max-w-7xl mx-auto w-full">
                {/* Download CV Button - Left aligned */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                    <Button asChild size="lg" className="rounded-xl pr-14 py-auto">
                        <Link className="text-left" href={siteConfig.about.cvButton.href}>
                            {siteConfig.about.cvButton.label}
                        </Link>
                    </Button>
                </div>
                {/* About Content */}
                <AboutContent />
            </div>
        </section>
    );
}
