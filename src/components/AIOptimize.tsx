import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Image1 from "@/constants/Illustration1.svg"
import Image2 from "@/constants/Illustration2.svg"

type Props = {}

export default function AIOptimize({ }: Props) {
    return (
        <section className='bg-green-400 space-y-8 py-8'>
            <div className='md:flex md:justify-between md:items-center md:mx-20'>
                <div className='text-center md:text-left p-4 space-y-4'>
                    <h1 className='font-bold text-2xl md:text-4xl text-black'>
                        Explore Our <br /> Technical Courses <br /> Powered by Experts
                    </h1>
                    <p className='text-black md:w-[500px]'>
                        Our platform offers a range of technical courses designed to help you advance your skills and career. Leverage expert insights and cutting-edge content to achieve your goals.
                    </p>
                    <Button variant="secondary">Browse Courses Now</Button>
                </div>
                <div className='flex justify-center'>
                    <Image 
                        src={Image1} 
                        alt="Technical Courses Overview" 
                        className='w-full max-w-md'
                        layout="intrinsic"
                    />
                </div>
            </div>
            <div className='md:flex md:justify-between md:items-center md:mx-20'>
                <div className='flex justify-center'>
                    <Image 
                        src={Image2} 
                        alt="Learn with Experts" 
                        className='w-full max-w-md'
                        layout="intrinsic"
                    />
                </div>
                <div className='text-center md:text-left p-4 space-y-4'>
                    <h1 className='font-bold text-2xl md:text-4xl text-black'>
                        Enhance Your Skills <br /> with Expert-Led Courses
                    </h1>
                    <p className='text-black md:w-[500px]'>
                        Our expert-led courses are designed to provide hands-on learning experiences and real-world knowledge. Get personalized guidance and achieve your career aspirations.
                    </p>
                    <Button variant="secondary">Start Learning Today</Button>
                </div>
            </div>
        </section>
    )
}
