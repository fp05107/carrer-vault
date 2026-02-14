"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteApplication } from "@/app/actions";
import { toast } from "sonner";

export function DeleteApplicationButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        try {
            await deleteApplication(id);
            toast.success("Application deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete application");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
        </Button>
    );
}
