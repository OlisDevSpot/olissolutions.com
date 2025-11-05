import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { useSidebar } from "@olis/ui/components/sidebar";
import { Switch } from "@olis/ui/components/switch";
import { cn } from "@olis/ui/lib/utils";

import type { UpdateFinancialProfileSchema } from "./schema";

const disadvantagesFields: { accessor: `disadvantages.${keyof UpdateFinancialProfileSchema["disadvantages"]}`; label: string }[] = [
  {
    accessor: "disadvantages.isSenior",
    label: "Senior citizen?",
  },
  {
    accessor: "disadvantages.isRetired",
    label: "Retired?",
  },
  {
    accessor: "disadvantages.isFixedIncome",
    label: "Fixed income?",
  },
  {
    accessor: "disadvantages.isLowIncome",
    label: "Low income?",
  },
  {
    accessor: "disadvantages.isHighElectricPayment",
    label: "High electric payment?",
  },
  {
    accessor: "disadvantages.isGovtAssisted",
    label: "Government assisted?",
  },
];

export function DisadvantagesForm() {
  const { open: sidebarOpen } = useSidebar();
  const { control } = useFormContext<UpdateFinancialProfileSchema>();

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", sidebarOpen && "md:grid-cols-1")}>
      {disadvantagesFields.map(disadvantagesField => (
        <FormField
          key={disadvantagesField.accessor}
          control={control}
          name={disadvantagesField.accessor}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{disadvantagesField.label}</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                  ref={field.ref}
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
