'use client'

import { SectionSidebar } from '@olis/ui/components/global/navigation/section-sidebar'
import { SectionTopbar } from '@olis/ui/components/global/navigation/section-topbar'
import { useIsMobile } from '@olis/ui/hooks/use-mobile'
import { cn } from '@olis/ui/lib/utils'
import { SETTINGS_MENU_ITEMS } from '@/features/account-management/lib/constants'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  return (
    <div className={cn('h-full w-full flex overflow-auto', isMobile ? 'flex-col' : 'flex-row')}>
      <div className="shrink-0">
        { isMobile ? <SectionTopbar steps={SETTINGS_MENU_ITEMS} baseUrl="/dashboard/settings" /> : <SectionSidebar menuItems={SETTINGS_MENU_ITEMS} baseUrl="/dashboard/settings" />}
      </div>
      <div className={cn('p-4 grow overflow-auto main-container')}>
        {children}
      </div>
    </div>
  )
}
