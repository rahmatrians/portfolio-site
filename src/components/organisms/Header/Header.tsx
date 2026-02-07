import { Navigation } from "@/components/molecules/Navigation";

interface HeaderProps {
    className?: string;
}

export function Header({ className = "" }: HeaderProps) {
    return (
        <header
            className={`w-full py-6 px-6 md:px-12 lg:px-24 ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                <Navigation />
            </div>
        </header>
    );
}
