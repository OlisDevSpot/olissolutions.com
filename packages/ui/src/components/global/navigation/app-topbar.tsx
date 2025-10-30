'use client'

import { SearchButton } from '@olis/ui/components/global/search-button'
import { ModeToggle } from '@olis/ui/components/global/theme-toggle'
import { SidebarTrigger } from '@olis/ui/components/sidebar'

export function AppTopbar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="border-b h-(--topnav-height) flex items-center gap-2 px-2 w-full">
      <SidebarTrigger size="lg" />
      {children}
      <div className="ml-auto flex items-center gap-2">
        <SearchButton />
        <ModeToggle />
      </div>
    </nav>
  )
}
