import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateProjectFinancialProfile } from "@/features/project-creator/data/mutations/update-project-financial-profile";
import { useGetProjectFinancialProfile } from "@/features/project-creator/data/queries/get-project-financial-profile";
import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { useTRPC } from "@/trpc/client";
import { flattenObject } from "@olis/core/lib/utils";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";

import type { UpdateFinancialProfileSchema } from "./schema";

import { DisadvantagesForm } from "./disadvantages-form";
import { FinancialObligationsForm } from "./financial-obligations-form";
import { HomeValueForm } from "./home-value-form";
import { updateFinancialProfileSchema } from "./schema";

interface Props {
  projectId: string;
}

export function ProjectHomeSituationForm({ projectId }: Props) {
  const financialProfile = useGetProjectFinancialProfile(projectId);

  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const updateProjectFinancialProfile = useUpdateProjectFinancialProfile();
  const form = useForm<UpdateFinancialProfileSchema>({
    resolver: zodResolver(updateFinancialProfileSchema),
    disabled: financialProfile.isPending || updateProjectFinancialProfile.isPending,
    defaultValues: {
      disadvantages: {
        isSenior: financialProfile.data?.isSenior || false,
        isRetired: financialProfile.data?.isRetired || false,
        isFixedIncome: financialProfile.data?.isFixedIncome || false,
        isLowIncome: financialProfile.data?.isLowIncome || false,
        isHighElectricPayment: financialProfile.data?.isHighElectricPayment || false,
        isGovtAssisted: financialProfile.data?.isGovtAssisted || false,
      },
      financialObligations: {
        currentElectricPayment: financialProfile.data?.currentElectricPayment || null,
        currentGasPayment: financialProfile.data?.currentGasPayment || null,
        currentWaterPayment: financialProfile.data?.currentWaterPayment || null,
        currentGardeningPayment: financialProfile.data?.currentGardeningPayment || null,
      },
      homeValue: {
        approxHomeValue: financialProfile.data?.approxHomeValue || null,
        mortgageBalance: financialProfile.data?.mortgageBalance || null,
        mortgagePayment: financialProfile.data?.mortgagePayment || null,
      },
    },
  });

  useEffect(() => {
    if (financialProfile.data) {
      form.reset({
        disadvantages: {
          ...financialProfile.data,
        },
        financialObligations: {
          ...financialProfile.data,
        },
        homeValue: {
          ...financialProfile.data,
        },
      });
    }
  }, [financialProfile.data, form]);

  function onSubmit(input: UpdateFinancialProfileSchema) {
    const data = flattenObject(input);

    updateProjectFinancialProfile.mutate({ projectId, ...data }, {
      onSuccess: () => {
        toast.success("Financial profile updated");
        queryClient.invalidateQueries(trpc.projects.financialProfile.findProjectFinancialProfile.queryOptions({ projectId }));
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grow min-h-0 flex flex-col gap-6">
        <div className="flex flex-col gap-6 grow min-h-0">
          <div className="flex flex-col gap-6 grow min-h-0 overflow-y-auto rounded-xl">
            <ProjectFlowSection>
              <ProjectFlowSection.Header title="Financial & Situational Disadvantages" description="Potential reasons for project cost reduction" />
              <ProjectFlowSection.Content>
                <DisadvantagesForm />
              </ProjectFlowSection.Content>
            </ProjectFlowSection>
            <ProjectFlowSection>
              <ProjectFlowSection.Header title="Current Financial Obligations" description="Estimating your current monthly payments" />
              <ProjectFlowSection.Content>
                <FinancialObligationsForm />
              </ProjectFlowSection.Content>
            </ProjectFlowSection>
            <ProjectFlowSection>
              <ProjectFlowSection.Header title="Home Value & Obligations" description="Estimating your home's value & obligations" />
              <ProjectFlowSection.Content>
                <HomeValueForm />
              </ProjectFlowSection.Content>
            </ProjectFlowSection>
          </div>
        </div>
        <Button type="submit" disabled={updateProjectFinancialProfile.isPending} className="w-fit">Save</Button>
      </form>
    </Form>
  );
}
