import type { UseQueryOptions } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";

import type { Benefit } from "@olis/db/schema/platform";

import { iconMap } from "@olis/ui/lib/benefits-icons-map";

interface Props {
  queryOptions: UseQueryOptions<any>;
}

export function ShowroomItemBenefits({ queryOptions }: Props) {
  const itemBenefits = useQuery<(Benefit & { category: { accessor: string; label: string } })[]>(queryOptions)
  
  const benefitsByCategory = itemBenefits.data
    ? itemBenefits.data.reduce((acc, benefit) => {
        if (!acc[benefit.category.accessor]) {
          acc[benefit.category.accessor] = { category: benefit.category, benefits: [] };
        }
        acc[benefit.category.accessor]?.benefits.push(benefit);
        return acc;
      }, {} as Record<string, { category: { accessor: string; label: string }; benefits: typeof itemBenefits.data }>)
    : {};
  
  return (
    <>
      {Object.keys(benefitsByCategory).length > 0 && Object.values(benefitsByCategory).map(benefitsGroup => (
        <div key={benefitsGroup.category.accessor} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{benefitsGroup.category.label}</h2>
          <div className="w-full flex gap-2 flex-wrap">
            {benefitsGroup.benefits.map((benefit) => {
              const Icon = iconMap[benefit.lucideIcon as keyof typeof iconMap];
              return (
                <div key={benefit.accessor} className="flex items-center gap-2 text-sm md:text-md xl:text-lg border border-accent-foreground/20 px-4 py-2 rounded-full bg-muted">
                  {Icon && <Icon className="size-4 lg:size-5" />}
                  <div>
                    <p>{benefit.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}
