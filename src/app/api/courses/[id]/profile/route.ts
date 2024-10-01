import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Dynamic API route to get all courses for a specific user
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // `id` is the userId (instructor or student)

    try {
        // Fetch courses where the user is the instructor or enrolled as a student
        const courses = await prisma.course.findMany({
            where: {
                users: {
                    some: { id }, // Filter courses where the user is either instructor or student
                },
            },
            include: {
                lessons: true,       // Include lessons related to the course
            },
        });

        // If no courses are found, return 404
        if (!courses || courses.length === 0) {
            return NextResponse.json({ message: 'No courses found for this user' }, { status: 404 });
        }

        // Return the courses data in the response
        return NextResponse.json({ courses, ok: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching courses for user:', error);
        return NextResponse.json({ message: 'Failed to fetch courses for the user' }, { status: 500 });
    }
}
