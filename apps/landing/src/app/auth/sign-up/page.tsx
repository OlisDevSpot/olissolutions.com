'use client'

import type { SignupFormSchema } from '@workspace/core/types/auth'
import { signUp } from '@workspace/auth/client'
import { SignupForm } from '@workspace/ui/components/auth/sign-up-form'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SignupPage() {
  const [isPending, setIsPending] = useState(false)
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
        redirect('/dashboard')
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
