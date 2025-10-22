import z from "zod";

export const customerFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  phoneNum: z.string().min(1),
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;
