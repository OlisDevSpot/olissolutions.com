import { useFormContext } from "react-hook-form";

import type { UpdateJobsiteProfileSchema } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form/schema";

import { roofLocations, roofTypes } from "@olis/core/constants";
import { capitalize } from "@olis/core/lib/formatters";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olis/ui/components/select";

export function RoofFields() {
  const form = useFormContext<UpdateJobsiteProfileSchema>();
  return (
    <div className="flex gap-4 items-center">
      <FormField
        control={form.control}
        name="exterior.roof.roofLocation"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Roof Location</FormLabel>
            <FormControl className="w-full">
              <Select
                {...field}
                value={field.value || ""}
                onValueChange={val => field.onChange(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Roof location?" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {roofLocations.map(roofLocation => (
                    <SelectItem key={roofLocation} value={roofLocation}>
                      {capitalize(roofLocation)}
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
        name="exterior.roof.roofType"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Roof Type</FormLabel>
            <FormControl className="w-full">
              <Select
                {...field}
                value={field.value || ""}
                onValueChange={val => field.onChange(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Existing roof type?" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {roofTypes.map(roofType => (
                    <SelectItem key={roofType} value={roofType}>
                      {capitalize(roofType)}
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
        name="exterior.roof.roofAge"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Roof age (years)</FormLabel>
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
