import { useForm } from "react-hook-form";

import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

export function ProjectROICalculatorForm() {
  const form = useForm<ProjectROICalculatorSchema>({
    defaultValues: {
      currentNetWorth: {
        carBalance: 0,
        constructionDebt: 0,
        creditCardBalance: 0,
        homeValue: 0,
        mortgageBalance: 0,
      }
    }
  })
  return (
    <Form {...form}>
      <form className="gap-4 flex flex-col">
        <Input type="number" {...form.register("currentNetWorth.carBalance")} />
      </form>
    </Form>
  );
}
