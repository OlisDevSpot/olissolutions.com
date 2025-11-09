import z from "zod";

import { insertCustomerSchema } from "@olis/db/schema/platform";
import { insertJobsiteProfileSchema } from "@olis/db/schema/remodel-x";

export const projectInfoFormSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
});

export const customerInfoFormSchema = insertCustomerSchema.pick({
  firstName: true,
  lastName: true,
});

export const jobsiteFormSchema = insertJobsiteProfileSchema.pick({
  numStories: true,
  yearBuilt: true,
  electricProvider: true,
});

export const initProjectFormSchema = z.object({
  project: projectInfoFormSchema,
  customer: customerInfoFormSchema,
  jobsite: jobsiteFormSchema,
});

export type InitProjectFormSchema = z.infer<typeof initProjectFormSchema>;
