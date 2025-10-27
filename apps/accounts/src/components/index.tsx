'use client'

import { ThemeProvider } from '@olis/ui/components/global/providers/theme-provider'
import { TRPCReactProvider } from './trpc-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  )
}
