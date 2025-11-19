import z from "zod";

const financialSnapshotSchema = z.object({
  netWorth: z.object({}),
  payments: z.object({}),
})

export const projectROICalculatorSchema = z.object({
  currentNetWorth: z.object({
    homeValue: z.number().optional(),
    otherLoans: z.array(z.object({
      label: z.string().min(1),
      balance: z.number(),
      payment: z.number(),
    })).optional(),
  }),
  afterNetWorth: z.object({
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
  futureProjection: z.object({
    years: z.number().optional(),
    houseAppreciationRate: z.number().optional(),
  })
})

export type ProjectROICalculatorSchema = z.infer<typeof projectROICalculatorSchema>

export type FinancialSnapshotCategory = keyof ProjectROICalculatorSchema

export const defaultFormValues: ProjectROICalculatorSchema = {
  afterNetWorth: { },
  afterPayment: { },
  currentNetWorth: { },
  currentPayment: { },
  financialOption: { },
  futureProjection: { }
}
