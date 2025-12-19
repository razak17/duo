import { createServerFn } from '@tanstack/react-start'

import { getTodos } from './data-access'
import { createTodo, deleteTodo, toggleTodo } from './mutations'

export const getTodosFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await getTodos()
  },
)

export const createTodoFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { title: string }) => data)
  .handler(async ({ data: { title } }) => {
    return await createTodo({ title })
  })

export const toggleTodoFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number; completed: boolean }) => data)
  .handler(async ({ data: { id, completed } }) => {
    return await toggleTodo({ id, completed })
  })

export const deleteTodoFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data: { id } }) => {
    return await deleteTodo({ id })
  })
