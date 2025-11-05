import type { EnergyEfficiencyStepsKey } from "@/features/education/types";

import { EDUCATION_FLOW_DATA } from "@/features/education/lib/education-flow-data";

export default async function EnergyEfficiencyStepPage({ params }: { params: Promise<{ step: EnergyEfficiencyStepsKey }> }) {
  const { step } = await params;

  const currentStep = EDUCATION_FLOW_DATA[step as keyof typeof EDUCATION_FLOW_DATA];
  
  return (
    <div className="space-y-4">
      <h1>{ currentStep.title }</h1>
      <div>
        { currentStep.questions.map((question) => {
          if (typeof question.answer === "string") {
            return (
              <div>
                <h2>{ question.question }</h2>
                <p>{ question.answer }</p>
              </div>
            );
          }
          return <question.answer key={question.question} />
        })}
      </div>
    </div>
  );
}
