import { Navigation } from "@/components/molecules/Navigation";

interface HeaderProps {
    // Defaults to the home page section navigation
    children?: React.ReactNode;
    className?: string;
}

export function Header({ children = <Navigation />, className = "" }: HeaderProps) {
    return (
        <header
            className={`w-full py-6 px-6 md:px-12 lg:px-24 ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </header>
    );
}
