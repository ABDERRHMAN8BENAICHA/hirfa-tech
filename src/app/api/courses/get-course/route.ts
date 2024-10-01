import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { courseId } = body;

        console.log(courseId);

        // Check if courseId exists
        if (!courseId) {
            return NextResponse.json({ ok: false, error: "Invalid request. Missing courseId." }, { status: 400 });
        }

        // Fetch the course details from the database
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            include: {
                lessons: true, // Include related lessons if needed
            },
        });

        // Check if the course was found
        if (!course) {
            return NextResponse.json({ ok: false, error: "Course not found." }, { status: 404 });
        }

        // Return the course details with ok: true
        return NextResponse.json({ ok: true, course }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ ok: false, error: "Failed to fetch course details", details: String(error) }, { status: 500 });
    }
}
