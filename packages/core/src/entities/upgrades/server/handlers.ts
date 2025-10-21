import { factory } from "@workspace/hono/lib/create-app";
import * as solutionsRespository from "@/shared/entities/solutions/server/repository";

import * as repository from "./repository";
import { accessorParam, createUpgradeValidator, idParam, updateUpgradeValidator } from "./validators";

export const findAll = factory.createHandlers(async (c) => {
  const upgrades = await repository.findAll();
  return c.json(upgrades);
});

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  const upgrade = await repository.findOne(id);
  return c.json(upgrade);
});

export const findAllUpgradeSolutions = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  const upgradeSolutions = await solutionsRespository.findAllByUpgradeId(id);

  if (!upgradeSolutions) {
    return c.json({ error: "No solutions found" }, 404);
  }

  return c.json(upgradeSolutions);
});

export const findAllUpgradeAddons = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  const upgradeAddons = await repository.findAllUpgradeAddons(id);

  if (!upgradeAddons) {
    return c.json({ error: "No addons found" }, 404);
  }

  return c.json(upgradeAddons);
});

export const findAllSolutionsByUpgradeAccessor = factory.createHandlers(accessorParam, async (c) => {
  const { accessor } = c.req.valid("param");
  const upgradeSolutions = await repository.findAllSolutionsByUpgradeAccessor(accessor);
  return c.json(upgradeSolutions);
});

export const createOne = factory.createHandlers(createUpgradeValidator, async (c) => {
  const data = c.req.valid("json");
  const upgrade = await repository.createOne(data);
  return c.json(upgrade);
});

export const updateOne = factory.createHandlers(idParam, updateUpgradeValidator, async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const upgrade = await repository.findOne(id);

  if (!upgrade) {
    throw new Error("Upgrade not found");
  }

  const updatedUpgrade = await repository.findOneAndUpdate(id, data);
  return c.json(updatedUpgrade);
});

export const deleteOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  await repository.deleteOne(id);
  return c.json({ success: true }, 200);
});
