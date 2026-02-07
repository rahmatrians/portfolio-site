"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    isActive: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function NavLink({ href, children, className = "", isActive, onClick }: NavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "relative text-sm transition-colors",
                isActive
                    ? "text-black font-medium"
                    : "text-gray-400 hover:text-gray-600",
                className
            )}
        >
            <span className="relative inline-block pb-8">
                {children}
            </span>
        </Link>
    );
}
