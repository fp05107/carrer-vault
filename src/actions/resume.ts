"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const resumeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
})

export async function getResumes() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await db.resume.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
    })
}

export async function getResume(id: string) {
    const session = await auth()
    if (!session?.user?.id) return null

    return await db.resume.findUnique({
        where: { id, userId: session.user.id },
    })
}

export async function createResume(title: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    // simple default LaTeX template
    const defaultContent = `\\documentclass{article}
\\usepackage{titlesec}
\\usepackage{titling}
\\usepackage[margin=1in]{geometry}

\\title{My Resume}
\\author{${session.user.name || "Your Name"}}

\\begin{document}

\\maketitle

\\section{Experience}
% Add your experience here

\\section{Education}
% Add your education here

\\end{document}
`

    const resume = await db.resume.create({
        data: {
            title,
            content: defaultContent,
            userId: session.user.id,
        },
    })

    revalidatePath("/resumes")
    return resume
}

export async function updateResume(id: string, values: z.infer<typeof resumeSchema>) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const result = resumeSchema.safeParse(values)
    if (!result.success) throw new Error("Invalid data")

    await db.resume.update({
        where: { id, userId: session.user.id },
        data: {
            title: result.data.title,
            content: result.data.content,
        },
    })

    revalidatePath("/resumes")
    revalidatePath(`/resumes/${id}`)
}

export async function deleteResume(id: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    await db.resume.delete({
        where: { id, userId: session.user.id },
    })

    revalidatePath("/resumes")
}
