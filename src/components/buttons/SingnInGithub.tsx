
import { signIn } from "@/auth"
import { Button } from '../ui/button'
import Image from 'next/image'
import githubLogo from "/public/github-mark.svg"
import SingnInGithubAction from "@/action/SingnInGithubAction"
type Props = {
    isloading?: boolean
}

export default function SingnInGithub({ isloading}: Props) {

    return (
        <form
            className="w-full"
            action={SingnInGithubAction}
        >
            <Button
                disabled={isloading}
                className='w-full mt-4'
            >
                <Image src={githubLogo} alt="github logo" width={20} height={20} />
            </Button>
        </form>
    )
}