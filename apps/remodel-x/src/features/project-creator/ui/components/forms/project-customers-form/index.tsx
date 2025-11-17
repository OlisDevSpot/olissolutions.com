import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Customer } from "@olis/db/schema/platform";

import { useGetProjectCustomers } from "@/features/project-creator/data/queries/get-project-customers";
import { useCreateProjectCustomer } from "@/features/project-creator/hooks/use-create-project-customer";
import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { useTRPC } from "@/trpc/client";
import { flattenObject } from "@olis/core/lib/utils";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";

import type { PutProjectCustomerSchema } from "./schema";

import { putProjectCustomerSchema } from "./schema"

interface Props {
  customer: Customer;
  projectId: string;
}

export function ProjectCustomersForm({ customer: _customer, projectId }: Props) {
  const projectCustomers = useGetProjectCustomers(projectId);
  const queryClient = useQueryClient();
  const putProjectCustomer = useCreateProjectCustomer();
  const trpc = useTRPC();
  const form = useForm<PutProjectCustomerSchema>({
    resolver: zodResolver(putProjectCustomerSchema),
    disabled: false,
    defaultValues: {
      customer: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNum: "",
      },
      context: {
        isPrimary: false,
      },
    },
  });

  useEffect(() => {
    if (projectCustomers.data) {
      form.reset({ });
    }
  }, [projectCustomers.data, form]);

  function onSubmit(input: PutProjectCustomerSchema) {
    const data = flattenObject<PutProjectCustomerSchema>(input);

    putProjectCustomer.mutate({ projectId, customer: data }, {
      onSuccess: () => {
        toast.success("Financial profile updated");
        queryClient.invalidateQueries(trpc.projects.findProjectFinancialProfile.queryOptions({ projectId }));
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
