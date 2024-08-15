import Image from 'next/image'
import React from 'react'
import Hero from "@/const/hero.svg"

type Props = {}

export default function View({ }: Props) {
    return (
        <section className='md:container px-2 mt-10'>
            <div className='relative bg-green-500 w-full h-full rounded-t-lg space-y-6 pt-4 px-4 text-center'>
                <h1 className='text-2xl md:text-3xl font-bold text-black dark:text-white'>
                    Submit Better job <br /> applications
                </h1>
                <h1 className='text-7xl md:text-9xl font-bold text-black dark:text-white'>
                    1Ox faster
                </h1>
                <p className='text-black dark:text-white'>
                    AI cover letter generator, resume keyword checker, outreach
                    <br />
                    message writer, and more. by GPT
                </p>
                <div className='relative'>
                    <Image src={Hero} alt='image' className='w-full h-auto rounded-b-lg' />
                    <div className='absolute z-50 w-full h-[130px] md:h-[300px] bg-gradient-to-t from-green-800 bottom-0 md:bottom-[0px]' />
                </div>
            </div>
            <div>
            </div>
        </section>
    )
}