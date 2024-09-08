
import { auth } from '@/auth';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { redirect } from 'next/navigation';
import React from 'react';
import { useToast } from '@/components/ui/use-toast'; // Make sure you have a useToast hook or utility

type Props = {
    children: React.ReactNode,
    params: {
        id: string,
    },
}

export default async function Layout({ children, params }: Props) {
    const { id } = params;
    const session = await auth();
    const userId = session?.user.id;
    const { toast } = useToast();

    try {
        // Call the API route to fetch users who have access to the course
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
            method: 'GET',
        });

        if (!res.ok) {
            toast({
                title: "Error Occurred",
                description: "Failed to retrieve data. Please try again later.",
            });
            redirect("/");
            return;
        }

        const users = await res.json();

        // Check if the current user is in the list of users who have access
        const hasAccess = users.some((user: { id: string }) => user.id === userId);

        if (!hasAccess) {
            // Show a toast notification if the user doesn't have access
            toast({
                title: "Access Denied",
                description: "You do not have permission to access this course.",
            });
            redirect('/');
            return;
        }

        return (
            <div>
                <NavBar />
                {children}
                <Footer />
            </div>
        );
    } catch (error) {
        console.error(error);

        toast({
            title: "Error Occurred",
            description: "Failed to retrieve data. Please try again later.",
        });
        redirect('/');
    }
}

