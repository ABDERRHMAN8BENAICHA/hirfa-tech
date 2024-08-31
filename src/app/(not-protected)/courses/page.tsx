// // "use client"
// // import CourseCard from '@/components/CourseCard';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import React from 'react'
// // import { BiSearchAlt2 } from "react-icons/bi";

// // type Props = {}

// // type Course = {
// //     id: string,
// //     title: string,
// //     description: string,
// //     price: number,
// //     discount: number,
// //     numberOfStars: number,
// //     published: boolean,
// //     isFree: boolean,
// //     image: string,
// // }

// // async function getCourses() {
// //     const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`)
// //     const courses = await data.json()
// //     return courses
// // }

// // export default async function page({ }: Props) {
// //     const data = await getCourses()
// //     return (
// //         <div>
// //             <div className='m-auto w-full mt-8 flex gap-2 px-10'>
// //                 <Input type="email" placeholder="Serch" onChange={} />
// //                 <Button>
// //                     <BiSearchAlt2 size={20} />
// //                 </Button>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full -ml-4">
// //                 {
// //                     data
// //                         .map((course: Course) => (
// //                             <CourseCard key={course.id} {...course} />
// //                         ))
// //                 }
// //             </div>
// //         </div>
// //     )
// // }

// "use client";
// import CourseCard from '@/components/CourseCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import React, { useState } from 'react';
// import { BiSearchAlt2 } from "react-icons/bi";

// type Props = {}

// type Course = {
//     id: string,
//     title: string,
//     description: string,
//     price: number,
//     discount: number,
//     numberOfStars: number,
//     published: boolean,
//     isFree: boolean,
//     image: string,
// }

// async function getCourses() {
//     const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`);
//     const courses = await data.json();
//     return courses;
// }

// export default function Page({ }: Props) {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [courses, setCourses] = useState<Course[]>([]);

//     React.useEffect(() => {
//         async function fetchCourses() {
//             const data = await getCourses();
//             setCourses(data);
//         }

//         fetchCourses();
//     }, []);

//     const filteredCourses = courses.filter((course) =>
//         course.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div>
//             <div className='m-auto w-full mt-8 flex gap-2 px-10'>
//                 <Input
//                     type="text"
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Button>
//                     <BiSearchAlt2 size={20} />
//                 </Button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full -ml-4">
//                 {
//                     filteredCourses.map((course: Course) => (
//                         <CourseCard key={course.id} {...course} />
//                     ))
//                 }
//             </div>
//         </div>
//     );
// }

"use client";
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {}

type Course = {
    id: string,
    title: string,
    description: string,
    price: number,
    discount: number,
    numberOfStars: number,
    published: boolean,
    isFree: boolean,
    image: string,
}

async function getCourses() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`);
    const courses = await data.json();
    return courses;
}

export default function Page({ }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState<Course[]>([]);

    React.useEffect(() => {
        async function fetchCourses() {
            const data = await getCourses();
            setCourses(data);
        }

        fetchCourses();
    }, []);

    // Filter courses based on search term and whether they are published
    const filteredCourses = courses
        .filter((course) => course.published)
        .filter((course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div>
            <div className='m-auto w-full mt-8 flex gap-2 px-10'>
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button>
                    <BiSearchAlt2 size={20} />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full -ml-4">
                {
                    filteredCourses.map((course: Course) => (
                        <CourseCard key={course.id} {...course} />
                    ))
                }
            </div>
        </div>
    );
}