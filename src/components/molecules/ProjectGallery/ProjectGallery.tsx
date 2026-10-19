"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import type { ProjectImage } from "@/config/projects";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: ProjectImage[];
  className?: string;
}

// Main image with previous/next side panels that cycle through the gallery
export function ProjectGallery({ images, className }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  if (count === 0) return null;

  const at = (offset: number) => images[(index + offset + count) % count];
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const canCycle = count > 1;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      className={cn(
        "grid grid-cols-2 gap-5 md:h-[358px] md:grid-cols-[185fr_573fr_185fr]",
        className
      )}
    >
      <SidePanel image={canCycle ? at(-1) : undefined}>
        {canCycle && (
          <ArrowButton direction="left" onClick={() => go(-1)} aria-label="Previous image" />
        )}
      </SidePanel>

      {/* key re-mounts the frame so each slide fades in */}
      <ImageFrame
        key={index}
        image={at(0)}
        sizes="(min-width: 768px) 573px, 100vw"
        priority={index === 0}
        className="order-first col-span-2 aspect-573/358 rounded-2xl animate-in fade-in duration-500 md:order-none md:col-span-1 md:aspect-auto md:h-full"
      />

      <SidePanel image={canCycle ? at(1) : undefined}>
        {canCycle && (
          <ArrowButton direction="right" onClick={() => go(1)} aria-label="Next image" />
        )}
      </SidePanel>

      <p className="sr-only" aria-live="polite">
        Image {index + 1} of {count}: {at(0).alt}
      </p>
    </div>
  );
}

// Light panel hinting at the neighbouring image, holding a nav button
function SidePanel({
  image,
  children,
}: {
  image?: ProjectImage;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-[#F2F2F2] md:h-auto">
      {image?.src && (
        <Image
          src={image.src}
          alt=""
          fill
          sizes="185px"
          className="object-cover opacity-30"
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
