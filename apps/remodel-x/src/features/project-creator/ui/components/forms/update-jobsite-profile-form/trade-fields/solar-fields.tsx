import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import type { UpdateJobsiteProfileSchema } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form/schema";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { Switch } from "@olis/ui/components/switch";

export function SolarFields() {
  const form = useFormContext<UpdateJobsiteProfileSchema>();

  const hasSolar = form.watch("exterior.solar.hasSolar");

  useEffect(() => {
    if (!hasSolar) {
      form.unregister("exterior.solar.numPanels");
    }
  }, [hasSolar]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <FormField
        control={form.control}
        name="exterior.solar.hasSolar"
        render={({ field }) => (
          <FormItem className="w-full flex gap-4 items-center">
            <FormLabel className="min-w-max">Existing solar?</FormLabel>
            <FormControl className="">
              <Switch
                checked={field.value ?? false} // ✅ map field.value → checked
                onCheckedChange={field.onChange} // ✅ map checked → field.onChange
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {hasSolar && (
        <FormField
          control={form.control}
          name="exterior.solar.numPanels"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="min-w-max">Number of panels</FormLabel>
              <FormControl className="">
                <Input
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
      )}
    </div>
  );
}
