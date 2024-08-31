import ContactButton from '@/components/buttons/ContactButton'
import { Button } from '@/components/ui/button'
import { Course } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { auth } from '@/auth'
type Props = {
    params: {
        id: string,
    }
}

async function getCourse(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`)
    const data = await response.json()
    return data
}

export default async function page({ params }: Props) {
    const id = params.id;
    const course: Course = await getCourse(id);
    const session = await auth()
    return (
        <div>
            <div className="">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image width={200} height={200} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-xl" src={course.image!} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Course</h2>
                            <h1 className="text-black dark:text-white text-3xl title-font font-medium mb-1">{course.title}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    {
                                        [...Array(course.numberOfStars)].map((_, index) => (
                                            <svg key={index} aria-hidden="true" className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        ))
                                    }
                                </span>
                            </div>
                            <p className="leading-relaxed">{course.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            </div>
                            <div className="flex space-x-8">
                                <span className="title-font font-medium text-2xl text-green-500">${course.price}</span>
                                <ContactButton
                                    courseId={course.id}
                                    userId={session?.user.id}
                                    courseTitle={course.title}
                                    courseDescription={course.description}
                                    courseImage={course.image}
                                    coursePrice={course.price}
                                    courseDiscount={course.discount}
                                    courseNumberOfStars={course.numberOfStars}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}