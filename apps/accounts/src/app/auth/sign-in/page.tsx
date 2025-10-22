'use client'

import type { LoginFormSchema } from '@olis/types/schemas/auth-forms'
import { signIn } from '@olis/auth/client'
import { SignInForm } from '@olis/ui/components/global/forms/sign-in-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SigninPage() {
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
        router.push('/dashboard')
      },
    })
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignInForm onSubmitCallback={onSubmit} isPending={isPending} />
    </div>
  )
}
