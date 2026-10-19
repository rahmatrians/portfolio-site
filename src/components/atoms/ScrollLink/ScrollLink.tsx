"use client";

import Link from "next/link";
import { smoothScrollTo } from "@/lib/smooth-scroll";

type ScrollLinkProps = React.ComponentProps<typeof Link> & { href: string };

// next/link that smoothly scrolls for in-page "#section" hrefs
export function ScrollLink({ href, onClick, ...props }: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !href.startsWith("#")) return;

    // Only intercept when the target exists; otherwise keep default behavior
    if (smoothScrollTo(href)) e.preventDefault();
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
