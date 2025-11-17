import z from 'zod'

export const customerFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z
    .email('Invalid email')
    .or(z.literal('')) // allow empty string
    .optional(),
  phoneNum: z.string().optional(),
})

export type CustomerFormSchema = z.infer<typeof customerFormSchema>
