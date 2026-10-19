import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";

interface MainLayoutProps {
    children: React.ReactNode;
    // Applied to <main> so the footer can stay full-bleed
    className?: string;
}

export function MainLayout({ children, className = "" }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className={className}>{children}</main>
            <Footer />
        </div>
    );
}
