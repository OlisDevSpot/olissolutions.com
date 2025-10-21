import { zValidator } from "@hono/zod-validator";
import z from "zod";

import type { InferInput } from "@/server/types";

import { insertSolutionSchema } from "@/shared/schema";

export const idParam = zValidator("param", z.object({ id: z.coerce.number() }));

export const accessorParam = zValidator("param", z.object({ accessor: z.string() }));

export const findAllByUpgradeIdValidator = zValidator("query", z.object({ upgradeId: z.coerce.number().optional() }));

export const createSolutionValidator = zValidator("json", insertSolutionSchema.strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400);
  }
});

export const updateSolutionValidator = zValidator("json", insertSolutionSchema.partial().strict(), (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400);
  }
});

export type CreateSolutionValidator = InferInput<typeof createSolutionValidator>;
export type UpdateSolutionValidator = InferInput<typeof updateSolutionValidator>;
