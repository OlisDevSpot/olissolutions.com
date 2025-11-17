import type { MongoAbility } from '@casl/ability'
import type { User } from '@olis/db/schema/identity'
import type { Trade } from '@olis/db/schema/platform'
import type { auth } from '../server'
import { AbilityBuilder, createMongoAbility, subject } from '@casl/ability'

type TradeSubject = Pick<Trade, 'location'> | 'Trade'
type UserSubject = Pick<User, 'role'> | 'User'

type Permissions
  = | ['create' | 'read' | 'update' | 'delete', TradeSubject]
    | ['create' | 'read' | 'update' | 'delete', UserSubject]

export function getUserPermissions(user: typeof auth.$Infer.Session.user | undefined) {
  const { build, can: allow, cannot: _forbid } = new AbilityBuilder<MongoAbility<Permissions>>(createMongoAbility)

  allow('read', 'Trade')
  allow('create', 'Trade')

  if (user !== undefined) {
    allow('read', 'Trade')
    if (user.role === 'admin') {
      allow('read', 'User', { role: 'user' })
    }

    if (user.role === 'super-admin') {
      allow('create', 'User')
      allow('update', 'User')
      allow('delete', 'User')
    }
  }

  return build()
}

const permissions = getUserPermissions({ companyId: '1', role: 'admin', createdAt: new Date(), updatedAt: new Date(), id: '1', email: '1', emailVerified: true, name: '1', nickname: '1', image: '1' })

export const canRead = permissions.can('read', subject('User', { role: 'user' as const satisfies User['role'] }))
