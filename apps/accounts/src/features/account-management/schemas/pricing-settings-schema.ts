import type z from "zod";

import { insertPricingSchema } from "@/shared/schema";

export const pricingSettingsFormSchema = insertPricingSchema;

export type PricingSettingsFormSchema = z.infer<typeof pricingSettingsFormSchema>;
