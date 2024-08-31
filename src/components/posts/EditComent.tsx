// "use client"
// import React, { useState } from 'react'
// import { MdOutlineComment } from 'react-icons/md'

// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"


// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
// import { Button } from '../ui/button'
// import { useRouter } from 'next/navigation'
// import { API_URL } from '@/const'
// import { FaRegEdit } from 'react-icons/fa'
// type Props = {
//     commentId: string;
// }

// export default function EditComent({ commentId }: Props) {
//     const [comment, setComment] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const router = useRouter();


//     const FormSchema = z.object({
//         comment: z
//             .string()
//             .min(10, {
//                 message: "Comment must be at least 10 characters.",
//             })
//             .max(160, {
//                 message: "Comment must not be longer than 30 characters.",
//             }),
//     })

//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//     })

//     function onSubmit(data: z.infer<typeof FormSchema>) {
//         fetch(`${API_URL}/comments/updete?id=${commentId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 content: "",
//             })
//         }).then((res) => res.json()).then((newData) => {
//             console.log(newData);
//             setLoading(false)
//             if (newData.ok == true) {
//                 toast({
//                     variant: "default",
//                     description: newData.message,
//                 })
//                 router.refresh()
//             } else {
//                 toast({
//                     variant: "destructive",
//                     description: newData.message,
//                 })
//             }
//         }).catch((error) => {
//             toast({
//                 variant: "destructive",
//                 title: "Comment Error",
//                 description: "There was an error while attempting to Comment your content. Please try again later.",
//             });
//         })
//     }
//     const handleFetchComment = async () => {
//         console.log("fetch comment");

//     }
//     return (
//         <Drawer>
//             <DrawerTrigger  onClick={handleFetchComment}>
//                 <div className='flex justify-center items-center space-x-4 '>
//                     <h1> Edit Comment </h1>
//                     <FaRegEdit className='w-5 h-5' />
//                 </div>
//             </DrawerTrigger>
//             <DrawerContent>
//                 <div className="mx-auto w-full max-w-sm">
//                     <DrawerHeader>
//                         <DrawerTitle>Add Your Edit Comment</DrawerTitle>
//                         <DrawerDescription>Tell us what you think.</DrawerDescription>
//                     </DrawerHeader>
//                     <div className="p-4 pb-0">
//                         <Form  {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
//                                 <FormField
//                                     control={form.control}
//                                     name="comment"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Comment</FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     placeholder="any think"
//                                                     className="resize-none"
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <DrawerFooter>
//                                     <Button type='submit'>Edit Comment</Button>
//                                     <DrawerClose asChild>
//                                         <Button variant="outline">Cancel</Button>
//                                     </DrawerClose>
//                                 </DrawerFooter>
//                             </form>
//                         </Form>
//                     </div>
//                 </div>
//             </DrawerContent>
//         </Drawer>
//     )
// }

"use client"
import React, { useEffect, useState } from 'react'
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
import { API_URL } from '@/constants'
import { FaRegEdit } from 'react-icons/fa'
import Error from '../Error'
import GoBack from '../buttons/GoBack'
import Heding from '../Heding'

type Props = {
    commentId: string;
}

export default function EditComent({ commentId }: Props) {
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const router = useRouter();

    const FormSchema = z.object({
        comment: z
            .string()
            .min(10, {
                message: "Comment must be at least 10 characters.",
            })
            .max(160, {
                message: "Comment must not be longer than 160 characters.",
            }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    useEffect(() => {
        handleFetchComment();
    }, []);

    async function handleFetchComment() {
        fetch(`${API_URL}/comments/this?id=${commentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()).then((newData) => {
            setLoading(false)
            if (newData.ok) {
                setComment(newData.comment.content);
                // toast({
                //     variant: "default",
                //     description: newData.message,
                // })
            }
        })
        setIsDrawerOpen(true)
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        fetch(`${API_URL}/comments/updete?id=${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: data.comment,
            })
        }).then((res) => res.json()).then((newData) => {
            console.log(newData);
            setLoading(false)
            if (newData.ok) {
                toast({
                    variant: "default",
                    description: newData.message,
                })
                router.back();
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
                description: "There was an error while attempting to comment your content. Please try again later.",
            });
        })
    }

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <div>
                    <Heding title='Updete Comment' isCentered={true} />
                    <div className='w-full flex justify-center items-center'>
                        <GoBack />
                    </div>
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add Your Edit Comment</DrawerTitle>
                        <DrawerDescription>Tell us what you think.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    defaultValue={comment}
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
                                    <Button type='submit'>Edit Comment</Button>
                                    <DrawerClose asChild>
                                        <Button onClick={router.back} variant="outline">Cancel</Button>
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