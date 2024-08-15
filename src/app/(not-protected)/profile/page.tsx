import { auth } from '@/auth'
import Heding from '@/components/Heding'
import ProfilePage from '@/components/ProfilePage'
import React from 'react'

type Props = {}

export default async function page({ }: Props) {
    const session = await auth()

    return (
        <section>
            <Heding title={`Welcome, ${session?.user?.name}`} isCentered={true} />
            <ProfilePage />
            {
                session?.user?.role === "ADMIN" && (
                    <Heding title={`My Courses :`} isCentered={false} />
                )
            }
        </section>
    )
}