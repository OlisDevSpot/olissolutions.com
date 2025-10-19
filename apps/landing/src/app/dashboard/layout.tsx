'use client'

import { DashboardSidebar } from '@/features/dashboard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[100dvh] bg-background">
      <DashboardSidebar />
      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  )
}
