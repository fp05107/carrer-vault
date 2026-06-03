/**
 * Access-Control Helpers — Career Vault
 *
 * These utilities are called from server actions to verify that the
 * authenticated user owns the resource they are trying to access or
 * modify.  Raising an explicit error (rather than silently returning
 * null) makes policy violations visible in server logs.
 */

import { auth } from "@/auth";
import { db } from "@/lib/db";

// ─── Session helpers ──────────────────────────────────────────────────────────

/**
 * Returns the authenticated user's ID or throws an "Unauthorized" error.
 * Use this at the top of any server action that requires authentication.
 */
export async function requireAuthUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED: You must be signed in to perform this action.");
  }
  return session.user.id;
}

/**
 * Returns the full session or throws if unauthenticated.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED: You must be signed in to perform this action.");
  }
  return session;
}

// ─── Resume ownership ─────────────────────────────────────────────────────────

/**
 * Verifies the resume exists AND belongs to `userId`.
 * Throws "NOT_FOUND" or "FORBIDDEN" on violation.
 */
export async function requireResumeOwnership(resumeId: string, userId: string) {
  const resume = await (db as any).resume.findUnique({
    where: { id: resumeId },
    select: { id: true, userId: true },
  });

  if (!resume) {
    throw new Error("NOT_FOUND: Resume does not exist.");
  }
  if (resume.userId !== userId) {
    throw new Error(
      "FORBIDDEN: You do not have permission to access this resume."
    );
  }
  return resume;
}

// ─── Application ownership ───────────────────────────────────────────────────

/**
 * Verifies the application exists AND belongs to `userId`.
 * Throws "NOT_FOUND" or "FORBIDDEN" on violation.
 */
export async function requireApplicationOwnership(
  applicationId: string,
  userId: string
) {
  const application = await (db as any).application.findUnique({
    where: { id: applicationId },
    select: { id: true, userId: true, resumePublicId: true },
  });

  if (!application) {
    throw new Error("NOT_FOUND: Application does not exist.");
  }
  if (application.userId !== userId) {
    throw new Error(
      "FORBIDDEN: You do not have permission to access this application."
    );
  }
  return application;
}
