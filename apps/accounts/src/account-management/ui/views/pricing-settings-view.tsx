"use client";

import { PricingSettingsForm } from "@/features/account-management/ui/components/forms/pricing-settings-form";
import { LoadingState } from "@/shared/components/loading-state";
import { useGetPricing } from "@/shared/entities/pricing/data/queries/get-pricing";

export function PricingSettingsView() {
  const pricingVariables = useGetPricing();

  if (pricingVariables.isLoading) {
    return (
      <LoadingState 
        title="Loading Pricing Variables" 
        description="This might take a few seconds"
      />
    );
  }

  if (!pricingVariables.data) {
    return <div>No Pricing Variables Set!</div>;
  }

  return (
    <div>
      <PricingSettingsForm pricingVariables={pricingVariables.data} />
    </div>
  );
}
