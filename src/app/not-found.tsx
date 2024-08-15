import GoBack from '@/components/buttons/GoBack'
import Error from '@/components/Error'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'

type Props = {}

export default function notFound({ }: Props) {
    return (
        <div>
            <NavBar />
            <div className='flex flex-col space-y-4 justify-center items-center'>
                <Error title='this page is under construction' isCentered={true} />
                <GoBack />
            </div>
            <Footer />
        </div>
    )
}