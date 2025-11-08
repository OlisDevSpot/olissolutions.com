'use client'

import { signOut } from '@olis/auth/client'
import { ROOTS } from '@olis/core/constants'

import { Button } from '@olis/ui/components/button'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  asMenuItem?: boolean
}

export function LogoutButton({ asMenuItem = false }: Props) {
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.push(`${ROOTS.identity.getSignInUrl({ absolute: true })}`)
  }

  return (
    <>
      { asMenuItem
        ? (
            <div onClick={handleLogout} className="flex items-center gap-2 w-full h-full p-2">
              <LogOutIcon />
              Logout
            </div>
          )
        : (
            <Button variant="destructive" onClick={handleLogout}>
              <LogOutIcon />
              Log-out
            </Button>
          )}
    </>
  )
}
