import { requireUnauth } from '@olis/auth/lib/utils'
import { SignInView } from '@olis/features/auth'
import { LoadingState } from '@olis/ui/components/global/loading-state'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  searchParams: Promise<{ redirect_url: string | undefined }>
}

export default async function SigninPage({ searchParams }: Props) {
  const urlFromSearchParams = await searchParams
  const redirectToUrl = decodeURIComponent(urlFromSearchParams.redirect_url || '') || `${process.env.NEXT_PUBLIC_LANDING_URL!}/dashboard` || '/'

  await requireUnauth(await getHeaders(), () => {
    return redirect(`${redirectToUrl}`)
  })

  return (
    <Suspense fallback={<LoadingState title="Loading..." />}>
      <SignInView redirectToUrl={redirectToUrl} />
    </Suspense>
  )
}
