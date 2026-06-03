'use server'

/**
 * Application Server Actions — Career Vault
 *
 * Security model
 * ─────────────
 * 1. AUTHENTICATION   — Every action calls `requireAuthUserId()` which reads
 *                       the JWT-based NextAuth session.  Unauthenticated
 *                       requests are rejected immediately.
 *
 * 2. ENCRYPTION       — Before saving to the database the Cloudinary
 *                       `public_id` (a sensitive file reference) and the
 *                       `jobDescription` (may contain confidential details)
 *                       are encrypted with AES-256-GCM via `encrypt()`.
 *                       The `resumeUrl` stored in the database is also the
 *                       encrypted form; the plaintext URL is decrypted only
 *                       at read time so that database leaks do not expose
 *                       direct file links.
 *
 * 3. ACCESS CONTROL   — Every mutating action verifies ownership via
 *                       `requireApplicationOwnership()` before proceeding.
 *                       All read queries are scoped to `userId` so a user
 *                       can never access another user's data even if they
 *                       know the document ID.
 */

import { db } from "@/lib/db";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { encrypt, decrypt } from "@/lib/encryption";
import { requireAuthUserId, requireApplicationOwnership } from "@/lib/access-control";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Metadata type stored encrypted in the database ──────────────────────────

interface ResumeMetadata {
    originalFileName: string;
    uploadedAt: string;
    fileSize: number;
    mimeType: string;
}

// ─── createApplication ────────────────────────────────────────────────────────

export async function createApplication(formData: FormData) {
    // 1. Authenticate
    const userId = await requireAuthUserId();

    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED";
    const jobDescription = formData.get("jobDescription") as string;
    const file = formData.get("resume") as File;

    if (!file) {
        throw new Error("Resume file is required");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const publicId = `resumes/${userId}/${safeFilename}_${timestamp}.pdf`;

    console.log(`[createApplication] Uploading resume for user ${userId}`);

    // 2. Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                public_id: publicId,
                access_mode: "public",
                type: "upload"
            },
            (error, result) => {
                if (error) {
                    console.error("[createApplication] Cloudinary Upload Error:", error);
                    reject(error);
                    return;
                }
                resolve(result);
            }
        );
        uploadStream.end(buffer);
    }) as any;

    // 3. Encrypt sensitive fields before persisting
    //    a) Encrypt the Cloudinary public_id (file reference)
    const encryptedPublicId = encrypt(uploadResult.public_id as string);

    //    b) Encrypt the secure URL (direct download link)
    const encryptedUrl = encrypt(uploadResult.secure_url as string);

    //    c) Build and encrypt rich file metadata
    const metadata: ResumeMetadata = {
        originalFileName: file.name,
        uploadedAt: new Date().toISOString(),
        fileSize: file.size,
        mimeType: file.type || "application/pdf",
    };
    const encryptedMetadata = encrypt(JSON.stringify(metadata));

    //    d) Encrypt job description if provided (may contain confidential data)
    const encryptedJobDescription = jobDescription
        ? encrypt(jobDescription)
        : null;

    // 4. Persist — all sensitive values are ciphertext
    await (db as any).application.create({
        data: {
            company,
            role,
            status,
            jobDescription: encryptedJobDescription,
            resumeUrl: encryptedUrl,              // encrypted
            resumePublicId: encryptedPublicId,    // encrypted
            resumeMetadata: encryptedMetadata,    // encrypted (new field)
            userId,
        },
    });

    console.log(`[createApplication] Application created for user ${userId}`);
    revalidatePath("/");
}

// ─── deleteApplication ────────────────────────────────────────────────────────

export async function deleteApplication(id: string) {
    // 1. Authenticate
    const userId = await requireAuthUserId();

    // 2. Verify ownership (throws FORBIDDEN if not owner)
    const application = await requireApplicationOwnership(id, userId);

    // 3. Decrypt the public_id before passing to Cloudinary
    if (application.resumePublicId) {
        const plainPublicId = decrypt(application.resumePublicId as string);
        if (plainPublicId) {
            await cloudinary.uploader.destroy(plainPublicId, { resource_type: "raw" });
        }
    }

    // 4. Delete the record
    await (db as any).application.delete({ where: { id } });

    console.log(`[deleteApplication] Application ${id} deleted by user ${userId}`);
    revalidatePath("/");
}

// ─── getApplications (scoped to current user) ─────────────────────────────────

export async function getApplications() {
    const userId = await requireAuthUserId();

    const applications = await (db as any).application.findMany({
        where: { userId },               // user sees ONLY their own data
        orderBy: { appliedAt: "desc" },
    });

    // Decrypt resumeUrl so the client receives a usable link
    return applications.map((app: any) => ({
        ...app,
        resumeUrl: app.resumeUrl ? (decrypt(app.resumeUrl) ?? null) : null,
        jobDescription: app.jobDescription ? (decrypt(app.jobDescription) ?? null) : null,
    }));
}
