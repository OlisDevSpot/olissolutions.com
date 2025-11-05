import type { Dispatch, SetStateAction } from "react";

import { useGetBenefits } from "@olis/data-client/fetchers/platform/benefits/queries/get-benefits";
import { Fragment } from "react";

import { Separator } from "@olis/ui/components/separator";
import { Switch } from "@olis/ui/components/switch";

interface Props {
  selectedBenefits: number[];
  setSelectedBenefits: Dispatch<SetStateAction<number[]>>;
}

export function BenefitsList({ selectedBenefits, setSelectedBenefits }: Props) {
  const allBenefits = useGetBenefits();
  
  return (
    <div className="h-full px-2 w-fit border-r space-y-4 shrink-0 overflow-y-auto">
      <div className="flex flex-col gap-4 w-full">
        {allBenefits.data?.map(({ label, benefits }) => (
          <Fragment key={label}>
            <div className="flex flex-col gap-2">
              <h3 className="text-muted-foreground">{label}</h3>
              <div className="flex flex-col gap-2">
                {benefits.map(benefit => (
                  <div key={benefit.id} className="flex items-center gap-4 justify-between">
                    <p key={benefit.accessor}>{benefit.content}</p>
                    <Switch
                      checked={selectedBenefits.includes(benefit.id)}
                      onCheckedChange={() => {
                        setSelectedBenefits((prev) => {
                          if (prev.includes(benefit.id)) {
                            return prev.filter(id => id !== benefit.id);
                          }
                          return [...prev, benefit.id];
                        })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
