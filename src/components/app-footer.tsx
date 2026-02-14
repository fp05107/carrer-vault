import Link from "next/link";

export function AppFooter() {
    return (
        <footer className="w-full border-t border-white/5 py-6 mt-12 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="text-primary font-bold tracking-wider">CAREER VAULT</span>
                    <span>&copy; {new Date().getFullYear()}</span>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="/resumes" className="hover:text-primary transition-colors font-medium">Resumes</Link>
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
