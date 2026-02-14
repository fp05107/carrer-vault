'use server'

import { db } from "@/lib/db";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createApplication(formData: FormData) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }

    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED"; // Type assertion
    const jobDescription = formData.get("jobDescription") as string;
    const file = formData.get("resume") as File;

    if (!file) {
        throw new Error("Resume file is required");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "resumes" }, // auto to detect pdf properly
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
        );
        uploadStream.end(buffer);
    }) as any;

    await db.application.create({
        data: {
            company,
            role,
            status,
            jobDescription,
            resumeUrl: uploadResult.secure_url,
            resumePublicId: uploadResult.public_id,
            userId: session.user.id,
        },
    });

    revalidatePath("/");
}

export async function deleteApplication(id: string) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }

    const application = await db.application.findUnique({
        where: { id },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    // Only allow deleting own applications
    if (application.userId !== session.user.id) {
        throw new Error("FORBIDDEN: You cannot delete this application");
    }

    if (application.resumePublicId) {
        await cloudinary.uploader.destroy(application.resumePublicId);
    }

    await db.application.delete({
        where: { id },
    });

    revalidatePath("/");
}
