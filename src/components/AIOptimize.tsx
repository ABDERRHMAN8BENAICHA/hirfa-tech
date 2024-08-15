import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Image1 from "@/const/Illustration1.svg"
import Image2 from "@/const/Illustration2.svg"
type Props = {}

export default function AIOptimize({ }: Props) {
    return (
        <section className='bg-green-400 space-y-4'>
            <div className='md:flex md:justify-between md:items-center md:mx-20'>
                <div className='text-center md:text-left p-4 space-y-4'>
                    <h1 className='font-bold text-2xl text-black text-center md:text-left'>Free A1 cover letter <br /> generator powered <br /> by GPT</h1>
                    <p className='text-black md:w-[500px]'>A free A1 cover letter generator powered  by GPT is a tool that uses artificial intelligence and natural language processing to help job seekers create customized and effective cover letters.</p>
                    <Button variant="secondary" >Try For free Now</Button>
                </div>
                <div>
                    <Image src={Image1} alt="image" className="" />
                </div>
            </div>
            <div className='md:flex md:justify-between md:items-center md:mx-20'>
                <div>
                    <Image src={Image2} alt="image" className="" />
                </div>
                <div className='text-center md:text-left p-4 space-y-4'>
                    <h1 className='font-bold text-2xl text-black text-center md:text-left'>Optimize the <br /> keywords in your <br /> resume</h1>
                    <p className='text-black md:w-[500px]'>By optimizing keywords in your resume, you can increase your chances of getting noticed by recruiters and landing interviews for the jobs you want.</p>
                    <Button variant="secondary" >Optimize your Resume</Button>
                </div>
            </div>
        </section>
    )
}