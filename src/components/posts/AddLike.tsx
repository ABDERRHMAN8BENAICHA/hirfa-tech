"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { API_URL } from '@/constants'
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { toast } from "@/components/ui/use-toast"

type Props = {
    PostId: string;
    UserId?: string;
}

export default function AddLike({ PostId, UserId }: Props) {
    const [like, setLike] = useState<boolean>(false)
    const router = useRouter()
    useEffect(() => {
        fetch(`${API_URL}/likes/is-liked`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: PostId, userId: UserId,
            })
        }).then((res) => res.json()).then((newData) => {
            if (newData.ok == true) {
                setLike(newData.liked)
                console.log(newData.liked);
            }
        })
    }, [PostId, UserId])

    const handleLike = () => {
        fetch(`${API_URL}/likes/toggle-like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: PostId, userId: UserId,
            })
        }).then((res) => res.json()).then((newData) => {
            if (newData.ok == true) {
                setLike(newData.liked)
                console.log(newData.liked);
            }
        })
    }
    return (
        <div>
            <Button onClick={handleLike}>
                {(like == true) ? <FaHeart className={`w-6 h-6 cursor-pointer`} /> : <FaRegHeart className={`w-6 h-6 cursor-pointer`} />}
            </Button>
        </div>
    )
}