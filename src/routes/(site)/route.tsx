import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)')({
  component: RouteComponent,
})

function RouteComponent({ children }: { children?: React.ReactNode }) {
  return <div className="">{children ? children : <Outlet />}</div>
}
