import { ImageFrame } from "@/components/atoms/ImageFrame";
import type { Experience } from "@/config/site";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  // Highlighted state: placeholder logo turns black (matches ABOUT.png)
  active?: boolean;
  className?: string;
}

export function ExperienceCard({
  experience,
  active = false,
  className,
}: ExperienceCardProps) {
  const { jobTitle, company, location, period, logo } = experience;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[14px] border border-gray-100 bg-white p-7 font-poppins",
        className
      )}
    >
      {/* Logo + title/company */}
      <div className="flex items-center gap-5">
        <ImageFrame
          image={logo}
          sizes="72px"
          className={cn(
            "size-18 shrink-0 rounded-xl transition-colors duration-300",
            active && "bg-black"
          )}
        />
        <div className="min-w-0">
          <h3 className="text-[18px] font-semibold leading-[1.4] text-black md:text-[20px]">
            {jobTitle}
          </h3>
          <p className="mt-1.5 text-[15px] leading-normal text-[#808080]">
            {company}
          </p>
        </div>
      </div>

      {/* Location + period */}
      <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-[15px] leading-normal text-[#C8C8C8]">
        <span>{location}</span>
        <span className="shrink-0">{period}</span>
      </div>
    </article>
  );
}
