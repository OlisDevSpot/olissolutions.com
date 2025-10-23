export const origins = process.env.NODE_ENV === 'production'
  ? new Set(['https://*.olissolutions.com'])
  : new Set([
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
    ])
