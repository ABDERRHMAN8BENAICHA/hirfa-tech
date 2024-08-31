
// import { Button } from "@/components/ui/button"
// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer"
// import { useState } from "react"
// import { MdOutlinePostAdd } from "react-icons/md"
// import { Input } from "./ui/input";

// export default function AddUserToCourse() {
//     const [userId, setUserId] = useState<string>("");
//     const handleSubmit = () => {
//         // call api conect user
//     }
//     return (
//         <Drawer>
//             <DrawerTrigger asChild>
//                 <Button variant="default">
//                     <div>
//                         <h1> Add User </h1>
//                     </div>
//                     <div>
//                         <MdOutlinePostAdd className='w-6 h-6' />
//                     </div>
//                 </Button>
//             </DrawerTrigger>
//             <DrawerContent>
//                 <div className="mx-auto w-full max-w-sm">
//                     <DrawerHeader>
//                         <DrawerTitle>Add User</DrawerTitle>
//                         <DrawerDescription>copy user id in the input</DrawerDescription>
//                     </DrawerHeader>
//                     <div className="p-4 pb-0">
//                         <div className="flex items-center justify-center space-x-2">
//                             <Input type="text" placeholder="User Id" onChange={(e) => { setUserId(e.target.value) }} />
//                         </div>
//                     </div>
//                     <DrawerFooter>
//                         <Button onClick={handleSubmit}>Submit</Button>
//                         <DrawerClose asChild>
//                             <Button variant="outline">Cancel</Button>
//                         </DrawerClose>
//                     </DrawerFooter>
//                 </div>
//             </DrawerContent>
//         </Drawer>
//     )
// }

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from 'next/navigation';

export default function AddUserToCourse() {
    const [userId, setUserId] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseId = searchParams.get('idCourse'); // Extract courseId from search params
    const handleSubmit = async () => {
        if (!userId || !courseId) {
            setError("Please provide both user ID and course ID");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const result: any = await response.json();
            if (result.ok) {
                router.push(`/profile`);
            } else {
                console.log(result);
            }

        } catch (error) {
            console.error(error);
            setError("Failed to add user to course"); // Set error message
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="default">
                    <div>
                        <h1>Add User</h1>
                    </div>
                    <div>
                        <MdOutlinePostAdd className="w-6 h-6" />
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add User</DrawerTitle>
                        <DrawerDescription>Copy user ID in the input</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex flex-col space-y-4">
                            <Input
                                type="text"
                                placeholder="User ID"
                                onChange={(e) => setUserId(e.target.value)}
                                value={userId}
                            />
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
