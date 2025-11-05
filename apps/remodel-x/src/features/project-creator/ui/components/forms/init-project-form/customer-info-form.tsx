import { useFormContext } from "react-hook-form";

import type { InitProjectFormSchema } from "@/features/project-creator/ui/components/forms/init-project-form/schemas";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";

export function CustomerInfoForm() {
  const { control } = useFormContext<InitProjectFormSchema>();

  return (
    <>
      <FormField
        control={control}
        name="customer.firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} autoComplete="off" autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="customer.lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" {...field} autoComplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
