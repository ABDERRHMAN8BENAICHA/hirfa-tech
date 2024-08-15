"use client"
import { NavItem } from '@/const'
import React from 'react'
import { Button } from './ui/button'
import ModeToggle from './ModeToggle'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { IoIosSettings } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import NavBarMob from './NavBarMob'
import Logo from './Logo'
type Props = {}

export default function NavBar({ }: Props) {
    const path = usePathname();
    const session = useSession();
    const user = session.data?.user;
    return (
        <nav className='flex md:flex-row justify-between items-center space-x-4 pt-0 space-y-4 px-2 '>
            <Logo />
            <ul className='flex justify-center items-center space-x-10'>
                {
                    NavItem.map((item) => {
                        return <li className={`hidden md:block hover:text-green-500 md:font-bold md:text-lg ${(path == item.link) ? "text-green-500" : ""}`} key={item.link}><Link href={`${item.link}`}>{item.name}</Link></li>
                    })
                }
            </ul>
            <div className='flex justify-center items-center space-x-2'>
                {!session.data?.user ? (
                    <>
                        <Button className='border-green-400 hidden md:block' variant="outline"><Link href={"/login"}>Sign Up</Link></Button>
                        <Button variant="default" className='hidden md:block'>Get Started</Button>
                    </>
                ) : (
                    <Link href={"/profile"} >
                        <Button variant="default" className='hidden md:flex'>
                            <IoIosSettings className='mr-1 h-4 w-4' />
                            Dashboard
                        </Button>
                    </Link>
                )}
                <div className='hidden md:block'>
                    <ModeToggle />
                </div>
            </div>
            <NavBarMob />
        </nav>
    )
}
