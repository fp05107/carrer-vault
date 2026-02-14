import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react"

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary/20">
            {/* Navigation */}
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/10 glass-card fixed w-full top-0 z-50 backdrop-blur-md">
                <Link className="flex items-center justify-center font-bold text-xl tracking-tighter" href="#">
                    <span className="text-primary mr-1">CAREER</span> VAULT
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:text-primary transition-colors flex items-center" href="/login">
                        Sign In
                    </Link>
                    <Link href="/login">
                        <Button size="sm" className="gap-2">
                            Get Started <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="w-full py-24 md:py-32 lg:py-48 xl:py-52 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                    <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-20 animate-pulse" />

                    <div className="space-y-6 max-w-3xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Secure Your Career
                            <span className="text-primary block mt-2 neon-text">In One Vault</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            The advanced command center for your job search. Track applications, manage resumes, and analyze your progress with military-grade precision.
                        </p>
                    </div>
                    <div className="space-x-4 mt-8 animate-in slide-in-from-bottom-8 duration-1000 fade-in delay-200">
                        <Link href="/login">
                            <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow">
                                Launch Console <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-lg glass-card border-white/10 hover:bg-white/5">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-20 md:py-32 bg-zinc-950/50 border-t border-white/5">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="glass-card p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group">
                                <Shield className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold mb-2">Application Tracking</h3>
                                <p className="text-gray-400">
                                    Log every application status. Never lose track of an opportunity again in the chaos of job hunting.
                                </p>
                            </div>
                            <div className="glass-card p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group">
                                <FileTextIcon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold mb-2">Resume Operations</h3>
                                <p className="text-gray-400">
                                    Compose and manage LaTeX resumes directly in the browser. Export to production-ready PDF/TeX.
                                </p>
                            </div>
                            <div className="glass-card p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group">
                                <Zap className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold mb-2">Instant Analytics</h3>
                                <p className="text-gray-400">
                                    Real-time dashboard visuals of your success rates, interview pipelines, and active applications.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack / Trust Section */}
                <section className="w-full py-20 border-t border-white/5">
                    <div className="container px-4 md:px-6 mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-10 tracking-tight text-muted-foreground">POWERED BY NEXT-GEN TECH</h2>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 font-semibold"><CheckCircle className="h-5 w-5 text-primary" /> Next.js 14</div>
                            <div className="flex items-center gap-2 font-semibold"><CheckCircle className="h-5 w-5 text-primary" /> TypeScript</div>
                            <div className="flex items-center gap-2 font-semibold"><CheckCircle className="h-5 w-5 text-primary" /> Prisma</div>
                            <div className="flex items-center gap-2 font-semibold"><CheckCircle className="h-5 w-5 text-primary" /> Tailwind</div>
                            <div className="flex items-center gap-2 font-semibold"><CheckCircle className="h-5 w-5 text-primary" /> Cloudinary</div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-6 w-full border-t border-white/10 px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
                <p>© 2026 Career Vault. All rights reserved.</p>
                <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
                    <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
                    <Link className="hover:text-primary transition-colors" href="#">Privacy</Link>
                </nav>
            </footer>
        </div>
    )
}

function FileTextIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="m9 15 3 3 3-3" />
        </svg>
    )
}
