
import { signIn } from "@/auth"
import { Button } from '../ui/button'
import Image from 'next/image'
import googleLogo from "../../../public/icons8-google-48.png"
import SingnInGoogleAction from "@/action/SingnInGoogleAction"
type Props = {
    isloading?: boolean
}

export default function SingnInGoogle({ isloading }: Props) {

    return (
        <form

            className="w-full"
            action={SingnInGoogleAction}
        >
            <Button
                disabled={isloading}
                className='w-full mt-4'
            >
                <Image src={googleLogo} alt="google logo" width={20} height={20} />
            </Button>
        </form>
    )
}