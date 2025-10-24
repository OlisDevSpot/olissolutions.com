'use client'

import type { User } from '../../../../../../../packages/db/dist/schema/platform'
import { useSession } from '@olis/auth/client'
import { GeneralSettingsForm } from '@/features/account-management/ui/components/forms/general-settings-form'

export function GeneralSettingsView() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!session?.user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <GeneralSettingsForm user={session.user as User} />
    </div>
  )
}
