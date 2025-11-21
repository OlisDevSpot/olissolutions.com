import { HomeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { FinancialSnapshotCategory, ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { convertToNumber, formatAsDollars } from "@olis/core/lib/formatters";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  snapshotTime: Extract<FinancialSnapshotCategory, "beforeProjectNetWorth" | "afterProjectNetWorth">;
  placeholder?: string;
}

export function HomeValueField({ 
  snapshotTime, 
  placeholder,
  className, 
  ...props
}: Props) {
  const form = useFormContext<ProjectROICalculatorSchema>()
  
  return (
    <FormField
      control={form.control}
      name={`${snapshotTime}.homeValue`}
      render={({ field }) => (
        <FormItem className="w-fit flex items-center gap-4">
          <FormControl className="w-fit">
            <Input
              placeholder={placeholder ?? "$1,000,000"}
              type="text"
              dir="rtl"
              {...field}
              {...props}
              className="border-none outline-none bg-transparent dark:bg-transparent focus-visible:ring-0 md:text-2xl py-4 h-20 placeholder:text-muted-foreground/20 md:max-w-42"
              value={field.value ? `${formatAsDollars(field.value)}` : ""}
              onChange={(e) => {
                const valueAsNumber = convertToNumber(e.target.value);
                field.onChange(e.target.value === "" ? null : valueAsNumber);
              }}
            />
          </FormControl>
          <FormLabel>
            <span className="flex items-center p-2 border border-border rounded-lg shadow-2xl shadow-white">
              <HomeIcon className="stroke-muted-foreground/30" />
            </span>
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
