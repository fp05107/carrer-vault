import { getResume } from "@/actions/resume"
import { ResumeEditor } from "@/components/resume-editor"
import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

interface EditorPageProps {
    params: Promise<{ id: string }>
}

export default async function EditorPage({ params }: EditorPageProps) {
    const session = await auth()
    if (!session) redirect("/login")

    const { id } = await params
    const resume = await getResume(id)

    if (!resume) {
        notFound()
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <div className="container mx-auto p-4 flex-grow">
                <ResumeEditor
                    id={resume.id}
                    initialTitle={resume.title}
                    initialContent={resume.content}
                />
            </div>
        </div>
    )
}
