import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/learn/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/learn/"!</div>
}
