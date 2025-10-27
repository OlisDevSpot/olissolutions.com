import { auth } from '@olis/auth/server'
import { Navbar } from '@olis/ui/components/global/nav-bar'
import {Footer} from '@/components/footer'
import { headers as getHeaders } from 'next/headers'
import { navigationItems } from '@/data/nav-items'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({
    headers: await getHeaders(),
  })

  return (
    <>
      <Navbar navigationItems={navigationItems} isSignedIn={!!session} />
      <main className="min-h-screen pt-(--navbar-height)">{children}</main>
      <Footer />
    </>
  )
}
