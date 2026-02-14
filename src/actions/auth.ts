"use server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export async function signup(values: z.infer<typeof signupSchema>) {
    const result = signupSchema.safeParse(values)
    if (!result.success) {
        return { error: "Invalid data" }
    }

    const { name, email, password } = result.data

    try {
        const existingUser = await db.user.findUnique({ where: { email } })
        if (existingUser) {
            return { error: "User already exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return { success: true }
    } catch (error) {
        return { error: "Something went wrong" }
    }
}

export async function login(values: z.infer<typeof loginSchema>) {
    const result = loginSchema.safeParse(values)
    if (!result.success) return { error: "Invalid fields" }

    const { email, password } = result.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something went wrong" }
            }
        }
        throw error
    }


}

export async function socialLogin(provider: "google" | "github") {
    await signIn(provider, { redirectTo: "/" })
}

