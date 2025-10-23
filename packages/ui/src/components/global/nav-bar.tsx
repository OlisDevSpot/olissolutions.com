'use client'

import { Button } from '@olis/ui/components/button'
import { cn } from '@olis/ui/lib/utils'
import { Menu, X } from 'lucide-react'
import { useScroll } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Logo } from './logo'
import { ModeToggle } from './theme-toggle'

interface NavigationItem {
  name: string
  href: string
}

interface Props {
  navigationItems: NavigationItem[]
  isSignedIn?: boolean
  dashboardUrl?: string
}

export function Navbar({ navigationItems, isSignedIn = false, dashboardUrl = '/dashboard' }: Props) {
  const [menuState, setMenuState] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const [redirectTo] = useState(() => {
    if (typeof window !== 'undefined') {
      return encodeURI(window.location.href)
    }
    return false as const
  })

  useEffect(() => {
    const signInAnchor = document.getElementById('sign-in-button') as HTMLAnchorElement
    const signUpAnchor = document.getElementById('sign-up-button') as HTMLAnchorElement
    if (redirectTo && signInAnchor && signUpAnchor) {
      signInAnchor.href = `${process.env.NEXT_PUBLIC_ACCOUNTS_URL!}/auth/sign-in?redirect_to=${redirectTo}`
      signUpAnchor.href = `${process.env.NEXT_PUBLIC_ACCOUNTS_URL!}/auth/sign-up?redirect_to=${redirectTo}`
    }
  }, [redirectTo])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.01)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className={cn(
          'fixed z-20 w-full border-b transition-colors duration-150',
          scrolled && 'bg-background/50 backdrop-blur-3xl',
        )}
      >
        <div className="mx-auto container px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState === true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {navigationItems.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}

                </ul>
              </div>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {navigationItems.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <ModeToggle />
                {isSignedIn
                  ? (
                      <div className="flex items-center space-x-4">
                        <Button asChild size="sm">
                          <Link
                            href={dashboardUrl}
                            className="text-muted-foreground hover:text-accent-foreground block duration-150"
                          >
                            <span>Dashboard</span>
                          </Link>
                        </Button>
                      </div>
                    )
                  : (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a id="sign-in-button" href={`${process.env.NEXT_PUBLIC_ACCOUNTS_URL!}/auth/sign-in`}>
                            <span>Sign In</span>
                          </a>
                        </Button>
                        <Button
                          className="btn-primary"
                          size="sm"
                          asChild
                        >
                          <a id="sign-up-button" href={`${process.env.NEXT_PUBLIC_ACCOUNTS_URL!}/auth/sign-up`}>
                            <span>Sign Up</span>
                          </a>
                        </Button>
                      </div>
                    )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
