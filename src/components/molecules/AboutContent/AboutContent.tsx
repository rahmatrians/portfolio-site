import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Link } from "lucide-react";

interface AboutContentProps {
    className?: string;
}

export function AboutContent({ className = "" }: AboutContentProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            {/* Title - Right aligned */}
            <div className="text-right mb-8">
                <h2 className="text-4xl md:text-5xl font-bold font-poppins">
                    <span className="">{siteConfig.about.titleAccent}</span>
                    <br />
                    <span>{siteConfig.about.titleMain}</span>
                </h2>
            </div>

            {/* <div className="flex flex-wrap items-center gap-4 mt-4 bg-red-700"> */}
                <Button asChild size="lg" className="rounded-xl pr-14 py-auto">
                    <Link className="text-left" href={siteConfig.about.cvButton.href}>
                        {siteConfig.about.cvButton.label}
                    </Link>
                </Button>
            {/* </div> */}

            {/* Subtitle - Right aligned */}
            <p className="text-right text-xl md:text-2xl font-bold font-poppins text-gray-400 mb-12">
                {siteConfig.about.subtitle}
            </p>
                
            {/* Paragraphs - Justified */}
            <div className="space-y-6">
                {siteConfig.about.paragraphs.map((paragraph, index) => (
                    <p
                        key={index}
                        className="text-sm md:text-base font-medium font-poppins text-black text-justify leading-relaxed"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
}
