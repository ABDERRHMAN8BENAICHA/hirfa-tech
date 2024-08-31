import Heding from '@/components/Heding'
import AddCourse from '@/components/posts/AddCourse'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div>
            <Heding title='Create Post' isCentered={true} />
            <div className='p-4'>
                <AddCourse />
            </div>
        </div>
    )
}