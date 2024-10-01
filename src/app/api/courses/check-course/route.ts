import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
    
    try {
        const body = await req.json();
        const { courseId, userId } = body;
        console.log(courseId, userId);
        
        // Check if both courseId and userId exist
        if (!courseId || !userId) {
            return NextResponse.json({ error: "Invalid request. Missing courseId or userId." }, { status: 400 });
        }
        
        // Check if the user is already enrolled in the course
        const userCourse = await prisma.course.findFirst({
            where: {
                id: courseId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        
        if (userCourse) {
            return NextResponse.json({ ok: true, message: "User has this course" });
        } else {
            return NextResponse.json({ ok: false, message: "User does not have this course" });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to check course enrollment", details: String(error) }, { status: 500 });
    }
}
