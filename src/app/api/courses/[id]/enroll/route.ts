import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { userId } = await req.json();

    try {
        const course = await prisma.course.update({
            where: { id: id },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
        });
        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to enroll user in course" }, { status: 500 });
    }
}
