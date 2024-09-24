"use client"
import { Loader, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuthActions } from "@convex-dev/auth/react"
import { useCurrentUser } from "../api/use-current-user"

export const UserButton = () => {
  const { signOut } = useAuthActions()
  const { data, isLoading } = useCurrentUser()

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />
  }

  if (!data) {
    return null
  }

  const { image, name } = data

  const avatarFallback = name!.charAt(0).toUpperCase() //name! tells ts it will exist

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative p-2">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage className="rounded-full" alt={name} src={image}/>
          <AvatarFallback className="rounded-full bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem
          onClick={() => signOut()}
          className="pl-2 h-10 flex items-center cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
