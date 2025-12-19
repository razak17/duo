import { createFileRoute, Outlet } from '@tanstack/react-router'

import { MobileNav } from '@/components/mobile-nav'
import { Sidebar } from '@/components/sidebar'

export const Route = createFileRoute('/(site)')({
  component: RouteComponent,
})

function RouteComponent({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <MobileNav />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[50px] lg:pt-0 lg:pl-[256px]">
        <div className="mx-auto h-full max-w-[1056px] pt-6">
          {children ? children : <Outlet />}
        </div>
      </main>
    </>
  )
}
