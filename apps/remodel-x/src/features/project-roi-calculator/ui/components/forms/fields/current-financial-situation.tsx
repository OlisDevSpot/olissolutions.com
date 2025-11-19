import { useFormContext } from "react-hook-form"

import type { ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";

export function CurrentFinancialSituationFields() {
  const form = useFormContext<ProjectROICalculatorSchema>()
  
  return (
    <div className="space-y-4">
      <InputGroupWrapper title="Utilities">
        <FormField
          control={form.control}
          name="currentPayment.electricPayment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Electric Payment</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="e.g. 250"
                  type="number"
                  {...field}
                  value={field.value ?? ""} // null → ""
                  onChange={e =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPayment.waterPayment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Water Payment</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="e.g. 200"
                  type="number"
                  {...field}
                  value={field.value ?? ""} // null → ""
                  onChange={e =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPayment.gasPayment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Gas Payment</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="e.g. 150"
                  type="number"
                  {...field}
                  value={field.value ?? ""} // null → ""
                  onChange={e =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </InputGroupWrapper>
      <InputGroupWrapper title="Maintenance">
        <FormField
          control={form.control}
          name="currentPayment.gardeningPayment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Gardener</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="e.g. 100"
                  type="number"
                  {...field}
                  value={field.value ?? ""} // null → ""
                  onChange={e =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPayment.misc"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Misc.</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="e.g. 100"
                  type="number"
                  {...field}
                  value={field.value ?? ""} // null → ""
                  onChange={e =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </InputGroupWrapper>
    </div>
  )
}

interface InputGroupWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function InputGroupWrapper({ title, children }: InputGroupWrapperProps) {
  return (
    <div className="rounded-lg border border-border space-y-2">
      <div className="w-full border-b bg-muted p-4 py-2">
        <h3 className="text-sm text-muted-foreground font-semibold">{title}</h3>
      </div>
      <div className="p-4 flex gap-4 [&>div]:flex-1 [&>div]:max-w-[200px]">
        {children}
      </div>
    </div>
  )
}
