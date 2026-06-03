/**
 * NextAuth Core Configuration — Career Vault
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  JWT / SESSION SECURITY DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Strategy: JWT (JSON Web Tokens) — tokens are stored in an HttpOnly
 *  cookie; they never touch `localStorage` or `sessionStorage`.
 *
 *  Token lifecycle
 *  ───────────────
 *  • maxAge: 8 hours   — tokens expire and the user is signed out
 *  • updateAge: 1 hour — token is silently refreshed if the user is
 *                         still active within the update window
 *
 *  Cookie security (applied in production)
 *  ───────────────────────────────────────
 *  • HttpOnly: true    — JavaScript cannot read the cookie (XSS mitigation)
 *  • SameSite: lax     — sent on top-level navigations, blocked on
 *                         cross-site sub-resource requests (CSRF mitigation)
 *  • Secure: true      — cookie is only sent over HTTPS
 *  • Path: /           — cookie is scoped to the entire origin
 *
 *  Protected routes (middleware-enforced)
 *  ──────────────────────────────────────
 *  The `authorized` callback is evaluated by the Next.js middleware for
 *  every request.  Unauthenticated users attempting to access protected
 *  paths are redirected to /login.
 *
 *  Protected  → /resumes/**  (LaTeX resume editor)
 *  Redirected → /login, /signup  (redirected away if already signed in)
 *  Public     → /  (landing page shown when not authenticated)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { NextAuthConfig } from "next-auth"

// Maximum session lifetime (seconds) — 8 hours
const SESSION_MAX_AGE = 8 * 60 * 60;

// Re-issue a new JWT this many seconds before expiry if the user is active
const SESSION_UPDATE_AGE = 60 * 60; // 1 hour

export const authConfig = {
    pages: {
        signIn: "/login",
        error: "/login",      // redirect auth errors to the login page
    },

    // ── JWT / session settings ─────────────────────────────────────────────
    session: {
        strategy: "jwt",
        maxAge: SESSION_MAX_AGE,
        updateAge: SESSION_UPDATE_AGE,
    },

    // ── Secure cookie overrides (production only) ──────────────────────────
    //  NextAuth applies sensible defaults; we make them explicit for clarity
    //  and for security audit trails.
    cookies: {
        sessionToken: {
            name:
                process.env.NODE_ENV === "production"
                    ? "__Secure-next-auth.session-token"
                    : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax" as const,
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },

    // ── Route protection callback (runs in middleware edge runtime) ────────
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const path = nextUrl.pathname;

            const isOnResumes = path.startsWith("/resumes");
            const isOnAuth =
                path.startsWith("/login") || path.startsWith("/signup");

            // Redirect authenticated users away from auth pages
            if (isOnAuth) {
                if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
                return true; // allow unauthenticated access to login/signup
            }

            // Protect resume editor — requires authentication
            if (isOnResumes && !isLoggedIn) {
                // Preserve the intended URL as a query param so we can
                // redirect back after sign-in
                const loginUrl = new URL("/login", nextUrl);
                loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
                return Response.redirect(loginUrl);
            }

            // All other routes (e.g. landing page) are publicly accessible
            return true;
        },
    },

    providers: [], // populated in auth.ts
} satisfies NextAuthConfig
