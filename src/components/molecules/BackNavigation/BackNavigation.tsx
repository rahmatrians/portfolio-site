import { ArrowButton } from "@/components/atoms/ArrowButton";
import { NavLine } from "@/components/atoms/NavLine";
import { NavBar } from "@/components/molecules/NavBar";

interface BackNavigationProps {
  // Current section name shown next to the back button (e.g. "Projects")
  label: string;
  href: string;
  className?: string;
}

// Nav bar for sub-pages: back button + current section, underlined as active
export function BackNavigation({ label, href, className }: BackNavigationProps) {
  return (
    <NavBar className={className}>
      <ul className="relative flex justify-end md:w-[635px]">
        <NavLine variant="track" />

        <li className="relative flex items-center gap-16 pb-5">
          <ArrowButton
            href={href}
            direction="left"
            size="compact"
            aria-label={`Back to ${label}`}
          />
          <span aria-current="page" className="text-sm font-medium text-black">
            {label}
          </span>
          <NavLine variant="active" className="left-0 right-0" />
        </li>
      </ul>
    </NavBar>
  );
}
