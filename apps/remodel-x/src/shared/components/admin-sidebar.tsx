"use client"

import { adminSidebarGroups, adminSidebarItems } from "@/shared/constants/menu-items"
import { useSession } from "@olis/auth/client"
import { ROOTS } from "@olis/core/constants"
import { AppSidebar as BaseAppSidebar } from "@olis/ui/components/navigation/app-sidebar"

export function AdminSidebar() {
  const { data: rawSession, isPending } = useSession()
  const user = { ...rawSession?.user, image: rawSession?.user?.image || "" }

  return (
    <div className="hidden md:block">
      <BaseAppSidebar 
        sidebarItems={adminSidebarItems} 
        sidebarGroups={adminSidebarGroups} 
        user={user}
        isIdentityPending={isPending}
        logoProduct={`${ROOTS.remodelX.name}`}
        logoColor="green"
        dashboardUrl="/dashboard"
        adminUrl="/admin"
        isAdminPath
      />
    </div>
  )
}
