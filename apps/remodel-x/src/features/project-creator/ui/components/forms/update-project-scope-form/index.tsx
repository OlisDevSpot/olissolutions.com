import { useForm } from "react-hook-form";

import type { PricingVars, ProjectVars } from "@/features/project-creator/cost-calculation-types";
import type { Scope } from "@olis/db/schema/platform";
import type { Variable } from "@olis/db/schema/remodel-x";
import type { ScopeAccessor } from "@olis/db/types"

import { useUpdateProjectScope } from "@/features/project-creator/data/mutations/update-project-scope";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { useProjectScopesStore } from "@/features/project-creator/hooks/use-project-scopes-store";
import { calculateScopeCost } from "@/features/project-creator/lib/calculate";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";

import { DynamicField } from "./dynamic-field";

interface Props {
  pricingVars: PricingVars;
  projectVars: ProjectVars;
  scope: Scope;
  scopeVariables: Variable[];
}

export function UpdateProjectScopeForm({ pricingVars, projectVars, scope, scopeVariables }: Props) {
  const { updateScopePricing } = useProjectScopesStore();
  const projectId = useCurrentProjectId();
  const mutation = useUpdateProjectScope();
  const form = useForm({
    defaultValues: scopeVariables.reduce((acc, variable) => ({ ...acc, [variable.key]: "" }), {}) as Record<string, any>,
  });

  function onSubmit(values: Record<string, any>) {
    const calculations = calculateScopeCost(pricingVars, projectVars, scope.accessor as ScopeAccessor, values);
    mutation.mutate({
      projectId,
      scopeId: scope.id,
      variablesData: values,
    });
    updateScopePricing(scope.id, {
      cost: calculations.cost,
      price: calculations.price,
      tax: calculations.tax,
      priceBase: calculations.priceBase,
      variables: values,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {scopeVariables.map(variable => (
          <DynamicField key={variable.id} variable={variable} />
        ))}
        <div className="flex justify-end">
          <Button type="submit">Add to project</Button>
        </div>
      </form>
    </Form>
  );
}
