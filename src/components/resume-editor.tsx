"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateResume, deleteResume } from "@/actions/resume"
import { Loader2, Save, Download, Trash, FileCode } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

interface ResumeEditorProps {
    id: string
    initialTitle: string
    initialContent: string
}

export function ResumeEditor({ id, initialTitle, initialContent }: ResumeEditorProps) {
    const [title, setTitle] = useState(initialTitle)
    const [content, setContent] = useState(initialContent)
    const [saving, setSaving] = useState(false)
    const router = useRouter()

    async function handleSave() {
        setSaving(true)
        try {
            await updateResume(id, { title, content })
            toast.success("Resume saved successfully")
        } catch (error) {
            toast.error("Failed to save resume")
        } finally {
            setSaving(false)
        }
    }

    function handleDownload() {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${title.replace(/\s+/g, '_')}.tex`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this resume?")) return

        try {
            await deleteResume(id)
            router.push("/resumes")
            toast.success("Resume deleted")
        } catch (error) {
            toast.error("Failed to delete resume")
        }
    }

    // Save on Ctrl+S
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault()
                handleSave()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [title, content])

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] gap-4">
            <div className="flex items-center justify-between gap-4 glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 flex-grow">
                    <FileCode className="h-6 w-6 text-primary" />
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg font-bold border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download .tex
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        <Trash className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save
                    </Button>
                </div>
            </div>

            <div className="flex-grow flex gap-4">
                <Card className="flex-grow glass-card flex flex-col overflow-hidden">
                    <CardContent className="p-0 flex-grow flex flex-col h-full bg-[#1e1e1e]">
                        <div className="bg-black/20 p-2 text-xs text-muted-foreground flex justify-between border-b border-white/5">
                            <span>LaTeX Editor</span>
                            <span>Ln {content.split('\n').length}, Col {content.length}</span>
                        </div>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-grow resize-none rounded-none border-none focus-visible:ring-0 text-sm font-mono p-4 bg-transparent text-gray-300 leading-6"
                            spellCheck={false}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
