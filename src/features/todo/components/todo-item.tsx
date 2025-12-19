import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

import type { Todo } from '@/lib/db/schema/todos'

import { Button } from '@/components/ui/button'
import { deleteTodoFn, toggleTodoFn } from '@/features/todo/server/fn'
import { TODOS_QUERY_KEYS } from '../constants'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient()

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodoFn({ data: { id, completed } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodoFn({ data: { id } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all }),
  })

  return (
    <li className="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-800 p-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          toggleMutation.mutate({
            id: todo.id,
            completed: !todo.completed,
          })
        }
        className="size-5 cursor-pointer accent-blue-500"
      />
      <span
        className={`flex-1 ${todo.completed ? 'text-slate-500 line-through' : 'text-gray-100'}`}
      >
        {todo.title}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => deleteMutation.mutate(todo.id)}
        className="text-slate-400 hover:text-red-400"
      >
        <Trash2 className="size-4" />
      </Button>
    </li>
  )
}
