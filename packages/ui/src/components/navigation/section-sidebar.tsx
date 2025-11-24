'use client'

import type { LucideIcon } from 'lucide-react'

import { Button } from '@olis/ui/components/button'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

interface HrefMenuItem {
  label: string
  Icon: LucideIcon
  href: string
}

interface ActionMenuItem {
  label: string
  Icon: LucideIcon
  onClick: () => void
}

interface Props {
  baseUrl: string
  menuItems?: HrefMenuItem[] | ActionMenuItem[]
  children?: React.ReactNode
  customCheckIsActive?: (menuItem: HrefMenuItem | ActionMenuItem) => boolean
}

export function SectionSidebar({
  baseUrl,
  menuItems,
  children,
  customCheckIsActive,
}: Props) {
  const pathname = usePathname()
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === `${baseUrl}`
    }
    return pathname.endsWith(href)
  }

  return (
    <div className="min-w-max p-2 h-full border-r no-layout-padding">
      <div className="space-y-4">
        {children}
        {menuItems && menuItems.length > 0 && (
          <div className="flex flex-col gap-1 w-48">
            {menuItems.map(step => (
              <Button
                key={step.label}
                variant="sidenavActive"
                className="justify-start"
                size="sm"
                data-active={'href' in step && !customCheckIsActive ? isActive(step.href) : customCheckIsActive(step)}
                asChild
              >
                <Link
                  onClick={'onClick' in step && step.onClick
                    ? (e) => {
                        e.preventDefault()
                        step.onClick?.()
                      }
                    : undefined}
                  href={'href' in step ? `${baseUrl}/${step.href}` : ''}
                  className="flex items-center gap-2"
                >
                  <step.Icon className="h-4 w-4" />
                  {step.label}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
