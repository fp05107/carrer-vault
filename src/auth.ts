/**
 * NextAuth Instance — Career Vault
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  AUTHENTICATION FLOW DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Supported providers
 *  ───────────────────
 *  1. Google OAuth 2.0
 *  2. GitHub OAuth 2.0
 *  3. Email + Password (Credentials)
 *
 *  Credentials flow
 *  ────────────────
 *  • Email is validated with Zod (must be a valid email)
 *  • Password must be ≥ 6 characters
 *  • Password is compared against the bcrypt hash stored in MongoDB
 *  • Returns `null` on any failure (no information leakage)
 *
 *  JWT callbacks
 *  ─────────────
 *  jwt()     → Runs when a token is created or refreshed.
 *              Embeds the user's role into the token so it is
 *              available server-side without an extra DB round-trip.
 *              If the DB user no longer exists (deleted account),
 *              the token is invalidated by returning a token with
 *              no `sub` field.
 *
 *  session() → Maps token fields onto the session object exposed to
 *              client components.  Only `id` and `role` are exposed —
 *              no raw JWT data leaks to the client.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { authConfig } from "./auth.config"
import { Role } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsed = credentialsSchema.safeParse(credentials)
                if (!parsed.success) return null

                const { email, password } = parsed.data

                // Look up the user — always perform bcrypt.compare to prevent
                // timing attacks (constant-time comparison even when user is null)
                const user = await db.user.findUnique({ where: { email } })
                const dummyHash =
                    "$2b$10$CwTycUXWue0Thq9StjUM0u" // used when no user found
                const passwordToCompare = user?.password ?? dummyHash

                const passwordsMatch = await bcrypt.compare(password, passwordToCompare)
                if (!user || !passwordsMatch) return null

                return user
            },
        }),
    ],

    callbacks: {
        ...authConfig.callbacks,

        /**
         * session callback — runs every time a session is accessed.
         * Exposes only the fields that client code needs.
         */
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role as Role
            }
            return session
        },

        /**
         * jwt callback — runs when a token is created or refreshed.
         * Verifies the user still exists in the DB on each refresh.
         */
        async jwt({ token }) {
            if (!token.sub) return token

            // Re-validate user existence on every token refresh
            const existingUser = await db.user.findUnique({
                where: { id: token.sub },
                select: { id: true, role: true },
            })

            // If the user was deleted, invalidate the token
            if (!existingUser) {
                console.warn(`[jwt] User ${token.sub} not found — invalidating token.`)
                return { ...token, sub: undefined }
            }

            token.role = existingUser.role
            return token
        },
    },

    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
})
