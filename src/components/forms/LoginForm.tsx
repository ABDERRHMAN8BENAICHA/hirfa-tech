// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
// import SingnInGoogle from "../buttons/SingnInGoogle"

// import { signIn } from "next-auth/react"
// import Link from "next/link"
// import SingnInGithub from "../buttons/SingnInGithub"
// import { useState } from "react"


// export default function LoginForm() {
//     const [loading, setLoading] = useState<boolean>(false)
//     const FormSchema = z.object({
//         email: z.string().email({
//             message: "Please enter a valid email address.",
//         }),
//         password: z.string().min(8, {
//             message: "Password must be at least 8 characters long."
//         }).max(20, {
//             message: "Password must be at most 20 characters long."
//         })
//     })
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//             email: "",
//             password: ""
//         },
//     })

//     async function onSubmit(data: z.infer<typeof FormSchema>) {
//         try {
//             const lol = await signIn("credentials", data)
//             console.log(lol)
//         } catch (error) {
//             toast({
//                 variant: "destructive",
//                 title: "Error",
//             })
//         }
//     }
//     return (
//         <Card className="w-[350px]">
//             <CardHeader>
//                 <CardTitle className="text-center">Login</CardTitle>
//                 <CardDescription>Please enter your email and password to login</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem className="w-full">
//                                     <FormLabel>Email</FormLabel>
//                                     <FormControl >
//                                         <Input placeholder="user@gmail.com" disabled={loading} {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="********" type="password" disabled={loading} {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button className="w-full" type="submit">Login</Button>
//                     </form>
//                     <div>
//                         <Button variant="link">
//                             <Link className="text-blue-500" href={"/signin"}>Signin</Link>
//                         </Button>
//                     </div>
//                 </Form>
//                 <div className="flex justify-center items-center gap-4 w-full">
//                     <SingnInGoogle />
//                     <SingnInGithub />
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import SingnInGoogle from "../buttons/SingnInGoogle";
import SingnInGithub from "../buttons/SingnInGithub";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {push} = useRouter();
    const FormSchema = z.object({
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .max(20, { message: "Password must be at most 20 characters long." }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            setLoading(true);
            const response = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (!response?.error) {
                toast({
                    title: "Login success",
                    description: "You are now logged in.",
                });
                push("profile");
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Error",
                    description: response.error,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Login Error",
                description: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
                <CardDescription>
                    Please enter your email and password to login
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="user@gmail.com"
                                            disabled={loading}
                                            {...field}
                                        />
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
                                        <Input
                                            placeholder="********"
                                            type="password"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                    <div>
                        <Button variant="link">
                            <Link href={"/signin"} className="text-blue-500" >
                                Signin
                            </Link>
                        </Button>
                    </div>
                </Form>
                <div className="flex justify-center items-center gap-4 w-full">
                    <SingnInGoogle />
                    {/* <SingnInGithub /> */}
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
