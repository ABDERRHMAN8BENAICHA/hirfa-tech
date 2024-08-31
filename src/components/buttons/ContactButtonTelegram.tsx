import React from 'react';

type Props = {
    courseId: string;
    userId: string;
    coursePrice: number
}

const ContactButtonTelegram = ({ courseId, userId, coursePrice } : Props) => {
    // الرسالة المخصصة
    const message = `مرحبًا، أود التحدث بخصوص الكورس.
  \n- معرف الكورس: ${courseId}
  \n- معرف المستخدم: ${userId}
  \n- سعر الكورس: ${coursePrice} دينار.`;

    // ترميز الرسالة لتكون جاهزة للإرسال عبر الرابط
    const encodedMessage = encodeURIComponent(message);

    // معرف المستخدم في تلجرام (username) أو رقم الهاتف
    const telegramUsername = "ISLam5442"; // استبدل هذا باسم مستخدم تلجرام الخاص بك

    // رابط تلجرام مع الرسالة المخصصة
    const telegramLink = `https://t.me/${telegramUsername}?text=${encodedMessage}`;

    return (
        <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
            <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M20.7,3.3c-0.2-0.1-0.4-0.1-0.6,0l-17.3,7c-0.3,0.1-0.5,0.4-0.4,0.7l3.4,11.1c0.1,0.3,0.4,0.4,0.7,0.2 l3.6-2.5c0.2-0.1,0.5-0.1,0.7,0l4.7,3.2c0.3,0.2,0.7,0,0.9-0.3l5.7-10.1C21,3.6,21,3.5,20.7,3.3z M20.1,6.6l-5.5,9.7l-4.2-3L20.1,6.6z M3.9,10.5l10-4.1l-4.7,4.3l1.4,1.5L3.9,10.5z" />
            </svg>
            تحدث معنا على تلجرام
        </a>
    );
};

export default ContactButtonTelegram;
