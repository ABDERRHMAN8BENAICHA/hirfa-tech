import React, { useEffect, useState } from 'react'
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
import { Button } from '../ui/button'
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import CardComment from './CardComment'
import Error from '../Error'
import { Comment, CommentsResponse } from '@/types'
import { API_URL } from '@/const'

type Props = {
    PostId: string;
}


export default function ViewComment({ PostId }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]>([])
    const [numberComment, setNumberComment] = useState<number>(0)
    useEffect(() => {
        fetch(`${API_URL}/comments?id=${PostId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json()).then((newData: CommentsResponse) => {
            setLoading(false)
            if (newData.ok) {
                setComments(newData.comments)
                setNumberComment(newData.comments.length)
            }
        })
    }, [PostId])
    // const handleComments = async () => {
    //     fetch(`${API_URL}/comments?id=${PostId}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     }).then((res) => res.json()).then((newData: CommentsResponse) => {
    //         setLoading(false)
    //         if (newData.ok) {
    //             setComments(newData.comments)
    //             setNumberComment(newData.comments.length)
    //         }
    //     })
    // }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <span className='text-sm text-gray-600 hover:underline hover:cursor-pointer'>Comment {numberComment}</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className='text-center'>Comments</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2 w-full">
                            <ScrollArea className="h-96 w-full rounded-md border">
                                <div className="p-4 space-y-2">
                                    {
                                        (comments.length == 0) ? <Error title='not found comments' isCentered={true} /> : (
                                            comments.map((comment) => {
                                                console.log(comment);
                                                return (
                                                    <CardComment key={comment.id} AuthorId={comment.authorId} AuthorImage={comment.user.image} AuthorName={comment.user.name} CommentCreatedAt={comment.createdAt} Content={comment.content} commentId={comment.id} />
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