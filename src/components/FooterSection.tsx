import React from 'react';
import { FooterItemType } from '@/types';
import FooterLink from './FooterLink';

const FooterSection: React.FC<FooterItemType> = ({ header, items }) => {
    return (
        <div className="mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{header}</h3>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <FooterLink key={index} {...item} />
                ))}
            </ul>
        </div>
    );
};

export default FooterSection;
