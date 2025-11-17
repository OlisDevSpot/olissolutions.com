"use client"
import { sidebarGroups, sidebarItems } from "@/shared/constants/menu-items"
import { useSession } from "@olis/auth/client"
import { ROOTS } from "@olis/core/constants"
import { AppSidebar as BaseAppSidebar } from "@olis/ui/components/navigation/app-sidebar"

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
        logoProduct={`${ROOTS.remodelX.name}`}
        logoColor="green"
        dashboardUrl="/dashboard"
      />
    </div>
  )
}
