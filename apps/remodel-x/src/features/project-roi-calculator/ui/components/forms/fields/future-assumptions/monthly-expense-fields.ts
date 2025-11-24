import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

export const monthlyExpenseFields = [
  {
    name: "futureAssumptions.homeAppreciationRate",
    label: "Home appreciation",
    placeholder: "7",
  },
  {
    name: "futureAssumptions.electricIncreaseRate",
    label: "Electric rate increase",
    placeholder: "6",
  },
  {
    name: "futureAssumptions.waterIncreaseRate",
    label: "Water rate increase",
    placeholder: "6",
  },
  {
    name: "futureAssumptions.gasIncreaseRate",
    label: "Gas rate increase",
    placeholder: "6",
  },
  {
    name: "futureAssumptions.gardeningIncreaseRate",
    label: "Gardening rate increase",
    placeholder: "6",
  },
] as const satisfies { name: `futureAssumptions.${keyof ProjectROICalculatorSchema["futureAssumptions"]}`; label: string; placeholder: string }[]
