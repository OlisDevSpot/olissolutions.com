import z from "zod";

const _financialSnapshotSchema = z.object({
  netWorth: z.object({
    homeValue: z.number().optional(),
    loans: z.array(z.object({
      label: z.string().min(1),
      balance: z.number(),
      payment: z.number(),
    })).optional(),
  }),
  otherPayments: z.object({
    electricPayment: z.number().optional(),
    gasPayment: z.number().optional(),
    waterPayment: z.number().optional(),
    gardeningPayment: z.number().optional(),
    misc: z.number().optional(),
  }),
})

export const projectROICalculatorSchema = z.object({
  beforeProjectNetWorth: z.object({
    homeValue: z.number().optional(),
    otherLoans: z.array(z.object({
      label: z.string().min(1),
      balance: z.number(),
      payment: z.number(),
    })).optional(),
  }),
  afterProjectNetWorth: z.object({
    homeValue: z.number().optional(),
    otherLoans: z.array(z.object({
      label: z.string().min(1),
      balance: z.number(),
      payment: z.number(),
    })).optional(),
  }),
  currentPayment: z.object({
    electricPayment: z.number().optional(),
    gasPayment: z.number().optional(),
    waterPayment: z.number().optional(),
    gardeningPayment: z.number().optional(),
    misc: z.number().optional(),
  }),
  afterPayment: z.object({
    electricPayment: z.number().optional(),
    gasPayment: z.number().optional(),
    waterPayment: z.number().optional(),
    gardeningPayment: z.number().optional(),
  }),
  financialOption: z.object({
    financialOptionInterestRate: z.number().optional(),
    downPayment: z.number().optional(),
    loanTermMonths: z.number().optional(),
  }),
  futureAssumptions: z.object({
    years: z.number().optional(),
    homeAppreciationRate: z.number(),
    electricIncreaseRate: z.number().optional(),
    gasIncreaseRate: z.number().optional(),
    waterIncreaseRate: z.number().optional(),
    gardeningIncreaseRate: z.number().optional(),
  })
})

export type ProjectROICalculatorSchema = z.infer<typeof projectROICalculatorSchema>

export type FinancialSnapshotCategory = keyof ProjectROICalculatorSchema

export const defaultFormValues: ProjectROICalculatorSchema = {
  afterProjectNetWorth: { },
  afterPayment: { },
  beforeProjectNetWorth: { },
  currentPayment: { },
  financialOption: { },
  futureAssumptions: { 
    years: 5,
    electricIncreaseRate: 9.4,
    waterIncreaseRate: 10.3,
    gasIncreaseRate: 13.1,
    homeAppreciationRate: 4,
    gardeningIncreaseRate: 5,
  }
}
