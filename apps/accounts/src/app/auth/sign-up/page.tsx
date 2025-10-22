'use client'

import type { SignupFormSchema } from '@olis/types/schemas/auth-forms'
import { signUp } from '@olis/auth/client'
import { SignupForm } from '@olis/ui/components/global/forms/sign-up-form'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SignupPage() {
  const [isPending, setIsPending] = useState(false)
  const searchParams = useSearchParams()
  const redirectUrl = decodeURI(searchParams.get('redirect_to') ?? 'http://localhost:3000')

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
        redirect(`${redirectUrl}`)
      },
      onError: () => {
        toast.error('Sign up failed')
      },
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignupForm onSubmitCallback={onSubmit} isPending={isPending} />
    </div>
  )
}
