import { useSuspenseQuery } from '@tanstack/react-query'

import { TodoItem } from './todo-item'
import { getTodosQueryOptions } from '../server/queries'

export function TodoList() {
  const { data: todos } = useSuspenseQuery(getTodosQueryOptions())

  return (
    <>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="mt-8 text-center text-slate-500">
          No todos yet. Add one above!
        </p>
      )}

      {todos.length > 0 && (
        <p className="mt-4 text-center text-slate-500 text-sm">
          {todos.filter((t) => t.completed).length} of {todos.length} completed
        </p>
      )}
    </>
  )
}
