import React from 'react';
import { FooterLink as FooterLinkType } from '@/types';

const FooterLink: React.FC<FooterLinkType> = ({ title, link }) => {
    return (
        <li>
            <a
                href={link}
                className="text-gray-900  hover:underline-offset-1 hover:underline transition-colors duration-200"
            >
                {title}
            </a>
        </li>
    );
};

export default FooterLink;
