"use client"
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Logout from './buttons/logout';
import { Button } from '@/components/ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { FaRegEdit } from 'react-icons/fa';
import AddPost from './posts/AddPost';
import { MdOutlinePostAdd } from 'react-icons/md';
import ActionProfile from './buttons/ActionProfile';
const ProfilePage = () => {
    const { data: session } = useSession();

    const user = {
        name: session?.user?.name || 'User Name',
        email: session?.user?.email || 'user@example.com',
        profileImage: session?.user?.image,
        id: session?.user?.id,
        role: session?.user?.role || "USER"
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-green-500 p-4 rounded-lg shadow-md max-w-md mx-auto mt-8">
                <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24 ">
                        <Avatar className='w-20 h-20'>
                            <AvatarImage src={user.profileImage} className='w-full h-full' alt={`${user.name}`} />
                            <AvatarFallback className='text-4xl'>
                                {
                                    user.name[1] + user.name[2]
                                }
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-gray-700">{user.email}</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                    <ActionProfile role={user.role}/>
                    <Logout />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
