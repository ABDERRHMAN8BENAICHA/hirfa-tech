"use client"
import UpdeteCourse from '@/components/UpdeteCourse'
import React from 'react'



type Props = {
    params: {
        id: string
    }
}

async function getCourse(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`)
    const data = await response.json()
    return data
}

export default async function page({ params }: Props) {
    const { id } = params;
    const course = await getCourse(id)
    console.log(course);

    return (
        <div>
            <UpdeteCourse {...course} />
        </div>
    )
}