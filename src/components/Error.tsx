import { FC } from "react"
interface HeadingProps {
    title: string;
    isCentered?: boolean;
}
const Error: FC<HeadingProps> = ({ title, isCentered = false }) => {
    return (
        <h1 className={`${isCentered ? "text-center" : "text-left"}  font-extrabold text-lg md:text-3xl mt-8 text-nowrap bg-gradient-to-r  from-red-300  to-red-600 bg-clip-text text-transparent p-2`}>
            {title}
        </h1>
    )
}

export default Error