import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { AdminDashboardView } from "@/features/admin/ui/views/admin-dashboard-view";
import { requireAuth } from "@olis/auth/lib/utils";
import { ROOTS } from "@olis/core/constants";

export default async function AdminPage() {
  await requireAuth(await getHeaders(), () => {
    redirect(`${ROOTS.identity.getSignInUrl()}`);
  })

  return (
    <AdminDashboardView />
  );
}
