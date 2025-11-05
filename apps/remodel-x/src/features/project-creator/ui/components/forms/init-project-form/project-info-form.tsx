import { APIProvider } from "@vis.gl/react-google-maps";
import { useFormContext } from "react-hook-form";

import type { InitProjectFormSchema } from "@/features/project-creator/ui/components/forms/init-project-form/schemas";

import { extractPart } from "@/features/project-creator/lib/google-maps-helpers";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@olis/ui/components/form";
import { AddressInput } from "@olis/ui/components/inputs/address-input";

export function ProjectInfoForm() {
  const { control, setValue } = useFormContext<InitProjectFormSchema>();

  return (
    <>
      <FormField
        control={control}
        name="project.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              {/* <Input placeholder="123 Main St, Anytown, USA" {...field} /> */}
              {/* eslint-disable-next-line node/no-process-env */}
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                <AddressInput
                  value={field.value}
                  onChange={field.onChange}
                  onPlaceChange={(place) => {
                    const street = place.name ?? "";
                    const city = extractPart(place, "city");
                    const state = extractPart(place, "administrative_area_level_1", { short: true });
                    const zip = extractPart(place, "postal_code");

                    setValue("project.address", street);
                    setValue("project.city", city);
                    setValue("project.state", state);
                    setValue("project.zipCode", zip);
                  }}
                />
              </APIProvider>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
