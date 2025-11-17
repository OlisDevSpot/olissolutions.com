import { useForm } from "react-hook-form";

import type { ProjectVars } from "@/features/project-creator/cost-calculation-types";
import type { Scope } from "@olis/db/schema/platform";
import type { Variable } from "@olis/db/schema/remodel-x";

import { useUpdateProjectScope } from "@/features/project-creator/data/mutations/update-project-scope";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";

import { DynamicField } from "./dynamic-field";

interface Props {
  projectVars: ProjectVars;
  scope: Scope;
  scopeVariables: Variable[];
  onUpdateProjectScope?: (values: Record<string, any>) => void;
}

export function UpdateProjectScopeForm({ scope, scopeVariables, onUpdateProjectScope }: Props) {
  const projectId = useCurrentProjectId();
  const mutation = useUpdateProjectScope();
  const form = useForm({
    defaultValues: scopeVariables.reduce((acc, variable) => ({ ...acc, [variable.key]: "" }), {}) as Record<string, any>,
  });

  function onSubmit(values: Record<string, any>) {
    mutation.mutate({
      projectId,
      scopeId: scope.id,
      variablesData: values,
    });
    onUpdateProjectScope?.(values)
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {scopeVariables.map(variable => (
          <DynamicField key={`${scope.accessor}-${variable.id}`} scopeAccessor={scope.accessor} variable={variable} />
        ))}
        <div className="flex justify-end">
          <Button type="submit">Add to project</Button>
        </div>
      </form>
    </Form>
  );
}
