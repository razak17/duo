import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/leaderboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/leaderboard/"!</div>
}
