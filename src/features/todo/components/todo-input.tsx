import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { createTodoFn } from '@/features/todo/server/fn'
import { TODOS_QUERY_KEYS } from '../constants'

export function TodoInput() {
  const queryClient = useQueryClient()
  const [input, setInput] = useState('')

  const createMutation = useMutation({
    mutationFn: (title: string) => createTodoFn({ data: { title } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all }),
  })

  const addTodo = () => {
    if (!input.trim()) return
    createMutation.mutate(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new todo..."
        className="flex-1 rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-gray-100 placeholder-slate-400 outline-none focus:border-blue-500"
      />
      <Button onClick={addTodo} disabled={createMutation.isPending}>
        Add
      </Button>
    </div>
  )
}
