import { useFormContext } from "react-hook-form";

import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { convertToNumber } from "@olis/core/lib/formatters";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";

const expenseFields = [
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

export function FutureAssumptionsForm() {
  const form = useFormContext<ProjectROICalculatorSchema>();
  
  return (
    <div className="space-y-4">
      {expenseFields.map(({ name, label, placeholder }) => (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full flex justify-between items-center ">
              <FormLabel>{label}</FormLabel>
              <div className="w-28 flex items-center justify-center">
                <FormControl className="p-0 h-9">
                  <div className="flex items-center rounded-md border-border border overflow-hidden">
                    <Input
                      placeholder={placeholder}
                      type="number"
                      {...field}
                      value={field.value ? field.value : ""}
                      className="px-4 py-1 dark:bg-transparent border-none bg-transparent border-nonefd focus-visible:ring-0 focus-visible:border-none"
                      onChange={(e) => {
                        const valueAsNumber = convertToNumber(e.target.value, "percent");
                        field.onChange(e.target.value === "" ? null : valueAsNumber);
                      }}
                    />
                    <span className="border-l border-border px-2 text-sm h-full flex items-center bg-muted">%</span>
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}
