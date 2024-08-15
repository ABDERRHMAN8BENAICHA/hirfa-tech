"use client"
import React, { useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Error from '../Error'
import CardLike from './CardLike'
import { Like, LikesResponse } from '@/types'
import { API_URL } from '@/const'
type Props = {
    NumberOfLike: number;
    PostId: string;
}


export default function ViewLike({ NumberOfLike, PostId }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [likes, setLikes] = useState<Like[]>([])
    const [numberLike, setNumberLike] = useState<number>(NumberOfLike | 0)
    useEffect(() => {
        fetch(`${API_URL}/likes?id=${PostId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json()).then((newData: LikesResponse) => {
            setLoading(false)
            if (newData.ok) {
                setLikes(newData.likes)
                setNumberLike(newData.likes.length)
            }
        })
    }, [PostId])
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className=' text-right'>
                        <span className='text-sm text-gray-600 hover:underline hover:cursor-pointer'>Like {numberLike}</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className='text-center'>Likes</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2 w-full">
                            <ScrollArea className="h-96 w-full rounded-md border">
                                <div className="p-4 space-y-2">
                                    {
                                        (likes.length == 0) ? <Error title='not found Likes' isCentered={true} /> : (
                                            likes.map((like) => {
                                                console.log(like);
                                                return (
                                                    <CardLike key={like.id} image={like.user.image} name={like.user.name} />
                                                )
                                            })
                                        )
                                    }
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}