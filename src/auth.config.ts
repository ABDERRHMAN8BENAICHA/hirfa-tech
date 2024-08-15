import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default {
    providers: [GitHub, Google, Credentials({
        credentials: {
            email: {
                label: "Email",
                type: "email",
            },
            password: {
                label: "Passwort",
                type: "password",
            },
        },
        authorize: async (credentials) => {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        email: credentials?.email,
                        password: credentials?.password,
                    }
                ),
            })
            const data = await res.json()
            console.log(data);
            if (data.ok) {
                return data.user;
            } else {
                return null;
            }
        }
    })]
} satisfies NextAuthConfig