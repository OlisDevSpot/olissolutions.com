'use client'

import { ROOTS } from '@olis/core/constants'
import { Button } from '@olis/ui/components/button'
import { SparkleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  asMenuItem?: boolean
  alternateText?: string
  absolute?: boolean
}

export function MarketplaceButton({ asMenuItem = false, alternateText, absolute }: Props) {
  const router = useRouter()

  function handleClick() {
    router.push(`${ROOTS.marketplace.getMarketplaceRoot({ absolute })}`)
  }

  return (
    <>
      { asMenuItem
        ? (
            <div onClick={handleClick} className="flex items-center gap-2 w-full h-full p-2">
              <SparkleIcon />
              {alternateText || 'Marketplace'}
            </div>
          )
        : (
            <Button variant="destructive" onClick={handleClick}>
              <SparkleIcon />
              Marketplace
            </Button>
          )}
    </>
  )
}
