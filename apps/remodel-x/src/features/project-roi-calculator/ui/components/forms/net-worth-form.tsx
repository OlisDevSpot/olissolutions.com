"use client";

import { useForm } from "react-hook-form";

import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { defaultFormValues } from "@/features/project-roi-calculator/schemas";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";

import { CurrentFinancialSituationFields } from "./fields/current-financial-situation";
import { FinancialSnapshot } from "./fields/financial-snapshot-fields";

export function NetWorthForm() {
  const form = useForm<ProjectROICalculatorSchema>({
    defaultValues: defaultFormValues
  })

  const calculate = (data: ProjectROICalculatorSchema) => {
    console.log(data);
  };
  
  return (
    <Form {...form}>
      <form
        className="gap-4 flex flex-col [&>div_input]:flex-1 [&>div_input[type=number]]:max-w-[200px]"
        onSubmit={form.handleSubmit((data: ProjectROICalculatorSchema) => {
          calculate(data)
        })}
      >
        <ProjectFlowSection>
          <ProjectFlowSection.Header title="Current Monthly Payments" description="Your current monthly recurring expenses" />
          <ProjectFlowSection.Content>
            <CurrentFinancialSituationFields />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
        <ProjectFlowSection>
          <ProjectFlowSection.Header title="Current Financial Snapshot" description="Your current financial snapshot, before construction" />
          <ProjectFlowSection.Content>
            <FinancialSnapshot snapshotTime="currentNetWorth" />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
        <ProjectFlowSection>
          <ProjectFlowSection.Header title="Post-Construction Financial Snapshot" description="Potential financial snapshot, after construction" />
          <ProjectFlowSection.Content>
            <FinancialSnapshot snapshotTime="afterNetWorth" />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
        <Button type="submit" className="w-fit">Calculate</Button>
      </form>
    </Form>
  );
}
