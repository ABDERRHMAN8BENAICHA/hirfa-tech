import React from 'react'
import { Button } from "@/components/ui/button"
import { HeroCardInfo } from '@/const'
import Card from "@/components/Card"
import { Input } from '@/components/ui/input'
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Link from 'next/link'

type Props = {}

export default function Hero({ }: Props) {
    return (
        <section className='w-full h-full flex flex-col justify-center items-center mt-10 text-center space-y-4'>
            <div>
                <h1 className=' text-green-400 font-semibold text-3xl md:text-6xl'>Win your dream job</h1>
                <br />
                <h1 className='font-semibold text-3xl md:text-6xl'>with PostJob</h1>
            </div>
            <p className='md:w-[400px] text-gray-400'>
                Submit better job app — IOX faster. A1 cover letter
                generator, resume keyword checker, outreach message
                writer, and more. Powered by GPT
            </p>
            <div className='flex flex-col justify-center items-center md:flex-row space-y-4 space-x-2 p-4 '>
                <Input type="email" className='md:w-[300px] mt-4' placeholder="Your Email" />
                <Link href={`/signin`}>
                    <Button>Start For Free</Button>
                </Link>
            </div>
            <div className='p-4'>
                <MdOutlineKeyboardDoubleArrowDown className='font-bold text-green-500 w-20 h-20  animate-bounce ' />
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-10 p-4'>
                {
                    HeroCardInfo.map((item) => {
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