"use client"
import UpdeteLesson from '@/components/UpdeteLesson'
import React from 'react'



type Props = {
    params: {
        id: string
    }
}

async function getLesson(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lessons/${id}`)
    const data = await response.json()
    return data
}

export default async function page({ params }: Props) {
    const { id } = params;
    const lesson = await getLesson(id)
    console.log(lesson);

    return (
        <div>
            <UpdeteLesson {...lesson} />
        </div>
    )
}