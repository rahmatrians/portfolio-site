import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";

interface MainLayoutProps {
    children: React.ReactNode;
    // Replaces the default section navigation (e.g. a back bar on sub-pages)
    navigation?: React.ReactNode;
    // Applied to <main> so the footer can stay full-bleed
    className?: string;
}

export function MainLayout({
    children,
    navigation,
    className = "",
}: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Header>{navigation}</Header>
            <main className={className}>{children}</main>
            <Footer />
        </div>
    );
}
