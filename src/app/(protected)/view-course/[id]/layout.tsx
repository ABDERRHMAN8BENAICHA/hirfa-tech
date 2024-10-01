import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
    children: React.ReactNode;
    params: {
        id: string;
    };
};

export default async function Layout({ children, params }: Props) {
    const { id: courseId } = params;
    const session = await auth();
    const userId = session?.user.id;
    
    // If no user session is found, redirect to login
    if (!userId) {
        return redirect('/1');  // Adjust this route as necessary
    }

    // Fetch course access check
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/check-course`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseId,
            userId,
        }),
    });

    // If the fetch fails (server-side error), redirect or show an error
    if (!res.ok) {
        return redirect('/3');  // Adjust this route as necessary
    }

    // Parse response data
    const data = await res.json();
    const { ok } = data;

    // If the user doesn't have access to the course, redirect
    if (!ok) {
        return redirect('/2');  // Adjust this route as necessary
    }

    // If everything is good, render the children components
    return (
        <div>
            {children}
        </div>
    );
}
