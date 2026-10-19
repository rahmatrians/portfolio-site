import Image from "next/image";
import type { ProjectImage } from "@/config/projects";
import { cn } from "@/lib/utils";

interface ImageFrameProps {
  image?: ProjectImage;
  // next/image `sizes` hint for responsive loading
  sizes: string;
  priority?: boolean;
  className?: string;
}

// Rounded box that shows an image, or a gray placeholder when there's no src.
// Size it via className (aspect-* or explicit height).
export function ImageFrame({ image, sizes, priority, className }: ImageFrameProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#D9D9D9]", className)}>
      {image?.src && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
