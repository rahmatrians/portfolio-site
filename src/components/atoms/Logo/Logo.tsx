import Link from "next/link";

interface LogoProps {
    href?: string;
    className?: string;
}

export function Logo({ href = "/", className = "" }: LogoProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center w-10 h-10 bg-black rounded-xl text-white font-bold text-sm hover:bg-gray-800 transition-colors ${className}`}
            aria-label="Home"
        >
            Rr<div className="text-[#FF7B53]">.</div>
        </Link>
    );
}
