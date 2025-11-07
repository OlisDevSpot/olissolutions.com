import { zodResolver } from "@hookform/resolvers/zod";
import { ROOTS } from "@olis/core/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { InitProjectFormSchema } from "@/features/project-creator/ui/components/forms/init-project-form/schemas";

import { useInitProject } from "@/features/project-creator/data/mutations/init-project";
import { getProjectsQueryOptions } from "@/features/project-creator/data/queries/get-projects";
import { useCreateDialogStore } from "@/features/project-creator/hooks/dialogs/use-create-dialog-store";
import { initProjectFormSchema } from "@/features/project-creator/ui/components/forms/init-project-form/schemas";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";
import { useMultistepForm } from "@olis/ui/hooks/use-multistep-form";

import { NEW_PROJECT_FORM_STEPS } from "./constants";

export function InitProjectForm() {
  const router = useRouter();
  const { close } = useCreateDialogStore();
  const queryClient = useQueryClient();

  const form = useForm<InitProjectFormSchema>({
    resolver: zodResolver(initProjectFormSchema),
    defaultValues: {
      project: { address: "", city: "", state: "CA", zipCode: "" },
      customer: { firstName: "", lastName: "" },
      jobsite: { numStories: 1, yearBuilt: 1980, electricProvider: "ladwp" },
    },
  });

  const {
    StepForm,
    stepValidation,
    stepId,
    stepIndex,
    prev,
    next,
  } = useMultistepForm<typeof initProjectFormSchema.shape>({ steps: NEW_PROJECT_FORM_STEPS });

  async function handleNext() {
    const values = form.getValues()[stepId];
    const stepValues = Object.fromEntries(
      Object.keys(stepValidation.shape).map(key => [key, values[key as keyof typeof values]]),
    );

    const result = stepValidation.safeParse(stepValues);
    if (result.success) {
      next();
    }
    else {
      result.error.issues.forEach((err) => {
        form.setError(err.path[0] as keyof InitProjectFormSchema, {
          type: "manual",
          message: err.message,
        });
      });
    }
  }

  const mutation = useInitProject({
    onSuccess: (_data) => {
      toast.success("Project created");
      queryClient.invalidateQueries({ queryKey: getProjectsQueryOptions().queryKey });
    },
    onSettled: () => {
      form.reset();
      close();
    },
  });

  // using mutateAsync to reduce flicker as react batches the re-renders instead of re-rendering with `isPending=false` like in the onSuccess case
  async function onSubmit(data: InitProjectFormSchema) {
    const result = await mutation.mutateAsync(data);
    router.push(`${ROOTS.remodelX.getProjectsRoot()}/${result.project.id}`);
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <StepForm />

          <div className="w-full flex items-center justify-end gap-4">
            { stepIndex === 0
              ? <Button type="button" variant="destructive" onClick={() => close()}>Cancel</Button>
              : <Button type="button" variant="outline" onClick={() => prev()}>Back</Button>}

            {stepIndex < NEW_PROJECT_FORM_STEPS.length - 1
              ? <Button key="next" type="button" variant="outline" onClick={() => handleNext()}>Next</Button>
              : <Button key="submit" type="submit" disabled={mutation.isPending}>Create Project</Button>}
          </div>
        </form>
      </Form>
    </section>
  );
}
