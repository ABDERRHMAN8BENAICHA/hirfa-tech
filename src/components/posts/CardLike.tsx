import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
type Props = {
    image: string;
    name: string;
}

export default function CardLike({ image, name }: Props) {
    return (
        <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 ">
                <Avatar className='w-10 h-10'>
                    <AvatarImage src={image} className='w-full h-full' alt={`${name}`} />
                    <AvatarFallback className='text-4xl'>
                        {
                            name[1] + name[2]
                        }
                    </AvatarFallback>
                </Avatar>
            </div>
            <div>
                <h1 className="text-xl font-bold">{name}</h1>
            </div>
        </div>
    )
}