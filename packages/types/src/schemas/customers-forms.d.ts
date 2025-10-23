import z from "zod";
export declare const customerFormSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodEmail;
    phoneNum: z.ZodString;
}, z.core.$strip>;
export type CustomerFormSchema = z.infer<typeof customerFormSchema>;
//# sourceMappingURL=customers-forms.d.ts.map