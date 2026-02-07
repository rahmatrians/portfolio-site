import { Header } from "@/components/organisms/Header";

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function MainLayout({ children, className = "" }: MainLayoutProps) {
    return (
        <div className={`min-h-screen bg-white ${className}`}>
            <Header />
            <main>{children}</main>
        </div>
    );
}
