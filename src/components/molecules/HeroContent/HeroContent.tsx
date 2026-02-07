import Link from "next/link";
import { Button } from "@/components/ui/button";
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
                <Button asChild size="lg" className="rounded-xl pr-14 py-auto">
                    <Link className="text-left" href={siteConfig.cta.primary.href}>
                        {siteConfig.cta.primary.label}
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl pr-14 py-auto border-black">
                    <Link href={siteConfig.cta.secondary.href}>
                        {siteConfig.cta.secondary.label}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
