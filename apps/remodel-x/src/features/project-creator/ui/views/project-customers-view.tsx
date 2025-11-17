"use client";

import { useUpdateCustomer } from "@olis/data-client/fetchers/platform/customers/mutations/update-customer";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import type { CustomerFormSchema } from "@olis/ui/schemas/customers-forms";

import { useGetProjectCustomers } from "@/features/project-creator/data/queries/get-project-customers";
import { useCreateProjectCustomer } from "@/features/project-creator/hooks/use-create-project-customer";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { useTRPC } from "@/trpc/client";
import { Button } from "@olis/ui/components/button";
import { PutCustomerModal } from "@olis/ui/components/dialogs/put-customer-modal";
import { PutCustomerForm } from "@olis/ui/components/forms/put-customer-form";
import { LoadingState } from "@olis/ui/components/states/loading-state";
import { useBaseModalStore } from "@olis/ui/hooks/use-base-modal-store";

export function ProjectCustomersView() {
  const projectId = useCurrentProjectId();
  const updateCustomer = useUpdateCustomer()
  const createCustomer = useCreateProjectCustomer()
  const { data: customers, isLoading } = useGetProjectCustomers(projectId);
  const queryClient = useQueryClient();
  const trpc = useTRPC()
  const { open, close, setModal } = useBaseModalStore();

  useEffect(() => {
    setModal({
      Element: <PutCustomerModal onSubmit={(data: CustomerFormSchema) => handleSubmit()(data)} />,
      accessor: "put-customer-modal",
    })
  }, [])

  if (isLoading) {
    return (
      <LoadingState 
        title="Loading customers..." 
        description="This might take a few seconds"
      />
    );
  }

  if (!customers) {
    return <div className="w-full h-full flex items-center justify-center">Customers not found!</div>;
  }

  function handleSubmit(customerId?: string) {
    if (customerId) {
      return function handleSubmit(data: CustomerFormSchema) {
        updateCustomer.mutate({ id: customerId, ...data }, {
          onSuccess: () => {
            toast.success("Customer updated")
            queryClient.invalidateQueries(trpc.projects.customers.findProjectCustomers.queryOptions({ projectId }));
          },
        })
      }
    }

    return (data: CustomerFormSchema) => {
      createCustomer.mutate({ projectId, customer: data }, {
        onSuccess: () => {
          toast.success("Customer created")
          queryClient.invalidateQueries(trpc.projects.customers.findProjectCustomers.queryOptions({ projectId }));
        },
        onSettled: () => {
          close()
        },
      })
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-full flex flex-col gap-6">
        <ProjectFlowSection>
          <ProjectFlowSection.Header title="Customers" description="List of project customers">
            {customers.length < 2 && (
              <Button 
                variant="ghost" 
                className="size-8 p-[0.5] rounded-full bg-accent-foreground/20 flex items-center justify-center"
                onClick={() => open()}
              >
                <PlusIcon />
              </Button>
            )}
          </ProjectFlowSection.Header> 
          <ProjectFlowSection.Content>
            <div className="flex gap-4">
              { customers.map(({ customer, isPrimary }) => (
                <PutCustomerForm 
                  key={customer.id}
                  customer={customer}
                  isPrimary={isPrimary}
                  onSubmit={(data: CustomerFormSchema) => handleSubmit(customer.id)(data)}
                  isPending={updateCustomer.isPending}
                />
              )) }
            </div>
          </ProjectFlowSection.Content>
        </ProjectFlowSection>
      </div>
    </div>
  );
}
