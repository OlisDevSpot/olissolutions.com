export const accountQueryKeys = {
  all: ['account'] as const,
  pricingVariables: () => [...accountQueryKeys.all, 'pricing-variables'] as const,
}
