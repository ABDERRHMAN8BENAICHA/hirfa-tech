import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <section className='w-full h-[500px] flex justify-center items-center'>
            <LoginForm />
        </section>
    )
}