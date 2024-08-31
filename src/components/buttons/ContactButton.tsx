import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import the WhatsApp icon
import { IoLogoWhatsapp } from 'react-icons/io'; // Import the WhatsApp icon for the Button component
import { Button } from '../ui/button';
import Link from 'next/link';

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

const ContactButton = ({ courseId, userId, courseTitle, courseDescription, courseImage, coursePrice, courseDiscount, courseNumberOfStars }: Props) => {
    // الرسالة المخصصة
    const message = `مرحبًا، أود التحدث بخصوص الكورس.\n*معرف المستخدم:* ${userId}\n*عنوان الكورس:* ${courseTitle}\n*وصف الكورس:* ${courseDescription}\n*سعر الكورس:* ${coursePrice} \n*الخصم:* ${courseDiscount ? courseDiscount : 'لا يوجد'}\n*عدد النجوم:* ${courseNumberOfStars ? courseNumberOfStars : 'غير متوفر'}.`;

    // ترميز الرسالة لتكون جاهزة للإرسال عبر الرابط
    const encodedMessage = encodeURIComponent(message);

    // رابط WhatsApp مع الرسالة المخصصة
    const whatsappLink = `https://wa.me/213659608046?text=${encodedMessage}`;

    return (
        <div className="flex items-center space-x-4">
            <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
            >
                <Button className="w-40 flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded space-x-4">
                    <span>Buy</span>
                    <IoLogoWhatsapp className='w-[20px] h-[20px]' />
                </Button>
            </Link>
        </div>
    );
};

export default ContactButton;
