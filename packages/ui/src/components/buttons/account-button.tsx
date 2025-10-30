'use client'

import { ROOTS } from '@olis/core/constants'
import { Button } from '@olis/ui/components/button'
import { BadgeCheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  asMenuItem?: boolean
  absolute?: boolean
}

export function AccountButton({ asMenuItem = false, absolute }: Props) {
  const router = useRouter()

  function handleClick() {
    router.push(`${ROOTS.marketplace.getAccountRoot({ absolute })}`)
  }

  return (
    <>
      { asMenuItem
        ? (
            <div onClick={handleClick} className="flex items-center gap-2 w-full h-full p-2">
              <BadgeCheckIcon />
              Account
            </div>
          )
        : (
            <Button variant="destructive" onClick={handleClick}>
              <BadgeCheckIcon />
              Account
            </Button>
          )}
    </>
  )
}
