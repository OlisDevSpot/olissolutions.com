import { windowsTypes } from "@olis/core/constants";
import { capitalize } from "@olis/core/lib/formatters";
import { useFormContext } from "react-hook-form";

import type { UpdateJobsiteProfileSchema } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form/schema";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olis/ui/components/select";

export function WindowsFields() {
  const form = useFormContext<UpdateJobsiteProfileSchema>();

  return (
    <div className="flex gap-4 items-center">
      <FormField
        control={form.control}
        name="exterior.windows.windowsType"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="min-w-max">Existing windows type?</FormLabel>
            <FormControl className="">
              <Select
                {...field}
                value={field.value || ""}
                onValueChange={val => field.onChange(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Existing windows type?" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {windowsTypes.map(windowsType => (
                    <SelectItem key={windowsType} value={windowsType}>
                      {capitalize(windowsType)}
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
        name="exterior.windows.windowsAge"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Windows age (years)</FormLabel>
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
  );
}
