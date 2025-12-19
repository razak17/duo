import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/courses/"!</div>
}
