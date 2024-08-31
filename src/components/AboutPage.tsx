import { aboutContent } from '@/constants/index';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import Heding from './Heding';

const AboutPage = () => {
    return (
        <div className="container mx-auto p-8">
            <div className='p-4'>
                <Heding title={`${aboutContent.title}`} />
                <p className="mb-8">{aboutContent.description}</p>
                <Heding title='Our Team' isCentered={true} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-auto ">
                {aboutContent.team.map((member) => (
                    <div key={member.name} className=" p-4 rounded-lg shadow-md transition bg-green-400 ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-green-500 duration-300">
                        <Image width={200} height={200} src={member.image} alt={member.name} className="w-24 h-24 rounded-full mb-4 mx-auto" />
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-gray-500">{member.role}</p>
                        <p className="mt-2">{member.bio}</p>
                        <div className="flex justify-center mt-4 space-x-4 text-white">
                            <Link href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={24} />
                            </Link>
                            <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={24} />
                            </Link>
                            <Link href={member.social.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub size={24} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
