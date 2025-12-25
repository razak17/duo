import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/lesson')({
  beforeLoad: ({ context: { userId } }) => {
    if (!userId) throw redirect({ to: '/' })
  },
  component: RouteComponent,
})

function RouteComponent({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full w-full flex-col">
        {children ? children : <Outlet />}
      </div>
    </div>
  )
}
