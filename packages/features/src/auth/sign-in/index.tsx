'use client'

import type { LoginFormSchema } from '@olis/types/schemas/auth-forms'
import { signIn } from '@olis/auth/client'
import { SignInForm } from '@olis/ui/components/global/forms/sign-in-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  redirectToUrl?: string
}

export function SignInView({ redirectToUrl = 'http://localhost:3000/dashboard' }: Props) {
  const [isPending, setIsPending] = useState(false)
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
        router.push(`${redirectToUrl}`)
      },
    })
  }

  return (
    <SignInForm onSubmitCallback={onSubmit} isPending={isPending} />
  )
}
