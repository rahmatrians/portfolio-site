"use client";

import { Logo } from "@/components/atoms/Logo";
import { NavLink } from "@/components/atoms/NavLink";
import { siteConfig } from "@/config/site";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface NavigationProps {
    className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
    const [activeSection, setActiveSection] = useState("#home");
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const navRef = useRef<HTMLUListElement>(null);
    const linksRef = useRef<Map<string, HTMLAnchorElement>>(new Map());

    // Register link refs
    const setLinkRef = (href: string) => (el: HTMLAnchorElement | null) => {
        if (el) {
            linksRef.current.set(href, el);
        }
    };

    // Update underline position - accepts optional section to avoid stale closure
    const updateUnderline = (section?: string) => {
        const targetSection = section || activeSection;
        const activeLink = linksRef.current.get(targetSection);
        if (activeLink && navRef.current) {
            const navRect = navRef.current.getBoundingClientRect();
            const span = activeLink.querySelector('span');
            const spanRect = span ? span.getBoundingClientRect() : activeLink.getBoundingClientRect();

            // Add extra width and right-align the underline
            const extraWidth = spanRect.width * 3;
            setUnderlineStyle({
                left: spanRect.left - navRect.left - extraWidth,
                width: spanRect.width + extraWidth,
            });
        }
    };

    // Handle click on nav link
    const handleClick = (href: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveSection(href);

        // Update URL hash
        window.history.pushState(null, "", href);

        // Try to scroll to section if it exists
        const section = document.querySelector(href);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Update underline when active section changes
    useLayoutEffect(() => {
        if (mounted) {
            updateUnderline();
        }
    }, [activeSection, mounted]);

    // Initial mount - read hash and setup
    useEffect(() => {
        // Read hash from URL
        const hash = window.location.hash;
        const initialSection = (hash && ["#home", "#about", "#projects", "#contact"].includes(hash))
            ? hash
            : "#home";

        setActiveSection(initialSection);
        setMounted(true);

        // Delay to ensure refs are set, then update with the correct section
        const timer = setTimeout(() => {
            updateUnderline(initialSection);
        }, 100);

        window.addEventListener("resize", () => updateUnderline());
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", () => updateUnderline());
        };
    }, []);

    // Scroll detection for active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["#home", "#about", "#projects", "#contact"];
            const scrollPos = window.scrollY + 100;

            for (const sectionId of sections) {
                const el = document.querySelector(sectionId) as HTMLElement;
                if (el) {
                    if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-start justify-between w-full px-56 pt-6 backdrop-blur-md bg-white/70 border-b border-white/20 ${className}`}>
            <Logo />

            <ul ref={navRef} className="flex items-center gap-14 pt-2 relative">
                {siteConfig.navigation.map((item) => (
                    <li key={item.href}>
                        <a
                            ref={setLinkRef(item.href)}
                            href={item.href}
                            onClick={handleClick(item.href)}
                            className={`relative text-sm transition-colors ${activeSection === item.href
                                ? "text-black font-medium"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <span className="relative inline-block pb-8">
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))}

                {/* Background track line */}
                <span
                    className="absolute bottom-1 left-0 right-0 h-[2px] bg-gray-100 rounded-full"
                />

                {/* Sliding underline */}
                <span
                    className="absolute bottom-1 h-[2px] bg-black rounded-full"
                    style={{
                        left: underlineStyle.left,
                        width: underlineStyle.width,
                        transition: mounted ? "left 0.3s ease-out, width 0.3s ease-out" : "none",
                    }}
                />
            </ul>
        </nav>
    );
}
