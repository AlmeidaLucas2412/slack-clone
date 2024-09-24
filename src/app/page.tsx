"use client"

import { UserButton } from "@/features/auth/components/user-button"

import { UseCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal"

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"

import { useEffect, useMemo } from "react"

import { useRouter } from "next/navigation"

import { Loader } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const [open, setOpen] = UseCreateWorkspaceModal()

  const { data, isLoading } = useGetWorkspaces()

  const workspaceId = useMemo(() => data?.[0]?._id, [data])

  useEffect(() => {
    if (isLoading) return

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`)
    } else if (!open) {
      setOpen(true)
    }
  }, [workspaceId, isLoading, open, setOpen, router])

  return (
    <div className="h-full flex-1 items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
  )
}
