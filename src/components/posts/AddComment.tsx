"use client"
import React, { useState } from 'react'
import { MdOutlineComment } from 'react-icons/md'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/const'
type Props = {
    postId: string | undefined,
    authorId: string | undefined
}

export default function AddComment({ postId, authorId }: Props) {
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();


    const FormSchema = z.object({
        comment: z
            .string()
            .min(10, {
                message: "Comment must be at least 10 characters.",
            })
            .max(160, {
                message: "Comment must not be longer than 30 characters.",
            }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        fetch(`${API_URL}/comments/create?id=${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: data.comment, authorId
            })
        }).then((res) => res.json()).then((newData) => {
            console.log(newData);
            setLoading(false)
            if (newData.ok == true) {
                toast({
                    variant: "default",
                    description: newData.message,
                })
                router.refresh()
            } else {
                toast({
                    variant: "destructive",
                    description: newData.message,
                })
            }
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Comment Error",
                description: "There was an error while attempting to Comment your content. Please try again later.",
            });
        })
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>
                    <MdOutlineComment className='w-6 h-6 cursor-pointer' />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add Your Comment</DrawerTitle>
                        <DrawerDescription>Tell us what you think.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Form  {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="any think"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DrawerFooter>
                                    <Button type='submit'>Add Comment</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </form>
                        </Form>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}