import { factory } from "@/server/lib/create-app";

import * as queries from "./queries";
import { idParam } from "./validators";

export const findAll = factory.createHandlers(async (c) => {
  const users = await queries.findAll();
  return c.json(users);
});

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  const user = await queries.findOne(id);
  return c.json(user);
});

export const deleteOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  await queries.deleteOne(id);
  return c.json({ success: true }, 200);
});
