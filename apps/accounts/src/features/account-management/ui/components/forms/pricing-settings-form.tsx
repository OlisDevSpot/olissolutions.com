import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import type { Pricing, Trade } from "@/shared/schema";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

interface Props {
  pricingVariables: (Pricing & { trade: Trade })[];
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

  const mappedPricingByTrade = pricingVariables.reduce((acc, pricingVariableEntry) => {
    const { trade, ...pricingVariable } = pricingVariableEntry;

    if (!(trade.id in acc)) {
      acc[trade.id] = {
        trade,
        pricingVariables: [],
      };
    }

    acc[trade.id]?.pricingVariables.push(pricingVariable);
    return acc;
  }, {} as { [id: number]: { trade: Trade; pricingVariables: Pricing[] } });

  const pricingVariablesGroups = Object.values(mappedPricingByTrade).sort((a, b) => a.trade.label.localeCompare(b.trade.label));

  function onSubmit(input: any) {
    console.log(input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue={String(pricingVariablesGroups[0]?.trade.id)}>
          {!collapsed
            ? (
                <TabsList ref={tabsRef}>
                  {pricingVariablesGroups.map(pricingVariablesGroup => (
                    <TabsTrigger key={pricingVariablesGroup.trade.id} value={String(pricingVariablesGroup.trade.id)}>
                      {pricingVariablesGroup.trade.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              )
            : (
                <Select defaultValue={String(pricingVariablesGroups[0]?.trade.id)}>
                  <SelectTrigger>
                    <SelectValue defaultValue={String(pricingVariablesGroups[0]?.trade.id)} />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingVariablesGroups.map(pricingVariablesGroup => (
                      <SelectItem key={pricingVariablesGroup.trade.id} value={String(pricingVariablesGroup.trade.id)} className="p-1 flex w-[232px]">
                        <TabsList ref={tabsRef} className="w-[200px] bg-transparent dark:bg-transparent outline-none border-none dark:border-none dark:outline-none">
                          <TabsTrigger value={String(pricingVariablesGroup.trade.id)} className="w-full p-0 h-9 bg-transparent dark:bg-transparent">
                            <div className="w-full text-left">
                              {pricingVariablesGroup.trade.label}
                            </div>
                          </TabsTrigger>
                        </TabsList>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

          {pricingVariablesGroups.map(pricingVariablesGroup => (
            <TabsContent key={pricingVariablesGroup.trade.id} value={String(pricingVariablesGroup.trade.id)}>
              <Card>
                <CardHeader>
                  <CardTitle>{pricingVariablesGroup.trade.label}</CardTitle>
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
