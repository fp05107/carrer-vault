import { getResumes } from "@/actions/resume"
import { CreateResumeButton } from "@/components/create-resume-button"
import { AppFooter } from "@/components/app-footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Calendar, Edit, MoveLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ResumesPage() {
    const resumes = await getResumes() || []

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-10 px-4 md:px-6 flex-grow">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <MoveLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-primary">My Resumes</h1>
                            <p className="text-muted-foreground">Manage your LaTeX resumes</p>
                        </div>
                    </div>
                    <CreateResumeButton />
                </div>

                {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-xl border-dashed border-muted">
                        <FileText className="h-16 w-16 text-muted-foreground/20 mb-4" />
                        <h3 className="text-xl font-semibold">No resumes yet</h3>
                        <p className="text-muted-foreground max-w-sm mt-2 mb-6">
                            Create your first LaTeX resume to start applying with style.
                        </p>
                        <CreateResumeButton />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume: any) => (
                            <Card key={resume.id} className="glass-card hover:border-primary/50 transition-colors group">
                                <CardHeader>
                                    <CardTitle className="truncate">{resume.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-1 text-xs">
                                        <Calendar className="h-3 w-3" />
                                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-32 bg-muted/20 rounded-md p-4 overflow-hidden text-[10px] font-mono text-muted-foreground border">
                                        {resume.content.slice(0, 200)}...
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Link href={`/resumes/${resume.id}`} className="w-full">
                                        <Button variant="secondary" className="w-full gap-2">
                                            <Edit className="h-4 w-4" /> Edit
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <AppFooter />
        </div>
    )
}
