import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaRegEdit } from "react-icons/fa"
import { MdOutlinePostAdd } from "react-icons/md"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { auth } from "@/auth"
type Props = {
    role: string
}
export default async function ActionProfile({ role }: Props) {
    if (!(role === "ADMIN")) {
        return
    }
    return (
        <Button variant="outline">
            <Link href={`/create-course`} className='flex w-full justify-between items-center space-x-2'>
                <div>
                    <h1> Add Course </h1>
                </div>
                <div>
                    <MdOutlinePostAdd className='w-6 h-6' />
                </div>
            </Link>
        </Button>
    )
}
