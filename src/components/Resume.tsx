import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import Image3 from "@/const/Illustration3.svg"
import Link from 'next/link'
type Props = {}

export default function Resume({ }: Props) {
    return (
        <section>
            <div className='md:flex md:justify-between md:items-center md:mx-20 mt-8'>
                <div className='text-center md:text-left p-4 space-y-4'>
                    <h1 className='font-bold text-2xl dark:text-white text-center md:text-left'>Free resume design <br />    templates</h1>
                    <p className='dark:text-white md:w-[500px]'>By following these design tips, you can create a professional and effective resume that will help you stand out to recruiters and hiring managers.</p>
                    <Link href={`/signin`}>
                        <Button variant="default" className='border-green-500' >Create an Account</Button>
                    </Link>
                </div>
                <div>
                    <Image src={Image3} alt="image" className="" />
                </div>
            </div>
        </section>
    )
}