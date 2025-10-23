'use client'

import { signOut } from '@olis/auth/client'

import { Button } from '@olis/ui/components/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.push('/')
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Log-out
    </Button>
  )
}
