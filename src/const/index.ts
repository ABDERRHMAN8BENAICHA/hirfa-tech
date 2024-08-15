import { AboutContent, AboutType, FooterItemType, HeroCardType, NavItemType } from "@/types";
import { FaFile } from "react-icons/fa6";
import { BiSolidVector } from "react-icons/bi";
import { TbMaximize } from "react-icons/tb";
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
        icon: FaFile,
        title: "A1 Cover Letter Generator",
        content: `The A1 Cover Letter Generator is a tool
that uses artificial intelligence
algorithms to create personalized cover
letters for job applicants.`,
    },
    {
        icon: BiSolidVector,
        title: "Smart Personalization",
        content: `Smart Personalization refers to the use
of data and technology to deliver
tailored experiences and content to
individual customers or users.`
    }, {
        icon: TbMaximize,
        title: "Resume Scanner",
        content: `A resume scanner is a software
application that uses optical character
recognition (OCR) technology to
extract and analyze data from resumes.`
    }
]

export const AboutInfo: AboutType[] = [
    {
        icon: FaFile,
        title: "Cover Letter",
        content: `A cover letter is a document that
accompanies a job application and is
written to introduce the applicant to the
employer.`,
    },
    {
        icon: IoMail,
        title: "Resignation Letters",
        content: `A resignation letter is a formal
document that an employee writes to
inform their employer of their decision
to leave the company.`,
    },
    {
        icon: LuGitPullRequest,
        title: "Connection Request",
        content: `A connection request is a message sent
on a social networking site, such as
LinkedIn, requesting to connect with
another user.`,
    },
    {
        icon: RiSendPlaneFill,
        title: "Outreach Emails",
        content: `Outreach emails are messages sent by
individuals or businesses to introduce
themselves, establish a connection, or
propose a collaboration.`,
    },
    {
        icon: IoGrid,
        title: "Resume Optimization",
        content: `Smart Personalization refers to the use
of data and technology to deliver
tailored experiences and content to
individual customers or users.`,
    },
    {
        icon: LuCodesandbox,
        title: "Resume Design",
        content: `A resume scanner is a software
application that uses optical character
recognition (OCR) technology to
extract and analyze data from resumes.`,
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
Welcome to Post-Jop! Our mission is to connect university students with amazing job opportunities and provide a platform that bridges the gap between employers and young talents.
Our platform offers a variety of features to make your job search and recruitment process as smooth and efficient as possible:
      - **Job Listings**: Browse through a wide range of job listings tailored specifically for university students.
      - **Profile Management**: Create and manage your professional profile to attract potential employers.
      - **Application Tracking**: Keep track of your job applications and their statuses in one place.
      - **Employer Interaction**: Communicate directly with employers to learn more about job opportunities and company culture.
      - **Career Resources**: Access valuable resources and tips to help you prepare for your job search and interviews.
At Post-Jop, we are committed to helping you achieve your career goals and make the most of your university experience. Join us today and take the first step towards your dream job!
    `,
    team: [
        {
            name: "Ben Aicha Abderrhmane",
            role: "Founder & CEO",
            image: "/images/team/dahmane.jpg",
            bio: "John is a passionate entrepreneur with a background in technology and education. He founded Post-Jop to help students connect with meaningful job opportunities.",
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

export function formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}