import { Navbar } from '@olis/ui/components/global/nav-bar'
import Footer from '@olis/ui/components/landing/footer'
import { navigationItems } from '@/data/nav-items'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar navigationItems={navigationItems} />
      <main className="min-h-screen pt-(--navbar-height)">{children}</main>
      <Footer />
    </>
  )
}
