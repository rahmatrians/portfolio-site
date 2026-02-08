import { siteConfig } from "@/config/site";

interface AboutContentProps {
    className?: string;
}

export function AboutContent({ className = "" }: AboutContentProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            {/* Title - Right aligned */}
            <div className="text-right mb-8">
                <h2 className="text-4xl md:text-5xl font-bold font-poppins">
                    <span className="italic">{siteConfig.about.titleAccent}</span>
                    <br />
                    <span>{siteConfig.about.titleMain}</span>
                </h2>
            </div>

            {/* Subtitle - Right aligned */}
            <p className="text-right text-xl md:text-2xl font-bold font-poppins text-gray-400 italic mb-12">
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
