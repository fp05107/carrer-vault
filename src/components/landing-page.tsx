"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react"
import { useState } from "react"
import { VaultIntro } from "@/components/vault-intro"

export function LandingPage() {
    const [showVault, setShowVault] = useState(true)

    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary/20 overflow-x-hidden">
            {/* Vault Intro Animation */}
            {showVault && <VaultIntro onComplete={() => setShowVault(false)} />}
            {/* Note: In a real app, you'd manage state to show/hide this based on initial load */}

            {/* Navigation */}
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/5 glass-card fixed w-full top-0 z-50 backdrop-blur-md">
                <Link className="flex items-center justify-center font-bold text-xl tracking-tighter" href="#">
                    <span className="text-primary mr-1 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">CAREER</span> VAULT
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:text-primary transition-colors flex items-center" href="/login">
                        Sign In
                    </Link>
                    <Link href="/login">
                        <Button size="sm" className="gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 border">
                            Get Started <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="w-full py-24 md:py-32 lg:py-48 xl:py-52 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
                    <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-20 animate-pulse" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

                    <div className="space-y-6 max-w-4xl relative z-10 animate-in slide-in-from-bottom-8 duration-1000 fade-in fill-mode-forwards">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            v2.0 Command Center Live
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 pb-2">
                            Secure Your Career
                            <span className="text-primary block mt-2 neon-text drop-shadow-[0_0_35px_rgba(34,197,94,0.4)]">In One Vault</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed leading-relaxed">
                            The advanced command center for your job search. Track applications, manage resumes, and analyze your progress with military-grade precision.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-in slide-in-from-bottom-8 duration-1000 fade-in delay-200 fill-mode-forwards relative z-10">
                        <Link href="/login">
                            <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all bg-primary text-black hover:bg-primary/90 font-bold tracking-wide">
                                Launch Console <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg glass-card border-white/10 hover:bg-white/5 hover:border-primary/50 transition-all text-white font-medium">
                                Explore Features
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-24 bg-black relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <div className="container px-4 md:px-6 mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                                Advanced Capabilities
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Everything you need to dominate your job search, engineered for speed and efficiency.
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <FeatureCard
                                icon={<Shield className="h-10 w-10 text-primary" />}
                                title="Application Tracking"
                                description="Log every application status. Never lose track of an opportunity again in the chaos of job hunting."
                            />
                            <FeatureCard
                                icon={<FileTextIcon className="h-10 w-10 text-primary" />}
                                title="Resume Operations"
                                description="Compose and manage LaTeX resumes directly in the browser. Export to production-ready PDF/TeX."
                            />
                            <FeatureCard
                                icon={<Zap className="h-10 w-10 text-primary" />}
                                title="Instant Analytics"
                                description="Real-time dashboard visuals of your success rates, interview pipelines, and active applications."
                            />
                        </div>
                    </div>
                </section>

                {/* Tech Stack / Trust Section */}
                <section className="w-full py-24 border-t border-white/5 bg-zinc-950/30">
                    <div className="container px-4 md:px-6 mx-auto text-center">
                        <p className="text-sm font-semibold tracking-widest text-primary/60 uppercase mb-8">Powered by Next-Gen Tech</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                            {["Next.js 14", "TypeScript", "Prisma", "Tailwind", "Cloudinary"].map((tech) => (
                                <div key={tech} className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors cursor-default">
                                    <CheckCircle className="h-5 w-5 text-primary" /> {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-8 w-full border-t border-white/10 px-4 md:px-6 bg-black">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 Career Vault. All rights reserved.</p>
                    <nav className="flex gap-6 mt-4 sm:mt-0">
                        <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
                        <Link className="hover:text-primary transition-colors" href="#">Privacy</Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="group relative p-8 rounded-2xl glass-card border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 ease-out text-primary">
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {description}
                </p>
            </div>
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
