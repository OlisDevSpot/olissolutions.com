import type { User } from '@olis/db/schema/identity'
import type { GeneralSettingsFormSchema } from '@/features/account-management/schemas/general-settings-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUser } from '@olis/auth/client'

import { Button } from '@olis/ui/components/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@olis/ui/components/form'
import { Input } from '@olis/ui/components/input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { generalSettingsFormSchema } from '@/features/account-management/schemas/general-settings-schema'

interface Props {
  user: User
}

export function GeneralSettingsForm({ user }: Props) {
  const form = useForm<GeneralSettingsFormSchema>({
    resolver: zodResolver(generalSettingsFormSchema),
    defaultValues: {
      name: user?.name ?? '',
      nickname: user?.nickname ?? '',
      email: user?.email ?? '',
    },
  })

  useEffect(() => {
    form.reset({
      name: user?.name ?? '',
      nickname: user?.nickname ?? '',
      email: user?.email ?? '',
    })
  }, [user, form])

  async function onSubmit(input: GeneralSettingsFormSchema) {
    const data = {
      name: input.name,
      nickname: input.nickname ?? undefined,
    }

    await updateUser(data, {
      onSuccess: () => {
        toast.success('Profile updated')
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Johnny"
                  {...field}
                  value={field.value ?? ''}
                  onChange={e => field.onChange(e.target.value ?? '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
