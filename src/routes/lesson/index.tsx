import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lesson/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/lesson/"!</div>
}
