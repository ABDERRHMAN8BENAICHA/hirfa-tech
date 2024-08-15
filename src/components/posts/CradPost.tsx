"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Image from 'next/image'
import CopyButoon from '../buttons/CopyButoon'
import { Post } from '@/types'
import { API_URL, formatDateTime, getInitials } from '@/const'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import ActionCard from '../buttons/ActionCard'
import ViewComment from './ViewComment'
import ViewLike from './ViewLike'
import AddComment from './AddComment'
import AddLike from './AddLike'

type Props = {
    post: Post
}

export default function CradPost({ post }: Props) {
    const path = usePathname()
    const { data: session } = useSession();
    const user = {
        name: session?.user?.name,
        id: session?.user?.id,
        email: session?.user?.email,
        profileImage: session?.user?.image,
    };


    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const getDisplayContent = () => {
        const maxLength = 100;
        if (post?.content?.length <= maxLength) {
            return post.content;
        }
        return isExpanded ? post.content : post.content.substring(0, maxLength) + '...';
    };




    return (
        <Card className="w-[350px] px-2 md:w-[450px] xl:w-[550px]">
            <CardHeader className='flex items-center justify-between flex-row'>
                <div className='flex  items-center flex-row space-x-4'>
                    <CardTitle>
                        <Avatar>
                            <AvatarImage src={`${post.user.image}`} alt="@shadcn" />
                            <AvatarFallback className='text-lg'>
                                {
                                    getInitials(post.user.name)
                                }
                            </AvatarFallback>
                        </Avatar>
                    </CardTitle>
                    <div>
                        <h1 className='text-left font-bold'>{post.user.name}</h1>
                        <span className='text-gray-600 text-sm'>
                            {
                                formatDateTime(post.createdAt)
                            }
                        </span>
                    </div>
                </div>
                {
                    (post.user.id == user.id) ? <ActionCard postId={post.id} /> : null
                }
            </CardHeader>
            <CardContent className=' p-4'>
                <div className='p-2'>
                    <p>{getDisplayContent()}</p>
                    {post.content.length > 100 && (
                        <button onClick={toggleExpand} className='text-green-400 text-sm'>
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>
                <div className='flex justify-center items-center'>
                    {
                        (post.image == "") ? null : <Image src={`${post.image}`} height={200} width={400} alt='image post' />
                    }
                </div>
                {/* number of like  */}
            </CardContent>
            <div className='w-full flex flex-row-reverse justify-between items-center'>
                <ViewLike NumberOfLike={post._count.like} PostId={post.id} />
                <ViewComment PostId={post.id} />
            </div>
            <hr />
            <CardFooter className="flex justify-between pt-4">
                <CopyButoon id={post.id} />
                <AddComment authorId={user?.id} postId={post.id} />
                <AddLike PostId={post.id} UserId={user.id} />
            </CardFooter>
        </Card>
    )
}