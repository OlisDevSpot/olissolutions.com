import { capitalize } from "@olis/core/lib/formatters";
import { useFormContext } from "react-hook-form";

import type { Variable } from "@olis/db/schema/one-stop-sales";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { Input } from "@olis/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olis/ui/components/select";
import { Switch } from "@olis/ui/components/switch";

interface Props {
  variable: Variable;
}

export function DynamicField({ variable }: Props) {
  const form = useFormContext();

  switch (variable.dataType) {
    case "text":
      return (
        <FormField
          key={variable.id}
          control={form.control}
          name={variable.key}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{variable.label}</FormLabel>
              <FormControl className="w-full">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "number":
      return (
        <FormField
          control={form.control}
          name={variable.key}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="min-w-max">{variable.label}</FormLabel>
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
      );

    case "boolean":
      return (
        <FormField
          control={form.control}
          name={variable.key}
          render={({ field }) => (
            <FormItem className="w-full flex gap-4 items-center">
              <FormLabel className="min-w-max">{variable.label}</FormLabel>
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
      );

    case "select": {
      const isNumber = typeof variable.options?.[0] === "number";

      return (
        <FormField
          control={form.control}
          name={variable.key}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{variable.label}</FormLabel>
              <FormControl className="w-full">
                <Select
                  {...field}
                  value={isNumber ? String(field.value) : field.value || ""}
                  onValueChange={val => field.onChange(isNumber ? Number(val) : val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={variable.label} />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {variable.options?.map(option => (
                      <SelectItem key={option} value={String(option)}>
                        {capitalize(String(option))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    default:
      return null;
  }
}
