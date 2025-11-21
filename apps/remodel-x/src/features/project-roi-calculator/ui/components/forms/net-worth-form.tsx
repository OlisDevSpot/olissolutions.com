"use client";

import { useFormContext } from "react-hook-form";

import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";

import { FinancialSnapshot } from "./fields/financial-snapshot";
import { HomeValueField } from "./fields/financial-snapshot/home-value-field";

export function NetWorthForm() {
  const form = useFormContext<ProjectROICalculatorSchema>();
  
  return (
    <div>
      <div className="flex gap-4 [&>div]:flex-1">
        <ProjectFlowSection>
          <ProjectFlowSection.Header title="Current Financial Snapshot" description="Your current financial snapshot, before construction">
            <HomeValueField snapshotTime="beforeProjectNetWorth" />
          </ProjectFlowSection.Header>
          <ProjectFlowSection.Content>
            <FinancialSnapshot snapshotTime="beforeProjectNetWorth" />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
        <ProjectFlowSection>
          <ProjectFlowSection.Header title="Post-Construction Financial Snapshot" description="Potential financial snapshot, after construction">
            <HomeValueField snapshotTime="afterProjectNetWorth" />
          </ProjectFlowSection.Header>
          <ProjectFlowSection.Content>
            <FinancialSnapshot snapshotTime="afterProjectNetWorth" />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
      </div>
      <div className="flex gap-4 [&>div]:flex-1">
        <ProjectFlowSection>
          <ProjectFlowSection.Header title={`${form.getValues("futureAssumptions.years")} Year Projection`} description="Your projected future financial snapshot" />
          <ProjectFlowSection.Content>
            <FinancialSnapshot snapshotTime="beforeProjectNetWorth" years={form.getValues("futureAssumptions.years")} />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
        <ProjectFlowSection>
          <ProjectFlowSection.Header title={`${form.getValues("futureAssumptions.years")} Year Projection`} description="Your projected future financial snapshot" />
          <ProjectFlowSection.Content>
            <FinancialSnapshot snapshotTime="afterProjectNetWorth" years={form.getValues("futureAssumptions.years")} />
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
      </div>
    </div>
  );
}
