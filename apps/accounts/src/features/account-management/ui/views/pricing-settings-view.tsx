'use client'

import { useGetPricing } from '../../../../../../../packages/data-client/dist/fetchers/one-stop-sales/pricing/get-pricing'
import { LoadingState } from '@olis/ui/components/global/loading-state'
import { PricingSettingsForm } from '@/features/account-management/ui/components/forms/pricing-settings-form'

export function PricingSettingsView() {
  const pricingVariables = useGetPricing()

  if (pricingVariables.isLoading) {
    return (
      <LoadingState
        title="Loading Pricing Variables"
        description="This might take a few seconds"
      />
    )
  }

  if (!pricingVariables.data) {
    return <div>No Pricing Variables Set!</div>
  }

  return (
    <div>
      <PricingSettingsForm pricingVariables={pricingVariables.data} />
    </div>
  )
}
