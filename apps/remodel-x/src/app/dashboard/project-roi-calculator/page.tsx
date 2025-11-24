"use client";

import { CameraIcon, ChartLineIcon, SaveIcon, SettingsIcon } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";

import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { defaultFormValues } from "@/features/project-roi-calculator/schemas";
import { FutureAssumptionsForm } from "@/features/project-roi-calculator/ui/components/forms/fields/future-assumptions";
import { NetWorthForm } from "@/features/project-roi-calculator/ui/components/forms/net-worth-form";
import { ROOTS } from "@olis/core/constants";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";
import { SectionSidebar } from "@olis/ui/components/navigation/section-sidebar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@olis/ui/components/popover";
import { Separator } from "@olis/ui/components/separator";

const STEPS = ["financial-snapshots", "future-projections"] as const

export default function ProjectROICalculatorPage() {
  const [step, setStep] = useQueryState(
    "step", 
    parseAsStringLiteral(STEPS).withDefault("financial-snapshots").withOptions({ history: "push", clearOnDefault: false })
  );

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
        <div className="h-full flex gap-2 min-h-0">
          <SectionSidebar
            baseUrl={ROOTS.remodelX.getProjectsROICalculatorRoot()}
            menuItems={[
              {
                label: "Financial Snapshots",
                Icon: CameraIcon,
                onClick: () => {
                  setStep("financial-snapshots")
                }
              },
              {
                label: "Future Projections",
                Icon: ChartLineIcon,
                onClick: () => {
                  setStep("future-projections")
                }
              }
            ]}
            customCheckIsActive={(href) => {
              const url = new URL(window.location.href).search
              return true
            }}
          >
            <div className="rounded-lg min-h-0">
              <div className="w-full flex gap-2">
                <Button variant="outline">
                  <SaveIcon />
                </Button>
                <Popover modal={false}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <SettingsIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="bg-card">
                    <div className="space-y-2">
                      <h2 className="text-lg font-bold uppercase">Future Assumptions</h2>
                      <Separator className="mb-4" />
                      <FutureAssumptionsForm />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </SectionSidebar>
          <div className="grow overflow-y-auto min-h-0 p-4">
            {step === "financial-snapshots" && <NetWorthForm />}
          </div>
        </div>
      </form>
      {/* <div>{formatAsDollars(afterHomeValue.homeValue || 0)}</div> */}
    </Form>
  );
}
