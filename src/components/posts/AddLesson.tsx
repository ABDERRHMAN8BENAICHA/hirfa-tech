"use client";
import React, { useState } from 'react';
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
} from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
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
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { LucideSend } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Switch } from '../ui/switch';
import { VideoDropzone } from '../VideoDropzone';

type Props = {
    courseId: string
};

export default function AddLesson({ courseId }: Props) {
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [isToastShown, setIsToastShown] = useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const { push } = useRouter();

    const FormSchema = z.object({
        title: z
            .string()
            .min(3, {
                message: "Title must be at least 3 characters."
            })
            .max(250, {
                message: "Title must not be longer than 250 characters."
            }),
        content: z
            .string()
            .optional(),
        videoUrl: z
            .string()
            .optional(),
        videoInfo: z
            .string()
            .optional(),
        courseId: z
            .string()
            .min(1, {
                message: "Course ID is required."
            }),
        isFree: z.boolean().default(false),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: "",
            videoUrl: "",
            videoInfo: "",
            courseId,
            isFree: false,
        },
    });

    if (progress === 100 && !isToastShown) {
        toast({
            variant: "default",
            description: "Upload complete!",
        });
        setIsToastShown(true);
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (videoUrl === "") {
            toast({
                variant: "destructive",
                title: "Post Error",
                description: "Please upload an image before submitting.",
            });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lessons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    content: data.content,
                    videoUrl: videoUrl,
                    videoInfo: data.videoInfo,
                    courseId: data.courseId,
                    isFree: data.isFree,
                }),
            });

            const newData = await res.json();
            setLoading(false);
            push("/profile");
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Post Error",
                description: "There was an error while attempting to post your content. Please try again later.",
            });
            setLoading(false);
        }
    }


    return (
        <div className='container flex justify-center items-center w-full'>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Lesson</TabsTrigger>
                    <TabsTrigger value="image">Upload Video</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-center'>Add Lesson</CardTitle>
                        </CardHeader>
                        <div className="px-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Lesson Title"
                                                        {...field}
                                                        disabled={loading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Lesson Content"
                                                        className="resize-none w-full h-40"
                                                        {...field}
                                                        disabled={loading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isFree"
                                        render={({ field }) => (
                                            <FormItem className='flex space-x-4 items-center'>
                                                <FormLabel>Free</FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <CardFooter>
                                        <Button disabled={loading} type='submit' className='flex justify-center items-center space-x-2 w-full'>
                                            <h1>Submit</h1>
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
                            <CardTitle className='text-center'>Upload Video</CardTitle> {/* تغيير النص */}
                            <CardDescription className='text-center'>
                                Upload your video here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="w-full justify-center items-center space-y-6">
                                <VideoDropzone
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
                                            setVideoUrl(res.url); 
                                        }
                                    }}
                                >
                                    <h1>Upload</h1>
                                    <IoMdCloudUpload className='w-5 h-5' />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
