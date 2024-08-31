// /app/api/courses/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/db"



export async function POST(req: Request) {
    const body = await req.json()
    const {
        title,
        description,
        price,
        discount,
        numberOfStars,
        published,
        isFree,
        image,
    } = body

    try {
        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                price,
                discount,
                numberOfStars,
                published,
                isFree,
                image,
            },
        })

        return NextResponse.json(newCourse, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
    }
}


export async function GET() {
    try {
        const courses = await prisma.course.findMany()
        return NextResponse.json(courses)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
    }
}