import type z from 'zod'

import { selectUserSchema } from '../../../../../../packages/db/dist/schema/platform'

export const generalSettingsFormSchema = selectUserSchema.pick({
  name: true,
  nickname: true,
  email: true,
})

export type GeneralSettingsFormSchema = z.infer<typeof generalSettingsFormSchema>
