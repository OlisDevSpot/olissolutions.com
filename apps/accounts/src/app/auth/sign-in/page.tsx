'use client'

import type { LoginFormSchema } from '@olis/types/schemas/auth-forms'
import { signIn, useSession } from '@olis/auth/client'
import { SignInForm } from '@olis/ui/components/global/forms/sign-in-form'
import { LoadingState } from '@olis/ui/components/global/loading-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SigninPage() {
  const { data: session, isPending: isSessionPending } = useSession()
  const [isPending, setIsPending] = useState(false)
  const searchParams = useSearchParams()
  const redirectTo = decodeURIComponent(searchParams.get('redirect_to') || '') || `${process.env.NEXT_PUBLIC_LANDING_URL!}/dashboard`
  const router = useRouter()

  async function onSubmit(data: LoginFormSchema) {
    await signIn.email({
      email: data.email,
      password: data.password,
    }, {
      onRequest: () => {
        setIsPending(true)
      },
      onResponse: () => {
        setIsPending(false)
      },
      onError: () => {
        toast.error('Login failed')
      },
      onSuccess: () => {
        toast.success('Login successful')
        router.push(`${redirectTo}`)
      },
    })
  }
  if (isSessionPending) {
    return <LoadingState title="Loading..." />
  }

  if (session && !isSessionPending) {
    return router.push(`${redirectTo}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignInForm onSubmitCallback={onSubmit} isPending={isPending} />
    </div>
  )
}
