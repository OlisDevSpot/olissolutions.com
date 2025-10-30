/* eslint-disable node/prefer-global/process */
'use client'

import type { SignupFormSchema } from '@olis/types/schemas/auth-forms'
import { signUp } from '@olis/auth/client'
import { SignupForm } from '@olis/ui/components/global/forms/sign-up-form'
import { Logo } from '@olis/ui/components/global/logo'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  redirectToUrl?: string
}

export function SignUpView({ redirectToUrl = 'http://localhost:3000/dashboard' }: Props) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function onSubmit(data: SignupFormSchema) {
    await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    }, {
      onRequest: () => {
        setIsPending(true)
      },
      onResponse: () => {
        setIsPending(false)
      },
      onSuccess: () => {
        toast.success('Sign up successful')
        router.push(`${redirectToUrl}`)
      },
      onError: () => {
        toast.error('Sign up failed')
      },
    })
  }

  return (
    <main className="flex flex-col gap-4">
      <a href={`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}`} className="w-full flex items-center justify-center">
        <Logo full product="Solutions" />
      </a>
      <SignupForm onSubmitCallback={onSubmit} isPending={isPending} />
    </main>
  )
}
