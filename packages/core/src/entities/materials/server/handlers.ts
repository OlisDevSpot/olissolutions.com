import { factory } from "@/server/lib/create-app";

import * as repository from "./repository";
import { accessorParam, idParam } from "./validators";

export const findAll = factory.createHandlers(async (c) => {
  const materials = await repository.findAll();
  return c.json(materials);
});

export const findOne = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  const material = await repository.findOne(id);
  return c.json(material);
});

export const findOneByAccessor = factory.createHandlers(accessorParam, async (c) => {
  const { accessor } = c.req.valid("param");
  const material = await repository.findOneByAccessor(accessor);

  if (!material) {
    return c.json({ error: "Material not found" }, 404);
  }
  
  return c.json(material);
});

export const findMaterialBenefits = factory.createHandlers(idParam, async (c) => {
  const { id } = c.req.valid("param");
  const materialBenefits = await repository.findMaterialBenefits(id);

  if (!materialBenefits) {
    return c.json({ error: "No material benefits found" }, 404);
  }
  
  return c.json(materialBenefits);
})
