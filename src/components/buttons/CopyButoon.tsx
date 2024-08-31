"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { FaLink } from 'react-icons/fa6';
import { toast } from "@/components/ui/use-toast"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/constants';
type Props = {
    id: string
}


export default function CopyButoon({ id }: Props) {
    const path = usePathname()
    const [link, setLink] = useState<string>(`${SITE_URL}posts/${id}`);
    const copylink = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(link);
                toast({
                    variant: 'default',
                    description: 'Link copied successfully!',
                    duration: 3000,
                });
            } catch (err) {
                toast({
                    variant: 'destructive',
                    description: 'Failed to copy the link!',
                    duration: 3000,
                });
            }
        } else {
            // Fallback for browsers that do not support the Clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = link;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                toast({
                    variant: 'default',
                    description: 'Link copied successfully!',
                    duration: 3000,
                });
            } catch (err) {
                toast({
                    variant: 'destructive',
                    description: 'Failed to copy the link!',
                    duration: 3000,
                });
            }
            document.body.removeChild(textarea);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FaLink className='w-6 h-6 cursor-pointer' />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={link}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={copylink}>
                        <span className="sr-only">Copy</span>
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}