import type z from 'zod'

import { selectUserSchema } from '@olis/db/schema/identity'

export const generalSettingsFormSchema = selectUserSchema.pick({
  name: true,
  nickname: true,
  email: true,
})

export type GeneralSettingsFormSchema = z.infer<typeof generalSettingsFormSchema>
