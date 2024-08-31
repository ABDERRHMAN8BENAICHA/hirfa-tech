import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
    const { courseId } = params;

    try {
        const courseWithUsers = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                users: true,  // Updated field name for many-to-many relation
            },
        });

        if (!courseWithUsers) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        return NextResponse.json(courseWithUsers.users, { status: 200 }); // Updated field name for response
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
