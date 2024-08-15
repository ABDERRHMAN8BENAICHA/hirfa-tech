"use server"

import { signIn } from "@/auth"

export default async function SingnInGoogleAction() {
    await signIn("github", { redirectTo: "/profile" })
}