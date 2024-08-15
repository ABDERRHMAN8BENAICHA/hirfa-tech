import React from 'react'
import { Button } from '@/components/ui/button'
import { FooterItem } from '@/const'
import FooterSection from './FooterSection'

type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className='bg-green-500 text-center pt-10 mt-10'>
            <div className='space-y-4'>
                <h1 className='text-2xl md:text-5xl font-bold'>Whats next</h1>
                <p className='px-4 md:mx-auto md:w-[500px]'>
                    Submit better job app — IOX faster. A1 cover letter
                    generator, resume keyword checkerr outreach message
                    writer, and more. Powered by GPT
                </p>
                <Button variant="secondary">Try For Free</Button>
            </div>
            <div>
                <footer className="bg-green-500 py-12">
                    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center md:text-left">
                        {FooterItem.map((section, index) => (
                            <FooterSection key={index} {...section} />
                        ))}
                    </div>
                    <div className="text-center text-gray-800 mt-8">
                        &copy; 2024 Your Company. All rights reserved.
                    </div>
                </footer>
            </div>
            <div></div>
        </footer>
    )
}