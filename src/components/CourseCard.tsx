import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { CiLocationArrow1 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

type Props = {
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

function calculateDiscount(price: number, discount: number): number {
    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    return finalPrice;
}


export default function CourseCard({ description, discount, id, image, isFree, numberOfStars, price, published, title }: Props) {
    return (
        <div>
            <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg  bg-green-400 shadow-md">
                <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href={`/courses/${id}`}>
                    <Image width={100} height={100} className="object-cover w-full h-full" src={image} alt={title} />
                    {
                        (!isFree) && (
                            (discount == 0) ? null : (
                                <span className="absolute top-0 left-0 m-2 rounded-full dark:bg-black bg-white px-2 text-center text-sm font-medium dark:text-white text-black">{discount}% OFF</span>
                            )
                        )
                    }
                </Link>
                <div className="mt-4 px-5 pb-5">
                    <Link href="#">
                        <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
                    </Link>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-3xl font-bold text-slate-900">
                                ${
                                    (isFree) ? 0 : calculateDiscount(price, discount)
                                }
                            </span>
                            {
                                (!isFree) && ((discount == 0) ? null : (
                                    <span className="text-sm text-slate-900 line-through">${price}</span>
                                ))
                            }
                            {
                                (isFree) && (
                                    <span className="text-sm text-slate-900">FREE</span>
                                )
                            }
                        </p>
                        <div className="flex items-center">
                            {
                                Array(numberOfStars).fill(0).map((_, index) => (
                                    <FaStar key={index} className='text-yellow-400 w-[20px] h-[20px]' />
                                ))
                            }
                            <span className="mr-2 ml-3 rounded bg-yellow-400 px-2.5 py-0.5 text-xs font-semibold">{numberOfStars}</span>
                        </div>
                    </div>
                    <Link href={`courses/${id}`} className="">
                        <Button className='w-full space-x-2' variant="outline">
                            <span> learn more </span>
                            <CiLocationArrow1 className='w-[20px] h-[20px] font-bold' />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}