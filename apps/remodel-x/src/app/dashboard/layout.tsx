import { ROOTS } from "@olis/core/constants";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppBreadcrumbs } from "@/shared/components/app-breadcrumbs";
import { AppSidebar } from "@/shared/components/app-sidebar-provider";
import { requireAuth } from "@olis/auth/lib/utils";
import { AppTopbar } from "@olis/ui/components/global/navigation/app-topbar";
import {
  SidebarProvider,
} from "@olis/ui/components/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth(await headers(), () => {
    redirect(`${ROOTS.identity.getSignInUrl({ absolute: true })}`);
  })
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{
        "--topnav-height": "56px",
      } as React.CSSProperties}
    >
      <AppSidebar />
      <main className="grow min-w-0 h-dvh">
        <AppTopbar>
          <AppBreadcrumbs />
        </AppTopbar>
        <div className="p-4 h-[calc(100%-var(--topnav-height))] [&:has(.no-layout-padding)]:p-0">
          <div className="overflow-auto h-full rounded-lg main-container scrollbar-gutter-stable">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
