import { useFormContext } from "react-hook-form";

import type { InitProjectFormSchema } from "@/features/project-creator/ui/components/forms/init-project-form/schemas";

import { electricProviders } from "@olis/core/constants";
import { capitalize } from "@olis/core/lib/formatters";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olis/ui/components/select";

export function JobsiteForm() {
  const { control } = useFormContext<InitProjectFormSchema>();

  return (
    <>
      <FormField
        control={control}
        name="jobsite.numStories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of stories</FormLabel>
            <FormControl>
              <Select
                {...field}
                value={String(field.value)}
                onValueChange={val => field.onChange(Number(val))}
              >
                <SelectTrigger className="w-full" autoFocus>
                  <SelectValue placeholder="How many stories?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="jobsite.yearBuilt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year built</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="E.g. 2001?"
                {...field}
                value={!field.value ? "" : field.value} // make sure empty values don't become NaN
                onChange={e => field.onChange(e.target.valueAsNumber)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="jobsite.electricProvider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Electric provider</FormLabel>
            <FormControl>
              <Select
                {...field}
                value={field.value || ""}
                onValueChange={val => field.onChange(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Electric provider?" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {electricProviders.map(provider => (
                    <SelectItem key={provider} value={provider}>
                      {capitalize(provider)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
