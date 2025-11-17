'use client'

import type { LucideIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@olis/ui/components/select'

import { useParams, usePathname, useRouter } from 'next/navigation'

interface Props {
  baseUrl?: string
  steps: {
    href: string
    label: string
    Icon: LucideIcon
  }[]
}

export function SectionTopbar({ baseUrl = '/dashboard/projects', steps }: Props) {
  const router = useRouter()
  const { projectId } = useParams<{ projectId: string }>()
  const pathname = usePathname()

  return (
    <div className="min-w-max p-2 h-auto border-r no-layout-padding">
      <div className="flex flex-col gap-1 w-full">
        <Select
          value={pathname.endsWith('/') ? '/' : steps.find(step => pathname.endsWith(step.href))?.href || '/'}
          onValueChange={(value) => {
            if (value === '/') {
              router.push(`${baseUrl}/${projectId}`)
            }
            router.push(`${baseUrl}/${projectId}${value}`)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Step" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {steps.map(step => (
              <SelectItem key={step.href} value={step.href} className="h-10 flex items-center p-2">
                <div
                  className="flex items-center gap-2"
                >
                  <step.Icon className="h-4 w-4" />
                  {step.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
