import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { type NewTodo, type Todo, todos } from '@/lib/db/schema/todos'

export async function createTodo({ title }: { title: NewTodo['title'] }) {
  const [result] = await db.insert(todos).values({ title }).returning()
  return result
}

export async function toggleTodo({
  id,
  completed,
}: Pick<Todo, 'id' | 'completed'>) {
  const [result] = await db
    .update(todos)
    .set({ completed: completed })
    .where(eq(todos.id, id))
    .returning()
  return result
}

export async function deleteTodo({ id }: { id: Todo['id'] }) {
  await db.delete(todos).where(eq(todos.id, id))
  return { success: true }
}
