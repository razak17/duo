import { db } from '@/lib/db'

export async function getCourses() {
  const data = await db.query.courses.findMany()
  return data
}
