"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { formatDateTime, getInitials } from '@/const'
import ActionComment from '../buttons/ActionComment'
import { useSession } from 'next-auth/react'

type Props = {
    AuthorImage: string;
    AuthorName: string;
    AuthorId: string;
    CommentCreatedAt: string;
    Content: string;
    commentId : string;
}

export default function CardComment({ AuthorId, AuthorImage, AuthorName, CommentCreatedAt, Content ,commentId}: Props) {
    const { data: session } = useSession();
    const user = {
        name: session?.user?.name,
        id: session?.user?.id,
        email: session?.user?.email,
        profileImage: session?.user?.image,
    };
    return (
        <Card className="w-[280px] md:w-[365px]">
            <CardHeader>
                <div className='flex  items-center flex-row space-x-4'>
                    <CardTitle>
                        <Avatar>
                            <AvatarImage src={`${AuthorImage}`} alt="@shadcn" />
                            <AvatarFallback className='text-lg'>
                                {
                                    getInitials(AuthorName)
                                }
                            </AvatarFallback>
                        </Avatar>
                    </CardTitle>
                    <div className='flex justify-between items-center w-full'>
                        <div>
                            <h1 className='text-left font-bold'>{AuthorName}</h1>
                            <span className='text-gray-600 text-sm'>
                                {
                                    formatDateTime(CommentCreatedAt)
                                }
                            </span>
                        </div>
                        <div>
                            {
                                (AuthorId == user.id) ? <ActionComment commentId={commentId} /> : null
                            }
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    {Content}
                </div>
            </CardHeader>
        </Card>
    )
}