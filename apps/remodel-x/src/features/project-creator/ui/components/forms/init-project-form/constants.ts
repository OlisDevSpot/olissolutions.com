import { customerInfoFormSchema, jobsiteFormSchema, projectInfoFormSchema } from "@/features/project-creator/ui/components/forms/init-project-form/schemas";

import { CustomerInfoForm } from "./customer-info-form";
import { JobsiteForm } from "./jobsite-form";
import { ProjectInfoForm } from "./project-info-form";

export const NEW_PROJECT_FORM_STEPS = [
  {
    id: "project",
    label: "Project Info",
    Component: ProjectInfoForm,
    validation: projectInfoFormSchema,
  },
  {
    id: "customer",
    label: "Customer Info",
    Component: CustomerInfoForm,
    validation: customerInfoFormSchema,
  },
  {
    id: "jobsite",
    label: "Jobsite Info",
    Component: JobsiteForm,
    validation: jobsiteFormSchema,
  },
] as const;
