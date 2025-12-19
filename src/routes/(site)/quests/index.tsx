import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/quests/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/quests/"!</div>
}
