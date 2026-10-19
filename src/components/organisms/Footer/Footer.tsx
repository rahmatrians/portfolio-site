import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

// Full-width tri-tone bar (light gray / mid gray / black)
export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("w-full", className)}>
      <p className="sr-only">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
      <div aria-hidden="true" className="flex h-[12px] w-full">
        <span className="w-[16.25%] bg-[#C8C8C8]" />
        <span className="w-[22px] bg-[#999999]" />
        <span className="flex-1 bg-black" />
      </div>
    </footer>
  );
}
