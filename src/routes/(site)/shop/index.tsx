import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/shop/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/shop/"!</div>
}
