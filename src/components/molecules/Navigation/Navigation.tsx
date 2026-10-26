"use client";

import { NavLine } from "@/components/atoms/NavLine";
import { NavBar } from "@/components/molecules/NavBar";
import { siteConfig } from "@/config/site";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

interface NavigationProps {
  className?: string;
}

const SECTIONS = siteConfig.navigation.map((item) => item.href);
// Distance below the viewport top that counts as "inside" a section
const SPY_OFFSET = 100;
// Underline glide: long, soft deceleration
const UNDERLINE_TRANSITION =
  "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), width 600ms cubic-bezier(0.22, 1, 0.36, 1)";
// The first menu's underline is 4x its label; menus further right are wider
// by these amounts (relative to that base width). Moving left reverses it.
const BASE_WIDTH_MULTIPLIER = 4;
const WIDTH_GROWTH = [0, 0.35, 0.6, 0.9];

export function Navigation({ className = "" }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("#home");
  const [underline, setUnderline] = useState({ x: 0, width: 0 });
  const [animate, setAnimate] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const linksRef = useRef<Map<string, HTMLAnchorElement>>(new Map());
  // True while a nav-click scroll runs, so the scroll spy can't drag the
  // underline through every section in between
  const isAutoScrolling = useRef(false);

  const setLinkRef = (href: string) => (el: HTMLAnchorElement | null) => {
    if (el) linksRef.current.set(href, el);
  };

  // Underline is right-aligned to the active label; its width follows
  // WIDTH_GROWTH by menu position (last value reused for any extra menus)
  const measure = useCallback((section: string) => {
    const label = linksRef.current.get(section)?.querySelector("span");
    const firstLabel = linksRef.current.get(SECTIONS[0])?.querySelector("span");
    const nav = navRef.current;
    if (!label || !firstLabel || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const labelRect = label.getBoundingClientRect();
    const baseWidth = firstLabel.getBoundingClientRect().width * BASE_WIDTH_MULTIPLIER;
    const index = Math.max(SECTIONS.indexOf(section), 0);
    const growth = WIDTH_GROWTH[Math.min(index, WIDTH_GROWTH.length - 1)];
    const width = baseWidth * (1 + growth);
    setUnderline({ x: labelRect.right - navRect.left - width, width });
  }, []);

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    isAutoScrolling.current = true;
    setActiveSection(href);
    smoothScrollTo(href, {
      onComplete: () => {
        isAutoScrolling.current = false;
      },
    });
  };

  // Move the underline whenever the active section changes
  useLayoutEffect(() => {
    measure(activeSection);
  }, [activeSection, measure]);

  // Initial section from the URL; enable the transition only after the first
  // placement so the underline doesn't slide in from 0 on load
  useEffect(() => {
    const hash = window.location.hash;
    if (SECTIONS.includes(hash)) setActiveSection(hash);
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Keep the underline aligned on resize / font load
  useEffect(() => {
    const handleResize = () => measure(activeSection);
    window.addEventListener("resize", handleResize);
    document.fonts?.ready.then(handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection, measure]);

  // Scroll spy (paused during nav-click scrolls)
  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      if (isAutoScrolling.current) return;

      const scrollPos = window.scrollY + SPY_OFFSET;
      for (const id of SECTIONS) {
        const el = document.querySelector<HTMLElement>(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    // At most one check per frame
    const handleScroll = () => {
      frame ??= requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <NavBar className={className}>
      <ul ref={navRef} className="flex items-center gap-14 pt-2 relative">
        {siteConfig.navigation.map((item) => (
          <li key={item.href}>
            <a
              ref={setLinkRef(item.href)}
              href={item.href}
              onClick={handleClick(item.href)}
              className={`relative text-sm transition-colors duration-300 ${
                activeSection === item.href
                  ? "text-black font-medium"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="relative inline-block pb-8">{item.label}</span>
            </a>
          </li>
        ))}

        {/* Background track line */}
        <NavLine variant="track" />

        {/* Sliding underline (GPU transform instead of animating `left`) */}
        <NavLine
          variant="active"
          className="left-0 will-change-transform motion-reduce:transition-none!"
          style={{
            width: underline.width,
            transform: `translateX(${underline.x}px)`,
            transition: animate ? UNDERLINE_TRANSITION : "none",
          }}
        />
      </ul>
    </NavBar>
  );
}
