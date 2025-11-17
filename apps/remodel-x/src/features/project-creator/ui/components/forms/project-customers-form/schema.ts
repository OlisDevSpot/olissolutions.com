import z from "zod";

import { insertCustomerSchema } from "@olis/db/schema/platform";
import { insertXProjectCustomerSchema } from "@olis/db/schema/remodel-x";

export const putProjectCustomerSchema = z.object({
  customer: insertCustomerSchema,
  context: insertXProjectCustomerSchema.pick({
    isPrimary: true,
  }),
});

export type PutProjectCustomerSchema = z.infer<typeof putProjectCustomerSchema>;
