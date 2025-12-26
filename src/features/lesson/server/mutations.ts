import { and, eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { challengeProgress, challenges } from '@/lib/db/schema/challenges'
import { userProgress } from '@/lib/db/schema/users'

import {
  getUserProgress,
  getUserSubscription,
} from '@/features/shared/server/data-access'
import { MAX_HEARTS, POINTS_PER_CHALLENGE } from '../constants'

export async function upsertChallengeProgress({
  userId,
  challengeId,
}: {
  userId: string
  challengeId: number
}) {
  const currentUserProgress = await getUserProgress({ userId })
  const userSubscription = await getUserSubscription({ userId })

  if (!currentUserProgress) {
    throw new Error('User progress not found')
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })

  if (!challenge) {
    throw new Error('Challenge not found')
  }

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  })

  const isPractice = !!existingChallengeProgress

  if (
    currentUserProgress.hearts === 0 &&
    !isPractice &&
    !userSubscription?.isActive
  ) {
    return { error: 'hearts' }
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id))

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, MAX_HEARTS),
        points: currentUserProgress.points + POINTS_PER_CHALLENGE,
      })
      .where(eq(userProgress.userId, userId))
    return
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  })

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + POINTS_PER_CHALLENGE,
    })
    .where(eq(userProgress.userId, userId))
}

export async function reduceHearts({
  userId,
  challengeId,
}: {
  userId: string
  challengeId: number
}) {
  const currentUserProgress = await getUserProgress({ userId })
  const userSubscription = await getUserSubscription({ userId })

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })

  if (!challenge) {
    throw new Error('Challenge not found')
  }

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  })

  const isPractice = !!existingChallengeProgress

  if (isPractice) {
    return { error: 'practice' }
  }

  if (!currentUserProgress) {
    throw new Error('User progress not found')
  }

  if (userSubscription?.isActive) {
    return { error: 'subscription' }
  }

  if (currentUserProgress.hearts === 0) {
    return { error: 'hearts' }
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId))
}
