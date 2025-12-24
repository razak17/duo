import { db } from '@/lib/db'
import { userProgress } from '@/lib/db/schema/users'

import { getCourseById, getUserProgress } from './data-access'

export const upsertUserProgress = async ({
  courseId,
  userId,
  user,
}: {
  courseId: number
  userId: string
  user: {
    firstName?: string | null
    imageUrl?: string
  }
}) => {
  const course = await getCourseById({ courseId })

  if (!course) {
    throw new Error('Course not found')
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error('Course is empty')
  }

  const existingUserProgress = await getUserProgress({ userId })

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || 'User',
      userImageSrc: user.imageUrl || '/mascot.svg',
    })
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || 'User',
    userImageSrc: user.imageUrl || '/mascot.svg',
  })
}
