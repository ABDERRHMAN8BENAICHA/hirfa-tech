"use client"
import React from 'react'
import { useSession } from "next-auth/react"
type Props = {
    children: React.ReactNode
}

export default function ProtectedAdmin({ children }: Props) {
    const { data: session, status } = useSession()
    if (session?.user.role == "ADMIN") {
        return (
            <div>{children}</div>
        )
    }
    return null
}