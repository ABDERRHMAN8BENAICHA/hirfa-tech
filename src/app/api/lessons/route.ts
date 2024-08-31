import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { title, content, videoUrl, videoInfo, courseId, isFree } = await request.json();

    try {
        const lesson = await prisma.lesson.create({
            data: {
                title,
                content,
                videoUrl,
                videoInfo,
                courseId,
                isFree
            }
        });
        return NextResponse.json(lesson);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}


export async function GET() {
    try {
        const lessons = await prisma.lesson.findMany();
        return NextResponse.json(lessons);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}