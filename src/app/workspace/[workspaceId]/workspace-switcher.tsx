import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"
import { UseCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Loader, Plus } from "lucide-react"

export const WorkspaceSwitcher = () => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const [_open, setOpen] = UseCreateWorkspaceModal()

  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces()
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  })

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-neutral-400 hover:bg-neutral-400/80 text-slate-800 font-semibold text-xl">
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64 shadow-md shadow-zinc-600">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)} //variável
          className="cursor-pointer flex-col justify-start items-start capitalize"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="cursor-pointer capitalize"
            onClick={() => router.push(`/workspace/${workspace._id}`)} //objeto
          >
            <div className="size-9 relative overflow-hidden bg-neutral-600 text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => setOpen(true)}
          className="cursor-pointer hover:bg-slate-200"
        >
          <div className="size-9 relative overflow-hidden bg-neutral-100 text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
            <Plus className="size-5" />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
