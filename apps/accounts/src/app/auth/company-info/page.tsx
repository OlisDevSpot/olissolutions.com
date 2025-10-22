import { auth } from '@olis/auth/server'
import { headers } from 'next/headers'

import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'

export default async function SetCompanyInfoPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user.companyId) {
    return redirect('/dashboard')
  }

  return (
    <div>
      <h1>Set company info</h1>
      <LogoutButton />
    </div>
  )
}
