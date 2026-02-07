import { Avatar } from "@/components/atoms/Avatar";
import { siteConfig } from "@/config/site";

interface HeroAvatarProps {
    className?: string;
}

export function HeroAvatar({ className = "" }: HeroAvatarProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Halftone dot pattern background */}
            <div className="absolute -top-20 -left-20 w-[400px] h-[300px] opacity-30 pointer-events-none">
                <HalftonePattern />
            </div>

            {/* Avatar */}
            <div className="relative z-10">
                <Avatar
                    src={siteConfig.avatar.src}
                    alt={siteConfig.avatar.alt}
                    size="xl"
                    className="w-52 h-52 md:w-64 md:h-64 shadow-lg"
                />
            </div>
        </div>
    );
}

// SVG Halftone dot pattern component
function HalftonePattern() {
    const dots = [];
    const rows = 15;
    const cols = 20;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Calculate dot size based on position (smaller towards edges)
            const distFromCenter = Math.sqrt(
                Math.pow((col - cols / 2) / (cols / 2), 2) +
                Math.pow((row - rows / 2) / (rows / 2), 2)
            );
            const size = Math.max(1, 4 * (1 - distFromCenter * 0.7));

            dots.push(
                <circle
                    key={`${row}-${col}`}
                    cx={col * 20 + 10}
                    cy={row * 20 + 10}
                    r={size}
                    fill="currentColor"
                />
            );
        }
    }

    return (
        <svg
            viewBox="0 0 400 300"
            className="w-full h-full text-gray-400"
            aria-hidden="true"
        >
            {dots}
        </svg>
    );
}
