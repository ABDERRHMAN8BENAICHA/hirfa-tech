// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     const { id } = params;

//     // التحقق من وجود id
//     if (!id) {
//         return NextResponse.json({
//             message: 'ID is required',
//             ok: false
//         }, { status: 400 });
//     }

//     try {
//         // البحث عن الدورات المتعلقة بالمستخدم
//         const courses = await prisma.course.findMany({
//             where: {
//                 user: {
//                     some: {
//                         id: id,
//                     },
//                 },
//             },
//         });

//         if (courses.length === 0) {
//             return NextResponse.json({
//                 message: 'No courses found for this user',
//                 ok: true,
//                 courses: []
//             }, { status: 200 });
//         }

//         return NextResponse.json({
//             message: 'Courses fetched successfully',
//             ok: true,
//             courses
//         }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching courses:', error);
//         return NextResponse.json({
//             message: 'Something went wrong while fetching courses',
//             ok: false
//         }, { status: 500 });
//     }
// }
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     const { id } = params;

//     // Ensure ID is provided
//     if (!id) {
//         return NextResponse.json({
//             message: 'ID is required',
//             ok: false
//         }, { status: 400 });
//     }

//     try {
//         // Fetch courses related to the user
//         const courses = await prisma.course.findMany({
//             where: {

//             },
//         });

//         // Check if any courses were found
//         if (courses.length <= 0) {
//             return NextResponse.json({
//                 message: 'No courses found for this user',
//                 ok: true,
//                 courses: [],
//             }, { status: 200 });
//         }

//         return NextResponse.json({
//             message: 'Courses fetched successfully',
//             ok: true,
//             courses
//         }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching courses:', error);
//         return NextResponse.json({
//             message: 'Something went wrong while fetching courses',
//             ok: false
//         }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // Ensure ID is provided
    if (!id) {
        return NextResponse.json({
            message: 'ID is required',
            ok: false
        }, { status: 400 });
    }

    try {
        // Fetch user with related courses and lessons
        const userWithCourses = await prisma.user.findUnique({
            where: { id },
            include: {
                courses: {  // Updated to match the schema's relation name
                    include: {
                        lessons: {  // Correct field name for lessons
                            select: {
                                id: true,
                                title: true,
                                isFree: true,
                            },
                        },
                    },
                },
            },
        });

        // Handle case where user is not found
        if (!userWithCourses) {
            return NextResponse.json({
                message: 'User not found',
                ok: false,
            }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Courses fetched successfully',
            ok: true,
            courses: userWithCourses.courses,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user courses:', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            ok: false,
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
