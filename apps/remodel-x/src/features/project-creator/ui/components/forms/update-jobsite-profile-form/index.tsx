import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { UpdateJobsiteProfileSchema } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form/schema";

import { useUpdateProjectJobsite } from "@/features/project-creator/data/mutations/update-project-jobsite";
import { useGetProjectJobsite } from "@/features/project-creator/data/queries/get-project-jobsite-profile";
import { updateJobsiteProfileSchema } from "@/features/project-creator/ui/components/forms/update-jobsite-profile-form/schema";
import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { useTRPC } from "@/trpc/client";
import { flattenObject } from "@olis/core/lib/utils";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";

import { ExteriorInfoForm } from "./exterior-info-form";
import { GeneralInfoForm } from "./general-info-form";

interface Props {
  projectId: string;
}

export function JobsiteForm({ projectId }: Props) {
  const jobsite = useGetProjectJobsite(projectId || "");

  const updateProjectJobsiteProfile = useUpdateProjectJobsite();
  const queryClient = useQueryClient();
  const trpc = useTRPC()

  const form = useForm<UpdateJobsiteProfileSchema>({
    resolver: zodResolver(updateJobsiteProfileSchema),
    disabled: jobsite.isPending || updateProjectJobsiteProfile.isPending,
    defaultValues: {
      general: {
        numStories: jobsite.data?.numStories || 1,
        yearBuilt: jobsite.data?.yearBuilt || 1980,
        electricProvider: jobsite.data?.electricProvider || "ladwp",
      },
      exterior: {
        solar: {
          hasSolar: jobsite.data?.hasSolar || false,
          numPanels: 0,
        },
        roof: {
          roofLocation: jobsite.data?.roofs?.roofLocation || null,
          roofType: jobsite.data?.roofs?.roofType || null,
          roofAge: jobsite.data?.roofs?.roofAge || null,
        },
        hvac: {
          hvacType: jobsite.data?.hvacType || null,
          hvacAge: jobsite.data?.hvacAge || null,
          hvacComponents: jobsite.data?.hvacComponents || null,
        },
        windows: {
          windowsType: jobsite.data?.windowsType || null,
          windowsAge: jobsite.data?.windowsAge || null,
        },
        atticBasement: {
          atticInsulationLevel: jobsite.data?.atticInsulationLevel || null,
          atticInsulationAge: jobsite.data?.atticInsulationAge || null,
          foundationType: jobsite.data?.foundationType || null,
        },
        electricals: {
          mainPanelSize: jobsite.data?.mainPanelSize || null,
          mainPanelAge: jobsite.data?.mainPanelAge || null,
        },
      },
      lot: {
        hasPool: jobsite.data?.hasPool || false,
      },
    },
  });

  useEffect(() => {
    if (jobsite.isSuccess && jobsite.data) {
      form.reset({
        general: {
          numStories: jobsite.data.numStories || 1,
          yearBuilt: jobsite.data.yearBuilt || 1980,
          electricProvider: jobsite.data.electricProvider || "ladwp",
        },
        exterior: {
          solar: {
            hasSolar: jobsite.data.hasSolar,
            numPanels: jobsite.data.numPanels,
          },
          roof: {
            roofLocation: jobsite.data?.roofs?.roofLocation,
            roofType: jobsite.data.roofs?.roofType,
            roofAge: jobsite.data.roofs?.roofAge,
          },
          hvac: {
            hvacType: jobsite.data.hvacType,
            hvacComponents: jobsite.data.hvacComponents,
            hvacAge: jobsite.data.hvacAge,
          },
          windows: {
            windowsType: jobsite.data.windowsType,
            windowsAge: jobsite.data.windowsAge,
          },
          atticBasement: {
            atticInsulationLevel: jobsite.data.atticInsulationLevel,
            atticInsulationAge: jobsite.data.atticInsulationAge,
            foundationType: jobsite.data.foundationType,
          },
          electricals: {
            mainPanelSize: jobsite.data.mainPanelSize,
            mainPanelAge: jobsite.data.mainPanelAge,
          },
        },
        lot: {
          hasPool: jobsite.data.hasPool,
        },
      });
    }
  }, [jobsite.isSuccess, form]);

  function onSubmit(input: UpdateJobsiteProfileSchema) {
    const { roof, ...rest } = input.exterior;
    const rawJobsiteData = { ...input.general, ...rest, ...input.lot };
    const jobsiteData = flattenObject(rawJobsiteData);
    // return console.log(data);

    const data = {
      roofData: roof,
      jobsiteData,
    };

    updateProjectJobsiteProfile.mutate({ projectId, ...data }, {
      onSuccess: () => {
        toast.success("Jobsite profile updated");
        queryClient.invalidateQueries(trpc.projects.jobsite.findProjectJobsite.queryOptions({ projectId }));
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grow min-h-0 flex flex-col gap-6">
        <div className="flex flex-col gap-6 grow min-h-0">
          <div className="flex flex-col gap-6 grow min-h-0 overflow-y-auto rounded-xl">
            <ProjectFlowSection>
              <ProjectFlowSection.Header title="General Info" description="General information about the property" />
              <ProjectFlowSection.Content>
                <GeneralInfoForm />
              </ProjectFlowSection.Content>
            </ProjectFlowSection>
            <ProjectFlowSection>
              <ProjectFlowSection.Header title="Exterior Info" description="Exterior information about the property" />
              <ProjectFlowSection.Content>
                <ExteriorInfoForm />
              </ProjectFlowSection.Content>
            </ProjectFlowSection>
          </div>
        </div>
        <Button type="submit" disabled={updateProjectJobsiteProfile.isPending} className="w-fit">Save</Button>
      </form>
    </Form>
  );
}
