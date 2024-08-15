import SignupForm from '@/components/forms/SignupForm'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <section className='w-full h-full flex justify-center items-center'>
            <SignupForm />
        </section>
    )
}