"use client"
import React, { useState } from 'react'
import { MdOutlinePostAdd } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
import { Progress } from '@/components/progress';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { IoMdCloudUpload } from 'react-icons/io';
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { LucideSend } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { API_URL } from '@/const';
type Props = {}

export default function AddPost({ }: Props) {
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [progress, setProgress] = useState(0);
    const [isToastShown, setIsToastShown] = useState<boolean>(false);
    const { push } = useRouter();
    const { data: session } = useSession();
    const user = {
        name: session?.user?.name,
        id: session?.user?.id,
        email: session?.user?.email,
        profileImage: session?.user?.image,
    };
    console.log(user);
    
    const FormSchema = z.object({
        content: z
            .string()
            .min(3, {
                message: "Content must be at least 3 characters."
            })
            .max(250, {
                message: "Content must not be longer than 160 characters."
            }),
        image: z
            .string().optional(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: "",
            image: "",
        },
    })
    if (progress == 100 && !isToastShown) {
        toast({
            variant: "default",
            description: "Upload complete!",
        })
        setIsToastShown(true);
    }
    function onSubmit(data: z.infer<typeof FormSchema>) {
        fetch(`${API_URL}/posts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content : data.content , image: imageUrl, authorId: user.id
            })
        }).then((res) => res.json()).then((newData) => {
            console.log(newData);
            setLoading(false)
            if (newData.ok == true) {
                toast({
                    variant: "default",
                    description: newData.message,
                })
                push("/profile")
            } else {
                toast({
                    variant: "destructive",
                    description: newData.message,
                })
            }
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Post Error",
                description: "There was an error while attempting to post your content. Please try again later.",
            });
        })
    }
    return (
        <div className='container flex justify-center items-center w-full '>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="image">Uplode Image</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-center'>Add Post </CardTitle>
                            <CardDescription className='text-center'>
                                Change your password here. After saving, youll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <div className="px-4">
                            <Form  {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="any think"
                                                        className="resize-none w-full h-40"
                                                        {...field}
                                                        disabled={loading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <CardFooter>
                                        <Button disabled={loading} type='submit' className='flex justify-center items-center space-x-2 w-full'>
                                            <h1>Post</h1>
                                            <LucideSend className='w-5 h-5' />
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="image">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-center'>Uplode Image</CardTitle>
                            <CardDescription className='text-center'>
                                Change your password here. After saving, youll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* start select image */}
                            <div className="w-full justify-center items-center space-y-6">
                                <SingleImageDropzone
                                    value={file}
                                    className='w-full -ml-4'
                                    onChange={(file) => {
                                        setFile(file);
                                    }}
                                />
                                <Progress value={progress} />
                                <Button
                                    variant="default"
                                    className="flex justify-center items-center space-x-4 w-full"
                                    onClick={async () => {
                                        if (file) {
                                            const res = await edgestore.publicFiles.upload({
                                                file,
                                                onProgressChange: (progress) => {
                                                    setProgress(progress);
                                                },
                                            });
                                            console.log(res);
                                            setImageUrl(res.url)
                                        }
                                    }}
                                >
                                    <h1>Upload</h1>
                                    <IoMdCloudUpload className='w-5 h-5' />
                                </Button>
                            </div>
                            {/* end select image */}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}




