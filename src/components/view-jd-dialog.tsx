"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, ScrollText } from "lucide-react"

interface ViewJDDialogProps {
    company: string
    role: string
    jobDescription: string | null
}

export function ViewJDDialog({ company, role, jobDescription }: ViewJDDialogProps) {
    if (!jobDescription) return null

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="View Job Description">
                    <ScrollText className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BriefcaseIcon className="h-5 w-5 text-primary" />
                        {role} at {company}
                    </DialogTitle>
                    <DialogDescription>
                        Job Description
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto p-4 bg-muted/20 rounded-md border text-sm whitespace-pre-wrap font-mono">
                    {jobDescription}
                </div>
            </DialogContent>
        </Dialog>
    )
}

function BriefcaseIcon({ className }: { className?: string }) {
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
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}
