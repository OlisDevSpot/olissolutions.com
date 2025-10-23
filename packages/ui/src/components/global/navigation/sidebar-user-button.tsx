'use client'

import { signOut, useSession } from '@olis/auth/client'
import { Avatar, AvatarFallback, AvatarImage } from '@olis/ui/components/avatar'
import { Button } from '@olis/ui/components/button'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@olis/ui/components/dropdown-menu'
import { useSidebar } from '@olis/ui/components/sidebar'
import { DollarSign, Loader2, LogOut, User2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function SidebarUserButton() {
  const router = useRouter()
  const { data: session } = useSession()
  const { open } = useSidebar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group/drop w-full flex active:outline-none focus:outline-none border border-border/40 rounded-lg mt-1" asChild>
        <Button variant="ghost" className="w-full flex justify-start gap-2 p-2 h-16 hover:bg-sidebar-accent group-data-[collapsible=icon]:p-0.5 group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:hover:bg-transparent truncate" size="lg">
          <Avatar className="shrink-0 rounded-full size-8 group-data-[collapsible=icon]:size-7 transition">
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback className="group-hover/drop:bg-foreground group-hover/drop:text-background transition-colors">
              {session?.user?.name?.charAt(0) || ''}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 justify-start text-start group-data-[collapsible=icon]:opacity-0 transition">
            {!session?.user
              ? (<Loader2 className="animate-spin" />)
              : (
                  <>
                    <span className="truncate">{session?.user?.name || '...'}</span>
                    <span className="truncate text-sm text-muted-foreground">{session?.user?.email || '...'}</span>
                  </>
                )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={open ? 'top' : 'right'}
        className="w-(--radix-dropdown-menu-trigger-width)"
      >
        <DropdownMenuItem asChild>
          <div className="w-full flex items-center gap-1">
            <User2 className="mr-1 h-4 w-4" />
            <Link href="/account">Account</Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div className="w-full flex items-center gap-1">
            <DollarSign className="mr-1 h-4 w-4" />
            <Link href="/billing">Billing</Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push('/auth/login') } })}>
          <div className="w-full flex items-center gap-1">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
