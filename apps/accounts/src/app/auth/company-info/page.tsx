import { signOut } from '@olis/auth/client'
import { LogoutButton } from '@olis/ui/components/buttons/logout-button'

export default async function SetCompanyInfoPage() {
  return (
    <div>
      <h1>Set company info</h1>
      <LogoutButton signOut={signOut} />
    </div>
  )
}
