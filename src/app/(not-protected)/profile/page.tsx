import { auth } from '@/auth'
import Heding from '@/components/Heding'
import ProfilePage from '@/components/ProfilePage'
import React from 'react'
import { Course, courseColumns } from "./columns"
import { DataTable } from "./data-table"
import ProtectedAdmin from '@/components/ProtectedAdmin'
import MyCourses from '@/components/MyCourses'

type Props = {}

export default async function page({ }: Props) {
    const session = await auth()
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`).then((res) =>
        res.json()
    )
    return (
        <section>
            <Heding title={`Welcome, ${session?.user?.name}`} isCentered={true} />
            <ProfilePage />
            <ProtectedAdmin>
                <Heding title={`My Courses :`} isCentered={false} />
                <div className="container mx-auto py-10">
                    <DataTable columns={courseColumns} data={data} />
                </div>
            </ProtectedAdmin>
            <section>
                <Heding title={`My Courses :`} isCentered={false} />
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MyCourses id={session?.user.id} />
                </div>
            </section>
        </section>
    )
}