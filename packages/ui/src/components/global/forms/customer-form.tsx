'use client'

import type { CustomerFormSchema } from '../../../../../types/src/schemas/customers-forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@olis/ui/components/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@olis/ui/components/form'

import { Input } from '@olis/ui/components/input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGetProjectCustomers } from '@/features/project-creator/data/queries/get-project-customers'
import { useCurrentProjectId } from '@/features/project-creator/hooks/use-current-project-id'
import { useUpdateCustomer } from '@/shared/entities/customers/data/mutations/use-update-customer'
import { customerFormSchema } from '../../../../../types/src/schemas/customers-forms'

export function CustomerForm() {
  const projectId = useCurrentProjectId()
  const { data: customers } = useGetProjectCustomers(projectId)
  const mutation = useUpdateCustomer(customers?.[0]?.customer?.id || '')

  const form = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: customers?.[0]?.customer?.firstName || '',
      lastName: customers?.[0]?.customer?.lastName || '',
      email: customers?.[0]?.customer?.email || '',
      phoneNum: customers?.[0]?.customer?.phoneNum || '',
    },
  })

  useEffect(() => {
    if (customers?.[0]) {
      const { customer } = customers?.[0]

      if (!customer) {
        return
      }

      form.setValue('firstName', customer.firstName)
      form.setValue('lastName', customer.lastName)
      form.setValue('email', customer.email || '')
      form.setValue('phoneNum', customer.phoneNum || '')
    }
  }, [customers])

  if (!customers) {
    return null
  }

  function onSubmit(data: CustomerFormSchema) {
    mutation.mutate(data)
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
