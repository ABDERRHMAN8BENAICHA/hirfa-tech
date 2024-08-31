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
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { API_URL } from "@/constants"
import { toast } from "@/components/ui/use-toast"
import { MdDeleteForever } from "react-icons/md"

type Props = {
    postId: string;
}
export default function ActionCard({ postId }: Props) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const handleDeleteComments = async () => {
        console.log(postId);
        fetch(`${API_URL}/posts/delete?id=${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()).then((newData) => {
            setLoading(false)
            if (newData.ok == true) {
                toast({
                    variant: "default",
                    description: newData.message,
                })
                router.refresh();
            } else {
                toast({
                    variant: "destructive",
                    description: newData.message,
                })
            }
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Comment Error",
                description: "There was an error while attempting to Comment your content. Please try again later.",
            });
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="secondary" className="className='flex justify-center items-center space-x-4 '">
                    <IoEllipsisVerticalSharp />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="w-[130px]">
                    <Link href={`/edit-post`} className='flex w-full justify-between items-center'>
                        <div>
                            <h1> Edit Post </h1>
                        </div>
                        <div>
                            <FaRegEdit className='w-5 h-5' />
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div onClick={handleDeleteComments} className='flex w-full justify-between items-center'>
                        <div>
                            <h1> Delete Post </h1>
                        </div>
                        <div>
                            <MdDeleteForever className='w-6 h-6' />
                        </div>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
