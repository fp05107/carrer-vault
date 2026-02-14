"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createApplication } from "@/app/actions";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    status: z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"]),
    jobDescription: z.string().optional(),
});

interface ApplicationFormProps {
    onSuccess?: () => void;
}

export function ApplicationForm({ onSuccess }: ApplicationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // We need to handle file input separately because zod doesn't support Filelist well in client schema 
    // without custom validation, and we need to pass it to server action via FormData.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            role: "",
            status: "APPLIED",
            jobDescription: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("company", values.company);
            formData.append("role", values.role);
            formData.append("status", values.status);
            if (values.jobDescription) formData.append("jobDescription", values.jobDescription);

            // Get file from input
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                toast.error("Please upload a resume");
                setIsSubmitting(false);
                return;
            }
            formData.append("resume", fileInput.files[0]);

            await createApplication(formData);
            toast.success("Application added successfully");
            form.reset();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add application");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="Acme Corp" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Role</FormLabel>
                            <FormControl>
                                <Input placeholder="Frontend Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="APPLIED">Applied</SelectItem>
                                    <SelectItem value="INTERVIEWING">Interviewing</SelectItem>
                                    <SelectItem value="OFFER">Offer</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Paste JD coverage here..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel>Resume (PDF)</FormLabel>
                    <FormControl>
                        <Input type="file" accept=".pdf" required />
                    </FormControl>
                </FormItem>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                    Save Application
                </Button>
            </form>
        </Form>
    );
}
