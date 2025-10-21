import { zValidator } from "@hono/zod-validator";
import z from "zod";

import type { InferInput } from "@/server/types";

import { insertUpgradeSchema } from "@/shared/schema";

export const idParam = zValidator("param", z.object({ id: z.coerce.number() }));

export const accessorParam = zValidator("param", z.object({ accessor: z.string() }));

export const createUpgradeValidator = zValidator("json", insertUpgradeSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400);
  }
});

export const updateUpgradeValidator = zValidator("json", insertUpgradeSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400);
  }
});

export type CreateUpgradeValidator = InferInput<typeof createUpgradeValidator>;
export type UpdateUpgradeValidator = InferInput<typeof updateUpgradeValidator>;
