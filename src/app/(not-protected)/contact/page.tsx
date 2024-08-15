import GoBack from '@/components/buttons/GoBack'
import Error from '@/components/Error'
import Heding from '@/components/Heding'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div>
            <Error title='this page is under construction' isCentered={true} />
            <div className='w-full flex justify-center items-center'>
                <GoBack />
            </div>
        </div>
    )
}