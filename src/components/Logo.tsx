import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoDark from "@/constants/LogoDark.svg"
import LogoLight from "@/constants/LogoLight.svg"
import TestLogo from "@/constants/previous-svgrepo-com.svg"

type Props = {}

export default function Logo({ }: Props) {
    return (
        <Link href={"/"} >
            <Image src={TestLogo} alt="Logo" className="hidden dark:block fill-current  w-10 md:w-10" />
            <Image src={TestLogo} alt="Logo" className="blok dark:hidden fill-current  w-10 md:w-10" />
        </Link>
    )
}