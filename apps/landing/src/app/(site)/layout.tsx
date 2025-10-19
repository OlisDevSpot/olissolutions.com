import { Navbar } from '@workspace/ui/components/global/nav-bar'
import Footer from '@workspace/ui/components/landing/footer'
import { navigationItems } from '@/data/nav-items'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar navigationItems={navigationItems} />
      <main className="min-h-screen pt-[var(--navbar-height)]">{children}</main>
      <Footer />
    </>
  )
}
