import z from "zod";

import { tagsData } from "@olis/db/seeds/platform/data/tags";

export const platformEntityAccessor = ["trade", "scope", "addon", "material"] as const
export type PlatformEntityAccessor = typeof platformEntityAccessor[number]

export const uploadProjectFilesSchema = z.object({
  entity: z.object({
    id: z.number().optional(),
    type: z.enum(platformEntityAccessor)
  }),
  tags: z.array(z.enum(Object.values(tagsData).map(tag => tag.accessor))).optional(),
  files: z.array(z.file()).min(1),
  description: z.string().optional(),
  uploadUrl: z.string().optional(),
})

export type UploadProjectFilesSchema = z.infer<typeof uploadProjectFilesSchema>

export const defaultValues: UploadProjectFilesSchema = {
  entity: {
    type: "trade",
  },
  tags: [],
  files: [],
  description: "",
  uploadUrl: "",
} as const
