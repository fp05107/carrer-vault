"use client"

import { Button } from "@/components/ui/button"
import { createResume } from "@/actions/resume"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

export function CreateResumeButton() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleCreate() {
        setLoading(true)
        try {
            const resume = await createResume("Untitled Resume")
            toast.success("Resume created")
            router.push(`/resumes/${resume.id}`)
        } catch (error) {
            toast.error("Failed to create resume")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button onClick={handleCreate} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            New Resume
        </Button>
    )
}
