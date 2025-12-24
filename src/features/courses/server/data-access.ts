import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { userProgress } from '@/lib/db/schema/users'

export async function getCourses() {
  const data = await db.query.courses.findMany()
  return data
}

export const getUserProgress = async ({ userId }: { userId: string }) => {
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  })

  return data || null
}
