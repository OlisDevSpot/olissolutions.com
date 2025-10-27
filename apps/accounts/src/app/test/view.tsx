'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'

export function TestView() {
  const trpc = useTRPC()
  const { data, error } = useSuspenseQuery(trpc.platform.trades.findAll.queryOptions())

  return (
    <div>{JSON.stringify(data, null, 2)}</div>
  )
}
