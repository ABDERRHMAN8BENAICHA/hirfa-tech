import { AboutContent, AboutType, FooterItemType, HeroCardType, NavItemType } from "@/types";
import { FaFile } from "react-icons/fa6";
import { FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa'
import { BiBookContent } from 'react-icons/bi'
import { TbCertificate } from 'react-icons/tb'
import { RiSendPlaneFill } from "react-icons/ri";
import { IoGrid, IoMail } from "react-icons/io5";
import { LuCodesandbox, LuGitPullRequest } from "react-icons/lu";
export const SITE_URL = "http://localhost:3000/";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const NavItem: NavItemType[] = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'About',
        link: '/about',
    },
    {
        name: 'Contact',
        link: '/contact',
    },
    {
        name: 'Courses',
        link: '/courses',
    },
]

export const HeroCardInfo: HeroCardType[] = [
    {
        icon: FaLaptopCode,
        title: "Interactive Coding Labs",
        content: `Interactive Coding Labs provide hands-on coding exercises and projects. 
                Learn by doing and get real-time feedback to enhance your programming skills.`,
    },
    {
        icon: FaChalkboardTeacher,
        title: "Expert-Led Tutorials",
        content: `Expert-Led Tutorials feature in-depth lessons from industry professionals. 
                Gain insights and knowledge directly from experts in the field.`,
    },
    {
        icon: BiBookContent,
        title: "Comprehensive Learning Materials",
        content: `Comprehensive Learning Materials include ebooks, articles, and resources 
                  designed to support and enrich your technical education.`,
    },
]

export const AboutInfo: AboutType[] = [
    {
        icon: FaFile,
        title: "Cover Letters",
        content: `A cover letter is a document that accompanies a job application, 
        introducing the applicant to the employer and highlighting key aspects 
        of their qualifications and experiences.`,
    },
    {
        icon: IoMail,
        title: "Resignation Letters",
        content: `A resignation letter is a formal document an employee writes to 
        notify their employer of their decision to leave the company. It typically 
        includes the last working day and a brief reason for departure.`,
    },
    {
        icon: LuGitPullRequest,
        title: "Connection Requests",
        content: `A connection request is a message sent on professional networking 
        sites, like LinkedIn, to request a connection with another user. It’s 
        an essential tool for expanding your professional network.`,
    },
    {
        icon: RiSendPlaneFill,
        title: "Outreach Emails",
        content: `Outreach emails are messages sent by individuals or businesses 
        to introduce themselves, establish connections, or propose collaborations. 
        They are crucial for networking and business development.`,
    },
    {
        icon: IoGrid,
        title: "Resume Optimization",
        content: `Resume optimization involves tailoring a resume to improve its 
        effectiveness by using keywords and formatting techniques that align 
        with job descriptions and applicant tracking systems.`,
    },
    {
        icon: LuCodesandbox,
        title: "Resume Design",
        content: `Resume design focuses on the visual presentation of a resume, 
        ensuring it is aesthetically pleasing and easy to read. Good design 
        enhances readability and helps make a strong first impression.`,
    },
]

export const FooterItem: FooterItemType[] = [
    {
        header: "Platform",
        items: [
            {
                title: "Plans and Prices",
                link: "/pricing",
            },
            {
                title: "A1 Create Letters",
                link: "/#",
            },
            {
                title: "A1 Resume Checker",
                link: "/#"
            },
            {
                title: "Resume Templates",
                link: "/#"
            },
            {
                title: "Sell Templates",
                link: "/#"
            },
            {
                title: "Blog",
                link: "/blog"
            }
        ]
    },
    {
        header: "Features",
        items: [
            {
                title: "A1 Cover Letter Creator",
                link: "/#"
            },
            {
                title: "Optimizer Keywords Resume",
                link: "/#"
            },
            {
                title: "ATS Resume Checker",
                link: "/#"
            }
        ]
    },
    {
        header: "Resources",
        items: [
            {
                title: "4 A1 Tools for Applying a Job",
                link: "/#"
            },
            {
                title: "How to optimize Resume keywords",
                link: "/#"
            },
            {
                title: "Why you should use Chat GPT for create Resume",
                link: "/#"
            },
            {
                title: "What should you include in a Cover Letter",
                link: "/#"
            }
        ]
    },
    {
        header: "Support",
        items: [
            {
                title: "support@gmail.com",
                link: "/contact"
            },
            {
                title: "FAQ",
                link: "/faq"
            },
            {
                title: "Contact Us",
                link: "/contact"
            }
        ]
    },
    {
        header: "Company",
        items: [
            {
                title: "About Us",
                link: "/about"
            },
            {
                title: "Careers",
                link: "/careers"
            },
            {
                title: "Privacy Policy",
                link: "/privacy"
            },
            {
                title: "Terms of Service",
                link: "/terms"
            }
        ]
    },
    // {
    //     header: "Follow Us",
    //     items: [
    //         {
    //             title: "Facebook",
    //             link: "https://facebook.com"
    //         },
    //         {
    //             title: "Twitter",
    //             link: "https://twitter.com"
    //         },
    //         {
    //             title: "LinkedIn",
    //             link: "https://linkedin.com"
    //         },
    //         {
    //             title: "Instagram",
    //             link: "https://instagram.com"
    //         }
    //     ]
    // }
];


export const aboutContent: AboutContent = {
    title: "About Us",
    description: `
Welcome to TechCourses! Our mission is to provide a comprehensive platform for discovering and enrolling in technical courses. Whether you're looking to enhance your skills, switch careers, or dive into the tech world, we've got you covered. 

Our platform offers a range of features designed to streamline your learning journey:
- **Course Listings**: Explore a diverse array of technical courses, from coding and data science to cybersecurity and cloud computing.
- **Course Management**: Enroll in and manage your courses with ease, tracking your progress and accessing course materials in one place.
- **Instructor Interaction**: Engage with instructors directly to get the most out of your learning experience.
- **Learning Resources**: Access a wealth of resources, including tutorials, articles, and tips to support your educational journey.
- **Community Engagement**: Connect with fellow learners and professionals to share knowledge and opportunities.

At TechCourses, we're dedicated to helping you advance your technical skills and achieve your career aspirations. Join us today and start your path to success!
    `,
    team: [
        {
            name: "Ben Aicha Abderrhmane",
            role: "Founder & CEO",
            image: "/images/team/dahmane.jpg",
            bio: "Ben Aicha is a visionary entrepreneur with a passion for technology and education. He founded TechCourses to bridge the gap between learners and cutting-edge technical education.",
            social: {
                instagram: "https://www.instagram.com/7dx.d/",
                linkedin: "https://www.linkedin.com/in/abderrhmane-ben-aicha/",
                github: "https://github.com/ABDERRHMAN8BENAICHA",
            }
        },
        // Add more team members as needed
    ]
};


export function getInitials(name: string): string {
    const nameParts = name.trim().split(" ");
    if (nameParts.length < 2) {
        return nameParts[0].charAt(0).toUpperCase();
    }

    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    const lastNameInitial = nameParts[1].charAt(0).toUpperCase();

    return `${firstNameInitial}${lastNameInitial}`;
}

function getDateComponents(dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    const year = date.getUTCFullYear();

    return { day, month, year };
}


