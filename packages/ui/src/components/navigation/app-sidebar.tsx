'use client'

import type { LucideIcon } from 'lucide-react'
import { ROOTS } from '@olis/core/constants'
import { getTypedKeys } from '@olis/core/lib/utils'
import { useTRPC } from '@olis/data-client/trpc/client'

import { Logo } from '@olis/ui/components/global/logo'
import { SidebarUserButton } from '@olis/ui/components/navigation/sidebar-user-button-2'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@olis/ui/components/sidebar'
import { HelpCircleIcon, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '../badge'
import { buttonVariants } from '../button'

interface SubItem {
  title: string
  url: string
  icon: LucideIcon
  enablePrefetch?: boolean
  handleMouseEnter?: (trpc: ReturnType<typeof useTRPC>) => void
}

interface Item {
  title: string
  url: string
  icon: LucideIcon
  badge?: string
  subItems?: SubItem[]
}

interface Props<T extends Record<keyof K, Item[]>, K extends Record<string, string>> {
  sidebarItems: T
  sidebarGroups: K
  adminUrl?: string
  settingsUrl?: string
  dashboardUrl?: string
  onSettingsClick?: () => void
  user?: {
    name?: string
    email?: string
    image?: string
  }
  isIdentityPending?: boolean
  logoColor?: 'primary' | 'green' | 'blue' | 'red'
  logoProduct?: string
  isAdminPath?: boolean
}

export function AppSidebar<T extends Record<keyof K, Item[]>, K extends Record<string, string>>({
  sidebarItems,
  sidebarGroups,
  adminUrl = '/dashboard/admin',
  settingsUrl = '/dashboard/settings',
  dashboardUrl = '/dashboard',
  onSettingsClick,
  user,
  isIdentityPending = false,
  logoColor,
  logoProduct,
  isAdminPath = false,
}: Props<T, K>) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const trpc = useTRPC()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b h-(--topnav-height) flex items-center pl-2">
        <SidebarMenu className="h-full flex justify-center">
          <SidebarMenuItem>
            <div className="flex gap-4 items-center justify-between">
              <SidebarMenuButton asChild className="p-0 items-center">
                <Link href="/" className="w-full hover:bg-transparent active:bg-transparent relative">
                  <Logo full color={logoColor || 'primary'} product={logoProduct || 'Dashboard'} />
                </Link>
              </SidebarMenuButton>
              {isAdminPath && (
                <Badge variant="secondary">Admin</Badge>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-2 text-sidebar-foreground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="transition-colors duration-200" isActive={pathname === `${dashboardUrl}`}>
                  <Link href={dashboardUrl} onClick={() => setOpenMobile(false)}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {getTypedKeys(sidebarItems).map(key => (
          <SidebarGroup key={key as string}>
            <SidebarGroupLabel>{sidebarGroups[key]}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems[key].map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="transition-colors duration-200 text-sidebar-foreground" isActive={pathname.startsWith(item.url)}>
                      <Link href={item.url} onClick={() => setOpenMobile(false)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="border rounded-sm border-sidebar-foreground">{item.badge}</SidebarMenuBadge>
                    )}
                    {'subItems' in item && (
                      <SidebarMenuSub className="mt-0.5 pr-0 mr-0">
                        {item.subItems?.map(subItem => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild className="transition-colors duration-200 text-sidebar-foreground" isActive={pathname.startsWith(subItem.url)}>
                              <Link href={subItem.url} onClick={() => setOpenMobile(false)} onMouseEnter={() => subItem.handleMouseEnter?.(trpc)}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href={adminUrl} className={buttonVariants({ variant: 'outline', className: 'border-accent' })}>
                Admin
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="transition-colors duration-200 text-sidebar-foreground"
              isActive={pathname.includes(`/settings`)}
              onClick={onSettingsClick ?? undefined}
            >
              {!onSettingsClick
                ? (
                    <Link href={settingsUrl}>
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  )
                : (<>Open Settings</>)}

            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="transition-colors duration-200 text-sidebar-foreground"
              isActive={pathname.startsWith(`${dashboardUrl}/support`)}
              onClick={onSettingsClick ?? undefined}
            >
              <Link href={`${dashboardUrl}/support`}>
                <HelpCircleIcon />
                Support
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {isIdentityPending
            ? (null)
            : (<SidebarUserButton user={user} />)}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
