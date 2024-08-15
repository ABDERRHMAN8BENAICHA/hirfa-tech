"use server"

import { signIn } from "@/auth"

export default async function SingnInGoogleAction() {
    await signIn("google", { redirectTo: "/profile" })
}