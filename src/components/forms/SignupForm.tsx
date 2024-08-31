"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import SingnInGoogle from "@/components/buttons/SingnInGoogle"
import Link from "next/link"
import SingnInGithub from "@/components/buttons/SingnInGithub"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEdgeStore } from "@/lib/edgestore"
import { SingleImageDropzone } from "@/components/SingleImageDropzone"
import { Progress } from "@/components/progress"
import { API_URL } from "@/constants"



export default function SignupForm() {
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [progress, setProgress] = useState(0);

    const { push } = useRouter()
    const FormSchema = z.object({
        name: z.string().min(3, {
            message: "Name must be at least 3 characters long."
        }).max(20, {
            message: "Name must be at most 20 characters long."
        }),
        username: z.string().min(3, {
            message: "User Name must be at least 3 characters long."
        }).max(20, {
            message: "User Name must be at most 20 characters long."
        }),
        email: z.string().email({
            message: "Please enter a valid email address."
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters long."
        }).max(20, {
            message: "Password must be at most 20 characters long."
        }),
        phone: z.string().min(10, {
            message: "Phone must be at least 10 characters long."
        }).max(10, {
            message: "Phone must be at most 10 characters long."
        }),
        address: z.string().min(10, {
            message: "Address must be at least 10 characters long."
        }).max(100, {
            message: "Address must be at most 100 characters long."
        }),
        image: z.string()
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            image: "",
        },
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (imageUrl.length <= 0) {
            toast({
                variant: "destructive",
                description: "Please upload an image",
            })
            return null
        }
        setLoading(true)
        fetch(`/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data, image: imageUrl
            })
        }).then((res) => res.json()).then((newData) => {
            console.log(newData);
            setLoading(false)
            if (newData.ok == true) {
                toast({
                    variant: "default",
                    description: newData.message,
                })
                push("/login")
            } else {
                toast({
                    variant: "destructive",
                    description: newData.message,
                })
            }
        }).catch((error) => {
            toast({
                variant: "destructive",
                description: error.message,
            })
        })
    }
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-center">Signup</CardTitle>
                <CardDescription> Please enter your email and password to signup</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full justify-center items-center space-y-4">
                    <SingleImageDropzone
                        width={200}
                        height={200}
                        value={file}
                        onChange={(file) => {
                            setFile(file);
                        }}
                    />
                    <Progress value={progress} />
                    <Button
                        className="md:ml-28 ml-20"
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
                        Upload
                    </Button>
                </div>
                {/* end edgestor */}
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl >
                                        <Input placeholder="abderrhmane" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl >
                                        <Input placeholder="7dx.d" disabled={loading}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl >
                                        <Input placeholder="user@gmail.com" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="06********" type="number" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="algeria eloude" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} className="w-full" type="submit">Signin</Button>
                    </form>
                    <div>
                        <Button disabled={loading} variant="link">
                            <Link className="text-blue-500" href={"/login"}>Login</Link>
                        </Button>
                    </div>
                    <div className="flex justify-center items-center gap-4 w-full">
                        <SingnInGoogle isloading={loading} />
                        <SingnInGithub isloading={loading} />
                    </div>
                </Form>
            </CardContent>
        </Card>
    )
}
