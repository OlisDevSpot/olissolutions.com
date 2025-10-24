import type z from 'zod'

import { insertPricingSchema } from '@olis/db/schema/one-stop-sales'

export const pricingSettingsFormSchema = insertPricingSchema

export type PricingSettingsFormSchema = z.infer<typeof pricingSettingsFormSchema>
