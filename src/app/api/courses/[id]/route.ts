// /app/api/courses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        const course = await prisma.course.findUnique({
            where: { id: id },
        })

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }

        return NextResponse.json(course)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
    }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const body = await req.json()

    try {
        const currentCourse = await prisma.course.findUnique({
            where: { id: id },
        })

        if (!currentCourse) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }


        const updatedCourse = await prisma.course.update({
            where: { id: id },
            data: {
                title: body.title || currentCourse.title,
                description: body.description || currentCourse.description,
                price: body.price !== undefined ? body.price : currentCourse.price,
                discount: body.discount !== undefined ? body.discount : currentCourse.discount,
                numberOfStars: body.numberOfStars !== undefined ? body.numberOfStars : currentCourse.numberOfStars,
                published: body.published !== undefined ? body.published : currentCourse.published,
                isFree: body.isFree !== undefined ? body.isFree : currentCourse.isFree,
                image: body.image || currentCourse.image,
            },
        })

        return NextResponse.json(updatedCourse)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.lesson.deleteMany({
            where: { courseId: id }
        });

        await prisma.course.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Course and its lessons deleted successfully" }, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete course and lessons" }, { status: 500 });
    }
}