export const FEATURE_ROOTS = {
  dashboard: '/dashboard' as const,
  getMarketplaceRoot: () => `${FEATURE_ROOTS.dashboard}/marketplace` as const,
} as const
