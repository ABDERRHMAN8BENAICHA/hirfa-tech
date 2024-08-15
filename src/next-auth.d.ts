// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface JWT {
        id: string;
        name: string;
        email: string;
        image: string;
        role: string;
    }

    interface User {
        id: string;
        name: string;
        email: string;
        image: string;
        role: string;
    }
}
