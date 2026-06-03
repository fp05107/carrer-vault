"use server"

/**
 * Resume Server Actions — Career Vault
 *
 * Security model
 * ─────────────
 * 1. AUTHENTICATION  — Every action calls `requireAuthUserId()` which
 *                      reads the JWT-based NextAuth session.
 *
 * 2. ACCESS CONTROL  — `requireResumeOwnership()` ensures that users can
 *                      only read, update, or delete resumes they created.
 *                      Ownership is enforced at the DB query level as a
 *                      second layer (WHERE userId = …).
 *
 * 3. INPUT VALIDATION — All incoming data is validated with Zod before
 *                       touching the database.
 */

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { requireAuthUserId, requireResumeOwnership } from "@/lib/access-control"

const resumeSchema = z.object({
    title: z.string().min(1, "Title is required").max(200),
    content: z.string().min(1, "Content is required"),
})

// ─── getResumes ───────────────────────────────────────────────────────────────

/** Returns all resumes belonging to the authenticated user (ordered by last-update). */
export async function getResumes() {
    const userId = await requireAuthUserId()

    return await (db as any).resume.findMany({
        where: { userId },          // scoped to owner
        orderBy: { updatedAt: "desc" },
    })
}

// ─── getResume ────────────────────────────────────────────────────────────────

/** Returns a single resume, verifying ownership before returning data. */
export async function getResume(id: string) {
    const userId = await requireAuthUserId()

    // Ownership check: query includes both `id` AND `userId`
    const resume = await (db as any).resume.findUnique({
        where: { id, userId },
    })

    if (!resume) {
        throw new Error("NOT_FOUND: Resume does not exist or you do not have access.")
    }

    return resume
}

// ─── createResume ─────────────────────────────────────────────────────────────

export async function createResume(title: string) {
    const userId = await requireAuthUserId()

    // Validate title before using it
    const parsed = z.string().min(1).max(200).safeParse(title)
    if (!parsed.success) throw new Error("Invalid title")

    const defaultContent = `\\documentclass{article}
\\usepackage{titlesec}
\\usepackage{titling}
\\usepackage[margin=1in]{geometry}

\\title{My Resume}
\\author{Your Name}

\\begin{document}

\\maketitle

\\section{Experience}
% Add your experience here

\\section{Education}
% Add your education here

\\end{document}
`

    const resume = await (db as any).resume.create({
        data: {
            title: parsed.data,
            content: defaultContent,
            userId,
        },
    })

    revalidatePath("/resumes")
    return resume
}

// ─── updateResume ─────────────────────────────────────────────────────────────

export async function updateResume(id: string, values: z.infer<typeof resumeSchema>) {
    const userId = await requireAuthUserId()

    // Verify ownership BEFORE allowing any modification
    await requireResumeOwnership(id, userId)

    const result = resumeSchema.safeParse(values)
    if (!result.success) throw new Error("Invalid data")

    await (db as any).resume.update({
        where: { id, userId },   // double-lock: schema-level + ownership check
        data: {
            title: result.data.title,
            content: result.data.content,
        },
    })

    revalidatePath("/resumes")
    revalidatePath(`/resumes/${id}`)
}

// ─── deleteResume ─────────────────────────────────────────────────────────────

export async function deleteResume(id: string) {
    const userId = await requireAuthUserId()

    // Verify ownership BEFORE allowing deletion
    await requireResumeOwnership(id, userId)

    await (db as any).resume.delete({
        where: { id, userId },   // double-lock
    })

    revalidatePath("/resumes")
}
