"use client"
import { ROOTS } from "@olis/core/constants"

import { sidebarGroups, sidebarItems } from "@/shared/constants/menu-items"
import { useSession } from "@olis/auth/client"
import { AppSidebar as BaseAppSidebar } from "@olis/ui/components/global/navigation/app-sidebar"

export function AppSidebar() {
  const { data: rawSession, isPending } = useSession()
  const user = { ...rawSession?.user, image: rawSession?.user?.image || "" }

  return (
    <div className="hidden md:block">
      <BaseAppSidebar 
        sidebarGroups={sidebarGroups} 
        sidebarItems={sidebarItems} 
        user={user} 
        isIdentityPending={isPending}
        logoProduct={`${ROOTS.saleos.name}`}
        logoColor="green"
        dashboardUrl="/dashboard"
      />
    </div>
  )
}
