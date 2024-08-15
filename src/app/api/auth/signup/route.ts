import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt";



export async function POST(req: NextRequest) {
    const { name, username, email, password, phone, address, image } = await req.json();
    try {
        const existeUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (existeUser) {
            return NextResponse.json({
                ok: false,
                message: "User already exists"
            })
        }
        const newUser = await prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                password: hashSync(password, 10),
                phone: phone,
                address: address,
                image: image
            }
        })
        if (!newUser) {
            return NextResponse.json({
                ok: false,
                message: "User already exists"
            })
        }

        return NextResponse.json({
            ok: true,
            message: "User registered successfully",
            user: newUser,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error",
            error
        })
    }
}