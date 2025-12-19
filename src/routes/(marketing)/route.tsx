import { createFileRoute, Outlet } from '@tanstack/react-router'

import { MarketingFooter } from '@/components/marketing-footer'
import { MarketingHeader } from '@/components/marketing-header'

export const Route = createFileRoute('/(marketing)')({
  component: RouteComponent,
})

function RouteComponent({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex flex-1 flex-col items-center justify-center">
        {children ? children : <Outlet />}
      </main>
      <MarketingFooter></MarketingFooter>
    </div>
  )
}
