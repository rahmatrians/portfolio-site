import { cn } from "@/lib/utils";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";

interface MainLayoutProps {
    children: React.ReactNode;
    // Replaces the default section navigation (e.g. a back bar on sub-pages)
    navigation?: React.ReactNode;
    // Extra classes for <main>; the footer stays full-bleed outside it
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
            <main className={cn("md:px-32", className)}>{children}</main>
            <Footer />
        </div>
    );
}
