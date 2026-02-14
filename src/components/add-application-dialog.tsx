"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationForm } from "@/components/application-form";
import { useState } from "react";
import { Plus } from "lucide-react";

export function AddApplicationDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Application
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Application</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to track a new job application.
                    </DialogDescription>
                </DialogHeader>
                <ApplicationForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
