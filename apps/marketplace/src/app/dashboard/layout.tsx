import { SidebarProvider } from '@olis/ui/components/sidebar'
import { cookies, headers } from 'next/headers';
import { AppSidebar } from '@olis/ui/components/global/navigation/app-sidebar'
import { sidebarGroups, sidebarItems } from '@/data/dashboard-menu-items';
import { requireAuth } from '@olis/auth/lib/utils';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  await requireAuth(await headers(), () => {
    // eslint-disable-next-line node/no-process-env
    redirect(`${process.env.NEXT_PUBLIC_ACCOUNTS_URL!}/auth/sign-in`);
  })
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{
        "--topnav-height": "0px",
      } as React.CSSProperties}
    >
      <AppSidebar sidebarItems={sidebarItems} sidebarGroups={sidebarGroups} />
      <main className="grow min-w-0 h-dvh">
        <div className="p-4 h-[calc(100%-var(--topnav-height))] [&:has(.no-layout-padding)]:p-0">
          <div className="overflow-auto h-full rounded-lg main-container scrollbar-gutter-stable">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
