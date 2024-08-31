import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoDark from "@/constants/LogoDark.svg"
import LogoLight from "@/constants/LogoLight.svg"

type Props = {}

export default function Logo({ }: Props) {
    return (
        <Link href={"/"} >
            <Image src={LogoDark} alt="Logo" className="hidden dark:block fill-current  w-24 md:w-24" />
            <Image src={LogoLight} alt="Logo" className="blok dark:hidden fill-current  w-24 md:w-24" />
        </Link>
    )
}