import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LuMenu } from 'react-icons/lu'
import Logo from './Logo'
import { NavItem } from '@/constants'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './ui/button'
import { IoIosSettings } from 'react-icons/io'
import ModeToggle from './ModeToggle'

type Props = {}

export default function NavBarMob({ }: Props) {
    const path = usePathname();
    const session = useSession();
    const user = session.data?.user;
    return (
        <div className='md:hidden'>
            <Sheet>
                <SheetTrigger asChild>
                    {/* <Button variant="outline">Open</Button> */}
                    <LuMenu className='w-8 h-8 m-2' />
                </SheetTrigger>

                <SheetContent>
                    <SheetHeader>
                        <Logo />
                    </SheetHeader>
                    <ul className='flex flex-col justify-center items-start space-y-4 text-left mt-4'>
                        {
                            NavItem.map((item) => {
                                return <li className={`hover:text-green-500 md:font-bold md:text-lg ${(path == item.link) ? "text-green-500" : ""}`} key={item.link}><Link href={`${item.link}`}>{item.name}</Link></li>
                            })
                        }
                    </ul>
                    <hr className='mt-4' />
                    <div className='flex justify-center items-center space-x-2 p-4 '>
                        {!session.data?.user ? (
                            <>
                                <Button className='border-green-400' variant="outline"><Link href={"/login"}>Sign Up</Link></Button>
                                <Button variant="default">Get Started</Button>
                            </>
                        ) : (
                            <Link href={"/profile"} >
                                <Button variant="default">
                                    <IoIosSettings className='mr-1 h-4 w-4' />
                                    Dashboard
                                </Button>
                            </Link>
                        )}
                        <div>
                            <ModeToggle />
                        </div>
                    </div>
                </SheetContent>
        </Sheet>
        </div >
    )
}