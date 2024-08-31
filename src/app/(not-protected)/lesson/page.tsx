'use client'
import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import ProtectedAdmin from '@/components/ProtectedAdmin'
import Heding from '@/components/Heding'
import { LessonColumns } from './columns'
import { DataTable } from './data-table'

type Lesson = {
    id: string;
    title: string;
    content?: string;
    videoUrl: string;
    videoInfo?: string;
    courseId: string;
    isFree: boolean;
};

type Props = {}

export default function Page({ }: Props) {
    const searchParams = useSearchParams();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const lessonId = searchParams.get('idCourse');

    useEffect(() => {
        async function fetchLessons() {
            if (!lessonId) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${lessonId}/lessons/`);

                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }

                const data = await response.json();
                setLessons(data);
            } catch (error) {
                console.log(error);
                
            } finally {
                setLoading(false);
            }
        }

        fetchLessons();
    }, [lessonId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(lessons);
    
    return (
        <ProtectedAdmin>
            <Heding title={`My Lessons :`} isCentered={false} />
            <div className="container mx-auto py-10">
                <DataTable columns={LessonColumns} data={lessons} />
            </div>
        </ProtectedAdmin>
    )
}