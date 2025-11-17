import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { useSidebar } from "@olis/ui/components/sidebar";
import { cn } from "@olis/ui/lib/utils";

import type { UpdateFinancialProfileSchema } from "./schema";

const homeValueFields: { accessor: `homeValue.${keyof UpdateFinancialProfileSchema["homeValue"]}`; label: string; placeholder?: string }[] = [
  {
    accessor: "homeValue.approxHomeValue",
    label: "Approx. Home Value?",
    placeholder: "e.g. $750,000",
  },
  {
    accessor: "homeValue.mortgageBalance",
    label: "Mortgage Balance?",
    placeholder: "e.g. $250,000",
  },
  {
    accessor: "homeValue.mortgagePayment",
    label: "Mortgage Payment?",
    placeholder: "e.g. $3,200",
  },
];

export function HomeValueForm() {
  const { open: sidebarOpen } = useSidebar();
  const { control } = useFormContext<UpdateFinancialProfileSchema>();

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", sidebarOpen && "md:grid-cols-1")}>
      {homeValueFields.map(homeValueField => (
        <FormField
          key={homeValueField.accessor}
          control={control}
          name={homeValueField.accessor}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{homeValueField.label}</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder={homeValueField.placeholder}
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
      ))}
    </div>
  );
}
