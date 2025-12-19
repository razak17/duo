import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/')({
  component: App,
})

function App() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-8 text-center font-bold text-3xl text-gray-100">Duo</h1>
    </div>
  )
}
