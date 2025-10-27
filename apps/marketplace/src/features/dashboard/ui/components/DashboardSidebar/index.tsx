import { useIsMobile } from '@/hooks/use-mobile'
import { DashboardSidebar as DashboardSidebarDesktop } from './DashboardSidebar'
import { DashboardSidebarMobile } from './DashboardSidebarMobile'

export function DashboardSidebar() {
  const isMobile = useIsMobile()

  return (
    <>{isMobile ? <DashboardSidebarMobile /> : <DashboardSidebarDesktop />}</>
  )
}
