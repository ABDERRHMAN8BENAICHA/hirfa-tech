"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Make sure this path is correct
import Link from "next/link";
import { CiLocationArrow1 } from "react-icons/ci";

type Course = {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
};

type MyCoursesProps = {
    id: string | undefined;
};

export default function MyCourses({ id }: MyCoursesProps) {
    const [courses, setCourses] = useState<Course[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}/profile`);
            const data = await response.json();
            if(data.ok){
                setCourses(data.courses);
            }
        };

        fetchCourses();
    }, [id]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <div key={course.id} className="relative m-10 flex max-w-xs flex-col overflow-hidden rounded-lg bg-green-400 shadow-md w-[400px] h-auto p-4">
                    <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                        <Image
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                            src={course.image}
                            alt={course.title}
                        />
                    </div>
                    <div className="mt-4 px-5 pb-5">
                        <Link href={`/view-course/${course.id}`}>
                            <h5 className="text-xl tracking-tight text-slate-900">{course.title}</h5>
                        </Link>
                    </div>
                    <Link href={`/view-course/${course.id}?userId=${id}`}>
                        <Button className="w-full space-x-2" variant="outline">
                            <span>Go to Course</span>
                            <CiLocationArrow1 className="w-[20px] h-[20px] font-bold" />
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
