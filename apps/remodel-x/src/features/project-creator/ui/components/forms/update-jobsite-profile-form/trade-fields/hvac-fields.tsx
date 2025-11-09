import { useFormContext } from "react-hook-form";

import type { UpdateJobsiteProfileSchema } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form/schema";

import { hvacComponents, hvacTypes } from "@olis/core/constants";
import { capitalize } from "@olis/core/lib/formatters";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olis/ui/components/select";

export function HvacFields() {
  const form = useFormContext<UpdateJobsiteProfileSchema>();
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <FormField
          control={form.control}
          name="exterior.hvac.hvacType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>HVAC Type</FormLabel>
              <FormControl className="w-full">
                <Select
                  {...field}
                  value={field.value || ""}
                  onValueChange={val => field.onChange(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Existing hvac type?" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {hvacTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {capitalize(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exterior.hvac.hvacComponents"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>HVAC Components</FormLabel>
              <FormControl className="w-full">
                <Select
                  {...field}
                  value={field.value || ""}
                  onValueChange={val => field.onChange(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Existing hvac components?" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {hvacComponents.map(component => (
                      <SelectItem key={component} value={component}>
                        {capitalize(component)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exterior.hvac.hvacAge"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>HVAC age (years)</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="e.g. 25"
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
      </div>
    </div>
  );
}
