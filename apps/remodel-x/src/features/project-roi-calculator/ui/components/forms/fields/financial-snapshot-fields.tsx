"use client";

import { TrashIcon } from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import type { FinancialSnapshotCategory, ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { Button } from "@olis/ui/components/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { cn } from "@olis/ui/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  snapshotTime: Extract<FinancialSnapshotCategory, "currentNetWorth" | "afterNetWorth">;
}

function convertToMask(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function convertToNumber(value: string) {
  return Number(value.replace(/\D/g, ""));
}

export function FinancialSnapshot({ snapshotTime, className, ...props }: Props) {
  const form = useFormContext<ProjectROICalculatorSchema>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `${snapshotTime}.otherLoans`,
  });

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div>
        <FormField
          control={form.control}
          name={`${snapshotTime}.homeValue`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Home value</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="e.g. 1000000"
                  type="text"
                  {...field}
                  value={field.value ? `${convertToMask(field.value)}` : ""} // null → ""
                  onChange={(e) => {
                    const valueAsNumber = convertToNumber(e.target.value);
                    field.onChange(e.target.value === "" ? null : valueAsNumber);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {fields.map((fieldOfArray, index) => (
        <div key={fieldOfArray.id} className="flex gap-4 items-end">
          <FormField
            control={form.control}
            name={`${snapshotTime}.otherLoans.${index}.label`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Liability Label</FormLabel>
                <FormControl className="w-full">
                  <Input 
                    placeholder="e.g. Mortgage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${snapshotTime}.otherLoans.${index}.balance`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Balance</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="e.g. 500000"
                    type="text"
                    {...field}
                    value={field.value ? `${convertToMask(field.value)}` : ""} // null → ""
                    onChange={(e) => {
                      const valueAsNumber = convertToNumber(e.target.value);
                      field.onChange(e.target.value === "" ? null : valueAsNumber);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${snapshotTime}.otherLoans.${index}.payment`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Payment</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="e.g. 2300"
                    type="text"
                    {...field}
                    value={field.value ? `${convertToMask(field.value)}` : ""} // null → ""
                    onChange={(e) => {
                      const valueAsNumber = convertToNumber(e.target.value);
                      field.onChange(e.target.value === "" ? null : valueAsNumber);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => remove(index)}>
            <TrashIcon />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ label: "", balance: 0, payment: 0 })}>Add Loan</Button>
    </div>
  );
}
