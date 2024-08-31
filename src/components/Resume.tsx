import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Image3 from "@/constants/Illustration3.svg"
import Link from 'next/link'

type Props = {}

export default function Resume({ }: Props) {
    return (
        <section>
            <div className='md:flex md:justify-between md:items-center md:mx-20 mt-8'>
                <div className='text-center md:text-left p-4 space-y-4'>
                    <h1 className='font-bold text-2xl dark:text-white text-center md:text-left'>
                        Explore Our <br /> Technical Courses <br /> and Tutorials
                    </h1>
                    <p className='dark:text-white md:w-[500px]'>
                        Discover a wide range of technical courses and tutorials designed to help you build and advance your skills in various fields. Learn from industry experts and stay ahead in your career.
                    </p>
                    <Link href={`/courses`}>
                        <Button variant="default" className='border-green-500 mt-4'>
                            Explore Courses
                        </Button>
                    </Link>
                </div>
                <div className='flex justify-center'>
                    <Image 
                        src={Image3} 
                        alt="Technical Courses Overview" 
                        className='w-full max-w-md'
                        layout="intrinsic"
                    />
                </div>
            </div>
        </section>
    )
}
