import type z from 'zod'

import { insertPricingSchema } from '@olis/db/schema/remodel-x'

export const pricingSettingsFormSchema = insertPricingSchema

export type PricingSettingsFormSchema = z.infer<typeof pricingSettingsFormSchema>
