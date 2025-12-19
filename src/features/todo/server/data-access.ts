import { db } from '@/lib/db'
import { todos } from '@/lib/db/schema/todos'

export async function getTodos() {
  const result = await db.select().from(todos).orderBy(todos.createdAt)
  return result
}
