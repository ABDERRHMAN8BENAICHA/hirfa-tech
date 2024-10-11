import React from 'react'
import { Button } from '@/components/ui/button'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import Logo from './Logo'

type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className="">
            <div className="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="flex justify-center text-green-500 sm:justify-start">
                            <Logo />
                        </div>

                        <p className="max-w-md mx-auto mt-6 text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left">
                            At Hirfa Tech, we offer a variety of hands-on technical courses designed to equip you with the skills needed in today {"'"}s fast-paced industries. Join us to enhance your expertise and build a successful career.
                        </p>

                        <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
                            <li>
                                <a
                                    href="/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-green-500 transition hover:text-green-500/75"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <FaFacebookF className="w-6 h-6" />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-green-500 transition hover:text-green-500/75"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <FaInstagram className="w-6 h-6" />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-green-500 transition hover:text-green-500/75"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <FaTwitter className="w-6 h-6" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Explore</p>
                            <ul className="mt-4 space-y-4 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-gray-400"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-gray-400"
                                    >
                                        Courses
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-gray-400"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-400">Legal</p>
                            <ul className="mt-4 space-y-4 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-gray-400"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-gray-400"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-gray-400"
                                    >
                                        Refund Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-gray-400"
                                    >
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
