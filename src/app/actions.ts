'use server'

import { db } from "@/lib/db";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createApplication(formData: FormData) {
    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED";
    const jobDescription = formData.get("jobDescription") as string;
    const file = formData.get("resume") as File;

    if (!file) {
        throw new Error("Resume file is required");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "raw", folder: "resumes" }, // raw for PDF? or auto
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
        ).end(buffer);
    }) as any;

    await db.application.create({
        data: {
            company,
            role,
            status,
            jobDescription,
            resumeUrl: uploadResult.secure_url,
            resumePublicId: uploadResult.public_id,
        },
    });

    revalidatePath("/");
}

export async function deleteApplication(id: string) {
    const application = await db.application.findUnique({
        where: { id },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    if (application.resumePublicId) {
        await cloudinary.uploader.destroy(application.resumePublicId, { resource_type: "raw" });
    }

    await db.application.delete({
        where: { id },
    });

    revalidatePath("/");
}
