import { LinkButton } from "@/components/atoms/LinkButton";
import { siteConfig } from "@/config/site";

interface HeroContentProps {
    className?: string;
}

export function HeroContent({ className = "" }: HeroContentProps) {
    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            {/* Greeting and Name */}
            <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                    {siteConfig.greeting}
                    <br />
                    {siteConfig.name}
                </h1>
                <p className="text-lg md:text-2xl font-bold my-6 text-gray-400">
                    a {siteConfig.role}
                </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
                <LinkButton href={siteConfig.cta.primary.href}>
                    {siteConfig.cta.primary.label}
                </LinkButton>
                <LinkButton href={siteConfig.cta.secondary.href} variant="outline">
                    {siteConfig.cta.secondary.label}
                </LinkButton>
            </div>
        </div>
    );
}
