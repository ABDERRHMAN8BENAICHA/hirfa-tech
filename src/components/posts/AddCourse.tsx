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
import { API_URL } from '@/constants';
import { Switch } from '../ui/switch';
type Props = {}

export default function AddCourse({ }: Props) {
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [progress, setProgress] = useState(0);
    const [isToastShown, setIsToastShown] = useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
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
        title: z
            .string()
            .min(3, {
                message: "Title must be at least 3 characters."
            })
            .max(250, {
                message: "Title must not be longer than 250 characters."
            }),
        description: z
            .string()
            .min(3, {
                message: "Description must be at least 3 characters."
            })
            .max(250, {
                message: "Description must not be longer than 250 characters."
            }),
        price: z
            .coerce
            .number()
            .min(0, {
                message: "Price must be a positive number."
            }),
        discount: z
            .coerce
            .number()
            .min(0, {
                message: "Discount must be a positive number."
            }).max(100, {
                message: "Discount must not be longer than 100."
            }),
        numberOfStars: z
            .coerce
            .number()
            .min(1, {
                message: "Number of stars must be at least 1."
            })
            .max(5, {
                message: "Number of stars must be at most 5."
            }),
        published: z.boolean().default(false),
        isFree: z.boolean().default(false),
        image: z.string().optional(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            discount: 0,
            numberOfStars: 1,
            published: false,
            isFree: false,
            image: "",
        },
    });

    if (progress == 100 && !isToastShown) {
        toast({
            variant: "default",
            description: "Upload complete!",
        })
        setIsToastShown(true);
    }
    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (imageUrl === "") {
            toast({
                variant: "destructive",
                title: "Post Error",
                description: "There was an error while attempting to post your content. Please try again later.",
            });
            return null;
        }
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image: imageUrl,
                title: data.title,
                description: data.description,
                price: data.price,
                discount: data.discount,
                numberOfStars: data.numberOfStars,
                published: data.published,
                isFree: data.isFree,
            })
        }).then((res) => res.json()).then((newData) => {
            setLoading(false)
            push("/profile")
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Post Error",
                description: "There was an error while attempting to post your content. Please try again later.",
            });
        })
    }
    const handleSwitchChange = () => {
        setIsEnabled(prevState => !prevState);
    };
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
                            <CardTitle className='text-center'>Add Course </CardTitle>
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
                                                        placeholder="Course Title"
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
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Course Description"
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
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Course Price"
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
                                        name="discount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Discount</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Discount Percentage"
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
                                        name="numberOfStars"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number of Stars</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Number of Stars"
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
                                        name="published"
                                        render={({ field }) => (
                                            <FormItem className='flex space-x-4 items-center'>
                                                <FormLabel>Published</FormLabel>
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


