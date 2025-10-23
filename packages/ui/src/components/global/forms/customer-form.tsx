'use client'

import type { Customer } from '@olis/db/schema/core'
import type { CustomerFormSchema } from '@olis/types/schemas/customers-forms'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUpdateCustomer } from '@olis/data-client/mutations/customers/use-update-customer'
import { customerFormSchema } from '@olis/types/schemas/customers-forms'
import { Button } from '@olis/ui/components/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@olis/ui/components/form'
import { Input } from '@olis/ui/components/input'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
  customer: Customer
}

export function UpdateCustomerForm({ customer }: Props) {
  const mutation = useUpdateCustomer(customer.id || '')
  const queryClient = useQueryClient()
  const form = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      email: customer?.email || '',
      phoneNum: customer?.phoneNum || '',
    },
  })

  useEffect(() => {
    form.setValue('firstName', customer.firstName)
    form.setValue('lastName', customer.lastName)
    form.setValue('email', customer?.email || '')
    form.setValue('phoneNum', customer?.phoneNum || '')
  }, [])

  function onSubmit(data: CustomerFormSchema) {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['project'] })
        toast.success('Customer updated')
      },
    })
  }

  return (
    <Form {...form}>
      <h3 className="text-lg font-semibold">Primary Homeowner</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="John" disabled={mutation.isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" disabled={mutation.isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="818-555-1212" disabled={mutation.isPending} {...field} />
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
                <Input placeholder="john.doe@example.com" disabled={mutation.isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>Save</Button>
      </form>
    </Form>
  )
}
