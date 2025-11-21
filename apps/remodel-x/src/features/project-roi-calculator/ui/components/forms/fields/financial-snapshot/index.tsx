"use client";

import { ArrowRightIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import type { FinancialSnapshotCategory, ProjectROICalculatorSchema } from "@/features/project-roi-calculator/schemas";

import { convertToNumber, formatAsDollars } from "@olis/core/lib/formatters";
import { Button } from "@olis/ui/components/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { cn } from "@olis/ui/lib/utils";

import { CurrentFinancialSituationFields } from "../current-financial-situation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  snapshotTime: Extract<FinancialSnapshotCategory, "beforeProjectNetWorth" | "afterProjectNetWorth">;
  years?: number;
}

function calcAppreciation(startingValue: number, rate: number, years: number = 0) {
  return Math.round(startingValue * (1 + rate / 100) ** (years))
}

export function FinancialSnapshot({ 
  snapshotTime, 
  years = 0, 
  className, 
  ...props
}: Props) {
  const form = useFormContext<ProjectROICalculatorSchema>()

  const { 
    afterProjectNetWorth: { otherLoans: afterProjectOtherLoans = [] }, 
    futureAssumptions: { homeAppreciationRate }
  } = form.getValues();

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: `${snapshotTime}.otherLoans`,
  });

  const homeValue = useWatch({
    control: form.control,
    name: `${snapshotTime}.homeValue`,
  })

  function addOrUpdateLoan(index: number) {
    const fieldOfArray = form.getValues(`${snapshotTime}.otherLoans.${index}`)!

    update(index, {
      label: fieldOfArray.label,
      balance: fieldOfArray.balance,
      payment: fieldOfArray.payment
    })

    const existingLoanIndex = afterProjectOtherLoans.findIndex((loan) => {
      return loan.label === fieldOfArray.label
    })
    const existingLoan = afterProjectOtherLoans[existingLoanIndex]

    if (existingLoan) {
      return form.setValue(`afterProjectNetWorth.otherLoans`, [
        ...Array.from(form.getValues(`afterProjectNetWorth.otherLoans`) ?? []).map((loan) => {
          if (loan.label === fieldOfArray.label) {
            return {
              label: fieldOfArray.label,
              balance: fieldOfArray.balance,
              payment: fieldOfArray.payment
            }
          }
          return loan
        })
      ])
    }

    form.setValue(`afterProjectNetWorth.otherLoans`, [
      ...Array.from(form.getValues(`afterProjectNetWorth.otherLoans`) ?? []),
      {
        label: fieldOfArray.label,
        balance: fieldOfArray.balance,
        payment: fieldOfArray.payment
      }
    ])
  }

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      {years > 0 && (
        <div>
          <FormField
            control={form.control}
            name={`${snapshotTime}.homeValue`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Home value</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="e.g. $1,000,000"
                    type="text"
                    {...field}
                    value={field.value && homeValue && years > 0 ? `${formatAsDollars(calcAppreciation(homeValue, homeAppreciationRate, years))}` : field.value && homeValue && years === 0 ? `${formatAsDollars(homeValue)}` : ""}
                    onChange={(e) => {
                      const valueAsNumber = convertToNumber(e.target.value);
                      console.log({ valueAsNumber })
                      field.onChange(e.target.value === "" ? null : valueAsNumber);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      <CurrentFinancialSituationFields />
      {fields.map((fieldOfArray, index) => (
        <div key={fieldOfArray.id} className="flex gap-4 items-center h-24">
          <div className="flex gap-4 items-end p-4 rounded-lg border border-muted-foreground/20 h-full w-full">
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
                      placeholder="e.g. $500,000"
                      type="text"
                      {...field}
                      value={field.value ? `${formatAsDollars(field.value)}` : ""} // null → ""
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
                      placeholder="e.g. $2,300"
                      type="text"
                      {...field}
                      value={field.value ? `${formatAsDollars(field.value)}` : ""} // null → ""
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
            <Button type="button" size="icon" variant="destructive" onClick={() => remove(index)}>
              <TrashIcon />
            </Button>
          </div>
          {snapshotTime === "beforeProjectNetWorth"
            && (
              <Button
                type="button"
                variant="outline"
                className="block h-full bg-primary"
                onClick={() => {
                  addOrUpdateLoan(index)
                }}
              >
                <ArrowRightIcon />
              </Button>
            )}
        </div>
      ))}
      <Button type="button" onClick={() => append({ label: "", balance: 0, payment: 0 })}>Add Loan</Button>
    </div>
  );
}
