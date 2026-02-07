import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
    src: string;
    alt: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-40 h-40",
    xl: "w-64 h-64",
};

export function Avatar({
    src,
    alt,
    size = "lg",
    className = "",
}: AvatarProps) {
    return (
        <div
            className={cn(
                "relative rounded-full overflow-hidden bg-gray-100",
                sizeClasses[size],
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}
