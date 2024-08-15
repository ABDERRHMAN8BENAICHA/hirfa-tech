"use client"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { MdLogout } from "react-icons/md"
type Props = {}


export default function Logout({ }: Props) {

  return (
    <Button
    className="space-x-2"
      variant="destructive"
      onClick={() => {
        signOut()
      }}
    >
      <h1> Logout </h1>
      <MdLogout className="w-5 h-5" />
    </Button>
  )
}