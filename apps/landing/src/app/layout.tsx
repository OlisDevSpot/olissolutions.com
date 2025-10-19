import type { Metadata } from 'next'
import { Toaster } from '@workspace/ui/components/sonner'
import { Nunito, Syne } from 'next/font/google'
import { Providers } from '@/shared/providers/providers'

import '@workspace/ui/globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title:
    'Olis Solutions | Digital Solutions for Southern California Contractors',
  description:
    'Transform your construction business with cutting-edge digital tools. Connect with homeowners and present projects professionally with Olis Solutions - the original digital platform for SoCal contractors.',
  keywords: [
    'construction software',
    'contractor tools',
    'digital solutions',
    'Southern California contractors',
    'home improvement',
    'project management',
  ],
  authors: [{ name: 'Olis Solutions' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html
        lang="en"
        className="scroll-smooth dark"
      >
        <body
          className={`${nunito.variable} ${nunito.className} ${syne.variable} font-sans antialiased`}
          style={
            {
              '--navbar-height': '64px',
            } as React.CSSProperties
          }
        >
          <Toaster />
          {children}
        </body>
      </html>
    </Providers>
  )
}
