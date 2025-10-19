'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'
import { dashboardSidebarNavItems } from '@/data/nav-items'
import { cn } from '@/shared/lib/utils'

export function DashboardSidebarMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()

  // Close mobile sidebar when route changes
  useEffect(() => {
    startTransition(() => {
      setIsOpen(false)
    })
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const handleMobileToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleOverlayClick = () => {
    setIsOpen(false)
  }

  const handleNavItemClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleMobileToggle}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {isOpen
          ? (
              <X className="h-4 w-4" />
            )
          : (
              <ChevronRight className="h-4 w-4" />
            )}
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 0,
          x: isOpen ? 0 : -280,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'w-70 fixed left-0 top-0 z-50 h-full bg-card border-r border-border flex flex-col overflow-hidden',
          'lg:relative lg:translate-x-0',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 w-8"
          >
            {isOpen
              ? (
                  <ChevronLeft className="h-4 w-4" />
                )
              : (
                  <ChevronRight className="h-4 w-4" />
                )}
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                },
              }}
            />
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.firstName}
                  {' '}
                  {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.primaryEmailAddress?.emailAddress}
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
              {isOpen && (
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
                    onClick={handleNavItemClick}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors group',
                      'hover:bg-accent hover:text-accent-foreground',
                      isActive(item.href) && 'bg-accent text-accent-foreground',
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {isOpen && (
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
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {isOpen && (
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
      </motion.aside>
    </>
  )
}
