import type { ContactLink } from "@/config/site";
import { cn } from "@/lib/utils";

interface ContactItemProps {
  link: ContactLink;
  className?: string;
}

// Small gray label with a bold link underneath (e.g. "Email" / address)
export function ContactItem({ link, className }: ContactItemProps) {
  const { label, value, href } = link;
  const isExternal = href.startsWith("http");

  return (
    <div className={cn("font-poppins", className)}>
      <p className="text-[17px] text-gray-400">{label}</p>
      <a
        href={href}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        className="mt-3 inline-block text-[17px] font-semibold text-black underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
      >
        {value}
      </a>
    </div>
  );
}
