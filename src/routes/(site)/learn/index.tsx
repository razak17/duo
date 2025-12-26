import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import type { Lesson } from '@/lib/db/schema/lessons'
import type { Unit } from '@/lib/db/schema/units'

import { FeedWrapper } from '@/components/feed-wrapper'
import { Promo } from '@/components/promo'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { UserProgress } from '@/components/user-progress'
import { LearnHeader } from '@/features/learn/components/learn-header'
import { LessonUnit } from '@/features/learn/components/lesson-unit'
import {
  getLessonPercentageQueryOptions,
  getUnitsQueryOptions,
} from '@/features/learn/server/queries'
import {
  getCourseProgressQueryOptions,
  getUserProgressQueryOptions,
  getUserSubscriptionQueryOptions,
} from '@/features/shared/server/queries'

export const Route = createFileRoute('/(site)/learn/')({
  component: RouteComponent,
  pendingComponent: PendingComponent,
  loader: async ({ context: { queryClient, userId } }) => {
    const [
      units,
      courseProgress,
      lessonPercentage,
      userSubscription,
      userProgress,
    ] = await Promise.all([
      queryClient.ensureQueryData(getUnitsQueryOptions()),
      queryClient.ensureQueryData(getCourseProgressQueryOptions(userId)),
      queryClient.ensureQueryData(getLessonPercentageQueryOptions(userId)),
      queryClient.ensureQueryData(getUserSubscriptionQueryOptions(userId)),
      queryClient.ensureQueryData(getUserProgressQueryOptions(userId)),
    ])
    if (!userProgress || !userProgress.activeCourse) {
      throw redirect({ to: '/courses' })
    }
    if (!courseProgress) {
      throw redirect({ to: '/courses' })
    }
    return {
      units,
      courseProgress,
      lessonPercentage,
      userSubscription,
      userProgress,
    }
  },
})

function RouteComponent() {
  const { userId } = Route.useRouteContext()
  const { data: userSubscription } = useSuspenseQuery(
    getUserSubscriptionQueryOptions(userId),
  )
  const { data: userProgress } = useSuspenseQuery(
    getUserProgressQueryOptions(userId),
  )
  const { data: units } = useSuspenseQuery(getUnitsQueryOptions())
  const { data: courseProgress } = useSuspenseQuery(
    getCourseProgressQueryOptions(userId),
  )
  const { data: lessonPercentage } = useSuspenseQuery(
    getLessonPercentageQueryOptions(userId),
  )

  const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        {userProgress?.activeCourse && (
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        )}
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <LearnHeader title={userProgress?.activeCourse?.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <LessonUnit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress?.activeLesson as
                  | (Lesson & {
                      unit: Unit
                    })
                  | undefined
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

function PendingComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}
