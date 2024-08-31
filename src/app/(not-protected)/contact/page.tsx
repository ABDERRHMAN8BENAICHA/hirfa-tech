import GoBack from '@/components/buttons/GoBack'
import Error from '@/components/Error'
import Heding from '@/components/Heding'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div className='container'>
            <Heding title='Contact Us' isCentered={true} />
            <div className=" flex justify-center items-center relative mt-4">
                <div className="border rounded-md w-full h-auto">
                    <form className="flex flex-col space-y-3 w-full p-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" placeholder="Name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="message">Message</Label>
                            <Textarea className="border p-2 rounded-md" id="message" placeholder="Message" />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}