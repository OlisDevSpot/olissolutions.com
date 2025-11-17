import z from "zod";

export const projectROICalculatorSchema = z.object({
  currentNetWorth: z.object({
    homeValue: z.number().min(200000),
    mortgageBalance: z.number().min(0).optional(),
    carBalance: z.number().optional(),
    creditCardBalance: z.number().optional(),
    constructionDebt: z.number().optional(),
  }),
  afterNetWorth: z.object({
    homeValue: z.number().optional(),
    mortgageBalance: z.number().optional(),
    carBalance: z.number().optional(),
    creditCardBalance: z.number().optional(),
    constructionDebt: z.number().optional(),
    jobCost: z.number().optional(),
  }),
  currentPayment: {
    electricPayment: z.number().optional(),
    gasPayment: z.number().optional(),
    waterPayment: z.number().optional(),
    gardeningPayment: z.number().optional(),
    mortgagePayment: z.number().optional(),
    creditCardPayment: z.number().optional(),
    carPayment: z.number().optional(),
  },
  afterPayment: {
    electricPayment: z.number().optional(),
    gasPayment: z.number().optional(),
    waterPayment: z.number().optional(),
    gardeningPayment: z.number().optional(),
    mortgagePayment: z.number().optional(),
    creditCardPayment: z.number().optional(),
    carPayment: z.number().optional(),
    loanPayment: z.number().optional(),
  },
  financialOption: {
    financialOptionInterestRate: z.number().optional(),
    downPayment: z.number().optional(),
    loanTermMonths: z.number().optional(),
  }
})

export type ProjectROICalculatorSchema = z.infer<typeof projectROICalculatorSchema>
