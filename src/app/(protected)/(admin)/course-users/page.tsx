"use client"
import React, { useEffect, useState } from 'react'
import { User, userColumns } from "./columns"
import { DataTable } from "./data-table"
import ProtectedAdmin from '@/components/ProtectedAdmin'
import { useSearchParams } from 'next/navigation'

type Props = {}

export default function Page({ }: Props) {
    const searchParams = useSearchParams();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const courseId = searchParams.get('idCourse');

    useEffect(() => {
        async function fetchLessons() {
            if (!courseId) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${courseId}/`);

                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
                
            } finally {
                setLoading(false);
            }
        }

        fetchLessons();
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(users);
    
    return (
        <ProtectedAdmin>
            <div className="container mx-auto py-10">
                <DataTable columns={userColumns} data={users} />
            </div>
        </ProtectedAdmin>
    )
}