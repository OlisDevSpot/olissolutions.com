import type { Metadata } from 'next'
import { Toaster } from '@olis/ui/components/sonner'
import { Nunito, Syne } from 'next/font/google'
import { Providers } from '@/components/providers'

import './globals.css'

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
    <html
      lang="en"
      className="scroll-smooth dark"
      suppressHydrationWarning
    >
      <body
        className={`${nunito.variable} ${nunito.className} ${syne.variable} font-sans antialiased`}
        style={
          {
            '--navbar-height': '64px',
          } as React.CSSProperties
        }
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
