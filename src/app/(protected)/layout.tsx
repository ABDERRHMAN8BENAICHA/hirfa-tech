import { auth } from '@/auth'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default async function layout({ children }: Props) {
    const session = await auth();
    if (!session?.user) {
        redirect("/")
    }
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    )
}