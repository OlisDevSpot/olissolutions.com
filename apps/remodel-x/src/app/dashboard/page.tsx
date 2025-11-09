import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { requireAuth } from "@olis/auth/lib/utils";
import { ROOTS } from "@olis/core/constants";

export default async function DashboardPage() {
  await requireAuth(await getHeaders(), () => {
    redirect(`${ROOTS.identity.getSignInUrl()}`);
  })

  return (
    <div>DashboardPage</div>
  );
}
