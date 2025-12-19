import { createFileRoute } from '@tanstack/react-router'

import { TodoInput } from '@/features/todo/components/todo-input'
import { TodoList } from '@/features/todo/components/todo-list'
import { getTodosQueryOptions } from '@/features/todo/server/queries'

export const Route = createFileRoute('/')({
  component: App,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getTodosQueryOptions()),
})

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-center font-bold text-3xl text-gray-100">
          Todo App
        </h1>
        <TodoInput />
        <TodoList />
      </div>
    </div>
  )
}
