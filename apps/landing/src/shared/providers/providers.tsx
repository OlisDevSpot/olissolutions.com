'use client'

import { ClerkProvider } from '@clerk/nextjs'
import QueryProvider from '@/shared/lib/query-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>{children}</QueryProvider>
    </ClerkProvider>
  )
}
