import type z from "zod";

import { selectUserSchema } from "@/shared/schema";

export const generalSettingsFormSchema = selectUserSchema.pick({
  name: true,
  nickname: true,
  email: true,
});

export type GeneralSettingsFormSchema = z.infer<typeof generalSettingsFormSchema>;
