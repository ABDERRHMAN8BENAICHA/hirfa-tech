import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default async function layout({ children }: Props) {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    )
}