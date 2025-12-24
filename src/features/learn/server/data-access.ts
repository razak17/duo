import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { challengeProgress } from '@/lib/db/schema/challenges'
import { lessons } from '@/lib/db/schema/lessons'
import { units } from '@/lib/db/schema/units'

import {
  getCourseProgress,
  getUserProgress,
} from '@/features/shared/server/data-access'

export async function getUnits({ userId }: { userId: string }) {
  const userProgress = await getUserProgress({ userId })

  if (!userId || !userProgress?.activeCourseId) {
    return []
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
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

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false }
      }

      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        )
      })

      return { ...lesson, completed: allCompletedChallenges }
    })

    return { ...unit, lessons: lessonsWithCompletedStatus }
  })

  return normalizedData
}

export async function getLesson({
  userId,
  id,
}: {
  userId: string
  id?: number
}) {
  const courseProgress = await getCourseProgress({ userId })

  const lessonId = id || courseProgress?.activeLessonId

  if (!lessonId) {
    return null
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  })

  if (!data || !data.challenges) {
    return null
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed)

    return { ...challenge, completed }
  })

  return { ...data, challenges: normalizedChallenges }
}

export async function getLessonPercentage({ userId }: { userId: string }) {
  const courseProgress = await getCourseProgress({ userId })

  if (!courseProgress?.activeLessonId) {
    return 0
  }

  const lesson = await getLesson({
    userId,
    id: courseProgress.activeLessonId,
  })

  if (!lesson) {
    return 0
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed,
  )
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  )

  return percentage
}
