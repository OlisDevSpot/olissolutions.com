import { foundationTypes, insulationLevels } from "@olis/core/constants";
import { capitalize } from "@olis/core/lib/formatters";
import { useFormContext } from "react-hook-form"; 

import type { UpdateJobsiteProfileSchema } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form/schema";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olis/ui/components/select";

export function AtticBasementFields() {
  const form = useFormContext<UpdateJobsiteProfileSchema>();
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <FormField
          control={form.control}
          name="exterior.atticBasement.atticInsulationLevel"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Attic insulation level</FormLabel>
              <FormControl className="w-full">
                <Select
                  {...field}
                  value={field.value || ""}
                  onValueChange={val => field.onChange(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Existing attic insulation level?" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {insulationLevels.map(level => (
                      <SelectItem key={level} value={level}>
                        {capitalize(level)}
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
          name="exterior.atticBasement.atticInsulationAge"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Attic insulation age (years)</FormLabel>
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
      <div className="flex gap-4 items-center">
        <FormField
          control={form.control}
          name="exterior.atticBasement.foundationType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Foundation Type</FormLabel>
              <FormControl className="w-full">
                <Select
                  {...field}
                  value={field.value || ""}
                  onValueChange={val => field.onChange(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Foundation type?" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {foundationTypes.map(foundationType => (
                      <SelectItem key={foundationType} value={foundationType}>
                        {capitalize(foundationType)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
