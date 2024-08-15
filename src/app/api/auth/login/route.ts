import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { compareSync } from "bcrypt";



export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            return NextResponse.json({
                ok: false,
                message: "User Not Found"
            })
        }

        const passwordValid = compareSync(password, user?.password as string)
        if (!passwordValid) {
            return NextResponse.json({
                ok: false,
                message: "Incorrect password",
            })
        }

        return NextResponse.json({
            ok: true,
            message: "User logged in successfully",
            user: user,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error",
            error
        })
    }
}