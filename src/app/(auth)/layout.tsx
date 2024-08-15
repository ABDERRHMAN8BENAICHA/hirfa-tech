import { auth } from "@/auth";
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children, }: { children: React.ReactNode; }) {
    const session = await auth();
    if (session?.user) {
        redirect("/profile")
    }
    return (
        <>
            <div className="p-10">
                {children}
            </div>
        </>
    )
}
