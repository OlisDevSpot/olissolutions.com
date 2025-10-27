import { requireAuth } from '@olis/auth/lib/utils'
import { getQueryClient } from '@olis/data-client/get-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { trpc } from '@/trpc/server'
import { TestView } from './view'

export default async function TestPage() {
  await requireAuth(await getHeaders(), () => {
    return redirect('/auth/sign-in')
  })

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.platform.trades.findAll.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <TestView />
      </Suspense>
    </HydrationBoundary>
  )
}
