import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { useSidebar } from "@olis/ui/components/sidebar";
import { cn } from "@olis/ui/lib/utils";

import type { UpdateFinancialProfileSchema } from "./schema";

const financialObligationFields: { accessor: `financialObligations.${keyof UpdateFinancialProfileSchema["financialObligations"]}`; label: string }[] = [
  {
    accessor: "financialObligations.currentElectricPayment",
    label: "Current electric payment?",
  },
  {
    accessor: "financialObligations.currentWaterPayment",
    label: "Current water payment?",
  },
  {
    accessor: "financialObligations.currentGasPayment",
    label: "Current gas payment?",
  },
  {
    accessor: "financialObligations.currentGardeningPayment",
    label: "Any gardening costs?",
  },
];

export function FinancialObligationsForm() {
  const { open: sidebarOpen } = useSidebar();
  const { control } = useFormContext<UpdateFinancialProfileSchema>();

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", sidebarOpen && "md:grid-cols-1")}>
      {financialObligationFields.map(financialObligationField => (
        <FormField
          key={financialObligationField.accessor}
          control={control}
          name={financialObligationField.accessor}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{financialObligationField.label}</FormLabel>
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
      ))}
    </div>
  );
}
