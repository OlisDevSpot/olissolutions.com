'use client'

import type { LucideIcon } from 'lucide-react'

import { Button } from '@olis/ui/components/button'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

interface Props {
  baseUrl?: string
  menuItems: {
    href: string
    label: string
    Icon: LucideIcon
  }[]
}

export function SectionSidebar({ baseUrl, menuItems }: Props) {
  const pathname = usePathname()
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === `${baseUrl}`
    }
    return pathname.endsWith(href)
  }

  return (
    <div className="min-w-max p-2 h-full border-r no-layout-padding">
      <div className="flex flex-col gap-1 w-48">
        {menuItems.map(step => (
          <Button
            key={step.href}
            variant="sidenavActive"
            className="justify-start"
            size="sm"
            data-active={isActive(step.href)}
            asChild
          >
            <Link
              href={baseUrl ? `${baseUrl}/${step.href}` : `${step.href}`}
              className="flex items-center gap-2"
            >
              <step.Icon className="h-4 w-4" />
              {step.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
