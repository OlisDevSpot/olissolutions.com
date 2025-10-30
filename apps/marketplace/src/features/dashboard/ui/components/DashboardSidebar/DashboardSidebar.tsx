'use client'

import { useSession } from '@olis/auth/client'
import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import { LogoutButton } from '@olis/ui/components/buttons/logout-button'
import { LoadingState } from '@olis/ui/components/global/loading-state'
import { Logo } from '@olis/ui/components/global/logo'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { dashboardSidebarNavItems } from '@/shared/constants/nav-items'
import { cn } from '@/shared/lib/utils'

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const user = session?.user

  if (isPending) {
    return <LoadingState title="Loading sidebar..." />
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 z-50 h-full bg-card border-r border-border flex flex-col overflow-hidden',
          'lg:relative lg:translate-x-0',
          isCollapsed ? 'w-20' : 'w-70',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && <Logo />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed
              ? (
                  <ChevronRight className="h-4 w-4" />
                )
              : (
                  <ChevronLeft className="h-4 w-4" />
                )}
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Navigation Groups */}
          {dashboardSidebarNavItems.map(group => (
            <div
              key={group.title}
              className="space-y-2"
            >
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3"
                >
                  {group.title}
                </motion.h3>
              )}

              <div className="space-y-1">
                {group.items.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors group',
                      'hover:bg-accent hover:text-accent-foreground',
                      isActive(item.href) && 'bg-accent text-accent-foreground',
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 flex items-center justify-between min-w-0"
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-2 text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </motion.div>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-16 z-50 hidden group-hover:block">
                        <div className="bg-popover text-popover-foreground px-2 py-1 rounded-md text-xs shadow-md border border-border whitespace-nowrap">
                          {item.title}
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="ml-2 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>Premium Plan</span>
              </div>
              <p className="text-xs text-muted-foreground">
                3 active solutions
              </p>
            </motion.div>
          )}
        </div>
        <LogoutButton />
      </motion.aside>
    </>
  )
}
