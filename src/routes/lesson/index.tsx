import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { getLessonQueryOptions } from '@/features/learn/server/queries'
import { Quiz } from '@/features/lesson/components/quiz'
import {
  getUserProgressQueryOptions,
  getUserSubscriptionQueryOptions,
} from '@/features/shared/server/queries'

export const Route = createFileRoute('/lesson/')({
  component: RouteComponent,
  pendingComponent: PendingComponent,
  loader: async ({ context: { queryClient, userId } }) => {
    const [lesson, userSubscription, userProgress] = await Promise.all([
      queryClient.ensureQueryData(getLessonQueryOptions(userId)),
      queryClient.ensureQueryData(getUserSubscriptionQueryOptions(userId)),
      queryClient.ensureQueryData(getUserProgressQueryOptions(userId)),
    ])
    if (!lesson || !userProgress) {
      throw redirect({ to: '/courses' })
    }
    return {
      lesson,
      userSubscription,
      userProgress,
    }
  },
})

function RouteComponent() {
  const { userId } = Route.useRouteContext()
  const { data: lesson } = useSuspenseQuery(getLessonQueryOptions(userId))
  const { data: userSubscription } = useSuspenseQuery(
    getUserSubscriptionQueryOptions(userId),
  )
  const { data: userProgress } = useSuspenseQuery(
    getUserProgressQueryOptions(userId),
  )

  if (!lesson || !userProgress) {
    throw redirect({ to: '/courses' })
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  )
}

function PendingComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}
