'use client'
import { useSession } from '@olis/auth/client'
import { ROOTS } from '@olis/core/constants'
import { AppSidebar as BaseAppSidebar } from '@olis/ui/components/navigation/app-sidebar'
import { sidebarGroups, sidebarItems } from '@/shared/constants/dashboard-menu-items'

export function AppSidebar() {
  const { data: rawSession, isPending } = useSession()
  const user = { ...rawSession?.user, image: rawSession?.user?.image || '' }

  return (
    <div className="hidden md:block">
      <BaseAppSidebar
        sidebarItems={sidebarItems}
        sidebarGroups={sidebarGroups}
        isIdentityPending={isPending}
        user={user}
        logoProduct={`${ROOTS.marketplace.name}`}
      />
    </div>
  )
}
