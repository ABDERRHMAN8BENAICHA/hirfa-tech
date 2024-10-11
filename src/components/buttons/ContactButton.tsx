import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io'; // Import the WhatsApp icon for the Button component
import { Button } from '../ui/button';
import Link from 'next/link';
import { auth } from '@/auth'

type Props = {
    courseId: string;
    userId: string | undefined;
    courseTitle: string;
    courseDescription: string | null;
    courseImage: string | null;
    coursePrice: number;
    courseDiscount: number | null;
    courseNumberOfStars: number | null;
};

const ContactButton = async ({ courseId, userId, courseTitle, courseDescription, courseImage, coursePrice, courseDiscount, courseNumberOfStars }: Props) => {
    // Get the session outside of the return
    const session = await auth();

    // الرسالة المخصصة
    const message = `مرحبًا، أود التحدث بخصوص الكورس.\n*معرف المستخدم:* ${userId}\n*عنوان الكورس:* ${courseTitle}\n*وصف الكورس:* ${courseDescription}\n*سعر الكورس:* ${coursePrice} \n*الخصم:* ${courseDiscount ? courseDiscount : 'لا يوجد'}\n*عدد النجوم:* ${courseNumberOfStars ? courseNumberOfStars : 'غير متوفر'}.`;

    // ترميز الرسالة لتكون جاهزة للإرسال عبر الرابط
    const encodedMessage = encodeURIComponent(message);

    // رابط WhatsApp مع الرسالة المخصصة
    const whatsappLink = `https://wa.me/213659608046?text=${encodedMessage}`;

    return (
        <div className="flex items-center space-x-4">
            {session?.user ? (
                <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button className="w-40 flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded space-x-4">
                        <span>Buy</span>
                        <IoLogoWhatsapp className='w-[20px] h-[20px]' />
                    </Button>
                </Link>
            ) : (
                <Link href="/login">
                    <Button className="w-40 flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">
                        <span>Log In</span>
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default ContactButton;
