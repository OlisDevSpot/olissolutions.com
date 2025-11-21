"use client";

import { useForm } from "react-hook-form";

import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { defaultFormValues } from "@/features/project-roi-calculator/schemas";
import { FutureAssumptionsForm } from "@/features/project-roi-calculator/ui/components/forms/fields/financial-snapshot/future-assumptions-form";
import { NetWorthForm } from "@/features/project-roi-calculator/ui/components/forms/net-worth-form";
import { Form } from "@olis/ui/components/form";

export default function ProjectROICalculatorPage() {
  const form = useForm<ProjectROICalculatorSchema>({
    defaultValues: defaultFormValues
  })

  const calculate = (data: ProjectROICalculatorSchema) => {
    console.log(data);
  };
  
  return (
    <Form {...form}>
      <form
        className="h-full gap-4 flex flex-col [&>div_input]:flex-1 [&>div_input[type=number]]:max-w-[200px]"
        onSubmit={form.handleSubmit((data: ProjectROICalculatorSchema) => {
          calculate(data)
        })}
      >
        <div className="h-full flex gap-4 min-h-0">
          <div className="min-w-[300px] w-[300px] border-muted-foreground/30 border p-4 rounded-lg min-h-0"> 
            <h2 className="p-4 text-2xl font-bold">Assumptions</h2>
            <FutureAssumptionsForm />
          </div>
          <div className="grow overflow-y-auto min-h-0">
            <NetWorthForm />
          </div>
        </div>
      </form>
      {/* <div>{formatAsDollars(afterHomeValue.homeValue || 0)}</div> */}
    </Form>
  );
}
