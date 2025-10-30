/* eslint-disable node/prefer-global/process */

export const ROOTS = {
  marketplace: {
    name: 'Marketplace',
    prodOrigin: 'https://olissolutions.com',
    devOrigin: 'http://localhost:3000',
    dashboard: '/dashboard' as const,
    getMarketplaceRoot: ({ absolute }: { absolute?: boolean } = {}) => `${generateUrl({ ...ROOTS.marketplace, absolute, basePath: ROOTS.marketplace.dashboard })}/marketplace` as const,
    getAccountRoot: ({ absolute }: { absolute?: boolean } = {}) => `${generateUrl({ ...ROOTS.marketplace, absolute, basePath: ROOTS.marketplace.dashboard })}` as const,
    getBillingRoot: ({ absolute }: { absolute?: boolean } = {}) => `${generateUrl({ ...ROOTS.marketplace, absolute, basePath: ROOTS.marketplace.dashboard })}/billing` as const,
  },
  identity: {
    name: 'Identity',
    prodOrigin: 'https://identity.olissolutions.com',
    devOrigin: 'http://localhost:3002',
    auth: '/auth' as const,
    getSignInUrl: ({ absolute }: { absolute?: boolean } = {}) => `${generateUrl({ ...ROOTS.identity, absolute, basePath: ROOTS.identity.auth })}/sign-in` as const,
    getSignUpUrl: ({ absolute }: { absolute?: boolean } = {}) => `${generateUrl({ ...ROOTS.identity, absolute, basePath: ROOTS.identity.auth })}/sign-up` as const,
  },
  saleos: {
    name: 'SaleOS',
    prodOrigin: 'https://scopeio.olissolutions.com',
    devOrigin: 'http://localhost:3001',
    dashboard: '/' as const,
    getProjectsRoot: ({ absolute }: { absolute?: boolean } = {}) => `${generateUrl({ ...ROOTS.saleos, absolute, basePath: ROOTS.saleos.dashboard })}/projects` as const,
    getShowroomRoot: ({ absolute }: { absolute?: boolean } = {}) => `${generateUrl({ ...ROOTS.saleos, absolute, basePath: ROOTS.saleos.dashboard })}/showroom` as const,
  },
} as const

function generateUrl({ absolute = false, devOrigin, prodOrigin, basePath }: { absolute?: boolean, devOrigin: string, prodOrigin: string, basePath: string }) {
  const dev = process.env.NODE_ENV !== 'production'
  const origin = dev ? devOrigin : prodOrigin
  const path = basePath === '/' ? '' : `${basePath}`
  return absolute ? `${origin}${path}` : path
}
