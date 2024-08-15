import Heding from '@/components/Heding'
import AddPost from '@/components/posts/AddPost'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div>
            <Heding title='Create Post' isCentered={true} />
            <div className='p-4'>
            <AddPost />
            </div>
        </div>
    )
}