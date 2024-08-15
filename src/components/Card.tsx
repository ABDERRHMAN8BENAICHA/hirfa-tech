import { HeroCardType } from '@/types'
import React from 'react'

type Props = HeroCardType

export default function Card({ icon: Icon, title, content }: Props) {
    return (
        <div className=' dark:bg-gray-100/5 bg-green-500 text-white w-[320px] h-[220px] rounded-md flex flex-col space-y-2 p-4 text-center md:text-left '>
            <Icon className="text-2xl direction-normal font-bold " />
            <h1 className='text-xl font-semibold'>{title}</h1>
            <p className='text-gray-800 dark:text-gray-300/50'>{content}</p>
        </div>
    )
}