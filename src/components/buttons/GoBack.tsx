"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'


type Props = {
    className?: string
}

export default function GoBack({ className }: Props) {
    const { back } = useRouter()
    return (
        <Button onClick={() => { back() }} variant="default" className={cn(className, "")}>Go Back</Button>
    )
}