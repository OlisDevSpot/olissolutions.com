import { zValidator } from "@hono/zod-validator";
import z from "zod";

import type { InferInput } from "@/server/types";

import { insertCustomerSchema } from "@/shared/schema";

export const idParam = zValidator("param", z.object({ id: z.string() }));

export const createCustomerValidator = zValidator("json", insertCustomerSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400);
  }
});

export const updateCustomerValidator = zValidator("json", insertCustomerSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400);
  }
});

export type CreateCustomerValidator = InferInput<typeof createCustomerValidator>;
export type UpdateCustomerValidator = InferInput<typeof updateCustomerValidator>;
