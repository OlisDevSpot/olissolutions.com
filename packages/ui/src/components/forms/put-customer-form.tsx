'use client'

import type { Customer } from '@olis/db/schema/platform'
import type { CustomerFormSchema } from '@olis/ui/schemas/customers-forms'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@olis/ui/components/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@olis/ui/components/form'
import { Input } from '@olis/ui/components/input'
import { customerFormSchema } from '@olis/ui/schemas/customers-forms'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  customer?: Customer
  isPrimary: boolean | null
  onSubmit: (data: CustomerFormSchema) => void
  isPending?: boolean
}

export function PutCustomerForm({ customer, onSubmit, isPending, isPrimary }: Props) {
  const form = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      email: customer?.email ?? '',
      phoneNum: customer?.phoneNum ?? '',
    },
  })

  useEffect(() => {
    form.setValue('firstName', customer?.firstName ?? '')
    form.setValue('lastName', customer?.lastName ?? '')
    form.setValue('email', customer?.email ?? undefined)
    form.setValue('phoneNum', customer?.phoneNum ?? undefined)
  }, [form, customer])

  return (
    <Form {...form}>
      <div className="w-full h-full flex flex-col gap-4 p-4 border border-dashed rounded-lg shadow-accent-foreground shadow-xl">
        <h3 className="text-lg font-semibold">{isPrimary ? 'Primary Owner' : 'Co-Applicant'}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 [&_label]:text-muted-foreground [&_input]:placeholder:text-muted-foreground/50 flex-wrap [&>div]:flex-1 [&>div]:min-w-[150px]">
            <div className="flex gap-4 [&_label]:text-muted-foreground [&_input]:placeholder:text-muted-foreground/50 flex-wrap [&>div]:flex-1 [&>div]:min-w-[150px]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Input placeholder="John" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormLabel>First name</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Doe" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormLabel>Last name</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 [&_label]:text-muted-foreground [&_input]:placeholder:text-muted-foreground/50 flex-wrap [&>div]:flex-1 [&>div]:min-w-[150px]">
              <FormField
                control={form.control}
                name="phoneNum"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="818-555-1212" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormLabel>Phone number</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormLabel>Email</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={isPending}>Save</Button>
        </form>
      </div>
    </Form>
  )
}
