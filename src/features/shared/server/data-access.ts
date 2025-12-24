import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { challengeProgress } from '@/lib/db/schema/challenges'
import { units } from '@/lib/db/schema/units'
import { userProgress, userSubscription } from '@/lib/db/schema/users'

export const getCourseProgress = async ({ userId }: { userId: string }) => {
  const userProgress = await getUserProgress({ userId })

  if (!userId || !userProgress?.activeCourseId) {
    return null
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  })

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false,
          )
        )
      })
    })

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  }
}

export async function getUserProgress({ userId }: { userId: string }) {
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  })

  return data || null
}

const DAY_IN_MS = 86_400_000

export async function getUserSubscription({ userId }: { userId: string }) {
  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  })

  if (!data) return null

  const isActive =
    data.stripePriceId &&
    // biome-ignore lint/style/noNonNullAssertion: ignore
    // biome-ignore lint/suspicious/noNonNullAssertedOptionalChain: ignore
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return {
    ...data,
    isActive: !!isActive,
  }
}
