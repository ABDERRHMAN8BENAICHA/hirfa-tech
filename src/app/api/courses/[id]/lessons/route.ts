import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const lessons = await prisma.lesson.findMany({
            where: {
                courseId: id,
            },
        });

        return NextResponse.json(lessons);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        return NextResponse.error();
    }
}