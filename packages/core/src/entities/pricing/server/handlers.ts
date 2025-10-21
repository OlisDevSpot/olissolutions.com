import { factory } from "@/server/lib/create-app";

import * as repository from "./repository";

export const findAllPricing = factory.createHandlers(async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  
  const pricing = await repository.findAllPricing();
  return c.json(pricing);
});
