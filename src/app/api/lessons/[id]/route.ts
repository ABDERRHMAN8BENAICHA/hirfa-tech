import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const lesson = await prisma.lesson.findUnique({
            where: { id }
        });
        if (lesson) {
            return NextResponse.json(lesson);
        } else {
            return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();

    try {
        const currentLesson = await prisma.lesson.findUnique({
            where: { id }
        });

        if (!currentLesson) {
            return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
        }

        const updatedLesson = await prisma.lesson.update({
            where: { id },
            data: {
                title: body.title || currentLesson.title,
                content: body.content !== undefined ? body.content : currentLesson.content,
                videoUrl: body.videoUrl || currentLesson.videoUrl,
                videoInfo: body.videoInfo || currentLesson.videoInfo,
                courseId: body.courseId || currentLesson.courseId,
                isFree: body.isFree !== undefined ? body.isFree : currentLesson.isFree
            }
        });

        return NextResponse.json(updatedLesson);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.lesson.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}