import React, { useCallback } from "react"
import { useFormContext, useWatch } from "react-hook-form"

import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@olis/ui/components/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olis/ui/components/select"
import { cn } from "@olis/ui/lib/utils"

import type { UploadProjectFilesSchema } from "../schema"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function UploadMetadataFields({ className, ...props }: Props) {
  const form = useFormContext<UploadProjectFilesSchema>()
  const itemType = useWatch({
    control: form.control,
    name: "entity.type",
    defaultValue: "trade",
  })

  const items = useCallback(() => {
    switch (itemType) {
      case "trade":
        console.log("trade")
        return [{ name: "trade", label: "Trade" }]
      case "scope":
        return [{ name: "scope", label: "Scope" }]
      case "addon":
        return []
      case "material":
        return []
    }
  }, [itemType])

  return (
    <div className={cn("space-y-4", className)}>
      <FormField
        name="entity.type"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Entity type</FormLabel>
            <FormControl>
              <Select defaultValue="trade" onValueChange={field.onChange} disabled={field.disabled}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trade">
                    Trade
                  </SelectItem>
                  <SelectItem value="scope">
                    Scope
                  </SelectItem>
                  <SelectItem value="addon">
                    Addon
                  </SelectItem>
                  <SelectItem value="material">
                    Material
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="entity.id"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Entity</FormLabel>
            <FormControl>
              <Select
                key={field.name}
                defaultValue={field.name}
                onValueChange={field.onChange}
                disabled={field.disabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {items().map(item => (
                    <SelectItem key={item?.name} value={item.label}>
                      {item.label}
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
  )
}
