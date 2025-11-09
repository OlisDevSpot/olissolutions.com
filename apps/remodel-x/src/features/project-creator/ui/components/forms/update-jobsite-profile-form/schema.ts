import z from "zod";

import { insertJobsiteProfileSchema, insertJobsiteRoofSchema } from "@olis/db/schema/remodel-x";

export const updateJobsiteProfileSchema = z.object({
  general: insertJobsiteProfileSchema
    .pick({
      numStories: true,
      yearBuilt: true,
      electricProvider: true,
    }),
  exterior: z.object({
    solar: insertJobsiteProfileSchema
      .pick({
        hasSolar: true,
      })
      .extend({
        numPanels: z.number().nullable().optional(),
      }),
    roof: insertJobsiteRoofSchema
      .pick({
        roofLocation: true,
        roofType: true,
        roofAge: true,
      }),
    hvac: insertJobsiteProfileSchema
      .pick({
        hvacType: true,
        hvacComponents: true,
        hvacAge: true,
      }),
    windows: insertJobsiteProfileSchema
      .pick({
        windowsType: true,
        windowsAge: true,
      }),
    atticBasement: insertJobsiteProfileSchema
      .pick({
        atticInsulationLevel: true,
        atticInsulationAge: true,
        foundationType: true,
      }),
    electricals: insertJobsiteProfileSchema
      .pick({
        mainPanelSize: true,
        mainPanelAge: true,
      }),
  }),
  lot: insertJobsiteProfileSchema
    .pick({
      hasPool: true,
    }),
}).superRefine(({ exterior }, ctx) => {
  if (exterior.solar.hasSolar && !exterior.solar.numPanels) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["exterior", "solar", "numPanels"],
      message: "This field is required when 'Existing solar' is checked",
    });
  }
});

export type UpdateJobsiteProfileSchema = z.infer<typeof updateJobsiteProfileSchema>;
