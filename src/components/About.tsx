import React from 'react'
import { Button } from '@/components/ui/button'
import Card from "@/components/Card"
import { AboutInfo } from '@/const'
import Link from 'next/link'
type Props = {}

export default function About({ }: Props) {
    return (
        <section className='mt-10'>
            <div className='text-center space-y-4 p-4'>
                <h1 className='font-bold text-2xl md:text-5xl'>Spend less time <br /> looking for work</h1>
                <p className='text-gray-500'>Welll help you through the hardest part of your job search.</p>
                <Link href={`/signin`} >
                    <Button className='border-green-400 mt-4' variant="outline">
                        <span> Create an Account</span>
                    </Button></Link>
            </div>
            <div className='flex flex-col flex-wrap md:flex-row justify-center items-center gap-10 p-4'>
                {
                    AboutInfo.map((item) => {
                        return (
                            <div key={item.content}>
                                <Card {...item} />
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}