import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const idParam = zValidator("param", z.object({ id: z.string() }));
