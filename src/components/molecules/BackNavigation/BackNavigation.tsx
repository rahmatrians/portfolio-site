import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { NavLine } from "@/components/atoms/NavLine";
import { NavLink } from "@/components/atoms/NavLink";
import { NavBar } from "@/components/molecules/NavBar";

interface BackNavigationProps {
  // Section to go back to (e.g. "Projects")
  label: string;
  href: string;
  className?: string;
}

// Sub-page nav: same link style and underline as the main navigation,
// with a single active "← Projects" link that leads back.
export function BackNavigation({ label, href, className }: BackNavigationProps) {
  return (
    <NavBar className={className}>
      <ul className="relative flex items-center justify-end pt-2 md:w-[350px]">
        <NavLine variant="track" />

        <li className="relative">
          <NavLink href={href} isActive aria-label={`Back to ${label}`}>
            <span className="flex items-center gap-14">
              <ArrowIcon direction="left" length={20} />
              {label}
            </span>
          </NavLink>
          <NavLine variant="active" className="left-0 right-0" />
        </li>
      </ul>
    </NavBar>
  );
}
