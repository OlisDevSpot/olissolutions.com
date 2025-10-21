import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import type { Pricing, Upgrade } from "@/shared/schema";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

interface Props {
  pricingVariables: (Pricing & { upgrade: Upgrade })[];
}

export function PricingSettingsForm({ pricingVariables }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const form = useForm({
    defaultValues: pricingVariables.reduce((acc, variable) => ({ ...acc, [variable.key]: variable.defaultValue }), {}) as Record<string, any>,
  });

  useEffect(() => {
    if (tabsRef.current) {
      const rect = tabsRef.current.getBoundingClientRect();
      const container = tabsRef.current.closest(".main-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        setCollapsed(containerRect.width <= rect.width + 16);
      }
    }
  }, []);

  const mappedPricingByUpgrade = pricingVariables.reduce((acc, pricingVariableEntry) => {
    const { upgrade, ...pricingVariable } = pricingVariableEntry;

    if (!(upgrade.id in acc)) {
      acc[upgrade.id] = {
        upgrade,
        pricingVariables: [],
      };
    }

    acc[upgrade.id]?.pricingVariables.push(pricingVariable);
    return acc;
  }, {} as { [id: number]: { upgrade: Upgrade; pricingVariables: Pricing[] } });

  const pricingVariablesGroups = Object.values(mappedPricingByUpgrade).sort((a, b) => a.upgrade.label.localeCompare(b.upgrade.label));

  function onSubmit(input: any) {
    console.log(input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue={String(pricingVariablesGroups[0]?.upgrade.id)}>
          {!collapsed
            ? (
                <TabsList ref={tabsRef}>
                  {pricingVariablesGroups.map(pricingVariablesGroup => (
                    <TabsTrigger key={pricingVariablesGroup.upgrade.id} value={String(pricingVariablesGroup.upgrade.id)}>
                      {pricingVariablesGroup.upgrade.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              )
            : (
                <Select defaultValue={String(pricingVariablesGroups[0]?.upgrade.id)}>
                  <SelectTrigger>
                    <SelectValue defaultValue={String(pricingVariablesGroups[0]?.upgrade.id)} />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingVariablesGroups.map(pricingVariablesGroup => (
                      <SelectItem key={pricingVariablesGroup.upgrade.id} value={String(pricingVariablesGroup.upgrade.id)} className="p-1 flex w-[232px]">
                        <TabsList ref={tabsRef} className="w-[200px] bg-transparent dark:bg-transparent outline-none border-none dark:border-none dark:outline-none">
                          <TabsTrigger value={String(pricingVariablesGroup.upgrade.id)} className="w-full p-0 h-9 bg-transparent dark:bg-transparent">
                            <div className="w-full text-left">
                              {pricingVariablesGroup.upgrade.label}
                            </div>
                          </TabsTrigger>
                        </TabsList>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

          {pricingVariablesGroups.map(pricingVariablesGroup => (
            <TabsContent key={pricingVariablesGroup.upgrade.id} value={String(pricingVariablesGroup.upgrade.id)}>
              <Card>
                <CardHeader>
                  <CardTitle>{pricingVariablesGroup.upgrade.label}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-6">
                  {pricingVariablesGroup.pricingVariables.map(pricingVariable => (
                    <FormField
                      key={pricingVariable.key}
                      control={form.control}
                      name={pricingVariable.key}
                      render={({ field }) => (
                        <FormItem className="flex-1 min-w-[200px]">
                          <FormLabel>{pricingVariable.label}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
