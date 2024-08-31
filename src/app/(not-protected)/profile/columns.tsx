"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"


export type Course = {
    id: string
    title: string
    description?: string
    image?: string
    price: number
    discount?: number
    numberOfStars?: number
    published: boolean
    isFree: boolean
    createdAt: string
}



export const courseColumns: ColumnDef<Course | any>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "discount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Discount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "numberOfStars",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rating
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "published",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Published
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "isFree",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Free
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const createdAt = new Date(row.getValue("createdAt"))

            const day = createdAt.getDate()
            const month = createdAt.toLocaleString("en-US", { month: "short" })
            const year = createdAt.getFullYear()
            const time = createdAt.toLocaleTimeString("en-US")

            const formattedDate = `${day}, ${month}, ${year}, ${time}`

            return <div className="text-right font-medium">{formattedDate}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const course = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(course.id)}
                        >
                            Copy Course ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/lesson?idCourse=${course.id}`}>Lessons</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/course-users?idCourse=${course.id}`}>Users</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={`/updete-course/${course.id}`}>UPDETE</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            deleteCourse(course.id)
                        }}>DELETE</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]



export async function deleteCourse(courseId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete course');
        }

        // Optionally, refresh the data or provide feedback
        console.log('Course deleted successfully');
        // You might want to trigger a re-fetch of the course data or update local state here

    } catch (error) {
        console.error('Error deleting course:', error);
        // Handle error appropriately, e.g., show an alert to the user
    }
}