import z from "zod";

import { insertFinancialProfileSchema } from "../../../../../../../../../packages/db/dist/schema/remodel-x";

export const updateFinancialProfileSchema = z.object({
  disadvantages: insertFinancialProfileSchema.pick({
    isSenior: true,
    isRetired: true,
    isFixedIncome: true,
    isLowIncome: true,
    isHighElectricPayment: true,
    isGovtAssisted: true,
  }),
  financialObligations: insertFinancialProfileSchema.pick({
    currentElectricPayment: true,
    currentGasPayment: true,
    currentWaterPayment: true,
    currentGardeningPayment: true,
  }),
});

export type UpdateFinancialProfileSchema = z.infer<typeof updateFinancialProfileSchema>;
