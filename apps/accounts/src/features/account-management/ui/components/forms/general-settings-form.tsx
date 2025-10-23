import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { GeneralSettingsFormSchema } from "@/features/account-management/schemas/general-settings-schema";

import { generalSettingsFormSchema } from "@/features/account-management/schemas/general-settings-schema";
import { updateUser, useSession } from "@/shared/clients/auth-client";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

export function GeneralSettingsForm() {
  const session = useSession();

  const form = useForm<GeneralSettingsFormSchema>({
    resolver: zodResolver(generalSettingsFormSchema),
    defaultValues: {
      name: session.data?.user?.name ?? "",
      nickname: session.data?.user?.nickname ?? "",
      email: session.data?.user?.email ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: session.data?.user?.name ?? "",
      nickname: session.data?.user?.nickname ?? "",
      email: session.data?.user?.email ?? "",
    });
  }, [session.data]);

  async function onSubmit(input: GeneralSettingsFormSchema) {
    const { email, ...fields } = input;
    await updateUser(fields, {
      onSuccess: () => {
        toast.success("Profile updated");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Johnny"
                  {...field}
                  value={field.value ?? ""}
                  onChange={e => field.onChange(e.target.value ?? "")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
